# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/04_INVENTORY.md
# INVENTORY — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Inventory manages the complete stock lifecycle of:

Spare Parts

Lubricants

Accessories

Consumables

Other Stock Items

The Inventory module must provide ONE connected stock system.

Stock movements may originate from:

Purchase

Job Card

Counter Sale

Sales Return

Purchase Return

Stock Transfer

Stock Adjustment

Damage / Loss

Physical Verification

Opening Stock

Inventory must NOT require users to manually maintain separate
stock records for every module.

============================================================
2. PRIMARY INVENTORY NAVIGATION
============================================================

INVENTORY

    Inventory Dashboard

    Products

    Stock

Do NOT create permanent sidebar menus for:

Stock In

Stock Out

Job Card Issue

Job Card Return

Reservation

Stock Adjustment

Damage

Loss

Transfer

Physical Verification

Stock Ledger

These belong inside Inventory workspaces / contextual operations.

============================================================
3. COMPLETE INVENTORY PROCESS
============================================================

Product Creation
        ↓
Opening Stock / Purchase Receipt
        ↓
Stock Available
        ↓
Reservation / Requirement
        ↓
Stock Issue / Sale / Transfer
        ↓
Consumption / Delivery
        ↓
Return / Adjustment if required
        ↓
Current Stock Updated
        ↓
Reorder Monitoring
        ↓
Purchase Requirement
        ↓
Stock Replenishment
        ↓
Stock History / Ledger

============================================================
4. PRIMARY BUSINESS OBJECTS
============================================================

Inventory contains:

PRODUCT

STOCK

STOCK TRANSACTION

STOCK TRANSFER

STOCK VERIFICATION

These are connected records.

Do NOT maintain unrelated stock quantities manually.

============================================================
5. INVENTORY DASHBOARD
============================================================

Use:

T01 Dashboard

Purpose:

Give immediate visibility into stock position and exceptions.

============================================================
6. INVENTORY DASHBOARD KPIs
============================================================

Recommended:

Total Products

Stock Value

Low Stock Items

Out of Stock

Reserved Stock

Pending Purchase

Stock Transfers

Damaged / Lost

============================================================
7. INVENTORY DASHBOARD ALERTS
============================================================

ATTENTION REQUIRED may include:

Out of Stock

Below Reorder Level

Job Card Waiting for Part

Negative Stock Warning

Transfer Pending

Purchase Delivery Overdue

Physical Stock Difference

Damaged Stock

Dead / Non-Moving Stock

============================================================
8. WORKSHOP BLOCKING STOCK
============================================================

This is a HIGH-PRIORITY inventory alert.

Example:

JOB BLOCKED

JC-2026-001248

Front Brake Pad Set

Required:
1

Available:
0

Vehicle:
MH 12 AB 4582

Actions:

View Job Card

View Product

Create Purchase Requirement

============================================================
9. PRODUCT LIST
============================================================

Use:

T02 List Page

Page:

Inventory / Products

Primary Action:

+ Add Product

============================================================
10. PRODUCT LIST SUMMARY
============================================================

Quick filters:

All

Spare Parts

Lubricants

Accessories

Consumables

Low Stock

Out of Stock

Inactive

============================================================
11. PRODUCT LIST FILTERS
============================================================

Search:

Product Name

SKU

Part Number

Barcode

OEM Number

Brand

Filters:

Product Type

Category

Brand

Stock Status

Branch

Store / Warehouse

Supplier

Active / Inactive

============================================================
12. PRODUCT LIST TABLE
============================================================

Recommended columns:

SKU

Product

Part Number

Category

Brand

Available Stock

Reserved

Selling Price

Reorder Level

Stock Status

Location

Actions

Primary:

Open

Secondary:

More ▼

============================================================
13. PRODUCT TYPES
============================================================

Required:

Spare Part

Lubricant

Accessory

Consumable

Other

Product type may control additional fields.

============================================================
14. PRODUCT CREATION
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Identification

Category / Brand

Unit

Pricing

Tax

Stock Control

Vehicle Compatibility

Supplier Information

Storage Location

Documents / Images

Additional Information

============================================================
15. PRODUCT BASIC INFORMATION
============================================================

Fields may include:

Product Name *

SKU *

Product Type *

Category *

Brand

Description

Unit *

Status

============================================================
16. PRODUCT IDENTIFICATION
============================================================

Fields:

Part Number

OEM Number

Barcode

HSN / SAC

Manufacturer Code

Alternate Part Number

Serial Tracking where applicable later

Batch Tracking where applicable later

============================================================
17. PRODUCT PRICING
============================================================

Possible fields:

Purchase Price

Cost Price

Selling Price

MRP

Minimum Selling Price where applicable

Tax

Discount Eligibility

