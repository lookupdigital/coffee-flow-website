"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { MachineKind, Product, machineFilters } from "@/lib/data";
import { ProductRow, WhatsAppLink } from "./shared";

// Right to left: "דף הבית" is the right-most menu item (hidden on the home page itself).
const nav = [
  ["/", "דף הבית"],
  ["/solutions/office", "חברות ומשרדים"],
  ["/solutions/cafe", "בתי קפה ומסעדות"],
  ["/solutions/hotel", "בתי מלון ובתי הארחה"],
];

// Pages that end with the contact form link to it in place; the rest jump to the home page's form.
const pagesWithContactForm = ["/machines", "/beans", "/products/", "/solutions/"];
function contactHref(pathname: string) {
  return pathname === "/" || pagesWithContactForm.some((p) => pathname.startsWith(p))
    ? "#contact"
    : "/#contact";
}

// Wrench icon for the technical-service button.
function ServiceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.6 17.2a1.4 1.4 0 0 0 0 2l1.2 1.2a1.4 1.4 0 0 0 2 0l5.7-5.7a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.6-.6-2.3 2.4-2.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          <img src="/images/6373b.webp" alt="Coffee Flow" width={200} height={85} />
        </Link>
        <nav id="site-nav" className="header-nav" aria-label="ניווט ראשי">
          {nav.filter(([href]) => !(home && href === "/")).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/service"
            className="nav-service"
            onClick={close}
            aria-current={pathname === "/service" ? "page" : undefined}
          >
            שירות טכני
          </Link>
          <WhatsAppLink className="nav-contact" onClick={close} />
        </nav>
        <div className="header-end">
          {!home && (
            <Link href={contactHref(pathname)} className="header-leave-details">
              להשארת פרטים
            </Link>
          )}
          <Link
            href="/service"
            className="header-service"
            aria-current={pathname === "/service" ? "page" : undefined}
          >
            <ServiceIcon />
            שירות טכני
          </Link>
          {home && (
            <img
              className="header-partner"
              src="/images/94ed1.webp"
              alt="DIL Israel"
              width={112}
              height={42}
            />
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

type Field = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  autoComplete: string;
  type?: "email" | "tel";
};

const fields: Field[][] = [
  [
    { name: "name", label: "שם מלא *", placeholder: "ישראל ישראלי", required: true, autoComplete: "name" },
    { name: "company", label: "שם החברה *", placeholder: "שם החברה", required: true, autoComplete: "organization" },
  ],
  [
    { name: "phone", label: "טלפון *", placeholder: "050-0000000", required: true, autoComplete: "tel", type: "tel" },
    { name: "email", label: "אימייל", placeholder: "name@company.co.il", required: false, autoComplete: "email", type: "email" },
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
                type={f.type ?? "text"}
                // Phone numbers and addresses read left to right, even inside the Hebrew form.
                dir={f.type ? "ltr" : undefined}
                placeholder={f.placeholder}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.name === "employees" ? "numeric" : undefined}
              />
            </label>
          ))}
        </div>
      ))}
      <label className="field field-business-type" htmlFor={`${id}-business-type`}>
        <span>סוג עסק *</span>
        <select id={`${id}-business-type`} name="businessType" defaultValue="" required>
          <option value="" disabled>
            בחרו סוג עסק
          </option>
          <option value="office">חברות ומשרדים</option>
          <option value="cafe">בתי קפה ומסעדות</option>
          <option value="hotel">בתי מלון ובתי הארחה</option>
          <option value="other">אחר</option>
        </select>
      </label>
      <button type="submit" className="contact-submit" disabled={sent}>
        {sent ? "תודה, הפרטים התקבלו" : "השאירו פרטים"}
      </button>
    </form>
  );
}

// Logo strip that waits off-screen: it starts moving only once scrolled into view, and
// starts with its first logo in the middle (the logos before it wrap round to its left).
export function CarouselStartOnView({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const box = ref.current;
    const track = box?.querySelector<HTMLElement>(".brand-track");
    const lists = box?.querySelectorAll<HTMLElement>(".brand-list");
    const first = lists?.[0]?.firstElementChild as HTMLElement | null | undefined;
    if (!box || !track || !lists || lists.length < 2 || !first) return;
    // One loop moves the strip by the width of one copy of the list.
    const loop = lists[1].offsetLeft - lists[0].offsetLeft;
    const duration = parseFloat(getComputedStyle(track).animationDuration) || 0;
    const shift = box.clientWidth / 2 - (first.offsetLeft + first.offsetWidth / 2);
    const offset = (((shift % loop) + loop) % loop) - loop; // in (-loop, 0]
    track.style.animationDelay = `${(offset / loop) * duration}s`;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`brand-carousel brand-carousel-waiting ${playing ? "is-playing" : ""}`}
      aria-label={label}
    >
      {children}
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
  // ?kind=… preselects a category, so pages can link straight to their own machines.
  const kind = useSearchParams().get("kind");
  const linked = machineFilters.find((f) => f.value === kind)?.value ?? "all";
  const [filter, setFilter] = useState<"all" | MachineKind>(linked);
  useEffect(() => setFilter(linked), [linked]);
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
