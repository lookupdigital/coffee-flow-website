// Meta (Facebook) Pixel, fed from the same tracking layer as GTM (see events.ts → track()).
// Loaded directly by the site rather than through the GTM container, so it must NOT also be added as a GTM tag —
// that would double-count every PageView, Lead and Contact.
//
// Event mapping (dataLayer → Meta standard events):
//   page_view                               → PageView
//   generate_lead                           → Lead     (eventID = event_id, ready for Conversions API dedup)
//   whatsapp_click / phone_click / email_click → Contact
//
// Consent follows the site's cookie choice (ad_storage): until the visitor grants, the pixel is held with
// fbq("consent", "revoke") and sends nothing.

import type { ConsentValue } from "@/lookup/analytics/events";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: Fbq;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type MetaEvent = { name: "PageView" | "Lead" | "Contact"; params?: Record<string, string>; eventId?: string };

const PIXEL_ID_PATTERN = /^[0-9]{5,20}$/;

let initializedPixelId: string | null = null;

/** Maps a sanitized dataLayer event to the Meta standard event it represents, or null when Meta should not see it. */
export function toMetaEvent(event: Record<string, string>): MetaEvent | null {
  switch (event.event) {
    case "page_view":
      return { name: "PageView" };
    case "generate_lead": {
      const params: Record<string, string> = {};
      if (event.form_name) params.content_name = event.form_name;
      if (event.lead_type) params.content_category = event.lead_type;
      return { name: "Lead", params, ...(event.event_id ? { eventId: event.event_id } : {}) };
    }
    case "whatsapp_click":
    case "phone_click":
    case "email_click": {
      const params: Record<string, string> = { content_name: event.event.replace("_click", "") };
      if (event.link_location) params.content_category = event.link_location;
      return { name: "Contact", params };
    }
    default:
      return null;
  }
}

/** Meta's official base snippet, minus the automatic init/PageView (those are driven by the site's own events). */
function loadPixelScript() {
  if (window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq ??= fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  if (first?.parentNode) first.parentNode.insertBefore(script, first);
  else document.head.appendChild(script);
}

/** Loads and initializes the pixel once per page load. Safe to call repeatedly. */
export function initMetaPixel(pixelId: string, consent: ConsentValue) {
  if (typeof window === "undefined" || initializedPixelId || !PIXEL_ID_PATTERN.test(pixelId)) return;
  loadPixelScript();
  window.fbq!("consent", consent === "granted" ? "grant" : "revoke");
  window.fbq!("init", pixelId);
  initializedPixelId = pixelId;
}

/** Applies a cookie-banner choice to the pixel. */
export function setMetaConsent(consent: ConsentValue) {
  if (typeof window === "undefined" || !initializedPixelId || !window.fbq) return;
  window.fbq("consent", consent === "granted" ? "grant" : "revoke");
}

/** Forwards a sanitized dataLayer event to Meta when the pixel is active and the event has a Meta equivalent. */
export function forwardToMeta(event: Record<string, string>) {
  if (typeof window === "undefined" || !initializedPixelId || !window.fbq) return;
  const meta = toMetaEvent(event);
  if (!meta) return;
  if (meta.eventId) window.fbq("track", meta.name, meta.params ?? {}, { eventID: meta.eventId });
  else if (meta.params) window.fbq("track", meta.name, meta.params);
  else window.fbq("track", meta.name);
}
