"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { storeActions } from "@/hooks/useQRStore";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showNameDialog) {
      setName(`QR-${Date.now()}`);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [showNameDialog]);

  const handleSave = () => {
    if (showNameDialog) {
      if (name.trim()) {
        storeActions.saveCode(name.trim());
        setSaved(true);
        setShowNameDialog(false);
        setTimeout(() => setSaved(false), 2000);
      }
    } else {
      setShowNameDialog(true);
    }
  };

  const handleReset = () => {
    storeActions.reset();
    setShowResetConfirm(false);
  };

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Reset all settings?
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              This will clear all design customizations.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
      <div>
        <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          QR Code Builder
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {showNameDialog ? (
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name your QR code"
              className="h-8 w-48 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setShowNameDialog(false);
              }}
            />
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowNameDialog(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(true)}>
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
              {saved ? "Saved!" : "Save"}
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
