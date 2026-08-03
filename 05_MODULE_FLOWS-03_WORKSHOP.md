# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/03_WORKSHOP.md
# WORKSHOP / JOB CARD — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Workshop manages the COMPLETE vehicle service and repair lifecycle.

The Job Card is the CENTRAL BUSINESS RECORD.

The user must be able to perform almost the entire workshop
operation from ONE Job Card Workspace.

DO NOT create separate operational menus for:

Check-In

Inspection

Estimate

Approval

Bay Assignment

Mechanic Assignment

Voice

Advice

Advice Note

Dents / Damage

Photos

Labour

Spares

Lubes

Outsource

Quality Check

Invoice

Payment

Gate Pass

Delivery

Documents

These are connected parts of ONE Job Card.

============================================================
2. PRIMARY WORKSHOP NAVIGATION
============================================================

WORKSHOP

    Workshop Dashboard

    Job Cards

Operational views such as:

Service Calendar

Vehicle Queue

Bay Board

Technician Board

Service History

should primarily be accessible from Workshop Dashboard and
contextual actions.

Do NOT stretch the main sidebar unnecessarily.

============================================================
3. COMPLETE JOB CARD PROCESS
============================================================

Customer & Vehicle
        ↓
Check-In
        ↓
Inspection
        ↓
Estimate
        ↓
Customer Approval
        ↓
Bay Assignment
        ↓
Mechanic Assignment
        ↓
Repair Process
        ↓
Voice + Parts + Advice + Advice Note
+ Dents / Scratch / Broken + Photos
        ↓
Labour + Spares + Lubes + Outsource Items
        ↓
Total Items
        ↓
Quality Check
        ↓
Invoice
        ↓
Payment
        ↓
Gate Pass
        ↓
Vehicle Delivery
        ↓
Customer Feedback
        ↓
Documents
        ↓
Timeline

THIS PROCESS IS THE PRIMARY WORKSHOP UX.

============================================================
4. JOB CARD CREATION FLOW
============================================================

Workshop
        ↓
Job Cards
        ↓
+ New Job Card
        ↓
Search Customer
        ↓
Select / Quick Add Customer
        ↓
Select / Quick Add Vehicle
        ↓
Enter Complaint & Service Details
        ↓
Check-In
        ↓
Create Job Card
        ↓
Open Job Card Workspace

Known information must carry forward automatically.

Do NOT repeatedly ask for the same Customer or Vehicle data.

============================================================
5. JOB CARD LIST
============================================================

Use:

T02 List Page

Page:

Workshop / Job Cards

Primary Action:

+ New Job Card

Secondary Quick Action:

Quick Check-In

============================================================
6. JOB CARD LIST STATUS COUNTS
============================================================

Recommended compact filters:

All

Waiting

Check-In

Inspection

Estimate

Approval Pending

Repair

On Hold

QC

Ready

Delivered

Closed

Cancelled

Overdue

============================================================
7. JOB CARD LIST FILTERS
============================================================

Search by:

Job Card Number

Customer

Mobile

Vehicle Registration

VIN / Chassis

Invoice Number

Filters:

Status

Service Type

Priority

Advisor

Technician

Supervisor

Bay

Date

Expected Delivery

Payment Status

Branch

============================================================
8. JOB CARD LIST TABLE
============================================================

Recommended columns:

Job Card

Vehicle

Customer

Service Type

Advisor

Technician

Bay

Current Stage

Expected Delivery

Amount

Payment

Priority

Status

Actions

Primary:

Open

Secondary:

More ▼

============================================================
9. JOB CARD WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

The Job Card Workspace is the operational center for:

Service Advisor

Workshop Manager

Technician

Supervisor

Billing User

Cashier

Authorized Admin

Future permissions may change available actions.

Do NOT create different Job Card records for each role.

============================================================
10. JOB CARD WORKSPACE HEADER
============================================================

Example:

JOB CARD #JC-2026-001248

[ REPAIR IN PROGRESS ] [ HIGH PRIORITY ]

Rajesh Sharma

Maruti Suzuki Swift VXI

MH 12 AB 4582

Advisor:
Amit Patil

Technician:
Rahul More

Supervisor:
Suresh Patil

Bay:
B-04

Branch:
Pune Main Branch

Expected Delivery:
28 Jul 2026 • 05:30 PM

Right Actions:

[ Update Status ]

[ More ▼ ]

============================================================
11. JOB CARD HEADER SUMMARY
============================================================

Show compact information:

Odometer

Fuel Level

Estimate

Invoice Amount

Paid

Balance

Technician

Bay

Expected Delivery

Example:

Odometer
42,580 km

Fuel
1/2

Estimate
₹18,750

Paid
₹5,000

Balance
₹13,750

Bay
B-04

============================================================
12. JOB CARD PROCESS PROGRESS
============================================================

Display lifecycle visually.

Example:

Check-In ✓

Inspection ✓

Estimate ✓

Approval ✓

Repair ●

QC ○

Invoice ○

Payment ○

Delivery ○

Do NOT make this a rigid wizard.

Users may move between allowed sections while maintaining
business context.

============================================================
13. JOB CARD WORKSPACE NAVIGATION
============================================================

Recommended workspace navigation:

Overview

Check-In

Inspection

Estimate

Repair

Items

QC

Invoice & Payment

Delivery

Documents

Timeline

This is internal workspace navigation.

It is NOT global sidebar navigation.

============================================================
14. JOB CARD OVERVIEW
============================================================

Overview should answer:

Who is the customer?

Which vehicle?

Why is it here?

What is current status?

Who is responsible?

Which bay?

What is approved?

What work is running?

What is pending?

What is financial status?

What should happen next?

============================================================
15. BASIC INFORMATION
============================================================

Job Card Number

Customer

Vehicle

Complaint

Service Type

Priority

Service Advisor

Expected Delivery

Odometer

Fuel Level

Pickup / Drop

Reference

Tags

Remarks

Branch

Created Date

============================================================
16. CUSTOMER SELECTION
============================================================

Search by:

Customer Name

Mobile

Customer Code

Vehicle Number

When selected show:

Name

Mobile

Outstanding

Vehicles

Last Service

Membership / AMC where applicable

Actions:

Quick View

Open Customer

============================================================
17. QUICK ADD CUSTOMER
============================================================

Use contextual Drawer.

Minimum fields:

Customer Name *

Mobile *

Customer Type

Email

Branch

Address optional

After save:

Automatically select customer.

Return to Job Card creation.

============================================================
18. VEHICLE SELECTION
============================================================

After selecting Customer:

Display Customer Vehicles.

Search/select:

Registration Number

Manufacturer

Model

Variant

VIN

Show:

Last Service

Odometer

Insurance

AMC

Service Due

============================================================
19. QUICK ADD VEHICLE
============================================================

Fields:

Registration Number *

Manufacturer

Model

Variant

Fuel Type

Transmission

Year

Color

VIN / Chassis

Engine Number

Odometer

After save:

Select Vehicle.

Do NOT leave Job Card creation.

