"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../ui.module.css";
import { CheckIcon } from "../_components/icons";
import { useCart } from "../_components/cart-context";
import { useSettings } from "../_components/settings-context";
import { Price } from "../_components/Price";
import { Loc } from "../_components/Loc";
import { getProduct, type Locale } from "../_data/catalog";

type Delivery = "courier" | "pickup" | "post";
type Payment = "online" | "cod";

const DELIVERY: Record<Delivery, { label: string; labelEn: string; note: string; noteEn: string; cost: number }> = {
  courier: { label: "Курьер", labelEn: "Courier", note: "1–2 дня по городу", noteEn: "1–2 days in town", cost: 300 },
  pickup: { label: "Самовывоз", labelEn: "Pickup", note: "из пункта выдачи, сегодня", noteEn: "from a pickup point, today", cost: 0 },
  post: { label: "Почта / СДЭК", labelEn: "Post / CDEK", note: "3–7 дней по России", noteEn: "3–7 days across Russia", cost: 250 },
};

const PICKUP_POINTS = ["ул. Ленина, 12", "пр. Мира, 45", "ТЦ «Радуга», 2 этаж"];

type Form = {
  name: string; phone: string; email: string; delivery: Delivery;
  city: string; address: string; pickupPoint: string; payment: Payment;
  comment: string; agree: boolean;
};

const initialForm: Form = {
  name: "", phone: "", email: "", delivery: "courier",
  city: "", address: "", pickupPoint: PICKUP_POINTS[0], payment: "online",
  comment: "", agree: false,
};

type Errors = Partial<Record<keyof Form, string>>;

function validate(f: Form, locale: Locale): Errors {
  const en = locale === "en";
  const e: Errors = {};
  if (!f.name.trim()) e.name = en ? "Enter the recipient's name." : "Укажите имя получателя.";
  if (!/^[+\d][\d\s()-]{9,}$/.test(f.phone.trim()))
    e.phone = en ? "Phone like +7 999 000-00-00." : "Телефон в формате +7 999 000-00-00.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = en ? "Check the address — e.g. name@mail.com." : "Проверьте адрес — например, name@mail.ru.";
  if (f.delivery === "courier" || f.delivery === "post") {
    if (!f.city.trim()) e.city = en ? "Enter the city." : "Укажите город.";
    if (!f.address.trim()) e.address = en ? "Enter street, building and flat." : "Укажите улицу, дом и квартиру.";
  }
  if (!f.agree) e.agree = en ? "Consent to data processing is required." : "Нужно согласие на обработку данных.";
  return e;
}

