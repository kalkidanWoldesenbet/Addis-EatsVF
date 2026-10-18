# FUTURE.md

What I cut on purpose, and why.

| Item | Why it was cut |
| --- | --- |
| Real database and API | Modules 4 and 5 build these; `lib/db.js` is the stand-in |
| Live order tracking | Needs server events or sockets; the order page shows status only |
| Online payment (Telebirr, cards) | Pay on delivery keeps the flow complete without a payments integration |
| Real dish photos | The SVG illustrations are light and licence-free; photos would need compressing to under about 150 kB each |
| Sign-in rate limiting and password reset | Needs email and a shared store |
| Order history filters | Nobody will miss them with a short history |
| Amharic translation | Valuable, but doubles the copy to maintain |
| Second theme, animations | Nobody will notice their absence |

Also from review (add after Day 50): ...
