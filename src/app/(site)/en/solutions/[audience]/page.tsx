import { notFound } from "next/navigation";
import { Audience, solutions } from "@/lib/data";
import { pageCopy } from "@/lib/data-en";
import { enMetadata } from "@/lib/metadata-en";
import SolutionView from "@/views/solution";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(solutions).map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  if (!(audience in solutions)) return {};
  const s = pageCopy("en").solution(audience as Audience);
  return enMetadata(`/solutions/${audience}`, s.metaTitle, s.heroText);
}

export default async function SolutionPageEn({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  if (!(audience in solutions)) notFound();
  return <SolutionView audience={audience as Audience} locale="en" />;
}
