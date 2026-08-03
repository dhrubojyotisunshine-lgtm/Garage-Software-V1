# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/07_CRM_CUSTOMER.md
# CRM & CUSTOMER — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

CRM & Customer manages the COMPLETE customer relationship
lifecycle.

The Customer 360 Workspace is the CENTRAL customer record.

The user must be able to understand and manage:

Lead / Enquiry

Customer

Contact Information

Vehicles

Follow-Ups

Appointments

Service Requirements

Vehicle Purchase Interest

Communication

Quotations

Job Cards

Vehicle Sales

Service History

Sales History

Invoices

Payments

Outstanding

Reminders

Feedback

Complaints

Documents

Timeline

from ONE connected Customer 360 Workspace.

============================================================
2. PRIMARY CRM NAVIGATION
============================================================

CRM & CUSTOMERS

    CRM Dashboard

    Leads

    Customers

Do NOT create permanent sidebar menus for:

Follow-Ups

Appointments

Reminders

Communication

Feedback

Complaints

Customer Vehicles

Customer Outstanding

Customer Documents

These should primarily exist inside Lead / Customer workspaces
and contextual views.

============================================================
3. COMPLETE CRM PROCESS
============================================================

Lead / Enquiry
        ↓
Customer Requirement
        ↓
Vehicle / Service Interest
        ↓
Assign Executive
        ↓
Follow-Up
        ↓
Appointment / Test Drive if required
        ↓
Quotation / Estimate
        ↓
Customer Decision
        ↓
Convert
        ↓
Customer
        ↓
Workshop / Vehicle Sale
        ↓
Invoice / Payment
        ↓
Delivery
        ↓
Feedback
        ↓
Next Follow-Up / Reminder
        ↓
Repeat Business
        ↓
Complete Customer History

============================================================
4. CRM BUSINESS TYPES
============================================================

CRM should support customer interest in:

Workshop Service

Repair

Periodic Service

Vehicle Purchase

Insurance

Accessories / Parts

General Enquiry

Other configured services

Do NOT build separate customer databases for each business type.

============================================================
5. CRM DASHBOARD
============================================================

Use:

T01 Dashboard

Purpose:

Show customer-facing activity requiring attention.

============================================================
6. CRM DASHBOARD KPIs
============================================================

Recommended:

New Leads

Open Leads

Follow-Ups Today

Overdue Follow-Ups

Appointments Today

Hot Leads

Quotations Pending

Service Due

Payment Follow-Up

Open Complaints

============================================================
7. CRM DASHBOARD ATTENTION
============================================================

ATTENTION REQUIRED may include:

Overdue Follow-Up

Customer Waiting for Callback

Appointment Today

Test Drive Today

Quotation Follow-Up

Estimate Approval Pending

Service Due

Insurance Expiring

Outstanding Payment

Low Feedback Rating

Open Complaint

Lost Customer Follow-Up

============================================================
8. CRM DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ New Lead

+ New Customer

Schedule Follow-Up

Book Appointment

Search Customer

Search Vehicle

More ▼

============================================================
9. LEADS
============================================================

Lead represents a potential customer / opportunity before
conversion.

Lead may originate from:

Walk-In

Phone

Website

WhatsApp

Social Media

Referral

Campaign

Existing Customer

Workshop Enquiry

Vehicle Sales Enquiry

Other

============================================================
10. LEAD LIST
============================================================

Use:

T02 List Page

Primary Action:

+ New Lead

============================================================
11. LEAD QUICK FILTERS
============================================================

All

New

Contacted

Follow-Up

Hot

Warm

Cold

Appointment

Quotation

Won

Lost

Overdue

============================================================
12. LEAD SEARCH
============================================================

Search:

Lead Number

Name

Mobile

Email

Vehicle Registration

Interested Vehicle

Service Requirement

============================================================
13. LEAD FILTERS
============================================================

Lead Status

Lead Type

Source

Assigned Executive

Priority

Branch

Created Date

Next Follow-Up

============================================================
14. LEAD LIST TABLE
============================================================

Recommended columns:

Lead

Customer / Prospect

Mobile

Requirement

Source

Executive

Last Contact

Next Follow-Up

Priority

Status

Actions

Primary:

Open

Secondary:

More ▼

============================================================
15. CREATE LEAD
============================================================

Use:

T05 Add/Edit Form

Minimum information:

Name *

Mobile *

Lead Type *

Requirement

Source

Assigned Executive

Priority

Next Follow-Up

Notes

Avoid huge lead creation form.

Collect additional information progressively.

============================================================
16. LEAD TYPES
============================================================

Possible:

Workshop

Vehicle Sales

Insurance

Parts / Accessories

General

Other

============================================================
17. LEAD PRIORITY
============================================================

Possible:

Hot

Warm

Cold

