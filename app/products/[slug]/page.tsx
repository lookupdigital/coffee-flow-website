import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/interactive";
import { Metrics, Pic, Rich } from "@/components/shared";
import {
  ButtonLink,
  ContactSection,
  Footer,
  Header,
  MachineCard,
} from "@/components/ui";
import { defaultContact, getProduct, narrativeTitle, products } from "@/lib/data";

// Product pages exist for coffee machines only; beans appear in the catalog without a page.
const machines = products.filter((p) => p.category === "machines");
const getMachine = (slug: string) => machines.find((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return machines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getMachine((await params).slug);
  return { title: p?.name ?? "מוצר", description: p?.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getMachine((await params).slug);
  if (!p) notFound();

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
          <ButtonLink href="#contact" tone="gold">
            לתיאום פגישת ייעוץ
          </ButtonLink>
        </div>
      </section>

      {p.trust && (
        <section className="trust-strip-wrap" aria-label="נתונים עיקריים">
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
        <h2 className="h2">מוצרים דומים</h2>
        <div className="similar-wrap">
          <Carousel label="מוצרים דומים">
            {similar.map((x, i) => (
              <MachineCard product={x} variant="plain" key={`${x.slug}-${i}`} />
            ))}
          </Carousel>
        </div>
        <ButtonLink href="#contact">לצפייה בסרטוני הדרכה ושימוש</ButtonLink>
        <ButtonLink href="/machines">לצפייה בקטלוג המלא</ButtonLink>
      </section>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="product" />
    </>
  );
}
