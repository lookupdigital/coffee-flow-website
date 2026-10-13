// Minimal types for page-flip 2.0.7 (the package ships no declarations). Only what CatalogFlipbook uses.
declare module "page-flip" {
  export interface FlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    startPage?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    flippingTime?: number;
    mobileScrollSupport?: boolean;
    autoSize?: boolean;
    showPageCorners?: boolean;
  }

  export interface FlipEvent<T = unknown> {
    data: T;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: FlipSettings);
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    on<T = unknown>(event: "init" | "flip" | "changeOrientation" | "changeState", callback: (e: FlipEvent<T>) => void): this;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): "portrait" | "landscape";
    destroy(): void;
  }
}
