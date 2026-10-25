"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeOf, localePath } from "@/lib/i18n";

/**
 * Accessibility toolbar (open-nagish, MIT, self-hosted from npm): font size, contrast, readable font, link
 * highlighting, stop animations, reading guide and more. It complements — never replaces — the site's own
 * WCAG / IS 5568 conformance. Its "statement" button opens our accessibility statement, and its "compliance
 * badge" item is hidden: the badge would claim a certification the site does not have.
 */
export default function AccessibilityWidget() {
  const pathname = usePathname();
  const locale = localeOf(pathname);

  useEffect(() => {
    let widget: { destroy: () => void } | null = null;
    let cancelled = false;
    const options = {
      lang: locale,
      position: "bottom-left" as const,
      mobileBottomOffset: 0,
      statementUrl: localePath(locale, "/accessibility"),
    };
    // The module initializes itself on import, so the options are set first; init() then re-creates it
    // (it destroys the previous instance) and returns a handle we can clean up.
    (window as unknown as { OpenNagishConfig?: typeof options }).OpenNagishConfig = options;
    import("open-nagish").then(({ init }) => {
      if (cancelled) return;
      widget = init(options);
      const root = document.getElementById("opennagish-widget")?.shadowRoot;
      if (root) {
        const style = document.createElement("style");
        style.textContent = '[data-action="complianceBadge"]{display:none!important}';
        root.append(style);
      }
    });
    return () => {
      cancelled = true;
      widget?.destroy();
    };
  }, [locale]);

  return null;
}
