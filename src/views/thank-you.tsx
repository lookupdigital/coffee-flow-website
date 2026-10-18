import { Header } from "@/components/interactive";
import { ButtonLink, Footer } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

const copy = {
  he: {
    title: "תודה! הפרטים התקבלו",
    text: "נציג Coffee Flow יחזור אליכם בהקדם כדי להתאים לכם את פתרון הקפה הנכון לעסק.",
    home: "חזרה לדף הבית",
    catalog: "לקטלוג 2026",
  },
  en: {
    title: "Thank you! We received your details",
    text: "A Coffee Flow representative will get back to you shortly to find the right coffee solution for your business.",
    home: "Back to the home page",
    catalog: null,
  },
} as const;

/**
 * Lead confirmation page. The contact form redirects here only after the server stored the lead, so analytics can
 * count conversions by page URL (/thank-you, /en/thank-you) as well as by the generate_lead event.
 */
export default function ThankYouView({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <Header />
      <main className="plain-page thank-you">
        <span className="thank-you-mark" aria-hidden="true">
          ✓
        </span>
        <h1 className="h2">{t.title}</h1>
        <p className="subheading">{t.text}</p>
        <div className="thank-you-actions">
          <ButtonLink href="/" tone="gold" locale={locale}>
            {t.home}
          </ButtonLink>
          {t.catalog && <ButtonLink href="/catalog">{t.catalog}</ButtonLink>}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
