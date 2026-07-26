"use client";

import React, { useState } from "react";

type Status = { tone: "idle" | "busy" | "ok" | "err"; text: string };

export const ContentControls: React.FC = () => {
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });
  const busy = status.tone === "busy";

  async function call(path: string, label: string) {
    setStatus({ tone: "busy", text: `${label}…` });
    try {
      const res = await fetch(path, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setStatus({ tone: "ok", text: `${label} complete.` });
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      setStatus({ tone: "err", text: err instanceof Error ? err.message : "Failed" });
    }
  }

  function seed() {
    call("/api/seed-samples", "Loading sample content");
  }

  function purge() {
    const ok = window.confirm(
      "Delete ALL content — services, categories, gallery, posts, leads, and media? This cannot be undone.",
    );
    if (ok) call("/api/purge", "Clearing content");
  }

  return (
    <section className="crm__panel">
      <div className="crm__panel-head">
        <span className="crm__panel-title">Content Setup</span>
      </div>
      <div className="crm__actions">
        <button
          type="button"
          className="crm__action crm__action--primary"
          onClick={seed}
          disabled={busy}
        >
          Load Sample Content <span className="arrow">→</span>
        </button>
        <button
          type="button"
          className="crm__action crm__action--danger"
          onClick={purge}
          disabled={busy}
        >
          Clear All Content <span className="arrow">→</span>
        </button>
      </div>
      {status.text && (
        <p className={`crm__setup-status crm__setup-status--${status.tone}`}>{status.text}</p>
      )}
    </section>
  );
};

export default ContentControls;
