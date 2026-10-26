"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border bg-white shadow-sm transition-colors dark:bg-zinc-950",
              isOpen
                ? "border-blue-200 dark:border-blue-900/60 ring-1 ring-blue-100 dark:ring-blue-950/60"
                : "border-zinc-200 dark:border-zinc-800",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full min-h-12 items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 rounded-2xl transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer"
            >
              <span className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                isOpen ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
              )}>{item.icon}</span>
              <span className="flex-1">{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 shrink-0 text-zinc-400 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800/70 mt-1">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
