import Link from "next/link";
import { QrCodeIcon, BarChart3, Palette, Download, Zap, Shield } from "lucide-react";

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
];

export default function MarketingPage() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 mb-8">
          <Zap className="w-4 h-4" />
          The most advanced QR code generator
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Create QR Codes That
          <span className="text-blue-600 dark:text-blue-400"> Stand Out</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
          Design stunning, fully customizable QR codes with dynamic redirects,
          real-time analytics, and multi-format export. No sign-up required.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/dashboard/qr-codes/new"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <QrCodeIcon className="w-5 h-5" />
            Create QR Code
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-center text-zinc-900 dark:text-zinc-100 mb-12">
          Everything you need
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-sm transition-shadow"
            >
              <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
