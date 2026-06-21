export interface AnalyticsData {
  totalScans: number;
  uniqueScans: number;
  scansOverTime: { date: string; count: number }[];
  deviceBreakdown: { name: string; value: number; color: string }[];
  geoBreakdown: { country: string; city: string; count: number }[];
}

export function emptyAnalytics(): AnalyticsData {
  return {
    totalScans: 0,
    uniqueScans: 0,
    scansOverTime: [],
    deviceBreakdown: [],
    geoBreakdown: [],
  };
}
