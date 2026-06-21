"use client";

import { useCallback } from "react";
import { nanoid } from "nanoid";
import { storeActions } from "./useQRStore";

const DYNAMIC_STORAGE_KEY = "qr-dynamic-redirects";

interface DynamicEntry {
  slug: string;
  destination: string;
  createdAt: number;
}

function getRedirects(): Record<string, DynamicEntry> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(DYNAMIC_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRedirects(map: Record<string, DynamicEntry>) {
  localStorage.setItem(DYNAMIC_STORAGE_KEY, JSON.stringify(map));
}

async function syncToServer(slug: string, destination: string) {
  try {
    await fetch("/api/redirects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, destination }),
    });
  } catch {
    // Server sync is best-effort; localStorage is the source of truth locally
  }
}

export function useDynamicQR() {
  const createSlug = useCallback(
    async (destination: string): Promise<string> => {
      const slug = nanoid(10);
      const redirects = getRedirects();
      redirects[slug] = { slug, destination, createdAt: Date.now() };
      saveRedirects(redirects);
      storeActions.setSlug(slug);
      storeActions.setDynamicUrl(destination);
      syncToServer(slug, destination);
      return slug;
    },
    [],
  );

  const updateDestination = useCallback(
    async (slug: string, newDestination: string) => {
      const redirects = getRedirects();
      if (redirects[slug]) {
        redirects[slug].destination = newDestination;
        saveRedirects(redirects);
        storeActions.setDynamicUrl(newDestination);
        syncToServer(slug, newDestination);
      }
    },
    [],
  );

  const getDestination = useCallback((slug: string): string | null => {
    const redirects = getRedirects();
    return redirects[slug]?.destination || null;
  }, []);

  const getAllRedirects = useCallback((): DynamicEntry[] => {
    return Object.values(getRedirects());
  }, []);

  return { createSlug, updateDestination, getDestination, getAllRedirects };
}
