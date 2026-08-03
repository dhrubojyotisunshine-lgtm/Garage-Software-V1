# ENTERPRISE GARAGE ERP
# 01_ADMIN_THEME.md
# DESIGN SYSTEM & VISUAL LANGUAGE

Version: 1.0
Status: MASTER DESIGN SYSTEM
UI Library: Ant Design v5 (React + TypeScript)
Applies To: Complete Enterprise Garage ERP Web Admin
Referenced By: 03_PAGE_TEMPLATES.md, 02_NAVIGATION.md, all 05_MODULE_FLOWS files

============================================================
1. PURPOSE
============================================================

This document defines the VISUAL LANGUAGE of the ERP.

It defines:

- The design principles this product is built on
- The Ant Design theme configuration
- Colour, typography, spacing, elevation, motion
- Which Ant Design component serves which purpose
- Status colour semantics across every module
- Data display standards (money, dates, numbers)
- Dark mode, print, accessibility
- The implementation contract in code

CORE RULE:

Visual decisions are made ONCE, here, as tokens.

A module never hard-codes a colour, a font size, a spacing
value or a shadow. It consumes tokens.

If a screen needs a value that does not exist as a token,
the token is added here first.

============================================================
2. DESIGN PRINCIPLES
============================================================

This is a tool used for eight hours a day by service
advisors, technicians, storekeepers, cashiers and managers.
It is not a marketing surface.

PRINCIPLE 1 — DENSITY WITH BREATHING ROOM

    Show more per screen than a consumer app, but never at
    the cost of scanability. A service advisor must find a
    job card in a 200-row table in under three seconds.

PRINCIPLE 2 — STATUS IS THE PRIMARY SIGNAL

    In an ERP, "what state is this in" is the most-asked
    question on every screen. Status must be instantly
    readable, semantically consistent, and never
    communicated by colour alone.

PRINCIPLE 3 — CALM BY DEFAULT, LOUD ONLY WHEN IT MATTERS

    If everything is highlighted, nothing is. Colour
    saturation is reserved for status, alerts and primary
    actions. Structure carries the rest.

PRINCIPLE 4 — NUMBERS ARE FIRST-CLASS

    This product is full of money, quantities and dates.
    They get tabular figures, right alignment, consistent
    formatting and no ambiguity — ever.

PRINCIPLE 5 — SPEED IS A FEATURE

    Motion is short. Skeletons match layout. Nothing
    animates that does not need to. A cashier billing 80
    customers a day feels every 300ms.

PRINCIPLE 6 — ONE LANGUAGE ACROSS SIXTEEN MODULES

    The same action looks and behaves the same everywhere.
    This is 04_ALL_MODULES.md §100 expressed visually.

============================================================
3. WHY ANT DESIGN, AND HOW WE USE IT
============================================================

Ant Design v5 is the chosen library. It is built for dense
enterprise data applications and ships the pieces this ERP
needs most: a mature Table, Form, Select, DatePicker, Drawer,
Steps and Descriptions.

HOW WE USE IT:

- We THEME Ant Design. We do not fight it.
- We use its token system as our design system rather than
  layering a second system on top.
- We wrap AntD components in our own element library
  (03_PAGE_TEMPLATES.md §8) so that swapping or restyling a
  component happens in one place.
- We do NOT mix in a second component library.

