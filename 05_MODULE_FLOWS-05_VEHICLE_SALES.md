# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/05_VEHICLE_SALES.md
# VEHICLE SALES — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Vehicle Sales manages the COMPLETE vehicle selling lifecycle.

The Vehicle Sale is the CENTRAL BUSINESS RECORD.

The user must be able to manage:

Customer

Vehicle Selection

Enquiry

Quotation

Test Drive

Booking

Exchange Vehicle

Finance

Insurance

Accessories

RTO / Registration

Billing

Payments

Delivery

Documents

Timeline

from ONE Vehicle Sale Workspace.

Do NOT create unnecessary separate operational menus for every
step.

============================================================
2. PRIMARY VEHICLE SALES NAVIGATION
============================================================

VEHICLE SALES

    Sales Dashboard

    Vehicle Stock

    Sales

These should be the primary navigation entries.

Activities such as:

Quotation

Booking

Test Drive

Exchange

Finance

Insurance

Accessories

RTO

Payment

Delivery

should primarily exist inside the Vehicle Sale Workspace.

============================================================
3. COMPLETE VEHICLE SALES PROCESS
============================================================

Customer / Lead
        ↓
Vehicle Selection
        ↓
Enquiry / Requirement
        ↓
Quotation
        ↓
Test Drive if required
        ↓
Negotiation
        ↓
Booking
        ↓
Exchange Vehicle if applicable
        ↓
Finance if applicable
        ↓
Insurance
        ↓
Accessories / Add-ons
        ↓
Final Price
        ↓
Customer Approval
        ↓
Vehicle Allocation
        ↓
RTO / Registration
        ↓
Invoice
        ↓
Payment
        ↓
Pre-Delivery Inspection
        ↓
Delivery
        ↓
Customer Handover
        ↓
Documents
        ↓
Timeline

============================================================
4. PRIMARY BUSINESS OBJECTS
============================================================

Vehicle Sales contains:

VEHICLE STOCK

VEHICLE SALE

Vehicle Sale connects to shared:

Lead

Customer

Vehicle

Employee

Inventory

Insurance

Finance

Documents

Do NOT duplicate these entities.

============================================================
5. SALES DASHBOARD
============================================================

Use:

T01 Dashboard

Dashboard should provide:

New Enquiries

Open Sales

Quotations

Test Drives

Bookings

Finance Pending

Insurance Pending

RTO Pending

Vehicles Awaiting Delivery

Deliveries Today

Sales This Month

Cancelled Bookings

============================================================
6. SALES DASHBOARD ATTENTION
============================================================

ATTENTION REQUIRED may include:

Quotation Follow-Up

Booking Payment Pending

Finance Approval Pending

Insurance Pending

Vehicle Allocation Pending

RTO Pending

PDI Pending

Delivery Today

Overdue Delivery

Document Missing

============================================================
7. SALES DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ New Sale

+ Add Vehicle Stock

Search Vehicle

Search Customer

More ▼

Do NOT place complete transaction forms on dashboard.

============================================================
8. VEHICLE STOCK
============================================================

Vehicle Stock represents vehicles available / allocated /
delivered through the dealership or garage business.

Use:

T02 List Page

Primary Action:

+ Add Vehicle

============================================================
9. VEHICLE STOCK LIST
============================================================

Quick filters:

All

Available

Reserved

Booked

Allocated

In Transit

PDI Pending

Ready for Delivery

Delivered

Hold

============================================================
10. VEHICLE STOCK SEARCH
============================================================

Search:

Stock Number

VIN / Chassis

Engine Number

Registration Number

Manufacturer

Model

Variant

Color

============================================================
11. VEHICLE STOCK FILTERS
============================================================

Filters:

Manufacturer

Model

Variant

Fuel Type

Transmission

Color

Model Year

Stock Status

Branch

Location

Ageing

============================================================
12. VEHICLE STOCK TABLE
============================================================

Recommended columns:

Stock No

Vehicle

Variant

Color

VIN / Chassis

Engine No

Year

Location

Stock Age

Sale Price

Status

Actions

Primary:

Open

Secondary:

More ▼

============================================================
13. VEHICLE STOCK STATUS
============================================================

Possible:

Ordered

In Transit

Received

Available

Reserved

Booked

Allocated

PDI Pending

Ready for Delivery

Delivered

Hold

Cancelled / Returned where applicable

============================================================
14. ADD VEHICLE STOCK
============================================================

Use:

T05 Add/Edit Form

Sections:

Vehicle Information

Identification

Purchase / Source

Pricing

Location

Documents

Status

============================================================
15. VEHICLE INFORMATION
============================================================

Fields may include:

Manufacturer *

Model *

Variant *

Fuel Type

Transmission

Model Year

Manufacturing Year

Color

Body Type

============================================================
16. VEHICLE IDENTIFICATION
============================================================

Fields:

Stock Number

VIN / Chassis Number *

Engine Number

Key Number where applicable

Registration Number if already registered

============================================================
17. VEHICLE SOURCE
============================================================

Possible:

Manufacturer

Dealer

Vendor

Trade-In

Internal Transfer

Other

Show related source reference where applicable.

============================================================
18. VEHICLE STOCK PRICING
============================================================

Possible:

Purchase Cost

Ex-Showroom Price

Selling Price

Tax

Other Charges

Actual accounting/tax rules belong to backend/finance phase.

============================================================
19. VEHICLE STOCK DETAIL
============================================================

Recommended tabs:

Overview

Pricing

Allocation

PDI

Documents

History

============================================================
20. STOCK OVERVIEW
============================================================

Display:

Vehicle

Variant

Color

VIN

Engine Number

Stock Number

Current Location

Stock Status

Stock Age

Selling Price

Allocation

Expected Delivery where applicable

============================================================
21. SALES LIST
============================================================

Use:

