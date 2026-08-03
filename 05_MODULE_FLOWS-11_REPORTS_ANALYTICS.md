# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/11_REPORTS_ANALYTICS.md
# REPORTS & ANALYTICS — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Reports & Analytics is the CENTRAL reporting and management
intelligence workspace of Garage ERP.

It should NOT create duplicate operational data.

Reports consume information from:

Workshop

Job Cards

Service Calendar

Vehicle Queue

Bay Management

Employees / Technicians

Customers

Vehicles

CRM

Inventory

Purchase

Vehicle Sales

Insurance / Warranty

Finance

HR

Audit / Activity

Multi-Branch Operations

The purpose is:

Visibility

Analysis

Comparison

Monitoring

Decision Support

Exception Detection

Trend Analysis

Operational Control

Financial Analysis

Performance Analysis

============================================================
2. PRIMARY NAVIGATION
============================================================

REPORTS & ANALYTICS

    Analytics Dashboard

    Reports

Do NOT create permanent sidebar menus for every report.

Example:

Workshop Reports

Inventory Reports

Finance Reports

CRM Reports

HR Reports

should be report categories inside ONE Reports Workspace.

============================================================
3. CORE REPORTING PRINCIPLE
============================================================

SOURCE MODULE
        ↓
SOURCE TRANSACTION
        ↓
REPORT
        ↓
SUMMARY
        ↓
DRILL-DOWN
        ↓
SOURCE RECORD

Example:

Workshop Revenue
        ↓
Revenue Report
        ↓
Branch
        ↓
Invoice
        ↓
Job Card

Users should be able to understand where every important
number originated.

============================================================
4. ANALYTICS DASHBOARD
============================================================

Use:

T01 Dashboard

This is MANAGEMENT analytics.

Do NOT duplicate normal operational dashboards.

It should answer:

How is the business performing?

Which branch performs best?

How much revenue is generated?

What is workshop productivity?

Are jobs being delivered on time?

What is technician utilization?

Which services generate revenue?

What inventory is moving?

What stock is blocked?

What is purchase performance?

How is CRM converting?

How are vehicle sales performing?

What money is outstanding?

What needs management attention?

============================================================
5. GLOBAL ANALYTICS FILTER BAR
============================================================

Recommended:

Date Range

Branch

Department / Module where relevant

Compare With

Refresh

More Filters

============================================================
6. DATE FILTERS
============================================================

Support:

Today

Yesterday

This Week

Last Week

This Month

Last Month

This Quarter

Last Quarter

This Year

Last Year

Financial Year

Custom Date Range

============================================================
7. COMPARISON FILTER
============================================================

Support where relevant:

Previous Period

Previous Week

Previous Month

Previous Quarter

Previous Year

Custom Comparison

============================================================
8. BRANCH FILTER
============================================================

Support:

All Authorized Branches

Specific Branch

Branch Group where future configuration permits

Always show current branch context.

============================================================
9. DASHBOARD KPI GROUPS
============================================================

Recommended management groups:

Business

Workshop

Customers

Inventory

Sales

Finance

Workforce

============================================================
10. BUSINESS KPIs
============================================================

Possible:

Total Revenue

Total Collections

Gross Profit Indicator

Open Receivables

Total Expenses

Vehicles Serviced

Vehicle Sales

New Customers

============================================================
11. WORKSHOP KPIs
============================================================

Possible:

Job Cards Created

Jobs Completed

Running Jobs

Average Job Value

Average Repair Time

On-Time Delivery %

Technician Utilization

Bay Utilization

Rework / Comeback

============================================================
12. CUSTOMER KPIs
============================================================

Possible:

New Customers

Repeat Customers

Active Customers

Customer Retention

Average Customer Value

Feedback Rating

Complaints

Outstanding Customers

============================================================
13. INVENTORY KPIs
============================================================

Possible:

Inventory Value

Low Stock Items

Out of Stock

Fast Moving

Slow Moving

Dead Stock

Stock Turnover Indicator

Pending Purchase Requirements

============================================================
14. VEHICLE SALES KPIs
============================================================

Possible:

Leads

Bookings

Vehicles Sold

Sales Revenue

Average Selling Price

Booking Conversion

Cancelled Bookings

Inventory Age

============================================================
15. FINANCE KPIs
============================================================

Possible:

Billed

Collected

Receivable

Overdue Receivable

Payable

Overdue Payable

Expenses

Cash Position

============================================================
16. WORKFORCE KPIs
============================================================

Possible:

Employees Present

Technicians Available

Technicians Busy

Productive Hours

Overtime

Leave

Technician Efficiency

============================================================
17. MANAGEMENT ATTENTION
============================================================

Show exception-driven information.

Examples:

Delayed Job Cards

Vehicles Waiting Too Long

Overloaded Technician

Underutilized Bay

Low Stock

Dead Stock

Purchase Delay

Overdue Customer Payment

Vendor Payment Overdue

Insurance Settlement Pending

