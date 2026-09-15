import type { Metadata, Viewport } from "next";
import "@fontsource/heebo/hebrew-400.css";
import "@fontsource/heebo/hebrew-500.css";
import "@fontsource/heebo/hebrew-600.css";
import "@fontsource/heebo/latin-400.css";
import "@fontsource/heebo/latin-500.css";
import "@fontsource/heebo/latin-600.css";
// Temporary stand-in for Fb ElectronCon (see app/site.css).
import "@fontsource/karantina/hebrew-400.css";
import "@fontsource/karantina/hebrew-700.css";
import "@fontsource/karantina/latin-400.css";
import "@fontsource/karantina/latin-700.css";
import "./site.css";

// Absolute URLs for share images: uses the Vercel production domain (or a custom domain once connected).
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://coffee-flow-website.vercel.app";

const title = "Coffee Flow | פתרונות קפה לעסקים";
const description =
  "Coffee Flow מספקת פתרונות קפה מלאים לעסקים – החל מהתאמת המכונה וחומרי הגלם ועד לשירות, תחזוקה ואספקה שוטפת.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Coffee Flow",
  },
  description,
  applicationName: "Coffee Flow",
  appleWebApp: {
    capable: true,
    title: "Coffee Flow",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Coffee Flow",
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0a07",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Coffee Flow",
  url: siteUrl,
  logo: `${siteUrl}/icons/logo-512.png`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
