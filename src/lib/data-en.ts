// English copy for the /en pages. Mirrors data.ts: anything not listed here (images, slugs, order,
// filters' icons) comes from the Hebrew data unchanged.
import {
  Audience,
  Product,
  beansHero as beansHeroHe,
  catalogHero as catalogHeroHe,
  defaultContact as defaultContactHe,
  machineFilters as machineFiltersHe,
  moreThanCoffee as moreThanCoffeeHe,
  narrativeTitle as narrativeTitleHe,
  products,
  solutions as solutionsHe,
} from "./data";
import type { Locale } from "./i18n";

type ProductCopy = Pick<Product, "description" | "narrative" | "trust"> & { name?: string; cardName?: string };

const appiaNarrative = [
  "The Soft Infusion System (SIS) pre-wets the coffee at low pressure before full extraction, bringing out the aroma of every blend, delivering a full, consistent crema and compensating for tamping errors.",
  "A TFT display shows shot times and lets you adjust doses, start cleaning and view counters. DRYTEX THERMICAL insulation cuts energy use by 13% compared with the previous Appia II, and a stainless-steel steam wand allows professional milk frothing.",
];

const whiteEagleNarrative = [
  "T3 technology gives full control over water temperature at every stage of extraction, and each group can be set to its own temperature — so a wide range of coffee and milk drinks come out with consistent quality, cup after cup.",
  "The EasyCream system automatically froths milk and plant-based drinks to the desired temperature and foam, while the steam wands stay cool to the touch. A TFT display and ergonomic controls give the barista full command of extraction and maintenance, in a steel and aluminium body.",
];

