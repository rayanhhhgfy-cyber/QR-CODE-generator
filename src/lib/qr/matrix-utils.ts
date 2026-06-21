import QRCode from "qrcode";
import type { ContentFields, ContentType } from "./types";

export function buildQRContent(
  contentType: ContentType,
  fields: ContentFields,
): string {
  switch (contentType) {
    case "url":
      return fields.url || "";
    case "wifi": {
      const enc = fields.encryption || "WPA";
      const hidden = fields.hidden ? "true" : "false";
      return `WIFI:T:${enc};S:${fields.ssid || ""};P:${fields.password || ""};H:${hidden};`;
    }
    case "vcard": {
      const parts = ["BEGIN:VCARD", "VERSION:3.0"];
      if (fields.firstName || fields.lastName)
        parts.push(`N:${fields.lastName || ""};${fields.firstName || ""};;;`);
      if (fields.organization) parts.push(`ORG:${fields.organization}`);
      if (fields.phone) parts.push(`TEL:${fields.phone}`);
      if (fields.email) parts.push(`EMAIL:${fields.email}`);
      if (fields.address) parts.push(`ADR:;;${fields.address};;;`);
      if (fields.title) parts.push(`TITLE:${fields.title}`);
      parts.push("END:VCARD");
      return parts.join("\n");
    }
    case "text":
      return fields.text || "";
    case "sms":
      return `SMSTO:${fields.smsNumber || ""}:${fields.smsBody || ""}`;
    case "email": {
      const params = new URLSearchParams();
      if (fields.mailSubject) params.set("subject", fields.mailSubject);
      if (fields.mailBody) params.set("body", fields.mailBody);
      const qs = params.toString();
      return `mailto:${fields.mailTo || ""}${qs ? "?" + qs : ""}`;
    }
    default:
      return "";
  }
}

export async function generateQRMatrix(
  data: string,
  ecc: string,
): Promise<boolean[][]> {
  const qrData = await QRCode.create(data, {
    errorCorrectionLevel: ecc as "L" | "M" | "Q" | "H",
    version: undefined,
    maskPattern: undefined,
    toSJISFunc: undefined,
  });
  const modules = qrData.modules;
  const size = modules.size;
  const matrix: boolean[][] = [];
  for (let row = 0; row < size; row++) {
    matrix[row] = [];
    for (let col = 0; col < size; col++) {
      matrix[row][col] = modules.get(row, col) === 1;
    }
  }
  return matrix;
}