Price Inclusive / Exclusive of Tax

Actual pricing rules will be defined during backend phase.

============================================================
18. STOCK CONTROL
============================================================

Fields:

Track Inventory

Minimum Stock

Maximum Stock

Reorder Level

Reorder Quantity

Allow Negative Stock

Opening Stock where appropriate

Storage Location

============================================================
19. UNIT
============================================================

Possible units:

Piece

Set

Pair

Liter

Milliliter

Kg

Gram

Meter

Box

Pack

Other

Use Unit Master.

============================================================
20. LUBRICANT-SPECIFIC INFORMATION
============================================================

When Product Type = Lubricant:

Show relevant fields:

Lubricant Type

Grade

Viscosity

Brand

Pack Size

Unit

Quantity

Vehicle Compatibility where applicable

Do NOT show irrelevant spare-part fields unnecessarily.

============================================================
21. SPARE-PART INFORMATION
============================================================

When Product Type = Spare Part:

Possible:

Part Number

OEM Number

Manufacturer

Compatible Vehicles

Alternative Parts

Position

Part Group

Warranty

============================================================
22. VEHICLE COMPATIBILITY
============================================================

Product may support:

Manufacturer

Model

Variant

Fuel Type

Year Range

Engine where applicable

Multiple compatibility records may be added.

============================================================
23. ALTERNATIVE PARTS
============================================================

Product may link alternative products.

Display:

Alternative Part

Brand

Part Number

Stock

Selling Price

Compatibility

Priority

This information should be available during Job Card part search.

============================================================
24. PRODUCT SUPPLIERS
============================================================

Show suppliers associated with product.

Fields:

Vendor

Vendor Part Number

Purchase Price

Lead Time

Minimum Order Qty

Preferred Vendor

Last Purchase Price

Last Purchase Date

============================================================
25. PRODUCT STORAGE LOCATION
============================================================

Prepare hierarchy where required:

Branch
        ↓
Store / Warehouse
        ↓
Rack
        ↓
Bin

Example:

Pune Main Branch
        ↓
Main Parts Store
        ↓
Rack A-04
        ↓
Bin B-12

============================================================
26. PRODUCT DETAIL
============================================================

Use:

T04 Detail Page

Recommended tabs:

Overview

Stock

Pricing

Suppliers

Compatibility

Alternatives

Transactions

Documents

Activity

============================================================
27. PRODUCT OVERVIEW
============================================================

Display:

Product

SKU

Part Number

Barcode

Category

Brand

Unit

Current Stock

Available

Reserved

Reorder Level

Purchase Price

Selling Price

Tax

Location

Status

============================================================
28. PRODUCT STOCK SUMMARY
============================================================

Show:

On Hand

Reserved

Available

In Transit

Pending Receipt

Damaged

Stock Value

Example:

On Hand
25

Reserved
5

Available
20

In Transit
10

============================================================
29. STOCK QUANTITY PRINCIPLE
============================================================

Conceptually:

ON HAND
-
RESERVED
=
AVAILABLE

Additional states such as:

In Transit

Damaged

Pending Receipt

must remain separately visible.

Do NOT mix all quantities into one number.

============================================================
30. STOCK PAGE
============================================================

Page:

Inventory / Stock

Use:

T02 List + Inventory-specific summary

Purpose:

View current stock across products and locations.

============================================================
31. STOCK FILTERS
============================================================

Search:

Product

SKU

Part Number

Barcode

Filters:

Branch

Warehouse / Store

Category

Brand

Product Type

Stock Status

Location

============================================================
32. STOCK TABLE
============================================================

Recommended columns:

Product

SKU

Location

On Hand

Reserved

Available

Reorder Level

In Transit

Damaged

Stock Value

Status

Actions

============================================================
33. STOCK QUICK VIEW
============================================================

Click stock row:

Open Product Stock Quick View.

Show:

Current Position

Location-wise Stock

Reservations

Pending Receipts

Recent Issues

Recent Returns

Recent Adjustments

Actions where allowed.

============================================================
34. STOCK TRANSACTION PRINCIPLE
============================================================

EVERY stock movement must conceptually have:

Transaction Type

Product

Quantity

From Location where applicable

To Location where applicable

Source Module

Source Record

User

Date / Time

Reference

Remarks

============================================================
35. STOCK TRANSACTION TYPES
============================================================

Required preparation:

Opening Stock

Purchase Receipt

Purchase Return

Job Card Reservation

Job Card Issue

Job Card Return

Counter Sale

Counter Sale Return

Stock Transfer Out

Stock Transfer In

Stock Adjustment Increase

Stock Adjustment Decrease

Damage

Loss

Physical Verification Adjustment

Other approved transactions

