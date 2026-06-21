"use client";

import { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { useExport } from "@/hooks/useExport";
import { generateQRMatrix, buildQRContent } from "@/lib/qr/matrix-utils";
import { EXPORT_SIZES } from "@/lib/qr/constants";
import type { ExportFormat } from "@/lib/qr/types";
import { Download } from "lucide-react";

export function QRExportPanel() {
  const config = useQRConfig();
  const [format, setFormat] = useState<ExportFormat>("png");
  const [size, setSize] = useState(1024);
  const [exporting, setExporting] = useState(false);
  const { exportQR, exportSVG } = useExport();

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const data = buildQRContent(config.contentType, config.content);
      if (!data) return;
      const matrix = await generateQRMatrix(data, config.ecc);
      const fileName = `qrcode-${config.contentType}-${Date.now()}`;

      if (format === "svg") {
        await exportSVG(matrix, config, size, fileName);
      } else {
        await exportQR(matrix, config, format, size, fileName);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [config, exportQR, exportSVG, format, size]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Format</Label>
        <Select
          value={format}
          onChange={(e) => setFormat(e.target.value as ExportFormat)}
        >
          <option value="png">PNG (Lossless)</option>
          <option value="jpeg">JPEG (Small file)</option>
          <option value="svg">SVG (Vector)</option>
          <option value="webp">WebP (Modern)</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Resolution</Label>
        <div className="grid grid-cols-3 gap-2">
          {EXPORT_SIZES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSize(opt.value)}
              className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                size === opt.value
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {format === "svg" && (
          <p className="text-xs text-zinc-400 mt-1">
            SVG is resolution-independent. Size is for viewport only.
          </p>
        )}
      </div>

      <Button
        onClick={handleExport}
        disabled={exporting}
        className="w-full"
        size="lg"
      >
        {exporting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {exporting ? "Exporting..." : `Download ${format.toUpperCase()}`}
      </Button>
    </div>
  );
}
