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
    <section className="ed-card ed-card--wide" aria-labelledby="ed-setup">
      <h2 className="ed-card__title" id="ed-setup">
        Starting from scratch?
      </h2>
      <p className="ed-card__note ed-card__note--tight">
        Sample content fills the website with example services, photos, and posts so you
        can see how it looks. Clearing removes everything — there is no undo.
      </p>
      <div className="ed-setup">
        <button
          type="button"
          className="ed-btn ed-btn--primary"
          onClick={seed}
          disabled={busy}
        >
          Load sample content <span className="ed-btn__arrow" aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          className="ed-btn ed-btn--danger"
          onClick={purge}
          disabled={busy}
        >
          Clear all content <span className="ed-btn__arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <p
        aria-live="polite"
        className={`ed-setup__status ed-setup__status--${status.tone}`}
      >
        {status.text}
      </p>
    </section>
  );
};

export default ContentControls;