VERSION AND CORE SETUP:

    react              ^19
    antd               ^5.22
    @ant-design/icons  ^5
    @ant-design/plots  ^2      (charts)
    dayjs              ^1.11   (AntD's date engine)

Ant Design v5 uses CSS-in-JS. There is no `antd/dist/reset.css`
theme import to manage — theming flows entirely through
`ConfigProvider`.

TOKEN ARCHITECTURE (AntD v5):

    SEED TOKENS       →  MAP TOKENS  →  ALIAS TOKENS
    (brand inputs)       (derived        (component-facing)
                          ramps)

                              ↓
                     COMPONENT TOKENS
                     (per-component overrides)

We set SEED tokens for brand, override selected ALIAS tokens
for ERP density, and override COMPONENT tokens only where a
component needs to behave differently from AntD's default.

============================================================
4. COLOUR — BRAND PALETTE
============================================================

PRIMARY — "Service Blue"

Chosen for high legibility on dense data surfaces, strong
contrast on white, and a professional, non-consumer tone.

    primary-50    #EFF5FF
    primary-100   #D0E2FF
    primary-200   #A6C8FF
    primary-300   #78A9FF
    primary-400   #4589FF
    primary-500   #0F62FE   ← colorPrimary
    primary-600   #0353E9
    primary-700   #0043CE
    primary-800   #002D9C
    primary-900   #001D6C

    Contrast of primary-500 on white: 4.9:1 (AA for UI text
    and large text; use primary-600+ for small body text on
    white).

NEUTRAL — "Slate"

The workhorse. Carries structure, text and surfaces.

    neutral-0     #FFFFFF
    neutral-50    #F8FAFC
    neutral-100   #F1F5F9
    neutral-200   #E2E8F0
    neutral-300   #CBD5E1
    neutral-400   #94A3B8
    neutral-500   #64748B
    neutral-600   #475569
    neutral-700   #334155
    neutral-800   #1E293B
    neutral-900   #0F172A

============================================================
5. COLOUR — SEMANTIC PALETTE
============================================================

SUCCESS — green

    success-50    #DEFBE6
    success-100   #A7F0BA
    success-300   #42BE65
    success-500   #198038   ← colorSuccess
    success-700   #0E6027

WARNING — amber

    warning-50    #FEF3C7
    warning-100   #FDE68A
    warning-300   #FBBF24
    warning-500   #B45309   ← colorWarning
    warning-700   #92400E

ERROR — red

    error-50      #FFF1F1
    error-100     #FFD7D9
    error-300     #FF8389
    error-500     #DA1E28   ← colorError
    error-700     #A2191F

INFO — blue (same ramp as primary)

    info-500      #0F62FE   ← colorInfo

ACTION-REQUIRED — orange

    Deliberately distinct from WARNING amber. See §6.

    action-50     #FFEDD5
    action-100    #FED7AA
    action-300    #FB923C
    action-500    #C2410C
    action-700    #9A3412

============================================================
6. STATUS COLOUR SEMANTICS
============================================================

This implements 03_PAGE_TEMPLATES.md §9. The same meaning
uses the same colour in every one of the 16 modules.

    ┌──────────────────┬─────────┬─────────┬─────────┬──────┐
    │ MEANING          │ TEXT    │ BG      │ BORDER  │ AntD │
    │                  │         │         │         │ Tag  │
    ├──────────────────┼─────────┼─────────┼─────────┼──────┤
    │ NEUTRAL / DRAFT  │ #475569 │ #F1F5F9 │ #CBD5E1 │default│
    │ IN PROGRESS      │ #0043CE │ #EFF5FF │ #A6C8FF │ blue │
    │ WAITING/BLOCKED  │ #92400E │ #FEF3C7 │ #FDE68A │ gold │
    │ NEEDS ACTION     │ #9A3412 │ #FFEDD5 │ #FED7AA │orange│
    │ SUCCESS / DONE   │ #0E6027 │ #DEFBE6 │ #A7F0BA │green │
    │ FAILURE/NEGATIVE │ #A2191F │ #FFF1F1 │ #FFD7D9 │ red  │
    │ CLOSED / ARCHIVED│ #334155 │ #F8FAFC │ #E2E8F0 │default│
    └──────────────────┴─────────┴─────────┴─────────┴──────┘

WAITING vs NEEDS ACTION — THE IMPORTANT DISTINCTION:

    WAITING       something else must happen first
                  the user is not blocked on themselves
                  Waiting for Parts · Waiting for Bay ·
                  Waiting for Outsource

    NEEDS ACTION  a person must act now
                  Approval Pending · Overdue ·
                  Payment Due · QC Pending

Amber and orange sit close together. Therefore NEEDS ACTION
items ALWAYS carry an icon in addition to colour, and always
sort above WAITING items in attention strips.

OVERDUE OVERRIDE:

    Overdue always renders in FAILURE red regardless of the
    record's base status, and always shows the overdue
    duration. An overdue in-progress job is red, not blue.

WORKED EXAMPLE — JOB CARD (Workshop §159, 27 statuses):

    Draft, Waiting                      → NEUTRAL
    Checked-In, Inspection,
      Estimate Preparation,
      Repair In Progress                → IN PROGRESS
    Waiting for Bay, Waiting for Parts,
      Waiting for Outsource,
      Paused, On Hold                   → WAITING
    Approval Pending,
      Waiting for Approval, QC, Rework  → NEEDS ACTION
    Approved, Repair Completed, Ready,
      Paid, Delivered                   → SUCCESS
    Cancelled                           → FAILURE
    Invoiced, Partially Paid            → IN PROGRESS
    Closed                              → CLOSED

Every module's status map is declared in code, once, in
`src/theme/statusMap.ts`. A module never picks a colour.

RULES:

- Never invent a status colour inside a module.
- Never use colour as the only signal — label always present.
- Never use SUCCESS green for "in progress".
- Never use primary blue for a status chip that is not
  genuinely "in progress".

============================================================
7. TYPOGRAPHY
============================================================

FONT FAMILY:

    UI        Inter
    Fallback  -apple-system, "Segoe UI", Roboto,
              "Noto Sans", "Noto Sans Devanagari",
              Helvetica, Arial, sans-serif
    Numeric   Inter with `font-variant-numeric: tabular-nums`
    Mono      "JetBrains Mono", "Roboto Mono", monospace
              (document numbers, VIN, SKU, barcodes, code)

Inter is chosen for its high x-height, excellent legibility
at 12–14px, and true tabular figures — all three matter in a
table-heavy ERP. Noto Sans Devanagari is in the fallback
stack because customer names and addresses will contain
Devanagari text.

TYPE SCALE:

    ┌──────────────┬──────┬────────┬────────┬──────────────┐
    │ TOKEN        │ SIZE │ LINE   │ WEIGHT │ USE          │
    ├──────────────┼──────┼────────┼────────┼──────────────┤
    │ fontSizeSM   │ 12px │ 20px   │ 400    │ meta, caption│
    │ fontSize     │ 14px │ 22px   │ 400    │ body, tables │
    │ fontSizeLG   │ 16px │ 24px   │ 400    │ emphasis     │
    │ fontSizeXL   │ 20px │ 28px   │ 600    │ section head │
    │ Heading 5    │ 16px │ 24px   │ 600    │ card title   │
    │ Heading 4    │ 20px │ 28px   │ 600    │ panel title  │
    │ Heading 3    │ 24px │ 32px   │ 600    │ page title   │
    │ Heading 2    │ 30px │ 38px   │ 600    │ rare         │
    │ Heading 1    │ 38px │ 46px   │ 700    │ KPI values   │
    └──────────────┴──────┴────────┴────────┴──────────────┘

WEIGHTS:

    400  body
    500  emphasis, table headers, labels
    600  headings, KPI values, totals
    700  reserved — page-level KPI figures only

RULES:

- Base size is 14px, not 16px. This is an ERP.
- Never go below 12px. Ever.
- Table headers are 12px / weight 500 / uppercase-off.
- Money and quantities always use tabular numerals.
- Document numbers (JC-2026-001248), VIN, SKU and barcodes
  use the mono stack.
- Maximum two type sizes within a single card.

============================================================
8. SPACING, SIZING AND DENSITY
============================================================

SPACING SCALE (4px base, matches AntD sizeUnit/sizeStep):

    4 · 8 · 12 · 16 · 20 · 24 · 32 · 48

    marginXXS   4     paddingXXS   4
    marginXS    8     paddingXS    8
    marginSM   12     paddingSM   12
    margin     16     padding     16
    marginMD   20     paddingMD   20
    marginLG   24     paddingLG   24
    marginXL   32     paddingXL   32
    marginXXL  48

CONTROL HEIGHTS:

    controlHeightXS   24
    controlHeightSM   28
    controlHeight     36     ← deliberate override
    controlHeightLG   44

WHY 36 AND NOT ANTD'S DEFAULT 32:

03_PAGE_TEMPLATES.md §7 specifies a 36px form field. Garage
floor staff use tablets; 32px touch targets are too small for
sustained use with gloves or dirty hands. 36px keeps density
while staying usable. 44px (LG) is used for POS and primary
actions.

LAYOUT DIMENSIONS:

    Global header height        56px
    Sidebar width (expanded)   240px
    Sidebar width (collapsed)   64px
    Page padding                24px
    Max content width         1600px
    Card padding                16px
    Section vertical gap        24px
    Table row height            40px
    Drawer widths      480 / 640 / 800px
    Modal max width            600px

DENSITY MODES:

    COMFORTABLE   default — the values above
    COMPACT       opt-in, for very wide tables and boards

COMPACT is applied by wrapping a subtree in a nested
`ConfigProvider` with `theme.compactAlgorithm`. It is NEVER
applied globally — global compact would undo the 36px touch
target decision above.

============================================================
9. BORDER RADIUS, BORDERS AND ELEVATION
============================================================

RADIUS:

    borderRadiusXS   2    tags, badges
    borderRadiusSM   4    inputs, buttons, table cells
    borderRadius     6    cards, drawers, modals  ← default
    borderRadiusLG   8    large panels, dialogs

Radius stays modest. Heavily rounded corners read as consumer
software and waste horizontal space in dense tables.

BORDERS:

    lineWidth              1px
    colorBorder            #CBD5E1   inputs, dividers
    colorBorderSecondary   #E2E8F0   table cell, card outline
    colorSplit             #E2E8F0   internal separators

ELEVATION — four levels only:

    LEVEL 0   flat, border only
              tables, list rows, inline panels

    LEVEL 1   0 1px 2px rgba(15,23,42,.06),
              0 1px 3px rgba(15,23,42,.10)
              cards, KPI tiles

    LEVEL 2   0 4px 6px -1px rgba(15,23,42,.08),
              0 2px 4px -2px rgba(15,23,42,.06)
              dropdowns, popovers, sticky headers

    LEVEL 3   0 10px 15px -3px rgba(15,23,42,.10),
              0 4px 6px -4px rgba(15,23,42,.08)
              drawers, modals

RULES:

- Never stack shadows on nested surfaces.
- Structure with borders and background first; reach for
  shadow only when something genuinely floats.
- Boards and tables are LEVEL 0. Always.

============================================================
10. SURFACES AND BACKGROUNDS
============================================================

    colorBgLayout        #F1F5F9   app background
    colorBgContainer     #FFFFFF   cards, tables, panels
    colorBgElevated      #FFFFFF   drawers, modals, dropdowns
    colorFillAlter       #F8FAFC   table header, zebra rows
    colorFillSecondary   #F1F5F9   hover fills
    colorFillTertiary    #F8FAFC   subtle fills
    colorBgMask          rgba(15,23,42,.45)

    Sidebar background   #0F172A   (dark sidebar, light content)
    Header background    #FFFFFF

DARK SIDEBAR / LIGHT CONTENT is the chosen shell treatment.
It anchors navigation visually, maximises contrast for the
data area, and is the established convention in enterprise
ERP software.

============================================================
11. ANT DESIGN THEME CONFIGURATION
============================================================

This is the authoritative implementation of everything above.

    // src/theme/tokens.ts
    export const palette = {
      primary: { 50:'#EFF5FF', 100:'#D0E2FF', 200:'#A6C8FF',
                 300:'#78A9FF', 400:'#4589FF', 500:'#0F62FE',
                 600:'#0353E9', 700:'#0043CE', 800:'#002D9C',
                 900:'#001D6C' },
      neutral: { 0:'#FFFFFF', 50:'#F8FAFC', 100:'#F1F5F9',
                 200:'#E2E8F0', 300:'#CBD5E1', 400:'#94A3B8',
                 500:'#64748B', 600:'#475569', 700:'#334155',
                 800:'#1E293B', 900:'#0F172A' },
      success: { 50:'#DEFBE6', 100:'#A7F0BA', 300:'#42BE65',
                 500:'#198038', 700:'#0E6027' },
      warning: { 50:'#FEF3C7', 100:'#FDE68A', 300:'#FBBF24',
                 500:'#B45309', 700:'#92400E' },
      error:   { 50:'#FFF1F1', 100:'#FFD7D9', 300:'#FF8389',
                 500:'#DA1E28', 700:'#A2191F' },
      action:  { 50:'#FFEDD5', 100:'#FED7AA', 300:'#FB923C',
                 500:'#C2410C', 700:'#9A3412' },
    } as const

    export const layout = {
      headerHeight: 56,
      siderWidth: 240,
      siderCollapsedWidth: 64,
      pagePadding: 24,
      maxContentWidth: 1600,
      tableRowHeight: 40,
      drawerSm: 480, drawerMd: 640, drawerLg: 800,
    } as const

    // src/theme/antdTheme.ts
    import type { ThemeConfig } from 'antd'
    import { palette } from './tokens'

    export const lightTheme: ThemeConfig = {
      token: {
        // ---- seed ----
        colorPrimary:  palette.primary[500],
        colorSuccess:  palette.success[500],
        colorWarning:  palette.warning[500],
        colorError:    palette.error[500],
        colorInfo:     palette.primary[500],
        colorTextBase: palette.neutral[900],
        colorBgBase:   palette.neutral[0],

        fontFamily:
          "Inter, -apple-system, 'Segoe UI', Roboto, " +
          "'Noto Sans', 'Noto Sans Devanagari', sans-serif",
        fontFamilyCode: "'JetBrains Mono', 'Roboto Mono', monospace",

        fontSize:   14,
        fontSizeSM: 12,
        fontSizeLG: 16,
        fontSizeXL: 20,
        fontSizeHeading1: 38,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading4: 20,
        fontSizeHeading5: 16,

        borderRadius:   6,
        borderRadiusSM: 4,
        borderRadiusXS: 2,
        borderRadiusLG: 8,

        controlHeight:   36,
        controlHeightSM: 28,
        controlHeightXS: 24,
        controlHeightLG: 44,

        sizeUnit: 4,
        sizeStep: 4,
        wireframe: false,

        // ---- alias ----
        colorText:            palette.neutral[900],
        colorTextSecondary:   palette.neutral[600],
        colorTextTertiary:    palette.neutral[500],
        colorTextQuaternary:  palette.neutral[400],
        colorTextDescription: palette.neutral[500],
        colorBorder:          palette.neutral[300],
        colorBorderSecondary: palette.neutral[200],
        colorSplit:           palette.neutral[200],
        colorBgLayout:        palette.neutral[100],
        colorBgContainer:     palette.neutral[0],
        colorBgElevated:      palette.neutral[0],
        colorFillAlter:       palette.neutral[50],
        colorFillSecondary:   palette.neutral[100],
        colorFillTertiary:    palette.neutral[50],

        boxShadow:
          '0 1px 2px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.10)',
        boxShadowSecondary:
          '0 4px 6px -1px rgba(15,23,42,.08), 0 2px 4px -2px rgba(15,23,42,.06)',

        motionUnit: 0.08,
        motionBase: 0,
      },

      components: {
        Layout: {
          headerBg:     palette.neutral[0],
          headerHeight: 56,
          headerPadding:'0 24px',
          siderBg:      palette.neutral[900],
          bodyBg:       palette.neutral[100],
          triggerBg:    palette.neutral[800],
        },
        Menu: {
          darkItemBg:           palette.neutral[900],
          darkSubMenuItemBg:    palette.neutral[900],
          darkItemColor:        '#CBD5E1',
          darkItemHoverBg:      palette.neutral[800],
          darkItemHoverColor:   palette.neutral[0],
          darkItemSelectedBg:   palette.primary[700],
          darkItemSelectedColor:palette.neutral[0],
          itemHeight:           40,
          itemMarginInline:     8,
          itemBorderRadius:     6,
          iconSize:             16,
        },
        Table: {
          headerBg:           palette.neutral[50],
          headerColor:        palette.neutral[600],
          headerSortActiveBg: palette.neutral[100],
          headerSplitColor:   palette.neutral[200],
          borderColor:        palette.neutral[200],
          rowHoverBg:         palette.primary[50],
          rowSelectedBg:      palette.primary[50],
          rowSelectedHoverBg: palette.primary[100],
          cellPaddingBlock:   9,
          cellPaddingInline:  12,
          cellFontSize:       14,
          footerBg:           palette.neutral[50],
        },
        Button: {
          fontWeight:     500,
          primaryShadow:  'none',
          defaultShadow:  'none',
          dangerShadow:   'none',
          paddingInline:  16,
        },
        Input: {
          paddingBlock:      6,
          paddingInline:     12,
          hoverBorderColor:  palette.primary[400],
          activeBorderColor: palette.primary[500],
          activeShadow:      '0 0 0 2px rgba(15,98,254,.12)',
        },
        Select: {
          optionSelectedBg:    palette.primary[50],
          optionSelectedColor: palette.primary[700],
          optionHeight:        36,
        },
        Card: {
          headerHeight:    48,
          headerFontSize:  16,
          paddingLG:       16,
          boxShadowTertiary:
            '0 1px 2px rgba(15,23,42,.06), 0 1px 3px rgba(15,23,42,.10)',
        },
        Tabs: {
          horizontalItemPadding: '10px 0',
          horizontalMargin:      '0 0 16px 0',
          itemColor:             palette.neutral[600],
          itemHoverColor:        palette.primary[600],
          itemSelectedColor:     palette.primary[700],
          inkBarColor:           palette.primary[500],
          titleFontSize:         14,
        },
        Form: {
          labelColor:          palette.neutral[700],
          labelFontSize:       13,
          itemMarginBottom:    16,
          verticalLabelPadding:'0 0 4px',
        },
        Modal: {
          titleFontSize:  16,
          headerBg:       palette.neutral[0],
          contentBg:      palette.neutral[0],
          borderRadiusLG: 8,
        },
        Drawer: {
          footerPaddingBlock:  12,
          footerPaddingInline: 16,
        },
        Tag: {
          defaultBg:    palette.neutral[100],
          defaultColor: palette.neutral[700],
          borderRadiusSM: 4,
        },
        Descriptions: {
          labelBg:           palette.neutral[50],
          titleMarginBottom: 12,
          itemPaddingBottom: 12,
        },
        Steps: {
          titleLineHeight: 22,
          iconSize:        28,
          iconFontSize:    14,
        },
        Statistic: {
          contentFontSize: 30,
          titleFontSize:   13,
        },
        Tooltip: {
          colorBgSpotlight: palette.neutral[800],
        },
      },
    }

APPLICATION:

    // src/main.tsx
    import { ConfigProvider, App as AntApp } from 'antd'
    import enUS from 'antd/locale/en_US'
    import 'dayjs/locale/en-in'
    import { lightTheme } from './theme/antdTheme'

    <ConfigProvider
      theme={lightTheme}
      locale={enUS}
      componentSize="middle"
      form={{ requiredMark: true, scrollToFirstError: true }}
      table={{ size: 'middle' }}
    >
      <AntApp>{children}</AntApp>
    </ConfigProvider>

`AntApp` (antd's `App` component) is required — it provides
the context that `message`, `notification` and `Modal.confirm`
need in order to respect the theme.

============================================================
12. COMPONENT MAPPING
============================================================

This maps the shared element library from
03_PAGE_TEMPLATES.md §8 to concrete Ant Design components.
A module uses OUR wrapper, never the raw AntD component.

    OUR ELEMENT          ANT DESIGN BASIS
    ─────────────────────────────────────────────────────
    PageHeader           Flex + Typography + Space
    ContextBar           Space + Select + DatePicker
    StatusChip           Tag                (status colours §6)
    PriorityChip         Tag
    KpiCard              Card + Statistic
    AttentionStrip       Alert / List
    FilterBar            Form inline + Select + DatePicker
    QuickFilterTabs      Tabs or Segmented + Badge counts
    SearchBox            Input.Search
    DataTable            Table                (§13)
    TableToolbar         Space + Dropdown + Button
    Pagination           Table pagination
    EmptyState           Empty (customised)
    LoadingState         Skeleton             (never Spin)
    ErrorState           Result status="error"
    NoPermissionState    Result status="403"
    Drawer               Drawer
    Modal                Modal
    ConfirmDialog        Modal.confirm
    Toast                App.useApp().message
    FormSection          Card + Form
    FormField            Form.Item + control
    ItemGrid             Table with editable cells
    TotalsPanel          Descriptions + Statistic
    Timeline             Timeline
    DocumentPanel        Upload + List
    MediaPanel           Upload + Image.PreviewGroup
    ActivityFeed         List
    ApprovalPanel        Card + Steps + Button
    PaymentDrawer        Drawer + Form + Radio.Group
    RecordPickerDrawer   Drawer + Input.Search + List
    ProcessProgress      Steps                (T03)
    WorkspaceTabs        Tabs                 (T03)
    SignaturePad         custom canvas
    VoicePlayer          custom audio
    PrintPreview         custom + print CSS   (T11)

COMPONENTS WE DO NOT USE:

    Spin (full page)   → use Skeleton
    Collapse (as nav)  → use Menu or Tabs
    Carousel           → no place in an ERP
    Ant Design Pro     → too opinionated; we own our templates

============================================================
13. TABLE STANDARDS
============================================================

The Table is the most-used component in this product. It gets
explicit rules.

    size                middle (40px rows)
    header              sticky
    first column        sticky (fixed: 'left') on wide tables
    actions column      fixed: 'right'
    sort                server-side
    pagination          server-side, showSizeChanger,
                        default 25, options 25/50/100
    row click           opens the record
    row hover           primary-50 background
    selection           only when bulk actions exist
    virtualization      `virtual` for > 200 rows
    scroll              { x: 'max-content' } — never wrap cells

COLUMN ALIGNMENT:

    text            left
    numbers, money  right
    status, actions center or right
    dates           left

COLUMN RULES:

- Maximum ~12 visible columns by default.
- Every table supports show/hide/reorder, persisted per user.
- Never render an empty cell as blank — use "—".
- Never truncate a document number, registration or amount.
  Truncate descriptive text with a tooltip instead.
- Loading uses a table-shaped Skeleton, not a spinner.

============================================================
14. DATA DISPLAY STANDARDS
============================================================

MONEY:

    Stored          integer paise (see 06 plan §3.5)
    Displayed       Indian grouping via Intl.NumberFormat('en-IN')
    Symbol          ₹ with a thin space:  ₹ 18,750.00
    Alignment       right
    Figures         tabular-nums
    Negative        red, parentheses:  (₹ 1,250.00)
    Zero            ₹ 0.00 — never blank
    Large summaries may abbreviate: ₹ 12.4 L, ₹ 1.2 Cr
    Never abbreviate inside a transaction or invoice.

QUANTITY:

    Right aligned, tabular, with unit:  25 Nos · 4.5 Ltr

DATE AND TIME:

    Date            03 Aug 2026
    Date + time     03 Aug 2026, 02:45 PM
    Time only       02:45 PM
    Relative        allowed only for activity feeds
                    ("2 hours ago"), never on documents
    Range           01 Jul – 31 Jul 2026
    Financial year  FY 2026-27

    ONE format across the entire ERP. No exceptions.

IDENTIFIERS:

    Document numbers, VIN, SKU, barcode → mono font
    Registration numbers → uppercase, mono
    Example:  JC-2026-001248 · MH 12 AB 4582

EMPTY VALUES:

    Table cell      —
    Detail field    "Not provided" in colorTextTertiary
    Never blank. Never "null". Never "N/A".

PERCENTAGES AND DELTAS:

    +12.4% in success green, −8.1% in error red,
    always with an arrow icon, always with the comparison
    basis stated ("vs last month").

============================================================
15. ICONS
============================================================

    Primary set   @ant-design/icons
    Style         outlined by default, filled for emphasis
    Sizes         14 (inline) · 16 (default) · 20 (headers)
    Colour        inherits text colour unless semantic

RULES:

- One icon set. Do not mix icon libraries.
- Icons never replace text labels on primary actions.
- Icon-only buttons must have a Tooltip and an aria-label.
- Each domain concept gets ONE icon used consistently
  everywhere (job card, vehicle, customer, part, invoice,
  payment, vendor, technician, bay).

    Job Card      FileTextOutlined
    Vehicle       CarOutlined
    Customer      UserOutlined
    Part/Product  ToolOutlined
    Inventory     InboxOutlined
    Invoice       FileDoneOutlined
    Payment       WalletOutlined
    Vendor        ShopOutlined
    Technician    TeamOutlined
    Bay           BuildOutlined
    Insurance     SafetyCertificateOutlined
    Reports       BarChartOutlined
    Settings      SettingOutlined

============================================================
16. CHARTS
============================================================

Library: @ant-design/plots (consistent with AntD styling).

CATEGORICAL PALETTE — ordered, colourblind-considerate:

    1  #0F62FE   blue
    2  #198038   green
    3  #B28600   gold
    4  #6929C4   purple
    5  #007D79   teal
    6  #C2410C   orange
    7  #9F1853   magenta
    8  #475569   slate

SEQUENTIAL (single measure):

    #EFF5FF → #D0E2FF → #A6C8FF → #78A9FF →
    #4589FF → #0F62FE → #0043CE

DIVERGING (variance vs target):

    #A2191F ← #DA1E28 ← #FF8389 ← #F1F5F9 →
    #42BE65 → #198038 → #0E6027

CHART RULES (aligns with Reports flow §20):

- Never show a chart without its underlying data table.
- Axis labels always present; money axes formatted per §14.
- Maximum 8 series. Beyond that, group into "Other".
- Grid lines neutral-200, thin, horizontal only.
- No 3D. No gradients as data encoding. No pie charts with
  more than 5 slices.
- Every chart states its date range and branch scope.

============================================================
17. DARK MODE
============================================================

Dark mode is IN SCOPE but deferred to a later phase. The
theme is structured so it costs one config file, not a
redesign.

    // src/theme/antdTheme.ts
    import { theme } from 'antd'

    export const darkTheme: ThemeConfig = {
      algorithm: theme.darkAlgorithm,
      token: {
        ...lightTheme.token,
        colorTextBase: '#E2E8F0',
        colorBgBase:   '#0B1220',
        colorBgLayout: '#0B1220',
        colorBgContainer: '#111A2C',
        colorBgElevated:  '#16203A',
        colorBorder:          '#243049',
        colorBorderSecondary: '#1B2438',
      },
      components: { /* status colours re-mapped for dark bg */ },
    }

REQUIREMENT:

Because colours are consumed as tokens and status colours
come from `statusMap.ts`, NO module component needs editing
when dark mode ships. Any module that hard-codes a hex value
breaks this guarantee — which is why §1 forbids it.

============================================================
18. PRINT STYLES (T11)
============================================================

Print output is a first-class deliverable — 17+ documents use
T11.

    Page size       A4 (210 × 297mm)
    Margins         12mm all sides
    Body font       11pt Inter
    Table font      9pt
    Heading         14pt
    Colour          minimal; documents must be legible in
                    greyscale on a garage laser printer

PRINT CSS RULES:

- Hide: sidebar, global header, action buttons, filters,
  pagination, tooltips.
- Force: white background, black text, visible table borders.
- Never break a table row across pages.
- Repeat table headers on every page (`thead { display:
  table-header-group }`).
- Company header and footer come from Settings → Print
  Templates, never hard-coded.
- Page numbers on multi-page documents: "Page 1 of 2".

One shared print stylesheet serves all T11 documents.

============================================================
19. MOTION
============================================================

    motionDurationFast   100ms   hover, focus, small fades
    motionDurationMid    200ms   dropdowns, tooltips, tabs
    motionDurationSlow   300ms   drawers, modals

    Easing               cubic-bezier(0.4, 0, 0.2, 1)

RULES:

- Nothing animates longer than 300ms.
- Table rows, list rows and board cards do NOT animate on
  data refresh — a jumping table is unusable.
- Skeletons replace layout instantly; they do not fade in.
- `prefers-reduced-motion: reduce` disables all non-essential
  animation. Required, not optional.

============================================================
20. ACCESSIBILITY
============================================================

Target: WCAG 2.1 AA.

    Body text contrast          ≥ 4.5:1
    Large text / UI contrast    ≥ 3:1
    Focus ring    2px primary-500 + 2px offset, always visible
    Touch target  ≥ 36px (44px on POS and tablet-first screens)

REQUIREMENTS:

- Full keyboard operability on every template.
- Tab order follows visual order.
- Status never communicated by colour alone (§6).
- All icon-only controls have accessible labels.
- Form errors are announced, associated with their field, and
  the first error receives focus on submit.
- Modals and drawers trap focus and restore it on close.
- Tables use proper semantics with scoped headers.

============================================================
21. RESPONSIVE BEHAVIOUR
============================================================

    < 768px       Mobile   read-mostly; dashboards, lists,
                           record view. Not a build target
                           for this phase.
    768–1279px    Tablet   sidebar auto-collapses; workspace
                           tabs scroll; tables horizontal
                           scroll. Shop-floor target.
    1280–1919px   Desktop  PRIMARY TARGET.
    ≥ 1920px      Large    boards and wide tables expand;
                           content still capped at 1600px
                           except boards and POS.

AntD breakpoints align: xs 480 · sm 576 · md 768 · lg 992 ·
xl 1200 · xxl 1600.

============================================================
22. FILE STRUCTURE
============================================================

    src/theme/
    ├─ tokens.ts        palette + layout constants
    ├─ antdTheme.ts     lightTheme, darkTheme (ThemeConfig)
    ├─ statusMap.ts     status → semantic bucket, per module
    ├─ formatters.ts    money, date, quantity, identifier
    ├─ chartTheme.ts    categorical/sequential/diverging
    ├─ print.css        shared T11 print stylesheet
    └─ index.ts

    statusMap.ts shape:

    export type StatusTone =
      | 'neutral' | 'progress' | 'waiting'
      | 'action'  | 'success'  | 'failure' | 'closed'

    export const jobCardStatus: Record<string, StatusTone> = {
      'Draft': 'neutral',
      'Repair In Progress': 'progress',
      'Waiting for Parts': 'waiting',
      'Approval Pending': 'action',
      'Delivered': 'success',
      'Cancelled': 'failure',
      'Closed': 'closed',
      // ... all 27 statuses from Workshop §159
    }

============================================================
23. STRICT DO-NOT RULES
============================================================

DO NOT:

- Hard-code a hex colour anywhere outside src/theme/.
- Hard-code a spacing or font-size value in a module.
- Introduce a second UI component library.
- Use Ant Design Pro components — we own our templates.
- Pick a status colour inside a module.
- Use a full-page Spin instead of a Skeleton.
- Apply compactAlgorithm globally.
- Animate anything longer than 300ms.
- Use colour as the only carrier of meaning.
- Render an empty cell as blank.
- Use more than one date format.
- Override AntD styles with `!important` or global CSS
  selectors — extend the theme config instead.

============================================================
24. ACCEPTANCE CHECKLIST
============================================================

Before a screen is considered visually complete:

[ ] Uses only theme tokens — zero hard-coded values
[ ] Status chips resolve through statusMap.ts
[ ] Money, dates and quantities follow §14 exactly
[ ] Empty cells show "—"
[ ] Loading uses layout-matched Skeletons
[ ] All six page states styled (03_PAGE_TEMPLATES §11)
[ ] Keyboard navigable with visible focus
[ ] Contrast verified AA
[ ] Renders correctly at 1366, 1920 and tablet widths
[ ] Print output verified where T11 applies
[ ] No hard-coded hex would break dark mode

============================================================
25. FINAL PRINCIPLE
============================================================

    THE THEME IS THE PRODUCT'S MEMORY.

Every decision made here is a decision no module has to make
again. When a designer or developer asks "what colour should
this be?", the answer must already exist in this file.

If it does not, add it here — never in the module.

============================================================
END OF 01_ADMIN_THEME.md
============================================================