T02 List Page

Page:

Vehicle Sales / Sales

Primary Action:

+ New Sale

============================================================
22. SALES LIST QUICK FILTERS
============================================================

All

Enquiry

Quotation

Negotiation

Booked

Finance Pending

RTO Pending

Ready for Delivery

Delivered

Cancelled

============================================================
23. SALES LIST SEARCH
============================================================

Search:

Sale Number

Customer

Mobile

Vehicle

VIN

Booking Number

Invoice Number

Registration Number

============================================================
24. SALES LIST FILTERS
============================================================

Status

Sales Executive

Vehicle

Booking Date

Expected Delivery

Payment Status

Finance Status

RTO Status

Branch

============================================================
25. SALES LIST TABLE
============================================================

Recommended columns:

Sale No

Customer

Vehicle

Sales Executive

Booking

Vehicle Allocation

Finance

Payment

RTO

Expected Delivery

Status

Actions

============================================================
26. CREATE VEHICLE SALE
============================================================

Flow:

+ New Sale
        ↓
Search Customer / Lead
        ↓
Select / Quick Add Customer
        ↓
Select Vehicle Requirement
        ↓
Select Vehicle / Variant
        ↓
Create Sale
        ↓
Open Vehicle Sale Workspace

Known CRM information must carry forward.

============================================================
27. VEHICLE SALE WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

This is the CENTRAL workspace for the entire sale.

Do NOT require users to navigate between unrelated modules to
complete a normal vehicle sale.

============================================================
28. VEHICLE SALE HEADER
============================================================

Example:

SALE #VS-2026-00158

[ BOOKED ] [ FINANCE PENDING ]

Rajesh Sharma

Maruti Suzuki Brezza ZXI

White

Sales Executive:
Neha Patil

Branch:
Pune Main Branch

Booking:
BK-2026-00148

Expected Delivery:
05 Aug 2026

Actions:

[ Update Status ]

[ More ▼ ]

============================================================
29. SALE HEADER SUMMARY
============================================================

Display:

Vehicle Price

Discount

Accessories

Insurance

RTO

Exchange

Final Amount

Paid

Balance

Example:

Final Amount
₹1,250,000

Paid
₹100,000

Balance
₹1,150,000

============================================================
30. SALE PROCESS PROGRESS
============================================================

Recommended visual progress:

Quotation ✓

Booking ✓

Finance ●

Insurance ○

RTO ○

Invoice ○

PDI ○

Delivery ○

Do NOT force this into a rigid wizard.

============================================================
31. SALE WORKSPACE NAVIGATION
============================================================

Recommended:

Overview

Quotation

Booking

Exchange

Finance

Insurance

Accessories

RTO

Invoice & Payment

PDI & Delivery

Documents

Timeline

These are internal workspace sections.

NOT global sidebar modules.

============================================================
32. SALE OVERVIEW
============================================================

Overview should answer:

Who is the customer?

Which vehicle are they buying?

Which variant / color?

What is the current stage?

Who is the sales executive?

What was quoted?

Has booking been received?

Is vehicle allocated?

Is finance approved?

Is insurance completed?

Is RTO completed?

How much is paid?

When is delivery?

============================================================
33. CUSTOMER INFORMATION
============================================================

Display:

Customer Code

Name

Mobile

Email

Address

Customer Type

GST details where applicable

Existing Vehicles

CRM History

============================================================
34. CUSTOMER SELECTION
============================================================

Search by:

Name

Mobile

Customer Code

Vehicle

Lead

When selected:

Carry forward existing information.

Do NOT create another Sales Customer record.

============================================================
35. QUICK ADD CUSTOMER
============================================================

Use Drawer.

Minimum:

Name *

Mobile *

Email

Customer Type

Address

Branch

After save:

Select Customer automatically.

============================================================
36. LEAD CONNECTION
============================================================

When Sale originates from CRM:

Lead
        ↓
Vehicle Interest
        ↓
Quotation
        ↓
Won
        ↓
Vehicle Sale

Carry forward:

Customer

Contact

Vehicle Requirement

Budget

Preferred Variant

Preferred Color

Notes

Sales Executive

============================================================
37. VEHICLE REQUIREMENT
============================================================

Capture:

Manufacturer

Model

Variant

Fuel Type

Transmission

Color Preference

Budget

Expected Purchase Date

Usage

Special Requirement

============================================================
38. VEHICLE SELECTION
============================================================

Allow:

Select from Vehicle Stock

OR

Select Model / Variant before exact vehicle allocation.

This is important.

A customer may book a MODEL before a specific VIN / chassis is
allocated.

============================================================
39. VEHICLE AVAILABILITY
============================================================

Display:

Variant

Color

Available Qty

Branch

Expected Stock

Alternative Colors

Alternative Variants

============================================================
40. VEHICLE COMPARISON
============================================================

Optional contextual comparison:

Variant A

Variant B

Compare:

Price

Engine

Transmission

Fuel

Features

Availability

Do NOT create separate large comparison module.

============================================================
41. QUOTATION
============================================================

Quotation remains inside Sale Workspace.

Contains:

Vehicle Price

Discount

Accessories

Insurance

RTO Charges

Registration Charges

Extended Warranty

Packages

Other Charges

Exchange Benefit

Offers

Tax

Final Quotation

============================================================
42. QUOTATION ITEM STRUCTURE
============================================================

Possible rows:

Ex-Showroom Price

Accessories

Insurance

RTO / Registration

Extended Warranty

Service Package

Handling / Other Allowed Charges

Discount

Exchange Benefit

Offer

Tax where applicable

============================================================
43. QUOTATION SUMMARY
============================================================

Show clearly:

Vehicle Price

Add-ons

Insurance

RTO

Other Charges

Gross Amount

Discount

Exchange Benefit

Final Amount

============================================================
44. QUOTATION REVISION
============================================================

