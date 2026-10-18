# CHECKLIST.md: run on the deployed URL

**Security**
- [ ] Signed out, console: place an order → refused
- [ ] Signed in as B, open or cancel A's order id → not found / no effect
- [ ] `/signin?next=https://example.com` → lands on `/` after sign-in
- [ ] Change the id in `/orders/<id>` → not-found page
- [ ] Search the JS bundle (DevTools → Sources) for `SESSION_SECRET` or any key → nothing

**Performance and accessibility**
- [ ] Lighthouse mobile on `/`, `/menu` → record in PERF.md
- [ ] Keyboard only: menu → add → cart → checkout → place → cancel
- [ ] Real phone: open the live URL, nothing hover-only
- [ ] View source: one h1 per page; Network tab: nothing over about 150 kB

**Discovery and correctness**
- [ ] View source: absolute og:image URL; share the link to yourself → card with a picture
- [ ] `/sitemap.xml` has only public routes; `/robots.txt` disallows private ones
- [ ] Brand-new account: `/orders` shows the empty state; `/cart` shows the empty state
- [ ] Private window: whole flow works with no session or cache
- [ ] Double-click "Place order": exactly one order appears
- [ ] Fresh clone + README steps runs

**Last commit**
- [ ] `git status` clean, deployment matches last commit, no secrets in history
- [ ] README has the live URL and it opens
