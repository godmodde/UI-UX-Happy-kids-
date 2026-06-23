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
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false, lastX: 0, lastT: 0, vel: 0 });
  const rafRef = useRef(0); // id анимации инерции
  const [progress, setProgress] = useState(0); // заполнение полоски прогресса, 0..1
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

  // Остановить инерцию при размонтировании.
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  function cards(): HTMLElement[] {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.children) as HTMLElement[];
  }

  function smooth() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  // Шаг ровно на одну карточку (ширина карточки + отступ между ними).
  function step(dir: number) {
    const track = trackRef.current;
    const cs = cards();
    if (!track || cs.length === 0) return;
    cancelAnimationFrame(rafRef.current); // прервать инерцию, если катится
    track.style.scrollBehavior = "";
    const stride =
      cs.length > 1
        ? cs[1].getBoundingClientRect().left - cs[0].getBoundingClientRect().left
        : cs[0].getBoundingClientRect().width;
    track.scrollBy({ left: dir * stride, behavior: smooth() as ScrollBehavior });
  }

  function restoreSmooth() {
    const track = trackRef.current;
    if (track) track.style.scrollBehavior = "";
  }

  // Свободная инерция после отпускания: продолжаем катить с затуханием,
  // без привязки к карточкам. v0 — скорость курсора (px/мс) в момент отпускания.
  function startMomentum(v0: number) {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    let v = -v0; // scrollLeft растёт в сторону, противоположную движению курсора
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(v) < 0.02) {
      restoreSmooth();
      return;
    }
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      v *= Math.pow(0.93, dt / 16); // трение
      let next = track.scrollLeft + v * dt;
      if (next <= 0) { next = 0; v = 0; }
      else if (next >= max) { next = max; v = 0; }
      track.scrollLeft = next;
      if (Math.abs(v) > 0.02) rafRef.current = requestAnimationFrame(tick);
      else restoreSmooth();
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  // Полоска прогресса = доля прокрутки.
  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0);
  }

  // Перетаскивание мышью (как свайп на телефоне). Только для мыши —
  // тач/перо листаются нативно. На время перетаскивания отключаем snap,
  // чтобы движение было плавным, а по отпусканию — доводим к ближайшей карточке.
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(rafRef.current); // прервать инерцию, если ещё катится
    const now = performance.now();
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false, lastX: e.clientX, lastT: now, vel: 0 };
    // Во время drag — мгновенное следование за курсором (без smooth-анимации).
    track.style.scrollBehavior = "auto";
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
    // Скорость для инерции (сглаженная).
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.vel = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.vel;
    d.lastX = e.clientX;
    d.lastT = now;
    track.scrollLeft = d.startLeft - dx;
  }
  function endDrag() {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    // Свободно — без привязки к карточкам: запускаем инерцию (она вернёт smooth).
    if (d.moved) startMomentum(d.vel);
    else restoreSmooth();
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

        {/* Управление: стрелки + заполняющаяся полоска прогресса */}
        <div className={styles.svcControls}>
          <button type="button" className={styles.svcNav} onClick={() => step(-1)} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </button>
          <div
            className={styles.svcBar}
            role="progressbar"
            aria-label="Прокрутка карусели"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span className={styles.svcBarFill} style={{ width: `${progress * 100}%` }} />
          </div>
          <button type="button" className={styles.svcNav} onClick={() => step(1)} aria-label="Вперёд">
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
