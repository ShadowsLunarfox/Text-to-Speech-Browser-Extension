const DEFAULT_SETTINGS = {
  rate: 1,
  pitch: 1,
  volume: 1,
  lang: "zh-CN",
  voiceName: "",
  languageVoices: {},
  autoDetectLanguage: true,
  showSelectionButton: true,
  ocrLanguage: "eng+chi_sim"
};

const form = document.getElementById("settingsForm");
const statusElement = document.getElementById("status");
const controls = {
  autoDetectLanguage: document.getElementById("autoDetectLanguage"),
  showSelectionButton: document.getElementById("showSelectionButton"),
  lang: document.getElementById("lang"),
  voiceName: document.getElementById("voiceName"),
  ocrLanguage: document.getElementById("ocrLanguage"),
  rate: document.getElementById("rate"),
  pitch: document.getElementById("pitch"),
  volume: document.getElementById("volume")
};
const valueLabels = {
  rate: document.getElementById("rateValue"),
  pitch: document.getElementById("pitchValue"),
  volume: document.getElementById("volumeValue")
};
const languageVoiceControls = [...document.querySelectorAll(".language-voice")];

init();

async function init() {
  const settings = await chrome.storage.sync.get(DEFAULT_SETTINGS);

  await populateVoices();

  controls.autoDetectLanguage.checked = settings.autoDetectLanguage;
  controls.showSelectionButton.checked = settings.showSelectionButton;
  controls.lang.value = settings.lang;
  controls.voiceName.value = settings.voiceName;
  controls.ocrLanguage.value = settings.ocrLanguage;
  for (const control of languageVoiceControls) {
    control.value = settings.languageVoices?.[control.dataset.language] || "";
  }
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
  const languageRoot = settings.lang.toLowerCase().split("-")[0];
  const testVoice = settings.languageVoices[languageRoot] || settings.voiceName;

  chrome.tts.stop();
  chrome.tts.speak("This is a text-to-speech test.", {
    enqueue: false,
    lang: settings.lang,
    rate: settings.rate,
    pitch: settings.pitch,
    volume: settings.volume,
    ...(testVoice ? { voiceName: testVoice } : {})
  });
});

async function saveSettings() {
  const settings = {
    autoDetectLanguage: controls.autoDetectLanguage.checked,
    showSelectionButton: controls.showSelectionButton.checked,
    lang: controls.lang.value,
    voiceName: controls.voiceName.value,
    ocrLanguage: controls.ocrLanguage.value,
    languageVoices: Object.fromEntries(
      languageVoiceControls.map((control) => [control.dataset.language, control.value])
    ),
    rate: Number(controls.rate.value),
    pitch: Number(controls.pitch.value),
    volume: Number(controls.volume.value)
  };

  await chrome.storage.sync.set(settings);
  return settings;
}

async function populateVoices() {
  const voices = await chrome.tts.getVoices();
  const sortedVoices = voices.sort((a, b) => (a.lang || "").localeCompare(b.lang || ""));
  for (const voice of sortedVoices) {
    const option = document.createElement("option");
    option.value = voice.voiceName;
    option.textContent = `${voice.voiceName}${voice.lang ? ` (${voice.lang})` : ""}`;
    controls.voiceName.appendChild(option);

    for (const control of languageVoiceControls) {
      if (!voice.lang || voice.lang.toLowerCase().startsWith(control.dataset.language)) {
        control.appendChild(option.cloneNode(true));
      }
    }
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