============================================================
20. CUSTOMER COMPLAINT
============================================================

Complaint section supports:

Complaint Type

Complaint Description

Customer Voice

Voice Recording / Upload

Notes

Multiple complaints where required

Example:

1. Brake noise

2. AC cooling low

3. Engine vibration

============================================================
21. SERVICE TYPE
============================================================

Possible:

Periodic Service

General Repair

Accidental Repair

Electrical

AC

Body Repair

Tyre

Inspection

Insurance Repair

Warranty

Other

Use configurable master.

============================================================
22. PRIORITY
============================================================

Possible:

Normal

High

Urgent / Emergency

Priority should be visible in:

Job Card Header

Job Card List

Vehicle Queue

Workshop Dashboard

============================================================
23. CHECK-IN
============================================================

CHECK-IN must remain inside Job Card.

Contains:

Accessories Checklist

Fuel Level

Odometer Reading

Vehicle Condition

Photos

Videos

Voice Notes

Customer Signature

Existing Damages

Documents

Pickup Details

Location

Check-In Checklist

Check-In Date

Check-In Time

Received By

============================================================
24. ACCESSORIES CHECKLIST
============================================================

Possible items:

Spare Wheel

Jack

Tool Kit

Stereo

Floor Mats

Wheel Caps

Documents

Key / Spare Key

Other Accessories

Each:

Present / Not Present

Condition

Remarks

============================================================
25. FUEL LEVEL
============================================================

Provide easy visual selector.

Possible:

Empty

1/4

1/2

3/4

Full

Store/display selected value.

============================================================
26. ODOMETER
============================================================

Input:

Current Odometer

Unit:

km

Validation:

Should be numeric.

Where previous reading exists:

Display previous reading for reference.

============================================================
27. VEHICLE CONDITION
============================================================

Record general condition:

Exterior

Interior

Tyres

Glass

Lights

Mirrors

Other observations

Detailed damage marking belongs to damage/dent interface.

============================================================
28. CHECK-IN MEDIA
============================================================

Support:

Photos

Videos

Voice Notes

Each media item should display:

Preview

Type

Uploaded By

Date / Time

Category

Remarks where applicable

============================================================
29. CUSTOMER SIGNATURE
============================================================

Provide frontend signature pad UI.

Actions:

Clear

Save Signature

No backend storage required.

============================================================
30. PICKUP / DROP
============================================================

Possible:

Customer Drop

Pickup Required

Customer Pickup

Drop Required

Pickup & Drop

Where pickup required show:

Address

Contact

Date

Time

Driver

Notes

Exact logistics rules may be expanded later.

============================================================
31. CHECK-IN COMPLETE
============================================================

After required information:

[ Complete Check-In ]

Update progress:

Check-In ✓

Current Stage:

Inspection

Timeline:

Vehicle Checked-In

============================================================
32. INSPECTION
============================================================

Inspection stays inside Job Card.

Contains:

Inspection Checklist

Dent Mapping

Scratch Mapping

Broken / Damage Mapping

Tyre Inspection

Battery Inspection

Engine Inspection

Brake Inspection

Suspension

Electrical Check

AC Check

Photos

Videos

Voice Notes

Recommendations

Estimated Cost Preparation

============================================================
33. INSPECTION CHECKLIST
============================================================

Each inspection item may support:

OK

Attention Required

Critical

Not Applicable

Remarks

Photo

Advice

============================================================
34. INSPECTION CATEGORIES
============================================================

Possible:

Engine

Transmission

Brakes

Suspension

Steering

Electrical

Battery

AC

Tyres

Exterior

Interior

Fluids

Lights

Wipers

Exhaust

Other

Use configurable checklist.

============================================================
35. DENT / DAMAGE MAPPING
============================================================

CRITICAL UI COMPONENT.

Provide vehicle diagram / image.

Tools:

Dent

Scratch

Broken

Erase

Erase All

User selects:

Damage Type
        ↓
Clicks / marks vehicle diagram
        ↓
Marker appears
        ↓
Optional Note / Photo

============================================================
36. DAMAGE TYPES
============================================================

Required:

Dent

Scratch

Broken

Possible future:

Crack

Paint Damage

Rust

Other

Current frontend must prominently support:

Dent

Scratch

Broken

============================================================
37. DAMAGE TOOLBAR
============================================================

Example:

[ Dent ]

[ Scratch ]

[ Broken ]

[ Erase ]

[ Erase All ]

Selecting tool changes active mode.

Do NOT navigate away from Inspection.

============================================================
38. DAMAGE MARKER DETAILS
============================================================

Click existing marker:

Show:

Damage Type

Vehicle Area

Severity where applicable

Description

Photo

Created By

Actions:

Edit

Delete

============================================================
39. INSPECTION PHOTOS
============================================================

Support:

Select Existing Photo

Upload / Add Photo

Category

Caption

Damage Link where applicable

Allow multiple photos.

============================================================
40. INSPECTION VOICE
============================================================

Support:

Voice Note

Record / Upload UI

Title

Duration

Remarks

Created By

Date / Time

Voice may capture technician/advisor observations.

============================================================
41. INSPECTION ADVICE
============================================================

Inspection may generate Advice.

Advice contains:

Advice Item

Description

Priority

Recommended Action

Estimated Cost where available

Customer Decision later where applicable

============================================================
42. INSPECTION RECOMMENDATION
============================================================

Recommendations may become:

Estimate Item

Advice Only

Future Service Recommendation

Immediate Repair Recommendation

Do NOT require duplicate manual typing when converting
recommendation to estimate item.

============================================================
43. INSPECTION COMPLETE
============================================================

Action:

Complete Inspection

Then:

Inspection ✓

Next:

Prepare Estimate

Timeline:

Inspection Completed

============================================================
44. ESTIMATE
============================================================

Estimate is part of Job Card.

Contains:

Service Packages

Labour

Spares

Lubricants

Outside / Outsource Jobs

Discount

Tax

Totals

Notes

Terms

Revision History

Approval Status

============================================================
45. ESTIMATE ITEM GRID
============================================================

Use reusable:

C06 Item Entry Grid

Columns:

Type

Item

Description

Qty

Rate

Discount

Tax

Amount

Action

Types:

Labour

Spare

Lube

Outsource

Service Package where applicable

============================================================
46. ESTIMATE ITEM SOURCES
============================================================

Items may be added from:

Inspection Recommendation

Service Package

Manual Search

Product Search

Labour Master

Lube Search

Outsource Item

Additional Advice

Avoid retyping existing inspection information.

============================================================
47. LABOUR ESTIMATE ITEM
============================================================

Possible fields:

Labour

Description

Estimated Hours

Rate

Quantity where applicable

Discount

Tax

Amount

Technician may remain unassigned during estimate.

============================================================
48. SPARE ESTIMATE ITEM
============================================================

Possible:

Part

Part Number

Description

Stock Availability

Qty

Rate

Discount

Tax

Amount

Alternative Part

============================================================
49. LUBE ESTIMATE ITEM
============================================================

