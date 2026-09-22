// Layout copy is taken verbatim from the Figma file "coffee-flow-website".
// Machine specs come from the Coffee Flow machine spec sheet (PDF); machine descriptions
// are written from the manufacturers' official pages (see `sources` on each product).
// Placeholder copy (e.g. "אחוזים", "פסקה", "כותרת פוסט") is intentional and will be replaced later.

export type ImageFit =
  | { kind: "contain" }
  | { kind: "cover" }
  | { kind: "inset"; left: number; top: number; width: number; height: number }
  | { kind: "box"; size: number; scale?: number }
  | { kind: "fixed"; width: number; height: number };

export type MachineKind = "office" | "professional" | "capsule" | "automatic" | "sabbath";

export type Product = {
  slug: string;
  category: "machines" | "beans";
  name: string;
  /** Name shown on the Figma cards (home / solution pages). */
  cardName: string;
  /** Catalog and product-page image (with dimensions, from the client's Drive). */
  image: string;
  /** Card image from Figma, when the product appears on a Figma card. */
  cardImage?: string;
  cardFit: ImageFit;
  solutionFit?: ImageFit;
  kinds?: MachineKind[];
  description?: string;
  narrative?: string[];
  trust?: [string, string][];
  specs?: [string, string][];
  sources?: string[];
};

export const cardDescription =
  "מכונת האספרסו המקצועית המובילה בשוק, מושלמת למסעדות ובתי קפה עמוסים. עיצוב איטלקי מושלם עם ביצועים ללא פשרות.";

export const beanPlaceholder = "פסקה";

const machineInset: ImageFit = {
  kind: "inset",
  left: 4.85,
  top: 5.82,
  width: 90.31,
  height: 88.36,
};
const machineCardFit: ImageFit = { kind: "fixed", width: 300, height: 270 };
const beanCardFit: ImageFit = { kind: "fixed", width: 260, height: 260 };

function specs(
  width: string,
  depth: string,
  height: string,
  power: string,
  voltage?: string,
  phase?: string,
): [string, string][] {
  const rows: [string, string][] = [
    ["רוחב", `${width} ס״מ`],
    ["עומק", `${depth} ס״מ`],
    ["גובה", `${height} ס״מ`],
    ["הספק", power],
  ];
  if (voltage) rows.push(["מתח", voltage]);
  if (phase) rows.push(["חיבור חשמל", phase]);
  return rows;
}

const appiaNarrative = [
  "מערכת Soft Infusion System (SIS) מרטיבה את הקפה בלחץ נמוך לפני החליטה המלאה, מעצימה את הארומה של כל בלנד, מעניקה קרמה מלאה ועקבית ומפצה על טעויות בדחיסת הקפה.",
  "מסך TFT מציג את זמני החליטה ומאפשר לשנות מנות, להפעיל ניקוי ולצפות במונים. בידוד DRYTEX THERMICAL מפחית את צריכת האנרגיה ב-13% לעומת הדגם הקודם Appia II, וזרוע קיטור מנירוסטה מאפשרת הקצפת חלב מקצועית.",
];
const appiaSources = [
  "https://nuovasimonelli.com/en/machine/appia-life-2/",
];

const whiteEagleNarrative = [
  "טכנולוגיית T3 מאפשרת שליטה מלאה בטמפרטורת המים בכל שלב של החליטה, ולכל ראש חליטה אפשר להגדיר טמפרטורה משלו. כך ניתן להכין מגוון משקאות קפה וחלב באיכות עקבית, כוס אחרי כוס.",
  "מערכת EasyCream מקציפה חלב ומשקאות צמחיים באופן אוטומטי בטמפרטורה ובכמות הקצף הרצויות, וזרועות הקיטור נשארות קרות למגע. מסך TFT ובקרים ארגונומיים מעניקים לבריסטה שליטה מלאה בחליטה ובתחזוקה, בגוף עשוי פלדה ואלומיניום.",
];
const whiteEagleSources = ["https://victoriaarduino.com/en/products-machines/white-eagle/"];

