"use client";

import { useCallback } from "react";
import { renderQRCode } from "@/lib/qr/renderer";
import type { QRConfig, ExportFormat } from "@/lib/qr/types";

export function useExport() {
  const exportQR = useCallback(
    async (
      matrix: boolean[][],
      config: QRConfig,
      format: ExportFormat,
      size: number,
      fileName: string,
    ) => {
      const canvas = renderQRCode({ size, config, matrix });

      return new Promise<void>((resolve, reject) => {
        try {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to generate blob"));
                return;
              }
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${fileName}.${format === "jpeg" ? "jpg" : format}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              resolve();
            },
            format === "png"
              ? "image/png"
              : format === "jpeg"
                ? "image/jpeg"
                : format === "webp"
                  ? "image/webp"
                  : "image/png",
          );
        } catch (err) {
          reject(err);
        }
      });
    },
    [],
  );

  const exportSVG = useCallback(
    async (
      matrix: boolean[][],
      config: QRConfig,
      size: number,
      fileName: string,
    ) => {
      const canvas = renderQRCode({ size, config, matrix });
      const dataUrl = canvas.toDataURL("image/png");
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
      svg.setAttribute("xmlns", svgNS);
      const image = document.createElementNS(svgNS, "image");
      image.setAttribute("width", String(size));
      image.setAttribute("height", String(size));
      image.setAttribute("href", dataUrl);
      svg.appendChild(image);
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [],
  );

  return { exportQR, exportSVG };
}
