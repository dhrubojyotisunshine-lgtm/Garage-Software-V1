# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/01_DASHBOARD.md
# MAIN ADMIN DASHBOARD — COMPLETE UI & PROCESS SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Dashboard is the MAIN OPERATIONAL CONTROL CENTER of the Garage ERP.

The purpose is NOT to show maximum charts.

The purpose is to answer:

- What is happening today?
- What needs attention?
- Which vehicles are waiting?
- Which jobs are running?
- Which jobs are delayed?
- Which approvals are pending?
- Which vehicles are ready?
- What is today's business position?
- Is inventory blocking workshop work?
- Which technicians/bays are available?
- What payments are pending?
- What reminders require action?

Dashboard must allow the user to move directly into the relevant
business record without unnecessary navigation.

============================================================
2. DASHBOARD PROCESS
============================================================

Login
        ↓
Select / Confirm Branch
        ↓
Dashboard
        ↓
View Today's Operations
        ↓
Identify Pending / Critical Work
        ↓
Open Relevant Record
        ↓
Take Action
        ↓
Return to Dashboard / Continue Work

Dashboard itself does NOT own business transactions.

It provides visibility and entry into relevant modules.

============================================================
3. PAGE TEMPLATE
============================================================

Use:

T01 — DASHBOARD TEMPLATE

From:

03_PAGE_TEMPLATES.md

Use complete application shell from:

01_ADMIN_THEME.md
02_NAVIGATION.md

============================================================
4. DASHBOARD HEADER
============================================================

LEFT:

Dashboard

Short description:

Garage operations overview

Context:

Today / Selected Date

RIGHT:

Date Filter

Refresh

Customize Dashboard

Do NOT place excessive buttons in header.

============================================================
5. GLOBAL HEADER
============================================================

Global header remains visible.

Contains:

Global Search

Branch Selector

Financial Year

+ Create

Notifications

Help

User Profile

Branch selection controls dashboard data context.

============================================================
6. BRANCH CONTEXT
============================================================

Dashboard supports:

All Branches

Specific Branch

Example:

Pune Main Branch

When branch changes:

Update visible dashboard context.

Update demo values where practical.

Show toast:

Branch changed to Pune Main Branch.

No backend/API required.

============================================================
7. DATE FILTER
============================================================

Dashboard date filter should support:

Today

Yesterday

This Week

Last Week

This Month

Last Month

This Year

Last Year

Custom Date Range

Default:

Today

Operational widgets should prioritize current-day information.

============================================================
8. DASHBOARD LAYOUT
============================================================

Recommended flow:

PAGE HEADER

        ↓

PRIMARY KPI ROW

        ↓

ATTENTION / ALERT STRIP

        ↓

WORKSHOP OPERATIONS

        ↓

VEHICLE QUEUE + BAY STATUS

        ↓

TECHNICIAN WORKLOAD + EXPECTED DELIVERIES

        ↓

FINANCIAL SNAPSHOT + INVENTORY ALERTS

        ↓

CRM / CUSTOMER FOLLOW-UP

        ↓

REMINDERS / APPROVALS

        ↓

RECENT ACTIVITY

        ↓

QUICK ACTIONS

============================================================
9. PRIMARY KPI ROW
============================================================

First row should answer immediate workshop position.

Recommended:

TODAY'S APPOINTMENTS

CHECKED-IN VEHICLES

RUNNING JOBS

READY FOR DELIVERY

Example demo values:

Today's Appointments
18

Checked-In
14

Running Jobs
11

Ready for Delivery
6

Each KPI should be clickable.

============================================================
10. KPI DRILL-DOWN
============================================================

Today's Appointments
        ↓
Service Calendar / Appointment View

Checked-In
        ↓
Job Cards filtered by current stage

Running Jobs
        ↓
Active Job Cards

Ready for Delivery
        ↓
Job Cards filtered Ready

Do NOT make KPI cards decorative.

============================================================
11. SECONDARY KPI ROW
============================================================

Use compact cards/summary indicators for:

Pending Estimate Approval

QC Pending

Overdue Jobs

Outstanding Payments

Low Stock Items

Open Insurance Claims

