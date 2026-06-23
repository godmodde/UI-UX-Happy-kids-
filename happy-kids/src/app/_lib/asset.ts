// next/image с unoptimized НЕ добавляет basePath к локальным картинкам,
// поэтому пути к файлам из public/ префиксуем вручную. Локально BP пуст.
const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BP}${path}`;
}
