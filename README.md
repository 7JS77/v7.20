# Aurexon v7.20 — Physical Commodity Intelligence Platform

> High-value commodity intelligence for metals, energy, and agricultural trading desks.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 (custom design system) |
| i18n | next-intl v3 (EN / DE / ES) |
| Charts | Recharts v2 |
| React | 18.3 |

---

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root locale layout (Navigation, PriceTicker, Footer)
│       ├── page.tsx            # Home page (hero, feature cards, market preview)
│       ├── markets/page.tsx    # Markets page (table + chart + calculator)
│       └── incoterms/page.tsx  # Incoterms® 2020 interactive tool
├── components/
│   ├── MarketTable.tsx         # ★ Phase 1 — advanced table with watchlist & sparklines
│   ├── CommodityChart.tsx      # ★ Phase 1 — recharts line chart with timeframes
│   ├── BasisCalculator.tsx     # ★ Phase 1 — delivered price basis calculator
│   ├── IncotermsClient.tsx     # ★ Phase 2 — ICC Incoterms® 2020 interactive tool
│   ├── MarketsClient.tsx       # Markets page client shell (dynamic chart import)
│   ├── Navigation.tsx          # Fixed header with locale switcher + mobile menu
│   ├── Footer.tsx              # Site footer
│   ├── HeroSection.tsx         # Landing hero
│   └── PriceTicker.tsx         # Animated price strip
├── lib/
│   ├── incotermsData.ts        # ★ Phase 2 — ICC Incoterms® 2020 data (trilingual)
│   └── mockData.ts             # 13 commodity rows + physical context notes
└── i18n/
    ├── routing.ts              # next-intl locale config
    └── request.ts              # next-intl server config

messages/
├── en.json                     # English (147 keys, 11 namespaces)
├── de.json                     # Deutsch (147 keys)
└── es.json                     # Español (147 keys)
```

---

## Features Implemented (v7.20)

### Phase 1 — Market Intelligence

**`MarketTable.tsx`**
- Filter tabs: All / Metals / Energy / Agriculture / Watchlist
- Hydration-safe `localStorage` watchlist (star icon per row)
- Sortable columns: Name, Price, Change, % Change, Volume
- Mock Volume column with formatted display (K/M suffix)
- Pure-SVG 1-week sparklines (no external dependency)
- Category badges (gold=metals, orange=energy, green=agri)
- Skeleton loading state with staggered animation

**`CommodityChart.tsx`**
- Recharts `LineChart` with 180-day mock history (realistic random walk, weekends excluded)
- Timeframe selector: 1D / 5D / 1M / 6M
- Custom tooltip matching `bg-ink-3 / border-gold` design system
- Physical Market Context note per commodity
- Reference line at period open price
- Animated line with area gradient fill

**`BasisCalculator.tsx`**
- Fields: Base Spot Price · Premium/Discount · Freight & Logistics
- Advanced toggle: Marine Insurance Rate (% of CIF)
- Real-time delivered price + total landed cost
- Implied basis in basis points
- `Request Firm Quote` → `mailto:` with pre-filled body (or `onRequestQuote` callback for modal)

### Phase 2 — Incoterms® 2020

**`IncotermsClient.tsx`**
- All 11 ICC Incoterms® 2020 rules
- Filter tabs: All Rules / Any Mode / Sea Only
- Grouped display with mode sub-headers when "All" selected
- **Visual Transfer Timeline** — 5-step horizontal CSS grid with gold (seller) / sky (buyer) colouring and triangle transfer markers for both Risk and Cost rows
- **Split-transfer badge** for C-rules (CPT, CIP, CFR, CIF)
- **6-cell Responsibility Matrix** — Export, Loading, Carriage, Insurance, Unloading, Import — with inline SVG icons and colour-coded badges
- Full EN / DE / ES trilingual support (nameDE/nameES, descriptionDE/descriptionES)

---

## Design System Tokens

```
bg-ink        #080B10   Page background
bg-ink-2      #0E1219   Card / surface
bg-ink-3      #141B25   Elevated surface
text-gold     #D4AF37   Brand accent (Seller colour)
gold-dark     #B8962E   Hover state
border-subtle #141C2C   Subtle dividers
text-secondary#8B9CB6   Labels / captions
success       #22C55E   Positive change
error         #EF4444   Negative change
sky-400       #38BDF8   Buyer colour (Incoterms)
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aurexon.com` | Canonical URL for OG tags |
| `NEXT_PUBLIC_QUOTE_EMAIL` | `trading@aurexon.com` | Mailto recipient for quote requests |

---

## Replacing Mock Data with Live Prices

`src/lib/mockData.ts` exports `MOCK_COMMODITIES` typed as `CommodityRow[]`.  
Replace with a `use server` fetch inside each page or a SWR hook in `MarketsClient.tsx`:

```ts
// Example SWR integration
const { data, isLoading, error } = useSWR<CommodityRow[]>(
  '/api/commodities',
  fetcher,
  { refreshInterval: 15_000 }
);
```

Pass `data ?? []` as the `rows` prop to `<MarketTable>` and `<MarketsClient>`.

---

## Locale Routing

| URL | Locale |
|---|---|
| `/` | English (default) |
| `/de` | Deutsch |
| `/es` | Español |
| `/markets` | English |
| `/de/markets` | Deutsch |

---

*Incoterms® is a registered trademark of the International Chamber of Commerce (ICC).*  
*This platform is for informational purposes only. Not investment advice.*
