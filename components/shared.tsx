import Link from "next/link";
import { Fragment } from "react";
import {
  ImageFit,
  Product,
  catalogDescription,
  catalogMetrics,
} from "@/lib/data";

const src = (id: string) => `/images/${id}.webp`;

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

export function ProductRow({ product: p }: { product: Product }) {
  const href = `/products/${p.slug}`;
  const machine = p.category === "machines";
  return (
    <article className="product-row">
      <Link
        href={href}
        className={`row-photo ${machine ? "row-photo-light" : "row-photo-dark"}`}
        aria-label={p.catalogName}
      >
        {machine ? (
          <span className="machine-stage">
            <Pic id={p.image} fit={p.catalogFit} alt={p.catalogName} />
          </span>
        ) : (
          <Pic id={p.image} fit={p.catalogFit} alt={p.catalogName} />
        )}
      </Link>
      <div className="row-copy">
        <h2 className="row-title">
          <Link href={href}>{p.catalogName}</Link>
        </h2>
        <p className="text">{catalogDescription}</p>
        <div className="metrics">
          {catalogMetrics.map(([value, label], i) => (
            <Fragment key={label}>
              {i > 0 && <span className="metric-line" aria-hidden />}
              <div
                className={`metric ${i === catalogMetrics.length - 1 ? "metric-edge" : ""}`}
              >
                <strong dir={/^[0-9+]+$/.test(value) ? "ltr" : undefined}>{value}</strong>
                <span>{label}</span>
              </div>
            </Fragment>
          ))}
        </div>
        {machine && (
          <Link href={href} className="btn btn-gold">
            למידע נוסף
          </Link>
        )}
      </div>
    </article>
  );
}