Example:

Pending Approval
8

QC Pending
4

Overdue
3

Outstanding
₹1,84,500

Low Stock
12

Claims
5

============================================================
12. ATTENTION REQUIRED PANEL
============================================================

This is a HIGH-PRIORITY dashboard component.

Title:

ATTENTION REQUIRED

Show only meaningful exceptions.

Possible alerts:

Estimate approval pending

Job overdue

Part unavailable

Vehicle waiting too long

QC failed

Payment pending

Insurance approval pending

Bay unavailable

Technician overload

Delivery delayed

Low stock

============================================================
13. ATTENTION ITEM STRUCTURE
============================================================

Each alert should contain:

Severity

Title

Related Record

Customer / Vehicle where applicable

Age / Time

Primary Action

Example:

HIGH

Vehicle Delivery Overdue

JC-2026-001248

Rajesh Sharma • MH 12 AB 4582

Expected 10:30 AM

[ Open Job Card ]

============================================================
14. ALERT SEVERITY
============================================================

Use:

CRITICAL
Red

WARNING
Amber

INFO
Blue

Do NOT use red for normal pending work.

============================================================
15. WORKSHOP OPERATIONS PANEL
============================================================

Title:

WORKSHOP OPERATIONS

Show compact status distribution.

Possible stages:

Waiting

Check-In

Inspection

Estimate

Approval

Repair

QC

Ready

Delivered

Example:

Waiting            4

Inspection         3

Approval           5

Repair             11

QC                 4

Ready              6

Clicking status:

Open relevant filtered Job Card view.

============================================================
16. VEHICLE QUEUE WIDGET
============================================================

Title:

VEHICLE QUEUE

Show current priority vehicles.

Columns / card data:

Vehicle

Job Card

Customer

Current Stage

Priority

Waiting Time

Assigned Technician where available

Example:

MH 12 AB 4582
JC-2026-001248
Rajesh Sharma
Repair
High
01h 24m
Rahul More

============================================================
17. VEHICLE QUEUE ACTION
============================================================

Primary:

View Full Queue

Clicking vehicle:

Open Job Card Workspace.

Do NOT create a separate duplicate vehicle process from
Dashboard.

============================================================
18. QUEUE PRIORITY
============================================================

Visually distinguish:

Emergency

High

Normal

Waiting Too Long

Do NOT rely only on color.

Display textual priority/status.

============================================================
19. BAY STATUS WIDGET
============================================================

Title:

BAY STATUS

Summary:

Available

Occupied

Maintenance

Example:

Available
4

Occupied
7

Maintenance
1

Below summary show compact bay cards.

Example:

BAY B-04

Occupied

MH 12 AB 4582

Rahul More

60% Complete

Expected:
04:30 PM

============================================================
20. BAY CARD ACTION
============================================================

Click occupied bay:

Open related Job Card / Bay quick view.

Click available bay:

Show bay availability information.

Primary widget action:

View Bay Board

============================================================
21. TECHNICIAN WORKLOAD WIDGET
============================================================

Title:

TECHNICIAN WORKLOAD

Display:

Technician

Current Job

Active Jobs

Pending Jobs

Workload

Status

Example:

Rahul More

JC-2026-001248

2 Active

1 Pending

75%

Busy

============================================================
22. TECHNICIAN STATUS
============================================================

Possible UI statuses:

Available

Busy

Overloaded

On Break

Absent

Completed Shift

These are operational UI states.

Exact attendance rules belong to HRM.

============================================================
23. TECHNICIAN ACTION
============================================================

Click Technician:

Open Technician Quick View.

Quick View may show:

Current Job

Assigned Jobs

Expected Completion

Today's Completed Jobs

Workload

Attendance Context

[ View Full Board ]

============================================================
24. EXPECTED DELIVERIES WIDGET
============================================================

Title:

EXPECTED DELIVERIES

Show vehicles expected for delivery today.

Fields:

Time

Vehicle

Customer

Job Card

Current Stage

Payment Status

Readiness

Example:

05:30 PM

MH 12 AB 4582

Rajesh Sharma

JC-2026-001248

QC

Partial Payment

Pending

