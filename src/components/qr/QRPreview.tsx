"use client";

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { generateQRMatrix, buildQRContent } from "@/lib/qr/matrix-utils";
import { QRCodeRenderer } from "./QRCodeRenderer";
import { QRScannabilityBadge } from "./QRScannabilityBadge";
import { useQRConfig, useQRConfigValue, storeActions } from "@/hooks/useQRStore";

export function QRPreview() {
  const cfg = useQRConfig();
  const contentType = cfg.contentType;
  const content = cfg.content;
  const fgColor = cfg.fgColor;
  const bgColor = cfg.bgColor;
  const ecc = cfg.ecc;
  const autoEcc = cfg.autoEcc;
  const logoSrc = cfg.logo.src;
  const logoSize = cfg.logo.size;

  const [matrix, setMatrix] = useState<boolean[][]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const matrixKey = useRef(0);

  const size = 280;

  useEffect(() => {
    const buildMatrix = async () => {
      setLoading(true);
      try {
        const data = buildQRContent(contentType, content);
        if (!data) {
          setMatrix([]);
          return;
        }
        const m = await generateQRMatrix(data, ecc);
        setMatrix(m);
        matrixKey.current++;
      } catch {
        setMatrix([]);
      } finally {
        setLoading(false);
      }
    };
    buildMatrix();
  }, [contentType, content, fgColor, bgColor, ecc, autoEcc, logoSrc, logoSize]);

  const handleCanvasReady = useCallback((_canvas: HTMLCanvasElement) => {}, []);

  const rendererConfig = useMemo(() => cfg, [
    cfg.qrType, cfg.contentType, cfg.content, cfg.shape,
    cfg.fgColor, cfg.bgColor, cfg.fgGradient, cfg.bgGradient,
    cfg.eyes, cfg.logo.src, cfg.logo.size, cfg.ecc,
    cfg.autoEcc, cfg.marginSize,
  ]);

  return (
    <div
      ref={containerRef}
      className="lg:sticky lg:top-24 flex flex-col items-center gap-4 w-full"
    >
      <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 sm:p-4 shadow-md w-full max-w-[320px]">
        <div
          className="relative qr-preview-canvas w-full max-w-[280px] mx-auto"
          style={{ width: size, height: size, maxWidth: "100%" }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-950/80 rounded-lg z-10">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {matrix.length > 0 ? (
            <QRCodeRenderer
              key={matrixKey.current}
              matrix={matrix}
              config={rendererConfig}
              size={size}
              onCanvasReady={handleCanvasReady}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-zinc-300 dark:text-zinc-600 text-sm">
              Enter content to generate
            </div>
          )}
        </div>
      </div>

      {matrix.length > 0 && (
        <QRScannabilityBadge
          fgColor={cfg.fgColor}
          bgColor={cfg.bgColor}
          logoSize={cfg.logo.size}
        />
      )}

      <div className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
        ECC: {cfg.ecc} {cfg.autoEcc ? "(auto)" : "(manual)"}
      </div>
    </div>
  );
}
