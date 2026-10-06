import { ButtonLink } from "@/components/ui";

/** 404 content without header/footer, shared by the root 404 page and the missing-blog-post page. */
export default function NotFoundView() {
  return (
    <div className="plain-page">
      <h1 className="h2">העמוד לא נמצא</h1>
      <p className="text">ייתכן שהקישור שגוי או שהעמוד הוסר.</p>
      <div>
        <ButtonLink href="/" tone="gold">
          לדף הבית
        </ButtonLink>
      </div>
    </div>
  );
}
