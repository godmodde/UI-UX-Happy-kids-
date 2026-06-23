import type { NextConfig } from "next";

// basePath нужен для GitHub Pages, где сайт живёт в подпапке репозитория
// (https://<user>.github.io/<repo>/). На проде он задаётся переменной
// NEXT_PUBLIC_BASE_PATH в CI; локально пусто — сайт открывается с корня.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Статический экспорт в папку out/ — для хостинга без Node-сервера (GitHub Pages).
  output: "export",
  basePath,
  // GitHub Pages — статика, оптимизатор изображений недоступен → отдаём оригиналы.
  images: { unoptimized: true },
  // /catalog -> /catalog/index.html, чтобы пути корректно резолвились на Pages.
  trailingSlash: true,
  // Прячем dev-индикатор маршрута (тёмный кружок «N» снизу-слева).
  devIndicators: false,
};

export default nextConfig;
