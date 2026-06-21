"use client";

import { useState } from "react";
import { useSavedCodes, storeActions } from "@/hooks/useQRStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, BarChart3, ExternalLink } from "lucide-react";
import Link from "next/link";

export function QRCodeList() {
  const savedCodes = useSavedCodes();
  const deleteCode = storeActions.deleteCode;
  const loadCode = storeActions.loadCode;
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (savedCodes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-zinc-300 dark:text-zinc-600 mb-2">
          <ExternalLink className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          No QR codes saved yet. Create your first one!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {savedCodes.map((code) => (
        <Card key={code.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {code.name}
                  </h3>
                  <Badge variant="default">
                    {code.config.qrType === "dynamic" ? "Dynamic" : "Static"}
                  </Badge>
                  <Badge variant="default">
                    {code.config.contentType.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Created {new Date(code.createdAt).toLocaleDateString()}{" "}
                  &middot; {code.scanCount} scans
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Link href={`/dashboard/qr-codes/${code.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadCode(code.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/qr-codes/${code.id}/analytics`}
                >
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Delete QR code?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
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