OR configured:

Normal

High

Urgent

Use ONE consistent CRM priority model in final UI.

============================================================
18. LEAD WORKSPACE
============================================================

Use:

T03 Business Workspace

Recommended navigation:

Overview

Requirement

Follow-Ups

Appointments

Quotation

Communication

Documents

Timeline

============================================================
19. LEAD HEADER
============================================================

Example:

LEAD #LD-2026-00158

[ HOT ] [ FOLLOW-UP TODAY ]

Rajesh Sharma

+91 XXXXX XXXXX

Requirement:
Periodic Service

Executive:
Neha Patil

Source:
Website

Branch:
Pune Main Branch

Next Follow-Up:
28 Jul 2026 • 03:30 PM

Actions:

[ Add Follow-Up ]

[ More ▼ ]

============================================================
20. LEAD OVERVIEW
============================================================

Show:

Contact

Requirement

Vehicle / Vehicle Interest

Source

Assigned Executive

Priority

Current Status

Last Communication

Next Follow-Up

Quotation / Estimate

Conversion Probability where later configured

Notes

============================================================
21. LEAD REQUIREMENT
============================================================

For Workshop:

Vehicle

Registration Number

Service Requirement

Complaint

Preferred Date

Pickup / Drop

Expected Budget where provided

For Vehicle Sales:

Manufacturer

Model

Variant

Color

Budget

Finance Requirement

Exchange Requirement

Expected Purchase Date

============================================================
22. EXISTING CUSTOMER DETECTION
============================================================

When mobile/email/vehicle matches existing customer:

Show:

POSSIBLE EXISTING CUSTOMER

Rajesh Sharma

Customer:
CUS-001258

Vehicles:
2

Actions:

Use Existing Customer

Open Customer

Continue as New Lead where permitted

Avoid duplicate customers.

============================================================
23. ASSIGN EXECUTIVE
============================================================

Support:

Assign Executive

Change Executive

Assignment Reason

Assignment History

Branch

============================================================
24. FOLLOW-UP
============================================================

Follow-Up remains inside Lead / Customer context.

Possible types:

Call

WhatsApp

SMS

Email

Meeting

Visit

Demo

Test Drive

Service Reminder

Payment Reminder

Other

============================================================
25. ADD FOLLOW-UP
============================================================

Use contextual Drawer.

Fields:

Follow-Up Type *

Date *

Time *

Purpose

Assigned To

Priority

Reminder

Notes

============================================================
26. FOLLOW-UP RESULT
============================================================

After follow-up capture:

Contacted / Not Contacted

Customer Response

Outcome

Next Action

Next Follow-Up

Remarks

============================================================
27. FOLLOW-UP OUTCOMES
============================================================

Possible:

Interested

Call Back

Appointment Booked

Quotation Requested

Estimate Requested

Not Interested

No Response

Wrong Number

Converted

Lost

Other

============================================================
28. FOLLOW-UP RULE
============================================================

When result requires another contact:

Current Follow-Up
        ↓
Complete
        ↓
Set Next Follow-Up
        ↓
CRM Dashboard Updated

Do NOT force user to create unrelated task records manually.

============================================================
29. OVERDUE FOLLOW-UP
============================================================

When scheduled follow-up date/time passes without completion:

Status:

OVERDUE

Show prominently on:

CRM Dashboard

Lead List

Lead Workspace

Customer Workspace where applicable

============================================================
30. APPOINTMENTS
============================================================

Appointments should remain connected to Customer / Lead.

Appointment types:

Workshop Visit

Vehicle Inspection

Test Drive

Sales Meeting

Insurance Discussion

General Meeting

============================================================
31. APPOINTMENT PROCESS
============================================================

Lead / Customer
        ↓
Select Appointment Type
        ↓
Date / Time
        ↓
Branch
        ↓
Advisor / Executive
        ↓
Vehicle where applicable
        ↓
Confirm
        ↓
Reminder
        ↓
Customer Arrives
        ↓
Convert to Relevant Process

============================================================
32. WORKSHOP APPOINTMENT
============================================================

Capture:

Customer

Vehicle

Service Type

Complaint

Appointment Date

Time

Service Advisor

Pickup / Drop

Expected Duration

Notes

============================================================
33. APPOINTMENT → JOB CARD
============================================================

Customer Arrives
        ↓
Open Appointment
        ↓
Check-In
        ↓
Create Job Card
        ↓
Carry Forward Customer
        ↓
Carry Forward Vehicle
        ↓
Carry Forward Complaint

Do NOT ask user to re-enter known information.

============================================================
34. SALES APPOINTMENT
============================================================

Possible:

Showroom Visit

Test Drive

Vehicle Discussion

Finance Discussion

Exchange Inspection

============================================================
35. APPOINTMENT STATUS
============================================================

