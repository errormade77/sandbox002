#!/usr/bin/env python3
import json
import os
import re
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
PRESETS_FILE = ROOT / "stand-presets.json"
PORT = int(os.environ.get("PORT", "5173"))
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
SPOTIFY_RE = re.compile(
    r"(?:open\.spotify\.com(?:/intl-[a-z]+)?(?:/embed)?/|spotify:)(playlist|album|track)[:/]([A-Za-z0-9]+)",
    re.I,
)
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


def find_spotify_entity(node):
    if isinstance(node, dict):
        kind = node.get("type")
        tracks = node.get("trackList")
        if kind in {"playlist", "album"} and isinstance(tracks, list):
            return node
        if kind == "track" and (node.get("uri") or node.get("id")):
            return node
        for value in node.values():
            found = find_spotify_entity(value)
            if found:
                return found
    elif isinstance(node, list):
        for value in node:
            found = find_spotify_entity(value)
            if found:
                return found
    return None


def parse_spotify_resource(url):
    match = SPOTIFY_RE.search(url or "")
    if not match:
        return None
    return match.group(1).lower(), match.group(2)


def track_id_from_uri(uri):
    if not uri:
        return ""
    return str(uri).rsplit(":", 1)[-1]


def artist_from_item(item):
    subtitle = (item.get("subtitle") or "").strip()
    if subtitle:
        return subtitle
    artists = item.get("artists")
    names = []
    if isinstance(artists, list):
        for artist in artists:
            if isinstance(artist, dict) and artist.get("name"):
                names.append(str(artist["name"]).strip())
            elif isinstance(artist, str) and artist.strip():
                names.append(artist.strip())
    return ", ".join(names)


def track_from_item(item):
    if not isinstance(item, dict):
        return None
    preview = item.get("audioPreview") or {}
    track_id = track_id_from_uri(item.get("uri") or item.get("id"))
    title = (item.get("title") or item.get("name") or "").strip()
    if not track_id or not title:
        return None
    return {
        "id": track_id,
        "title": title,
        "artist": artist_from_item(item),
        "previewUrl": preview.get("url") or "" if isinstance(preview, dict) else "",
    }


def fetch_embed(kind, spotify_id):
    url = f"https://open.spotify.com/embed/{kind}/{spotify_id}"
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=20) as response:
        return response.read().decode("utf-8", "replace")


def parse_tracks(html):
    match = NEXT_DATA_RE.search(html)
    if not match:
        raise ValueError("Не удалось прочитать данные Spotify")
    payload = json.loads(match.group(1))
    entity = find_spotify_entity(payload)
    if not entity:
        raise ValueError("Плейлист или альбом не найдены, либо закрыты")

    if entity.get("type") == "track":
        tracks = [track for track in [track_from_item(entity)] if track]
    else:
        tracks = [track for track in map(track_from_item, entity.get("trackList") or []) if track]

    if not tracks:
        raise ValueError("Нет треков с превью")

    return {
        "id": entity.get("id") or "",
        "name": entity.get("name") or entity.get("title") or "Spotify",
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
        resource = parse_spotify_resource(raw_url)
        if not resource:
            self.json_response(400, {"error": "Вставьте ссылку на плейлист или альбом Spotify"})
            return
        kind, spotify_id = resource
        try:
            html = fetch_embed(kind, spotify_id)
            data = parse_tracks(html)
            self.json_response(200, data)
        except urllib.error.HTTPError as error:
            message = "Не найдено в Spotify" if error.code == 404 else "Spotify не ответил"
            self.json_response(error.code, {"error": message})
        except Exception as error:
            self.json_response(502, {"error": str(error) or "Не удалось загрузить Spotify"})

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
    server.serve_forever()
