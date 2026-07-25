import Image from "next/image";

/**
 * COMPONENT 2 — SERVICE BENTO
 *
 * 4-card asymmetric bento. Lead service spans 2 cols / 2 rows; the other three
 * deliberately differ in height + content density to break the grid rhythm.
 * Editorial, not SaaS: no 3-col icon grid, no repeated card dimensions.
 */

// Self-contained grain — inline SVG fractal noise, no external asset.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain({ opacity = 0.14 }: { opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: GRAIN, opacity }}
    />
  );
}

// Shared interaction shell: lift, darker border, grain. Image scale handled per-card via `group`.
const cardBase =
  "group relative isolate overflow-hidden rounded-md border border-slate-200/60 " +
  "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-400/70";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-label text-xs tracking-widest opacity-70">
      {children}
    </p>
  );
}

export default function ServiceBento() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28">
      <header className="mb-7 max-w-xl">
        <Eyebrow>The Services</Eyebrow>
        <h2 className="mt-2 text-4xl tracking-tight">
          A standard of finish, room by room.
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[minmax(0,auto)]">
        {/* LEAD — spans 2 cols / 2 rows, environmental photo + dark gradient + CTA */}
        <article
          className={`${cardBase} sm:col-span-2 sm:row-span-2 min-h-[440px] text-white`}
        >
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="Minimal, sunlit modern interior after a deep clean"
            fill
            sizes="(max-width: 640px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority
          />
          {/* Dark gradient overlay for legibility */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
          />
          <Grain opacity={0.12} />

          <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
            <Eyebrow>Signature</Eyebrow>
            <h3 className="mt-2 max-w-[16ch] text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl">
              The Full Residence Detail
            </h3>
            <p className="mt-3 max-w-md text-base leading-snug text-white/80">
              Top-to-bottom, archival-grade care for the whole home — the
              service every other tier is measured against.
            </p>
            <a
              href="#start"
              className="mt-6 inline-flex w-fit items-center gap-1 rounded-sm bg-white px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-white/90"
            >
              Start Here
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        {/* CARD 2 — tall-ish, image-led, low text density */}
        <article className={`${cardBase} min-h-[240px] bg-white text-text`}>
          <Image
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80"
            alt="Detail of a spotless kitchen surface"
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"
          />
          <Grain />
          <div className="relative flex h-full flex-col justify-end p-5">
            <Eyebrow>Kitchens</Eyebrow>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">
              Surface Restoration
            </h3>
          </div>
        </article>

        {/* CARD 3 — short, high text density (list), no image */}
        <article
          className={`${cardBase} min-h-[180px] bg-white p-5 text-text`}
        >
          <Grain opacity={0.1} />
          <div className="relative">
            <Eyebrow>Add-ons</Eyebrow>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">
              À La Carte
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-tight text-text/70">
              <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span>Interior windows</span>
                <span className="tabular-nums">+45m</span>
              </li>
              <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span>Oven &amp; range</span>
                <span className="tabular-nums">+30m</span>
              </li>
              <li className="flex justify-between">
                <span>Wardrobe reset</span>
                <span className="tabular-nums">+60m</span>
              </li>
            </ul>
          </div>
        </article>

        {/* CARD 4 — wide, thin banner spanning all cols, breaks the rhythm */}
        <article
          className={`${cardBase} sm:col-span-3 min-h-[120px] bg-text text-white`}
        >
          <Grain opacity={0.18} />
          <div className="relative flex h-full flex-col items-start justify-between gap-3 p-6 sm:flex-row sm:items-center">
            <div>
              <Eyebrow>Membership</Eyebrow>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                Recurring care, on your schedule.
              </h3>
            </div>
            <a
              href="#membership"
              className="inline-flex items-center gap-1 rounded-sm border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/70"
            >
              See plans
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
