# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/02_CRM.md
# CRM — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

CRM manages the complete customer relationship lifecycle from:

Lead
        ↓
Follow-Up
        ↓
Appointment / Requirement
        ↓
Conversion
        ↓
Customer
        ↓
Vehicle
        ↓
Workshop / Vehicle Sale / Other Business
        ↓
Ongoing Relationship

PRIMARY GOAL:

The user should manage the complete Lead or Customer context
from ONE place without navigating between multiple unrelated
menus.

============================================================
2. PRIMARY CRM NAVIGATION
============================================================

CRM

    Dashboard

    Leads

    Customers

Do NOT create permanent CRM sidebar menus for:

Calls

SMS

WhatsApp

Email

Follow-Ups

Appointments

Notes

Tasks

Reminders

Documents

Communication History

These belong inside Lead / Customer context.

============================================================
3. CRM MAIN PROCESS
============================================================

Lead Received
        ↓
Lead Registration
        ↓
Requirement
        ↓
Assign Executive
        ↓
Contact / Follow-Up
        ↓
Appointment / Next Action
        ↓
Quotation / Estimate if applicable
        ↓
Negotiation / Discussion
        ↓
Follow-Up
        ↓
Won / Lost / Hold
        ↓
Customer Conversion
        ↓
Customer + Vehicle
        ↓
Workshop / Vehicle Sale / Relevant Module
        ↓
Relationship History

============================================================
4. PRIMARY BUSINESS OBJECTS
============================================================

CRM contains two major business objects:

1. LEAD

2. CUSTOMER

Lead:

Potential customer / opportunity.

Customer:

Confirmed business customer with ongoing relationship.

Vehicle is a SHARED entity connected to Customer.

============================================================
5. CRM DASHBOARD
============================================================

Use:

T01 Dashboard

CRM Dashboard should provide:

New Leads

Open Leads

Follow-Ups Due Today

Overdue Follow-Ups

Appointments Today

Hot Leads

Won Leads

Lost Leads

Conversion Rate

Lead Source Summary

Executive Performance

Recent Communications

Upcoming Follow-Ups

============================================================
6. CRM DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ New Lead

+ New Customer

+ Schedule Follow-Up

+ Appointment

Search Customer

More ▼

Do NOT place full Lead/Customer forms on Dashboard.

============================================================
7. LEAD LIST
============================================================

Use:

T02 List Page

Page:

CRM / Leads

Primary Action:

+ Add Lead

============================================================
8. LEAD LIST SUMMARY
============================================================

Compact status filters:

All

New

Assigned

Contacted

Follow-Up

Hot

Quotation Sent

Won

Lost

On Hold

Overdue

These should behave as quick filters.

============================================================
9. LEAD LIST FILTERS
============================================================

Search:

Lead Name

Mobile

Vehicle Number

Requirement

Lead Number

Filters:

Status

Lead Source

Assigned Executive

Priority

Follow-Up Date

Created Date

Branch

Requirement Type

Lead Temperature

============================================================
10. LEAD LIST TABLE
============================================================

Recommended columns:

Lead ID

Customer / Lead Name

Mobile

Requirement

Vehicle

Source

Assigned To

Next Follow-Up

Priority

Status

Last Activity

Actions

Primary action:

Open

Secondary:

More ▼

============================================================
11. LEAD WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Opening a Lead should NOT navigate users to separate pages for
every CRM activity.

Workspace contains complete Lead process.

============================================================
12. LEAD WORKSPACE HEADER
============================================================

Example:

LEAD #LD-2026-00148

[ HOT ] [ FOLLOW-UP DUE ]

Rajesh Sharma

+91 98765 43210

Requirement:
Periodic Service

Vehicle:
MH 12 AB 4582

Assigned:
Neha Patil

Branch:
Pune Main Branch

Next Follow-Up:
28 Jul 2026, 02:30 PM

Right Actions:

[ Add Follow-Up ]

[ More ▼ ]

============================================================
13. LEAD WORKSPACE SUMMARY
============================================================

Compact information:

Lead Source

Lead Age

Priority

Current Stage

Last Contact

Next Follow-Up

Assigned Executive

Expected Value where applicable

============================================================
14. LEAD WORKSPACE NAVIGATION
============================================================

Recommended:

Overview

Requirement

Follow-Up

Appointment

Quotation

Communication

Documents

Timeline

Do NOT create separate global pages for these.

============================================================
15. LEAD OVERVIEW
============================================================

Contains:

Lead Information

Contact Information

Vehicle Information

Requirement Summary

Current Status

Assigned Executive

Priority

Lead Source

Next Action

Recent Activity

Notes

