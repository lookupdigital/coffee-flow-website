// Customer satisfaction surveys reached only by QR code (/survey/<slug>). They are not linked from the site,
// not in the sitemap and marked noindex. Answers are stored in public.survey_responses and shown in
// Admin → Surveys. To add a survey for another customer, add an entry here (and its logo under public/images).

export type Survey = {
  slug: string;
  /** Customer name, used in the page title and the admin. */
  customer: string;
  /** Customer logo shown next to the Coffee Flow logo (transparent background; the page is dark). */
  logo: { src: string; width: number; height: number };
};

export const surveys: Survey[] = [
  {
    slug: "elbit",
    customer: "אלביט",
    logo: { src: "/images/partners/elbit.webp", width: 640, height: 229 },
  },
];

export function findSurvey(slug: string): Survey | undefined {
  return surveys.find((survey) => survey.slug === slug);
}

export const surveyQuestions = [
  { name: "coffee_taste", label: "דרגו את טעם הקפה" },
  { name: "machine_experience", label: "דרגו את חוויית השימוש במכונת הקפה" },
] as const;

export type SurveyQuestionName = (typeof surveyQuestions)[number]["name"];

export const SURVEY_COMMENTS_MAX = 2000;
