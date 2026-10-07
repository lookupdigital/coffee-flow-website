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
import { clientLogos, featuredBeans, featuredMachines, getProduct } from "@/lib/data";
import { pageCopy } from "@/lib/data-en";
import { Locale, ui } from "@/lib/i18n";
import { getHomePosts, HOME_POSTS_LIMIT } from "@/lookup/posts";
import { siteConfig } from "@/site.config";

const machines = featuredMachines.map((slug) => getProduct(slug)!);
const beans = featuredBeans.map((slug) => getProduct(slug)!);

const copy = {
  he: {
    heroTitle: ["פתרון הקפה שמאפשר לכם", "להתעסק בעסק. לא בקפה."],
    heroText: (
      <>
        <bdi dir="ltr">Coffee Flow</bdi> מספקת פתרונות קפה מלאים לעסקים –
        החל מהתאמת המכונה וחומרי הגלם ועד לשירות, תחזוקה ואספקה שוטפת.{" "}
        <strong>פתרון אחד, שמותאם לצרכים שלכם ומלווה אתכם לאורך זמן.</strong>
      </>
    ),
    clientsTitle: "עסקים מובילים בוחרים ב-Coffee flow",
    clientsText:
      "אנחנו מלווים חברות, ארגונים, בתי מלון, מסעדות, ובתי קפה, ומספקים לכל אחד מהם פתרון קפה המותאם לאופי הפעילות, היקף הצריכה, והסטנדרט שהם רוצים להעניק לעובדים, ללקוחות, ולאורחים שלהם.",
    aboutTitle: "אנחנו לא מספקים רק קפה.",
    aboutAccent: "אנחנו מספקים שקט.",
    aboutText:
      "פתרון קפה איכותי הוא הרבה מעבר למכונה או לפולי קפה. הוא מתחיל באפיון נכון, ממשיך בהתאמת הפתרון לעסק, ונשען על שירות מקצועי, תחזוקה שוטפת וזמינות לאורך כל הדרך. Coffee Flow פועלת כחלק מ-Diplomat Culinary ובשיתוף תאגיד הקפה הגדול בעולם JDE Professional, ומשלבת מותגים מובילים, ניסיון מקצועי וליווי אישי כדי לאפשר לעסקים ליהנות מחוויית קפה איכותית, יציבה וללא התעסקות מיותרת.",
    aboutAlt: "אספרסו נמזג מידית מכונת הקפה",
    machinesTitle: "לכל עסק יש את פתרון הקפה שמתאים לו.",
    machinesText: [
      "הצרכים של משרד, בית מלון או מסעדה אינם זהים.",
      "לכן אנחנו מתאימים לכל לקוח את המכונה הנכונה בהתאם לכמות המשתמשים, אופי השימוש, סביבת העבודה, והחוויה שהוא רוצה ליצור.",
    ],
    coffeeTitle: "קפה איכותי מתחיל בבחירה הנכונה.",
    coffeeText:
      "Coffee Flow עובדת עם קולקציית הקפה של JDE Professional ומציעה מגוון בלנדים וחומרי גלם שנבחרו כדי לספק טעם עקבי, איכות גבוהה, וחוויית שתייה שמתאימה לכל עובד ואורח.",
  },
  en: {
    heroTitle: ["The coffee solution that lets you", "focus on your business. Not on coffee."],
    heroText: (
      <>
        Coffee Flow provides complete coffee solutions for businesses — from choosing the right machine and
        supplies to service, maintenance and ongoing delivery.{" "}
        <strong>One solution, tailored to your needs and by your side for the long run.</strong>
      </>
    ),
    clientsTitle: "Leading businesses choose Coffee Flow",
    clientsText:
      "We work with companies, organisations, hotels, restaurants and cafés, giving each a coffee solution tailored to its operation, its consumption and the standard it wants to offer its employees, customers and guests.",
    aboutTitle: "We don't just supply coffee.",
    aboutAccent: "We supply peace of mind.",
    aboutText:
      "A quality coffee solution goes far beyond a machine or coffee beans. It starts with a proper assessment, continues with a solution tailored to your business, and relies on professional service, ongoing maintenance and availability all the way. Coffee Flow is part of Diplomat Culinary and works in partnership with JDE Professional, the world's largest coffee company, combining leading brands, professional experience and personal support so businesses can enjoy a quality, reliable coffee experience without the hassle.",
    aboutAlt: "Espresso pouring from the coffee machine's handle",
    machinesTitle: "Every business has the coffee solution that suits it.",
    machinesText: [
      "An office, a hotel and a restaurant don't have the same needs.",
      "That's why we match every customer with the right machine for their number of users, type of use, working environment and the experience they want to create.",
    ],
    coffeeTitle: "Quality coffee starts with the right choice.",
    coffeeText:
      "Coffee Flow works with the JDE Professional coffee collection and offers a range of blends and supplies chosen to deliver consistent taste, high quality and a coffee experience that suits every employee and guest.",
  },
};

