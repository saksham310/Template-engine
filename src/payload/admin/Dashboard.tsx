import React from "react";
import Link from "next/link";
import { formatAdminURL } from "payload/shared";
import type { AdminViewServerProps, Payload, Where } from "payload";
import {
  Home as HomeIcon,
  Images,
  Inbox,
  PenLine,
  Sparkles,
  SquarePen,
} from "lucide-react";

import { SITE_CONFIG } from "../../config/site";

const STATUSES = [
  { value: "New", label: "New", tone: "blue" },
  { value: "Contacted", label: "Contacted", tone: "amber" },
  { value: "Quoted", label: "Quoted", tone: "violet" },
  { value: "Converted", label: "Converted", tone: "green" },
] as const;

type User = AdminViewServerProps["initPageResult"]["req"]["user"];

type LeadRow = {
  id: string | number;
  name?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  serviceRequested?: { title?: string } | string | null;
};

async function countDocs(
  payload: Payload,
  collection: "gallery" | "leads" | "media" | "posts" | "services",
  user: User,
  where?: Where,
): Promise<number | null> {
  try {
    const { totalDocs } = await payload.count({
      collection,
      overrideAccess: false,
      user,
      ...(where ? { where } : {}),
    });
    return totalDocs;
  } catch (error) {
    payload.logger.error({ err: error }, `dashboard: could not count "${collection}"`);
    return null;
  }
}

async function recentLeads(payload: Payload, user: User): Promise<LeadRow[]> {
  try {
    const { docs } = await payload.find({
      collection: "leads",
      limit: 6,
      sort: "-createdAt",
      depth: 1,
      overrideAccess: false,
      user,
    });
    return docs as LeadRow[];
  } catch (error) {
    payload.logger.error({ err: error }, "dashboard: could not load recent leads");
    return [];
  }
}

function serviceName(s: LeadRow["serviceRequested"]): string {
  if (s && typeof s === "object") return s.title ?? "—";
  return "—";
}

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function firstName(user: User): string | null {
  const name = (user as { name?: unknown } | null)?.name;
  if (typeof name !== "string" || !name.trim()) return null;
  return name.trim().split(/\s+/)[0];
}

export const Dashboard = async ({ initPageResult }: AdminViewServerProps) => {
  const { payload, user } = initPageResult.req;

  const [totalLeads, byStatus, recent] =
    await Promise.all([
      countDocs(payload, "leads", user),
      Promise.all(
        STATUSES.map((s) =>
          countDocs(payload, "leads", user, { status: { equals: s.value } }).then(
            (count) => [s.value, count ?? 0] as const,
          ),
        ),
      ),
      recentLeads(payload, user),
    ]);

  const adminUrl = (path: `/${string}`) =>
    formatAdminURL({ adminRoute: payload.config.routes.admin, path });

  const counts = Object.fromEntries(byStatus) as Record<string, number>;
  const pipelineMax = Math.max(1, ...STATUSES.map((s) => counts[s.value] ?? 0));

  const actions = [
    {
      icon: Inbox,
      title: "Read new quote requests",
      description: "See who got in touch, what they need, and reply from their record.",
      href: adminUrl("/collections/leads"),
    },
    {
      icon: HomeIcon,
      title: "Edit the home page",
      description: "Headline, intro, the four standards, and the questions people ask.",
      href: adminUrl("/globals/home"),
    },
    {
      icon: Sparkles,
      title: "Add or edit a service",
      description: "Everything a service page shows — pricing notes, inclusions, photos.",
      href: adminUrl("/collections/services"),
    },
    {
      icon: PenLine,
      title: "Write a journal post",
      description: "Start a draft. It stays private until you press Publish.",
      href: adminUrl("/collections/posts"),
    },
    {
      icon: Images,
      title: "Add or browse photos",
      description: "Upload a picture, or look through everything already uploaded.",
      href: adminUrl("/collections/media"),
    },
    {
      icon: SquarePen,
      title: "Manage the gallery",
      description: "Choose which photos appear on the public gallery page, and in what order.",
      href: adminUrl("/collections/gallery"),
    },
  ];

  const name = firstName(user);

  return (
    <div className="ed-dash">
      <header className="ed-dash__head">
        <p className="ed-dash__eyebrow">
          Welcome <span aria-hidden="true">👋</span>
        </p>
        <h1 className="ed-dash__title">{name ?? SITE_CONFIG.name}</h1>
        <p className="ed-dash__lead">
          Everything the public website shows is edited from here. Changes go live as
          soon as you save.
        </p>
      </header>

      <div className="ed-bento">

        <section className="ed-card" aria-labelledby="ed-pipeline">
          <h2 className="ed-card__title" id="ed-pipeline">
            Where your requests stand
          </h2>
          <p className="ed-card__note ed-card__note--tight">
            {totalLeads === null
              ? "Counts are unavailable right now."
              : `${totalLeads} request${totalLeads === 1 ? "" : "s"} in total. Set the stage on each record as you work through it.`}
          </p>

          <ul className="ed-pipeline">
            {STATUSES.map((s) => {
              const c = counts[s.value] ?? 0;
              return (
                <li key={s.value} className="ed-stage">
                  <span className="ed-stage__top">
                    <span
                      className={`ed-dot ed-dot--${s.tone}`}
                      aria-hidden="true"
                    />
                    <span className="ed-stage__label">{s.label}</span>
                    <span className="ed-stage__count">{c}</span>
                  </span>
                  <span className="ed-bar">
                    <span
                      className={`ed-bar__fill ed-bar__fill--${s.tone}`}
                      style={{ width: `${Math.round((c / pipelineMax) * 100)}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="ed-card" aria-labelledby="ed-recent">
          <div className="ed-card__head">
            <h2 className="ed-card__title ed-card__title--flush" id="ed-recent">
              The latest requests
            </h2>
            <Link className="ed-card__link" href={adminUrl("/collections/leads")}>
              See all →
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="ed-empty">
              No quote requests yet. Anything sent through the website lands here.
            </p>
          ) : (
            <div className="ed-scroll">
              <table className="ed-table">
                <thead>
                  <tr>
                    <th scope="col">Who</th>
                    <th scope="col">Asked about</th>
                    <th scope="col">Stage</th>
                    <th className="ed-ta-right" scope="col">
                      Sent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((l) => {
                    const tone =
                      STATUSES.find((s) => s.value === l.status)?.tone ?? "blue";
                    return (
                      <tr key={l.id}>
                        <td>
                          <Link
                            className="ed-client"
                            href={adminUrl(`/collections/leads/${l.id}`)}
                          >
                            {l.name || "Unnamed"}
                          </Link>
                          <span className="ed-muted">{l.email}</span>
                        </td>
                        <td className="ed-muted">{serviceName(l.serviceRequested)}</td>
                        <td>
                          <span className={`ed-pill ed-pill--${tone}`}>
                            {l.status || "New"}
                          </span>
                        </td>
                        <td className="ed-ta-right ed-mono">{fmtDate(l.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="ed-card ed-card--wide" aria-labelledby="ed-actions">
          <h2 className="ed-card__title" id="ed-actions">
            What would you like to do?
          </h2>

          <ul className="ed-actions">
            {actions.map((action) => (
              <li key={action.title}>
                <Link className="ed-action" href={action.href}>
                  <span className="ed-action__icon" aria-hidden="true">
                    <action.icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="ed-action__text">
                    <span className="ed-action__title">{action.title}</span>
                    <span className="ed-action__desc">{action.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
