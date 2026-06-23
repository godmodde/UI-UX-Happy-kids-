"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../ui.module.css";
import { Illus } from "./illustrations";
import { useT } from "./settings-context";

/* Блок «Что развивается у ребёнка» — карусель карточек.
   Стрелка ↗ открывает «пуш» с простым объяснением аспекта. */

type Item = { key: string; art: string; color: string };

const items: Item[] = [
  { key: "1", art: "lightbulb", color: "#2E7DF6" },
  { key: "2", art: "target", color: "#FF7A33" },
  { key: "3", art: "star", color: "#22C55E" },
  { key: "4", art: "abacus", color: "#A855F7" },
  { key: "5", art: "puzzle", color: "#2E7DF6" },
  { key: "6", art: "tower", color: "#FF7A33" },
];

function ArrowUpRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

const PAGES = 2; // слайдер листается двумя страницами

export function SkillsCarousel() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [info, setInfo] = useState<Item | null>(null);

  // Пуш закрывается при скролле или нажатии Esc (клик закрывает по onClick).
  useEffect(() => {
    if (!info) return;
    const onScroll = () => setInfo(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfo(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [info]);

  function maxScroll() {
    const track = trackRef.current;
    return track ? track.scrollWidth - track.clientWidth : 0;
  }

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const n = Math.max(0, Math.min(i, PAGES - 1));
    track.scrollTo({ left: maxScroll() * (n / (PAGES - 1)), behavior: "smooth" });
  }

  function onScroll() {
    const m = maxScroll();
    if (!trackRef.current || m <= 0) return setActive(0);
    setActive(Math.round((trackRef.current.scrollLeft / m) * (PAGES - 1)));
  }

  function showInfo(it: Item) {
    setInfo(it);
  }
  function closeInfo() {
    setInfo(null);
  }

  return (
    <section className={styles.why}>
      <div className={`${styles.container} ${styles.section}`}>
        {/* Шапка: заголовок в одну строку */}
        <div className={styles.svcHead}>
          <h2 className={styles.svcTitle}>{t("sk.h2")}</h2>
        </div>

        {/* Карусель */}
        <div className={styles.svcTrack} ref={trackRef} onScroll={onScroll}>
          {items.map((it) => {
            const name = t(`sk.${it.key}.name`);
            return (
              <article key={it.key} className={styles.svcCard} style={{ background: `${it.color}22` }}>
                <div className={styles.svcMedia}><Illus name={it.art} label={name} /></div>
                <div className={styles.svcOverlay} />
                <button type="button" className={styles.svcArrow} onClick={() => showInfo(it)} aria-label={`${t("feat.more")}: ${name}`}>
                  <ArrowUpRight />
                </button>
                <div className={styles.svcBody}>
                  <h3>{name}</h3>
                  <p>{t(`sk.${it.key}.desc`)}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Управление: стрелки + точки */}
        <div className={styles.svcControls}>
          <button type="button" className={styles.svcNav} onClick={() => scrollToIndex(active - 1)} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </button>
          <div className={styles.dots} aria-label="Страницы">
            {Array.from({ length: PAGES }).map((_, i) => (
              <button key={i} type="button" className={`${styles.dot} ${i === active ? styles.dotActive : ""}`} onClick={() => scrollToIndex(i)} aria-label={`Страница ${i + 1}`} aria-current={i === active} />
            ))}
          </div>
          <button type="button" className={styles.svcNav} onClick={() => scrollToIndex(active + 1)} aria-label="Вперёд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* Пуш-объяснение по клику на стрелку — по центру экрана, закрытие по клику/скроллу */}
      {info && (
        <>
          <div className={styles.pushBackdrop} onClick={closeInfo} aria-hidden="true" />
          <div className={styles.push} role="status" aria-live="polite" onClick={closeInfo}>
            <span className={styles.pushDot} style={{ background: info.color }} aria-hidden="true" />
            <div className={styles.pushBody}>
              <strong>{t(`sk.${info.key}.name`)}</strong>
              <p>{t(`sk.${info.key}.exp`)}</p>
            </div>
            <button type="button" className={styles.pushClose} onClick={closeInfo} aria-label="×">×</button>
          </div>
        </>
      )}
    </section>
  );
}
