# Payload CMS — schema + integration (form-ready)

These files are **complete and typed** but Payload is not installed yet, so
`src/payload` is excluded from `tsconfig.json` to keep `next build` green.

```
src/payload/
├─ fields/slug.ts                  reusable auto-slug field (from title)
├─ collections/
│  ├─ Media.ts                     uploads (Service hero image target)
│  ├─ Services.ts                  Services schema (tabs + groups)
│  └─ Leads.ts                     quotation requests
├─ payload.config.example.ts       wiring example → move to project root
└─ integration/
   ├─ getServiceBySlug.ts          Local API fetch for the Server Component
   └─ requestQuote.ts              "use server" action: create Lead + email stub
```

## Activate

1. Install:
   ```bash
   npm i payload @payloadcms/next @payloadcms/richtext-lexical @payloadcms/db-postgres
   ```
2. Move `payload.config.example.ts` → project root as `payload.config.ts`; add a
   Users (auth) collection; set `DATABASE_URI` and `PAYLOAD_SECRET` in `.env`.
3. Add the admin route + config alias (via `npx create-payload-app` or manually):
   `tsconfig` path `"@payload-config": ["./payload.config.ts"]`.
4. Remove `"src/payload"` from the `tsconfig.json` `exclude` array.
5. Generate types: `npx payload generate:types` → wire real types into the app.
6. Swap the current stub (`src/app/api/leads/route.ts` + `QuoteForm` fetch) for
   the `requestQuote` Server Action, and `src/lib/services.ts` reads for
   `getServiceBySlug`.

## Field → UI map (Services)

| Payload field | UI |
|---|---|
| `hero.headline` / `subheadline` / `image` | Authority hero |
| `technicalSpecs[] { label, value }` | Value Bento — Geist Mono specs |
| `inclusions[] { item }` | 12-point inclusions matrix |
| `sidebarInclusions[] { feature }` | sticky quote-card bullets |
| `faq[] { question, answer }` | FAQ accordion |
