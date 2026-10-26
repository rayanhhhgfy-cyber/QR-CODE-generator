"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const val = Math.round((min + pct * (max - min)) / step) * step;
      onChange(Math.min(max, Math.max(min, val)));
    },
    [min, max, step, onChange],
  );

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      className={cn("relative h-2 w-full cursor-pointer rounded-full bg-zinc-200 dark:bg-zinc-700", className)}
      onPointerDown={handlePointerDown}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-blue-600 dark:bg-blue-500"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 sm:h-5 sm:w-5 rounded-full bg-white border-2 border-blue-600 dark:border-blue-500 shadow-sm"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}
