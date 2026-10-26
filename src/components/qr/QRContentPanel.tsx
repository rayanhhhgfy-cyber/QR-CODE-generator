"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQRConfig, storeActions } from "@/hooks/useQRStore";
import { CONTENT_TYPE_LABELS } from "@/lib/qr/constants";
import type { ContentType } from "@/lib/qr/types";
import { Link, Wifi, User, FileText, MessageSquare, Mail } from "lucide-react";

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  url: <Link className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  vcard: <User className="w-4 h-4" />,
  text: <FileText className="w-4 h-4" />,
  sms: <MessageSquare className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
};

export function QRContentPanel() {
  const config = useQRConfig();

  return (
    <div className="space-y-4">
      <div>
        <Label>Content Type</Label>
        <div className="grid grid-cols-3 gap-2 mt-1.5">
          {(Object.entries(CONTENT_TYPE_LABELS) as [ContentType, string][]).map(
            ([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => storeActions.setContentType(type)}
                className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 text-xs transition-colors ${
                  config.contentType === type
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-300"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                }`}
              >
                {contentTypeIcons[type]}
                <span>{label}</span>
              </button>
            ),
          )}
        </div>
      </div>

      <ContentFormFields
        contentType={config.contentType}
        content={config.content}
      />
    </div>
  );
}

function ContentFormFields({
  contentType,
  content,
}: {
  contentType: ContentType;
  content: Record<string, any>;
}) {
  const setField = storeActions.setContentField;

  switch (contentType) {
    case "url":
      return (
        <div className="space-y-2">
          <Label>Destination URL</Label>
          <Input
            placeholder="https://example.com"
            value={content.url || ""}
            onChange={(e) => setField("url", e.target.value)}
          />
        </div>
      );
    case "wifi":
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>SSID (Network Name)</Label>
            <Input
              placeholder="My WiFi"
              value={content.ssid || ""}
              onChange={(e) => setField("ssid", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={content.password || ""}
              onChange={(e) => setField("password", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Encryption</Label>
            <Select
              value={content.encryption || "WPA"}
              onChange={(e) => setField("encryption", e.target.value)}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="none">None (Open)</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={content.hidden || false}
              onChange={(v) => setField("hidden", v)}
            />
            <Label>Hidden network</Label>
          </div>
        </div>
      );
    case "vcard":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                placeholder="John"
                value={content.firstName || ""}
                onChange={(e) => setField("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                placeholder="Doe"
                value={content.lastName || ""}
                onChange={(e) => setField("lastName", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Organization</Label>
            <Input
              placeholder="Acme Inc"
              value={content.organization || ""}
              onChange={(e) => setField("organization", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              placeholder="+1 555-0123"
              value={content.phone || ""}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="john@example.com"
              value={content.email || ""}
              onChange={(e) => setField("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              placeholder="123 Main St, City"
              value={content.address || ""}
              onChange={(e) => setField("address", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              placeholder="Engineer"
              value={content.title || ""}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>
        </div>
      );
    case "text":
      return (
        <div className="space-y-2">
          <Label>Text Content</Label>
          <textarea
            className="flex min-h-[100px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Enter your text here..."
            value={content.text || ""}
            onChange={(e) => setField("text", e.target.value)}
          />
        </div>
      );
    case "sms":
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              placeholder="+1 555-0123"
              value={content.smsNumber || ""}
              onChange={(e) => setField("smsNumber", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Message (optional)</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              placeholder="Message body..."
              value={content.smsBody || ""}
              onChange={(e) => setField("smsBody", e.target.value)}
            />
          </div>
        </div>
      );
    case "email":
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>To</Label>
            <Input
              placeholder="recipient@example.com"
              value={content.mailTo || ""}
              onChange={(e) => setField("mailTo", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              placeholder="Subject"
              value={content.mailSubject || ""}
              onChange={(e) => setField("mailSubject", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Body</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              placeholder="Email body..."
              value={content.mailBody || ""}
              onChange={(e) => setField("mailBody", e.target.value)}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}
