"use client";

import { useSyncExternalStore } from "react";
import { dict, type Locale } from "../_data/i18n";
import { typo } from "../_data/typo";

/* Настройки сайта: язык + валюта. Внешний стор на localStorage (как корзина),
   серверный снапшот = ru/RUB (без рассинхрона гидрации). */

export type Currency = "RUB" | "USD";
type Settings = { locale: Locale; currency: Currency };

const STORAGE_KEY = "happykids.settings.v1";
const SERVER: Settings = { locale: "ru", currency: "RUB" };

let snapshot: Settings = { locale: "ru", currency: "RUB" };
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }
}
function ensureLoaded() {
  if (loaded) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      snapshot = {
        locale: p.locale === "en" ? "en" : "ru",
        currency: p.currency === "USD" ? "USD" : "RUB",
      };
    }
  } catch {
    /* ignore */
  }
  loaded = true;
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getSnapshot(): Settings {
  ensureLoaded();
  return snapshot;
}
function getServerSnapshot(): Settings {
  return SERVER;
}

export function setLocale(locale: Locale) {
  ensureLoaded();
  snapshot = { ...snapshot, locale };
  persist();
  emit();
}
export function setCurrency(currency: Currency) {
  ensureLoaded();
  snapshot = { ...snapshot, currency };
  persist();
  emit();
}

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Хук перевода: t("nav.catalog") по текущему языку (с типографикой предлогов). */
export function useT() {
  const { locale } = useSettings();
  return (key: string) => typo(dict[locale][key] ?? dict.ru[key] ?? key);
}
