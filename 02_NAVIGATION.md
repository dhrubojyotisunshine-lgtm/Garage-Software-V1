# ENTERPRISE GARAGE ERP
# 02_NAVIGATION.md
# APPLICATION SHELL, NAVIGATION & ROUTING SPECIFICATION

Version: 1.0
Status: MASTER NAVIGATION ARCHITECTURE
UI Library: Ant Design v5 (React + TypeScript)
Applies To: Complete Enterprise Garage ERP Web Admin
Referenced By: 03_PAGE_TEMPLATES.md, 01_ADMIN_THEME.md, all 05_MODULE_FLOWS files

============================================================
1. PURPOSE
============================================================

This document defines HOW USERS MOVE through the ERP.

It defines:

- The application shell
- The global header and every control in it
- The sidebar and the complete menu tree
- The complete URL / route map
- Global Search and Global Create
- Branch and Financial Year context
- Notifications, reminders and approvals access
- Breadcrumbs and back behaviour
- Keyboard shortcuts
- Permission-aware navigation
- Menu configuration preparation

CORE RULE (04_ALL_MODULES.md §111):

    FEATURE RICH DOES NOT MEAN MENU RICH.

The ERP contains roughly 120 screens and ~1,700 defined
behaviours. The sidebar contains 16 modules and never more
than two levels.

Everything else is reached through workspaces, drawers,
dashboards, boards, search and contextual links.

============================================================
2. THE THREE WAYS TO REACH ANYTHING
============================================================

Every destination in this ERP is reachable by at least one
of three paths. This is what allows the menu to stay small.

    1. STRUCTURAL      Sidebar → module → list → record
                       Predictable. Learnable. The backbone.

    2. CONTEXTUAL      Dashboard widget → record
                       Board card → workspace
                       Related tab → related record
                       Fastest for daily operational work.

    3. DIRECT          Global Search (Ctrl+K)
                       Global Create (Ctrl+Shift+N)
                       Fastest for users who know what they
                       want.

RULE (Workshop §187 — NO NAVIGATION LOSS):

    Every screen must be reachable structurally, even when
    the intended daily path is contextual.

    A board, a drawer or a dashboard widget must never be the
    ONLY way to reach something.

============================================================
3. APPLICATION SHELL
============================================================

    ┌──────────────────────────────────────────────────────────┐
    │ GLOBAL HEADER                                     56px   │
    │ ☰  ERP    [Search Ctrl+K]   Branch▾ FY▾ +Create  🔔 ? 👤 │
    ├──────────┬───────────────────────────────────────────────┤
    │          │ BREADCRUMB                                    │
    │ SIDEBAR  ├───────────────────────────────────────────────┤
    │  240px   │                                               │
    │          │            PAGE REGION                        │
    │ Dashboard│            (T01–T11 renders here)             │
    │ CRM      │                                               │
    │ Workshop │                                               │
    │ Inventory│                                               │
    │ ...      │                                               │
    │          │                                               │
    │ ──────── │                                               │
    │ Settings │                                               │
    │ Help     │                                               │
    └──────────┴───────────────────────────────────────────────┘

STRUCTURE (Ant Design Layout):

    <Layout>
      <Header/>                     fixed, 56px, white
      <Layout>
        <Sider/>                    fixed, dark, 240 / 64px
        <Layout>
          <Breadcrumb/>
          <Content/>                scrollable page region
        </Layout>
      </Layout>
    </Layout>

BEHAVIOUR:

- Header is fixed and always visible.
- Sidebar is fixed and independently scrollable.
- Only the Content region scrolls with page data.
- Full-screen modes (T06 boards, T10 POS, T11 print) hide the
  sidebar; T11 hides the header as well.

============================================================
4. GLOBAL HEADER
============================================================

Contents, left to right (Dashboard flow §5):

    LEFT
        Sidebar collapse toggle
        Product logo / name  → navigates to Dashboard

    CENTER
        Global Search           (expands on focus)

    RIGHT
        Branch Selector
        Financial Year Selector
        + Create
        Notifications      (badge)
        Help
        User Profile