High Rework

High Discount

Low Margin Transaction

Customer Complaint Pending

Document Expiry

============================================================
18. KPI CARD BEHAVIOUR
============================================================

Every important KPI should support:

Current Value

Previous Period Comparison

Trend

Drill-Down

Example:

Workshop Revenue

$125,420

+8.4% vs previous month

[ View Details ]

============================================================
19. TREND CHARTS
============================================================

Possible charts:

Revenue Trend

Job Card Trend

Vehicle Service Trend

Collection Trend

Expense Trend

Sales Trend

Lead Conversion Trend

Inventory Consumption Trend

============================================================
20. CHART RULE
============================================================

Charts must:

Have clear title

Have date context

Have branch context

Have readable labels

Have tooltip

Have legend where required

Support drill-down where meaningful

Do NOT add decorative charts with no business purpose.

============================================================
21. REPORTS WORKSPACE
============================================================

Use one central Reports page.

Recommended structure:

Report Search

Favorites

Recent Reports

Categories

Saved Views

Report Results

============================================================
22. REPORT CATEGORIES
============================================================

Recommended:

Workshop

Customer & Vehicle

CRM

Inventory

Purchase

Vehicle Sales

Insurance & Warranty

Finance

Employee & HR

Management

Audit & Activity

============================================================
23. REPORT SEARCH
============================================================

Search reports by:

Report Name

Keyword

Module

Example:

"technician"

Results:

Technician Performance

Technician Productivity

Technician Labour

Technician Attendance

============================================================
24. FAVORITE REPORTS
============================================================

User may mark frequently used reports as favorites.

Example:

Daily Workshop Summary

Customer Outstanding

Low Stock

Technician Performance

Branch Revenue

Frontend interaction only for now.

============================================================
25. RECENT REPORTS
============================================================

Show recently opened report cards.

Possible:

Report

Last Opened

Filters Used

============================================================
26. SAVED REPORT VIEW
============================================================

Frontend should prepare ability to save:

Report

Filters

Columns

Sorting

Grouping

Name

Example:

"Pune Monthly Workshop Revenue"

No backend persistence required now.

============================================================
27. COMMON REPORT FILTERS
============================================================

Where relevant:

Date Range

Branch

Customer

Vehicle

Employee

Technician

Service Advisor

Vendor

Category

Brand

Status

Payment Status

Amount Range

============================================================
28. REPORT RESULT HEADER
============================================================

Display:

Report Name

Date Range

Branch

Applied Filters

Generated At

Result Count

Actions

============================================================
29. REPORT ACTIONS
============================================================

Possible:

Apply Filter

Reset

Save View

Print

Export

Refresh

Column Settings

============================================================
30. EXPORT OPTIONS
============================================================

Frontend may display:

Excel

CSV

PDF

Print

No actual server export required during UI phase.

============================================================
31. COLUMN SETTINGS
============================================================

Allow UI preparation for:

Show / Hide Columns

Reorder Columns

Reset Default

============================================================
32. REPORT DRILL-DOWN
============================================================

CRITICAL.

Example:

Revenue Report
        ↓
Branch Revenue
        ↓
Invoice
        ↓
Job Card
        ↓
Customer / Vehicle

Do NOT make reports dead-end tables.

============================================================
33. WORKSHOP REPORTS
============================================================

Must prepare:

Daily Workshop Summary

Job Card Report

Job Card Status Report

Open Job Cards

Completed Job Cards

Cancelled Job Cards

Delayed Jobs

Service Type Report

Service Advisor Report

Technician Report

Labour Report

Parts Consumption Report

Lubricants Report

Outsource Job Report

QC Report

Rework Report

Comeback Report

Vehicle Delivery Report

============================================================
34. DAILY WORKSHOP SUMMARY
============================================================

Show:

Opening Jobs

New Job Cards

Running Jobs

Completed Jobs

Delivered Jobs

Pending Jobs

Revenue

Collections

Average Job Value

============================================================
35. JOB CARD REPORT
============================================================

Recommended columns:

Job Card

Date

Customer

Vehicle

Service Type

Advisor

Technician

Bay

Estimate

Invoice

Status

Delivery

============================================================
36. JOB CARD STATUS REPORT
============================================================

Possible grouping:

Check-In

Inspection

Estimate

Approval Pending

Repair

Waiting for Parts

QC

Ready

Delivered

Cancelled

============================================================
37. DELAYED JOB REPORT
============================================================

Show:

Job Card

Vehicle

Customer

Advisor

Technician

Expected Delivery

Current Status

Delay Duration

Delay Reason

============================================================
38. SERVICE TYPE REPORT
============================================================

Possible:

General Service

Repair

Body Work

Accidental

Insurance

Warranty

Quick Service

Other

Show:

Jobs

Revenue

Average Value

Average Completion Time

============================================================
39. SERVICE ADVISOR REPORT
============================================================

Possible:

Advisor

Job Cards

Estimate Value

Approved Value

