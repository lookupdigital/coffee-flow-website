import HomeView from "@/views/home";
import { buildPageMetadata, registeredRoute } from "@/lookup/seo";

// Title, description and the rest of the SEO come from Admin → Pages & SEO.
export function generateMetadata() {
  return buildPageMetadata(registeredRoute("/"));
}

export default function Home() {
  return <HomeView locale="he" />;
}
