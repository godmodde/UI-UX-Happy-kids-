import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient, CatalogDefault } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог конструкторов — Happy Kids",
  description:
    "Развивающие конструкторы Happy Kids: фильтры по серии, возрасту, числу деталей, сложности, бренду и цене.",
};

export default function CatalogPage() {
  // Suspense обязателен для useSearchParams в статическом экспорте.
  // fallback пререндерит полный каталог (без фильтров) в статический HTML —
  // для SEO и режима без JS; затем клиент перечитывает фильтры из URL.
  return (
    <Suspense fallback={<CatalogDefault />}>
      <CatalogClient />
    </Suspense>
  );
}