Invoice Value

Average Job Value

On-Time Delivery

Customer Rating

============================================================
40. TECHNICIAN PERFORMANCE REPORT
============================================================

Show:

Technician

Jobs Assigned

Jobs Completed

Estimated Hours

Actual Hours

Productive Hours

Efficiency

QC Failures

Rework

Comeback

============================================================
41. TECHNICIAN PRODUCTIVITY DRILL-DOWN
============================================================

Technician
        ↓
Job Cards
        ↓
Tasks
        ↓
Labour
        ↓
Time

No manually duplicated performance data.

============================================================
42. LABOUR REPORT
============================================================

Possible:

Labour Item

Job Card

Technician

Hours

Rate

Discount

Revenue

============================================================
43. PARTS CONSUMPTION REPORT
============================================================

Show:

Part

Part Number

Job Card

Vehicle

Qty

Cost where authorized

Selling Price

Technician

Branch

============================================================
44. LUBRICANT CONSUMPTION REPORT
============================================================

Show:

Lubricant

Job Card

Vehicle

Quantity

Rate

Amount

Branch

============================================================
45. OUTSOURCE JOB REPORT
============================================================

Show:

Job Card

Vendor

Job Type

Cost

Customer Charge

Status

Margin where authorized

============================================================
46. QC REPORT
============================================================

Possible:

Job Card

Vehicle

Technician

QC User

QC Date

Result

Failed Items

Rework Required

============================================================
47. REWORK REPORT
============================================================

Show factual information:

Original Job Card

Rework Job / Task

Vehicle

Issue

Date

Technician(s)

Reason

Cost Impact where available

============================================================
48. COMEBACK REPORT
============================================================

Show:

Customer

Vehicle

Previous Job

Return Date

Complaint

Related Repair

Outcome

============================================================
49. BAY UTILIZATION REPORT
============================================================

Show:

Bay

Available Hours

Occupied Hours

Utilization %

Jobs Handled

Idle Time

Maintenance Time

============================================================
50. SERVICE CALENDAR REPORT
============================================================

Possible:

Appointments

Check-Ins

Completed Appointments

No-Shows

Rescheduled

============================================================
51. VEHICLE QUEUE REPORT
============================================================

Possible:

Vehicle

Arrival

Queue Type

Wait Duration

Check-In

Repair Start

Delivery

============================================================
52. CUSTOMER REPORTS
============================================================

Must prepare:

Customer List

New Customers

Repeat Customers

Inactive Customers

Customer Service History

Customer Revenue

Customer Outstanding

Customer Feedback

Customer Complaint

============================================================
53. CUSTOMER REVENUE REPORT
============================================================

Show:

Customer

Vehicles

Job Cards

Invoices

Revenue

Payments

Outstanding

Last Visit

============================================================
54. CUSTOMER RETENTION REPORT
============================================================

Possible:

First Visit

Last Visit

Visit Count

Repeat Status

Average Visit Gap

Revenue

============================================================
55. VEHICLE REPORTS
============================================================

Must prepare:

Vehicle List

Vehicle Service History

Vehicle Visit Frequency

Vehicle Expense / Service Value

Vehicle Recommendations

Upcoming Service

Warranty

Insurance Expiry

============================================================
56. VEHICLE SERVICE HISTORY REPORT
============================================================

Show:

Vehicle

Customer

Job Card

Date

Odometer

Service

Parts

Labour

Invoice

Next Service

============================================================
57. CRM REPORTS
============================================================

Must prepare:

Lead Report

Lead Source

Lead Status

Lead Conversion

Follow-Up

Overdue Follow-Up

Appointment

Campaign

Customer Complaint

Lost Lead

============================================================
58. LEAD REPORT
============================================================

Show:

Lead

Customer

Source

Interested In

Executive

Created Date

Current Stage

Last Follow-Up

Next Follow-Up

Status

============================================================
59. LEAD SOURCE REPORT
============================================================

Possible:

Walk-In

Phone

Website

WhatsApp

Referral

Campaign

Social

Other

Show:

Leads

Converted

Lost

Conversion %

============================================================
60. CRM CONVERSION FUNNEL
============================================================

Lead
        ↓
Contacted
        ↓
Qualified
        ↓
Appointment / Test Drive
        ↓
Estimate / Offer
        ↓
Booking
        ↓
Converted

Display stage counts and conversion.

============================================================
61. FOLLOW-UP REPORT
============================================================

Show:

Customer / Lead

Executive

Last Follow-Up

Next Follow-Up

Status

Priority

Overdue Duration

============================================================
62. CUSTOMER COMPLAINT REPORT
============================================================

Show:

Complaint

Customer

Vehicle

Source

Owner

Created

Priority

Status

Resolution Time

============================================================
63. INVENTORY REPORTS
============================================================

Must prepare:

Stock Summary

Stock Ledger

Stock Movement

Low Stock

Out of Stock

Fast Moving

Slow Moving

Dead Stock

Stock Ageing

