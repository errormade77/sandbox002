const panel = document.getElementById("paramsPanel");
const closeBtn = document.getElementById("paramsClose");
const dragHandle = document.getElementById("paramsDrag");
const canvas = document.getElementById("canvas");
const modules = document.getElementById("modules");
const spacer = document.getElementById("scrollSpacer");
const countInput = document.getElementById("moduleCount");
const countRange = document.getElementById("moduleCountRange");
const sizeInput = document.getElementById("moduleSize");
const sizeRange = document.getElementById("moduleSizeRange");
const gapInput = document.getElementById("moduleGap");
const gapRange = document.getElementById("moduleGapRange");
const angleInput = document.getElementById("moduleAngle");
const angleRange = document.getElementById("moduleAngleRange");
const sensitivityInput = document.getElementById("scrollSensitivity");
const sensitivityRange = document.getElementById("scrollSensitivityRange");
const inertiaInput = document.getElementById("scrollInertia");
const inertiaRange = document.getElementById("scrollInertiaRange");
const thresholdInput = document.getElementById("scrollThreshold");
const thresholdRange = document.getElementById("scrollThresholdRange");
const squashInput = document.getElementById("scrollSquash");
const squashRange = document.getElementById("scrollSquashRange");
const shrinkOnInput = document.getElementById("scrollShrinkOn");
const shrinkInput = document.getElementById("scrollShrink");
const shrinkRange = document.getElementById("scrollShrinkRange");
const gapBoostOnInput = document.getElementById("scrollGapOn");
const gapBoostInput = document.getElementById("scrollGapBoost");
const gapBoostRange = document.getElementById("scrollGapBoostRange");
const blurOnInput = document.getElementById("scrollBlurOn");
const blurInput = document.getElementById("scrollBlur");
const blurRange = document.getElementById("scrollBlurRange");
const zoomInput = document.getElementById("viewZoom");
const zoomRange = document.getElementById("viewZoomRange");
const zoomDurationInput = document.getElementById("zoomDuration");
const zoomDurationRange = document.getElementById("zoomDurationRange");
const zoomInertiaInput = document.getElementById("zoomInertia");
const zoomInertiaRange = document.getElementById("zoomInertiaRange");
const zoomShrinkOnInput = document.getElementById("zoomShrinkOn");
const zoomShrinkInput = document.getElementById("zoomShrink");
const zoomShrinkRange = document.getElementById("zoomShrinkRange");
const zoomBlurOnInput = document.getElementById("zoomBlurOn");
const zoomBlurInput = document.getElementById("zoomBlur");
const zoomBlurRange = document.getElementById("zoomBlurRange");
const shadowBlurInput = document.getElementById("shadowBlur");
const shadowBlurRange = document.getElementById("shadowBlurRange");
const shadowXInput = document.getElementById("shadowX");
const shadowXRange = document.getElementById("shadowXRange");
const shadowYInput = document.getElementById("shadowY");
const shadowYRange = document.getElementById("shadowYRange");
const shadowOpacityInput = document.getElementById("shadowOpacity");
const shadowOpacityRange = document.getElementById("shadowOpacityRange");
const presetList = document.getElementById("presetList");
const presetName = document.getElementById("presetName");
const presetSave = document.getElementById("presetSave");
const activeScaleInput = document.getElementById("activeScale");
const activeScaleRange = document.getElementById("activeScaleRange");
const pressScaleInput = document.getElementById("pressScale");
const pressScaleRange = document.getElementById("pressScaleRange");
const pressDurationInput = document.getElementById("pressDuration");
const pressDurationRange = document.getElementById("pressDurationRange");
const hoverLiftInput = document.getElementById("hoverLift");
const hoverLiftRange = document.getElementById("hoverLiftRange");
const hoverDurationInput = document.getElementById("hoverDuration");
const hoverDurationRange = document.getElementById("hoverDurationRange");
const hoverFollowInput = document.getElementById("hoverFollow");
const hoverFollowRange = document.getElementById("hoverFollowRange");
const spotifyInput = document.getElementById("spotifyPlaylist");
const spotifyLoad = document.getElementById("spotifyLoad");
const spotifyStatus = document.getElementById("spotifyStatus");
const tabStandBtn = document.getElementById("tabStandBtn");
const tabVizBtn = document.getElementById("tabVizBtn");
const tabStandPanel = document.getElementById("tabStandPanel");
const tabVizPanel = document.getElementById("tabVizPanel");
const vizBgOnInput = document.getElementById("vizBgOn");
const vizBgModeInput = document.getElementById("vizBgMode");
const vizBgBlurInput = document.getElementById("vizBgBlur");
const vizBgBlurRange = document.getElementById("vizBgBlurRange");
const vizBgBlurRow = document.getElementById("vizBgBlurRow");
const vizBgColorPickInput = document.getElementById("vizBgColorPick");
const vizBgColorPickRow = document.getElementById("vizBgColorPickRow");
const vizBgFadeInput = document.getElementById("vizBgFade");
const vizBgFadeRange = document.getElementById("vizBgFadeRange");
const vizBgFadeRow = document.getElementById("vizBgFadeRow");
const vizLidarRows = document.getElementById("vizLidarRows");
const vizLidarDensityInput = document.getElementById("vizLidarDensity");
const vizLidarDensityRange = document.getElementById("vizLidarDensityRange");
const vizLidarDepthInput = document.getElementById("vizLidarDepth");
const vizLidarDepthRange = document.getElementById("vizLidarDepthRange");
const vizLidarReactInput = document.getElementById("vizLidarReact");
const vizLidarReactRange = document.getElementById("vizLidarReactRange");
const vizLidarSizeInput = document.getElementById("vizLidarSize");
const vizLidarSizeRange = document.getElementById("vizLidarSizeRange");
const vizLidarScaleInput = document.getElementById("vizLidarScale");
const vizLidarScaleRange = document.getElementById("vizLidarScaleRange");
const vizLidarSpinInput = document.getElementById("vizLidarSpin");
const vizLidarYawInput = document.getElementById("vizLidarYaw");
const vizLidarYawRange = document.getElementById("vizLidarYawRange");
const vizLidarCoverBgInput = document.getElementById("vizLidarCoverBg");
const vizLidarGlowOnInput = document.getElementById("vizLidarGlowOn");
const vizLidarGlowInput = document.getElementById("vizLidarGlow");
const vizLidarGlowRange = document.getElementById("vizLidarGlowRange");
const vizLidarGlowRow = document.getElementById("vizLidarGlowRow");
const vizLidarGlowParam = document.getElementById("vizLidarGlowParam");
const LIDAR_AUDIO_FLAGS = [
  ["vizLidarDensityAudio", false],
  ["vizLidarDepthAudio", true],
  ["vizLidarReactAudio", true],
  ["vizLidarYawAudio", false],
  ["vizLidarScaleAudio", true],
  ["vizLidarSizeAudio", true],
  ["vizLidarSpinAudio", true],
  ["vizLidarCoverBgAudio", false],
  ["vizLidarGlowAudio", false],
  ["vizLidarLasersAudio", true],
];
const vizLidarLasersInput = document.getElementById("vizLidarLasers");
const vizBg = document.getElementById("vizBg");
const vizBgMedia = document.getElementById("vizBgMedia");
const vizLidar = document.getElementById("vizLidar");
const stripMedia = window.matchMedia("(max-width: 768px)");

function isVerticalStrip() {
  return stripMedia.matches;
}

function applyStripMode() {
  const next = isVerticalStrip();
  const was = document.documentElement.classList.contains("is-vertical-strip");
  document.documentElement.classList.toggle("is-vertical-strip", next);
  if (next && !was) stripPos = canvas.scrollLeft;
  if (!next && was) {
    canvas.scrollLeft = stripPos;
    canvas.scrollTop = 0;
  }
}

const STORAGE_KEY = "stand-params-panel";
const PRESETS_KEY = "stand-presets-v1";
const COUNT_MAX = 400;
const DEFAULTS = {
  count: 5,
  size: 72,
  gap: 20,
  angle: 15,
  sensitivity: 80,
  inertia: 72,
  threshold: 40,
  squash: 50,
  scrollShrinkOn: false,
  scrollShrink: 22,
  scrollGapOn: false,
  scrollGap: 40,
  scrollBlurOn: false,
  scrollBlur: 8,
  zoom: 100,
  zoomOut: false,
  zoomDuration: 420,
  zoomInertia: 62,
  zoomShrinkOn: false,
  zoomShrink: 22,
  zoomBlurOn: false,
  zoomBlur: 8,
  activeScale: 130,
  pressScale: 8,
  pressDuration: 180,
  hoverLift: 28,
  hoverDuration: 280,
  hoverFollow: 10,
  shadowBlur: 18,
  shadowX: 0,
  shadowY: 10,
  shadowOpacity: 30,
  spotifyUrl: "",
  vizBgOn: false,
  vizBgMode: "cover",
  vizBgColorPick: "mix",
  vizBgFade: 380,
  vizBgBlur: 48,
  vizLidarDensity: 72,
  vizLidarDepth: 58,
  vizLidarReact: 88,
  vizLidarSize: 4,
  vizLidarScale: 100,
  vizLidarSpin: true,
  vizLidarYaw: 0,
  vizLidarCoverBg: false,
  vizLidarGlowOn: false,
  vizLidarGlow: 55,
  vizLidarLasers: false,
  vizLidarDensityAudio: false,
  vizLidarDepthAudio: true,
  vizLidarReactAudio: true,
  vizLidarYawAudio: false,
  vizLidarScaleAudio: true,
  vizLidarSizeAudio: true,
  vizLidarSpinAudio: true,
  vizLidarCoverBgAudio: false,
  vizLidarGlowAudio: false,
  vizLidarLasersAudio: true,
};

let zoomVisual = DEFAULTS.zoom;
let zoomVel = 0;
let zoomAnimating = false;
let zoomFrame = 0;
let zoomLastTime = 0;
let zoomFocusScroll = 0;
let zoomStripScroll = 0;
let zoomReady = false;
let drag = null;
let activeIndex = 0;
let lockedActive = false;
let snapping = false;
let scrollAnim = 0;
let velocity = 0;
let physicsRunning = false;
let physicsFrame = 0;
let lastPhysicsTime = 0;
let gestureStartIndex = 0;
let stripPointer = null;
let touchStrip = null;
let stripPos = 0;
let suppressModuleClick = false;
let emptyPressTimer = 0;
let squashForce = 0;
let squashFrame = 0;
let hoveredIndex = -1;
let lifts = [];
let follows = [];
let focuses = [];
let zoomKs = [];
let zoomBlurs = [];
let zoomFx = 0;
let hoverAim = { x: 0, y: 0 };
let press = 0;
let pressTarget = 0;
let memoryState = null;
let memoryPresets = null;
let playlistTracks = [];
let playlistName = "";
let audioAllowed = false;
const player = new Audio();
player.preload = "auto";
player.crossOrigin = "anonymous";
let clickCtx = null;
let clickBuffer = null;
let clickBufferLoading = null;
let lastHoverSound = 0;
let lastActivateSound = 0;
const STAGE_BG = "#f3f2ef";
const STAGE_BG_PAUSE = "#ffffff";
const STAGE_BG_LIDAR = "#070708";
const coverColorCache = new Map();
const coverColorPending = new Map();
const lidarMeshCache = new Map();
let vizHoldPlaying = false;
let stageRgb = { r: 243, g: 242, b: 239 };
let stageRgbTarget = { r: 243, g: 242, b: 239 };
let stageRgbFrame = 0;
let stageRgbTime = 0;
let stageRgbReady = false;
let mediaNode = null;
let analyserNode = null;
let freqData = null;
let lidarGl = null;
let lidarProgram = null;
let lidarBuffers = null;
let lidarCount = 0;
let lidarFrame = 0;
let lidarStopTimer = 0;
let lidarWanted = false;
let lidarUrl = "";
let lidarAudio = { bass: 0, mid: 0, high: 0, energy: 0, drive: 1, hit: 0, rms: 0 };
let lidarStart = performance.now();
let lidarSpin = 0;
let lidarTickTime = 0;
let lidarScalePulse = 1;
let lidarEnergyAvg = 0.16;
let lidarPrevEnergy = 0;
let timeData = null;
let lidarLaser = null;

function clickAudio() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!clickCtx) clickCtx = new Ctx();
  if (clickCtx.state === "suspended") clickCtx.resume().catch(() => {});
  loadClickBuffer(clickCtx);
  return clickCtx;
}

function loadClickBuffer(ctx) {
  if (clickBuffer || clickBufferLoading || !ctx) return clickBufferLoading;
  clickBufferLoading = fetch("sounds/switch-click.wav")
    .then((res) => {
      if (!res.ok) throw new Error("click wav");
      return res.arrayBuffer();
    })
    .then((data) => ctx.decodeAudioData(data.slice(0)))
    .then((buf) => {
      clickBuffer = buf;
      return buf;
    })
    .catch(() => {
      clickBufferLoading = null;
      return null;
    });
  return clickBufferLoading;
}

function playClickSound(kind) {
  try {
    const ctx = clickAudio();
    if (!ctx) return;
    if (kind !== "hover") lastActivateSound = performance.now();
    const hover = kind === "hover";
    const start = (buffer) => {
      if (!buffer) return;
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buffer;
      gain.gain.value = hover ? 0.275 : 0.425;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start(ctx.currentTime);
    };
    if (clickBuffer) {
      start(clickBuffer);
      return;
    }
    loadClickBuffer(ctx)?.then((buf) => {
      if (buf) start(buf);
    });
  } catch {}
}

function playHoverClick() {
  const now = performance.now();
  if (now - lastActivateSound < 90) return;
  if (now - lastHoverSound < 35) return;
  lastHoverSound = now;
  playClickSound("hover");
}

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

function loadState() {
  if (memoryState) return { ...memoryState };
  const stored = readStorage(STORAGE_KEY) || {};
  memoryState = { ...stored };
  delete memoryState.presets;
  delete memoryState.selectedPresetId;
  delete memoryState.defaultPresetId;
  if (!memoryPresets) loadPresetsState();
  return { ...memoryState };
}

function saveState(patch) {
  const next = { ...loadState(), ...patch };
  delete next.presets;
  delete next.selectedPresetId;
  delete next.defaultPresetId;
  memoryState = next;
  writeStorage(STORAGE_KEY, next);
}

function normalizePreset(preset) {
  if (!preset || typeof preset !== "object") return null;
  const valuesSource = preset.values && typeof preset.values === "object" ? preset.values : preset;
  const id = String(preset.id || "");
  const name = String(preset.name || "").trim();
  if (!id || !name) return null;
  return { id, name, values: snapshotParams(valuesSource) };
}

