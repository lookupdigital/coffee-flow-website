import type { ReactNode } from "react";
import { Footer, Header } from "@/components/ui";
import type { SiteSettings } from "@/lookup/settings-model";

/**
 * Coffee Flow header + main + footer, used by infrastructure routes that render public UI
 * (admin draft preview, 404 pages). The site pages render the header and footer themselves.
 */
export default function SiteChrome({ children }: { settings?: SiteSettings; children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