const productsEn: Record<string, ProductCopy> = {
  "shabbat-coffee-machine": {
    name: "Shabbat Coffee Machine",
    cardName: "Shabbat Coffee Machine",
    description:
      "A new way to serve quality coffee on Shabbat. An ideal solution for hotels, dining halls, institutions and event venues. Approved by the Zomet Institute, with fine Douwe Egberts filter coffee, consistent quality and taste throughout Shabbat, simple operation, fast service and less staffing.",
    narrative: [
      "The Shabbat machine brings coffee and hot water together in one tidy station, keeping hospitality smooth and consistent over weekends and holidays. Its combined design keeps the serving area clean and professional, and suits lobbies, dining halls and guest lounges.",
      "The final configuration, mode of operation and Shabbat settings are defined after assessing the site's needs, infrastructure and volume, and subject to the guidance and approval of the business's kashrut supervisor.",
    ],
    trust: [
      ["Shabbat & holidays", "Continuous service"],
      ["2-in-1", "Coffee and hot water"],
      ["Tailored", "To your infrastructure"],
    ],
  },
  "coffee-express": {
    description:
      "A Dr.Coffee automatic coffee machine with two bean hoppers and a 10.1″ touchscreen. It prepares coffee and milk drinks at the touch of a button and suits hospitality settings, with a recommended daily output of over 200 cups.",
    narrative: [
      "Two bean hoppers (1,000 and 1,200 g) let you offer two coffees side by side, and the milk system cleans itself automatically. According to the manufacturer, the machine delivers up to 100 cups an hour and a recommended daily output of over 200 cups.",
      "The machine runs from a 4-litre water tank or a direct water connection and includes a hot-water outlet. A dedicated Dr.Coffee milk fridge can be added for hot and cold milk drinks.",
    ],
    trust: [
      ["200+", "Cups a day (recommended)"],
      ["10.1″", "Touchscreen"],
      ["2", "Bean hoppers"],
    ],
  },
  "gt2-pro": {
    description:
      "An automatic coffee machine from the Dr.Coffee GT2 series, built for small to mid-sized businesses and offices — with a 10.1″ colour screen, a ceramic grinder and milk drinks at the touch of a button.",
    narrative: [
      "A dual-pressure brewing system and a ceramic grinder deliver quality, consistent coffee all day long. Grind size, coffee dose and pre-infusion time can all be adjusted to tailor every drink to your taste.",
      "The milk path comes apart completely and cleans itself automatically without interrupting service, and the milk tubes are concealed for easy maintenance. The machine connects to the Dr.Coffee IoT platform for remote control and management.",
    ],
    trust: [
      ["10.1″", "Colour screen"],
      ["2", "Brewing pressures"],
      ["IoT", "Remote management"],
    ],
  },
  "coffee-break": {
    description:
      "A Dr.Coffee automatic coffee machine for small to mid-sized businesses and offices, with a 10.1″ colour touchscreen and a removable, self-cleaning milk system.",
    narrative: [
      "A flat ceramic burr grinder offers 9 grind settings, and the ground coffee goes straight into a 16 g brewing unit — so every cup is brewed from freshly ground coffee. Brewing temperature can be set high or low, and pre-infusion is adjustable.",
      "The removable milk system froths at 60–70°C. The machine cleans itself automatically when switched on and off, and cleaning cycles can be set by number of cups or hours of use.",
    ],
    trust: [
      ["10.1″", "Touchscreen"],
      ["9", "Grind settings"],
      ["16 g", "Brewing unit"],
    ],
  },
  "coffee-bar": {
    description:
      "A compact Dr.Coffee automatic coffee machine for convenience stores, small offices and meeting rooms, with a 10.1″ touchscreen and a daily output of up to 200 cups.",
    narrative: [
      "The machine grinds fresh beans with flat ceramic burrs, and its brewing unit is made of metal — for steady performance over time, even under heavy use.",
      "The milk frothing system cleans itself, alongside a steam wand and a one-touch hot-water outlet. The water tank holds 4 litres, and the compact design fits even small coffee corners.",
    ],
    trust: [
      ["200", "Cups a day"],
      ["10.1″", "Touchscreen"],
      ["4 L", "Water tank"],
    ],
  },
  "coffee-master-200": {
    description:
      "Dr.Coffee's flagship machine for chains, cafés and busy venues — with Swiss grinders, a metal brewing unit and a professional fresh-milk system.",
    narrative: [
      "The machine has Swiss grinders with 64 mm flat burrs that grind evenly and cool, and up to three bean hoppers. The 21 g brewing unit is made of metal and rated for 300,000 cups.",
      "A dual pump system pours coffee and milk at the same time, and a 3-litre boiler supports continuous preparation of large drinks. Alongside the automatic steam wand there is a separate manual wand, and a milk-shortage sensor gives timely alerts.",
    ],
    trust: [
      ["64 mm", "Swiss grinders"],
      ["21 g", "Metal brewing unit"],
      ["3 L", "Boiler"],
    ],
  },
  "jura-w8": {
    description:
      "A professional JURA automatic coffee machine for offices, studios and shops — 17 coffee drinks at the touch of a button, with a recommended daily output of up to 50 cups.",
    narrative: [
      "The Professional Aroma Grinder (P.A.G.2) grinds beans evenly, and the Pulse Extraction Process (P.E.P.) passes water in short pulses for a rich, intense espresso. Fine-foam technology makes a creamy cappuccino.",
      "A 3.5″ colour display makes operation simple; the water tank holds 3 litres and the bean container 500 g. Rinsing, cleaning and descaling programmes are built in, and the milk system is cleaned at the touch of a button.",
    ],
    trust: [
      ["17", "Coffee drinks"],
      ["50", "Cups a day"],
      ["3 L", "Water tank"],
    ],
  },
  "jura-x10": {
    description:
      "A JURA automatic coffee machine for large offices, cafeterias and self-service areas — 34 coffee drinks, including cold-brew style drinks, and up to 100 cups a day.",
    narrative: [
      "The Cold Extraction Process passes cold water through freshly ground coffee at high pressure in slow pulses, producing cold coffee drinks with a natural, refreshing taste. The P.A.G.2+ grinder and a variable brewing unit (5–16 g) match the coffee dose to every drink.",
      "The milk system switches automatically between milk and milk foam and cleans at the touch of a button. The water tank holds 5 litres, and the 500 g bean container can be extended to 1 kg.",
    ],
    trust: [
      ["34", "Coffee drinks"],
      ["100", "Cups a day"],
      ["5 L", "Water tank"],
    ],
  },
  "cafitesse-excellence": {
    description:
      "A closed liquid-coffee system from Douwe Egberts (JDE Professional) for fast, high-volume service — consistent coffee in every cup, with no grinding and no handling of beans.",
    narrative: [
      "Cafitesse coffee is brewed at the factory into a unique coffee extract, which is immediately sealed and frozen to preserve its taste and aroma. The machine turns it into every drink with complete consistency, from black coffee to cappuccino.",
      "The closed system minimises manual contact and keeps things hygienic, the touchscreen makes choosing and adjusting drinks easy, and maintenance is quick and simple. A black coffee is ready in about 6 seconds and a cappuccino in about 12.",
    ],
    trust: [
      ["6 sec", "Black coffee"],
      ["12 sec", "Cappuccino"],
      ["Closed", "Liquid-coffee system"],
    ],
  },
  "nuova-simonelli-1gr": {
    description:
      "A professional espresso machine from the Nuova Simonelli Appia Life series, with a single group in a compact size — for cafés, restaurants and businesses that want to serve quality espresso.",
    narrative: appiaNarrative,
    trust: [
      ["1", "Group"],
      ["5 L", "Boiler"],
      ["13%", "Energy saving"],
    ],
  },
  "nuova-simonelli-2gr": {
    description:
      "A professional espresso machine from the Nuova Simonelli Appia Life series, with two groups — for cafés, restaurants and businesses serving plenty of quality coffee throughout the day.",
    narrative: appiaNarrative,
    trust: [
      ["2", "Groups"],
      ["11 L", "Boiler"],
      ["13%", "Energy saving"],
    ],
  },
  "nuova-simonelli-3gr": {
    description:
      "A professional espresso machine from the Nuova Simonelli Appia Life series, with three groups — for busy cafés and chains that need to make large volumes of quality coffee.",
    narrative: appiaNarrative,
    trust: [
      ["3", "Groups"],
      ["15 L", "Boiler"],
      ["13%", "Energy saving"],
    ],
  },
  "victoria-arduino-white-eagle-2gr": {
    description:
      "A professional espresso machine by Victoria Arduino, with two groups and independent temperature control for each — for cafés and restaurants that want precision, consistency and striking design in a more compact size.",
    narrative: whiteEagleNarrative,
    trust: [
      ["2", "Groups"],
      ["T3", "Temperature control"],
      ["EasyCream", "Automatic milk frothing"],
    ],
  },
  "victoria-arduino-white-eagle-3gr": {
    description:
      "A professional espresso machine by Victoria Arduino, with three groups and independent temperature control for each — for chains and busy cafés that need high output, precision and striking design.",
    narrative: whiteEagleNarrative,
    trust: [
      ["3", "Groups"],
      ["T3", "Temperature control"],
      ["EasyCream", "Automatic milk frothing"],
    ],
  },
  "la-marzocco-linea-classic-s": {
    description:
      "La Marzocco's iconic espresso machine, with two groups and separate boilers for coffee and steam — for cafés and restaurants that want proven reliability, stability and quality for years to come.",
    narrative: [
      "Separate coffee and steam boilers allow precise extraction and milk frothing at the same time, with no compromise. A dual PID controller manages both boiler temperatures electronically, and their insulation reduces energy use and adds to temperature stability.",
      "The Linea Classic S carries on the classic design of the model that became the standard in cafés worldwide, with a durable stainless-steel body and simple operation. Pro Touch steam wands that stay cool to the touch are available on request.",
    ],
    trust: [
      ["2", "Groups"],
      ["2", "Separate boilers"],
      ["7 L", "Steam boiler"],
    ],
  },
  "lor-barista-sublime": {
    description:
      "A compact L’OR capsule machine made by Philips, with a double spout for two espressos at once or one large cup, at up to 19 bar.",
    narrative: [
      "The machine works with L’OR aluminium capsules and is compatible with Nespresso® Original capsules. It recognises the capsule size automatically and makes coffee in about 30 seconds, so every cup comes out the same — no adjustments, no fuss.",
      "The compact design, just 15.7 cm wide, fits small coffee corners, meeting rooms and hospitality stations. The removable drip tray suits cups of different sizes and is easy to clean, and the water tank holds 0.8 litres.",
    ],
    trust: [
      ["19 bar", "Pump pressure"],
      ["2", "Cups at once"],
      ["30 sec", "To brew"],
    ],
  },
  "lor-ultimo-13-capsules": {
    description:
      "Aluminium capsules with roast intensity 13, a full body, complex and balanced flavours and chocolatey notes. Suited to espresso and ristretto in Nespresso® Original machines. Pack of 10 capsules, 5.2 g per capsule.",
  },
  "jacobs-crema-traditional": {
    description:
      "A rich, balanced blend with a deep roast that gives a full body and bold flavour, alongside a gentle, pleasant acidity for a smooth, elegant and precise cup.",
  },
  "jacobs-crema-harmonia": {
    description:
      "A harmonious, balanced blend with a soft taste and a pleasant crema — an elegant, easy-drinking coffee that is a perfect match for espresso and cappuccino.",
  },
  "jacobs-royal": {
    description:
      "A classic, balanced blend with a pleasant taste, a soft body and a refined acidity. A steady, approachable coffee that makes every cup enjoyable.",
  },
  "lor-espresso-harmonieux": {
    cardName: "L’OR Espresso Harmonieux",
    description:
      "A harmonious medium-roast espresso combining a smooth body, precise balance and an elegant taste that lasts through every sip. An ideal choice for anyone looking for a quality, pleasant and refined coffee — never heavy or overpowering.",
  },
  "lor-espresso-vibrant": {
    description:
      "A French coffee blend with a traditional Italian roast, a bold body, depth of flavour and a rich presence in every sip. A powerful, precise coffee built for a full, smooth and uncompromising espresso and cappuccino experience.",
  },
  "cafitesse-strong-roast": {
    description:
      "A concentrated liquid coffee with a strong roast, made from real coffee and sealed immediately after brewing to keep it fresh and consistent. A rich, full-bodied profile with smoky, woody notes and a touch of spice, at intensity 9. Ideal for businesses serving large volumes that want a strong, fast cup — and for milk drinks such as cappuccino and latte.",
  },
};

