# ENTERPRISE GARAGE ERP
# 06_MERN_IMPLEMENTATION_PLAN.md
# FULL-STACK IMPLEMENTATION PLAN (MongoDB · Express · React · Node)

Version: 1.0
Status: PROPOSED — awaiting approval
Date: 2026-08-03
Scope: Complete product (backend + frontend), replacing the "Frontend UI Only" phase constraint

---

## 0. WHAT THIS PLAN IS BASED ON

Documents read:

| File | Lines | Role |
|---|---|---|
| 04_ALL_MODULES.md | 3,699 | Master module & business-object architecture (111 sections) |
| 05_MODULE_FLOWS-01_DASHBOARD.md | 2,456 | 98 sections |
| 05_MODULE_FLOWS-02_CRM.md | 3,318 | 122 sections |
| 05_MODULE_FLOWS-03_WORKSHOP.md | 5,458 | 194 sections — the core module |
| 05_MODULE_FLOWS-04_INVENTORY.md | 3,439 | 132 sections |
| 05_MODULE_FLOWS-05_VEHICLE_SALES.md | 4,215 | 162 sections |
| 05_MODULE_FLOWS-06_PURCHASE_VENDOR.md | 3,597 | 137 sections |
| 05_MODULE_FLOWS-07_CRM_CUSTOMER.md | 3,367 | 130 sections |
| 05_MODULE_FLOWS-08_INSURANCE_WARRANTY.md | 3,815 | 134 sections |
| 05_MODULE_FLOWS-09_FINANCE_ACCOUNTS.md | 3,623 | 140 sections |
| 05_MODULE_FLOWS-10_EMPLOYEE_HR.md | 3,522 | 143 sections |
| 05_MODULE_FLOWS-11_REPORTS_ANALYTICS.md | 3,809 | 148 sections |
| 05_MODULE_FLOWS-12_ADMIN_SETTINGS_ACCESS_CONTROL.md | 4,205 | 161 sections |
| **Total** | **48,523** | **~1,701 spec sections** |

The specification is unusually complete at the *process* level. It defines 16 modules, their
business objects, workspace sections, statuses, actions, cross-module relationships, and an
explicit set of anti-patterns to avoid. The architecture principle — **organize around business
work, not features; "feature rich does not mean menu rich"** — is sound and should be preserved
exactly as written.

---

## 1. GAPS FOUND IN THE SPECIFICATION

These must be closed before or during Phase 1. None are blockers for planning, all are blockers
for consistent implementation.

### 1.1 Missing foundation documents (HIGH priority)

`04_ALL_MODULES.md` §105 instructs that every module generation must first read:

```
00_GLOBAL_CLAUDE_INSTRUCTIONS.md
01_ADMIN_THEME.md
02_NAVIGATION.md
03_PAGE_TEMPLATES.md
```

**None of these four files exist in the folder.** This matters most for `03_PAGE_TEMPLATES.md`:
templates **T01–T11** are referenced throughout all 13 documents (§99 maps every business object
to a template) but are never defined anywhere. Inferred from usage:

| Template | Inferred meaning | Referenced by |
|---|---|---|
| T01 | Dashboard | Dashboard, all module dashboards |
| T02 | List / Index page | Lead List, Customer List, Job Card List, Product List, Vehicle Stock |
| T03 | Primary Business Workspace | Lead, Job Card, Vehicle Sale, Purchase Order, Insurance Claim, AMC |
| T04 | Entity Detail / 360 view | Customer, Product, Vendor, Insurance Policy, Employee |
| T05 | (unclear) — transaction form | Finance Transaction |
| T06 | Operational Board | Vehicle Queue, Bay Board, Technician Board, Service Calendar |
| T07 | Report Template | All reports |
| T08 | Settings Template | Settings |
| T09 | Master Management | Master Center |
| T10 | (never referenced) | — |
| T11 | Print / Document Preview | All PDFs |

T05 and T10 are ambiguous. **These 11 templates are the single highest-leverage artifact in the
whole project** — roughly 120+ screens compose from them. They must be defined precisely before
any UI is written.