RULES:

- Nothing else may be added to the header. Ever.
- On tablet widths the search collapses to an icon.
- The header never contains module-specific actions — those
  belong in the Page Header (03_PAGE_TEMPLATES §6).

============================================================
5. GLOBAL SEARCH
============================================================

Trigger: click, or Ctrl+K / Cmd+K from anywhere.

BEHAVIOUR:

Opens a command palette overlay, not a results page.

    ┌────────────────────────────────────────────────┐
    │ 🔍  MH 12 AB                                   │
    ├────────────────────────────────────────────────┤
    │ VEHICLES                                       │
    │  MH 12 AB 4582 · Swift VXI · Rajesh Sharma     │
    │  MH 12 AB 9021 · i20 Asta · Priya Desai        │
    │ JOB CARDS                                      │
    │  JC-2026-001248 · MH 12 AB 4582 · Repair       │
    │ CUSTOMERS                                      │
    │  Rajesh Sharma · +91 98765 43210               │
    ├────────────────────────────────────────────────┤
    │ ACTIONS                                        │
    │  ⌘ Create Job Card    ⌘ Create Customer        │
    ├────────────────────────────────────────────────┤
    │ ↑↓ navigate · ↵ open · esc close               │
    └────────────────────────────────────────────────┘

SEARCHABLE ENTITIES:

    Job Card         number, complaint
    Customer         name, mobile, email, code
    Vehicle          registration, VIN, engine number
    Product          name, SKU, part number, barcode
    Vendor           name, code, GSTIN
    Invoice          invoice number
    Vehicle Sale     sale number
    Purchase Order   PO number
    Insurance        policy number, claim number
    Employee         name, code
    Lead             name, mobile

RULES:

- Results grouped by entity type, max 5 per group.
- Every result shows enough context to disambiguate
  (vehicle → model + owner; job card → vehicle + status).
- Recent searches shown on empty input.
- Search respects branch scope; a "search all branches"
  toggle is available to users with the permission.
- Results respect permissions — a user never sees a record
  they cannot open.
- Enter opens the record directly. No intermediate page.
- The palette also matches ACTIONS ("create job card"),
  making it a command palette, not just search.

============================================================
6. GLOBAL CREATE
============================================================

Trigger: "+ Create" button, or Ctrl+Shift+N.

A dropdown grouped by module, showing only what the user has
permission to create.

    WORKSHOP          Job Card · Appointment · Quick Check-In
    CRM               Lead · Customer · Vehicle · Follow-Up
    SALES             Counter Sale · Vehicle Sale · Quotation
    INVENTORY         Product · Stock Entry · Stock Transfer
    PURCHASE          Purchase Order · Vendor · GRN
    FINANCE           Receive Payment · Make Payment · Expense
    INSURANCE         Policy · Claim
    HR                Employee · Attendance · Leave Request

RULES:

- Maximum 8 groups, maximum 5 items per group.
- Every item either opens a T05 form (page or drawer) or the
  relevant creation route.
- Creation respects the current branch context — the new
  record is created in the selected branch.
- Global Create is a SUPERSET of dashboard Quick Actions.
  Dashboard Quick Actions are the module-scoped subset
  (Dashboard flow §51).

============================================================
7. BRANCH CONTEXT
============================================================

The Branch Selector is one of the most consequential controls
in the product (04_ALL_MODULES.md §97: branch is real data
ownership, not a decorative dropdown).

BEHAVIOUR:

    ┌──────────────────────────┐
    │ 🏢 Pune Main Branch    ▾ │
    ├──────────────────────────┤
    │ ○ All Branches           │
    │ ● Pune Main Branch       │
    │ ○ Mumbai Andheri         │
    │ ○ Nashik                 │
    │──────────────────────────│
    │   Manage Branches →      │
    └──────────────────────────┘