Scheduled

Confirmed

Arrived

In Progress

Completed

Rescheduled

Cancelled

No Show

Converted

============================================================
36. QUOTATION / ESTIMATE CONNECTION
============================================================

CRM should show customer-facing commercial documents.

For Workshop:

Estimate

For Vehicle Sales:

Quotation

For other services:

Relevant quotation

CRM does NOT need to duplicate transaction calculation logic.

============================================================
37. LEAD CONVERSION
============================================================

Possible conversions:

Workshop Lead
        ↓
Customer / Existing Customer
        ↓
Appointment / Job Card

Vehicle Sales Lead
        ↓
Customer / Existing Customer
        ↓
Vehicle Sale

============================================================
38. CONVERT LEAD
============================================================

Use:

C01 Drawer / Modal

Show:

Lead

Customer Match

Requirement

Vehicle

Conversion Type

Assigned User

Notes

Actions:

Cancel

Convert

============================================================
39. LEAD CONVERSION RESULT
============================================================

After conversion:

Lead Status:
WON / CONVERTED

Create / link:

Customer

Vehicle where applicable

Job Card / Vehicle Sale / Appointment

Maintain original Lead history.

============================================================
40. LOST LEAD
============================================================

Do NOT delete lost leads.

Capture:

Lost Reason

Competitor where applicable

Price Issue

Vehicle Unavailable

No Response

Service Elsewhere

Finance Rejected

Customer Postponed

Other

Remarks

============================================================
41. LOST LEAD FOLLOW-UP
============================================================

Where appropriate:

Lost Lead
        ↓
Future Follow-Up Date
        ↓
Re-engagement

Lead may later reopen.

============================================================
42. CUSTOMER LIST
============================================================

Use:

T02 List Page

Primary Action:

+ New Customer

============================================================
43. CUSTOMER QUICK FILTERS
============================================================

All

Active

New

Workshop Customers

Vehicle Buyers

Outstanding

Service Due

Insurance Due

Complaint Open

Inactive

============================================================
44. CUSTOMER SEARCH
============================================================

Search:

Customer Code

Name

Mobile

Email

Vehicle Registration

VIN / Chassis

Invoice

Job Card

============================================================
45. CUSTOMER LIST FILTERS
============================================================

Customer Type

Branch

Assigned Executive

Outstanding

Service Due

Last Visit

Status

============================================================
46. CUSTOMER LIST TABLE
============================================================

Recommended columns:

Customer

Mobile

Vehicles

Last Visit

Last Transaction

Service Due

Outstanding

Assigned User

Status

Actions

============================================================
47. ADD CUSTOMER
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Contact

Address

Tax / Business Information

Preferences

Notes

Do NOT overload initial creation.

============================================================
48. CUSTOMER BASIC INFORMATION
============================================================

Fields:

Customer Code

Customer Name *

Mobile *

Alternate Mobile

Email

Customer Type

Date of Birth where business requires

Status

============================================================
49. CUSTOMER TYPES
============================================================

Possible:

Individual

Corporate

Fleet

Insurance

Government

Dealer

Other

============================================================
50. BUSINESS CUSTOMER
============================================================

Additional possible fields:

Company Name

Contact Person

GST / Tax Number

Billing Address

Credit Terms

Credit Limit

Actual finance rules later.

============================================================
51. CUSTOMER PREFERENCES
============================================================

Possible:

Preferred Branch

Preferred Advisor

Preferred Communication

Pickup / Drop Preference

WhatsApp Allowed

Email Allowed

SMS Allowed

Notes

============================================================
52. CUSTOMER 360 WORKSPACE
============================================================

CRITICAL UI.

Use:

T03 Primary Business Workspace

Customer 360 must provide ONE complete customer relationship
view.

============================================================
53. CUSTOMER 360 HEADER
============================================================

Example:

CUSTOMER #CUS-001258

Rajesh Sharma

+91 XXXXX XXXXX

[ ACTIVE CUSTOMER ]

Vehicles:
2

Last Visit:
15 Jul 2026

Outstanding:
$250

Next Service:
10 Oct 2026

Actions:

[ New Job Card ]

[ More ▼ ]

============================================================
54. CUSTOMER 360 SUMMARY
============================================================

Show compact KPIs:

Vehicles

Open Jobs

Lifetime Visits

Current Outstanding

Last Service

Next Service

Open Complaint

Active Sale where applicable

============================================================
55. CUSTOMER 360 NAVIGATION
============================================================

Recommended:

Overview

Vehicles

Service

Sales

Appointments

Communication

Payments

Feedback & Complaints

Documents

Timeline

Do NOT create these as unrelated global modules.

============================================================
56. CUSTOMER OVERVIEW
============================================================

Should answer:

Who is the customer?

How can we contact them?

Which vehicles do they own?

