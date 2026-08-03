# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/08_INSURANCE_WARRANTY.md
# INSURANCE & WARRANTY — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Insurance & Warranty manages vehicle protection, coverage,
claims, approvals, settlements and warranty-related repair
processes.

The objective is NOT to create multiple disconnected screens.

Insurance Policy

Insurance Renewal

Insurance Claim

Surveyor

Claim Estimate

Claim Approval

Customer Liability

Insurer Liability

Settlement

Warranty

Extended Warranty

AMC / Service Contract

Warranty Claim

Covered Parts

Covered Labour

Documents

Timeline

must remain connected with:

Customer

Vehicle

Job Card

Estimate

Invoice

Payment

Service History

============================================================
2. PRIMARY NAVIGATION
============================================================

INSURANCE & WARRANTY

    Dashboard

    Insurance

    Warranty / AMC

Do NOT create permanent sidebar menus for:

Policies

Renewals

Claims

Surveyors

Claim Approvals

Settlements

Warranty Claims

Warranty Approvals

AMC Usage

These should exist inside relevant workspaces and contextual
views.

============================================================
3. COMPLETE INSURANCE PROCESS
============================================================

Customer & Vehicle
        ↓
Insurance Policy
        ↓
Policy Coverage
        ↓
Policy Active
        ↓
Renewal Reminder
        ↓
Renewal / New Policy

WHEN CLAIM OCCURS:

Vehicle / Accident
        ↓
Insurance Claim
        ↓
Claim Intimation
        ↓
Documents
        ↓
Job Card
        ↓
Inspection
        ↓
Estimate
        ↓
Surveyor
        ↓
Survey
        ↓
Estimate Review
        ↓
Insurance Approval
        ↓
Approved / Rejected Items
        ↓
Customer Approval
        ↓
Repair
        ↓
Additional Work if required
        ↓
Supplementary Approval
        ↓
Quality Check
        ↓
Final Invoice
        ↓
Insurer Liability
        ↓
Customer Liability
        ↓
Payment / Settlement
        ↓
Vehicle Delivery
        ↓
Claim Closure
        ↓
Documents
        ↓
Timeline

============================================================
4. COMPLETE WARRANTY PROCESS
============================================================

Customer & Vehicle
        ↓
Warranty / AMC Coverage
        ↓
Job Card
        ↓
Identify Warranty Issue
        ↓
Eligibility Check
        ↓
Coverage Verification
        ↓
Diagnosis
        ↓
Warranty Claim
        ↓
Approval
        ↓
Covered Parts / Labour
        ↓
Non-Covered Items
        ↓
Customer Approval if required
        ↓
Repair
        ↓
Quality Check
        ↓
Claim / Internal Settlement
        ↓
Vehicle Delivery
        ↓
Warranty History
        ↓
Documents
        ↓
Timeline

============================================================
5. INSURANCE DASHBOARD
============================================================

Use:

T01 Dashboard

Recommended KPIs:

Active Policies

Policies Expiring Soon

Renewals Due

Open Claims

Survey Pending

Approval Pending

Repair in Progress

Settlement Pending

Claims Closed

Warranty Claims Open

============================================================
6. ATTENTION REQUIRED
============================================================

Show:

Policy Expiring

Renewal Overdue

Claim Intimation Pending

Surveyor Not Assigned

Survey Pending

Claim Documents Missing

Estimate Approval Pending

Supplementary Approval Pending

Customer Approval Pending

Settlement Pending

Warranty Approval Pending

Warranty Expiring

AMC Expiring

============================================================
7. DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ Add Insurance

+ New Claim

+ Add Warranty / AMC

Search Policy

Search Claim

Search Vehicle

More ▼

============================================================
8. INSURANCE LIST
============================================================

Use:

T02 List Page

Insurance list should provide combined policy visibility.

Quick filters:

All

Active

Expiring Soon

Expired

Renewal Due

Claim Active

Cancelled

============================================================
9. INSURANCE SEARCH
============================================================

Search:

Policy Number

Customer

Mobile

Vehicle Registration

VIN

Insurance Company

Claim Number

============================================================
10. INSURANCE FILTERS
============================================================

Insurance Company

Policy Type

Status

Expiry Date

Vehicle

Branch

Renewal Status

Claim Status

============================================================
11. INSURANCE TABLE
============================================================

Recommended columns:

Policy No

Customer

Vehicle

Insurance Company

Policy Type

Start Date

Expiry Date

Premium

Claim Status

Policy Status

Actions

============================================================
12. ADD INSURANCE POLICY
============================================================

Use:

T05 Add/Edit Form

Sections:

Customer & Vehicle

Policy Information

Coverage

Premium

Add-ons

Nominee / Contact where required

Documents

Notes

============================================================
13. CUSTOMER & VEHICLE
============================================================

Search existing:

Customer

Vehicle

Do NOT create duplicate customer or vehicle.

Display:

Customer

Mobile

Vehicle

Registration

VIN

Model

Year

============================================================
14. POLICY INFORMATION
============================================================

Fields:

Policy Number *

Insurance Company *

Policy Type *

Policy Start Date *

Policy Expiry Date *

Policy Issue Date

Previous Policy Number

Policy Status

============================================================
15. POLICY TYPES
============================================================

Possible:

Comprehensive

Third Party

Own Damage

Commercial Vehicle

Fleet

Other configured policy type

============================================================
16. POLICY COVERAGE
============================================================

Possible coverage information:

Insured Declared Value

Own Damage

Third Party

