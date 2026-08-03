# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/06_PURCHASE_VENDOR.md
# PURCHASE & VENDOR — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Purchase & Vendor manages the COMPLETE procurement lifecycle.

The Purchase Order / Purchase Workspace is the CENTRAL
transaction record.

The user must be able to manage:

Purchase Requirement

Vendor Selection

RFQ

Vendor Quotations

Quotation Comparison

Approval

Purchase Order

Goods Receipt / GRN

Accepted Items

Rejected Items

Short / Excess Supply

Vendor Invoice

Purchase Return

Payment

Outstanding

Documents

Timeline

without navigating through unnecessary disconnected modules.

============================================================
2. PRIMARY PURCHASE NAVIGATION
============================================================

PURCHASE

    Purchase Dashboard

    Vendors

    Purchases

Do NOT create permanent sidebar menus for:

Purchase Requirement

RFQ

Quotation Comparison

Purchase Order

Approval

GRN

Purchase Return

Vendor Invoice

Vendor Payment

These should primarily exist inside connected Purchase
workspaces and contextual actions.

============================================================
3. COMPLETE PURCHASE PROCESS
============================================================

Purchase Requirement
        ↓
Required Items
        ↓
Stock Availability Check
        ↓
Vendor Selection
        ↓
RFQ
        ↓
Vendor Quotations
        ↓
Quotation Comparison
        ↓
Vendor Finalization
        ↓
Approval
        ↓
Purchase Order
        ↓
Vendor Confirmation
        ↓
Goods Dispatch
        ↓
Goods Receipt / GRN
        ↓
Quantity Verification
        ↓
Quality Verification
        ↓
Accepted / Rejected / Short / Excess
        ↓
Inventory Stock Update
        ↓
Vendor Invoice
        ↓
Invoice Verification
        ↓
Purchase Return / Adjustment if required
        ↓
Payment
        ↓
Outstanding
        ↓
Documents
        ↓
Timeline

============================================================
4. PURCHASE SOURCES
============================================================

Purchase may originate from:

Manual Requirement

Low Stock

Reorder Level

Workshop Part Requirement

Job Card Waiting for Part

Inventory Purchase Suggestion

Counter Sale Demand

Branch Requirement

Vehicle Sales Accessory Requirement

Management Requirement

============================================================
5. PURCHASE DASHBOARD
============================================================

Use:

T01 Dashboard

Purpose:

Give immediate procurement visibility.

============================================================
6. PURCHASE DASHBOARD KPIs
============================================================

Recommended:

Open Requirements

RFQs Pending

Quotations Received

Approval Pending

Open Purchase Orders

Expected Deliveries

GRN Pending

Vendor Invoices Pending

Purchase Returns

Vendor Outstanding

============================================================
7. PURCHASE DASHBOARD ATTENTION
============================================================

ATTENTION REQUIRED may include:

Workshop Waiting for Part

Low Stock Critical

RFQ Response Pending

PO Approval Pending

Vendor Confirmation Pending

Delivery Overdue

Short Supply

Rejected Material

Vendor Invoice Mismatch

Payment Due

Overdue Vendor Payment

============================================================
8. PURCHASE DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ New Purchase

+ Add Vendor

Create Requirement

Search PO

More ▼

============================================================
9. VENDORS
============================================================

Vendor is a SHARED business entity.

Vendor should support:

Parts Supplier

Lubricant Supplier

Accessory Supplier

Service / Outsource Vendor

Vehicle Supplier

General Supplier

A single vendor may support multiple categories.

============================================================
10. VENDOR LIST
============================================================

Use:

T02 List Page

Primary Action:

+ Add Vendor

============================================================
11. VENDOR LIST SEARCH
============================================================

Search:

Vendor Name

Vendor Code

Mobile

Email

GST / Tax Number

Contact Person

============================================================
12. VENDOR LIST FILTERS
============================================================

Vendor Type

Category

Status

Branch Association

Payment Terms

Outstanding Status

============================================================
13. VENDOR LIST TABLE
============================================================

Recommended columns:

Vendor Code

Vendor

Contact Person

Mobile

Categories

Payment Terms

Outstanding

Last Purchase

Status

Actions

============================================================
14. ADD VENDOR
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Contact

Address

Tax Information

Bank Information

Purchase Settings

Product Categories

Documents

Notes

============================================================
15. VENDOR BASIC INFORMATION
============================================================

Fields:

Vendor Name *

Vendor Code

Vendor Type

Contact Person

Mobile *

Alternate Mobile

Email

Website

Status

============================================================
16. VENDOR ADDRESS
============================================================

Support:

Billing Address

Shipping / Pickup Address

City

State

Country

Postal Code

============================================================
17. VENDOR TAX INFORMATION
============================================================

Possible:

GST / Tax Number

PAN / Tax Identifier

Registration Number

Tax Type

Actual regional tax rules belong to backend/accounting phase.

============================================================
18. VENDOR BANK INFORMATION
============================================================

Possible:

Bank Name

Account Name

