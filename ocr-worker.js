const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);

function isUnsupportedLegacyParameterWarning(args) {
  return args.some((value) =>
    String(value).startsWith("Warning: Parameter not found:")
  );
}

console.warn = (...args) => {
  if (!isUnsupportedLegacyParameterWarning(args)) originalWarn(...args);
};

console.error = (...args) => {
  if (!isUnsupportedLegacyParameterWarning(args)) originalError(...args);
};

importScripts("vendor/tesseract/worker.min.js");
