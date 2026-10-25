// Minimal types for open-nagish 1.1.5 (the package ships no declarations).
declare module "open-nagish" {
  export function init(options?: {
    lang?: "he" | "en" | "ar" | "ru";
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    bottomOffset?: number;
    mobileBottomOffset?: number;
    statementUrl?: string;
  }): { destroy: () => void };
}