Related Records

============================================================
16. LEAD BASIC INFORMATION
============================================================

Fields may include:

Lead Number

Lead Name

Mobile

Alternate Mobile

Email

Customer Type

Individual / Business

Company Name where applicable

Branch

Lead Source

Priority

Lead Temperature

Assigned Executive

Created Date

============================================================
17. LEAD SOURCE
============================================================

Possible sources:

Walk-In

Phone

Website

WhatsApp

Referral

Existing Customer

Campaign

Social Media

Google

Dealer

Insurance

Other

Lead Source should use shared/master configuration where
appropriate.

============================================================
18. LEAD TEMPERATURE
============================================================

Possible:

Hot

Warm

Cold

Use textual badge + semantic visual treatment.

Do NOT communicate temperature only through color.

============================================================
19. REQUIREMENT
============================================================

Lead Requirement should define WHY the customer contacted the
garage.

Possible requirement types:

Workshop Service

Repair

Accidental Repair

Vehicle Purchase

Spare / Accessory

Insurance

AMC

Membership

Other

Fields:

Requirement Type

Description

Vehicle

Preferred Date

Expected Budget where applicable

Special Requirement

Notes

============================================================
20. VEHICLE INFORMATION
============================================================

Lead may:

Select Existing Vehicle

OR

Add Vehicle Information

Possible fields:

Registration Number

Manufacturer

Model

Variant

Fuel Type

Year

Odometer where applicable

VIN where available

Do NOT force complete vehicle registration for an early lead
when information is not available.

============================================================
21. VEHICLE SEARCH
============================================================

Search by:

Registration Number

Customer

Mobile

VIN

If existing vehicle found:

Show vehicle summary.

Allow:

Select Vehicle

Open Quick View

Do NOT duplicate vehicle unnecessarily.

============================================================
22. FOLLOW-UP — CORE CRM FUNCTION
============================================================

Follow-Up belongs inside Lead Workspace.

Follow-Up should support:

Follow-Up Date

Follow-Up Time

Follow-Up Type

Purpose

Outcome

Notes

Next Follow-Up

Reminder

Assigned User

Status

============================================================
23. FOLLOW-UP TYPES
============================================================

Possible:

Call

WhatsApp

SMS

Email

Meeting

Visit

Appointment

Other

Follow-Up Type describes the interaction.

Do NOT create independent databases for every communication
channel.

============================================================
24. ADD FOLLOW-UP
============================================================

Use:

C01 Drawer

Example:

ADD FOLLOW-UP

Lead:
LD-2026-00148

Customer:
Rajesh Sharma

Type *

Call

Date *

Time *

Outcome

Notes

Next Follow-Up Date

Next Follow-Up Time

Reminder

Assigned To

                Cancel     Save Follow-Up

============================================================
25. FOLLOW-UP OUTCOME
============================================================

Possible:

Interested

Need More Information

Call Back Later

Appointment Scheduled

Quotation Requested

Quotation Sent

Negotiating

Not Interested

No Response

Wrong Number

Converted

Other

Outcome may influence suggested next action.

============================================================
26. NEXT FOLLOW-UP
============================================================

After saving follow-up:

If further action required:

Set:

Next Follow-Up Date

Time

Purpose

Reminder

This becomes visible in:

Lead Header

CRM Dashboard

Notifications / Reminders

Lead List

============================================================
27. FOLLOW-UP HISTORY
============================================================

Display inside Lead Workspace.

Recommended:

Date / Time

Type

Outcome

Notes

Performed By

Next Action

Example:

28 Jul 2026 • 11:15 AM

Call

Customer interested in periodic service.

Requested appointment for Saturday.

By Neha Patil

Next:
30 Jul 2026 • 10:00 AM

============================================================
28. OVERDUE FOLLOW-UP
============================================================

When follow-up due date/time passes:

Display:

OVERDUE

Show on:

CRM Dashboard

Lead List

Lead Workspace

Notifications where appropriate

Provide:

Add Follow-Up

Reschedule

============================================================
29. APPOINTMENT
============================================================

Appointment should remain connected to Lead / Customer.

Possible appointment types:

Workshop Visit

Vehicle Inspection

Test Drive

Sales Meeting

Insurance Inspection

Other

============================================================
30. APPOINTMENT INFORMATION
============================================================

Fields:

Appointment Number

Customer / Lead

Vehicle

Appointment Type

Date

Time

Branch

Service Advisor / Executive

Requirement

Notes

Reminder

Status

============================================================
31. APPOINTMENT STATUS
============================================================

Possible:

Scheduled

Confirmed

Arrived

Checked-In

Completed

Cancelled

No Show