Possible:

Lubricant

Grade

Unit

Quantity

Rate

Discount

Tax

Amount

============================================================
50. OUTSOURCE ESTIMATE ITEM
============================================================

Possible:

Outsource Job

Description

Vendor optional during estimate

Qty

Customer Rate

Tax

Amount

Vendor Cost may remain internal.

============================================================
51. ESTIMATE TOTALS
============================================================

Display:

Labour Total

Spares Total

Lubes Total

Outsource Total

Subtotal

Discount

Tax

Round Off where applicable

Final Estimate

============================================================
52. ESTIMATE REVISION
============================================================

Estimate should support revisions.

Example:

Revision 1

Revision 2

Revision 3

Each should maintain:

Date

Amount

Reason

Created By

Approval Status

Do NOT overwrite previous approved/sent estimate history.

============================================================
53. SEND ESTIMATE
============================================================

Actions:

Preview

Print

WhatsApp

Email

Send for Approval

Frontend communication simulation only.

============================================================
54. CUSTOMER APPROVAL
============================================================

Approval methods:

OTP Approval

WhatsApp Approval

Email Approval

Manual / Signature Approval where permitted

Display:

Approval Status

Sent Date

Approved / Rejected Date

Method

Approved By

Remarks

============================================================
55. APPROVAL STATUS
============================================================

Possible:

Draft

Not Sent

Sent

Viewed where supported later

Pending

Approved

Partially Approved where business flow requires

Rejected

Revision Requested

Expired where applicable

============================================================
56. APPROVAL PANEL
============================================================

Use:

C07 Approval Panel

Show:

Estimate Amount

Revision

Customer

Mobile

Approval Method

Status

Sent Time

Reminder

Approval History

============================================================
57. PARTIAL ESTIMATE APPROVAL
============================================================

Where allowed:

Customer may approve selected work/items.

Item states:

Approved

Rejected

Pending

Estimate summary should distinguish:

Approved Amount

Rejected Amount

Pending Amount

Repair should use approved items only.

============================================================
58. REJECTED ESTIMATE
============================================================

Capture:

Reason

Remarks

Next Action

Possible:

Revise Estimate

Close Job

Advice Only

Customer Declined Repair

Maintain history.

============================================================
59. APPROVAL COMPLETE
============================================================

When required estimate approval is received:

Estimate ✓

Approval ✓

Allow:

Bay Assignment

Mechanic Assignment

Repair Start

============================================================
60. BAY ASSIGNMENT
============================================================

Bay assignment remains inside Job Card.

Use:

C01 Drawer

Show:

Available Bays

Occupied Bays

Maintenance Bays

Current Queue

Estimated Release

============================================================
61. ASSIGN BAY DRAWER
============================================================

Example:

ASSIGN BAY

Job Card:
JC-2026-001248

Vehicle:
MH 12 AB 4582

Current Status:
Waiting for Bay

Bay *

B-04 — Available

Expected Start

Expected Completion

Notes

              Cancel     Assign Bay

============================================================
62. BAY SHIFT
============================================================

Support:

Change / Shift Bay

Capture:

Old Bay

New Bay

Reason

Changed By

Time

Timeline entry required.

============================================================
63. BAY RELEASE
============================================================

When work leaves bay:

Release Bay

Update Bay Board.

Do not require user to navigate to Bay Board.

============================================================
64. MECHANIC ASSIGNMENT
============================================================

Mechanic Assignment remains inside Job Card.

Support:

Assign Technician

Assign Supervisor

Multiple Technicians where required

Job Allocation

Expected Completion

============================================================
65. ASSIGN TECHNICIAN DRAWER
============================================================

Display technicians with:

Name

Availability

Current Job

Active Jobs

Workload

Skill where available

Expected Availability

Allow:

Primary Technician

Supporting Technician(s)

Supervisor

============================================================
66. TECHNICIAN ASSIGNMENT HISTORY
============================================================

Maintain:

Technician

Assigned By

Assigned Date / Time

Removed / Changed Date

Reason

Work Duration where applicable

============================================================
67. REPAIR PROCESS
============================================================

Repair is the ACTIVE WORK AREA.

Contains:

Repair Tasks

Work Progress

Voice

Parts Advice

Advice

Advice Note

Dents / Damage

Photos

Internal Notes

Additional Work

Item Consumption

Technician Activity

============================================================
68. REPAIR STATUS
============================================================

Possible:

Not Started

Ready to Start

In Progress

Paused

On Hold

Waiting for Parts

Waiting for Approval

Waiting for Outside Job

Completed

Sent to QC

============================================================
69. REPAIR ACTIONS
============================================================

Possible:

Start Work

Pause

Resume

Hold

Complete Work

Add Task

Add Advice

Add Voice

Add Photo

Add Item

Request Additional Approval

============================================================
70. START WORK
============================================================

On Start:

Record:

Started By

Date

Time

Technician

Bay

Update:

Repair = In Progress

Timeline entry:

Repair Started

============================================================
71. PAUSE WORK
============================================================

Capture:

Pause Reason

Notes

Expected Resume

Possible reasons:

Tea / Lunch Break

Waiting for Part

Waiting for Approval

Other Job Priority

Technical Assistance

Other

============================================================
72. HOLD JOB
============================================================

Hold requires:

Hold Reason

Remarks

Expected Resolution

Responsible Person where applicable

Possible:

Customer Approval

Part Unavailable

Insurance Approval

Vendor / Outsource

Technical Issue

Payment / Commercial Hold

Other

============================================================
73. REPAIR TASKS
============================================================

Each task may contain:

Task

Description

Assigned Technician

Status

Start Time

End Time

Duration

Notes

Related Item

Photos

Voice

============================================================
74. REPAIR TASK STATUS
============================================================

Possible:

Pending

In Progress

Paused

Completed

Skipped

Blocked

============================================================
75. VOICE
============================================================

VOICE is part of the Job Card Repair Process.

Support:

Record Voice

Upload Voice

Playback

Title

Category

Duration

Created By

Date / Time

Remarks

Possible categories:

Customer Complaint

Inspection

Mechanic Observation

Repair Update

Advice

QC

Other

============================================================
76. PARTS ADVICE
============================================================

Repair user may identify a required/recommended part.

Parts Advice contains:

Part

Part Number

Reason

Required Quantity

Urgency

Stock Availability

Recommended Action

Photo

Voice

Remarks

============================================================
77. PARTS ADVICE ACTIONS
============================================================

Possible:

Add to Estimate

Add to Additional Estimate

Add to Job Items

Mark Advice Only

Search Alternative Part

Check Stock

Do NOT force retyping part information.

============================================================
78. ADVICE
============================================================

Advice is a structured recommendation generated during service.

Fields:

Advice Type

Title

Description

Priority

Recommended Action

Related Vehicle Area

Related Part

Estimated Amount where applicable

Photo

Voice

Customer Decision

============================================================
79. ADVICE TYPE
============================================================

Possible:

Immediate Repair

