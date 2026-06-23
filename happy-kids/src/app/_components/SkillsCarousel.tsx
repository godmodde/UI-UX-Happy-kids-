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

export function SkillsCarousel() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
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

  function cards(): HTMLElement[] {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.children) as HTMLElement[];
  }

  // Плавно листаем по одной карточке: выравниваем её левый край с краем дорожки.
  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const cs = cards();
    if (!track || cs.length === 0) return;
    const n = Math.max(0, Math.min(i, cs.length - 1));
    const delta = cs[n].getBoundingClientRect().left - track.getBoundingClientRect().left;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: reduce ? "auto" : "smooth" });
  }

  // Активна карточка, чей левый край ближе всего к левому краю дорожки.
  function onScroll() {
    const track = trackRef.current;
    const cs = cards();
    if (!track || cs.length === 0) return;
    const left = track.getBoundingClientRect().left;
    let best = 0;
    let bestDist = Infinity;
    cs.forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - left);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }

  // Перетаскивание мышью (как свайп на телефоне). Только для мыши —
  // тач/перо листаются нативно. На время перетаскивания отключаем snap,
  // чтобы движение было плавным, а по отпусканию — доводим к ближайшей карточке.
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false };
    track.style.scrollSnapType = "none";
  }
  function onPointerMove(e: React.PointerEvent) {
    const track = trackRef.current;
    const d = drag.current;
    if (!track || !d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        /* захват не критичен — продолжаем тащить */
      }
    }
    track.scrollLeft = d.startLeft - dx;
  }
  function endDrag() {
    const track = trackRef.current;
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (track) track.style.scrollSnapType = "";
    if (d.moved) scrollToIndex(active); // плавно довести к ближайшей карточке
  }

  function showInfo(it: Item) {
    if (drag.current.moved) return; // не открывать пуш, если это было перетаскивание
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
        <div
          className={styles.svcTrack}
          ref={trackRef}
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
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
            {items.map((it, i) => (
              <button key={it.key} type="button" className={`${styles.dot} ${i === active ? styles.dotActive : ""}`} onClick={() => scrollToIndex(i)} aria-label={`Карточка ${i + 1}`} aria-current={i === active} />
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