Personal Accident

Zero Depreciation

Engine Protection

Roadside Assistance

Consumables

Return to Invoice

Key Protection

Tyre Protection

Other Add-ons

============================================================
17. PREMIUM INFORMATION
============================================================

Possible:

Base Premium

Own Damage Premium

Third Party Premium

Add-on Premium

Tax

Discount

Final Premium

Payment Status

============================================================
18. POLICY DOCUMENTS
============================================================

Possible:

Policy PDF

Previous Policy

Vehicle RC

Customer ID

Invoice

Inspection Photos

Proposal Form

Payment Receipt

Other Attachments

============================================================
19. INSURANCE DETAIL WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Recommended tabs:

Overview

Coverage

Claims

Renewal

Payments

Documents

Timeline

============================================================
20. INSURANCE HEADER
============================================================

Example:

POLICY #POL-2026-00148

[ ACTIVE ]

Customer:
Rajesh Sharma

Vehicle:
MH 12 AB 4582

Insurance:
ABC Insurance

Expiry:
15 Sep 2026

Actions:

[ Renew Policy ]

[ More ▼ ]

============================================================
21. POLICY OVERVIEW
============================================================

Should answer:

Who owns the vehicle?

Which vehicle is insured?

Which insurer?

What policy type?

When does it expire?

What is covered?

What is not covered?

Are claims active?

Has premium been paid?

Is renewal due?

============================================================
22. POLICY STATUS
============================================================

Possible:

Draft

Active

Expiring Soon

Expired

Renewed

Cancelled

Suspended where applicable

============================================================
23. POLICY RENEWAL
============================================================

Renewal remains inside policy context.

Process:

Policy Approaching Expiry
        ↓
Customer Reminder
        ↓
Renewal Quote
        ↓
Coverage Selection
        ↓
Premium
        ↓
Customer Approval
        ↓
Payment
        ↓
Renewed Policy
        ↓
New Expiry Date

============================================================
24. RENEWAL INFORMATION
============================================================

Show:

Current Policy

Current Expiry

Previous Premium

New Insurer

New Coverage

New Premium

Discount

New Start Date

New Expiry Date

Status

============================================================
25. RENEWAL STATUS
============================================================

Possible:

Not Due

Upcoming

Reminder Sent

Quote Prepared

Customer Pending

Payment Pending

Renewed

Lost / Not Renewed

============================================================
26. RENEWAL REMINDERS
============================================================

Possible:

30 Days Before

15 Days Before

7 Days Before

Expiry Day

Overdue

Actual reminder configuration later.

============================================================
27. INSURANCE CLAIM
============================================================

Insurance Claim must be directly linked to:

Policy

Customer

Vehicle

Job Card where repair is involved.

Do NOT create disconnected claim repair information.

============================================================
28. NEW CLAIM
============================================================

Flow:

Open Policy / Vehicle
        ↓
New Claim
        ↓
Accident / Incident Information
        ↓
Claim Intimation
        ↓
Documents
        ↓
Create / Link Job Card

============================================================
29. CLAIM BASIC INFORMATION
============================================================

Fields:

Claim Number

Claim Type

Policy

Customer

Vehicle

Incident Date

Incident Time

Incident Location

Claim Intimation Date

Insurance Reference

Description

============================================================
30. CLAIM TYPES
============================================================

Possible:

Accident

Own Damage

Theft

Flood

Fire

Natural Damage

Glass

Third Party

Other

============================================================
31. INCIDENT INFORMATION
============================================================

Capture:

Date

Time

Location

Driver

Driver License

Incident Description

Third Party Involved

Police Report / FIR where applicable

Photos

Videos

Voice Notes

============================================================
32. CLAIM INTIMATION
============================================================

Capture:

Insurance Company

Intimation Number

Intimation Date

Intimation Time

Contact Person

Reference

Remarks

============================================================
33. CLAIM WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Recommended navigation:

Overview

Incident

Job Card & Estimate

Survey

Approval

Repair

Settlement

Documents

Timeline

============================================================
34. CLAIM HEADER
============================================================

Example:

CLAIM #CLM-2026-00128

[ SURVEY PENDING ]

Customer:
Rajesh Sharma

Vehicle:
MH 12 AB 4582

Policy:
POL-2026-00148

Insurer:
ABC Insurance

Job Card:
JC-2026-001248

Actions:

[ Update Claim ]

[ More ▼ ]

============================================================
35. CLAIM SUMMARY
============================================================

Display:

Estimate Amount

Approved Amount

Insurer Liability

Customer Liability

Paid by Insurer

Paid by Customer

Outstanding

Current Stage

============================================================
36. CLAIM OVERVIEW
============================================================

Should answer:

What happened?

Which policy covers the vehicle?

Has insurer been informed?

Which Job Card is linked?

Has survey happened?

What estimate was submitted?

What has insurer approved?

What has insurer rejected?

What must customer pay?

Is repair complete?

Is settlement received?

============================================================
37. CLAIM + JOB CARD
============================================================

Claim repair should use the SAME Workshop Job Card.

Claim
        ↓
Create / Link Job Card
        ↓
Check-In
        ↓
Inspection
        ↓
Estimate
        ↓
Insurance Approval
        ↓
Repair
        ↓
QC
        ↓
Invoice
        ↓
Delivery

Do NOT create a separate Insurance Repair Job Card system.

============================================================
38. INSURANCE JOB CARD INDICATOR
============================================================

Job Card should clearly show:

[ INSURANCE JOB ]

