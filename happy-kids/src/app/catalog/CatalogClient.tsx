"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../ui.module.css";
import { ProductCard } from "../_components/ProductCard";
import { Loc } from "../_components/Loc";
import {
  series,
  brands,
  ageOptions,
  partsOptions,
  sortOptions,
  difficultyLabel,
  difficultyLabelEn,
  seriesNameOf,
  parseFilters,
  applyFilters,
  activeFilterCount,
  type CatalogFilters,
} from "../_data/catalog";

type RawParams = Record<string, string | string[] | undefined>;

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Фильтры читаются из URL на клиенте, поэтому каталог работает и на статике (Pages).
function toRaw(sp: URLSearchParams): RawParams {
  const out: RawParams = {};
  for (const key of new Set(sp.keys())) {
    const all = sp.getAll(key);
    out[key] = all.length > 1 ? all : all[0];
  }
  return out;
}

function buildRemoveHref(sp: RawParams, key: string, value?: string): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    const values = v === undefined ? [] : Array.isArray(v) ? v : [v];
    for (const val of values) {
      if (k === key && (value === undefined || val === value)) continue;
      qs.append(k, val);
    }
  }
  const s = qs.toString();
  return s ? `/catalog?${s}` : "/catalog";
}

type Chip = { ru: string; en: string; href: string };

function activeChips(sp: RawParams, f: CatalogFilters): Chip[] {
  const chips: Chip[] = [];
  for (const id of f.series) {
    chips.push({ ru: seriesNameOf(id, "ru"), en: seriesNameOf(id, "en"), href: buildRemoveHref(sp, "series", id) });
  }
  for (const b of f.brand) chips.push({ ru: b, en: b, href: buildRemoveHref(sp, "brand", b) });
  for (const d of f.difficulty) {
    const k = d as "easy" | "medium";
    chips.push({ ru: `Сложность: ${difficultyLabel[k] ?? d}`, en: `Difficulty: ${difficultyLabelEn[k] ?? d}`, href: buildRemoveHref(sp, "difficulty", d) });
  }
  if (f.age !== undefined)
    chips.push({ ru: `от ${f.age} лет`, en: `from ${f.age}+`, href: buildRemoveHref(sp, "age") });
  if (f.parts !== undefined)
    chips.push({ ru: `до ${f.parts} деталей`, en: `up to ${f.parts} parts`, href: buildRemoveHref(sp, "parts") });
  if (f.priceMin !== undefined)
    chips.push({ ru: `от ${f.priceMin} ₽`, en: `from ${f.priceMin} ₽`, href: buildRemoveHref(sp, "priceMin") });
  if (f.priceMax !== undefined)
    chips.push({ ru: `до ${f.priceMax} ₽`, en: `up to ${f.priceMax} ₽`, href: buildRemoveHref(sp, "priceMax") });
  return chips;
}