Rescheduled

============================================================
32. APPOINTMENT CREATION
============================================================

From Lead Workspace:

Appointment
        ↓
Schedule Appointment
        ↓
Select Date / Time
        ↓
Branch
        ↓
Advisor / Executive
        ↓
Requirement
        ↓
Confirm
        ↓
Appointment Created

Lead context should automatically carry forward.

Do NOT ask user to re-enter known customer/vehicle data.

============================================================
33. WORKSHOP APPOINTMENT CONNECTION
============================================================

For Workshop Service:

Lead / Customer
        ↓
Appointment
        ↓
Vehicle Arrives
        ↓
Check-In
        ↓
Job Card

When creating Job Card from Appointment:

Carry forward:

Customer

Vehicle

Complaint / Requirement

Appointment

Advisor

Branch

Notes

Do NOT duplicate entry.

============================================================
34. QUOTATION / ESTIMATE
============================================================

Lead may require:

Service Estimate

Vehicle Quotation

Product Quotation

Depending on requirement.

CRM should show the related quotation/estimate.

Actual detailed business document may belong to:

Workshop

Vehicle Sales

Counter Sale

or relevant module.

CRM should LINK rather than duplicate the complete transaction.

============================================================
35. QUOTATION SECTION
============================================================

Display:

Document Number

Type

Date

Amount

Status

Valid Until

Related Module

Actions:

Preview

Send

Open

Example:

EST-2026-000458

Workshop Estimate

₹18,750

Sent

Valid until 31 Jul 2026

============================================================
36. COMMUNICATION
============================================================

Communication should be available inside Lead Workspace.

Supported UI channels where configured:

Call

SMS

WhatsApp

Email

============================================================
37. COMMUNICATION QUICK ACTIONS
============================================================

Lead Header / Communication section may show:

Call

WhatsApp

SMS

Email

Click action:

Open appropriate contextual UI.

No actual third-party integration required during frontend
phase.

============================================================
38. WHATSAPP UI
============================================================

Use contextual Drawer / Modal.

Show:

Customer

Mobile

Template

Message Preview

Related Record

Attachment where applicable

Send button

Frontend demo only.

============================================================
39. SMS UI
============================================================

Show:

Mobile

Template

Message

Character count where useful

Send

Frontend demo only.

============================================================
40. EMAIL UI
============================================================

Show:

To

CC where applicable

Subject

Message

Attachment

Send

Frontend demo only.

============================================================
41. CALL LOG
============================================================

After call user may log:

Call Type

Incoming / Outgoing

Date

Time

Duration

Outcome

Notes

Next Follow-Up

No telephony backend required.

============================================================
42. COMMUNICATION HISTORY
============================================================

Unified history.

Do NOT separate histories by multiple pages.

Example:

WhatsApp

Estimate sent

28 Jul 2026 • 12:10 PM

By Neha Patil

----------------

Call

Interested — requested callback

28 Jul 2026 • 11:15 AM

By Neha Patil

============================================================
43. LEAD NOTES
============================================================

Lead should support contextual notes.

Fields:

Note

Type where required

Attachment

Created By

Created At

Possible quick action:

+ Add Note

============================================================
44. LEAD DOCUMENTS
============================================================

Documents may include:

Customer Documents

Vehicle Documents

Quotation

Estimate

Photos

Attachments

Other Lead Documents

Use:

C05 Document / Media Panel

============================================================
45. LEAD STATUS
============================================================

Recommended lifecycle statuses:

New

Assigned

Contacted

Follow-Up

Appointment Scheduled

Quotation Sent

Negotiation

Won

Lost

On Hold

Exact statuses may be adjusted by requirement.

============================================================
46. STATUS CHANGE
============================================================

Use contextual action.

Example:

Change Status

Current:
Follow-Up

New Status:
Quotation Sent

Remarks

Next Action

Do NOT require navigating to another page.

============================================================
47. WON LEAD
============================================================

When Lead becomes Won:

Determine business outcome.

Possible:

Workshop Customer

Vehicle Sale Customer

Insurance Customer

Counter Sale Customer

Other

Then:

Lead
        ↓
Convert / Link Customer
        ↓
Link Vehicle
        ↓
Open Relevant Business Process

============================================================
48. LEAD CONVERSION
============================================================

Before creating a new Customer:

Search existing customers by:

Mobile

Email

Name

Vehicle Number

If match found:

LINK EXISTING CUSTOMER

Do NOT create duplicate Customer.

============================================================
49. NEW CUSTOMER CONVERSION
============================================================

When no existing Customer exists:

Lead Information
        ↓
Create Customer
        ↓
