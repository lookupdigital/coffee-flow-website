import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/interactive";
import { Metrics, Pic, Rich } from "@/components/shared";
import {
  ButtonLink,
  CoffeeCard,
  ContactSection,
  Footer,
  Header,
  MachineCard,
} from "@/components/ui";
import {
  beanPlaceholder,
  defaultContact,
  getProduct,
  narrativeTitle,
  products,
} from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  return { title: p?.name ?? "מוצר", description: p?.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const machine = p.category === "machines";

  // Figma shows Nouva Simonelli, GT2 Pro, Nouva Simonelli under Coffee Express.
  const similar =
    p.slug === "coffee-express"
      ? ["nuova-simonelli-1gr", "gt2-pro", "nuova-simonelli-1gr"].map((s) => getProduct(s)!)
      : products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <Header overlay={false} />
      <section className="product-hero">
        <div className="product-frame">
          <div className={`product-frame-inner ${machine ? "" : "product-frame-bean"}`}>
            <Pic id={p.image} fit={{ kind: "contain" }} alt={p.name} eager />
          </div>
        </div>
        <div className="product-hero-copy">
          <h1 className="product-title">{p.name}</h1>
          <p className="subheading">
            {p.description ? <Rich text={p.description} /> : beanPlaceholder}
          </p>
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
            {similar.map((x, i) =>
              x.category === "machines" ? (
                <MachineCard product={x} variant="plain" key={`${x.slug}-${i}`} />
              ) : (
                <CoffeeCard product={x} key={`${x.slug}-${i}`} />
              ),
            )}
          </Carousel>
        </div>
        {machine && <ButtonLink href="#contact">לצפייה בסרטוני הדרכה ושימוש</ButtonLink>}
        <ButtonLink href={machine ? "/machines" : "/beans"}>לצפייה בקטלוג המלא</ButtonLink>
      </section>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="product" />
    </>
  );
}
