"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { MachineKind, Product, machineFilters, reviews } from "@/lib/data";
import { ProductRow, Rich, WhatsAppLink } from "./shared";

// Right to left: "בית" is the right-most menu item.
const nav = [
  ["/", "בית"],
  ["/solutions/office", "פתרונות למשרדים"],
  ["/solutions/cafe", "פתרונות לבתי קפה ומסעדות"],
  ["/solutions/hotel", "פתרונות למלונות"],
];

// Pinned site header. On mobile the menu collapses behind a hamburger button.
export function Header({
  overlay = true,
  home = false,
}: {
  overlay?: boolean;
  home?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`header ${overlay ? "header-overlay" : ""} ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="Coffee Flow" onClick={close}>
          <img src="/images/6373b.webp" alt="Coffee Flow" width={158} height={67} />
        </Link>
        <nav id="site-nav" className="header-nav" aria-label="ניווט ראשי">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <WhatsAppLink className="nav-contact" onClick={close} />
        </nav>
        <div className="header-end">
          {home ? (
            <img
              className="header-partner"
              src="/images/94ed1.webp"
              alt="DIL Israel"
              width={85}
              height={32}
            />
          ) : (
            <WhatsAppLink className="header-contact" />
          )}
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

const fields = [
  [
    { name: "name", label: "שם מלא *", placeholder: "ישראל ישראלי", required: true, autoComplete: "name" },
    { name: "company", label: "שם החברה *", placeholder: "שם החברה", required: true, autoComplete: "organization" },
  ],
  [
    { name: "city", label: "עיר", placeholder: "תל אביב", required: false, autoComplete: "address-level2" },
    { name: "employees", label: "מספר עובדים משוער", placeholder: "לדוגמה: 50", required: false, autoComplete: "off" },
  ],
];

export function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      {fields.map((row, r) => (
        <div className="field-row" key={r}>
          {row.map((f) => (
            <label className="field" htmlFor={`${id}-${f.name}`} key={f.name}>
              <span>{f.label}</span>
              <input
                id={`${id}-${f.name}`}
                name={f.name}
                placeholder={f.placeholder}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.name === "employees" ? "numeric" : undefined}
              />
            </label>
          ))}
        </div>
      ))}
      <label className="field field-message" htmlFor={`${id}-message`}>
        <span>הודעה</span>
        <textarea
          id={`${id}-message`}
          name="message"
          placeholder="ספרו לנו על העסק שלכם ומה אתם מחפשים..."
        />
      </label>
      <button type="submit" className="contact-submit" disabled={sent}>
        {sent ? "תודה, הפרטים התקבלו" : "השאירו פרטים"}
      </button>
    </form>
  );
}

export function RollingReviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [paused, index]);
  const go = (step: 1 | -1) =>
    setIndex((i) => (i + step + reviews.length) % reviews.length);
  return (
    <div
      className="rolling-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="rolling-reviews">
        <div
          className="rolling-track"
          style={{ transform: `translateY(-${index * 100}%)` }}
          aria-live="polite"
        >
          {reviews.map((review, i) => (
            <figure className="quote rolling-slide" key={i} aria-hidden={i !== index}>
              <span className="quote-mark quote-mark-open" aria-hidden>
                “
              </span>
              <blockquote>
                <Rich text={review.text} />
              </blockquote>
              <span className="quote-mark quote-mark-close" aria-hidden>
                “
              </span>
              <figcaption>
                <strong>{review.name}</strong>
                <span>{review.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="rolling-controls">
        <button type="button" onClick={() => go(-1)} aria-label="להמלצה הקודמת">
          <img src="/images/05291.svg" alt="" className="rolling-up" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="להמלצה הבאה">
          <img src="/images/05291.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  function move(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 392) + 24;
    // In RTL, scrolling "forward" means moving towards negative scrollLeft.
    el.scrollBy({ left: -direction * step, behavior: "smooth" });
  }
  return (
    <div className="carousel">
      <button className="carousel-arrow carousel-next" onClick={() => move(-1)} aria-label="הקודם">
        <img src="/images/fba7f.svg" alt="" />
      </button>
      <div className="carousel-track" ref={track} role="region" aria-label={label}>
        {children}
      </div>
      <button className="carousel-arrow carousel-prev" onClick={() => move(1)} aria-label="הבא">
        <img src="/images/05291.svg" alt="" />
      </button>
    </div>
  );
}

export function MachineCatalog({
  products,
  header,
}: {
  products: Product[];
  header: ReactNode;
}) {
  const [filter, setFilter] = useState<"all" | MachineKind>("all");
  const list = products.filter(
    (p) => filter === "all" || p.kinds?.includes(filter),
  );
  return (
    <>
      <section className="filters-block">
        <div className="filter-grid" role="group" aria-label="סינון מכונות">
          {machineFilters.map((f) => (
            <button
              key={f.value}
              className="filter-card"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              <span
                className="filter-icon"
                style={{ maskImage: `url(/images/${f.icon}.svg)`, WebkitMaskImage: `url(/images/${f.icon}.svg)` }}
                aria-hidden
              />
              {f.label}
            </button>
          ))}
        </div>
        {header}
      </section>
      <div className="catalog-list" aria-live="polite">
        {list.length ? (
          list.map((p) => <ProductRow product={p} key={p.slug} />)
        ) : (
          <p className="catalog-empty">אין כרגע מכונות בקטגוריה זו.</p>
        )}
      </div>
    </>
  );
}
