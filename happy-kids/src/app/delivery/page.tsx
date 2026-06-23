import type { Metadata } from "next";
import Link from "next/link";
import styles from "../ui.module.css";
import { CheckIcon } from "../_components/icons";
import { Loc } from "../_components/Loc";

export const metadata: Metadata = {
  title: "Доставка и оплата — Happy Kids",
  description:
    "Способы доставки конструкторов Happy Kids: курьер, самовывоз, Почта/СДЭК. Сроки, стоимость, оплата и возврат.",
};

function TruckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9h16v11H4zM3 9l2-5h14l2 5M9 20v-6h6v6" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" />
    </svg>
  );
}

const methods = [
  {
    Icon: TruckIcon,
    name: <Loc ru="Курьер" en="Courier" />,
    note: <Loc ru="1–2 рабочих дня по городу, в удобный интервал" en="1–2 business days in town, in a convenient slot" />,
    cost: <Loc ru="от 300 ₽" en="from 300 ₽" />,
  },
  {
    Icon: StoreIcon,
    name: <Loc ru="Самовывоз" en="Pickup" />,
    note: <Loc ru="Из пункта выдачи, обычно в день заказа" en="From a pickup point, usually the same day" />,
    cost: <Loc ru="Бесплатно" en="Free" />,
  },
  {
    Icon: BoxIcon,
    name: <Loc ru="Почта / СДЭК" en="Post / CDEK" />,
    note: <Loc ru="3–7 дней по России, с трек-номером" en="3–7 days across Russia, with tracking" />,
    cost: <Loc ru="от 250 ₽" en="from 250 ₽" />,
  },
];

const terms = [
  <Loc key="1" ru="По городу — 1–2 дня, по России — 3–7 дней." en="In town — 1–2 days, across Russia — 3–7 days." />,
  <Loc key="2" ru="Отправляем заказы ежедневно; оформленные в выходные — в ближайший рабочий день." en="We ship orders daily; weekend orders go out on the next business day." />,
  <Loc key="3" ru="Точная стоимость зависит от региона и веса посылки — видна при оформлении." en="The exact cost depends on the region and parcel weight — shown at checkout." />,
];

const payment = [
  <Loc key="1" ru="Картой онлайн — безопасная оплата на сайте при оформлении." en="Card online — secure payment on the site at checkout." />,
  <Loc key="2" ru="При получении — наличными или картой курьеру либо в пункте выдачи." en="On delivery — cash or card to the courier or at the pickup point." />,
];

const returns = [
  <Loc key="1" ru="Возврат и обмен — в течение 14 дней, если набор не использовался и сохранена упаковка." en="Returns and exchanges within 14 days if the set is unused and the packaging is intact." />,
  <Loc key="2" ru="Если деталь оказалась повреждённой или некомплектной — заменим бесплатно." en="If a part is damaged or missing — we'll replace it free of charge." />,
];

export default function DeliveryPage() {
  return (
    <main className={`${styles.container} ${styles.section}`}>
      <nav className={styles.breadcrumb} aria-label="breadcrumbs">
        <Link href="/"><Loc ru="Главная" en="Home" /></Link>
        <span aria-hidden="true">/</span>
        <span><Loc ru="Доставка и оплата" en="Delivery & payment" /></span>
      </nav>

      <div className={styles.sectionHead}>
        <div>
          <h1><Loc ru="Доставка и оплата" en="Delivery & payment" /></h1>
          <p className={styles.docIntro}>
            <Loc
              ru="Доставляем по всей России. Выберите удобный способ — точную стоимость и сроки рассчитаем при оформлении заказа."
              en="We ship across Russia. Choose a convenient option — the exact cost and timing are calculated at checkout."
            />
          </p>
        </div>
      </div>

      {/* Способы доставки */}
      <div className={styles.infoGrid}>
        {methods.map((m, i) => (
          <div key={i} className={styles.infoCard}>
            <span className={styles.infoIcon}><m.Icon /></span>
            <h3>{m.name}</h3>
            <p>{m.note}</p>
            <span className={styles.infoCost}>{m.cost}</span>
          </div>
        ))}
      </div>

      <div className={styles.docNote}>
        <CheckIcon size={18} />
        <span><Loc ru="Бесплатная доставка курьером при заказе от 5 000 ₽." en="Free courier delivery on orders from 5,000 ₽." /></span>
      </div>

      {/* Сроки и зоны */}
      <section className={styles.docBlock}>
        <h2><Loc ru="Сроки и зоны" en="Timing & zones" /></h2>
        <ul className={styles.docList}>
          {terms.map((t, i) => (
            <li key={i}><CheckIcon size={18} /> <span>{t}</span></li>
          ))}
        </ul>
      </section>

      {/* Оплата */}
      <section className={styles.docBlock} id="payment">
        <h2><Loc ru="Оплата" en="Payment" /></h2>
        <ul className={styles.docList}>
          {payment.map((t, i) => (
            <li key={i}><CheckIcon size={18} /> <span>{t}</span></li>
          ))}
        </ul>
      </section>

      {/* Возврат и обмен */}
      <section className={styles.docBlock}>
        <h2><Loc ru="Возврат и обмен" en="Returns & exchanges" /></h2>
        <ul className={styles.docList}>
          {returns.map((t, i) => (
            <li key={i}><CheckIcon size={18} /> <span>{t}</span></li>
          ))}
        </ul>
      </section>

      {/* Контакты */}
      <div className={styles.docContact}>
        <div>
          <p><Loc ru="Остались вопросы по доставке?" en="Still have delivery questions?" /></p>
          <a href="tel:+78000000000" className={styles.docPhone}>8 800 000-00-00</a>
          {" · "}
          <a href="mailto:hello@happykids.toys">hello@happykids.toys</a>
        </div>
        <Link href="/catalog" className={`${styles.btn} ${styles.btnPrimary}`}>
          <Loc ru="В каталог" en="To catalog" />
        </Link>
      </div>
    </main>
  );
}
