import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPostList, type PostCard } from "@/payload/integration/getPosts";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Journal — ${SITE_CONFIG.name}`,
  description: `Field notes, method, and craft from the ${SITE_CONFIG.wordmark} desk.`,
};

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndex() {
  const posts = await getPostList();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      <header className="max-w-2xl">
        <p className="editorial-label text-xs tracking-widest text-text/50">The Journal</p>
        <h1 className="mt-2 text-6xl font-bold leading-[0.9] tracking-tighter">
          {SITE_CONFIG.wordmark}
        </h1>
        <p className="mt-5 max-w-md font-serif text-lg text-text/60">
          Notes on method, material, and the discipline of finishing well.
        </p>
      </header>

      {!featured && (
        <p className="mt-16 font-mono text-sm text-text/40">No articles published yet.</p>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-16 grid gap-6 border-b border-line pb-16 lg:grid-cols-5"
        >
          <div className="overflow-hidden border border-line bg-surface lg:col-span-3">
            {featured.heroUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.heroUrl}
                alt={featured.alt}
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="aspect-[16/10] w-full bg-surface-muted" />
            )}
          </div>
          <div className="flex flex-col justify-center lg:col-span-2">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-text/40">
              <span>Featured</span>
              <span className="h-px flex-1 bg-surface-sunken" />
              <span>{fmtDate(featured.publishedDate)}</span>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-text">
              {featured.title}
            </h2>
            <p className="mt-4 font-serif text-lg leading-8 text-text/60">{featured.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text/60 transition-colors group-hover:text-accent">
              Read the piece
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostTile key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostTile({ post }: { post: PostCard }) {
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
      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text/40">
        <span>{post.author}</span>
        <span>·</span>
        <span>{fmtDate(post.publishedDate)}</span>
      </div>
      <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-text transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 font-serif text-[15px] leading-7 text-text/60">{post.excerpt}</p>
    </Link>
  );
}
