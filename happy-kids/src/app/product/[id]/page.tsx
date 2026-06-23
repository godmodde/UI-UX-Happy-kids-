import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../ui.module.css";
import { CheckIcon } from "../../_components/icons";
import { Illus } from "../../_components/illustrations";
import { ProductCard } from "../../_components/ProductCard";
import { AddToCartButton } from "../../_components/AddToCartButton";
import { Price } from "../../_components/Price";
import { Loc } from "../../_components/Loc";
import {
  products,
  getProduct,
  seriesSiblings,
  productBlurb,
  seriesArt,
  seriesNameOf,
  difficultyLabel,
  difficultyLabelEn,
} from "../../_data/catalog";

type Params = { params: Promise<{ id: string }> };

/** Пререндерим все товары каталога (малый каталог — выгодно SSG). */
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return { title: "Товар не найден — Happy Kids" };
  return {
    title: `${p.title} — Happy Kids`,
    description: productBlurb(p),
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();

  const siblings = seriesSiblings(p);
  const thumbTints = ["#FFFFFF", p.tint, "#FFF1E0", "#EAF2FF"];
  const seriesEn = seriesNameOf(p.seriesId, "en");
  const badgeEn = p.badge ? (p.badge.kind === "New" ? "New" : p.badge.kind === "Hit" ? "Hit" : p.badge.label) : "";

  return (
    <main className={`${styles.container} ${styles.section}`}>
      <nav className={styles.breadcrumb} aria-label="breadcrumbs">
        <Link href="/"><Loc ru="Главная" en="Home" /></Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalog"><Loc ru="Каталог" en="Catalog" /></Link>
        <span aria-hidden="true">/</span>
        <Link href={`/catalog?series=${p.seriesId}`}><Loc ru={p.seriesName} en={seriesEn} /></Link>
        <span aria-hidden="true">/</span>
        <span><Loc ru={p.title} en={p.titleEn} /></span>
      </nav>

      <div className={styles.pdpLayout}>
        {/* ----------- Галерея ----------- */}
        <div className={styles.gallery}>
          <div className={styles.galleryMain} style={{ background: p.tint }}>
            {p.badge && (
              <span className={`${styles.badge} ${styles[`badge${p.badge.kind}`]}`}>
                <Loc ru={p.badge.label} en={badgeEn} />
              </span>
            )}
            <Illus name={seriesArt(p.seriesId)} label={p.title} />
          </div>
          <div className={styles.galleryThumbs}>
            {thumbTints.map((t, i) => (
              <div key={i} className={styles.thumb} style={{ background: t }}>
                <Illus name={seriesArt(p.seriesId)} label={`${p.title} — вид ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* ----------- Инфо ----------- */}
        <div className={styles.pdpInfo}>
          <div className={styles.pdpEyebrow}>
            <span className={styles.cardSeries}><Loc ru={p.seriesName} en={seriesEn} /></span>
            <span className={styles.stockBadge}>
              <CheckIcon size={16} /> <Loc ru="В наличии" en="In stock" />
            </span>
          </div>

          <h1><Loc ru={p.title} en={p.titleEn} /></h1>

          <div className={styles.pdpPrice}>
            <span className={styles.price}><Price rub={p.price} /></span>
            {p.oldPrice && (
              <span className={styles.priceOld}><Price rub={p.oldPrice} /></span>
            )}
          </div>

          <p className={styles.pdpDesc}><Loc ru={productBlurb(p, "ru")} en={productBlurb(p, "en")} /></p>

          {/* Характеристики (для родителя) */}
          <dl className={styles.specList}>
            <div className={styles.specRow}>
              <dt><Loc ru="Возраст" en="Age" /></dt>
              <dd><Loc ru={`от ${p.age} лет`} en={`from ${p.age}+`} /></dd>
            </div>
            <div className={styles.specRow}>
              <dt><Loc ru="Деталей" en="Parts" /></dt>
              <dd>{p.parts}</dd>
            </div>
            <div className={styles.specRow}>
              <dt><Loc ru="Сложность" en="Difficulty" /></dt>
              <dd><Loc ru={difficultyLabel[p.difficulty]} en={difficultyLabelEn[p.difficulty]} /></dd>
            </div>
            <div className={styles.specRow}>
              <dt><Loc ru="Бренд" en="Brand" /></dt>
              <dd>{p.brand}</dd>
            </div>
          </dl>

          {/* Переключатель серий (другие наборы серии) */}
          {siblings.length > 0 && (
            <div className={styles.variantBlock}>
              <h2><Loc ru={`Серия «${p.seriesName}» — другие наборы`} en={`More ${seriesEn} sets`} /></h2>
              <div className={styles.variantList}>
                <span className={`${styles.variant} ${styles.variantCurrent}`}>
                  <strong><Loc ru={p.title} en={p.titleEn} /></strong>
                  <span><Loc ru={`${p.parts} дет.`} en={`${p.parts} pcs`} /> · <Price rub={p.price} /></span>
                </span>
                {siblings.map((s) => (
                  <Link key={s.id} href={`/product/${s.id}`} className={styles.variant}>
                    <strong><Loc ru={s.title} en={s.titleEn} /></strong>
                    <span><Loc ru={`${s.parts} дет.`} en={`${s.parts} pcs`} /> · <Price rub={s.price} /></span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Покупка */}
          <div className={styles.buyRow}>
            <AddToCartButton id={p.id} title={p.title} variant="full" />
            <Link href="/catalog" className={`${styles.btn} ${styles.btnSecondary}`}>
              <Loc ru="Назад в каталог" en="Back to catalog" />
            </Link>
          </div>

          <div className={styles.pdpTrust}>
            <div><CheckIcon size={16} /> <Loc ru="Сертифицированные безопасные материалы" en="Certified safe materials" /></div>
            <div><CheckIcon size={16} /> <Loc ru="Доставка 1–2 дня, оплата при получении" en="Delivery in 1–2 days, pay on receipt" /></div>
            <div><CheckIcon size={16} /> <Loc ru="Возврат в течение 14 дней" en="14-day returns" /></div>
          </div>
        </div>
      </div>

      {/* ----------- Из этой серии ----------- */}
      {siblings.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2><Loc ru={`Ещё из серии «${p.seriesName}»`} en={`More from ${seriesEn}`} /></h2>
              <p><Loc ru="Наборы, которые хорошо дополняют друг друга" en="Sets that complement each other well" /></p>
            </div>
            <Link href={`/catalog?series=${p.seriesId}`} className={styles.link}>
              <Loc ru="Вся серия →" en="Whole series →" />
            </Link>
          </div>
          <div className={styles.catalogGrid}>
            {siblings.map((s) => (
              <ProductCard key={s.id} p={s} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
