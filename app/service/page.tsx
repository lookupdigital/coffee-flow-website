import Link from "next/link";
import { ButtonLink, Footer, Header } from "@/components/ui";
import { servicePhone } from "@/lib/data";

export const metadata = { title: "שירות טכני" };

export default function ServicePage() {
  return (
    <>
      <Header />
      <main className="service-page">
        <nav className="breadcrumbs" aria-label="מיקום באתר">
          <Link href="/">בית</Link>
          <span aria-hidden>›</span>
          <span aria-current="page">שירות טכני</span>
        </nav>
        <h1 className="h1">שירות טכני</h1>
        <p className="subheading">
          תקלה במכונה או שאלה על התפעול? צוות השירות הטכני שלנו זמין עבורכם.
        </p>
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
          <p className="service-label">לשירות טכני חייגו למספר</p>
          <a className="service-number" href={`tel:${servicePhone.tel}`} dir="ltr">
            {servicePhone.display}
          </a>
          <ButtonLink href={`tel:${servicePhone.tel}`} tone="gold">
            חייגו עכשיו
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