Stock Valuation

Part Consumption

Stock Adjustment

Stock Transfer

Reserved Stock

============================================================
64. STOCK SUMMARY REPORT
============================================================

Show:

Item

SKU / Part Number

Category

Opening

Inward

Outward

Reserved

Available

Closing

============================================================
65. STOCK LEDGER
============================================================

Show:

Date

Item

Transaction

Reference

In

Out

Balance

Branch

User

============================================================
66. LOW STOCK REPORT
============================================================

Show:

Item

Available

Minimum Level

Reorder Level

Required Qty

Preferred Vendor

============================================================
67. DEAD STOCK REPORT
============================================================

Possible:

Item

Stock

Inventory Value

Last Movement

Days Without Movement

Branch

============================================================
68. STOCK AGEING
============================================================

Possible buckets:

0–30 Days

31–60 Days

61–90 Days

91–180 Days

180+ Days

============================================================
69. STOCK VALUATION
============================================================

Show only to authorized users.

Possible:

Item

Qty

Unit Cost

Stock Value

Branch

Category

============================================================
70. STOCK ADJUSTMENT REPORT
============================================================

Show:

Date

Item

System Qty

Adjusted Qty

Difference

Reason

User

Approval where applicable

============================================================
71. STOCK TRANSFER REPORT
============================================================

Show:

Transfer Number

From Branch

To Branch

Items

Qty

Dispatch

Receipt

Status

============================================================
72. PURCHASE REPORTS
============================================================

Must prepare:

Purchase Request

Purchase Order

PO Status

GRN

Purchase

Vendor Purchase

Purchase Return

Purchase Cost

Pending Delivery

Vendor Performance

============================================================
73. PURCHASE ORDER REPORT
============================================================

Show:

PO

Vendor

Branch

Date

Expected Delivery

Items

Amount

Received

Pending

Status

============================================================
74. PURCHASE PENDING REPORT
============================================================

Show:

PO

Vendor

Item

Ordered

Received

Pending

Expected Date

Delay

============================================================
75. VENDOR PERFORMANCE REPORT
============================================================

Possible:

Vendor

PO Count

Purchase Value

On-Time Delivery

Delayed Delivery

Rejected Qty

Returns

Average Delivery Time

============================================================
76. PURCHASE COST REPORT
============================================================

Permission-sensitive.

Show:

Item

Vendor

Purchase Date

Qty

Rate

Discount

Tax

Landed Cost where available

============================================================
77. VEHICLE SALES REPORTS
============================================================

Must prepare:

Vehicle Stock

Available Vehicles

Vehicle Ageing

Lead to Sale

Booking

Booking Cancellation

Vehicle Sale

Sales Executive

Gross Margin

Delivery

Exchange Vehicle

============================================================
78. VEHICLE STOCK REPORT
============================================================

Show:

Vehicle

Stock Number

Make / Model

Year

Purchase Date

Purchase Cost where authorized

Selling Price

Stock Age

Status

Branch

============================================================
79. VEHICLE AGEING REPORT
============================================================

Possible:

0–30 Days

31–60 Days

61–90 Days

91–180 Days

180+ Days

Show vehicle count and value.

============================================================
80. VEHICLE SALES REPORT
============================================================

Show:

Sale

Customer

Vehicle

Executive

Booking Date

Sale Date

Selling Price

Discount

Payment

Outstanding

Status

============================================================
81. VEHICLE MARGIN REPORT
============================================================

Highly permission-sensitive.

Possible:

Vehicle

Purchase Cost

Repair / Preparation Cost

Other Cost

Selling Price

Discount

Gross Margin

============================================================
82. SALES EXECUTIVE REPORT
============================================================

Show:

Executive

Leads

Bookings

Sales

Conversion

Revenue

Cancellation

Delivery

============================================================
83. EXCHANGE VEHICLE REPORT
============================================================

Show:

Customer

New Vehicle

Exchange Vehicle

Valuation

Final Exchange Value

Sale / Disposal Status

============================================================
84. INSURANCE REPORTS
============================================================

Must prepare:

Active Policies

Policy Expiry

Renewal Due

Renewal Conversion

Insurance Claims

Claim Status

Survey Pending

Approval Pending

Claim Settlement

Insurer Outstanding

Claim Rejection

============================================================
85. INSURANCE CLAIM REPORT
============================================================

Show:

Claim

Customer

Vehicle

Insurer

Job Card

Estimated

Approved

Insurer Liability

Customer Liability

Settlement

Status

============================================================
86. CLAIM SETTLEMENT REPORT
============================================================

Show:

Claim

Insurance Company

Approved Amount

Settlement Amount

Received

Outstanding

Settlement Date

Status

============================================================
87. WARRANTY / AMC REPORTS
============================================================

Must prepare:

Active Warranty

Warranty Expiry

Warranty Claim

Warranty Rejection

AMC Active

AMC Expiry

AMC Usage

Unused AMC Services