function loadPresetsState() {
  if (memoryPresets) {
    return {
      presets: memoryPresets.presets.map((preset) => ({ ...preset, values: { ...preset.values } })),
      selectedPresetId: memoryPresets.selectedPresetId || "",
      defaultPresetId: memoryPresets.defaultPresetId || "",
    };
  }

  const stored = readStorage(PRESETS_KEY);
  const legacy = readStorage(STORAGE_KEY) || {};
  const source = stored || legacy;
  const presets = (Array.isArray(source.presets) ? source.presets : [])
    .map(normalizePreset)
    .filter(Boolean);
  memoryPresets = {
    presets,
    selectedPresetId: String(source.selectedPresetId || ""),
    defaultPresetId: String(source.defaultPresetId || ""),
  };
  if (!stored && presets.length) writeStorage(PRESETS_KEY, memoryPresets);
  return loadPresetsState();
}

function savePresetsState(patch) {
  const current = loadPresetsState();
  const next = {
    presets: (patch.presets ?? current.presets).map(normalizePreset).filter(Boolean),
    selectedPresetId: patch.selectedPresetId !== undefined ? String(patch.selectedPresetId || "") : current.selectedPresetId,
    defaultPresetId: patch.defaultPresetId !== undefined ? String(patch.defaultPresetId || "") : current.defaultPresetId,
  };
  memoryPresets = next;
  writeStorage(PRESETS_KEY, next);
  pushPresetsToServer(next);
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

function bundledPresetsUrl() {
  const script = document.querySelector('script[src*="script.js"]');
  try {
    return new URL("stand-presets.json", script?.src || window.location.href).href;
  } catch {
    return "stand-presets.json";
  }
}

async function fetchServerPresets() {
  const remote = await fetchJson("/api/presets");
  if (Array.isArray(remote?.presets) && remote.presets.length) return remote;
  return fetchJson(bundledPresetsUrl());
}

function pushPresetsToServer(state) {
  const payload = state || loadPresetsState();
  fetch("/api/presets", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function applyPresetsPayload(payload) {
  const source = payload && typeof payload === "object" ? payload : {};
  memoryPresets = {
    presets: (Array.isArray(source.presets) ? source.presets : []).map(normalizePreset).filter(Boolean),
    selectedPresetId: String(source.selectedPresetId || ""),
    defaultPresetId: String(source.defaultPresetId || ""),
  };
  writeStorage(PRESETS_KEY, memoryPresets);
}

async function hydratePresets() {
  const remote = await fetchServerPresets();
  const remotePresets = (Array.isArray(remote?.presets) ? remote.presets : []).map(normalizePreset).filter(Boolean);
  if (remotePresets.length) {
    applyPresetsPayload({ ...remote, presets: remotePresets });
    return;
  }
  memoryPresets = null;
  const local = loadPresetsState();
  if (local.presets.length) pushPresetsToServer(local);
}

function panelViewBox() {
  const vv = window.visualViewport;
  if (isVerticalStrip() && vv) {
    return { x: vv.offsetLeft, y: vv.offsetTop, w: vv.width, h: vv.height };
  }
  return { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight };
}

function clampPosition(x, y) {
  const box = panelViewBox();
  const maxX = Math.max(box.x, box.x + box.w - panel.offsetWidth);
  const maxY = Math.max(box.y, box.y + box.h - panel.offsetHeight);
  return {
    x: Math.min(Math.max(box.x, x), maxX),
    y: Math.min(Math.max(box.y, y), maxY),
  };
}

function placePanel(x, y) {
  if (isVerticalStrip()) {
    panel.style.left = "";
    panel.style.top = "";
    panel.style.right = "";
    panel.style.bottom = "";
    panel.style.width = "";
    return { x: 0, y: 0 };
  }
  const pos = clampPosition(x, y);
  panel.style.left = `${pos.x}px`;
  panel.style.top = `${pos.y}px`;
  panel.style.right = "auto";
  panel.style.bottom = "auto";
  return pos;
}

function defaultPosition() {
  const width = panel.offsetWidth || 320;
  const height = panel.offsetHeight || 220;
  const box = panelViewBox();
  return {
    x: box.x + box.w - width - 24,
    y: box.y + box.h - height - 24,
  };
}

function openPanel() {
  const state = loadState();
  panel.hidden = false;

  const fallback = defaultPosition();
  placePanel(state.x ?? fallback.x, state.y ?? fallback.y);
  saveState({ open: true });
}

function closePanel() {
  panel.hidden = true;
  saveState({ open: false });
}

function togglePanel() {
  if (panel.hidden) openPanel();
  else closePanel();
}

function setParamsTab(tab, persist = true) {
  const next = tab === "viz" ? "viz" : "stand";
  const standOn = next === "stand";
  if (tabStandPanel) tabStandPanel.hidden = !standOn;
  if (tabVizPanel) tabVizPanel.hidden = standOn;
  tabStandBtn?.setAttribute("aria-selected", standOn ? "true" : "false");
  tabVizBtn?.setAttribute("aria-selected", standOn ? "false" : "true");
  if (persist) saveState({ paramsTab: next });
}

tabStandBtn?.addEventListener("click", () => setParamsTab("stand"));
tabVizBtn?.addEventListener("click", () => setParamsTab("viz"));

closeBtn.addEventListener("click", closePanel);

document.addEventListener("dblclick", (event) => {
  if (event.target.closest(".params-panel")) return;
  if (event.target.closest(".module")) return;
  event.preventDefault();
  togglePanel();
});

dragHandle.addEventListener("pointerdown", (event) => {
  if (isVerticalStrip()) return;
  if (event.target.closest("button")) return;

  const rect = panel.getBoundingClientRect();
  drag = {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  dragHandle.setPointerCapture(event.pointerId);
});

dragHandle.addEventListener("pointermove", (event) => {
  if (!drag) return;
  const pos = placePanel(event.clientX - drag.offsetX, event.clientY - drag.offsetY);
  saveState(pos);
});

dragHandle.addEventListener("pointerup", () => {
  drag = null;
});

window.addEventListener("resize", () => {
  if (!panel.hidden) {
    const rect = panel.getBoundingClientRect();
    const pos = placePanel(rect.left, rect.top);
    if (!isVerticalStrip()) saveState(pos);
  }
  stopPhysics();
  layoutTrack();
  applyRotations();
  centerActive("auto");
  resizeLidar();
});

if (window.visualViewport) {
  const relayout = () => {
    if (!isVerticalStrip()) return;
    applyRotations();
    resizeLidar();
  };
  window.visualViewport.addEventListener("resize", relayout);
  window.visualViewport.addEventListener("scroll", relayout);
}

if (stripMedia.addEventListener) {
  stripMedia.addEventListener("change", () => {
    stopPhysics();
    layoutTrack();
    setStripScroll(scrollForIndex(activeIndex));
    applyRotations();
    centerActive("auto");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !panel.hidden) closePanel();
});

function clamp(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function viewSize() {
  if (isVerticalStrip() && window.visualViewport && window.visualViewport.height) {
    return {
      width: Math.max(1, window.visualViewport.width),
      height: Math.max(1, window.visualViewport.height),
    };
  }
  const width = Number(canvas?.clientWidth) || Number(document.documentElement.clientWidth) || Number(window.innerWidth) || 800;
  const height = Number(canvas?.clientHeight) || Number(document.documentElement.clientHeight) || Number(window.innerHeight) || 600;
  return {
    width: Math.max(1, width),
    height: Math.max(1, height),
  };
}

function viewOrigin() {
  if (isVerticalStrip() && window.visualViewport) {
    return {
      x: window.visualViewport.offsetLeft || 0,
      y: window.visualViewport.offsetTop || 0,
    };
  }
  return { x: 0, y: 0 };
}

function stripScroll() {
  return isVerticalStrip() ? stripPos : canvas.scrollLeft;
}

function setStripScroll(value) {
  const next = clampScroll(value);
  if (isVerticalStrip()) {
    stripPos = next;
    return;
  }
  canvas.scrollLeft = next;
  canvas.scrollTop = 0;
}

function carouselCount() {
  if (playlistTracks.length) return Math.min(COUNT_MAX, playlistTracks.length);
  if (modules.children.length) return modules.children.length;
  return clamp(loadState().count, 1, COUNT_MAX, DEFAULTS.count);
}

function carouselContentWidth() {
  const count = Math.max(1, carouselCount());
  const size = clamp(loadState().size, 16, 240, DEFAULTS.size);
  return Math.max(size, (count - 1) * visualStep() + size);
}

function zoomBounds() {
  if (isVerticalStrip()) return { min: DEFAULTS.zoom, max: DEFAULTS.zoom };
  const content = Math.max(1, carouselContentWidth());
  const view = viewSize().width;
  const min = Math.max(5, Math.floor((view / content) * 100));
  const max = Math.max(min, DEFAULTS.zoom);
  return { min, max };
}

function zoomSettings() {
  const state = loadState();
  return {
    duration: clamp(state.zoomDuration, 80, 800, DEFAULTS.zoomDuration),
    inertia: clamp(state.zoomInertia, 0, 100, DEFAULTS.zoomInertia),
  };
}

function isZoomedOut() {
  if (isVerticalStrip()) return false;
  const { min, max } = zoomBounds();
  if (min >= max) return false;
  const state = loadState();
  if (typeof state.zoomOut === "boolean") return state.zoomOut;
  return Number(state.zoom) < (min + max) / 2;
}

function zoomValue() {
  const { min, max } = zoomBounds();
  return isZoomedOut() ? min : max;
}

function displayZoom() {
  return Math.max(0.04, zoomVisual / 100);
}

function atDefaultZoom() {
  return !isZoomedOut() && !zoomAnimating && Math.abs(zoomVisual - zoomBounds().max) < 0.5;
}

function carouselCanScroll() {
  if (isVerticalStrip()) {
    return modules.children.length > 1 && carouselContentWidth() > viewSize().height + 1;
  }
  return atDefaultZoom() && zoomBounds().min < DEFAULTS.zoom;
}

function syncZoomBounds() {
  const { min, max } = zoomBounds();
  const step = Math.max(1, max - min);
  if (zoomRange) {
    zoomRange.min = String(min);
    zoomRange.max = String(max);
    zoomRange.step = String(step);
  }
  if (zoomInput) {
    zoomInput.min = String(min);
    zoomInput.max = String(max);
    zoomInput.step = String(step);
  }
}

function captureZoomScrollEnds() {
  const last = Math.max(0, modules.children.length - 1);
  const playing = playingIndex();
  const focus = playing >= 0 ? playing : activeIndex;
  zoomStripScroll = (last / 2) * scrollStep();
  zoomFocusScroll = scrollForIndex(Math.min(last, Math.max(0, focus)));
}

function applyZoomScrollLerp() {
  const { min, max } = zoomBounds();
  const span = Math.max(1, max - min);
  const t = Math.max(0, Math.min(1, (max - zoomVisual) / span));
  setStripScroll(zoomFocusScroll + (zoomStripScroll - zoomFocusScroll) * t);
}

function paintZoom() {
  if (isVerticalStrip()) {
    modules.style.transform = "";
    return;
  }
  modules.style.transformOrigin = "50% 50%";
  if (!zoomAnimating && Math.abs(zoomVisual - 100) < 0.05) {
    modules.style.transform = "";
    return;
  }
  modules.style.transform = `scale(${displayZoom()})`;
}

function settleZoomMode() {
  const canScroll = carouselCanScroll();
  document.documentElement.classList.toggle("is-zoomed-out", !canScroll);
  if (!canScroll) {
    lockedActive = true;
    applyZoomScrollLerp();
    applyRotations();
    return;
  }
  lockedActive = false;
  const last = Math.max(0, modules.children.length - 1);
  const playing = playingIndex();
  const next = Math.min(last, Math.max(0, playing >= 0 ? playing : activeIndex));
  const switched = next !== activeIndex;
  activeIndex = next;
  applyZoomScrollLerp();
  applyRotations();
  if (switched) applyVizBackground();
}

function stopZoomPhysics() {
  zoomAnimating = false;
  zoomVel = 0;
  cancelAnimationFrame(zoomFrame);
  zoomFrame = 0;
}

function zoomTick(now) {
  const elapsed = zoomLastTime ? now - zoomLastTime : 16.67;
  const dt = Math.min(32, elapsed) / 1000;
  zoomLastTime = now;

  const { min, max } = zoomBounds();
  const target = zoomValue();
  const { duration, inertia } = zoomSettings();
  const tau = Math.max(0.05, (duration / 1000) * (0.28 + (inertia / 100) * 0.55));
  const follow = 1 - Math.exp(-dt / tau);
  zoomVisual += (target - zoomVisual) * follow;
  zoomVel = 0;

  if (zoomVisual < min) zoomVisual = min;
  if (zoomVisual > max) zoomVisual = max;

  paintZoom();
  applyZoomScrollLerp();
  applyRotations();

  if (Math.abs(target - zoomVisual) < 0.08) {
    zoomVisual = target;
    stopZoomPhysics();
    paintZoom();
    settleZoomMode();
    return;
  }

  zoomFrame = requestAnimationFrame(zoomTick);
}

function tickZoomFx() {
  const target = isZoomedOut() ? 1 : 0;
  const { duration, inertia } = zoomSettings();
  const attackMs = 50;
  const releaseMs = Math.max(160, duration * (0.78 + (inertia / 100) * 0.2));
  const k = 1 - Math.exp(-16 / (target > zoomFx + 0.001 ? attackMs : releaseMs));
  zoomFx += (target - zoomFx) * k;
  if (Math.abs(zoomFx - target) < 0.003) zoomFx = target;
  return Math.abs(zoomFx - target) >= 0.003;
}

function startZoomAnim() {
  if (isVerticalStrip()) return;
  if (!zoomAnimating) captureZoomScrollEnds();
  zoomAnimating = true;
  zoomVel = 0;
  squashForce = 0;
  stopPhysics();
  snapping = false;
  cancelAnimationFrame(scrollAnim);
  lockedActive = true;
  document.documentElement.classList.add("is-zoomed-out");
  if (!zoomFrame) {
    zoomLastTime = performance.now();
    zoomFrame = requestAnimationFrame(zoomTick);
  }
  applyRotations();
}

function setZoomedOut(out) {
  if (isVerticalStrip()) return;
  const { min, max } = zoomBounds();
  const nextOut = Boolean(out) && min < max;
  saveState({ zoom: nextOut ? min : max, zoomOut: nextOut });
  applyZoom();
}

function playingIndex() {
  const id = player.dataset.trackId;
  if (!id || !playlistTracks.length) return -1;
  return playlistTracks.findIndex((track) => track.id === id);
}

function applyZoom() {
  if (isVerticalStrip()) {
    stopZoomPhysics();
    zoomReady = true;
    zoomVisual = DEFAULTS.zoom;
    zoomFx = 0;
    lockedActive = false;
    modules.style.transform = "";
    document.documentElement.classList.remove("is-zoomed-out");
    applyRotations();
    return;
  }
  syncZoomBounds();
  const zoomPct = zoomValue();
  if (loadState().zoom !== zoomPct) saveState({ zoom: zoomPct });
  setInput(zoomInput, zoomPct);
  setInput(zoomRange, zoomPct);
  if (!zoomReady) {
    zoomReady = true;
    zoomVisual = zoomPct;
    zoomVel = 0;
    zoomFx = isZoomedOut() ? 1 : 0;
    captureZoomScrollEnds();
    applyZoomScrollLerp();
    paintZoom();
    settleZoomMode();
    return;
  }
  if (Math.abs(zoomVisual - zoomPct) < 0.15 && Math.abs(zoomVel) < 0.08 && !zoomAnimating) {
    zoomVisual = zoomPct;
    zoomFx = isZoomedOut() ? 1 : 0;
    paintZoom();
    settleZoomMode();
    return;
  }
  startZoomAnim();
}

function centerCarouselStrip() {
  const last = Math.max(0, modules.children.length - 1);
  const target = (last / 2) * scrollStep();
  if (Math.abs(stripScroll() - target) > 0.5) setStripScroll(target);
}

function inCarouselZone(event) {
  if (event.target.closest(".params-panel")) return false;
  const view = viewSize();
  const state = loadState();
  const size = clamp(state.size, 16, 240, DEFAULTS.size);
  const zoom = displayZoom();
  const activeScale = clamp(state.activeScale, 100, 200, DEFAULTS.activeScale) / 100;
  const hoverLift = clamp(state.hoverLift, 0, 80, DEFAULTS.hoverLift);
  const half = (size * activeScale * 0.5 + hoverLift + 36) * zoom;
  if (isVerticalStrip()) {
    const mid = view.width / 2;
    return event.clientX >= mid - half && event.clientX <= mid + half;
  }
  const mid = view.height / 2;
  return event.clientY >= mid - half && event.clientY <= mid + half;
}

function addZoomImpulse(delta) {
  if (isVerticalStrip()) return;
  if (Math.abs(delta) < 2) return;
  if (delta > 0) setZoomedOut(true);
  else setZoomedOut(false);
}

function layoutTrack() {
  const state = loadState();
  const size = clamp(state.size, 16, 240, DEFAULTS.size);
  const gap = clamp(state.gap, -1000, 120, DEFAULTS.gap);
  const shadowBlur = clamp(state.shadowBlur, 0, 80, DEFAULTS.shadowBlur);
  const shadowX = clamp(state.shadowX, -40, 40, DEFAULTS.shadowX);
  const shadowY = clamp(state.shadowY, -40, 40, DEFAULTS.shadowY);
  const shadowOpacity = clamp(state.shadowOpacity, 0, 100, DEFAULTS.shadowOpacity);
  const count = modules.children.length;
  const step = scrollStep();
  const view = viewSize();

  document.documentElement.style.setProperty("--module-size", `${size}px`);
  document.documentElement.style.setProperty("--module-gap", `${gap}px`);
  document.documentElement.style.setProperty("--shadow-blur", `${shadowBlur}px`);
  document.documentElement.style.setProperty("--shadow-x", `${shadowX}px`);
  document.documentElement.style.setProperty("--shadow-y", `${shadowY}px`);
  document.documentElement.style.setProperty("--shadow-alpha", String(shadowOpacity / 100));

  modules.style.width = "";
  modules.style.height = "";
  applyStripMode();
  const span = Math.max(
    isVerticalStrip() ? view.height : view.width,
    (Math.max(count, 1) - 1) * step + (isVerticalStrip() ? view.height : view.width)
  );
  if (isVerticalStrip()) {
    spacer.style.width = "";
    spacer.style.height = `${span}px`;
  } else {
    spacer.style.height = "";
    spacer.style.width = `${span}px`;
  }
  syncZoomBounds();
  applyZoom();
}

function visualStep() {
  const state = loadState();
  const size = clamp(state.size, 16, 240, DEFAULTS.size);
  const gap = clamp(state.gap, -1000, 120, DEFAULTS.gap);
  return Math.max(2, size + gap);
}

function scrollStep() {
  const size = clamp(loadState().size, 16, 240, DEFAULTS.size);
  return Math.max(visualStep(), Math.round(size * 0.45), 40);
}

function scrollProgress() {
  const step = scrollStep();
  if (step <= 0) return 0;
  const value = stripScroll() / step;
  return Number.isFinite(value) ? value : 0;
}

function hoverAimFromEvent(el, event) {
  const rect = el.getBoundingClientRect();
  const nx = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
  const ny = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
  return {
    x: Math.max(-1, Math.min(1, nx)),
    y: Math.max(-1, Math.min(1, ny)),
  };
}

function applyRotations() {
  const flatten = updateSquash();
  const state = loadState();
  const angle = clamp(state.angle, -90, 90, DEFAULTS.angle);
  const size = clamp(state.size, 16, 240, DEFAULTS.size);
  const activeScale = clamp(state.activeScale, 100, 200, DEFAULTS.activeScale) / 100;
  const hoverLift = clamp(state.hoverLift, 0, 80, DEFAULTS.hoverLift);
  const hoverDuration = clamp(state.hoverDuration, 80, 800, DEFAULTS.hoverDuration);
  const hoverFollow = clamp(state.hoverFollow, 0, 40, DEFAULTS.hoverFollow);
  const pressScale = clamp(state.pressScale, 0, 20, DEFAULTS.pressScale) / 100;
  const pressDuration = clamp(state.pressDuration, 80, 800, DEFAULTS.pressDuration);
  const shrinkOn = Boolean(state.scrollShrinkOn);
  const shrinkAmt = clamp(state.scrollShrink, 0, 50, DEFAULTS.scrollShrink) / 100;
  const gapOn = Boolean(state.scrollGapOn);
  const gapAmt = clamp(state.scrollGap, 0, 1000, DEFAULTS.scrollGap) / 100;
  const blurOn = Boolean(state.scrollBlurOn);
  const blurAmt = clamp(state.scrollBlur, 0, 24, DEFAULTS.scrollBlur);
  const zoomShrinkOn = Boolean(state.zoomShrinkOn);
  const zoomShrinkAmt = clamp(state.zoomShrink, 0, 50, DEFAULTS.zoomShrink) / 100;
  const zoomBlurOn = Boolean(state.zoomBlurOn);
  const zoomBlurAmt = clamp(state.zoomBlur, 0, 24, DEFAULTS.zoomBlur);
  const zoomFxMoving = tickZoomFx();
  const zoomFollow = 1 - Math.exp(-16 / 48);
  const step = visualStep();
  const spacing = Math.max(2, step * (1 - flatten * 0.4) + (gapOn ? flatten * step * gapAmt : 0));
  const progress = scrollProgress();
  const view = viewSize();
  const origin = viewOrigin();
  const vertical = isVerticalStrip();
  const x0 = origin.x + view.width / 2 - size / 2;
  const y0 = origin.y + view.height / 2 - size / 2;
  const zoom = displayZoom();
  const viewMain = vertical ? view.height : view.width;
  const viewPad = (viewMain + size * 2 + hoverLift + hoverFollow) / Math.max(0.04, zoom);
  const items = modules.children;
  const fitAll = ((Math.max(items.length, 1) - 1) * spacing + size) * zoom <= viewMain + 2;
  const fromScroll = items.length ? Math.min(items.length - 1, Math.max(0, Math.round(progress))) : 0;
  const pinActive = !carouselCanScroll();
  const current = pinActive && items.length
    ? Math.min(items.length - 1, Math.max(0, activeIndex))
    : fromScroll;
  const liftK = 1 - Math.exp(-16 / hoverDuration);
  if (!pinActive && current !== activeIndex) playHoverClick();
  const switched = current !== activeIndex;
  activeIndex = current;
  if (switched) applyVizBackground();
  if (lifts.length !== items.length) lifts = new Array(items.length).fill(0);
  if (follows.length !== items.length) follows = Array.from({ length: items.length }, () => ({ x: 0, y: 0 }));
  if (focuses.length !== items.length) {
    focuses = Array.from({ length: items.length }, (_, index) => (pinActive ? index - current : index - progress));
  }
  if (zoomKs.length !== items.length) zoomKs = new Array(items.length).fill(1);
  if (zoomBlurs.length !== items.length) zoomBlurs = new Array(items.length).fill(0);

  let hoverAnimating = false;
  const pressK = 1 - Math.exp(-16 / pressDuration);
  press += (pressTarget - press) * pressK;
  if (pressTarget >= 1 && press > 0.92) pressTarget = 0;
  if (Math.abs(press - pressTarget) < 0.008) press = pressTarget;
  else hoverAnimating = true;

  for (let index = 0; index < items.length; index += 1) {
    const el = items[index];
    const posOffset = index - progress;
    const x = vertical ? x0 : x0 + posOffset * spacing;
    const y = vertical ? y0 + posOffset * spacing : y0;
    const targetFocus = pinActive ? index - current : posOffset;
    if (pinActive) {
      focuses[index] += (targetFocus - focuses[index]) * liftK;
      if (Math.abs(focuses[index] - targetFocus) < 0.002) focuses[index] = targetFocus;
      else hoverAnimating = true;
    } else {
      focuses[index] = posOffset;
    }
    const focus = focuses[index];
    const targetLift = index === hoveredIndex && index !== current ? hoverLift : 0;
    const targetFollowX = index === hoveredIndex ? hoverAim.x * hoverFollow : 0;
    const targetFollowY = index === hoveredIndex ? hoverAim.y * hoverFollow : 0;
    lifts[index] += (targetLift - lifts[index]) * liftK;
    follows[index].x += (targetFollowX - follows[index].x) * liftK;
    follows[index].y += (targetFollowY - follows[index].y) * liftK;
    if (Math.abs(lifts[index] - targetLift) < 0.15) lifts[index] = targetLift;
    else hoverAnimating = true;
    if (Math.abs(follows[index].x - targetFollowX) < 0.15) follows[index].x = targetFollowX;
    else hoverAnimating = true;
    if (Math.abs(follows[index].y - targetFollowY) < 0.15) follows[index].y = targetFollowY;
    else hoverAnimating = true;

    const hide = !fitAll && (!Number.isFinite(x) || !Number.isFinite(y) || (vertical
      ? y < -viewPad || y > view.height + viewPad
      : x < -viewPad || x > view.width + viewPad));
    if (hide) {
      el.style.visibility = "hidden";
      continue;
    }

    const rot = angle === 0 ? 0 : -Math.max(-1, Math.min(1, focus)) * angle;
    const pressAmt = index === current ? 1 - press * pressScale : 1;
    const shrinkK = !shrinkOn || index === current ? 1 : 1 - flatten * shrinkAmt;
    const keepZoomSize = index === current || index === hoveredIndex;
    const targetZoomK = !zoomShrinkOn || keepZoomSize ? 1 : 1 - zoomShrinkAmt * zoomFx;
    const kFollow = keepZoomSize ? liftK : zoomFollow;
    zoomKs[index] += (targetZoomK - zoomKs[index]) * kFollow;
    if (Math.abs(zoomKs[index] - targetZoomK) < 0.004) zoomKs[index] = targetZoomK;
    else hoverAnimating = true;
    const targetZoomBlur = !zoomBlurOn || keepZoomSize ? 0 : zoomBlurAmt * zoomFx;
    zoomBlurs[index] += (targetZoomBlur - zoomBlurs[index]) * kFollow;
    if (Math.abs(zoomBlurs[index] - targetZoomBlur) < 0.04) zoomBlurs[index] = targetZoomBlur;
    else hoverAnimating = true;
    const activeK = (index === current ? activeScale : 1) * pressAmt * shrinkK * zoomKs[index];
    const squashAlong = 1 - flatten * 0.72;
    const squashCross = 1 - flatten * 0.14;
    const squashX = vertical ? squashAlong : squashCross;
    const squashY = vertical ? squashCross : squashAlong;
    const tilt = vertical ? `rotateX(${rot}deg)` : `rotateY(${rot}deg)`;
    el.style.visibility = "visible";
    el.style.transform = `translate3d(${x}px, ${y}px, 0) perspective(520px) ${tilt} scale(${squashX}, ${squashY})`;
    el.style.zIndex = String(Math.round((index === current ? 4000 : 1000) - Math.abs(focus) * 20));
    const body = el.querySelector(".module__body");
    if (body) {
      body.style.transform = `translate3d(${follows[index].x}px, ${-lifts[index] + follows[index].y}px, 0) scale(${activeK})`;
    }
    const cover = el.querySelector(".module__cover");
    if (cover) {
      const scrollBlurPx = !blurOn || index === current ? 0 : flatten * blurAmt;
      const blurPx = Math.max(scrollBlurPx, zoomBlurs[index] || 0);
      cover.style.filter = blurPx > 0.04 ? `blur(${blurPx}px)` : "";
    }
  }

  const prevActive = modules.querySelector(".module--active");
  const nextActive = items[current];
  if (prevActive !== nextActive) {
    if (prevActive) {
      prevActive.classList.remove("module--active");
      prevActive.removeAttribute("aria-current");
    }
    if (nextActive) {
      nextActive.classList.add("module--active");
      nextActive.setAttribute("aria-current", "true");
    }
  }
  syncPlayingClass();

  if ((hoverAnimating || zoomFxMoving) && !physicsRunning && !snapping && !zoomAnimating) {
    cancelAnimationFrame(squashFrame);
    squashFrame = requestAnimationFrame(applyRotations);
  }
}

function updateSquash() {
  const intensity = clamp(loadState().squash, 0, 100, DEFAULTS.squash) / 100;
  const cap = Math.max(40, moduleStep()) * 3;
  const target = Math.min(1, Math.abs(velocity) / Math.max(cap * 0.45, 1));
  squashForce += (target - squashForce) * (target > squashForce ? 0.4 : 0.14);
  if (squashForce < 0.003 && target < 0.003) squashForce = 0;

  const flatten = squashForce * intensity;
  cancelAnimationFrame(squashFrame);
  if (squashForce > 0 && !physicsRunning && !snapping) {
    squashFrame = requestAnimationFrame(applyRotations);
  }

  return flatten;
}

function moduleStep() {
  return scrollStep();
}

function scrollSettings() {
  const state = loadState();
  return {
    sensitivity: clamp(state.sensitivity, 10, 200, DEFAULTS.sensitivity),
    inertia: clamp(state.inertia, 0, 100, DEFAULTS.inertia),
    threshold: clamp(state.threshold, 10, 90, DEFAULTS.threshold),
  };
}

function scrollForIndex(index) {
  return index * scrollStep();
}

function maxScroll() {
  const last = Math.max(0, modules.children.length - 1);
  return last * scrollStep();
}

function clampScroll(value) {
  return Math.min(maxScroll(), Math.max(0, value));
}

function stopPhysics() {
  velocity = 0;
  physicsRunning = false;
  cancelAnimationFrame(physicsFrame);
}

function settleAfterInertia() {
  const nearest = closestIndex();
  const { threshold } = scrollSettings();
  const step = Math.max(1, moduleStep());
  const traveled = Math.abs(stripScroll() - scrollForIndex(gestureStartIndex));

  if (traveled < step * (threshold / 100)) {
    goToModule(gestureStartIndex, isTrackPlaying());
    return;
  }

  goToModule(nearest, isTrackPlaying());
}

function physicsTick(now) {
  if (!carouselCanScroll()) {
    stopPhysics();
    return;
  }
  const elapsed = lastPhysicsTime ? now - lastPhysicsTime : 16.67;
  const dt = Math.min(32, elapsed) / 16.67;
  lastPhysicsTime = now;

  const { inertia } = scrollSettings();
  const friction = isVerticalStrip() ? 0.935 : 0.82 + (inertia / 100) * 0.15;
  const cap = Math.max(40, moduleStep()) * 3;

  velocity = Math.max(-cap, Math.min(cap, velocity));
  setStripScroll(stripScroll() + velocity * dt);

  if (stripScroll() <= 0 && velocity < 0) velocity = 0;
  if (stripScroll() >= maxScroll() && velocity > 0) velocity = 0;

  velocity *= friction ** dt;
  applyRotations();

  if (Math.abs(velocity) < (isVerticalStrip() ? 0.55 : 0.3)) {
    stopPhysics();
    settleAfterInertia();
    return;
  }

  physicsFrame = requestAnimationFrame(physicsTick);
}

function addScrollImpulse(px, raw = false) {
  if (!px || !carouselCanScroll()) return;

  const { sensitivity } = scrollSettings();
  const impulse = (raw || isVerticalStrip()) ? px : px * (sensitivity / 80) * 0.18;

  cancelAnimationFrame(scrollAnim);
  snapping = false;

  if (!physicsRunning) {
    gestureStartIndex = closestIndex();
  } else if (Math.sign(impulse) !== 0 && Math.sign(impulse) !== Math.sign(velocity)) {
    gestureStartIndex = closestIndex();
  }

  velocity += impulse;

  if (physicsRunning) return;

  setStripScroll(stripScroll() + velocity);
  applyRotations();
  physicsRunning = true;
  lastPhysicsTime = performance.now();
  physicsFrame = requestAnimationFrame(physicsTick);
}

function closestIndex() {
  const last = Math.max(0, modules.children.length - 1);
  return Math.min(last, Math.max(0, Math.round(scrollProgress())));
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function centerActive(behavior = "smooth", play = false) {
  if (!carouselCanScroll()) {
    if (play) startActiveTrack();
    else syncPlayingClass();
    return;
  }

  const last = modules.children.length - 1;
  if (last < 0) return;

  const target = scrollForIndex(activeIndex);
  const start = stripScroll();
  const distance = target - start;

  cancelAnimationFrame(scrollAnim);

  if (Math.abs(distance) < 1 || behavior !== "smooth") {
    setStripScroll(target);
    applyRotations();
    snapping = false;
    if (play) startActiveTrack();
    else syncPlayingClass();
    return;
  }

  snapping = true;
  const duration = 620;
  const started = performance.now();

  const step = (now) => {
    const t = Math.min(1, (now - started) / duration);
    setStripScroll(start + distance * easeOutCubic(t));
    applyRotations();

    if (t < 1) {
      scrollAnim = requestAnimationFrame(step);
      return;
    }

    snapping = false;
    if (play) startActiveTrack();
    else syncPlayingClass();
  };

  scrollAnim = requestAnimationFrame(step);
}

function goToModule(index, play = true) {
  const last = modules.children.length - 1;
  if (last < 0) return;

  stopPhysics();
  const next = Math.min(Math.max(0, index), last);
  const switched = next !== activeIndex;
  if (play) vizHoldPlaying = true;
  activeIndex = next;
  if (switched) applyVizBackground();

  if (lockedActive || !carouselCanScroll()) {
    lockedActive = true;
    applyRotations();
    if (play) startActiveTrack();
    return;
  }

  centerActive("smooth", play);
}

function setInput(el, value) {
  if (el) el.value = String(value);
}

function syncControls() {
  const state = snapshotParams();

  setInput(countInput, state.count);
  setInput(countRange, state.count);
  setInput(sizeInput, state.size);
  setInput(sizeRange, state.size);
  setInput(gapInput, state.gap);
  setInput(gapRange, state.gap);
  setInput(angleInput, state.angle);
  setInput(angleRange, state.angle);
  setInput(sensitivityInput, state.sensitivity);
  setInput(sensitivityRange, state.sensitivity);
  setInput(inertiaInput, state.inertia);
  setInput(inertiaRange, state.inertia);
  setInput(thresholdInput, state.threshold);
  setInput(thresholdRange, state.threshold);
  setInput(squashInput, state.squash);
  setInput(squashRange, state.squash);
  if (shrinkOnInput) shrinkOnInput.checked = Boolean(state.scrollShrinkOn);
  setInput(shrinkInput, state.scrollShrink);
  setInput(shrinkRange, state.scrollShrink);
  if (gapBoostOnInput) gapBoostOnInput.checked = Boolean(state.scrollGapOn);
  setInput(gapBoostInput, state.scrollGap);
  setInput(gapBoostRange, state.scrollGap);
  if (blurOnInput) blurOnInput.checked = Boolean(state.scrollBlurOn);
  setInput(blurInput, state.scrollBlur);
  setInput(blurRange, state.scrollBlur);
  const zoom = zoomValue();
  setInput(zoomInput, zoom);
  setInput(zoomRange, zoom);
  setInput(zoomDurationInput, state.zoomDuration);
  setInput(zoomDurationRange, state.zoomDuration);
  setInput(zoomInertiaInput, state.zoomInertia);
  setInput(zoomInertiaRange, state.zoomInertia);
  if (zoomShrinkOnInput) zoomShrinkOnInput.checked = Boolean(state.zoomShrinkOn);
  setInput(zoomShrinkInput, state.zoomShrink);
  setInput(zoomShrinkRange, state.zoomShrink);
  if (zoomBlurOnInput) zoomBlurOnInput.checked = Boolean(state.zoomBlurOn);
  setInput(zoomBlurInput, state.zoomBlur);
  setInput(zoomBlurRange, state.zoomBlur);
  setInput(activeScaleInput, state.activeScale);
  setInput(activeScaleRange, state.activeScale);
  setInput(pressScaleInput, state.pressScale);
  setInput(pressScaleRange, state.pressScale);
  setInput(pressDurationInput, state.pressDuration);
  setInput(pressDurationRange, state.pressDuration);
  setInput(hoverLiftInput, state.hoverLift);
  setInput(hoverLiftRange, state.hoverLift);
  setInput(hoverDurationInput, state.hoverDuration);
  setInput(hoverDurationRange, state.hoverDuration);
  setInput(hoverFollowInput, state.hoverFollow);
  setInput(hoverFollowRange, state.hoverFollow);
  setInput(shadowBlurInput, state.shadowBlur);
  setInput(shadowBlurRange, state.shadowBlur);
  setInput(shadowXInput, state.shadowX);
  setInput(shadowXRange, state.shadowX);
  setInput(shadowYInput, state.shadowY);
  setInput(shadowYRange, state.shadowY);
  setInput(shadowOpacityInput, state.shadowOpacity);
  setInput(shadowOpacityRange, state.shadowOpacity);
  if (spotifyInput && document.activeElement !== spotifyInput) {
    spotifyInput.value = state.spotifyUrl || "";
  }
  if (vizBgOnInput) vizBgOnInput.checked = Boolean(state.vizBgOn);
  if (vizBgModeInput) {
    vizBgModeInput.value = vizBgModeOf(state);
    vizBgModeInput.disabled = !state.vizBgOn;
  }
  if (vizBgColorPickInput) {
    vizBgColorPickInput.value = vizBgColorPickOf(state);
    vizBgColorPickInput.disabled = !state.vizBgOn;
  }
  setInput(vizBgFadeInput, state.vizBgFade);
  setInput(vizBgFadeRange, state.vizBgFade);
  setInput(vizBgBlurInput, state.vizBgBlur);
  setInput(vizBgBlurRange, state.vizBgBlur);
  setInput(vizLidarDensityInput, state.vizLidarDensity);
  setInput(vizLidarDensityRange, state.vizLidarDensity);
  setInput(vizLidarDepthInput, state.vizLidarDepth);
  setInput(vizLidarDepthRange, state.vizLidarDepth);
  setInput(vizLidarReactInput, state.vizLidarReact);
  setInput(vizLidarReactRange, state.vizLidarReact);
  setInput(vizLidarSizeInput, state.vizLidarSize);
  setInput(vizLidarSizeRange, state.vizLidarSize);
  setInput(vizLidarScaleInput, state.vizLidarScale);
  setInput(vizLidarScaleRange, state.vizLidarScale);
  if (vizLidarSpinInput) vizLidarSpinInput.checked = state.vizLidarSpin !== false;
  setInput(vizLidarYawInput, state.vizLidarYaw);
  setInput(vizLidarYawRange, state.vizLidarYaw);
  if (vizLidarCoverBgInput) vizLidarCoverBgInput.checked = Boolean(state.vizLidarCoverBg);
  if (vizLidarGlowOnInput) vizLidarGlowOnInput.checked = Boolean(state.vizLidarGlowOn);
  setInput(vizLidarGlowInput, state.vizLidarGlow);
  setInput(vizLidarGlowRange, state.vizLidarGlow);
  if (vizLidarLasersInput) vizLidarLasersInput.checked = Boolean(state.vizLidarLasers);
  LIDAR_AUDIO_FLAGS.forEach(([key, fallback]) => {
    const el = document.getElementById(key);
    if (el) el.checked = fallback ? state[key] !== false : Boolean(state[key]);
  });
  syncVizModeRows(state);
  setParamsTab(loadState().paramsTab === "viz" ? "viz" : "stand", false);
  applyVizBackground();
}

function renderModules() {
  const state = loadState();
  const tracks = playlistTracks.slice(0, COUNT_MAX);
  const count = tracks.length
    ? tracks.length
    : clamp(state.count, 1, COUNT_MAX, DEFAULTS.count);

  stopPhysics();
  hoveredIndex = -1;
  hoverAim = { x: 0, y: 0 };
  lifts = [];
  follows = [];
  focuses = [];
  zoomKs = [];
  zoomBlurs = [];
  press = 0;
  pressTarget = 0;
  document.documentElement.classList.remove("is-module-hover");

  modules.replaceChildren(
    ...Array.from({ length: count }, (_, index) => {
      const module = document.createElement("div");
      const track = tracks[index];
      module.className = "module";
      module.dataset.index = String(index);
      const body = document.createElement("div");
      body.className = "module__body";
      const cover = document.createElement("div");
      cover.className = "module__cover";
      if (track?.cover) cover.style.backgroundImage = `url("${track.cover}")`;
      body.append(cover);
      if (track) {
        module.dataset.trackId = track.id;
      }
      module.append(body);
      module.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "mouse") return;
        hoveredIndex = index;
        hoverAim = hoverAimFromEvent(module, event);
        document.documentElement.classList.add("is-module-hover");
        playHoverClick();
        applyRotations();
      });
      module.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        hoveredIndex = index;
        hoverAim = hoverAimFromEvent(module, event);
        document.documentElement.classList.add("is-module-hover");
        if (!physicsRunning && !snapping) {
          cancelAnimationFrame(squashFrame);
          squashFrame = requestAnimationFrame(applyRotations);
        }
      });
      module.addEventListener("pointerleave", () => {
        if (hoveredIndex !== index) return;
        hoveredIndex = -1;
        hoverAim = { x: 0, y: 0 };
        document.documentElement.classList.remove("is-module-hover");
        applyRotations();
      });
      return module;
    })
  );

  layoutTrack();
  saveState(snapshotParams());
  try {
    syncControls();
  } catch (error) {
    console.error(error);
  }

  activeIndex = Math.min(activeIndex, Math.max(0, count - 1));
  syncPlayingClass();
  requestAnimationFrame(() => {
    applyRotations();
    centerActive("auto");
  });
}

function bindParam(numberEl, rangeEl, key, min, max, fallback, onChange) {
  if (!numberEl || !rangeEl) return;

  const apply = (raw, force) => {
    if (!force && raw === "") return;
    const value = clamp(raw, min, max, fallback);
    saveState({ [key]: value });
    numberEl.value = String(value);
    rangeEl.value = String(value);
    onChange();
  };

  numberEl.addEventListener("input", () => apply(numberEl.value, false));
  rangeEl.addEventListener("input", () => apply(rangeEl.value, true));
  numberEl.addEventListener("change", () => apply(numberEl.value, true));
}

bindParam(countInput, countRange, "count", 1, COUNT_MAX, DEFAULTS.count, renderModules);
bindParam(sizeInput, sizeRange, "size", 16, 240, DEFAULTS.size, () => {
  layoutTrack();
  applyRotations();
  centerActive("auto");
});
bindParam(gapInput, gapRange, "gap", -1000, 120, DEFAULTS.gap, () => {
  layoutTrack();
  centerActive("auto");
});
bindParam(angleInput, angleRange, "angle", -90, 90, DEFAULTS.angle, applyRotations);
bindParam(sensitivityInput, sensitivityRange, "sensitivity", 10, 200, DEFAULTS.sensitivity, () => {});
bindParam(inertiaInput, inertiaRange, "inertia", 0, 100, DEFAULTS.inertia, () => {});
bindParam(thresholdInput, thresholdRange, "threshold", 10, 90, DEFAULTS.threshold, () => {});
bindParam(squashInput, squashRange, "squash", 0, 100, DEFAULTS.squash, applyRotations);
bindParam(shrinkInput, shrinkRange, "scrollShrink", 0, 50, DEFAULTS.scrollShrink, applyRotations);
if (shrinkOnInput) {
  shrinkOnInput.addEventListener("change", () => {
    saveState({ scrollShrinkOn: shrinkOnInput.checked });
    applyRotations();
  });
}
bindParam(gapBoostInput, gapBoostRange, "scrollGap", 0, 1000, DEFAULTS.scrollGap, applyRotations);
if (gapBoostOnInput) {
  gapBoostOnInput.addEventListener("change", () => {
    saveState({ scrollGapOn: gapBoostOnInput.checked });
    applyRotations();
  });
}
bindParam(blurInput, blurRange, "scrollBlur", 0, 24, DEFAULTS.scrollBlur, applyRotations);
if (blurOnInput) {
  blurOnInput.addEventListener("change", () => {
    saveState({ scrollBlurOn: blurOnInput.checked });
    applyRotations();
  });
}

function bindZoomToggle() {
  const snap = (raw) => {
    const { min, max } = zoomBounds();
    if (min >= max) {
      setZoomedOut(false);
      return;
    }
    setZoomedOut(Number(raw) < max);
  };
  zoomRange?.addEventListener("input", () => snap(zoomRange.value));
  zoomInput?.addEventListener("change", () => snap(zoomInput.value));
}

bindZoomToggle();
bindParam(zoomDurationInput, zoomDurationRange, "zoomDuration", 80, 800, DEFAULTS.zoomDuration, () => {});
bindParam(zoomInertiaInput, zoomInertiaRange, "zoomInertia", 0, 100, DEFAULTS.zoomInertia, () => {});
bindParam(zoomShrinkInput, zoomShrinkRange, "zoomShrink", 0, 50, DEFAULTS.zoomShrink, applyRotations);
if (zoomShrinkOnInput) {
  zoomShrinkOnInput.addEventListener("change", () => {
    saveState({ zoomShrinkOn: zoomShrinkOnInput.checked });
    applyRotations();
  });
}
bindParam(zoomBlurInput, zoomBlurRange, "zoomBlur", 0, 24, DEFAULTS.zoomBlur, applyRotations);
if (zoomBlurOnInput) {
  zoomBlurOnInput.addEventListener("change", () => {
    saveState({ zoomBlurOn: zoomBlurOnInput.checked });
    applyRotations();
  });
}
bindParam(activeScaleInput, activeScaleRange, "activeScale", 100, 200, DEFAULTS.activeScale, applyRotations);
bindParam(pressScaleInput, pressScaleRange, "pressScale", 0, 20, DEFAULTS.pressScale, applyRotations);
bindParam(pressDurationInput, pressDurationRange, "pressDuration", 80, 800, DEFAULTS.pressDuration, applyRotations);
bindParam(hoverLiftInput, hoverLiftRange, "hoverLift", 0, 80, DEFAULTS.hoverLift, applyRotations);
bindParam(hoverDurationInput, hoverDurationRange, "hoverDuration", 80, 800, DEFAULTS.hoverDuration, applyRotations);
bindParam(hoverFollowInput, hoverFollowRange, "hoverFollow", 0, 40, DEFAULTS.hoverFollow, applyRotations);
bindParam(shadowBlurInput, shadowBlurRange, "shadowBlur", 0, 80, DEFAULTS.shadowBlur, layoutTrack);
bindParam(shadowXInput, shadowXRange, "shadowX", -40, 40, DEFAULTS.shadowX, layoutTrack);
bindParam(shadowYInput, shadowYRange, "shadowY", -40, 40, DEFAULTS.shadowY, layoutTrack);
bindParam(shadowOpacityInput, shadowOpacityRange, "shadowOpacity", 0, 100, DEFAULTS.shadowOpacity, layoutTrack);

function syncVizModeRows(state) {
  const src = state || loadState();
  const on = Boolean(src.vizBgOn);
  const mode = vizBgModeOf(src);
  if (vizBgModeInput) vizBgModeInput.disabled = !on;
  if (vizBgColorPickInput) vizBgColorPickInput.disabled = !on;
  if (vizBgColorPickRow) vizBgColorPickRow.hidden = !on || mode !== "cover";
  if (vizBgFadeRow) vizBgFadeRow.hidden = !on;
  if (vizBgBlurRow) vizBgBlurRow.hidden = !on || mode !== "coverBlur";
  if (vizLidarRows) vizLidarRows.hidden = !on || mode !== "lidar";
  if (vizLidarGlowParam) vizLidarGlowParam.hidden = !on || mode !== "lidar" || !src.vizLidarGlowOn;
}

function syncVizControls() {
  const on = Boolean(vizBgOnInput?.checked);
  saveState({
    vizBgOn: on,
    vizBgMode: vizBgModeOf({ vizBgMode: vizBgModeInput?.value }),
    vizBgColorPick: vizBgColorPickOf({ vizBgColorPick: vizBgColorPickInput?.value }),
  });
  syncVizModeRows();
  applyVizBackground();
}

if (vizBgOnInput) {
  vizBgOnInput.addEventListener("change", syncVizControls);
}
if (vizBgModeInput) {
  vizBgModeInput.addEventListener("change", syncVizControls);
}
if (vizBgColorPickInput) {
  vizBgColorPickInput.addEventListener("change", syncVizControls);
}
bindParam(vizBgFadeInput, vizBgFadeRange, "vizBgFade", 40, 2000, DEFAULTS.vizBgFade, () => {});
bindParam(vizBgBlurInput, vizBgBlurRange, "vizBgBlur", 0, 80, DEFAULTS.vizBgBlur, applyVizBackground);
bindParam(vizLidarDensityInput, vizLidarDensityRange, "vizLidarDensity", 20, 100, DEFAULTS.vizLidarDensity, applyVizBackground);
bindParam(vizLidarDepthInput, vizLidarDepthRange, "vizLidarDepth", 0, 100, DEFAULTS.vizLidarDepth, applyVizBackground);
bindParam(vizLidarReactInput, vizLidarReactRange, "vizLidarReact", 0, 100, DEFAULTS.vizLidarReact, applyVizBackground);
bindParam(vizLidarSizeInput, vizLidarSizeRange, "vizLidarSize", 1, 12, DEFAULTS.vizLidarSize, applyVizBackground);
bindParam(vizLidarScaleInput, vizLidarScaleRange, "vizLidarScale", 20, 250, DEFAULTS.vizLidarScale, applyVizBackground);
if (vizLidarSpinInput) {
  vizLidarSpinInput.addEventListener("change", () => {
    saveState({ vizLidarSpin: vizLidarSpinInput.checked });
    applyVizBackground();
  });
}
bindParam(vizLidarYawInput, vizLidarYawRange, "vizLidarYaw", 0, 360, DEFAULTS.vizLidarYaw, applyVizBackground);
if (vizLidarCoverBgInput) {
  vizLidarCoverBgInput.addEventListener("change", () => {
    saveState({ vizLidarCoverBg: vizLidarCoverBgInput.checked });
    applyVizBackground();
  });
}
if (vizLidarGlowOnInput) {
  vizLidarGlowOnInput.addEventListener("change", () => {
    saveState({ vizLidarGlowOn: vizLidarGlowOnInput.checked });
    syncVizModeRows();
    applyVizBackground();
  });
}
bindParam(vizLidarGlowInput, vizLidarGlowRange, "vizLidarGlow", 0, 100, DEFAULTS.vizLidarGlow, applyVizBackground);
if (vizLidarLasersInput) {
  vizLidarLasersInput.addEventListener("change", () => {
    saveState({ vizLidarLasers: vizLidarLasersInput.checked });
    applyVizBackground();
  });
}
LIDAR_AUDIO_FLAGS.forEach(([key]) => {
  const el = document.getElementById(key);
  if (!el) return;
  el.addEventListener("change", () => {
    saveState({ [key]: el.checked });
    applyVizBackground();
  });
});

function snapshotParams(state) {
  const src = state && typeof state === "object" ? state : loadState();
  return {
    count: clamp(src.count, 1, COUNT_MAX, DEFAULTS.count),
    size: clamp(src.size, 16, 240, DEFAULTS.size),
    gap: clamp(src.gap, -1000, 120, DEFAULTS.gap),
    angle: clamp(src.angle, -90, 90, DEFAULTS.angle),
    sensitivity: clamp(src.sensitivity, 10, 200, DEFAULTS.sensitivity),
    inertia: clamp(src.inertia, 0, 100, DEFAULTS.inertia),
    threshold: clamp(src.threshold, 10, 90, DEFAULTS.threshold),
    squash: clamp(src.squash, 0, 100, DEFAULTS.squash),
    scrollShrinkOn: Boolean(src.scrollShrinkOn),
    scrollShrink: clamp(src.scrollShrink, 0, 50, DEFAULTS.scrollShrink),
    scrollGapOn: Boolean(src.scrollGapOn),
    scrollGap: clamp(src.scrollGap, 0, 1000, DEFAULTS.scrollGap),
    scrollBlurOn: Boolean(src.scrollBlurOn),
    scrollBlur: clamp(src.scrollBlur, 0, 24, DEFAULTS.scrollBlur),
    zoomOut: typeof src.zoomOut === "boolean" ? Boolean(src.zoomOut) : Number(src.zoom) < DEFAULTS.zoom,
    zoom: DEFAULTS.zoom,
    zoomDuration: clamp(src.zoomDuration, 80, 800, DEFAULTS.zoomDuration),
    zoomInertia: clamp(src.zoomInertia, 0, 100, DEFAULTS.zoomInertia),
    zoomShrinkOn: Boolean(src.zoomShrinkOn),
    zoomShrink: clamp(src.zoomShrink, 0, 50, DEFAULTS.zoomShrink),
    zoomBlurOn: Boolean(src.zoomBlurOn),
    zoomBlur: clamp(src.zoomBlur, 0, 24, DEFAULTS.zoomBlur),
    activeScale: clamp(src.activeScale, 100, 200, DEFAULTS.activeScale),
    pressScale: clamp(src.pressScale, 0, 20, DEFAULTS.pressScale),
    pressDuration: clamp(src.pressDuration, 80, 800, DEFAULTS.pressDuration),
    hoverLift: clamp(src.hoverLift, 0, 80, DEFAULTS.hoverLift),
    hoverDuration: clamp(src.hoverDuration, 80, 800, DEFAULTS.hoverDuration),
    hoverFollow: clamp(src.hoverFollow, 0, 40, DEFAULTS.hoverFollow),
    shadowBlur: clamp(src.shadowBlur, 0, 80, DEFAULTS.shadowBlur),
    shadowX: clamp(src.shadowX, -40, 40, DEFAULTS.shadowX),
    shadowY: clamp(src.shadowY, -40, 40, DEFAULTS.shadowY),
    shadowOpacity: clamp(src.shadowOpacity, 0, 100, DEFAULTS.shadowOpacity),
    spotifyUrl: String(src.spotifyUrl || "").trim(),
    vizBgOn: Boolean(src.vizBgOn),
    vizBgMode: vizBgModeOf(src),
    vizBgColorPick: vizBgColorPickOf(src),
    vizBgFade: clamp(src.vizBgFade, 40, 2000, DEFAULTS.vizBgFade),
    vizBgBlur: clamp(src.vizBgBlur, 0, 80, DEFAULTS.vizBgBlur),
    vizLidarDensity: clamp(src.vizLidarDensity, 20, 100, DEFAULTS.vizLidarDensity),
    vizLidarDepth: clamp(src.vizLidarDepth, 0, 100, DEFAULTS.vizLidarDepth),
    vizLidarReact: clamp(src.vizLidarReact, 0, 100, DEFAULTS.vizLidarReact),
    vizLidarSize: clamp(src.vizLidarSize, 1, 12, DEFAULTS.vizLidarSize),
    vizLidarScale: clamp(src.vizLidarScale, 20, 250, DEFAULTS.vizLidarScale),
    vizLidarSpin: src.vizLidarSpin !== false,
    vizLidarYaw: clamp(src.vizLidarYaw, 0, 360, DEFAULTS.vizLidarYaw),
    vizLidarCoverBg: Boolean(src.vizLidarCoverBg),
    vizLidarGlowOn: Boolean(src.vizLidarGlowOn),
    vizLidarGlow: clamp(src.vizLidarGlow, 0, 100, DEFAULTS.vizLidarGlow),
    vizLidarLasers: Boolean(src.vizLidarLasers),
    vizLidarDensityAudio: Boolean(src.vizLidarDensityAudio),
    vizLidarDepthAudio: src.vizLidarDepthAudio !== false,
    vizLidarReactAudio: src.vizLidarReactAudio !== false,
    vizLidarYawAudio: Boolean(src.vizLidarYawAudio),
    vizLidarScaleAudio: src.vizLidarScaleAudio !== false,
    vizLidarSizeAudio: src.vizLidarSizeAudio !== false,
    vizLidarSpinAudio: src.vizLidarSpinAudio !== false,
    vizLidarCoverBgAudio: Boolean(src.vizLidarCoverBgAudio),
    vizLidarGlowAudio: Boolean(src.vizLidarGlowAudio),
    vizLidarLasersAudio: src.vizLidarLasersAudio !== false,
  };
}

function getPresets() {
  return loadPresetsState().presets;
}

function uniquePresetName(name, presets) {
  const taken = new Set(presets.map((preset) => preset.name));
  if (!taken.has(name)) return name;
  let index = 2;
  while (taken.has(`${name} ${index}`)) index += 1;
  return `${name} ${index}`;
}

function syncPresetUi() {
  if (!presetList) return;

  const { presets, selectedPresetId, defaultPresetId } = loadPresetsState();

  presetList.replaceChildren();

  presets.forEach((preset) => {
    const row = document.createElement("div");
    row.className = "preset-row";
    if (preset.id === selectedPresetId) row.classList.add("is-current");
    if (preset.id === defaultPresetId) row.classList.add("is-default");

    const star = document.createElement("button");
    star.type = "button";
    star.className = "preset-row__star";
    if (preset.id === defaultPresetId) star.classList.add("is-on");
    star.textContent = preset.id === defaultPresetId ? "★" : "☆";
    star.title = "Назначить пресетом по умолчанию";
    star.setAttribute("aria-label", "Назначить пресетом по умолчанию");
    star.setAttribute("aria-pressed", preset.id === defaultPresetId ? "true" : "false");
    star.addEventListener("click", (event) => {
      event.stopPropagation();
      const currentDefault = loadPresetsState().defaultPresetId;
      savePresetsState({ defaultPresetId: currentDefault === preset.id ? "" : preset.id });
      syncPresetUi();
    });

    const nameBtn = document.createElement("button");
    nameBtn.type = "button";
    nameBtn.className = "preset-row__name";
    nameBtn.textContent = preset.name;
    nameBtn.title = "Применить пресет";
    nameBtn.addEventListener("click", () => applyPreset(preset.id));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "preset-row__delete";
    remove.textContent = "×";
    remove.title = "Удалить";
    remove.setAttribute("aria-label", `Удалить пресет ${preset.name}`);
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      deletePreset(preset.id);
    });

    row.append(star, nameBtn, remove);
    presetList.append(row);
  });
}