// Spec labels and units are generated in Hebrew (see specs() in data.ts); these map them to English.
const specWords: [RegExp, string][] = [
  [/^רוחב$/, "Width"],
  [/^עומק$/, "Depth"],
  [/^גובה$/, "Height"],
  [/^הספק$/, "Power"],
  [/^מתח$/, "Voltage"],
  [/^חיבור חשמל$/, "Power connection"],
  [/^לחץ משאבה$/, "Pump pressure"],
  [/^מכל מים$/, "Water tank"],
  [/^משקל$/, "Weight"],
  [/^ייעוד$/, "Designed for"],
  [/^מבנה$/, "Build"],
  [/^התקנה$/, "Installation"],
  [/^הפעלה בשבת$/, "Shabbat operation"],
  [/ ס״מ$/, " cm"],
  [/ ק״ג$/, " kg"],
  [/ ליטר$/, " L"],
  [/ בר$/, " bar"],
  [/^חד פאזי$/, "Single-phase"],
  [/^תלת פאזי$/, "Three-phase"],
  [/^חד \/ תלת פאזי$/, "Single / three-phase"],
  [/^בתי מלון ומתחמי אירוח$/, "Hotels and hospitality venues"],
  [/^עמדת קפה ומים חמים$/, "Coffee and hot-water station"],
  [/^בהתאמה לתשתיות המקום$/, "Tailored to the site's infrastructure"],
  [/^לפי הנחיות גורם הכשרות$/, "Per the kashrut supervisor's guidance"],
];
const translateSpec = (value: string) => specWords.reduce((text, [from, to]) => text.replace(from, to), value);

