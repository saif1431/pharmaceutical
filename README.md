# Pharmaceutical Operations Control Center

A Next.js 16 + React 19 dashboard that centralizes procurement, production, quality, and executive insights for pharmaceutical manufacturing teams. The UI follows a modern enterprise design system with responsive layouts, motion, and live-looking KPI widgets to help demonstrate the platform to stakeholders.

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features at a Glance](#features-at-a-glance)
4. [Screens & Modules](#screens--modules)
5. [Project Structure](#project-structure)
6. [Data Sources](#data-sources)
7. [Getting Started](#getting-started)
8. [Development Notes](#development-notes)
9. [Current Status & Next Steps](#current-status--next-steps)
10. [Assets](#assets)
11. [Contact](#contact)

## Overview
- **Goal:** Provide an executive-grade control center for pharmaceutical operations so the client can review progress module by module.
- **Scope covered so far:** Dashboard landing page, Procurement, Supply Chain, Inventory, Production, Quality Control, Quality Assurance, Sales & Marketing, Finance & Administration, Management, Executive Insights, and Platform Settings.
- **UI system:** Tailwind CSS v4 with a custom design token set (`app/globals.css`) plus shadcn-inspired primitive components.
- **Animation & feedback:** `framer-motion` for transitions, `recharts` for KPI visuals, and `lucide-react` for iconography.

## Tech Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, CSS custom properties, `tw-animate-css`
- **UI Components:** Radix UI primitives, shadcn/ui patterns, custom Sidebar & PageHeader
- **State & Utilities:** React hooks (`useState`, custom `useIsMobile`), class-variance-authority, clsx
- **Charts & Motion:** `framer-motion`, `recharts`
- **Tooling:** Vite-style PostCSS pipeline, TypeScript 5, ESLint, Vercel Analytics integration

## Features at a Glance
| Module | Status | Highlights |
| --- | --- | --- |
| **Dashboard (/)** | ✅ Complete | KPI cards, animated hero, alerts, quick links, charts & activity feed
| **Procurement** | ✅ Complete | Supplier overview, purchase order table, hero metrics
| **Supply Chain** | ✅ Complete | Supplier health, warehouse utilization, demand vs. supply coverage, shipment tracker
| **Inventory** | ✅ Complete | Inventory control panel, stock tables, responsive grid
| **Production** | ✅ Complete | Production planning vs. execution cards, dual-column layout
| **Quality Control** | ✅ Complete | QC analytics, defect pie chart, checklist, deep links to submodules
| **Quality Assurance** | ✅ Complete | Compliance-focused dashboards and cards
| **Sales & Marketing** | ✅ Complete | Pipeline KPIs, CRM initiatives, regional performance, campaign orchestration
| **Finance & Admin** | ✅ Complete | Working capital KPIs, ledger monitors, expense lens, compliance checklist
| **Management & Corporate** | ✅ Complete | DMS, BI dashboards, audit streams, knowledge vault, risk tracking
| **Executive Insights** | ✅ Complete | Leadership-grade KPI deep dive screen
| **Settings** | ✅ Complete | Account, security, notification, integration, and theme controls

## Screens & Modules
- `app/page.tsx`: Dashboard landing with sections linking to every capability.
- `app/procurement`, `app/supply-chain`, `app/inventory`, `app/production`: Departmental workspaces using shared `PageHeader` + module-specific components.
- `app/quality-control` and nested routes (`raw-material`, `in-process`, `finished-goods`): QC hub with drill-down navigation.
- `app/quality-assurance`: Compliance tracking cards.
- `app/sales`, `app/finance`, `app/management`: Commercial, administrative, and corporate governance command centers.
- `app/insights`: Executive insights built on `components/dashboard-detail` (large KPI layout).
- `app/settings`: Platform settings with forms, switches, and integration cards.

## Project Structure
```
├── app/
│   ├── page.tsx                # Dashboard
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── globals.css             # Tailwind + design tokens
│   ├── [module]/page.tsx       # Procurement, Supply Chain, Inventory, Production, QC, QA, Sales, Finance, Management, Insights, Settings
│   └── quality-control/*       # Sub-routes for QC modules
├── components/
│   ├── sidebar.tsx             # Responsive navigation drawer
│   ├── page-header.tsx         # Standardized section header
│   ├── kpi-card.tsx, dashboard-* # Dashboard widgets
│   ├── procurement/*, inventory/*, production/*
│   ├── quality-control.tsx, quality-assurance.tsx
│   └── ui/*                    # Reusable UI primitives (buttons, inputs, etc.)
├── data/                       # Mock datasets for charts and tables
├── hooks/use-mobile.ts         # Media-query helper for sidebar
├── public/                     # Logos, favicons, placeholder imagery
├── styles/, lib/, types/       # Supporting tokens and helpers
├── package.json                # Scripts & dependency manifest
└── tsconfig.json               # TypeScript configuration
```

## Data Sources
All charts, tables, and KPIs currently consume static mock data from the `data/` directory (e.g., `data/inventory.ts`, `data/procurement.ts`). This keeps the UI demonstrable without a backend. Swapping these modules to live APIs later will only require updating the data provider functions.

## Getting Started
### Prerequisites
- Node.js 20 LTS (Next.js 16 recommends Node 18.17+, tested with Node 20)
- npm 10+ (or pnpm/yarn if you prefer)

### Installation & Scripts
```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Type-check & lint
npm run lint

# Build for production
npm run build && npm run start
```
_No environment variables are required yet. All content relies on the static data layer and public assets._

## Development Notes
- **Responsive navigation:** `components/sidebar.tsx` pairs with `hooks/use-mobile.ts` to collapse into a drawer on mobile.
- **Shared layout:** Every screen wraps in `<Sidebar />` and `PageHeader` to keep navigation and metadata consistent.
- **Animation system:** `framer-motion` variants handle staggered entrances on each page for a polished walkthrough.
- **Chart theming:** `recharts` components inherit CSS custom properties to stay on-brand in both light and dark modes.
- **Design tokens:** `app/globals.css` defines the palette, radii, and chart colors consumed across Tailwind utilities.
- **Status badges & forms:** Settings screen showcases form controls, switches, and badges pulled from the local shadcn-style UI kit.

## Current Status & Next Steps
### ✅ Completed for client demo
1. High-fidelity UI for every primary module listed above
2. Responsive layouts, theming, and motion
3. Mock data pipelines for KPIs, tables, and charts

### 🚧 Suggested upcoming work
1. Integrate authentication & RBAC (NextAuth or custom SSO)
2. Connect modules to live ERP/LIMS/MES APIs
3. Add real-time notifications (WebSocket/SSE) for alerts
4. Expand QA/QC sub-pages with forms for deviations & CAPA workflows
5. Write Playwright/Cypress smoke tests for navigation

## Assets
Brand assets live under `public/` (logo, favicons, placeholders). Update `app/layout.tsx` metadata if you replace them.

## Contact
Prepared by the development team. Share this README with the client to highlight what is already built and what is queued for the next milestone.
