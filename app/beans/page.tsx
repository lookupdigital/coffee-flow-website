import { CatalogHero } from "@/components/catalog-hero";
import { ProductRow } from "@/components/shared";
import { ContactSection, Footer } from "@/components/ui";
import { beansCatalogOrder, beansHero, defaultContact, getProduct } from "@/lib/data";

export const metadata = { title: "קטלוג פולי קפה" };

const beans = beansCatalogOrder.map((slug) => getProduct(slug)!);

export default function BeansPage() {
  return (
    <>
      <CatalogHero title={beansHero.title} text={beansHero.text} />
      <div className="catalog-list catalog-list-beans">
        {beans.map((p) => (
          <ProductRow product={p} key={p.slug} />
        ))}
      </div>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="catalog" />
    </>
  );
}
