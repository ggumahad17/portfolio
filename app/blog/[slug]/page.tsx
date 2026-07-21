import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import postsData from "@/data/posts.json";
import content from "@/data/content.json";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  body: string[];
};

const posts = postsData.posts as Post[];

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${content.hero.name}`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-max max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          ← Back to blog
        </Link>
        <p className="text-xs font-mono mb-3" style={{ color: "var(--color-text-muted)" }}>{post.date}</p>
        <h1 className="section-heading mb-6">{post.title}</h1>
        <div className="flex flex-col gap-4">
          {post.body.map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
