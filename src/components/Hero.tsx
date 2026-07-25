import Image from "next/image";

/**
 * COMPONENT 1 — THE BROKEN HERO
 *
 * Editorial (Architectural Digest), not SaaS:
 *   - 65% text / 35% image, strictly asymmetric.
 *   - Massive text-8xl headline that BLEEDS past the section edge (negative margin + z-10).
 *   - One dominant focal point (headline), one supporting (image), one accent (status card).
 *
 * Note: the status card uses backdrop-blur-sm per spec — this intentionally overrides the
 * project's "no glassmorphism" token. Kept restrained (bg-white/70, 1px slate-200/60 border,
 * no glow) so it reads as a print overlay, not a floating SaaS glass panel.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-visible">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-5 pt-40 pb-24 lg:grid-cols-[65fr_35fr] lg:gap-8 lg:pb-24">
        {/* DOMINANT — headline column (65%) */}
        <div className="lg:pr-6">
          <p className="editorial-label mb-4 text-base text-text/60">
            Est. 2026 — Bespoke Care
          </p>

          {/* Headline bleeds into the section below via negative bottom margin + z-10 */}
          <h1 className="relative z-10 mb-[-40px] max-w-[14ch] text-6xl font-bold leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
            Expert Cleaning for Modern Spaces
          </h1>

          <div className="mt-[64px] max-w-xl">
            <p className="text-lg leading-snug text-text/70">
              We treat interiors like editorial subjects. Trained specialists,
              archival-grade products, and a standard of finish reserved for
              galleries, penthouses, and the spaces you photograph — not the ones
              you apologize for.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              {/* Primary — filled, rounded-sm */}
              <a
                href="#book"
                className="rounded-sm bg-text px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-text/90"
              >
                Request a Quote →
              </a>

              {/* Secondary — text button */}
              <a
                href="#work"
                className="group inline-flex items-center gap-1 text-base font-medium text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                View recent work
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* SUPPORTING — image column (35%), with the ACCENT status card overlapping it */}
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

          {/* ACCENT — floating status card overlapping the image edge */}
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
