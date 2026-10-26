"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Scan, Users } from "lucide-react";

interface Props {
  totalScans: number;
  uniqueScans: number;
}

export function AnalyticsStats({ totalScans, uniqueScans }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 shrink-0">
            <Scan className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {totalScans.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">Total Scans</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {uniqueScans.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">Unique Scanners</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