function applyPreset(id) {
  const preset = getPresets().find((item) => item.id === id);
  if (!preset) return;

  saveState(preset.values);
  savePresetsState({ selectedPresetId: id });
  const url = String(preset.values?.spotifyUrl || "").trim();
  if (spotifyInput) spotifyInput.value = url;
  if (url) loadSpotifyPlaylist(url, { persist: false });
  else {
    clearPlaylist();
    renderModules();
  }
  syncPresetUi();
}

function saveCurrentPreset() {
  const { presets } = loadPresetsState();
  const typed = (presetName?.value || "").trim();
  const baseName = typed || presetName?.placeholder || `Пресет ${presets.length + 1}`;
  const name = uniquePresetName(baseName, presets);
  const id = `p-${Date.now()}`;

  savePresetsState({
    presets: [...presets, { id, name, values: snapshotParams() }],
    selectedPresetId: id,
  });

  if (presetName) presetName.value = "";
  syncPresetUi();
  const last = presetList?.lastElementChild;
  if (last) last.scrollIntoView({ block: "nearest" });
}

function deletePreset(id) {
  const state = loadPresetsState();
  savePresetsState({
    presets: state.presets.filter((preset) => preset.id !== id),
    selectedPresetId: state.selectedPresetId === id ? "" : state.selectedPresetId,
    defaultPresetId: state.defaultPresetId === id ? "" : state.defaultPresetId,
  });
  syncPresetUi();
}

