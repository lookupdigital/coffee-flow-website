import { AccessibilityEn } from "@/views/legal-en";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata(
  "/accessibility",
  "Accessibility statement",
  "How the Coffee Flow website is made accessible to people with disabilities.",
);

export default function AccessibilityPageEn() {
  return <AccessibilityEn />;
}
