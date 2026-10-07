// Hebrew is the default language at the site root; English lives under /en with the same page paths.

export type Locale = "he" | "en";

export const EN_PREFIX = "/en";

/** The locale a pathname belongs to. */
export function localeOf(pathname: string): Locale {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "he";
}

/** An internal link in the given locale ("/machines" → "/en/machines"). External links, tel:, anchors and files pass through. */
export function localePath(locale: Locale, href: string): string {
  if (locale === "he" || !href.startsWith("/") || href.endsWith(".pdf")) return href;
  if (href === "/") return EN_PREFIX;
  if (href.startsWith("/#")) return `${EN_PREFIX}${href.slice(1)}`;
  return `${EN_PREFIX}${href}`;
}

/** The same page in the other language. */
export function switchLocalePath(pathname: string): string {
  if (localeOf(pathname) === "en") return pathname.slice(EN_PREFIX.length) || "/";
  return pathname === "/" ? EN_PREFIX : `${EN_PREFIX}${pathname}`;
}

/** Interface copy (buttons, labels, navigation). Page and product copy lives in data.ts / data-en.ts. */
export const ui = {
  he: {
    nav: [
      ["/", "דף הבית"],
      ["/solutions/office", "חברות ומשרדים"],
      ["/solutions/cafe", "בתי קפה ומסעדות"],
      ["/solutions/hotel", "בתי מלון ובתי הארחה"],
    ] as [string, string][],
    mainNav: "ניווט ראשי",
    service: "שירות טכני",
    leaveDetails: "להשארת פרטים",
    moreDetails: "לפרטים נוספים",
    contact: "צרו קשר",
    openMenu: "פתיחת תפריט",
    closeMenu: "סגירת תפריט",
    languageSwitch: "שפה",
    talkToExperts: "לחץ לשיחה עם מומחי הקפה שלנו",
    viewCatalog: "לצפייה בקטלוג המלא",
    moreInfo: "למידע נוסף ומפרט טכני מלא",
    view: "לצפייה",
    allArticles: "לכל המאמרים",
    blog: "בלוג",
    postPlaceholderTitle: "כותרת פוסט",
    posts: "פוסטים",
    previous: "הקודם",
    next: "הבא",
    filterMachines: "סינון מכונות",
    emptyCategory: "אין כרגע מכונות בקטגוריה זו.",
    blendLabel: "הרכב התערובת",
    keyFacts: "נתונים עיקריים",
    similar: "מוצרים דומים",
    clients: "לקוחות",
    diplomatBrands: "המותגים של דיפלומט",
    partners: "המותגים השותפים שלנו",
    footerLinks: "קישורים",
    footerContact: "צור קשר",
    privacy: "מדיניות פרטיות",
    accessibility: "הצהרת נגישות",
    ourCoffee: "הקפה שלנו",
    machines: "מכונות",
    about: "עלינו",
    rights: "© 2026 Coffee Flow. כל הזכויות שמורות",
    form: {
      name: "שם מלא *",
      namePh: "ישראל ישראלי",
      company: "שם החברה *",
      companyPh: "שם החברה",
      phone: "טלפון *",
      email: "אימייל",
      city: "עיר",
      cityPh: "תל אביב",
      employees: "מספר עובדים משוער",
      employeesPh: "לדוגמה: 50",
      businessType: "סוג עסק *",
      chooseType: "בחרו סוג עסק",
      types: { office: "חברות ומשרדים", cafe: "בתי קפה ומסעדות", hotel: "בתי מלון ובתי הארחה", other: "אחר" },
      submit: "השאירו פרטים",
      sending: "שולח…",
      sent: "תודה, הפרטים התקבלו",
    },
  },
  en: {
    nav: [
      ["/", "Home"],
      ["/solutions/office", "Offices"],
      ["/solutions/cafe", "Cafés & Restaurants"],
      ["/solutions/hotel", "Hotels & Hospitality"],
    ] as [string, string][],
    mainNav: "Main navigation",
    service: "Technical service",
    leaveDetails: "Get in touch",
    moreDetails: "More details",
    contact: "Contact us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitch: "Language",
    talkToExperts: "Talk to our coffee experts",
    viewCatalog: "View the full catalog",
    moreInfo: "Details & full specifications",
    view: "Read more",
    allArticles: "All articles",
    blog: "Blog",
    postPlaceholderTitle: "Post title",
    posts: "Posts",
    previous: "Previous",
    next: "Next",
    filterMachines: "Filter machines",
    emptyCategory: "There are no machines in this category yet.",
    blendLabel: "Blend composition",
    keyFacts: "Key facts",
    similar: "Similar products",
    clients: "Clients",
    diplomatBrands: "Diplomat brands",
    partners: "Our partner brands",
    footerLinks: "Links",
    footerContact: "Contact us",
    privacy: "Privacy policy",
    accessibility: "Accessibility statement",
    ourCoffee: "Our coffee",
    machines: "Machines",
    about: "About us",
    rights: "© 2026 Coffee Flow. All rights reserved",
    form: {
      name: "Full name *",
      namePh: "John Smith",
      company: "Company name *",
      companyPh: "Company name",
      phone: "Phone *",
      email: "Email",
      city: "City",
      cityPh: "Tel Aviv",
      employees: "Approximate number of employees",
      employeesPh: "e.g. 50",
      businessType: "Business type *",
      chooseType: "Choose a business type",
      types: { office: "Offices", cafe: "Cafés & Restaurants", hotel: "Hotels & Hospitality", other: "Other" },
      submit: "Send",
      sending: "Sending…",
      sent: "Thank you, we received your details",
    },
  },
} satisfies Record<Locale, unknown>;

/** Server-side lead messages are Hebrew; English pages show these instead. */
export const leadMessagesEn: Record<string, string> = {
  "נא למלא שם מלא": "Please enter your full name",
  "השם ארוך מדי": "The name is too long",
  "מספר הטלפון אינו תקין": "The phone number is not valid",
  "כתובת האימייל אינה תקינה": "The email address is not valid",
  "יש לאשר יצירת קשר": "Please agree to be contacted",
  "לא הצלחנו לשלוח את הפרטים. נסו שוב בעוד רגע.": "We couldn't send your details. Please try again in a moment.",
  "נשלחו יותר מדי פניות בזמן קצר. נסו שוב בעוד כמה דקות.": "Too many requests in a short time. Please try again in a few minutes.",
  "לא הצלחנו לאמת את הטופס. רעננו את הדף ונסו שוב.": "We couldn't verify the form. Please refresh the page and try again.",
};