### 1.2 Missing module flow documents

`04_ALL_MODULES.md` §104 plans 16 flow files. Twelve exist, and the numbering diverged from the
plan. Comparing planned vs. actual:

| Module | Flow doc status |
|---|---|
| 01 Dashboard | ✅ exists |
| 02 CRM | ✅ exists (plus a second overlapping doc, see 1.3) |
| 03 Workshop | ✅ exists |
| 04 Inventory | ✅ exists |
| 05 Vehicle Sales | ✅ exists |
| **06 Counter Sale** | ❌ **MISSING** |
| 07 Purchase & Vendor | ✅ exists |
| 08 Insurance | ✅ exists (extended to cover Warranty) |
| **09 Customer Programs** (Membership / Loyalty / AMC / Wallet) | ❌ **MISSING** |
| 10 Finance & Accounts | ✅ exists |
| 11 HRM | ✅ exists |
| 12 Reports & Analytics | ✅ exists |
| **13 Masters** | ❌ **MISSING** |
| 14 Administration | ✅ merged into doc 12 |
| 15 Settings | ✅ merged into doc 12 |
| **16 Help Center** | ❌ **MISSING** |

Counter Sale and Customer Programs are real transactional modules with financial and stock
consequences — they cannot be built from `04_ALL_MODULES.md` alone (§1 of that file explicitly
forbids inventing detail from it). Masters and Help Center are lower-risk.

### 1.3 Two overlapping CRM documents

`05_MODULE_FLOWS-02_CRM.md` (122 sections) and `05_MODULE_FLOWS-07_CRM_CUSTOMER.md` (130
sections) both specify Lead List, Lead Workspace, Follow-Up, Appointments, Lead Conversion,
Customer List and Customer 360. They are not identical — doc 07 adds Lead Types/Priority,
Existing Customer Detection and Business Customer handling; doc 02 adds Customer Merge, Tags,
Import/Export and Fleet preparation. **These must be reconciled into one authoritative CRM spec**
before CRM is built, or the two will produce conflicting field sets and status vocabularies.

### 1.4 Specification says "no backend" — this plan contradicts it deliberately

The docs are explicit and repeated: *"Implementation Phase: Frontend UI Only"*, §109 *"DO NOT
generate backend/API/database code"*, §184 lists deliverables as flat `.html` files
(`job-card-workspace.html`, etc.), and §70/§80 defer permission enforcement and document
numbering to a later phase.

You have asked for MERN, i.e. full-stack. That is a reasonable change of direction — building the
UI as static HTML and then rewriting it in React would waste the effort — but it means:

- The `.html` file lists in each flow doc (§184 in Workshop, §113 in CRM, etc.) should be read as
  **route/screen inventories**, not literal deliverables. They translate 1:1 to React routes.
- Rules deferred as "not needed in UI phase" (permission enforcement, document numbering,
  accounting logic, validation) now **do** need designing, and the specs do not fully define them.
  §53 explicitly says *"Exact accounting logic will be defined later."* That is the largest
  remaining specification gap for the Finance module.

**Recommendation:** update the header of `04_ALL_MODULES.md` to state the phase is now full-stack,
so the "DO NOT generate backend" rule stops contradicting active work.

### 1.5 MongoDB versus the Finance module — an honest flag

The Finance & Accounts module specifies double-entry-shaped concepts: ledgers, trial balance,
P&L, balance sheet, journal/contra vouchers, receivable & payable ageing, cheque lifecycle,
payment reversal, GST (CGST/SGST/IGST, HSN/SAC), and financial-year scoping. Inventory
additionally requires atomic stock reservation and issue across branches.

A relational database is the conventional fit for that work. MongoDB **can** do it correctly —
multi-document ACID transactions are supported — but only on a **replica set** (never a
standalone `mongod`), and correctness becomes an application-layer discipline rather than
something the database enforces for you.

This is a real trade-off, not a blocker. Section 4.6 below specifies exactly how to make it safe.
Proceeding with MongoDB as you requested; flagging so the constraint is a chosen one.

