import ServiceView from "@/views/service";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/service"));
}

export default function ServicePage() {
  return <ServiceView locale="he" />;
}
