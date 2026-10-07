import Link from "next/link";
import { ButtonLink, Footer, Header } from "@/components/ui";
import { servicePhone } from "@/lib/data";
import { Locale, localePath } from "@/lib/i18n";

const copy = {
  he: {
    breadcrumbs: "מיקום באתר",
    home: "בית",
    title: "שירות טכני",
    text: "תקלה במכונה או שאלה על התפעול? צוות השירות הטכני שלנו זמין עבורכם.",
    label: "לשירות טכני חייגו למספר",
    call: "חייגו עכשיו",
  },
  en: {
    breadcrumbs: "Breadcrumbs",
    home: "Home",
    title: "Technical service",
    text: "A machine fault or a question about operation? Our technical service team is here for you.",
    label: "For technical service, call",
    call: "Call now",
  },
};

export default function ServiceView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <Header />
      <main className="service-page">
        <nav className="breadcrumbs" aria-label={c.breadcrumbs}>
          <Link href={localePath(locale, "/")}>{c.home}</Link>
          <span aria-hidden>›</span>
          <span aria-current="page">{c.title}</span>
        </nav>
        <h1 className="h1">{c.title}</h1>
        <p className="subheading">{c.text}</p>
        <div className="service-card">
          <span className="service-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="service-label">{c.label}</p>
          <a className="service-number" href={`tel:${servicePhone.tel}`} dir="ltr">
            {servicePhone.display}
          </a>
          <ButtonLink href={`tel:${servicePhone.tel}`} tone="gold">
            {c.call}
          </ButtonLink>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
