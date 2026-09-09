const MIN = 100;
const MAX = 4000;
const PAD = 72;
const PANEL_RESERVE = 312;
const MIN_CONTENT = 48;
const VIEW_MAX = 25;
const BOARD_GAP_X = 28;
const BOARD_GAP_Y = 24;

const WEIGHT_NAMES = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semibold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
};

const FONTS = [
  { family: "Inter", weights: [400, 500, 600, 700, 800] },
  { family: "Montserrat", weights: [400, 500, 600, 700, 800] },
  { family: "Poppins", weights: [400, 500, 600, 700] },
  { family: "Oswald", weights: [400, 500, 600, 700] },
  { family: "Anton", weights: [400] },
  { family: "Bebas Neue", weights: [400] },
  { family: "Russo One", weights: [400] },
  { family: "Unbounded", weights: [400, 500, 700] },
  { family: "Outfit", weights: [400, 500, 600, 700] },
  { family: "Space Grotesk", weights: [400, 500, 600, 700] },
  { family: "Playfair Display", weights: [400, 600, 700] },
  { family: "Cinzel", weights: [400, 600, 700] },
  { family: "Cormorant Garamond", weights: [400, 600, 700] },
  { family: "Abril Fatface", weights: [400] },
  { family: "Lora", weights: [400, 500, 600, 700] },
  { family: "Libre Baskerville", weights: [400, 700] },
  { family: "Great Vibes", weights: [400] },
  { family: "Goldman", weights: [400, 700] },
  { family: "Limelight", weights: [400] },
  { family: "IBM Plex Mono", weights: [400, 500, 600, 700] },
];

const STORAGE_KEY = "cover-constructor-v1";

const loadedFonts = new Set();

const state = {
  activeId: null,
  name: "",
  width: 190,
  height: 260,
  lockAspect: true,
  ratio: 190 / 260,
  inset: 16,
  guidesVisible: true,
  title: "",
  font: "Inter",
  weight: 700,
  titleSize: 24,
  fontMin: 12,
  fontMax: 80,
  lineHeight: 120,
  tracking: 0,
  textCase: "none",
  align: "center",
  valign: "middle",
  titleColor: "#ffffff",
  fillMode: false,
  fillChoice: null,
  editing: false,
  viewCount: 1,
  providerFilter: "",
};

const els = {
  stage: document.getElementById("stage"),
  wrap: document.getElementById("artboardWrap"),
  artboard: document.getElementById("artboard"),
  content: document.getElementById("content"),
  frame: document.getElementById("textFrame"),
  text: document.getElementById("textLayer"),
  fit: document.getElementById("textFit"),
  fillMode: document.getElementById("textModeTabs"),
  fillSuggestions: document.getElementById("fillSuggestions"),
  fillSuggestionList: document.getElementById("fillSuggestionList"),
  titleInput: document.getElementById("titleInput"),
  titleField: document.getElementById("titleField"),
  sizeField: document.getElementById("sizeField"),
  fontMinField: document.getElementById("fontMinField"),
  fontMaxField: document.getElementById("fontMaxField"),
  alignBlock: document.getElementById("alignBlock"),
  fontMin: document.getElementById("fontMinInput"),
  fontMax: document.getElementById("fontMaxInput"),
  label: document.getElementById("sizeLabel"),
  width: document.getElementById("widthInput"),
  height: document.getElementById("heightInput"),
  lock: document.getElementById("aspectLock"),
  hint: document.getElementById("ratioHint"),
  inset: document.getElementById("insetInput"),
  guides: document.getElementById("guides"),
  guidesToggle: document.getElementById("guidesToggle"),
  titleSize: document.getElementById("titleSizeInput"),
  lineHeight: document.getElementById("lineHeightInput"),
  tracking: document.getElementById("trackingInput"),
  titleColor: document.getElementById("titleColorInput"),
  fontButton: document.getElementById("fontButton"),
  fontButtonName: document.getElementById("fontButtonName"),
  weightSelect: document.getElementById("weightSelect"),
  fontMenu: document.getElementById("fontMenu"),
  fontSearch: document.getElementById("fontSearch"),
  fontList: document.getElementById("fontList"),
  caseGroup: document.getElementById("caseGroup"),
  alignGroup: document.getElementById("alignGroup"),
  valignGroup: document.getElementById("valignGroup"),
  coverGrid: document.getElementById("coverGrid"),
  coverName: document.getElementById("coverNameInput"),
  board: document.getElementById("board"),
  viewCount: document.getElementById("viewCountInput"),
  viewCountDown: document.getElementById("viewCountDown"),
  viewCountUp: document.getElementById("viewCountUp"),
  importTable: document.getElementById("importTable"),
  tableFile: document.getElementById("tableFile"),
  providerField: document.getElementById("providerField"),
  providerSelect: document.getElementById("providerSelect"),
  createCovers: document.getElementById("createCovers"),
  settingsTitle: document.getElementById("settingsTitle"),
  marquee: document.getElementById("marquee"),
};

function currentFont() {
  return FONTS.find((font) => font.family === state.font) || FONTS[0];
}

