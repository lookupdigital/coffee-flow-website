import { Fragment } from "react";
import { Carousel } from "@/components/interactive";
import { Metrics, Pic, Rich } from "@/components/shared";
import { ButtonLink, ContactSection, Footer, Header, MachineCard } from "@/components/ui";
import { Product, getProduct, products } from "@/lib/data";
import { localizeProduct, pageCopy } from "@/lib/data-en";
import { Locale, ui } from "@/lib/i18n";

// Product pages exist for coffee machines only; beans appear in the catalog without a page.
export const machines = products.filter((p) => p.category === "machines");
export const getMachine = (slug: string) => machines.find((p) => p.slug === slug);

export default function ProductView({ product, locale }: { product: Product; locale: Locale }) {
  const p = localizeProduct(product, locale);
  const t = ui[locale];
  const { defaultContact, narrativeTitle } = pageCopy(locale);

  // Figma shows Nouva Simonelli, GT2 Pro, Nouva Simonelli under Coffee Express.
  const similar =
    p.slug === "coffee-express"
      ? ["nuova-simonelli-1gr", "gt2-pro", "nuova-simonelli-1gr"].map((s) => getProduct(s)!)
      : machines.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Header overlay={false} />
      <section className="product-hero">
        <div className="product-frame">
          <div className="product-frame-inner">
            <Pic id={p.image} fit={{ kind: "contain" }} alt={p.name} eager />
          </div>
        </div>
        <div className="product-hero-copy">
          <h1 className="product-title">{p.name}</h1>
          <p className="subheading">{p.description && <Rich text={p.description} />}</p>
          <ButtonLink href="#contact" tone="gold" size="compact" locale={locale}>
            {t.talkToExperts}
          </ButtonLink>
        </div>
      </section>

      {p.trust && (
        <section className="trust-strip-wrap" aria-label={t.keyFacts}>
          <Metrics items={p.trust} className="trust-strip" itemClass="trust-item" lineClass="trust-line" />
        </section>
      )}

      {p.specs && p.narrative && (
        <section className="specs">
          <div className="specs-grid">
            <div className="narrative">
              <h2>{narrativeTitle}</h2>
              <div className="text">
                {p.narrative.map((line) => (
                  <p key={line}>
                    <Rich text={line} />
                  </p>
                ))}
              </div>
            </div>
            <dl className="spec-table">
              <div className="spec-line" />
              {p.specs.map(([label, value]) => (
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
      )}

      <section className="similar">
        <h2 className="h2">{t.similar}</h2>
        <div className="similar-wrap">
          <Carousel label={t.similar}>
            {similar.map((x, i) => (
              <MachineCard product={x} variant="plain" locale={locale} key={`${x.slug}-${i}`} />
            ))}
          </Carousel>
        </div>
        <ButtonLink href="/machines" locale={locale}>
          {t.viewCatalog}
        </ButtonLink>
      </section>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="product" locale={locale} />
    </>
  );
}