Account Number

IFSC / Routing Code

Branch

Payment Method Preference

Frontend display only.

============================================================
19. VENDOR PURCHASE SETTINGS
============================================================

Possible:

Payment Terms

Credit Days

Credit Limit

Default Currency where required later

Lead Time

Minimum Order Value

Preferred Vendor

Purchase Categories

============================================================
20. VENDOR DETAIL
============================================================

Use:

T04 Detail Page

Recommended tabs:

Overview

Products

Purchases

Invoices

Payments

Returns

Documents

Activity

============================================================
21. VENDOR OVERVIEW
============================================================

Display:

Vendor

Contact

Categories

Payment Terms

Credit Days

Total Purchases

Outstanding

Last Purchase

Pending Orders

Pending Returns

Status

============================================================
22. VENDOR PRODUCT HISTORY
============================================================

Show products previously purchased.

Columns:

Product

Part Number

Last Purchase Price

Last Qty

Last Purchase Date

Lead Time

Preferred Status

============================================================
23. VENDOR PRICE HISTORY
============================================================

Show:

Product

Date

Quotation Price

PO Price

Received Price

Vendor

Reference

Useful during future vendor comparison.

============================================================
24. PURCHASE LIST
============================================================

Use:

T02 List Page

Page:

Purchase / Purchases

Primary Action:

+ New Purchase

============================================================
25. PURCHASE LIST QUICK FILTERS
============================================================

All

Requirement

RFQ

Quotation

Approval Pending

PO Issued

Confirmed

Partial Receipt

Received

Invoice Pending

Payment Pending

Completed

Cancelled

============================================================
26. PURCHASE LIST SEARCH
============================================================

Search:

Purchase Number

Requirement Number

RFQ Number

PO Number

GRN Number

Vendor

Vendor Invoice Number

Product

============================================================
27. PURCHASE LIST FILTERS
============================================================

Status

Vendor

Purchase Type

Branch

Created Date

Expected Delivery

Payment Status

Receipt Status

Approval Status

============================================================
28. PURCHASE LIST TABLE
============================================================

Recommended columns:

Purchase / PO

Vendor

Items

PO Amount

Ordered

Received

Expected Delivery

Receipt Status

Invoice Status

Payment

Status

Actions

============================================================
29. CREATE PURCHASE
============================================================

Flow:

+ New Purchase
        ↓
Select Purchase Source
        ↓
Add Required Items
        ↓
Review Stock Requirement
        ↓
Select Vendor / RFQ
        ↓
Create Purchase Workspace

Possible source:

Manual

Low Stock

Workshop

Inventory

Branch Requirement

============================================================
30. PURCHASE WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Purchase Workspace should manage the COMPLETE purchase
transaction.

============================================================
31. PURCHASE WORKSPACE HEADER
============================================================

Example:

PURCHASE #PUR-2026-00184

[ PO ISSUED ] [ DELIVERY PENDING ]

Vendor:
Auto Parts India

Branch:
Pune Main Branch

PO:
PO-2026-00172

Expected Delivery:
30 Jul 2026

Created By:
Amit Shah

Actions:

[ Update Status ]

[ More ▼ ]

============================================================
32. PURCHASE HEADER SUMMARY
============================================================

Show:

Items

PO Amount

Received Amount

Vendor Invoice

Paid

Outstanding

Example:

PO Amount
$4,850

Received
18 / 22 Items

Invoice
$4,620

Paid
$2,000

Outstanding
$2,620

============================================================
33. PURCHASE PROCESS PROGRESS
============================================================

Recommended:

Requirement ✓

RFQ ✓

Quotation ✓

Approval ✓

PO ✓

Receipt ●

Invoice ○

Payment ○

Do NOT force rigid wizard navigation.

============================================================
34. PURCHASE WORKSPACE NAVIGATION
============================================================

Recommended:

Overview

Requirement

RFQ & Quotations

Purchase Order

Receiving / GRN

Invoice & Return

Payment

Documents

Timeline

These are internal workspace sections.

NOT global sidebar modules.

============================================================
35. PURCHASE OVERVIEW
============================================================

Overview should answer:

Why are we purchasing?

Which items are required?

Which Job Cards need them?

Which vendor was selected?

What price was approved?

Has PO been issued?

When is delivery expected?

How much has been received?

Were items rejected?

Has vendor invoice arrived?

How much has been paid?

What is outstanding?

============================================================
36. PURCHASE REQUIREMENT
============================================================

Requirement contains:

Requirement Number

Source

Branch

Requested By

Required Date

Priority

Items

Reason

Related Job Card where applicable

Notes

============================================================
37. REQUIREMENT ITEM GRID
============================================================

Columns:

Product

Part Number

Required Qty

Current Stock

Reserved Stock

Available Stock

Reorder Level

Required Date

Priority

Source

============================================================
38. WORKSHOP PURCHASE REQUIREMENT
============================================================

Example:

Job Card:
JC-2026-001248

Vehicle:
MH 12 AB 4582

