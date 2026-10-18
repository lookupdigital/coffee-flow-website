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

/**
 * Coffee Flow's Google Tag Manager container. Installed directly in the document (first thing in <head>, noscript
 * first thing in <body>) per Google's instructions, instead of the Admin → Site settings GTM field.
 */
const GTM_CONTAINER_ID = "GTM-TFLPS3HC";

/**
 * Runs before GTM: Consent Mode default (from Admin → Site settings), then the visitor's saved banner choice, then
 * the official GTM snippet. Skipped on the admin. Must stay in sync with initializeConsent() in analytics/events.ts.
 */
function gtmHeadScript(consentDefault: string) {
  const d = JSON.stringify(consentDefault);
  return `(function(w,d){if(w.location.pathname==="/admin"||w.location.pathname.indexOf("/admin/")===0)return;
w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}w.gtag=w.gtag||gtag;
gtag("consent","default",{ad_storage:${d},ad_user_data:${d},ad_personalization:${d},analytics_storage:${d},functionality_storage:"granted",security_storage:"granted",wait_for_update:500});
try{var c=w.localStorage.getItem("cf_cookie_consent");if(c==="granted"||c==="denied")gtag("consent","update",{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c});}catch(e){}
w.__lookupConsentReady=true;w.__lookupGtmLoaded=true;})(window,document);
(function(w,d,s,l,i){if(w.location.pathname==="/admin"||w.location.pathname.indexOf("/admin/")===0)return;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(GTM_CONTAINER_ID)});`;
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const { ga4Id, metaPixelId, tiktokPixelId, linkedinPartnerId } = settings.tracking;
  // GTM loads only in the production environment (or with LOOKUP_GTM_DEBUG=1), never locally by accident.
  const loadGtm = isGtmAllowed();

  return (
    <html lang={siteConfig.locale.htmlLang} dir={siteConfig.locale.dir} data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager: kept as the first script in <head>. */}
        {loadGtm && <script id="gtm-head" dangerouslySetInnerHTML={{ __html: gtmHeadScript(settings.consentDefault) }} />}
      </head>
      <body>
        {/* Google Tag Manager (noscript): first element in <body>. */}
        {loadGtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <Analytics
          gtmId={null}
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