============================================================
36. STOCK HISTORY / LEDGER
============================================================

Product Transactions tab should provide chronological stock
history.

Columns:

Date / Time

Transaction

Reference

Source

Location

Stock In

Stock Out

Balance

User

Remarks

============================================================
37. SOURCE RECORD CONNECTION
============================================================

Examples:

Job Card Issue
→ JC-2026-001248

Purchase Receipt
→ GRN-2026-000145

Counter Sale
→ CS-2026-001458

Transfer
→ ST-2026-000089

Source reference should be clickable.

============================================================
38. OPENING STOCK
============================================================

Opening Stock should be primarily used during:

Initial Setup

New Product

New Branch / Store

Data Migration

Fields:

Product

Location

Quantity

Rate / Cost

Opening Date

Remarks

============================================================
39. STOCK IN
============================================================

Stock In may originate from:

Purchase Receipt

Customer Return where applicable

Job Card Return

Transfer In

Adjustment Increase

Opening Stock

Do NOT create generic Stock In that loses source context.

============================================================
40. STOCK OUT
============================================================

Stock Out may originate from:

Job Card Issue

Counter Sale

Purchase Return

Transfer Out

Adjustment Decrease

Damage

Loss

Do NOT lose source record.

============================================================
41. JOB CARD RESERVATION
============================================================

Workshop process:

Part Required
        ↓
Check Availability
        ↓
Reserve
        ↓
Reserved Quantity Updated
        ↓
Available Quantity Reduced
        ↓
Part Ready for Issue

Reservation does NOT mean physical stock has left the store.

============================================================
42. RESERVATION INFORMATION
============================================================

Fields:

Product

Job Card

Vehicle

Required Qty

Reserved Qty

Location

Reserved By

Reserved Date / Time

Expiry / Release condition where applicable later

Status

============================================================
43. RESERVATION STATUS
============================================================

Possible:

Requested

Partially Reserved

Reserved

Released

Issued

Cancelled

Unavailable

============================================================
44. PART ISSUE
============================================================

Process:

Reserved / Requested Part
        ↓
Select Issue Qty
        ↓
Confirm Technician / Job Card
        ↓
Issue
        ↓
On-Hand Stock Reduced
        ↓
Reservation Adjusted
        ↓
Job Card Item Updated

============================================================
45. PART ISSUE DRAWER
============================================================

Show:

Job Card

Vehicle

Technician

Product

Requested Qty

Reserved Qty

Available Qty

Issue Qty *

Location

Issued By

Remarks

Action:

Issue Part

============================================================
46. PARTIAL ISSUE
============================================================

Example:

Required:
4

Available:
2

Issue:
2

Remaining:
2

Status:

Partially Issued

The Job Card should clearly show pending quantity.

============================================================
47. JOB CARD RETURN
============================================================

Unused issued parts may be returned.

Process:

Issued Part
        ↓
Select Return Qty
        ↓
Condition
        ↓
Return to Stock
        ↓
Stock Updated
        ↓
Job Card Consumption Updated

============================================================
48. RETURN CONDITION
============================================================

Possible:

Unused / Good

Opened

Damaged

Defective

Wrong Part

Other

Only appropriate condition should return to usable stock later
according to backend rules.

Frontend should show this distinction.

============================================================
49. CONSUMED QUANTITY
============================================================

Job Card should conceptually distinguish:

Required

Reserved

Issued

Returned

Consumed

Example:

Issued:
2

Returned:
1

Consumed:
1

Invoice should use approved/final business rules.

============================================================
50. JOB CARD PART HISTORY
============================================================

Inventory should allow viewing:

Requested

Reserved

Issued

Returned

Consumed

User

Date / Time

Source Job Card

============================================================
51. BARCODE
============================================================

Barcode UI should be reusable in:

Product Search

Stock Lookup

Job Card Issue

Counter Sale

GRN

Physical Verification

Stock Transfer

No hardware integration required.

============================================================
52. BARCODE LOOKUP
============================================================

Flow:

Scan / Enter Barcode
        ↓
Find Product
        ↓
Show Product
        ↓
Show Stock
        ↓
Continue Relevant Operation

============================================================
53. PURCHASE RECEIPT
============================================================

Purchase module owns Purchase Order / GRN process.

Inventory receives:

GRN
        ↓
Accepted Quantity
        ↓
Stock In
        ↓
Product Stock Updated
        ↓
Transaction Created

Do NOT manually re-enter received stock in Inventory.

============================================================
54. PURCHASE RECEIPT INFORMATION
============================================================

Inventory transaction should reference:

Purchase Order

GRN

Vendor

Product

Received Qty

Accepted Qty

Rejected Qty

Location

Cost

Date

============================================================
55. PURCHASE RETURN
============================================================

