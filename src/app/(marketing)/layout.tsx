import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { QrCodeIcon } from "lucide-react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 overflow-x-clip">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 sm:px-6 h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 shrink-0 min-h-11">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30">
            <QrCodeIcon className="w-5 h-5" />
          </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            QR Pro
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-2"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/qr-codes/new"
            className="inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors"
          >
            Create QR
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-8 px-4 text-center border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">QR Generator Pro</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Design, track and export QR codes — no sign-up required. &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
