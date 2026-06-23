/* ------------------------------------------------------------------
   Happy Kids — данные каталога (временные моки до подключения бэкенда)
   Малый каталог (<50). Товары с сериями. Поля заточены под фильтры из интервью:
   возраст, кол-во деталей (≤100), серия, сложность, цена, бренд.
------------------------------------------------------------------- */

export type Difficulty = "easy" | "medium";

export type Locale = "ru" | "en";

export type Series = {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  color: string;
};

export type Product = {
  id: string;
  title: string;
  titleEn: string;
  seriesId: string;
  seriesName: string;
  brand: string;
  age: number; // рекомендуемый возраст «от»
  parts: number; // число деталей (≤100)
  difficulty: Difficulty;
  price: number;
  oldPrice?: number;
  badge?: { label: string; kind: "New" | "Hit" | "Sale" };
  tint: string; // подложка медиа
  brick: string; // акцентный цвет иллюстрации
};

export const series: Series[] = [
  { id: "space", name: "Космос", nameEn: "Space", count: 4, color: "#2E7DF6" },
  { id: "robotics", name: "Роботы", nameEn: "Robots", count: 3, color: "#FF7A33" },
  { id: "city", name: "Город", nameEn: "City", count: 3, color: "#22C55E" },
  { id: "dino", name: "Динозавры", nameEn: "Dinos", count: 2, color: "#A855F7" },
];

export const brands = ["BrickLab", "RoboKit", "MegaCubes"] as const;

export const difficultyLabel: Record<Difficulty, string> = {
  easy: "простая",
  medium: "средняя",
};
export const difficultyLabelEn: Record<Difficulty, string> = {
  easy: "easy",
  medium: "medium",
};

/** Название серии по локали. */
export function seriesNameOf(seriesId: string, locale: Locale): string {
  const s = series.find((x) => x.id === seriesId);
  if (!s) return seriesId;
  return locale === "en" ? s.nameEn : s.name;
}
export function difficultyOf(d: Difficulty, locale: Locale): string {
  return (locale === "en" ? difficultyLabelEn : difficultyLabel)[d];
}

const SPACE = { tint: "#DCEBFF", brick: "#2E7DF6" };
const ROBO = { tint: "#FFE7D6", brick: "#FF7A33" };
const CITY = { tint: "#DCF7E3", brick: "#22C55E" };
const DINO = { tint: "#F1E3FF", brick: "#A855F7" };

export const products: Product[] = [
  { id: "p1", title: "Космо-станция «Орбита»", titleEn: "Orbita Space Station", seriesId: "space", seriesName: "Космос", brand: "BrickLab", age: 10, parts: 98, difficulty: "medium", price: 2990, badge: { label: "Новинка", kind: "New" }, ...SPACE },
  { id: "p2", title: "Луноход «Кратер»", titleEn: "Krater Moon Rover", seriesId: "space", seriesName: "Космос", brand: "BrickLab", age: 8, parts: 64, difficulty: "easy", price: 1990, ...SPACE },
  { id: "p3", title: "Ракета «Старт»", titleEn: "Start Rocket", seriesId: "space", seriesName: "Космос", brand: "MegaCubes", age: 4, parts: 42, difficulty: "easy", price: 1490, ...SPACE },
  { id: "p4", title: "Спутник «Сигнал»", titleEn: "Signal Satellite", seriesId: "space", seriesName: "Космос", brand: "BrickLab", age: 12, parts: 96, difficulty: "medium", price: 2790, ...SPACE },

  { id: "p5", title: "Робо-друг «Болтик»", titleEn: "Boltik the Robot", seriesId: "robotics", seriesName: "Роботы", brand: "RoboKit", age: 8, parts: 75, difficulty: "easy", price: 2490, badge: { label: "Хит", kind: "Hit" }, ...ROBO },
  { id: "p6", title: "Робо-рука «Захват»", titleEn: "Grip Robotic Arm", seriesId: "robotics", seriesName: "Роботы", brand: "RoboKit", age: 10, parts: 88, difficulty: "medium", price: 2690, ...ROBO },
  { id: "p7", title: "Дрон «Жук»", titleEn: "Zhuk Drone", seriesId: "robotics", seriesName: "Роботы", brand: "MegaCubes", age: 12, parts: 54, difficulty: "easy", price: 1890, ...ROBO },

  { id: "p8", title: "Городская гонка", titleEn: "City Race", seriesId: "city", seriesName: "Город", brand: "MegaCubes", age: 6, parts: 60, difficulty: "easy", price: 1890, ...CITY },
  { id: "p9", title: "Пожарная станция", titleEn: "Fire Station", seriesId: "city", seriesName: "Город", brand: "BrickLab", age: 8, parts: 92, difficulty: "medium", price: 2590, ...CITY },
  { id: "p10", title: "Мини-кафе", titleEn: "Mini Café", seriesId: "city", seriesName: "Город", brand: "MegaCubes", age: 3, parts: 38, difficulty: "easy", price: 1290, ...CITY },

  { id: "p11", title: "Парк динозавров", titleEn: "Dino Park", seriesId: "dino", seriesName: "Динозавры", brand: "BrickLab", age: 8, parts: 88, difficulty: "easy", price: 2290, oldPrice: 2690, badge: { label: "−15%", kind: "Sale" }, ...DINO },
  { id: "p12", title: "Тираннозавр «Рекс»", titleEn: "Rex the T-Rex", seriesId: "dino", seriesName: "Динозавры", brand: "RoboKit", age: 10, parts: 70, difficulty: "medium", price: 2190, ...DINO },
];

