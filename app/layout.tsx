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

export const metadata: Metadata = {
  title: {
    default: "Coffee Flow | פתרונות קפה לעסקים",
    template: "%s | Coffee Flow",
  },
  description:
    "Coffee Flow מספקת פתרונות קפה מלאים לעסקים – החל מהתאמת המכונה וחומרי הגלם ועד לשירות, תחזוקה ואספקה שוטפת.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0a07",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
