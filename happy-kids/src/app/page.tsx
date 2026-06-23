"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ui.module.css";
import { BrickIcon } from "./_components/icons";
import { Illus } from "./_components/illustrations";
import { Hero } from "./_components/Hero";
import { Price } from "./_components/Price";
import { SkillsCarousel } from "./_components/SkillsCarousel";
import { LeadForm } from "./_components/LeadForm";
import { useT } from "./_components/settings-context";

/* Happy Kids — Home v2 (лендинг). Текст переключается по языку. */

const SERIES = { space: "#2E7DF6", robo: "#FF7A33", city: "#22C55E", dino: "#A855F7", warm: "#FFC24D" };

const featured = [
  { id: "p5", key: "f1", age: 8, price: 2490, tint: "#FFE7D6", art: "robot" },
  { id: "p1", key: "f2", age: 10, price: 2990, tint: "#DCEBFF", art: "rocket" },
  { id: "p6", key: "f3", age: 10, price: 2690, tint: "#DCF7E3", art: "cog" },
  { id: "p9", key: "f4", age: 9, price: 2290, tint: "#F1E3FF", art: "castle" },
];

const gallery = [
  { color: SERIES.space, wide: true, art: "rocket" },
  { color: SERIES.robo, art: "robot" },
  { color: SERIES.city, art: "car" },
  { color: SERIES.dino, art: "dino" },
  { color: SERIES.warm, art: "castle" },
];

const reviews = [
  { k: "1", name: "Анна", img: "/avatar-1.jpg" },
  { k: "2", name: "Игорь", img: "/avatar-2.jpg" },
  { k: "3", name: "Елена", img: "/avatar-3.jpg" },
];

const stepKeys = ["1", "2", "3"];
const faqKeys = ["1", "2", "3", "4"];

