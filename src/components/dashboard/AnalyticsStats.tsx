"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Scan, Users } from "lucide-react";

interface Props {
  totalScans: number;
  uniqueScans: number;
}

export function AnalyticsStats({ totalScans, uniqueScans }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <Scan className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {totalScans.toLocaleString()}
            </div>
            <div className="text-xs text-zinc-500">Total Scans</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
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
