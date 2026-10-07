import { CatalogHero } from "@/components/catalog-hero";
import { ProductRow } from "@/components/shared";
import { ContactSection, Footer } from "@/components/ui";
import { beansCatalogOrder, getProduct } from "@/lib/data";
import { pageCopy } from "@/lib/data-en";
import type { Locale } from "@/lib/i18n";

const beans = beansCatalogOrder.map((slug) => getProduct(slug)!);

export default function BeansView({ locale }: { locale: Locale }) {
  const { beansHero, defaultContact } = pageCopy(locale);
  return (
    <>
      <CatalogHero title={beansHero.title} text={beansHero.text} locale={locale} />
      <div className="catalog-list catalog-list-beans">
        {beans.map((p) => (
          <ProductRow product={p} locale={locale} key={p.slug} />
        ))}
      </div>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="catalog" locale={locale} />
    </>
  );
}
