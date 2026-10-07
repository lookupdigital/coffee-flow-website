import BeansView from "@/views/beans";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata(
  "/beans",
  "Our coffee",
  "Coffee bean blends, capsules and liquid coffee from JDE Professional brands — Jacobs, L’OR and Douwe Egberts — for businesses.",
);

export default function BeansEn() {
  return <BeansView locale="en" />;
}