### 1.6 Undefined but required for a real Indian garage ERP

Not covered anywhere in the specs, needed before go-live:

- GST return formats / e-invoice (IRN, QR) / e-way bill — whether in scope
- TDS, TCS handling on vendor payments
- Statutory payroll: PF, ESI, PT, income tax slabs (§60 says only "Tax / Statutory preparation")
- Data retention, backup/restore, and disaster recovery policy
- Concurrency rules: two service advisors editing the same Job Card
- Offline behaviour for Counter Sale / POS if the network drops

---

## 2. RECOMMENDED ARCHITECTURE

### 2.1 Repository layout — monorepo

```
garage-erp/
├─ apps/
│  ├─ api/                    # Node + Express + TypeScript
│  └─ web/                    # React + Vite + TypeScript
├─ packages/
│  ├─ shared/                 # Zod schemas, TS types, enums, status machines, money utils
│  ├─ ui/                     # Design system: T01–T11 templates + primitives
│  └─ config/                 # eslint, tsconfig, tailwind presets
├─ docs/                      # the existing 04/05 specs move here
├─ docker-compose.yml         # mongo replica set, redis, minio, mailhog
└─ package.json               # pnpm workspaces + turborepo
```

**Why monorepo:** the single most valuable property in this project is that a status enum, a
validation rule, or a money type is defined **once** and shared by both server and client. With
1,700 spec sections and ~25 status vocabularies, drift between frontend and backend definitions
is the most likely source of long-term bugs. `packages/shared` prevents it structurally.

**Tooling:** pnpm workspaces + Turborepo, TypeScript strict mode everywhere (non-negotiable at
this scale), ESLint + Prettier, Vitest.

### 2.2 Backend stack

| Concern | Choice | Note |
|---|---|---|
| Runtime | Node.js 22 LTS | |
| Framework | Express 5 + TypeScript | Spec says MERN; Express 5 has native async error handling |
| ODM | Mongoose 8 | Schema validation, plugins, discriminators, transaction support |
| Database | MongoDB 7+ **as a replica set** | Required for ACID transactions — see 4.6 |
| Validation | Zod, shared with frontend | One schema drives API validation + RHF form validation |
| Auth | JWT access (15 min) + refresh (7 d, rotating, httpOnly cookie) | Argon2id password hashing |
| Authorization | Custom RBAC middleware | Doc 12 §36–60 defines the permission model in detail |
| Cache / queue | Redis + BullMQ | Reminders, notifications, report pre-aggregation, PDF generation |
| Files | S3-compatible (MinIO in dev) | Photos, voice notes, signatures, documents, generated PDFs |
| PDF | Puppeteer worker (BullMQ job) | 17+ print documents across the modules |
| Realtime | Socket.IO | Bay Board, Vehicle Queue, Technician Board, notifications |
| Logging | Pino + request-id correlation | |
| API docs | OpenAPI generated from Zod | |

**Layering** — enforced by folder structure and lint rules:

```
routes/      HTTP verbs, path params, middleware wiring only
controllers/ request → DTO → service call → response shaping. No business logic.
services/    ALL business logic. Transaction boundaries live here.
models/      Mongoose schemas + plugins. No business logic.
```

Business logic must never live in a controller or a Mongoose hook — in an ERP with this many
cross-module side effects, logic hidden in hooks becomes untraceable.

### 2.3 Frontend stack

| Concern | Choice | Note |
|---|---|---|
| Framework | React 19 + Vite | |
| Routing | React Router 7 | Nested routes map naturally to workspace tabs |
| Server state | TanStack Query 5 | Caching, invalidation, optimistic updates |
| Client state | Zustand | Branch context, FY context, UI prefs. Deliberately small. |
| Forms | React Hook Form + Zod resolver | Shared schemas from `packages/shared` |
| Tables | TanStack Table | ~40 list screens need sort/filter/paginate/column-config |
| Charts | Recharts | Reports & Analytics module |
| Styling | Tailwind CSS + shadcn/ui | **Open decision — see §7.1** |
| Dates | date-fns + Luxon for TZ | |
| i18n | i18next | Doc 12 §10 specifies regional settings |

