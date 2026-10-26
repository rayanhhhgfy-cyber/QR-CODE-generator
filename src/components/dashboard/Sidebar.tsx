"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  QrCode,
  Settings,
  ChevronLeft,
  QrCodeIcon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/qr-codes/new", label: "Create QR", icon: QrCode },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-200 shrink-0",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="flex items-center gap-2 px-4 h-14 border-b border-zinc-200 dark:border-zinc-800">
          <QrCodeIcon className="w-6 h-6 text-blue-600 shrink-0" />
          {!collapsed && (
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm truncate">
              QR Generator
            </span>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50",
                collapsed && "justify-center px-2",
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex items-center justify-center w-full h-11 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
          </button>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 min-h-16 py-2 text-[11px] font-medium transition-colors",
              isActive(item.href)
                ? "text-blue-600 dark:text-blue-400"
                : "text-zinc-500 dark:text-zinc-400",
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 min-h-16 py-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          Menu
        </button>
      </nav>

      {/* Mobile drawer (opened from the bottom nav Menu button) */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/40 cursor-pointer"
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white dark:bg-zinc-950 shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-200 dark:border-zinc-800">
              <span className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                <QrCodeIcon className="w-6 h-6 text-blue-600" />
                QR Generator
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center gap-3 px-3 rounded-xl text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50",
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="p-4 text-xs text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
              Design, track and export QR codes — no sign-up required.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