============================================================
88. WARRANTY CLAIM REPORT
============================================================

Show:

Claim

Vehicle

Provider

Job Card

Claimed

Approved

Customer Share

Status

============================================================
89. AMC USAGE REPORT
============================================================

Show:

AMC

Customer

Vehicle

Total Services

Used

Remaining

Expiry

Status

============================================================
90. FINANCE REPORTS
============================================================

Must prepare:

Sales

Collections

Payment Mode

Receivables

Receivable Ageing

Customer Outstanding

Payables

Payable Ageing

Vendor Outstanding

Expenses

Refunds

Credit Notes

Debit Notes

Cash Flow

Daily Closing

Tax Summary

Profit & Loss Presentation

============================================================
91. SALES REPORT
============================================================

Possible grouping:

Workshop

Vehicle Sales

Parts Sales

Other Revenue

Show:

Gross

Discount

Tax

Net

============================================================
92. COLLECTION REPORT
============================================================

Show:

Cash

Card

UPI

Bank Transfer

Cheque

Credit Recovery

Insurance Receipt

Other

============================================================
93. PAYMENT MODE REPORT
============================================================

Show:

Mode

Transaction Count

Amount

Refund

Net Collection

============================================================
94. RECEIVABLE AGEING REPORT
============================================================

Buckets:

Current

1–30 Days

31–60 Days

61–90 Days

90+ Days

============================================================
95. PAYABLE AGEING REPORT
============================================================

Buckets:

Current

1–30 Days

31–60 Days

61–90 Days

90+ Days

============================================================
96. EXPENSE REPORT
============================================================

Show:

Date

Category

Payee

Description

Branch

Payment Mode

Amount

Status

============================================================
97. REFUND REPORT
============================================================

Show:

Refund

Customer / Party

Original Transaction

Reason

Amount

Mode

Status

Date

============================================================
98. DAILY CLOSING REPORT
============================================================

Show:

Branch

Counter

Opening

Cash In

Cash Out

Expected

Actual

Difference

Status

============================================================
99. CASH FLOW REPORT
============================================================

Show:

Opening

Money In

Money Out

Net Movement

Closing

============================================================
100. PROFIT & LOSS PRESENTATION
============================================================

Management presentation may include:

Revenue

Direct Cost

Gross Profit

Operating Expenses

Operating Result

Comparison

Exact accounting implementation later.

============================================================
101. HR REPORTS
============================================================

Must prepare:

Employee

Attendance

Absence

Late Attendance

Leave

Overtime

Technician Performance

Advisor Performance

Sales Performance

CRM Performance

Document Expiry

Employee Transfer

Employee Exit

============================================================
102. EMPLOYEE REPORT
============================================================

Show:

Employee

Code

Branch

Department

Designation

Joining Date

Status

============================================================
103. ATTENDANCE REPORT
============================================================

Show:

Employee

Date

Shift

Check-In

Check-Out

Working Hours

Late

Overtime

Status

============================================================
104. LEAVE REPORT
============================================================

Show:

Employee

Leave Type

From

To

Duration

Status

Approver

============================================================
105. MANAGEMENT REPORTS
============================================================

Recommended:

Branch Performance

Department Performance

Revenue Comparison

Workshop Performance

Customer Retention

Inventory Health

Purchase Efficiency

Sales Conversion

Outstanding Summary

Expense Analysis

Workforce Productivity

============================================================
106. BRANCH PERFORMANCE
============================================================

For each branch show:

Revenue

Collections

Job Cards

Vehicles Serviced

Vehicle Sales

Customers

Expenses

Receivable

Technician Productivity

Inventory Value

============================================================
107. BRANCH COMPARISON
============================================================

Example:

Pune
Mumbai
Nashik

Compare:

Revenue

Jobs

Average Job Value

Collections

Expenses

Sales

Outstanding

============================================================
108. PERIOD COMPARISON
============================================================

Example:

July 2026

vs

June 2026

Show:

Revenue

Job Cards

Customers

Average Job Value

Collections

Expenses

============================================================
109. TARGET VS ACTUAL PREPARATION
============================================================

Frontend may prepare future target presentation.

Example:

Workshop Revenue Target:
$150,000

Actual:
$125,420

Achievement:
83.6%

No backend target engine required now.

============================================================
110. TOP / BOTTOM ANALYSIS
============================================================

Possible:

Top Services

Top Parts

Top Customers

Top Vendors

Top Sales Executives

Top Revenue Branches

Slow Moving Parts

Lowest Conversion Sources

Use factual metrics.

============================================================
111. DISCOUNT ANALYSIS
============================================================

Show:

Module

User

Branch

Transaction

Gross Amount

Discount

Discount %

Reason

Useful for management control.

============================================================
112. CANCELLATION ANALYSIS
============================================================

Possible:

Job Card Cancellation

Booking Cancellation

Sale Cancellation

Invoice Cancellation

Purchase Cancellation

Show reason and source.