Part Replacement

Safety

Preventive Maintenance

Future Service

Customer Information

Other

============================================================
80. ADVICE NOTE
============================================================

Advice Note provides written service recommendation.

Support:

Title

Advice Text

Priority

Related Repair / Inspection

Customer Visible

Internal Only where applicable

Follow-Up Date

Attachment

============================================================
81. ADVICE STATUS
============================================================

Possible:

New

Discussed

Accepted

Declined

Deferred

Converted to Work

Future Service

============================================================
82. ADDITIONAL WORK
============================================================

During repair:

New issue found
        ↓
Create Advice / Additional Work
        ↓
Add Required Labour / Spare / Lube / Outsource
        ↓
Prepare Additional Estimate
        ↓
Send Customer
        ↓
Approval
        ↓
Continue Work

Do NOT silently add chargeable work without approval where
approval is required.

============================================================
83. ADDITIONAL ESTIMATE
============================================================

Must show:

Original Approved Amount

Additional Amount

Revised Total

New Items

Reason

Approval Status

Approval Method

History

============================================================
84. REPAIR DAMAGE / DENT VIEW
============================================================

Damage map must remain accessible during repair.

Technician can view existing:

Dent

Scratch

Broken

Photos

Where permitted:

Add newly discovered damage.

Maintain source:

Check-In

Inspection

Repair

============================================================
85. DAMAGE ERASE
============================================================

Required tools:

Erase

Erase All

Erase All must show confirmation:

REMOVE ALL DAMAGE MARKINGS?

This removes current editable markings from the active map.

Cancel

Erase All

============================================================
86. REPAIR PHOTOS
============================================================

Support categories:

Before Repair

During Repair

After Repair

Part Condition

Damage

Replacement

Evidence

Other

Allow:

Select

Add

Preview

Caption

Link to task/advice

============================================================
87. ITEMS WORKSPACE
============================================================

CRITICAL SECTION.

The Job Card must provide ONE unified Items area containing:

Labour

Spares

Lubes

Outsource

Total Items

Do NOT make users navigate to separate modules for normal Job
Card item management.

============================================================
88. ITEMS NAVIGATION
============================================================

Recommended:

All Items

Labour

Spares

Lubes

Outsource

Summary

These are filters/tabs within the Job Card Items section.

============================================================
89. UNIFIED ITEM GRID
============================================================

Columns:

Type

Item

Description

Qty

Rate

Discount

Tax

Total

Status

Action

Every item must clearly show its category.

============================================================
90. ITEM TYPES
============================================================

LABOUR

SPARE

LUBE

OUTSOURCE

Each item uses relevant fields while sharing common financial
structure.

============================================================
91. LABOUR
============================================================

Labour item may contain:

Labour Item

Description

Technician

Hours

Quantity where applicable

Rate

Discount

Tax

Amount

Additional Labour

Warranty Labour

Internal Labour

Status

============================================================
92. LABOUR TYPES
============================================================

Possible:

Normal Labour

Additional Labour

Warranty Labour

Internal Labour

Free Labour / Package Labour where applicable

Financial treatment may differ later.

Frontend should clearly represent type.

============================================================
93. ADD LABOUR
============================================================

Use Drawer.

Fields:

Labour *

Description

Technician

Hours / Qty

Rate

Discount

Tax

Amount

Type

Notes

Actions:

Cancel

Add Labour

============================================================
94. SPARES
============================================================

Spare item supports:

Part

Part Number

Barcode

Stock Availability

Reserved Qty

Issued Qty

Returned Qty

Consumed Qty

Quantity

Rate

Discount

Tax

Amount

Alternative Part

Status

============================================================
95. ADD SPARE
============================================================

Search by:

Part Name

Part Number

Barcode

Show:

Current Stock

Available

Reserved

Selling Rate

Location

Alternative Parts

Input:

Qty

Rate

Discount

Tax

============================================================
96. SPARE STOCK PROCESS
============================================================

Approved / Required Part
        ↓
Reserve Part where applicable
        ↓
Issue Part
        ↓
Use / Consume
        ↓
Return Unused Qty if applicable
        ↓
Final Consumed Quantity
        ↓
Invoice

Inventory receives corresponding stock transactions.

============================================================
97. SPARE STATUS
============================================================

Possible:

Requested

Reserved

Issued

Partially Issued

Consumed

Returned

Unavailable

Alternative Suggested

============================================================
98. BARCODE SCAN
============================================================

Job Card spare entry should support Barcode Scan UI.

Frontend demonstration:

Scan / Enter Barcode
        ↓
Find Product
        ↓
Show Stock
        ↓
Enter Qty
        ↓
Add Item

No hardware integration required.

============================================================
99. ALTERNATIVE PART
============================================================

When original part unavailable:

Show alternative parts.

Display:

Part

Brand

Compatibility

Stock

Price

User may:

Select Alternative

Return to original

============================================================
100. LUBES
============================================================

Lube item may include:

Engine Oil

Gear Oil

Brake Oil

Coolant

Grease

Other Fluids

Fields:

Lube

Grade

Unit

Quantity

Rate

Discount

Tax

Amount

Technician where useful

============================================================
101. ADD LUBE
============================================================

Use Drawer.

Fields:

Lubricant *

Grade

Unit

Quantity *

Rate *

Discount

Tax

Total

Notes

============================================================
102. OUTSOURCE ITEM
============================================================

Outsource item supports:

Vendor

Job Type

Description

Quantity

Customer Rate

Vendor Cost

Discount

Tax

Customer Amount

Vendor Invoice

Status

Attachments

Remarks

============================================================
103. OUTSOURCE STATUS
============================================================

Possible:

Requested

Sent to Vendor

In Progress

Received

Completed

Cancelled

Vendor Invoice Pending

============================================================
104. ADD OUTSOURCE
============================================================

Use Drawer.

Fields:

Job Type *

Vendor

Description

Qty

Customer Rate

Vendor Cost

Tax

Expected Return

Remarks

Attachment

============================================================
105. TOTAL ITEMS
============================================================

Job Card must show consolidated item summary.

Example:

Labour
₹4,500

Spares
₹9,200

Lubes
₹2,100

Outsource
₹1,500

Subtotal
₹17,300

Discount
₹500

Tax
₹1,950

Grand Total
₹18,750

============================================================
106. ESTIMATE VS ACTUAL ITEMS
============================================================

System UI should distinguish:

Estimated

Approved

Actual / Consumed

Invoiced

Example:

Front Brake Pad Set

Estimated Qty:
1

Approved Qty:
1

Consumed Qty:
1

Invoice Qty:
1

This is critical for workshop control.

============================================================
107. ITEM SOURCE
============================================================

Each item should retain source where useful:

Original Estimate

Additional Estimate

Inspection Advice

Repair Advice

Manual Addition

Warranty

Service Package

============================================================
108. ITEM ACTIONS
============================================================

Possible:

Edit

Reserve

Issue

Return

Replace

Remove

View History

Add Note

Actions depend on item type and status.

