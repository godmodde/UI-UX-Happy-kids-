import type { Metadata } from "next";
import { Comfortaa, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

// Заголовки/дисплей — Comfortaa: округлый геометрический гротеск с кириллицей (SIL OFL).
// Ближайшая к Fredoka замена, поддерживающая RU. Единый шрифт для RU и EN.
const comfortaa = Comfortaa({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

// Содержание/UI — гуманистический гротеск, читабелен на RU и EN (SIL OFL).
const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Kids — конструкторы для детей",
  description:
    "Happy Kids — магазин развивающих конструкторов для детей. Серии, фильтры по возрасту и сложности, быстрая покупка.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${comfortaa.variable} ${nunitoSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