export default function Home() {
  const t = useT();
  return (
    <main className={styles.page}>
      {/* 1 · Hero */}
      <Hero />

      {/* 2 · Трансформация: коробка → готовая модель */}
      <section className={`${styles.container} ${styles.section} ${styles.reveal}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2>{t("tr.h2")}</h2>
            <p>{t("tr.sub")}</p>
          </div>
        </div>
        <div className={styles.transform}>
          <div className={`${styles.tPanel} ${styles.tPanelBox}`}>
            <Image src="/toy-parts.jpg" alt={t("tr.cap1")} fill sizes="(max-width: 760px) 90vw, 460px" style={{ objectFit: "cover" }} />
            <span className={styles.tCaption}>{t("tr.cap1")}</span>
          </div>
          <div className={styles.tArrow} aria-hidden="true">
            <svg className={styles.tArrowSvg} width="64" height="28" viewBox="0 0 64 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 14h54M44 5l12 9-12 9" />
            </svg>
            <span className={styles.tArrowLabel}>{t("tr.arrow")}</span>
          </div>
          <div className={`${styles.tPanel} ${styles.tPanelModel}`}>
            <Image src="/toy-built.jpg" alt={t("tr.cap2")} fill sizes="(max-width: 760px) 90vw, 460px" style={{ objectFit: "cover" }} />
            <span className={styles.tCaption}>{t("tr.cap2")}</span>
          </div>
        </div>
      </section>

      {/* 3 · Популярные наборы */}
      <section className={`${styles.container} ${styles.section} ${styles.reveal}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2>{t("feat.h2")}</h2>
            <p>{t("feat.sub")}</p>
          </div>
          <Link href="/catalog" className={styles.link}>{t("feat.all")}</Link>
        </div>
        <div className={styles.featGrid}>
          {[...featured].sort((a, b) => a.price - b.price).map((p) => {
            const title = t(`feat.${p.key}.title`);
            return (
              <article key={p.id} className={styles.featCard}>
                <Link href={`/product/${p.id}`} className={styles.featMedia} style={{ background: p.tint }} aria-label={title}>
                  <Illus name={p.art} label={title} />
                </Link>
                <div className={styles.featBody}>
                  <span className={styles.ageTag}>{t("age.from")} {p.age} {t("age.years")}</span>
                  <Link href={`/product/${p.id}`} className={styles.featTitle}>{title}</Link>
                  <p className={styles.featDesc}>{t(`feat.${p.key}.desc`)}</p>
                  <div className={styles.featFoot}>
                    <span className={styles.price}><Price rub={p.price} /></span>
                    <Link href={`/product/${p.id}`} className={`${styles.btn} ${styles.btnPrimary}`} style={{ minHeight: 38, padding: "0 16px" }}>
                      {t("feat.more")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4 · Как это работает */}
      <section className={`${styles.container} ${styles.section} ${styles.reveal}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2>{t("steps.h2")}</h2>
            <p>{t("steps.sub")}</p>
          </div>
        </div>
        <div className={styles.steps}>
          {stepKeys.map((n) => (
            <div key={n} className={styles.step}>
              <span className={styles.stepNo}>{n}</span>
              <h3>{t(`steps.${n}.t`)}</h3>
              <p>{t(`steps.${n}.x`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 · Что развивается у ребёнка */}
      <SkillsCarousel />

      {/* 6 · Галерея */}
      <section className={`${styles.container} ${styles.section} ${styles.reveal}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2>{t("gal.h2")}</h2>
            <p>{t("gal.sub")}</p>
          </div>
        </div>
        <div className={styles.gallery2}>
          {gallery.map((g, i) => (
            <div key={i} className={`${styles.galItem} ${g.wide ? styles.galWide : ""}`} style={{ background: `${g.color}22` }}>
              <Illus name={g.art} label={`${t("gal.h2")} ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* 7 · Отзывы родителей */}
      <section className={`${styles.why} ${styles.reveal}`}>
        <div className={`${styles.container} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <div>
              <h2>{t("rev.h2")}</h2>
              <p>{t("rev.sub")}</p>
            </div>
          </div>
          <div className={styles.reviews}>
            {reviews.map((r) => (
              <div key={r.k} className={styles.review}>
                <div className={styles.stars} aria-label="5 / 5">★★★★★</div>
                <p>«{t(`rev.${r.k}.text`)}»</p>
                <div className={styles.reviewer}>
                  <Image src={r.img} alt={r.name} width={40} height={40} className={styles.avatar} />
                  <span>
                    <strong>{r.name}</strong>
                    <small>{t(`rev.${r.k}.role`)}</small>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className={`${styles.container} ${styles.section} ${styles.reveal}`}>
        <div className={styles.sectionHead}>
          <div>
            <h2>{t("faq.h2")}</h2>
            <p>{t("faq.sub")}</p>
          </div>
        </div>
        <div className={styles.faqLayout}>
          <div className={styles.faq}>
            {faqKeys.map((k) => (
              <details key={k} className={styles.faqItem}>
                <summary>{t(`faq.${k}.q`)}</summary>
                <p>{t(`faq.${k}.a`)}</p>
              </details>
            ))}
          </div>
          <div className={styles.faqMarks} aria-hidden="true">
            <span className={styles.qmark} style={{ background: "#2E7DF6", width: 92, height: 92, fontSize: 54, transform: "rotate(-8deg)" }}>?</span>
            <span className={styles.qmark} style={{ background: "#FF7A33", width: 64, height: 64, fontSize: 38, transform: "rotate(10deg)" }}>?</span>
            <span className={styles.qmark} style={{ background: "#FFC24D", width: 76, height: 76, fontSize: 46, transform: "rotate(-4deg)", color: "#4a3200" }}>?</span>
          </div>
        </div>
      </section>

      {/* 9 · Финальный CTA */}
      <section className={`${styles.container} ${styles.reveal}`}>
        <div className={styles.finalCta}>
          <div className={styles.finalLogo} aria-hidden="true">
            <span className={styles.finalLogoMark}><BrickIcon size={84} /></span>
            <span className={styles.finalLogoText}>Happy Kids</span>
          </div>
          <div className={styles.finalForm}>
            <h2>{t("cta.h2")}</h2>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