============================================================
113. EXCEPTION REPORTS
============================================================

Critical reports:

Delayed Jobs

Waiting for Approval

Waiting for Parts

Overdue Receivables

Overdue Payables

Low Stock

Dead Stock

Purchase Delays

Claim Settlement Pending

Overdue Follow-Ups

Cash Difference

Document Expiry

============================================================
114. REPORT GROUPING
============================================================

Where meaningful allow:

Group by Branch

Group by Employee

Group by Customer

Group by Vendor

Group by Category

Group by Status

Group by Date

============================================================
115. REPORT SORTING
============================================================

Allow UI sorting:

Ascending

Descending

Multiple column sorting where useful

============================================================
116. REPORT TOTALS
============================================================

For financial/numeric reports show relevant totals.

Example:

Invoice Amount

Discount

Tax

Paid

Outstanding

Do NOT total meaningless columns.

============================================================
117. REPORT SUBTOTALS
============================================================

Where grouped:

Branch
    Subtotal

Employee
    Subtotal

Category
    Subtotal

Grand Total

============================================================
118. REPORT DETAIL DRAWER
============================================================

For quick investigation use drawer before navigating away.

Example:

Click Job Card
        ↓
Quick Summary Drawer
        ↓
Open Full Job Card

============================================================
119. SOURCE TRACEABILITY
============================================================

Every important report row should retain links/context to
source.

Examples:

Invoice → Invoice

Job Card → Job Card

Customer → Customer 360

Vehicle → Vehicle Detail

PO → Purchase Workspace

Claim → Claim Workspace

Employee → Employee Workspace

============================================================
120. ANALYTICS DRILL-DOWN EXAMPLE
============================================================

Dashboard:

Overdue Receivables
$42,800

Click
        ↓
Receivable Report

Click Customer
        ↓
Customer Outstanding

Click Invoice
        ↓
Invoice Financial View

Click Source
        ↓
Job Card / Sale

============================================================
121. WORKSHOP DRILL-DOWN EXAMPLE
============================================================

Dashboard:

Delayed Jobs
18

Click
        ↓
Delayed Job Report

Click:
JC-2026-001248

        ↓
Job Card Workspace

============================================================
122. INVENTORY DRILL-DOWN EXAMPLE
============================================================

Dashboard:

Low Stock
24

Click
        ↓
Low Stock Report

Click Part
        ↓
Inventory Item

Click Movement
        ↓
Stock Ledger

============================================================
123. BRANCH-AWARE REPORTING
============================================================

Every report should clearly show:

Selected Branch

OR

All Authorized Branches

Never display consolidated numbers without branch context.

============================================================
124. PERMISSION-AWARE REPORTING
============================================================

Some reports/columns are sensitive.

Possible restricted values:

Purchase Cost

Margin

Profit

Salary

Bank Balance

Vendor Payable

Organization Revenue

All Branch Data

Frontend architecture must allow them to be hidden.

============================================================
125. ROLE-BASED REPORT EXPERIENCE
============================================================

Example:

Workshop Manager sees:

Workshop

Technicians

Bay

Parts Consumption

Service Performance

Finance Manager sees:

Sales

Receivables

Payables

Expenses

Cash Flow

Management sees:

Cross-module analytics

Branch comparison

Profitability

============================================================
126. REPORT EMPTY STATE
============================================================

When no data:

Show:

No records found for selected filters.

Actions:

Change Filters

Reset Filters

Do NOT show broken empty tables.

============================================================
127. LOADING STATE
============================================================

Frontend should prepare:

KPI Skeletons

Chart Skeletons

Table Loading State

============================================================
128. ERROR STATE
============================================================

Prepare:

Unable to load report.

Retry

No backend implementation required.

============================================================
129. PRINT VIEW
============================================================

Reports should have clean print layouts.

Include:

Organization

Report Name

Date Range

Branch

Filters

Generated At

Report Data

Totals

============================================================
130. PDF VIEW PREPARATION
============================================================

PDF-style report view should avoid:

Sidebar

Navigation

Interactive controls

Unnecessary UI decorations

============================================================
131. EXPORT PREPARATION
============================================================

Export action should show:

Current View

All Columns

Selected Columns

Selected Date Range

No actual export service required now.

============================================================
132. SCHEDULED REPORT PREPARATION
============================================================

Future-ready UI may include:

Schedule Report

Daily

Weekly

Monthly

Recipient

Format

No scheduler/email backend required now.

============================================================
133. REPORT SHARING PREPARATION
============================================================

Possible future UI:

Email Report

Share Internal

Copy Report Link

Permission rules later.

============================================================
134. AUDIT & ACTIVITY REPORTS
============================================================

Prepare:

User Activity

Login Activity

Record Creation

Record Modification

Status Changes

Approvals

Cancellations

Financial Reversals

Sensitive Actions

============================================================
135. ACTIVITY REPORT
============================================================

Show:

Date / Time

User

Branch

Module

Action

Record

Description