What was their last interaction?

Is any Job Card open?

Are they buying a vehicle?

Is any payment outstanding?

When is next service?

Is there an open complaint?

What should staff do next?

============================================================
57. CUSTOMER VEHICLES
============================================================

Show all linked vehicles.

Each vehicle card:

Registration Number

Manufacturer

Model

Variant

Year

Odometer

Last Service

Next Service

Insurance Expiry

Current Job Status where applicable

============================================================
58. CUSTOMER VEHICLE ACTIONS
============================================================

Possible:

Open Vehicle

New Job Card

Book Service

View Service History

Add Reminder

Update Odometer

View Documents

============================================================
59. QUICK ADD VEHICLE
============================================================

Fields:

Registration Number *

Manufacturer

Model

Variant

Year

Fuel Type

VIN / Chassis

Engine Number

Odometer

Color

After save:

Remain inside Customer 360.

============================================================
60. VEHICLE DETAIL CONTEXT
============================================================

Customer 360 vehicle view may show:

Vehicle Information

Service History

Parts Used

Labour

Lubricants

Invoices

Payments

Insurance

Warranty

Recommendations

Documents

============================================================
61. SERVICE HISTORY
============================================================

Customer Service tab should show:

Job Cards

Service Date

Vehicle

Complaint

Service Type

Advisor

Technician

Amount

Status

============================================================
62. JOB CARD QUICK VIEW
============================================================

Click Job Card:

Show:

Job Card Number

Vehicle

Complaint

Service Date

Work Performed

Parts

Labour

Invoice

Payment

Status

Action:

Open Job Card

============================================================
63. SERVICE RECOMMENDATIONS
============================================================

Show pending advice from previous Job Cards.

Example:

Front Brake Pads

Recommended:
15 Jul 2026

Priority:
High

Customer Decision:
Deferred

Action:

Add to Next Appointment

============================================================
64. NEXT SERVICE
============================================================

Track/display:

Next Service Date

Next Service Odometer

Recommended Service

Reminder Status

Preferred Contact Method

============================================================
65. SERVICE REMINDER PROCESS
============================================================

Service Due Approaching
        ↓
Reminder
        ↓
Call / WhatsApp / SMS / Email
        ↓
Customer Response
        ↓
Appointment
        ↓
Job Card

============================================================
66. VEHICLE SALES HISTORY
============================================================

Sales tab may show:

Vehicle Sale

Booking

Purchased Vehicle

Invoice

Payments

Finance

Insurance

RTO

Delivery Date

Status

============================================================
67. ACTIVE VEHICLE SALE
============================================================

Where customer has active sale:

Show summary:

Sale Number

Vehicle

Current Stage

Booking Amount

Paid

Balance

Expected Delivery

Action:

Open Vehicle Sale

============================================================
68. CUSTOMER APPOINTMENTS
============================================================

Show:

Upcoming

Today

Completed

Cancelled

No Show

Each appointment linked to:

Vehicle

Purpose

Branch

Advisor / Executive

============================================================
69. COMMUNICATION
============================================================

Customer Communication tab consolidates customer interactions.

Types:

Call

WhatsApp

SMS

Email

Meeting

Internal Note where appropriate

============================================================
70. COMMUNICATION ENTRY
============================================================

Show:

Date / Time

Channel

Subject / Purpose

Direction

User

Summary

Related Record

Next Action

============================================================
71. CALL LOG
============================================================

Capture:

Outgoing / Incoming

Purpose

Result

Duration where available

Notes

Next Follow-Up

No telephony integration required.

============================================================
72. WHATSAPP UI
============================================================

Frontend may demonstrate:

Select Template

Preview Message

Related Document

Send

Status simulation

No WhatsApp API integration required.

============================================================
73. EMAIL UI
============================================================

Frontend may demonstrate:

To

Subject

Message

Attachment

Related Record

Send

No email API required.

============================================================
74. CUSTOMER PAYMENT SUMMARY
============================================================

Payments tab should show:

Total Outstanding

Workshop Outstanding

Vehicle Sale Outstanding

Credit

Advance

Recent Payments

============================================================
75. CUSTOMER OUTSTANDING
============================================================

Example:

Invoice:
INV-2026-00158

Job Card:
JC-2026-001248

Amount:
$750

Paid:
$500

Outstanding:
$250

Due:
05 Aug 2026

Action:

Open Invoice / Receive Payment where permitted

============================================================
76. CUSTOMER TRANSACTION HISTORY
============================================================

Show:

Date

Reference

Module

Type

Amount

Paid

Balance

Status

============================================================
77. CUSTOMER CREDIT
============================================================

For eligible customers show:

Credit Limit

Used Credit

Available Credit

Outstanding

Overdue

Payment Terms

Actual credit rules belong to Finance.

