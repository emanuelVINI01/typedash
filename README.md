# TypeDash

A mobile-first typing test that actually tells you *why* your WPM is what it is. TypeDash times a run, scores it for speed, accuracy and consistency, and — if you sign in with GitHub — remembers every result so you can watch the trend instead of guessing at it.

![TypeDash dashboard](public/dash_image.png)

## Features

- 30-second typing test with live WPM, timer and accuracy cards.
- Backspace-aware correction model — mistakes you fix don't count against you twice.
- Full keystroke telemetry submitted to the metrics API and re-derived server-side (never trusts a client-computed score).
- Results screen with a WPM-over-time chart for the run you just finished.
- Personal authenticated dashboard: history table, sortable filters, and Recharts trend lines for WPM, accuracy and duration.
- Public rankings by period — today, this week, this month, all time — one best result per person.
- Practice page with focused drills for accuracy, rhythm and burst speed.
- GitHub login via Auth.js / NextAuth, PostgreSQL persistence via Prisma.
- PT/EN interface with a flag-based language switcher.
- Dark, terminal-inspired UI with Framer Motion transitions and a mobile bottom-tab nav.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Auth.js / NextAuth
- Prisma 7 + PostgreSQL
- Recharts
- Zod
- Lucide React

## Pages

- `/` — typing test and a ranking preview.
- `/practice` — drills for accuracy, rhythm and burst speed.
- `/ranking` — public leaderboard, filterable by period.
- `/dashboard` — authenticated personal metrics dashboard.
- `/about` — what TypeDash is and how it's built.
- `/login` — GitHub authentication.

## Project Structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    metrics/route.ts
    metrics/me/route.ts
    metrics/ranking/route.ts
    words/route.ts
  about/page.tsx
  dashboard/page.tsx
  login/page.tsx
  practice/page.tsx
  ranking/page.tsx
  layout.tsx
  page.tsx
  globals.css
src/
  auth.ts
  prisma.ts
  components/
    dashboard/       # stat cards, charts, history table, filters
    layout/           # Footer
    main/             # header, typing test UI, results, ranking
    pages/            # page-level composition (e.g. About)
    shared/           # Flag, LanguageSwitcher
  context/            # LanguageContext
  hooks/              # typing test, dashboard/ranking data, metric submission
  i18n/                # en/pt dictionaries
  services/            # metrics-service.ts (Prisma access layer)
  types/
  utils/
prisma/
  schema.prisma
  migrations/
public/
  dash_image.png
  logo.png
  flags/
```

## Environment

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PRISMA_DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
```

For local GitHub OAuth, set the callback URL to:

```txt
http://localhost:3000/api/auth/callback/github
```

## Running Locally

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```

## Metrics Model

TypeDash records every keystroke during a run as a `{ key, time, expected }` event. When the test ends, the client posts the full log to `/api/metrics` — WPM, accuracy and duration are all recalculated server-side from that log, so the score you see is never something the client just handed over. Results are stored per authenticated user, and rankings select each user's best result within the selected period. See [`docs/api.md`](docs/api.md) for the full API reference.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for how to get set up, and please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT — see [LICENSE](LICENSE).
