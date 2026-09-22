const HOST_ID = "selection-text-reader-overlay";
const TARGET_LANGUAGES = [
  ["en", "English"],
  ["zh-CN", "Chinese (Simplified)"],
  ["zh-TW", "Chinese (Traditional)"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["de", "German"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["ms", "Malay"],
  ["pt", "Portuguese"],
  ["ru", "Russian"],
  ["th", "Thai"],
  ["vi", "Vietnamese"]
];

let selectedText = "";
let host;
let shadow;
let launcher;
let panel;
let statusElement;
let translationElement;
let selectionTimer;
let contextActive = true;

document.addEventListener("mousedown", handlePointerDown, true);
document.addEventListener("mouseup", handleSelectionChange);
document.addEventListener("keyup", handleSelectionChange);
document.addEventListener("keydown", handleReadingShortcut, true);
document.addEventListener("scroll", handleScroll, true);

function handleSelectionChange(event) {
  if (event.type === "keyup" && event.key.toLowerCase() === "r" && panel && !panel.hidden) {
    return;
  }

  if (event.target instanceof Node && host?.contains(event.target)) {
    return;
  }

  window.clearTimeout(selectionTimer);
  const delay = event.type === "mouseup" ? 400 : 0;
  selectionTimer = window.setTimeout(async () => {
    const settings = await safeStorageGet({ showSelectionButton: true });
    if (!settings || !settings.showSelectionButton) {
      hideOverlay();
      return;
    }

    const selectionDetails = getSelectionDetails();
    const text = selectionDetails.text;

    if (!text) {
      hideOverlay();
      return;
    }

    const rect = selectionDetails.rect;
    if (!rect.width && !rect.height) {
      return;
    }

    selectedText = text;
    ensureOverlay();
    positionLauncher(rect);
    panel.hidden = true;
    launcher.hidden = false;
  }, delay);
}

function getSelectionDetails() {
  const active = document.activeElement;
  if (
    active &&
    (active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement) &&
    active.selectionStart !== active.selectionEnd
  ) {
    return {
      text: active.value.slice(active.selectionStart, active.selectionEnd).trim(),
      rect: active.getBoundingClientRect()
    };
  }

  const selection = window.getSelection();
  if (!selection?.rangeCount) return { text: "", rect: null };
  return {
    text: selection.toString().trim(),
    rect: selection.getRangeAt(0).getBoundingClientRect()
  };
}

function handlePointerDown(event) {
  if (event.composedPath().includes(host)) {
    return;
  }

  window.clearTimeout(selectionTimer);
  hideOverlay();
}

function handleReadingShortcut(event) {
  if (
    event.key.toLowerCase() !== "r" ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.repeat ||
    !launcher ||
    launcher.hidden
  ) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  window.clearTimeout(selectionTimer);
  openPanel();
}

function handleScroll(event) {
  if (event.composedPath().includes(host)) {
    return;
  }

  hideOverlay();
}

function ensureOverlay() {
  if (host) {
    return;
  }

  host = document.createElement("div");
  host.id = HOST_ID;
  host.style.cssText = "all:initial;position:fixed;z-index:2147483647;top:0;left:0";
  shadow = host.attachShadow({ mode: "closed" });
  shadow.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      button, select { font: 12px Tahoma, "MS Sans Serif", Arial, sans-serif; letter-spacing: 0; }
      .launcher {
        position: fixed; width: 30px; height: 30px; padding: 0; color: #000080;
        background: #c0c0c0; border: 2px solid; border-color: #fff #000 #000 #fff;
        border-radius: 0; box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px #808080;
        cursor: default; font-weight: 700;
      }
      .launcher:active {
        padding: 2px 0 0 2px; border-color: #000 #fff #fff #000;
        box-shadow: inset 1px 1px #808080;
      }
      .panel {
        position: fixed; width: min(360px, calc(100vw - 24px)); padding: 3px 3px 11px;
        max-height: calc(100vh - 24px); overflow: auto;
        border: 2px solid; border-color: #fff #000 #000 #fff; border-radius: 0;
        color: #000; background: #c0c0c0;
        box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px #808080, 2px 2px 0 rgba(0,0,0,.28);
        font: 12px Tahoma, "MS Sans Serif", Arial, sans-serif;
      }
      .header {
        display: flex; align-items: center; justify-content: space-between;
        min-height: 23px; margin-bottom: 8px; padding: 2px 3px 2px 5px;
        color: #fff; background: #000080;
      }
      .title { overflow: hidden; font-size: 12px; font-weight: 700; white-space: nowrap; text-overflow: ellipsis; }
      .close {
        width: 18px; min-width: 18px; height: 18px; min-height: 18px; padding: 0;
        color: #000; background: #c0c0c0; border: 2px solid; border-color: #fff #000 #000 #fff;
        border-radius: 0; box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px #808080;
        cursor: default; font-size: 12px; font-weight: 700; line-height: 12px;
      }
      .text, .translation, .current {
        overflow: auto; color: #000; background: #fff; border: 2px solid;
        border-color: #808080 #fff #fff #808080; line-height: 1.4;
      }
      .text { max-height: 78px; margin: 0 8px 10px; padding: 6px; }
      .label { display: grid; gap: 5px; margin: 11px 8px; font-weight: 400; }
      select {
        width: 100%; height: 25px; padding: 2px 5px; color: #000; background: #fff;
        border: 2px solid; border-color: #808080 #fff #fff #808080; border-radius: 0;
        outline: 1px solid #000; outline-offset: -2px;
      }
      .actions { display: flex; flex-wrap: wrap; gap: 7px; margin-right: 8px; margin-left: 8px; }
      .playback { margin-top: 8px; }
      .action {
        min-width: 72px; min-height: 25px; padding: 3px 9px; color: #000; background: #c0c0c0;
        border: 2px solid; border-color: #fff #000 #000 #fff; border-radius: 0;
        box-shadow: inset 1px 1px #dfdfdf, inset -1px -1px #808080; cursor: default;
      }
      .action.secondary { color: #000; background: #c0c0c0; }
      .action:active:not(:disabled) {
        padding: 4px 8px 2px 10px; border-color: #000 #fff #fff #000;
        box-shadow: inset 1px 1px #808080;
      }
      .close:active {
        padding: 1px 0 0 1px; border-color: #000 #fff #fff #000;
        box-shadow: inset 1px 1px #808080;
      }
      .action:disabled { color: #808080; text-shadow: 1px 1px #fff; }
      .translation { max-height: 96px; margin: 11px 8px 0; padding: 6px; }
      .current { max-height: 72px; margin: 9px 8px 0; padding: 6px; }
      .status { min-height: 20px; margin: 9px 8px 0; padding: 3px 5px; color: #000; background: #c0c0c0; border: 1px solid; border-color: #808080 #fff #fff #808080; font-size: 11px; }
    </style>
    <button class="launcher" type="button" title="Open reading panel">R</button>
    <section class="panel" hidden>
      <div class="header"><span class="title">Selection Reader</span><button class="close" type="button" title="Close">x</button></div>
      <p class="text"></p>
      <div class="actions">
        <button class="action read-original" type="button">Read original</button>
        <button class="action secondary stop" type="button">Stop</button>
      </div>
      <div class="actions playback" hidden>
        <button class="action secondary previous" type="button">Previous</button>
        <button class="action secondary pause" type="button">Pause</button>
        <button class="action secondary next" type="button">Next</button>
      </div>
      <p class="current" hidden></p>
      <label class="label">Translate to<select class="language"></select></label>
      <button class="action translate" type="button">Translate and read</button>
      <p class="translation" hidden></p>
      <p class="status" role="status" aria-live="polite"></p>
    </section>
  `;

  document.documentElement.appendChild(host);
  launcher = shadow.querySelector(".launcher");
  panel = shadow.querySelector(".panel");
  statusElement = shadow.querySelector(".status");
  translationElement = shadow.querySelector(".translation");

  const languageSelect = shadow.querySelector(".language");
  for (const [value, label] of TARGET_LANGUAGES) {
    languageSelect.add(new Option(label, value));
  }
  safeStorageGet({ translationTarget: "en" }).then((settings) => {
    if (settings) languageSelect.value = settings.translationTarget;
  });
  languageSelect.addEventListener("change", () => {
    safeStorageSet({ translationTarget: languageSelect.value });
  });

  launcher.addEventListener("mousedown", preserveSelection);
  launcher.addEventListener("click", openPanel);
  shadow.querySelector(".close").addEventListener("click", hideOverlay);
  shadow.querySelector(".read-original").addEventListener("click", readOriginal);
  shadow.querySelector(".stop").addEventListener("click", stopReading);
  shadow.querySelector(".previous").addEventListener("click", () => skipReading(-1));
  shadow.querySelector(".pause").addEventListener("click", togglePause);
  shadow.querySelector(".next").addEventListener("click", () => skipReading(1));
  shadow.querySelector(".translate").addEventListener("click", translateAndRead);
}

function preserveSelection(event) {
  event.preventDefault();
}

function positionLauncher(rect) {
  const left = Math.max(6, Math.min(window.innerWidth - 36, rect.right - 30));
  const top = Math.max(6, Math.min(window.innerHeight - 36, rect.bottom - 30));
  launcher.style.left = `${left}px`;
  launcher.style.top = `${top}px`;
}

function openPanel() {
  const launcherRect = launcher.getBoundingClientRect();
  const panelWidth = Math.min(360, window.innerWidth - 24);
  const left = Math.max(12, Math.min(window.innerWidth - panelWidth - 12, launcherRect.left));
  const top = launcherRect.bottom + 8 + 330 <= window.innerHeight
    ? launcherRect.bottom + 8
    : Math.max(12, launcherRect.top - 338);

  shadow.querySelector(".text").textContent = selectedText;
  translationElement.hidden = true;
  translationElement.textContent = "";
  statusElement.textContent = "";
  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;
  panel.hidden = false;
  launcher.hidden = true;
}

async function readOriginal() {
  const response = await safeSendMessage({ action: "speak-text", text: selectedText });
  if (!response) return;
  statusElement.textContent = response?.started ? "Reading original text." : "Unable to start reading.";
}

async function stopReading() {
  const response = await safeSendMessage({ action: "stop-reading" });
  if (!response) return;
  statusElement.textContent = "Reading stopped.";
}

async function togglePause() {
  renderReadingState(await safeSendMessage({ action: "toggle-pause" }));
}

async function skipReading(offset) {
  renderReadingState(await safeSendMessage({ action: "skip-reading", offset }));
}

function renderReadingState(state) {
  if (!shadow) return;
  const playback = shadow.querySelector(".playback");
  const current = shadow.querySelector(".current");
  const pause = shadow.querySelector(".pause");
  playback.hidden = !state?.active;
  current.hidden = !state?.active;
  pause.textContent = state?.paused ? "Resume" : "Pause";
  current.textContent = state?.active
    ? `${state.index + 1} / ${state.total}: ${state.currentText}`
    : "";
}

async function translateAndRead() {
  const button = shadow.querySelector(".translate");
  const targetLanguage = shadow.querySelector(".language").value;
  button.disabled = true;
  statusElement.textContent = "Translating...";

  try {
    const response = await safeSendMessage({
      action: "translate-text",
      text: selectedText,
      targetLanguage
    });

    if (response?.error || !response?.translatedText) {
      throw new Error(response?.error || "Translation failed.");
    }

    translationElement.textContent = response.translatedText;
    translationElement.hidden = false;
    const readingResponse = await safeSendMessage({
      action: "speak-text",
      text: response.translatedText,
      lang: targetLanguage
    });
    if (!readingResponse) return;
    statusElement.textContent = "Reading translated text.";
  } catch (error) {
    if (statusElement) statusElement.textContent = error.message || "Translation failed.";
  } finally {
    if (button.isConnected) button.disabled = false;
  }
}

function hideOverlay() {
  window.clearTimeout(selectionTimer);

  if (!host) {
    return;
  }

  launcher.hidden = true;
  panel.hidden = true;
}

async function safeStorageGet(defaults) {
  if (!extensionContextAvailable()) return null;
  try {
    return await chrome.storage.sync.get(defaults);
  } catch {
    invalidateExtensionContext();
    return null;
  }
}

async function safeStorageSet(values) {
  if (!extensionContextAvailable()) return false;
  try {
    await chrome.storage.sync.set(values);
    return true;
  } catch {
    invalidateExtensionContext();
    return false;
  }
}

async function safeSendMessage(message) {
  if (!extensionContextAvailable()) return null;
  try {
    return await chrome.runtime.sendMessage(message);
  } catch {
    invalidateExtensionContext();
    return null;
  }
}

function extensionContextAvailable() {
  return contextActive && Boolean(chrome.runtime?.id);
}

function invalidateExtensionContext() {
  contextActive = false;
  window.clearTimeout(selectionTimer);
  host?.remove();
  host = null;
  shadow = null;
  launcher = null;
  panel = null;
  statusElement = null;
  translationElement = null;
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "reading-state") renderReadingState(message.state);
});
