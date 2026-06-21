"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useDynamicQR } from "@/hooks/useDynamicQR";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, Link as LinkIcon, Loader2 } from "lucide-react";

export default function QRSettingsPage() {
  const params = useParams();
  const id = params.id as string;
  const config = useQRConfig();
  const { createSlug, updateDestination } = useDynamicQR();
  const [destUrl, setDestUrl] = useState(config.dynamicUrl || "");
  const [saved, setSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleCreateDynamic = useCallback(async () => {
    if (!destUrl) return;
    setSyncing(true);
    try {
      await createSlug(destUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSyncing(false);
    }
  }, [destUrl, createSlug]);

  const handleUpdate = useCallback(async () => {
    if (!config.slug || !destUrl) return;
    setSyncing(true);
    try {
      await updateDestination(config.slug, destUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSyncing(false);
    }
  }, [config.slug, destUrl, updateDestination]);

  const redirectUrl = config.slug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/api/qr/${config.slug}`
    : null;

  return (
    <div>
      <Header />
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            QR Code Settings
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage dynamic redirect for {id?.slice(0, 8)}...
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dynamic Redirect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Destination URL</Label>
              <Input
                placeholder="https://example.com/new-destination"
                value={destUrl}
                onChange={(e) => setDestUrl(e.target.value)}
              />
              <p className="text-xs text-zinc-400">
                Update this URL at any time. The existing QR code will
                redirect to the new destination without needing to
                regenerate.
              </p>
            </div>

            {!config.slug ? (
              <Button onClick={handleCreateDynamic} disabled={!destUrl || syncing}>
                {syncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                {syncing ? "Syncing..." : "Generate Dynamic QR Slug"}
              </Button>
            ) : (
              <div className="space-y-3">
                <Button onClick={handleUpdate} disabled={!destUrl || syncing}>
                  {syncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {syncing ? "Syncing..." : saved ? "Saved!" : "Update Destination"}
                </Button>

                {redirectUrl && (
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Label>QR Redirect URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 text-xs text-zinc-600 dark:text-zinc-400 break-all">
                        {redirectUrl}
                      </code>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                      Generate a new QR code with this URL. When scanned, it will redirect to your destination.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