RULES:

- The selection persists across sessions, per user.
- Changing branch re-scopes ALL data on the current screen
  and shows a toast: "Branch changed to Pune Main Branch."
- Only branches the user has access to are listed
  (Admin flow §32).
- "All Branches" is available only where it is meaningful —
  dashboards, reports and lists. It is NOT available on
  transaction entry screens, because a transaction must
  belong to exactly one branch.
- When a user opens a record from another branch via search,
  the header shows that record's branch explicitly. It does
  NOT silently switch the user's context.
- Branch is visible on every operational record's header.

============================================================
8. FINANCIAL YEAR CONTEXT
============================================================

    FY 2026-27  ▾

RULES:

- Applies to Finance, Reports and any list filtered by
  financial year.
- Defaults to the current financial year from Settings.
- A non-current FY selection shows a persistent amber
  indicator in the header — users must never post to the
  wrong year by accident.
- Changing FY never changes branch, and vice versa.

============================================================
9. NOTIFICATIONS, REMINDERS AND APPROVALS
============================================================

One bell icon with a badge. Opens a drawer with three tabs.

    ┌──────────────────────────────────────┐
    │ NOTIFICATIONS                        │
    │ [ Alerts 12 ] [ Approvals 4 ] [ Reminders 7 ] │
    ├──────────────────────────────────────┤
    │ ● Estimate approved — JC-2026-001248 │
    │   Rajesh Sharma · 5 min ago          │
    │ ● Low stock — Brake Pad Set (2 left) │
    │   Pune Main · 22 min ago             │
    ├──────────────────────────────────────┤
    │ Mark all read        View all →      │
    └──────────────────────────────────────┘

RULES:

- Every notification links to its source record.
- Approvals tab allows approve/reject inline where the
  approval is simple; complex approvals open the workspace.
- Reminders tab covers service due, insurance renewal, PUC,
  membership, AMC, warranty, payment, follow-up, birthday
  (04_ALL_MODULES.md §88).
- The badge counts only unread + pending-action items.
- Notification preferences live in Settings, not here.

============================================================
10. SIDEBAR — COMPLETE MENU TREE
============================================================

Implements 04_ALL_MODULES.md §110. Two levels maximum.

    DASHBOARD                       /dashboard

    CRM                             /crm
      Leads                         /crm/leads
      Customers                     /crm/customers

    WORKSHOP                        /workshop
      Job Cards                     /workshop/job-cards
      Service Calendar              /workshop/calendar
      Vehicle Queue                 /workshop/queue
      Bay Board                     /workshop/bays
      Technician Board              /workshop/technicians

    INVENTORY                       /inventory
      Products                      /inventory/products
      Stock                         /inventory/stock
      Stock Transfers               /inventory/transfers

    VEHICLE SALES                   /vehicle-sales
      Vehicle Stock                 /vehicle-sales/stock
      Sales                         /vehicle-sales/sales

    COUNTER SALE                    /counter-sale
      New Sale (POS)                /counter-sale/new
      Sales History                 /counter-sale/history

    PURCHASE & VENDOR               /purchase
      Purchase Orders               /purchase/orders
      Vendors                       /purchase/vendors

    INSURANCE                       /insurance
      Policies                      /insurance/policies
      Claims                        /insurance/claims
      Warranty                      /insurance/warranty

    CUSTOMER PROGRAMS               /programs
      Membership                    /programs/membership
      Loyalty                       /programs/loyalty
      AMC                           /programs/amc
      Wallet                        /programs/wallet

    FINANCE & ACCOUNTS              /finance
      Receivables                   /finance/receivables
      Payables                      /finance/payables
      Transactions                  /finance/transactions
      Expenses                      /finance/expenses
      Accounts & Ledgers            /finance/accounts
      Tax / GST                     /finance/gst
      Statements                    /finance/statements

    HRM                             /hr
      Employees                     /hr/employees
      Attendance                    /hr/attendance
      Leave                         /hr/leave
      Payroll                       /hr/payroll
      Performance                   /hr/performance

    REPORTS & ANALYTICS             /reports

    ────────────────────────────────────────────

    MASTERS                         /masters
    ADMINISTRATION                  /admin
    SETTINGS                        /settings
    HELP CENTER                     /help