Support:

Revision 1

Revision 2

Revision 3

Maintain:

Date

Amount

Discount

Reason

Created By

Status

Do NOT overwrite previous quotation history.

============================================================
45. QUOTATION ACTIONS
============================================================

Preview

Print

WhatsApp

Email

Revise

Convert to Booking

============================================================
46. QUOTATION STATUS
============================================================

Possible:

Draft

Sent

Pending

Accepted

Rejected

Revised

Expired

Converted to Booking

============================================================
47. NEGOTIATION
============================================================

Negotiation should remain contextual.

Capture:

Requested Discount

Approved Discount

Offer

Notes

Manager Approval where required later

Customer Decision

Next Follow-Up

============================================================
48. TEST DRIVE
============================================================

Test Drive is optional.

Do NOT make it mandatory for every sale.

Flow:

Schedule Test Drive
        ↓
Select Vehicle
        ↓
Date / Time
        ↓
Driver / Executive
        ↓
Customer Confirmation
        ↓
Test Drive
        ↓
Feedback

============================================================
49. TEST DRIVE INFORMATION
============================================================

Fields:

Test Drive Number

Customer

Vehicle

Date

Time

Sales Executive

Driver

Start Odometer

End Odometer

Customer Feedback

Remarks

Status

============================================================
50. TEST DRIVE STATUS
============================================================

Scheduled

Confirmed

In Progress

Completed

Cancelled

No Show

Rescheduled

============================================================
51. BOOKING
============================================================

After quotation acceptance:

Quotation
        ↓
Booking
        ↓
Booking Amount
        ↓
Payment
        ↓
Vehicle Preference Confirmed
        ↓
Booking Created

============================================================
52. BOOKING INFORMATION
============================================================

Fields:

Booking Number

Booking Date

Customer

Model

Variant

Color

Booking Amount

Payment Mode

Expected Delivery

Sales Executive

Special Notes

============================================================
53. BOOKING PAYMENT
============================================================

Booking may support:

Full Booking Amount

Partial Booking Amount where allowed

Payment modes:

Cash

Card

UPI

Bank Transfer

Cheque

Credit / Adjustment where allowed later

============================================================
54. BOOKING STATUS
============================================================

Possible:

Draft

Confirmed

Payment Pending

Partially Paid

Booked

Vehicle Pending

Vehicle Allocated

Cancelled

Converted to Sale

============================================================
55. VEHICLE ALLOCATION
============================================================

Booking does NOT always equal specific vehicle allocation.

Process:

Booking
        ↓
Search Matching Stock
        ↓
Variant
        ↓
Color
        ↓
Select Vehicle
        ↓
VIN / Chassis
        ↓
Allocate

============================================================
56. VEHICLE ALLOCATION DRAWER
============================================================

Show:

Required Vehicle

Matching Stock

Stock Number

Color

VIN

Engine Number

Location

Stock Age

Status

Action:

Allocate Vehicle

============================================================
57. VEHICLE ALLOCATION STATUS
============================================================

Possible:

Not Required Yet

Pending

Allocated

Changed

Released

============================================================
58. CHANGE ALLOCATED VEHICLE
============================================================

Where allowed:

Current Vehicle
        ↓
Release
        ↓
Select Replacement
        ↓
Reason
        ↓
Confirm

Maintain allocation history.

============================================================
59. BOOKING CANCELLATION
============================================================

Capture:

Cancellation Reason

Customer Request Date

Booking Amount

Refundable Amount

Cancellation Charges where applicable

Refund Status

Remarks

============================================================
60. BOOKING REFUND
============================================================

Do NOT delete original booking payment.

Show:

Original Payment

Refund Amount

Refund Mode

Reference

Date

Status

Reason

============================================================
61. EXCHANGE VEHICLE
============================================================

Exchange is optional.

Customer may trade in an existing vehicle.

Keep complete exchange context inside Sale Workspace.

============================================================
62. EXCHANGE PROCESS
============================================================

Add Exchange Vehicle
        ↓
Vehicle Information
        ↓
Condition Inspection
        ↓
Documents
        ↓
Valuation
        ↓
Offer
        ↓
Customer Acceptance
        ↓
Exchange Value Applied
        ↓
Vehicle Intake

============================================================
63. EXCHANGE VEHICLE INFORMATION
============================================================

Fields:

Registration Number

Manufacturer

Model

Variant

Year

Fuel

Odometer

Ownership

VIN

Insurance

Loan / Hypothecation

============================================================
64. EXCHANGE INSPECTION
============================================================

Support:

Exterior

Interior

Engine

Tyres

Electrical

AC

Damage

Dent / Scratch

Photos

Documents

Remarks

============================================================
65. EXCHANGE VALUATION
============================================================

Show:

Expected Customer Price

System / Evaluator Value

Repair / Refurbishment Cost

Final Offer

Approved By

Customer Decision

============================================================
66. EXCHANGE VALUE APPLICATION
============================================================

Example:

Vehicle Sale Amount:
₹1,250,000

Exchange Value:
₹350,000

Net Payable:
₹900,000

Finance / payment calculations may then use applicable balance.

============================================================
67. EXCHANGE DOCUMENTS
============================================================

Possible:

RC

Insurance

PUC

ID Proof

Loan Closure / NOC

Service History

Photos

Other Documents

============================================================
68. EXCHANGE VEHICLE OUTCOME
============================================================

Accepted exchange vehicle may later become:

Used Vehicle Stock

Trade Vehicle

Auction Vehicle

Vendor Disposal

Actual used-vehicle process may be defined separately where
required.

============================================================
69. FINANCE
============================================================

Finance is optional per Sale.

Keep customer finance application context inside Sale Workspace.

Do NOT force user to maintain the same finance details in an
unrelated screen.

============================================================
70. FINANCE PROCESS
============================================================

