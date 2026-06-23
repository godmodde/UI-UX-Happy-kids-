"use client";

import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Корзина Happy Kids — внешний стор на localStorage через
   useSyncExternalStore (идиоматично, без рассинхрона гидрации).
   Состояние глобальное (модульный стор) — провайдер не нужен.
------------------------------------------------------------------- */

export type CartItem = { id: string; qty: number };
type Snapshot = { items: CartItem[]; loaded: boolean };

const STORAGE_KEY = "happykids.cart.v1";
const SERVER_SNAPSHOT: Snapshot = { items: [], loaded: false };

let snapshot: Snapshot = { items: [], loaded: false };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot.items));
  } catch {
    /* квота / приватный режим — игнорируем */
  }
}

/** Ленивая загрузка из localStorage при первом обращении на клиенте. */
function ensureLoaded() {
  if (snapshot.loaded) return;
  let items: CartItem[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        items = parsed.filter(
          (i) => i && typeof i.id === "string" && typeof i.qty === "number" && i.qty > 0,
        );
      }
    }
  } catch {
    /* битый storage — стартуем с пустой */
  }
  snapshot = { items, loaded: true };
}

function commit(next: CartItem[]) {
  snapshot = { items: next, loaded: true };
  persist();
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Snapshot {
  ensureLoaded();
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

/* ---------- Действия ---------- */
export function cartAdd(id: string, qty = 1) {
  ensureLoaded();
  const prev = snapshot.items;
  const found = prev.find((i) => i.id === id);
  commit(
    found
      ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      : [...prev, { id, qty }],
  );
}

export function cartSetQty(id: string, qty: number) {
  ensureLoaded();
  const prev = snapshot.items;
  commit(
    qty <= 0
      ? prev.filter((i) => i.id !== id)
      : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
  );
}

export function cartRemove(id: string) {
  ensureLoaded();
  commit(snapshot.items.filter((i) => i.id !== id));
}

export function cartClear() {
  commit([]);
}

/* ---------- Хук ---------- */
export function useCart() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = snap.items.reduce((s, i) => s + i.qty, 0);
  return {
    items: snap.items,
    count,
    loaded: snap.loaded,
    add: cartAdd,
    setQty: cartSetQty,
    remove: cartRemove,
    clear: cartClear,
  };
}
