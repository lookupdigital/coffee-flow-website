import type { ReactNode } from "react";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieBanner from "@/components/CookieBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FloatingWhatsApp } from "@/components/interactive";
import { JsonLd, siteSchemas } from "@/lookup/schema";
import { getSiteSettings } from "@/lookup/settings";
import { siteConfig } from "@/site.config";
import "./site.css";

/** Public website shell: the Coffee Flow stylesheet, business structured data and the floating WhatsApp button. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <JsonLd data={siteSchemas(settings, siteConfig)} />
      <ScrollToTop />
      {children}
      {/* Pinned to the bottom-right corner on every public page. */}
      {/* In a landmark so screen-reader users can find it (WCAG 1.3.1). */}
      <aside aria-label="יצירת קשר מהירה">
        <FloatingWhatsApp />
      </aside>
      {/* Accessibility toolbar, bottom-left (WhatsApp is bottom-right). */}
      <AccessibilityWidget />
      {/* Consent Mode default is "denied" (Admin → Site settings): ask before measuring. */}
      {settings.consentDefault === "denied" && <CookieBanner />}
    </>
  );
}
