import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer whitespace-nowrap",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20 dark:bg-blue-500 dark:hover:bg-blue-600",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
        variant === "ghost" &&
          "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20",
        size === "sm" && "min-h-11 sm:min-h-0 sm:h-8 px-3.5 sm:px-3 text-xs gap-1.5",
        size === "md" && "min-h-11 sm:min-h-0 sm:h-10 px-4 text-sm gap-2",
        size === "lg" && "min-h-12 px-6 text-base gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
