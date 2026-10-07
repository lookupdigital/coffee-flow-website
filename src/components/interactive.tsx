"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useId, useRef, useState } from "react";
import { MachineKind, Product } from "@/lib/data";
import { pageCopy } from "@/lib/data-en";
import { Locale, leadMessagesEn, localeOf, localePath, switchLocalePath, ui } from "@/lib/i18n";
import { track } from "@/lookup/analytics/events";
import { ATTRIBUTION_KEYS, getStoredAttribution } from "@/lookup/attribution";
import Turnstile, { waitForTurnstileToken } from "@/lookup/forms/Turnstile";
import { submitLead } from "@/lookup/leads/actions";
import { siteConfig } from "@/site.config";
import { ProductRow, WhatsAppLink } from "./shared";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
// Lead topics stay in Hebrew whatever the page language: they must match siteConfig.leads.projectTypes.
const BUSINESS_TYPES: Record<string, string> = ui.he.form.types;

/** The language of the current page, from its path (/en/… is English). */
export function useLocale(): Locale {
  return localeOf(usePathname());
}

/** The WhatsApp button pinned to every public page, labelled in the page's language. */
export function FloatingWhatsApp() {
  return <WhatsAppLink className="floating-whatsapp" locale={useLocale()} />;
}

// Pages that end with the contact form link to it in place; the rest jump to the home page's form.
const pagesWithContactForm = ["/machines", "/beans", "/products/", "/solutions/"];
function contactHref(pathname: string, locale: Locale) {
  const path = locale === "en" ? pathname.slice(3) || "/" : pathname;
  return path === "/" || pagesWithContactForm.some((p) => path.startsWith(p))
    ? "#contact"
    : localePath(locale, "/#contact");
}

