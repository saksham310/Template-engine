import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  type PostCard,
} from "@/payload/integration/getPosts";
import { SITE_CONFIG } from "@/config/site";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: `${post.title} — ${SITE_CONFIG.name}`,
    description: post.excerpt,
  };
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);

  return (
    <article className="px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text/50 transition-colors hover:text-text"
        >
          <span className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
            ←
          </span>
          Back to Journal
        </Link>
      </div>

      <header className="mx-auto mt-8 max-w-2xl">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-text/40">
          <span>{post.author}</span>
          <span className="h-px flex-1 bg-surface-sunken" />
          <span>{fmtDate(post.publishedDate)}</span>
        </div>
        <h1 className="mt-5 text-5xl font-bold leading-[0.95] tracking-tighter text-text">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 font-serif text-xl leading-8 text-text/60">{post.excerpt}</p>
        )}
      </header>

      {post.heroUrl && (
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden border border-line bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroUrl}
            alt={post.alt}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      <div className="mx-auto mt-14 max-w-2xl">
        {post.content ? (
          <div className="rich-text">
            <RichText data={post.content as SerializedEditorState} />
          </div>
        ) : (
          <p className="font-serif text-lg leading-8 text-text/60">
            This article has no body content yet.
          </p>
        )}
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-4xl border-t border-line pt-12">
          <h2 className="editorial-label text-2xl text-text">More from the Journal</h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {related.map((r) => (
              <RelatedTile key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function RelatedTile({ post }: { post: PostCard }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="overflow-hidden border border-line bg-surface">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt={post.alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-surface-muted" />
        )}
      </div>
      <h3 className="mt-3 text-base font-bold leading-tight tracking-tight text-text transition-colors group-hover:text-accent">
        {post.title}
      </h3>
    </Link>
  );
}
