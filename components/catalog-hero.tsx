import { Header } from "./ui";
import { catalogHero } from "@/lib/data";

export function CatalogHero({
  title = catalogHero.title,
  text = catalogHero.text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="catalog-hero">
      <img className="hero-bg" src="/images/b4f9f.webp" alt="" />
      <div className="hero-shade" />
      <Header />
      <div className="catalog-hero-content">
        <h1 className="h1">{title}</h1>
        <p className="subheading">{text}</p>
      </div>
    </section>
  );
}

export function FiltersHeader() {
  return (
    <div className="filters-header">
      <h2 className="h2">{catalogHero.filtersTitle}</h2>
      <p className="subheading">{catalogHero.filtersText}</p>
    </div>
  );
}
