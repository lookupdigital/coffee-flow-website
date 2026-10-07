import ServiceView from "@/views/service";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata(
  "/service",
  "Technical service",
  "A machine fault or a question about operation? Call the Coffee Flow technical service team.",
);

export default function ServiceEn() {
  return <ServiceView locale="en" />;
}
