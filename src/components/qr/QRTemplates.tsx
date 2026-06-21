"use client";

import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { QR_TEMPLATES } from "@/lib/qr/templates";
import { Check } from "lucide-react";

export function QRTemplates() {
  const config = useQRConfig();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {QR_TEMPLATES.map((template) => {
        const isActive =
          config.fgColor === (template.config.fgColor || "#000000") &&
          config.shape === (template.config.shape || "squares");

        return (
          <button
            key={template.id}
            type="button"
            onClick={() => storeActions.applyTemplate(template.config)}
            className={`relative rounded-xl border-2 p-3 text-left transition-all hover:shadow-sm ${
              isActive
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
                : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
            }`}
          >
            {isActive && (
              <span className="absolute top-2 right-2 text-blue-600 dark:text-blue-400">
                <Check className="w-4 h-4" />
              </span>
            )}
            <div
              className="w-full h-16 rounded-lg mb-2"
              style={{
                background:
                  template.config.fgGradient && template.config.fgGradient.type !== "none"
                    ? `linear-gradient(${template.config.fgGradient.angle}deg, ${template.config.fgGradient.color1}, ${template.config.fgGradient.color2})`
                    : template.config.fgColor || "#000",
              }}
            />
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {template.name}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {template.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
