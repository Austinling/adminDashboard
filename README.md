# Rong Admin Dashboard

A React + TypeScript admin dashboard for managing students and payments, with analytics, filtering, and bilingual UI (English/Chinese). Built with Vite, Tailwind, and Cloudflare tooling.

## Highlights

- Secure login flow with JWT-based session checks and role-aware actions.
- Students management: search, filter, add/edit, delete (admin), and activity logs.
- Payments management: advanced filtering (status, date ranges, amounts), add/edit, delete (admin), and logs.
- Dashboard analytics: pie chart by student grade and payment status + line chart trends with calendar range and month/day mode.
- i18n support (EN/中文) with a language switch on the login screen.
- Clean layout with collapsible navigation and responsive main content.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- i18next / react-i18next
- Recharts
- Cloudflare Wrangler + @cloudflare/vite-plugin
- D1 Database
- Cloudflare Worker

## Routes

- `/login` – login screen + language switch
- `/dashboard` – analytics overview
- `/students` – student management
- `/payments` – payment management

## Environment Variables

Create a `.env` file:

VITE_API_BASE=https://your-api.example.com

This is used for all API requests (students, payments, login).

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – typecheck + production build
- `npm run preview` – build + preview locally
- `npm run deploy` – build + `wrangler deploy`

## Auth Notes

- JWT is stored in `localStorage` and validated on each protected route.
- Admin-only actions include bulk delete and edit controls.
- Session expiration redirects to login and clears stored tokens.

## Project Structure (high level)

- `src/main.tsx` – app bootstrap + routing
- `src/Layout.tsx` – app shell + navigation
- `src/Dashboard.tsx` – analytics
- `src/StudentsPage.tsx` – student CRUD + filters
- `src/PaymentsPage.tsx` – payments CRUD + filters
- `src/i18n.ts` – translations (EN/中文)

## Deployment

This project is set up to deploy with Cloudflare Wrangler. Make sure your environment variables are configured in your target environment before running:

1. **Configure Wrangler:** Ensure your `wrangler.toml` is set up with the correct `d1_databases` binding.
2. **Setup Secrets:** Set your JWT secret and any sensitive keys in Cloudflare:
   npx wrangler secret put JWT_SECRET
3. **Deploy** npm run deploy

## Database Initialization

npx wrangler d1 execute <DATABASE_NAME> --file=./schema.sql