// Презентационный компонент: отрисовывает каталог по готовым фильтрам.
// Используется и при пререндере (CatalogDefault), и при чтении URL (CatalogClient).
function CatalogView({ f, sp }: { f: CatalogFilters; sp: RawParams }) {
  const router = useRouter();
  const items = applyFilters(f);
  const count = activeFilterCount(f);
  const chips = activeChips(sp, f);
  const total = applyFilters(parseFilters({})).length;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const qs = new URLSearchParams();
    for (const [k, v] of fd.entries()) {
      if (typeof v === "string" && v.trim() !== "") qs.append(k, v);
    }
    const s = qs.toString();
    router.push(s ? `/catalog?${s}` : "/catalog");
  }

  return (
    <main className={`${styles.container} ${styles.section}`}>
      <nav className={styles.breadcrumb} aria-label="breadcrumbs">
        <Link href="/"><Loc ru="Главная" en="Home" /></Link>
        <span aria-hidden="true">/</span>
        <span><Loc ru="Каталог" en="Catalog" /></span>
      </nav>

      <div className={styles.catalogTitle}>
        <h1><Loc ru="Каталог" en="Catalog" /></h1>
        <span><Loc ru={`${items.length} из ${total} наборов`} en={`${items.length} of ${total} sets`} /></span>
      </div>

      <div className={styles.catalogLayout}>
        <aside>
          <form className={styles.filters} method="get" action={`${BP}/catalog/`} onSubmit={onSubmit} aria-label="filters">
            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Сортировка" en="Sorting" /></legend>
              <select name="sort" defaultValue={f.sort} key={`sort-${f.sort}`} className={styles.sortSelect} aria-label="sort">
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}><Loc ru={o.label} en={o.labelEn} /></option>
                ))}
              </select>
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Серия" en="Series" /></legend>
              {series.map((s) => (
                <label key={s.id} className={styles.check}>
                  <input type="checkbox" name="series" value={s.id} defaultChecked={f.series.includes(s.id)} />
                  <span><Loc ru={s.name} en={s.nameEn} /></span>
                  <small>{s.count}</small>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Возраст" en="Age" /></legend>
              <label className={styles.check}>
                <input type="radio" name="age" value="" defaultChecked={f.age === undefined} />
                <span><Loc ru="Любой" en="Any" /></span>
              </label>
              {ageOptions.map((a) => (
                <label key={a} className={styles.check}>
                  <input type="radio" name="age" value={a} defaultChecked={f.age === a} />
                  <span><Loc ru={`от ${a} лет`} en={`from ${a}+`} /></span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Детали" en="Parts" /></legend>
              <label className={styles.check}>
                <input type="radio" name="parts" value="" defaultChecked={f.parts === undefined} />
                <span><Loc ru="Любое количество" en="Any count" /></span>
              </label>
              {partsOptions.map((o) => (
                <label key={o.value} className={styles.check}>
                  <input type="radio" name="parts" value={o.value} defaultChecked={f.parts === o.value} />
                  <span><Loc ru={o.label} en={o.labelEn} /></span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Сложность" en="Difficulty" /></legend>
              {(["easy", "medium"] as const).map((d) => (
                <label key={d} className={styles.check}>
                  <input type="checkbox" name="difficulty" value={d} defaultChecked={f.difficulty.includes(d)} />
                  <span><Loc ru={difficultyLabel[d]} en={difficultyLabelEn[d]} /></span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Бренд" en="Brand" /></legend>
              {brands.map((b) => (
                <label key={b} className={styles.check}>
                  <input type="checkbox" name="brand" value={b} defaultChecked={f.brand.includes(b)} />
                  <span>{b}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.filterGroup}>
              <legend><Loc ru="Цена, ₽" en="Price, ₽" /></legend>
              <div className={styles.priceRow}>
                <input type="number" name="priceMin" inputMode="numeric" min={0} placeholder="от" defaultValue={f.priceMin ?? ""} aria-label="price from" />
                <span aria-hidden="true">—</span>
                <input type="number" name="priceMax" inputMode="numeric" min={0} placeholder="до" defaultValue={f.priceMax ?? ""} aria-label="price to" />
              </div>
            </fieldset>

            <div className={styles.filterActions}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                <Loc ru="Показать" en="Show" />
              </button>
              {count > 0 && (
                <Link href="/catalog" className={styles.resetLink}>
                  <Loc ru={`Сбросить (${count})`} en={`Reset (${count})`} />
                </Link>
              )}
            </div>
          </form>
        </aside>

        <div>
          {chips.length > 0 && (
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                {chips.map((c) => (
                  <Link key={c.ru} href={c.href} className={styles.chip}>
                    <Loc ru={c.ru} en={c.en} /> <span aria-hidden="true">×</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 ? (
            <div className={styles.catalogGrid}>
              {items.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3><Loc ru="Ничего не найдено" en="Nothing found" /></h3>
              <p><Loc ru="Попробуйте смягчить фильтры — например, расширить диапазон цены или возраст." en="Try relaxing the filters — for example, widen the price range or age." /></p>
              <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}>
                <Loc ru="Сбросить фильтры" en="Reset filters" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Пререндер-версия (Suspense fallback): полный список без фильтров — попадает в статический HTML.
export function CatalogDefault() {
  return <CatalogView f={parseFilters({})} sp={{}} />;
}

// Живая версия: читает фильтры из URL (useSearchParams).
export function CatalogClient() {
  const searchParams = useSearchParams();
  const raw = toRaw(new URLSearchParams(searchParams.toString()));
  return <CatalogView f={parseFilters(raw)} sp={raw} />;
}