function applyDefaultPreset() {
  const state = loadPresetsState();
  const preset = state.presets.find((item) => item.id === state.defaultPresetId);
  if (!preset) return false;
  saveState(preset.values);
  savePresetsState({ selectedPresetId: preset.id });
  return true;
}

if (presetSave) presetSave.addEventListener("click", saveCurrentPreset);
if (presetName) {
  presetName.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveCurrentPreset();
  });
}

modules.addEventListener("click", (event) => {
  if (suppressModuleClick) {
    suppressModuleClick = false;
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  const el = event.target.closest(".module");
  if (!el) return;

  const index = Number(el.dataset.index);
  if (!Number.isFinite(index)) return;
  audioAllowed = true;
  playClickSound("activate");

  if (index === activeIndex) {
    pressTarget = 1;
    toggleActiveTrack();
    applyRotations();
    return;
  }
  goToModule(index);
});

window.addEventListener(
  "wheel",
  (event) => {
    if (event.target.closest(".params-panel")) return;

    if (isVerticalStrip()) {
      event.preventDefault();
      audioAllowed = true;
      if (!carouselCanScroll()) return;
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      if (event.deltaMode === 2) delta *= canvas.clientHeight;
      addScrollImpulse(delta);
      return;
    }

    const pinch = event.ctrlKey || event.metaKey;
    const carousel = !pinch && inCarouselZone(event) && modules.children.length > 1;

    if (carousel) {
      event.preventDefault();
      audioAllowed = true;
      clickAudio();
      if (!carouselCanScroll()) return;
      let delta = event.deltaY + event.deltaX;
      if (event.deltaMode === 1) delta *= 16;
      if (event.deltaMode === 2) delta *= canvas.clientWidth;
      addScrollImpulse(delta);
      return;
    }

    event.preventDefault();
    let delta = event.deltaY;
    if (event.deltaMode === 1) delta *= 16;
    if (event.deltaMode === 2) delta *= 120;
    addZoomImpulse(delta);
  },
  { passive: false }
);

function stripAxisPos(event) {
  return isVerticalStrip() ? event.clientY : event.clientX;
}

function clearEmptyPress() {
  if (!emptyPressTimer) return;
  window.clearTimeout(emptyPressTimer);
  emptyPressTimer = 0;
}

function endStripPointer(event) {
  if (!stripPointer || event.pointerId !== stripPointer.id) return;
  const moved = stripPointer.moved;
  const vel = stripPointer.vel;
  stripPointer = null;
  clearEmptyPress();
  if (!moved) return;
  suppressModuleClick = true;
  window.setTimeout(() => {
    suppressModuleClick = false;
  }, 450);
  if (Math.abs(vel) > 0.8) addScrollImpulse(vel * 14);
  else settleAfterInertia();
}

document.addEventListener("pointerdown", (event) => {
  if (isVerticalStrip()) return;
  if (event.pointerType === "mouse") return;
  if (event.target.closest(".params-panel")) return;
  audioAllowed = true;
  if (event.isPrimary === false) return;

  const onModule = event.target.closest(".module");
  if (!onModule) {
    clearEmptyPress();
    emptyPressTimer = window.setTimeout(() => {
      emptyPressTimer = 0;
      stripPointer = null;
      togglePanel();
    }, 560);
  }

  if (!carouselCanScroll()) return;
  if (!onModule && !inCarouselZone(event)) return;

  stripPointer = {
    id: event.pointerId,
    start: stripAxisPos(event),
    scroll: stripScroll(),
    last: stripAxisPos(event),
    lastT: performance.now(),
    vel: 0,
    moved: false,
  };
  if (event.target instanceof Element) {
    try {
      event.target.setPointerCapture(event.pointerId);
    } catch {}
  }
});

document.addEventListener("pointermove", (event) => {
  if (isVerticalStrip()) return;
  if (!stripPointer || event.pointerId !== stripPointer.id) return;
  const pos = stripAxisPos(event);
  const delta = stripPointer.start - pos;
  if (!stripPointer.moved && Math.abs(delta) < 40) return;
  if (!stripPointer.moved) {
    stripPointer.moved = true;
    clearEmptyPress();
    gestureStartIndex = closestIndex();
    cancelAnimationFrame(scrollAnim);
    snapping = false;
    stopPhysics();
  }
  const now = performance.now();
  const dt = Math.max(8, now - stripPointer.lastT);
  stripPointer.vel = ((stripPointer.last - pos) * 16.67) / dt;
  stripPointer.last = pos;
  stripPointer.lastT = now;
  setStripScroll(stripPointer.scroll + delta);
  applyRotations();
});

document.addEventListener("pointerup", endStripPointer);
document.addEventListener("pointercancel", endStripPointer);

document.addEventListener(
  "touchstart",
  (event) => {
    if (!isVerticalStrip()) return;
    if (event.target.closest(".params-panel")) return;
    audioAllowed = true;
    if (event.touches.length !== 1) {
      touchStrip = null;
      return;
    }
    const touch = event.touches[0];
    const onModule = event.target.closest(".module");
    if (!onModule) {
      clearEmptyPress();
      emptyPressTimer = window.setTimeout(() => {
        emptyPressTimer = 0;
        touchStrip = null;
        togglePanel();
      }, 560);
    }
    if (!carouselCanScroll()) return;
    touchStrip = {
      y: touch.clientY,
      scroll: stripScroll(),
      moved: false,
      samples: [{ y: touch.clientY, t: performance.now() }],
    };
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (!isVerticalStrip() || !touchStrip || event.touches.length !== 1) return;
    const touch = event.touches[0];
    const dy = touchStrip.y - touch.clientY;
    if (!touchStrip.moved && Math.abs(dy) < 8) return;
    event.preventDefault();
    if (!touchStrip.moved) {
      touchStrip.moved = true;
      clearEmptyPress();
      gestureStartIndex = closestIndex();
      cancelAnimationFrame(scrollAnim);
      snapping = false;
      stopPhysics();
    }
    const now = performance.now();
    touchStrip.samples.push({ y: touch.clientY, t: now });
    while (touchStrip.samples.length > 1 && now - touchStrip.samples[0].t > 80) {
      touchStrip.samples.shift();
    }
    setStripScroll(touchStrip.scroll + dy);
    applyRotations();
  },
  { passive: false }
);

function endTouchStrip() {
  if (!touchStrip) return;
  const moved = touchStrip.moved;
  const samples = touchStrip.samples;
  touchStrip = null;
  clearEmptyPress();
  if (!moved) return;
  suppressModuleClick = true;
  window.setTimeout(() => {
    suppressModuleClick = false;
  }, 320);
  if (samples.length >= 2) {
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = Math.max(16, last.t - first.t);
    const vel = ((first.y - last.y) / dt) * 16.67;
    if (Math.abs(vel) > 1.1) {
      addScrollImpulse(vel, true);
      return;
    }
  }
  settleAfterInertia();
}

document.addEventListener("touchend", (event) => {
  if (event.touches.length) return;
  endTouchStrip();
});
document.addEventListener("touchcancel", endTouchStrip);

canvas.addEventListener("scroll", () => {
  if (zoomAnimating) return;
  if (!carouselCanScroll()) {
    centerCarouselStrip();
    applyRotations();
    return;
  }
  if (snapping || physicsRunning) return;
  applyRotations();
});

canvas.addEventListener("scrollend", () => {
  if (snapping || physicsRunning || !carouselCanScroll()) return;
  activeIndex = closestIndex();
  centerActive("smooth", isTrackPlaying());
});

function setSpotifyStatus(text, isError = false) {
  if (!spotifyStatus) return;
  spotifyStatus.textContent = text || "";
  spotifyStatus.classList.toggle("is-error", Boolean(isError && text));
}

function applyCover(index, url) {
  const cover = modules.children[index]?.querySelector(".module__cover");
  if (cover && url) cover.style.backgroundImage = `url("${url}")`;
  if (index === activeIndex) applyVizBackground();
}

function isTrackPlaying() {
  return Boolean(player.src) && !player.paused && !player.ended;
}

function rgbString(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

function sampleCoverPalette(image) {
  const size = 48;
  const board = document.createElement("canvas");
  board.width = size;
  board.height = size;
  const ctx = board.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { mix: "", dominant: "" };
  ctx.drawImage(image, 0, 0, size, size);
  let data;
  try {
    data = ctx.getImageData(0, 0, size, size).data;
  } catch {
    return { mix: "", dominant: "" };
  }

  let mixR = 0;
  let mixG = 0;
  let mixB = 0;
  let mixW = 0;
  const buckets = new Map();

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 140) continue;
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];
    const max = Math.max(pr, pg, pb);
    const min = Math.min(pr, pg, pb);
    const val = max / 255;
    if (val < 0.08 || val > 0.97) continue;
    const sat = max === 0 ? 0 : (max - min) / max;
    const mixWeight = 0.35 + sat * 1.4;
    mixR += pr * mixWeight;
    mixG += pg * mixWeight;
    mixB += pb * mixWeight;
    mixW += mixWeight;

    const key = ((pr >> 4) << 8) | ((pg >> 4) << 4) | (pb >> 4);
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { r: 0, g: 0, b: 0, w: 0 };
      buckets.set(key, bucket);
    }
    const dw = 1 + sat * 0.35;
    bucket.r += pr * dw;
    bucket.g += pg * dw;
    bucket.b += pb * dw;
    bucket.w += dw;
  }

  const mix = mixW >= 1
    ? rgbString(Math.round(mixR / mixW), Math.round(mixG / mixW), Math.round(mixB / mixW))
    : "";

  let best = null;
  buckets.forEach((bucket) => {
    if (!best || bucket.w > best.w) best = bucket;
  });
  const dominant = best && best.w >= 1
    ? rgbString(Math.round(best.r / best.w), Math.round(best.g / best.w), Math.round(best.b / best.w))
    : mix;

  return { mix, dominant };
}

