"use client";

import Link from "next/link";
import styles from "../ui.module.css";
import { BrickIcon } from "./icons";
import { useT } from "./settings-context";

/** Подвал сайта — общий для всех страниц (рендерится в layout). */
export function Footer() {
  const t = useT();
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div>
          <span className={styles.footerLogo}>
            <BrickIcon size={24} /> Happy&nbsp;Kids
          </span>
          <p className={styles.footerAbout}>{t("footer.tagline")}</p>
        </div>
        <div>
          <h4>{t("footer.shop")}</h4>
          <ul>
            <li><Link href="/catalog">{t("footer.catalog")}</Link></li>
            <li><Link href="/catalog?view=series">{t("footer.series")}</Link></li>
            <li><Link href="/catalog?sort=popular">{t("footer.hits")}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t("footer.buyer")}</h4>
          <ul>
            <li><Link href="/delivery">{t("footer.delivery")}</Link></li>
            <li><Link href="/delivery#payment">{t("footer.payment")}</Link></li>
            <li><Link href="/about">{t("footer.about")}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t("footer.contacts")}</h4>
          <ul>
            <li><a href="tel:+78000000000">8 800 000-00-00</a></li>
            <li><a href="mailto:hello@happykids.toys">hello@happykids.toys</a></li>
          </ul>
          <h4 style={{ marginTop: "16px" }}>{t("footer.socials")}</h4>
          <ul>
            <li><a href="https://t.me/happykids" target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><a href="https://vk.com/happykids" target="_blank" rel="noopener noreferrer">ВКонтакте</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBar}>
        <div className={styles.container}>{t("footer.rights")}</div>
      </div>
    </footer>
  );
}