Required Part:
Front Brake Pad Set

Required Qty:
1

Available:
0

Priority:
Urgent

Expected Vehicle Delivery:
29 Jul 2026

This source context must remain visible throughout purchase.

============================================================
39. LOW STOCK REQUIREMENT
============================================================

Inventory may create suggestion:

Available:
2

Reorder Level:
5

Suggested Purchase:
10

User may:

Accept Suggested Qty

Change Qty

Select Vendor

Create Purchase

============================================================
40. REQUIREMENT PRIORITY
============================================================

Possible:

Normal

High

Urgent

Critical / Vehicle Blocked

Priority should remain visible through purchasing.

============================================================
41. REQUIREMENT CONSOLIDATION
============================================================

Multiple requirements for same product may be consolidated.

Example:

JC-001248
Qty 1

JC-001265
Qty 2

Reorder
Qty 5

Total Requirement:
8

Do NOT lose original source references.

============================================================
42. RFQ
============================================================

RFQ = Request for Quotation.

RFQ is part of Purchase Workspace.

User may send same requirement to multiple vendors.

============================================================
43. RFQ PROCESS
============================================================

Requirement
        ↓
Select Vendors
        ↓
Prepare RFQ
        ↓
Send
        ↓
Receive Vendor Quotations
        ↓
Compare
        ↓
Select Vendor

============================================================
44. RFQ INFORMATION
============================================================

Fields:

RFQ Number

RFQ Date

Valid Until

Required Delivery Date

Items

Quantity

Terms

Notes

Selected Vendors

============================================================
45. RFQ VENDOR STATUS
============================================================

For each vendor:

Not Sent

Sent

Acknowledged

Quotation Received

Declined

No Response

Expired

============================================================
46. RFQ ACTIONS
============================================================

Preview

Print

WhatsApp

Email

Mark Sent

Add Vendor

Remove Vendor before send

Record Quotation

============================================================
47. VENDOR QUOTATION
============================================================

For each vendor quotation capture:

Quotation Number

Quotation Date

Validity

Delivery Time

Payment Terms

Freight

Discount

Tax

Other Charges

Item Prices

Total

Attachment

Remarks

============================================================
48. VENDOR QUOTATION ITEM
============================================================

Columns:

Product

Required Qty

Available Qty by Vendor where known

Unit Price

Discount

Tax

Net Price

Delivery Time

Brand

Remarks

============================================================
49. QUOTATION COMPARISON
============================================================

CRITICAL UI.

Display vendors side-by-side or in comparison table.

Compare:

Item Price

Discount

Tax

Freight

Total

Delivery Time

Payment Terms

Availability

Vendor Rating where available

Previous Purchase Price

============================================================
50. COMPARISON EXAMPLE
============================================================

Product:
Front Brake Pad Set

Vendor A:
$85
Delivery 1 Day

Vendor B:
$80
Delivery 4 Days

Vendor C:
$92
Delivery Today

Selection should NOT depend only on lowest price.

Urgent Workshop requirement may justify faster vendor.

============================================================
51. ITEM-WISE VENDOR SELECTION
============================================================

Where required:

Different items may be purchased from different vendors.

Example:

Vendor A
Brake Pads

Vendor B
Engine Oil

Vendor C
Air Filter

System UI may split selected items into relevant POs.

============================================================
52. VENDOR FINALIZATION
============================================================

Capture:

Selected Vendor

Selected Items

Final Price

Delivery Commitment

Payment Terms

Selection Reason

Remarks

============================================================
53. PURCHASE APPROVAL
============================================================

Approval may depend later on:

Amount

Branch

Purchase Type

User Role

Urgency

Frontend must prepare approval UI.

============================================================
54. APPROVAL PANEL
============================================================

Use:

C07 Approval Panel

Show:

Purchase Amount

Vendor

Items

Requested By

Reason

Comparison Summary

Approval Status

Approval History

============================================================
55. APPROVAL STATUS
============================================================

Possible:

Not Required

Draft

Pending

Approved

Rejected

Revision Requested

Cancelled

============================================================
56. APPROVAL HISTORY
============================================================

Show:

Level

Approver

Status

Date / Time

Remarks

Amount

============================================================
57. PURCHASE ORDER
============================================================

After approval:

Generate Purchase Order.

PO remains part of same Purchase Workspace.

============================================================
58. PURCHASE ORDER INFORMATION
============================================================

Contains:

PO Number

PO Date

Vendor

Billing Address

Delivery Location

Expected Delivery

Payment Terms

Items

Taxes

Discount

Freight

Other Charges

Total

Terms & Conditions

============================================================
59. PO ITEM GRID
============================================================

Columns:

Product

Part Number

Qty

Unit

Rate

Discount

Tax

Amount

Expected Delivery

============================================================
60. PO SUMMARY
============================================================

Show:

Item Total

Discount

Tax

Freight

Other Charges

Round Off where applicable

PO Total

============================================================
61. PO ACTIONS
============================================================

Preview

Generate

Print

Download PDF

