"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Every newly opened page starts at its top. Next.js only scrolls when it judges the new
// page's top to be off-screen, so a page reached from far down a long list (the catalog)
// could open part-way down. Back/forward keeps the browser's restored position, and links
// to an anchor (#contact) keep scrolling to that anchor.
export function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