Purchase Return
        ↓
Select Received Product
        ↓
Return Qty
        ↓
Reason
        ↓
Stock Out
        ↓
Vendor / Finance Adjustment

Inventory should preserve source reference.

============================================================
56. COUNTER SALE CONNECTION
============================================================

Counter Sale
        ↓
Product Sold
        ↓
Stock Out
        ↓
Inventory Updated

Sales Return
        ↓
Condition Check
        ↓
Eligible Stock Return
        ↓
Inventory Updated

No duplicate stock entry.

============================================================
57. STOCK TRANSFER
============================================================

Support transfer between:

Store → Store

Warehouse → Warehouse

Branch → Branch

Where configuration allows.

============================================================
58. STOCK TRANSFER PROCESS
============================================================

Create Transfer
        ↓
Source Location
        ↓
Destination Location
        ↓
Add Products
        ↓
Enter Quantities
        ↓
Submit
        ↓
Approval where required
        ↓
Dispatch
        ↓
In Transit
        ↓
Receive
        ↓
Verify
        ↓
Complete

============================================================
59. STOCK TRANSFER WORKSPACE
============================================================

Use:

T03 Workspace

Contains:

Transfer Number

Source

Destination

Date

Requested By

Items

Quantities

Dispatch

Receive

Differences

Documents

Status

Timeline

============================================================
60. STOCK TRANSFER ITEM GRID
============================================================

Columns:

Product

SKU

Available

Requested Qty

Approved Qty

Dispatched Qty

Received Qty

Difference

Status

============================================================
61. TRANSFER STATUS
============================================================

Possible:

Draft

Submitted

Approval Pending

Approved

Rejected

Ready to Dispatch

Dispatched

In Transit

Partially Received

Received

Completed

Cancelled

============================================================
62. TRANSFER DISPATCH
============================================================

Capture:

Dispatch Date

Dispatched By

Transport / Driver where applicable

Reference

Items

Dispatched Qty

Documents

Remarks

============================================================
63. TRANSFER RECEIPT
============================================================

Capture:

Received Date

Received By

Received Qty

Damaged Qty

Missing Qty

Excess Qty

Remarks

============================================================
64. TRANSFER DIFFERENCE
============================================================

Example:

Dispatched:
10

Received:
9

Damaged:
1

Difference:
0

OR:

Dispatched:
10

Received:
9

Missing:
1

Difference:
1

Difference must remain visible for review.

============================================================
65. STOCK ADJUSTMENT
============================================================

Stock Adjustment is used for authorized corrections.

Types:

Increase

Decrease

============================================================
66. STOCK ADJUSTMENT PROCESS
============================================================

Select Product
        ↓
Current Stock
        ↓
Adjustment Type
        ↓
Quantity
        ↓
Reason
        ↓
New Stock Preview
        ↓
Approval where required
        ↓
Confirm
        ↓
Transaction History

============================================================
67. STOCK ADJUSTMENT REASONS
============================================================

Possible:

Data Correction

Counting Difference

Damage

Loss

Found Stock

Unit Correction

Migration

Other

Damage/Loss may have dedicated operational treatment.

============================================================
68. STOCK ADJUSTMENT UI
============================================================

Show:

Current Quantity

Adjustment:

+5

or

-3

New Quantity:

22

Require:

Reason

Remarks

User

Date

============================================================
69. DAMAGE
============================================================

Damaged stock should NOT silently disappear.

Capture:

Product

Quantity

Location

Damage Type

Reason

Photo

Date

Reported By

Disposition

============================================================
70. DAMAGE DISPOSITION
============================================================

Possible:

Hold

Return to Vendor

Repair

Scrap

Write-Off

Move to Damaged Stock

Actual accounting rules later.

============================================================
71. LOST STOCK
============================================================

Capture:

Product

Quantity

Location

Reason

Reported By

Date

Remarks

Approval where required later

Maintain audit trail.

============================================================
72. PHYSICAL STOCK VERIFICATION
============================================================

Purpose:

Compare system stock with actual counted stock.

============================================================
73. PHYSICAL VERIFICATION PROCESS
============================================================

Create Stock Count
        ↓
Select Branch / Location
        ↓
Select Products / Category
        ↓
System Quantity Captured
        ↓
Physical Counting
        ↓
Enter Counted Quantity
        ↓
Calculate Difference
        ↓
Review
        ↓
Approve Adjustment
        ↓
Stock Updated

============================================================
74. STOCK COUNT WORKSPACE
============================================================

Header:

Count Number

Branch

Location

Date

Status

Created By

Assigned To

Items:

Product

System Qty

Physical Qty

Difference

Reason

Status

============================================================
75. STOCK COUNT STATUS
============================================================

Possible:

Draft

