import HomeView from "@/views/home";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata(
  "/",
  "Coffee Flow | Coffee solutions for businesses",
  "Coffee Flow provides complete coffee solutions for businesses — from choosing the right machine and supplies to service, maintenance and ongoing delivery.",
);

export default function HomeEn() {
  return <HomeView locale="en" />;
}
