import { notFound } from "next/navigation";
import ProductView, { getMachine, machines } from "@/views/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return machines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getMachine((await params).slug);
  return { title: p?.name ?? "מוצר", description: p?.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = getMachine((await params).slug);
  if (!p) notFound();
  return <ProductView product={p} locale="he" />;
}