WhatsApp

Email

Mark Sent

Vendor Confirmation

============================================================
62. PO STATUS
============================================================

Possible:

Draft

Approval Pending

Approved

Issued

Sent

Vendor Confirmed

Partially Received

Received

Closed

Cancelled

============================================================
63. VENDOR CONFIRMATION
============================================================

Capture:

Confirmed

Confirmation Date

Expected Dispatch

Expected Delivery

Vendor Reference

Remarks

============================================================
64. PO REVISION
============================================================

Where allowed before receipt:

Maintain:

Revision Number

Old Amount

New Amount

Changed Items

Reason

Approved By where applicable

Date

Do NOT overwrite previous PO history.

============================================================
65. GOODS DISPATCH
============================================================

Optional vendor dispatch information:

Dispatch Date

Transporter

Vehicle Number

Tracking Number

Expected Arrival

Dispatch Document

Remarks

============================================================
66. GOODS RECEIPT / GRN
============================================================

GRN = Goods Receipt Note.

Receiving is performed inside Purchase Workspace.

============================================================
67. RECEIVING PROCESS
============================================================

Purchase Order
        ↓
Goods Arrive
        ↓
Create GRN
        ↓
Verify Products
        ↓
Verify Quantity
        ↓
Quality Check
        ↓
Accepted Qty
        ↓
Rejected Qty
        ↓
Short / Excess Qty
        ↓
Confirm Receipt
        ↓
Inventory Updated

============================================================
68. GRN INFORMATION
============================================================

Fields:

GRN Number

PO Number

Vendor

Receipt Date

Vendor Challan

Vendor Invoice Number if available

Received By

Branch

Store / Warehouse

Remarks

============================================================
69. GRN ITEM GRID
============================================================

Columns:

Product

Ordered

Previously Received

Current Received

Accepted

Rejected

Short

Excess

Pending

Location

Status

============================================================
70. PARTIAL RECEIPT
============================================================

Example:

Ordered:
10

Received Today:
6

Accepted:
6

Pending:
4

PO Status:

Partially Received

Future GRN can receive remaining quantity.

============================================================
71. MULTIPLE GRN
============================================================

One PO may have:

GRN-001

GRN-002

GRN-003

Do NOT force complete receipt in one transaction.

============================================================
72. EXCESS RECEIPT
============================================================

Example:

Ordered:
10

Received:
12

Excess:
2

User should clearly see excess.

Possible frontend actions:

Accept Excess

Reject Excess

Hold for Review

Actual approval rules later.

============================================================
73. SHORT RECEIPT
============================================================

Example:

Ordered:
10

Received:
8

Short:
2

Possible:

Keep Pending

Close Remaining Qty

Vendor Follow-Up

============================================================
74. REJECTED ITEM
============================================================

Capture:

Rejected Qty

Reason

Condition

Photo

Remarks

Action

Possible reasons:

Damaged

Wrong Product

Wrong Brand

Quality Issue

Expired

Packaging Damage

Other

============================================================
75. QUALITY VERIFICATION
============================================================

Possible item checks:

Correct Product

Correct Part Number

Correct Brand

Quantity

Physical Condition

Packaging

Expiry where applicable

Batch where applicable

Specification

============================================================
76. ACCEPTED STOCK
============================================================

Only accepted quantity should conceptually become usable stock.

GRN Accepted Qty
        ↓
Inventory Stock In
        ↓
Product Stock Updated
        ↓
Job Card Reservation may be fulfilled

============================================================
77. WORKSHOP WAITING PART RECEIPT
============================================================

CRITICAL CONNECTION.

When received item belongs to waiting Job Card:

GRN
        ↓
Accepted Stock
        ↓
Inventory Updated
        ↓
Related Requirement Identified
        ↓
Reserve for Job Card
        ↓
Workshop can continue

UI should show:

RELATED JOB CARD WAITING

JC-2026-001248

Front Brake Pad Set × 1

Action:

Reserve for Job Card

============================================================
78. RECEIPT LOCATION
============================================================

Accepted items must show receiving location:

Branch

Warehouse / Store

Rack / Bin where applicable

============================================================
79. GRN COMPLETION
============================================================

After confirmation:

Accepted Stock → Inventory

Rejected Stock → Rejected / Return Context

PO Received Qty → Updated

Pending Qty → Updated

Purchase Timeline → Updated

============================================================
80. GRN DOCUMENT
============================================================

Printable GRN contains:

GRN Number

PO

Vendor

Receipt Date

Products

Ordered Qty

Received Qty

Accepted Qty

Rejected Qty

Received By

Remarks

Signatures

============================================================
81. VENDOR INVOICE
============================================================

Vendor Invoice is matched against:

Purchase Order

GRN

Accepted Quantity

Agreed Price

============================================================
82. VENDOR INVOICE PROCESS
============================================================

Vendor Invoice Received
        ↓
Enter Invoice
        ↓
Match PO
        ↓
Match GRN
        ↓
Verify Qty
        ↓
Verify Price
        ↓
