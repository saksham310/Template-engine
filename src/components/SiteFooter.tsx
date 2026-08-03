import Link from "next/link";
import { SITE_CONFIG, FOOTER_SECTIONS, FOOTER_SOCIAL_TITLE } from "@/config/site";
import { getSiteSettings } from "@/payload/integration/getSiteSettings";
import { Grain } from "./patterns";
import CurrentYear from "./CurrentYear";

const CONTACT_PILL =
  "inline-flex items-center rounded-2xl border border-bg/20 px-4 py-2 font-mono text-xs " +
  "tabular-nums text-bg/80 transition-colors duration-200 ease-out hover:bg-bg hover:text-text";

export default async function SiteFooter() {
  const year = new Date().getFullYear();
  const site = await getSiteSettings();
  const sections = site.socials.length
    ? [...FOOTER_SECTIONS, { title: FOOTER_SOCIAL_TITLE, links: site.socials }]
    : FOOTER_SECTIONS;
  // Written out in full rather than interpolated so Tailwind sees both classes.
  const gridCols =
    sections.length === 3
      ? "lg:grid-cols-[1.6fr_repeat(3,1fr)]"
      : "lg:grid-cols-[1.6fr_repeat(2,1fr)]";

  return (
    <footer className="relative isolate overflow-hidden bg-text text-bg">
      <Grain opacity={0.2} />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8">
        <div className={`grid gap-10 sm:grid-cols-2 lg:gap-12 ${gridCols}`}>
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-widest">
              {SITE_CONFIG.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bg/55">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${site.email}`} className={CONTACT_PILL}>
                {site.email}
              </a>
              <a href={site.telHref} className={`${CONTACT_PILL} font-bold`}>
                {site.phone}
              </a>
            </div>

            <p className="mt-4 max-w-[26ch] font-mono text-[11px] leading-5 text-bg/35">
              {site.address}
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bg/35">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-bg/70 transition-colors duration-200 hover:text-bg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-bg/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-bg/35">
            © <CurrentYear fallback={year} /> {SITE_CONFIG.name} — All rights reserved
          </p>
          <Link
            href="/#book"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-bg/60 transition-colors hover:text-bg"
          >
            Request a quote
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.22em] select-none whitespace-nowrap text-center font-editorial text-[22vw] leading-none text-bg/[0.07]"
      >
        {SITE_CONFIG.wordmark}
      </p>
    </footer>
  );
}
