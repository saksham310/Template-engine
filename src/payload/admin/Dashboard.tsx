import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContentControls } from "./ContentControls";

const ADMIN = "/admin/collections";

const STATUSES = [
  { value: "New", label: "New", tone: "blue" },
  { value: "Contacted", label: "Contacted", tone: "amber" },
  { value: "Quoted", label: "Quoted", tone: "violet" },
  { value: "Converted", label: "Converted", tone: "green" },
] as const;

type LeadRow = {
  id: string | number;
  name?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  serviceRequested?: { title?: string } | string | null;
};

async function getData() {
  try {
    const payload = await getPayload({ config });

    const [byStatus, totalLeads, services, recent] = await Promise.all([
      Promise.all(
        STATUSES.map((s) =>
          payload
            .count({ collection: "leads", where: { status: { equals: s.value } } })
            .then((r) => [s.value, r.totalDocs] as const),
        ),
      ),
      payload.count({ collection: "leads" }),
      payload.count({ collection: "services" }),
      payload.find({
        collection: "leads",
        limit: 6,
        sort: "-createdAt",
        depth: 1,
      }),
    ]);

    const counts = Object.fromEntries(byStatus) as Record<string, number>;
    return {
      counts,
      totalLeads: totalLeads.totalDocs,
      services: services.totalDocs,
      recent: (recent.docs as LeadRow[]) ?? [],
    };
  } catch {
    return { counts: {}, totalLeads: 0, services: 0, recent: [] as LeadRow[] };
  }
}

function serviceName(s: LeadRow["serviceRequested"]): string {
  if (s && typeof s === "object") return s.title ?? "—";
  return "—";
}

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export const Dashboard = async () => {
  const { counts, totalLeads, services, recent } = await getData();

  const newLeads = counts["New"] ?? 0;
  const converted = counts["Converted"] ?? 0;
  const conversion = totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;
  const pipelineMax = Math.max(1, ...STATUSES.map((s) => counts[s.value] ?? 0));

  const kpis = [
    { label: "New Requests", value: newLeads, sub: "Awaiting review", accent: true },
    { label: "Total Leads", value: totalLeads, sub: "All time" },
    { label: "Conversion", value: `${conversion}%`, sub: `${converted} converted` },
    { label: "Active Services", value: services, sub: "Published" },
  ];

  return (
    <div className="crm">
      <header className="crm__head">
        <div>
          <p className="crm__eyebrow">Admin Console</p>
          <h1 className="crm__title">Management Overview</h1>
        </div>
      </header>

      <div className="crm__kpis">
        {kpis.map((k) => (
          <div key={k.label} className={`crm__kpi${k.accent ? " crm__kpi--accent" : ""}`}>
            <span className="crm__kpi-label">{k.label}</span>
            <span className="crm__kpi-value">
              {typeof k.value === "number" ? String(k.value).padStart(2, "0") : k.value}
            </span>
            <span className="crm__kpi-sub">{k.sub}</span>
          </div>
        ))}
      </div>

      <div className="crm__cols">
        <div className="crm__main">
          <section className="crm__panel">
            <div className="crm__panel-head">
              <span className="crm__panel-title">Lead Pipeline</span>
              <span className="crm__panel-meta">{totalLeads} total</span>
            </div>
            <div className="crm__pipeline">
              {STATUSES.map((s) => {
                const c = counts[s.value] ?? 0;
                return (
                  <div key={s.value} className="crm__stage">
                    <div className="crm__stage-top">
                      <span className={`crm__dot crm__dot--${s.tone}`} />
                      <span className="crm__stage-label">{s.label}</span>
                      <span className="crm__stage-count">{c}</span>
                    </div>
                    <div className="crm__bar">
                      <div
                        className={`crm__bar-fill crm__bar-fill--${s.tone}`}
                        style={{ width: `${Math.round((c / pipelineMax) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="crm__panel">
            <div className="crm__panel-head">
              <span className="crm__panel-title">Recent Requests</span>
              <a className="crm__link" href={`${ADMIN}/leads`}>
                View all →
              </a>
            </div>
            {recent.length === 0 ? (
              <p className="crm__empty">No quote requests yet. New leads land here.</p>
            ) : (
              <table className="crm__table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th className="crm__ta-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((l) => {
                    const tone =
                      STATUSES.find((s) => s.value === l.status)?.tone ?? "blue";
                    return (
                      <tr key={l.id}>
                        <td>
                          <a className="crm__client" href={`${ADMIN}/leads/${l.id}`}>
                            {l.name || "Unnamed"}
                          </a>
                          <span className="crm__muted">{l.email}</span>
                        </td>
                        <td className="crm__muted">{serviceName(l.serviceRequested)}</td>
                        <td>
                          <span className={`crm__pill crm__pill--${tone}`}>
                            {l.status || "New"}
                          </span>
                        </td>
                        <td className="crm__ta-right crm__mono">{fmtDate(l.createdAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        </div>

        <aside className="crm__side">
          <section className="crm__panel">
            <div className="crm__panel-head">
              <span className="crm__panel-title">Quick Actions</span>
            </div>
            <div className="crm__actions">
              <a className="crm__action crm__action--primary" href={`${ADMIN}/services/create`}>
                Create New Service <span className="arrow">→</span>
              </a>
              <a className="crm__action" href={`${ADMIN}/leads`}>
                Review Leads <span className="arrow">→</span>
              </a>
              <a className="crm__action" href={`${ADMIN}/media`}>
                Manage Media <span className="arrow">→</span>
              </a>
              <a className="crm__action" href={`${ADMIN}/services`}>
                Manage Services <span className="arrow">→</span>
              </a>
            </div>
          </section>

          <ContentControls />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
