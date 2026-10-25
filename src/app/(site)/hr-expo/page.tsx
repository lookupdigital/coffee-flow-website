import type { Metadata } from "next";
import { ContactForm, Header } from "@/components/interactive";
import { Footer } from "@/components/ui";

// Landing page for the HR exhibition (QR code / direct link only): not linked from the site, not in the sitemap,
// never indexed. Its leads are tagged "תערוכת HR" (project type) and form_name "hr_expo".
export const metadata: Metadata = {
  title: "נפגשנו בתערוכת HR",
  robots: { index: false, follow: false, nocache: true },
};

export default function HrExpoPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="hr-expo">
        <section className="contact" id="contact">
          <div className="contact-inner">
            <h1 className="contact-title">נפגשנו בתערוכת HR? בואו נדבר על הקפה במשרד</h1>
            <p className="contact-text">
              השאירו פרטים ונחזור אליכם עם פתרון קפה מותאם לחברה: מכונות, קפה איכותי ושירות מלא, כדי שהעובדים
              ייהנו מקפה טוב בכל יום.
            </p>
            <ContactForm formName="hr_expo" variant="hr_expo" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
