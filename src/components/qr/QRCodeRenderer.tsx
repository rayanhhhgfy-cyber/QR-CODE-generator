"use client";

import { useEffect, useRef } from "react";
import { renderQRCode } from "@/lib/qr/renderer";
import type { QRConfig } from "@/lib/qr/types";

interface Props {
  matrix: boolean[][];
  config: QRConfig;
  size: number;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export function QRCodeRenderer({ matrix, config, size, onCanvasReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || matrix.length === 0) return;
    const canvas = renderQRCode({ size, config, matrix });
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(canvas);
    onCanvasReady?.(canvas);
  }, [matrix, config, size, onCanvasReady]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
      style={{ minHeight: size }}
    />
  );
}