============================================================
25. DELIVERY EXCEPTION
============================================================

Highlight:

Delivery time approaching but vehicle not ready.

Example:

DELIVERY RISK

Expected in 45 minutes

Vehicle still in Repair

Provide:

[ Open Job ]

============================================================
26. ESTIMATE APPROVAL WIDGET
============================================================

Title:

PENDING ESTIMATE APPROVALS

Display:

Job Card

Vehicle

Customer

Estimate Amount

Sent Time

Approval Method

Status

Example:

JC-2026-001248

MH 12 AB 4582

Rajesh Sharma

₹18,750

11:42 AM

WhatsApp

Waiting

============================================================
27. ESTIMATE APPROVAL ACTIONS
============================================================

Possible contextual actions:

Open Estimate

Send Reminder

Open Job Card

Do NOT approve complex estimate directly from dashboard unless
module specification explicitly allows it.

============================================================
28. QC PENDING WIDGET
============================================================

Title:

QUALITY CHECK PENDING

Display:

Job Card

Vehicle

Technician

Work Completed

Waiting Since

Supervisor

Status

Click:

Open Job Card → QC

============================================================
29. OVERDUE JOBS WIDGET
============================================================

Title:

OVERDUE JOBS

Display jobs where expected delivery has passed.

Fields:

Job Card

Vehicle

Customer

Expected Delivery

Delay

Current Stage

Reason where available

Assigned User

============================================================
30. FINANCIAL SNAPSHOT
============================================================

Title:

TODAY'S FINANCIAL SNAPSHOT

Possible values:

Workshop Billing

Counter Sales

Vehicle Sales Collection

Payments Received

Outstanding Generated

Expenses

Refunds

Use compact financial cards.

Do NOT turn Dashboard into full accounting software.

============================================================
31. FINANCIAL DRILL-DOWN
============================================================

Workshop Billing
        ↓
Finance / Workshop Revenue Report

Payments Received
        ↓
Payment Transactions

Outstanding
        ↓
Receivables

Expenses
        ↓
Expense Transactions

============================================================
32. PAYMENT COLLECTION WIDGET
============================================================

Title:

PAYMENT COLLECTION

Possible breakdown:

Cash

Card

UPI

Bank Transfer

Cheque

Credit

Wallet where applicable

Also show:

Total Collected

Pending Collection

Do NOT use a rainbow chart.

============================================================
33. OUTSTANDING PAYMENTS WIDGET
============================================================

Title:

OUTSTANDING PAYMENTS

Show priority outstanding records.

Fields:

Customer

Source

Invoice

Amount

Paid

Balance

Due Date

Age

Example:

Rajesh Sharma

Workshop

INV-2026-001025

₹18,750

₹5,000

₹13,750

Today

Current

============================================================
34. INVENTORY ALERTS
============================================================

Title:

INVENTORY ALERTS

Show:

Low Stock

Out of Stock

Reserved but unavailable

Purchase pending

Critical workshop part shortage

Example:

Front Brake Pad Set

Stock:
2

Reserved:
2

Available:
0

Reorder Level:
5

[ View Item ]

============================================================
35. WORKSHOP BLOCKING PARTS
============================================================

Important distinction:

Normal Low Stock

vs

PART BLOCKING ACTIVE JOB

Example:

PART REQUIRED

JC-2026-001248

Front Brake Pad Set

Required:
1

Available:
0

This should receive higher operational priority.

============================================================
36. PURCHASE STATUS WIDGET
============================================================

Optional dashboard widget:

PENDING PURCHASE

Possible information:

Purchase Orders Awaiting Approval

Expected Today

Overdue Delivery

Pending GRN

Vendor Payment Due

Keep summary compact.

============================================================
37. CRM / LEADS WIDGET
============================================================

Title:

CRM FOLLOW-UPS

Possible metrics:

New Leads

Follow-Ups Due

Overdue Follow-Ups

Appointments Today

Hot Leads

Display priority follow-ups.

============================================================
38. CRM FOLLOW-UP ROW
============================================================

Fields:

Customer / Lead

Requirement

Assigned Executive

Follow-Up Time

Status

Communication

Example:

Amit Shah