Finance Required
        ↓
Select Financier
        ↓
Loan Requirement
        ↓
Customer Documents
        ↓
Application
        ↓
Verification
        ↓
Approval / Rejection
        ↓
Sanction
        ↓
Disbursement
        ↓
Payment Adjustment

============================================================
71. FINANCE INFORMATION
============================================================

Fields:

Finance Required

Financier / Bank

Loan Amount

Down Payment

Tenure

Interest Rate where applicable

EMI where applicable

Application Number

Application Date

Status

============================================================
72. FINANCE DOCUMENTS
============================================================

Possible:

PAN

Aadhaar / Identity

Address Proof

Income Proof

Bank Statement

Salary Slip

Business Documents

Quotation

Other Documents

============================================================
73. FINANCE STATUS
============================================================

Possible:

Not Required

Documents Pending

Application Draft

Submitted

Verification

Approval Pending

Approved

Rejected

Sanctioned

Disbursement Pending

Disbursed

Cancelled

============================================================
74. FINANCE APPROVAL
============================================================

Display:

Approved Loan

Approved Tenure

Interest Rate

EMI

Sanction Number

Sanction Date

Conditions

Expiry

============================================================
75. FINANCE DISBURSEMENT
============================================================

Capture/display:

Disbursement Amount

Date

Reference

Bank

Transaction

Balance Pending

Payment summary should update accordingly.

============================================================
76. INSURANCE
============================================================

Vehicle insurance should remain visible inside Sale Workspace.

Insurance module may own detailed policy processing.

Sale Workspace owns transaction context.

============================================================
77. INSURANCE PROCESS
============================================================

Insurance Required
        ↓
Select Provider
        ↓
Select Plan
        ↓
Premium
        ↓
Customer Approval
        ↓
Payment / Inclusion
        ↓
Policy Issued

============================================================
78. INSURANCE INFORMATION
============================================================

Show:

Insurance Company

Policy Type

Premium

Add-ons

Policy Number

Start Date

Expiry Date

Status

============================================================
79. INSURANCE OPTIONS
============================================================

Possible:

Comprehensive

Third Party

Own Damage

Zero Dep

Roadside Assistance

Engine Protection

Other Add-ons

Exact options remain configurable.

============================================================
80. ACCESSORIES
============================================================

Accessories are managed inside Sale Workspace.

Possible:

Included Accessories

Paid Accessories

Free Accessories

Optional Add-ons

============================================================
81. ACCESSORY ITEM GRID
============================================================

Columns:

Accessory

SKU

Qty

Rate

Discount

Tax

Amount

Stock Status

Installation Status

Type

============================================================
82. ACCESSORY TYPES
============================================================

Possible:

Paid

Free

Included in Package

Promotional

Dealer Fitted

Customer Requested

============================================================
83. ACCESSORY STOCK
============================================================

Stock-controlled accessories must connect to Inventory.

Sale
        ↓
Accessory Selected
        ↓
Reserve / Issue
        ↓
Install / Handover
        ↓
Inventory Updated

Do NOT maintain separate accessory stock.

============================================================
84. ACCESSORY INSTALLATION
============================================================

Status:

Pending

Reserved

Issued

Installation Pending

Installed

Handed Over

Cancelled

============================================================
85. FINAL PRICE
============================================================

The Sale Workspace should maintain ONE clear commercial summary.

Vehicle Price

Accessories

Insurance

RTO

Packages

Other Charges

Discount

Offer

Exchange Value

Finance Amount

Final Payable

Paid

Balance

============================================================
86. PRICE CHANGE CONTROL
============================================================

After booking, important price changes should visually show:

Old Amount

New Amount

Difference

Reason

Approved By where applicable later

Customer Confirmation where required

Maintain revision history.

============================================================
87. RTO / REGISTRATION
============================================================

RTO process remains inside Sale Workspace.

============================================================
88. RTO PROCESS
============================================================

Customer Documents
        ↓
Vehicle Documents
        ↓
Registration Application
        ↓
RTO Submission
        ↓
Fees
        ↓
Registration Number
        ↓
RC Status
        ↓
Complete

============================================================
89. RTO INFORMATION
============================================================

Fields:

RTO Office

Registration Type

Temporary Registration

Permanent Registration

Application Number

Application Date

Registration Number

Registration Date

RC Status

============================================================
90. RTO DOCUMENTS
============================================================

Possible:

Customer ID

Address Proof

PAN

Invoice

Insurance

Form Documents

Vehicle Documents

Finance / Hypothecation Documents

Other RTO Documents

============================================================
91. RTO STATUS
============================================================

Possible:

Not Started

Documents Pending

Ready to Submit

Submitted

Payment Pending

Processing

Registration Number Received

RC Pending

Completed

Rejected / Correction Required

============================================================
92. REGISTRATION NUMBER
============================================================

When received:

Update vehicle record.

Show prominently:

Registration Number

Registration Date

RTO

RC Status

============================================================
93. INVOICE
============================================================

Invoice remains directly connected to Vehicle Sale.

Invoice should use finalized commercial values.

============================================================
94. INVOICE SUMMARY
============================================================

Possible:

Vehicle Amount

Accessories

Insurance

RTO

Packages

Other Charges

Discount

Tax

Round Off

Final Invoice

============================================================
95. INVOICE CREATION
============================================================

Final Commercial Review
        ↓
Customer Details
        ↓
Vehicle / VIN
        ↓
Charges
        ↓
Discount
        ↓
Tax
        ↓
Preview
        ↓
Generate Invoice

============================================================
96. INVOICE ACTIONS
============================================================

Preview

Generate

Print

Download PDF

WhatsApp

Email

View History

============================================================
97. PAYMENT
============================================================

Payment remains inside Vehicle Sale.

Support:

Booking Payment

Advance

Down Payment

