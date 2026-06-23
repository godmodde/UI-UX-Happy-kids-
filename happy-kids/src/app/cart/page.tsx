"use client";

import Link from "next/link";
import styles from "../ui.module.css";
import { CheckIcon } from "../_components/icons";
import { Illus } from "../_components/illustrations";
import { useCart } from "../_components/cart-context";
import { Price } from "../_components/Price";
import { Loc } from "../_components/Loc";
import { getProduct, seriesArt, seriesNameOf } from "../_data/catalog";

export default function CartPage() {
  const { items, loaded, setQty, remove, clear } = useCart();

  // Сопоставляем строки корзины с товарами каталога.
  const lines = items
    .map((i) => {
      const product = getProduct(i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter((l): l is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number } => l !== null);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <main className={`${styles.container} ${styles.section}`}>
      <nav className={styles.breadcrumb} aria-label="breadcrumbs">
        <Link href="/"><Loc ru="Главная" en="Home" /></Link>
        <span aria-hidden="true">/</span>
        <span><Loc ru="Корзина" en="Cart" /></span>
      </nav>

      <div className={styles.catalogTitle}>
        <h1><Loc ru="Корзина" en="Cart" /></h1>
        {loaded && lines.length > 0 && <span><Loc ru={`${totalQty} шт.`} en={`${totalQty} pcs`} /></span>}
      </div>

      {/* До гидрации не знаем содержимое — показываем нейтральную заглушку */}
      {!loaded ? (
        <p className={styles.cardMeta}><Loc ru="Загружаем корзину…" en="Loading cart…" /></p>
      ) : lines.length === 0 ? (
        <div className={styles.emptyState}>
          <h3><Loc ru="Корзина пуста" en="Your cart is empty" /></h3>
          <p><Loc ru="Загляните в каталог — там есть наборы для любого возраста." en="Browse the catalog — there are sets for every age." /></p>
          <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}>
            <Loc ru="Перейти в каталог" en="Go to catalog" />
          </Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          {/* ---- Список ---- */}
          <div className={styles.cartList}>
            {lines.map(({ product: p, qty }) => (
              <div key={p.id} className={styles.cartLine}>
                <div className={styles.cartThumb} style={{ background: p.tint }}>
                  <Illus name={seriesArt(p.seriesId)} label={p.title} />
                </div>
                <div className={styles.cartInfo}>
                  <span className={styles.cardSeries}><Loc ru={p.seriesName} en={seriesNameOf(p.seriesId, "en")} /></span>
                  <Link href={`/product/${p.id}`}><Loc ru={p.title} en={p.titleEn} /></Link>
                  <small><Loc ru={`${p.parts} деталей · `} en={`${p.parts} parts · `} /><Price rub={p.price} /><Loc ru=" / шт." en=" / pc" /></small>
                </div>
                <div className={styles.cartRight}>
                  <div className={styles.stepper} role="group" aria-label={p.title}>
                    <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label="−">−</button>
                    <span aria-live="polite">{qty}</span>
                    <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label="+">+</button>
                  </div>
                  <span className={styles.lineTotal}><Price rub={p.price * qty} /></span>
                  <button type="button" className={styles.removeBtn} onClick={() => remove(p.id)}>
                    <Loc ru="Удалить" en="Remove" />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className={styles.removeBtn} onClick={clear} style={{ alignSelf: "flex-start" }}>
              <Loc ru="Очистить корзину" en="Clear cart" />
            </button>
          </div>

          {/* ---- Итоги ---- */}
          <aside className={styles.summary}>
            <h2><Loc ru="Итого" en="Summary" /></h2>
            <div className={styles.summaryRow}>
              <span><Loc ru={`Товары (${totalQty})`} en={`Items (${totalQty})`} /></span>
              <span><Price rub={subtotal} /></span>
            </div>
            <div className={styles.summaryRow}>
              <span><Loc ru="Доставка" en="Delivery" /></span>
              <span><Loc ru="при оформлении" en="at checkout" /></span>
            </div>
            <div className={styles.summaryTotal}>
              <strong><Loc ru="К оплате" en="Total" /></strong>
              <span className={styles.price}><Price rub={subtotal} /></span>
            </div>
            <Link href="/checkout" className={`${styles.btn} ${styles.btnPrimary}`}>
              <Loc ru="Оформить заказ" en="Checkout" />
            </Link>
            <div className={styles.summaryNote}>
              <CheckIcon size={16} /> <Loc ru="Оформление без регистрации" en="Guest checkout" />
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
