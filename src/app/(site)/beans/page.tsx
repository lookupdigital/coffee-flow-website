import { CatalogHero } from "@/components/catalog-hero";
import { ProductRow } from "@/components/shared";
import { ContactSection, Footer } from "@/components/ui";
import { beansCatalogOrder, beansHero, defaultContact, getProduct } from "@/lib/data";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";


const beans = beansCatalogOrder.map((slug) => getProduct(slug)!);

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/beans"));
}

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
