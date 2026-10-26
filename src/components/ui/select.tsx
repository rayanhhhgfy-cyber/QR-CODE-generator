"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes } from "react";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "flex h-11 sm:h-10 w-full appearance-none rounded-xl border border-zinc-200 bg-white px-3 py-2 pr-8 text-sm text-zinc-900",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
  </div>
));
Select.displayName = "Select";
