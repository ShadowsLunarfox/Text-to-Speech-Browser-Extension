const statusElement = document.getElementById("popupStatus");
const progressElement = document.getElementById("readingProgress");
const pauseButton = document.getElementById("pauseButton");

refreshReadingState();

document.getElementById("readButton").addEventListener("click", async () => {
  showStatus("Reading selected text...");

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      showStatus("No active page found.");
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
      showStatus("Select some text on the page first.");
      return;
    }

    const response = await chrome.runtime.sendMessage({
      action: "speak-text",
      text: selectedText,
      tabId: tab.id
    });

    showStatus(response?.started ? "Reading started." : "Unable to read the selection.");
  } catch {
    showStatus("This page does not allow access to selected text.");
  }
});

pauseButton.addEventListener("click", async () => {
  const state = await chrome.runtime.sendMessage({ action: "toggle-pause" });
  renderReadingState(state);
});

document.getElementById("stopButton").addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ action: "stop-reading" });
  showStatus("Reading stopped.");
});

function showStatus(message) {
  statusElement.textContent = message;
}

async function refreshReadingState() {
  renderReadingState(await chrome.runtime.sendMessage({ action: "get-reading-state" }));
}

function renderReadingState(state) {
  pauseButton.disabled = !state?.active;
  pauseButton.textContent = state?.paused ? "Resume" : "Pause";
  progressElement.textContent = state?.active
    ? `Sentence ${state.index + 1} of ${state.total}`
    : "";
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "reading-state") renderReadingState(message.state);
});
