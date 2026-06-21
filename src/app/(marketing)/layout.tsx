import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { QrCodeIcon } from "lucide-react";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <header className="flex items-center justify-between px-6 h-16 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <QrCodeIcon className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            QR Pro
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-600 border-t border-zinc-200 dark:border-zinc-800">
        QR Generator Pro &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