function loadFont(font) {
  if (loadedFonts.has(font.family)) return;
  loadedFonts.add(font.family);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${font.weights.join(";")}&display=swap`;
  link.addEventListener("load", () => {
    const sample = `${font.weights[0]} 48px "${font.family}"`;
    document.fonts.load(sample).then(() => {
      if (state.fillMode && !state.editing) renderFit();
      updateLibraryPreviews();
      updateBoardPreviews();
    });
  });
  document.head.appendChild(link);
}

function closestWeight(weights, weight) {
  return weights.reduce((best, value) =>
    Math.abs(value - weight) < Math.abs(best - weight) ? value : best,
  );
}

function clamp(value, min, max) {
  const n = Number.parseInt(String(value), 10);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function ratioLabel(width, height) {
  const d = gcd(width, height);
  return `${width / d} : ${height / d}`;
}

function rememberRatio() {
  state.ratio = state.width / state.height;
}

function maxInset() {
  return Math.max(
    0,
    Math.min(
      Math.floor((state.width - MIN_CONTENT) / 2),
      Math.floor((state.height - MIN_CONTENT) / 2),
    ),
  );
}

function clampInset() {
  state.inset = clamp(state.inset, 0, maxInset());
}

const HANGING = new Set([
  "в", "во", "на", "с", "со", "к", "ко", "у", "о", "об", "обо",
  "от", "до", "по", "из", "за", "над", "под", "при", "про",
  "для", "без", "через", "между", "перед", "около", "из-за", "из-под",
  "и", "а", "но", "да", "или", "либо", "ни", "не",
  "a", "an", "the", "of", "to", "in", "on", "at", "by", "for",
  "from", "with", "and", "or", "but", "as",
]);

const measureEl = document.createElement("span");
measureEl.setAttribute("aria-hidden", "true");
measureEl.style.cssText =
  "position:absolute;left:-9999px;top:0;white-space:nowrap;visibility:hidden;pointer-events:none;";
document.body.appendChild(measureEl);

function stripWord(word) {
  return word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLowerCase();
}

function isHanging(word) {
  return HANGING.has(stripWord(word));
}

function lastWord(token) {
  const parts = token.trim().split(/\s+/);
  return parts[parts.length - 1] || "";
}

function wordsOf(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function glueTokens(words) {
  const tokens = [];
  let index = 0;
  while (index < words.length) {
    const parts = [words[index]];
    while (index < words.length - 1 && isHanging(words[index])) {
      index += 1;
      parts.push(words[index]);
    }
    tokens.push(parts.join(" "));
    index += 1;
  }
  return tokens;
}

function fixHangingBreaks(lineTokens) {
  const lines = lineTokens.map((tokens) => tokens.slice());
  for (let i = 0; i < lines.length - 1; i += 1) {
    while (lines[i].length > 1 && isHanging(lastWord(lines[i][lines[i].length - 1]))) {
      lines[i + 1].unshift(lines[i].pop());
    }
  }
  return lines;
}

function caseCss() {
  if (state.textCase === "upper") return "uppercase";
  if (state.textCase === "lower") return "lowercase";
  return "none";
}

function clampFontRange() {
  state.fontMin = clamp(state.fontMin, 4, 400);
  state.fontMax = clamp(state.fontMax, 4, 400);
  if (state.fontMin > state.fontMax) state.fontMax = state.fontMin;
}

function measureLineWidth(text, fontSize) {
  measureEl.style.fontFamily = `"${state.font}", sans-serif`;
  measureEl.style.fontWeight = String(state.weight);
  measureEl.style.fontSize = `${fontSize}px`;
  measureEl.style.letterSpacing = `${state.tracking / 100}em`;
  measureEl.style.textTransform = caseCss();
  measureEl.textContent = text;
  return measureEl.getBoundingClientRect().width;
}

function fitUnclamped(text, maxWidth) {
  if (!text) return 0;
  const widthAt100 = measureLineWidth(text, 100);
  if (widthAt100 <= 0) return 0;
  return (maxWidth / widthAt100) * 100;
}

function fitLineSize(text, maxWidth) {
  if (!text) return 0;
  const fitted = fitUnclamped(text, maxWidth);
  if (fitted <= 0) return 0;
  return Math.min(state.fontMax, Math.max(state.fontMin, fitted));
}

function packToFillWidth(tokens, maxWidth) {
  const lines = [];
  let index = 0;
  while (index < tokens.length) {
    let take = 1;
    while (index + take < tokens.length) {
      const current = tokens.slice(index, index + take).join(" ");
      if (fitUnclamped(current, maxWidth) <= state.fontMax) break;
      take += 1;
    }
    lines.push(tokens.slice(index, index + take).join(" "));
    index += take;
  }
  return lines;
}

function evenSplit(tokens, lineCount) {
  const count = Math.min(Math.max(1, lineCount), tokens.length);
  const lines = [];
  for (let i = 0; i < count; i += 1) {
    const start = Math.round((i * tokens.length) / count);
    const end = Math.round(((i + 1) * tokens.length) / count);
    if (end > start) lines.push(tokens.slice(start, end).join(" "));
  }
  return lines;
}

function allPartitions(tokens) {
  if (tokens.length <= 1) return [[tokens.join(" ")]];
  const layouts = [];
  const gaps = tokens.length - 1;
  const total = 1 << gaps;
  for (let mask = 0; mask < total; mask += 1) {
    const lines = [];
    let current = [tokens[0]];
    for (let i = 0; i < gaps; i += 1) {
      if (mask & (1 << i)) {
        lines.push(current.join(" "));
        current = [tokens[i + 1]];
      } else {
        current.push(tokens[i + 1]);
      }
    }
    lines.push(current.join(" "));
    layouts.push(lines);
  }
  return layouts;
}

function candidateLayouts(tokens) {
  if (tokens.length <= 8) return allPartitions(tokens);
  const layouts = [packToFillWidth(tokens, Math.max(1, state.width - state.inset * 2))];
  for (let count = 1; count <= tokens.length; count += 1) {
    layouts.push(evenSplit(tokens, count));
  }
  return layouts;
}

function evaluateLayout(lines, maxWidth, maxHeight) {
  const leading = state.lineHeight / 100;
  const rawSizes = lines.map((line) => fitLineSize(line, maxWidth));
  let height = rawSizes.reduce((sum, size) => sum + size * leading, 0);
  let scale = 1;
  if (height > maxHeight && height > 0) {
    scale = maxHeight / height;
    if (Math.min(...rawSizes) * scale < state.fontMin - 0.25) {
      return { score: Number.NEGATIVE_INFINITY, lines };
    }
  }
  let score = 0;
  lines.forEach((line, index) => {
    const size = rawSizes[index] * scale;
    const fill = Math.min(1, measureLineWidth(line, size) / maxWidth);
    score += size * fill * fill;
  });
  return { score, lines };
}

function sameWords(lines, tokens) {
  return wordsOf(lines.join(" ")).join(" ") === wordsOf(tokens.join(" ")).join(" ");
}

function rankLayouts(tokens, maxWidth, maxHeight) {
  const seen = new Set();
  return candidateLayouts(tokens)
    .map((lines) => evaluateLayout(lines, maxWidth, maxHeight))
    .filter((item) => {
      if (item.score === Number.NEGATIVE_INFINITY) return false;
      const key = item.lines.join("\n");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.score - a.score);
}

function resolveFillLayout(text) {
  const maxWidth = Math.max(1, state.width - state.inset * 2);
  const maxHeight = Math.max(1, state.height - state.inset * 2);
  const tokens = glueTokens(wordsOf(text));
  if (!tokens.length) return { lines: [], options: [] };
  const ranked = rankLayouts(tokens, maxWidth, maxHeight);
  if (!ranked.length) return { lines: [tokens.join(" ")], options: [] };
  const options = ranked.slice(0, 3);
  const chosenKey = Array.isArray(state.fillChoice) ? state.fillChoice.join("\n") : "";
  const selected =
    ranked.find((item) => item.lines.join("\n") === chosenKey) ||
    (state.fillChoice && sameWords(state.fillChoice, tokens)
      ? { lines: state.fillChoice, score: 0 }
      : null) ||
    ranked[0];
  if (!applyingCover && selected.lines.join("\n") !== chosenKey) state.fillChoice = selected.lines;
  return { lines: selected.lines, options };
}

function renderFillSuggestions(options, selectedLines) {
  const show = Boolean(liveId()) && state.fillMode && !state.editing && options.length > 1;
  els.fillSuggestions.hidden = !show;
  els.fillSuggestionList.replaceChildren();
  if (!show) return;
  const selectedKey = selectedLines.join("\n");
  options.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "fill-option" + (item.lines.join("\n") === selectedKey ? " is-on" : "");
    button.textContent = item.lines.join(" / ");
    button.addEventListener("click", () => {
      state.fillChoice = item.lines;
      pushToTargets({ fillChoice: item.lines.slice() });
      paint();
    });
    els.fillSuggestionList.append(button);
  });
}

function renderFit() {
  clampFontRange();
  const maxWidth = Math.max(1, state.width - state.inset * 2);
  const maxHeight = Math.max(1, state.height - state.inset * 2);
  const { lines, options } = String(state.title || "").trim()
    ? resolveFillLayout(state.title)
    : { lines: [], options: [] };
  renderFillSuggestions(options, lines);
  els.fit.replaceChildren();
  if (!lines.length) return;

  const sizes = lines.map((line) => fitLineSize(line, maxWidth));
  const height = sizes.reduce((sum, size) => sum + size * (state.lineHeight / 100), 0);
  let scale = height > maxHeight && height > 0 ? maxHeight / height : 1;
  const smallest = Math.min(...sizes.filter((size) => size > 0));
  if (smallest * scale < state.fontMin) scale = state.fontMin / smallest;

  lines.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "text-fit__line";
    row.textContent = line;
    row.style.fontSize = `${Math.min(state.fontMax, Math.max(state.fontMin, sizes[index] * scale))}px`;
    els.fit.append(row);
  });
}

let covers = [];
let tableRecords = [];
let restoredSelection = false;
let applyingCover = false;
let boardKey = "";
let selectedIds = [];
let selectAnchor = null;
const mixed = {};

const SETTING_KEYS = [
  "width",
  "height",
  "lockAspect",
  "ratio",
  "inset",
  "guidesVisible",
  "title",
  "font",
  "weight",
  "titleSize",
  "fontMin",
  "fontMax",
  "lineHeight",
  "tracking",
  "textCase",
  "align",
  "valign",
  "titleColor",
  "fillMode",
  "fillChoice",
];

let coverSeq = 0;

function newCoverId() {
  coverSeq += 1;
  return `c-${coverSeq.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultCover(id = newCoverId()) {
  return {
    id,
    name: "",
    producer: "",
    width: 190,
    height: 260,
    lockAspect: true,
    ratio: 190 / 260,
    inset: 16,
    guidesVisible: true,
    title: "",
    font: "Inter",
    weight: 700,
    titleSize: 24,
    fontMin: 12,
    fontMax: 80,
    lineHeight: 120,
    tracking: 0,
    textCase: "none",
    align: "center",
    valign: "middle",
    titleColor: "#ffffff",
    fillMode: false,
    fillChoice: null,
  };
}

function hydrateFields(target, data) {
  if (!data || typeof data !== "object") return;
  if (typeof data.name === "string") target.name = data.name.slice(0, 120);
  if (typeof data.producer === "string") target.producer = data.producer.slice(0, 80);
  if (Number.isFinite(data.width)) target.width = clamp(data.width, MIN, MAX);
  if (Number.isFinite(data.height)) target.height = clamp(data.height, MIN, MAX);
  if (typeof data.lockAspect === "boolean") target.lockAspect = data.lockAspect;
  if (Number.isFinite(data.ratio) && data.ratio > 0) target.ratio = data.ratio;
  else target.ratio = target.width / target.height;
  if (Number.isFinite(data.inset)) target.inset = data.inset;
  if (typeof data.guidesVisible === "boolean") target.guidesVisible = data.guidesVisible;
  if (typeof data.title === "string") target.title = data.title.slice(0, 500);
  if (FONTS.some((font) => font.family === data.font)) target.font = data.font;
  if (Number.isFinite(data.weight)) target.weight = data.weight;
  if (Number.isFinite(data.titleSize)) target.titleSize = clamp(data.titleSize, 8, 400);
  if (Number.isFinite(data.fontMin)) target.fontMin = clamp(data.fontMin, 4, 400);
  if (Number.isFinite(data.fontMax)) target.fontMax = clamp(data.fontMax, 4, 400);
  if (["none", "upper", "lower"].includes(data.textCase)) target.textCase = data.textCase;
  if (Number.isFinite(data.lineHeight)) target.lineHeight = clamp(data.lineHeight, 80, 300);
  if (Number.isFinite(data.tracking)) target.tracking = clamp(data.tracking, -40, 80);
  if (["left", "center", "right", "justify"].includes(data.align)) target.align = data.align;
  if (["top", "middle", "bottom"].includes(data.valign)) target.valign = data.valign;
  if (typeof data.titleColor === "string" && /^#[0-9a-fA-F]{6}$/.test(data.titleColor)) {
    target.titleColor = data.titleColor;
  }
  if (typeof data.fillMode === "boolean") target.fillMode = data.fillMode;
  if (Array.isArray(data.fillChoice) && data.fillChoice.every((line) => typeof line === "string")) {
    target.fillChoice = data.fillChoice.map((line) => line.trim()).filter(Boolean);
  } else if (data.fillChoice === null) {
    target.fillChoice = null;
  }
}

function snapshotCover() {
  return {
    id: state.activeId,
    name: state.name,
    producer: (covers.find((cover) => cover.id === state.activeId) || {}).producer || "",
    width: state.width,
    height: state.height,
    lockAspect: state.lockAspect,
    ratio: state.ratio,
    inset: state.inset,
    guidesVisible: state.guidesVisible,
    title: state.title,
    font: state.font,
    weight: state.weight,
    titleSize: state.titleSize,
    fontMin: state.fontMin,
    fontMax: state.fontMax,
    lineHeight: state.lineHeight,
    tracking: state.tracking,
    textCase: state.textCase,
    align: state.align,
    valign: state.valign,
    titleColor: state.titleColor,
    fillMode: state.fillMode,
    fillChoice: Array.isArray(state.fillChoice) ? state.fillChoice.slice() : state.fillChoice,
  };
}

function applyCoverFields(cover) {
  state.activeId = cover.id;
  state.name = typeof cover.name === "string" ? cover.name : "";
  state.width = cover.width;
  state.height = cover.height;
  state.lockAspect = cover.lockAspect;
  state.ratio = cover.ratio;
  state.inset = cover.inset;
  state.guidesVisible = cover.guidesVisible;
  state.title = typeof cover.title === "string" ? cover.title : "";
  state.font = cover.font;
  state.weight = cover.weight;
  state.titleSize = cover.titleSize;
  state.fontMin = cover.fontMin;
  state.fontMax = cover.fontMax;
  state.lineHeight = cover.lineHeight;
  state.tracking = cover.tracking;
  state.textCase = cover.textCase;
  state.align = cover.align;
  state.valign = cover.valign;
  state.titleColor = cover.titleColor;
  state.fillMode = cover.fillMode;
  state.fillChoice = Array.isArray(cover.fillChoice) ? cover.fillChoice.slice() : cover.fillChoice;
}

function withCover(cover, fn) {
  const backup = snapshotCover();
  const editing = state.editing;
  applyingCover = true;
  applyCoverFields(cover);
  state.editing = false;
  try {
    return fn();
  } finally {
    applyCoverFields(backup);
    state.editing = editing;
    applyingCover = false;
  }
}

function saveActiveToList() {
  if (!state.activeId) return;
  const snap = snapshotCover();
  const index = covers.findIndex((cover) => cover.id === state.activeId);
  if (index >= 0) covers[index] = snap;
  else covers.push(snap);
}

function liveId() {
  return selectedIds.length === 1 ? selectedIds[0] : null;
}

function isSelected(id) {
  return selectedIds.includes(id);
}

function targets() {
  if (!selectedIds.length) return covers;
  return covers.filter((cover) => selectedIds.includes(cover.id));
}

function valuesEqual(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) return JSON.stringify(a) === JSON.stringify(b);
  return a === b;
}

function cloneSetting(value) {
  return Array.isArray(value) ? value.slice() : value;
}

function clearMixed() {
  SETTING_KEYS.forEach((key) => {
    mixed[key] = false;
  });
}

function isMixed(key) {
  return selectedIds.length !== 1 && Boolean(mixed[key]);
}

function settingsLabel() {
  const n = selectedIds.length;
  if (n === 0) return "Все обложки";
  if (n === 1) return "Обложка";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} обложки`;
  return `${n} обложек`;
}

function coverMaxInset(cover) {
  return Math.max(
    0,
    Math.min(
      Math.floor((cover.width - MIN_CONTENT) / 2),
      Math.floor((cover.height - MIN_CONTENT) / 2),
    ),
  );
}

function pushToTargets(patch) {
  const items = targets();
  items.forEach((cover) => {
    Object.keys(patch).forEach((key) => {
      cover[key] = cloneSetting(patch[key]);
    });
    if ("title" in patch && cover.fillChoice && !sameWords(cover.fillChoice, glueTokens(wordsOf(cover.title)))) {
      cover.fillChoice = null;
    }
    if ("fillMode" in patch && patch.fillMode === false) {
      cover.fillChoice = Array.isArray(cover.fillChoice) ? cover.fillChoice : cover.fillChoice;
    }
    cover.inset = clamp(cover.inset, 0, coverMaxInset(cover));
  });
  Object.keys(patch).forEach((key) => {
    mixed[key] = false;
  });
}

function syncPanelFromTargets() {
  const items = targets();
  clearMixed();
  if (items.length === 1) {
    applyCoverFields(items[0]);
    return;
  }
  if (!items.length) return;
  const keepId = state.activeId;
  const keepName = state.name;
  SETTING_KEYS.forEach((key) => {
    const first = items[0][key];
    mixed[key] = items.some((cover) => !valuesEqual(cover[key], first));
    state[key] = cloneSetting(first);
  });
  state.activeId = keepId;
  state.name = keepName;
}

function setSelection(ids, anchor) {
  const next = [...new Set(ids)].filter((id) => covers.some((cover) => cover.id === id));
  const same =
    next.length === selectedIds.length && next.every((id, index) => id === selectedIds[index]);
  if (same && (anchor == null || anchor === selectAnchor) && ids.length === selectedIds.length) {
    return;
  }
  endEdit();
  if (liveId()) saveActiveToList();
  selectedIds = next;
  if (anchor) selectAnchor = anchor;
  else if (selectedIds.length) selectAnchor = selectedIds[selectedIds.length - 1];
  const live = liveId();
  if (live) {
    const cover = covers.find((item) => item.id === live);
    if (cover) {
      clearMixed();
      state.activeId = live;
      applyCoverFields(cover);
    }
  } else {
    syncPanelFromTargets();
  }
  if (els.settingsTitle) els.settingsTitle.textContent = settingsLabel();
  renderWeights();
  syncInputs();
  layout();
}

function selectCover(id) {
  if (selectedIds.length === 1 && selectedIds[0] === id) return;
  setSelection([id], id);
}

function toggleSelect(id) {
  if (isSelected(id)) setSelection(selectedIds.filter((item) => item !== id), selectAnchor);
  else setSelection([...selectedIds, id], id);
}

function rangeSelect(id) {
  const ids = catalogCovers().map((cover) => cover.id);
  const to = ids.indexOf(id);
  const from = selectAnchor ? ids.indexOf(selectAnchor) : to;
  if (to < 0) return;
  if (from < 0) {
    selectCover(id);
    return;
  }
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  setSelection(ids.slice(start, end + 1), id);
}

function clearSelection() {
  if (!selectedIds.length) return;
  setSelection([], selectAnchor);
}

function pickCover(id, event, range) {
  if (event && event.shiftKey) {
    if (range) rangeSelect(id);
    else toggleSelect(id);
    return;
  }
  selectCover(id);
}

const fitCache = new Map();
const visibleThumbs = new Set();
let thumbObserver = null;
let persistTimer = 0;
let layingOut = false;

function fitKey(cover) {
  return [
    cover.title,
    cover.width,
    cover.height,
    cover.inset,
    cover.font,
    cover.weight,
    cover.fontMin,
    cover.fontMax,
    cover.lineHeight,
    cover.tracking,
    cover.textCase,
    Array.isArray(cover.fillChoice) ? cover.fillChoice.join("\n") : "",
  ].join("\0");
}

function previewFitModel(cover) {
  if (!cover.fillMode || !String(cover.title || "").trim()) return { filling: false };
  const key = fitKey(cover);
  const cached = fitCache.get(key);
  if (cached) return cached;
  const compute = () => {
    const { lines } = resolveFillLayout(cover.title);
    const maxWidth = Math.max(1, state.width - state.inset * 2);
    const maxHeight = Math.max(1, state.height - state.inset * 2);
    const sizes = lines.map((line) => fitLineSize(line, maxWidth));
    const height = sizes.reduce((sum, size) => sum + size * (state.lineHeight / 100), 0);
    let scale = height > maxHeight && height > 0 ? maxHeight / height : 1;
    const smallest = Math.min(...sizes.filter((size) => size > 0), 0);
    if (smallest && smallest * scale < state.fontMin) scale = state.fontMin / smallest;
    return {
      filling: true,
      lines,
      fontSizes: sizes.map((size) => Math.min(state.fontMax, Math.max(state.fontMin, size * scale))),
    };
  };
  const result = withCover(cover, compute);
  if (fitCache.size > 400) fitCache.delete(fitCache.keys().next().value);
  fitCache.set(key, result);
  return result;
}

function applyTypeVars(el, cover) {
  el.style.setProperty("--title-font", `"${cover.font}"`);
  el.style.setProperty("--title-weight", String(cover.weight));
  el.style.setProperty("--title-size", `${cover.titleSize}px`);
  el.style.setProperty("--title-leading", String(cover.lineHeight / 100));
  el.style.setProperty("--title-tracking", `${cover.tracking / 100}em`);
  el.style.setProperty("--title-align", cover.align);
  el.style.setProperty("--title-color", cover.titleColor);
  el.style.setProperty(
    "--title-case",
    cover.textCase === "upper" ? "uppercase" : cover.textCase === "lower" ? "lowercase" : "none",
  );
  el.style.setProperty("--guide-inset", `${cover.inset}px`);
}

function scaleMiniBoard(thumb, cover) {
  const viewport = thumb.querySelector(".cover-thumb__viewport");
  const board = thumb.querySelector(".mini-board");
  if (!viewport || !board) return;
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  if (!vw || !vh) return;
  const scale = Math.min(vw / cover.width, vh / cover.height);
  const x = (vw - cover.width * scale) / 2;
  const y = (vh - cover.height * scale) / 2;
  board.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

const MINI_BOARD_HTML =
  '<div class="mini-board"><div class="mini-board__pad"><div class="text-layer mini-board__text"></div><div class="text-fit mini-board__fit" hidden></div></div></div>';

function ensureMiniTree(root) {
  if (root.querySelector(".mini-board")) return;
  const host = root.querySelector(".cover-thumb__viewport") || root;
  host.innerHTML = MINI_BOARD_HTML;
}

function fillMiniBoard(root, cover) {
  const font = FONTS.find((item) => item.family === cover.font);
  if (font) loadFont(font);
  ensureMiniTree(root);

  const board = root.querySelector(".mini-board");
  const pad = root.querySelector(".mini-board__pad");
  const text = root.querySelector(".mini-board__text");
  const fit = root.querySelector(".mini-board__fit");
  if (!board || !pad || !text || !fit) return;

  board.style.width = `${cover.width}px`;
  board.style.height = `${cover.height}px`;
  applyTypeVars(board, cover);
  pad.style.alignItems =
    cover.valign === "top" ? "flex-start" : cover.valign === "bottom" ? "flex-end" : "center";

  const model = previewFitModel(cover);
  text.classList.toggle("is-hidden", model.filling);
  if (model.filling) {
    text.textContent = "";
    fit.hidden = false;
    fit.replaceChildren();
    model.lines.forEach((line, index) => {
      const row = document.createElement("div");
      row.className = "text-fit__line";
      row.textContent = line;
      row.style.fontSize = `${model.fontSizes[index]}px`;
      fit.append(row);
    });
  } else {
    fit.hidden = true;
    fit.replaceChildren();
    text.textContent = cover.title;
  }
}

function paintCoverThumb(thumb, cover) {
  fillMiniBoard(thumb, cover);
  thumb.classList.toggle("is-on", isSelected(cover.id));
  thumb.setAttribute("aria-label", cover.name.trim() || cover.title.trim() || "Обложка");
  scaleMiniBoard(thumb, cover);
}

function observeThumb(thumb) {
  if (!els.coverGrid) return;
  if (!thumbObserver) {
    thumbObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleThumbs.add(entry.target);
          else visibleThumbs.delete(entry.target);
          if (!entry.isIntersecting) return;
          const cover = covers.find((item) => item.id === entry.target.dataset.id);
          if (cover) paintCoverThumb(entry.target, cover);
        });
      },
      { root: els.coverGrid, rootMargin: "180px 0px" },
    );
  }
  thumbObserver.observe(thumb);
}

function updateLibraryPreviews() {
  visibleThumbs.forEach((thumb) => {
    if (!thumb.isConnected) {
      visibleThumbs.delete(thumb);
      return;
    }
    const cover = covers.find((item) => item.id === thumb.dataset.id);
    if (cover) paintCoverThumb(thumb, cover);
  });
}

function setCoverName(id, raw) {
  const name = String(raw).slice(0, 120);
  const cover = covers.find((item) => item.id === id);
  if (cover) cover.name = name;
  if (state.activeId === id) state.name = name;
  persist();
  syncNameFields();
}

function syncNameFields() {
  if (els.coverName && document.activeElement !== els.coverName) {
    els.coverName.value = state.name;
  }
  document.querySelectorAll(".cover-name, .board-name").forEach((input) => {
    if (document.activeElement === input) return;
    const id = input.closest("[data-id]")?.dataset.id;
    const cover = covers.find((item) => item.id === id);
    if (cover) input.value = cover.name;
  });
}

function catalogCovers() {
  return covers;
}

function viewMax() {
  return Math.max(1, Math.min(VIEW_MAX, catalogCovers().length));
}

function clampViewCount() {
  state.viewCount = clamp(state.viewCount, 1, viewMax());
}

function syncStepper() {
  clampViewCount();
  const max = viewMax();
  if (document.activeElement !== els.viewCount) {
    els.viewCount.value = String(state.viewCount);
  }
  els.viewCount.max = String(max);
  els.viewCountDown.disabled = state.viewCount <= 1;
  els.viewCountUp.disabled = state.viewCount >= max;
}

function setViewCount(raw, commit) {
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed)) {
    if (commit) syncStepper();
    return;
  }
  const max = viewMax();
  if (!commit && (parsed < 1 || parsed > max)) return;
  const next = clamp(parsed, 1, max);
  if (next === state.viewCount) {
    if (commit) syncStepper();
    return;
  }
  state.viewCount = next;
  syncStepper();
  persist();
  layout();
}

function visibleCovers() {
  clampViewCount();
  const list = catalogCovers();
  const count = state.viewCount;
  if (list.length <= count) return list.slice();
  const active = Math.max(0, list.findIndex((cover) => cover.id === state.activeId));
  const start = Math.max(0, Math.min(active - Math.floor((count - 1) / 2), list.length - count));
  return list.slice(start, start + count);
}

function coverSize(cover) {
  if (cover.id === liveId()) return { width: state.width, height: state.height };
  return { width: cover.width, height: cover.height };
}

function bindBoardName(input, id) {
  input.addEventListener("pointerdown", (event) => event.stopPropagation());
  input.addEventListener("focus", () => selectCover(id));
  input.addEventListener("input", () => setCoverName(id, input.value));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      input.blur();
    }
  });
}

function parkBoardChrome() {
  els.stage.append(els.wrap, els.coverName, els.label);
  els.wrap.style.visibility = "hidden";
  els.wrap.style.pointerEvents = "none";
  els.coverName.hidden = true;
  els.label.hidden = true;
}

function renderBoard(visible) {
  parkBoardChrome();
  els.board.replaceChildren();
  const live = liveId();
  const single = visible.length === 1;
  if (!visible.length) {
    els.coverName.hidden = true;
    els.label.hidden = true;
    els.wrap.style.visibility = "hidden";
    els.wrap.style.pointerEvents = "none";
    return;
  }

  visible.forEach((cover) => {
    const slot = document.createElement("div");
    slot.className = "board-slot" + (isSelected(cover.id) ? " is-on" : "");
    slot.dataset.id = cover.id;

    const frame = document.createElement("div");
    frame.className = "board-slot__frame";
    frame.addEventListener("pointerdown", (event) => event.stopPropagation());
    frame.addEventListener("click", (event) => {
      event.stopPropagation();
      pickCover(cover.id, event, false);
    });

    if (cover.id === live) {
      frame.append(els.wrap);
      els.wrap.style.visibility = "";
      els.wrap.style.pointerEvents = "";
    } else {
      frame.innerHTML = MINI_BOARD_HTML;
    }

    if (single && cover.id === live) slot.append(els.coverName);
    slot.append(frame);
    if (cover.id === live && !single) slot.append(els.coverName);
    else if (cover.id !== live) {
      const name = document.createElement("input");
      name.className = "board-name";
      name.type = "text";
      name.value = cover.name;
      name.placeholder = "Без названия";
      name.maxLength = 120;
      name.spellcheck = false;
      name.autocomplete = "off";
      name.setAttribute("aria-label", "Имя обложки");
      bindBoardName(name, cover.id);
      slot.append(name);
    }
    if (single && cover.id === live) slot.append(els.label);
    els.board.append(slot);
  });

  const showLive = Boolean(live);
  els.coverName.hidden = !showLive;
  els.label.hidden = !(single && showLive);
  if (showLive) els.coverName.value = state.name;
  els.wrap.style.visibility = showLive ? "" : "hidden";
  els.wrap.style.pointerEvents = showLive ? "" : "none";
}

function positionBoard(visible) {
  const compact = window.innerWidth <= 640;
  const sidePad = compact ? PAD : PANEL_RESERVE;
  const availW = Math.max(120, els.stage.clientWidth - sidePad * 2);
  const availH = Math.max(120, els.stage.clientHeight - PAD * 2);
  const n = visible.length;
  const live = liveId();
  const nameH = n === 1 && live ? 52 : 30;
  let best = { cols: 1, scale: 0 };

  for (let cols = 1; cols <= n; cols += 1) {
    const rows = Math.ceil(n / cols);
    const cellW = (availW - BOARD_GAP_X * (cols - 1)) / cols;
    const cellH = (availH - BOARD_GAP_Y * (rows - 1) - nameH * rows) / rows;
    let scale = Infinity;
    visible.forEach((cover) => {
      const size = coverSize(cover);
      scale = Math.min(scale, cellW / size.width, Math.max(40, cellH) / size.height);
    });
    if (scale > best.scale) best = { cols, scale };
  }

  els.board.style.gridTemplateColumns = `repeat(${best.cols}, max-content)`;
  els.board.classList.toggle("is-single", n === 1);

  visible.forEach((cover) => {
    const slot = els.board.querySelector(`[data-id="${cover.id}"]`);
    if (!slot) return;
    const size = coverSize(cover);
    const frame = slot.querySelector(".board-slot__frame");
    frame.style.width = `${size.width * best.scale}px`;
    frame.style.height = `${size.height * best.scale}px`;
    slot.classList.toggle("is-on", isSelected(cover.id));
    if (cover.id === live) {
      els.wrap.style.width = `${size.width}px`;
      els.wrap.style.height = `${size.height}px`;
      els.wrap.style.transform = `scale(${best.scale})`;
    } else {
      const board = slot.querySelector(".mini-board");
      if (board) {
        board.style.width = `${size.width}px`;
        board.style.height = `${size.height}px`;
        board.style.transformOrigin = "top left";
        board.style.transform = `scale(${best.scale})`;
      }
    }
  });

  els.label.textContent = `${state.width} × ${state.height} px`;
  els.hint.textContent = isMixed("width") || isMixed("height") ? "—" : ratioLabel(state.width, state.height);
}

function updateBoardPreviews() {
  if (!els.board) return;
  const live = liveId();
  els.board.querySelectorAll(".board-slot").forEach((slot) => {
    const cover = covers.find((item) => item.id === slot.dataset.id);
    if (!cover || cover.id === live) return;
    fillMiniBoard(slot, cover);
  });
}

function syncBoard() {
  const visible = visibleCovers();
  const key = `${liveId() || "_"}|${visible.map((cover) => cover.id).join(",")}`;
  if (key !== boardKey) {
    renderBoard(visible);
    boardKey = key;
  }
  positionBoard(visible);
}

function renderLibrary() {
  const grid = els.coverGrid;
  if (!grid) return;
  if (thumbObserver) thumbObserver.disconnect();
  visibleThumbs.clear();

  const frag = document.createDocumentFragment();
  const add = document.createElement("button");
  add.type = "button";
  add.className = "cover-new";
  add.setAttribute("aria-label", "Новая обложка");
  add.innerHTML =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3.2v9.6M3.2 8h9.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  frag.append(add);

  catalogCovers().forEach((cover) => {
    const item = document.createElement("div");
    item.className = "cover-item";
    item.dataset.id = cover.id;

    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "cover-thumb";
    thumb.dataset.id = cover.id;
    thumb.innerHTML = '<div class="cover-thumb__viewport"></div>';

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "cover-delete";
    remove.setAttribute("aria-label", "Удалить обложку");
    remove.innerHTML =
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';

    const card = document.createElement("div");
    card.className = "cover-card";
    card.append(thumb, remove);

    const name = document.createElement("input");
    name.className = "cover-name";
    name.type = "text";
    name.value = cover.name;
    name.placeholder = "Без названия";
    name.maxLength = 120;
    name.spellcheck = false;
    name.autocomplete = "off";
    name.setAttribute("aria-label", "Имя обложки");

    item.append(card, name);
    frag.append(item);
  });

  grid.replaceChildren(frag);
  grid.querySelectorAll(".cover-thumb").forEach(observeThumb);
  requestAnimationFrame(updateLibraryPreviews);
}

function detectDelimiter(line) {
  const tabs = (line.match(/\t/g) || []).length;
  const semis = (line.match(/;/g) || []).length;
  const commas = (line.match(/,/g) || []).length;
  if (tabs >= semis && tabs >= commas && tabs > 0) return "\t";
  if (semis > commas) return ";";
  return ",";
}

function parseCsv(text, delimiter) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const source = String(text).replace(/^\uFEFF/, "");
  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else quoted = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"') {
      quoted = true;
      continue;
    }
    if (ch === delimiter) {
      row.push(cell);
      cell = "";
      continue;
    }
    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    if (ch === "\r") continue;
    cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((item) => item.some((value) => String(value).trim()));
}

function recordsFromRows(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map((cell) => String(cell).trim().toLowerCase());
  const titleAt = headers.indexOf("title");
  const idAt = headers.indexOf("identifier");
  const producerAt = headers.indexOf("producer");
  if (titleAt < 0 && idAt < 0) return [];
  return rows.slice(1).map((row) => ({
    title: titleAt >= 0 ? String(row[titleAt] || "").trim() : "",
    identifier: idAt >= 0 ? String(row[idAt] || "").trim() : "",
    producer: producerAt >= 0 ? String(row[producerAt] || "").trim() : "",
  })).filter((row) => row.title || row.identifier);
}

function parseTableText(text) {
  const first = String(text).replace(/^\uFEFF/, "").split(/\r?\n/).find((line) => line.trim()) || "";
  return recordsFromRows(parseCsv(text, detectDelimiter(first)));
}

function loadXlsxLib() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.onload = () => resolve(window.XLSX);
    script.onerror = () => reject(new Error("xlsx"));
    document.head.appendChild(script);
  });
}

async function parseTableFile(file) {
  const name = (file.name || "").toLowerCase();
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const xlsx = await loadXlsxLib();
    const buffer = await file.arrayBuffer();
    const workbook = xlsx.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, raw: false });
    return recordsFromRows((rows || []).map((row) => (row || []).map((cell) => String(cell ?? ""))));
  }
  return parseTableText(await file.text());
}

function parseTableRecord(raw) {
  return {
    title: String(raw && raw.title ? raw.title : "").trim().slice(0, 500),
    identifier: String(raw && raw.identifier ? raw.identifier : "").trim().slice(0, 120),
    producer: String(raw && raw.producer ? raw.producer : "").trim().slice(0, 80),
  };
}

function catalogProviders() {
  return [...new Set(tableRecords.map((row) => row.producer).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "ru"),
  );
}

function recordsForCreate() {
  if (!tableRecords.length) return [];
  const list = catalogProviders();
  if (!list.length) return tableRecords.slice();
  if (!state.providerFilter) return [];
  return tableRecords.filter((row) => row.producer === state.providerFilter);
}

function syncCreateButton() {
  if (!els.createCovers) return;
  els.createCovers.hidden = !recordsForCreate().length;
}

function syncProviderSelect() {
  if (!els.providerField || !els.providerSelect) return;
  const list = catalogProviders();
  const show = tableRecords.length > 0 && list.length > 0;
  els.providerField.hidden = !show;
  if (show) {
    if (state.providerFilter && !list.includes(state.providerFilter)) state.providerFilter = "";
    els.providerSelect.replaceChildren();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Выберите провайдера";
    els.providerSelect.append(placeholder);
    list.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      els.providerSelect.append(option);
    });
    els.providerSelect.value = state.providerFilter;
  } else if (!tableRecords.length) {
    state.providerFilter = "";
  }
  syncCreateButton();
}

function setProviderFilter(value) {
  state.providerFilter = value;
  syncCreateButton();
  persist();
}

function buildCoversFromRecords(records) {
  if (!records.length) return;
  endEdit();
  if (liveId()) saveActiveToList();
  const template = snapshotCover();
  covers = records.map((row) => {
    const cover = defaultCover();
    SETTING_KEYS.forEach((key) => {
      if (key === "title" || key === "fillChoice") return;
      cover[key] = template[key];
    });
    cover.fillChoice = null;
    cover.name = row.identifier.slice(0, 120);
    cover.title = row.title.slice(0, 500);
    cover.producer = row.producer.slice(0, 80);
    return cover;
  });
  state.activeId = covers[0].id;
  selectedIds = [];
  selectAnchor = covers[0].id;
  restoredSelection = true;
  applyCoverFields(covers[0]);
  syncPanelFromTargets();
  clampViewCount();
  renderWeights();
  syncInputs();
  renderLibrary();
  layout();
  persistNow();
}

function importTableRecords(records) {
  tableRecords = records.map(parseTableRecord).filter((row) => row.title || row.identifier);
  if (!tableRecords.length) return;
  if (state.providerFilter && !catalogProviders().includes(state.providerFilter)) {
    state.providerFilter = "";
  }
  syncProviderSelect();
  persistNow();
}

function createCoversFromTable() {
  buildCoversFromRecords(recordsForCreate());
}

async function importTableFile(file) {
  if (!file) return;
  try {
    const records = await parseTableFile(file);
    importTableRecords(records);
  } catch {
    /* ignore unreadable tables */
  }
}

function createCover() {
  endEdit();
  if (liveId()) saveActiveToList();
  const cover = snapshotCover();
  cover.id = newCoverId();
  cover.name = "";
  cover.producer = state.providerFilter || cover.producer || "";
  covers.unshift(cover);
  renderLibrary();
  setSelection([cover.id], cover.id);
}

function deleteCover(id) {
  const index = covers.findIndex((cover) => cover.id === id);
  if (index < 0) return;
  endEdit();
  if (liveId()) saveActiveToList();
  covers.splice(index, 1);
  selectedIds = selectedIds.filter((item) => item !== id);
  if (selectAnchor === id) selectAnchor = selectedIds[0] || null;
  if (!covers.length) {
    const cover = defaultCover();
    covers.push(cover);
    selectedIds = [cover.id];
    selectAnchor = cover.id;
    applyCoverFields(cover);
  } else if (selectedIds.length === 1) {
    applyCoverFields(covers.find((cover) => cover.id === selectedIds[0]) || covers[0]);
  } else if (!selectedIds.length) {
    if (!covers.some((cover) => cover.id === state.activeId)) state.activeId = covers[0].id;
    syncPanelFromTargets();
  } else if (!covers.some((cover) => cover.id === state.activeId)) {
    state.activeId = selectedIds[0];
  }
  renderLibrary();
  syncProviderSelect();
  if (els.settingsTitle) els.settingsTitle.textContent = settingsLabel();
  renderWeights();
  syncInputs();
  layout();
}

function persistNow() {
  if (applyingCover) return;
  if (liveId()) saveActiveToList();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        covers,
        tableRecords,
        activeId: state.activeId,
        selectedIds,
        viewCount: state.viewCount,
        providerFilter: state.providerFilter,
      }),
    );
  } catch {
    /* ignore quota / private mode */
  }
}

function persist() {
  if (applyingCover) return;
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persistNow, 200);
}

function parseCover(raw) {
  const id = raw && typeof raw.id === "string" && raw.id ? raw.id : newCoverId();
  const cover = defaultCover(id);
  hydrateFields(cover, raw);
  return cover;
}

function loadTableRecords(data) {
  if (!Array.isArray(data.tableRecords)) return;
  tableRecords = data.tableRecords.map(parseTableRecord).filter((row) => row.title || row.identifier);
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "");
    if (!data || typeof data !== "object") return;
    loadTableRecords(data);

    if (Array.isArray(data.covers) && data.covers.length) {
      covers = data.covers.map(parseCover);
      const active = covers.find((cover) => cover.id === data.activeId) || covers[0];
      applyCoverFields(active);
      if (Number.isFinite(data.viewCount)) state.viewCount = data.viewCount;
      if (Array.isArray(data.selectedIds)) {
        restoredSelection = true;
        selectedIds = data.selectedIds.filter((id) => covers.some((cover) => cover.id === id));
      } else {
        selectedIds = state.activeId ? [state.activeId] : [];
      }
      selectAnchor = selectedIds[0] || state.activeId;
      if (typeof data.providerFilter === "string") state.providerFilter = data.providerFilter;
      clampFontRange();
      clampInset();
      clampViewCount();
      return;
    }

    hydrateFields(state, data);
    if (Number.isFinite(data.viewCount)) state.viewCount = data.viewCount;
    clampFontRange();
    clampInset();
    clampViewCount();
    selectedIds = state.activeId ? [state.activeId] : [];
    selectAnchor = state.activeId;
  } catch {
    /* ignore broken storage */
  }
}

function ensureCovers() {
  if (!state.activeId) state.activeId = newCoverId();
  if (!covers.length) covers = [snapshotCover()];
  if (!restoredSelection && !selectedIds.length && state.activeId) {
    selectedIds = [state.activeId];
    selectAnchor = state.activeId;
  }
}

function readText() {
  return (els.text.innerText || "").replace(/\n$/, "");
}

function paint() {
  clampInset();
  const font = currentFont();
  loadFont(font);

  els.frame.style.setProperty("--title-font", `"${state.font}"`);
  els.frame.style.setProperty("--title-weight", String(state.weight));
  els.frame.style.setProperty("--title-size", `${state.titleSize}px`);
  els.frame.style.setProperty("--title-leading", String(state.lineHeight / 100));
  els.frame.style.setProperty("--title-tracking", `${state.tracking / 100}em`);
  els.frame.style.setProperty("--title-align", state.align);
  els.frame.style.setProperty("--title-color", state.titleColor);
  els.frame.style.setProperty("--title-case", caseCss());
  els.artboard.style.setProperty("--guide-inset", `${state.inset}px`);
  els.frame.style.alignItems =
    state.valign === "top" ? "flex-start" : state.valign === "bottom" ? "flex-end" : "center";

  if (!state.editing) {
    els.text.textContent = isMixed("title") ? "" : String(state.title || "");
  }
  if (els.titleField) els.titleField.hidden = !liveId();
  if (document.activeElement !== els.titleInput) {
    els.titleInput.value = isMixed("title") ? "" : String(state.title || "");
    els.titleInput.placeholder = isMixed("title") ? "Несколько значений" : "Название";
  }

  const filling =
    Boolean(liveId()) &&
    state.fillMode &&
    !state.editing &&
    Boolean(String(state.title || "").trim()) &&
    !isMixed("title");
  els.text.classList.toggle("is-hidden", filling);
  els.text.classList.toggle("is-empty", !readText() && !state.editing);
  els.fit.hidden = !filling;
  if (filling) renderFit();
  else {
    els.fillSuggestions.hidden = true;
    els.fillSuggestionList.replaceChildren();
  }

  els.frame.classList.toggle("is-editing", state.editing);
  els.frame.classList.toggle("is-selected", state.editing);
  [...els.fillMode.querySelectorAll(".tabs__btn")].forEach((button) => {
    const on = !isMixed("fillMode") && (button.dataset.fill === "true") === state.fillMode;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-selected", String(on));
  });
  els.sizeField.hidden = !isMixed("fillMode") && state.fillMode;
  els.fontMinField.hidden = !isMixed("fillMode") && !state.fillMode;
  els.fontMaxField.hidden = !isMixed("fillMode") && !state.fillMode;
  els.alignBlock.hidden = !isMixed("fillMode") && state.fillMode;

  els.guides.hidden = !state.guidesVisible;
  els.guidesToggle.setAttribute("aria-pressed", String(!isMixed("guidesVisible") && state.guidesVisible));
  els.guidesToggle.title = state.guidesVisible ? "Скрыть направляющие" : "Показать направляющие";
  els.lock.setAttribute("aria-pressed", String(!isMixed("lockAspect") && state.lockAspect));
  els.lock.title = state.lockAspect ? "Сохранять пропорции" : "Свободный размер";
  if (!isMixed("titleColor") && els.titleColor.value !== state.titleColor) els.titleColor.value = state.titleColor;

  [...els.caseGroup.querySelectorAll(".seg__btn")].forEach((button) => {
    const on = !isMixed("textCase") && button.dataset.case === state.textCase;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
  });
  [...els.alignGroup.querySelectorAll(".seg__btn")].forEach((button) => {
    const on = !isMixed("align") && button.dataset.align === state.align;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
  });
  [...els.valignGroup.querySelectorAll(".seg__btn")].forEach((button) => {
    const on = !isMixed("valign") && button.dataset.valign === state.valign;
    button.classList.toggle("is-on", on);
    button.setAttribute("aria-pressed", String(on));
  });

  els.fontButtonName.textContent = isMixed("font") ? "Несколько" : state.font;
  els.fontButtonName.style.fontFamily = isMixed("font") ? "" : `"${state.font}", sans-serif`;
  if (els.settingsTitle) els.settingsTitle.textContent = settingsLabel();

  persist();
  if (!applyingCover) {
    updateLibraryPreviews();
    updateBoardPreviews();
    syncNameFields();
  }
}

function renderWeights() {
  const font = currentFont();
  state.weight = closestWeight(font.weights, state.weight);
  els.weightSelect.replaceChildren();
  font.weights.forEach((weight) => {
    const option = document.createElement("option");
    option.value = String(weight);
    option.textContent = `${WEIGHT_NAMES[weight] || weight} ${weight}`;
    if (weight === state.weight) option.selected = true;
    els.weightSelect.append(option);
  });
}

function renderFontList(query = "") {
  const needle = query.trim().toLowerCase();
  els.fontList.replaceChildren();
  FONTS.filter((font) => font.family.toLowerCase().includes(needle)).forEach((font) => {
    loadFont(font);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "font-option" + (!isMixed("font") && font.family === state.font ? " is-on" : "");
    button.textContent = font.family;
    button.style.fontFamily = `"${font.family}", sans-serif`;
    button.addEventListener("click", () => {
      state.font = font.family;
      closeFontMenu();
      renderWeights();
      pushToTargets({ font: state.font, weight: state.weight });
      paint();
    });
    els.fontList.append(button);
  });
}

function openFontMenu() {
  renderFontList(els.fontSearch.value);
  const rect = els.fontButton.getBoundingClientRect();
  els.fontMenu.hidden = false;
  els.fontMenu.style.top = `${rect.bottom + 6}px`;
  els.fontMenu.style.left = `${rect.left}px`;
  els.fontMenu.style.width = `${rect.width}px`;
  els.fontSearch.focus();
}

function closeFontMenu() {
  els.fontMenu.hidden = true;
  els.fontSearch.value = "";
}

function layout() {
  if (layingOut) return;
  layingOut = true;
  try {
    syncStepper();
    syncBoard();
    paint();
  } finally {
    layingOut = false;
  }
}

function syncInputs() {
  const assign = (input, key) => {
    if (!input) return;
    if (document.activeElement === input) return;
    input.value = isMixed(key) ? "" : String(state[key] ?? "");
    input.placeholder = isMixed(key) ? "—" : "";
  };
  assign(els.width, "width");
  assign(els.height, "height");
  assign(els.inset, "inset");
  assign(els.titleSize, "titleSize");
  assign(els.fontMin, "fontMin");
  assign(els.fontMax, "fontMax");
  assign(els.lineHeight, "lineHeight");
  assign(els.tracking, "tracking");
}

function applySize(width, height, updateRatio) {
  state.width = clamp(width, MIN, MAX);
  state.height = clamp(height, MIN, MAX);
  if (updateRatio) rememberRatio();
  clampInset();
  pushToTargets({
    width: state.width,
    height: state.height,
    ratio: state.ratio,
    inset: state.inset,
    lockAspect: state.lockAspect,
  });
  syncInputs();
  layout();
}

function setWidth(raw, commit) {
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed)) {
    if (commit) syncInputs();
    return;
  }
  if (!commit && (parsed < MIN || parsed > MAX)) return;
  const width = clamp(parsed, MIN, MAX);
  if (state.lockAspect) applySize(width, Math.round(width / state.ratio), false);
  else {
    state.width = width;
    rememberRatio();
    clampInset();
    pushToTargets({ width: state.width, ratio: state.ratio, inset: state.inset });
    syncInputs();
    layout();
  }
}

function setHeight(raw, commit) {
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isFinite(parsed)) {
    if (commit) syncInputs();
    return;
  }
  if (!commit && (parsed < MIN || parsed > MAX)) return;
  const height = clamp(parsed, MIN, MAX);
  if (state.lockAspect) applySize(Math.round(height * state.ratio), height, false);
  else {
    state.height = height;
    rememberRatio();
    clampInset();
    pushToTargets({ height: state.height, ratio: state.ratio, inset: state.inset });
    syncInputs();
    layout();
  }
}

function bindNumber(input, key, min, maxFn) {
  const apply = (commit) => {
    const max = typeof maxFn === "function" ? maxFn() : maxFn;
    const parsed = Number.parseInt(input.value, 10);
    if (!Number.isFinite(parsed)) {
      if (commit) input.value = isMixed(key) ? "" : String(state[key]);
      return;
    }
    if (!commit && (parsed < min || parsed > max)) return;
    state[key] = clamp(parsed, min, max);
    if (key === "fontMin" && state.fontMin > state.fontMax) state.fontMax = state.fontMin;
    if (key === "fontMax" && state.fontMax < state.fontMin) state.fontMin = state.fontMax;
    const patch = { [key]: state[key] };
    if (key === "fontMin" || key === "fontMax") {
      patch.fontMin = state.fontMin;
      patch.fontMax = state.fontMax;
      syncInputs();
    }
    if (commit) input.value = String(state[key]);
    pushToTargets(patch);
    paint();
    if (key === "inset") syncInputs();
  };
  input.addEventListener("input", () => apply(false));
  input.addEventListener("change", () => apply(true));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") input.blur();
  });
}

function bindSizeInput(input, setter) {
  input.addEventListener("input", () => setter(input.value, false));
  input.addEventListener("change", () => setter(input.value, true));
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") input.blur();
  });
}

function startEdit() {
  if (!liveId() || state.editing) return;
  state.editing = true;
  els.text.contentEditable = "true";
  els.text.classList.remove("is-empty");
  paint();
  els.text.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(els.text);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function endEdit() {
  if (!state.editing) return;
  state.title = readText();
  if (state.fillMode) {
    if (state.title.includes("\n")) {
      state.fillChoice = state.title.split("\n").map((line) => line.trim()).filter(Boolean);
    } else if (state.fillChoice && !sameWords(state.fillChoice, glueTokens(wordsOf(state.title)))) {
      state.fillChoice = null;
    }
  }
  state.editing = false;
  els.text.contentEditable = "false";
  pushToTargets({ title: state.title, fillChoice: state.fillChoice });
  paint();
}

function setCase(value) {
  state.textCase = value;
  pushToTargets({ textCase: value });
  paint();
}

function setAlign(value) {
  state.align = value;
  pushToTargets({ align: value });
  paint();
}

function setValign(value) {
  state.valign = value;
  pushToTargets({ valign: value });
  paint();
}

bindSizeInput(els.width, setWidth);
bindSizeInput(els.height, setHeight);
bindNumber(els.inset, "inset", 0, maxInset);
bindNumber(els.titleSize, "titleSize", 8, 400);
bindNumber(els.fontMin, "fontMin", 4, 400);
bindNumber(els.fontMax, "fontMax", 4, 400);
bindNumber(els.lineHeight, "lineHeight", 80, 300);
bindNumber(els.tracking, "tracking", -40, 80);

els.titleColor.addEventListener("input", () => {
  state.titleColor = els.titleColor.value;
  pushToTargets({ titleColor: state.titleColor });
  paint();
});

els.weightSelect.addEventListener("change", () => {
  state.weight = Number(els.weightSelect.value);
  pushToTargets({ weight: state.weight });
  paint();
});

els.fontButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (els.fontMenu.hidden) openFontMenu();
  else closeFontMenu();
});

els.fontSearch.addEventListener("input", () => renderFontList(els.fontSearch.value));

els.caseGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-case]");
  if (button) setCase(button.dataset.case);
});

els.alignGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-align]");
  if (button) setAlign(button.dataset.align);
});

els.valignGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-valign]");
  if (button) setValign(button.dataset.valign);
});

els.content.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
  startEdit();
});

els.titleInput.addEventListener("focus", () => endEdit());

els.titleInput.addEventListener("input", () => {
  state.title = els.titleInput.value.slice(0, 500);
  if (state.fillChoice && !sameWords(state.fillChoice, glueTokens(wordsOf(state.title)))) {
    state.fillChoice = null;
  }
  if (state.fillMode && state.title.includes("\n")) {
    state.fillChoice = state.title.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  pushToTargets({ title: state.title, fillChoice: state.fillChoice });
  paint();
});

els.text.addEventListener("input", () => {
  state.title = readText();
  els.text.classList.toggle("is-empty", !state.title && !state.editing);
  if (document.activeElement !== els.titleInput) els.titleInput.value = state.title;
  pushToTargets({ title: state.title });
  persist();
  updateLibraryPreviews();
  updateBoardPreviews();
});

els.text.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    endEdit();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (
    !event.target.closest(".panel") &&
    !event.target.closest(".font-menu") &&
    !event.target.closest("#content") &&
    !event.target.closest("#coverNameInput") &&
    !event.target.closest(".board-name")
  ) {
    endEdit();
  }
  if (!event.target.closest(".font-menu") && !event.target.closest("#fontButton")) {
    closeFontMenu();
  }
});

els.lock.addEventListener("click", () => {
  state.lockAspect = !state.lockAspect;
  if (state.lockAspect) rememberRatio();
  pushToTargets({ lockAspect: state.lockAspect, ratio: state.ratio });
  paint();
});

els.fillMode.addEventListener("click", (event) => {
  const button = event.target.closest("[data-fill]");
  if (!button) return;
  state.fillMode = button.dataset.fill === "true";
  pushToTargets({ fillMode: state.fillMode });
  paint();
});

els.guidesToggle.addEventListener("click", () => {
  state.guidesVisible = !state.guidesVisible;
  pushToTargets({ guidesVisible: state.guidesVisible });
  paint();
});

if (els.coverGrid) {
  els.coverGrid.addEventListener("click", (event) => {
    if (event.target.closest(".cover-new")) {
      createCover();
      return;
    }
    const remove = event.target.closest(".cover-delete");
    if (remove) {
      event.preventDefault();
      event.stopPropagation();
      const id = remove.closest("[data-id]")?.dataset.id;
      if (id) deleteCover(id);
      return;
    }
    if (event.target.closest(".cover-name")) return;
    const thumb = event.target.closest(".cover-thumb");
    if (thumb) pickCover(thumb.dataset.id, event, true);
  });
  els.coverGrid.addEventListener("focusin", (event) => {
    const name = event.target.closest(".cover-name");
    if (!name) return;
    const id = name.closest("[data-id]")?.dataset.id;
    if (id) selectCover(id);
  });
  els.coverGrid.addEventListener("input", (event) => {
    const name = event.target.closest(".cover-name");
    if (!name) return;
    const id = name.closest("[data-id]")?.dataset.id;
    if (id) setCoverName(id, name.value);
  });
  els.coverGrid.addEventListener("keydown", (event) => {
    const name = event.target.closest(".cover-name");
    if (!name) return;
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      name.blur();
    }
  });
}

els.coverName.addEventListener("input", () => {
  setCoverName(state.activeId, els.coverName.value);
});

els.coverName.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Escape") {
    event.preventDefault();
    els.coverName.blur();
  }
});

els.viewCountDown.addEventListener("click", () => setViewCount(state.viewCount - 1, true));
els.viewCountUp.addEventListener("click", () => setViewCount(state.viewCount + 1, true));
els.viewCount.addEventListener("input", () => setViewCount(els.viewCount.value, false));
els.viewCount.addEventListener("change", () => setViewCount(els.viewCount.value, true));
els.viewCount.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    els.viewCount.blur();
  }
});

const drag = {
  active: false,
  moved: false,
  additive: false,
  x: 0,
  y: 0,
  pointerId: null,
};

function isStageCoverTarget(event) {
  return Boolean(
    event.target.closest(".board-slot, .artboard-wrap, .panel, .font-menu, #coverNameInput, .board-name"),
  );
}

function setMarqueeBox(x0, y0, x1, y1) {
  const left = Math.min(x0, x1);
  const top = Math.min(y0, y1);
  els.marquee.style.left = `${left}px`;
  els.marquee.style.top = `${top}px`;
  els.marquee.style.width = `${Math.abs(x1 - x0)}px`;
  els.marquee.style.height = `${Math.abs(y1 - y0)}px`;
}

function marqueeHits() {
  const box = els.marquee.getBoundingClientRect();
  if (box.width < 3 && box.height < 3) return [];
  return [...els.board.querySelectorAll(".board-slot")]
    .filter((slot) => {
      const frame = slot.querySelector(".board-slot__frame");
      if (!frame) return false;
      const rect = frame.getBoundingClientRect();
      return box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top;
    })
    .map((slot) => slot.dataset.id);
}

function endMarquee(event) {
  if (!drag.active) return;
  drag.active = false;
  if (drag.pointerId != null) {
    try {
      els.stage.releasePointerCapture(drag.pointerId);
    } catch {
      /* already released */
    }
  }
  if (!drag.moved) {
    els.marquee.hidden = true;
    if (!event.shiftKey) clearSelection();
    return;
  }
  const ids = marqueeHits();
  els.marquee.hidden = true;
  els.marquee.style.width = "0";
  els.marquee.style.height = "0";
  if (drag.additive) setSelection([...new Set([...selectedIds, ...ids])], ids[ids.length - 1] || selectAnchor);
  else if (ids.length) setSelection(ids, ids[ids.length - 1]);
  else clearSelection();
}

els.stage.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  if (isStageCoverTarget(event)) return;
  drag.active = true;
  drag.moved = false;
  drag.additive = event.shiftKey;
  drag.x = event.clientX;
  drag.y = event.clientY;
  drag.pointerId = event.pointerId;
  els.stage.setPointerCapture(event.pointerId);
});

els.stage.addEventListener("pointermove", (event) => {
  if (!drag.active) return;
  const dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  if (!drag.moved && dx * dx + dy * dy < 16) return;
  drag.moved = true;
  els.marquee.hidden = false;
  setMarqueeBox(drag.x, drag.y, event.clientX, event.clientY);
});

els.stage.addEventListener("pointerup", endMarquee);
els.stage.addEventListener("pointercancel", endMarquee);

if (els.importTable && els.tableFile) {
  els.importTable.addEventListener("click", () => els.tableFile.click());
  els.tableFile.addEventListener("change", () => {
    const file = els.tableFile.files && els.tableFile.files[0];
    importTableFile(file).finally(() => {
      els.tableFile.value = "";
    });
  });
}
if (els.providerSelect) {
  els.providerSelect.addEventListener("change", () => setProviderFilter(els.providerSelect.value));
}
if (els.createCovers) {
  els.createCovers.addEventListener("click", createCoversFromTable);
}

window.addEventListener("resize", () => {
  closeFontMenu();
  layout();
});
window.addEventListener("beforeunload", persistNow);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") persistNow();
});
if (els.stage) new ResizeObserver(layout).observe(els.stage);
if (els.coverGrid) new ResizeObserver(updateLibraryPreviews).observe(els.coverGrid);

try {
  load();
  ensureCovers();
  if (selectedIds.length !== 1) syncPanelFromTargets();
  loadFont(currentFont());
  renderWeights();
  syncInputs();
  syncProviderSelect();
  renderLibrary();
  layout();
} catch {
  try {
    syncProviderSelect();
    renderLibrary();
    layout();
  } catch {
    /* keep the last drawn frame */
  }
}
