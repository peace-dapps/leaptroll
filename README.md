# LeapTroll ($LEAPTROLL) — landing site

Real troll. Real cause. Real community.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy
Push to GitHub → import on vercel.com.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom dark + troll-blue theme)
- next/font (Anton + Space Grotesk + JetBrains Mono + Caveat)
- Live DexScreener data via `/api/price` route (revalidates every 30s)

## Sections
1. Nav + live price ticker (price · 24h · 1h · MC · vol · liq)
2. Hero with anti-rug urgency framing
3. Marquee strip
4. Manifesto — 3am dev tone, named targets (@leap_xyz, @donate.gg)
5. Graveyard — 5 tombstones for dead charity tokens
6. Tokenomics with **live** market data + static facts
7. How to buy — 4 steps
8. Roadmap — 4 phases
9. Final CTA + footer

## Live data endpoint
`/app/api/price/route.ts` proxies `api.dexscreener.com/latest/dex/tokens/<CA>`.
Token CA is hardcoded. Revalidates every 30s.

## Edit copy
- All text in `app/page.tsx`
- Color tokens in `tailwind.config.js`
- Visual effects (sticker shadows, glow, tombstones, warning tape) in `app/globals.css`
