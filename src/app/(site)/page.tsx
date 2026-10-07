import {
  BrandCarousel,
  ButtonLink,
  CoffeeCard,
  ContactSection,
  Footer,
  Header,
  MachineCard,
} from "@/components/ui";
import { Carousel } from "@/components/interactive";
import PostCard from "@/components/PostCard";
import { Rich } from "@/components/shared";
import { clientLogos, defaultContact, featuredBeans, featuredMachines, getProduct } from "@/lib/data";
import { getHomePosts, HOME_POSTS_LIMIT } from "@/lookup/posts";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";
import { siteConfig } from "@/site.config";

const machines = featuredMachines.map((slug) => getProduct(slug)!);
const beans = featuredBeans.map((slug) => getProduct(slug)!);

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/"));
}

export default async function Home() {
  // Only posts ticked "show on home" in Admin → Posts; empty slots keep the design placeholders.
  const posts = await getHomePosts();
  const placeholders = Math.max(0, HOME_POSTS_LIMIT - posts.length);

  return (
    <>
      <section className="hero home-hero">
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
            <bdi dir="ltr">Coffee Flow</bdi> מספקת פתרונות קפה מלאים לעסקים –
            החל מהתאמת המכונה וחומרי הגלם ועד לשירות, תחזוקה ואספקה שוטפת.{" "}
            <strong>פתרון אחד, שמותאם לצרכים שלכם ומלווה אתכם לאורך זמן.</strong>
          </p>
          <ButtonLink href="#contact" tone="gold" size="compact">
            לחץ לשיחה עם מומחי הקפה שלנו
          </ButtonLink>
        </div>
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
        <BrandCarousel logos={clientLogos} dir="clients" label="לקוחות" startOnView />
      </section>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="h2">
              אנחנו לא מספקים רק קפה.
              <span>אנחנו מספקים שקט.</span>
            </h2>
            <p className="text">
              <Rich text="פתרון קפה איכותי הוא הרבה מעבר למכונה או לפולי קפה. הוא מתחיל באפיון נכון, ממשיך בהתאמת הפתרון לעסק, ונשען על שירות מקצועי, תחזוקה שוטפת וזמינות לאורך כל הדרך. Coffee Flow פועלת כחלק מ-Diplomat Culinary ובשיתוף תאגיד הקפה הגדול בעולם JDE Professional, ומשלבת מותגים מובילים, ניסיון מקצועי וליווי אישי כדי לאפשר לעסקים ליהנות מחוויית קפה איכותית, יציבה וללא התעסקות מיותרת." />
            </p>
            <ul className="partner-logos" aria-label="המותגים השותפים שלנו">
              <li className="partner-logo partner-logo-douwe-egberts">
                <img
                  src="/images/partners/douwe-egberts-professional.webp"
                  alt="Douwe Egberts Professional"
                />
              </li>
              <li className="partner-logo">
                <img src="/images/partners/jacobs-professional.webp" alt="Jacobs Professional" />
              </li>
              <li className="partner-logo">
                <img src="/images/partners/lor-professional.webp" alt="L'OR Professional" />
              </li>
              <li className="partner-logo partner-logo-jde">
                <img src="/images/partners/jde-professional.webp" alt="JDE Professional" />
              </li>
            </ul>
          </div>
          <div className="about-photo">
            <img className="pic pic-cover" src="/images/about-us.webp" alt="אספרסו נמזג מידית מכונת הקפה" />
          </div>
        </div>
      </section>

      <section className="home-machines">
        <div className="home-title">
          <h2 className="h2">לכל עסק יש את פתרון הקפה שמתאים לו.</h2>
          {/* Each sentence is its own block so line balancing applies to both. */}
          <p className="text">
            <span className="line">הצרכים של משרד, בית מלון או מסעדה אינם זהים.</span>
            <span className="line">
              לכן אנחנו מתאימים לכל לקוח את המכונה הנכונה בהתאם לכמות המשתמשים, אופי
              השימוש, סביבת העבודה, והחוויה שהוא רוצה ליצור.
            </span>
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
            <Rich text="Coffee Flow עובדת עם קולקציית הקפה של JDE Professional ומציעה מגוון בלנדים וחומרי גלם שנבחרו כדי לספק טעם עקבי, איכות גבוהה, וחוויית שתייה שמתאימה לכל עובד ואורח." />
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
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
          {Array.from({ length: placeholders }, (_, i) => (
            <article className="blog-card" key={`placeholder-${i}`}>
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
        <ButtonLink href={siteConfig.routes.blog.path}>לכל המאמרים</ButtonLink>
      </section>

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer />
    </>
  );
}