Claim Number

Policy Number

Insurance Company

Survey Status

Approval Status

Insurer Liability

Customer Liability

============================================================
39. CLAIM ESTIMATE
============================================================

Estimate comes from Workshop.

Possible items:

Labour

Spares

Lubricants

Outsource Items

Repair Items

Replacement Items

Painting

Dent Repair

Other Charges

============================================================
40. ESTIMATE ITEM CLAIM STATUS
============================================================

Each item may have:

Requested

Under Review

Approved

Partially Approved

Rejected

Customer Pay

Supplementary

============================================================
41. CLAIM ESTIMATE GRID
============================================================

Recommended columns:

Item

Type

Qty

Estimate Amount

Requested Amount

Approved Amount

Customer Share

Insurer Share

Approval Status

Remarks

============================================================
42. SURVEYOR
============================================================

Surveyor information remains inside Claim Workspace.

Capture:

Surveyor Name

Mobile

Email

Insurance Company

Survey Date

Survey Time

Survey Location

Reference

Remarks

============================================================
43. SURVEY STATUS
============================================================

Possible:

Not Assigned

Assigned

Scheduled

Completed

Report Pending

Report Received

Re-Survey Required

============================================================
44. SURVEY PROCESS
============================================================

Claim Intimated
        ↓
Surveyor Assigned
        ↓
Survey Scheduled
        ↓
Vehicle Inspection
        ↓
Damage Review
        ↓
Estimate Review
        ↓
Survey Report
        ↓
Insurance Decision

============================================================
45. SURVEY DETAILS
============================================================

Support:

Damage Items

Dent / Scratch Map

Photos

Videos

Estimate Comparison

Surveyor Remarks

Recommended Repair

Recommended Replacement

Disallowed Items

============================================================
46. SURVEY DOCUMENTS
============================================================

Possible:

Survey Report

Damage Photos

Estimate

Vehicle Photos

Police Documents

Driver Documents

Other Attachments

============================================================
47. CLAIM APPROVAL
============================================================

Approval section must clearly separate:

Requested Amount

Approved Amount

Rejected Amount

Insurer Share

Customer Share

============================================================
48. APPROVAL SUMMARY
============================================================

Example:

Estimated Repair:
$5,000

Insurance Approved:
$3,800

Customer Liability:
$1,200

Show item-wise breakdown.

============================================================
49. APPROVED ITEM
============================================================

Example:

Front Bumper Replacement

Estimated:
$650

Approved:
$600

Insurance:
$600

Customer:
$50

Status:
PARTIALLY APPROVED

============================================================
50. REJECTED ITEM
============================================================

Example:

Fog Lamp

Estimated:
$180

Approved:
$0

Reason:
Not covered

Customer may:

Approve Self-Pay

Decline Repair

============================================================
51. CUSTOMER APPROVAL
============================================================

When customer liability exists:

Insurance Approval
        ↓
Customer Liability Calculated
        ↓
Customer Informed
        ↓
Customer Approval
        ↓
Repair Continues

Support:

OTP Approval

Signature

WhatsApp Approval UI

Email Approval UI

Manual Approval with remark

============================================================
52. CUSTOMER LIABILITY
============================================================

Possible causes:

Deductible

Depreciation

Non-Covered Part

Rejected Item

Difference in Approved Rate

Consumables

Policy Condition

Additional Customer Work

============================================================
53. SUPPLEMENTARY CLAIM
============================================================

CRITICAL.

During repair additional hidden damage may be found.

Process:

Repair Started
        ↓
Additional Damage Found
        ↓
Photos / Evidence
        ↓
Additional Estimate
        ↓
Supplementary Claim
        ↓
Survey / Review
        ↓
Approval / Rejection
        ↓
Repair Continues

============================================================
54. SUPPLEMENTARY ESTIMATE
============================================================

Maintain separately:

Original Estimate

Original Approval

Supplementary Estimate

Supplementary Approval

Final Approved Amount

Do NOT overwrite original approval.

============================================================
55. REPAIR PROCESS
============================================================

Actual repair remains controlled by Workshop Job Card.

Claim Workspace should display:

Job Card Status

Mechanic

Supervisor

Bay

Repair Progress

Parts

Labour

Outsource Work

Additional Work

QC

Expected Completion

============================================================
56. PARTS IN INSURANCE REPAIR
============================================================

Parts must use shared Inventory.

Process:

Approved Repair
        ↓
Reserve Part
        ↓
Issue Part
        ↓
Consume
        ↓
Return Unused Part if applicable

Do NOT create Insurance Parts Inventory.

============================================================
57. INSURANCE LABOUR
============================================================

Labour comes from Job Card.

Show:

Labour Item

Technician

Rate

Estimate

Approved Rate

Insurer Share

Customer Share

============================================================
58. OUTSOURCE INSURANCE WORK
============================================================

Possible:

Painting

Body Work

Glass

Specialist Repair

Towing

Other

Keep connected to Job Card + Vendor process.

============================================================
59. CLAIM QUALITY CHECK
============================================================

Before final claim invoice:

Repair Complete
        ↓
QC
        ↓
Road Test where applicable
        ↓
Supervisor Approval
        ↓
Final Repair Amount

============================================================
60. FINAL CLAIM INVOICE
============================================================

Invoice should use final actual repair items.

Show:

Parts

Labour

Lubricants

Outsource

Tax

Discount where applicable

Final Amount

Insurer Liability

Customer Liability

============================================================
61. INSURER LIABILITY
============================================================