New Vehicle Inquiry

Neha Patil

02:30 PM

Due

WhatsApp

[ Open Lead ]

============================================================
39. CUSTOMER REMINDERS
============================================================

Title:

CUSTOMER REMINDERS

Possible types:

Service Due

Insurance Renewal

PUC

Membership Renewal

AMC Renewal

Warranty

Payment

Birthday

============================================================
40. REMINDER ROW
============================================================

Display:

Type

Customer

Vehicle where applicable

Due Date

Status

Preferred Communication where available

Actions:

Open

Contact

Mark Done where appropriate

============================================================
41. INSURANCE WIDGET
============================================================

Title:

INSURANCE CLAIMS

Possible metrics:

Open Claims

Survey Pending

Approval Pending

Repair Running

Settlement Pending

Click:

Open Insurance Claim list filtered accordingly.

============================================================
42. VEHICLE SALES WIDGET
============================================================

Title:

VEHICLE SALES

Possible summary:

New Enquiries

Bookings

Pending Finance

Pending RTO

Ready for Delivery

Delivered Today

Use only if Vehicle Sales module is enabled in the current
product configuration.

============================================================
43. COUNTER SALE WIDGET
============================================================

Title:

COUNTER SALES

Possible:

Bills Today

Items Sold

Sales Amount

Returns

Average Bill

Primary action:

New Counter Sale

============================================================
44. HR / STAFF WIDGET
============================================================

Title:

STAFF TODAY

Possible:

Present

Absent

On Leave

Late

Technicians Available

Technicians Busy

Do NOT expose detailed payroll information on general
operational dashboard.

============================================================
45. APPROVAL CENTER WIDGET
============================================================

Title:

PENDING APPROVALS

Possible categories:

Estimate

Additional Work

Discount

Purchase

Expense

Refund

Leave

Insurance

Display:

Type

Record

Requested By

Amount where applicable

Age

Status

============================================================
46. APPROVAL ACTION
============================================================

Click approval:

Open relevant business workspace/context.

Example:

Estimate Approval
        ↓
Job Card
        ↓
Estimate

Purchase Approval
        ↓
Purchase Workspace

Leave Approval
        ↓
Employee / Leave Context

Do NOT make Dashboard the primary approval processing engine.

============================================================
47. RECENT ACTIVITY
============================================================

Title:

RECENT ACTIVITY

Show latest meaningful events.

Examples:

Job Card created

Vehicle checked-in

Estimate approved

Technician assigned

Part issued

QC completed

Invoice generated

Payment received

Vehicle delivered

Purchase received

Insurance approved

============================================================
48. ACTIVITY ITEM
============================================================

Display:

Icon

Action

Record

User

Time

Example:

Payment Received

₹5,000 against INV-2026-001025

Recorded by Priya Shah

10 min ago

Click related record where applicable.

============================================================
49. QUICK ACTIONS
============================================================

Dashboard should provide quick access to common actions.

Recommended:

New Job Card

Quick Check-In

New Appointment

New Lead

New Customer

Counter Sale

Vehicle Sale

Receive Payment

Purchase

Expense

Do NOT display all actions simultaneously as large buttons.

============================================================
50. QUICK ACTION UI
============================================================

Show 4-6 most frequently used actions.

Example:

+ New Job Card

+ Appointment

+ Counter Sale

+ Customer

+ Receive Payment

More ▼

Additional actions inside More.

============================================================
51. GLOBAL CREATE VS DASHBOARD QUICK ACTION
============================================================

Both may exist.

GLOBAL CREATE:

Available from every page.

DASHBOARD QUICK ACTION:

Convenience shortcuts.

They should trigger the same underlying frontend screens.

Do NOT build duplicate forms.

============================================================
52. TODAY'S APPOINTMENTS
============================================================

Optional expanded widget.

Fields:

Time

Customer

Vehicle

Service Requirement

Advisor

Status

Actions

Possible status:

Scheduled

Confirmed

Arrived

Checked-In

Cancelled

No Show

============================================================
53. APPOINTMENT → JOB CARD
============================================================

When appointment has arrived:

Appointment
        ↓
Check-In
        ↓