NOTES ON DELIBERATE CHOICES:

- Workshop's four operational boards ARE in the sidebar even
  though 04_ALL_MODULES.md §15 prefers dashboard access. This
  satisfies the NO NAVIGATION LOSS rule (§2). The dashboard
  widget remains the preferred daily path.

- Counter Sale exposes the POS directly, because for a
  cashier that IS the module.

- Finance has seven children — the most of any module. These
  are genuinely distinct financial functions, not process
  steps of one document. This is the documented exception to
  the "keep children minimal" rule.

- Masters, Administration, Settings and Help sit below a
  divider. They are configuration, not daily operations.

- Vouchers (Receipt, Payment, Journal, Contra, Debit Note,
  Credit Note) are NOT menu items. They are types within
  Transactions (04_ALL_MODULES.md §48).

============================================================
11. SIDEBAR BEHAVIOUR
============================================================

    Expanded    240px, icon + label, one expanded group
    Collapsed    64px, icon only, flyout submenu on hover
    Toggle      header hamburger, or Ctrl+B
    Persistence collapse state saved per user
    Auto        collapses below 1280px

ACTIVE STATE:

- The active module is highlighted at the parent level.
- The active child is highlighted with a left accent bar.
- Deep routes resolve to their nearest menu ancestor.
  Example: /workshop/job-cards/JC-001248/estimate
  highlights Workshop → Job Cards.

BADGES:

Sidebar badges are used sparingly — only for items requiring
action:

    Approvals pending       Administration
    Overdue follow-ups      CRM → Leads
    Estimates awaiting      Workshop → Job Cards
    Low stock alerts        Inventory → Stock

RULES:

- Never more than four badges visible at once.
- A badge always represents "someone must act", never a
  simple record count.
- Scrolling is internal to the sidebar; the header never
  scrolls away.

============================================================
12. COMPLETE ROUTE MAP
============================================================

CONVENTIONS:

    :id       record identifier
    :tab      workspace / detail tab slug (deep-linkable)
    list routes carry filter state in the query string

DASHBOARD

    /dashboard                                   T01

CRM

    /crm                                         T01
    /crm/leads                                   T02
    /crm/leads/new                               T05
    /crm/leads/:id                               → redirect :tab=overview
    /crm/leads/:id/:tab                          T03
        tabs: overview · follow-ups · appointments ·
              quotation · communication · documents · timeline
    /crm/customers                               T02
    /crm/customers/new                           T05
    /crm/customers/:id/:tab                      T04
        tabs: overview · vehicles · service-history ·
              sales · invoices · programs · insurance ·
              communication · documents · timeline

WORKSHOP

    /workshop                                    T01
    /workshop/job-cards                          T02
    /workshop/job-cards/new                      T05
    /workshop/job-cards/:id/:tab                 T03
        tabs: overview · check-in · inspection · estimate ·
              repair · items · qc · invoice · delivery ·
              documents · timeline
    /workshop/calendar                           T06-calendar
    /workshop/queue                              T06-kanban
    /workshop/bays                               T06-grid
    /workshop/technicians                        T06-list
    /workshop/service-history                    T02

INVENTORY

    /inventory                                   T01
    /inventory/products                          T02
    /inventory/products/new                      T05
    /inventory/products/:id/:tab                 T04
        tabs: overview · stock · pricing · suppliers ·
              compatibility · alternatives · transactions ·
              documents · activity
    /inventory/stock                             T02
    /inventory/transfers                         T02
    /inventory/transfers/:id/:tab                T03

