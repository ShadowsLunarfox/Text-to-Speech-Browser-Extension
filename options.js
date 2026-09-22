const DEFAULT_SETTINGS = {
  rate: 1,
  pitch: 1,
  volume: 1,
  lang: "zh-CN",
  voiceName: "",
  autoDetectLanguage: true,
  showSelectionButton: true
};

const form = document.getElementById("settingsForm");
const statusElement = document.getElementById("status");
const controls = {
  autoDetectLanguage: document.getElementById("autoDetectLanguage"),
  showSelectionButton: document.getElementById("showSelectionButton"),
  lang: document.getElementById("lang"),
  voiceName: document.getElementById("voiceName"),
  rate: document.getElementById("rate"),
  pitch: document.getElementById("pitch"),
  volume: document.getElementById("volume")
};
const valueLabels = {
  rate: document.getElementById("rateValue"),
  pitch: document.getElementById("pitchValue"),
  volume: document.getElementById("volumeValue")
};

init();

async function init() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  await populateVoices();

  controls.autoDetectLanguage.checked = settings.autoDetectLanguage;
  controls.showSelectionButton.checked = settings.showSelectionButton;
  controls.lang.value = settings.lang;
  controls.voiceName.value = settings.voiceName;
  controls.rate.value = settings.rate;
  controls.pitch.value = settings.pitch;
  controls.volume.value = settings.volume;

  updateValueLabels();
}

form.addEventListener("input", updateValueLabels);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveSettings();
  showStatus("Settings saved");
});

document.getElementById("testButton").addEventListener("click", async () => {
  const settings = await saveSettings();

  chrome.tts.stop();
  chrome.tts.speak("This is a text-to-speech test.", {
    enqueue: false,
    lang: settings.lang,
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume,
    ...(settings.voiceName ? { voiceName: settings.voiceName } : {})
  });
});

async function saveSettings() {
  const settings = {
    autoDetectLanguage: controls.autoDetectLanguage.checked,
    showSelectionButton: controls.showSelectionButton.checked,
    lang: controls.lang.value,
    voiceName: controls.voiceName.value,
    rate: Number(controls.rate.value),
    pitch: Number(controls.pitch.value),
    volume: Number(controls.volume.value)
  };

  await chrome.storage.sync.set(settings);
  return settings;
}

async function populateVoices() {
  const voices = await chrome.tts.getVoices();
  for (const voice of voices.sort((a, b) => (a.lang || "").localeCompare(b.lang || ""))) {
    const option = document.createElement("option");
    option.value = voice.voiceName;
    option.textContent = `${voice.voiceName}${voice.lang ? ` (${voice.lang})` : ""}`;
    controls.voiceName.appendChild(option);
  }
}

function updateValueLabels() {
  valueLabels.rate.textContent = `${controls.rate.value}x`;
  valueLabels.pitch.textContent = controls.pitch.value;
  valueLabels.volume.textContent = `${Math.round(Number(controls.volume.value) * 100)}%`;
}

function showStatus(message) {
  statusElement.textContent = message;
  window.setTimeout(() => {
    statusElement.textContent = "";
  }, 1800);
}