============================================================
109. ITEM REMOVAL
============================================================

If an item has stock/financial impact:

Do NOT silently delete.

Use appropriate action:

Cancel Item

Return Item

Remove Before Issue

Credit / Adjustment later where invoiced

Frontend should represent lifecycle correctly.

============================================================
110. REPAIR COMPLETION
============================================================

Before Complete Repair:

Check:

Required Tasks

Approved Work

Parts Status

Outsource Status

Technician Notes

Repair Evidence

Pending Advice

Then:

Complete Work

============================================================
111. MECHANIC SHEET
============================================================

Job Card should generate Mechanic Sheet preview/PDF.

Mechanic Sheet may contain:

Job Card

Vehicle

Customer Complaint

Inspection Findings

Assigned Technician

Supervisor

Repair Tasks

Labour

Spares

Lubes

Outsource

Advice

Voice reference where applicable

Start / End Time

Work Notes

Technician Signature

Supervisor Signature

============================================================
112. QUALITY CHECK
============================================================

QC remains inside Job Card.

Contains:

QC Checklist

Road Test

Supervisor Approval

Photos

Videos

Voice Notes

Remarks

QC Status

Failed Items

Rework

============================================================
113. QC CHECKLIST
============================================================

Possible:

Customer Complaint Resolved

Approved Work Completed

Parts Verified

Fluid Levels

Leak Check

Electrical Check

Warning Lights

Tyre Check

Brake Check

AC Check

Interior Cleanliness

Exterior Condition

Accessories Verified

Road Test

Document Check

============================================================
114. QC ITEM STATUS
============================================================

Each:

Pass

Fail

Not Applicable

Remarks

Photo where required

============================================================
115. ROAD TEST
============================================================

Fields:

Required

Performed By

Start Odometer

End Odometer

Distance

Result

Remarks

Date / Time

============================================================
116. QC STATUS
============================================================

Possible:

Pending

In Progress

Passed

Failed

Rework Required

Recheck

Approved

============================================================
117. QC FAILURE
============================================================

QC Failed
        ↓
Record Failed Item
        ↓
Reason
        ↓
Assign Rework
        ↓
Repair
        ↓
Return to QC
        ↓
Recheck

Maintain complete history.

============================================================
118. REWORK
============================================================

Rework should capture:

Issue

Related Task

Technician

Reason

Start

Complete

Notes

Photos

QC Recheck

Do NOT create a completely separate Job Card for normal rework.

============================================================
119. SUPERVISOR APPROVAL
============================================================

After QC completion:

Supervisor

Approval

Remarks

Signature where required

Date / Time

Then:

Vehicle Ready

============================================================
120. VEHICLE READY
============================================================

After successful QC:

Status:

READY FOR BILLING / DELIVERY

depending invoice state.

Show:

Repair Complete

QC Passed

Invoice Status

Payment Status

Gate Pass Status

Expected Delivery

============================================================
121. INVOICE
============================================================

Invoice remains directly connected to Job Card.

Invoice uses finalized billable items.

Contains:

Labour Summary

Spares Summary

Lubricants Summary

Outsource Charges

Other Approved Charges where applicable

Discount

Tax

Round Off

Grand Total

============================================================
122. INVOICE CREATION
============================================================

Flow:

Approved / Actual Items
        ↓
Review Billable Items
        ↓
Apply Allowed Discount
        ↓
Calculate Tax
        ↓
Round Off
        ↓
Preview
        ↓
Generate Invoice

============================================================
123. INVOICE ITEM REVIEW
============================================================

Before generation compare:

Estimate

Approved

Actual

Invoice

Flag discrepancies.

Example:

Estimated:
₹18,750

Approved:
₹18,750

Actual:
₹19,250

Difference:
₹500

Require appropriate reason/approval where configured later.

============================================================
124. INVOICE SUMMARY
============================================================

Show:

Labour

Spares

Lubes

Outsource

Subtotal

Discount

Tax

Round Off

Invoice Total

Paid

Balance

============================================================
125. INVOICE ACTIONS
============================================================

Preview

Generate

Print

Download PDF

WhatsApp

Email

View History

Cancel / Credit flow only where allowed later

============================================================
126. INVOICE PDF
============================================================

Use:

T11 Print / Document Preview

Include:

Garage Details

Invoice Number

Job Card

Customer

Vehicle

Items

Taxes

Totals

Payment Summary

Terms

Signature

============================================================
127. PAYMENT
============================================================

Payment is available within Job Card Invoice & Payment section.

Support:

Advance Payment

Partial Payment

Full Payment

Refund where applicable

Outstanding

Transaction History

============================================================
128. PAYMENT TYPES
============================================================

Required:

Advance

Partial

Full

Refund

Adjustment where later applicable

============================================================
129. PAYMENT MODES
============================================================

Required UI options:

Cash

Card

UPI

Bank Transfer

Cheque

Credit

Wallet

Exact availability may later depend on configuration.

============================================================
130. RECEIVE PAYMENT
============================================================

Use contextual Drawer / Modal.

Show:

Invoice Total

Already Paid

Outstanding

Payment Type

Amount

Payment Mode

Reference Number

Transaction Date

Notes

============================================================
131. PARTIAL PAYMENT
============================================================

Example:

Invoice Total:
₹18,750

Already Paid:
₹5,000

Outstanding:
₹13,750

Current Payment:
₹8,000

Remaining:
₹5,750

After save:

Transaction History updates.

Outstanding updates.

============================================================
132. FULL PAYMENT
============================================================

When outstanding amount is fully received:

Payment Status:

PAID

Show:

Paid Amount

Payment Date

Payment Mode(s)

Receipt

============================================================
133. CREDIT
============================================================

Where customer is allowed credit:

Show:

Credit Limit

Available Credit

Current Outstanding

Requested Credit Amount

Due Date

Credit Terms

Actual accounting/approval rules belong to Finance.

============================================================
134. TRANSACTION HISTORY
============================================================

Display:

Date

Transaction ID

Type

Mode

Amount

Reference

Received By

Status

Receipt

Example:

28 Jul 2026

TXN-001548

Partial Payment

UPI

₹5,000

UTR458921

Priya Shah

Completed

============================================================
135. PAYMENT RECEIPT
============================================================

Actions:

Preview

Print

Download PDF

WhatsApp

Email

Receipt should reference:

Customer

Vehicle

Job Card

Invoice

Transaction

============================================================
136. REFUND
============================================================

Where applicable:

Refund Amount

Original Transaction

Reason

Mode

Reference

Approval Status where required

Refund History

Do NOT simply delete original payment.

============================================================
137. GATE PASS
============================================================

Gate Pass remains connected to Job Card.

Prerequisites may visually show:

Repair Complete

QC Passed

Invoice Generated

Payment Condition Satisfied

Vehicle Ready

============================================================
138. GATE PASS INFORMATION
============================================================

Contains:

Gate Pass Number

Job Card

Vehicle

Customer

Invoice

Payment Status

Accessories Verification

Customer OTP