VEHICLE SALES

    /vehicle-sales                               T01
    /vehicle-sales/stock                         T02
    /vehicle-sales/stock/new                     T05
    /vehicle-sales/stock/:id/:tab                T04
    /vehicle-sales/sales                         T02
    /vehicle-sales/sales/new                     T05
    /vehicle-sales/sales/:id/:tab                T03
        tabs: overview · quotation · test-drive · booking ·
              allocation · exchange · finance · insurance ·
              rto · billing · delivery · documents · timeline

COUNTER SALE

    /counter-sale                                → /counter-sale/new
    /counter-sale/new                            T10
    /counter-sale/history                        T02
    /counter-sale/:id                            T04

PURCHASE & VENDOR

    /purchase                                    T01
    /purchase/orders                             T02
    /purchase/orders/new                         T05
    /purchase/orders/:id/:tab                    T03
        tabs: overview · requirement · rfq · quotations ·
              approval · order · grn · invoice · payment ·
              returns · documents · timeline
    /purchase/vendors                            T02
    /purchase/vendors/:id/:tab                   T04

INSURANCE & WARRANTY

    /insurance                                   T01
    /insurance/policies                          T02
    /insurance/policies/:id/:tab                 T04
    /insurance/claims                            T02
    /insurance/claims/:id/:tab                   T03
        tabs: overview · incident · estimate · survey ·
              approval · repair · billing · settlement ·
              documents · timeline
    /insurance/warranty                          T02
    /insurance/warranty/:id/:tab                 T03

CUSTOMER PROGRAMS

    /programs                                    T01
    /programs/membership                         T02
    /programs/membership/:id/:tab                T03
    /programs/loyalty                            T02
    /programs/loyalty/:customerId                T04
    /programs/amc                                T02
    /programs/amc/:id/:tab                       T03
    /programs/wallet                             T02
    /programs/wallet/:customerId                 T04

FINANCE & ACCOUNTS

    /finance                                     T01
    /finance/receivables                         T02
    /finance/receivables/:id                     T04
    /finance/payables                            T02
    /finance/payables/:id                        T04
    /finance/transactions                        T02
    /finance/transactions/:id                    T04
    /finance/expenses                            T02
    /finance/accounts                            T02
    /finance/accounts/:id/ledger                 T07
    /finance/gst                                 T07
    /finance/statements/:statement               T07
        statements: profit-loss · balance-sheet · cash-flow ·
                    trial-balance · day-book · cash-book ·
                    bank-book

HRM

    /hr                                          T01
    /hr/employees                                T02
    /hr/employees/new                            T05
    /hr/employees/:id/:tab                       T03
        tabs: overview · employment · work · attendance ·
              leave · payroll · performance · documents ·
              activity
    /hr/attendance                               T02
    /hr/leave                                    T02
    /hr/payroll                                  T02
    /hr/payroll/:period                          T03
    /hr/performance                              T02

REPORTS & ANALYTICS

    /reports                                     T01  (analytics)
    /reports/center                              T02  (report list)
    /reports/:category                           T02
    /reports/:category/:reportId                 T07

MASTERS

    /masters                                     T09
    /masters/:group/:master                      T09
        groups: vehicle · workshop · product · finance ·
                finance-partner · insurance · hr

ADMINISTRATION

    /admin                                       T01
    /admin/users                                 T02
    /admin/users/:id/:tab                        T04
    /admin/roles                                 T02
    /admin/roles/:id                             T05
    /admin/branches                              T02
    /admin/branches/:id/:tab                     T04
    /admin/approvals                             T08
    /admin/activity-logs                         T02
    /admin/audit-logs                            T02
    /admin/login-history                         T02
    /admin/recycle-bin                           T02
    /admin/import-export                         T02

SETTINGS

    /settings                                    → /settings/general
    /settings/:category                          T08
        categories: general · company · branches ·
                    financial-year · localization · tax ·
                    numbering · workshop · inventory ·
                    vehicle-sales · finance · notifications ·
                    sms · email · whatsapp · print-templates ·
                    custom-fields · menu · dashboard ·
                    security · integrations

