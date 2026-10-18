# DATA.md

| Query | Runs on | Key / source | Refresh rule | Why |
| --- | --- | --- | --- | --- |
| Menu | Server (static) | `lib/menu.js` | `revalidate = 3600` | Same for everyone, rarely changes, so it is built once and served from the CDN |
| Home page | Server (static) | `lib/menu.js` | Built once | No cookies read, so it stays static |
| Cart | Client | `localStorage` key `addis-eats-cart-v1` | Updates instantly; syncs across tabs | Private to this browser, needs instant feedback, and guests have no account yet |
| Who is signed in | Client (`fetch /api/me`) | Session cookie | `no-store`; re-fetched on every route change | Lets the layout stay static instead of reading cookies on every page |
| My orders | Server (dynamic) | `listOrders(session.userId)` | `revalidatePath('/orders')` after placing or cancelling | Per-user and private, so it must never be cached or shared |
| One order | Server (dynamic) | `getOrder(session.userId, id)` | `revalidatePath` after cancel | Same, plus ownership check |

Rendering choices: `/` and `/menu` are static; `/orders`, `/orders/[id]`, `/checkout`, `/signin` and `/signup` are dynamic (they read cookies or `searchParams`). The layout does not read cookies, which is why the static pages stay static.

Storage is a JSON file in `lib/db.js`, a stand-in for the Module 4 API and Module 5 databases. Every order function takes `userId`, so ownership scoping lives in the data layer.
