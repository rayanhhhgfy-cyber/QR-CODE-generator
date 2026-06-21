import type { QRConfig, Shape, EyeStyle, Gradient } from "./types";

export interface RenderOptions {
  size: number;
  config: QRConfig;
  matrix: boolean[][];
}

export function renderQRCode({
  size,
  config,
  matrix,
}: RenderOptions): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const matrixSize = matrix.length;
  const margin = config.marginSize;
  const moduleCount = matrixSize + margin * 2;
  const moduleSize = size / moduleCount;
  const offset = margin * moduleSize;

  drawBackground(ctx, size, config);
  drawModules(ctx, matrix, moduleSize, offset, config);
  drawEyes(ctx, matrixSize, moduleSize, offset, config);
  if (config.logo.src) {
    drawLogo(ctx, size, config);
  }
  return canvas;
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  size: number,
  config: QRConfig,
) {
  if (config.bgGradient) {
    const grad = createGradient(ctx, config.bgGradient, size);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = config.bgColor;
  }
  ctx.fillRect(0, 0, size, size);
}

function createGradient(
  ctx: CanvasRenderingContext2D,
  gradient: Gradient,
  size: number,
): CanvasGradient {
  if (gradient.type === "radial") {
    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, size * 0.7);
    grad.addColorStop(0, gradient.color1);
    grad.addColorStop(1, gradient.color2);
    return grad;
  }
  const angleRad = ((gradient.angle || 0) * Math.PI) / 180;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const x0 = size / 2 - (size / 2) * cos + (size / 2) * sin;
  const y0 = size / 2 - (size / 2) * sin - (size / 2) * cos;
  const x1 = size / 2 + (size / 2) * cos - (size / 2) * sin;
  const y1 = size / 2 + (size / 2) * sin + (size / 2) * cos;
  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  grad.addColorStop(0, gradient.color1);
  grad.addColorStop(1, gradient.color2);
  return grad;
}

function getFillStyle(
  ctx: CanvasRenderingContext2D,
  color: string,
  gradient: Gradient | null,
  size: number,
): string | CanvasGradient {
  if (gradient) return createGradient(ctx, gradient, size);
  return color;
}

function drawModules(
  ctx: CanvasRenderingContext2D,
  matrix: boolean[][],
  moduleSize: number,
  offset: number,
  config: QRConfig,
) {
  const fillStyle = getFillStyle(ctx, config.fgColor, config.fgGradient, matrix.length * moduleSize);
  ctx.fillStyle = fillStyle;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col]) continue;
      if (isInEyePattern(row, col, matrix.length)) continue;
      const x = offset + col * moduleSize;
      const y = offset + row * moduleSize;
      drawShape(ctx, config.shape, x, y, moduleSize);
    }
  }
}

function isInEyePattern(row: number, col: number, size: number): boolean {
  const inTopLeft = row < 8 && col < 8;
  const inTopRight = row < 8 && col >= size - 8;
  const inBottomLeft = row >= size - 8 && col < 8;
  return inTopLeft || inTopRight || inBottomLeft;
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  x: number,
  y: number,
  size: number,
) {
  switch (shape) {
    case "squares":
      ctx.fillRect(x, y, size, size);
      break;
    case "dots": {
      const r = size / 2;
      ctx.beginPath();
      ctx.arc(x + r, y + r, r * 0.85, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "rounded": {
      const r = size / 4;
      roundRect(ctx, x, y, size, size, r);
      ctx.fill();
      break;
    }
    case "smooth": {
      const r = size / 2;
      roundRect(ctx, x, y, size, size, r);
      ctx.fill();
      break;
    }
    case "stars": {
      drawStar(ctx, x + size / 2, y + size / 2, size * 0.22, size * 0.1, 5);
      ctx.fill();
      break;
    }
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawEyes(
  ctx: CanvasRenderingContext2D,
  matrixSize: number,
  moduleSize: number,
  offset: number,
  config: QRConfig,
) {
  const eyePositions = [
    { row: 0, col: 0 },
    { row: 0, col: matrixSize - 7 },
    { row: matrixSize - 7, col: 0 },
  ];

  for (const pos of eyePositions) {
    drawEyePattern(ctx, pos.row, pos.col, moduleSize, offset, config);
  }
}

function drawEyePattern(
  ctx: CanvasRenderingContext2D,
  startRow: number,
  startCol: number,
  moduleSize: number,
  offset: number,
  config: QRConfig,
) {
  const { eyes } = config;

  ctx.fillStyle = eyes.frameColor;
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      const isOuterRing =
        r === 0 || r === 6 || c === 0 || c === 6;
      const isInnerArea = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      if (!isOuterRing && !isInnerArea) continue;
      const x = offset + (startCol + c) * moduleSize;
      const y = offset + (startRow + r) * moduleSize;
      drawEyeModule(ctx, eyes.frameStyle, x, y, moduleSize);
    }
  }

  ctx.fillStyle = eyes.ballColor;
  for (let r = 2; r <= 4; r++) {
    for (let c = 2; c <= 4; c++) {
      const x = offset + (startCol + c) * moduleSize;
      const y = offset + (startRow + r) * moduleSize;
      drawEyeModule(ctx, eyes.ballStyle, x, y, moduleSize);
    }
  }
}

function drawEyeModule(
  ctx: CanvasRenderingContext2D,
  style: EyeStyle,
  x: number,
  y: number,
  size: number,
) {
  switch (style) {
    case "square":
      ctx.fillRect(x, y, size, size);
      break;
    case "rounded":
      roundRect(ctx, x, y, size, size, size / 4);
      ctx.fill();
      break;
    case "circle": {
      const r = size / 2;
      ctx.beginPath();
      ctx.arc(x + r, y + r, r * 0.85, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "diamond": {
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x + size, y + size / 2);
      ctx.lineTo(x + size / 2, y + size);
      ctx.lineTo(x, y + size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  size: number,
  config: QRConfig,
) {
  const logoSize = size * config.logo.size;
  const logoX = (size - logoSize) / 2;
  const logoY = (size - logoSize) / 2;

  const logoAreaStart = Math.floor(logoX);
  const logoAreaEnd = Math.ceil(logoX + logoSize);

  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, logoSize / 2 + 4, 0, Math.PI * 2);
  ctx.fillStyle = config.bgColor;
  ctx.fill();
  ctx.strokeStyle = config.bgColor;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = config.logo.src!;
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, logoSize / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
  ctx.restore();
}

export async function canvasToDataURL(
  canvas: HTMLCanvasElement,
  format: string,
  quality?: number,
): Promise<string> {
  if (format === "svg") return canvasToSVG(canvas);
  const type = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  return canvas.toDataURL(type, quality);
}

function canvasToSVG(canvas: HTMLCanvasElement): string {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", String(canvas.width));
  svg.setAttribute("height", String(canvas.height));
  svg.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`);
  svg.setAttribute("xmlns", svgNS);
  const image = document.createElementNS(svgNS, "image");
  image.setAttribute("width", String(canvas.width));
  image.setAttribute("height", String(canvas.height));
  image.setAttribute("href", canvas.toDataURL("image/png"));
  svg.appendChild(image);
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
}
