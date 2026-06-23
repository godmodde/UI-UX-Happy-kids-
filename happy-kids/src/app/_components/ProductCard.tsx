import Link from "next/link";
import styles from "../ui.module.css";
import { Illus } from "./illustrations";
import { AddToCartButton } from "./AddToCartButton";
import { Price } from "./Price";
import { Loc } from "./Loc";
import { seriesArt, seriesNameOf, type Product } from "../_data/catalog";

/** Карточка товара — переиспользуется на Home и в каталоге. */
export function ProductCard({ p }: { p: Product }) {
  const badgeEn = p.badge
    ? p.badge.kind === "New"
      ? "New"
      : p.badge.kind === "Hit"
        ? "Hit"
        : p.badge.label
    : "";
  return (
    <article className={styles.card}>
      <Link
        href={`/product/${p.id}`}
        className={styles.cardMedia}
        style={{ background: p.tint }}
        aria-label={p.title}
      >
        {p.badge && (
          <span className={`${styles.badge} ${styles[`badge${p.badge.kind}`]}`}>
            <Loc ru={p.badge.label} en={badgeEn} />
          </span>
        )}
        <Illus name={seriesArt(p.seriesId)} label={p.title} />
      </Link>
      <div className={styles.cardBody}>
        <span className={styles.cardSeries}>
          <Loc ru={p.seriesName} en={seriesNameOf(p.seriesId, "en")} />
        </span>
        <Link href={`/product/${p.id}`} className={styles.cardTitle}>
          <Loc ru={p.title} en={p.titleEn} />
        </Link>
        <span className={styles.cardMeta}>
          <Loc ru={`${p.parts} деталей · от ${p.age} лет`} en={`${p.parts} parts · from ${p.age}+`} />
        </span>
        <div className={styles.cardFoot}>
          <div>
            <span className={styles.price}><Price rub={p.price} /></span>
            {p.oldPrice && (
              <span className={styles.priceOld}><Price rub={p.oldPrice} /></span>
            )}
          </div>
          <AddToCartButton id={p.id} title={p.title} variant="icon" />
        </div>
      </div>
    </article>
  );
}