export default async function HomeView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const t = ui[locale];
  const { defaultContact } = pageCopy(locale);
  // The blog is Hebrew-only: English home pages leave the section out.
  const showBlog = locale === "he";
  // Only posts ticked "show on home" in Admin → Posts; empty slots keep the design placeholders.
  const posts = showBlog ? await getHomePosts() : [];
  const placeholders = Math.max(0, HOME_POSTS_LIMIT - posts.length);

  return (
    <>
      <section className="hero home-hero">
        <img className="hero-bg" src="/images/b4f9f.webp" alt="" />
        <div className="hero-shade" />
        <Header home />
        <div className="home-hero-content">
          <h1 className="h1">
            {c.heroTitle[0]}
            <br />
            {c.heroTitle[1]}
          </h1>
          <p className="subheading">{c.heroText}</p>
          <ButtonLink href="#contact" tone="gold" size="compact" locale={locale}>
            {t.talkToExperts}
          </ButtonLink>
        </div>
      </section>

      <section className="clients">
        <div className="clients-header">
          <h2 className="h2">
            <Rich text={c.clientsTitle} />
          </h2>
          <p className="subheading">{c.clientsText}</p>
        </div>
        <BrandCarousel logos={clientLogos} dir="clients" label={t.clients} startOnView />
      </section>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-copy">
            <h2 className="h2">
              {c.aboutTitle}
              <span>{c.aboutAccent}</span>
            </h2>
            <p className="text">
              <Rich text={c.aboutText} />
            </p>
            <ul className="partner-logos" aria-label={t.partners}>
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
            <img className="pic pic-cover" src="/images/about-us.webp" alt={c.aboutAlt} />
          </div>
        </div>
      </section>

      <section className="home-machines">
        <div className="home-title">
          <h2 className="h2">{c.machinesTitle}</h2>
          {/* Each sentence is its own block so line balancing applies to both. */}
          <p className="text">
            {c.machinesText.map((line) => (
              <span className="line" key={line}>
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="machine-grid">
          {machines.map((p) => (
            <MachineCard product={p} variant="home" locale={locale} key={p.slug} />
          ))}
        </div>
        <ButtonLink href="/machines" locale={locale}>
          {t.viewCatalog}
        </ButtonLink>
      </section>

      <section className="home-coffee">
        <div className="home-coffee-header">
          <h2 className="h2">{c.coffeeTitle}</h2>
          <p className="text">
            <Rich text={c.coffeeText} />
          </p>
        </div>
        <div className="coffee-grid">
          {beans.map((p, i) => (
            <CoffeeCard product={p} outlined={i === 0} locale={locale} key={p.slug} />
          ))}
        </div>
        <ButtonLink href="/beans" locale={locale}>
          {t.viewCatalog}
        </ButtonLink>
      </section>

      {showBlog && (
        <section className="blog">
          <h2 className="h2">{t.blog}</h2>
          <Carousel label={t.posts}>
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
            {Array.from({ length: placeholders }, (_, i) => (
              <article className="blog-card" key={`placeholder-${i}`}>
                <div className="blog-card-photo">
                  <img className="pic pic-cover" src="/images/a5b88.webp" alt="" loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <h3>{t.postPlaceholderTitle}</h3>
                  <p>
                    מכונת האספרסו המקצועית המובילה בשוק, מושלמת למסעדות ובתי קפה
                    עמוסים. עיצוב איטלקי מושלם עם ביצועים ללא פשרות.
                  </p>
                  <button type="button" className="blog-btn">
                    {t.view}
                  </button>
                </div>
              </article>
            ))}
          </Carousel>
          <ButtonLink href={siteConfig.routes.blog.path}>{t.allArticles}</ButtonLink>
        </section>
      )}

      <ContactSection title={defaultContact.title} text={defaultContact.text} />
      <Footer locale={locale} />
    </>
  );
}
