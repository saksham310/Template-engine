import Link from "next/link";
import { SITE_CONFIG, FOOTER_SECTIONS } from "@/config/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-text text-white">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <p className="editorial-label text-lg">{SITE_CONFIG.name}</p>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-5 space-y-1 font-mono text-xs text-white/50">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block transition-colors hover:text-white"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="block transition-colors hover:text-white"
              >
                {SITE_CONFIG.phone}
              </a>
              <p className="max-w-[22ch] text-white/40">{SITE_CONFIG.address}</p>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            © {year} {SITE_CONFIG.name} — All rights reserved
          </p>
          <Link
            href="/#book"
            className="font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
          >
            Book a walkthrough →
          </Link>
        </div>
      </div>
    </footer>
  );
}
