import BeansView from "@/views/beans";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/beans"));
}

export default function BeansPage() {
  return <BeansView locale="he" />;
}