Create / Open Job Card

Dashboard should provide relevant entry action.

Do NOT create duplicate customer/vehicle entry unnecessarily.

============================================================
54. VEHICLE READY WIDGET
============================================================

Title:

READY FOR DELIVERY

Display:

Vehicle

Customer

Job Card

Invoice Status

Payment Status

Gate Pass

Expected Pickup

Example:

MH 12 AB 4582

Rajesh Sharma

JC-2026-001248

Invoice Generated

Partial Payment

Pending Gate Pass

06:00 PM

============================================================
55. DELIVERY ACTION
============================================================

Click:

Open Job Card → Delivery context.

Do NOT complete vehicle delivery entirely from dashboard.

============================================================
56. WORKSHOP PERFORMANCE SUMMARY
============================================================

For larger date ranges, optional widget:

Jobs Opened

Jobs Completed

Average Repair Time

Average Delivery Time

Rework / QC Failure

Revenue

Technician Utilization

Use meaningful comparisons.

============================================================
57. BRANCH COMPARISON
============================================================

When:

All Branches

Optional management widget:

BRANCH PERFORMANCE

Fields:

Branch

Job Cards

Revenue

Pending Jobs

Overdue

Ready

Technician Utilization

Example:

Pune Main

Mumbai

Nashik

Click branch:

Switch dashboard context or drill down.

============================================================
58. DASHBOARD CUSTOMIZATION
============================================================

Action:

Customize Dashboard

Open Drawer / Configuration UI.

Allow frontend demonstration of:

Show Widget

Hide Widget

Reorder Widget

Reset Default

Widget visibility should be prepared for future role/permission
control.

============================================================
59. DASHBOARD WIDGET CATEGORIES
============================================================

Possible categories:

Workshop

Finance

Inventory

CRM

Vehicle Sales

Purchase

Insurance

Customer Programs

HRM

System

Do NOT show every available widget by default.

============================================================
60. ROLE-READY DASHBOARD
============================================================

Same dashboard framework should support future role-based
visibility.

Examples:

Service Advisor:

Appointments

Vehicle Queue

Estimate Approvals

Expected Deliveries

Customer Communication

Workshop Manager:

Bay Board

Technician Workload

Overdue Jobs

QC

Parts Blocking Jobs

Branch Manager:

Operational KPIs

Revenue

Outstanding

Inventory

Staff

Approvals

Do NOT create completely separate dashboard themes.

============================================================
61. NOTIFICATION CONNECTION
============================================================

Dashboard alerts and Header Notifications are related but
different.

Dashboard:

Operational summary.

Notification Center:

Individual events/messages.

Do NOT duplicate entire notification list on dashboard.

============================================================
62. SEARCH CONNECTION
============================================================

Dashboard should keep Global Search available.

User can directly search:

Customer

Mobile

Vehicle

Job Card

Invoice

Product

Supplier

Employee

etc.

No dashboard-specific search bar is required unless a widget
specifically needs one.

============================================================
63. REFRESH BEHAVIOR
============================================================

Header action:

Refresh

Frontend behavior:

Show subtle loading/skeleton state.

Update "Last Updated" indicator.

Example:

Last updated:
10:42 AM

No backend required.

============================================================
64. AUTO REFRESH PREPARATION
============================================================

UI may show:

Auto Refresh

Off

1 min

5 min

10 min

This is optional frontend preparation.

Do NOT implement unnecessary continuous API polling.

============================================================
65. DASHBOARD EMPTY STATE
============================================================

Example:

No workshop activity today.

Quick Actions:

Create Appointment

Create Job Card

Do NOT show broken empty charts.

============================================================
66. FIRST-TIME DASHBOARD
============================================================

For a newly configured garage:

Welcome to Enterprise Garage ERP

Suggested setup:

Company Profile

Branch

Workshop Bays

Employees

Services

Products

Opening Stock

Start First Job Card

This is only an optional empty/setup state.

Normal dashboard remains operational.

============================================================
67. LOADING STATE
============================================================

Use skeletons for:

KPIs

Queue

Bay Widget

Technician Widget

Financial Snapshot

Do NOT use full-screen loader for dashboard refresh.