Carry Forward Contact Data
        ↓
Carry Forward Vehicle Data
        ↓
Carry Forward Requirement
        ↓
Link Lead
        ↓
Mark Converted

User should not re-enter the same data.

============================================================
50. LOST LEAD
============================================================

When status becomes Lost:

Require:

Lost Reason

Remarks

Optional Competitor

Possible reasons:

Price

No Response

Not Interested

Purchased Elsewhere

Service Elsewhere

Requirement Cancelled

Duplicate

Invalid Lead

Other

============================================================
51. LOST LEAD REOPEN
============================================================

Where permitted:

Lost Lead
        ↓
Reopen

Record:

Reopened By

Date

Reason

New Assigned Executive

Next Follow-Up

Maintain previous history.

============================================================
52. ON HOLD
============================================================

On Hold should support:

Hold Reason

Hold Until

Reminder

Remarks

After hold date:

Surface as follow-up / reminder.

============================================================
53. LEAD TIMELINE
============================================================

Timeline should show complete chronological business history.

Examples:

Lead Created

Executive Assigned

Call Logged

Follow-Up Scheduled

WhatsApp Sent

Appointment Created

Quotation Sent

Status Changed

Customer Converted

Job Card Created

Vehicle Sale Created

============================================================
54. LEAD ACTIVITY VS TIMELINE
============================================================

Follow-Up:

CRM interaction records.

Communication:

Messages/calls.

Timeline:

Unified chronological business history.

Do NOT duplicate identical full content in all three.

============================================================
55. CUSTOMER LIST
============================================================

Use:

T02 List Page

Page:

CRM / Customers

Primary Action:

+ Add Customer

============================================================
56. CUSTOMER LIST SUMMARY
============================================================

Possible quick views:

All Customers

Active

New This Month

Outstanding

Service Due

Membership

AMC

Inactive

Do NOT overload list with excessive summary cards.

============================================================
57. CUSTOMER LIST FILTERS
============================================================

Search:

Name

Mobile

Email

Customer Code

Vehicle Number

Filters:

Customer Type

Branch

Status

Created Date

Outstanding

Membership

AMC

Service Due

============================================================
58. CUSTOMER LIST TABLE
============================================================

Recommended columns:

Customer Code

Customer

Mobile

Vehicles

Last Visit

Total Business

Outstanding

Program Status

Branch

Status

Actions

Primary:

Open

More ▼

============================================================
59. CUSTOMER 360 WORKSPACE
============================================================

Customer should provide ONE consolidated relationship view.

Use:

T03 / T04 hybrid workspace pattern.

Purpose:

The user should not search different modules just to understand
a customer.

============================================================
60. CUSTOMER HEADER
============================================================

Example:

CUSTOMER #CUS-2026-00458

Rajesh Sharma

+91 98765 43210

[ ACTIVE ]

3 Vehicles

Pune Main Branch

Customer Since:
12 Mar 2024

Outstanding:
₹13,750

Actions:

[ New Job Card ]

[ More ▼ ]

============================================================
61. CUSTOMER QUICK ACTIONS
============================================================

Possible:

New Job Card

Appointment

Add Vehicle

Receive Payment

New Lead / Opportunity

Vehicle Sale

Counter Sale

Call

WhatsApp

Email

More ▼

Show only the most useful actions directly.

============================================================
62. CUSTOMER WORKSPACE NAVIGATION
============================================================

Recommended:

Overview

Vehicles

Workshop

Sales

Invoices & Payments

Programs

Insurance

Communication

Documents

Timeline

Do NOT create duplicate transactional systems here.

Use summaries + links to source records.

============================================================
63. CUSTOMER OVERVIEW
============================================================

Display:

Basic Information

Contact

Address

GST / Business details where applicable

Vehicles

Current Outstanding

Last Service

Next Service Due

Active Membership

Active AMC

Insurance Expiry

Recent Transactions

Recent Communication

============================================================
64. CUSTOMER BASIC INFORMATION
============================================================

Fields may include:

Customer Code

Customer Type

Individual / Business

Name

Company Name

Mobile

Alternate Mobile

Email

GST Number

PAN where required

Branch

Source

Status

Customer Since

Tags

Remarks

============================================================
65. CUSTOMER ADDRESS
============================================================

Support where applicable:

Billing Address

Communication Address

Pickup Address

Multiple Address preparation where required

Fields:

Address

Area

City

State

PIN Code

Country

============================================================
66. CUSTOMER VEHICLES
============================================================

Vehicles tab shows all vehicles owned/linked.

Vehicle card/row:

Registration Number

Manufacturer

Model

Variant

Year

Odometer

Last Service

Next Service

