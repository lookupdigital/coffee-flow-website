import { notFound } from "next/navigation";
import { localizeProduct } from "@/lib/data-en";
import { enMetadata } from "@/lib/metadata-en";
import ProductView, { getMachine, machines } from "@/views/product";

export const dynamicParams = false;

export function generateStaticParams() {
  return machines.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getMachine((await params).slug);
  if (!p) return {};
  const en = localizeProduct(p, "en");
  return enMetadata(`/products/${p.slug}`, en.name, en.description ?? "");
}

export default async function ProductPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const p = getMachine((await params).slug);
  if (!p) notFound();
  return <ProductView product={p} locale="en" />;
}