Partial Payment

Finance Disbursement

Exchange Adjustment

Full Payment

Refund

Outstanding

============================================================
98. PAYMENT SUMMARY
============================================================

Display:

Sale Amount

Booking Paid

Customer Payments

Finance Amount Received

Exchange Adjustment

Other Adjustment

Total Received

Balance

============================================================
99. RECEIVE PAYMENT
============================================================

Use:

C01 Drawer / Modal

Fields:

Payment Type

Amount

Payment Mode

Transaction Date

Reference

Bank / Gateway where applicable

Notes

============================================================
100. PAYMENT MODES
============================================================

Possible:

Cash

Card

UPI

Bank Transfer

Cheque

Finance

Exchange Adjustment

Credit where permitted

Wallet where applicable

============================================================
101. PARTIAL PAYMENT
============================================================

Multiple payments must be supported.

Example:

Final Payable:
₹1,250,000

Booking:
₹50,000

Down Payment:
₹200,000

Finance:
₹900,000

Additional Payment:
₹50,000

Balance:
₹50,000

============================================================
102. TRANSACTION HISTORY
============================================================

Columns:

Date

Transaction

Type

Mode

Amount

Reference

Received From

Received By

Status

Receipt

============================================================
103. PAYMENT STATUS
============================================================

Possible:

Unpaid

Booking Paid

Partially Paid

Finance Pending

Paid

Credit

Refund Pending

Refunded

============================================================
104. PAYMENT RECEIPT
============================================================

Receipt should reference:

Customer

Sale

Vehicle

Booking

Invoice where applicable

Transaction

Amount

Payment Mode

============================================================
105. PDI
============================================================

PDI = Pre-Delivery Inspection.

PDI must be completed before vehicle delivery where required.

============================================================
106. PDI PROCESS
============================================================

Allocated Vehicle
        ↓
PDI Checklist
        ↓
Vehicle Condition
        ↓
Accessories
        ↓
Fluids
        ↓
Electrical
        ↓
Documents
        ↓
Road / Functional Check where applicable
        ↓
Cleaning
        ↓
Approval
        ↓
Ready for Delivery

============================================================
107. PDI CHECKLIST
============================================================

Possible:

VIN Verified

Engine Number Verified

Exterior Condition

Interior Condition

Paint

Tyres

Battery

Lights

Horn

Wipers

AC

Infotainment

Fluid Levels

Toolkit

Spare Wheel

Keys

Accessories

Documents

Cleaning

Fuel

Odometer

============================================================
108. PDI ITEM STATUS
============================================================

Pass

Fail

Attention Required

Not Applicable

Remarks

Photo

============================================================
109. PDI FAILURE
============================================================

If issue found:

Record Issue
        ↓
Assign Resolution
        ↓
Fix
        ↓
Recheck
        ↓
Pass

Do NOT hide failed PDI items.

============================================================
110. PDI MEDIA
============================================================

Support:

Photos

Videos where useful

Remarks

Uploaded By

Date / Time

============================================================
111. PDI APPROVAL
============================================================

Capture:

PDI Performed By

Supervisor

Status

Remarks

Signature where required

Date / Time

============================================================
112. DELIVERY READINESS
============================================================

Before Delivery show readiness panel:

Vehicle Allocated ✓

Finance Completed ✓

Insurance Completed ✓

RTO Completed ✓

Invoice Generated ✓

Payment Condition Satisfied ✓

Accessories Installed ✓

PDI Passed ✓

Documents Ready ✓

============================================================
113. DELIVERY BLOCKERS
============================================================

Examples:

Payment Pending

Finance Pending

Insurance Pending

RTO Pending

Accessory Installation Pending

PDI Failed

Document Missing

Vehicle Not Allocated

Do NOT hide blockers.

============================================================
114. DELIVERY SCHEDULING
============================================================

Fields:

Delivery Date

Delivery Time

Delivery Location

Sales Executive

Delivery Coordinator

Customer Confirmation

Special Instructions

============================================================
115. VEHICLE DELIVERY
============================================================

Delivery section contains:

Vehicle Handover

Customer Verification

Accessories Handover

Documents Handover

Key Handover

Feature Explanation

Payment Confirmation

Customer Signature

Delivery Photo

============================================================
116. DELIVERY CHECKLIST
============================================================

Possible:

Vehicle Verified

VIN Verified

Registration Verified

Vehicle Cleaned

Fuel Checked

Odometer Checked

Accessories Installed

Accessories Handover

Toolkit

Spare Wheel

Keys

Invoice

Insurance Policy

Registration Documents

Warranty Documents

Service Book

Owner Manual

Customer Signature

============================================================
117. CUSTOMER HANDOVER
============================================================

Record:

Delivered To

Mobile

Delivery Date / Time

Delivered By

Sales Executive

Odometer

Fuel

Customer Signature

Delivery Photos

Remarks

============================================================
118. DELIVERY PHOTO
============================================================

Allow:

Vehicle Photo

Customer Delivery Photo

Handover Photo

Additional Photos

Use media component.

============================================================
119. COMPLETE DELIVERY
============================================================

When requirements are satisfied:

Complete Delivery
        ↓
Vehicle Stock = Delivered
        ↓
Sale Status = Delivered
        ↓
Customer Vehicle Updated
        ↓
Documents Finalized
        ↓
CRM History Updated
        ↓
Timeline Updated

============================================================
120. POST-DELIVERY
============================================================

Prepare for:

Customer Feedback

First Service Reminder

Follow-Up

Insurance Reminder

Document Pending Follow-Up

Relationship Continuation

============================================================
121. CUSTOMER FEEDBACK
============================================================

Possible:

Sales Experience

Executive Rating

Vehicle Delivery Experience

Timeliness

Overall Rating

Comments

Would Recommend

============================================================
122. DOCUMENTS
============================================================