Insurance Expiry

Status

Actions:

Open Vehicle

Service History

New Job Card

============================================================
67. ADD VEHICLE
============================================================

From Customer Workspace:

+ Add Vehicle

Use Drawer / Form depending complexity.

Fields may include:

Registration Number

Manufacturer

Model

Variant

Fuel

Transmission

Year

Color

VIN / Chassis

Engine Number

Odometer

Insurance

Notes

============================================================
68. DUPLICATE VEHICLE CHECK
============================================================

Before adding vehicle:

Search:

Registration Number

VIN / Chassis

If vehicle exists:

Show warning.

Allow linking existing vehicle where business rules permit.

Do NOT blindly duplicate.

============================================================
69. CUSTOMER WORKSHOP HISTORY
============================================================

Show:

Job Card

Vehicle

Date

Service Type

Amount

Status

Advisor

Actions:

Open Job Card

Invoice

Documents

============================================================
70. CUSTOMER SERVICE HISTORY
============================================================

Customer → Vehicle → Service History should include:

Previous Job Cards

Complaints

Inspection

Repairs

Labour

Spares

Lubes

Outside Jobs

Recommendations

Invoices

Payments

Warranty

Documents

============================================================
71. CUSTOMER SALES HISTORY
============================================================

Show related:

Vehicle Purchases

Counter Sales

Other approved sales transactions

Each record should link to source workspace.

============================================================
72. CUSTOMER INVOICES & PAYMENTS
============================================================

Display consolidated financial relationship.

Summary:

Total Invoiced

Total Paid

Outstanding

Advance / Credit

Wallet Balance where applicable

Table:

Invoice

Source

Date

Amount

Paid

Balance

Status

============================================================
73. RECEIVE PAYMENT
============================================================

From Customer Workspace:

Receive Payment

Open contextual payment UI.

Allow selecting:

Outstanding Invoice / Source

Amount

Payment Type

Payment Mode

Reference

Notes

Actual finance rules defined in Finance module.

============================================================
74. CUSTOMER PROGRAMS
============================================================

Programs section may show:

Membership

Loyalty

AMC

Wallet

Example:

MEMBERSHIP

Gold

Valid Until:
31 Dec 2026

AMC

Premium Service AMC

3 / 5 Services Used

LOYALTY

1,240 Points

WALLET

₹2,500

Actions open relevant Customer Programs record.

============================================================
75. CUSTOMER INSURANCE
============================================================

Show:

Vehicle

Insurance Company

Policy Number

Type

Expiry

Renewal Status

Open Claims

Actions:

Open Policy

New Claim where appropriate

============================================================
76. CUSTOMER COMMUNICATION
============================================================

Unified communication history:

Calls

SMS

WhatsApp

Email

Reminders

Follow-Ups

Show:

Channel

Subject / Summary

User

Date

Status

Related Record

============================================================
77. CUSTOMER DOCUMENTS
============================================================

Possible:

Identity Documents

GST Documents

Vehicle Documents

Insurance Documents

Job Documents

Invoices

Membership / AMC

Attachments

Do NOT physically duplicate source-generated documents.

Link/display them contextually.

============================================================
78. CUSTOMER TIMELINE
============================================================

Unified timeline examples:

Customer Created

Vehicle Added

Appointment Scheduled

Job Card Created

Estimate Approved

Invoice Generated

Payment Received

Vehicle Delivered

Insurance Renewed

Membership Purchased

AMC Used

Feedback Received

============================================================
79. CUSTOMER STATUS
============================================================

Possible:

Active

Inactive

Blocked

Archived

Do NOT delete customer casually when transactions exist.

Soft Delete / Archive rules should be prepared.

============================================================
80. CUSTOMER TAGS
============================================================

Optional tags:

VIP

Fleet

Corporate

Frequent Customer

Insurance Customer

AMC Customer

High Value

Other configurable tags

Tags should aid filtering, not replace actual structured data.

============================================================
81. BUSINESS / CORPORATE CUSTOMER
============================================================

When Customer Type = Business:

Support:

Company Name

GST Number

Billing Contact

Multiple Vehicles

Authorized Contacts

Billing Address

Credit Terms where applicable

Outstanding

Documents

============================================================
82. FLEET CUSTOMER PREPARATION
============================================================

Corporate customers may have many vehicles.

Customer Workspace should remain usable with:

Vehicle Search

Vehicle Filter

Status

Last Service

Next Service

Do NOT render hundreds of vehicle cards simultaneously.

Use table/list when vehicle count is large.

============================================================
83. CUSTOMER CREDIT INFORMATION
============================================================

Where business allows credit:

Display:

Credit Allowed

Credit Limit

Credit Used

Available Credit

Payment Terms

Outstanding

Overdue

Finance module owns accounting rules.

CRM displays relevant summary.

============================================================
84. CUSTOMER DUPLICATE DETECTION
============================================================

Customer creation should check frontend demo against:

Mobile

Email

GST Number

Vehicle Registration

Show possible duplicate:

Possible Existing Customer Found

Rajesh Sharma

+91 98765 43210

2 Vehicles

Actions:

Open Customer

Use Existing

Continue New where permitted

============================================================
85. ADD CUSTOMER FORM
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Contact

Address

Business / GST

Preferences

Additional Information

Documents

Keep optional fields controlled.

============================================================
86. QUICK CUSTOMER CREATION
============================================================

From Job Card / Counter Sale / Lead:

Use simplified Drawer.

Minimum useful fields:

Name *

Mobile *

Customer Type

Email

Branch

Optional Vehicle

After save:

Return user to original business process.

============================================================
87. FULL CUSTOMER CREATION
============================================================

Full CRM form can contain complete customer information.

Quick Create and Full Create must use the SAME Customer entity.

Do NOT create separate "Workshop Customer".

============================================================
88. CUSTOMER EDIT
============================================================

Allow editing appropriate information.

Maintain UI preparation for future audit history.

Critical identifiers may show change confirmation where
appropriate.

============================================================
89. CUSTOMER MERGE PREPARATION
============================================================

CRM architecture should prepare for future duplicate merge.

Possible UI:

Customer A

Customer B

Compare

Choose Primary

Merge Related Vehicles

Merge Communication

Merge Documents

Merge Transactions via backend rules later

Do NOT implement actual destructive merge logic during frontend
phase.

============================================================
90. CRM REMINDERS
============================================================

CRM should surface:

Follow-Up Due

Appointment

Service Reminder

Payment Follow-Up

Insurance Renewal

Membership Renewal

AMC Renewal

Other customer reminders

Reminders belong to related customer/vehicle/business context.

============================================================
91. CRM TASKS
============================================================

Where task management is required, keep tasks contextual.

Example:

Call customer for estimate approval.

Lead:
LD-2026-00148

Due:
Today 02:30 PM

Assigned:
Neha Patil

Do NOT build a large project-management system inside CRM.

============================================================
92. ASSIGNMENT
============================================================

Lead assignment should support:

Executive

Branch

Priority

Assignment Notes

Use Drawer.

History should retain:

Previous Assignee

New Assignee

Changed By

Date

Reason where applicable

============================================================
93. BULK LEAD ACTIONS
============================================================

Lead List may support:

Assign Executive

Change Status

Add Tag

Export

Send Communication where appropriate

Delete / Archive where permitted

Do NOT allow dangerous bulk actions without confirmation.

============================================================
94. IMPORT LEADS
============================================================

Lead List may provide:

Import Leads

Flow:

Upload File
        ↓
Map Columns
        ↓
Validate
        ↓
Duplicate Check
        ↓
Preview
        ↓
Import Result

Frontend UI preparation only.

============================================================
95. IMPORT CUSTOMERS
============================================================

Customer List may similarly support import.

Important duplicate identifiers:

Mobile

Email

GST

Vehicle Number

Actual import engine is out of current scope.

============================================================
96. EXPORT
============================================================

Lead / Customer lists may support:

Excel

CSV

PDF where useful

Selected Records

Current Filter

All Records where permission allows later

============================================================
97. CRM DOCUMENT GENERATION
============================================================

CRM itself should not generate unnecessary duplicate documents.

It may link/generate approved documents such as:

Customer Summary

Lead Summary

Appointment Slip

Communication Print where required

Transactional documents remain in source modules.

============================================================
98. CRM REPORTS
============================================================

CRM Report Center may include:

Lead Summary

Lead Source

Lead Status

Lead Conversion

Executive Performance

Follow-Up Report

Overdue Follow-Up

Appointment Report

Lost Lead Analysis

Customer Growth

Customer Retention

Inactive Customers

Customer Outstanding Summary

Detailed report implementation belongs to Reports module.

============================================================
99. CRM DASHBOARD DRILL-DOWN
============================================================

New Leads
→ Leads / New

Follow-Ups Today
→ Leads / Follow-Up Due Today

Overdue
→ Leads / Overdue

Appointments
→ Appointment operational view

Hot Leads
→ Leads / Hot

Won
→ Leads / Won

Lost
→ Leads / Lost

============================================================
100. CRM + WORKSHOP INTEGRATION
============================================================

Typical flow:

Lead
        ↓
Customer
        ↓
