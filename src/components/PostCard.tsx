import Link from "next/link";
import { postPath } from "@/lookup/seo-model";
import type { PostSummary } from "@/lookup/posts";
import { siteConfig } from "@/site.config";

/** Fallback photo for posts without a featured image (same as the design's placeholder cards). */
const FALLBACK_PHOTO = "/images/a5b88.webp";

/** Blog card in the Coffee Flow design (.blog-card in site.css) — used on the home page and the blog index. */
export default function PostCard({ post }: { post: PostSummary }) {
  const href = postPath(siteConfig.routes.blog.path, post.slug);
  return (
    <article className="blog-card">
      <div className="blog-card-photo">
        {/* Admin-managed images have unknown dimensions; a plain img keeps the card simple. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pic pic-cover" src={post.featured_image_url || FALLBACK_PHOTO} alt={post.featured_image_alt ?? ""} loading="lazy" />
      </div>
      <div className="blog-card-body">
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <Link href={href} className="blog-btn">
          לצפייה
        </Link>
      </div>
    </article>
  );
}