function extractCoverPalette(url) {
  if (!url) return Promise.resolve(null);
  if (coverColorCache.has(url)) return Promise.resolve(coverColorCache.get(url));
  if (coverColorPending.has(url)) return coverColorPending.get(url);

  const job = new Promise((resolve) => {
    const image = new Image();
    let usedProxy = false;
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      const palette = sampleCoverPalette(image);
      if (palette.mix || palette.dominant) coverColorCache.set(url, palette);
      coverColorPending.delete(url);
      resolve(coverColorCache.get(url) || palette);
    };
    image.onerror = () => {
      if (!usedProxy && isSpotifyCdnUrl(url)) {
        usedProxy = true;
        image.src = coverImageSrc(url, true);
        return;
      }
      coverColorPending.delete(url);
      resolve(null);
    };
    image.src = coverImageSrc(url);
  });
  coverColorPending.set(url, job);
  return job;
}

function cachedCoverRgb(url, method = "mix") {
  const palette = url ? coverColorCache.get(url) : null;
  if (!palette) return "";
  return palette[method] || palette.mix || "";
}

function vizBgModeOf(state) {
  const mode = state?.vizBgMode;
  if (mode === "coverBlur" || mode === "lidar") return mode;
  return "cover";
}

function vizBgColorPickOf(state) {
  return state?.vizBgColorPick === "dominant" ? "dominant" : "mix";
}

