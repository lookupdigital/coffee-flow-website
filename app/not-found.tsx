import { ButtonLink, Footer, Header } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="plain-page">
        <h1 className="h2">העמוד לא נמצא</h1>
        <div>
          <ButtonLink href="/" tone="gold">
            לדף הבית
          </ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
