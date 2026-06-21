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
    <div className={cn("divide-y divide-zinc-200 dark:divide-zinc-800", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center gap-3 py-3 px-1 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
            >
              {item.icon && <span className="text-zinc-500">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-zinc-400 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-4 pt-1 px-1">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
