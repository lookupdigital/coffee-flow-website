import type { Metadata } from "next";
import { EN_PREFIX } from "./i18n";

/** Metadata for an English page: English title/description, canonical /en URL and hreflang links to both languages. */
export function enMetadata(path: string, title: string, description: string): Metadata {
  const en = path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
  return {
    // The home title already carries the brand; the other pages get " | Coffee Flow" from the root layout.
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: en, languages: { he: path, en, "x-default": path } },
    openGraph: { title, description, url: en, locale: "en_US", siteName: "Coffee Flow", type: "website" },
  };
}