function parseColor(input) {
  const str = String(input || "").trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(str);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = `${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const rgb = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(str);
  if (rgb) {
    return {
      r: Math.max(0, Math.min(255, Number(rgb[1]))),
      g: Math.max(0, Math.min(255, Number(rgb[2]))),
      b: Math.max(0, Math.min(255, Number(rgb[3]))),
    };
  }
  return { r: 243, g: 242, b: 239 };
}

function colorsClose(a, b) {
  return Math.abs(a.r - b.r) < 0.7 && Math.abs(a.g - b.g) < 0.7 && Math.abs(a.b - b.b) < 0.7;
}

function paintStageRgb() {
  const color = `rgb(${Math.round(stageRgb.r)}, ${Math.round(stageRgb.g)}, ${Math.round(stageRgb.b)})`;
  document.documentElement.style.setProperty("--bg", color);
  document.documentElement.style.backgroundColor = color;
  document.body.style.backgroundColor = color;
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.setAttribute("content", color);
}

function tickStageRgb(now) {
  const dt = Math.min(32, now - (stageRgbTime || now)) / 1000;
  stageRgbTime = now;
  const tau = Math.max(0.02, clamp(loadState().vizBgFade, 40, 2000, DEFAULTS.vizBgFade) / 1000);
  const follow = 1 - Math.exp(-dt / tau);
  stageRgb.r += (stageRgbTarget.r - stageRgb.r) * follow;
  stageRgb.g += (stageRgbTarget.g - stageRgb.g) * follow;
  stageRgb.b += (stageRgbTarget.b - stageRgb.b) * follow;
  paintStageRgb();
  if (colorsClose(stageRgb, stageRgbTarget)) {
    stageRgb = { r: stageRgbTarget.r, g: stageRgbTarget.g, b: stageRgbTarget.b };
    paintStageRgb();
    stageRgbFrame = 0;
    return;
  }
  stageRgbFrame = requestAnimationFrame(tickStageRgb);
}

function setStageBackground(color) {
  const next = parseColor(color);
  if (!stageRgbReady) {
    stageRgbReady = true;
    stageRgb = { r: next.r, g: next.g, b: next.b };
    stageRgbTarget = { r: next.r, g: next.g, b: next.b };
    paintStageRgb();
    return;
  }
  if (colorsClose(next, stageRgbTarget)) return;
  stageRgbTarget = { r: next.r, g: next.g, b: next.b };
  if (!stageRgbFrame) {
    stageRgbTime = 0;
    stageRgbFrame = requestAnimationFrame(tickStageRgb);
  }
}

function playingCoverUrl() {
  const index = playingIndex();
  const track = index >= 0 ? playlistTracks[index] : null;
  return track?.cover || "";
}

function activeCoverUrl() {
  const track = playlistTracks[activeIndex];
  return track?.cover || "";
}

function applyCoverFill(url) {
  if (!url) {
    setStageBackground(STAGE_BG_PAUSE);
    return;
  }
  const method = vizBgColorPickOf(loadState());
  const cached = cachedCoverRgb(url, method);
  if (cached) {
    setStageBackground(cached);
    return;
  }
  extractCoverPalette(url).then((palette) => {
    const color = palette?.[method] || palette?.mix || "";
    if (!color) return;
    if (activeCoverUrl() !== url) return;
    const st = loadState();
    if (!st.vizBgOn || vizBgModeOf(st) !== "cover") return;
    if (vizBgColorPickOf(st) !== method) return;
    setStageBackground(color);
  });
}

function setVizCoverLayer(url, blurPx, visible) {
  document.documentElement.style.setProperty("--viz-blur", `${blurPx}px`);
  if (vizBgMedia && url) vizBgMedia.style.backgroundImage = `url("${url}")`;
  vizBg?.classList.toggle("is-visible", Boolean(visible && url));
}

const LIDAR_VS = `
attribute vec3 aPos;
attribute vec3 aColor;
attribute float aRand;
uniform float uTime;
uniform vec3 uAudio;
uniform vec2 uRes;
uniform float uDepth;
uniform float uReact;
uniform float uSize;
uniform float uScale;
uniform float uSpin;
uniform float uDrive;
uniform float uHit;
uniform float uGlow;
uniform float uFill;
uniform float uSizeAudio;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float drive = max(0.35, uDrive);
  float hit = uHit;
  float bass = uAudio.x * uReact * drive;
  float mid = uAudio.y * uReact * drive;
  float high = uAudio.z * uReact * drive;
  float energy = clamp((uAudio.x + uAudio.y + uAudio.z) * 0.42 * drive, 0.0, 2.0);
  vec3 n = normalize(aPos);
  float rad = 0.86 * uScale;
  float pulse = 1.0 + uDepth;
  vec3 p = n * rad * pulse;
  vec3 up = abs(n.y) > 0.94 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 tangent = normalize(cross(n, up));
  float streak = step(0.84, fract(aRand * 17.3 + floor(uTime * (9.0 + hit * 18.0)) * 0.07));
  p += tangent * streak * (bass * 0.35 + hit * 0.55) * (aRand * 1.2 - 0.15) * uScale;
  p += tangent * (aRand - 0.5) * (0.02 + high * 0.08) * uScale;
  p += n * sin(uTime * 1.9 + aRand * 28.0) * (0.008 + mid * 0.05 + hit * 0.08) * uScale;
  float c = cos(uSpin);
  float s = sin(uSpin);
  vec3 q = vec3(p.x * c - p.z * s, p.y, p.x * s + p.z * c);
  float z = q.z + 2.15;
  vec2 proj = q.xy * 1.72 / max(0.4, z);
  proj.x *= uRes.y / max(1.0, uRes.x);
  gl_Position = vec4(proj, 0.0, 1.0);
  float glowPt = step(0.78, aRand) * uGlow;
  float scan = 0.7 + 0.3 * sin(aPos.y * 42.0 + uTime * (8.0 + energy * 6.0));
  float keep = step(aRand, max(0.03, uFill));
  float sizeKick = 1.0 + (bass * 1.8 + hit * 2.2) * uSizeAudio;
  gl_PointSize = max(1.0, uSize * sizeKick * (1.0 + glowPt * (2.6 + energy * 2.4)) * (1.35 / max(0.5, z)) * (uRes.y / 900.0)) * keep;
  vColor = mix(aColor, vec3(1.0), 0.1 + high * 0.22 + glowPt * 0.55 + hit * 0.2);
  vAlpha = (0.34 + high * 0.5 + energy * 0.18 + glowPt * 0.85) * scan * keep;
}
`;

const LIDAR_FS = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float d = dot(uv, uv);
  if (d > 1.0) discard;
  float glow = exp(-d * 3.1);
  gl_FragColor = vec4(vColor * (0.65 + glow * 0.7), vAlpha * glow);
}
`;

