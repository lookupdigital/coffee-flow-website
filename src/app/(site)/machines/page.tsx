import MachinesView from "@/views/machines";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/machines"));
}

export default function MachinesPage() {
  return <MachinesView locale="he" />;
}
