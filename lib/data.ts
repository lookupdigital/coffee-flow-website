// All copy below is taken verbatim from the Figma file "coffee-flow-website".
// Placeholder copy (e.g. "אחוזים", "פסקה", "כותרת פוסט") is intentional and will be replaced later.

export type ImageFit =
  | { kind: "contain" }
  | { kind: "cover" }
  | { kind: "inset"; left: number; top: number; width: number; height: number }
  | { kind: "box"; size: number; scale?: number }
  | { kind: "fixed"; width: number; height: number };

export type MachineKind = "office" | "professional" | "capsule" | "automatic";

export type Product = {
  slug: string;
  category: "machines" | "beans";
  cardName: string;
  catalogName: string;
  image: string;
  cardFit: ImageFit;
  solutionFit?: ImageFit;
  catalogFit: ImageFit;
  heroImage?: string;
  kinds?: MachineKind[];
  bordered?: boolean;
};

export const cardDescription =
  "מכונת האספרסו המקצועית המובילה בשוק, מושלמת למסעדות ובתי קפה עמוסים. עיצוב איטלקי מושלם עם ביצועים ללא פשרות.";

export const catalogDescription =
  "מיני בר הינה מכונה מסחרית המיועדת לצרכים המיוחדים והאינטנסיביים של משרדים, בתי מלון וטרקליני עסקים. בעלת ממשק מגע צבעוני חכם, אפשרויות שונות של פולי קפה וחלב טרי, ומספקת חווית בית קפה אמיתית בלחיצת כפתור אחת.";

// Right-to-left reading order (the right-most item in Figma comes first).
export const catalogMetrics: [string, string][] = [
  ["מלא", "חיבור מים ישיר"],
  ["24", "סוגי משקאות"],
  ["120+", "כוסות ביום"],
];

const machineInset: ImageFit = {
  kind: "inset",
  left: 4.85,
  top: 5.82,
  width: 90.31,
  height: 88.36,
};

