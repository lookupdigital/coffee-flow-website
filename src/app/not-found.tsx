import { Footer, Header } from "@/components/ui";
import NotFoundView from "@/components/NotFoundView";
import "./(site)/site.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