Verify Tax / Charges
        ↓
Identify Difference
        ↓
Approve / Hold
        ↓
Payable Created

============================================================
83. VENDOR INVOICE INFORMATION
============================================================

Fields:

Vendor Invoice Number

Invoice Date

Vendor

PO

GRN(s)

Subtotal

Discount

Tax

Freight

Other Charges

Invoice Total

Due Date

Attachment

============================================================
84. THREE-WAY MATCH PREPARATION
============================================================

Frontend should visually compare:

PURCHASE ORDER

vs

GOODS RECEIPT

vs

VENDOR INVOICE

Example:

PO Qty:
10

Accepted Qty:
8

Invoice Qty:
10

Difference:
2

Highlight mismatch.

============================================================
85. PRICE MISMATCH
============================================================

Example:

PO Rate:
$85

Invoice Rate:
$90

Difference:
+$5

Show warning:

PRICE MISMATCH

Require review.

============================================================
86. INVOICE STATUS
============================================================

Possible:

Not Received

Received

Verification Pending

Matched

Mismatch

Approval Pending

Approved

On Hold

Partially Paid

Paid

Cancelled / Credit Adjusted

============================================================
87. PURCHASE RETURN
============================================================

Purchase Return remains connected to original:

Vendor

PO

GRN

Product

============================================================
88. PURCHASE RETURN PROCESS
============================================================

Select Received Item
        ↓
Select Return Qty
        ↓
Return Reason
        ↓
Condition
        ↓
Vendor
        ↓
Return Note
        ↓
Stock Out
        ↓
Vendor Adjustment / Credit Note
        ↓
Complete

============================================================
89. PURCHASE RETURN REASONS
============================================================

Possible:

Damaged

Wrong Product

Quality Issue

Excess Supply

Expired

Specification Mismatch

Defective

Other

============================================================
90. PURCHASE RETURN ITEM
============================================================

Show:

Product

GRN

Received Qty

Previously Returned

Returnable Qty

Return Qty

Rate

Amount

Reason

============================================================
91. PURCHASE RETURN STATUS
============================================================

Draft

Approval Pending

Approved

Ready to Dispatch

Returned

Vendor Received

Credit Pending

Completed

Cancelled

============================================================
92. VENDOR CREDIT NOTE
============================================================

Where vendor provides credit:

Credit Note Number

Date

Amount

Related Return

Related Invoice

Attachment

Status

Finance/accounting logic later.

============================================================
93. PURCHASE PAYMENT
============================================================

Payment section should show complete commercial position.

Support:

Advance Payment

Partial Payment

Full Payment

Credit Adjustment

Refund / Vendor Refund where applicable

============================================================
94. PAYMENT SUMMARY
============================================================

Show:

PO Amount

Vendor Invoice Amount

Credit Notes

Previous Payments

Current Outstanding

Due Date

============================================================
95. RECEIVE / MAKE PAYMENT UI
============================================================

Use:

C01 Drawer / Modal

Fields:

Vendor

Invoice

Payment Type

Amount

Payment Mode

Payment Date

Reference

Bank

Remarks

============================================================
96. PAYMENT MODES
============================================================

Possible:

Cash

Bank Transfer

Cheque

Card

UPI

Credit Adjustment

Other configured modes

============================================================
97. ADVANCE PAYMENT
============================================================

Advance may occur before GRN / Invoice.

Capture:

Vendor

PO

Advance Amount

Payment Mode

Reference

Date

Remarks

Later show advance adjustment against invoice.

============================================================
98. PARTIAL PAYMENT
============================================================

Example:

Vendor Invoice:
$4,620

Advance:
$1,000

Paid Later:
$1,000

Outstanding:
$2,620

Multiple transactions must remain visible.

============================================================
99. FULL PAYMENT
============================================================

When complete:

Payment Status:

PAID

Show:

Total Invoice

Credit Adjustment

Total Paid

Balance

Payment Date(s)

============================================================
100. VENDOR OUTSTANDING
============================================================

Vendor Detail should show:

Total Payable

Due Soon

Overdue

Credit Notes

Advances

Net Outstanding

============================================================
101. PAYMENT TRANSACTION HISTORY
============================================================

Columns:

Date

Transaction ID

Invoice

Type

Mode

Amount

Reference

Paid By

Status

============================================================
102. PAYMENT DUE STATUS
============================================================

Possible:

Not Due

Due Soon

Due Today

Overdue

Partially Paid

Paid

On Hold

============================================================
103. PAYMENT HOLD
============================================================

Possible reasons:

Invoice Mismatch

Rejected Goods

Credit Note Pending

Approval Pending

Vendor Dispute

Document Missing

Other

============================================================
104. PURCHASE DOCUMENTS
============================================================

Purchase Workspace should provide ONE consolidated document
section.

Possible:

Requirement

RFQ

Vendor Quotations

Comparison Sheet

Approval

Purchase Order

Vendor Confirmation

Dispatch Document

GRN

Vendor Invoice

Purchase Return

