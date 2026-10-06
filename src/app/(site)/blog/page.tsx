import { Footer, Header } from "@/components/ui";
import PostCard from "@/components/PostCard";
import { getPublishedPosts } from "@/lookup/posts";
import { buildPageMetadata } from "@/lookup/seo";
import { siteConfig } from "@/site.config";

const blog = siteConfig.routes.blog;

export function generateMetadata() {
  return buildPageMetadata(blog);
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main>
        <section className="blog">
          <div className="section-header">
            <h1 className="h2">{blog.title ?? blog.label}</h1>
          </div>
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text">עדיין לא פורסמו מאמרים.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
