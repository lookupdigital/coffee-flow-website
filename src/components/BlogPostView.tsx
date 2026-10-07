import Link from "next/link";
import type { PostRow } from "@/lookup/posts";
import { RichText } from "@/lookup/richtext";
import { siteConfig } from "@/site.config";

const dateFormat = new Intl.DateTimeFormat(siteConfig.locale.bcp47, {
  dateStyle: "long",
  timeZone: siteConfig.locale.timeZone,
});

/** Blog post article — shared by the public post page and the admin draft preview. */
export default function BlogPostView({ post }: { post: PostRow }) {
  const blog = siteConfig.routes.blog;
  const published = post.published_at ? dateFormat.format(new Date(post.published_at)) : null;
  const updated = dateFormat.format(new Date(post.updated_at));
  const showUpdated = Boolean(
    post.published_at && updated !== published && new Date(post.updated_at) > new Date(post.published_at),
  );

  return (
    <article className="post">
      <header className="post-header">
        <nav className="breadcrumbs" aria-label="פירורי לחם">
          <Link href="/">בית</Link>
          <span aria-hidden="true">/</span>
          <Link href={blog.path}>{blog.navLabel ?? blog.label}</Link>
        </nav>
        {post.category && <p className="post-category">{post.category}</p>}
        <h1 className="h2">{post.title}</h1>
        {post.excerpt && <p className="lead">{post.excerpt}</p>}
        <p className="post-meta">
          {post.author && <span>{`מאת ${post.author}`}</span>}
          {published && post.published_at && (
            <span>
              פורסם: <time dateTime={post.published_at}>{published}</time>
            </span>
          )}
          {showUpdated && (
            <span>
              עודכן: <time dateTime={post.updated_at}>{updated}</time>
            </span>
          )}
        </p>
      </header>

      <div className="post-body">
        {post.featured_image_url && (
          <div className="post-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featured_image_url} alt={post.featured_image_alt ?? ""} />
          </div>
        )}
        <RichText doc={post.content} className="rich-text" />
      </div>
    </article>
  );
}
