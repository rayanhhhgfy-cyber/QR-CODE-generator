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
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Your QR Codes
            </h2>
            <p className="text-sm text-zinc-500">
              Manage and edit all your saved QR codes
            </p>
          </div>
          <Link href="/dashboard/qr-codes/new">
            <Button>
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
