import Link from "next/link";
import { postPath } from "@/lookup/seo-model";
import type { PostSummary } from "@/lookup/posts";
import { siteConfig } from "@/site.config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.locale.bcp47, {
  dateStyle: "long",
  timeZone: siteConfig.locale.timeZone,
});

/** Blog card in the Coffee Flow design (.blog-card in site.css). */
export default function PostCard({ post }: { post: PostSummary }) {
  const href = postPath(siteConfig.routes.blog.path, post.slug);
  return (
    <article className="blog-card">
      {post.featured_image_url && (
        <div className="blog-card-photo">
          {/* Admin-managed images have unknown dimensions; a plain img keeps the card simple. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.featured_image_url} alt={post.featured_image_alt ?? ""} loading="lazy" />
        </div>
      )}
      <div className="blog-card-body">
        {post.category && <span className="blog-card-category">{post.category}</span>}
        <h3 className="card-title">
          <Link href={href}>{post.title}</Link>
        </h3>
        {post.excerpt && <p className="text">{post.excerpt}</p>}
        {post.published_at && (
          <time className="blog-card-date" dateTime={post.published_at}>
            {dateFormat.format(new Date(post.published_at))}
          </time>
        )}
      </div>
    </article>
  );
}