Show:

Approved Claim Amount

Adjustments

Deductible Treatment

Settlement Amount

Amount Received

Outstanding from Insurer

============================================================
62. CUSTOMER LIABILITY SUMMARY
============================================================

Show:

Deductible

Depreciation

Rejected Items

Non-Covered Work

Additional Customer Work

Tax Difference where applicable

Total Customer Payable

Paid

Outstanding

============================================================
63. CLAIM PAYMENT
============================================================

Payment may originate from:

Insurance Company

Customer

Other authorized payer

Keep payment source clearly identifiable.

============================================================
64. PAYMENT SUMMARY
============================================================

Example:

Final Invoice:
$5,200

Insurance Liability:
$3,900

Customer Liability:
$1,300

Insurance Received:
$3,000

Customer Paid:
$1,300

Outstanding:
$900 from Insurer

============================================================
65. INSURANCE SETTLEMENT
============================================================

Capture:

Settlement Number

Settlement Date

Approved Settlement

Deductions

Final Settlement

Payment Reference

Amount Received

Balance

Remarks

============================================================
66. SETTLEMENT STATUS
============================================================

Possible:

Not Started

Documents Pending

Submitted

Under Review

Approved

Payment Pending

Partially Settled

Settled

Rejected

Disputed

============================================================
67. CLAIM CLOSURE
============================================================

Claim should close only when applicable process is complete.

Possible checks:

Repair Completed

Final Invoice Generated

Customer Liability Handled

Insurer Settlement Handled

Required Documents Complete

Vehicle Delivered

============================================================
68. CLAIM STATUS
============================================================

Recommended:

Draft

Intimated

Documents Pending

Survey Pending

Survey Completed

Estimate Submitted

Approval Pending

Partially Approved

Approved

Repair In Progress

Supplementary Approval Pending

QC

Invoice Generated

Settlement Pending

Partially Settled

Settled

Closed

Rejected

Cancelled

============================================================
69. CLAIM DOCUMENTS
============================================================

Possible:

Policy

RC

Driving License

Customer ID

Claim Form

FIR / Police Report

Incident Photos

Survey Report

Estimate

Approval Letter

Supplementary Estimate

Supplementary Approval

Job Card

Final Invoice

Payment Receipt

Settlement Document

Delivery Document

============================================================
70. CLAIM TIMELINE
============================================================

Examples:

Claim Created

Claim Intimated

Documents Uploaded

Job Card Linked

Estimate Generated

Surveyor Assigned

Survey Completed

Estimate Submitted

Approval Received

Item Rejected

Customer Approval Received

Repair Started

Additional Damage Found

Supplementary Submitted

Supplementary Approved

Repair Completed

QC Passed

Invoice Generated

Customer Payment Received

Settlement Submitted

Insurance Payment Received

Vehicle Delivered

Claim Closed

============================================================
71. WARRANTY / AMC
============================================================

Warranty & AMC manages:

Manufacturer Warranty

Dealer Warranty

Extended Warranty

Parts Warranty

Service Warranty

AMC

Service Package

Other Contractual Coverage

============================================================
72. WARRANTY / AMC LIST
============================================================

Use:

T02 List Page

Quick filters:

All

Active

Expiring Soon

Expired

Usage Available

Claim Active

Exhausted

Cancelled

============================================================
73. WARRANTY SEARCH
============================================================

Search:

Warranty Number

AMC Number

Customer

Vehicle

Registration

VIN

Provider

============================================================
74. WARRANTY TABLE
============================================================

Recommended columns:

Coverage No

Customer

Vehicle

Type

Provider

Start

Expiry

Usage / Limit

Claim Status

Status

Actions

============================================================
75. ADD WARRANTY / AMC
============================================================

Use:

T05 Add/Edit Form

Sections:

Customer & Vehicle

Coverage Information

Validity

Coverage

Limits

Exclusions

Documents

Notes

============================================================
76. WARRANTY TYPES
============================================================

Possible:

Manufacturer Warranty

Dealer Warranty

Extended Warranty

Parts Warranty

Labour Warranty

Repair Warranty

============================================================
77. AMC / SERVICE CONTRACT TYPES
============================================================

Possible:

Annual Maintenance Contract

Service Package

Prepaid Service

Fleet Maintenance Contract

Corporate Maintenance Contract

Other

============================================================
78. WARRANTY INFORMATION
============================================================

Fields:

Warranty Number

Provider

Warranty Type

Start Date

Expiry Date

Start Odometer

Expiry Odometer

Status

Terms

============================================================
79. WARRANTY VALIDITY
============================================================

Warranty may depend on:

Date

Odometer

Whichever condition occurs first

Display both clearly.

Example:

Expiry:
15 Mar 2027

OR

50,000 km

Current Odometer:
38,450 km

============================================================
80. WARRANTY COVERAGE
============================================================

Possible:

Engine

Transmission

Electrical

AC

Suspension

Brakes

Specific Parts

Labour

Other configured coverage

============================================================
81. WARRANTY EXCLUSIONS
============================================================

Show clearly:

Wear & Tear

Accidental Damage

Consumables

Unauthorized Repair

Misuse

Maintenance Neglect

Specific Excluded Parts

Other Terms

============================================================
82. AMC COVERAGE
============================================================

Possible:

Number of Services

Labour

Oil

Filters

Inspection

Pickup / Drop

Wash

Discount

Specific Parts

Other Benefits

============================================================
83. AMC USAGE SUMMARY
============================================================

