"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 sm:w-9 sm:h-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-zinc-600" />
      ) : (
        <Sun className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
}