Vehicle
        ↓
Appointment
        ↓
Job Card

After Job Card creation:

CRM should display related Job Card.

Workshop owns service execution.

CRM owns customer relationship context.

============================================================
101. CRM + VEHICLE SALES INTEGRATION
============================================================

Vehicle Sales Lead:

Lead
        ↓
Requirement
        ↓
Vehicle Interest
        ↓
Follow-Up
        ↓
Quotation
        ↓
Won
        ↓
Customer
        ↓
Vehicle Sale Workspace

CRM should not duplicate full Vehicle Sale process.

============================================================
102. CRM + INSURANCE INTEGRATION
============================================================

Insurance enquiry:

Lead / Customer
        ↓
Vehicle
        ↓
Insurance Requirement
        ↓
Policy / Renewal / Claim

CRM retains communication history.

Insurance module owns policy/claim process.

============================================================
103. CRM + FINANCE INTEGRATION
============================================================

Customer 360 may display:

Outstanding

Advance

Wallet

Recent Payments

Credit Information

Finance module remains source of accounting truth.

============================================================
104. CRM + CUSTOMER PROGRAMS
============================================================

Customer Workspace should display:

Membership

Loyalty

AMC

Wallet

Program details remain managed in Customer Programs.

============================================================
105. BRANCH AWARENESS
============================================================

Lead:

Branch

Customer:

Primary / related branch where applicable

Appointment:

Specific Branch

Job Card:

Specific Branch

CRM Dashboard:

Selected Branch / All Branches

Do NOT lose branch context during conversion.

============================================================
106. MULTI-BRANCH CUSTOMER
============================================================

Customer is generally shared across the organization.

Example:

Rajesh Sharma may visit:

Pune Branch

Mumbai Branch

Do NOT automatically create separate customer records per
branch.

Customer history should identify transaction branch.

============================================================
107. STATUS + ACTION LOGIC
============================================================

NEW:

Assign
Contact
Edit

FOLLOW-UP:

Add Follow-Up
Communicate
Schedule Appointment

QUOTATION:

Open Quotation
Send
Follow-Up

WON:

Convert / Open Customer
Open Related Business

LOST:

View
Reopen where permitted

Do NOT show every action for every status.

============================================================
108. LEAD QUICK ACTIONS
============================================================

Recommended:

Add Follow-Up

Call

WhatsApp

Appointment

More ▼

More may contain:

SMS

Email

Add Note

Change Status

Assign

Document

Convert

Mark Lost

============================================================
109. CUSTOMER QUICK ACTIONS
============================================================

Recommended:

New Job Card

Appointment

Receive Payment

WhatsApp

More ▼

More:

Add Vehicle

Call

Email

Counter Sale

Vehicle Sale

Insurance

Membership

AMC

Document

============================================================
110. CRM NOTIFICATIONS
============================================================

Possible:

New Lead Assigned

Follow-Up Due

Follow-Up Overdue

Appointment Today

Appointment Rescheduled

Quotation Follow-Up

Customer Reply

Lead Converted

Service Reminder

No actual notification backend required.

============================================================
111. FRONTEND DEMO INTERACTIONS
============================================================

Claude should demonstrate:

Lead Search

Lead Filters

Status Quick Filters

Open Lead

Add Follow-Up Drawer

Schedule Appointment

Call Log

WhatsApp Modal/Drawer

Email Modal

Status Change

Assign Executive

Lead Conversion

Duplicate Customer Warning

Customer Search

Customer Quick View

Customer 360 Tabs

Add Vehicle

Receive Payment UI

Timeline

Documents

Branch Filter

No backend/API required.

============================================================
112. DEMO DATA
============================================================

Use realistic data.

Example:

Lead:
LD-2026-00148

Customer:
Rajesh Sharma

Mobile:
+91 98765 43210

Vehicle:
Maruti Suzuki Swift VXI

Registration:
MH 12 AB 4582

Executive:
Neha Patil

Advisor:
Amit Patil

Branch:
Pune Main Branch

Requirement:
Periodic Service

============================================================
113. RECOMMENDED FRONTEND FILES
============================================================

crm-dashboard.html

leads.html

lead-workspace.html

customers.html

customer-workspace.html

customer-form.html

appointment-view.html

Do NOT create separate HTML files for:

call.html

whatsapp.html

follow-up.html

notes.html

These should be components inside workspaces.

============================================================
114. REUSABLE COMPONENTS
============================================================

CRM should reuse:

Global Application Shell

List Template

Workspace Header

Status Badge

Follow-Up Drawer

Communication Drawer

Appointment Drawer

Customer Quick View

Vehicle Quick View