Credit Note

Payment Receipt / Proof

Attachments

============================================================
105. DOCUMENT ACTIONS
============================================================

Preview

Print

Download

WhatsApp

Email

Upload

Generated transactional documents should not be casually
deleted.

============================================================
106. PURCHASE TIMELINE
============================================================

Timeline should show complete chronological procurement history.

Examples:

Requirement Created

RFQ Created

RFQ Sent

Vendor Quotation Received

Vendor Selected

Purchase Approval Requested

Purchase Approved

PO Generated

PO Sent

Vendor Confirmed

Goods Dispatched

Goods Received

GRN Created

Items Rejected

Inventory Updated

Vendor Invoice Received

Invoice Mismatch Found

Invoice Approved

Purchase Return Created

Credit Note Received

Advance Paid

Partial Payment Made

Final Payment Made

Purchase Completed

============================================================
107. TIMELINE ITEM
============================================================

Display:

Date / Time

Event

User

Description

Related Record

Example:

30 Jul 2026 • 11:45 AM

Goods Received

GRN-2026-00145

18 of 22 ordered items received.

Received By:
Ramesh Kumar

============================================================
108. PURCHASE STATUS LIFECYCLE
============================================================

Recommended:

Draft

Requirement

RFQ

Quotation Review

Approval Pending

Approved

PO Issued

Vendor Confirmed

Awaiting Delivery

Partially Received

Received

Invoice Pending

Invoice Verification

Payment Pending

Partially Paid

Completed

On Hold

Cancelled

============================================================
109. RECEIPT STATUS
============================================================

Possible:

Not Received

Partially Received

Received

Excess Received

Short Received

Rejected Items

Closed

============================================================
110. PAYMENT STATUS
============================================================

Possible:

Not Applicable Yet

Advance Paid

Unpaid

Partially Paid

Paid

Overdue

On Hold

============================================================
111. PURCHASE ON HOLD
============================================================

Capture:

Hold Reason

Responsible User

Expected Resolution

Remarks

Possible:

Vendor Issue

Approval

Price Dispute

Delivery Delay

Invoice Mismatch

Quality Issue

Payment Issue

============================================================
112. PURCHASE CANCELLATION
============================================================

Capture:

Cancellation Reason

PO Status

Receipt Status

Payment Status

Vendor Notification

Remarks

============================================================
113. CANCELLATION WARNINGS
============================================================

Show warnings if:

PO already sent

Vendor confirmed

Advance paid

Goods partially received

GRN exists

Vendor invoice exists

Return exists

Do NOT visually imply simple record deletion.

============================================================
114. PO CLOSURE
============================================================

A PO may be closed when:

All items received

OR

Remaining quantity intentionally cancelled.

Capture:

Closure Reason

Pending Qty

Closed By

Date

============================================================
115. VENDOR PERFORMANCE
============================================================

Vendor Detail may show:

Total Orders

On-Time Delivery

Late Deliveries

Rejected Qty

Price Variance

Purchase Returns

Average Lead Time

Actual calculations later.

============================================================
116. VENDOR RATING PREPARATION
============================================================

Possible criteria:

Price

Quality

Delivery

Availability

Communication

Return Handling

Do NOT invent final scoring logic during frontend phase.

============================================================
117. PREFERRED VENDOR
============================================================

Product may have:

Preferred Vendor

Alternative Vendors

Last Purchase Vendor

Lowest Recent Vendor

Fastest Vendor

Use as decision support only.

============================================================
118. PURCHASE + INVENTORY
============================================================

Purchase Requirement
        ↓
Purchase Order
        ↓
GRN
        ↓
Accepted Qty
        ↓
Inventory Stock In

No duplicate stock receipt entry.

============================================================
119. PURCHASE + WORKSHOP
============================================================

Workshop
        ↓
Part Unavailable
        ↓
Purchase Requirement
        ↓
Purchase
        ↓
GRN
        ↓
Reserve Part
        ↓
Job Card Continues

Maintain Job Card reference throughout.

============================================================
120. PURCHASE + FINANCE
============================================================

Purchase provides:

Vendor Invoice

Credit Note

Payment Requirement

Outstanding

Finance owns accounting entries and ledgers.

Do NOT build general ledger inside Purchase.

============================================================
121. PURCHASE + VENDOR
============================================================

Vendor is ONE shared record.

All:

RFQs

POs

GRNs

Invoices

Payments

Returns

should appear in Vendor Detail.

============================================================
122. PURCHASE + BRANCH
============================================================

Purchase must retain:

Requesting Branch

Delivery Branch

Receiving Store

Stock Location

Payment Context

============================================================
123. CROSS-BRANCH PROCUREMENT
============================================================

Where one central team purchases for multiple branches:

Requirement Source Branch remains visible.

Example:

PO:
Central Purchase

Delivery:
Pune Branch

Requirement:
Pune Workshop

Do NOT lose operational ownership.

============================================================
124. PURCHASE + PRODUCT
============================================================

Product Detail should be able to show:

