import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE_CONFIG.name}`,
  description: `Reach ${SITE_CONFIG.name} for quotes, walkthroughs, and recurring care.`,
};

const tel = SITE_CONFIG.phone.replace(/[^\d+]/g, "");

const CHANNELS = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${tel}` },
  { icon: MapPin, label: "Studio", value: SITE_CONFIG.address, href: null },
];

const SOCIALS = [
  { label: "Instagram", href: SITE_CONFIG.socials.instagram },
  { label: "Facebook", href: SITE_CONFIG.socials.facebook },
  { label: "LinkedIn", href: SITE_CONFIG.socials.linkedin },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28">
      <header className="max-w-2xl">
        <p className="editorial-label text-xs tracking-widest text-text/50">Get in Touch</p>
        <h1 className="mt-2 text-6xl font-bold leading-[0.9] tracking-tighter">Contact</h1>
        <p className="mt-5 max-w-md font-serif text-lg text-text/60">
          Send scope and photos and we return a firm quote within the hour. Recurring
          care is scheduled around your calendar.
        </p>
      </header>

      <div className="mt-16 grid gap-px border border-slate-200/60 bg-slate-200/60 sm:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          const body = (
            <>
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <span className="mt-4 font-mono text-[11px] uppercase tracking-widest text-text/40">
                {c.label}
              </span>
              <span className="mt-1 text-lg font-semibold tracking-tight text-text">
                {c.value}
              </span>
            </>
          );
          return c.href ? (
            <a
              key={c.label}
              href={c.href}
              className="flex flex-col bg-white p-7 transition-colors hover:bg-bg"
            >
              {body}
            </a>
          ) : (
            <div key={c.label} className="flex flex-col bg-white p-7">
              {body}
            </div>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col justify-between gap-8 border-t border-slate-200/60 pt-10 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text/40">Follow</p>
          <div className="mt-3 flex gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-text/60 underline-offset-4 transition-colors hover:text-text hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <Link
          href="/#book"
          className="inline-flex w-fit items-center gap-1 rounded-sm bg-text px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-text/90"
        >
          Request a Quote →
        </Link>
      </div>
    </div>
  );
}