Example:

Plan:
4 Services

Used:
2

Remaining:
2

Valid Until:
31 Dec 2026

============================================================
84. WARRANTY / AMC WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Recommended tabs:

Overview

Coverage

Usage / Claims

Service History

Documents

Timeline

============================================================
85. WARRANTY HEADER
============================================================

Example:

WARRANTY #WAR-2026-00128

[ ACTIVE ]

Customer:
Rajesh Sharma

Vehicle:
MH 12 AB 4582

Provider:
Manufacturer Warranty

Expiry:
15 Mar 2027 / 50,000 km

Current:
38,450 km

Actions:

[ New Warranty Claim ]

[ More ▼ ]

============================================================
86. WARRANTY ELIGIBILITY CHECK
============================================================

When Job Card contains potential warranty work:

Check:

Coverage Active?

Date Valid?

Odometer Valid?

Part Covered?

Labour Covered?

Service Conditions Met?

Previous Repair Relevant?

Exclusion Applicable?

============================================================
87. WARRANTY INDICATOR IN JOB CARD
============================================================

Job Card should show:

[ WARRANTY AVAILABLE ]

Coverage:
Manufacturer Warranty

Expiry:
15 Mar 2027 / 50,000 km

Possible Action:

Check Coverage

Create Warranty Claim

============================================================
88. WARRANTY CLAIM PROCESS
============================================================

Job Card
        ↓
Warranty Issue Identified
        ↓
Coverage Check
        ↓
Diagnosis
        ↓
Create Warranty Claim
        ↓
Evidence / Documents
        ↓
Submit for Approval
        ↓
Approved / Rejected
        ↓
Covered Parts / Labour
        ↓
Customer-Pay Items if any
        ↓
Repair
        ↓
QC
        ↓
Claim Completion

============================================================
89. WARRANTY CLAIM INFORMATION
============================================================

Fields:

Warranty Claim Number

Warranty / AMC

Customer

Vehicle

Job Card

Complaint

Diagnosis

Failure Date

Odometer

Claim Amount

Status

============================================================
90. WARRANTY DIAGNOSIS
============================================================

Capture:

Customer Complaint

Technician Finding

Failure Cause

Affected Part

Part Number

Photos

Videos

Diagnostic Report

Remarks

============================================================
91. WARRANTY CLAIM ITEMS
============================================================

Columns:

Item

Type

Qty

Rate

Claimed Amount

Approved Amount

Coverage

Customer Share

Status

============================================================
92. WARRANTY ITEM TYPES
============================================================

Possible:

Part

Labour

Lubricant

Diagnostic

Outsource

Other

============================================================
93. WARRANTY APPROVAL
============================================================

Status per item:

Pending

Approved

Partially Approved

Rejected

Additional Information Required

============================================================
94. WARRANTY REJECTION
============================================================

Capture:

Rejected Item

Reason

Provider Remarks

Customer Liability

Customer Decision

Possible:

Proceed as Customer-Pay

Do Not Repair

Request Review

============================================================
95. WARRANTY PART REPLACEMENT
============================================================

When covered part is replaced:

Old Part

New Part

Old Serial Number where applicable

New Serial Number

Part Number

Qty

Return Required?

Provider Return Status

============================================================
96. WARRANTY OLD PART RETURN
============================================================

Where provider requires failed part return:

Removed Part
        ↓
Tag
        ↓
Store Separately
        ↓
Return to Provider
        ↓
Return Reference
        ↓
Claim Completion

Frontend should prepare this flow.

============================================================
97. WARRANTY LABOUR
============================================================

Show:

Labour Item

Technician

Hours

Standard Rate

Approved Rate

Covered Amount

Customer Amount

============================================================
98. AMC SERVICE USAGE
============================================================

When AMC service is used:

Job Card
        ↓
Identify Active AMC
        ↓
Select Covered Service
        ↓
Apply Coverage
        ↓
Reduce Remaining Usage
        ↓
Record Service

Do NOT manually maintain duplicate service history.

============================================================
99. AMC COVERED VS CHARGEABLE
============================================================

Example:

Periodic Service Labour
Covered

Engine Oil
Covered

Brake Pads
Not Covered

Wheel Alignment
50% Discount

Customer payable should remain clear.

============================================================
100. WARRANTY / AMC PAYMENT
============================================================

Possible payer:

Warranty Provider

Manufacturer

Dealer

Internal Warranty

Customer

AMC Prepaid Coverage

Display liability clearly.

============================================================
101. WARRANTY CLAIM STATUS
============================================================

Possible:

Draft

Eligibility Check

Documents Pending

Approval Pending

Approved

Partially Approved

Rejected

Repair In Progress

Part Return Pending

Settlement Pending

Completed

Cancelled

============================================================
102. WARRANTY CLAIM HISTORY
============================================================

Vehicle / Warranty should show:

Claim Number

Job Card

Date

Complaint

Covered Items

Claimed Amount

Approved Amount

Status

============================================================
103. WARRANTY DOCUMENTS
============================================================

Possible:

Warranty Certificate

AMC Contract

Purchase Invoice

Service Records

Claim Form

Diagnosis

Photos

Approval

Part Return Document

Settlement

Other Attachments

============================================================
104. WARRANTY TIMELINE
============================================================

Examples:

Warranty Added

Coverage Activated

Service Used

Warranty Issue Detected

Claim Created

Diagnosis Added

Claim Submitted

Additional Information Requested

Claim Approved

Part Issued

Repair Started

Repair Completed

