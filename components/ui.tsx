import Link from "next/link";
import { Fragment } from "react";
import { Product, beanPlaceholder, cardDescription, diplomatBrands, servicePhone } from "@/lib/data";
import { Pic, WhatsAppLink } from "./shared";
import { ContactForm, Header } from "./interactive";

export { Header, WhatsAppLink };

export function Footer({
  variant = "default",
  size = "wide",
}: {
  variant?: "default" | "solution";
  size?: "wide" | "catalog" | "product";
}) {
  const links =
    variant === "solution"
      ? [
          [servicePhone.whatsapp, "צור קשר"],
          ["#reviews", "המלצות"],
          ["/beans", "הקפה שלנו"],
          ["/machines", "מכונות"],
          ["/#about", "עלינו"],
        ]
      : [
          [servicePhone.whatsapp, "צור קשר"],
          ["/privacy", "מדיניות פרטיות"],
          ["/accessibility", "הצהרת נגישות"],
        ];
  return (
    <footer className={`footer footer-${size}`}>
      <div className="footer-inner">
        <nav className="footer-links" aria-label="קישורים">
          {links.map(([href, label]) =>
            href.startsWith("http") ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link key={label} href={href}>
                {label}
              </Link>
            ),
          )}
        </nav>
        <p className="footer-copy">
          © 2026 Coffee Flow. כל הזכויות שמורות{variant === "solution" ? "." : ""}
        </p>
        <Link href="/" className="footer-logo" aria-label="Coffee Flow">
          <img src="/images/6373b.webp" alt="Coffee Flow" />
        </Link>
      </div>
    </footer>
  );
}

export function ButtonLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "gold";
}) {
  // External sites open in a new tab so visitors keep their place here.
  if (href.startsWith("http"))
    return (
      <a href={href} className={`btn btn-${tone}`} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  if (href.startsWith("tel:"))
    return (
      <a href={href} className={`btn btn-${tone}`}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={`btn btn-${tone}`}>
      {children}
    </Link>
  );
}

export function SectionHeader({
  title,
  text,
  width,
  condensedText = false,
}: {
  title: string;
  text: string | string[];
  width: number;
  condensedText?: boolean;
}) {
  const lines = Array.isArray(text) ? text : [text];
  return (
    <div className="section-header">
      <h2 className="h2">{title}</h2>
      <div
        className={`lead ${condensedText ? "lead-con" : ""}`}
        style={{ maxWidth: width }}
      >
        {lines.map((line) => (
          <p key={line}>
            <RichText text={line} />
          </p>
        ))}
      </div>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/([A-Za-z][A-Za-z0-9’'.\- ]*[A-Za-z0-9])/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <span className="eng" key={i}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function MachineCard({
  product: p,
  variant,
}: {
  product: Product;
  variant: "home" | "solution" | "plain";
}) {
  const fit = variant === "solution" && p.solutionFit ? p.solutionFit : p.cardFit;
  return (
    <Link
      href={`/products/${p.slug}`}
      className={`machine-card ${variant === "solution" ? "machine-card-bordered" : ""}`}
    >
      <span className="machine-card-photo">
        <Pic id={p.cardImage ?? p.image} fit={fit} alt={p.cardName} />
      </span>
      <span className="machine-card-body">
        <span className="card-title">{p.cardName}</span>
        <span className="machine-card-text">
          <RichText text={p.description ?? cardDescription} />
        </span>
      </span>
    </Link>
  );
}

// Beans have no product pages, so the card jumps to the product's row in the catalog.
export function CoffeeCard({ product: p, outlined = false }: { product: Product; outlined?: boolean }) {
  return (
    <Link href={`/beans#${p.slug}`} className="coffee-card">
      <span className={`coffee-card-photo ${outlined ? "coffee-card-outlined" : ""}`}>
        <Pic id={p.cardImage ?? p.image} fit={p.cardFit} alt={p.cardName} />
      </span>
      <span className="coffee-card-meta">
        <span className="card-title">{p.cardName}</span>
        <span className="coffee-card-text">
          {p.description ? <RichText text={p.description} /> : beanPlaceholder}
        </span>
      </span>
    </Link>
  );
}

export function Testimonials({
  title,
  width,
  children,
  className = "",
}: {
  title: string;
  width: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`testimonials ${className}`} id="reviews">
      <div className="testimonials-inner">
        <h2 className="h2 testimonials-title" style={{ maxWidth: width }}>
          {title}
        </h2>
        <div className="testimonials-body">{children}</div>
      </div>
    </section>
  );
}

export function ContactSection({ title, text }: { title: string; text: string }) {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <h2 className="contact-title">{title}</h2>
        <p className="contact-text">{text}</p>
        <ContactForm />
      </div>
    </section>
  );
}

export function Separated({ items }: { items: string[] }) {
  return (
    <div className="features">
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <span className="feature-line" aria-hidden />}
          <span className="feature">{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

// Endless logo strip. The list is rendered twice so the CSS loop can wrap seamlessly;
// the copy is hidden from screen readers.
export function BrandCarousel() {
  return (
    <div className="brand-carousel" aria-label="המותגים של דיפלומט">
      <div className="brand-track">
        {[false, true].map((copy) => (
          <ul className="brand-list" aria-hidden={copy || undefined} key={String(copy)}>
            {diplomatBrands.map(([file, name]) => (
              <li className="brand-card" key={file}>
                <img src={`/images/brands/${file}.webp`} alt={copy ? "" : name} loading="lazy" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