Customer Signature

Authorized By

Date / Time

============================================================
139. ACCESSORIES VERIFICATION
============================================================

Compare check-in accessories.

Example:

Spare Wheel
Received ✓
Handover ✓

Jack
Received ✓
Handover ✓

Tool Kit
Received ✓
Handover ✓

Flag mismatch before delivery.

============================================================
140. CUSTOMER OTP
============================================================

Provide frontend OTP verification UI.

Actions:

Send OTP

Enter OTP

Verify

Resend

Frontend simulation only.

============================================================
141. GATE PASS PDF
============================================================

Generate preview with:

Gate Pass Number

Vehicle

Customer

Job Card

Invoice

Payment Status

Accessories

Authorization

Customer Signature

Date / Time

============================================================
142. VEHICLE DELIVERY
============================================================

Delivery is final operational handover.

Contains:

Vehicle Handover

Delivery Checklist

Accessories Handover

Documents Handover

Invoice Handover

Customer Signature

Delivery Date / Time

Delivered By

Customer Feedback

============================================================
143. DELIVERY CHECKLIST
============================================================

Possible:

Vehicle Clean

Repair Explained

Replaced Parts Explained

Accessories Verified

Invoice Shared

Payment Confirmed

Service Advice Explained

Next Service Explained

Documents Shared

Keys Handed Over

Customer Signature

============================================================
144. DELIVERY BLOCKERS
============================================================

Clearly show unresolved conditions:

QC Pending

Invoice Pending

Payment Condition Pending

Gate Pass Pending

Accessories Mismatch

Approval Pending

Manager Override may be prepared for future permissions.

============================================================
145. COMPLETE DELIVERY
============================================================

After checklist:

Customer OTP / Signature where required

        ↓
Complete Delivery

        ↓
Job Status:
Delivered

        ↓
Bay Released if still assigned

        ↓
Customer History Updated

        ↓
Feedback Request

        ↓
Next Service Reminder

============================================================
146. CUSTOMER FEEDBACK
============================================================

Feedback may contain:

Overall Rating

Service Quality

Advisor Experience

Repair Quality

Timeliness

Cleanliness

Comments

Would Recommend

Complaint / Escalation where applicable

============================================================
147. LOW RATING
============================================================

Low rating should create visible attention state.

Example:

2 / 5

Customer reported AC issue still present.

Action:

Review Feedback

Open Job Card

Create Follow-Up

No automated backend required.

============================================================
148. NEXT SERVICE REMINDER
============================================================

After delivery prepare:

Next Service Date

Next Service Odometer

Reminder Type

Customer Communication Preference

Notes

Reminder should connect to:

Customer

Vehicle

CRM / Dashboard

============================================================
149. DOCUMENTS
============================================================

Job Card Documents should provide ONE consolidated document
area.

Required generated documents:

Job Card PDF

Estimate PDF

Inspection Report

Mechanic Sheet

Invoice PDF

Payment Receipt(s)

Gate Pass PDF

============================================================
150. DOCUMENT ATTACHMENTS
============================================================

Also support:

Customer Documents

Vehicle Documents

Photos

Videos

Voice Notes

Vendor Documents

Insurance Documents where related

Other Attachments

============================================================
151. DOCUMENT CATEGORIES
============================================================

Possible:

Check-In

Inspection

Estimate

Approval

Repair

QC

Invoice

Payment

Gate Pass

Delivery

Insurance

Vendor

Other

============================================================
152. DOCUMENT ACTIONS
============================================================

Preview

Print

Download

WhatsApp

Email

Rename where allowed

Delete attachment where allowed

Generated transactional documents should not be casually
deleted.

============================================================
153. TIMELINE
============================================================

Timeline is the COMPLETE chronological history of Job Card.

Possible events:

Job Card Created

Vehicle Checked-In

Inspection Started

Inspection Completed

Estimate Created

Estimate Sent

Estimate Approved

Bay Assigned

Technician Assigned

Repair Started

Work Paused

Work Resumed

Advice Added

Additional Estimate Sent

Additional Work Approved

Part Reserved

Part Issued

Part Returned

Labour Added

Lube Added

Outsource Sent

Repair Completed

QC Started

QC Failed

Rework Started

QC Passed

Invoice Generated

Payment Received

Gate Pass Generated

Vehicle Delivered

Feedback Received

============================================================
154. TIMELINE ITEM
============================================================

Display:

Date / Time

Event

User

Description

Related Action / Record

Example:

28 Jul 2026 • 03:42 PM

Part Issued

Front Brake Pad Set × 1

Issued by:
Ramesh Kumar

To:
Rahul More

============================================================
155. STATUS HISTORY
============================================================

Maintain:

Old Status

New Status

Changed By

Date / Time

Reason

============================================================
156. APPROVAL HISTORY
============================================================

Maintain:

Approval Type

Revision

Sent To

Method

Sent Date

Decision

Decision Date

Remarks

============================================================
157. COMMUNICATION HISTORY
============================================================

Show related:

Calls

WhatsApp

SMS

Email

Approval Communication

Vehicle Ready Notification

Payment Reminder

Feedback Request

============================================================
158. USER LOGS
============================================================

Workspace Timeline:

Business-friendly events.

Administration Audit Log:

Detailed system-level changes.

Do NOT overload Job Card Timeline with every minor technical
event.

============================================================
159. JOB CARD STATUS LIFECYCLE
============================================================

Recommended high-level statuses:

Draft

Waiting

Checked-In

Inspection

Estimate Preparation

Approval Pending

Approved

Waiting for Bay

Repair In Progress

Paused

On Hold

Waiting for Parts

Waiting for Approval

Waiting for Outsource

Repair Completed

QC

Rework

Ready

Invoiced

Partially Paid

Paid

Gate Pass Generated

Delivered

Closed

Cancelled

============================================================
160. STATUS VS PROCESS STAGE
============================================================

Do NOT treat them as identical.

Example:

Process Stage:
Repair

Operational Status:
Waiting for Parts

Process Stage:
Invoice & Payment

Payment Status:
Partially Paid

This distinction improves clarity.

============================================================
161. PAYMENT STATUS
============================================================

Possible:

Not Invoiced

Unpaid

Partially Paid

Paid

Credit

Overdue

Refunded / Partially Refunded where applicable

============================================================
162. JOB CARD CANCELLATION
============================================================

Cancel Job Card action requires:

Reason

Remarks

Current Stage

Stock Impact Warning

Payment Impact Warning

Invoice Impact Warning

Confirmation

Do NOT silently cancel.

============================================================
163. CANCELLATION RESTRICTIONS
============================================================

Frontend should visually warn if:

Parts already issued

Payment received

Invoice generated

Outsource running

Vehicle under repair

Actual backend rules will be implemented later.

============================================================
164. DUPLICATE JOB CARD
============================================================

Where useful:

Duplicate Job Card

Carry forward appropriate:

Customer

Vehicle

Service Type

Selected Complaint / Items where chosen

Do NOT copy:

Payments

Invoice

Approval