Counting

Review Pending

Approved

Adjusted

Completed

Cancelled

============================================================
76. STOCK DIFFERENCE
============================================================

Example:

Front Brake Pad Set

System:
20

Physical:
18

Difference:
-2

Reason:
Pending Review

Highlight meaningful discrepancies.

============================================================
77. BLIND STOCK COUNT PREPARATION
============================================================

Optional future mode:

Hide System Quantity during counting.

User enters Physical Quantity.

System difference shown only during review.

Frontend architecture may prepare for this option.

============================================================
78. LOW STOCK
============================================================

When:

Available Stock <= Reorder Level

Status:

LOW STOCK

Display in:

Product

Stock List

Inventory Dashboard

Purchase Requirement context

============================================================
79. OUT OF STOCK
============================================================

When usable available stock is zero:

OUT OF STOCK

Show:

Pending Purchase

Expected Receipt

Alternative Part

Related Waiting Job Cards

============================================================
80. REORDER
============================================================

Product may define:

Minimum Stock

Maximum Stock

Reorder Level

Reorder Quantity

When threshold reached:

Show Purchase Suggestion.

============================================================
81. PURCHASE SUGGESTION
============================================================

Example:

Front Brake Pad Set

Available:
2

Reorder Level:
5

Suggested Qty:
10

Preferred Vendor:
Auto Parts India

Actions:

Create Purchase Requirement

View Product

Ignore / Snooze where appropriate later

============================================================
82. STOCK RESERVATION SUMMARY
============================================================

Product Detail should show reservations.

Columns:

Source

Reference

Customer / Vehicle

Qty

Reserved Date

Status

Example:

Job Card

JC-2026-001248

MH 12 AB 4582

1

28 Jul 2026

Reserved

============================================================
83. STOCK LOCATION SUMMARY
============================================================

Example:

Pune Main Branch

Main Store
20

Workshop Store
5

Damaged Stock
2

Total:
27

============================================================
84. MULTI-BRANCH STOCK
============================================================

Each stock quantity belongs to a location.

Example:

Pune Branch
Available 20

Mumbai Branch
Available 8

Nashik Branch
Available 0

Do NOT show organization total as though it were locally
available stock.

============================================================
85. OTHER BRANCH AVAILABILITY
============================================================

When local stock unavailable:

Show:

Other Branch Availability

Mumbai Branch:
8

Nashik Branch:
3

Possible action:

Create Stock Transfer

============================================================
86. PRODUCT PRICE HISTORY
============================================================

Product may show:

Date

Vendor

Purchase Price

Selling Price

Changed By

Source

Useful for purchase/price review.

============================================================
87. LAST PURCHASE INFORMATION
============================================================

Display:

Last Vendor

Last Purchase Date

Last Purchase Price

Last Quantity

Purchase Order

============================================================
88. STOCK VALUATION PREPARATION
============================================================

UI may display:

Stock Quantity

Average Cost / Valuation Cost

Stock Value

Actual valuation method will be defined during accounting/backend
implementation.

Do NOT invent accounting calculations during frontend phase.

============================================================
89. SERIAL NUMBER PREPARATION
============================================================

Some future products may require serial tracking.

UI architecture may prepare:

Serial Number

Status

Location

Source

Issued To

History

Do NOT force serial tracking for all products.

============================================================
90. BATCH PREPARATION
============================================================

Possible future batch fields:

Batch Number

Manufacturing Date

Expiry Date

Quantity

Purchase Reference

Location

Use only where product requires it.

============================================================
91. EXPIRY ALERTS
============================================================

For applicable products:

Expiring Soon

Expired

Show:

Product

Batch

Expiry

Quantity

Location

Do NOT apply expiry logic to products without expiry tracking.

============================================================
92. DEAD / NON-MOVING STOCK
============================================================

Inventory Dashboard / Reports may identify:

No movement for configured period.

Display:

Product

Stock

Value

Last Movement

Last Sale / Issue

No backend analytics required now.

============================================================
93. FAST-MOVING STOCK
============================================================

Optional analytical view:

Product

Consumption

Sales

Average Movement

Current Stock

Days of Stock where calculated later

============================================================
94. STOCK REQUEST
============================================================

Where internal stock request is needed:

Requester
        ↓
Select Product
        ↓
Qty
        ↓
Source / Job Card
        ↓
Store Review
        ↓
Reserve / Issue / Reject

Job Card requests should remain connected to Job Card.

============================================================
95. STOCK REQUEST STATUS
============================================================

Possible:

Requested

Approved

Partially Approved

Rejected

Reserved

Issued

Completed

Cancelled

============================================================
96. INVENTORY QUICK ACTIONS
============================================================

Recommended:

Add Product

Scan Product

Stock Lookup