HELP CENTER

    /help                                        T02
    /help/:article                               T04

PRINT (T11 — full-screen overlay routes)

    /print/:document/:id                         T11
        documents: job-card · inspection · estimate ·
                   mechanic-sheet · invoice · receipt ·
                   gate-pass · quotation · booking ·
                   sale-invoice · delivery-note ·
                   purchase-order · grn · policy · payslip

AUTH (outside the shell)

    /login · /forgot-password · /reset-password

SYSTEM

    /403 · /404 · /500

============================================================
13. URL AND STATE RULES
============================================================

- List filters, search text, sort and page live in the query
  string. A filtered list must be shareable and bookmarkable.

    /workshop/job-cards?status=repair&branch=pune&page=2

- Workspace tabs are path segments, not query params, so a
  specific stage is deep-linkable.

    /workshop/job-cards/JC-2026-001248/estimate

- Branch and Financial Year are USER CONTEXT, not URL state.
  They persist per user and are not encoded in the URL.
  Exception: report exports embed them in the result metadata
  (Reports §28) so an exported report is self-describing.

- Drawers and modals do NOT create routes. Closing a drawer
  must never trigger a browser back navigation.
  Exception: a drawer opened directly from Global Search may
  be routed so it can be deep-linked.

- Back button always returns to the previous PAGE, never to a
  previous drawer, modal or tab state.

- Returning to a list restores its filters, scroll position
  and page. Losing a user's filters is a defect.

============================================================
14. BREADCRUMBS
============================================================

Shown on every page except Dashboard, POS (T10) and Print
(T11).

    Workshop  /  Job Cards  /  JC-2026-001248

RULES:

- Maximum four levels.
- The last item is the current page and is not a link.
- Record breadcrumbs use the record's identifier, not "Detail".
- Long names truncate in the middle, keeping the tail visible.
- Breadcrumbs reflect the STRUCTURAL path, not the path the
  user actually took. This keeps them predictable.

============================================================
15. KEYBOARD SHORTCUTS
============================================================

GLOBAL

    Ctrl / Cmd + K        Global Search
    Ctrl / Cmd + Shift+N  Global Create
    Ctrl / Cmd + B        Toggle sidebar
    Ctrl / Cmd + /        Shortcut help
    Esc                   Close drawer / modal / palette

NAVIGATION (press G, then the key)

    G then D              Dashboard
    G then J              Job Cards
    G then C              Customers
    G then L              Leads
    G then P              Products
    G then S              Counter Sale (POS)
    G then R              Reports

LIST PAGES

    /                     Focus search
    N                     New record
    F                     Open filters
    R                     Refresh

FORMS

    Ctrl / Cmd + S        Save
    Ctrl / Cmd + Enter    Save and close
    Esc                   Cancel (with unsaved-changes guard)

POS / COUNTER SALE (T10)

    F2                    Item search
    F4                    Select customer
    F9                    Hold sale
    F12                   Payment
    Esc                   Cancel sale

RULES:

- Shortcuts never fire while focus is in a text input, except
  Esc and the Ctrl/Cmd combinations.
- The full map is discoverable via Ctrl+/ and in Help Center.
- POS shortcuts are always visible on screen (T10 shortcut
  bar). Discoverability matters more than elegance there.

============================================================
16. PERMISSION-AWARE NAVIGATION
============================================================

Navigation reflects permissions (Admin flow §36–60).

RULES:

- A module with no viewable children is hidden entirely.
- A child the user cannot view is hidden.
- Hiding is a UX convenience, NOT a security control.
  Every route additionally enforces its permission, and the
  backend will enforce it again later.
- Direct navigation to a forbidden route renders the
  NO PERMISSION state (03_PAGE_TEMPLATES §11), not a
  redirect. Silent redirects confuse users into thinking the
  feature does not exist.
