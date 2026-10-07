import { PrivacyEn } from "@/views/legal-en";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata("/privacy", "Privacy policy", "The Coffee Flow website cookie and privacy policy.");

export default function PrivacyPageEn() {
  return <PrivacyEn />;
}