Stock Transfer

Stock Adjustment

Stock Count

More ▼

Additional:

Opening Stock

Damage Entry

Lost Stock

Import Products

Export Stock

============================================================
97. PRODUCT QUICK ACTIONS
============================================================

Possible:

Edit

View Stock

Transfer

Adjust

View Transactions

View Reservations

Create Purchase Requirement

Print Barcode

Duplicate Product

Deactivate

============================================================
98. PRINT BARCODE
============================================================

Frontend should provide barcode label preview.

Possible fields:

Product Name

SKU

Part Number

Barcode

Price where configured

Label Quantity

Label Size

Print

No barcode printer integration required.

============================================================
99. PRODUCT IMPORT
============================================================

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
Import

Possible identifiers:

SKU

Part Number

Barcode

============================================================
100. OPENING STOCK IMPORT
============================================================

Separate import mode may support:

Product

Branch

Store

Location

Quantity

Cost

Opening Date

Frontend preparation only.

============================================================
101. INVENTORY EXPORT
============================================================

Possible:

Product List

Current Stock

Low Stock

Out of Stock

Stock Ledger

Stock Valuation

Reservations

Transfers

Adjustments

Damaged Stock

============================================================
102. INVENTORY REPORTS
============================================================

Report Center may include:

Stock Summary

Stock Ledger

Stock Movement

Stock Valuation

Low Stock

Out of Stock

Reorder

Job Card Consumption

Part Issue

Part Return

Purchase Receipt

Sales Stock Out

Stock Transfer

Stock Adjustment

Physical Difference

Damage / Loss

Dead Stock

Fast Moving

============================================================
103. INVENTORY + WORKSHOP
============================================================

Workshop identifies requirement.

Inventory manages physical stock.

Flow:

Job Card
        ↓
Part Required
        ↓
Availability
        ↓
Reserve
        ↓
Issue
        ↓
Consume / Return
        ↓
Final Stock

Workshop user remains inside Job Card for normal operation.

Inventory user sees corresponding stock activity.

============================================================
104. INVENTORY + PURCHASE
============================================================

Low Stock / Requirement
        ↓
Purchase Requirement
        ↓
Purchase Order
        ↓
GRN
        ↓
Accepted Stock
        ↓
Inventory Stock In

No duplicate receipt entry.

============================================================
105. INVENTORY + COUNTER SALE
============================================================

Counter Sale
        ↓
Item Sold
        ↓
Stock Out

Return
        ↓
Condition Verification
        ↓
Eligible Stock In

============================================================
106. INVENTORY + VEHICLE SALES
============================================================

Vehicle Sales may consume:

Accessories

Add-ons

Other stock items

Where stock-controlled:

Vehicle Sale
        ↓
Accessory Issue
        ↓
Inventory Stock Out

============================================================
107. INVENTORY + FINANCE
============================================================

Inventory may provide:

Stock Value

Purchase Cost Context

Damage / Write-Off Context

Finance owns accounting entries.

Do NOT build general ledger logic inside Inventory UI.

============================================================
108. INVENTORY + VENDOR
============================================================

Product Supplier information references shared Vendor records.

Do NOT create Inventory Supplier separately from Purchase Vendor.

============================================================
109. INVENTORY + MASTERS
============================================================

Shared masters may include:

Product Category

Brand

Unit

HSN / SAC

Stock Location

Tax

Manufacturer where required

Do NOT duplicate these inside every Product form.

============================================================
110. INVENTORY + EMPLOYEE
============================================================

Users such as:

Store Manager

Store Keeper

Technician

Approver

reference shared Employee/User records.

============================================================
111. STOCK STATUS
============================================================

Possible UI statuses:

IN STOCK

LOW STOCK

OUT OF STOCK

RESERVED

PARTIALLY AVAILABLE

IN TRANSIT

DAMAGED

BLOCKED

INACTIVE

Use status text, not color alone.

============================================================
112. TRANSACTION STATUS
============================================================

Possible:

Draft

Pending

Approved

Completed

Partially Completed

Cancelled

Rejected

Exact availability depends on transaction type.

============================================================
113. STOCK ACTION SAFETY
============================================================

Do NOT allow frontend interactions to appear as silent quantity
editing.

Incorrect:

Current Stock: [ 25 ]

User changes directly to 40.

Correct:

Current Stock:
25

[ Adjust Stock ]

        ↓

Adjustment transaction created.

============================================================
114. STOCK HISTORY IMMUTABILITY
============================================================

Completed stock transactions should appear historical.

Corrections should conceptually occur through:

Return

Reversal

Adjustment

Do NOT show normal Delete action for completed stock movements.

============================================================
115. PRODUCT DELETE
============================================================

If Product has transaction history:

