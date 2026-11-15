import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

function safeFilename(name: string) {
  return name
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function certificateFilename(opts: {
  productName: string;
  courseSlug?: string;
  code: string;
  ext: "png" | "pdf";
}) {
  const base = [
    opts.productName || "EduForge",
    opts.courseSlug || "course",
    opts.code,
  ]
    .map(safeFilename)
    .filter(Boolean)
    .join("-");
  return `${base}.${opts.ext}`;
}

function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Rasterize certificate DOM to a high-res PNG data URL. */
export async function certificateToPngDataUrl(node: HTMLElement): Promise<string> {
  // Ensure images (logo) have settled before capture
  const imgs = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
    ),
  );

  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    // Avoid font CORS issues with external stylesheets
    skipFonts: false,
  });
}

export async function downloadCertificatePng(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await certificateToPngDataUrl(node);
  triggerDownload(dataUrl, filename);
}

export async function downloadCertificatePdf(
  node: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await certificateToPngDataUrl(node);
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 6;
  const maxW = pageW - margin * 2;
  const maxH = pageH - margin * 2;

  // Fit image into page while preserving aspect ratio
  const img = await loadImage(dataUrl);
  const ratio = Math.min(maxW / img.width, maxH / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  const x = (pageW - w) / 2;
  const y = (pageH - h) / 2;

  pdf.addImage(dataUrl, "PNG", x, y, w, h);
  pdf.save(filename);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image_load_failed"));
    img.src = src;
  });
}
