#!/usr/bin/env python3
import json
import re
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
PRESETS_FILE = ROOT / "stand-presets.json"
PORT = 5173
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
PLAYLIST_RE = re.compile(r"(?:playlist/|spotify:playlist:)([A-Za-z0-9]+)")
IMAGE_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
}
IMAGE_MAX_BYTES = 2_000_000
AUDIO_MAX_BYTES = 5_000_000
AUDIO_TYPES = {
    "audio/mpeg",
    "audio/mp3",
    "audio/mp4",
    "audio/aac",
    "audio/ogg",
    "audio/wav",
    "audio/x-m4a",
    "application/octet-stream",
}
NEXT_DATA_RE = re.compile(
    r'<script id="__NEXT_DATA__" type="application/json">(.+?)</script>',
    re.S,
)


def empty_presets():
    return {"presets": [], "selectedPresetId": "", "defaultPresetId": ""}


def read_presets():
    try:
        data = json.loads(PRESETS_FILE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return empty_presets()
    except Exception:
        return empty_presets()
    if not isinstance(data, dict):
        return empty_presets()
    presets = data.get("presets")
    if not isinstance(presets, list):
        presets = []
    return {
        "presets": presets,
        "selectedPresetId": str(data.get("selectedPresetId") or ""),
        "defaultPresetId": str(data.get("defaultPresetId") or ""),
    }


def write_presets(payload):
    if not isinstance(payload, dict):
        raise ValueError("bad presets")
    presets = payload.get("presets")
    if not isinstance(presets, list):
        raise ValueError("bad presets")
    data = {
        "presets": presets,
        "selectedPresetId": str(payload.get("selectedPresetId") or ""),
        "defaultPresetId": str(payload.get("defaultPresetId") or ""),
    }
    raw = json.dumps(data, ensure_ascii=False, indent=2)
    if len(raw.encode("utf-8")) > 1_500_000:
        raise ValueError("too large")
    tmp = PRESETS_FILE.with_suffix(".tmp")
    tmp.write_text(raw, encoding="utf-8")
    tmp.replace(PRESETS_FILE)


def find_playlist_entity(node):
    if isinstance(node, dict):
        tracks = node.get("trackList")
        if node.get("type") == "playlist" and isinstance(tracks, list):
            return node
        for value in node.values():
            found = find_playlist_entity(value)
            if found:
                return found
    elif isinstance(node, list):
        for value in node:
            found = find_playlist_entity(value)
            if found:
                return found
    return None


def parse_playlist_id(url):
    match = PLAYLIST_RE.search(url or "")
    return match.group(1) if match else None


def track_id_from_uri(uri):
    if not uri:
        return ""
    return str(uri).rsplit(":", 1)[-1]


def fetch_embed(playlist_id):
    url = f"https://open.spotify.com/embed/playlist/{playlist_id}"
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8", "replace")


def parse_tracks(html):
    match = NEXT_DATA_RE.search(html)
    if not match:
        raise ValueError("Не удалось прочитать данные плейлиста")
    payload = json.loads(match.group(1))
    entity = find_playlist_entity(payload)
    if not entity:
        raise ValueError("Плейлист не найден или закрыт")

    tracks = []
    for item in entity.get("trackList") or []:
        preview = item.get("audioPreview") or {}
        track_id = track_id_from_uri(item.get("uri"))
        title = (item.get("title") or "").strip()
        if not track_id or not title:
            continue
        tracks.append(
            {
                "id": track_id,
                "title": title,
                "artist": (item.get("subtitle") or "").strip(),
                "previewUrl": preview.get("url") or "",
            }
        )

    if not tracks:
        raise ValueError("В плейлисте нет треков")

    return {
        "id": entity.get("id") or "",
        "name": entity.get("name") or entity.get("title") or "Плейлист",
        "tracks": tracks[:400],
    }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/presets":
            self.json_response(200, read_presets())
            return
        if parsed.path == "/api/spotify/playlist":
            self.handle_playlist(parse_qs(parsed.query))
            return
        if parsed.path == "/api/image":
            self.handle_image(parse_qs(parsed.query))
            return
        if parsed.path == "/api/audio":
            self.handle_audio(parse_qs(parsed.query))
            return
        super().do_GET()

    def do_PUT(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/presets":
            self.json_response(404, {"error": "not found"})
            return
        length = int(self.headers.get("Content-Length") or 0)
        if length > 1_500_000:
            self.json_response(413, {"error": "Слишком большой файл пресетов"})
            return
        raw = self.rfile.read(length) if length else b"{}"
        try:
            payload = json.loads(raw.decode("utf-8"))
            write_presets(payload)
            self.json_response(200, {"ok": True})
        except Exception:
            self.json_response(400, {"error": "Не удалось сохранить пресеты"})

    def handle_playlist(self, query):
        raw_url = (query.get("url") or [""])[0]
        playlist_id = parse_playlist_id(raw_url)
        if not playlist_id:
            self.json_response(400, {"error": "Вставьте ссылку на плейлист Spotify"})
            return
        try:
            html = fetch_embed(playlist_id)
            data = parse_tracks(html)
            self.json_response(200, data)
        except urllib.error.HTTPError as error:
            message = "Плейлист не найден" if error.code == 404 else "Spotify не ответил"
            self.json_response(error.code, {"error": message})
        except Exception as error:
            self.json_response(502, {"error": str(error) or "Не удалось загрузить плейлист"})

    def handle_image(self, query):
        raw_url = (query.get("url") or [""])[0]
        parsed = urlparse(raw_url)
        host = (parsed.hostname or "").lower()
        allowed = host == "scdn.co" or host.endswith(".scdn.co") or host == "spotifycdn.com" or host.endswith(".spotifycdn.com")
        if parsed.scheme not in ("http", "https") or not allowed:
            self.json_response(400, {"error": "Нельзя загрузить это изображение"})
            return
        try:
            request = urllib.request.Request(raw_url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request, timeout=15) as response:
                content_type = (response.headers.get("Content-Type") or "image/jpeg").split(";")[0].strip().lower()
                if content_type not in IMAGE_TYPES:
                    self.json_response(415, {"error": "Неподдерживаемый тип изображения"})
                    return
                data = response.read(IMAGE_MAX_BYTES + 1)
            if len(data) > IMAGE_MAX_BYTES:
                self.json_response(413, {"error": "Изображение слишком большое"})
                return
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Cache-Control", "public, max-age=86400")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except urllib.error.HTTPError as error:
            self.json_response(error.code if error.code >= 400 else 502, {"error": "Не удалось загрузить обложку"})
        except Exception:
            self.json_response(502, {"error": "Не удалось загрузить обложку"})

    def handle_audio(self, query):
        raw_url = (query.get("url") or [""])[0]
        parsed = urlparse(raw_url)
        host = (parsed.hostname or "").lower()
        allowed = (
            host in {"scdn.co", "spotifycdn.com", "spotify.com", "akamaized.net"}
            or host.endswith(".scdn.co")
            or host.endswith(".spotifycdn.com")
            or host.endswith(".spotify.com")
            or host.endswith(".akamaized.net")
        )
        if parsed.scheme not in ("http", "https") or not allowed:
            self.json_response(400, {"error": "Нельзя загрузить это аудио"})
            return
        try:
            request = urllib.request.Request(raw_url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request, timeout=20) as response:
                content_type = (response.headers.get("Content-Type") or "audio/mpeg").split(";")[0].strip().lower()
                if content_type not in AUDIO_TYPES:
                    self.json_response(415, {"error": "Неподдерживаемый тип аудио"})
                    return
                data = response.read(AUDIO_MAX_BYTES + 1)
            if len(data) > AUDIO_MAX_BYTES:
                self.json_response(413, {"error": "Аудио слишком большое"})
                return
            self.send_response(200)
            self.send_header("Content-Type", content_type if content_type != "application/octet-stream" else "audio/mpeg")
            self.send_header("Cache-Control", "public, max-age=3600")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except urllib.error.HTTPError as error:
            self.json_response(error.code if error.code >= 400 else 502, {"error": "Не удалось загрузить превью"})
        except Exception:
            self.json_response(502, {"error": "Не удалось загрузить превью"})

    def json_response(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        if self.path.startswith("/api/"):
            super().log_message(format, *args)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Stand: http://127.0.0.1:{PORT}")
    print(f"Phone: http://192.168.2.14:{PORT}")
    server.serve_forever()
