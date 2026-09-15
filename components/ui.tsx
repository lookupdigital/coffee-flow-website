import Link from "next/link";
import { Fragment } from "react";
import { Product, cardDescription } from "@/lib/data";
import { Pic } from "./shared";
import { ContactForm, HeaderShell } from "./interactive";

// Right to left: "בית" is the right-most menu item.
const nav = [
  ["/", "בית"],
  ["/solutions/office", "פתרונות למשרדים"],
  ["/solutions/cafe", "פתרונות לבתי קפה ומסעדות"],
  ["/solutions/hotel", "פתרונות למלונות"],
];

export function WhatsAppLink({ className = "" }: { className?: string }) {
  return (
    <Link href="#contact" className={`whatsapp ${className}`}>
      <img src="/images/d8c0a.svg" alt="" width={16} height={16} />
      צרו קשר
    </Link>
  );
}

export function Header({
  overlay = true,
  home = false,
}: {
  overlay?: boolean;
  home?: boolean;
}) {
  return (
    <HeaderShell className={`header ${overlay ? "header-overlay" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="Coffee Flow">
          <img src="/images/6373b.webp" alt="Coffee Flow" width={158} height={67} />
        </Link>
        <nav className="header-nav" aria-label="ניווט ראשי">
          {nav.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        {home ? (
          <img
            className="header-partner"
            src="/images/94ed1.webp"
            alt="DIL Israel"
            width={85}
            height={32}
          />
        ) : (
          <WhatsAppLink />
        )}
      </div>
    </HeaderShell>
  );
}

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
          ["#contact", "צור קשר"],
          ["#reviews", "המלצות"],
          ["/beans", "הקפה שלנו"],
          ["/machines", "מכונות"],
          ["/#about", "עלינו"],
        ]
      : [
          ["#contact", "צור קשר"],
          ["/privacy", "מדיניות פרטיות"],
          ["/accessibility", "הצהרת נגישות"],
        ];
  return (
    <footer className={`footer footer-${size}`}>
      <div className="footer-inner">
        <nav className="footer-links" aria-label="קישורים">
          {links.map(([href, label]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
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
        <span className="machine-card-text">{cardDescription}</span>
      </span>
    </Link>
  );
}

// Coffee beans have no product page, so the card is not a link.
export function CoffeeCard({ product: p, outlined = false }: { product: Product; outlined?: boolean }) {
  return (
    <article className="coffee-card">
      <span className={`coffee-card-photo ${outlined ? "coffee-card-outlined" : ""}`}>
        <Pic id={p.cardImage ?? p.image} fit={p.cardFit} alt={p.cardName} />
      </span>
      <span className="coffee-card-meta">
        <span className="card-title">{p.cardName}</span>
        <span className="coffee-card-percent">אחוזים</span>
        <span className="coffee-card-text">פסקה</span>
      </span>
    </article>
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
