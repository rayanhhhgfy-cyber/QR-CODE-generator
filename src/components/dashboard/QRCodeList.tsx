"use client";

import { useState } from "react";
import { useSavedCodes, storeActions } from "@/hooks/useQRStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, BarChart3, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";

export function QRCodeList() {
  const savedCodes = useSavedCodes();
  const deleteCode = storeActions.deleteCode;
  const loadCode = storeActions.loadCode;
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (savedCodes.length === 0) {
    return (
      <div className="text-center py-14 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          <QrCode className="w-8 h-8" />
        </div>
        <p className="font-medium text-zinc-900 dark:text-zinc-100">No QR codes saved yet</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Create your first one — it only takes a minute.
        </p>
        <p className="text-zinc-300 dark:text-zinc-600 mt-3">
          <ExternalLink className="w-5 h-5 mx-auto" />
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {savedCodes.map((code) => (
        <Card key={code.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <QrCode className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {code.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Created {new Date(code.createdAt).toLocaleDateString()}{" "}
                    &middot; {code.scanCount} scans
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="default">
                  {code.config.qrType === "dynamic" ? "Dynamic" : "Static"}
                </Badge>
                <Badge variant="default">
                  {code.config.contentType.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-100 dark:border-zinc-800/70">
                <Link href={`/dashboard/qr-codes/${code.id}`} className="flex-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => loadCode(code.id)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/qr-codes/${code.id}/analytics`}
                  className="flex-1"
                >
                  <Button variant="ghost" size="sm" className="w-full">
                    <BarChart3 className="w-4 h-4" />
                    Stats
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Delete ${code.name}`}
                  onClick={() => setDeleteConfirm(code.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Delete QR code?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={() => { deleteCode(deleteConfirm); setDeleteConfirm(null); }}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
