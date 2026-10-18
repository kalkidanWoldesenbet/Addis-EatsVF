# Addis Eats

Food ordering for Addis Ababa, built with Next.js (App Router). Browse the menu, build an order, sign in, check out, and follow your orders. Pay on delivery.

**Live URL:** https://REPLACE-ME.vercel.app

## Run it from a fresh clone

```bash
git clone <your-repo-url> addis-eats
cd addis-eats
npm install
cp .env.example .env.local   # then fill in SESSION_SECRET
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `SESSION_SECRET` | production | 16+ random characters; signs the session cookie |
| `NEXT_PUBLIC_SITE_URL` | recommended | Absolute URL for og:image, sitemap and robots |
| `DATA_FILE` | no | Where users and orders are stored (defaults to the OS temp folder) |

Data is stored in a JSON file as a stand-in for the API and databases built in Modules 4 and 5, so on serverless hosts it resets when the server restarts. Create a fresh account to test.

## Documents

[AUTH.md](AUTH.md) · [DATA.md](DATA.md) · [PERF.md](PERF.md) · [FUTURE.md](FUTURE.md) · [CHECKLIST.md](CHECKLIST.md)
