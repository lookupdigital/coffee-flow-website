import Link from "next/link";
import { Fragment } from "react";
import { ImageFit, Product, beanPlaceholder, servicePhone } from "@/lib/data";

const src = (id: string) => `/images/${id}.webp`;

// Opens a WhatsApp chat in a new tab.
export function WhatsAppLink({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={servicePhone.whatsapp}
      className={`whatsapp ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <img src="/images/d8c0a.svg" alt="" width={16} height={16} />
      צרו קשר
    </a>
  );
}

// Latin words inside Hebrew copy use the English font, as in Figma.
export function Rich({ text }: { text: string }) {
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

export function Pic({
  id,
  fit,
  alt = "",
  eager = false,
}: {
  id: string;
  fit: ImageFit;
  alt?: string;
  eager?: boolean;
}) {
  const loading = eager ? "eager" : "lazy";
  if (fit.kind === "contain" || fit.kind === "cover")
    return (
      <img
        src={src(id)}
        alt={alt}
        loading={loading}
        className={`pic pic-${fit.kind}`}
      />
    );
  if (fit.kind === "inset")
    return (
      <img
        src={src(id)}
        alt={alt}
        loading={loading}
        className="pic-inset"
        style={{
          left: `${fit.left}%`,
          top: `${fit.top}%`,
          width: `${fit.width}%`,
          height: `${fit.height}%`,
        }}
      />
    );
  if (fit.kind === "fixed")
    return (
      <img
        src={src(id)}
        alt={alt}
        loading={loading}
        className="pic-fixed"
        style={{ width: fit.width, height: fit.height }}
      />
    );
  const scale = fit.scale ?? 100;
  const offset = (100 - scale) / 2;
  return (
    <span className="pic-box" style={{ width: fit.size, height: fit.size }}>
      <img
        src={src(id)}
        alt={alt}
        loading={loading}
        style={{
          width: `${scale}%`,
          height: `${scale}%`,
          left: `${offset}%`,
          top: `${offset}%`,
        }}
      />
    </span>
  );
}

export function Metrics({
  items,
  className = "metrics",
  itemClass = "metric",
  lineClass = "metric-line",
}: {
  items: [string, string][];
  className?: string;
  itemClass?: string;
  lineClass?: string;
}) {
  return (
    <div className={className}>
      {items.map(([value, label], i) => (
        <Fragment key={label}>
          {i > 0 && <span className={lineClass} aria-hidden />}
          <div className={itemClass}>
            <strong dir={/^[0-9+.,″]+$/.test(value) ? "ltr" : undefined}>{value}</strong>
            <span>{label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

// Arabica / Robusta split as label + percent pills, as on the blend sheet.
function BlendBadges({ blend }: { blend: NonNullable<Product["blend"]> }) {
  const parts: [string, number | undefined][] = [
    ["Arabica", blend.arabica],
    ["Robusta", blend.robusta],
  ];
  return (
    <ul className="blend" aria-label="הרכב התערובת">
      {parts
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <li className="blend-pill" key={label}>
            <span className="blend-label">{label}</span>
            <span className="blend-value">{value}%</span>
          </li>
        ))}
    </ul>
  );
}

export function ProductRow({ product: p }: { product: Product }) {
  const href = `/products/${p.slug}`;
  // Only machines have product pages; bean rows are display-only.
  if (p.category === "beans")
    return (
      <article className="product-row" id={p.slug}>
        <div className="row-photo row-photo-dark">
          <Pic id={p.image} fit={{ kind: "contain" }} alt={p.name} />
        </div>
        <div className="row-copy">
          <h2 className="row-title">{p.name}</h2>
          <p className="text">
            {p.description ? <Rich text={p.description} /> : beanPlaceholder}
          </p>
          {p.blend && <BlendBadges blend={p.blend} />}
        </div>
      </article>
    );
  return (
    <article className="product-row">
      <Link href={href} className="row-photo row-photo-light" aria-label={p.name}>
        <span className="machine-stage">
          <Pic id={p.image} fit={{ kind: "contain" }} alt={p.name} />
        </span>
      </Link>
      <div className="row-copy">
        <h2 className="row-title">
          <Link href={href}>{p.name}</Link>
        </h2>
        <p className="text">{p.description && <Rich text={p.description} />}</p>
        {p.trust && <Metrics items={p.trust} />}
        <Link href={href} className="btn btn-gold">
          למידע נוסף ומפרט טכני מלא
        </Link>
      </div>
    </article>
  );
}