export const products: Product[] = [
  {
    slug: "shabbat-coffee-machine",
    category: "machines",
    name: "מכונת שבת",
    cardName: "מכונת שבת",
    image: "catalog/machine-shabbat",
    cardFit: machineCardFit,
    kinds: ["sabbath"],
    description:
      "הדרך החדשה להגיש קפה איכותי גם בשבת. פתרון אידיאלי לבתי מלון, חדרי אוכל, מוסדות ואולמות אירועים. מאושר על ידי מכון צומת, עם קפה פילטר משובח מבית Douwe Egberts, איכות וטעם אחידים לאורך כל השבת, תפעול פשוט, שירות מהיר וחיסכון בכוח אדם.",
    narrative: [
      "מכונת השבת מרכזת את שירות הקפה והמים החמים בעמדה אחת מסודרת, כדי לאפשר רצף אירוח נוח ועקבי גם בסופי שבוע ובחגים. המבנה המשולב שומר על סביבת הגשה נקייה ומקצועית ומתאים במיוחד ללובי, לחדר אוכל ולטרקליני אירוח.",
      "התצורה הסופית, אופן ההפעלה וההתאמות הנדרשות לשבת נקבעים לאחר אפיון של צורכי המקום, התשתיות ונפח הפעילות, ובכפוף להנחיות ולאישור של גורם הכשרות המלווה את העסק.",
    ],
    trust: [
      ["שבת וחג", "רצף שירות מותאם"],
      ["2 ב־1", "קפה ומים חמים"],
      ["מותאם", "לתשתיות המקום"],
    ],
    specs: [
      ["ייעוד", "בתי מלון ומתחמי אירוח"],
      ["מבנה", "עמדת קפה ומים חמים"],
      ["התקנה", "בהתאמה לתשתיות המקום"],
      ["הפעלה בשבת", "לפי הנחיות גורם הכשרות"],
    ],
  },
  {
    slug: "coffee-express",
    category: "machines",
    name: "Dr.Coffee Coffee Express",
    cardName: "Coffee Express",
    image: "catalog/machine-coffee-express",
    cardImage: "206d3",
    cardFit: machineInset,
    solutionFit: { kind: "fixed", width: 379, height: 285 },
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית מסחרית של Dr.Coffee, עם שני מכלי פולים ומסך מגע 10.1 אינץ׳. מכינה משקאות קפה וחלב בלחיצה אחת, ומתאימה למשרדים ולמתחמי אירוח עם תפוקה יומית מומלצת של 200 כוסות.",
    narrative: [
      "שני מכלי פולים (1,000 ו-1,200 גרם) מאפשרים להציע שני סוגי קפה במקביל, ומערכת החלב מתנקה אוטומטית. לפי היצרן, המכונה מספקת עד 100 כוסות בשעה ותפוקה יומית מומלצת של 200 כוסות.",
      "המכונה עובדת עם מכל מים של 4 ליטר או בחיבור ישיר לרשת המים, וכוללת יציאת מים חמים. ניתן לשלב מקרר חלב ייעודי של Dr.Coffee להכנת משקאות חלב חמים וקרים.",
    ],
    trust: [
      ["200", "כוסות ביום (מומלץ)"],
      ["10.1″", "מסך מגע"],
      ["2", "מכלי פולים"],
    ],
    specs: specs("34", "54.5", "62", "2,700W", "240V", "חד פאזי"),
    sources: ["https://www.drcoffee.com/specifications/coffee-express.html"],
  },
  {
    slug: "gt2-pro",
    category: "machines",
    name: "Dr.Coffee GT2 Pro",
    cardName: "GT2 Pro",
    image: "catalog/machine-gt2-pro",
    cardImage: "a2781",
    cardFit: { kind: "contain" },
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית מסדרת GT2 של Dr.Coffee, שנבנתה לעסקים ולמשרדים בגודל קטן עד בינוני — עם מסך צבעוני 10.1 אינץ׳, מטחנה סרמית ומשקאות חלב בלחיצה.",
    narrative: [
      "מערכת חליטה בשני לחצים, יחד עם מטחנה סרמית, מספקת קפה איכותי ועקבי לשימוש מסחרי. ניתן לכוון את דרגת הטחינה, את כמות הקפה ואת זמן ההרטבה המקדימה, ולהתאים כל משקה לטעם המקום.",
      "מסלול החלב נפרק כולו ומתנקה אוטומטית בלי להפריע לשימוש, וצינורות החלב מוסתרים לתחזוקה נוחה. המכונה משתלבת במערכת IoT של Dr.Coffee לשליטה וניהול מרחוק.",
    ],
    trust: [
      ["10.1″", "מסך צבעוני"],
      ["2", "לחצי חליטה"],
      ["IoT", "ניהול מרחוק"],
    ],
    specs: specs("30", "50", "58", "2,900W", "240V", "חד פאזי"),
    sources: ["https://www.drcoffee.com/ocs-/gt2.html", "https://www.drcoffee.com/ocs/"],
  },
  {
    slug: "coffee-break",
    category: "machines",
    name: "Dr.Coffee CoffeeBreak",
    cardName: "CoffeeBreak",
    image: "catalog/machine-coffee-break",
    cardFit: machineCardFit,
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית של Dr.Coffee לעסקים ולמשרדים בגודל קטן עד בינוני, עם מסך מגע צבעוני 10.1 אינץ׳ ומערכת חלב נשלפת שמתנקה מעצמה.",
    narrative: [
      "מטחנה עם להבים שטוחים מסרמיקה מציעה 9 דרגות טחינה, והקפה הטחון עובר ישירות ליחידת חליטה של 16 גרם — כך שכל כוס נחלטת מקפה טרי. ניתן לבחור חליטה בטמפרטורה גבוהה או נמוכה ולכוון את ההרטבה המקדימה.",
      "מערכת החלב נשלפת ומקציפה בטמפרטורה של 60–70 מעלות. המכונה מבצעת ניקוי אוטומטי בהדלקה ובכיבוי, וניתן להגדיר מחזורי ניקוי לפי מספר כוסות או שעות פעילות.",
    ],
    trust: [
      ["10.1″", "מסך מגע"],
      ["9", "דרגות טחינה"],
      ["16 גר׳", "יחידת חליטה"],
    ],
    specs: specs("41", "50", "58", "1,500W", "240V", "חד פאזי"),
    sources: ["https://www.drcoffee.com/ocs/coffee-break.html"],
  },
  {
    slug: "coffee-bar",
    category: "machines",
    name: "Dr.Coffee CoffeeBar",
    cardName: "CoffeeBar",
    image: "catalog/machine-coffee-bar",
    cardFit: machineCardFit,
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית קומפקטית של Dr.Coffee לחנויות נוחות, משרדים קטנים וחדרי ישיבות, עם מסך מגע 10.1 אינץ׳ ותפוקה יומית של עד 200 כוסות.",
    narrative: [
      "המכונה טוחנת פולים טריים במטחנה עם להבים שטוחים מסרמיקה, ויחידת החליטה עשויה מתכת — לעבודה יציבה לאורך זמן בתנאים מסחריים.",
      "מערכת הקצפת החלב כוללת ניקוי עצמי, ולצידה זרוע קיטור ויציאת מים חמים בלחיצה. מכל המים מכיל 4 ליטר, והעיצוב הקומפקטי מתאים גם לעמדות קפה קטנות.",
    ],
    trust: [
      ["200", "כוסות ביום"],
      ["10.1″", "מסך מגע"],
      ["4 ל׳", "מכל מים"],
    ],
    specs: specs("34", "54.5", "62", "2,900W", "240V", "חד פאזי"),
    sources: [
      "https://dr-coffee.en.made-in-china.com/product/CdMJFPojMAVu/China-Dr-Coffee-Coffeebar-Water-Capacity-4-L-Bean-to-Cup-Coffee-Machine-for-Hotel.html",
    ],
  },
  {
    slug: "coffee-master-200",
    category: "machines",
    name: "Dr.Coffee CoffeeMaster 200",
    cardName: "CoffeeMaster 200",
    image: "catalog/machine-coffee-master-200",
    cardFit: machineCardFit,
    kinds: ["professional", "automatic"],
    description:
      "מכונת הדגל של Dr.Coffee לרשתות, לבתי קפה ולמתחמים עמוסים — עם מטחנות שווייצריות, יחידת חליטה ממתכת ומערכת חלב טרי מקצועית.",
    narrative: [
      "המכונה מצוידת במטחנות שווייצריות עם להבים שטוחים בקוטר 64 מ״מ, שטוחנות באחידות ובחום נמוך, ועד שלושה מכלי פולים. יחידת החליטה עשויה מתכת, בנפח 21 גרם, ומיועדת ל-300,000 כוסות.",
      "מערכת משאבות כפולה מוזגת קפה וחלב בו-זמנית, ודוד של 3 ליטר תומך בהכנה רציפה של משקאות גדולים. לצד זרוע הקיטור האוטומטית יש זרוע קיטור נפרדת, וניטור חוסר חלב מתריע בזמן.",
    ],
    trust: [
      ["64 מ״מ", "מטחנות שווייצריות"],
      ["21 גר׳", "יחידת חליטה ממתכת"],
      ["3 ל׳", "דוד"],
    ],
    specs: specs("38", "63", "76", "5,600W", "380V", "תלת פאזי"),
    sources: [
      "https://www.drcoffee.com/coffee-shop/coffee-master.html",
      "https://www.drcoffee.com/specifications/coffee-master.html",
    ],
  },
  {
    slug: "jura-w8",
    category: "machines",
    name: "JURA W8",
    cardName: "JURA W8",
    image: "catalog/machine-jura-w8",
    cardFit: machineCardFit,
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית מקצועית של JURA למשרדים, לסטודיואים ולחנויות — 17 משקאות קפה בלחיצה, עם תפוקה יומית מומלצת של עד 50 כוסות.",
    narrative: [
      "מטחנת Professional Aroma Grinder (P.A.G.2) טוחנת את הפולים באחידות, ותהליך Pulse Extraction Process (P.E.P.) מזרים מים בפולסים קצרים לאספרסו עשיר ואינטנסיבי. טכנולוגיית הקצף העדין מכינה קפוצ׳ינו קרמי.",
      "מסך צבעוני 3.5 אינץ׳ מאפשר תפעול פשוט, מכל המים מכיל 3 ליטר ומכל הפולים 500 גרם. תוכניות שטיפה, ניקוי והסרת אבנית מובנות במכונה, וניקוי מערכת החלב נעשה בלחיצה אחת.",
    ],
    trust: [
      ["17", "משקאות קפה"],
      ["50", "כוסות ביום"],
      ["3 ל׳", "מכל מים"],
    ],
    specs: specs("29.5", "44.6", "44.3", "1,450W", "240V", "חד פאזי"),
    sources: ["https://us.jura.com/en/professional/machines/w8-dark-inox-naa-15650"],
  },
  {
    slug: "jura-x10",
    category: "machines",
    name: "JURA X10",
    cardName: "JURA X10",
    image: "catalog/machine-jura-x10",
    cardFit: machineCardFit,
    kinds: ["office", "automatic"],
    description:
      "מכונת קפה אוטומטית של JURA למשרדים גדולים, לקפיטריות ולאזורי שירות עצמי — 34 משקאות קפה, כולל משקאות קפה קר, ועד 100 כוסות ביום.",
    narrative: [
      "תהליך Cold Extraction Process מזרים מים קרים דרך קפה טחון טרי בלחץ גבוה ובפולסים איטיים, כך שמתקבלים משקאות קפה קרים בטעם טבעי ורענן. מטחנת P.A.G.2+ ויחידת חליטה משתנה (5–16 גרם) מתאימות את כמות הקפה לכל משקה.",
      "מערכת החלב עוברת אוטומטית בין חלב לקצף חלב ומתנקה בלחיצה אחת. מכל המים מכיל 5 ליטר, ואת מכל הפולים של 500 גרם ניתן להרחיב ל-1 ק״ג.",
    ],
    trust: [
      ["34", "משקאות קפה"],
      ["100", "כוסות ביום"],
      ["5 ל׳", "מכל מים"],
    ],
    specs: specs("37.3", "46.1", "47", "1,450W", "240V", "חד פאזי"),
    sources: ["https://us.jura.com/en/professional/machines/x10-dark-inox-nab-15783"],
  },
  {
    slug: "cafitesse-excellence",
    category: "machines",
    name: "Cafitesse Excellence",
    cardName: "Cafitesse Excellence",
    image: "catalog/machine-cafitesse-excellence",
    cardFit: machineCardFit,
    kinds: ["office", "professional"],
    description:
      "מערכת קפה נוזלי סגורה של Douwe Egberts (JDE Professional) להגשה מהירה בהיקפים גדולים — קפה עקבי בכל כוס, בלי טחינה ובלי התעסקות בפולים.",
    narrative: [
      "קפה Cafitesse נחלט במפעל לתמצית קפה ייחודית, שנארזת מיד באריזה אטומה ומוקפאת כדי לשמור על הטעם והארומה. המכונה מכינה ממנה כל משקה בעקביות מלאה, מקפה שחור ועד קפוצ׳ינו.",
      "המערכת הסגורה מצמצמת מגע ידני ושומרת על היגיינה, מסך המגע מאפשר לבחור ולהתאים משקאות בקלות, והתחזוקה פשוטה ומהירה. כוס קפה שחור מוכנה תוך כ-6 שניות וקפוצ׳ינו תוך כ-12 שניות.",
    ],
    trust: [
      ["6 שנ׳", "לכוס קפה שחור"],
      ["12 שנ׳", "לקפוצ׳ינו"],
      ["סגורה", "מערכת קפה נוזלי"],
    ],
    specs: specs("38", "53", "70", "9,000W", "240V / 380V", "חד / תלת פאזי"),
    sources: [
      "https://www.jacobsdouweegbertsprofessional.co.uk/articles/coffee-for-business/five-reasons-why-our-cafitesse-excellence-touch-is-the-perfect-hygienic-coffee-solution-for-your-company/",
      "https://ads-coffee-supplies.co.uk/product/douwe-egberts-cafitesse-excellence-touch/",
    ],
  },
  {
    slug: "nuova-simonelli-1gr",
    category: "machines",
    name: "Nuova Simonelli 1GR",
    cardName: "Nuova Simonelli 1GR",
    image: "catalog/machine-nuova-simonelli-1gr",
    cardImage: "3acaf",
    cardFit: { kind: "contain" },
    kinds: ["professional"],
    description:
      "מכונת אספרסו מקצועית מסדרת Appia Life של Nuova Simonelli, עם ראש חליטה אחד בגודל קומפקטי — לבתי קפה, מסעדות ועסקים שרוצים להגיש אספרסו איכותי.",
    narrative: appiaNarrative,
    trust: [
      ["1", "ראש חליטה"],
      ["5 ל׳", "דוד"],
      ["13%", "חיסכון באנרגיה"],
    ],
    specs: specs("40.4", "49.8", "54.5", "1,900W"),
    sources: appiaSources,
  },
  {
    slug: "nuova-simonelli-2gr",
    category: "machines",
    name: "Nuova Simonelli 2GR",
    cardName: "Nuova Simonelli 2GR",
    image: "catalog/machine-nuova-simonelli-2gr",
    cardFit: machineCardFit,
    kinds: ["professional"],
    description:
      "מכונת אספרסו מקצועית מסדרת Appia Life של Nuova Simonelli, עם שני ראשי חליטה — לבתי קפה, מסעדות ועסקים שמגישים הרבה קפה איכותי לאורך היום.",
    narrative: appiaNarrative,
    trust: [
      ["2", "ראשי חליטה"],
      ["11 ל׳", "דוד"],
      ["13%", "חיסכון באנרגיה"],
    ],
    specs: specs("78.4", "54.4", "50", "3,400W", "380V", "תלת פאזי"),
    sources: appiaSources,
  },
  {
    slug: "nuova-simonelli-3gr",
    category: "machines",
    name: "Nuova Simonelli 3GR",
    cardName: "Nuova Simonelli 3GR",
    image: "catalog/machine-nuova-simonelli-3gr",
    cardFit: machineCardFit,
    kinds: ["professional"],
    description:
      "מכונת אספרסו מקצועית מסדרת Appia Life של Nuova Simonelli, עם שלושה ראשי חליטה — לבתי קפה עמוסים ולרשתות שצריכות להכין כמות גדולה של קפה איכותי.",
    narrative: appiaNarrative,
    trust: [
      ["3", "ראשי חליטה"],
      ["15 ל׳", "דוד"],
      ["13%", "חיסכון באנרגיה"],
    ],
    specs: specs("101.4", "54.4", "50", "5,200W", "380V", "תלת פאזי"),
    sources: appiaSources,
  },
  {
    slug: "victoria-arduino-white-eagle-2gr",
    category: "machines",
    name: "Victoria Arduino White Eagle 2GR",
    cardName: "White Eagle 2GR",
    image: "catalog/machine-white-eagle-2gr",
    cardFit: machineCardFit,
    kinds: ["professional"],
    description:
      "מכונת אספרסו מקצועית מבית Victoria Arduino, עם שני ראשי חליטה ושליטה נפרדת בטמפרטורה של כל ראש — לבתי קפה ומסעדות שמחפשים דיוק, עקביות ועיצוב מרשים בגודל קומפקטי יותר.",
    narrative: whiteEagleNarrative,
    trust: [
      ["2", "ראשי חליטה"],
      ["T3", "שליטה בטמפרטורה"],
      ["EasyCream", "הקצפת חלב אוטומטית"],
    ],
    specs: specs("82.5", "65.9", "51.2", "7,300W"),
    sources: whiteEagleSources,
  },
  {
    slug: "victoria-arduino-white-eagle-3gr",
    category: "machines",
    name: "Victoria Arduino White Eagle 3GR",
    cardName: "White Eagle 3GR",
    image: "catalog/machine-white-eagle-3gr",
    cardFit: machineCardFit,
    kinds: ["professional"],
    description:
      "מכונת אספרסו מקצועית מבית Victoria Arduino, עם שלושה ראשי חליטה ושליטה נפרדת בטמפרטורה של כל ראש — לרשתות ולבתי קפה עמוסים שצריכים תפוקה גבוהה, דיוק ועיצוב מרשים.",
    narrative: whiteEagleNarrative,
    trust: [
      ["3", "ראשי חליטה"],
      ["T3", "שליטה בטמפרטורה"],
      ["EasyCream", "הקצפת חלב אוטומטית"],
    ],
    specs: specs("105.5", "65.9", "51.2", "9,100W"),
    sources: whiteEagleSources,
  },
  {
    slug: "la-marzocco-linea-classic-s",
    category: "machines",
    name: "La Marzocco Linea Classic S",
    cardName: "Linea Classic S",
    image: "catalog/machine-linea-classic-s",
    cardFit: machineCardFit,
    kinds: ["professional"],
    description:
      "מכונת האספרסו האיקונית של La Marzocco, עם שני ראשי חליטה ודודים נפרדים לקפה ולקיטור — לבתי קפה ומסעדות שמחפשים אמינות מוכחת, יציבות ואיכות לאורך שנים.",
    narrative: [
      "דוד נפרד לקפה ודוד נפרד לקיטור מאפשרים חליטה מדויקת והקצפת חלב במקביל, בלי פשרות. בקר PID כפול שולט אלקטרונית בטמפרטורת שני הדודים, והבידוד שלהם מפחית את צריכת האנרגיה ותורם ליציבות הטמפרטורה.",
      "ה-Linea Classic S ממשיכה את העיצוב הקלאסי של הדגם שהפך לסטנדרט בבתי קפה בכל העולם, עם מבנה נירוסטה עמיד ותפעול פשוט. בהזמנה מיוחדת ניתן להוסיף זרועות קיטור Pro Touch שנשארות קרות למגע.",
    ],
    trust: [
      ["2", "ראשי חליטה"],
      ["2", "דודים נפרדים"],
      ["7 ל׳", "דוד קיטור"],
    ],
    specs: specs("69.3", "58.5", "44.5", "3,350–5,670W", "220V / 380V", "חד / תלת פאזי"),
    sources: [
      "https://www.lamarzocco.com/fr/en/commercial-products/espresso-machines/linea-classic-s/",
    ],
  },
  {
    slug: "lor-ultimo-13-capsules",
    category: "beans",
    name: "L’OR Ultimo 13",
    cardName: "L’OR Ultimo 13",
    image: "catalog/capsules-lor-ultimo-13",
    cardFit: beanCardFit,
    description:
      "קפסולות אלומיניום בעוצמת קלייה 13, עם גוף מלא, טעמים מורכבים ומאוזנים ותווים שוקולדיים. מתאימות להכנת אספרסו וריסטרטו במכונות Nespresso® Original. מארז של 10 קפסולות, 5.2 גרם לקפסולה.",
    sources: [
      "https://www.lor-espresso.co.il/%D7%90%D7%95%D7%9C%D7%98%D7%99%D7%9E%D7%95-13%2C-%D7%A7%D7%A4%D7%A1%D7%95%D7%9C%D7%95%D7%AA-%D7%A7%D7%A4%D7%94-%D7%9C%D7%95%D7%A8-2538048.html",
    ],
  },
  {
    slug: "jacobs-crema-traditional",
    category: "beans",
    name: "Jacobs Crema Traditional",
    cardName: "Jacobs Crema Traditional",
    image: "catalog/bean-jacobs-crema",
    cardImage: "31901",
    cardFit: { kind: "cover" },
    description:
      "בלנד קלאסי המעניק חוויית קפה רכה ומאוזנת עם אופי אירופאי מסורתי. תווי דגנים קלויים, תבלינים ופירות יבשים יוצרים כוס חלקה, נעימה ועקבית, המתאימה לשתייה יומיומית. אידיאלי למי שמעדיף קפה עדין עם קרמה קטיפתית.",
  },
  {
    slug: "jacobs-crema-harmonia",
    category: "beans",
    name: "Jacobs Crema Harmonia",
    cardName: "Jacobs Crema Harmonia",
    image: "catalog/bean-jacobs-harmonia",
    cardImage: "25cef",
    cardFit: { kind: "cover" },
    description:
      "בלנד מאוזן ועדין המיועד לאוהבי קפה חלק ונעים בכל שעה של היום. פרופיל הטעמים משלב מתיקות טבעית, אגוזיות עדינה ורמזים להדרים, היוצרים כוס הרמונית עם קרמה עשירה וגוף מאוזן. בחירה מצוינת למי שמחפש קפה אלגנטי ונגיש.",
  },
  {
    slug: "jacobs-royal",
    category: "beans",
    name: "Jacobs Royal",
    cardName: "Jacobs Royal",
    image: "catalog/bean-jacobs-royal",
    cardFit: beanCardFit,
    description:
      "בלנד עשיר ובעל גוף מלא המשלב עוצמה עם איזון מרשים. הקרמה הסמיכה והמרקם הקטיפתי מעניקים חוויית שתייה עמוקה, הנשמרת גם במשקאות המבוססים על חלב. בחירה מצוינת למי שמחפש קפה בעל נוכחות, ארומה עשירה וסיומת ממושכת.",
  },
  {
    slug: "lor-espresso-harmonieux",
    category: "beans",
    name: "L’OR Espresso Harmonieux",
    cardName: "Lór Espresso Harmonieux",
    image: "catalog/bean-lor-harmonieux",
    cardImage: "66f61",
    cardFit: { kind: "box", size: 292 },
    description:
      "בלנד 100% ערביקה המציע חוויית קפה אלגנטית, מאוזנת וארומטית. בפרופיל הטעמים תמצאו רמזים למשמש מיובש, בוטנים קלויים ונגיעות רעננות, המשתלבים בגוף קטיפתי ובסיומת נקייה. אידיאלי למי שמעדיף אספרסו עדין או קפה חלב בעל אופי מעודן.",
  },

  {
    slug: "lor-espresso-vibrant",
    category: "beans",
    name: "L’OR Espresso Vibrant",
    cardName: "L’OR Espresso Vibrant",
    image: "catalog/bean-lor-vibrant",
    cardFit: beanCardFit,
    description:
      "בלנד עשיר ובעל אופי המשלב 70% פולי ערביקה עם 30% רובוסטה ליצירת גוף מלא וקרמה קטיפתית. פרופיל הקלייה הבינוני-כהה חושף תווים קלויים, תבלינים ומתיקות עדינה, עם סיומת ארוכה ומאוזנת. בחירה מושלמת למי שמעדיף אספרסו עוצמתי או משקאות חלב בעלי נוכחות.",
  },
  {
    slug: "cafitesse-strong-roast",
    category: "beans",
    name: "Douwe Egberts Cafitesse Strong Roast",
    cardName: "Cafitesse Strong Roast",
    image: "catalog/bean-cafitesse-strong-roast",
    cardFit: beanCardFit,
    description:
      "קפה נוזלי מרוכז בקלייה חזקה, המופק מקפה אמיתי ונארז מיד לאחר החליטה כדי לשמור על טריות וטעם עקבי. פרופיל הטעמים עשיר ובעל גוף מלא, עם תווים מעושנים ועציים ונגיעות של תבלינים, בעוצמה 9. אידיאלי לעסקים שמגישים כמויות גדולות ומחפשים כוס קפה עוצמתית ומהירה, וגם למשקאות חלב כמו קפוצ'ינו ולאטה.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

// Card order as displayed in Figma, right to left.
export const featuredMachines = [
  "coffee-master-200",
  "shabbat-coffee-machine",
  "nuova-simonelli-3gr",
];
export const featuredBeans = [
  "jacobs-crema-traditional",
  "lor-espresso-harmonieux",
  "cafitesse-strong-roast",
  "lor-ultimo-13-capsules",
];

export const machineCatalogOrder = [
  "shabbat-coffee-machine",
  "coffee-express",
  "gt2-pro",
  "coffee-break",
  "coffee-bar",
  "coffee-master-200",
  "jura-w8",
  "jura-x10",
  "cafitesse-excellence",
  "nuova-simonelli-1gr",
  "nuova-simonelli-2gr",
  "nuova-simonelli-3gr",
  "victoria-arduino-white-eagle-2gr",
  "victoria-arduino-white-eagle-3gr",
  "la-marzocco-linea-classic-s",
];
export const beansCatalogOrder = [
  "jacobs-crema-traditional",
  "jacobs-crema-harmonia",
  "jacobs-royal",
  "lor-espresso-harmonieux",
  "lor-espresso-vibrant",
  "cafitesse-strong-roast",
  "lor-ultimo-13-capsules",
];

// Filter cards, right to left as in Figma.
export const machineFilters: { value: "all" | MachineKind; label: string; icon: string }[] = [
  { value: "all", label: "כל המכונות", icon: "acd33" },
  { value: "office", label: "מכונות משרדיות", icon: "e3870" },
  { value: "professional", label: "מכונות מקצועיות", icon: "d5f83" },
  { value: "capsule", label: "מכונות קפסולות", icon: "0db2f" },
  { value: "automatic", label: "מכונות אוטומטיות", icon: "18930" },
  { value: "sabbath", label: "מכונות שבת", icon: "shabbat" },
];

export const catalogHero = {
  title: "מכונות קפה מקצועיות שעובדות בשבילכם",
  text: "ממשרדים דינמיים ועד לבתי קפה ומלונות יוקרה. פתרון קפה מקצועי ומלא הכולל מכונות קפה מתקדמות, פולים מובחרים, שירות ותמיכה טכנית מסביב לשעון.",
  filtersTitle: "בואו לבחור מכונת קפה לעסקים מתוך מבחר גדול של מותגים מובילים",
  filtersText: "בואו לבחור מכונת קפה לעסקים מתוך מבחר גדול של מותגים מובילים",
};

export const narrativeTitle = "חדשנות טכנולוגית בשירות הקפה";

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
    // Optional: the office page shows this copy in its hero instead.
    whyTitle?: string;
    whyText?: string;
    whyWidth?: number;
    features: string[];
    // Featured machine slugs, right to left; falls back to featuredMachines.
    machines?: string[];
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
    heroTitle: "כל מה שמשרד צריך. מספק אחד.",
    heroText:
      "פתרון קפה טוב משפיע הרבה מעבר להפסקת הקפה. הוא משפר את חוויית העובדים, תורם לאירוח לקוחות, ומשאיר את ההתעסקות השוטפת בידיים שלנו.",
    heroTextStrong: true,
    image: "f68fe",
    cup: "4af34",
    cupFit: "contain",
    features: ["שירות ותחזוקה שוטפים", "אספקה מסודרת של חומרי גלם", "פתרון בהתאמה אישית"],
    machines: ["gt2-pro", "coffee-bar", "coffee-express"],
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
      "Coffee Flow מספקת פתרונות קפה מקצועיים לבתי קפה ומסעדות – עם ציוד מתקדם, חומרי גלם איכותיים, שירות מקצועי וליווי שוטף, כדי שתוכלו להגיש קפה מצוין בכל כוס ובכל שעה.",
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
    machines: [
      "nuova-simonelli-1gr",
      "nuova-simonelli-2gr",
      "nuova-simonelli-3gr",
      "la-marzocco-linea-classic-s",
      "victoria-arduino-white-eagle-3gr",
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

// Diplomat's brand portfolio (diplomat-culinary.co.il "המותגים שלנו"): [logo file in /images/brands, name].
export const diplomatBrands: [string, string][] = [
  ["01", "היינץ"],
  ["02", "קיקומן"],
  ["03", "Cirio"],
  ["04", "יאן-ואל–יון"],
  ["05", "רומו"],
  ["06", "נישיקי"],
  ["07", "בוטאן"],
  ["08", "קאפוטו"],
  ["09", "ביונד מיט"],
  ["10", "סאקלה"],
  ["11", "מיי-פלוי"],
  ["12", "צ'יאו"],
  ["13", "פומו דורו"],
  ["14", "סינגה"],
  ["15", "מבשלת הקצורו"],
  ["16", "מבשלת אוזקי"],
  ["17", "ג'יאקובאזי"],
  ["18", "ריין דה–דיזון"],
  ["19", "סטארקיסט"],
  ["20", "מוניני"],
  ["21", "רנדולינו"],
  ["22", "ריזו סקוטי"],
  ["23", "בלובנד"],
  ["24", "מזולה"],
  ["25", "נילסן"],
  ["26", "טוסקי"],
  ["27", "לוטוס בייקריס"],
  ["28", "סקיפי"],
  ["29", "Cholimex"],
  ["30", "קוט ד'אור"],
  ["31", "אוראו"],
  ["32", "צ'אוקה"],
  ["33", "TCC"],
  ["34", "תאי הא"],
  ["35", "לה גנוקריה"],
  ["36", "מיזקאן"],
  ["37", "מילקה"],
  ["38", "פרינגלס"],
  ["39", "סלמארין איל דה נויירמוטייר"],
  ["40", "סומימוטו"],
  ["41", "Violife"],
  ["42", "Bonne Maman"],
  ["43", "Giuliano Tartufi"],
  ["44", "Saint Amour"],
];

// Technical service line, shown on /service. Every "צרו קשר" button opens WhatsApp on it.
export const servicePhone = {
  display: "052-547-4163",
  tel: "+972525474163",
  whatsapp: "https://wa.me/972525474163",
};

export const moreThanCoffee = {
  title: "הרבה יותר מקפה.",
  text: "פתרון קפה טוב משפיע הרבה מעבר להפסקת הקפה. הוא משפר את חוויית העובדים, תורם לאירוח לקוחות, ומשאיר את ההתעסקות השוטפת בידיים שלנו.",
};