Preferred Vendor

Last Purchase Price

Last Purchase Date

Pending Purchase Qty

Expected Receipt

Purchase History

============================================================
125. GLOBAL SEARCH
============================================================

Global ERP Search should find:

Vendor

Requirement

RFQ

PO

GRN

Vendor Invoice

Example:

PURCHASE ORDER

PO-2026-00172

Auto Parts India

Status:
Partially Received

============================================================
126. PURCHASE REPORTS
============================================================

Report Center may include:

Purchase Summary

Purchase by Vendor

Purchase by Product

Purchase by Category

Requirement Report

RFQ Report

Quotation Comparison

Open PO

Pending Delivery

Purchase Receipt

GRN

Rejected Goods

Purchase Return

Vendor Invoice

Payment Due

Vendor Outstanding

Purchase Price History

Vendor Performance

============================================================
127. PURCHASE QUICK ACTIONS
============================================================

Context dependent:

Create Requirement

Create RFQ

Add Vendor Quotation

Compare Quotations

Select Vendor

Request Approval

Generate PO

Send PO

Confirm Vendor

Receive Goods

Create GRN

Record Vendor Invoice

Create Purchase Return

Make Payment

Upload Document

============================================================
128. MORE ACTIONS
============================================================

Possible:

Revise PO

Change Expected Delivery

Put On Hold

Close Pending Quantity

Print Documents

WhatsApp Vendor

Email Vendor

Cancel Purchase

============================================================
129. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Purchase Dashboard

Vendor List

Add Vendor

Vendor Detail

Vendor Products

Vendor Purchase History

Purchase List

New Purchase

Requirement Source

Low Stock Requirement

Workshop Requirement

Requirement Consolidation

RFQ

Multi-Vendor Selection

Vendor Quotation Entry

Quotation Comparison

Vendor Finalization

Approval Panel

Generate PO

PO Preview

Vendor Confirmation

Partial Receipt

Multiple GRN

Accepted Qty

Rejected Qty

Short Qty

Excess Qty

Quality Verification

Inventory Stock Update Context

Workshop Waiting Part Context

Vendor Invoice

PO vs GRN vs Invoice Match

Price Mismatch

Quantity Mismatch

Purchase Return

Vendor Credit Note

Advance Payment

Partial Payment

Full Payment

Outstanding

Payment Hold

Documents

Timeline

Cancellation UI

No API/backend required.

============================================================
130. RECOMMENDED FRONTEND FILES
============================================================

purchase-dashboard.html

vendors.html

vendor-form.html

vendor-detail.html

purchases.html

purchase-workspace.html

rfq-print.html

quotation-comparison-print.html

purchase-order-print.html

grn-print.html

purchase-return-print.html

vendor-payment-print.html

Do NOT create separate operational pages for every:

RFQ

Quotation

Approval

GRN

Invoice

Payment

Return

Use the Purchase Workspace wherever practical.

============================================================
131. REUSABLE PURCHASE COMPONENTS
============================================================

Vendor Search

Vendor Quick View

Product Requirement Grid

Stock Availability

Requirement Source Panel

RFQ Vendor Selector

Vendor Quotation Grid

Quotation Comparison

Approval Panel

PO Item Grid

Receiving Grid

GRN Panel

Quality Verification

Invoice Match Panel

Mismatch Alert

Purchase Return Drawer

Payment Drawer

Outstanding Summary

Document Panel

Timeline

============================================================
132. FEATURE → LOCATION MAP
============================================================

Requirement
→ Purchase Workspace / Requirement

RFQ
→ RFQ & Quotations

Vendor Quotations
→ RFQ & Quotations

Comparison
→ RFQ & Quotations

Approval
→ Purchase Workspace

Purchase Order
→ Purchase Order Tab

Vendor Confirmation
→ Purchase Order

Goods Receipt
→ Receiving / GRN

Accepted / Rejected
→ Receiving / GRN

Inventory Update
→ GRN Result

Vendor Invoice
→ Invoice & Return

Purchase Return
→ Invoice & Return

Credit Note
→ Invoice & Return

Advance
→ Payment

Partial Payment
→ Payment

Outstanding
→ Payment

Documents
→ Documents

Timeline
→ Timeline

============================================================
133. NO DUPLICATION RULE
============================================================

DO NOT create separate:

Purchase Vendor

Inventory Supplier

Outsource Supplier

These should reference ONE shared Vendor entity where applicable.

DO NOT duplicate:

Product

Inventory Stock

Payment

Employee

Branch

Job Card Requirement

============================================================
134. PURCHASE ACCEPTANCE CHECKLIST
============================================================

Before Purchase is considered complete:

[ ] Purchase Dashboard

[ ] Vendor List

[ ] Add Vendor

[ ] Vendor Detail

[ ] Vendor Categories

[ ] Vendor Products

[ ] Payment Terms

[ ] Credit Days

[ ] Vendor Documents

[ ] Purchase List

[ ] New Purchase

[ ] Requirement

[ ] Manual Requirement