const LASER_VS = `
attribute vec2 aUV;
uniform vec2 uOrigin;
uniform float uAngle;
uniform float uSpread;
uniform float uLen;
varying float vT;
varying float vSide;
void main() {
  float ang = uAngle + aUV.x * uSpread;
  vec2 dir = vec2(sin(ang), -cos(ang));
  vec2 pos = uOrigin + dir * aUV.y * uLen;
  gl_Position = vec4(pos, 0.0, 1.0);
  vT = aUV.y;
  vSide = abs(aUV.x);
}
`;

const LASER_FS = `
precision mediump float;
uniform vec3 uColor;
uniform float uAlpha;
varying float vT;
varying float vSide;
void main() {
  float core = 1.0 - smoothstep(0.0, 1.0, vSide);
  float fade = pow(1.0 - vT, 1.35);
  gl_FragColor = vec4(uColor, uAlpha * fade * (0.25 + core * 0.75));
}
`;

function isSpotifyCdnUrl(url) {
  try {
    const host = new URL(String(url || ""), window.location.href).hostname.toLowerCase();
    return (
      host === "scdn.co" ||
      host === "spotifycdn.com" ||
      host.endsWith(".scdn.co") ||
      host.endsWith(".spotifycdn.com") ||
      host.endsWith(".spotify.com") ||
      host.endsWith(".akamaized.net")
    );
  } catch {
    return false;
  }
}

function mediaUrl(url) {
  const raw = String(url || "");
  if (!raw) return raw;
  if (raw.startsWith("/api/") || raw.startsWith(window.location.origin) || isSpotifyCdnUrl(raw)) return raw;
  return `/api/audio?url=${encodeURIComponent(raw)}`;
}

function coverImageSrc(url, useProxy = false) {
  const raw = String(url || "");
  if (!raw) return "";
  if (useProxy || (!isSpotifyCdnUrl(raw) && !raw.startsWith("/api/"))) {
    return `/api/image?url=${encodeURIComponent(raw)}`;
  }
  return raw;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function ensureLidarGl() {
  if (lidarGl || !vizLidar) return lidarGl;
  const gl = vizLidar.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return null;
  const vs = compileShader(gl, gl.VERTEX_SHADER, LIDAR_VS);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, LIDAR_FS);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, "aPos");
  gl.bindAttribLocation(program, 1, "aColor");
  gl.bindAttribLocation(program, 2, "aRand");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    return null;
  }
  lidarGl = gl;
  lidarProgram = program;
  lidarBuffers = {
    pos: gl.createBuffer(),
    color: gl.createBuffer(),
    rand: gl.createBuffer(),
    loc: {
      time: gl.getUniformLocation(program, "uTime"),
      audio: gl.getUniformLocation(program, "uAudio"),
      res: gl.getUniformLocation(program, "uRes"),
      depth: gl.getUniformLocation(program, "uDepth"),
      react: gl.getUniformLocation(program, "uReact"),
      size: gl.getUniformLocation(program, "uSize"),
      scale: gl.getUniformLocation(program, "uScale"),
      spin: gl.getUniformLocation(program, "uSpin"),
      drive: gl.getUniformLocation(program, "uDrive"),
      hit: gl.getUniformLocation(program, "uHit"),
      glow: gl.getUniformLocation(program, "uGlow"),
      fill: gl.getUniformLocation(program, "uFill"),
      sizeAudio: gl.getUniformLocation(program, "uSizeAudio"),
    },
  };
  const laserVs = compileShader(gl, gl.VERTEX_SHADER, LASER_VS);
  const laserFs = compileShader(gl, gl.FRAGMENT_SHADER, LASER_FS);
  if (laserVs && laserFs) {
    const laserProg = gl.createProgram();
    gl.attachShader(laserProg, laserVs);
    gl.attachShader(laserProg, laserFs);
    gl.bindAttribLocation(laserProg, 0, "aUV");
    gl.linkProgram(laserProg);
    if (gl.getProgramParameter(laserProg, gl.LINK_STATUS)) {
      const laserBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, laserBuf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, -1, 1, 1, 1]), gl.STATIC_DRAW);
      lidarLaser = {
        program: laserProg,
        buf: laserBuf,
        loc: {
          origin: gl.getUniformLocation(laserProg, "uOrigin"),
          angle: gl.getUniformLocation(laserProg, "uAngle"),
          spread: gl.getUniformLocation(laserProg, "uSpread"),
          len: gl.getUniformLocation(laserProg, "uLen"),
          color: gl.getUniformLocation(laserProg, "uColor"),
          alpha: gl.getUniformLocation(laserProg, "uAlpha"),
        },
      };
    }
  }
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.disable(gl.DEPTH_TEST);
  resizeLidar();
  return gl;
}

function resizeLidar() {
  if (!vizLidar) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  vizLidar.width = Math.round(w * dpr);
  vizLidar.height = Math.round(h * dpr);
  if (lidarGl) lidarGl.viewport(0, 0, vizLidar.width, vizLidar.height);
}

function ensureAnalyser() {
  const ctx = clickAudio();
  if (!ctx) return null;
  if (!mediaNode) {
    try {
      mediaNode = ctx.createMediaElementSource(player);
      analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 512;
      analyserNode.smoothingTimeConstant = 0.52;
      mediaNode.connect(analyserNode);
      analyserNode.connect(ctx.destination);
      freqData = new Uint8Array(analyserNode.frequencyBinCount);
      timeData = new Uint8Array(analyserNode.fftSize);
    } catch (error) {
      console.warn(error);
    }
  }
  return analyserNode;
}

function readAudioBands() {
  const next = { bass: 0, mid: 0, high: 0, rms: 0 };
  if (!analyserNode || !freqData) return next;
  analyserNode.getByteFrequencyData(freqData);
  const n = freqData.length;
  const bN = Math.max(1, Math.floor(n * 0.09));
  const m1 = Math.floor(n * 0.36);
  let bass = 0;
  let mid = 0;
  let high = 0;
  for (let i = 0; i < bN; i += 1) bass += freqData[i];
  for (let i = bN; i < m1; i += 1) mid += freqData[i];
  for (let i = m1; i < n; i += 1) high += freqData[i];
  next.bass = Math.min(1, (bass / bN / 255) * 1.85);
  next.mid = Math.min(1, (mid / Math.max(1, m1 - bN) / 255) * 1.7);
  next.high = Math.min(1, (high / Math.max(1, n - m1) / 255) * 1.9);
  if (timeData) {
    analyserNode.getByteTimeDomainData(timeData);
    let sum = 0;
    for (let i = 0; i < timeData.length; i += 1) {
      const v = (timeData[i] - 128) / 128;
      sum += v * v;
    }
    next.rms = Math.min(1, Math.sqrt(sum / timeData.length) * 2.4);
  }
  return next;
}

function updateLidarDrive(bands) {
  const energy = Math.min(1, bands.bass * 0.4 + bands.mid * 0.28 + bands.high * 0.18 + bands.rms * 0.95);
  lidarEnergyAvg += (energy - lidarEnergyAvg) * 0.035;
  const relative = energy / Math.max(0.07, lidarEnergyAvg);
  const drive = Math.min(3.4, 0.55 + Math.pow(Math.max(0, relative), 1.45) * 1.35);
  const flux = Math.max(0, energy - lidarPrevEnergy);
  lidarPrevEnergy = energy;
  const hit = Math.min(1, lidarAudio.hit * 0.78 + flux * 7.5);
  return { energy, drive, hit, rms: bands.rms };
}

function sampleLidarMesh(image, density) {
  const tex = 128;
  const board = document.createElement("canvas");
  board.width = tex;
  board.height = tex;
  const ctx = board.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(image, 0, 0, tex, tex);
  const data = ctx.getImageData(0, 0, tex, tex).data;
  const count = Math.round(2400 + (density / 100) * 7200);
  const radius = 0.86;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const positions = [];
  const colors = [];
  const rands = [];
  for (let i = 0; i < count; i += 1) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * golden;
    const x = Math.cos(phi) * ring;
    const z = Math.sin(phi) * ring;
    const u = (Math.atan2(z, x) / (Math.PI * 2) + 1.5) % 1;
    const v = 0.5 - Math.asin(Math.max(-1, Math.min(1, y))) / Math.PI;
    const px = Math.min(tex - 1, Math.max(0, Math.floor(u * tex)));
    const py = Math.min(tex - 1, Math.max(0, Math.floor(v * tex)));
    const idx = (py * tex + px) * 4;
    const r = data[idx] / 255;
    const g = data[idx + 1] / 255;
    const b = data[idx + 2] / 255;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const lift = 0.12 * lum;
    positions.push(x * radius, y * radius, z * radius);
    colors.push(Math.min(1, r + lift), Math.min(1, g + lift), Math.min(1, b + lift));
    rands.push((i * 0.6180339887) % 1);
  }
  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    rands: new Float32Array(rands),
    count,
  };
}

function uploadLidarMesh(mesh) {
  const gl = ensureLidarGl();
  if (!gl || !mesh || !mesh.count) {
    lidarCount = 0;
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.pos);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.color);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.colors, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.rand);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.rands, gl.STATIC_DRAW);
  lidarCount = mesh.count;
}

function loadLidarCover(url, density) {
  if (!url) {
    lidarUrl = "";
    lidarCount = 0;
    return;
  }
  const key = `sphere:${url}:${Math.round(density / 5) * 5}`;
  if (key === lidarUrl && lidarCount) return;
  lidarUrl = key;
  const cached = lidarMeshCache.get(key);
  if (cached) {
    uploadLidarMesh(cached);
    return;
  }
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.decoding = "async";
  image.onload = () => {
    const mesh = sampleLidarMesh(image, density);
    if (mesh) lidarMeshCache.set(key, mesh);
    if (lidarUrl === key) uploadLidarMesh(mesh);
  };
  image.onerror = () => {
    if (isSpotifyCdnUrl(url) && !image.src.includes("/api/image")) {
      image.src = coverImageSrc(url, true);
    }
  };
  image.src = coverImageSrc(url);
}

function startLidarLoop() {
  if (!lidarFrame) lidarFrame = requestAnimationFrame(tickLidar);
}

function stopLidarLoopSoon() {
  clearTimeout(lidarStopTimer);
  lidarStopTimer = setTimeout(() => {
    if (!lidarWanted && lidarFrame) {
      cancelAnimationFrame(lidarFrame);
      lidarFrame = 0;
    }
  }, 800);
}

function mixTowardBlack(color, t) {
  const c = parseColor(color);
  const k = Math.max(0, Math.min(1, 1 - t));
  return rgbString(Math.round(c.r * k), Math.round(c.g * k), Math.round(c.b * k));
}

function applyLidarStageAudio(color, dim) {
  setStageBackground(mixTowardBlack(color, Math.max(0.35, Math.min(0.88, dim))));
}

function applyLidarStage(url, useCover) {
  if (!useCover || !url) {
    setStageBackground(STAGE_BG_LIDAR);
    return;
  }
  const cached = cachedCoverRgb(url, "mix");
  if (cached) {
    setStageBackground(mixTowardBlack(cached, 0.6));
    return;
  }
  setStageBackground(STAGE_BG_LIDAR);
  extractCoverPalette(url).then((palette) => {
    const color = palette?.mix || "";
    if (!color) return;
    if (!(isTrackPlaying() || vizHoldPlaying) || playingCoverUrl() !== url) return;
    const st = loadState();
    if (!st.vizBgOn || vizBgModeOf(st) !== "lidar" || !st.vizLidarCoverBg) return;
    setStageBackground(mixTowardBlack(color, 0.6));
  });
}

function drawLidarLasers(gl, state, now) {
  if (!state.vizLidarLasers || !lidarLaser) return;
  const live = state.vizLidarLasersAudio !== false;
  const energy = live ? lidarAudio.energy : 0.22;
  const hit = live ? lidarAudio.hit : 0;
  const t = (now - lidarStart) / 1000;
  const url = playingCoverUrl();
  const cached = cachedCoverRgb(url, "mix");
  let cr = 1;
  let cg = 0.9;
  let cb = 0.82;
  if (cached) {
    const c = parseColor(cached);
    cr = Math.min(1, c.r / 255 + 0.2);
    cg = Math.min(1, c.g / 255 + 0.2);
    cb = Math.min(1, c.b / 255 + 0.2);
  }
  gl.useProgram(lidarLaser.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, lidarLaser.buf);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const count = 8;
  for (let i = 0; i < count; i += 1) {
    const u = i / (count - 1) - 0.5;
    const wobble = Math.sin(t * (1.4 + i * 0.23) + i * 1.7) * (0.2 + energy * 0.75 + hit * 1.1);
    const angle = u * 1.28 + wobble;
    const spread = 0.01 + energy * 0.03 + hit * 0.055;
    const len = 2.2 + energy * 0.4;
    const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 3.4 + i * 0.85));
    const alpha = (0.06 + energy * 0.22 + hit * 0.4) * pulse;
    gl.uniform2f(lidarLaser.loc.origin, 0, 1.14);
    gl.uniform1f(lidarLaser.loc.angle, angle);
    gl.uniform1f(lidarLaser.loc.spread, spread);
    gl.uniform1f(lidarLaser.loc.len, len);
    gl.uniform3f(lidarLaser.loc.color, cr, cg, cb);
    gl.uniform1f(lidarLaser.loc.alpha, alpha);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

