import { notFound } from "next/navigation";
import { Audience, solutions } from "@/lib/data";
import SolutionView from "@/views/solution";

export function generateStaticParams() {
  return Object.keys(solutions).map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  return { title: solutions[audience as Audience]?.metaTitle ?? "פתרונות קפה" };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!(audience in solutions)) notFound();
  return <SolutionView audience={audience as Audience} locale="he" />;
}