export default function CheckoutPage() {
  const { items, loaded, clear } = useCart();
  const { locale } = useSettings();
  const L = (ru: string, en: string) => (locale === "en" ? en : ru);
  const [form, setForm] = useState<Form>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<null | { orderNo: string; total: number }>(null);

  const lines = items
    .map((i) => {
      const product = getProduct(i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter((l): l is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number } => l !== null);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const deliveryCost = DELIVERY[form.delivery].cost;
  const total = subtotal + deliveryCost;

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const eMap = validate(form, locale);
    setErrors(eMap);
    const firstError = Object.keys(eMap)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }
    const orderNo = "HK-" + String(Date.now()).slice(-6);
    setDone({ orderNo, total });
    clear();
  }

  /* ---------- Экран успеха ---------- */
  if (done) {
    return (
      <main className={`${styles.container} ${styles.section}`}>
        <div className={styles.successBox}>
          <div className={styles.successIcon}><CheckIcon size={36} /></div>
          <h1><Loc ru="Заказ оформлен!" en="Order placed!" /></h1>
          <p><Loc ru="Спасибо за покупку в Happy Kids. Мы позвоним для подтверждения." en="Thanks for shopping at Happy Kids. We'll call to confirm." /></p>
          <p>
            <Loc ru="Номер заказа: " en="Order number: " /><span className={styles.orderNo}>{done.orderNo}</span>
          </p>
          <p><Loc ru="Сумма к оплате: " en="Total: " /><strong><Price rub={done.total} /></strong></p>
          <div className={styles.successActions}>
            <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}><Loc ru="Продолжить покупки" en="Keep shopping" /></Link>
            <Link href="/" className={`${styles.btn} ${styles.btnSecondary}`}><Loc ru="На главную" en="Home" /></Link>
          </div>
        </div>
      </main>
    );
  }

  /* ---------- Пустая корзина ---------- */
  if (loaded && lines.length === 0) {
    return (
      <main className={`${styles.container} ${styles.section}`}>
        <div className={styles.emptyState}>
          <h3><Loc ru="Оформлять нечего" en="Nothing to check out" /></h3>
          <p><Loc ru="Корзина пуста — сначала добавьте наборы из каталога." en="Your cart is empty — add some sets from the catalog first." /></p>
          <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}><Loc ru="Перейти в каталог" en="Go to catalog" /></Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.container} ${styles.section}`}>
      <nav className={styles.breadcrumb} aria-label="breadcrumbs">
        <Link href="/"><Loc ru="Главная" en="Home" /></Link>
        <span aria-hidden="true">/</span>
        <Link href="/cart"><Loc ru="Корзина" en="Cart" /></Link>
        <span aria-hidden="true">/</span>
        <span><Loc ru="Оформление" en="Checkout" /></span>
      </nav>

      <div className={styles.catalogTitle}>
        <h1><Loc ru="Оформление заказа" en="Checkout" /></h1>
        <span><Loc ru="без регистрации" en="no sign-up" /></span>
      </div>

      <form className={styles.checkoutLayout} onSubmit={handleSubmit} noValidate>
        <div>
          {/* 1. Контакты */}
          <fieldset className={styles.formSection}>
            <legend><span className={styles.stepNum}>1</span> <Loc ru="Контакты" en="Contacts" /></legend>
            <div className={styles.field}>
              <label htmlFor="name"><Loc ru="Имя получателя" en="Recipient name" /> <span className={styles.req}>*</span></label>
              <input id="name" name="name" autoComplete="name" value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={errors.name ? styles.inputError : undefined}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
              {errors.name && <span id="name-err" className={styles.errorText} role="alert">{errors.name}</span>}
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="phone"><Loc ru="Телефон" en="Phone" /> <span className={styles.req}>*</span></label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                  placeholder="+7 999 000-00-00" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={errors.phone ? styles.inputError : undefined}
                  aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
                {errors.phone && <span id="phone-err" className={styles.errorText} role="alert">{errors.phone}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor="email">E-mail <span className={styles.req}>*</span></label>
                <input id="email" name="email" type="email" inputMode="email" autoComplete="email"
                  placeholder={L("name@mail.ru", "name@mail.com")} value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={errors.email ? styles.inputError : undefined}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
                {errors.email && <span id="email-err" className={styles.errorText} role="alert">{errors.email}</span>}
              </div>
            </div>
          </fieldset>

          {/* 2. Доставка */}
          <fieldset className={styles.formSection}>
            <legend><span className={styles.stepNum}>2</span> <Loc ru="Доставка" en="Delivery" /></legend>
            <div className={styles.radioGroup}>
              {(Object.keys(DELIVERY) as Delivery[]).map((key) => (
                <label key={key} className={styles.radioCard}>
                  <input type="radio" name="delivery" value={key} checked={form.delivery === key} onChange={() => set("delivery", key)} />
                  <span className={styles.rcMain}>
                    <strong><Loc ru={DELIVERY[key].label} en={DELIVERY[key].labelEn} /></strong>
                    <small><Loc ru={DELIVERY[key].note} en={DELIVERY[key].noteEn} /></small>
                  </span>
                  <span className={styles.rcPrice}>
                    {DELIVERY[key].cost === 0 ? <Loc ru="бесплатно" en="free" /> : <Price rub={DELIVERY[key].cost} />}
                  </span>
                </label>
              ))}
            </div>

            {form.delivery === "pickup" ? (
              <div className={styles.field}>
                <label htmlFor="pickupPoint"><Loc ru="Пункт выдачи" en="Pickup point" /></label>
                <select id="pickupPoint" value={form.pickupPoint} onChange={(e) => set("pickupPoint", e.target.value)}>
                  {PICKUP_POINTS.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>
            ) : (
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="city"><Loc ru="Город" en="City" /> <span className={styles.req}>*</span></label>
                  <input id="city" name="city" autoComplete="address-level2" value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className={errors.city ? styles.inputError : undefined}
                    aria-invalid={!!errors.city} aria-describedby={errors.city ? "city-err" : undefined} />
                  {errors.city && <span id="city-err" className={styles.errorText} role="alert">{errors.city}</span>}
                </div>
                <div className={styles.field}>
                  <label htmlFor="address"><Loc ru="Адрес" en="Address" /> <span className={styles.req}>*</span></label>
                  <input id="address" name="address" autoComplete="street-address" value={form.address}
                    placeholder={L("Улица, дом, квартира", "Street, building, flat")} onChange={(e) => set("address", e.target.value)}
                    className={errors.address ? styles.inputError : undefined}
                    aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-err" : undefined} />
                  {errors.address && <span id="address-err" className={styles.errorText} role="alert">{errors.address}</span>}
                </div>
              </div>
            )}
          </fieldset>

          {/* 3. Оплата */}
          <fieldset className={styles.formSection}>
            <legend><span className={styles.stepNum}>3</span> <Loc ru="Оплата" en="Payment" /></legend>
            <div className={styles.radioGroup}>
              <label className={styles.radioCard}>
                <input type="radio" name="payment" value="online" checked={form.payment === "online"} onChange={() => set("payment", "online")} />
                <span className={styles.rcMain}>
                  <strong><Loc ru="Картой онлайн" en="Card online" /></strong>
                  <small><Loc ru="безопасная оплата на сайте" en="secure payment on the site" /></small>
                </span>
              </label>
              <label className={styles.radioCard}>
                <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={() => set("payment", "cod")} />
                <span className={styles.rcMain}>
                  <strong><Loc ru="При получении" en="On delivery" /></strong>
                  <small><Loc ru="наличными или картой курьеру" en="cash or card to the courier" /></small>
                </span>
              </label>
            </div>
            <div className={styles.field}>
              <label htmlFor="comment"><Loc ru="Комментарий к заказу" en="Order comment" /></label>
              <textarea id="comment" name="comment" value={form.comment}
                placeholder={L("Например: позвонить за час до доставки", "E.g. call an hour before delivery")}
                onChange={(e) => set("comment", e.target.value)} />
            </div>
          </fieldset>
        </div>

        {/* Сводка заказа */}
        <aside className={styles.summary}>
          <h2><Loc ru="Ваш заказ" en="Your order" /></h2>
          <div className={styles.miniList}>
            {lines.map(({ product: p, qty }) => (
              <div key={p.id} className={styles.miniLine}>
                <span><Loc ru={p.title} en={p.titleEn} /> × {qty}</span>
                <span><Price rub={p.price * qty} /></span>
              </div>
            ))}
          </div>
          <div className={styles.summaryRow}>
            <span><Loc ru="Товары" en="Items" /></span><span><Price rub={subtotal} /></span>
          </div>
          <div className={styles.summaryRow}>
            <span><Loc ru="Доставка" en="Delivery" /> (<Loc ru={DELIVERY[form.delivery].label} en={DELIVERY[form.delivery].labelEn} />)</span>
            <span>{deliveryCost === 0 ? <Loc ru="бесплатно" en="free" /> : <Price rub={deliveryCost} />}</span>
          </div>
          <div className={styles.summaryTotal}>
            <strong><Loc ru="К оплате" en="Total" /></strong>
            <span className={styles.price}><Price rub={total} /></span>
          </div>

          <label className={styles.agreeRow}>
            <input id="agree" type="checkbox" checked={form.agree}
              onChange={(e) => set("agree", e.target.checked)}
              aria-invalid={!!errors.agree} aria-describedby={errors.agree ? "agree-err" : undefined} />
            <span><Loc ru="Согласен на обработку персональных данных и условия оферты." en="I agree to the processing of personal data and the terms of offer." /></span>
          </label>
          {errors.agree && <span id="agree-err" className={styles.errorText} role="alert">{errors.agree}</span>}

          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}><Loc ru="Подтвердить заказ" en="Confirm order" /></button>
          <div className={styles.summaryNote}>
            <CheckIcon size={16} /> <Loc ru="Это демо — оплата не списывается" en="This is a demo — no payment is charged" />
          </div>
        </aside>
      </form>
    </main>
  );
}
