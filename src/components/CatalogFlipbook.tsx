"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PageFlip } from "page-flip";

type Props = {
  /** Page image URLs in reading order (Hebrew: page 1 is the front cover). */
  pages: string[];
  /** Page size in px, used for the aspect ratio. */
  width: number;
  height: number;
  title: string;
};

/**
 * A page-turning catalog. page-flip only turns pages left-to-right, so for a Hebrew (right-to-left) book the
 * pages are handed over in reverse and the book opens on its last index: "forward" in Hebrew is flipPrev, and the
 * pages turn from left to right like a printed Hebrew book.
 */
const MAX_ZOOM = 4;

export default function CatalogFlipbook({ pages, width, height, title }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const total = pages.length;
  const reversed = [...pages].reverse();
  const [index, setIndex] = useState(total - 1);
  const [landscape, setLandscape] = useState(true);
  const [ready, setReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const zoom = useRef({ s: 1, x: 0, y: 0 });
  const [zoomed, setZoomed] = useState(false);

  /** Writes the zoom transform, keeping the zoomed page covering its box (no empty gaps at the edges). */
  const applyZoom = useCallback((s: number, x: number, y: number, animate = false) => {
    const el = zoomRef.current;
    if (!el) return;
    s = Math.min(MAX_ZOOM, Math.max(1, s));
    if (s < 1.02) s = 1;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    x = Math.min(0, Math.max(w - s * w, x));
    y = Math.min(0, Math.max(h - s * h, y));
    if (s === 1) x = y = 0;
    zoom.current = { s, x, y };
    el.style.transition = animate ? "transform 0.25s ease" : "none";
    el.style.transform = s === 1 ? "" : `translate(${x}px, ${y}px) scale(${s})`;
    setZoomed(s > 1);
  }, []);

  const resetZoom = useCallback(() => applyZoom(1, 0, 0, true), [applyZoom]);

  useEffect(() => {
    const element = bookRef.current;
    if (!element) return;
    let cancelled = false;
    let instance: PageFlip | null = null;

    import("page-flip").then(({ PageFlip }) => {
      if (cancelled || !element) return;
      instance = new PageFlip(element, {
        width,
        height,
        size: "stretch",
        minWidth: 260,
        maxWidth: 620,
        minHeight: Math.round((260 * height) / width),
        maxHeight: Math.round((620 * height) / width),
        startPage: total - 1,
        showCover: true,
        usePortrait: true,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        flippingTime: 800,
        mobileScrollSupport: true,
      });
      instance.on<number>("flip", (e) => {
        setIndex(e.data);
        resetZoom();
      });
      instance.on<string>("changeOrientation", (e) => {
        setLandscape(e.data === "landscape");
        resetZoom();
      });
      instance.on("init", () => {
        if (!instance) return;
        setLandscape(instance.getOrientation() === "landscape");
        setIndex(instance.getCurrentPageIndex());
        setReady(true);
      });
      instance.loadFromHTML(element.querySelectorAll<HTMLElement>(".flipbook-page"));
      flipRef.current = instance;
    });

    return () => {
      cancelled = true;
      flipRef.current = null;
      instance?.destroy();
    };
    // The page list is static for the page's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pinch-to-zoom (two fingers), pan while zoomed, double-tap / trackpad pinch / ctrl+wheel. While a pinch is
  // under way or the page is zoomed in, touch and mouse events are stopped before page-flip sees them, so dragging
  // moves the zoomed page instead of turning it.
  useEffect(() => {
    const viewport = viewportRef.current;
    const el = zoomRef.current;
    if (!viewport || !el) return;

    // Untransformed top-left of the zoomed element on screen (transform-origin is 0 0).
    const origin = () => {
      const r = el.getBoundingClientRect();
      return { left: r.left - zoom.current.x, top: r.top - zoom.current.y };
    };
    const zoomAt = (s: number, clientX: number, clientY: number, from = zoom.current, animate = false) => {
      const o = origin();
      const px = (clientX - o.left - from.x) / from.s;
      const py = (clientY - o.top - from.y) / from.s;
      applyZoom(s, clientX - o.left - s * px, clientY - o.top - s * py, animate);
    };

    // Cancels a page turn page-flip may have started from the first finger of a pinch.
    const cancelFlip = () => {
      const f = flipRef.current as unknown as {
        isUserTouch?: boolean;
        ui?: { touchPoint: unknown };
        flipController?: { stopMove(): void };
        getState?(): string;
      } | null;
      if (!f) return;
      f.isUserTouch = false;
      if (f.ui) f.ui.touchPoint = null;
      if (f.getState && f.getState() !== "read") f.flipController?.stopMove();
    };

    let gesture: "none" | "pinch" | "pan" = "none";
    let start = { d: 1, mx: 0, my: 0, s: 1, x: 0, y: 0 };
    let lastTap = 0;

    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const mid = (t: TouchList) => ({ x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 });

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length >= 2) {
        e.stopPropagation();
        e.preventDefault();
        cancelFlip();
        const m = mid(e.touches);
        gesture = "pinch";
        start = { d: dist(e.touches), mx: m.x, my: m.y, ...zoom.current };
      } else if (zoom.current.s > 1) {
        e.stopPropagation();
        const t = e.touches[0];
        const now = Date.now();
        if (now - lastTap < 300) {
          // Double-tap while zoomed: back to the full page.
          lastTap = 0;
          gesture = "none";
          resetZoom();
          return;
        }
        lastTap = now;
        gesture = "pan";
        start = { d: 1, mx: t.clientX, my: t.clientY, ...zoom.current };
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (gesture === "none") return;
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
      if (gesture === "pinch" && e.touches.length >= 2) {
        const m = mid(e.touches);
        const s = Math.min(MAX_ZOOM, Math.max(1, (start.s * dist(e.touches)) / start.d));
        // Keep the point that was under the fingers under them, and follow the fingers as they move.
        const o = origin();
        const px = (start.mx - o.left - start.x) / start.s;
        const py = (start.my - o.top - start.y) / start.s;
        applyZoom(s, m.x - o.left - s * px, m.y - o.top - s * py);
      } else if (gesture === "pan" && e.touches.length === 1) {
        const t = e.touches[0];
        applyZoom(start.s, start.x + t.clientX - start.mx, start.y + t.clientY - start.my);
      }
    }

    function onTouchEnd(e: TouchEvent) {
      if (gesture === "none") return;
      e.stopPropagation();
      if (e.touches.length === 1 && zoom.current.s > 1) {
        // One finger lifted from a pinch: carry on panning with the other.
        const t = e.touches[0];
        gesture = "pan";
        start = { d: 1, mx: t.clientX, my: t.clientY, ...zoom.current };
      } else if (e.touches.length === 0) {
        gesture = "none";
      }
    }

    // Desktop: trackpad pinch and ctrl+wheel zoom; dragging pans while zoomed; double-click resets.
    function onWheel(e: WheelEvent) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      zoomAt(zoom.current.s * Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
    }
    let drag: { mx: number; my: number; x: number; y: number } | null = null;
    function onMouseDown(e: MouseEvent) {
      if (zoom.current.s <= 1) return;
      e.stopPropagation();
      e.preventDefault();
      drag = { mx: e.clientX, my: e.clientY, x: zoom.current.x, y: zoom.current.y };
    }
    function onMouseMove(e: MouseEvent) {
      if (!drag) return;
      e.stopPropagation();
      applyZoom(zoom.current.s, drag.x + e.clientX - drag.mx, drag.y + e.clientY - drag.my);
    }
    function onMouseUp(e: MouseEvent) {
      if (!drag) return;
      e.stopPropagation();
      drag = null;
    }
    function onDoubleClick(e: MouseEvent) {
      if (zoom.current.s > 1) resetZoom();
      else zoomAt(2, e.clientX, e.clientY, zoom.current, true);
    }

    const active = { capture: true, passive: false } as const;
    viewport.addEventListener("touchstart", onTouchStart, active);
    viewport.addEventListener("touchmove", onTouchMove, active);
    viewport.addEventListener("touchend", onTouchEnd, active);
    viewport.addEventListener("touchcancel", onTouchEnd, active);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("mousedown", onMouseDown, true);
    viewport.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("mousemove", onMouseMove, true);
    window.addEventListener("mouseup", onMouseUp, true);
    window.addEventListener("resize", resetZoom);
    return () => {
      viewport.removeEventListener("touchstart", onTouchStart, active);
      viewport.removeEventListener("touchmove", onTouchMove, active);
      viewport.removeEventListener("touchend", onTouchEnd, active);
      viewport.removeEventListener("touchcancel", onTouchEnd, active);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("mousedown", onMouseDown, true);
      viewport.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("mousemove", onMouseMove, true);
      window.removeEventListener("mouseup", onMouseUp, true);
      window.removeEventListener("resize", resetZoom);
    };
  }, [applyZoom, resetZoom]);

  const forward = useCallback(() => flipRef.current?.flipPrev(), []);
  const back = useCallback(() => flipRef.current?.flipNext(), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") forward();
      if (e.key === "ArrowRight") back();
      if (e.key === "Escape") resetZoom();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [forward, back, resetZoom]);

  // Hebrew page number of the page(s) on screen.
  const page = total - index;
  const atStart = index >= total - 1;
  const atEnd = index <= 0;
  let label = `עמוד ${page} מתוך ${total}`;
  if (landscape && !atStart && !atEnd) {
    // A spread shows two pages; the right-hand one comes first in Hebrew.
    const first = page % 2 === 0 ? page : page - 1;
    label = `עמודים ${first}–${first + 1} מתוך ${total}`;
  }
  // The closed book (cover or back cover) is a single page: centre it instead of leaving half the spread empty.
  const shift = landscape && atStart ? "flipbook-shift-start" : landscape && atEnd ? "flipbook-shift-end" : "";

  return (
    <div className="flipbook" aria-roledescription="קטלוג דיגיטלי" aria-label={title}>
      <div className={`flipbook-viewport${zoomed ? " is-zoomed" : ""}`} ref={viewportRef}>
        <div className={`flipbook-stage ${shift}`} dir="ltr">
          <div className="flipbook-zoom" ref={zoomRef}>
            <div className={`flipbook-book${ready ? " is-ready" : ""}`} ref={bookRef}>
              {reversed.map((src, i) => {
                const n = total - i;
                const hard = n === 1 || n === total;
                return (
                  <div className="flipbook-page" data-density={hard ? "hard" : "soft"} key={src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${title} – עמוד ${n}`}
                      width={width}
                      height={height}
                      loading={n <= 3 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {zoomed && (
          <button type="button" className="flipbook-zoom-reset" onClick={resetZoom} aria-label="ביטול הגדלה">
            ביטול הגדלה ✕
          </button>
        )}
      </div>

      <div className="flipbook-controls">
        <button type="button" className="flipbook-btn" onClick={back} disabled={!ready || atStart} aria-label="לעמוד הקודם">
          <span aria-hidden="true">→</span> הקודם
        </button>
        <span className="flipbook-counter" aria-live="polite">
          {label}
        </span>
        <button type="button" className="flipbook-btn" onClick={forward} disabled={!ready || atEnd} aria-label="לעמוד הבא">
          הבא <span aria-hidden="true">←</span>
        </button>
      </div>
    </div>
  );
}