Prefer:

Deactivate

Archive

Do NOT visually encourage permanent delete.

Soft Delete may be available according to Administration rules.

============================================================
116. DUPLICATE PRODUCT DETECTION
============================================================

During Product creation check frontend demo for:

SKU

Part Number

Barcode

OEM Number

Show:

POSSIBLE DUPLICATE PRODUCT

Front Brake Pad Set

SKU:
BRK-PAD-001

Part:
BP-4582

Actions:

Open Existing

Continue where permitted

============================================================
117. SEARCH EXPERIENCE
============================================================

Inventory search should be fast and practical.

Support:

Product Name

SKU

Part Number

OEM Number

Barcode

Brand

Vehicle Compatibility where appropriate

============================================================
118. GLOBAL SEARCH
============================================================

Global ERP Search should find Product.

Result example:

PRODUCT

Front Brake Pad Set

SKU BRK-PAD-001

Available:
20

Pune Main Branch

Click:

Open Product.

============================================================
119. STOCK QUICK LOOKUP
============================================================

Quick Action:

Stock Lookup

Use Drawer / Modal.

Search Product / Scan Barcode.

Display:

Product

Available

Reserved

Location

Selling Price

Alternative Parts

Other Branch Stock

============================================================
120. BRANCH AWARENESS
============================================================

Inventory operations must visibly retain:

Branch

Store / Warehouse

Location

Examples:

Stock Issue

Stock Transfer

Stock Adjustment

Physical Verification

Purchase Receipt

============================================================
121. DOCUMENTS
============================================================

Inventory-related documents may include:

Stock Transfer Note

Stock Adjustment Note

Stock Count Sheet

Damage Report

Barcode Labels

Purchase Receipt Reference

Supporting Attachments

============================================================
122. INVENTORY TIMELINE / ACTIVITY
============================================================

Product activity may show:

Product Created

Price Updated

Opening Stock Added

Purchase Received

Reserved for Job Card

Issued to Job Card

Returned

Counter Sale

Transferred

Adjusted

Damage Reported

Physical Count Completed

============================================================
123. STOCK TRANSFER DOCUMENT
============================================================

Printable transfer document may contain:

Transfer Number

Source

Destination

Date

Products

Quantities

Dispatch Details

Received Details

Prepared By

Approved By

Received By

Signatures

============================================================
124. STOCK COUNT SHEET
============================================================

Printable stock count sheet may contain:

Count Number

Branch

Location

Category

Product

SKU

Physical Count field

Remarks

Signature

Blind-count version may omit system quantity.

============================================================
125. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Product Search

Product Filters

Add Product

Conditional Product Fields

Product Detail Tabs

Stock Summary

Stock Lookup

Barcode Search

Alternative Parts

Supplier Information

Vehicle Compatibility

Stock Ledger

Opening Stock

Job Card Reservation

Part Issue

Partial Issue

Part Return

Purchase Receipt Reference

Counter Sale Stock Out Reference

Stock Transfer

Dispatch

Receive

Transfer Difference

Stock Adjustment

Damage Entry

Lost Stock

Physical Verification

Stock Difference

Low Stock

Out of Stock

Reorder Suggestion

Other Branch Availability

Print Barcode

Documents

Activity

No API/backend required.

============================================================
126. RECOMMENDED FRONTEND FILES
============================================================

inventory-dashboard.html

products.html

product-form.html

product-detail.html

stock.html

stock-transfer.html

stock-transfer-workspace.html

stock-count.html

stock-count-workspace.html

stock-transfer-print.html

stock-count-print.html

Do NOT create separate HTML pages for every minor stock
transaction.

Use contextual drawers/modals/components.

============================================================
127. REUSABLE INVENTORY COMPONENTS
============================================================

Product Search

Barcode Search

Stock Summary

Stock Location View

Stock Availability

Alternative Part Selector

Supplier Summary

Vehicle Compatibility

Stock Transaction Table

Stock Ledger

Reservation Drawer

Issue Drawer

Return Drawer

Adjustment Drawer

Damage Drawer

Transfer Item Grid

Stock Count Grid

Reorder Alert

Location Selector

============================================================
128. FEATURE → LOCATION MAP
============================================================

Products
→ Product List / Product Detail

Current Stock
→ Stock Page + Product Detail

Barcode
→ Product / Stock Operations

Opening Stock
→ Contextual Inventory Action

Reservation
→ Job Card + Inventory Transaction

Part Issue
→ Job Card / Inventory Context

Part Return
→ Job Card / Inventory Context

Purchase Receipt
→ Purchase GRN + Inventory Transaction

Counter Sale Stock Out
→ Counter Sale + Inventory Transaction

Transfer
→ Stock Transfer Workspace

