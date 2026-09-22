const statusElement = document.getElementById("popupStatus");
const progressElement = document.getElementById("readingProgress");
const pauseButton = document.getElementById("pauseButton");
let uiLanguage = "en";

initializePopup();

async function initializePopup() {
  const settings = await chrome.storage.sync.get({ uiLanguage: "en" });
  uiLanguage = ReaderI18n.normalizeLanguage(settings.uiLanguage);
  document.documentElement.lang = uiLanguage;
  document.title = ReaderI18n.t("appName", uiLanguage);
  ReaderI18n.apply(document, uiLanguage);
  await refreshReadingState();
}

document.getElementById("readButton").addEventListener("click", async () => {
  showStatus(ReaderI18n.t("readingSelected", uiLanguage));

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      showStatus(ReaderI18n.t("noActivePage", uiLanguage));
      return;
    }

    const [{ result: selectedText }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const active = document.activeElement;
        if (
          active &&
          (active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement) &&
          active.selectionStart !== active.selectionEnd
        ) {
          return active.value.slice(active.selectionStart, active.selectionEnd);
        }
        return window.getSelection()?.toString() || "";
      }
    });

    if (!selectedText.trim()) {
      showStatus(ReaderI18n.t("selectTextFirst", uiLanguage));
      return;
    }

    const response = await chrome.runtime.sendMessage({
      action: "speak-text",
      text: selectedText,
      tabId: tab.id
    });

    showStatus(ReaderI18n.t(response?.started ? "readingStarted" : "unableRead", uiLanguage));
  } catch {
    showStatus(ReaderI18n.t("pageAccessDenied", uiLanguage));
  }
});

pauseButton.addEventListener("click", async () => {
  const state = await chrome.runtime.sendMessage({ action: "toggle-pause" });
  renderReadingState(state);
});

document.getElementById("stopButton").addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ action: "stop-reading" });
  showStatus(ReaderI18n.t("readingStopped", uiLanguage));
});

document.getElementById("scanButton").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      showStatus(ReaderI18n.t("noActivePage", uiLanguage));
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { action: "start-ocr-selection" });
    window.close();
  } catch {
    showStatus(ReaderI18n.t("refreshBeforeScan", uiLanguage));
  }
});

function showStatus(message) {
  statusElement.textContent = message;
}

async function refreshReadingState() {
  renderReadingState(await chrome.runtime.sendMessage({ action: "get-reading-state" }));
}

function renderReadingState(state) {
  pauseButton.disabled = !state?.active;
  pauseButton.textContent = ReaderI18n.t(state?.paused ? "resume" : "pause", uiLanguage);
  progressElement.textContent = state?.active
    ? ReaderI18n.t("sentenceProgress", uiLanguage, { current: state.index + 1, total: state.total })
    : "";
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "reading-state") renderReadingState(message.state);
});
