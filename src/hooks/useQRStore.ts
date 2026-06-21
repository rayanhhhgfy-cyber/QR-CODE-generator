"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  QRConfig,
  QRCodeEntry,
  ContentType,
  Shape,
  EyeStyle,
  ECCLevel,
  Gradient,
  LogoConfig,
  EyeConfig,
  ContentFields,
} from "@/lib/qr/types";
import { DEFAULT_QR_CONFIG } from "@/lib/qr/constants";
import { getRecommendedECC } from "@/lib/qr/ecc-utils";

type Listener = () => void;

interface QRStoreState {
  currentConfig: QRConfig;
  savedCodes: QRCodeEntry[];
  currentCodeId: string | null;
}

type QRStoreActions = {
  setQRType: (t: QRConfig["qrType"]) => void;
  setContentType: (t: ContentType) => void;
  setContentField: (field: keyof ContentFields, value: string | boolean) => void;
  setContentFields: (fields: Partial<ContentFields>) => void;
  setDynamicUrl: (url: string) => void;
  setSlug: (slug: string) => void;
  setShape: (s: Shape) => void;
  setFgColor: (c: string) => void;
  setBgColor: (c: string) => void;
  setFgGradient: (g: Gradient | null) => void;
  setBgGradient: (g: Gradient | null) => void;
  setEyeFrameStyle: (s: EyeStyle) => void;
  setEyeBallStyle: (s: EyeStyle) => void;
  setEyeFrameColor: (c: string) => void;
  setEyeBallColor: (c: string) => void;
  setEyes: (e: Partial<EyeConfig>) => void;
  setLogoSrc: (src: string | null) => void;
  setLogoSize: (size: number) => void;
  setLogo: (l: Partial<LogoConfig>) => void;
  setEcc: (e: ECCLevel) => void;
  setAutoEcc: (a: boolean) => void;
  setMarginSize: (m: number) => void;
  applyTemplate: (partial: Partial<QRConfig>) => void;
  saveCode: (name: string) => void;
  loadCode: (id: string) => void;
  deleteCode: (id: string) => void;
  reset: () => void;
  getCurrentConfig: () => QRConfig;
};

type FullStore = QRStoreState & QRStoreActions;

const STORAGE_KEY = "qr-generator-store";

function loadPersisted(): { currentConfig: QRConfig; savedCodes: QRCodeEntry[]; currentCodeId: string | null } {
  if (typeof window === "undefined") {
    return { currentConfig: { ...DEFAULT_QR_CONFIG }, savedCodes: [], currentCodeId: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        currentConfig: parsed.currentConfig || { ...DEFAULT_QR_CONFIG },
        savedCodes: parsed.savedCodes || [],
        currentCodeId: parsed.currentCodeId || null,
      };
    }
  } catch {}
  return { currentConfig: { ...DEFAULT_QR_CONFIG }, savedCodes: [], currentCodeId: null };
}

function persist(state: QRStoreState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentConfig: state.currentConfig,
        savedCodes: state.savedCodes,
        currentCodeId: state.currentCodeId,
      }),
    );
  } catch {}
}

function cloneConfig(c: QRConfig): QRConfig {
  return {
    ...c,
    content: { ...c.content },
    eyes: { ...c.eyes },
    logo: { ...c.logo },
    fgGradient: c.fgGradient ? { ...c.fgGradient } : null,
    bgGradient: c.bgGradient ? { ...c.bgGradient } : null,
  };
}

let state: QRStoreState = loadPersisted();
const listeners = new Set<Listener>();

function setState(partial: Partial<QRStoreState>) {
  state = { ...state, ...partial };
  persist(state);
  listeners.forEach((fn) => fn());
}

function updateConfig(updater: (cfg: QRConfig) => QRConfig) {
  state = { ...state, currentConfig: updater(state.currentConfig) };
  persist(state);
  listeners.forEach((fn) => fn());
}

