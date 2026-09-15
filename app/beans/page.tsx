import { CatalogHero, FiltersHeader } from "@/components/catalog-hero";
import { ProductRow } from "@/components/shared";
import { ContactSection, Footer } from "@/components/ui";
import { beansCatalogOrder, defaultContact, getProduct } from "@/lib/data";

export const metadata = { title: "קטלוג פולי קפה" };

const beans = beansCatalogOrder.map((slug) => getProduct(slug)!);

export default function BeansPage() {
  return (
    <>
      <CatalogHero />
      <section className="filters-block">
        <FiltersHeader />
      </section>
      <div className="catalog-list">
        {beans.map((p) => (
          <ProductRow product={p} key={p.slug} />
        ))}
      </div>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="catalog" />
    </>
  );
}
