import Link from "next/link";

// Global footer — quiet dark close, hairline top border.
export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-text text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:flex-row sm:items-end">
        <div>
          <p className="editorial-label text-lg">Éditorial</p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            Expert cleaning for modern spaces. By appointment, city-wide.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href="/#book"
            className="font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            Book a walkthrough →
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            © 2026 — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
