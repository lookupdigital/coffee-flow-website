import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SurveyForm from "@/components/SurveyForm";
import { findSurvey, surveys } from "@/lib/surveys";

// Reached only by QR code: not linked from the site, not in the sitemap, never indexed.
export const dynamicParams = false;

export function generateStaticParams() {
  return surveys.map((survey) => ({ slug: survey.slug }));
}

export async function generateMetadata({ params }: PageProps<"/survey/[slug]">): Promise<Metadata> {
  const survey = findSurvey((await params).slug);
  return {
    title: { absolute: survey ? `שאלון שביעות רצון | Coffee Flow × ${survey.customer}` : "Coffee Flow" },
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function SurveyPage({ params }: PageProps<"/survey/[slug]">) {
  const survey = findSurvey((await params).slug);
  if (!survey) notFound();

  return (
    <main className="survey-page">
      <div className="survey-logos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/6373b.webp" alt="Coffee Flow" width={200} height={85} className="survey-logo-cf" />
        <span className="survey-logos-divider" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={survey.logo.src}
          alt={survey.customer}
          width={survey.logo.width}
          height={survey.logo.height}
          className="survey-logo-partner"
        />
      </div>
      <header className="survey-header">
        <h1 className="h2">איך היה הקפה?</h1>
        <p className="subheading">נשמח לשמוע מה אתם חושבים. השאלון אנונימי ולוקח פחות מדקה.</p>
      </header>
      <SurveyForm survey={survey.slug} />
    </main>
  );
}
