"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { Upload, X } from "lucide-react";

export function QRLogoPanel() {
  const config = useQRConfig();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      storeActions.setLogoSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      {!config.logo.src ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-8 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-zinc-400" />
          <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          <p className="text-xs text-zinc-400">PNG, JPG or WebP</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative inline-block rounded-xl border border-zinc-200 dark:border-zinc-700 p-2">
            <img
              src={config.logo.src}
              alt="Logo preview"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => storeActions.setLogoSrc(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            <Label>
              Logo Size: {Math.round(config.logo.size * 100)}%
            </Label>
            <Slider
              value={config.logo.size * 100}
              onChange={(v) => storeActions.setLogoSize(v / 100)}
              min={10}
              max={40}
              step={1}
            />
            <p className="text-xs text-zinc-400">
              Larger logos reduce scannability. ECC auto-scales above 15%.
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {!config.logo.src && (
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-4 h-4" />
          Upload Logo
        </Button>
      )}
    </div>
  );
}