============================================================
136. AUDIT REPORT
============================================================

Where authorized show:

User

Entity

Field / Action

Previous Value

New Value

Date / Time

Reason where applicable

============================================================
137. REPORT FAVORITE CARD
============================================================

Example:

DAILY WORKSHOP SUMMARY

Last Opened:
Today 09:12 AM

Default:
Pune Main

[ Open Report ]

============================================================
138. SAVED VIEW CARD
============================================================

Example:

MONTHLY TECHNICIAN PERFORMANCE

Date:
This Month

Branch:
Pune

Technicians:
All

Columns:
Custom

[ Open ]

============================================================
139. ANALYTICS RESPONSIVE BEHAVIOUR
============================================================

Desktop-first ERP.

For smaller screens:

KPI cards wrap

Filters collapse

Charts remain readable

Tables scroll horizontally

Important totals remain visible

No mobile app screens required.

============================================================
140. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Analytics Dashboard

Global Date Filter

Branch Filter

Period Comparison

KPI Cards

KPI Drill-Down

Trend Charts

Management Attention

Report Search

Report Categories

Favorite Reports

Recent Reports

Saved Views

Common Filters

Applied Filter Chips

Column Settings

Grouping

Sorting

Totals

Subtotals

Report Detail Drawer

Source Record Navigation

Workshop Reports

Daily Workshop Summary

Job Card Report

Delayed Job Report

Service Advisor Report

Technician Performance

Labour Report

Parts Consumption

Lubricants

Outsource Jobs

QC

Rework

Comeback

Bay Utilization

Customer Reports

Vehicle Reports

CRM Reports

Lead Conversion Funnel

Inventory Reports

Stock Ledger

Low Stock

Dead Stock

Stock Ageing

Stock Valuation

Stock Transfer

Purchase Reports

PO Report

Pending Purchase

Vendor Performance

Vehicle Sales Reports

Vehicle Stock

Vehicle Ageing

Sales

Margin

Insurance Reports

Claim Settlement

Warranty Reports

AMC Usage

Finance Reports

Sales

Collections

Receivables

Payables

Ageing

Expenses

Refunds

Daily Closing

Cash Flow

P&L Presentation

HR Reports

Attendance

Leave

Employee Performance

Management Reports

Branch Comparison

Period Comparison

Target vs Actual UI

Discount Analysis

Cancellation Analysis

Exception Reports

Print View

Export UI

Scheduled Report UI

Audit / Activity Reports

Empty State

Loading State

No API/backend required.

============================================================
141. RECOMMENDED FRONTEND FILES
============================================================

analytics-dashboard.html

reports.html

report-view.html

report-print.html

Do NOT create one HTML page for every individual report.

Use ONE reusable report-view.html structure.

Report type and demo data can change through frontend
JavaScript.

============================================================
142. REUSABLE REPORT COMPONENTS
============================================================

Global Analytics Filter

Date Range Picker

Branch Selector

Comparison Selector

KPI Card

Comparison Badge

Trend Chart

Attention Card

Report Search

Report Category Card

Favorite Report Card

Saved View Card

Filter Drawer

Applied Filter Chip

Report Table

Column Manager

Grouping Selector

Totals Footer

Drill-Down Drawer

Source Link

Export Modal

Print Header

Empty State

Loading Skeleton

Error State

============================================================
143. FEATURE → LOCATION MAP
============================================================

Management KPIs
→ Analytics Dashboard

Trends
→ Analytics Dashboard

Attention / Exceptions
→ Analytics Dashboard

Workshop Reports
→ Reports / Workshop

Customer Reports
→ Reports / Customer

Vehicle Reports
→ Reports / Vehicle

CRM Reports
→ Reports / CRM

Inventory Reports
→ Reports / Inventory

Purchase Reports
→ Reports / Purchase

Vehicle Sales Reports
→ Reports / Vehicle Sales

Insurance Reports
→ Reports / Insurance

Warranty Reports
→ Reports / Warranty

Finance Reports
→ Reports / Finance

HR Reports
→ Reports / HR

Branch Reports
→ Reports / Management

Audit Reports
→ Reports / Audit

============================================================
144. NO DUPLICATION RULE
============================================================

Reports & Analytics must NOT create separate copies of:

Customer

Vehicle

Job Card

Invoice

Payment

Inventory

Purchase

Vendor

Lead

Booking

Insurance Claim

Employee

Attendance

Reports only consume source module data.

============================================================
145. REPORTS ACCEPTANCE CHECKLIST
============================================================

Before Reports & Analytics is considered complete:

[ ] Analytics Dashboard

[ ] Date Filters

[ ] Branch Filter

[ ] Period Comparison

[ ] Business KPIs

[ ] Workshop KPIs

[ ] Customer KPIs

[ ] Inventory KPIs

[ ] Sales KPIs

[ ] Finance KPIs

[ ] Workforce KPIs

[ ] Management Attention

[ ] KPI Comparison

[ ] KPI Drill-Down