Vehicle Sale should provide ONE consolidated Documents area.

Possible:

Quotation PDF

Booking Receipt

Customer Documents

Finance Documents

Insurance Policy

RTO Documents

Vehicle Invoice

Payment Receipts

PDI Report

Delivery Note

Exchange Documents

Attachments

============================================================
123. DOCUMENT CATEGORIES
============================================================

Customer

Quotation

Booking

Exchange

Finance

Insurance

Accessories

RTO

Invoice

Payment

PDI

Delivery

Other

============================================================
124. DOCUMENT ACTIONS
============================================================

Preview

Print

Download

WhatsApp

Email

Upload

Replace where permitted

Generated transactional documents should not be casually
deleted.

============================================================
125. TIMELINE
============================================================

Timeline provides complete chronological sale history.

Examples:

Sale Created

Quotation Generated

Quotation Revised

Quotation Accepted

Test Drive Scheduled

Test Drive Completed

Booking Created

Booking Payment Received

Vehicle Allocated

Exchange Vehicle Added

Exchange Approved

Finance Application Submitted

Finance Approved

Finance Disbursed

Insurance Selected

Policy Issued

Accessory Added

Accessory Installed

RTO Submitted

Registration Received

Invoice Generated

Payment Received

PDI Started

PDI Passed

Delivery Scheduled

Vehicle Delivered

Feedback Received

============================================================
126. TIMELINE ITEM
============================================================

Show:

Date / Time

Event

User

Description

Related Record

Example:

03 Aug 2026 • 04:25 PM

Vehicle Allocated

Maruti Suzuki Brezza ZXI

VIN:
MA3XXXXXXXX4582

Allocated by:
Neha Patil

============================================================
127. STATUS HISTORY
============================================================

Maintain:

Old Status

New Status

Changed By

Date / Time

Reason

============================================================
128. COMMUNICATION HISTORY
============================================================

Show relevant:

Calls

WhatsApp

SMS

Email

Quotation Sent

Booking Confirmation

Finance Follow-Up

Delivery Confirmation

Feedback Request

============================================================
129. SALES STATUS LIFECYCLE
============================================================

Recommended high-level statuses:

Draft

Enquiry

Quotation

Negotiation

Booking Pending

Booked

Vehicle Allocation Pending

Finance Pending

Insurance Pending

RTO Pending

Payment Pending

PDI

Ready for Delivery

Delivered

Closed

On Hold

Cancelled

============================================================
130. PROCESS STAGE VS STATUS
============================================================

Keep separate where useful.

Example:

Process Stage:
Finance

Status:
Documents Pending

Process Stage:
Delivery

Status:
PDI Pending

This prevents ambiguous statuses.

============================================================
131. SALE ON HOLD
============================================================

Capture:

Hold Reason

Hold Until

Responsible User

Remarks

Possible:

Customer Decision

Finance

Vehicle Availability

Documents

Payment

RTO

Other

============================================================
132. SALE CANCELLATION
============================================================

Cancellation requires:

Reason

Booking Status

Vehicle Allocation

Payment Received

Refund Required

Finance Status

RTO Status

Remarks

============================================================
133. CANCELLATION WARNINGS
============================================================

Show warning when:

Vehicle already allocated

Invoice generated

Payment received

Finance disbursed

Insurance issued

RTO submitted

Accessories issued

Do NOT visually imply simple deletion.

============================================================
134. VEHICLE RELEASE
============================================================

If cancelled before delivery:

Allocated vehicle may need:

Release Vehicle

        ↓
Vehicle Stock returns to appropriate status.

Maintain allocation history.

============================================================
135. SALES EXECUTIVE ASSIGNMENT
============================================================

Support:

Assign Sales Executive

Change Executive

Reason

Assignment History

Branch

============================================================
136. SALES QUICK ACTIONS
============================================================

Context dependent:

Create Quotation

Schedule Test Drive

Book Vehicle

Receive Booking Payment

Allocate Vehicle

Add Exchange

Start Finance

Add Insurance

Add Accessories

Start RTO

Generate Invoice

Receive Payment

Start PDI

Schedule Delivery

Complete Delivery

============================================================
137. MORE ACTIONS
============================================================

Possible:

Change Executive

Change Vehicle

Revise Quotation

Upload Document

Send WhatsApp

Send Email

Print Documents

Put On Hold

Cancel Sale

============================================================
138. VEHICLE STOCK QUICK ACTIONS
============================================================

Possible:

View Vehicle

Allocate

Hold

Start PDI

Transfer Branch where applicable

Upload Document

View History

============================================================
139. MULTI-BRANCH VEHICLE STOCK
============================================================

Vehicle Stock belongs to a physical branch/location.

Display:

Branch

Location

Availability

Do NOT treat another branch's vehicle as locally available.

============================================================
140. OTHER BRANCH VEHICLE AVAILABILITY
============================================================

Where selected variant unavailable locally:

Show:

Mumbai Branch

Brezza ZXI White

2 Vehicles

Possible:

Request Transfer

Select Alternative

Actual transfer rules may be defined later.

============================================================
141. VEHICLE STOCK TRANSFER PREPARATION
============================================================

Possible future flow:

Source Branch
        ↓
Vehicle
        ↓
Transfer Request
        ↓
Approval
        ↓
Dispatch
        ↓
Receive
        ↓
Location Updated

Do NOT create duplicate vehicle record.

============================================================
142. VEHICLE SALES + CRM
============================================================

CRM owns:

Lead

Follow-Up

Communication

Customer Relationship

Vehicle Sales owns:

Quotation onward commercial vehicle-sale process.

Records remain linked.

============================================================
143. VEHICLE SALES + INVENTORY
============================================================

Inventory may supply:

Accessories

Add-ons

Consumables

Sale Workspace displays relevant stock availability.