/** A product in the given language. */
export function localizeProduct(p: Product, locale: Locale): Product {
  if (locale === "he") return p;
  const copy = productsEn[p.slug] ?? {};
  return {
    ...p,
    ...copy,
    specs: p.specs?.map(([label, value]) => [translateSpec(label), translateSpec(value)]),
  };
}

export const productsByLocale = (locale: Locale) => products.map((p) => localizeProduct(p, locale));

const beansHeroEn = {
  title: "Premium coffee beans for every cup in your business",
  text: "Bean blends, capsules and liquid coffee from the world's leading coffee brands, chosen to give your employees, customers and guests a rich, consistent coffee in every cup.",
};

const catalogHeroEn = {
  title: "Professional coffee machines that work for you",
  text: "From busy offices to cafés and luxury hotels. A complete professional coffee solution with advanced machines, premium beans, and round-the-clock service and technical support.",
  filtersTitle: "Choose a coffee machine for your business from a wide range of leading brands",
  filtersText: "Choose a coffee machine for your business from a wide range of leading brands",
};

const defaultContactEn = {
  title: "Let's find the right coffee solution for your business.",
  text: "Leave your details and we'll get to know your business and build a professional coffee solution tailored to your needs, your operation and your budget.",
};

const moreThanCoffeeEn = {
  title: "Much more than coffee.",
  text: "A good coffee solution makes a difference well beyond the coffee break. It improves the employee experience, helps you host customers well, and leaves the day-to-day hassle in our hands.",
};