Adjustment
→ Inventory Contextual Action

Damage
→ Inventory Contextual Action

Loss
→ Inventory Contextual Action

Physical Verification
→ Stock Count Workspace

Low Stock
→ Dashboard / Stock

Reorder
→ Dashboard / Product / Purchase

Stock Ledger
→ Product Transactions

Alternative Parts
→ Product + Job Card Search

Vehicle Compatibility
→ Product Detail

============================================================
129. INVENTORY ACCEPTANCE CHECKLIST
============================================================

Before Inventory is considered complete:

[ ] Inventory Dashboard

[ ] Product List

[ ] Add Product

[ ] Edit Product

[ ] Product Types

[ ] Spare Fields

[ ] Lube Fields

[ ] SKU

[ ] Part Number

[ ] OEM Number

[ ] Barcode

[ ] HSN / SAC

[ ] Category

[ ] Brand

[ ] Unit

[ ] Pricing

[ ] Tax

[ ] Reorder Level

[ ] Minimum Stock

[ ] Maximum Stock

[ ] Vehicle Compatibility

[ ] Alternative Parts

[ ] Suppliers

[ ] Storage Location

[ ] Product Detail

[ ] Stock Page

[ ] On Hand

[ ] Reserved

[ ] Available

[ ] In Transit

[ ] Damaged

[ ] Stock Ledger

[ ] Opening Stock

[ ] Job Card Reservation

[ ] Part Issue

[ ] Partial Issue

[ ] Part Return

[ ] Consumed Qty

[ ] Barcode Lookup

[ ] Purchase Receipt Link

[ ] Purchase Return Link

[ ] Counter Sale Stock Out

[ ] Sales Return

[ ] Stock Transfer

[ ] Dispatch

[ ] Receive

[ ] Transfer Difference

[ ] Stock Adjustment

[ ] Damage

[ ] Loss

[ ] Physical Verification

[ ] Physical Difference

[ ] Low Stock

[ ] Out of Stock

[ ] Reorder Suggestion

[ ] Other Branch Availability

[ ] Product Import UI

[ ] Stock Export UI

[ ] Barcode Print

[ ] Documents

[ ] Activity

[ ] Branch / Location Context

[ ] No backend/API generated

============================================================
130. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create separate stock systems for Workshop and Counter Sale.
- Create separate Product records per operational module.
- Create separate Vendor records for Inventory.
- Manually edit completed stock quantities.
- Delete completed stock movements.
- Treat Reserved stock as physically issued.
- Treat In-Transit stock as locally available.
- Lose Job Card reference during part issue.
- Lose Purchase reference during receipt.
- Lose Counter Sale reference during stock out.
- Hide stock differences during transfer.
- Hide physical-count differences.
- Silently remove damaged/lost stock.
- Duplicate Purchase functionality inside Inventory.
- Duplicate Workshop functionality inside Inventory.
- Create every stock action as a sidebar submenu.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
131. FINAL INVENTORY EXPERIENCE
============================================================

When a user opens a Product they should immediately understand:

WHAT IS THIS PRODUCT?

WHAT IS ITS PART NUMBER / BARCODE?

HOW MUCH STOCK DO WE HAVE?

HOW MUCH IS RESERVED?

HOW MUCH IS ACTUALLY AVAILABLE?

WHERE IS IT STORED?

IS ANOTHER BRANCH HOLDING STOCK?

WHICH JOB CARDS REQUIRE IT?

WHICH VENDOR SUPPLIES IT?

WHAT WAS THE LAST PURCHASE PRICE?

WHAT ARE THE ALTERNATIVE PARTS?

WHICH VEHICLES ARE COMPATIBLE?

WHAT STOCK MOVEMENTS HAVE HAPPENED?

DO WE NEED TO REORDER?

============================================================
132. FINAL INVENTORY PRINCIPLE
============================================================

INVENTORY SHOULD NOT FEEL LIKE:

PRODUCT
+
STOCK IN
+
STOCK OUT
+
RESERVATION
+
ISSUE
+
RETURN
+
TRANSFER
+
ADJUSTMENT
+
DAMAGE
+
COUNTING

AS DISCONNECTED MODULES.

IT SHOULD FEEL LIKE:

PRODUCT
        ↓
STOCK POSITION
        ↓
REQUIREMENT
        ↓
RESERVE
        ↓
ISSUE / SALE / TRANSFER
        ↓
CONSUME / RECEIVE / RETURN
        ↓
STOCK UPDATE
        ↓
REORDER
        ↓
COMPLETE STOCK HISTORY

ONE PRODUCT.

ONE STOCK SYSTEM.

EVERY MOVEMENT TRACEABLE.

NO DUPLICATE ENTRY.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/04_INVENTORY.md
============================================================