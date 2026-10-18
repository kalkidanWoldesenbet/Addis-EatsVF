# AUTH.md

Session: an HMAC-signed, `HttpOnly`, `SameSite=Lax` cookie (`ae_session`, 7 days). Passwords are hashed with scrypt and a per-user salt. Signing and verifying live in `lib/session.js`.

## Private routes and actions, and their layers

| Route / action | Layer 1: middleware | Layer 2: page | Layer 3: inside the write or read |
| --- | --- | --- | --- |
| `/checkout` | cookie present? else redirect | `requireUser()` | `placeOrder` calls `getSession()` itself |
| `/orders` | cookie present? else redirect | `requireUser()` | `listOrders(session.userId)` |
| `/orders/[id]` | cookie present? else redirect | `requireUser()` | `getOrder(session.userId, id)` |
| `placeOrder` (action) | none | none | `getSession()`, then prices re-read from the menu on the server |
| `cancelOrderAction` (action) | none | none | `getSession()`, then `cancelOrder(userId, id)` |
| `/api/me` | none | none | `getSession()`; returns only the display name |

What each layer proves:
- **Middleware** (`middleware.js`) proves only that a cookie exists. It cannot verify the signature in the Edge runtime. It is a convenience redirect, not the security check.
- **Page** (`requireUser`) proves the cookie is genuine, unexpired and unmodified.
- **Inside the write** proves the caller is signed in *and* owns the record, even if the interface is bypassed.

## The three attacks

| # | Attack | Result | Line that stopped it |
| --- | --- | --- | --- |
| 1 | Signed out, call the write action from the console | Refused: "Your session has ended" | `placeOrder` in `app/actions.js`: `const session = await getSession(); if (!session) return …` |
| 2 | Signed in as another user, use their order id | Order not found; cancel does nothing | `getOrder` and `cancelOrder` in `lib/db.js` match on `o.id === id && o.userId === userId` |
| 3 | `/signin?next=https://example.com` | Lands on `/` after sign-in | `safeNext()` in `lib/safeNext.js`, called by `signIn` and `signUp` |

Also checked: changing the id in `/orders/<id>` returns the not-found page, identical to a missing id. Only ids and quantities are read from the browser; prices come from `lib/menu.js`. No secrets use the `NEXT_PUBLIC_` prefix.

## Known limits
No rate limiting on sign-in, no email verification, no password reset. See FUTURE.md.
