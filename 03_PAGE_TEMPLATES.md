# ENTERPRISE GARAGE ERP
# 03_PAGE_TEMPLATES.md
# MASTER PAGE TEMPLATE SPECIFICATION (T01 – T11)

Version: 1.0
Status: MASTER PAGE TEMPLATE ARCHITECTURE
Applies To: Complete Enterprise Garage ERP Web Admin
Implementation Phase: Frontend First (React), Backend Later
Referenced By: 04_ALL_MODULES.md §99, and every 05_MODULE_FLOWS file

============================================================
1. PURPOSE
============================================================

This document defines the ELEVEN PAGE TEMPLATES that every
screen in the ERP is built from.

Every flow document says things like:

    Use:
    T02 List Page

    Use:
    T03 Primary Business Workspace

This file is what those references point to.

This file defines:

- What each template is
- When to use it
- Its exact regions and layout
- Its behaviour rules
- Its states
- Its React component contract
- What must NOT be done with it

CORE RULE:

Every screen in this ERP is a CONFIGURATION of a template.

A screen must never invent its own page layout.

If a screen does not fit a template, the template is extended
here first — the screen does not improvise.

============================================================
2. WHY TEMPLATES MATTER MORE THAN SCREENS
============================================================

The specification defines roughly 120+ screens across 16
modules and ~1,700 process sections.

If each screen is hand-built:

- Every module re-implements layout
- Interaction language drifts
- 04_ALL_MODULES.md §100 ("one consistent ERP interaction
  language") fails
- Module 10 costs the same as module 1

If templates are built first:

- A screen becomes a data definition, not layout code
- Module 10 costs a fraction of module 1
- Consistency is structural, not a review checklist

Therefore:

DO NOT begin any module UI until T01–T11 exist and are
approved.

============================================================
3. TEMPLATE INDEX
============================================================

T01   DASHBOARD
      Monitoring and drill-down entry point.

T02   LIST PAGE
      Find, filter and open records.

T03   PRIMARY BUSINESS WORKSPACE
      Run a complete multi-stage business process.

T04   DETAIL PAGE
      View and manage a reference entity and its related data.

T05   ADD / EDIT FORM
      Create or edit a record through structured sections.

T06   OPERATIONAL BOARD
      Full-screen live operational visibility.

T07   REPORT
      Filter → result → export / drill-down.

T08   SETTINGS
      Configuration with category navigation.

T09   MASTER MANAGEMENT
      Reference-data CRUD across ~30 master types.

T10   TRANSACTION / POS SCREEN
      Speed-optimized transaction entry.
      *** PROPOSED — see §4 ***

T11   PRINT / DOCUMENT PREVIEW
      Generated business document preview and output.

============================================================
4. T10 — RESOLUTION NOTE (DECISION REQUIRED)
============================================================

STATUS OF T05 AND T10 BEFORE THIS DOCUMENT:

T05 was ambiguous in 04_ALL_MODULES.md but is used
consistently across the flow documents as:

    T05 Add/Edit Form

Confirmed in:
05_MODULE_FLOWS-04_INVENTORY.md §14
05_MODULE_FLOWS-05_VEHICLE_SALES.md §14
05_MODULE_FLOWS-06_PURCHASE_VENDOR.md §14
05_MODULE_FLOWS-07_CRM_CUSTOMER.md §15
05_MODULE_FLOWS-08_INSURANCE_WARRANTY.md §12
05_MODULE_FLOWS-09_FINANCE_ACCOUNTS.md §60
05_MODULE_FLOWS-10_EMPLOYEE_HR.md §15

T05 is therefore RESOLVED, not invented.

T10 is referenced NOWHERE in any specification document.

PROPOSAL:

04_ALL_MODULES.md §99 maps Counter Sale to:

    "Specialized T03 / transaction workspace"

Counter Sale (Module 06) is a full module whose primary
requirement is BILLING SPEED, not process depth. It does not
behave like T03:

- No multi-stage lifecycle
- No workspace tab navigation
- No long-running record
- Keyboard-first, seconds-per-transaction

That is a genuinely different page shape.

THEREFORE T10 IS DEFINED HERE AS:

    T10 — TRANSACTION / POS SCREEN

Used by:

- Counter Sale / POS
- Quick Check-In (Workshop §5 secondary action)
- Receive Payment (fast mode)
- Any future speed-critical transaction entry

If you prefer T10 to mean something else, change it in this
file only. Nothing downstream will need editing, because no
existing document references T10.

============================================================
5. APPLICATION SHELL — COMMON TO ALL TEMPLATES
============================================================

Every template renders INSIDE the shell. The shell is never
re-implemented by a template.

    ┌──────────────────────────────────────────────────────┐
    │ GLOBAL HEADER                                        │
    ├────────────┬─────────────────────────────────────────┤
    │            │                                         │
    │  SIDEBAR   │        PAGE REGION                      │
    │            │        (template renders here)          │
    │            │                                         │
    └────────────┴─────────────────────────────────────────┘

GLOBAL HEADER contains (Dashboard flow §5):

    Global Search
    Branch Selector
    Financial Year
    + Create
    Notifications
    Help
    User Profile

SIDEBAR contains the 16 modules from 04_ALL_MODULES.md §110.

Sidebar rules:

- Collapsible
- Module → at most one level of children
- Never more than two levels deep
- Never a menu item per process step

Full shell definition belongs in:

    01_ADMIN_THEME.md
    02_NAVIGATION.md

This file assumes the shell exists.

============================================================
6. UNIVERSAL PAGE ANATOMY
============================================================

Every template (except T11) has the same three vertical bands:

    ┌──────────────────────────────────────────────────────┐
    │ PAGE HEADER      title · context · primary actions   │
    ├──────────────────────────────────────────────────────┤
    │ PAGE BODY        template-specific                   │
    ├──────────────────────────────────────────────────────┤
    │ PAGE FOOTER      optional: totals, pagination, save   │
    └──────────────────────────────────────────────────────┘

PAGE HEADER — universal structure:

    LEFT
        Page Title
        Short description
        Context line (branch / date / record identity)

    RIGHT
        Primary Action        (max 1)
        Secondary Action      (max 1)
        More ▼                (everything else)

RULE (Dashboard flow §4):

    Do NOT place excessive buttons in header.

Maximum TWO visible buttons plus a More menu. Always.

============================================================
7. LAYOUT SYSTEM
============================================================

GRID:

    12 columns
    Gutter 24px
    Page padding 24px
    Max content width 1600px (boards and POS may go full width)

SPACING SCALE:

    4 · 8 · 12 · 16 · 24 · 32 · 48

DENSITY:

    This is an ERP, not a marketing site.
    Default to COMPACT density.

    Table row height        40px
    Form field height       36px
    Section vertical gap    24px
    Card padding            16px

BREAKPOINTS:

    < 768px      Mobile        (read-mostly, limited)
    768–1279px   Tablet        (usable, simplified)
    1280–1919px  Desktop       (primary target)
    ≥ 1920px     Large desktop (boards, wide tables)

PRIMARY TARGET IS DESKTOP 1366×768 AND ABOVE.

Garage floor staff use tablets; billing and management use
desktops. Mobile is not a first-class target in this phase.

============================================================
8. SHARED ELEMENT LIBRARY
============================================================

These elements appear across multiple templates. They are
defined ONCE and reused. A template composes them; it never
redefines them.

    PageHeader
    ContextBar              branch · date · financial year
    StatusChip
    PriorityChip
    KpiCard
    AttentionStrip
    FilterBar
    QuickFilterTabs         status counts
    SearchBox
    DataTable
    TableToolbar            columns · density · export
    Pagination
    EmptyState
    LoadingState
    ErrorState
    NoPermissionState
    Drawer
    Modal
    ConfirmDialog
    Toast
    FormSection
    FormField
    ItemGrid                editable line-item table
    TotalsPanel
    Timeline
    DocumentPanel
    MediaPanel
    ActivityFeed
    ApprovalPanel
    PaymentDrawer
    RecordPickerDrawer      customer / vehicle / product search
    SignaturePad
    VoicePlayer
    PrintPreview

============================================================
9. STATUS CHIP SEMANTICS
============================================================

Status colour is SEMANTIC, never decorative. The same meaning
uses the same colour in every module.

    NEUTRAL / DRAFT         grey        Draft, New, Not Started
    IN PROGRESS             blue        Repair In Progress, Open
    WAITING / BLOCKED       amber       Waiting for Parts, On Hold
    NEEDS ACTION            orange      Approval Pending, Overdue
    SUCCESS / DONE          green       Approved, Paid, Delivered
    FAILURE / NEGATIVE      red         Rejected, Cancelled, Bounced
    CLOSED / ARCHIVED       slate       Closed, Completed

RULES:

- Never use colour as the only signal. Always include the label.
- Never invent a new status colour inside a module.
- Overdue always overrides the base status colour.

============================================================
10. DRAWER vs MODAL vs PAGE — PLACEMENT RULE
============================================================

This rule prevents the navigation explosion that
04_ALL_MODULES.md §109 forbids.

    FULL PAGE
        Creating a new primary business record
        Example: New Job Card, New Vehicle Sale

    WORKSPACE TAB
        A stage of an existing business record
        Example: Inspection, Estimate, QC

    DRAWER  (right side, 480 / 640 / 800px)
        A contextual action WITH a form that must keep the
        parent record visible in context
        Example: Assign Technician, Add Spare, Receive Payment

    MODAL  (centered, ≤ 600px)
        A short decision or confirmation
        Example: Cancel Job Card, Change Status, Delete

    INLINE
        Editing a value already on screen
        Example: item quantity, discount

NEVER:

- Open a drawer from inside a drawer.
- Use a modal for a form with more than 6 fields.
- Create a route for something that belongs in a drawer.

============================================================
11. UNIVERSAL PAGE STATES
============================================================

EVERY template must implement all six states. A screen is not
done until all six are handled.

    LOADING         Skeleton matching final layout. Never a
                    centered spinner on a full page.

    EMPTY — NEW     No records exist yet.
                    Icon + explanation + primary action.

    EMPTY — FILTER  Filters returned nothing.
                    Must offer "Clear filters".
                    This is NOT the same as EMPTY — NEW.

    ERROR           What failed, and a Retry action.

    NO PERMISSION   Screen or action not permitted.
                    Explain, do not silently hide the page.

    NORMAL          Content.

============================================================
12. T01 — DASHBOARD
============================================================

PURPOSE:

Operational visibility and drill-down entry.

USE WHEN:

- Main Dashboard
- Any module dashboard (Workshop, Inventory, CRM, Finance,
  Purchase, Insurance, HR, Vehicle Sales)

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ PAGE HEADER    title · context · [Date] [Customize]  │
    ├──────────────────────────────────────────────────────┤
    │ PRIMARY KPI ROW           4–6 KpiCards               │
    ├──────────────────────────────────────────────────────┤
    │ ATTENTION / ALERT STRIP   items needing action       │
    ├──────────────────────────────────────────────────────┤
    │ WIDGET GRID                                          │
    │  ┌────────────┬────────────┬────────────┐            │
    │  │ widget     │ widget     │ widget     │            │
    │  ├────────────┴────────────┼────────────┤            │
    │  │ wide widget             │ widget     │            │
    │  └─────────────────────────┴────────────┘            │
    ├──────────────────────────────────────────────────────┤
    │ QUICK ACTIONS                                        │
    └──────────────────────────────────────────────────────┘

REGIONS:

PAGE HEADER
    Date filter (Dashboard flow §7):
        Today · Yesterday · This Week · Last Week ·
        This Month · Last Month · This Year · Last Year ·
        Custom Range
        Default: Today
    Refresh
    Customize Dashboard

PRIMARY KPI ROW
    4–6 cards maximum.
    Each card: label · value · delta vs comparison period ·
    optional sparkline.
    EVERY KPI card must drill down. A KPI that goes nowhere
    is not allowed.

ATTENTION STRIP
    Severity ordered: Critical → Warning → Info.
    Each item: what · how many · action link.

WIDGET GRID
    Widgets are 1, 2 or 3 columns wide.
    Every widget has: title · optional filter · "View All" link.
    Widget rows are clickable and open the relevant workspace.

QUICK ACTIONS
    Max 8. Mirror of + Create, scoped to this dashboard.

RULES:

- Dashboard is READ + NAVIGATE. It is never a transaction
  entry screen (04_ALL_MODULES.md §5).
- Every widget drills into a list, board or workspace.
- Branch change re-scopes all data and shows a toast.
- Widget visibility is role-ready from day one.

DO NOT:

- Put a data-entry form on a dashboard.
- Create a widget with no drill-down target.
- Exceed 6 primary KPIs.

USED BY:

Main Dashboard · Workshop · Inventory · CRM · Finance ·
Purchase · Insurance · Vehicle Sales · HR · Analytics

============================================================
13. T02 — LIST PAGE
============================================================

PURPOSE:

Find records and open them.

USE WHEN:

The screen's job is locating one record among many.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ PAGE HEADER    title · [+ New] [Secondary] [More ▼]  │
    ├──────────────────────────────────────────────────────┤
    │ QUICK FILTER TABS   All(248) Waiting(12) Repair(31)  │
    ├──────────────────────────────────────────────────────┤
    │ SEARCH + FILTER BAR    [search] [filters] [saved ▼]  │
    ├──────────────────────────────────────────────────────┤
    │ ACTIVE FILTER CHIPS    ×Status:Repair  ×Branch:Pune  │
    ├──────────────────────────────────────────────────────┤
    │ TABLE TOOLBAR       n selected · columns · export     │
    ├──────────────────────────────────────────────────────┤
    │ DATA TABLE                                           │
    ├──────────────────────────────────────────────────────┤
    │ PAGINATION                                           │
    └──────────────────────────────────────────────────────┘

REGIONS:

QUICK FILTER TABS
    Status counts as tabs. Always include "All".
    Source example: Workshop flow §6.
    Counts respect current branch and date context.

SEARCH
    Multi-field search. The placeholder must state what is
    searchable.
    Example (Workshop §7):
        "Search job card, customer, mobile, registration, VIN"

FILTER BAR
    Common filters inline; the rest behind "More Filters".
    Every list supports: Branch · Date Range · Status.
    Filters are URL-synced so a filtered list is shareable.

ACTIVE FILTER CHIPS
    Every applied filter is visible and individually
    removable, plus "Clear all".

DATA TABLE
    Sticky header. Sticky first column on wide tables.
    Row click opens the record (workspace or detail).
    Last column is Actions: one primary + "More ▼".
    Column config: show/hide, reorder, reset. Persisted per user.
    Sort on server. Pagination on server.
    Selection enables bulk actions when supported.

SAVED VIEWS
    Filter + column + sort combinations, saved and named.

RULES:

- Row click opens the record. Never require the Actions menu
  for the primary path.
- Status column always uses StatusChip semantics (§9).
- Money columns are right-aligned, monospace-tabular.
- Dates use a single consistent format across the whole ERP.
- EMPTY-FILTER and EMPTY-NEW are different states (§11).

DO NOT:

- Show more than ~12 columns by default.
- Put a create form on a list page.
- Lose filters on back-navigation.

USED BY:

Job Cards · Leads · Customers · Products · Stock ·
Vehicle Stock · Sales · Vendors · Purchases · Policies ·
Claims · Receivables · Payables · Transactions · Employees ·
Users

============================================================
14. T03 — PRIMARY BUSINESS WORKSPACE
============================================================

PURPOSE:

Run a complete, multi-stage business process on ONE record
without leaving the page.

This is the most important template in the ERP.

USE WHEN:

The record has a lifecycle with stages, approvals, related
records, money and documents.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ RECORD HEADER                                        │
    │   JOB CARD #JC-2026-001248                           │
    │   [REPAIR IN PROGRESS] [HIGH PRIORITY]               │
    │   Rajesh Sharma · Swift VXI · MH 12 AB 4582          │
    │   Advisor: Amit Patil   Bay: B-04   Branch: Pune     │
    │                       [Update Status]  [More ▼]      │
    ├──────────────────────────────────────────────────────┤
    │ HEADER SUMMARY                                       │
    │   Odometer 42,580 · Fuel ½ · Estimate ₹18,750 ·      │
    │   Paid ₹5,000 · Balance ₹13,750                      │
    ├──────────────────────────────────────────────────────┤
    │ PROCESS PROGRESS                                     │
    │   Check-In ✓ Inspection ✓ Estimate ✓ Approval ✓      │
    │   Repair ● QC ○ Invoice ○ Payment ○ Delivery ○       │
    ├──────────────────────────────────────────────────────┤
    │ WORKSPACE TABS                                       │
    │   Overview | Check-In | Inspection | Estimate |      │
    │   Repair | Items | QC | Invoice | Delivery |         │
    │   Documents | Timeline                               │
    ├──────────────────────────────────────────────────────┤
    │ TAB CONTENT                                          │
    │                                                      │
    ├──────────────────────────────────────────────────────┤
    │ STICKY ACTION BAR   (contextual, when needed)        │
    └──────────────────────────────────────────────────────┘

REGIONS:

RECORD HEADER
    Record number · status chip · priority chip
    Identity line (customer · vehicle / vendor / policy)
    Responsibility line (advisor · technician · bay · branch)
    Max ONE primary action + More ▼
    Header is sticky on scroll (collapsed form).

HEADER SUMMARY
    5–8 compact metrics that answer "where does this stand
    financially and operationally".
    Always includes money state where money exists:
    Estimate / Invoice / Paid / Balance.

PROCESS PROGRESS
    Visual lifecycle. Three marker states:
        ✓ complete    ● current    ○ pending
    CRITICAL RULE (Workshop §12):
        Do NOT make this a rigid wizard.
        Users may move between allowed sections freely.
    Clicking a completed stage navigates to its tab.

WORKSPACE TABS
    Internal navigation only — NEVER promoted to the sidebar.
    Tabs show badges for pending counts.
    Tabs may be disabled with a reason tooltip when the stage
    is not yet reachable.
    Last two tabs are always Documents and Timeline.

TAB CONTENT
    Composed from FormSection, ItemGrid, MediaPanel,
    ApprovalPanel, Timeline etc. Never bespoke layout.

STICKY ACTION BAR
    Appears only for tabs with a completion action
    ("Complete Check-In", "Send Estimate", "Complete QC").

RULES:

- One record, one workspace, all roles. Never build separate
  records per role (Workshop §9).
- Contextual actions open Drawers, not new pages (§10).
- Status changes always go through a confirm step with reason
  capture where the spec requires it.
- Process stage and operational status are SEPARATE fields
  (Workshop §160). Show both.
- Tabs must be deep-linkable: /job-cards/:id/estimate

DO NOT:

- Turn a workspace tab into a sidebar menu item.
- Force linear wizard progression.
- Duplicate customer/vehicle data entry across tabs.

USED BY:

Job Card · Lead · Vehicle Sale · Purchase Order ·
Insurance Claim · AMC · Stock Transfer · Membership ·
Finance Transaction (where depth requires)

============================================================
15. T04 — DETAIL PAGE
============================================================

PURPOSE:

View and manage a REFERENCE entity and everything related to
it.

T03 vs T04 — THE DISTINCTION:

    T03  a PROCESS that starts, progresses and ends
         has stages, approvals, a lifecycle
         example: Job Card

    T04  an ENTITY that persists indefinitely
         has related records, not stages
         example: Customer, Product, Vendor

If it has a process progress bar, it is T03.
If it does not, it is T04.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ ENTITY HEADER                                        │
    │   Rajesh Sharma  [ACTIVE] [GOLD MEMBER]              │
    │   +91 98765 43210 · Pune · Since Mar 2021            │
    │              [Quick Actions ▼]  [Edit]  [More ▼]     │
    ├──────────────────────────────────────────────────────┤
    │ SUMMARY STRIP                                        │
    │   Vehicles 2 · Jobs 14 · Spend ₹1,24,500 ·           │
    │   Outstanding ₹13,750 · Loyalty 2,450 pts            │
    ├──────────────────────────────────────────────────────┤
    │ TABS                                                 │
    │   Overview | Vehicles | Service History | Invoices | │
    │   Programs | Insurance | Communication | Documents | │
    │   Timeline                                           │
    ├──────────────────────────────────────────────────────┤
    │ TAB CONTENT                                          │
    └──────────────────────────────────────────────────────┘

REGIONS:

ENTITY HEADER
    Name/identity · status · classification chips
    Key contact/identity line
    Quick Actions ▼ groups the common contextual actions

SUMMARY STRIP
    Relationship metrics — the "360" answer at a glance.

TABS
    Related-record collections, each a mini list.
    Every related list row navigates to that record.

RULES:

- T04 is a HUB. Related tabs link out; they do not duplicate
  the related module's functionality.
- Editing basic fields uses T05 (drawer or page).
- Always ends with Documents and Timeline, same as T03.

DO NOT:

- Add a process progress bar (that makes it T03).
- Re-implement a related module inside a tab.

USED BY:

Customer 360 · Product · Vendor · Insurance Policy ·
Employee · Vehicle · Branch · Sale Vehicle

============================================================
16. T05 — ADD / EDIT FORM
============================================================

PURPOSE:

Create or edit a record through structured, grouped sections.

USE WHEN:

Creating a reference entity, or editing structured data too
large for inline editing.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ FORM HEADER    Add Product          [Cancel] [Save]  │
    ├───────────────┬──────────────────────────────────────┤
    │ SECTION NAV   │ FORM SECTIONS                        │
    │  Basic     ●  │  ┌────────────────────────────────┐  │
    │  Identity     │  │ BASIC INFORMATION              │  │
    │  Pricing      │  │  Product Name *   [__________] │  │
    │  Stock        │  │  SKU *            [__________] │  │
    │  Suppliers    │  │  Category *       [_________▼] │  │
    │  Documents    │  └────────────────────────────────┘  │
    │               │  ┌────────────────────────────────┐  │
    │               │  │ IDENTIFICATION                 │  │
    │               │  └────────────────────────────────┘  │
    ├───────────────┴──────────────────────────────────────┤
    │ STICKY FOOTER  * required     [Cancel] [Save & New]  │
    │                               [Save]                 │
    └──────────────────────────────────────────────────────┘

VARIANTS:

    T05-page      Full page. Many sections. Default for
                  creating entities.
    T05-drawer    Right drawer. ≤ 2 sections. Contextual
                  creation without losing the parent record.
                  Example: Quick Add Customer inside a Job Card.
    T05-modal     ≤ 6 fields only.

REGIONS:

SECTION NAV
    Shown when the form has 4+ sections. Scroll-spy linked.
    Shows a validation error indicator per section.

FORM SECTIONS
    Titled group of related fields, from the flow doc's
    section list (e.g. Inventory §14).

FIELD RULES
    Required fields marked with *
    Label above input. Help text below. Error replaces help.
    Two-column layout on desktop; one column on tablet.
    Related fields never split across columns.

STICKY FOOTER
    Cancel · Save · Save & New (where creating repeatedly is
    common, e.g. Masters, Products)

RULES:

- Validation runs on blur, then on submit. Never on every
  keystroke.
- On submit failure: scroll to first error, focus it, and
  mark the section in the nav.
- Unsaved-changes guard on navigate away. Always.
- Draft support where the flow doc specifies it.
- QUICK CREATE: entity forms that are commonly created
  mid-process must offer a reduced "quick" mode
  (Customer, Vehicle, Product, Vendor).

DO NOT:

- Build a wizard unless the flow document explicitly asks for
  one.
- Use a modal for a form with more than 6 fields.
- Save silently without confirmation feedback.

USED BY:

Add Product · Add Customer · Add Vehicle · Add Vendor ·
Add Employee · Add Policy · Add Expense · Add User ·
all Masters

============================================================
17. T06 — OPERATIONAL BOARD
============================================================

PURPOSE:

Full-screen live operational visibility for floor management.

USE WHEN:

Someone needs to see current operational state across many
records at once and act on it.

ANATOMY — KANBAN VARIANT (Vehicle Queue):

    ┌──────────────────────────────────────────────────────┐
    │ BOARD HEADER   Vehicle Queue · Pune · Live           │
    │                [Filters] [Refresh] [Full Screen]     │
    ├────────┬────────┬────────┬────────┬────────┬─────────┤
    │Waiting │Check-In│Inspect │Repair  │  QC    │ Ready   │
    │  (4)   │  (3)   │  (6)   │  (11)  │  (2)   │  (5)    │
    ├────────┼────────┼────────┼────────┼────────┼─────────┤
    │ ┌────┐ │ ┌────┐ │ ┌────┐ │ ┌────┐ │        │ ┌────┐  │
    │ │card│ │ │card│ │ │card│ │ │card│ │        │ │card│  │
    │ └────┘ │ └────┘ │ └────┘ │ └────┘ │        │ └────┘  │
    └────────┴────────┴────────┴────────┴────────┴─────────┘

ANATOMY — GRID VARIANT (Bay Board):

    ┌──────────────────────────────────────────────────────┐
    │ BOARD HEADER                                         │
    ├──────────────────────────────────────────────────────┤
    │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
    │ │ BAY B-01 │ │ BAY B-02 │ │ BAY B-03 │ │ BAY B-04 │  │
    │ │ OCCUPIED │ │ FREE     │ │ MAINT.   │ │ OCCUPIED │  │
    │ │ Swift    │ │          │ │          │ │ i20      │  │
    │ │ Rahul M. │ │          │ │          │ │ Amit K.  │  │
    │ │ ▓▓▓▓░░ 65│ │          │ │          │ │ ▓▓░░░░ 30│  │
    │ │ ETA 5:30 │ │          │ │          │ │ ETA 7:00 │  │
    │ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
    └──────────────────────────────────────────────────────┘

ANATOMY — CALENDAR VARIANT (Service Calendar):

    Day / Week / Month toggle, resource rows (bay or
    technician), time columns, appointment blocks.

VARIANTS:

    T06-kanban     Vehicle Queue
    T06-grid       Bay Board
    T06-list       Technician Board
    T06-calendar   Service Calendar

RULES:

- Cards are dense and scannable in under two seconds.
- Every card click opens the underlying workspace
  (Workshop §17: "Clicking vehicle/job should open Job Card
  Workspace").
- Auto-refresh with a visible "last updated" indicator.
  Realtime later; polling is acceptable in the frontend phase.
- Drag-and-drop ONLY where the flow doc allows a stage change
  by drag. Otherwise cards are read + click.
- Boards are reachable from their module dashboard widget via
  "View Full Board" (04_ALL_MODULES.md §15).
- Full-screen mode hides the sidebar.

DO NOT:

- Make a board the only way to reach a record.
- Put editing forms on a board.
- Auto-refresh so aggressively that the view jumps under the
  user's cursor.

USED BY:

Vehicle Queue · Bay Board · Technician Board ·
Service Calendar · Delivery Board

============================================================
18. T07 — REPORT
============================================================

PURPOSE:

Filter → result → export / drill-down.

USE WHEN:

Any of the ~100 reports in Reports & Analytics, or a module's
embedded report.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ REPORT HEADER   Technician Performance Report        │
    │                 [Save View] [Export ▼] [Print]       │
    ├──────────────────────────────────────────────────────┤
    │ FILTER PANEL                                         │
    │  Date Range [____] Branch [____] Technician [____]   │
    │  Compare To [____]              [Reset] [Apply]      │
    ├──────────────────────────────────────────────────────┤
    │ RESULT META                                          │
    │  1 Jul – 31 Jul 2026 · Pune Main · 24 rows ·         │
    │  Generated 03 Aug 2026 14:22                         │
    ├──────────────────────────────────────────────────────┤
    │ SUMMARY CARDS      (optional)                        │
    ├──────────────────────────────────────────────────────┤
    │ CHART              (optional)                        │
    ├──────────────────────────────────────────────────────┤
    │ RESULT TABLE       sortable · drill-down             │
    ├──────────────────────────────────────────────────────┤
    │ TOTALS ROW         sticky                            │
    └──────────────────────────────────────────────────────┘

REGIONS:

FILTER PANEL
    Collapsible. Collapsed by default once results are shown.
    Common filters (Reports flow §27): Date Range, Comparison,
    Branch, Financial Year, Status, User, Customer, Vehicle,
    Category.
    Filters do NOT auto-apply. Explicit Apply.

RESULT META (Reports §28)
    Report name · date range · branch · applied filters ·
    generated at · result count.
    This block is what makes an exported report defensible.

REPORT ACTIONS (Reports §29)
    Apply · Reset · Save View · Print · Export · Refresh ·
    Column Settings

EXPORT (Reports §30)
    Excel · CSV · PDF · Print

RESULT TABLE
    Sticky header and sticky totals row.
    Numeric columns right-aligned.
    Drill-down cells are visibly interactive and open the
    underlying record or a filtered list.

RULES:

- Every report is a DEFINITION (filters, columns, aggregation,
  drill-down target) rendered by ONE T07 component.
  Do not hand-build 100 report screens.
- Charts follow the ERP chart rules (Reports §20); a chart
  never appears without its underlying table.
- Saved views and favourites are first-class.

DO NOT:

- Auto-run an expensive report on page load without filters.
- Show a chart with no data table.
- Build a bespoke layout per report.

USED BY:

Report Center and all module reports

============================================================
19. T08 — SETTINGS
============================================================

PURPOSE:

Company-level configuration.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ SETTINGS HEADER    [search configuration]            │
    ├───────────────┬──────────────────────────────────────┤
    │ CATEGORY NAV  │ SETTINGS PANEL                       │
    │  General      │  ┌────────────────────────────────┐  │
    │  Company    ● │  │ COMPANY PROFILE                │  │
    │  Branches     │  │  Company Name  [____________]  │  │
    │  Financial Yr │  │  Logo          [ upload ]      │  │
    │  Tax / GST    │  │  GST Number    [____________]  │  │
    │  Numbering    │  └────────────────────────────────┘  │
    │  Workshop     │  ┌────────────────────────────────┐  │
    │  Inventory    │  │ BANK DETAILS                   │  │
    │  Notifications│  └────────────────────────────────┘  │
    │  Print        │                                      │
    │  Custom Fields│                                      │
    │  Security     │                                      │
    ├───────────────┴──────────────────────────────────────┤
    │ STICKY FOOTER      unsaved changes   [Discard][Save] │
    └──────────────────────────────────────────────────────┘

REGIONS:

CATEGORY NAV
    Two levels maximum. Categories from
    04_ALL_MODULES.md §77.

CONFIGURATION SEARCH
    Searches settings across all categories (Admin flow §5).
    Essential — there are too many settings to browse.

SETTINGS PANEL
    Grouped setting cards. Each setting: label · control ·
    description · current effective value.

RULES:

- Changes are explicit: nothing saves on toggle.
- Dirty state is visible and blocks navigation.
- Branch-overridable settings show inheritance clearly
  (Admin flow §21): "Inherited from Company" vs "Overridden".
- Destructive settings require typed confirmation.

DO NOT:

- Auto-save configuration.
- Hide the source of an inherited value.
- Put operational data in Settings.

USED BY:

Settings · Branch configuration · module configuration

============================================================
20. T09 — MASTER MANAGEMENT
============================================================

PURPOSE:

CRUD across ~30 reference-data types from ONE screen.

CRITICAL PRINCIPLE (04_ALL_MODULES.md §65):

    Do NOT create every master as a global sidebar item.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ MASTER CENTER      [search masters]                  │
    ├───────────────┬──────────────────────────────────────┤
    │ MASTER NAV    │ MASTER PANEL                         │
    │ ▼ VEHICLE     │  Manufacturer          [+ New]       │
    │   Manufacturer│  ┌────────────────────────────────┐  │
    │   Model     ● │  │ [search]          [import][⚙]  │  │
    │   Variant     │  ├────────────────────────────────┤  │
    │   Fuel Type   │  │ Name      Code   Used  Status  │  │
    │ ▼ WORKSHOP    │  │ Maruti    MAR    412   Active  │  │
    │   Service Type│  │ Hyundai   HYU    287   Active  │  │
    │   Complaint   │  │ Tata      TAT    143   Active  │  │
    │   Labour Type │  └────────────────────────────────┘  │
    │   Bay         │                                      │
    │ ▼ PRODUCT     │                                      │
    │ ▼ FINANCE     │                                      │
    │ ▼ HR          │                                      │
    └───────────────┴──────────────────────────────────────┘

REGIONS:

MASTER NAV
    Grouped by domain per 04_ALL_MODULES.md §66:
    Vehicle · Workshop · Product · Finance ·
    Finance Partner · Insurance · HR

MASTER PANEL
    A generic list + inline/drawer editor driven by a master
    DEFINITION (fields, validation, parent relationship).

USAGE COUNT COLUMN
    Every master row shows how many records reference it.
    This is what makes safe deletion possible.

HIERARCHICAL MASTERS
    Manufacturer → Model → Variant, and Location → Rack → Bin
    render as a two-pane parent/child view.

RULES:

- ONE generic engine. Never 30 hand-built screens.
- A master in use CANNOT be deleted — only deactivated.
- Deactivating hides it from new selections but preserves it
  on historical records.
- Every master supports import/export.
- A master is defined once and reused everywhere
  (04_ALL_MODULES.md §67).

DO NOT:

- Duplicate a master per module (no "Workshop Payment Mode").
- Hard-delete referenced data.
- Give each master its own sidebar entry.

USED BY:

Master Center — all ~30 master types

============================================================
21. T10 — TRANSACTION / POS SCREEN   [PROPOSED]
============================================================

PURPOSE:

Speed-optimized transaction entry. Optimized for seconds per
transaction, not process depth.

SEE §4 FOR THE DECISION NOTE.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ TXN HEADER   Counter Sale · Pune · Amit  [Hold][⨯]   │
    ├──────────────────────────────┬───────────────────────┤
    │ ENTRY PANEL                  │ SUMMARY PANEL         │
    │ ┌──────────────────────────┐ │  Customer             │
    │ │ [ scan barcode / search ]│ │  Walk-In      [change]│
    │ └──────────────────────────┘ │ ───────────────────── │
    │ ┌──────────────────────────┐ │  Items          3     │
    │ │ Item      Qty  Rate  Amt │ │  Subtotal   ₹2,450    │
    │ │ Brake Pad  2   850  1700 │ │  Discount     ₹100    │
    │ │ Oil 5W30   1   650   650 │ │  Taxable    ₹2,350    │
    │ │ Filter     1   200   200 │ │  CGST 9%     ₹211     │
    │ │                          │ │  SGST 9%     ₹211     │
    │ │                          │ │ ─────────────────────  │
    │ │                          │ │  TOTAL      ₹2,772    │
    │ └──────────────────────────┘ │                       │
    │                              │  [ PAYMENT  F12 ]     │
    ├──────────────────────────────┴───────────────────────┤
    │ SHORTCUT BAR  F2 Search · F4 Customer · F9 Hold ·    │
    │               F12 Pay · Esc Cancel                   │
    └──────────────────────────────────────────────────────┘

REGIONS:

ENTRY PANEL
    Barcode/search focused on load and refocused after every
    line. Adding an item must never require the mouse.

ITEM GRID
    Inline editable: qty, rate, discount.
    Live stock availability per line.
    Keyboard navigation across cells.

SUMMARY PANEL
    Always visible. Live totals with full tax breakdown.

SHORTCUT BAR
    Visible keyboard map. Non-negotiable for POS.

RULES:

- Keyboard-first. Full transaction completable without a mouse.
- Focus returns to the scan field after every action.
- Hold / Resume sale is always available.
- Payment opens as a drawer, not a page navigation.
- Print/receipt is immediate on completion.

DO NOT:

- Add workspace tabs (that would make it T03).
- Require mouse interaction on the primary path.
- Navigate away mid-transaction.

USED BY:

Counter Sale / POS · Quick Check-In · Fast Payment Receipt

============================================================
22. T11 — PRINT / DOCUMENT PREVIEW
============================================================

PURPOSE:

Preview and output a generated business document.

ANATOMY:

    ┌──────────────────────────────────────────────────────┐
    │ PREVIEW TOOLBAR                                      │
    │  Tax Invoice #INV-2026-004821                        │
    │  [Template ▼] [Copies ▼] [Email] [WhatsApp]          │
    │  [Download PDF] [Print]                    [Close]   │
    ├──────────────────────────────────────────────────────┤
    │           ┌──────────────────────────┐               │
    │           │  A4 DOCUMENT PREVIEW     │               │
    │           │                          │               │
    │           │  [company header]        │               │
    │           │  [document body]         │               │
    │           │  [totals]                │               │
    │           │  [terms · signature]     │               │
    │           │                          │               │
    │           └──────────────────────────┘               │
    │                  Page 1 of 2                         │
    └──────────────────────────────────────────────────────┘

REGIONS:

PREVIEW TOOLBAR
    Template variant selector where multiple layouts exist.
    Copy type: Original / Duplicate / Triplicate.
    Delivery: Print · Download · Email · WhatsApp.

DOCUMENT CANVAS
    True-to-print A4 rendering. What is shown is what prints.

RULES:

- Opens as a full-screen overlay from the source record.
  It is not a sidebar destination.
- Page size, margins, header and footer come from Settings →
  Print Templates.
- Every document carries company profile data from Settings.
- Tax documents must show the statutory fields the Finance
  spec requires.
- Print CSS is authored once and shared by all documents.

DOCUMENTS USING T11 (04_ALL_MODULES.md §93):

Job Card · Inspection Report · Estimate · Mechanic Sheet ·
Invoice · Receipt · Gate Pass · Quotation · Booking Form ·
Vehicle Sale Invoice · Delivery Note · Purchase Order · GRN ·
Insurance documents · Membership / AMC documents · Payslip ·
Reports

DO NOT:

- Show a preview that differs from the printed output.
- Hard-code company details into a template.
- Create a separate route per document type.

============================================================
23. TEMPLATE SELECTION DECISION TREE
============================================================

When a flow document describes a screen, choose as follows:

    Is it a printed/generated document?
        → T11

    Is it configuration?
        → T08 (settings)  or  T09 (reference data)

    Is it analytical output with filters?
        → T07

    Is it monitoring many records live, full screen?
        → T06

    Is it speed-critical transaction entry?
        → T10

    Is it monitoring with drill-down entry points?
        → T01

    Is it finding one record among many?
        → T02

    Is it creating or editing a record?
        → T05

    Is it ONE record with a multi-stage lifecycle?
        → T03

    Is it ONE persistent entity with related records?
        → T04

If none fit — STOP. Do not improvise a layout.
Extend this document first.

============================================================
24. REACT COMPONENT CONTRACTS
============================================================

Frontend phase target: React + TypeScript.
All templates live in packages/ui (or src/templates/ in a
single-app setup).

A screen supplies DATA and DEFINITIONS. It never supplies
layout.

    // T02
    interface T02ListPageProps<TRow> {
      title: string
      description?: string
      primaryAction?: ActionDef
      secondaryAction?: ActionDef
      moreActions?: ActionDef[]
      quickFilters?: QuickFilterDef[]      // status counts
      searchPlaceholder: string
      searchFields: string[]
      filters: FilterDef[]
      columns: ColumnDef<TRow>[]
      rows: TRow[]
      loading: boolean
      error?: Error
      pagination: PaginationState
      onRowClick: (row: TRow) => void
      rowActions?: (row: TRow) => ActionDef[]
      bulkActions?: ActionDef[]
      savedViews?: SavedViewDef[]
      exportable?: boolean
      emptyState?: EmptyStateDef
    }

    // T03
    interface T03WorkspaceProps {
      recordNumber: string
      status: StatusDef
      priority?: StatusDef
      identity: IdentityLine[]        // customer, vehicle, ...
      responsibility?: IdentityLine[] // advisor, bay, branch
      summary: SummaryMetric[]        // odometer, paid, balance
      stages: StageDef[]              // ✓ ● ○ progress
      tabs: WorkspaceTabDef[]         // includes badge + enabled
      primaryAction?: ActionDef
      moreActions?: ActionDef[]
      children: ReactNode             // active tab content
    }

    // T04
    interface T04DetailPageProps {
      identity: EntityIdentity
      chips: StatusDef[]
      summary: SummaryMetric[]
      quickActions?: ActionDef[]
      tabs: DetailTabDef[]
      children: ReactNode
    }

    // T05
    interface T05FormProps<TValues> {
      mode: 'create' | 'edit'
      variant: 'page' | 'drawer' | 'modal'
      title: string
      sections: FormSectionDef[]
      schema: ZodSchema<TValues>       // shared with backend later
      defaultValues?: Partial<TValues>
      onSubmit: (v: TValues) => Promise<void>
      onCancel: () => void
      allowSaveAndNew?: boolean
      quickMode?: FormSectionDef[]     // reduced field set
    }

    // T01 / T06 / T07 / T08 / T09 / T10 / T11 follow the same
    // principle: a definition object in, a rendered page out.

SHARED TYPES live in one place and are reused by every
template:

    ActionDef · StatusDef · ColumnDef · FilterDef ·
    QuickFilterDef · SummaryMetric · StageDef · TabDef ·
    FormSectionDef · FormFieldDef · EmptyStateDef

WHY THIS MATTERS FOR THE BACKEND PHASE:

Because ColumnDef, FilterDef and the Zod schema are data,
the same definitions later drive API query parameters and
server-side validation. Building the frontend first does not
create throwaway work — it creates the contract.

============================================================
25. RECOMMENDED FILE STRUCTURE (FRONTEND PHASE)
============================================================

    src/
    ├─ app/
    │   ├─ shell/            AppShell, Sidebar, GlobalHeader
    │   └─ routes/
    ├─ templates/
    │   ├─ T01Dashboard/
    │   ├─ T02ListPage/
    │   ├─ T03Workspace/
    │   ├─ T04DetailPage/
    │   ├─ T05Form/
    │   ├─ T06Board/
    │   ├─ T07Report/
    │   ├─ T08Settings/
    │   ├─ T09MasterCenter/
    │   ├─ T10Transaction/
    │   └─ T11PrintPreview/
    ├─ components/           shared element library (§8)
    ├─ modules/
    │   ├─ dashboard/
    │   ├─ workshop/
    │   │   ├─ pages/        JobCardList, JobCardWorkspace, ...
    │   │   ├─ tabs/         CheckInTab, InspectionTab, ...
    │   │   ├─ components/   DamageMapper, EstimateGrid, ...
    │   │   ├─ definitions/  columns, filters, stages, statuses
    │   │   └─ mock/         demo data
    │   ├─ crm/
    │   ├─ inventory/
    │   └─ ...
    ├─ lib/                  money, dates, formatting, state machines
    └─ types/                shared template types

RULE:

Anything in modules/ that starts looking like layout belongs
in templates/ or components/ instead.

============================================================
26. MOCK DATA STRATEGY (FRONTEND-FIRST PHASE)
============================================================

Because the backend comes later, mock data must be shaped
like the eventual API response — not like component props.

    modules/<module>/mock/  returns API-shaped objects
    a single fake-delay wrapper simulates latency
    loading and error states are exercised, not skipped

Rules:

- Realistic Indian garage data (04_ALL_MODULES.md §108
  requires realistic demo data): real vehicle models, INR
  amounts, MH-registration formats, plausible names.
- Money in mock data is already integer paise.
- Every list has enough rows to exercise pagination.
- Every entity has at least one record in each status.

When the backend arrives, only the data-fetching layer
changes. Screens do not.

============================================================
27. ACCESSIBILITY AND INPUT
============================================================

- Full keyboard navigation on every template.
- Visible focus states — garage staff work fast.
- Tab order follows visual order.
- Minimum touch target 40px (tablet use on the shop floor).
- Colour contrast AA minimum.
- Status never communicated by colour alone.
- Destructive actions always require explicit confirmation.
- Global shortcuts defined once in 02_NAVIGATION.md.

============================================================
28. TEMPLATE ACCEPTANCE CHECKLIST
============================================================

Before a template is approved for module use:

[ ] All regions implemented
[ ] All six page states implemented (§11)
[ ] Responsive at 1366, 1920 and tablet widths
[ ] Keyboard navigable end to end
[ ] Loading skeleton matches final layout
[ ] Empty-new and empty-filter states differ
[ ] Permission-aware action hiding supported
[ ] Branch and financial-year context respected
[ ] Deep-linkable where applicable (tabs, filters)
[ ] Composed only from the shared element library
[ ] Documented props with a working example screen
[ ] Zero module-specific logic inside the template

============================================================
29. SCREEN ACCEPTANCE CHECKLIST
============================================================

Before any module screen is considered complete:

[ ] Uses a template — no bespoke layout
[ ] Template chosen via the §23 decision tree
[ ] Matches its flow document section by section
[ ] Status vocabulary matches the flow document exactly
[ ] Actions placed per the §10 drawer/modal/page rule
[ ] All six states handled
[ ] Realistic demo data
[ ] No duplicated shared entity (04_ALL_MODULES.md §102)
[ ] No new sidebar item created for a process step
[ ] Documents and Timeline present where T03/T04 require

============================================================
30. STRICT DO-NOT RULES
============================================================

DO NOT:

- Build a screen without a template.
- Add a template without adding it to this file.
- Copy layout code between modules.
- Create a sidebar entry for a workspace tab.
- Use a modal for a large form.
- Open a drawer from a drawer.
- Invent status colours inside a module.
- Skip the empty, error or loading states.
- Hand-build reports or masters instead of using T07 / T09.
- Let a module import another module's components.

============================================================
31. FINAL PRINCIPLE
============================================================

    A SCREEN IS A CONFIGURATION,
    NOT A CONSTRUCTION.

If building the tenth module feels as expensive as the first,
the templates have failed and must be fixed here — not worked
around in the module.

============================================================
END OF 03_PAGE_TEMPLATES.md
============================================================
