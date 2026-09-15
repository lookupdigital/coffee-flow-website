"use client";
import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { MachineKind, Product, machineFilters, reviews } from "@/lib/data";
import { ProductRow, Rich } from "./shared";

export function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }
  // Field layout mirrors Figma: two rows of "שם מלא" / "שם החברה", then a message.
  const rows = [0, 1];
  return (
    <form className="contact-form" onSubmit={submit}>
      {rows.map((row) => (
        <div className="field-row" key={row}>
          <label className="field" htmlFor={`${id}-name-${row}`}>
            <span>שם מלא *</span>
            <input
              id={`${id}-name-${row}`}
              name={`name-${row}`}
              placeholder="ישראל ישראלי"
              required={row === 0}
            />
          </label>
          <label className="field" htmlFor={`${id}-company-${row}`}>
            <span>שם החברה *</span>
            <input
              id={`${id}-company-${row}`}
              name={`company-${row}`}
              placeholder="ישראל ישראלי"
              required={row === 0}
            />
          </label>
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
      5000,
    );
    return () => clearInterval(timer);
  }, [paused]);
  return (
    <div
      className="rolling-reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
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
