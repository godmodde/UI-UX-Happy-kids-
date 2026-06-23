"use client";

import { useSettings } from "./settings-context";

/* Цена с учётом валюты. RUB — рубли, USD — конвертация по фикс-курсу. */

const RATE = 90; // ₽ за $1 (демо)
const RUB = new Intl.NumberFormat("ru-RU");
const USD = new Intl.NumberFormat("en-US");

export function Price({ rub }: { rub: number }) {
  const { currency } = useSettings();
  if (currency === "USD") return <>${USD.format(Math.round(rub / RATE))}</>;
  return <>{RUB.format(rub)} ₽</>;
}
