# MostaJS Survey Starter — customer-satisfaction app

> A clean **satisfaction-survey app** (Next.js 15 + [@mostajs/orm](https://www.npmjs.com/package/@mostajs/orm)): landing page, a 5-question survey, a thank-you page, and an **admin dashboard** (totals, per-question averages as bar charts, free-text comments). Warm, mobile-friendly, **rename & go**. **No database to install** — it runs SQLite in WebAssembly and boots in your browser.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/apolocine/mostajs-survey-starter)
[![Open in Bolt.new](https://img.shields.io/badge/Open_in-Bolt.new-000?style=for-the-badge&logo=stackblitz)](https://bolt.new/github.com/apolocine/mostajs-survey-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

> 💡 Prefer **StackBlitz** to debug — its terminal shows install/build logs and errors clearly.

Built for a real use case: a marketing student measuring the satisfaction of 50 customers
of a local bakery ("Boulangerie du Marché"). Ships with **10 pre-filled demo responses** so
the admin dashboard is never empty.

---

## What's inside

| Route | Page |
|---|---|
| `/` | Landing — title + **Commencer** button |
| `/survey` | The 5 questions: global rating (★1–5), product quality, staff welcome, value for money (1–5), free comment |
| `/thanks` | Thank-you page after submit |
| `/admin` | Dashboard: total responses · average per question (bar chart) · list of comments |
| `POST /api/responses` | Stores one submission, redirects to `/thanks` |

- **Data model** — a single `SurveyResponse` entity (`lib/orm/schemas.ts`). Rename its fields
  to your own questions and the whole app follows.
- **Form submit via a Route Handler** (`app/api/responses/route.ts`) — a plain `<form>` with
  **no client JS**, which boots reliably in WebContainers (Bolt.new / StackBlitz).
- **Admin reads straight from the ORM** in a Server Component — bar widths are `avg / 5`,
  pure CSS, no chart library.

## Run it

```bash
npm install
npm run dev          # → http://localhost:3000
```

Default database is **sqljs** (SQLite WASM) in-memory — zero setup, zero native binary.
Switch to a durable DB with one env (no code change), see [`.env.example`](./.env.example):

```bash
DB_DIALECT=sqlite   DATABASE_URL=./app.db           # local Node (npm i better-sqlite3)
DB_DIALECT=postgres DATABASE_URL=postgres://user:pass@host/db
```

## Rename & go

1. Edit the questions: rename the fields in `lib/orm/schemas.ts` and the labels in
   `app/survey/page.tsx` + `app/admin/page.tsx` (`METRICS`).
2. Change the title/colors in `app/page.tsx` and `app/globals.css` (`--accent`, `--accent-2`).
3. Replace the demo data in `lib/orm/seed-on-boot.ts` (or set `ORM_SEED_ON_BOOT=0` to start empty).

## Admin access

`/admin` is **open by default** (fine for a local demo). To gate it behind a shared key,
set `ADMIN_KEY=...` in `.env` and open `/admin?key=...`.

---

## License

MIT — see [`LICENSE`](./LICENSE).

**Author**: Dr Hamid MADANI <drmdh@msn.com>
