"use client";

import { Label } from "@/components/ui/label";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import type { EyeStyle } from "@/lib/qr/types";

const eyeStyleOptions: { value: EyeStyle; label: string; icon: string }[] = [
  { value: "square", label: "Square", icon: "▬" },
  { value: "rounded", label: "Rounded", icon: "⬮" },
  { value: "circle", label: "Circle", icon: "◯" },
  { value: "diamond", label: "Diamond", icon: "◇" },
];

export function QREyesPanel() {
  const config = useQRConfig();

  return (
    <div className="space-y-5">
      <div>
        <Label>Outer Frame Style</Label>
        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
          {eyeStyleOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => storeActions.setEyeFrameStyle(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-colors ${
                config.eyes.frameStyle === opt.value
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="text-lg leading-none">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Frame Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={config.eyes.frameColor}
            onChange={(e) => storeActions.setEyeFrameColor(e.target.value)}
            className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            value={config.eyes.frameColor}
            onChange={(e) => storeActions.setEyeFrameColor(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Inner Ball Style</Label>
        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
          {eyeStyleOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => storeActions.setEyeBallStyle(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-colors ${
                config.eyes.ballStyle === opt.value
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="text-lg leading-none">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ball Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={config.eyes.ballColor}
            onChange={(e) => storeActions.setEyeBallColor(e.target.value)}
            className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            value={config.eyes.ballColor}
            onChange={(e) => storeActions.setEyeBallColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
