"use client";

import { useMemo } from "react";
import { checkScannability } from "@/lib/qr/scannability";
import { Badge } from "@/components/ui/badge";

interface Props {
  fgColor: string;
  bgColor: string;
  logoSize: number;
}

export function QRScannabilityBadge({ fgColor, bgColor, logoSize }: Props) {
  const result = useMemo(
    () => checkScannability(fgColor, bgColor, logoSize),
    [fgColor, bgColor, logoSize],
  );

  const variant =
    result.score === "good"
      ? "success"
      : result.score === "warning"
        ? "warning"
        : "danger";

  return <Badge variant={variant}>{result.message}</Badge>;
}