Inventory owns stock movement.

============================================================
144. VEHICLE SALES + FINANCE
============================================================

Sale Workspace displays:

Invoice

Payments

Finance Disbursement

Outstanding

Finance module owns accounting records.

============================================================
145. VEHICLE SALES + INSURANCE
============================================================

Sale Workspace handles insurance selection/context.

Insurance module may own:

Policy

Renewal

Claim

Detailed insurer operations.

Do NOT duplicate policy records.

============================================================
146. VEHICLE SALES + CUSTOMER
============================================================

After delivery:

Vehicle becomes linked to Customer.

Customer 360 should show:

Purchased Vehicle

Sale

Invoice

Payment

Insurance

Service History later

Documents

============================================================
147. VEHICLE SALES + WORKSHOP
============================================================

New vehicle PDI should NOT require normal customer Job Card
unless business process specifically requires it.

Future service:

Delivered Vehicle
        ↓
Customer Vehicle
        ↓
Workshop Job Card

============================================================
148. VEHICLE SALES + PURCHASE
============================================================

Vehicle stock may originate from:

Manufacturer / Dealer Purchase

Purchase module or dedicated vehicle procurement process may
provide source transaction.

Do NOT duplicate purchase accounting inside Sales.

============================================================
149. EXCHANGE + USED VEHICLE
============================================================

Accepted exchange vehicle should remain traceable to:

Original Customer

Original Sale

Exchange Valuation

Intake Date

Future Disposal / Resale

Do NOT lose source history.

============================================================
150. BRANCH AWARENESS
============================================================

Vehicle Sale must retain:

Branch

Sales Executive

Vehicle Location

Invoice Context

Payment Context

RTO Context

Delivery Location

============================================================
151. GLOBAL SEARCH
============================================================

Global ERP Search should find:

Vehicle Sale

Booking

Vehicle Stock

VIN

Registration Number

Customer

Example:

VEHICLE SALE

VS-2026-00158

Rajesh Sharma

Brezza ZXI

Status:
Booked

============================================================
152. REPORTS
============================================================

Vehicle Sales reports may include:

Sales Summary

Booking Report

Quotation Conversion

Executive Performance

Vehicle Stock

Stock Ageing

Model-wise Sales

Variant-wise Sales

Color-wise Sales

Booking Cancellation

Exchange Vehicles

Finance Status

Insurance Status

RTO Pending

Delivery Report

Payment Outstanding

============================================================
153. SALES DASHBOARD DRILL-DOWN
============================================================

Bookings
→ Sales / Booked

Finance Pending
→ Sales / Finance Pending

RTO Pending
→ Sales / RTO Pending

Delivery Today
→ Sales / Delivery Today

Vehicle Stock
→ Vehicle Stock

Overdue Delivery
→ Sales / Overdue

============================================================
154. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Sales Dashboard

Vehicle Stock List

Add Vehicle Stock

Vehicle Stock Detail

New Vehicle Sale

Customer Search

Quick Add Customer

Lead Selection

Vehicle Requirement

Variant Selection

Stock Availability

Quotation

Quotation Revision

Discount

Test Drive

Booking

Booking Payment

Vehicle Allocation

Change Allocation

Exchange Vehicle

Exchange Inspection

Exchange Valuation

Finance Application

Finance Status

Insurance Selection

Accessories

Accessory Stock Status

Final Price

RTO

Registration Status

Invoice Preview

Advance Payment

Partial Payment

Finance Payment

Exchange Adjustment

Transaction History

PDI

PDI Failure

Delivery Readiness

Delivery Checklist

Customer Signature

Documents

Timeline

Cancellation UI

No API/backend required.

============================================================
155. RECOMMENDED FRONTEND FILES
============================================================

vehicle-sales-dashboard.html

vehicle-stock.html

vehicle-stock-form.html

vehicle-stock-detail.html

vehicle-sales.html

vehicle-sale-workspace.html

vehicle-quotation-print.html

booking-receipt-print.html

vehicle-invoice-print.html

vehicle-payment-receipt-print.html

pdi-print.html

vehicle-delivery-note-print.html

Do NOT create separate pages for normal:

Quotation

Booking

Exchange

Finance

Insurance

Accessories

RTO

Payment

PDI

Delivery

These belong primarily inside Vehicle Sale Workspace.

============================================================
156. REUSABLE COMPONENTS
============================================================

Vehicle Selector

Vehicle Stock Quick View

Customer Search

Customer Quick View

Quotation Grid

Price Summary

Test Drive Drawer

Booking Panel

Payment Drawer

Vehicle Allocation Drawer

Exchange Vehicle Panel

Exchange Inspection

Finance Panel

Insurance Panel

Accessory Grid

RTO Panel

Transaction History

PDI Checklist

Delivery Readiness Panel

Delivery Checklist

Signature Pad

Document Panel

Timeline

============================================================
157. FEATURE → LOCATION MAP
============================================================

Customer
→ Sale Overview

Vehicle Requirement
→ Sale Overview

Vehicle Selection
→ Sale Overview

Quotation
→ Quotation Tab

Test Drive
→ Quotation / Contextual Action

Negotiation
→ Quotation

Booking
→ Booking Tab

Booking Payment
→ Booking / Invoice & Payment

Vehicle Allocation
→ Booking / Overview

Exchange
→ Exchange Tab

Finance
→ Finance Tab

Insurance
→ Insurance Tab

Accessories
→ Accessories Tab

RTO
→ RTO Tab

Invoice
→ Invoice & Payment

Payment
→ Invoice & Payment

Transaction History
→ Invoice & Payment

PDI
→ PDI & Delivery

Delivery
→ PDI & Delivery

Documents
→ Documents

Timeline
→ Timeline

============================================================
158. NO DUPLICATION RULE
============================================================

DO NOT create:

Sales Customer

Workshop Customer