### 2.4 The template system is the core of the frontend

`packages/ui` implements T01–T11 as composable React components. Every screen in the ERP is a
configuration of one of them. Concretely:

```tsx
// A list screen is data, not layout code.
<T02ListPage
  title="Job Cards"
  statusCounts={counts}          // Workshop §6
  quickFilters={JOB_CARD_QUICK_FILTERS}
  filters={JOB_CARD_FILTERS}     // Workshop §7
  columns={JOB_CARD_COLUMNS}     // Workshop §8
  query={useJobCards}
  onRowClick={openWorkspace}
  bulkActions={...}
  exportable
/>
```

```tsx
// A workspace is a header + progress bar + tab registry.
<T03Workspace
  header={<JobCardHeader />}         // Workshop §10–11
  progress={JOB_CARD_STAGES}         // Workshop §12
  tabs={JOB_CARD_TABS}               // Workshop §13
  quickActions={...}                 // Workshop §165
  moreActions={...}                  // Workshop §166
/>
```

If the templates are right, module 6 costs a fraction of module 1. If they are wrong or skipped,
every module re-implements layout and the "one consistent ERP interaction language" requirement
(§100) fails. **Do not start module work until T01–T11 are approved.**

---

## 3. DOMAIN MODEL

### 3.1 Shared core entities — defined once, referenced everywhere

§102 forbids duplicating these. They get their own collections and are referenced by ObjectId:

`Company` · `Branch` · `User` · `Role` · `Employee` · `Customer` · `Vehicle` · `Vendor` ·
`Product` · `InsuranceCompany` · `FinanceCompany` · plus all Masters (§66: ~30 master types).

**Masters implementation note:** the ~30 master types (Manufacturer, Model, Variant, Fuel Type,
Service Type, Complaint, Labour Type, Bay, Category, Brand, Unit, HSN/SAC, Tax, Payment Mode,
Bank, Expense Head, Department, Designation, Shift, Leave Type, …) share an identical CRUD shape.
Build **one generic master engine** — a registry describing each master's fields, validation and
parent relationships — plus one `T09` UI. Do not write 30 controllers and 30 screens.

### 3.2 Transactional collections by module

- **CRM** — `Lead`, `FollowUp`, `Appointment`, `Communication`
- **Workshop** — `JobCard` (large aggregate), `Inspection`, `Estimate`, `RepairTask`,
  `QualityCheck`, `GatePass`, `Feedback`
- **Inventory** — `StockTransaction` (ledger), `StockBalance` (derived), `StockReservation`,
  `StockTransfer`, `PhysicalVerification`
- **Vehicle Sales** — `SaleVehicle`, `VehicleSale`, `Quotation`, `Booking`, `TestDrive`
- **Counter Sale** — `CounterSale`, `HeldSale`
- **Purchase** — `PurchaseRequest`, `RFQ`, `VendorQuotation`, `PurchaseOrder`, `GRN`,
  `PurchaseInvoice`, `PurchaseReturn`
- **Insurance** — `InsurancePolicy`, `InsuranceClaim`, `Survey`, `Warranty`, `WarrantyClaim`
- **Customer Programs** — `Membership`, `LoyaltyAccount`, `LoyaltyTransaction`, `AMC`,
  `AMCUsage`, `Wallet`, `WalletTransaction`
- **Finance** — `Invoice`, `Payment`, `JournalEntry`, `Account`, `Voucher`, `Expense`, `Cheque`
- **HRM** — `Attendance`, `Leave`, `SalaryStructure`, `Payslip`, `PerformanceReview`
- **Platform** — `AuditLog`, `ActivityLog`, `Notification`, `Reminder`, `ApprovalRequest`,
  `Attachment`, `NumberSeries`, `CustomFieldDefinition`, `SavedView`, `ImportJob`

### 3.3 Job Card — the aggregate that decides the project's quality

