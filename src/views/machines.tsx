import { Suspense } from "react";
import { CatalogHero, FiltersHeader } from "@/components/catalog-hero";
import { MachineCatalog } from "@/components/interactive";
import { ContactSection, Footer } from "@/components/ui";
import { getProduct, machineCatalogOrder } from "@/lib/data";
import { pageCopy } from "@/lib/data-en";
import type { Locale } from "@/lib/i18n";

const machines = machineCatalogOrder.map((slug) => getProduct(slug)!);

export default function MachinesView({ locale }: { locale: Locale }) {
  const { defaultContact } = pageCopy(locale);
  return (
    <>
      <CatalogHero locale={locale} />
      {/* useSearchParams needs a boundary so the rest of the page stays static. */}
      <Suspense>
        <MachineCatalog products={machines} header={<FiltersHeader locale={locale} />} />
      </Suspense>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="catalog" locale={locale} />
    </>
  );
}