[ ] Trend Charts

[ ] Reports Workspace

[ ] Report Search

[ ] Report Categories

[ ] Favorite Reports

[ ] Recent Reports

[ ] Saved Views UI

[ ] Common Filters

[ ] Applied Filters

[ ] Column Settings

[ ] Grouping

[ ] Sorting

[ ] Totals

[ ] Subtotals

[ ] Drill-Down

[ ] Source Traceability

[ ] Workshop Reports

[ ] Job Card Reports

[ ] Delayed Jobs

[ ] Technician Performance

[ ] Bay Utilization

[ ] Customer Reports

[ ] Vehicle Reports

[ ] CRM Reports

[ ] Inventory Reports

[ ] Stock Ledger

[ ] Stock Health

[ ] Purchase Reports

[ ] Vendor Performance

[ ] Vehicle Sales Reports

[ ] Vehicle Margin Permission

[ ] Insurance Reports

[ ] Warranty / AMC Reports

[ ] Finance Reports

[ ] Receivable Ageing

[ ] Payable Ageing

[ ] Expense Reports

[ ] Daily Closing Report

[ ] Cash Flow

[ ] P&L Presentation

[ ] HR Reports

[ ] Attendance Reports

[ ] Management Reports

[ ] Branch Comparison

[ ] Period Comparison

[ ] Target vs Actual UI

[ ] Exception Reports

[ ] Discount Analysis

[ ] Cancellation Analysis

[ ] Audit Reports

[ ] Activity Reports

[ ] Permission-Sensitive Columns

[ ] Print View

[ ] Export UI

[ ] Empty State

[ ] Loading State

[ ] Error State

[ ] No backend/API generated

============================================================
146. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create one sidebar item for every report.
- Create one HTML file for every report.
- Duplicate operational data for reporting.
- Create manually maintained technician performance data.
- Create manually maintained customer revenue data.
- Create manually maintained inventory totals.
- Create manually maintained finance totals.
- Show KPI numbers without source context.
- Create dead-end analytics with no drill-down.
- Mix branch data without showing branch context.
- Expose cost/margin/profit to unauthorized roles.
- Expose salary information through HR reports without
  permission preparation.
- Use charts purely for decoration.
- Display misleading percentages without source values.
- Rank employees using incomplete data.
- Hide report filters after results load.
- Lose applied-filter context during drill-down.
- Generate backend analytics engines.
- Generate APIs.
- Generate database queries.
- Generate mobile app screens.

============================================================
147. FINAL ANALYTICS EXPERIENCE
============================================================

When management opens Analytics they should immediately
understand:

HOW IS THE BUSINESS PERFORMING?

HOW MUCH REVENUE ARE WE GENERATING?

HOW DOES THIS COMPARE TO THE PREVIOUS PERIOD?

WHICH BRANCH IS PERFORMING BETTER?

HOW MANY VEHICLES ARE BEING SERVICED?

HOW MANY JOBS ARE DELAYED?

ARE JOBS BEING DELIVERED ON TIME?

HOW PRODUCTIVE ARE TECHNICIANS?

HOW WELL ARE BAYS BEING UTILIZED?

WHICH SERVICES GENERATE THE MOST BUSINESS?

WHICH PARTS ARE MOVING?

WHICH STOCK IS SLOW OR DEAD?

WHICH PURCHASES ARE DELAYED?

HOW ARE VENDORS PERFORMING?

HOW MANY LEADS ARE CONVERTING?

HOW ARE VEHICLE SALES PERFORMING?

HOW MUCH MONEY DO CUSTOMERS OWE?

HOW MUCH DO WE OWE VENDORS?

WHAT ARE OUR EXPENSES?

WHAT IS THE COLLECTION TREND?

WHICH INSURANCE CLAIMS ARE OUTSTANDING?

WHAT MANAGEMENT EXCEPTIONS REQUIRE ATTENTION?

AND:

WHERE DID EACH NUMBER COME FROM?

============================================================
148. FINAL PRINCIPLE
============================================================

REPORTS & ANALYTICS SHOULD NOT FEEL LIKE:

100+
DISCONNECTED
STATIC
TABLE PAGES.

IT SHOULD FEEL LIKE:

BUSINESS DATA
        ↓
CENTRAL ANALYTICS
        ↓
KPI
        ↓
TREND
        ↓
COMPARISON
        ↓
EXCEPTION
        ↓
REPORT
        ↓
FILTER
        ↓
DRILL-DOWN
        ↓
SOURCE TRANSACTION
        ↓
BUSINESS DECISION

ONE CENTRAL REPORTING SYSTEM.

ALL MODULES CONNECTED.

BRANCH-AWARE.

DATE-AWARE.

ROLE-AWARE.

PERMISSION-AWARE.

SOURCE-TRACEABLE.

REUSABLE REPORT UI.

MINIMUM NAVIGATION.

NO DUPLICATE DATA.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/11_REPORTS_ANALYTICS.md
============================================================