Workshop's 194 sections describe one document spanning check-in → inspection → estimate →
approval → bay → technician → repair → items → QC → invoice → payment → gate pass → delivery →
feedback. The design tension: one giant document is atomic but unwieldy; full normalization loses
the workspace cohesion the spec insists on.

**Recommended split:**

```
JobCard (root)
├─ identity, customer, vehicle, branch, status, paymentStatus, stage
├─ checkIn      { accessories[], fuelLevel, odometer, condition, mediaIds[], signatureId }
├─ inspection   { checklist[], damageMarkers[], adviceItems[], mediaIds[], voiceNoteIds[] }
├─ estimate     { revisions[], items[], totals, approval{} }
├─ assignment   { bayId, bayHistory[], technicians[], taskAssignments[] }
├─ items[]      { type: labour|spare|lube|outsource, source: estimate|added, qty, rate,
│                 discount, tax, amount, stockTxnId?, status }
├─ qc           { checklist[], roadTest, status, reworkHistory[] }
├─ billing      { invoiceId, gatePassId }
├─ delivery     { checklist[], deliveredAt, otpVerified }
└─ feedback     { rating, comments }

Referenced separately (unbounded growth → own collections):
  TimelineEvent, Attachment, Communication, ApprovalRequest, StockTransaction, Payment
```

Rule: anything that grows without bound over the document's life becomes its own collection.
Everything else is embedded so a workspace loads in one query.

### 3.4 Multi-branch and future SaaS (§96–98)

Every operational document carries:

```ts
{ companyId: ObjectId, branchId: ObjectId, financialYear: string }
```

