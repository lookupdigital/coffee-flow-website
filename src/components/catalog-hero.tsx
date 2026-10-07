import { Header } from "./ui";
import { pageCopy } from "@/lib/data-en";
import type { Locale } from "@/lib/i18n";

export function CatalogHero({
  title,
  text,
  locale = "he",
}: {
  title?: string;
  text?: string;
  locale?: Locale;
}) {
  const { catalogHero } = pageCopy(locale);
  return (
    <section className="catalog-hero">
      <img className="hero-bg" src="/images/b4f9f.webp" alt="" />
      <div className="hero-shade" />
      <Header />
      <div className="catalog-hero-content">
        <h1 className="h1">{title ?? catalogHero.title}</h1>
        <p className="subheading">{text ?? catalogHero.text}</p>
      </div>
    </section>
  );
}

export function FiltersHeader({ locale = "he" }: { locale?: Locale }) {
  const { catalogHero } = pageCopy(locale);
  return (
    <div className="filters-header">
      <h2 className="h2">{catalogHero.filtersTitle}</h2>
      <p className="subheading">{catalogHero.filtersText}</p>
    </div>
  );
}
