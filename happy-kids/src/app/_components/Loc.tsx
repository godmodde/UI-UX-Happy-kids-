"use client";

import type { ReactNode } from "react";
import { useSettings } from "./settings-context";
import { typo } from "../_data/typo";

/* Локализованный текст: показывает ru/en по текущему языку.
   Серверные компоненты вычисляют обе строки и передают сюда.
   Для строк применяется типографика (короткие предлоги/союзы не висят на краю). */
export function Loc({ ru, en }: { ru: ReactNode; en: ReactNode }) {
  const v = useSettings().locale === "en" ? en : ru;
  return <>{typeof v === "string" ? typo(v) : v}</>;
}