`companyId` is present from day one even though there is one company today — §98 requires that
SaaS conversion is not blocked, and retrofitting a tenant key across 60 collections later is
extremely expensive. Enforcement is **not** per-query discipline; it is a base repository layer
that injects `companyId` (and `branchId` where the user's scope demands it) into every read and
write. A developer must not be able to forget it.

Compound indexes lead with `companyId`, then `branchId`, then the query field.

### 3.5 Money — decided once, now

Store all monetary values as **integer paise** (`Int32`/`Int64`), never floating point. A single
`Money` type in `packages/shared` handles arithmetic, rounding (banker's rounding for tax), and
display formatting. Every tax computation returns line-level and document-level breakdowns
(taxable, CGST, SGST, IGST, cess, total) as integers.

Retrofitting this after Finance is built is a rewrite. Doing it on day one is nearly free.

---

## 4. CROSS-CUTTING SUBSYSTEMS — BUILD ONCE, USE EVERYWHERE

`04_ALL_MODULES.md` §4 lists 18 shared capabilities. Each is built as generic infrastructure in
Phase 1–2 and then merely *configured* by modules. This is where most of the leverage in the
project sits.

### 4.1 Permissions (Doc 12 §36–60)
Permission string format `module:resource:action` with actions View/Create/Edit/Delete/Approve/
Print/Export plus per-module special actions. Role → permissions, user-level overrides, branch
scope, data scope, permission dependency warnings, and an "effective access preview". Enforced by
middleware on every route **and** used by the frontend to hide/disable controls. Server-side
enforcement is authoritative; the UI check is convenience only.

### 4.2 Audit log & soft delete
Two Mongoose plugins applied to every model: `auditable` (captures user, action, field, old
value, new value, timestamp, IP — Doc 04 §73) and `softDelete` (`deletedAt`, `deletedBy`, with
all queries auto-filtered, powering the Recycle Bin in §74).

### 4.3 Activity timeline
An append-only `TimelineEvent` collection keyed by `(entityType, entityId)`. Every workspace's
Timeline tab reads from it. Emitted by services, never by controllers.

### 4.4 Numbering series (§80)
Configurable per document type, per branch, per financial year, with prefix/suffix/padding/reset
rules. Allocation is atomic (`findOneAndUpdate` with `$inc`) and must occur inside the same
transaction as the document it numbers, or you will get gaps and duplicates.

### 4.5 Approval engine (§92)
Configured in Administration, acted upon inside the originating workspace. Generic
`ApprovalRequest` with entity reference, rule, approver chain, status, history. Used by Estimate,
Additional Work, Discount, Purchase, Expense, Refund, Insurance, Leave.

### 4.6 Transaction discipline — the correctness backbone

MongoDB must run as a replica set in **every** environment including local development. The
following operations are non-negotiably multi-document ACID transactions:

| Operation | Must atomically touch |
|---|---|
| Issue part to Job Card | StockTransaction + StockBalance + JobCard.items + Reservation |
| Return part from Job Card | StockTransaction + StockBalance + JobCard.items |
| Counter Sale checkout | CounterSale + StockTransaction + StockBalance + Invoice + Payment + JournalEntry |
| GRN posting | GRN + StockTransaction + StockBalance + PO pending qty |
| Invoice generation | Invoice + NumberSeries + JobCard.status + Receivable + JournalEntry |
| Payment receipt | Payment + Invoice.paidAmount + Receivable + JournalEntry + Wallet/Loyalty |
| Stock transfer | Two StockTransactions + two StockBalances + Transfer doc |

**Stock model:** `StockTransaction` is the immutable source of truth; `StockBalance` is a derived
cache updated inside the same transaction. A nightly reconciliation job recomputes balances from
the ledger and alerts on any divergence — this is what makes the derived cache trustworthy.

**Finance model:** every financial event posts balanced `JournalEntry` lines. Receivables,
payables, ledgers, trial balance and P&L are **derived from journal entries**, never stored as
independent mutable numbers. This is the single most important decision in the Finance module.

### 4.7 Status state machines
~25 entities have status lifecycles (Job Card alone has 27 statuses, Workshop §159). Define each
as an explicit transition map in `packages/shared`, validated server-side on every change, and
used by the frontend to render only legal actions. Never allow a free-form status write.

Also honour Workshop §160: **process stage and operational status are distinct axes** and must be
modelled as separate fields.

### 4.8 Remaining shared subsystems
Global Search (cross-entity, Atlas Search or a curated text index) · Global Create · Notifications
(in-app + SMS/Email/WhatsApp behind one provider interface) · Reminders (BullMQ scheduled) ·
Attachments/Media (photos, video, voice notes, signature capture) · Custom Fields (§82, definition
registry + dynamic form rendering + dynamic validation) · Import/Export with row-level error
reporting (§75) · Print/PDF templating (T11) · Saved views & column preferences · Financial-year
context.

---

## 5. DELIVERY ROADMAP

Sequencing follows the spec's own recommendation (§107): shell → components → dashboard → one
complete module (Workshop) → reuse. Adjusted for full-stack.

### Phase 0 — Close specification gaps
**Deliverables:** `00_GLOBAL_INSTRUCTIONS`, `01_ADMIN_THEME`, `02_NAVIGATION`,
`03_PAGE_TEMPLATES` (T01–T11 fully defined, T05/T10 disambiguated); flow docs for Counter Sale,
Customer Programs, Masters, Help Center; CRM docs 02 and 07 reconciled into one; accounting rules
for Finance (§53 currently deferred); decision on GST e-invoice/e-way-bill scope.
**Exit criteria:** no screen in the ERP maps to an undefined template.

### Phase 1 — Platform foundation
Monorepo, Docker (Mongo replica set + Redis + MinIO), CI, TypeScript strict config.
Auth (login, refresh, password reset, session management, login history).
Company/Branch/Financial-Year context. RBAC engine + permission registry.
Audit log, soft delete, timeline, numbering series, attachments, notifications skeleton.
Design system + T01–T11 templates + application shell (sidebar per §110, global search, global
create, notification centre, branch switcher).
**Exit criteria:** a demo screen can be built entirely from templates with zero bespoke layout.

### Phase 2 — Shared entities & masters
Generic master engine + T09 Master Center (~30 masters). Customer + Customer 360 (T04). Vehicle.
Product. Vendor. Employee. User & Role administration UI. Settings (T08).
**Exit criteria:** every entity Workshop depends on exists and is usable.

### Phase 3 — Workshop (the anchor module)
Full Job Card lifecycle across all 194 spec sections, plus the **thin vertical slices** of
Inventory and Finance that Workshop requires: stock reservation/issue/return, invoice generation,
payment receipt, journal posting. Operational boards (T06): Service Calendar, Vehicle Queue, Bay
Board, Technician Board. Seven print documents (T11). Workshop Dashboard.
**Exit criteria:** a vehicle goes check-in → delivered → paid, end to end, with correct stock and
ledger effects. This phase validates every architectural decision above — schedule a formal
review at its end before proceeding.

### Phase 4 — Inventory (full depth)
Remaining 132 sections: transfers, adjustments, damage/loss, physical verification, barcode,
multi-location, dead-stock and reorder analytics, alerts.

### Phase 5 — Purchase & Vendor
Requirement → PR → approval → RFQ → vendor quotation comparison → PO → GRN → purchase invoice →
payment → return. Closes the inventory replenishment loop.

### Phase 6 — Finance & Accounts (full depth)
Receivables & payables with ageing, all voucher types, cheque lifecycle, expenses, GST reporting,
trial balance, day/cash/bank book, P&L, balance sheet, customer/vendor statements.

### Phase 7 — Counter Sale (POS)
Speed-optimized billing: barcode, keyboard-first entry, hold/resume, returns/exchange.
**Requires Phase 0 spec.**

### Phase 8 — CRM
Leads, follow-ups, appointments, conversion, communication (SMS/WhatsApp/Email/Call log),
Customer 360 completion, import/export, merge. **Requires the doc 02/07 reconciliation.**

### Phase 9 — Vehicle Sales
Vehicle stock, quotation, negotiation, test drive, booking, allocation, exchange, finance, RTO,
insurance, billing, delivery.

### Phase 10 — Insurance & Warranty
Policies, renewals, claims, surveyor workflow, claim-vs-customer liability split billing,
supplementary claims, warranty claims.

### Phase 11 — Customer Programs
Membership, Loyalty, AMC, Wallet. **Requires Phase 0 spec.**

### Phase 12 — HRM
Employee workspace, attendance, leave, payroll, performance, technician productivity.

### Phase 13 — Reports & Analytics
148 sections. Build on a generic report engine — definition registry (filters, columns,
aggregation pipeline, drill-down target) + one T07 renderer — not 100 bespoke reports. Analytics
dashboard, saved views, scheduled exports.

### Phase 14 — Administration hardening, Help Center, launch readiness
Approval workflow configuration, recycle bin, import/export history, menu configuration, custom
fields UI, dashboard customization (§58), Help Center. Then: load testing, security review,
backup/restore drill, monitoring, deployment, runbooks, UAT.

### Sequencing dependencies
```
Phase 0 ─→ Phase 1 ─→ Phase 2 ─→ Phase 3 (Workshop) ──┬─→ 4 Inventory ─→ 5 Purchase ─→ 6 Finance
                                                       ├─→ 7 Counter Sale
                                                       ├─→ 8 CRM ─→ 9 Vehicle Sales ─→ 10 Insurance
                                                       ├─→ 11 Customer Programs
                                                       └─→ 12 HRM
                              all modules ─→ 13 Reports ─→ 14 Launch readiness
```
Phases 4–12 parallelize across teams once Phase 3 has proven the patterns.

---

## 6. ENGINEERING STANDARDS

**Testing** — Vitest unit tests for all services (money maths, tax, state machines, stock and
ledger logic are mandatory coverage); Supertest integration tests against an in-memory replica
set for every transactional flow in §4.6; Playwright E2E for the critical paths (Job Card
lifecycle, Counter Sale checkout, payment receipt, GRN posting).

**Non-negotiable invariants, asserted in tests:**
1. Stock balance always equals the sum of its stock-transaction ledger.
2. Every journal entry is balanced (debits = credits).
3. No document is ever numbered twice, and series contain no gaps.
4. No operational document exists without `companyId` and `branchId`.
5. No status transition occurs outside its declared state machine.

**Security** — Helmet, CORS allowlist, rate limiting, Zod validation on every input, Mongo
injection guards, file-upload type/size validation with virus scanning, secrets via environment
only, encryption at rest for PII, full audit trail on sensitive-data access (Doc 12 §54).

**Performance** — compound indexes designed alongside each query (leading with `companyId`),
cursor pagination on every list, aggregation pipelines for reports with Redis caching, pre-
aggregated daily rollups for dashboards, `.lean()` on read paths, PDF generation off the request
thread.

**Definition of Done per module** — the spec's own acceptance checklist (§108) plus: API
documented, permissions registered, audit + timeline emitting, branch scoping verified, state
machine tested, print documents rendering, seed/demo data present, E2E green.

---

## 7. DECISIONS NEEDED FROM YOU

### 7.1 UI component library
- **Tailwind + shadcn/ui** — full design control, matches a bespoke admin theme, more work upfront.
- **Ant Design** — dense enterprise tables/forms/filters out of the box, materially faster for a
  1,700-section ERP, less visual distinctiveness.

Recommendation: **Ant Design** if speed to a working ERP matters most; **shadcn/ui** if the admin
theme in the (still unwritten) `01_ADMIN_THEME.md` is a differentiator. This decision is a
prerequisite for Phase 1 and is expensive to reverse.

### 7.2 Deployment target
Cloud (AWS/GCP/Azure), VPS (Hetzner/DigitalOcean), or on-premise at the garage? This determines
the MongoDB hosting strategy (Atlas vs. self-managed replica set), file storage, and whether
offline resilience is required.

### 7.3 Scale parameters
Number of branches, concurrent users, job cards per day, SKU count, and years of data retention.
These drive indexing and sharding decisions that are best made now.

### 7.4 GST / statutory scope
Is e-invoicing (IRN/QR), e-way bill, TDS/TCS, or statutory payroll (PF/ESI/PT) in scope for v1?

### 7.5 Team and timeline
The specification describes roughly 120+ screens, ~60 collections and ~1,700 defined behaviours —
comparable in scope to a commercial ERP product, not a single-module app. Realistic effort is on
the order of **12–24 months for a small team (3–5 engineers)**, with Phases 0–3 alone taking
roughly 4–6 months. Knowing your team size and target date lets me re-cut the roadmap into a
defensible MVP — for example Workshop + Inventory + Counter Sale + Finance basics as v1, with
Vehicle Sales, Insurance, Customer Programs and HRM as v2.

---

## 8. IMMEDIATE NEXT STEPS

1. Answer §7.1 (UI library) and §7.5 (team/timeline) — these two shape everything else.
2. Approve or amend this plan.
3. Write `03_PAGE_TEMPLATES.md` defining T01–T11 — highest-leverage document in the project.
4. Write `01_ADMIN_THEME.md` and `02_NAVIGATION.md`.
5. Reconcile CRM docs 02 and 07.
6. Scaffold the monorepo and stand up the Docker environment (`git init` first — the folder is
   not yet a repository).
7. Begin Phase 1.

---

## 9. WHAT THIS PLAN PRESERVES FROM YOUR SPECIFICATION

Unchanged and treated as binding:

- Organize around business work, not features (§2)
- One workspace per business process — no menu explosion (§30, §63, §109)
- No duplicate entities: one Customer, one Vehicle, one Employee, one Vendor, one Product (§102)
- Masters defined once and reused (§67)
- Branch is real data ownership, not a decorative dropdown (§97)
- SaaS conversion must never be blocked (§98)
- Feature placement decision tree (§103)
- No feature loss — every approved feature maps to a location (§106)
- Build Workshop first as the pattern-setting module (§107)
- Module completion checklist (§108)

The only deliberate departures are the move to full-stack MERN (§1.4) and React components in
place of static HTML files (§1.4).

---
END OF 06_MERN_IMPLEMENTATION_PLAN.md
