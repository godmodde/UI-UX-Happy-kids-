"use client";

import Link from "next/link";
import styles from "../ui.module.css";
import { BrickIcon, SearchIcon, CartIcon } from "./icons";
import { useCart } from "./cart-context";
import { useSettings, setLocale, setCurrency, useT } from "./settings-context";

/** Шапка сайта — общая для всех страниц (рендерится в layout). */
export function Header() {
  const { count, loaded } = useCart();
  const { locale, currency } = useSettings();
  const t = useT();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link href="/" className={styles.logo} aria-label="Happy Kids">
          <span className={styles.logoMark} aria-hidden="true">
            <BrickIcon size={28} />
          </span>
          Happy&nbsp;Kids
        </Link>

        <nav className={styles.nav} aria-label={t("aria.nav")}>
          <Link href="/catalog">{t("nav.catalog")}</Link>
          <Link href="/catalog?view=series">{t("nav.series")}</Link>
          <Link href="/delivery">{t("nav.delivery")}</Link>
        </nav>

        <div className={styles.headerRight}>
          <div className={styles.toggle} role="group" aria-label={t("aria.lang")}>
            <button type="button" aria-pressed={locale === "ru"} onClick={() => setLocale("ru")}>RU</button>
            <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
          </div>
          <div className={styles.toggle} role="group" aria-label={t("aria.currency")}>
            <button type="button" aria-pressed={currency === "RUB"} onClick={() => setCurrency("RUB")}>₽</button>
            <button type="button" aria-pressed={currency === "USD"} onClick={() => setCurrency("USD")}>$</button>
          </div>
          <Link href="/catalog" className={`${styles.iconBtn} ${styles.searchBtn}`} aria-label={t("aria.search")}>
            <SearchIcon />
          </Link>
          <Link
            href="/cart"
            className={styles.iconBtn}
            aria-label={`${t("aria.cart")}: ${loaded ? count : 0}`}
          >
            <CartIcon />
            {loaded && count > 0 && (
              <span className={styles.cartCount} aria-hidden="true">{count}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