============================================================
68. ERROR STATE
============================================================

If a widget fails in future architecture:

Keep other widgets available.

Example:

Unable to load Inventory Alerts.

[ Retry ]

Do NOT make complete dashboard unusable because one widget
fails.

============================================================
69. WIDGET ACTION PATTERN
============================================================

Every major widget may use:

Title

Optional Count

Optional Filter

Primary Content

View All / Open Board

More ▼ where required

Keep widget headers consistent.

============================================================
70. WIDGET FILTERING
============================================================

Some widgets may contain local filter.

Example:

Vehicle Queue

All

High Priority

Waiting Too Long

Do NOT add unnecessary filters to every widget.

============================================================
71. STATUS COLOR RULE
============================================================

Follow 01_ADMIN_THEME.md.

Success:
Completed / Ready

Warning:
Waiting / Pending

Danger:
Overdue / Failed / Critical

Info:
Running / Active Process

Neutral:
Draft / Not Started

Always display status text.

============================================================
72. DASHBOARD TABLE RULE
============================================================

Small dashboard tables:

Maximum approximately 5-8 visible rows.

Then:

View All

Do NOT put a 100-row table on dashboard.

============================================================
73. DASHBOARD CHART RULE
============================================================

Maximum useful charts should be prioritized.

Recommended default:

1-3 charts depending screen size and role.

Operational widgets are more important than charts.

============================================================
74. REVENUE TREND
============================================================

Optional chart:

Revenue Trend

Filter:

7 Days

30 Days

This Month

May compare:

Workshop

Counter Sale

Vehicle Sales

Keep chart visually simple.

============================================================
75. JOB STATUS CHART
============================================================

Optional compact chart:

Jobs by Status

Waiting

Inspection

Approval

Repair

QC

Ready

Click segment where practical:

Filter Job Cards.

============================================================
76. SERVICE TYPE ANALYSIS
============================================================

Optional management widget:

Periodic Service

Repair

Accidental

Electrical

AC

Tyre

Other

Use for selected larger date ranges.

Not essential for Today's operational view.

============================================================
77. CUSTOMER FEEDBACK WIDGET
============================================================

Possible:

Average Rating

Feedback Received

Pending Feedback

Low Rating Alerts

Show latest low-rating feedback requiring attention.

Click:

Open related Job Card / Customer context.

============================================================
78. BUSINESS CONTINUITY
============================================================

Dashboard must connect modules rather than duplicate them.

Examples:

Low Stock
→ Inventory

Outstanding
→ Finance

Pending Claim
→ Insurance

Lead Follow-Up
→ CRM

Vehicle Queue
→ Workshop

Staff
→ HRM

Booking
→ Vehicle Sales

============================================================
79. FRONTEND DEMO DATA
============================================================

Use realistic garage data.

Examples:

Customer:
Rajesh Sharma

Vehicle:
Maruti Suzuki Swift VXI

Registration:
MH 12 AB 4582

Job Card:
JC-2026-001248

Advisor:
Amit Patil

Technician:
Rahul More

Branch:
Pune Main Branch

Part:
Front Brake Pad Set

Do NOT use Lorem Ipsum.

============================================================
80. DEMO INTERACTIONS
============================================================

Dashboard frontend should demonstrate:

Branch Switching

Date Filter

KPI Click

Widget Drill-Down

Queue Item Click

Bay Quick View

Technician Quick View

Notifications

Global Create

Customize Dashboard

Refresh

Dropdowns

Tooltips

Modal / Drawer where relevant

No API/backend required.

============================================================
81. DASHBOARD URL
============================================================

Recommended:

dashboard.html

This should become the default authenticated landing page.

============================================================
82. RESPONSIVE BEHAVIOR
============================================================

Desktop:

4-column KPI layout where appropriate.

Two-column / three-column operational widgets.

Laptop:

Reduce columns logically.

Tablet:

Stack major widgets.

Tables may horizontally scroll.

Mobile application design is OUT OF SCOPE.

============================================================
83. DASHBOARD PERFORMANCE UX
============================================================

Do NOT render visually excessive information at once.

Priority order:

1. Critical operational information

