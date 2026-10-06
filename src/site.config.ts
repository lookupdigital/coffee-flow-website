import { defineSiteConfig } from "@/lookup/config";

// Coffee Flow configuration consumed by the Lookup infrastructure (src/lookup).
// Business details (name, phone, email, address, service area, logo, SEO) are NOT here: they are entered in
// Admin → Site settings and stored in the database.
export const siteConfig = defineSiteConfig({
  // Empty: the public site name comes from Admin → Site settings.
  identity: { siteName: "" },
  locale: { htmlLang: "he", dir: "rtl", bcp47: "he-IL", ogLocale: "he_IL", timeZone: "Asia/Jerusalem" },
  phone: { countryCallingCode: "972", nationalTrunkPrefix: "0", minDigits: 9, maxDigits: 15 },
  business: { serviceArea: "" },
  schema: { businessTypes: ["LocalBusiness"] },
  routes: {
    // Adding or removing a core page? Update the matcher in src/proxy.ts too (a unit test checks it).
    // nav: false keeps the page registered (SEO, sitemap, metadata) but out of the site navigation, which is
    // part of the Coffee Flow header design.
    corePages: [
      { path: "/", label: "דף הבית", navLabel: "בית" },
      { path: "/machines", label: "מכונות קפה", title: "מכונות קפה", nav: false },
      { path: "/beans", label: "הקפה שלנו", title: "הקפה שלנו", nav: false },
      { path: "/service", label: "שירות טכני", title: "שירות טכני", nav: false },
      { path: "/privacy", label: "מדיניות פרטיות", title: "מדיניות פרטיות", nav: false },
      { path: "/accessibility", label: "הצהרת נגישות", title: "הצהרת נגישות", nav: false },
    ],
    blog: { path: "/blog", label: "בלוג", title: "בלוג" },
  },
  leads: {
    leadType: "contact_request",
    projectTypes: ["חברות ומשרדים", "בתי קפה ומסעדות", "בתי מלון ובתי הארחה", "אחר"],
    rateLimit: { maxSubmissions: 5, windowSeconds: 600 },
    messages: {
      nameRequired: "נא למלא שם מלא",
      nameTooLong: "השם ארוך מדי",
      phoneInvalid: "מספר הטלפון אינו תקין",
      emailInvalid: "כתובת האימייל אינה תקינה",
      consentRequired: "יש לאשר יצירת קשר",
      serverError: "לא הצלחנו לשלוח את הפרטים. נסו שוב בעוד רגע.",
      rateLimited: "נשלחו יותר מדי פניות בזמן קצר. נסו שוב בעוד כמה דקות.",
      verificationFailed: "לא הצלחנו לאמת את הטופס. רעננו את הדף ונסו שוב.",
    },
  },
  branding: { logoUrl: "/icons/logo-512.png", ogBackground: "#0d0a07", ogAccent: "#c2882a" },
  faq: { structuredData: false },
  admin: { sessionMaxAgeSeconds: 12 * 60 * 60 },
});