Failed Part Returned

Claim Settled

Claim Completed

Warranty Expired

============================================================
105. WARRANTY EXPIRY
============================================================

Display upcoming expiry based on:

Date

Odometer

Service Usage

Contract Limit

Possible attention:

Expiring Soon

Mileage Near Limit

AMC Service Remaining

AMC Expiring With Unused Services

============================================================
106. SERVICE WARRANTY
============================================================

Garage may provide warranty on completed work.

Example:

Job Card:
JC-2026-001248

Repair:
AC Compressor Replacement

Warranty:
90 Days

If customer returns:

Identify original Job Card

Verify warranty

Create linked warranty repair

Maintain original repair reference.

============================================================
107. PART WARRANTY
============================================================

Part warranty should connect to:

Original Part

Original Job Card / Sale

Installation Date

Supplier / Manufacturer

Warranty Period

Serial Number where applicable

============================================================
108. REPEAT REPAIR / WARRANTY RETURN
============================================================

Customer Returns
        ↓
Search Vehicle
        ↓
Previous Repair Found
        ↓
Warranty Available
        ↓
Create Linked Job Card
        ↓
Warranty Evaluation

Do NOT overwrite original Job Card.

============================================================
109. INSURANCE + CUSTOMER
============================================================

Customer 360 should show:

Policies

Expiry

Renewal Status

Claims

Claim Settlement

Warranty

AMC

Coverage

============================================================
110. INSURANCE + VEHICLE
============================================================

Vehicle Detail should show:

Active Policy

Previous Policies

Claims

Warranty

AMC

Claim Repair History

============================================================
111. INSURANCE + WORKSHOP
============================================================

Workshop owns:

Check-In

Inspection

Estimate

Repair

Parts

Labour

QC

Invoice

Insurance Claim owns:

Policy

Claim

Survey

Approval

Liability

Settlement

Both remain connected.

============================================================
112. WARRANTY + WORKSHOP
============================================================

Workshop owns repair execution.

Warranty owns:

Eligibility

Coverage

Approval

Claim

Provider Liability

Part Return

Do NOT duplicate repair process.

============================================================
113. INSURANCE + INVENTORY
============================================================

Insurance repair parts use normal Inventory.

Warranty repair parts also use normal Inventory.

Stock must move through shared inventory transactions.

============================================================
114. WARRANTY + PURCHASE
============================================================

Replacement / warranty parts may originate from:

Existing Stock

Vendor

Manufacturer

Warranty Provider

Purchase / Inventory process should remain traceable.

============================================================
115. INSURANCE + FINANCE
============================================================

Finance should receive financial context for:

Customer Liability

Insurer Receivable

Claim Settlement

Refund

Adjustment

Warranty Provider Receivable

Do NOT create separate accounting ledger inside Insurance.

============================================================
116. INSURANCE + CRM
============================================================

CRM may use:

Insurance Expiry

Renewal Due

Claim Follow-Up

Warranty Expiry

AMC Expiry

for customer communication and retention.

============================================================
117. MULTI-BRANCH
============================================================

Policy may be customer/vehicle level.

Claims and repairs are branch-specific.

Always show:

Policy Owner

Claim Branch

Repair Branch

Responsible User

Settlement Context

============================================================
118. INSURANCE COMPANY / PROVIDER
============================================================

Provider information may include:

Company Name

Contact

Claim Contact

Email

Phone

Address

Payment Terms

Documents

Do NOT duplicate provider records unnecessarily.

============================================================
119. SURVEYOR RECORD
============================================================

Surveyor may be selected from known contacts or entered
contextually.

Do NOT create an oversized standalone Surveyor module unless
future business requirements require it.

============================================================
120. GLOBAL SEARCH
============================================================

Global ERP Search should find:

Policy

Claim

Warranty

AMC

Customer

Vehicle

Job Card

Example:

INSURANCE CLAIM

CLM-2026-00128

MH 12 AB 4582

ABC Insurance

Status:
Approval Pending

============================================================
121. REPORTS
============================================================

Report Center may include:

Active Policies

Policy Expiry

Renewal Due

Renewal Conversion

Insurance Claims

Claim Status

Survey Pending

Approval Pending

Claim Amount

Insurer Outstanding

Customer Liability

Claim Settlement

Claim Rejection

Warranty Coverage

Warranty Expiry

Warranty Claims

Warranty Claim Rejection

AMC Usage

AMC Expiry

============================================================
122. INSURANCE QUICK ACTIONS
============================================================

Context dependent:

Add Policy

Renew Policy

New Claim

Link Job Card

Add Claim Document

Assign Surveyor

Record Survey

Submit Estimate

Record Approval

Add Supplementary Claim

Record Settlement

Close Claim

============================================================
123. WARRANTY QUICK ACTIONS
============================================================

Context dependent:

Add Warranty

Add AMC

Check Eligibility

New Warranty Claim

Add Diagnosis

Submit Claim

Record Approval

Apply Coverage

Record Part Return

Complete Claim

============================================================
124. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Insurance Dashboard

Insurance List

Add Policy

Policy Workspace

Coverage

Premium

Policy Documents

Renewal

Renewal Quote

New Claim

Claim Workspace

Incident Details

Claim Intimation

Link Job Card

Insurance Job Indicator

Claim Estimate

Item-Wise Approval

Surveyor Assignment

Survey Details

Survey Report

Approved Item

Partially Approved Item

Rejected Item

Customer Liability

Customer Approval

Supplementary Claim