Timeline

Issued Stock

Gate Pass

============================================================
165. QUICK ACTIONS
============================================================

Context-dependent quick actions may include:

Save

Update

Assign Bay

Assign Technician

Add Advice

Add Item

Approve / Send Estimate

Start Work

Complete Work

Send to QC

Generate Invoice

Receive Payment

Generate Gate Pass

Complete Delivery

Print PDF

WhatsApp Customer

Email Customer

============================================================
166. MORE ACTIONS
============================================================

Possible:

Change Advisor

Change Technician

Shift Bay

Add Note

Upload Document

Duplicate Job Card

Print Mechanic Sheet

View Service History

Cancel Job Card

Actions must depend on current state.

============================================================
167. WORKSHOP DASHBOARD
============================================================

Workshop Dashboard should provide operational visibility.

Widgets:

Today's Appointments

Waiting Vehicles

Running Jobs

Approval Pending

Bay Status

Technician Workload

Waiting for Parts

QC Pending

Ready for Delivery

Overdue Jobs

Expected Deliveries

============================================================
168. SERVICE CALENDAR
============================================================

PROCESS:

View Schedule
        ↓
Appointments
        ↓
Check-In
        ↓
Running Jobs
        ↓
Expected Delivery
        ↓
Completed Jobs

Views:

Daily

Weekly

Monthly

============================================================
169. SERVICE CALENDAR CONTENT
============================================================

Contains:

Appointment Schedule

Technician Schedule

Bay Schedule

Expected Delivery

Holiday View

Filters

Click appointment/job:

Open related record.

============================================================
170. VEHICLE QUEUE
============================================================

PROCESS:

Vehicle Arrival
        ↓
Waiting
        ↓
Check-In
        ↓
Inspection
        ↓
Repair
        ↓
QC
        ↓
Ready
        ↓
Delivered

============================================================
171. VEHICLE QUEUE CONTENT
============================================================

Waiting Queue

Running Queue

Priority Queue

Emergency Queue

Delivery Queue

Status Board

Each vehicle card should show:

Vehicle

Job Card

Customer

Priority

Current Stage

Waiting Time

Assigned Technician

============================================================
172. BAY BOARD
============================================================

PROCESS:

View Bay Status
        ↓
Assign Vehicle
        ↓
Track Progress
        ↓
Release Bay

Contains:

Available Bays

Occupied Bays

Maintenance Bays

Technician Allocation

Current Vehicle

Estimated Completion

============================================================
173. TECHNICIAN BOARD
============================================================

PROCESS:

Assign Job
        ↓
Track Progress
        ↓
Complete Work
        ↓
Performance Update

Contains:

Technician Workload

Assigned Jobs

Completed Jobs

Pending Jobs

Efficiency

Attendance Context

Performance

============================================================
174. SERVICE HISTORY
============================================================

PROCESS:

Select Customer
        ↓
Select Vehicle
        ↓
View Complete History

Contains:

Previous Job Cards

Invoices

Payments

Parts Used

Labour History

Lubricants

Outsource

Warranty

Insurance

Recommendations

Documents

============================================================
175. JOB CARD + INVENTORY
============================================================

Workshop user:

Adds / Requests Part
        ↓
Reserve / Issue
        ↓
Consume / Return

Inventory:

Receives corresponding stock movement.

Workshop user should NOT leave Job Card for routine parts
consumption.

============================================================
176. JOB CARD + CRM
============================================================

CRM / Appointment
        ↓
Customer
        ↓
Vehicle
        ↓
Job Card

Job Card should carry forward known information.

After delivery:

Service History

Feedback

Next Service Reminder

return to Customer relationship context.

============================================================
177. JOB CARD + INSURANCE
============================================================

Insurance Repair:

Job Card
        ↔
Insurance Claim

Show:

Claim Number

Insurance Company

Survey Status

Approval

Customer Liability

Insurance Liability

Do NOT duplicate repair information.

============================================================
178. JOB CARD + WARRANTY
============================================================

Warranty Job may show:

Warranty Type

Covered Item

Approval

Customer Charge

Warranty Charge

Parts

Labour

Claim Reference

============================================================
179. JOB CARD + FINANCE
============================================================

Invoice
        ↓
Receivable
        ↓
Payment
        ↓
Finance Transaction

Job Card displays payment context.

Finance remains accounting source.

============================================================
180. JOB CARD + HRM
============================================================

Service Advisor

Technician

Supervisor

are references to Employee records.

Do NOT create duplicate mechanic records.

============================================================
181. BRANCH AWARENESS
============================================================

Every Job Card belongs to a Branch.

Branch affects:

Bays

Technicians

Inventory

Service Advisor

Invoice Context

Document Numbering

Operational Boards

Reports

============================================================
182. MULTI-BRANCH CUSTOMER
============================================================

Customer may be shared organization-wide.

Job Card remains branch-specific.

Service History should show transaction branch.

============================================================
183. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Create Job Card

Customer Search

Quick Add Customer

Vehicle Search

Quick Add Vehicle

Check-In Checklist

Fuel Selector

Odometer

Media Add

Signature Pad

Inspection Checklist

Dent/Scratch/Broken Mapping

Erase

Erase All

Photos

Voice

Estimate Item Addition

Estimate Calculation

Approval UI

Assign Bay

Assign Technician

Start/Pause/Resume/Hold Work

Advice

Advice Note

Parts Advice

Additional Estimate

Unified Items

Labour Add

Spare Add

Lube Add

Outsource Add

Qty / Price Calculation

Part Issue / Return UI

QC

QC Failure / Rework

Invoice Preview

Payment

Partial Payment

Transaction History

Gate Pass

OTP UI

Delivery Checklist

Feedback

Documents

Timeline

No API/backend required.

============================================================
184. RECOMMENDED FRONTEND FILES
============================================================

workshop-dashboard.html

job-cards.html

job-card-form.html

job-card-workspace.html

service-calendar.html

vehicle-queue.html

bay-board.html

technician-board.html

service-history.html

job-card-print.html

inspection-print.html

estimate-print.html

mechanic-sheet-print.html

invoice-print.html

receipt-print.html

gate-pass-print.html

Do NOT create separate pages for normal:

Inspection

Advice

Labour

Spare

Lube

Payment

etc.

They belong inside Job Card Workspace.

============================================================
185. REUSABLE WORKSHOP COMPONENTS
============================================================

Job Card Header

Process Progress

Customer Quick View

Vehicle Quick View

Check-In Checklist

Media Panel

Voice Player

Signature Pad

Inspection Checklist

Damage Mapper

Estimate Grid

Approval Panel

Bay Assignment Drawer

Technician Assignment Drawer

Repair Task List

Advice Panel

Unified Item Grid

Stock Availability

QC Checklist

Payment Drawer

Transaction History

Delivery Checklist

Document Panel

Timeline

============================================================
186. JOB CARD FEATURE → LOCATION MAP
============================================================

Customer
→ Job Card Header / Overview

Vehicle
→ Job Card Header / Overview