============================================================
78. CUSTOMER FEEDBACK
============================================================

Feedback may originate from:

Workshop Delivery

Vehicle Delivery

General Interaction

============================================================
79. FEEDBACK INFORMATION
============================================================

Show:

Related Record

Date

Rating

Category Ratings

Comments

Submitted Via

Status

============================================================
80. LOW FEEDBACK
============================================================

Low rating should create attention.

Example:

2 / 5

Related:
JC-2026-001248

Comment:
Brake noise still present.

Actions:

Create Complaint

Schedule Follow-Up

Open Job Card

============================================================
81. COMPLAINT MANAGEMENT
============================================================

Complaints belong to Customer relationship context.

Possible sources:

Workshop

Vehicle Sale

Staff Behaviour

Billing

Parts

Delay

Quality

Other

============================================================
82. COMPLAINT PROCESS
============================================================

Complaint Received
        ↓
Record Complaint
        ↓
Categorize
        ↓
Priority
        ↓
Assign Responsible User
        ↓
Investigate
        ↓
Action / Resolution
        ↓
Customer Confirmation
        ↓
Close

============================================================
83. COMPLAINT INFORMATION
============================================================

Fields:

Complaint Number

Customer

Related Vehicle

Related Job Card / Sale / Invoice

Category

Priority

Description

Assigned To

Target Resolution

Status

============================================================
84. COMPLAINT PRIORITY
============================================================

Possible:

Low

Normal

High

Critical

============================================================
85. COMPLAINT STATUS
============================================================

Possible:

New

Assigned

In Review

Waiting for Customer

Action Required

Resolved

Reopened

Closed

============================================================
86. COMPLAINT RESOLUTION
============================================================

Capture:

Root Cause

Resolution

Action Taken

Responsible User

Resolved Date

Customer Response

Attachment

============================================================
87. COMPLAINT REOPEN
============================================================

If customer is not satisfied:

Resolved
        ↓
Reopen
        ↓
Reason
        ↓
Assign
        ↓
Resolve Again

Maintain complete history.

============================================================
88. CUSTOMER REMINDERS
============================================================

Possible reminders:

Service Due

Next Follow-Up

Insurance Renewal

Payment Due

Vehicle Delivery

Document Expiry

Birthday / Anniversary where configured

General Follow-Up

============================================================
89. REMINDER INFORMATION
============================================================

Fields:

Reminder Type

Customer

Vehicle

Related Record

Due Date

Assigned To

Channel

Priority

Notes

Status

============================================================
90. REMINDER STATUS
============================================================

Upcoming

Due Today

Overdue

Completed

Snoozed

Cancelled

============================================================
91. CUSTOMER DOCUMENTS
============================================================

Customer 360 should provide ONE consolidated document area.

Possible:

Customer ID

Address Proof

Tax Documents

Vehicle Documents

Job Card Documents

Invoices

Payment Receipts

Insurance

Vehicle Sale Documents

Complaint Attachments

Other Documents

============================================================
92. DOCUMENT CATEGORIES
============================================================

Customer

Vehicle

Workshop

Vehicle Sales

Insurance

Finance

Payment

Complaint

Other

============================================================
93. DOCUMENT ACTIONS
============================================================

Preview

Print

Download

WhatsApp

Email

Upload

Generated transactional documents remain owned by their source
module.

============================================================
94. CUSTOMER TIMELINE
============================================================

Timeline should provide business-level chronological history.

Examples:

Lead Created

First Call

Follow-Up Completed

Appointment Booked

Customer Created

Vehicle Added

Job Card Created

Estimate Sent

Service Completed

Invoice Generated

Payment Received

Vehicle Delivered

Feedback Received

Complaint Created

Complaint Resolved

Service Reminder Sent

Vehicle Sale Started

Vehicle Booked

New Vehicle Delivered

============================================================
95. TIMELINE FILTERS
============================================================

Possible:

All

CRM

Workshop

Sales

Payment

Communication

Feedback

Complaint

Documents

============================================================
96. CUSTOMER ACTIVITY VS AUDIT LOG
============================================================

Customer Timeline:

Business-facing customer events.

Audit Log:

Technical / administrative system changes.

Do NOT overload Customer Timeline with every field edit.

============================================================
97. CUSTOMER STATUS
============================================================

Possible:

Lead

Active

Inactive

Blocked where business rules allow

Archived

Customer transaction status should NOT be mixed with Customer
master status.

============================================================
98. CUSTOMER DUPLICATE CHECK
============================================================

During creation check:

Mobile

Email

Vehicle Registration

Tax Number where applicable

Show possible matches.

Do NOT automatically create duplicate Customer.

============================================================
99. CUSTOMER MERGE PREPARATION
============================================================

Future authorized action may support:

Customer A
+
Customer B
        ↓
