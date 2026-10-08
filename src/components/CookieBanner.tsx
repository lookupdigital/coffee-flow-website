"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { localeOf, localePath } from "@/lib/i18n";
import { applyConsentChoice, readStoredConsent } from "@/lookup/analytics/events";

const COPY = {
  he: {
    text: "אנחנו משתמשים בעוגיות כדי למדוד את השימוש באתר ולשפר את הפרסום שלנו. אפשר לאשר או לדחות.",
    privacy: "מדיניות פרטיות",
    accept: "אישור",
    reject: "דחייה",
    label: "הסכמה לעוגיות",
  },
  en: {
    text: "We use cookies to measure how the site is used and to improve our advertising. You can accept or decline.",
    privacy: "Privacy policy",
    accept: "Accept",
    reject: "Decline",
    label: "Cookie consent",
  },
};

const noSubscription = () => () => {};

/** Consent banner for Google Consent Mode (default "denied"). Shown until the visitor chooses. */
export default function CookieBanner() {
  const pathname = usePathname();
  // The saved choice lives in this browser only: nothing is shown during server rendering.
  const chosen = useSyncExternalStore(
    noSubscription,
    () => readStoredConsent() !== null,
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);

  if (chosen || dismissed) return null;
  const locale = localeOf(pathname);
  const t = COPY[locale];

  function choose(value: "granted" | "denied") {
    applyConsentChoice(value);
    setDismissed(true);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t.label} dir={locale === "he" ? "rtl" : "ltr"}>
      <p className="cookie-text">
        {t.text}{" "}
        <Link href={localePath(locale, "/privacy")}>{t.privacy}</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn cookie-accept" onClick={() => choose("granted")}>
          {t.accept}
        </button>
        <button type="button" className="cookie-btn cookie-reject" onClick={() => choose("denied")}>
          {t.reject}
        </button>
      </div>
    </div>
  );
}