/** Заголовок товара по локали. */
export function titleOf(p: Product, locale: Locale): string {
  return locale === "en" ? p.titleEn : p.title;
}

/* ---------- Форматирование ---------- */
const RUB = new Intl.NumberFormat("ru-RU");
export const formatPrice = (n: number) => `${RUB.format(n)} ₽`;

/** Тематическая иллюстрация по серии (для карточек товара). */
export function seriesArt(seriesId: string): string {
  const map: Record<string, string> = {
    space: "rocket",
    robotics: "robot",
    city: "car",
    dino: "dino",
  };
  return map[seriesId] ?? "tower";
}

/* ---------- Доступ к товару (PDP) ---------- */
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Другие наборы той же серии (для переключателя серий на PDP). */
export function seriesSiblings(p: Product): Product[] {
  return products.filter((x) => x.seriesId === p.seriesId && x.id !== p.id);
}

/** Краткое описание набора, собранное из характеристик. */
export function productBlurb(p: Product, locale: Locale = "ru"): string {
  if (locale === "en") {
    return (
      `The “${p.titleEn}” set from the ${seriesNameOf(p.seriesId, "en")} series — ${p.parts} parts, ` +
      `${difficultyLabelEn[p.difficulty]} difficulty. Recommended for kids aged ${p.age}+. ` +
      `Develops logic, fine motor skills and spatial thinking.`
    );
  }
  return (
    `Конструктор «${p.title}» из серии «${p.seriesName}» — ${p.parts} деталей, ` +
    `сложность ${difficultyLabel[p.difficulty]}. Рекомендуем детям от ${p.age} лет. ` +
    `Развивает логику, мелкую моторику и пространственное мышление.`
  );
}

/* ---------- Опции фильтров (для UI) ---------- */
export const ageOptions = [3, 6, 8, 10, 12]; // «от N лет»
export const partsOptions = [
  { value: 50, label: "до 50", labelEn: "up to 50" },
  { value: 100, label: "до 100", labelEn: "up to 100" },
];
export const sortOptions = [
  { value: "price-asc", label: "Сначала дешевле", labelEn: "Price: low to high" },
  { value: "price-desc", label: "Сначала дороже", labelEn: "Price: high to low" },
  { value: "popular", label: "Популярные", labelEn: "Popular" },
] as const;

export type SortKey = (typeof sortOptions)[number]["value"];

export type CatalogFilters = {
  series: string[];
  brand: string[];
  difficulty: string[];
  age?: number; // минимальный «от»
  parts?: number; // верхняя граница
  priceMin?: number;
  priceMax?: number;
  sort: SortKey;
};

/** Нормализует значение searchParams в массив строк. */
export function toArray(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

function toNumber(v: string | string[] | undefined): number | undefined {
  const s = Array.isArray(v) ? v[0] : v;
  if (!s) return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

/** Парсит сырые searchParams в типизированные фильтры. */
export function parseFilters(
  sp: Record<string, string | string[] | undefined>,
): CatalogFilters {
  const sortRaw = (Array.isArray(sp.sort) ? sp.sort[0] : sp.sort) as SortKey;
  const sort: SortKey = sortOptions.some((o) => o.value === sortRaw)
    ? sortRaw
    : "price-asc";
  return {
    series: toArray(sp.series),
    brand: toArray(sp.brand),
    difficulty: toArray(sp.difficulty),
    age: toNumber(sp.age),
    parts: toNumber(sp.parts),
    priceMin: toNumber(sp.priceMin),
    priceMax: toNumber(sp.priceMax),
    sort,
  };
}

/** Применяет фильтры и сортировку к каталогу. */
export function applyFilters(f: CatalogFilters): Product[] {
  let list = products.filter((p) => {
    if (f.series.length && !f.series.includes(p.seriesId)) return false;
    if (f.brand.length && !f.brand.includes(p.brand)) return false;
    if (f.difficulty.length && !f.difficulty.includes(p.difficulty)) return false;
    if (f.age !== undefined && p.age < f.age) return false;
    if (f.parts !== undefined && p.parts > f.parts) return false;
    if (f.priceMin !== undefined && p.price < f.priceMin) return false;
    if (f.priceMax !== undefined && p.price > f.priceMax) return false;
    return true;
  });

  if (f.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  // "popular": сохраняем исходный порядок (бейджи/хиты выше)
  return list;
}

/** Количество активных фильтров (для индикатора/сброса). */
export function activeFilterCount(f: CatalogFilters): number {
  return (
    f.series.length +
    f.brand.length +
    f.difficulty.length +
    (f.age !== undefined ? 1 : 0) +
    (f.parts !== undefined ? 1 : 0) +
    (f.priceMin !== undefined ? 1 : 0) +
    (f.priceMax !== undefined ? 1 : 0)
  );
}
