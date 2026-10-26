"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClear = () => {
    localStorage.removeItem("qr-generator-store");
    localStorage.removeItem("qr-dynamic-redirects");
    setShowConfirm(false);
    router.refresh();
  };

  return (
    <div>
      <Header />
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Clear all data?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              This will permanently delete all saved QR codes. Continue?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleClear}>
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Application preferences and data management
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              All QR code data is stored locally in your browser&apos;s
              localStorage. Clearing your browser data will remove all
              saved codes.
            </p>
            <Button variant="danger" className="w-full sm:w-auto" onClick={() => setShowConfirm(true)}>
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
