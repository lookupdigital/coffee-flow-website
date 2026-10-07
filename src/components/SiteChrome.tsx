import type { ReactNode } from "react";
import { Footer, Header } from "@/components/ui";
import type { SiteSettings } from "@/lookup/settings-model";
// Infrastructure routes (e.g. the admin draft preview) live outside the (site) group, so they don't get
// the site stylesheet from its layout. Load it here so previews match the public pages.
import "@/app/(site)/site.css";

/**
 * Coffee Flow header + main + footer, used by infrastructure routes that render public UI
 * (admin draft preview, 404 pages). The site pages render the header and footer themselves.
 */
export default function SiteChrome({ children }: { settings?: SiteSettings; children: ReactNode }) {
  return (
    <div
      style={{
        flex: 1,
        background: "var(--bg)",
        color: "var(--beige)",
        fontFamily: "var(--font-sans)",
        fontSize: 16,
        lineHeight: "26px",
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