function tickLidar(now) {
  lidarFrame = 0;
  const gl = ensureLidarGl();
  if (!gl || !lidarProgram) return;
  if (lidarWanted || vizLidar?.classList.contains("is-visible")) {
    lidarFrame = requestAnimationFrame(tickLidar);
  }

  const bands = readAudioBands();
  const drive = updateLidarDrive(bands);
  lidarAudio.bass += (bands.bass - lidarAudio.bass) * 0.28;
  lidarAudio.mid += (bands.mid - lidarAudio.mid) * 0.24;
  lidarAudio.high += (bands.high - lidarAudio.high) * 0.26;
  lidarAudio.energy += (drive.energy - lidarAudio.energy) * 0.22;
  lidarAudio.drive += (drive.drive - lidarAudio.drive) * 0.16;
  lidarAudio.hit = drive.hit;
  lidarAudio.rms += (drive.rms - lidarAudio.rms) * 0.3;

  const state = loadState();
  const reactK = clamp(state.vizLidarReact, 0, 100, DEFAULTS.vizLidarReact) / 100;
  const scaleTarget = state.vizLidarScaleAudio !== false
    ? 1 +
      (lidarAudio.bass * 0.2 + lidarAudio.energy * 0.36 + lidarAudio.hit * 0.62) *
        (0.4 + reactK * 1.05) *
        Math.min(1.85, lidarAudio.drive)
    : 1;
  lidarScalePulse += (scaleTarget - lidarScalePulse) * (scaleTarget > lidarScalePulse ? 0.48 : 0.13);

  const dt = Math.min(0.05, (now - (lidarTickTime || now)) / 1000);
  lidarTickTime = now;
  if (state.vizLidarSpin !== false) {
    const spinSpeed = state.vizLidarSpinAudio !== false
      ? 0.08 + lidarAudio.bass * 0.38 + lidarAudio.hit * 0.9
      : 0.11;
    lidarSpin += dt * spinSpeed;
  }
  const yaw =
    (clamp(state.vizLidarYaw, 0, 360, DEFAULTS.vizLidarYaw) * Math.PI) / 180 +
    (state.vizLidarYawAudio ? lidarAudio.bass * 0.55 + lidarAudio.hit * 0.85 : 0);
  const depthBase = clamp(state.vizLidarDepth, 0, 100, DEFAULTS.vizLidarDepth) / 100;
  const depthLive = state.vizLidarDepthAudio !== false
    ? depthBase * (lidarAudio.bass * 0.28 + lidarAudio.energy * 0.12 + lidarAudio.hit * 0.2)
    : depthBase * 0.12;
  const fill = state.vizLidarDensityAudio
    ? Math.min(1, 0.22 + lidarAudio.energy * 0.7 + lidarAudio.hit * 0.28)
    : 1;
  let glow = state.vizLidarGlowOn ? clamp(state.vizLidarGlow, 0, 100, DEFAULTS.vizLidarGlow) / 100 : 0;
  if (glow && state.vizLidarGlowAudio) glow *= 0.22 + lidarAudio.energy * 0.7 + lidarAudio.hit * 0.85;
  const useDrive = state.vizLidarReactAudio !== false;
  if (state.vizLidarCoverBg && state.vizLidarCoverBgAudio) {
    const cover = playingCoverUrl();
    const cached = cachedCoverRgb(cover, "mix");
    if (cached) {
      applyLidarStageAudio(cached, 0.78 - lidarAudio.energy * 0.32 - lidarAudio.hit * 0.18);
    }
  }
  gl.viewport(0, 0, vizLidar.width, vizLidar.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  if (lidarCount) {
    gl.useProgram(lidarProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.pos);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.color);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lidarBuffers.rand);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0);
    gl.uniform1f(lidarBuffers.loc.time, (now - lidarStart) / 1000);
    gl.uniform3f(lidarBuffers.loc.audio, lidarAudio.bass, lidarAudio.mid, lidarAudio.high);
    gl.uniform2f(lidarBuffers.loc.res, vizLidar.width, vizLidar.height);
    gl.uniform1f(lidarBuffers.loc.depth, depthLive);
    gl.uniform1f(lidarBuffers.loc.react, reactK);
    gl.uniform1f(lidarBuffers.loc.size, clamp(state.vizLidarSize, 1, 12, DEFAULTS.vizLidarSize) * 1.8);
    gl.uniform1f(
      lidarBuffers.loc.scale,
      (clamp(state.vizLidarScale, 20, 250, DEFAULTS.vizLidarScale) / 100) * lidarScalePulse
    );
    gl.uniform1f(lidarBuffers.loc.spin, lidarSpin + yaw);
    gl.uniform1f(lidarBuffers.loc.drive, useDrive ? lidarAudio.drive : 1);
    gl.uniform1f(lidarBuffers.loc.hit, useDrive ? lidarAudio.hit : 0);
    gl.uniform1f(lidarBuffers.loc.glow, glow);
    gl.uniform1f(lidarBuffers.loc.fill, fill);
    gl.uniform1f(lidarBuffers.loc.sizeAudio, state.vizLidarSizeAudio !== false ? 1 : 0);
    gl.drawArrays(gl.POINTS, 0, lidarCount);
  }
  drawLidarLasers(gl, state, now);
}

function setLidarVisible(on, url) {
  lidarWanted = Boolean(on);
  vizLidar?.classList.toggle("is-visible", lidarWanted && Boolean(url));
  if (!lidarWanted) {
    stopLidarLoopSoon();
    return;
  }
  ensureAnalyser();
  const density = clamp(loadState().vizLidarDensity, 20, 100, DEFAULTS.vizLidarDensity);
  loadLidarCover(url, density);
  startLidarLoop();
}

function applyVizBackground() {
  const state = loadState();
  const mode = vizBgModeOf(state);
  const blurPx = clamp(state.vizBgBlur, 0, 80, DEFAULTS.vizBgBlur);
  const playing = isTrackPlaying() || vizHoldPlaying;

  if (!state.vizBgOn) {
    setStageBackground(STAGE_BG);
    setVizCoverLayer("", blurPx, false);
    setLidarVisible(false, "");
    return;
  }

  if (mode === "cover") {
    setLidarVisible(false, "");
    setVizCoverLayer("", blurPx, false);
    applyCoverFill(activeCoverUrl());
    return;
  }

  if (!playing) {
    setStageBackground(STAGE_BG_PAUSE);
    setVizCoverLayer(playingCoverUrl(), blurPx, false);
    setLidarVisible(false, playingCoverUrl());
    return;
  }

  const url = playingCoverUrl();

  if (mode === "lidar") {
    setVizCoverLayer("", blurPx, false);
    applyLidarStage(url, Boolean(state.vizLidarCoverBg));
    if (!url) {
      setLidarVisible(false, "");
      return;
    }
    if (!coverColorCache.has(url)) extractCoverPalette(url);
    setLidarVisible(true, url);
    return;
  }

  setLidarVisible(false, url);
  setStageBackground(STAGE_BG_PAUSE);
  if (!url) {
    setVizCoverLayer("", blurPx, false);
    return;
  }
  setVizCoverLayer(url, blurPx, true);
}

function syncPlayingClass() {
  const playing = isTrackPlaying();
  [...modules.children].forEach((el, index) => {
    el.classList.toggle("module--playing", playing && index === activeIndex);
  });
  applyVizBackground();
}

function playTrack(index) {
  const track = playlistTracks[index];
  if (!track) {
    vizHoldPlaying = false;
    syncPlayingClass();
    return;
  }
  if (!track.previewUrl) {
    vizHoldPlaying = false;
    player.pause();
    setSpotifyStatus(`Нет превью: ${track.title}`);
    syncPlayingClass();
    return;
  }

  if (player.dataset.trackId === track.id) {
    if (player.paused && audioAllowed) {
      ensureAnalyser();
      player.play()
        .then(() => {
          vizHoldPlaying = false;
          syncPlayingClass();
        })
        .catch((error) => {
          vizHoldPlaying = false;
          syncPlayingClass();
          setSpotifyStatus(error?.message || "Не удалось включить аудио", true);
        });
      return;
    }
    vizHoldPlaying = false;
    syncPlayingClass();
    return;
  }

  vizHoldPlaying = true;
  player.dataset.trackId = track.id;
  player.src = mediaUrl(track.previewUrl);
  if (!audioAllowed) {
    vizHoldPlaying = false;
    syncPlayingClass();
    return;
  }
  ensureAnalyser();
  player.play()
    .then(() => {
      vizHoldPlaying = false;
      syncPlayingClass();
    })
    .catch((error) => {
      vizHoldPlaying = false;
      syncPlayingClass();
      setSpotifyStatus(error?.message || "Не удалось включить аудио", true);
    });
}

function startActiveTrack() {
  if (!playlistTracks.length) {
    syncPlayingClass();
    return;
  }
  playTrack(activeIndex);
}

function toggleActiveTrack() {
  if (!playlistTracks.length) return;
  audioAllowed = true;
  const track = playlistTracks[activeIndex];
  if (!track) return;
  if (player.dataset.trackId !== track.id || !player.src) {
    startActiveTrack();
    return;
  }
  if (player.paused) {
    ensureAnalyser();
    player.play().then(syncPlayingClass).catch((error) => {
      syncPlayingClass();
      setSpotifyStatus(error?.message || "Не удалось включить аудио", true);
    });
    return;
  }
  player.pause();
  syncPlayingClass();
}

function stopPlayer() {
  vizHoldPlaying = false;
  player.pause();
  player.removeAttribute("src");
  delete player.dataset.trackId;
  try {
    player.load();
  } catch {}
  syncPlayingClass();
}

function clearPlaylist() {
  playlistTracks = [];
  playlistName = "";
  stopPlayer();
}

async function hydrateCovers() {
  const tracks = playlistTracks.slice();
  let cursor = 0;
  const worker = async () => {
    while (cursor < tracks.length) {
      const index = cursor;
      cursor += 1;
      const track = tracks[index];
      if (!track || track.cover) {
        if (track?.cover) applyCover(index, track.cover);
        continue;
      }
      try {
        const response = await fetch(
          `https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${track.id}`)}`
        );
        if (!response.ok) continue;
        const data = await response.json();
        if (data.thumbnail_url && playlistTracks[index] === track) {
          track.cover = data.thumbnail_url;
          applyCover(index, track.cover);
        }
      } catch {}
    }
  };
  await Promise.all(Array.from({ length: Math.min(6, tracks.length) }, worker));
}

let playlistLoadId = 0;

function playlistIdFromUrl(url) {
  const match = String(url || "").match(/(?:playlist\/|spotify:playlist:)([A-Za-z0-9]+)/i);
  return match ? match[1] : "";
}

function playlistCacheUrl(id) {
  const script = document.querySelector('script[src*="script.js"]');
  try {
    return new URL(`playlists/${id}.json`, script?.src || window.location.href).href;
  } catch {
    return `playlists/${id}.json`;
  }
}

async function fetchPlaylistPayload(url) {
  let apiError = "";
  try {
    const response = await fetch(`/api/spotify/playlist?url=${encodeURIComponent(url)}`);
    const text = await response.text();
    const trimmed = text.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      const data = JSON.parse(trimmed);
      if (response.ok && Array.isArray(data.tracks) && data.tracks.length) return data;
      apiError = data.error || "Не удалось загрузить плейлист";
    }
  } catch {}

  const id = playlistIdFromUrl(url);
  if (id) {
    const cached = await fetchJson(playlistCacheUrl(id));
    if (cached && Array.isArray(cached.tracks) && cached.tracks.length) return cached;
  }

  throw new Error(apiError || "Не удалось загрузить плейлист. Откройте http://127.0.0.1:5174/");
}

async function loadSpotifyPlaylist(url, { persist = true } = {}) {
  const trimmed = String(url || "").trim();
  if (!trimmed) {
    setSpotifyStatus("Вставьте ссылку на плейлист Spotify", true);
    return;
  }

  const requestId = (playlistLoadId += 1);
  if (spotifyLoad) spotifyLoad.disabled = true;
  setSpotifyStatus("Загружаю плейлист…");

  try {
    const data = await fetchPlaylistPayload(trimmed);
    if (requestId !== playlistLoadId) return;
    if (!data) throw new Error("Не удалось загрузить плейлист");

    playlistTracks = Array.isArray(data.tracks) ? data.tracks : [];
    playlistName = data.name || "";
    if (!playlistTracks.length) throw new Error("В плейлисте нет треков");

    if (persist) saveState({ spotifyUrl: trimmed, count: playlistTracks.length });
    else saveState({ count: playlistTracks.length });

    activeIndex = 0;
    stopPlayer();
    renderModules();
    setSpotifyStatus(`${playlistTracks.length} треков · ${playlistName}`);
    hydrateCovers();
  } catch (error) {
    if (requestId !== playlistLoadId) return;
    setSpotifyStatus(error.message || "Не удалось загрузить плейлист", true);
  } finally {
    if (requestId === playlistLoadId && spotifyLoad) spotifyLoad.disabled = false;
  }
}

player.addEventListener("play", syncPlayingClass);
player.addEventListener("pause", syncPlayingClass);
player.addEventListener("ended", syncPlayingClass);
player.addEventListener("error", () => {
  const track = playlistTracks[activeIndex];
  setSpotifyStatus(track ? `Не удалось включить: ${track.title}` : "Не удалось включить аудио", true);
});

if (spotifyLoad) {
  spotifyLoad.addEventListener("click", () => {
    audioAllowed = true;
    loadSpotifyPlaylist(spotifyInput?.value || "");
  });
}

if (spotifyInput) {
  spotifyInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    audioAllowed = true;
    loadSpotifyPlaylist(spotifyInput.value);
  });
}

async function boot() {
  await hydratePresets();
  loadPresetsState();

  try {
    applyDefaultPreset();
    syncPresetUi();
  } catch (error) {
    console.error(error);
  }

  const url = String(loadState().spotifyUrl || "").trim();
  if (spotifyInput) spotifyInput.value = url;
  renderModules();
  if (url) loadSpotifyPlaylist(url, { persist: false });

  if (loadState().open) {
    try {
      openPanel();
    } catch (error) {
      console.error(error);
    }
  }
}

boot();

window.addEventListener("load", () => {
  layoutTrack();
  applyRotations();
});
