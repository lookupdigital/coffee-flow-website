import type { ReactNode } from "react";

/** English pages: the same site, laid out left to right. */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="en" dir="ltr" className="locale-en">
      {children}
    </div>
  );
}
