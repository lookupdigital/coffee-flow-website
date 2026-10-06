import { notFound } from "next/navigation";
import {
  BrandCarousel,
  ButtonLink,
  CoffeeCard,
  ContactSection,
  Footer,
  Header,
  MachineCard,
  SectionHeader,
  Separated,
} from "@/components/ui";
import { Rich } from "@/components/shared";
import {
  Audience,
  featuredBeans,
  featuredMachines,
  getProduct,
  moreThanCoffee,
  solutions,
} from "@/lib/data";

const beans = featuredBeans.map((slug) => getProduct(slug)!);

export function generateStaticParams() {
  return Object.keys(solutions).map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  return { title: solutions[audience as Audience]?.metaTitle ?? "פתרונות קפה" };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!(audience in solutions)) notFound();
  const s = solutions[audience as Audience];
  const machines = (s.machines ?? featuredMachines).map((slug) => getProduct(slug)!);
  return (
    <>
      <section className="hero solution-hero-compact">
        <img
          className="hero-bg"
          src={`/images/${s.image}.webp`}
          alt=""
          style={{ opacity: 0.6 }}
        />
        <div className={`hero-shade ${audience === "office" ? "hero-shade-office" : ""}`} />
        <Header />
        <div className="solution-hero-content">
          <div className="solution-hero-row">
            <div className="solution-hero-cup">
              <img
                src={`/images/${s.cup}.webp`}
                alt=""
                style={{ objectFit: s.cupFit }}
              />
            </div>
            <div className="solution-hero-text">
              <h1 className="h1">{s.heroTitle}</h1>
              <p className={`subheading ${s.heroTextStrong ? "subheading-strong" : ""}`}>
                <Rich text={s.heroText} />
              </p>
            </div>
          </div>
          <ButtonLink href="#contact" tone="gold" size="compact">
            לחץ לשיחה עם מומחי הקפה שלנו
          </ButtonLink>
          <div className="solution-hero-features">
            <Separated items={s.features} />
          </div>
        </div>
      </section>

      <section className="products-section products-section-dark">
        <SectionHeader title={s.machinesTitle} text={s.machinesText} width={730} condensedText />
        <div className={`machine-grid ${machines.length > 3 ? "machine-grid-wrap" : ""}`}>
          {machines.map((p) => (
            <MachineCard product={p} variant="solution" key={p.slug} />
          ))}
        </div>
        <ButtonLink href={s.machinesFilter ? `/machines?kind=${s.machinesFilter}` : "/machines"}>
          לצפייה בקטלוג המלא
        </ButtonLink>
      </section>

      <section className="products-section products-section-deep">
        <SectionHeader title={s.coffeeTitle} text={s.coffeeText} width={s.coffeeWidth} />
        <div className="coffee-grid coffee-grid-spaced">
          {beans.map((p) => (
            <CoffeeCard product={p} key={p.slug} />
          ))}
        </div>
        <ButtonLink href="/beans">לצפייה בקטלוג המלא</ButtonLink>
      </section>

      <section className="services">
        <SectionHeader title={s.servicesTitle} text={s.servicesText} width={606} />
      </section>

      <section className="more">
        <SectionHeader title={moreThanCoffee.title} text={moreThanCoffee.text} width={499} />
        <BrandCarousel />
        <ButtonLink href="/catalogs/diplomat-catalog-2025.pdf">
          לצפייה בקטלוג המלא
        </ButtonLink>
      </section>

      <ContactSection title={s.contactTitle} text={s.contactText} />
      <Footer variant="solution" />
    </>
  );
}
