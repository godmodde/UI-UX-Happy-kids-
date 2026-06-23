"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../ui.module.css";
import { BrickIcon } from "./icons";
import { useT } from "./settings-context";
import { asset } from "../_lib/asset";

/* Hero-блок — клиентский, текст переключается по языку. */
export function Hero() {
  const t = useT();
  return (
    <section className={styles.why}>
      <div className={`${styles.container} ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>
              <BrickIcon size={16} /> {t("hero.eyebrow")}
            </span>
            <h1 className={styles.heroTitle}>
              {t("hero.title")} <span className={styles.accent}>{t("hero.accent")}</span>
            </h1>
            <p className={styles.heroSub}>{t("hero.subtitle")}</p>
            <div className={styles.heroCtas}>
              <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}>
                {t("hero.cta")}
              </Link>
            </div>
          </div>
          <div className={styles.heroArt}>
            <Image
              src={asset("/hero-child.jpg")}
              alt={t("hero.alt")}
              fill
              sizes="(max-width: 768px) 90vw, 540px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
