import type { Metadata } from "next";
import ThankYouView from "@/views/thank-you";

// Reached after a lead is sent. Not linked, not in the sitemap, never indexed.
export const metadata: Metadata = {
  title: "תודה",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouView locale="he" />;
}