Review Vehicles
        ↓
Review Transactions
        ↓
Select Primary Customer
        ↓
Merge

Frontend architecture may prepare for this.

Do NOT implement destructive merge logic now.

============================================================
100. CUSTOMER 360 QUICK ACTIONS
============================================================

Recommended:

New Job Card

Book Service

New Vehicle Sale

Add Vehicle

Add Follow-Up

Book Appointment

Add Payment Follow-Up

Add Complaint

Upload Document

============================================================
101. LEAD QUICK ACTIONS
============================================================

Possible:

Call

WhatsApp

Email

Add Follow-Up

Book Appointment

Create Quotation

Create Estimate Context

Convert Lead

Mark Lost

============================================================
102. CUSTOMER MORE ACTIONS
============================================================

Possible:

Edit Customer

Assign Executive

Add Note

Send WhatsApp

Send Email

Print Statement

View Outstanding

Deactivate

============================================================
103. CUSTOMER STATEMENT
============================================================

Printable Customer Statement may show:

Customer

Date Range

Invoices

Payments

Credit

Outstanding

Balance

Do NOT build full accounting ledger here.

============================================================
104. CUSTOMER + WORKSHOP
============================================================

Customer 360
        ↓
Select Vehicle
        ↓
New Job Card
        ↓
Customer + Vehicle Auto-Filled
        ↓
Workshop Process

After delivery:

Job Card
        ↓
Service History
        ↓
Customer Timeline
        ↓
Next Service Reminder

============================================================
105. CUSTOMER + VEHICLE SALES
============================================================

Lead / Customer
        ↓
Vehicle Interest
        ↓
Quotation
        ↓
Booking
        ↓
Vehicle Sale
        ↓
Delivery
        ↓
Purchased Vehicle added to Customer

============================================================
106. CUSTOMER + INSURANCE
============================================================

Customer 360 may show:

Active Policies

Expiry Dates

Claims

Renewal Due

Detailed policy processing remains in Insurance module.

============================================================
107. CUSTOMER + FINANCE
============================================================

Customer 360 may display:

Invoices

Payments

Outstanding

Credit

Finance Application context

Finance remains accounting source.

============================================================
108. CUSTOMER + VEHICLE
============================================================

Vehicle is a shared record.

Do NOT create:

CRM Vehicle

Workshop Vehicle

Sales Vehicle

Insurance Vehicle

Use ONE vehicle identity with contextual history.

============================================================
109. CUSTOMER + EMPLOYEE
============================================================

Assigned:

CRM Executive

Sales Executive

Service Advisor

Complaint Owner

should reference shared Employee/User records.

============================================================
110. CUSTOMER + BRANCH
============================================================

Customer may interact with multiple branches.

Customer itself may remain organization-wide.

Transactions remain branch-specific.

============================================================
111. MULTI-BRANCH CUSTOMER HISTORY
============================================================

Example:

Pune Branch
Job Card JC-001248

Mumbai Branch
Job Card JC-001892

Customer 360 should show both where user permissions allow.

Always display transaction branch.

============================================================
112. CUSTOMER COMMUNICATION PREFERENCES
============================================================

Respect/display preferences:

Phone

WhatsApp

SMS

Email

Do Not Contact where configured

Actual compliance logic later.

============================================================
113. GLOBAL SEARCH
============================================================

Global ERP Search should find:

Customer

Lead

Mobile

Vehicle

Job Card

Vehicle Sale

Invoice

Example:

CUSTOMER

Rajesh Sharma

CUS-001258

Vehicles:
2

Outstanding:
$250

============================================================
114. CRM REPORTS
============================================================

Report Center may include:

Lead Summary

Lead Source

Lead Conversion

Lost Leads

Follow-Up Report

Overdue Follow-Ups

Executive Performance

Appointment Report

Customer Growth

Inactive Customers

Repeat Customers

Service Due

Insurance Due

Customer Outstanding

Feedback

Complaint

Complaint Resolution

============================================================
115. CRM PIPELINE
============================================================

CRM Dashboard may provide simple pipeline:

New
        ↓
Contacted
        ↓
Qualified
        ↓
Appointment / Quotation
        ↓
Negotiation
        ↓
Won / Lost

Pipeline should be easy to understand.

Do NOT turn CRM into an overly complex enterprise sales tool.

============================================================
116. KANBAN VIEW
============================================================

Optional Lead view:

New

Contacted

Follow-Up

Quotation

Negotiation

Won

Lost

Cards may show:

Customer

Requirement

Value where applicable

Executive

Next Follow-Up

Priority

============================================================
117. LEAD AGEING
============================================================

Display:

Created Date

Days Open

Last Contact

Next Follow-Up

Useful for identifying stale leads.

============================================================
118. CUSTOMER RETENTION VIEW
============================================================

