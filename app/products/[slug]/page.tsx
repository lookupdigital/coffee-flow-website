import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/interactive";
import { Pic } from "@/components/shared";
import {
  ButtonLink,
  CoffeeCard,
  ContactSection,
  Footer,
  Header,
  MachineCard,
} from "@/components/ui";
import { defaultContact, getProduct, productPage, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  return { title: p?.catalogName ?? "מוצר" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  // Figma shows Nouva Simonelli, GT2 Pro, Nouva Simonelli under Coffee Express.
  const similar =
    p.slug === "coffee-express"
      ? ["nouva-simonelli", "gt2-pro", "nouva-simonelli"].map((s) => getProduct(s)!)
      : products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Header overlay={false} />
      <section className="product-hero">
        <div className="product-frame">
          <div className="product-frame-inner">
            {p.category === "machines" ? (
              <Pic id={p.heroImage ?? p.image} fit={{ kind: "contain" }} alt={p.catalogName} eager />
            ) : (
              <Pic id={p.image} fit={p.catalogFit} alt={p.catalogName} eager />
            )}
          </div>
        </div>
        <div className="product-hero-copy">
          <h1 className="product-title">{p.catalogName}</h1>
          <p className="subheading">{productPage.description}</p>
          <ButtonLink href="#contact" tone="gold">
            לתיאום פגישת ייעוץ
          </ButtonLink>
        </div>
      </section>

      <section className="trust-strip" aria-label="נתונים עיקריים">
        {productPage.trust.map(([value, label], i) => (
          <Fragment key={label}>
            {i > 0 && <span className="trust-line" aria-hidden />}
            <div className="trust-item">
              <strong dir={/^[0-9+]+$/.test(value) ? "ltr" : undefined}>{value}</strong>
              <span>{label}</span>
            </div>
          </Fragment>
        ))}
      </section>

      <section className="specs">
        <div className="specs-grid">
          <div className="narrative">
            <h2>{productPage.narrativeTitle}</h2>
            <div className="text">
              {productPage.narrative(p.catalogName).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <dl className="spec-table">
            <div className="spec-line" />
            {productPage.specs.map(([label, value]) => (
              <Fragment key={label}>
                <div className="spec-row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
                <div className="spec-line" />
              </Fragment>
            ))}
          </dl>
        </div>
      </section>

      <section className="similar">
        <h2 className="h2">מוצרים דומים</h2>
        <div className="carousel-similar-wrap" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Carousel label="מוצרים דומים">
            {similar.map((x, i) =>
              x.category === "machines" ? (
                <MachineCard product={x} variant="plain" key={`${x.slug}-${i}`} />
              ) : (
                <CoffeeCard product={x} key={`${x.slug}-${i}`} />
              ),
            )}
          </Carousel>
        </div>
        <ButtonLink href="#contact">לצפייה בסרטוני הדרכה ושימוש</ButtonLink>
      </section>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="product" />
    </>
  );
}
