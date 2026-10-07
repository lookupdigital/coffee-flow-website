import MachinesView from "@/views/machines";
import { enMetadata } from "@/lib/metadata-en";

export const metadata = enMetadata(
  "/machines",
  "Coffee machines",
  "Professional coffee machines for offices, cafés, restaurants and hotels: automatic, espresso, capsule and Shabbat machines, with service and technical support.",
);

export default function MachinesEn() {
  return <MachinesView locale="en" />;
}
