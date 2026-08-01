"use client";

import Link from "next/link";
import postsData from "@/data/posts.json";
import Icon from "@/components/ui/Icon";

/* ============================================================
   BLOG SECTION (/blog)
   Reads from /data/posts.json. Empty by default — shows a
   clean "coming soon" state rather than fabricated posts.
   To publish: add an entry to posts.json with a unique slug;
   it'll appear here and at /blog/<slug> automatically.
   ============================================================ */
export default function Blog() {
  const posts = postsData.posts as Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
  }>;

  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto w-fit">
            <span>01</span>
            <span>Blog</span>
          </div>
          <h2 className="section-heading">
            Notes on <span className="text-gradient">SEO & data</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: "var(--color-text-secondary)" }}>
            Writing on SEO strategy, data analysis workflows, and lessons from real projects.
          </p>
        </div>

        {posts.length === 0 ? (
          <div
            className="card max-w-xl mx-auto p-10 text-center"
          >
            <Icon name="pen-line" className="w-9 h-9 mb-4 inline-block opacity-60" />
            <h3 className="text-lg font-display font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
              First posts are in the works
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Nothing published here yet, but SEO case studies and data-analysis write-ups are on the way.
              In the meantime, check out the project case studies for a look at real work.
            </p>
            <Link href="/projects" className="btn-outline inline-flex items-center gap-2">
              View Projects
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover p-6 flex flex-col gap-3"
              >
                <p className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{post.date}</p>
                <h3 className="text-lg font-display font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: "var(--color-chip-bg)", border: "1px solid var(--color-chip-border)", color: "var(--color-text-secondary)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