const actions: QRStoreActions = {
  setQRType: (t) => updateConfig((c) => ({ ...c, qrType: t })),
  setContentType: (t) => updateConfig((c) => ({ ...c, contentType: t })),
  setContentField: (field, value) =>
    updateConfig((c) => ({
      ...c,
      content: { ...c.content, [field]: value },
    })),
  setContentFields: (fields) =>
    updateConfig((c) => ({
      ...c,
      content: { ...c.content, ...fields },
    })),
  setDynamicUrl: (url) => updateConfig((c) => ({ ...c, dynamicUrl: url })),
  setSlug: (slug) => updateConfig((c) => ({ ...c, slug })),
  setShape: (shape) => updateConfig((c) => ({ ...c, shape })),
  setFgColor: (fgColor) => updateConfig((c) => ({ ...c, fgColor })),
  setBgColor: (bgColor) => updateConfig((c) => ({ ...c, bgColor })),
  setFgGradient: (fgGradient) => updateConfig((c) => ({ ...c, fgGradient })),
  setBgGradient: (bgGradient) => updateConfig((c) => ({ ...c, bgGradient })),
  setEyeFrameStyle: (frameStyle) =>
    updateConfig((c) => ({
      ...c,
      eyes: { ...c.eyes, frameStyle },
    })),
  setEyeBallStyle: (ballStyle) =>
    updateConfig((c) => ({
      ...c,
      eyes: { ...c.eyes, ballStyle },
    })),
  setEyeFrameColor: (frameColor) =>
    updateConfig((c) => ({
      ...c,
      eyes: { ...c.eyes, frameColor },
    })),
  setEyeBallColor: (ballColor) =>
    updateConfig((c) => ({
      ...c,
      eyes: { ...c.eyes, ballColor },
    })),
  setEyes: (partial) =>
    updateConfig((c) => ({
      ...c,
      eyes: { ...c.eyes, ...partial },
    })),
  setLogoSrc: (src) =>
    updateConfig((c) => ({
      ...c,
      logo: { ...c.logo, src },
    })),
  setLogoSize: (size) =>
    updateConfig((c) => ({
      ...c,
      logo: { ...c.logo, size },
    })),
  setLogo: (partial) =>
    updateConfig((c) => ({
      ...c,
      logo: { ...c.logo, ...partial },
    })),
  setEcc: (ecc) => updateConfig((c) => ({ ...c, ecc })),
  setAutoEcc: (autoEcc) => updateConfig((c) => ({ ...c, autoEcc })),
  setMarginSize: (marginSize) => updateConfig((c) => ({ ...c, marginSize })),
  applyTemplate: (partial) =>
    updateConfig((c) => ({
      ...c,
      ...partial,
      eyes: { ...c.eyes, ...(partial.eyes || {}) },
      logo: { ...c.logo, ...(partial.logo || {}) },
    })),
  saveCode: (name) => {
    const id = state.currentCodeId || crypto.randomUUID();
    const entry: QRCodeEntry = {
      id,
      name,
      config: cloneConfig(state.currentConfig),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      scanCount: 0,
    };
    const idx = state.savedCodes.findIndex((c) => c.id === id);
    const codes = idx >= 0
      ? state.savedCodes.map((c, i) => (i === idx ? entry : c))
      : [...state.savedCodes, entry];
    setState({ savedCodes: codes, currentCodeId: id });
  },
  loadCode: (id) => {
    const entry = state.savedCodes.find((c) => c.id === id);
    if (entry) {
      setState({ currentConfig: cloneConfig(entry.config), currentCodeId: id });
    }
  },
  deleteCode: (id) => {
    setState({
      savedCodes: state.savedCodes.filter((c) => c.id !== id),
      currentCodeId: state.currentCodeId === id ? null : state.currentCodeId,
    });
  },
  reset: () => setState({ currentConfig: { ...DEFAULT_QR_CONFIG }, currentCodeId: null }),
  getCurrentConfig: () => {
    const cfg = state.currentConfig;
    const ecc = getRecommendedECC(cfg.logo.size, cfg.fgColor, cfg.bgColor, cfg.autoEcc);
    return { ...cfg, ecc };
  },
};

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export function getState(): QRStoreState {
  return state;
}

export const storeActions: QRStoreActions = actions;

function useStoreSelector<T>(selector: (s: QRStoreState) => T): T {
  const [val, setVal] = useState(() => selector(state));
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  useEffect(() => {
    const onStoreChange = () => {
      setVal(selectorRef.current(state));
    };
    return subscribe(onStoreChange);
  }, []);

  return val;
}

export function useQRConfig(): QRConfig {
  const c = useStoreSelector((s) => s.currentConfig);
  const ecc = getRecommendedECC(c.logo.size, c.fgColor, c.bgColor, c.autoEcc);
  return { ...c, ecc };
}

export function useQRField<K extends keyof QRConfig>(field: K): QRConfig[K] {
  return useStoreSelector((s) => s.currentConfig[field]);
}

export function useQRContentField<K extends keyof ContentFields>(field: K): ContentFields[K] | undefined {
  return useStoreSelector((s) => s.currentConfig.content[field]);
}

export function useQRConfigValue<T>(selector: (cfg: QRConfig) => T): T {
  return useStoreSelector((s) => selector(s.currentConfig));
}

export function useSavedCodes(): QRCodeEntry[] {
  return useStoreSelector((s) => s.savedCodes);
}

export function useCurrentCodeId(): string | null {
  return useStoreSelector((s) => s.currentCodeId);
}
