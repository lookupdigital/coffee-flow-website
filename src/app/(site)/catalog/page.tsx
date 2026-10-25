import CatalogFlipbook from "@/components/CatalogFlipbook";
import { Header } from "@/components/interactive";
import { ContactSection, Footer } from "@/components/ui";
import { defaultContact } from "@/lib/data";
import catalogText from "@/lib/catalog-text.json";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Digital brochure: the print catalog (public/catalogs/coffee-flow-catalog.pdf) rendered page by page as images
// (public/images/flipbook). To replace it, export the new PDF's pages at 1000×1414 and keep the file names.
const PAGE_COUNT = 26;
const pages = Array.from({ length: PAGE_COUNT }, (_, i) => `/images/flipbook/page-${String(i + 1).padStart(2, "0")}.webp`);

export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/catalog"));
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <div className="catalog-page">
        <header className="catalog-page-header">
          <h1 className="h2">קטלוג Coffee Flow</h1>
          <p className="subheading">דפדפו בקטלוג: לחצו על פינת העמוד, גררו אותו או השתמשו בחיצים.</p>
        </header>
        <CatalogFlipbook pages={pages} width={1000} height={1414} title="קטלוג Coffee Flow" />
        <a className="catalog-download" href="/catalogs/coffee-flow-catalog.pdf" download>
          להורדת הקטלוג (PDF)
        </a>
        {/* Text alternative for the page images (WCAG 1.1.1), extracted from the catalog PDF. Regenerate
            src/lib/catalog-text.json whenever the catalog is replaced. */}
        <details className="catalog-text">
          <summary>הצגת תוכן הקטלוג כטקסט (מותאם לקוראי מסך)</summary>
          {catalogText.map((paragraphs, i) =>
            paragraphs.length ? (
              <section key={i} aria-label={`עמוד ${i + 1}`}>
                <h2 className="catalog-text-page">עמוד {i + 1}</h2>
                {paragraphs.map((text, j) => (
                  <p key={j}>{text}</p>
                ))}
              </section>
            ) : null,
          )}
        </details>
        </div>
        <ContactSection title={defaultContact.title} text={defaultContact.text} />
      </main>
      <Footer />
    </>
  );
}
