const DEFAULT_PDF_URL = "./assets/resume-default.pdf";
const DEFAULT_FILE_NAME = "유수진_이력서_자소서.pdf";

const pagesEl = document.getElementById("pages");
const statusEl = document.getElementById("status");
const inputEl = document.getElementById("pdfInput");
const resetBtnEl = document.getElementById("resetBtn");
const downloadLinkEl = document.getElementById("downloadLink");

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let activeSource = DEFAULT_PDF_URL;
let activeName = DEFAULT_FILE_NAME;
let uploadedObjectUrl = null;
let renderToken = 0;
let resizeTimer = null;

function setStatus(text) {
  statusEl.textContent = text;
}

function resetDownloadLink() {
  downloadLinkEl.href = activeSource;
  downloadLinkEl.download = activeName;
}

function getRenderWidth() {
  const maxWidth = 920;
  const base = pagesEl.clientWidth - 32;
  return Math.max(280, Math.min(base, maxWidth));
}

function createPageCard(pageNum) {
  const card = document.createElement("section");
  card.className = "page-card";

  const label = document.createElement("div");
  label.className = "page-label";
  label.textContent = `Page ${pageNum}`;

  const canvas = document.createElement("canvas");
  canvas.className = "pdf-canvas";

  card.appendChild(label);
  card.appendChild(canvas);
  pagesEl.appendChild(card);

  return canvas;
}

async function renderPdf(source, fileName) {
  const token = ++renderToken;
  pagesEl.innerHTML = "";
  setStatus(`${fileName} 불러오는 중...`);

  try {
    const task = pdfjsLib.getDocument(source);
    const pdf = await task.promise;

    if (token !== renderToken) {
      return;
    }

    const renderWidth = getRenderWidth();

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      if (token !== renderToken) {
        return;
      }

      const page = await pdf.getPage(pageNum);
      const canvas = createPageCard(pageNum);
      const originalViewport = page.getViewport({ scale: 1 });
      const scale = renderWidth / originalViewport.width;
      const viewport = page.getViewport({ scale });
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const context = canvas.getContext("2d");
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
    }

    setStatus(`${fileName} · 총 ${pdf.numPages}페이지`);
  } catch (error) {
    console.error(error);
    setStatus("PDF를 렌더링하지 못했습니다. 파일이 손상됐거나 지원되지 않는 형식일 수 있습니다.");
  }
}

function releaseUploadedObjectUrl() {
  if (!uploadedObjectUrl) {
    return;
  }

  URL.revokeObjectURL(uploadedObjectUrl);
  uploadedObjectUrl = null;
}

function setActivePdf(source, fileName) {
  activeSource = source;
  activeName = fileName;
  resetDownloadLink();
  renderPdf(activeSource, activeName);
}

inputEl.addEventListener("change", (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (file.type !== "application/pdf") {
    setStatus("PDF 파일만 업로드할 수 있습니다.");
    inputEl.value = "";
    return;
  }

  releaseUploadedObjectUrl();
  uploadedObjectUrl = URL.createObjectURL(file);
  setActivePdf(uploadedObjectUrl, file.name);
});

resetBtnEl.addEventListener("click", () => {
  releaseUploadedObjectUrl();
  inputEl.value = "";
  setActivePdf(DEFAULT_PDF_URL, DEFAULT_FILE_NAME);
});

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    renderPdf(activeSource, activeName);
  }, 160);
});

window.addEventListener("beforeunload", () => {
  releaseUploadedObjectUrl();
});

setActivePdf(DEFAULT_PDF_URL, DEFAULT_FILE_NAME);
