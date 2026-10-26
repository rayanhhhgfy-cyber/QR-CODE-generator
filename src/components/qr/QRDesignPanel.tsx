"use client";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { SHAPE_LABELS } from "@/lib/qr/constants";
import type { Shape } from "@/lib/qr/types";

const shapeOptions: { value: Shape; label: string; icon: string }[] = [
  { value: "squares", label: "Squares", icon: "■" },
  { value: "dots", label: "Dots", icon: "●" },
  { value: "rounded", label: "Rounded", icon: "▣" },
  { value: "smooth", label: "Smooth", icon: "◉" },
  { value: "stars", label: "Stars", icon: "★" },
];

export function QRDesignPanel() {
  const config = useQRConfig();

  const hasFgGradient = !!(config.fgGradient && config.fgGradient.type !== "none");
  const hasBgGradient = !!(config.bgGradient && config.bgGradient.type !== "none");

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Data Pixel Shape</Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {shapeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => storeActions.setShape(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-colors ${
                config.shape === opt.value
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

      <div className="space-y-3">
        <Label>Foreground Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={config.fgColor}
            onChange={(e) => storeActions.setFgColor(e.target.value)}
            className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            value={config.fgColor}
            onChange={(e) => storeActions.setFgColor(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={hasFgGradient}
            onChange={(v) =>
              storeActions.setFgGradient(
                v
                  ? { type: "linear", color1: config.fgColor, color2: "#ffffff", angle: 135 }
                  : null,
              )
            }
          />
          <Label>Gradient</Label>
        </div>
        {hasFgGradient && config.fgGradient && (
          <GradientControls
            gradient={config.fgGradient}
            onChange={(g) => storeActions.setFgGradient(g)}
          />
        )}
      </div>

      <div className="space-y-3">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={config.bgColor}
            onChange={(e) => storeActions.setBgColor(e.target.value)}
            className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            value={config.bgColor}
            onChange={(e) => storeActions.setBgColor(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={hasBgGradient}
            onChange={(v) =>
              storeActions.setBgGradient(
                v
                  ? { type: "linear", color1: config.bgColor, color2: "#000000", angle: 135 }
                  : null,
              )
            }
          />
          <Label>Gradient</Label>
        </div>
        {hasBgGradient && config.bgGradient && (
          <GradientControls
            gradient={config.bgGradient}
            onChange={(g) => storeActions.setBgGradient(g)}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={config.autoEcc}
          onChange={(v) => storeActions.setAutoEcc(v)}
        />
        <div>
          <Label>Auto Error Correction</Label>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            Scales ECC based on logo size and contrast
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Margin Size: {config.marginSize}</Label>
        <Slider
          value={config.marginSize}
          onChange={(v) => storeActions.setMarginSize(v)}
          min={0}
          max={8}
          step={1}
        />
      </div>
    </div>
  );
}

function GradientControls({
  gradient,
  onChange,
}: {
  gradient: { type: string; color1: string; color2: string; angle: number };
  onChange: (g: any) => void;
}) {
  return (
    <div className="space-y-3 pl-2 border-l-2 border-zinc-200 dark:border-zinc-700">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={gradient.type}
          onChange={(e) => onChange({ ...gradient, type: e.target.value })}
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Color 1</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={gradient.color1}
            onChange={(e) => onChange({ ...gradient, color1: e.target.value })}
            className="h-10 w-10 rounded-lg border cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-950 dark:text-zinc-50"
            value={gradient.color1}
            onChange={(e) => onChange({ ...gradient, color1: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Color 2</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={gradient.color2}
            onChange={(e) => onChange({ ...gradient, color2: e.target.value })}
            className="h-10 w-10 rounded-lg border cursor-pointer"
          />
          <input
            className="flex-1 rounded-lg border px-3 py-2 text-sm bg-white dark:bg-zinc-950 dark:text-zinc-50"
            value={gradient.color2}
            onChange={(e) => onChange({ ...gradient, color2: e.target.value })}
          />
        </div>
      </div>
      {gradient.type === "linear" && (
        <div className="space-y-2">
          <Label>Angle: {gradient.angle}°</Label>
          <Slider
            value={gradient.angle}
            onChange={(v) => onChange({ ...gradient, angle: v })}
            min={0}
            max={360}
            step={1}
          />
        </div>
      )}
    </div>
  );
}
