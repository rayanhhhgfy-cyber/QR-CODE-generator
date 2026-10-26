"use client";

import { QRPreview } from "@/components/qr/QRPreview";
import { QRContentPanel } from "@/components/qr/QRContentPanel";
import { QRDesignPanel } from "@/components/qr/QRDesignPanel";
import { QREyesPanel } from "@/components/qr/QREyesPanel";
import { QRLogoPanel } from "@/components/qr/QRLogoPanel";
import { QRExportPanel } from "@/components/qr/QRExportPanel";
import { QRTemplates } from "@/components/qr/QRTemplates";
import { Accordion } from "@/components/ui/accordion";
import { Header } from "@/components/dashboard/Header";
import {
  Link,
  Palette,
  Eye,
  Image,
  Download,
  LayoutTemplate,
} from "lucide-react";

export default function NewQRCodePage() {
  const accordionItems = [
    {
      id: "templates",
      title: "Templates",
      icon: <LayoutTemplate className="w-4 h-4" />,
      content: <QRTemplates />,
    },
    {
      id: "content",
      title: "Content",
      icon: <Link className="w-4 h-4" />,
      content: <QRContentPanel />,
    },
    {
      id: "design",
      title: "Design",
      icon: <Palette className="w-4 h-4" />,
      content: <QRDesignPanel />,
    },
    {
      id: "eyes",
      title: "Eyes (Detection Patterns)",
      icon: <Eye className="w-4 h-4" />,
      content: <QREyesPanel />,
    },
    {
      id: "logo",
      title: "Logo",
      icon: <Image className="w-4 h-4" />,
      content: <QRLogoPanel />,
    },
    {
      id: "export",
      title: "Export",
      icon: <Download className="w-4 h-4" />,
      content: <QRExportPanel />,
    },
  ];

  return (
    <div className="flex flex-col lg:h-full">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        <div className="order-2 lg:order-1 flex-1 lg:overflow-y-auto p-4 sm:p-6 lg:p-8 lg:border-r border-zinc-200 dark:border-zinc-800 min-w-0">
          <div className="max-w-xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                QR Code Builder
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Customize every aspect of your QR code
              </p>
            </div>
            <Accordion items={accordionItems} />
          </div>
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-[400px] xl:w-[480px] shrink-0 lg:overflow-y-auto p-4 sm:p-6 bg-white dark:bg-zinc-950 border-b lg:border-b-0 border-zinc-200 dark:border-zinc-800">
          <QRPreview />
        </div>
      </div>
    </div>
  );
}