Dashboard/report may identify:

Service Due

Service Overdue

No Visit for configured period

Deferred Advice

Insurance Renewal

Open Complaint

Outstanding Payment

============================================================
119. DEFERRED ADVICE FOLLOW-UP
============================================================

Workshop Advice:

Customer Deferred Brake Pad Replacement

        ↓
Customer 360

        ↓
Future Follow-Up

        ↓
Service Appointment

This is important for repeat business.

============================================================
120. CUSTOMER VEHICLE ALERTS
============================================================

Vehicle card may show:

Service Due

Insurance Expiring

Warranty Expiring

Pending Advice

Open Job Card

Outstanding Invoice

============================================================
121. COMMUNICATION TEMPLATE PREPARATION
============================================================

Frontend may prepare templates for:

Appointment Confirmation

Service Reminder

Estimate Follow-Up

Vehicle Ready

Payment Reminder

Insurance Renewal

Feedback Request

Complaint Update

No communication API required.

============================================================
122. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

CRM Dashboard

Lead List

Lead Filters

Add Lead

Lead Workspace

Existing Customer Detection

Assign Executive

Follow-Up Drawer

Follow-Up Result

Next Follow-Up

Overdue Follow-Up

Appointment

Workshop Appointment

Sales Appointment

Lead Conversion

Mark Lead Lost

Customer List

Add Customer

Duplicate Detection

Customer 360

Customer Vehicles

Quick Add Vehicle

Service History

Job Card Quick View

Pending Advice

Next Service

Vehicle Sales History

Active Vehicle Sale

Appointments

Communication History

Call Log

WhatsApp UI

Email UI

Outstanding

Transaction History

Feedback

Low Rating Alert

Complaint Creation

Complaint Assignment

Complaint Resolution

Complaint Reopen

Reminders

Documents

Timeline

Multi-Branch History

No API/backend required.

============================================================
123. RECOMMENDED FRONTEND FILES
============================================================

crm-dashboard.html

leads.html

lead-form.html

lead-workspace.html

customers.html

customer-form.html

customer-360.html

customer-statement-print.html

Do NOT create separate pages for normal:

Follow-Up

Appointment

Communication

Reminder

Feedback

Complaint

Outstanding

Customer Vehicle

Use contextual drawers, tabs and Customer / Lead workspaces.

============================================================
124. REUSABLE CRM COMPONENTS
============================================================

Customer Search

Customer Quick View

Existing Customer Alert

Vehicle Card

Lead Summary

Lead Pipeline

Follow-Up Drawer

Appointment Drawer

Communication Panel

WhatsApp Composer

Email Composer

Call Log Drawer

Service History

Pending Advice

Outstanding Summary

Feedback Card

Complaint Panel

Reminder Panel

Document Panel

Timeline

============================================================
125. FEATURE → LOCATION MAP
============================================================

Lead
→ Lead List / Lead Workspace

Requirement
→ Lead Workspace

Follow-Up
→ Lead / Customer Context

Appointment
→ Lead / Customer Context

Quotation / Estimate
→ Related Lead + Source Module

Lead Conversion
→ Lead Workspace

Customer
→ Customer 360

Vehicles
→ Customer 360 / Vehicles

Service History
→ Customer 360 / Service

Vehicle Sales History
→ Customer 360 / Sales

Communication
→ Customer 360 / Communication

Outstanding
→ Customer 360 / Payments

Feedback
→ Customer 360 / Feedback & Complaints

Complaint
→ Customer 360 / Feedback & Complaints

Reminder
→ Customer Context / Dashboard

Documents
→ Customer 360 / Documents

Timeline
→ Customer 360 / Timeline

============================================================
126. NO DUPLICATION RULE
============================================================

DO NOT create:

CRM Customer

Workshop Customer

Sales Customer

Insurance Customer

Finance Customer

They are ONE Customer.

DO NOT create:

CRM Vehicle

Workshop Vehicle

Sales Vehicle

They are ONE Vehicle.

Lead conversion should LINK or CREATE shared records.

============================================================
127. CRM ACCEPTANCE CHECKLIST
============================================================

Before CRM & Customer is considered complete:

[ ] CRM Dashboard

[ ] New Leads

[ ] Open Leads

[ ] Follow-Ups Today

[ ] Overdue Follow-Ups

[ ] Appointments

[ ] Lead List

[ ] Add Lead

[ ] Lead Source

[ ] Lead Type

[ ] Lead Priority

[ ] Lead Workspace

[ ] Requirement

[ ] Vehicle Interest

[ ] Existing Customer Detection

[ ] Executive Assignment

[ ] Follow-Up

[ ] Follow-Up Result

[ ] Next Follow-Up

[ ] Overdue Status

[ ] Appointment

[ ] Workshop Appointment