[ ] Low Stock Requirement

[ ] Workshop Requirement

[ ] Branch Requirement

[ ] Requirement Priority

[ ] Requirement Consolidation

[ ] Stock Availability

[ ] RFQ

[ ] Multiple Vendors

[ ] Vendor Quotation

[ ] Quotation Attachment

[ ] Quotation Comparison

[ ] Vendor Selection

[ ] Item-wise Vendor Selection

[ ] Approval

[ ] Approval History

[ ] Purchase Order

[ ] PO PDF

[ ] PO Revision

[ ] Vendor Confirmation

[ ] Dispatch Information

[ ] GRN

[ ] Partial Receipt

[ ] Multiple GRN

[ ] Accepted Qty

[ ] Rejected Qty

[ ] Short Qty

[ ] Excess Qty

[ ] Quality Verification

[ ] Receipt Location

[ ] Inventory Update Context

[ ] Job Card Requirement Context

[ ] Vendor Invoice

[ ] PO Match

[ ] GRN Match

[ ] Price Mismatch

[ ] Qty Mismatch

[ ] Purchase Return

[ ] Credit Note

[ ] Advance Payment

[ ] Partial Payment

[ ] Full Payment

[ ] Payment Modes

[ ] Outstanding

[ ] Due Date

[ ] Payment Hold

[ ] Transaction History

[ ] Documents

[ ] Timeline

[ ] Branch Context

[ ] No backend/API generated

============================================================
135. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create RFQ as unnecessary permanent sidebar module.
- Create Quotation Comparison as permanent sidebar module.
- Create GRN as disconnected procurement system.
- Create Vendor Invoice as unrelated Purchase module.
- Create Vendor Payment as separate Purchase payment system.
- Duplicate Vendor records.
- Duplicate Product records.
- Duplicate Inventory Stock.
- Re-enter Workshop requirement manually.
- Re-enter accepted GRN quantity into Inventory.
- Treat rejected quantity as usable stock.
- Lose source Job Card reference.
- Lose quotation history.
- Overwrite PO revision history.
- Force full receipt when delivery is partial.
- Hide short/excess quantities.
- Hide invoice mismatches.
- Delete completed payments.
- Delete completed GRN transactions.
- Delete purchase return history.
- Create direct editable stock quantities.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
136. FINAL PURCHASE EXPERIENCE
============================================================

When user opens ONE Purchase Workspace they should immediately
understand:

WHY ARE WE PURCHASING?

WHICH ITEMS ARE REQUIRED?

WHICH JOB CARD / BRANCH NEEDS THEM?

WHAT STOCK IS CURRENTLY AVAILABLE?

WHICH VENDORS WERE CONTACTED?

WHAT DID EACH VENDOR QUOTE?

WHY WAS THIS VENDOR SELECTED?

WHO APPROVED THE PURCHASE?

WHAT WAS ORDERED?

WHAT HAS THE VENDOR CONFIRMED?

WHEN IS DELIVERY EXPECTED?

HOW MUCH HAS BEEN RECEIVED?

WHAT WAS ACCEPTED?

WHAT WAS REJECTED?

IS ANY QUANTITY SHORT OR EXCESS?

HAS INVENTORY BEEN UPDATED?

IS A WORKSHOP JOB WAITING FOR THIS PART?

HAS THE VENDOR INVOICE ARRIVED?

DO PO, GRN AND INVOICE MATCH?

WERE ANY ITEMS RETURNED?

HOW MUCH HAS BEEN PAID?

WHAT IS STILL OUTSTANDING?

WHAT DOCUMENTS EXIST?

WHAT HAS HAPPENED FROM REQUIREMENT TO PAYMENT?

============================================================
137. FINAL PRINCIPLE
============================================================

PURCHASE SHOULD NOT FEEL LIKE:

REQUIREMENT
+
RFQ
+
QUOTATION
+
COMPARISON
+
APPROVAL
+
PO
+
GRN
+
VENDOR INVOICE
+
RETURN
+
PAYMENT

AS DISCONNECTED MODULES.

IT SHOULD FEEL LIKE:

REQUIREMENT
        ↓
STOCK CHECK
        ↓
VENDOR / RFQ
        ↓
QUOTATION COMPARISON
        ↓
APPROVAL
        ↓
PURCHASE ORDER
        ↓
VENDOR CONFIRMATION
        ↓
RECEIVING / GRN
        ↓
ACCEPT / REJECT
        ↓
INVENTORY UPDATE
        ↓
VENDOR INVOICE
        ↓
MATCH / VERIFY
        ↓
RETURN / CREDIT IF REQUIRED
        ↓
PAYMENT
        ↓
OUTSTANDING
        ↓
DOCUMENTS
        ↓
TIMELINE

ONE PURCHASE.

ONE CONNECTED PROCESS.

ONE WORKSPACE.

COMPLETE TRACEABILITY.

MINIMUM NAVIGATION.

NO DUPLICATE ENTRY.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/06_PURCHASE_VENDOR.md
============================================================