Supplementary Approval

Repair Progress Context

Final Invoice

Insurer Liability

Customer Liability

Settlement

Partial Settlement

Claim Closure

Claim Documents

Claim Timeline

Warranty List

Add Warranty

Add AMC

Warranty Workspace

Coverage

Expiry by Date / Odometer

AMC Usage

Eligibility Check

Warranty Job Indicator

Warranty Claim

Diagnosis

Claim Items

Approval

Rejection

Customer-Pay Conversion

Warranty Part Replacement

Old Part Return

Warranty Labour

AMC Service Usage

Service Warranty

Part Warranty

Warranty History

Documents

Timeline

No API/backend required.

============================================================
125. RECOMMENDED FRONTEND FILES
============================================================

insurance-dashboard.html

insurance.html

insurance-form.html

insurance-workspace.html

insurance-claim-workspace.html

insurance-claim-print.html

insurance-settlement-print.html

warranty-amc.html

warranty-amc-form.html

warranty-amc-workspace.html

warranty-claim-print.html

Do NOT create separate pages for normal:

Renewal

Survey

Approval

Settlement

Supplementary Claim

Warranty Approval

AMC Usage

These belong inside relevant workspaces.

============================================================
126. REUSABLE COMPONENTS
============================================================

Customer Search

Vehicle Search

Policy Summary

Coverage Panel

Premium Summary

Renewal Panel

Claim Summary

Incident Panel

Claim Estimate Grid

Surveyor Drawer

Survey Panel

Approval Grid

Liability Summary

Customer Approval

Supplementary Claim Panel

Settlement Panel

Warranty Coverage

Eligibility Checker

AMC Usage

Warranty Claim Grid

Part Return Panel

Document Panel

Timeline

============================================================
127. FEATURE → LOCATION MAP
============================================================

Policy
→ Insurance Workspace

Coverage
→ Insurance / Coverage

Renewal
→ Insurance / Renewal

Claim
→ Claim Workspace

Incident
→ Claim / Incident

Job Card
→ Claim / Job Card & Estimate

Estimate
→ Workshop + Claim Context

Surveyor
→ Claim / Survey

Survey
→ Claim / Survey

Approval
→ Claim / Approval

Customer Liability
→ Claim / Approval + Settlement

Supplementary
→ Claim / Approval

Repair
→ Workshop Job Card

Invoice
→ Workshop + Claim Settlement

Insurer Payment
→ Claim / Settlement

Documents
→ Relevant Workspace / Documents

Warranty
→ Warranty Workspace

AMC
→ Warranty / AMC Workspace

Eligibility
→ Job Card + Warranty

Warranty Claim
→ Warranty Workspace

Warranty Repair
→ Workshop Job Card

Warranty Part Return
→ Warranty Claim

Timeline
→ Relevant Workspace / Timeline

============================================================
128. NO DUPLICATION RULE
============================================================

DO NOT create separate:

Insurance Customer

Warranty Customer

Insurance Vehicle

Warranty Vehicle

Insurance Job Card

Warranty Job Card

Insurance Inventory

Warranty Inventory

Insurance Invoice

Warranty Invoice

Use shared:

Customer

Vehicle

Job Card

Inventory

Invoice

Payment

Employee

Vendor / Provider

============================================================
129. INSURANCE ACCEPTANCE CHECKLIST
============================================================

Before Insurance is considered complete:

[ ] Insurance Dashboard

[ ] Policy List

[ ] Add Policy

[ ] Customer & Vehicle

[ ] Policy Details

[ ] Coverage

[ ] Add-ons

[ ] Premium

[ ] Policy Documents

[ ] Policy Workspace

[ ] Policy Expiry

[ ] Renewal

[ ] Renewal Reminder

[ ] Renewal Quote

[ ] Claim Creation

[ ] Claim Intimation

[ ] Incident Information

[ ] Incident Media

[ ] Claim Documents

[ ] Job Card Link

[ ] Insurance Job Indicator

[ ] Claim Estimate

[ ] Item-Wise Approval

[ ] Surveyor

[ ] Survey

[ ] Survey Report

[ ] Approved Items

[ ] Partially Approved Items

[ ] Rejected Items

[ ] Customer Liability

[ ] Customer Approval

[ ] Supplementary Claim

[ ] Supplementary Approval

[ ] Repair Context

[ ] Parts

[ ] Labour

[ ] Outsource

[ ] QC

[ ] Final Invoice

[ ] Insurer Liability

[ ] Customer Liability Summary

[ ] Insurer Payment

[ ] Customer Payment

[ ] Partial Settlement

[ ] Settlement

[ ] Claim Closure

[ ] Claim Timeline

============================================================
130. WARRANTY / AMC ACCEPTANCE CHECKLIST
============================================================

Before Warranty / AMC is considered complete:

[ ] Warranty List

[ ] Add Warranty

[ ] Add AMC

[ ] Customer & Vehicle

[ ] Warranty Type

[ ] Start Date

[ ] Expiry Date

[ ] Start Odometer

[ ] Expiry Odometer

[ ] Coverage

[ ] Exclusions

[ ] AMC Benefits

[ ] AMC Usage

[ ] Remaining Services

[ ] Warranty Workspace

[ ] Eligibility Check

[ ] Job Card Warranty Indicator

[ ] Warranty Claim

[ ] Diagnosis

[ ] Evidence

[ ] Claim Items

[ ] Parts Coverage

[ ] Labour Coverage

[ ] Approval

[ ] Partial Approval