export const products: Product[] = [
  {
    slug: "coffee-express",
    category: "machines",
    cardName: "Coffee Express",
    catalogName: "Coffee Express",
    image: "206d3",
    heroImage: "942c4",
    cardFit: machineInset,
    solutionFit: { kind: "fixed", width: 379, height: 285 },
    catalogFit: machineInset,
    kinds: ["office", "automatic"],
  },
  {
    slug: "gt2-pro",
    category: "machines",
    cardName: "GT2 Pro",
    catalogName: "GT2 Pro",
    image: "a2781",
    cardFit: { kind: "contain" },
    catalogFit: machineInset,
    kinds: ["office", "automatic"],
  },
  {
    slug: "nouva-simonelli",
    category: "machines",
    cardName: "Nouva Simonelli",
    catalogName: "Nouva Simonelli 1 gr",
    image: "3acaf",
    cardFit: { kind: "contain" },
    catalogFit: { kind: "contain" },
    kinds: ["professional"],
  },
  {
    slug: "lor-espresso-harmonieux",
    category: "beans",
    cardName: "Lór Espresso Harmonieux",
    catalogName: "Lór Espresso Harmonieux",
    image: "66f61",
    cardFit: { kind: "box", size: 292 },
    catalogFit: { kind: "box", size: 292 },
  },
  {
    slug: "jacobs-crema-harmonia",
    category: "beans",
    cardName: "Jacobs Crema Harmonia",
    catalogName: "Jacobs Crema Harmonia",
    image: "25cef",
    cardFit: { kind: "cover" },
    catalogFit: { kind: "box", size: 292, scale: 128.08 },
  },
  {
    slug: "jacobs-royal",
    category: "beans",
    cardName: "Jacobs Royal",
    catalogName: "Jacobs Royal",
    image: "6d491",
    cardFit: { kind: "box", size: 292, scale: 122.6 },
    catalogFit: { kind: "box", size: 292, scale: 122.6 },
  },
  {
    slug: "jacobs-crema-traditional",
    category: "beans",
    cardName: "Jacobs Crema Traditional",
    catalogName: "Jacobs Crema Traditional",
    image: "31901",
    cardFit: { kind: "cover" },
    catalogFit: { kind: "box", size: 292, scale: 128.08 },
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

// Card order as displayed in Figma, right to left.
export const featuredMachines = ["coffee-express", "gt2-pro", "nouva-simonelli"];
export const featuredBeans = [
  "jacobs-crema-traditional",
  "jacobs-crema-harmonia",
  "lor-espresso-harmonieux",
];
// Figma catalog pages show these rows, top to bottom; the remaining products follow.
export const machineCatalogOrder = ["coffee-express", "gt2-pro", "nouva-simonelli"];
export const beansCatalogOrder = [
  "lor-espresso-harmonieux",
  "jacobs-crema-harmonia",
  "jacobs-royal",
  "jacobs-crema-traditional",
];

// Filter cards, right to left as in Figma.
export const machineFilters: { value: "all" | MachineKind; label: string; icon: string }[] = [
  { value: "all", label: "כל המכונות", icon: "acd33" },
  { value: "office", label: "מכונות משרדיות", icon: "e3870" },
  { value: "professional", label: "מכונות מקצועיות", icon: "d5f83" },
  { value: "capsule", label: "מכונות קפסולות", icon: "0db2f" },
  { value: "automatic", label: "מכונות אוטומטיות", icon: "18930" },
];

export const catalogHero = {
  title: "מכונות קפה מקצועיות שעובדות בשבילכם",
  text: "ממשרדים דינמיים ועד לבתי קפה ומלונות יוקרה. פתרון קפה מקצועי ומלא הכולל מכונות קפה מתקדמות, פולים מובחרים, שירות ותמיכה טכנית מסביב לשעון.",
  filtersTitle: "בואו לבחור מכונת קפה לעסקים מתוך מבחר גדול של מותגים מובילים",
  filtersText: "בואו לבחור מכונת קפה לעסקים מתוך מבחר גדול של מותגים מובילים",
};

export const productPage = {
  description:
    "מכונת האספרסו המקצועית שנועדה לענות על הצרכים התובעניים ביותר של משרדים מודרניים, מלונות בוטיק וטרקליני עסקים. בעלת ממשק מגע מתקדם ומערכת הקצפת חלב טרי מדויקת להכנת כוס קפה מושלמת פעם אחר פעם.",
  // Right to left.
  trust: [
    ["120+", "כוסות ביום"],
    ["24", "סוגי משקאות"],
    ["טחינה טרייה", "בכל כוס"],
  ] as [string, string][],
  specs: [
    ["קיבולת מיכל מים", "6 ליטר"],
    ["מספר ראשי חליטה", "2"],
    ["קיבולת מיכל פולים", "2 ק״ג"],
    ["ממדים (רוחב×עומק×גובה)", '45×60×75 ס"מ'],
  ] as [string, string][],
  narrativeTitle: "חדשנות טכנולוגית בשירות הקפה",
  narrative: (name: string) => [
    `מכונת ה-${name} מצוידת במטחנה קרמית שקטה במיוחד השומרת על ארומת הפולים, ובמערכת דו-דודים עוצמתית המאפשרת חליטת אספרסו והקצפת חלב בו-זמנית ללא ירידה בטמפרטורה.`,
    "ממשק המשתמש הצבעוני מבוסס מגע ומאפשר לעובדי המשרד או לאורחי המלון לבחור את המשקה האהוב עליהם, לשלוט על חוזק הקפה וכמות החלב, וליהנות מחווית בית קפה איטלקי בלחיצה קלה.",
  ],
};

export const defaultContact = {
  title: "בואו נמצא את פתרון הקפה המתאים לעסק שלכם.",
  text: "השאירו פרטים, נכיר את העסק שלכם ונבנה עבורכם פתרון קפה מקצועי, המותאם לצרכים, לאופי הפעילות, ולתקציב שלכם.",
};

export const reviews = [
  { text: "כארגון טכנולוגי עמוס, אנחנו צריכים פתרון קפה שפשוט עובד. ב-Coffee Flow מצאנו שותף אמיתי. הכל מתבצע בדייקנות חסרת פשרות, משלוח פולים תמיד בזמן.”", name: "יוסי לוי", role: "מנכ״ל" },
  { text: "ביקורת 2", name: "יוסי לוי", role: "מנכ״ל" },
  { text: "ביקורת 3", name: "יוסי לוי", role: "מנכ״ל" },
  { text: "ביקורת 4", name: "יוסי לוי", role: "מנכ״ל" },
  { text: "ביקורת 5", name: "יוסי לוי", role: "מנכ״ל" },
];

export type Audience = "office" | "cafe" | "hotel";

export const solutions: Record<
  Audience,
  {
    metaTitle: string;
    heroTitle: string;
    heroText: string;
    heroTextStrong?: boolean;
    image: string;
    cup: string;
    cupFit: "contain" | "cover";
    whyTitle: string;
    whyText: string;
    whyWidth: number;
    features: string[];
    machinesTitle: string;
    machinesText: string[];
    coffeeTitle: string;
    coffeeText: string;
    coffeeWidth: number;
    servicesTitle: string;
    servicesText: string[];
    testimonialTitle: string;
    testimonialWidth: number;
    contactTitle: string;
    contactText: string;
  }
> = {
  office: {
    metaTitle: "פתרונות קפה למשרדים",
    heroTitle: "פתרון קפה שמתאים לקצב של המשרד שלכם.",
    heroText:
      "בין אם מדובר במשרד קטן או בארגון גדול, Coffee Flow מספקת פתרון קפה מלא הכולל מכונות מקצועיות, חומרי גלם איכותיים, שירות ותחזוקה שוטפת – כך שאתם יכולים ליהנות מחוויית קפה מצוינת, בלי להתעסק בתפעול.",
    heroTextStrong: true,
    image: "f68fe",
    cup: "4af34",
    cupFit: "contain",
    whyTitle: "כל מה שמשרד צריך. מספק אחד.",
    whyText:
      "פתרון קפה טוב משפיע הרבה מעבר להפסקת הקפה. הוא משפר את חוויית העובדים, תורם לאירוח לקוחות, ומשאיר את ההתעסקות השוטפת בידיים שלנו.",
    whyWidth: 499,
    features: ["שירות ותחזוקה שוטפים", "אספקה מסודרת של חומרי גלם", "פתרון בהתאמה אישית"],
    machinesTitle: "המכונה הנכונה מתחילה בהיכרות עם העסק.",
    machinesText: [
      "לכל משרד הרגלי שימוש שונים, מספר עובדים אחר, וקצב עבודה ייחודי.",
      "לכן אנו מתאימים את פתרון הקפה בהתאם לצרכים שלכם, כדי שתקבלו מערכת שתשרת אתכם לאורך שנים ותשתלב בצורה טבעית בשגרת העבודה.",
    ],
    coffeeTitle: "קפה איכותי מתחיל בבחירה נכונה.",
    coffeeText:
      "Coffee Flow עובדת עם מותגי הקפה של JDE Professional ומציעה מגוון בלנדים וחומרי גלם שנבחרו כדי לספק טעם עקבי, איכות גבוהה, וחוויית שתייה שמתאימה לכל עובד ולכל אורח.",
    coffeeWidth: 640,
    servicesTitle: "אנחנו כאן גם הרבה אחרי ההתקנה",
    servicesText: [
      "פתרון קפה טוב לא מסתיים ביום שבו המכונה מגיעה למשרד.",
      "אנחנו מלווים את הלקוחות שלנו עם שירות מקצועי, תחזוקה שוטפת, אספקת חומרי גלם, ומענה מהיר - כדי שאתם תוכלו להמשיך להתמקד בעבודה, ואנחנו נדאג לכל השאר.",
    ],
    testimonialTitle: "הדרך הטובה ביותר להכיר אותנו היא דרך הלקוחות שלנו.",
    testimonialWidth: 445,
    contactTitle: "בואו נתאים גם למשרד שלכם את פתרון הקפה הנכון.",
    contactText:
      "השאירו פרטים, ואחד המומחים שלנו יחזור אליכם כדי להכיר את הצרכים של המשרד ולהתאים עבורכם פתרון קפה מקצועי, ללא התחייבות.",
  },
  cafe: {
    metaTitle: "פתרונות קפה לבתי קפה ומסעדות",
    heroTitle: "פתרון קפה שעומד בקצב של העסק שלכם.",
    heroText:
      "Coffee Flow מספקת פתרונות קפה מקצועיים לבתי קפה, מסעדות ועסקי אירוח – עם ציוד מתקדם, חומרי גלם איכותיים, שירות מקצועי וליווי שוטף, כדי שתוכלו להגיש קפה מצוין בכל כוס ובכל שעה.",
    image: "76743",
    cup: "0b526",
    cupFit: "contain",
    whyTitle: "כשכל כוס משפיעה על חוויית הלקוח.",
    whyText:
      "בענף המסעדנות והאירוח, הקפה הוא חלק בלתי נפרד מהחוויה הכוללת. לכן חשוב לבחור בפתרון שמספק איכות עקבית, עבודה רציפה ושירות מקצועי – גם בשעות העומס.",
    whyWidth: 499,
    features: [
      "איכות עקבית בכל הגשה",
      "פתרון שנבנה לעבודה אינטנסיבית",
      "שירות שמבין את עולם האירוח",
      "אספקת חומרי גלם באופן מסודר",
    ],
    machinesTitle: "ציוד מקצועי לעבודה מקצועית",
    machinesText: [
      "פתרון הקפה הנכון מתחיל בהתאמה נכונה של הציוד. אנו מציעים מגוון מכונות מקצועיות, המותאמות להיקפי עבודה שונים ולסוגי עסקים מגוונים, כדי שתוכלו להעניק ללקוחותיכם חוויית קפה איכותית ועקבית.",
    ],
    coffeeTitle: "חומרי גלם שעומדים בסטנדרטים שלכם.",
    coffeeText:
      "קפה איכותי מתחיל בבחירה נכונה של חומרי הגלם. Coffee Flow מציעה מגוון בלנדים מבית JDE Professional, שנבחרו כדי לספק איכות עקבית, טעמים עשירים וביצועים המתאימים לעולם המסעדנות והאירוח.",
    coffeeWidth: 690,
    servicesTitle: "כשהעסק עובד, גם אנחנו",
    servicesText: [
      "פתרון קפה מקצועי דורש ליווי מקצועי. אנחנו מלווים את לקוחותינו בהתקנה, הדרכה, שירות טכני, תחזוקה שוטפת ואספקת חומרי גלם – כדי שאתם תוכלו להמשיך להתמקד במה שאתם עושים הכי טוב: להעניק חוויית אירוח מצוינת.",
    ],
    testimonialTitle: "הדרך הטובה ביותר להכיר אותנו היא דרך הלקוחות שלנו.",
    testimonialWidth: 445,
    contactTitle: "בואו נמצא את פתרון הקפה המתאים לעסק שלכם.",
    contactText:
      "השאירו פרטים, ואחד מהמומחים שלנו יחזור אליכם כדי להכיר את אופי הפעילות, להבין את הצרכים שלכם, ולהתאים עבורכם פתרון קפה מקצועי, ללא התחייבות.",
  },
  hotel: {
    metaTitle: "פתרונות קפה למלונות",
    heroTitle: "חווית אירוח מתחילה בפרטים הקטנים.",
    heroText:
      "Coffee Flow מספקת פתרונות קפה מקצועיים למלונות ולמתחמי אירוח, עם ציוד מתקדם, חומרי גלם איכותיים, שירות מקצועי וליווי שוטף – כדי שכל אורח יהנה מחוויית קפה שתואמת את רמת האירוח שאתם מעניקים.",
    image: "4d846",
    cup: "deb8d",
    cupFit: "cover",
    whyTitle: "פתרון קפה שמתאים לסטנדרט האירוח שלכם.",
    whyText:
      "בענף המלונאות כל פרט משפיע על חוויית האורח. פתרון הקפה הנכון מאפשר להעניק שירות איכותי, לשמור על תפעול רציף ולהבטיח חוויית אירוח ברמה גבוהה בכל נקודת הגשה.",
    whyWidth: 532,
    features: [
      "חוויית אירוח איכותית",
      "פתרון לכל נקודת הגשה",
      "ציוד אמין לעבודה רציפה",
      "אספקת חומרי גלם באופן שוטף",
    ],
    machinesTitle: "פתרונות קפה לכל סביבת אירוח.",
    machinesText: [
      "לכל מלון צרכים שונים, החל ממספר האורחים ועד לאופי ההגשה בכל אזור. אנו מתאימים את פתרון הקפה הנכון לכל נקודת שירות, כך שהציוד ישתלב באופן טבעי בחוויית האירוח ובדרישות התפעול של המלון.",
    ],
    coffeeTitle: "טעם שנשאר גם אחרי שהחופשה מסתיימת.",
    coffeeText:
      "חוויית קפה איכותית מתחילה בחומרי הגלם. Coffee Flow מציעה מגוון בלנדים מבית JDE Professional, שנבחרו כדי להבטיח איכות עקבית, טעמים עשירים וחוויית שתייה שמתאימה לסטנדרטים של עולם האירוח.",
    coffeeWidth: 690,
    servicesTitle: "שירות שמאפשר לכם להתמקד באירוח.",
    servicesText: [
      "אנחנו מלווים את לקוחותינו הרבה מעבר להתקנת הציוד, החל מהתאמת הפתרון, דרך תחזוקה שוטפת ועד אספקת חומרי גלם ושירות מקצועי – אנחנו דואגים לכל מה שנדרש, כדי שאתם תוכלו להמשיך להעניק לאורחים חוויית אירוח ברמה הגבוהה ביותר.",
    ],
    testimonialTitle: "שותפים לאירוח של עסקים מובילים.",
    testimonialWidth: 479,
    contactTitle: "בואו נתאים גם למלון שלכם את פתרון הקפה הנכון.",
    contactText:
      "השאירו פרטים, ואחד מהמומחים שלנו יחזור אליכם כדי להכיר את צורכי המלון ולהתאים עבורכם פתרון קפה מקצועי, בהתאם להיקף הפעילות, אופי האירוח, וסטנדרט השירות שלכם.",
  },
};

export const moreThanCoffee = {
  title: "הרבה יותר מקפה.",
  text: "פתרון קפה טוב משפיע הרבה מעבר להפסקת הקפה. הוא משפר את חוויית העובדים, תורם לאירוח לקוחות, ומשאיר את ההתעסקות השוטפת בידיים שלנו.",
};