Document Panel

Timeline

Notes

Searchable Select

Duplicate Warning

============================================================
115. FEATURE → LOCATION MAP
============================================================

Lead Management
→ CRM / Leads

Lead Follow-Up
→ Lead Workspace

Call
→ Lead/Customer Context

SMS
→ Lead/Customer Context

WhatsApp
→ Lead/Customer Context

Email
→ Lead/Customer Context

Appointment
→ Lead/Customer + Workshop Context

Quotation
→ Lead Workspace + Source Module

Customer
→ CRM / Customer 360

Vehicle
→ Customer Workspace / Shared Vehicle Entity

Service History
→ Customer / Vehicle

Outstanding
→ Customer Summary + Finance

Membership
→ Customer Summary + Customer Programs

AMC
→ Customer Summary + Customer Programs

Insurance
→ Customer Summary + Insurance

Documents
→ Relevant Record

Timeline
→ Relevant Record

============================================================
116. NO DUPLICATION RULE
============================================================

DO NOT create:

CRM Customer

Workshop Customer

Counter Sale Customer

Vehicle Sale Customer

Insurance Customer

These are the SAME Customer entity.

DO NOT create:

CRM Vehicle

Workshop Vehicle

Insurance Vehicle

These are the SAME Vehicle entity.

============================================================
117. CRM ACCEPTANCE CHECKLIST
============================================================

Before CRM is complete:

[ ] CRM Dashboard exists

[ ] Lead List exists

[ ] Lead Workspace exists

[ ] Lead Requirement exists

[ ] Assignment exists

[ ] Follow-Up works visually

[ ] Follow-Up History exists

[ ] Overdue Follow-Up exists

[ ] Appointment exists

[ ] Communication exists

[ ] Call logging exists

[ ] WhatsApp UI exists

[ ] SMS UI exists

[ ] Email UI exists

[ ] Quotation linkage exists

[ ] Status lifecycle exists

[ ] Won conversion exists

[ ] Lost reason exists

[ ] Existing customer detection exists

[ ] Customer List exists

[ ] Customer 360 exists

[ ] Vehicles exist

[ ] Service History exists

[ ] Invoices/Payments summary exists

[ ] Programs summary exists

[ ] Insurance summary exists

[ ] Documents exist

[ ] Timeline exists

[ ] Branch context exists

[ ] No duplicate entities created

[ ] No backend/API generated

============================================================
118. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create Follow-Up as a permanent global submenu.
- Create Call as a permanent submenu.
- Create WhatsApp as a permanent submenu.
- Create SMS as a permanent submenu.
- Create Email as a permanent submenu.
- Create Notes as a permanent submenu.
- Create Documents as a permanent CRM submenu.
- Duplicate Customer.
- Duplicate Vehicle.
- Ask users to re-enter Lead data after conversion.
- Ask users to re-enter Appointment data into Job Card.
- Duplicate Workshop processes inside CRM.
- Duplicate Vehicle Sale process inside CRM.
- Duplicate Finance logic inside CRM.
- Create excessive CRM pages.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
119. FINAL CRM EXPERIENCE
============================================================

The user should be able to open ONE Lead and immediately know:

WHO IS THE CUSTOMER?

WHAT DO THEY NEED?

WHICH VEHICLE IS INVOLVED?

WHO IS HANDLING THE LEAD?

WHAT HAPPENED LAST?

WHAT IS THE NEXT FOLLOW-UP?

WHAT COMMUNICATION HAS HAPPENED?

IS THERE AN APPOINTMENT?

IS THERE A QUOTATION?

IS THE LEAD WON / LOST / PENDING?

WHAT SHOULD I DO NEXT?

After conversion, Customer 360 should answer:

WHICH VEHICLES DOES THIS CUSTOMER OWN?

WHAT SERVICES HAVE THEY TAKEN?

WHAT HAVE THEY PURCHASED?

WHAT IS OUTSTANDING?

WHAT PROGRAMS ARE ACTIVE?

WHAT INSURANCE EXISTS?

WHAT COMMUNICATION HAS HAPPENED?

============================================================
120. FINAL PRINCIPLE
============================================================

CRM SHOULD NOT FEEL LIKE:

LEADS
+
CALLS
+
FOLLOW-UPS
+
WHATSAPP
+
APPOINTMENTS
+
CUSTOMERS
+
HISTORY

AS SEPARATE SOFTWARE AREAS.

IT SHOULD FEEL LIKE:

LEAD / CUSTOMER
        ↓
ONE COMPLETE RELATIONSHIP WORKSPACE.

============================================================
END OF 05_MODULE_FLOWS/02_CRM.md
============================================================