"use client";

import { useState } from "react";
import styles from "../ui.module.css";
import { useT } from "./settings-context";

/* Форма заявки в финальном CTA: Фамилия + Имя + телефон + согласие. */
export function LeadForm() {
  const t = useT();
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!surname.trim()) return setError(t("lf.err.surname"));
    if (!name.trim()) return setError(t("lf.err.name"));
    if (!/^[+\d][\d\s()-]{9,}$/.test(phone.trim())) return setError(t("lf.err.phone"));
    if (!agree) return setError(t("lf.err.agree"));
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <p className={styles.leadDone} role="status">
        {t("lf.done")}
      </p>
    );
  }

  return (
    <form className={styles.leadForm} onSubmit={submit} noValidate>
      <input aria-label={t("lf.surname")} placeholder={t("lf.surname")} autoComplete="family-name"
        value={surname} onChange={(e) => { setSurname(e.target.value); setError(""); }} />
      <input aria-label={t("lf.name")} placeholder={t("lf.name")} autoComplete="given-name"
        value={name} onChange={(e) => { setName(e.target.value); setError(""); }} />
      <input aria-label={t("lf.phone")} type="tel" inputMode="tel" placeholder={t("lf.phone")} autoComplete="tel"
        value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} />
      <label className={styles.leadAgree}>
        <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setError(""); }} />
        <span>{t("lf.agree")}</span>
      </label>
      <button type="submit" className={styles.leadSubmit}>{t("lf.submit")}</button>
      {error && <span className={styles.leadError} role="alert">{error}</span>}
    </form>
  );
}
