import { Suspense } from "react";
import { CatalogHero, FiltersHeader } from "@/components/catalog-hero";
import { MachineCatalog } from "@/components/interactive";
import { ContactSection, Footer } from "@/components/ui";
import { defaultContact, machineCatalogOrder, getProduct } from "@/lib/data";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";


const machines = machineCatalogOrder.map((slug) => getProduct(slug)!);

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/machines"));
}

export default function MachinesPage() {
  return (
    <>
      <CatalogHero />
      {/* useSearchParams needs a boundary so the rest of the page stays static. */}
      <Suspense>
        <MachineCatalog products={machines} header={<FiltersHeader />} />
      </Suspense>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer size="catalog" />
    </>
  );
}
