import Link from "next/link";
import { CSSProperties, Fragment } from "react";
import { Product, beanPlaceholder, cardDescription, diplomatBrands, servicePhone } from "@/lib/data";
import { localizeProduct } from "@/lib/data-en";
import { Locale, localePath, ui } from "@/lib/i18n";
import { navigationRoutes } from "@/lookup/config";
import { getPublishedPosts } from "@/lookup/posts";
import { siteConfig } from "@/site.config";
import { Pic, WhatsAppLink } from "./shared";
import { ContactForm, Header, CarouselStartOnView } from "./interactive";

export { Header, WhatsAppLink };

export async function Footer({
  variant = "default",
  size = "wide",
  locale = "he",
}: {
  variant?: "default" | "solution";
  size?: "wide" | "catalog" | "product";
  locale?: Locale;
}) {
  const t = ui[locale];
  // The blog is listed once a post is published; routes marked nav: false stay out of the menus by design.
  // The blog is Hebrew-only, so English pages leave it out.
  const posts = locale === "he" ? await getPublishedPosts() : [];
  const managed = navigationRoutes(siteConfig.routes, posts.length > 0).filter(
    (route) => route.path !== "/" && locale === "he",
  );
  const links: [string, string][] =
    variant === "solution"
      ? [
          [servicePhone.whatsapp, t.footerContact],
          ["/beans", t.ourCoffee],
          ["/machines", t.machines],
          ["/#about", t.about],
        ]
      : [
          [servicePhone.whatsapp, t.footerContact],
          ["/privacy", t.privacy],
          ["/accessibility", t.accessibility],
        ];
  links.splice(1, 0, ...managed.map((route) => [route.path, route.navLabel ?? route.label] as [string, string]));

  return (
    <footer className={`footer footer-${size}`}>
      <div className="footer-inner">
        <nav className="footer-links" aria-label={t.footerLinks}>
          {links.map(([href, label]) =>
            href.startsWith("http") ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link key={label} href={localePath(locale, href)}>
                {label}
              </Link>
            ),
          )}
        </nav>
        <p className="footer-copy">
          {t.rights}
          {variant === "solution" ? "." : ""}
        </p>
        <Link href={localePath(locale, "/")} className="footer-logo" aria-label="Coffee Flow">
          <img src="/images/6373b.webp" alt="Coffee Flow" />
        </Link>
      </div>
    </footer>
  );
}

export function ButtonLink({
  href: rawHref,
  children,
  tone = "light",
  size = "regular",
  locale = "he",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "gold";
  size?: "regular" | "compact";
  locale?: Locale;
}) {
  const href = localePath(locale, rawHref);
  const className = `btn btn-${tone}${size === "compact" ? " btn-compact" : ""}`;
  // External sites and PDFs open in a new tab so visitors keep their place here.
  if (href.startsWith("http") || href.endsWith(".pdf"))
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  if (href.startsWith("tel:"))
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={className}>
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
  product,
  variant,
  locale = "he",
}: {
  product: Product;
  variant: "home" | "solution" | "plain";
  locale?: Locale;
}) {
  const p = localizeProduct(product, locale);
  const fit = variant === "solution" && p.solutionFit ? p.solutionFit : p.cardFit;
  return (
    <Link
      href={localePath(locale, `/products/${p.slug}`)}
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
export function CoffeeCard({
  product,
  outlined = false,
  locale = "he",
}: {
  product: Product;
  outlined?: boolean;
  locale?: Locale;
}) {
  const p = localizeProduct(product, locale);
  return (
    <Link href={localePath(locale, `/beans#${p.slug}`)} className="coffee-card">
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
// the copy is hidden from screen readers. Defaults to Diplomat's brands.
export function BrandCarousel({
  logos = diplomatBrands,
  dir = "brands",
  label = "המותגים של דיפלומט",
  startOnView = false,
}: {
  logos?: [string, string][];
  dir?: string;
  label?: string;
  /** Hold still until scrolled into view, then start with the first logo centred. */
  startOnView?: boolean;
}) {
  // Short lists repeat so each half of the strip is wider than any screen.
  const reps = Math.ceil(16 / logos.length);
  const items = Array.from({ length: reps }, (_, r) => logos.map(([file, name]) => ({ file, name, r }))).flat();
  const track = (
    <>
      {/* Duration scales with the list so every strip scrolls at the same speed. */}
      <div
        className="brand-track"
        style={{ "--brand-duration": `${items.length * 2}s` } as CSSProperties}
      >
        {[false, true].map((copy) => (
          <ul className="brand-list" aria-hidden={copy || undefined} key={String(copy)}>
            {items.map(({ file, name, r }) => (
              <li className="brand-card" key={`${file}-${r}`}>
                <img
                  src={`/images/${dir}/${file}.webp`}
                  alt={copy || r > 0 ? "" : name}
                  // Eager: lazy images inside a moving strip often show up blank as they slide in.
                  loading="eager"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
  return startOnView ? (
    <CarouselStartOnView label={label}>{track}</CarouselStartOnView>
  ) : (
    <div className="brand-carousel" aria-label={label}>
      {track}
    </div>
  );
}
