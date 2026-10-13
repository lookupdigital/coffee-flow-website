import CatalogFlipbook from "@/components/CatalogFlipbook";
import { Header } from "@/components/interactive";
import { ContactSection, Footer } from "@/components/ui";
import { defaultContact } from "@/lib/data";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Digital brochure: the print catalog (public/catalogs/coffee-flow-catalog.pdf) rendered page by page as images
// (public/images/flipbook). To replace it, export the new PDF's pages at 1000×1414 and keep the file names.
const PAGE_COUNT = 20;
const pages = Array.from({ length: PAGE_COUNT }, (_, i) => `/images/flipbook/page-${String(i + 1).padStart(2, "0")}.webp`);

export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/catalog"));
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="catalog-page">
        <header className="catalog-page-header">
          <h1 className="h2">קטלוג Coffee Flow</h1>
          <p className="subheading">דפדפו בקטלוג: לחצו על פינת העמוד, גררו אותו או השתמשו בחיצים.</p>
        </header>
        <CatalogFlipbook pages={pages} width={1000} height={1414} title="קטלוג Coffee Flow" />
        <a className="catalog-download" href="/catalogs/coffee-flow-catalog.pdf" download>
          להורדת הקטלוג (PDF)
        </a>
      </main>
      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer />
    </>
  );
}
