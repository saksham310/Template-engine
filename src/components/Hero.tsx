import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-visible">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pt-40 pb-24 lg:grid-cols-[65fr_35fr] lg:gap-8 lg:pb-24">
        <div className="lg:pr-6">
          <p className="editorial-label mb-4 text-base text-text/60">
            Est. 2026 — Bespoke Care
          </p>

          <h1 className="relative z-10 mb-[-40px] max-w-[14ch] text-6xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
            {SITE_CONFIG.tagline}
          </h1>

          <div className="mt-[64px] max-w-xl">
            <p className="text-lg leading-snug text-text/70">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="#book"
                className="rounded-sm bg-text px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-text/90"
              >
                Request a Quote →
              </Link>

              <Link
                href="/gallery"
                className="group inline-flex items-center gap-1 text-base font-medium text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                View recent work
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-slate-200/60">
            <Image
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
              alt="Sunlit modern living room with clean minimal interior"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-6 w-[280px] max-w-[85%] rounded-md border border-slate-200/60 bg-white/70 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-text">
                Live Status: Professionals active nearby
              </span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-slate-200/60 pt-2">
              <span className="editorial-label text-xs text-text/60">
                Avg. response
              </span>
              <span className="text-sm font-semibold tabular-nums text-text">
                ~12 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
