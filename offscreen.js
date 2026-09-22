let ocrWorker = null;
let workerLanguages = "";
let activeRequestId = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.target !== "offscreen" || message.action !== "ocr-recognize") return;
  recognizeRegion(message).catch((error) => {
    sendResult(message.requestId, { error: error.message || "OCR failed." });
  });
});

async function recognizeRegion(message) {
  activeRequestId = message.requestId;
  const worker = await getWorker(message.languages);
  const imageSize = await getImageSize(message.imageDataUrl);
  const scaleX = imageSize.width / message.viewport.width;
  const scaleY = imageSize.height / message.viewport.height;
  const rectangle = {
    left: Math.max(0, Math.round(message.rectangle.left * scaleX)),
    top: Math.max(0, Math.round(message.rectangle.top * scaleY)),
    width: Math.max(1, Math.round(message.rectangle.width * scaleX)),
    height: Math.max(1, Math.round(message.rectangle.height * scaleY))
  };
  const result = await worker.recognize(message.imageDataUrl, { rectangle });
  sendResult(message.requestId, { text: result.data.text.trim() });
}

async function getWorker(languages) {
  const languageKey = languages.join("+");
  if (ocrWorker && workerLanguages === languageKey) return ocrWorker;

  if (ocrWorker) await ocrWorker.terminate();
  workerLanguages = languageKey;
  ocrWorker = await Tesseract.createWorker(languages, 1, {
    workerPath: chrome.runtime.getURL("vendor/tesseract/worker.min.js"),
    workerBlobURL: false,
    corePath: chrome.runtime.getURL("vendor/tesseract/tesseract-core-simd-lstm.wasm.js"),
    langPath: "https://tessdata.projectnaptha.com/4.0.0",
    logger: (progress) => {
      if (!activeRequestId) return;
      chrome.runtime.sendMessage({
        target: "background",
        action: "ocr-progress",
        requestId: activeRequestId,
        status: progress.status,
        progress: progress.progress || 0
      });
    }
  });
  return ocrWorker;
}

function getImageSize(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("Unable to read the captured image."));
    image.src = dataUrl;
  });
}

function sendResult(requestId, result) {
  chrome.runtime.sendMessage({ target: "background", action: "ocr-result", requestId, ...result });
}
