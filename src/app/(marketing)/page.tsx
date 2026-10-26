import Link from "next/link";
import { QrCodeIcon, BarChart3, Palette, Download, Zap, Shield, ArrowRight, Check, MousePointerClick, Share2 } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Full Customization",
    description: "Shapes, gradients, eye styles, and logo embedding with real-time preview.",
  },
  {
    icon: Zap,
    title: "Dynamic QR Codes",
    description: "Change destination URLs anytime without regenerating the QR image.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track scans, device types, and geographic locations.",
  },
  {
    icon: Download,
    title: "Multi-Format Export",
    description: "Download as PNG, JPEG, SVG vector, or WebP at any resolution.",
  },
  {
    icon: Shield,
    title: "Auto-ECC Scaling",
    description: "Smart error correction that adapts to your design choices.",
  },
  {
    icon: Share2,
    title: "Share Anywhere",
    description: "Print it, post it, or stick it on packaging — one code works everywhere.",
  },
];

const steps = [
  { icon: MousePointerClick, title: "1. Add your content", description: "A link, text, Wi-Fi, contact or anything else." },
  { icon: Palette, title: "2. Make it yours", description: "Colours, shapes, eyes and your logo — live preview as you design." },
  { icon: Download, title: "3. Export & track", description: "Download in any format and watch scans roll in." },
];

const previewCells = [0, 1, 2, 6, 7, 8, 14, 15, 16, 21, 22, 28, 29, 35, 36, 42, 43, 44, 45, 46, 47, 48];

export default function MarketingPage() {
  return (
    <div className="overflow-x-clip">
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-24 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute top-40 -left-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl dark:bg-blue-500/10" />
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left qr-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 mb-6">
              <Zap className="w-4 h-4" />
              The most advanced QR code generator
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 leading-[1.05]">
              Create QR Codes That
              <span className="text-blue-600 dark:text-blue-400"> Stand Out</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-8">
              Design stunning, fully customizable QR codes with dynamic redirects,
              real-time analytics, and multi-format export. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <Link
                href="/dashboard/qr-codes/new"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition-all"
              >
                <QrCodeIcon className="w-5 h-5" />
                Create QR Code
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              {["No sign-up", "Free to start", "Works on any device"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full max-w-sm qr-fade-up">
            <div className="qr-float rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-xl shadow-zinc-900/5 dark:shadow-black/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your QR code</span>
                <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">Live preview</span>
              </div>
              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-4 sm:p-5">
                <div className="grid grid-cols-7 gap-1" aria-hidden>
                  {Array.from({ length: 49 }).map((_, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-[3px] ${previewCells.includes(i) || i % 5 === 0 ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-200 dark:bg-zinc-800"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "PNG · SVG", l: "Formats" },
                  { v: "Dynamic", l: "Redirects" },
                  { v: "Live", l: "Analytics" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-zinc-50 dark:bg-zinc-900 px-2 py-2.5">
                    <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.v}</div>
                    <div className="text-[11px] text-zinc-500">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-3">
          From idea to scan in minutes
        </h2>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl mx-auto">
          No design skills needed — every change shows up instantly in the preview.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-4">
                <step.icon className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">{step.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-10">
          Everything you need
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-4">
                <feature.icon className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-zinc-900 dark:bg-zinc-800 px-6 py-10 sm:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to make your first QR code?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">It takes less than a minute — and you can change the destination later without reprinting.</p>
          <Link
            href="/dashboard/qr-codes/new"
            className="inline-flex min-h-12 items-center justify-center gap-2 px-8 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-colors"
          >
            <QrCodeIcon className="w-5 h-5" />
            Create QR Code — it&apos;s free
          </Link>
        </div>
      </section>
    </div>
  );
}
