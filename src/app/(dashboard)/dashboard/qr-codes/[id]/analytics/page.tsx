"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { AnalyticsStats } from "@/components/dashboard/AnalyticsStats";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsChart";
import { QRCodeRenderer } from "@/components/qr/QRCodeRenderer";
import { Header } from "@/components/dashboard/Header";
import { generateQRMatrix, buildQRContent } from "@/lib/qr/matrix-utils";
import { getState } from "@/hooks/useQRStore";
import type { AnalyticsData } from "@/lib/analytics/types";
import type { QRConfig } from "@/lib/qr/types";
import { getRecommendedECC } from "@/lib/qr/ecc-utils";

export default function AnalyticsPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchDataRef = useRef<() => void>(() => {});
  const [matrix, setMatrix] = useState<boolean[][]>([]);
  const [qrConfig, setQrConfig] = useState<QRConfig | null>(null);
  const [testScans, setTestScans] = useState(0);

  const handleTestScan = useCallback(async () => {
    const saved = getState().savedCodes.find((c) => c.id === id);
    if (!saved?.config.slug) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    try {
      await fetch(`${origin}/api/qr/${saved.config.slug}`, { redirect: "manual" });
      setTestScans((n) => n + 1);
      setTimeout(() => fetchDataRef.current(), 500);
    } catch {}
  }, [id]);

  useEffect(() => {
    const saved = getState().savedCodes.find((c) => c.id === id);
    if (saved) {
      const cfg = saved.config;
      const ecc = getRecommendedECC(cfg.logo.size, cfg.fgColor, cfg.bgColor, cfg.autoEcc);
      const fullConfig = { ...cfg, ecc };
      setQrConfig(fullConfig);
      const content = buildQRContent(cfg.contentType, cfg.content);
      if (content) {
        generateQRMatrix(content, ecc).then(setMatrix).catch(() => {});
      }
      if (cfg.slug) {
        fetch("/api/redirects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: cfg.slug, destination: cfg.dynamicUrl }),
        }).catch(() => {});
      }
    }
  }, [id]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/${id}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDataRef.current = fetchData;
    if (id) fetchData();
  }, [id, fetchData]);

  const handleCanvasReady = () => {};

  return (
    <div>
      <Header />
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Analytics
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 break-all">
              Real scan performance for QR code {id?.slice(0, 8)}...
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-3 sm:ml-auto">
            <Button variant="secondary" size="sm" onClick={handleTestScan}>
              <Smartphone className="w-4 h-4" />
              Test Scan ({testScans})
            </Button>
            {matrix.length > 0 && qrConfig && (
              <div className="shrink-0">
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-sm">
                  <QRCodeRenderer
                    matrix={matrix}
                    config={qrConfig}
                    size={120}
                    onCanvasReady={handleCanvasReady}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data && data.totalScans > 0 ? (
          <div className="space-y-6">
            <AnalyticsStats
              totalScans={data.totalScans}
              uniqueScans={data.uniqueScans}
            />
            <AnalyticsCharts
              scansOverTime={data.scansOverTime}
              deviceBreakdown={data.deviceBreakdown}
              geoBreakdown={data.geoBreakdown}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-400 dark:text-zinc-500 text-sm">
              {data
                ? "No scans recorded yet. Share your QR code to start collecting data."
                : "Analytics data is not available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
