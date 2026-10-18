# PERF.md

Measured with Lighthouse (mobile, throttled) on the **deployed** URL. Fill in both columns from your own runs. Do not guess.

| Metric | Target | Before | After | What caused the change |
| --- | --- | --- | --- | --- |
| LCP (home) | under 2.5 s | | | |
| LCP (menu) | under 2.5 s | | | |
| CLS | under 0.1 | | | |
| INP | under 200 ms | | | |
| Largest image | under about 150 kB | | | |
| First-load JS (`npm run build` table) | note it | | | |
| Accessibility score | 95+ | | | |

## Built in from the start (so "before" may already be good)
- Dish images are small local SVG illustrations (1 to 5 kB each, 28 kB for all twelve) with fixed width and height, so there is no layout shift. System font stack, no web fonts.
- `/` and `/menu` are statically rendered.
- Client JavaScript is limited to the cart, quantity steppers, forms and the header.
- Dynamic pages stream with `loading.js`.

## Ideas to try, then record here
- Compare Lighthouse on the dynamic `/orders` page against the static `/menu`.
- Note the effect of removing the header's `/api/me` fetch (or keep it and explain why).