- Global Search and Global Create list only permitted items.
- If a user has no permitted landing page, they see an
  explanatory screen rather than an empty shell.

============================================================
17. MENU CONFIGURATION (PREPARATION)
============================================================

04_ALL_MODULES.md §83 requires the architecture to support,
without implementing it as security:

    Show / hide menu items
    Reorder items
    Role-wise visibility
    Branch-wise visibility
    Future subscription / licence visibility

IMPLEMENTATION APPROACH:

The menu is DATA, not JSX. One declarative registry drives
the sidebar, breadcrumbs, route guards and Global Create.

    // src/app/navigation/menu.ts
    export interface MenuNode {
      key: string
      label: string
      icon?: ReactNode
      path?: string
      permission?: string
      badge?: BadgeSource
      children?: MenuNode[]
      order: number
      visible?: boolean           // menu configuration
      branchScope?: string[]      // branch-wise visibility
      featureFlag?: string        // future licensing
    }

Because it is data, configuration becomes a filter and sort
over the registry. No component changes are required when
menu configuration ships.

============================================================
18. RESPONSIVE NAVIGATION
============================================================

    ≥ 1280px      Sidebar expanded, header full
    992–1279px    Sidebar auto-collapsed to icons
    768–991px     Sidebar becomes an overlay drawer;
                  search collapses to an icon
    < 768px       Bottom navigation with the five most-used
                  modules; everything else via a "More" sheet.
                  Read-mostly. Not a build target this phase.

The garage floor uses tablets in the 768–1279px range. That
range must be genuinely usable, not merely non-broken.

============================================================
19. NAVIGATION STATE AND PERFORMANCE
============================================================

- Route-level code splitting per module (React.lazy).
- Module chunks preload on sidebar hover.
- List queries are cached; returning to a list shows cached
  data immediately and revalidates in the background.
- Navigating away from a dirty form triggers the
  unsaved-changes guard (03_PAGE_TEMPLATES §16). Always.
- A workspace tab change never remounts the record header.
- Scroll position is restored on back navigation and reset on
  forward navigation.

============================================================
20. STRICT DO-NOT RULES
============================================================

DO NOT:

- Add a third sidebar level.
- Add a menu item for a process step
  (Inspection, Estimate, QC, Booking, RTO, Delivery).
- Add a menu item for a voucher type
  (Receipt, Payment, Journal, Contra, Debit Note).
- Add a menu item per report or per master.
- Put module-specific actions in the global header.
- Make a board, widget or drawer the only route to a screen.
- Create a route for a drawer or modal (except from Global
  Search).
- Lose list filters on back navigation.
- Silently redirect on a permission failure.
- Encode branch or financial year in the URL.
- Exceed four breadcrumb levels.

============================================================
21. ACCEPTANCE CHECKLIST
============================================================

Before navigation is considered complete:

[ ] All 16 modules present, two levels maximum
[ ] Every route in §12 resolves to a template
[ ] Every screen reachable structurally (NO NAVIGATION LOSS)
[ ] Deep links work for workspace tabs
[ ] List filters survive back navigation
[ ] Global Search returns all entity types in §5
[ ] Global Create respects permissions and branch context
[ ] Branch switch re-scopes data and shows a toast
[ ] Non-current financial year shows a warning indicator
[ ] Sidebar active state resolves correctly from deep routes
[ ] Permission-denied renders the 403 state, not a redirect
[ ] Keyboard shortcuts work and are discoverable
[ ] Usable at 1366px, 1920px and tablet widths
[ ] Menu registry is data-driven, ready for configuration

============================================================
22. FINAL PRINCIPLE
============================================================

    THE MENU IS A MAP, NOT AN INDEX.

A map shows the territory's structure so a user can orient
themselves. An index lists everything and helps no one.

Sixteen modules. Two levels. Everything else reached through
work, search or context.

============================================================
END OF 02_NAVIGATION.md
============================================================