Complaint
→ Overview

Check-In
→ Check-In Tab

Inspection
→ Inspection Tab

Dents
→ Inspection / Repair

Scratch
→ Inspection / Repair

Broken
→ Inspection / Repair

Erase / Erase All
→ Damage Mapper

Photos
→ Relevant Stage + Documents

Voice
→ Relevant Stage + Repair

Estimate
→ Estimate Tab

Approval
→ Estimate Tab

Bay
→ Workspace Action / Header

Mechanic
→ Workspace Action / Header

Supervisor
→ Workspace Action / Header

Repair
→ Repair Tab

Parts Advice
→ Repair Tab

Advice
→ Repair Tab

Advice Note
→ Repair Tab

Labour
→ Items Tab

Spares
→ Items Tab

Lubes
→ Items Tab

Outsource
→ Items Tab

Total Items
→ Items Summary

QC
→ QC Tab

Invoice
→ Invoice & Payment Tab

Payment
→ Invoice & Payment Tab

Transaction History
→ Invoice & Payment Tab

Gate Pass
→ Delivery Tab

Vehicle Delivery
→ Delivery Tab

Feedback
→ Delivery Tab

Documents
→ Documents Tab

Timeline
→ Timeline Tab

============================================================
187. NO NAVIGATION LOSS RULE
============================================================

Simplifying Workshop navigation MUST NOT remove functionality.

Correct:

Job Card
    ↓
Inspection
    ↓
Complete Inspection Tools

Incorrect:

Remove Inspection menu
    ↓
Inspection functionality disappears

Every approved feature must remain accessible inside the Job
Card Workspace.

============================================================
188. JOB CARD ACCEPTANCE CHECKLIST
============================================================

Before Workshop is considered complete:

[ ] Job Card List

[ ] Job Card Creation

[ ] Customer Search

[ ] Vehicle Search

[ ] Check-In

[ ] Accessories

[ ] Odometer

[ ] Fuel

[ ] Media

[ ] Signature

[ ] Inspection

[ ] Dent Mapping

[ ] Scratch Mapping

[ ] Broken Mapping

[ ] Erase

[ ] Erase All

[ ] Photos

[ ] Voice

[ ] Advice

[ ] Advice Note

[ ] Estimate

[ ] Estimate Revision

[ ] Customer Approval

[ ] OTP Approval UI

[ ] WhatsApp Approval UI

[ ] Bay Assignment

[ ] Technician Assignment

[ ] Supervisor Assignment

[ ] Repair Process

[ ] Start/Pause/Resume/Hold

[ ] Parts Advice

[ ] Additional Work

[ ] Additional Estimate

[ ] Labour

[ ] Spares

[ ] Lubes

[ ] Outsource

[ ] Qty

[ ] Rate / Price

[ ] Discount

[ ] Tax

[ ] Item Total

[ ] Grand Total

[ ] Stock Availability

[ ] Reserve / Issue / Return

[ ] QC

[ ] Road Test

[ ] Rework

[ ] Supervisor Approval

[ ] Mechanic Sheet

[ ] Invoice

[ ] Invoice PDF

[ ] Advance Payment

[ ] Partial Payment

[ ] Full Payment

[ ] Payment Modes

[ ] Outstanding

[ ] Transaction History

[ ] Receipt

[ ] Gate Pass

[ ] Customer OTP

[ ] Gate Pass PDF

[ ] Delivery

[ ] Accessories Handover

[ ] Feedback

[ ] Next Service Reminder

[ ] Documents

[ ] Timeline

[ ] Service Calendar

[ ] Vehicle Queue

[ ] Bay Board

[ ] Technician Board

[ ] Service History

[ ] Branch Context

[ ] No backend/API generated

============================================================
189. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create Inspection as global sidebar module.
- Create Estimate as global sidebar module.
- Create Bay Assignment as global sidebar module.
- Create Mechanic Assignment as global sidebar module.
- Create Advice as global sidebar module.
- Create Labour as global sidebar module.
- Create Job Card Spares as global sidebar module.
- Create Lubes as global sidebar module.
- Create QC as global sidebar module.
- Create Job Card Payments as global sidebar module.
- Create Gate Pass as global sidebar module.
- Force user to leave Job Card for routine workshop work.
- Duplicate Customer.
- Duplicate Vehicle.
- Duplicate Employee / Technician.
- Duplicate Product.
- Lose inspection information during Estimate creation.
- Lose Estimate information during Repair.
- Lose approved items during Invoice generation.
- Delete financial/stock history silently.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
190. FINAL JOB CARD EXPERIENCE
============================================================

When a user opens a Job Card they should immediately understand:

WHICH VEHICLE AM I WORKING ON?

WHO IS THE CUSTOMER?

WHY IS THE VEHICLE HERE?

WHAT WAS FOUND DURING INSPECTION?

WHERE ARE THE DENTS / SCRATCHES / BROKEN AREAS?

WHAT HAS THE CUSTOMER APPROVED?

WHICH BAY IS ASSIGNED?

WHO IS THE MECHANIC?

WHO IS THE SUPERVISOR?

WHAT WORK IS RUNNING?

WHAT ADVICE HAS BEEN GIVEN?

WHAT PARTS ARE REQUIRED?

WHAT LABOUR HAS BEEN ADDED?

WHAT SPARES HAVE BEEN USED?

WHAT LUBES HAVE BEEN USED?

WHAT OUTSOURCE WORK EXISTS?

WHAT IS THE TOTAL?

HAS QC PASSED?

WHAT IS THE INVOICE AMOUNT?

HOW MUCH HAS BEEN PAID?

WHAT IS OUTSTANDING?

IS THE GATE PASS READY?

CAN THE VEHICLE BE DELIVERED?

WHAT DOCUMENTS EXIST?

WHAT HAS HAPPENED FROM CHECK-IN TO DELIVERY?

All of this must be available without navigating across
unrelated modules.

============================================================
191. FINAL PRINCIPLE
============================================================

THE JOB CARD IS NOT JUST A FORM.

THE JOB CARD IS THE COMPLETE WORKSHOP WORKSPACE.

CUSTOMER
        ↓
VEHICLE
        ↓
CHECK-IN
        ↓
INSPECTION
        ↓
ESTIMATE
        ↓
APPROVAL
        ↓
BAY + MECHANIC
        ↓
REPAIR
        ↓
VOICE + PARTS + ADVICE + ADVICE NOTE
+ DENT / SCRATCH / BROKEN + PHOTOS
        ↓
LABOUR + SPARES + LUBES + OUTSOURCE
        ↓
TOTAL ITEMS
        ↓
QC
        ↓
INVOICE
        ↓
PAYMENT
        ↓
GATE PASS
        ↓
DELIVERY
        ↓
FEEDBACK
        ↓
DOCUMENTS
        ↓
TIMELINE

ONE JOB CARD.

ONE CONNECTED PROCESS.

ONE WORKSPACE.

MINIMUM NAVIGATION.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/03_WORKSHOP.md
============================================================