[ ] Sales Appointment

[ ] Appointment Status

[ ] Estimate / Quotation Connection

[ ] Lead Conversion

[ ] Won Lead

[ ] Lost Lead

[ ] Lost Reason

[ ] Reopen / Future Follow-Up

[ ] Customer List

[ ] Add Customer

[ ] Customer Type

[ ] Business Customer

[ ] Customer Preferences

[ ] Duplicate Detection

[ ] Customer 360

[ ] Customer Vehicles

[ ] Quick Add Vehicle

[ ] Vehicle Alerts

[ ] Service History

[ ] Job Card History

[ ] Pending Advice

[ ] Next Service

[ ] Service Reminder

[ ] Vehicle Sales History

[ ] Active Vehicle Sale

[ ] Customer Appointments

[ ] Communication

[ ] Call History

[ ] WhatsApp UI

[ ] Email UI

[ ] Payment Summary

[ ] Outstanding

[ ] Transaction History

[ ] Credit Context

[ ] Feedback

[ ] Low Rating Alert

[ ] Complaint

[ ] Complaint Priority

[ ] Complaint Assignment

[ ] Complaint Resolution

[ ] Complaint Reopen

[ ] Reminders

[ ] Documents

[ ] Timeline

[ ] Multi-Branch History

[ ] Global Search Context

[ ] No backend/API generated

============================================================
128. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create Follow-Up as unnecessary permanent sidebar module.
- Create Appointment as unnecessary permanent sidebar module.
- Create Customer Vehicle as separate customer database.
- Create Customer Payment as separate financial system.
- Create Feedback as disconnected customer system.
- Create Complaint as disconnected customer database.
- Create Reminder as unnecessary permanent navigation.
- Duplicate Customer.
- Duplicate Vehicle.
- Duplicate Employee.
- Duplicate Invoice.
- Duplicate Payment.
- Re-enter Customer information during Job Card creation.
- Re-enter Vehicle information during Workshop appointment.
- Re-enter Lead information during Vehicle Sale.
- Delete Lost Leads.
- Delete completed communication history.
- Lose original Lead after conversion.
- Lose deferred Workshop Advice.
- Mix technical Audit Log with Customer Timeline.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
129. FINAL CUSTOMER 360 EXPERIENCE
============================================================

When user opens ONE Customer they should immediately understand:

WHO IS THIS CUSTOMER?

HOW DO WE CONTACT THEM?

WHICH VEHICLES DO THEY OWN?

WHAT WAS THEIR LAST INTERACTION?

IS ANY FOLLOW-UP PENDING?

DO THEY HAVE AN APPOINTMENT?

IS ANY VEHICLE CURRENTLY IN WORKSHOP?

WHAT SERVICES HAVE BEEN PERFORMED?

WHAT PARTS / LABOUR WERE USED?

IS ANY PREVIOUS ADVICE STILL PENDING?

WHEN IS THE NEXT SERVICE?

ARE THEY CURRENTLY BUYING A VEHICLE?

WHAT VEHICLE DID THEY PREVIOUSLY PURCHASE?

WHAT HAS BEEN INVOICED?

HOW MUCH HAVE THEY PAID?

WHAT IS OUTSTANDING?

WHAT COMMUNICATION HAS HAPPENED?

WHAT FEEDBACK HAVE THEY GIVEN?

IS ANY COMPLAINT OPEN?

WHAT DOCUMENTS EXIST?

WHAT SHOULD WE DO NEXT FOR THIS CUSTOMER?

============================================================
130. FINAL CRM PRINCIPLE
============================================================

CRM SHOULD NOT FEEL LIKE:

LEAD
+
FOLLOW-UP
+
APPOINTMENT
+
CUSTOMER
+
VEHICLE
+
COMMUNICATION
+
REMINDER
+
FEEDBACK
+
COMPLAINT
+
OUTSTANDING

AS DISCONNECTED MODULES.

IT SHOULD FEEL LIKE:

LEAD / ENQUIRY
        ↓
REQUIREMENT
        ↓
FOLLOW-UP
        ↓
APPOINTMENT / QUOTATION
        ↓
CONVERSION
        ↓
CUSTOMER
        ↓
VEHICLES
        ↓
WORKSHOP / VEHICLE SALE
        ↓
INVOICE / PAYMENT
        ↓
DELIVERY
        ↓
FEEDBACK
        ↓
REMINDERS
        ↓
REPEAT BUSINESS
        ↓
COMPLETE CUSTOMER 360

ONE CUSTOMER.

ONE RELATIONSHIP HISTORY.

ALL VEHICLES.

ALL TRANSACTIONS.

ALL COMMUNICATION.

MINIMUM NAVIGATION.

NO DUPLICATE ENTRY.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/07_CRM_CUSTOMER.md
============================================================