import type { Metadata, Viewport } from "next";
import "@fontsource/heebo/hebrew-400.css";
import "@fontsource/heebo/hebrew-500.css";
import "@fontsource/heebo/hebrew-600.css";
import "@fontsource/heebo/latin-400.css";
import "@fontsource/heebo/latin-500.css";
import "@fontsource/heebo/latin-600.css";
// Temporary stand-in for Fb ElectronCon (see src/app/(site)/site.css).
import "@fontsource/karantina/hebrew-400.css";
import "@fontsource/karantina/hebrew-700.css";
import "@fontsource/karantina/latin-400.css";
import "@fontsource/karantina/latin-700.css";
import Analytics from "@/lookup/analytics/Analytics";
import { isGtmAllowed } from "@/lookup/runtime";
import { getSiteSettings, isIndexable } from "@/lookup/settings";
import { siteConfig } from "@/site.config";

/**
 * Document shell for the whole site, including the admin. The visual design lives in the (site) group, which
 * loads site.css; the admin loads its own stylesheet, so the two never affect each other.
 * Title, description, canonical host and indexing come from Admin → Site settings and Admin → Launch.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const indexable = isIndexable(settings);
  return {
    metadataBase: new URL(settings.siteUrl),
    applicationName: settings.siteName || undefined,
    title: {
      default: settings.defaultMetaTitle || settings.siteName,
      template: settings.siteName ? `%s | ${settings.siteName}` : "%s",
    },
    description: settings.defaultMetaDescription || undefined,
    appleWebApp: { capable: true, title: settings.siteName || undefined, statusBarStyle: "black-translucent" },
    robots: { index: indexable, follow: indexable },
    openGraph: { type: "website", locale: siteConfig.locale.ogLocale, siteName: settings.siteName || undefined },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0a07",
};

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]{4,12}$/;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const { gtmId, ga4Id, metaPixelId, tiktokPixelId, linkedinPartnerId } = settings.tracking;
  // GTM loads only in the production environment (or with LOOKUP_GTM_DEBUG=1), never locally by accident.
  const loadGtm = isGtmAllowed() && GTM_ID_PATTERN.test(gtmId);

  return (
    <html lang={siteConfig.locale.htmlLang} dir={siteConfig.locale.dir} data-scroll-behavior="smooth">
      <body>
        {children}
        <Analytics
          gtmId={loadGtm ? gtmId : null}
          consentDefault={settings.consentDefault}
          trackingConfig={{
            ga4_measurement_id: ga4Id,
            meta_pixel_id: metaPixelId,
            tiktok_pixel_id: tiktokPixelId,
            linkedin_partner_id: linkedinPartnerId,
          }}
        />
      </body>
    </html>
  );
}
