"use client";

import { QRCodeList } from "@/components/dashboard/QRCodeList";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export function QRCodeDashboard() {
  return (
    <div>
      <Header />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Your QR Codes
            </h2>
            <p className="text-sm text-zinc-500">
              Manage and edit all your saved QR codes
            </p>
          </div>
          <Link href="/dashboard/qr-codes/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New QR Code
            </Button>
          </Link>
        </div>
        <QRCodeList />
      </div>
    </div>
  );
}