const machineFilterLabelsEn: Record<string, string> = {
  all: "All machines",
  professional: "Professional machines",
  capsule: "Capsule machines",
  automatic: "Automatic machines",
  sabbath: "Shabbat / filter machines",
};

type Solution = (typeof solutionsHe)[Audience];
const solutionsEn: Record<Audience, Partial<Solution>> = {
  office: {
    metaTitle: "Coffee solutions for offices",
    heroTitle: "Everything an office needs. One supplier.",
    heroText:
      "A good coffee solution makes a difference well beyond the coffee break. It improves the employee experience, helps you host customers well, and leaves the day-to-day hassle in our hands.",
    features: ["Ongoing service and maintenance", "Organised supply of coffee and consumables", "A tailored solution"],
    machinesTitle: "The right machine starts with knowing your business.",
    machinesText: [
      "Every office has its own habits, team size and pace of work.",
      "That's why we tailor the coffee solution to your needs, so you get a system that serves you for years and fits naturally into your daily routine.",
    ],
    coffeeTitle: "Quality coffee starts with the right choice.",
    coffeeText:
      "Coffee Flow works with the coffee brands of JDE Professional and offers a range of blends and supplies chosen to deliver consistent taste, high quality and a coffee experience that suits every employee and every guest.",
    servicesTitle: "We're here long after installation",
    servicesText: [
      "A good coffee solution doesn't end the day the machine arrives at the office.",
      "We support our customers with professional service, ongoing maintenance, supply of coffee and consumables, and a fast response — so you can stay focused on your work while we take care of everything else.",
    ],
    contactTitle: "Let's find the right coffee solution for your office too.",
    contactText:
      "Leave your details and one of our experts will get back to you to understand your office's needs and tailor a professional coffee solution for you, with no obligation.",
  },
  cafe: {
    metaTitle: "Coffee solutions for cafés and restaurants",
    heroTitle: "A coffee solution that keeps pace with your business.",
    heroText:
      "Coffee Flow provides professional coffee solutions for cafés and restaurants — with advanced equipment, quality coffee beans, professional service and ongoing support, so you can serve excellent coffee in every cup, at every hour.",
    features: [
      "Consistent quality in every serve",
      "Built for intensive use",
      "Service that understands hospitality",
      "Organised supply of coffee and consumables",
    ],
    machinesTitle: "Professional equipment for professional work",
    machinesText: [
      "The right coffee solution starts with the right equipment. We offer a range of professional machines suited to different volumes and types of business, so you can give your customers a quality, consistent coffee experience.",
    ],
    coffeeTitle: "Coffee that meets your standards.",
    coffeeText:
      "Quality coffee starts with choosing the right beans. Coffee Flow offers a range of blends from JDE Professional, chosen to deliver consistent quality, rich flavours and performance suited to restaurants and hospitality.",
    servicesTitle: "When every cup shapes the customer experience, we're by your side.",
    servicesText: [
      "In restaurants and hospitality, coffee is an essential part of the overall experience, so it has to deliver consistent quality and keep running even at peak times. We support you with installation, training, technical service, ongoing maintenance and supply of coffee and consumables — so you can keep focusing on what you do best: giving guests an excellent experience.",
    ],
    contactTitle: "Let's find the right coffee solution for your business.",
    contactText:
      "Leave your details and one of our experts will get back to you to learn about your operation, understand your needs, and tailor a professional coffee solution for you, with no obligation.",
  },
  hotel: {
    metaTitle: "Coffee solutions for hotels",
    heroTitle: "Great hospitality starts with the small details.",
    heroText:
      "Coffee Flow provides professional coffee solutions for hotels and hospitality venues, with advanced equipment, quality coffee beans, professional service, ongoing support and training programmes for barista teams. We also offer coffee sticks for guest rooms and a Shabbat machine approved by the Zomet Institute — so every guest enjoys a coffee experience that matches the standard of your hospitality, on Shabbat too.",
    features: [
      "A quality guest experience",
      "A solution for every serving point",
      "Reliable equipment for continuous operation",
      "Ongoing supply of coffee and consumables",
    ],
    machinesTitle: "Coffee solutions for every hospitality setting.",
    machinesText: [
      "Every hotel has different needs, from the number of guests to the style of service in each area. We match the right coffee solution to every service point, so the equipment blends naturally into the guest experience and the hotel's operational requirements.",
    ],
    coffeeTitle: "A taste that stays long after the stay.",
    coffeeText:
      "A quality coffee experience starts with the ingredients. Coffee Flow offers a range of blends from JDE Professional, chosen to ensure consistent quality, rich flavours and a coffee experience that meets the standards of the hospitality world.",
    servicesTitle: "A coffee solution and service at the level of your hospitality.",
    servicesText: [
      "In hotels, every detail shapes the guest experience — coffee included. We support you well beyond installing the equipment — from tailoring the solution, through ongoing maintenance, to supply of coffee and consumables and professional service — to keep operations running smoothly and let you offer guests hospitality of the highest standard.",
    ],
    contactTitle: "Let's find the right coffee solution for your hotel too.",
    contactText:
      "Leave your details and one of our experts will get back to you to understand your hotel's needs and tailor a professional coffee solution for you, based on your volume, style of hospitality and service standard.",
  },
};

/** Page copy for a locale. */
export function pageCopy(locale: Locale) {
  const en = locale === "en";
  return {
    beansHero: en ? beansHeroEn : beansHeroHe,
    catalogHero: en ? catalogHeroEn : catalogHeroHe,
    defaultContact: en ? defaultContactEn : defaultContactHe,
    moreThanCoffee: en ? moreThanCoffeeEn : moreThanCoffeeHe,
    narrativeTitle: en ? "Technological innovation at the service of coffee" : narrativeTitleHe,
    machineFilters: machineFiltersHe.map((f) => (en ? { ...f, label: machineFilterLabelsEn[f.value] } : f)),
    solution: (audience: Audience): Solution =>
      en ? { ...solutionsHe[audience], ...solutionsEn[audience] } : solutionsHe[audience],
  };
}
