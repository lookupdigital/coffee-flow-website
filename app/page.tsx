import {
  ButtonLink,
  CoffeeCard,
  ContactSection,
  Footer,
  Header,
  MachineCard,
  Testimonials,
  WhatsAppLink,
} from "@/components/ui";
import { Carousel, RollingReviews } from "@/components/interactive";
import { Rich } from "@/components/shared";
import { defaultContact, featuredBeans, featuredMachines, getProduct } from "@/lib/data";

const machines = featuredMachines.map((slug) => getProduct(slug)!);
const beans = featuredBeans.map((slug) => getProduct(slug)!);

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-bg" src="/images/b4f9f.webp" alt="" />
        <div className="hero-shade" />
        <Header home />
        <div className="home-hero-content">
          <h1 className="h1">
            פתרון הקפה שמאפשר לכם
            <br />
            להתעסק בעסק. לא בקפה.
          </h1>
          <p className="subheading">
            מספקת פתרונות קפה מלאים לעסקים – החל מהתאמת המכונה וחומרי הגלם ועד
            לשירות, תחזוקה ואספקה שוטפת.{" "}
            <strong>פתרון אחד, שמותאם לצרכים שלכם ומלווה אתכם לאורך זמן.</strong>
          </p>
          <ButtonLink href="#contact" tone="gold">
            לתיאום פגישת ייעוץ
          </ButtonLink>
        </div>
        <WhatsAppLink className="home-hero-whatsapp" />
      </section>

      <section className="clients">
        <div className="clients-header">
          <h2 className="h2">
            <Rich text="עסקים מובילים בוחרים ב-Coffee flow" />
          </h2>
          <p className="subheading">
            אנחנו מלווים חברות, ארגונים, בתי מלון, מסעדות, ובתי קפה, ומספקים לכל
            אחד מהם פתרון קפה המותאם לאופי הפעילות, היקף הצריכה, והסטנדרט שהם
            רוצים להעניק לעובדים, ללקוחות, ולאורחים שלהם.
          </p>
        </div>
        <div className="logos" role="list" aria-label="לקוחות">
          {Array.from({ length: 9 }, (_, i) => (
            <div className="logo-box" role="listitem" key={i}>
              logo
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="h2">
              אנחנו לא מספקים רק קפה.
              <span>אנחנו מספקים שקט.</span>
            </h2>
            <p className="about-lead">
              פתרון קפה איכותי הוא הרבה מעבר למכונה או לפולי קפה.
            </p>
            <p className="text">
              <Rich text="הוא מתחיל באפיון נכון, ממשיך בהתאמת הפתרון לעסק, ונשען על שירות מקצועי, תחזוקה שוטפת וזמינות לאורך כל הדרך. כחלק מ-Culinary Diplomat ובשיתוף Coffee Flow, JDE Professional משלבת מותגים מובילים, ניסיון מקצועי, וליווי אישי כדי לאפשר לעסקים ליהנות מחוויית קפה איכותית, יציבה, וללא התעסקות מיותרת." />
            </p>
          </div>
          <div className="about-photo">
            <img className="pic pic-cover" src="/images/8d0fc.webp" alt="בריסטה מקצועי מכין אספרסו" />
          </div>
        </div>
      </section>

      <section className="home-machines">
        <div className="home-title">
          <h2 className="h2">לכל עסק יש את פתרון הקפה שמתאים לו.</h2>
          <p className="text">
            הצרכים של משרד, בית מלון או מסעדה אינם זהים.
            <br />
            לכן אנחנו מתאימים לכל לקוח את המכונה הנכונה בהתאם לכמות המשתמשים, אופי
            השימוש, סביבת העבודה, והחוויה שהוא רוצה ליצור.
          </p>
        </div>
        <div className="machine-grid">
          {machines.map((p) => (
            <MachineCard product={p} variant="home" key={p.slug} />
          ))}
        </div>
        <ButtonLink href="/machines">לצפייה בקטלוג המלא</ButtonLink>
      </section>

      <section className="home-coffee">
        <div className="home-coffee-header">
          <h2 className="h2">קפה איכותי מתחיל בבחירה הנכונה.</h2>
          <p className="text">
            <Rich text="Coffee Flow עובדת עם מותגי הקפה של JDE Professional ומציעה מגוון בלנדים וחומרי גלם שנבחרו כדי לספק טעם עקבי, איכות גבוהה, וחוויית שתייה שמתאימה לכל עובד ואורח." />
          </p>
        </div>
        <div className="coffee-grid">
          {beans.map((p, i) => (
            <CoffeeCard product={p} outlined={i === 0} key={p.slug} />
          ))}
        </div>
        <ButtonLink href="/beans">לצפייה בקטלוג המלא</ButtonLink>
      </section>

      <section className="blog">
        <h2 className="h2">בלוג</h2>
        <Carousel label="פוסטים">
          {[0, 1, 2].map((i) => (
            <article className="blog-card" key={i}>
              <div className="blog-card-photo">
                <img className="pic pic-cover" src="/images/a5b88.webp" alt="" loading="lazy" />
              </div>
              <div className="blog-card-body">
                <h3>כותרת פוסט</h3>
                <p>
                  מכונת האספרסו המקצועית המובילה בשוק, מושלמת למסעדות ובתי קפה
                  עמוסים. עיצוב איטלקי מושלם עם ביצועים ללא פשרות.
                </p>
                <button type="button" className="blog-btn">
                  לצפייה
                </button>
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <Testimonials
        title="הדרך הטובה ביותר להכיר אותנו היא דרך הלקוחות שלנו."
        width={445}
        className="testimonials-home"
      >
        <RollingReviews />
      </Testimonials>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer />
    </>
  );
}
