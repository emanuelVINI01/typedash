# TypeDash

TypeDash is a mobile-first typing performance platform for measuring speed, accuracy and consistency. It captures typing telemetry, computes WPM, saves authenticated results, renders personal dashboards and exposes period-based rankings.

## Short Description

Typing speed lab with Dracula UI, Framer Motion animations, GitHub authentication, WPM/accuracy telemetry, Recharts dashboards, ranking pages, practice resources and mobile bottom navigation.

## Features

- 30-second typing test.
- Live WPM, timer and accuracy cards.
- Backspace-aware correction model.
- Keystroke telemetry submitted to the metrics API.
- Results screen with WPM trend chart.
- Personal authenticated dashboard with history, filters and charts.
- Public ranking periods: today, week, month and all time.
- Practice resource page with training drills.
- About page describing architecture and product goals.
- GitHub login through Auth.js / NextAuth.
- PostgreSQL persistence through Prisma.
- Mobile-first Dracula theme with Framer Motion transitions.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Auth.js / NextAuth
- Prisma 7
- PostgreSQL
- Recharts
- Zod
- Lucide React
- random-words

## Pages

- `/` - typing test and ranking preview.
- `/treino` - practice drills and training loop.
- `/ranking` - public ranking by period.
- `/dashboard` - authenticated personal metrics dashboard.
- `/sobre` - project overview.
- `/login` - GitHub authentication.

## Project Structure

```txt
app/
  api/
    auth/[...nextauth]/route.ts
    metrics/
    words/route.ts
  dashboard/page.tsx
  login/page.tsx
  ranking/page.tsx
  sobre/page.tsx
  treino/page.tsx
  page.tsx
src/
  auth.ts
  prisma.ts
  components/
    dashboard/
    layout/
    main/
  services/
  types/
prisma/
  schema.prisma
public/
  dash_image.png
  logo.png
```

## Environment

Create `.env` in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PRISMA_DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
```

For local GitHub OAuth, configure:

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
npm run dev
npm run build
npm run start
npm run lint
```

## Metrics Model

TypeDash records typing events during a test. At the end of a run, the client posts the log to the metrics API. The service calculates WPM, accuracy and duration, then stores the result for authenticated users. Rankings select the best result per user for the selected period.

## License

No open-source license is declared yet.
