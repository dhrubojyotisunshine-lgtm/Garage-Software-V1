# Enterprise Garage ERP

Full-stack ERP for multi-branch automotive garages — workshop, inventory, sales,
purchase, insurance, finance and HR.

**Current phase:** frontend foundation. Templates T01–T11 are built; module
development has not started.

---

## Getting started

```bash
npm install          # from the repo root — npm workspaces, no pnpm needed
npm run dev          # http://localhost:5173
npm run build        # typecheck + production build
```

Requires Node 20+. Developed on Node 22.

---

## Repository layout

```
apps/
  web/                    React 19 + Vite + TypeScript
    src/
      app/
        shell/            AppShell, GlobalHeader, Sidebar, GlobalSearch
        navigation/       menu registry, global-create registry
        routes/           full route map from 02_NAVIGATION.md §12
        context/          branch / financial-year / user store
      mock/               API-shaped demo data
      pages/showcase/     T01–T11 working demos
packages/
  ui/                     design system + element library + templates
    src/theme/            tokens, AntD ThemeConfig, status colours, print CSS
    src/components/       shared element library
    src/templates/        T01 … T11
  shared/                 types, status maps, money/format utils, Zod schemas
```

### Why this split

`packages/shared` contains no React, no Ant Design, no Express. It holds the
things both the browser and the future API must agree on — status vocabularies,
money arithmetic, validation schemas, state machines. When the backend is added
it imports this package rather than reimplementing the rules.

---

## Specification

The build follows six specification documents in this repository:

| Doc | Contents |
|---|---|
| [01_ADMIN_THEME.md](01_ADMIN_THEME.md) | Design system, colour, typography, AntD theme config |
| [02_NAVIGATION.md](02_NAVIGATION.md) | Shell, sidebar, complete route map, shortcuts |
| [03_PAGE_TEMPLATES.md](03_PAGE_TEMPLATES.md) | T01–T11 page templates |
| [04_ALL_MODULES.md](04_ALL_MODULES.md) | Module and business-object architecture |
| [05_MODULE_FLOWS-*.md](05_MODULE_FLOWS-03_WORKSHOP.md) | Per-module process specifications |
| [06_MERN_IMPLEMENTATION_PLAN.md](06_MERN_IMPLEMENTATION_PLAN.md) | Full-stack delivery plan |

Code comments reference these by section (e.g. `§14`) so any decision can be
traced back to its source.

---

## Core rules

These are enforced by structure, not by review:

1. **No hard-coded colours or dimensions** outside `packages/ui/src/theme/`.
2. **Money is always integer paise.** Never a float, never a formatted string.
3. **Status colour comes from a tone**, resolved through
   `packages/shared/src/domain/statusMaps.ts`. A module never picks a colour.
4. **Every screen uses a template.** No bespoke page layout.
5. **One date format** across the whole ERP.
6. **Empty values render `—`**, never blank.
7. **All six page states** (loading, empty-new, empty-filter, error, forbidden,
   normal) are handled by every screen.
8. **Two levels of navigation, maximum.** No menu item for a process step.

---

## Template gallery

`/showcase` renders all eleven templates with realistic data.

| | Template | Demo route |
|---|---|---|
| T01 | Dashboard | `/dashboard` |
| T02 | List Page | `/workshop/job-cards` |
| T03 | Business Workspace | `/workshop/job-cards/jc-1/overview` |
| T04 | Detail Page | `/crm/customers/c-1/overview` |
| T05 | Add / Edit Form | `/inventory/products/new` |
| T06 | Operational Board | `/workshop/queue` |
| T07 | Report | `/reports` |
| T08 | Settings | `/settings/general` |
| T09 | Master Management | `/masters` |
| T10 | Transaction / POS | `/counter-sale/new` |
| T11 | Print / Document | `/showcase/t11` |

Routes that are specified but not yet built render a placeholder naming the
screen and its template — every route in the specification resolves to
something.

---

## Keyboard shortcuts

`Ctrl/Cmd + K` search · `Ctrl/Cmd + B` sidebar · `Ctrl/Cmd + Shift + N` create ·
`G` then `D`/`J`/`C`/`L`/`P`/`S`/`R` navigate.

POS: `F2` search · `F4` customer · `F9` hold · `F12` pay · `Esc` cancel.

---

## Next phase

Workshop module as the first vertical slice — 194 spec sections in
[05_MODULE_FLOWS-03_WORKSHOP.md](05_MODULE_FLOWS-03_WORKSHOP.md), covering job
card lifecycle from check-in through delivery.
