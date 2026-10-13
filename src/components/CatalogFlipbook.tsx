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
export default function CatalogFlipbook({ pages, width, height, title }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const total = pages.length;
  const reversed = [...pages].reverse();
  const [index, setIndex] = useState(total - 1);
  const [landscape, setLandscape] = useState(true);
  const [ready, setReady] = useState(false);

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
      instance.on<number>("flip", (e) => setIndex(e.data));
      instance.on<string>("changeOrientation", (e) => setLandscape(e.data === "landscape"));
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

  const forward = useCallback(() => flipRef.current?.flipPrev(), []);
  const back = useCallback(() => flipRef.current?.flipNext(), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") forward();
      if (e.key === "ArrowRight") back();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [forward, back]);

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
      <div className={`flipbook-stage ${shift}`} dir="ltr">
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