// Language switch: the current language highlighted, the other one links to the same page in it.
function LanguageSwitch({ className, onClick }: { className: string; onClick?: () => void }) {
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const other = switchLocalePath(pathname);
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={ui[locale].languageSwitch}>
      {locale === "he" ? (
        <>
          <span className="lang-current" lang="he" aria-current="true">
            עב
          </span>
          <span className="lang-divider" aria-hidden />
          <Link href={other} lang="en" hrefLang="en" onClick={onClick} aria-label="English">
            EN
          </Link>
        </>
      ) : (
        <>
          <Link href={other} lang="he" hrefLang="he" onClick={onClick} aria-label="עברית">
            עב
          </Link>
          <span className="lang-divider" aria-hidden />
          <span className="lang-current" lang="en" aria-current="true">
            EN
          </span>
        </>
      )}
    </div>
  );
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
  home: homeProp = false,
}: {
  overlay?: boolean;
  home?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeOf(pathname);
  const t = ui[locale];
  const home = homeProp || pathname === localePath(locale, "/");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close the menu when the route changes (adjusting state during render, not from an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

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
        <Link href={localePath(locale, "/")} className="header-logo" aria-label="Coffee Flow" onClick={close}>
          <img src="/images/6373b.webp" alt="Coffee Flow" width={200} height={85} />
        </Link>
        <nav id="site-nav" className="header-nav" aria-label={t.mainNav}>
          {t.nav.filter(([href]) => !(home && href === "/")).map(([href, label]) => (
            <Link
              key={href}
              href={localePath(locale, href)}
              onClick={close}
              aria-current={pathname === localePath(locale, href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Link
            href={localePath(locale, "/service")}
            className="nav-service"
            onClick={close}
            aria-current={pathname === localePath(locale, "/service") ? "page" : undefined}
          >
            {t.service}
          </Link>
          <LanguageSwitch className="nav-lang" onClick={close} />
          <WhatsAppLink className="nav-contact" onClick={close} locale={locale} />
        </nav>
        <div className="header-end">
          <LanguageSwitch className="header-lang" />
          {!home && (
            <Link href={contactHref(pathname, locale)} className="header-leave-details">
              {t.leaveDetails}
            </Link>
          )}
          <Link
            href={localePath(locale, "/service")}
            className="header-service"
            aria-current={pathname === localePath(locale, "/service") ? "page" : undefined}
          >
            <ServiceIcon />
            {t.service}
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
            aria-label={open ? t.closeMenu : t.openMenu}
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

function formFields(locale: Locale): Field[][] {
  const f = ui[locale].form;
  return [
    [
      { name: "name", label: f.name, placeholder: f.namePh, required: true, autoComplete: "name" },
      { name: "company", label: f.company, placeholder: f.companyPh, required: true, autoComplete: "organization" },
    ],
    [
      { name: "phone", label: f.phone, placeholder: "050-0000000", required: true, autoComplete: "tel", type: "tel" },
      { name: "email", label: f.email, placeholder: "name@company.co.il", required: false, autoComplete: "email", type: "email" },
    ],
    [
      { name: "city", label: f.city, placeholder: f.cityPh, required: false, autoComplete: "address-level2" },
      { name: "employees", label: f.employees, placeholder: f.employeesPh, required: false, autoComplete: "off" },
    ],
  ];
}

export function ContactForm({ formName = "contact" }: { formName?: string }) {
  const id = useId();
  const locale = useLocale();
  const f = ui[locale].form;
  // Server messages are Hebrew; English pages translate the known ones.
  const message = (text: string) => (locale === "en" ? (leadMessagesEn[text] ?? text) : text);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [pending, setPending] = useState(false);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const submitting = useRef(false);
  const submissionId = useRef<string | null>(null);

  function handleStart() {
    if (started) return;
    setStarted(true);
    track({ event: "form_start", form_name: formName, page_path: window.location.pathname });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const page_path = window.location.pathname;
    if (TURNSTILE_SITE_KEY) await waitForTurnstileToken(form);

    const formData = new FormData(form);
    // One id per form view: a retried request cannot create a second lead. Also the analytics event id.
    submissionId.current ??= crypto.randomUUID();
    formData.set("form_name", formName);
    formData.set("submission_id", submissionId.current);

    // Coffee Flow asks for details the shared lead schema does not model as columns: the business type becomes
    // the lead's topic, and the rest are kept as the lead message so nothing the visitor typed is lost.
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    formData.set("projectType", BUSINESS_TYPES[value("businessType")] ?? value("businessType"));
    const details = [
      value("company") && `חברה: ${value("company")}`,
      value("city") && `עיר: ${value("city")}`,
      value("employees") && `מספר עובדים משוער: ${value("employees")}`,
    ].filter(Boolean);
    // Leads are read in Hebrew, so English-page leads are flagged rather than translated.
    if (locale === "en") details.push("שפת האתר: אנגלית");
    if (details.length) formData.set("message", details.join(" · "));
    for (const name of ["company", "city", "employees", "businessType"]) formData.delete(name);

    const attribution = getStoredAttribution();
    for (const key of ATTRIBUTION_KEYS) {
      const stored = attribution?.[key];
      if (stored) formData.set(key, stored);
    }
    formData.set("landing_page", attribution?.landing_page ?? page_path);
    if (attribution?.referrer) formData.set("referrer", attribution.referrer);

    try {
      const result = await submitLead(formData);
      if (result.ok) {
        // The conversion fires only after the server confirmed the lead was stored.
        track({ event: "generate_lead", form_name: formName, page_path, lead_type: result.leadType, event_id: result.eventId });
        setSent(true);
        setPending(false);
        return;
      }
      setError(message(result.error === "server" ? siteConfig.leads.messages.serverError : result.message));
      track({ event: "form_submit_error", form_name: formName, page_path, error_type: result.error });
    } catch {
      setError(message(siteConfig.leads.messages.serverError));
      track({ event: "form_submit_error", form_name: formName, page_path, error_type: "network" });
    }
    // Turnstile tokens are single-use: render a fresh widget before the next attempt.
    if (TURNSTILE_SITE_KEY) setTurnstileKey((key) => key + 1);
    submitting.current = false;
    setPending(false);
  }

  return (
    <form className="contact-form" onSubmit={submit} onFocus={handleStart}>
      {formFields(locale).map((row, r) => (
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
        <span>{f.businessType}</span>
        <select id={`${id}-business-type`} name="businessType" defaultValue="" required>
          <option value="" disabled>
            {f.chooseType}
          </option>
          {Object.entries(f.types).map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {/* Spam trap: a real visitor never fills this in (hidden from people and assistive technology). */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
      {TURNSTILE_SITE_KEY && <Turnstile key={turnstileKey} siteKey={TURNSTILE_SITE_KEY} />}
      {error && (
        <p role="alert" className="contact-error">
          {error}
        </p>
      )}
      <button type="submit" className="contact-submit" disabled={sent || pending}>
        {sent ? f.sent : pending ? f.sending : f.submit}
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
  const t = ui[useLocale()];
  // Arrows only when the cards don't all fit (e.g. 3 cards on desktop need none; on a phone they do).
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  function move(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 392) + 24;
    // In RTL, scrolling "forward" means moving towards negative scrollLeft; in LTR towards positive.
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: (rtl ? -direction : direction) * step, behavior: "smooth" });
  }
  return (
    <div className="carousel">
      <button className="carousel-arrow carousel-next" onClick={() => move(-1)} aria-label={t.previous} hidden={!scrollable}>
        <img src="/images/fba7f.svg" alt="" />
      </button>
      <div className="carousel-track" ref={track} role="region" aria-label={label}>
        {children}
      </div>
      <button className="carousel-arrow carousel-prev" onClick={() => move(1)} aria-label={t.next} hidden={!scrollable}>
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
  const locale = useLocale();
  const t = ui[locale];
  const { machineFilters } = pageCopy(locale);
  // ?kind=… preselects a category, so pages can link straight to their own machines.
  const kind = useSearchParams().get("kind");
  const linked = machineFilters.find((f) => f.value === kind)?.value ?? "all";
  const [filter, setFilter] = useState<"all" | MachineKind>(linked);
  // Follow a changed ?kind= link without an effect.
  const [linkedFilter, setLinkedFilter] = useState(linked);
  if (linkedFilter !== linked) {
    setLinkedFilter(linked);
    setFilter(linked);
  }
  const list = products.filter(
    (p) => filter === "all" || p.kinds?.includes(filter),
  );
  return (
    <>
      <section className="filters-block">
        <div className="filter-grid" role="group" aria-label={t.filterMachines}>
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
          list.map((p) => <ProductRow product={p} locale={locale} key={p.slug} />)
        ) : (
          <p className="catalog-empty">{t.emptyCategory}</p>
        )}
      </div>
    </>
  );
}
