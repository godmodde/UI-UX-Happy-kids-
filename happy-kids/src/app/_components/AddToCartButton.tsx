"use client";

import { useState } from "react";
import styles from "../ui.module.css";
import { PlusIcon, CartIcon, CheckIcon } from "./icons";
import { useCart } from "./cart-context";

type Props = {
  id: string;
  title: string;
  variant?: "icon" | "full";
};

/** Кнопка добавления в корзину с кратким подтверждением. */
export function AddToCartButton({ id, title, variant = "icon" }: Props) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  function handleAdd() {
    add(id, 1);
    setDone(true);
    window.setTimeout(() => setDone(false), 1500);
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={handleAdd}
        aria-label={`Добавить «${title}» в корзину`}
      >
        {done ? <CheckIcon size={20} /> : <CartIcon size={20} />}
        {done ? "Добавлено" : "В корзину"}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.addBtn}
      onClick={handleAdd}
      aria-label={`Добавить «${title}» в корзину`}
    >
      {done ? <CheckIcon size={20} /> : <PlusIcon />}
    </button>
  );
}
