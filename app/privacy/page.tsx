import { Footer, Header } from "@/components/ui";

export const metadata = { title: "מדיניות פרטיות" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="plain-page">
        <h1 className="h2">מדיניות פרטיות</h1>
        <p className="text">תוכן העמוד יתווסף בהמשך.</p>
      </main>
      <Footer />
    </>
  );
}