CRM Customer

These are ONE Customer.

DO NOT create duplicate:

Vehicle

Insurance Policy

Inventory Product

Employee

Payment

Invoice

Use shared business entities and linked records.

============================================================
159. VEHICLE SALES ACCEPTANCE CHECKLIST
============================================================

Before Vehicle Sales is considered complete:

[ ] Sales Dashboard

[ ] Vehicle Stock

[ ] Add Vehicle

[ ] Vehicle Detail

[ ] VIN / Chassis

[ ] Engine Number

[ ] Vehicle Location

[ ] Stock Status

[ ] Sales List

[ ] New Sale

[ ] Customer Search

[ ] Lead Connection

[ ] Vehicle Requirement

[ ] Variant Selection

[ ] Color Preference

[ ] Availability

[ ] Quotation

[ ] Quotation Revision

[ ] Discount

[ ] Offers

[ ] Test Drive

[ ] Booking

[ ] Booking Amount

[ ] Booking Payment

[ ] Booking Cancellation

[ ] Refund UI

[ ] Vehicle Allocation

[ ] Allocation Change

[ ] Exchange Vehicle

[ ] Exchange Inspection

[ ] Exchange Valuation

[ ] Exchange Documents

[ ] Finance

[ ] Finance Documents

[ ] Finance Approval

[ ] Finance Disbursement

[ ] Insurance

[ ] Accessories

[ ] Accessory Stock

[ ] Accessory Installation

[ ] Final Price

[ ] RTO

[ ] Registration Number

[ ] Invoice

[ ] Invoice PDF

[ ] Advance Payment

[ ] Partial Payment

[ ] Full Payment

[ ] Finance Payment

[ ] Exchange Adjustment

[ ] Outstanding

[ ] Transaction History

[ ] Receipt

[ ] PDI

[ ] PDI Checklist

[ ] PDI Failure / Recheck

[ ] Delivery Readiness

[ ] Delivery Blockers

[ ] Delivery Schedule

[ ] Delivery Checklist

[ ] Customer Signature

[ ] Delivery Photos

[ ] Customer Feedback

[ ] Documents

[ ] Timeline

[ ] Branch Context

[ ] No backend/API generated

============================================================
160. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create Quotation as a permanent Sales sidebar submenu.
- Create Booking as a permanent Sales sidebar submenu.
- Create Test Drive as unnecessary permanent navigation.
- Create Exchange as permanent operational navigation.
- Create Finance Application as separate disconnected module.
- Create Sales Insurance separately from shared Insurance.
- Create Accessories as separate Sales stock.
- Create RTO as disconnected transaction system.
- Create Sales Payment as separate payment system.
- Create PDI as unrelated module.
- Create Delivery as unrelated module.
- Duplicate Customer.
- Duplicate Vehicle.
- Duplicate Product.
- Duplicate Employee.
- Ask user to re-enter CRM Lead information.
- Ask user to re-enter Booking information during Invoice.
- Ask user to re-enter Vehicle information during RTO.
- Lose payment history.
- Lose quotation revisions.
- Lose vehicle allocation history.
- Delete cancelled booking/payment history.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
161. FINAL VEHICLE SALE EXPERIENCE
============================================================

When the user opens ONE Vehicle Sale they should immediately
understand:

WHO IS BUYING THE VEHICLE?

WHICH VEHICLE / VARIANT / COLOR?

WHAT WAS QUOTED?

WHAT DISCOUNT WAS GIVEN?

WAS A TEST DRIVE DONE?

HAS THE CUSTOMER BOOKED?

HOW MUCH BOOKING PAYMENT WAS RECEIVED?

WHICH VIN / CHASSIS IS ALLOCATED?

IS THERE AN EXCHANGE VEHICLE?

WHAT IS ITS VALUATION?

IS FINANCE REQUIRED?

IS FINANCE APPROVED / DISBURSED?

IS INSURANCE COMPLETE?

WHICH ACCESSORIES ARE INCLUDED?

ARE ACCESSORIES INSTALLED?

WHAT IS THE FINAL PRICE?

IS RTO COMPLETE?

WHAT IS THE REGISTRATION NUMBER?

HAS THE INVOICE BEEN GENERATED?

HOW MUCH HAS BEEN PAID?

WHAT IS OUTSTANDING?

HAS PDI PASSED?

IS THE VEHICLE READY FOR DELIVERY?

WHAT DOCUMENTS ARE PENDING?

WHAT HAS HAPPENED THROUGHOUT THE SALE?

============================================================
162. FINAL PRINCIPLE
============================================================

VEHICLE SALES SHOULD NOT FEEL LIKE:

ENQUIRY
+
QUOTATION
+
TEST DRIVE
+
BOOKING
+
EXCHANGE
+
FINANCE
+
INSURANCE
+
ACCESSORIES
+
RTO
+
INVOICE
+
PAYMENT
+
PDI
+
DELIVERY

AS DISCONNECTED MODULES.

IT SHOULD FEEL LIKE:

CUSTOMER / LEAD
        ↓
VEHICLE REQUIREMENT
        ↓
QUOTATION
        ↓
TEST DRIVE / NEGOTIATION
        ↓
BOOKING
        ↓
VEHICLE ALLOCATION
        ↓
EXCHANGE
        ↓
FINANCE
        ↓
INSURANCE
        ↓
ACCESSORIES
        ↓
FINAL PRICE
        ↓
RTO
        ↓
INVOICE
        ↓
PAYMENT
        ↓
PDI
        ↓
DELIVERY
        ↓
DOCUMENTS
        ↓
TIMELINE

ONE VEHICLE SALE.

ONE CONNECTED PROCESS.

ONE WORKSPACE.

MINIMUM NAVIGATION.

NO DUPLICATE ENTRY.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/05_VEHICLE_SALES.md
============================================================