2. Today's workshop status

3. Pending actions

4. Deliveries

5. Finance

6. Inventory

7. CRM / reminders

8. Trends / analytics

============================================================
84. NO DUPLICATION RULE
============================================================

Dashboard may DISPLAY summaries.

It should NOT recreate:

Job Card Workspace

Inventory Management

Finance Ledger

CRM Workspace

Insurance Claim Workspace

HRM screens

Use summaries + drill-down.

============================================================
85. DASHBOARD FEATURE MAP
============================================================

Today's Appointment
→ Workshop / Service Calendar

Vehicle Queue
→ Workshop

Bay Status
→ Workshop

Technician Workload
→ Workshop

Estimate Approval
→ Job Card

QC Pending
→ Job Card

Expected Delivery
→ Job Card

Outstanding Payment
→ Finance / Source Record

Low Stock
→ Inventory

Purchase Pending
→ Purchase

Lead Follow-Up
→ CRM

Insurance Claim
→ Insurance

Vehicle Booking
→ Vehicle Sales

Staff Status
→ HRM

Reminder
→ Relevant Customer / Vehicle / Record

============================================================
86. CLAUDE IMPLEMENTATION REQUIREMENT
============================================================

Claude should build Dashboard using reusable components.

Suggested conceptual components/classes:

dashboard-kpi

dashboard-widget

attention-panel

vehicle-queue

bay-status

technician-workload

delivery-list

financial-summary

inventory-alert

approval-list

reminder-list

activity-feed

quick-actions

Do NOT create isolated styling for every widget.

============================================================
87. DASHBOARD ACCEPTANCE CHECKLIST
============================================================

Before Dashboard is considered complete:

[ ] Global shell matches approved design

[ ] Branch selector works visually

[ ] Date filter exists

[ ] Primary KPIs exist

[ ] KPIs drill down

[ ] Attention Required exists

[ ] Vehicle Queue exists

[ ] Bay Status exists

[ ] Technician Workload exists

[ ] Expected Deliveries exists

[ ] Estimate Approvals exist

[ ] QC Pending represented

[ ] Overdue Jobs represented

[ ] Financial Snapshot exists

[ ] Outstanding represented

[ ] Inventory Alerts exist

[ ] CRM Follow-Ups represented

[ ] Reminders represented

[ ] Approvals represented

[ ] Recent Activity exists

[ ] Quick Actions exist

[ ] Relevant module links work

[ ] Dashboard customization UI exists

[ ] Responsive behavior exists

[ ] Realistic data exists

[ ] No backend/API generated

============================================================
88. STRICT DO-NOT RULES
============================================================

DO NOT:

- Make dashboard only charts and KPIs.
- Create oversized KPI cards.
- Show 20 charts.
- Display every module equally.
- Duplicate complete module functionality.
- Put full transaction forms on dashboard.
- Create giant tables.
- Hide critical workshop operations below analytics.
- Use random colors.
- Use decorative gradients.
- Create separate dashboard themes per role.
- Create mobile app dashboard.
- Generate API/backend/database code.

============================================================
89. FINAL DASHBOARD EXPERIENCE
============================================================

When an Admin / Branch Manager / Workshop Manager opens the
Dashboard, within a few seconds they should understand:

HOW MANY VEHICLES ARE HERE?

WHAT IS RUNNING?

WHAT IS WAITING?

WHAT IS DELAYED?

WHAT NEEDS APPROVAL?

WHAT IS READY FOR DELIVERY?

IS ANY JOB BLOCKED?

WHAT MONEY IS PENDING?

IS STOCK BLOCKING WORK?

WHAT NEEDS MY ATTENTION NOW?

Then the user should be able to click the relevant item and
continue work directly.

============================================================
90. FINAL PRINCIPLE
============================================================

DASHBOARD IS NOT A REPORT COLLECTION.

DASHBOARD IS AN OPERATIONAL DECISION SCREEN.

SHOW WHAT MATTERS.

SURFACE EXCEPTIONS.

CONNECT THE USER DIRECTLY TO THE WORK.

============================================================
END OF 05_MODULE_FLOWS/01_DASHBOARD.md
============================================================