[ ] Rejection

[ ] Customer-Pay Items

[ ] Repair Context

[ ] Replacement Part

[ ] Failed Part

[ ] Old Part Return

[ ] AMC Service Usage

[ ] Service Warranty

[ ] Part Warranty

[ ] Warranty History

[ ] Warranty Expiry

[ ] Documents

[ ] Timeline

[ ] No backend/API generated

============================================================
131. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create Renewal as unnecessary permanent sidebar module.
- Create Surveyor as unnecessary permanent sidebar module.
- Create Claim Approval as disconnected module.
- Create Settlement as disconnected accounting system.
- Create Supplementary Claim as unrelated transaction.
- Create Warranty Claim as disconnected repair process.
- Create AMC Usage as separate operational module.
- Duplicate Customer.
- Duplicate Vehicle.
- Duplicate Job Card.
- Duplicate Inventory.
- Duplicate Invoice.
- Duplicate Payment.
- Re-enter Job Card estimate into Claim manually.
- Re-enter Insurance-approved repair into Workshop manually.
- Overwrite original claim approval with supplementary approval.
- Hide rejected claim items.
- Hide customer liability.
- Hide insurer outstanding.
- Treat warranty-rejected items as covered.
- Lose failed warranty part return history.
- Lose original Job Card on repeat warranty repair.
- Delete closed claims.
- Delete settlement history.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
132. FINAL INSURANCE CLAIM EXPERIENCE
============================================================

When user opens ONE Insurance Claim they should immediately
understand:

WHO IS THE CUSTOMER?

WHICH VEHICLE IS INVOLVED?

WHICH POLICY IS ACTIVE?

WHAT HAPPENED?

HAS THE CLAIM BEEN INTIMATED?

WHICH DOCUMENTS ARE MISSING?

WHICH JOB CARD IS LINKED?

WHAT WAS THE REPAIR ESTIMATE?

WHO IS THE SURVEYOR?

HAS THE SURVEY BEEN COMPLETED?

WHAT DID INSURANCE APPROVE?

WHAT DID INSURANCE REJECT?

WHAT IS THE INSURER LIABILITY?

WHAT IS THE CUSTOMER LIABILITY?

HAS THE CUSTOMER APPROVED THEIR SHARE?

WAS SUPPLEMENTARY DAMAGE FOUND?

WHAT IS THE REPAIR STATUS?

HAS QC PASSED?

WHAT IS THE FINAL INVOICE?

HOW MUCH HAS INSURANCE PAID?

HOW MUCH HAS CUSTOMER PAID?

WHAT IS STILL OUTSTANDING?

HAS THE VEHICLE BEEN DELIVERED?

CAN THE CLAIM BE CLOSED?

============================================================
133. FINAL WARRANTY EXPERIENCE
============================================================

When user opens ONE Warranty / AMC record they should
immediately understand:

WHICH CUSTOMER?

WHICH VEHICLE?

WHAT COVERAGE IS ACTIVE?

WHO PROVIDES THE COVERAGE?

WHEN DOES IT EXPIRE?

WHAT IS THE ODOMETER LIMIT?

WHAT IS COVERED?

WHAT IS EXCLUDED?

HOW MUCH AMC USAGE REMAINS?

IS THE CURRENT REPAIR ELIGIBLE?

WHICH JOB CARD IS LINKED?

WHAT FAILED?

WHAT HAS BEEN CLAIMED?

WHAT WAS APPROVED?

WHAT WAS REJECTED?

WHAT MUST THE CUSTOMER PAY?

WAS A PART REPLACED?

DOES THE FAILED PART NEED TO BE RETURNED?

HAS THE REPAIR BEEN COMPLETED?

WHAT PREVIOUS WARRANTY CLAIMS EXIST?

============================================================
134. FINAL PRINCIPLE
============================================================

INSURANCE SHOULD NOT FEEL LIKE:

POLICY
+
RENEWAL
+
CLAIM
+
SURVEYOR
+
ESTIMATE
+
APPROVAL
+
SUPPLEMENTARY
+
SETTLEMENT

AS DISCONNECTED MODULES.

IT SHOULD FEEL LIKE:

POLICY
        ↓
COVERAGE
        ↓
CLAIM
        ↓
JOB CARD
        ↓
ESTIMATE
        ↓
SURVEY
        ↓
APPROVAL
        ↓
REPAIR
        ↓
SUPPLEMENTARY IF REQUIRED
        ↓
FINAL INVOICE
        ↓
INSURER + CUSTOMER LIABILITY
        ↓
SETTLEMENT
        ↓
DELIVERY
        ↓
CLAIM CLOSURE

AND WARRANTY SHOULD FEEL LIKE:

WARRANTY / AMC
        ↓
COVERAGE CHECK
        ↓
JOB CARD
        ↓
DIAGNOSIS
        ↓
ELIGIBILITY
        ↓
CLAIM
        ↓
APPROVAL
        ↓
COVERED + NON-COVERED ITEMS
        ↓
REPAIR
        ↓
PART RETURN IF REQUIRED
        ↓
COMPLETION
        ↓
HISTORY

ONE CONNECTED PROCESS.

SHARED JOB CARD.

SHARED CUSTOMER.

SHARED VEHICLE.

SHARED INVENTORY.

COMPLETE LIABILITY VISIBILITY.

COMPLETE TRACEABILITY.

MINIMUM NAVIGATION.

NO DUPLICATE ENTRY.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/08_INSURANCE_WARRANTY.md
============================================================