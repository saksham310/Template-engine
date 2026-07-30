"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { ServiceNavGroup } from "@/payload/integration/getServiceView";
import { SITE_CONFIG, NAV_LINKS } from "@/config/site";

const CATEGORY_BLURB: Record<string, string> = {
  Residential: "Homes, apartments, and private residences.",
  Commercial: "Studios, retail, and workspaces.",
  Specialized: "Post-build, restoration, and targeted care.",
};

export default function SiteHeader({ nav }: { nav: ServiceNavGroup[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cols = Math.min(Math.max(nav.length, 1), 3);

  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-bg"
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Three columns so the nav is centred on the page, not pushed around by
          the width of the wordmark or the button. */}
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-widest text-text"
        >
          {SITE_CONFIG.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-sm text-text/70 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}

          {/* Services — mega-menu trigger */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onMouseEnter={() => setMenuOpen(true)}
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex items-center gap-1 transition-colors hover:text-text ${
              menuOpen ? "text-text" : ""
            }`}
          >
            Services
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${
                menuOpen ? "rotate-180" : ""
              }`}
              strokeWidth={2}
            />
          </button>

        </nav>

        <div className="flex items-center justify-end">
          <Link
            href="/#book"
            className="hidden rounded-xl bg-text px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-text/90 sm:inline-flex"
          >
            Request Quote →
          </Link>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="-mr-1 inline-flex h-9 w-9 items-center justify-center text-text sm:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Mega-menu panel (desktop) */}
      {menuOpen && nav.length > 0 && (
        <div className="absolute inset-x-0 top-full hidden border-b border-line bg-surface sm:block">
          <div
            className="mx-auto grid max-w-7xl divide-x divide-line px-5"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {nav.map((group) => (
              <div key={group.category} className="px-6 py-6 first:pl-0 last:pr-0">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="editorial-label text-sm text-text">
                    {group.category}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-text/40">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-3 text-xs text-text/50">
                  {CATEGORY_BLURB[group.category] ?? ""}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        href={`/services/${svc.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-2 py-1.5 text-sm text-text/70 transition-colors hover:text-text"
                      >
                        <span className="h-1 w-1 rounded-sm bg-text/30 transition-colors group-hover:bg-accent" />
                        {svc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* View All + prominent Request Quote */}
          <div className="border-t border-line bg-bg">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
              <Link
                href="/services"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text/60 transition-colors hover:text-text"
              >
                View All Services
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/#book"
                onClick={() => setMenuOpen(false)}
                className="rounded-sm bg-text px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-text/90"
              >
                Request Quote →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen editorial overlay (mobile) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-bg sm:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-mono text-sm font-semibold uppercase tracking-widest text-text"
            >
              {SITE_CONFIG.name}
              <span className="text-accent">.</span>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="-mr-1 inline-flex h-9 w-9 items-center justify-center text-text"
            >
              <X className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
            {[...NAV_LINKS, { label: "Services", href: "/services" }].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-baseline gap-4 border-b border-line py-4"
              >
                <span className="font-mono text-xs tabular-nums text-text/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl font-bold tracking-tighter text-text transition-colors group-hover:text-accent">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-line px-5 py-6">
            <Link
              href="/#book"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-sm bg-text px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-text/90"
            >
              Request a Quote →
            </Link>
            <p className="editorial-label mt-6 text-base text-text/50">
              {SITE_CONFIG.tagline}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
