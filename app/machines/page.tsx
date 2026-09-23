import { Suspense } from "react";
import { CatalogHero, FiltersHeader } from "@/components/catalog-hero";
import { MachineCatalog } from "@/components/interactive";
import { ContactSection, Footer } from "@/components/ui";
import { defaultContact, machineCatalogOrder, getProduct } from "@/lib/data";

export const metadata = { title: "קטלוג מכונות קפה" };

const machines = machineCatalogOrder.map((slug) => getProduct(slug)!);

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
