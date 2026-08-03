# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/09_FINANCE_ACCOUNTS.md
# FINANCE & ACCOUNTS — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Finance & Accounts manages the COMPLETE financial visibility
of Garage ERP.

Finance should NOT force operational users to enter the same
transaction again.

Financial transactions should originate from connected
business modules wherever applicable.

Examples:

Workshop Invoice
→ Customer Receivable

Vehicle Sale Invoice
→ Customer Receivable

Customer Payment
→ Receipt

Purchase Vendor Invoice
→ Vendor Payable

Vendor Payment
→ Payment Transaction

Insurance Settlement
→ Insurer Receipt

Expense
→ Expense Transaction

Refund
→ Refund Transaction

Finance provides:

Financial Dashboard

Receivables

Payables

Transactions

Expenses

Cash / Bank

Credit / Debit Notes

Refunds

Daily Closing

Tax Summary

Financial Reports

Branch Financial Visibility

============================================================
2. PRIMARY FINANCE NAVIGATION
============================================================

FINANCE & ACCOUNTS

    Finance Dashboard

    Receivables

    Payables

    Transactions

    Expenses

    Cash & Bank

    Reports

Do NOT create excessive permanent sidebar menus for:

Customer Payments

Vendor Payments

Partial Payments

Refunds

Credit Notes

Debit Notes

Daily Closing

Tax Summary

Payment History

These should be handled contextually inside Finance workspaces
where practical.

============================================================
3. CORE FINANCE PRINCIPLE
============================================================

Operational Module
        ↓
Financial Transaction Created
        ↓
Finance Visibility
        ↓
Receipt / Payment
        ↓
Outstanding Updated
        ↓
Cash / Bank Impact
        ↓
Closing
        ↓
Reports
        ↓
Complete Financial Timeline

NO DUPLICATE FINANCIAL ENTRY.

============================================================
4. FINANCIAL SOURCES
============================================================

Finance receives transaction context from:

Workshop

Vehicle Sales

Purchase

Insurance

Warranty where applicable

CRM / Customer Credit

Inventory Adjustments where financial

Expenses

Other configured business transactions

============================================================
5. FINANCE DASHBOARD
============================================================

Use:

T01 Dashboard

Dashboard should answer:

How much did we bill?

How much did we collect?

How much do customers owe?

How much do we owe vendors?

What are today's expenses?

What is today's cash position?

What is today's bank position?

Are payments overdue?

Are there unresolved refunds?

What is branch-wise financial performance?

============================================================
6. FINANCE DASHBOARD KPIs
============================================================

Recommended:

Today's Sales

Today's Collections

Customer Outstanding

Vendor Payable

Today's Expenses

Cash Balance

Bank Balance

Overdue Receivables

Overdue Payables

Refund Pending

============================================================
7. FINANCE DASHBOARD SECONDARY KPIs
============================================================

Possible:

Workshop Revenue

Vehicle Sales Revenue

Parts Revenue

Labour Revenue

Insurance Receivable

Tax Collected

Discount Given

Credit Sales

============================================================
8. FINANCE DASHBOARD ATTENTION
============================================================

ATTENTION REQUIRED may include:

Overdue Customer Payment

Credit Limit Exceeded

Vendor Payment Due

Vendor Payment Overdue

Cheque Pending

Cheque Bounced

Insurance Settlement Pending

Refund Pending

Unmatched Transaction

Daily Closing Pending

Cash Difference

Invoice Cancellation Request

============================================================
9. DASHBOARD DATE FILTER
============================================================

Support:

Today

Yesterday

This Week

This Month

Last Month

This Year

Last Year

Custom Date Range

============================================================
10. DASHBOARD BRANCH FILTER
============================================================

Support:

All Authorized Branches

Specific Branch

Where permissions allow.

Do NOT merge branch financial values without clear branch
context.

============================================================
11. DASHBOARD QUICK ACTIONS
============================================================

Recommended:

+ Receive Payment

+ Record Expense

+ Make Vendor Payment

Search Invoice

Search Transaction

More ▼

============================================================
12. RECEIVABLES
============================================================

Receivables manages amounts owed TO the business.

Possible sources:

Workshop Invoice

Vehicle Sale Invoice

Parts Sale

Insurance Company

Corporate Customer

Fleet Customer

Other Credit Transaction

============================================================
13. RECEIVABLE PROCESS
============================================================

Invoice / Receivable Source
        ↓
Amount Due
        ↓
Due Date
        ↓
Customer / Payer
        ↓
Payment
        ↓
Partial / Full Receipt
        ↓
Adjustment if applicable
        ↓
Outstanding
        ↓
Paid / Closed

============================================================
14. RECEIVABLE LIST
============================================================

Use:

T02 List Page

Quick filters:

All

Unpaid

Partially Paid

Due Today

Due Soon

Overdue

Paid

Credit

On Hold

============================================================
15. RECEIVABLE SEARCH
============================================================

Search:

Invoice Number

Customer

Mobile

Vehicle

Job Card

Vehicle Sale

Insurance Claim

Transaction Reference

============================================================
16. RECEIVABLE FILTERS
============================================================

Source Module

Customer Type

Branch

Invoice Date

Due Date

Payment Status

Assigned User

Outstanding Range

============================================================
17. RECEIVABLE TABLE
============================================================

Recommended columns:

Invoice

Customer / Payer

Source

Invoice Date

Due Date

Invoice Amount

Paid

Credit / Adjustment

Outstanding

Status

Actions

============================================================
18. RECEIVABLE DETAIL
============================================================

Use:

T04 Detail / Financial Workspace

Display:

Customer

Source Transaction

Invoice

Invoice Amount

Due Date

Payment Terms

Payments

Adjustments

Outstanding

Documents

Timeline

============================================================
19. SOURCE TRANSACTION
============================================================

Example:

Invoice:
INV-2026-00158

Source:
Workshop

Job Card:
JC-2026-001248

Customer:
Rajesh Sharma

Vehicle:
MH 12 AB 4582

Invoice Amount:
$1,250

Finance must retain source traceability.

============================================================
20. CUSTOMER PAYMENT
============================================================

Payment should normally be receivable against:

Invoice

Advance

Account / Customer Credit where authorized

============================================================
21. RECEIVE PAYMENT
============================================================

Use:

C01 Drawer / Modal

Fields:

Customer / Payer *

Invoice / Reference

Payment Type *

Amount *

Payment Mode *

Transaction Date *

Reference

Bank / Account where applicable

Notes

============================================================
22. PAYMENT TYPES
============================================================

Possible:

Advance

Invoice Payment

Partial Payment

Full Payment

Credit Recovery

Insurance Settlement

Other Receipt

============================================================
23. PAYMENT MODES
============================================================

Possible:

Cash

Card

UPI

Bank Transfer

Cheque

Wallet where configured

Credit Adjustment

Finance / Insurer Settlement where applicable

============================================================
24. PARTIAL PAYMENT
============================================================

Example:

Invoice:
$1,250

Payment 1:
$500

Payment 2:
$300

Outstanding:
$450

Each payment remains a separate transaction.

Do NOT overwrite previous payments.

============================================================
25. FULL PAYMENT
============================================================

When outstanding becomes zero:

Payment Status:
PAID

Maintain all individual payment transactions.

============================================================
26. ADVANCE PAYMENT
============================================================

Customer may pay advance before final invoice.

Advance
        ↓
Customer Account
        ↓
Relevant Job Card / Sale where known
        ↓
Invoice Generated
        ↓
Advance Applied
        ↓
Remaining Balance

============================================================
27. CUSTOMER ADVANCE
============================================================

Display:

Advance Received

Advance Used

Advance Available

Related Transactions

Do NOT treat unused advance as normal invoice payment.

============================================================
28. CUSTOMER CREDIT
============================================================

Eligible customers may have:

Credit Limit

Credit Days

Used Credit

Available Credit

Outstanding

Overdue

Credit Status

Actual credit approval logic belongs to backend phase.

============================================================
29. CUSTOMER CREDIT WARNING
============================================================

Example:

Credit Limit:
$10,000

Outstanding:
$9,200

New Invoice:
$1,500

Projected Exposure:
$10,700

Show:

CREDIT LIMIT EXCEEDED

Do NOT silently ignore the limit.

============================================================
30. RECEIVABLE AGEING
============================================================

Recommended buckets:

Current

1–30 Days

31–60 Days

61–90 Days

90+ Days

Show:

Customer

Invoice

Outstanding

Age

Due Date

============================================================
31. CUSTOMER STATEMENT
============================================================

Customer financial statement should show:

Opening Balance

Invoices

Payments

Credit Notes

Debit Notes where applicable

Refunds

Closing Balance

Date Range

============================================================
32. CUSTOMER OUTSTANDING
============================================================

Customer 360 should consume Finance data.

Do NOT maintain separate CRM outstanding calculations.

============================================================
33. INSURANCE RECEIVABLE
============================================================

Insurance Claim may create insurer receivable.

Show:

Insurance Company

Claim

Invoice

Approved Liability

Received

Outstanding

Settlement Status

============================================================
34. PAYABLES
============================================================

Payables manages amounts owed BY the business.

Possible sources:

Vendor Invoice

Purchase

Outsource Vendor

Expense Vendor

Other Approved Payable

============================================================
35. PAYABLE PROCESS
============================================================

Vendor Invoice / Payable Source
        ↓
Verification
        ↓
Amount Payable
        ↓
Due Date
        ↓
Payment
        ↓
Partial / Full Payment
        ↓
Credit Adjustment
        ↓
Outstanding
        ↓
Closed

============================================================
36. PAYABLE LIST
============================================================

Use:

T02 List Page

Quick filters:

All

Unpaid

Partially Paid

Due Today

Due Soon

Overdue

On Hold

Paid

============================================================
37. PAYABLE SEARCH
============================================================

Search:

Vendor

Vendor Invoice

PO

GRN

Purchase Number

Payment Reference

============================================================
38. PAYABLE FILTERS
============================================================

Vendor

Source

Branch

Invoice Date

Due Date

Payment Status

Amount Range

============================================================
39. PAYABLE TABLE
============================================================

Recommended columns:

Vendor Invoice

Vendor

Source

Invoice Date

Due Date

Invoice Amount

Credit

Paid

Outstanding

Status

Actions

============================================================
40. PAYABLE DETAIL
============================================================

Display:

Vendor

Purchase Order

GRN

Vendor Invoice

Invoice Verification

Credit Notes

Payments

Outstanding

Due Date

Documents

Timeline

============================================================
41. VENDOR PAYMENT
============================================================

Use:

C01 Drawer / Modal

Fields:

Vendor *

Invoice / Reference

Payment Type

Amount *

Payment Mode *

Payment Date *

Bank / Cash Account

Reference

Notes

============================================================
42. VENDOR PAYMENT TYPES
============================================================

Possible:

Advance

Invoice Payment

Partial Payment

Full Payment

Credit Adjustment

Refund Adjustment

Other Payment

============================================================
43. VENDOR ADVANCE
============================================================

Vendor advance may exist before invoice.

Track:

Advance Paid

Advance Applied

Advance Available

Related PO

Vendor

============================================================
44. VENDOR PARTIAL PAYMENT
============================================================

Example:

Vendor Invoice:
$4,620

Advance:
$1,000

Payment:
$1,500

Outstanding:
$2,120

Maintain transaction-level history.

============================================================
45. VENDOR OUTSTANDING
============================================================

Vendor workspace should consume Finance payable data.

Show:

Current Payable

Overdue

Advance

Credit Notes

Net Outstanding

============================================================
46. PAYABLE AGEING
============================================================

Recommended:

Current

1–30 Days

31–60 Days

61–90 Days

90+ Days

============================================================
47. PAYMENT HOLD
============================================================

Possible reasons:

Invoice Mismatch

Rejected Goods

Credit Note Pending

Approval Pending

Vendor Dispute

Missing Documents

Management Hold

============================================================
48. TRANSACTIONS
============================================================

Transactions provides unified money movement history.

Use:

T02 List Page

Transaction types may include:

Receipt

Payment

Advance

Refund

Credit Adjustment

Debit Adjustment

Expense

Transfer

============================================================
49. TRANSACTION LIST
============================================================

Quick filters:

All

Receipts

Payments

Cash

Bank

Card

UPI

Cheque

Refunds

Today

============================================================
50. TRANSACTION SEARCH
============================================================

Search:

Transaction Number

Customer

Vendor

Invoice

Job Card

PO

Claim

Reference

Amount

============================================================
51. TRANSACTION TABLE
============================================================

Recommended columns:

Date / Time

Transaction ID

Party

Source

Type

Mode

Reference

Money In

Money Out

Branch

Status

Actions

============================================================
52. TRANSACTION DETAIL
============================================================

Display:

Transaction Number

Date / Time

Party

Amount

Type

Mode

Source

Reference

Account

Created By

Status

Notes

Documents

Timeline

============================================================
53. TRANSACTION STATUS
============================================================

Possible:

Pending

Completed

Failed

Cancelled

Reversed

Bounced

On Hold

============================================================
54. PAYMENT REVERSAL
============================================================

Completed financial transactions should NOT be deleted.

Process:

Original Transaction
        ↓
Request Reversal
        ↓
Reason
        ↓
Authorization where applicable
        ↓
Reversal Transaction
        ↓
Outstanding Recalculated
        ↓
History Preserved

============================================================
55. CHEQUE MANAGEMENT
============================================================

Cheque payment / receipt may require:

Cheque Number

Bank

Cheque Date

Deposit Date

Clearance Date

Status

Remarks

============================================================
56. CHEQUE STATUS
============================================================

Possible:

Received

Issued

Deposited

Pending Clearance

Cleared

Bounced

Cancelled

Returned

============================================================
57. CHEQUE BOUNCE
============================================================

Cheque Bounced
        ↓
Original Transaction Status Updated
        ↓
Outstanding Restored
        ↓
Bounce Reason
        ↓
Charges where applicable later
        ↓
Customer / Vendor Follow-Up

============================================================
58. EXPENSES
============================================================

Expenses manages business operating expenses not already
represented through Purchase.

Examples:

Rent

Electricity

Internet

Fuel

Travel

Staff Expense

Petty Cash

Office Expense

Workshop Expense

Maintenance

Marketing

Professional Fee

Other

============================================================
59. EXPENSE LIST
============================================================

Use:

T02 List Page

Primary Action:

+ Add Expense

Quick filters:

All

Today

Pending Approval

Approved

Paid

Unpaid

Recurring

============================================================
60. ADD EXPENSE
============================================================

Use:

T05 Add/Edit Form or contextual form.

Fields:

Expense Number

Expense Date *

Category *

Description *

Vendor / Payee

Amount *

Tax where applicable

Payment Mode

Branch

Department / Cost Center where applicable

Reference

Attachment

Notes

============================================================
61. EXPENSE CATEGORIES
============================================================

Expense categories should be configurable.

Possible:

Rent

Utility

Fuel

Travel

Salary Related

Office

Workshop

Marketing

Maintenance

Bank Charges

Professional

Miscellaneous

============================================================
62. EXPENSE PAYMENT STATUS
============================================================

Possible:

Draft

Approval Pending

Approved

Unpaid

Partially Paid

Paid

Rejected

Cancelled

============================================================
63. EXPENSE APPROVAL
============================================================

Frontend should prepare:

Requested By

Expense

Amount

Category

Attachment

Approver

Status

Remarks

Actual approval rules later.

============================================================
64. RECURRING EXPENSE PREPARATION
============================================================

Possible recurring:

Rent

Internet

Software Subscription

Maintenance Contract

Utility

Frontend may display:

Frequency

Next Due

Amount

Status

No scheduler/backend required now.

============================================================
65. CASH & BANK
============================================================

Cash & Bank provides visibility of financial accounts.

Possible:

Cash Counter

Petty Cash

Bank Account

Card Settlement Account

UPI Settlement Account

Other Financial Account

============================================================
66. CASH & BANK DASHBOARD
============================================================

Show:

Opening Balance

Money In

Money Out

Closing Balance

Pending Settlement

Unreconciled

Branch

============================================================
67. CASH ACCOUNT
============================================================

Display:

Opening Cash

Cash Receipts

Cash Payments

Cash Expenses

Cash Refunds

Cash Transfer

Expected Closing

Actual Closing

Difference

============================================================
68. BANK ACCOUNT
============================================================

Display:

Bank Name

Account Name

Masked Account Number

Opening Balance

Deposits

Payments

Transfers

Closing Balance

Unreconciled Transactions

============================================================
69. INTERNAL TRANSFER
============================================================

Possible:

Cash → Bank

Bank → Cash

Bank A → Bank B

Petty Cash → Main Cash

Capture:

From

To

Amount

Date

Reference

Notes

============================================================
70. TRANSFER RULE
============================================================

A transfer should conceptually create linked:

Money Out from Source

Money In to Destination

Do NOT treat transfer as business income or expense.

============================================================
71. BANK RECONCILIATION PREPARATION
============================================================

Frontend may support:

System Transactions

Bank Statement Transactions

Matched

Unmatched

Difference

Reconciliation Status

No bank API required.

============================================================
72. RECONCILIATION STATUS
============================================================

Possible:

Unmatched

Suggested Match

Matched

Difference

Ignored with reason

============================================================
73. CARD / UPI SETTLEMENT
============================================================

Payment received by Card / UPI may have:

Transaction Amount

Gateway / Provider

Settlement Amount

Fee

Settlement Date

Reference

Status

============================================================
74. CREDIT NOTE
============================================================

Credit Note reduces amount payable by customer or amount due
depending on business context.

Credit Note must reference original transaction.

============================================================
75. CUSTOMER CREDIT NOTE
============================================================

Possible reasons:

Invoice Correction

Returned Item

Service Adjustment

Discount Adjustment

Billing Error

Goodwill

Other

============================================================
76. CREDIT NOTE PROCESS
============================================================

Select Invoice
        ↓
Reason
        ↓
Select Amount / Items
        ↓
Calculate Credit
        ↓
Review
        ↓
Generate Credit Note
        ↓
Outstanding Adjusted
        ↓
History Updated

============================================================
77. CREDIT NOTE INFORMATION
============================================================

Fields:

Credit Note Number

Date

Party

Original Invoice

Reason

Amount

Tax Adjustment

Reference

Remarks

============================================================
78. VENDOR CREDIT NOTE
============================================================

Vendor Credit Note may originate from:

Purchase Return

Price Difference

Rejected Goods

Vendor Adjustment

It should reduce vendor payable appropriately.

============================================================
79. DEBIT NOTE
============================================================

Debit Note may be used where applicable for:

Vendor Adjustment

Purchase Return Context

Undercharge Correction

Other accounting requirement

Frontend should support contextual representation.

============================================================
80. CREDIT / DEBIT NOTE STATUS
============================================================

Possible:

Draft

Approval Pending

Approved

Applied

Partially Applied

Cancelled

============================================================
81. REFUNDS
============================================================

Refunds must remain connected to original receipt / payment.

Possible:

Customer Refund

Booking Refund

Workshop Refund

Vehicle Sale Refund

Vendor Refund

Advance Refund

============================================================
82. CUSTOMER REFUND PROCESS
============================================================

Original Payment
        ↓
Refund Request
        ↓
Reason
        ↓
Refundable Amount
        ↓
Approval where applicable
        ↓
Refund Mode
        ↓
Refund Transaction
        ↓
Receipt / Balance Updated

============================================================
83. REFUND INFORMATION
============================================================

Fields:

Refund Number

Party

Original Transaction

Original Amount

Refund Amount

Reason

Refund Mode

Date

Reference

Approved By

Status

============================================================
84. REFUND STATUS
============================================================

Possible:

Requested

Approval Pending

Approved

Processing

Completed

Rejected

Cancelled

============================================================
85. REFUND RULE
============================================================

Never delete or overwrite original payment.

Always retain:

Original Transaction

Refund Transaction

Reason

User

Date / Time

============================================================
86. INVOICE FINANCIAL VIEW
============================================================

Finance should show invoices originating from source modules.

Invoice types may include:

Workshop Invoice

Vehicle Sale Invoice

Parts Sale Invoice

Other Business Invoice

Do NOT recreate operational invoice generation inside Finance.

============================================================
87. INVOICE FINANCIAL SUMMARY
============================================================

Show:

Invoice Amount

Tax

Discount

Credit Note

Paid

Refunded

Outstanding

Payment Status

============================================================
88. INVOICE CANCELLATION PREPARATION
============================================================

If cancellation is permitted:

Invoice
        ↓
Check Payments
        ↓
Check Credit Notes
        ↓
Cancellation Reason
        ↓
Authorization
        ↓
Cancel / Reverse
        ↓
Financial History Preserved

Do NOT simply delete invoice.

============================================================
89. TAX SUMMARY
============================================================

Frontend should prepare tax visibility.

Possible:

Taxable Sales

Output Tax

Taxable Purchases

Input Tax

Credit Notes

Debit Notes

Net Tax Position

Exact tax calculation and statutory compliance belong to
backend/accounting implementation.

============================================================
90. TAX TRANSACTION VIEW
============================================================

Recommended columns:

Date

Invoice

Party

Transaction Type

Taxable Amount

Tax

Source

Branch

============================================================
91. DISCOUNTS
============================================================

Finance reports should show discounts from:

Workshop

Vehicle Sales

Parts Sales

Other Sales

Possible dimensions:

User

Branch

Customer

Module

Reason

============================================================
92. DAILY CLOSING
============================================================

Daily Closing is CRITICAL for operational finance control.

Process:

Business Day
        ↓
Calculate Opening
        ↓
Receipts
        ↓
Payments
        ↓
Expenses
        ↓
Transfers
        ↓
Refunds
        ↓
Expected Closing
        ↓
Actual Cash Count
        ↓
Difference
        ↓
Review
        ↓
Close Day

============================================================
93. DAILY CLOSING SUMMARY
============================================================

Show:

Opening Cash

Cash Sales

Cash Receipts

Cash Expenses

Cash Vendor Payments

Cash Refunds

Cash Transfers

Expected Cash

Actual Cash

Difference

============================================================
94. NON-CASH CLOSING
============================================================

Also show:

Card Collections

UPI Collections

Bank Transfers

Cheques

Credit Sales

Insurance Receivables

Total Collections

============================================================
95. CASH DENOMINATION
============================================================

Optional UI:

Denomination

Count

Amount

Total Physical Cash

Do NOT require it if business configuration disables it.

============================================================
96. CLOSING DIFFERENCE
============================================================

If:

Expected:
$5,250

Actual:
$5,200

Difference:
-$50

Show prominently:

CASH SHORT

Require:

Reason

Remarks

Responsible User

============================================================
97. EXCESS CASH
============================================================

If actual exceeds expected:

Show:

CASH EXCESS

Capture reason.

Do NOT silently alter expected balance.

============================================================
98. DAILY CLOSING STATUS
============================================================

Possible:

Open

Ready for Closing

Difference Found

Review Required

Closed

Reopened where authorized

============================================================
99. CLOSING BY BRANCH / COUNTER
============================================================

Where multiple branches/counters exist:

Branch

Counter

Cashier

Shift where applicable

Opening

Closing

Difference

============================================================
100. SHIFT CLOSING PREPARATION
============================================================

Future-ready support:

Shift Start

Opening Cash

Shift Transactions

Cash Count

Shift Close

Handover

Do NOT force shift management if not configured.

============================================================
101. FINANCIAL REPORTS
============================================================

Report Center should include financial reporting without
turning normal operations into separate modules.

============================================================
102. SALES REPORT
============================================================

Possible dimensions:

Date

Branch

Module

Customer

Invoice

Revenue Type

Tax

Discount

Net Amount

============================================================
103. COLLECTION REPORT
============================================================

Show:

Cash

Card

UPI

Bank

Cheque

Credit Recovery

Insurance Receipt

Total

============================================================
104. OUTSTANDING REPORT
============================================================

Possible:

Customer Outstanding

Corporate Outstanding

Insurance Outstanding

Ageing

Overdue

============================================================
105. PAYABLE REPORT
============================================================

Possible:

Vendor Outstanding

Vendor Ageing

Due Today

Overdue

Advance

Credit Note

============================================================
106. EXPENSE REPORT
============================================================

Possible:

Expense by Category

Branch

Date

Payee

Payment Mode

Department

============================================================
107. CASH FLOW SUMMARY
============================================================

Show:

Opening

Money In

Money Out

Net Movement

Closing

By:

Day

Week

Month

Custom Range

============================================================
108. PROFIT & LOSS PREPARATION
============================================================

Frontend may provide management-level P&L presentation:

Revenue

Cost of Goods / Parts

Labour Revenue

Other Revenue

Operating Expenses

Gross Profit

Net Operating Result

Exact accounting rules belong to accounting/backend phase.

============================================================
109. REVENUE BREAKDOWN
============================================================

Possible:

Workshop Labour

Workshop Parts

Lubricants

Outsource Charges

Vehicle Sales

Accessories

Insurance Related

Other Revenue

============================================================
110. COST BREAKDOWN
============================================================

Possible:

Parts Cost

Vehicle Purchase Cost

Outsource Cost

Operating Expense

Other Cost

Do NOT invent cost values when source data is unavailable.

============================================================
111. BRANCH FINANCIAL SUMMARY
============================================================

For each branch:

Sales

Collections

Expenses

Receivables

Payables

Cash

Bank

Outstanding

============================================================
112. BRANCH COMPARISON
============================================================

Where permissions allow:

Pune

Mumbai

Nashik

Compare:

Revenue

Collection

Expense

Outstanding

Operational figures must retain branch ownership.

============================================================
113. FINANCIAL PERIOD FILTER
============================================================

Support:

Today

Yesterday

Week

Month

Quarter

Financial Year

Custom

============================================================
114. TRANSACTION TIMELINE
============================================================

Financial workspaces should maintain timeline.

Examples:

Invoice Generated

Payment Received

Partial Payment Received

Cheque Deposited

Cheque Cleared

Cheque Bounced

Credit Note Generated

Refund Requested

Refund Approved

Refund Completed

Invoice Paid

Transaction Reversed

============================================================
115. FINANCE DOCUMENTS
============================================================

Possible:

Invoice PDF

Receipt

Payment Proof

Cheque Copy

Credit Note

Debit Note

Refund Document

Vendor Invoice

Expense Receipt

Bank Proof

Closing Report

Other Attachment

============================================================
116. FINANCIAL DOCUMENT ACTIONS
============================================================

Preview

Print

Download

Email

WhatsApp where applicable

Upload Attachment

Do NOT casually delete finalized financial documents.

============================================================
117. FINANCIAL AUDIT TRACE
============================================================

Every important financial action should visually retain:

Created By

Created Date

Modified By where applicable

Approved By

Transaction Reference

Source

Reversal Reference

Reason

============================================================
118. FINANCE + WORKSHOP
============================================================

Workshop:

Job Card
        ↓
Invoice
        ↓
Payment

Finance:

Invoice becomes Receivable
        ↓
Payment becomes Transaction
        ↓
Outstanding updates

NO duplicate invoice/payment entry.

============================================================
119. FINANCE + VEHICLE SALES
============================================================

Vehicle Sale:

Booking Payment

Advance

Invoice

Partial Payment

Finance Disbursement

Exchange Adjustment

Refund

All should flow into Finance visibility.

============================================================
120. FINANCE + PURCHASE
============================================================

Purchase:

Vendor Invoice
        ↓
Payable
        ↓
Vendor Payment
        ↓
Outstanding

Purchase Return:
        ↓
Vendor Credit Note
        ↓
Payable Adjustment

============================================================
121. FINANCE + INSURANCE
============================================================

Claim:

Insurer Liability
        ↓
Insurance Receivable
        ↓
Settlement
        ↓
Receipt
        ↓
Outstanding Updated

Customer Liability:

Customer Receivable
        ↓
Customer Payment

============================================================
122. FINANCE + CRM
============================================================

Customer 360 consumes:

Outstanding

Credit Limit

Payments

Invoices

Refunds

Statement

Finance remains source of financial truth.

============================================================
123. FINANCE + EXPENSE
============================================================

Expense approved and paid:

Expense
        ↓
Payment Transaction
        ↓
Cash / Bank Impact
        ↓
Reports

============================================================
124. FINANCE + CASH / BANK
============================================================

Every completed financial transaction should indicate affected
financial account where applicable.

Example:

Customer Payment
$500
Mode: Cash
        ↓
Pune Main Cash +$500

============================================================
125. MULTI-BRANCH FINANCE
============================================================

Every financial transaction should retain:

Branch

Source Branch

Financial Account

User / Cashier

Date / Time

Do NOT lose branch attribution.

============================================================
126. ORGANIZATION-WIDE VIEW
============================================================

Authorized management users may view:

All Branch Revenue

All Branch Collections

All Branch Expenses

Consolidated Receivables

Consolidated Payables

Cash / Bank Summary

Branch Comparison

============================================================
127. FINANCIAL PERMISSIONS PREPARATION
============================================================

Frontend should support permission-sensitive actions such as:

View Cost

View Profit

Receive Payment

Make Payment

Approve Expense

Issue Refund

Create Credit Note

Reverse Transaction

Close Day

Reopen Closing

View All Branches

Actual permission engine later.

============================================================
128. SENSITIVE VALUE VISIBILITY
============================================================

Some users may not have access to:

Purchase Cost

Profit

Bank Balance

Vendor Payable

Organization P&L

Credit Limit

Frontend architecture should allow these sections/actions to be
hidden based on future permissions.

============================================================
129. GLOBAL SEARCH
============================================================

Global ERP Search should find:

Invoice

Payment

Transaction

Customer

Vendor

Credit Note

Refund

Expense

Example:

TRANSACTION

TXN-2026-001582

Rajesh Sharma

Receipt

$500

Status:
Completed

============================================================
130. FINANCE QUICK ACTIONS
============================================================

Context dependent:

Receive Payment

Make Vendor Payment

Add Expense

Record Advance

Apply Advance

Create Credit Note

Create Debit Note

Issue Refund

Transfer Funds

Record Cheque

Close Day

Print Statement

============================================================
131. MORE ACTIONS
============================================================

Possible:

View Source Transaction

Upload Proof

Print Receipt

Send Receipt

Request Reversal

Put Payment On Hold

Export

============================================================
132. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Finance Dashboard

Date Filter

Branch Filter

Receivable List

Receivable Detail

Workshop Receivable

Vehicle Sales Receivable

Insurance Receivable

Receive Payment

Advance Payment

Partial Payment

Full Payment

Customer Credit

Credit Limit Warning

Customer Outstanding

Receivable Ageing

Customer Statement

Payable List

Payable Detail

Vendor Advance

Vendor Partial Payment

Vendor Full Payment

Vendor Outstanding

Payable Ageing

Payment Hold

Unified Transaction List

Transaction Detail

Cheque Entry

Cheque Clearance

Cheque Bounce

Payment Reversal

Expense List

Add Expense

Expense Approval

Recurring Expense UI

Cash Account

Bank Account

Internal Transfer

Bank Reconciliation UI

Card / UPI Settlement

Credit Note

Debit Note

Vendor Credit Note

Refund Request

Refund Approval

Refund Completion

Invoice Financial View

Daily Closing

Cash Count

Cash Difference

Branch Closing

Tax Summary

Sales Report

Collection Report

Outstanding Report

Payable Report

Expense Report

Cash Flow

P&L Presentation

Branch Comparison

Documents

Timeline

No API/backend required.

============================================================
133. RECOMMENDED FRONTEND FILES
============================================================

finance-dashboard.html

receivables.html

receivable-detail.html

payables.html

payable-detail.html

transactions.html

transaction-detail.html

expenses.html

expense-form.html

cash-bank.html

daily-closing.html

finance-reports.html

customer-statement-print.html

payment-receipt-print.html

vendor-payment-print.html

credit-note-print.html

debit-note-print.html

refund-print.html

daily-closing-print.html

Do NOT create unnecessary standalone pages for every:

Partial Payment

Advance

Credit Note

Refund

Cheque

Adjustment

Use contextual drawers/modals/workspaces where practical.

============================================================
134. REUSABLE FINANCE COMPONENTS
============================================================

Financial KPI Card

Party Search

Invoice Selector

Source Transaction Card

Receive Payment Drawer

Make Payment Drawer

Payment Summary

Outstanding Summary

Ageing Summary

Credit Limit Alert

Transaction History

Cheque Panel

Expense Form

Approval Panel

Cash Summary

Bank Summary

Transfer Drawer

Reconciliation Grid

Credit Note Drawer

Debit Note Drawer

Refund Drawer

Daily Closing Panel

Cash Count

Difference Alert

Tax Summary

Financial Timeline

Document Panel

============================================================
135. FEATURE → LOCATION MAP
============================================================

Customer Invoice
→ Receivables

Customer Payment
→ Receivable / Source Workspace

Outstanding
→ Receivables

Customer Credit
→ Receivable / Customer 360

Insurance Receivable
→ Receivables

Vendor Invoice
→ Payables

Vendor Payment
→ Payables

Vendor Outstanding
→ Payables

All Money Movement
→ Transactions

Expenses
→ Expenses

Cash
→ Cash & Bank

Bank
→ Cash & Bank

Transfers
→ Cash & Bank

Reconciliation
→ Cash & Bank

Credit Note
→ Relevant Receivable / Payable Context

Debit Note
→ Relevant Financial Context

Refund
→ Original Transaction Context

Daily Closing
→ Cash & Bank / Finance

Tax
→ Reports

P&L
→ Reports

Branch Finance
→ Dashboard / Reports

Documents
→ Source / Financial Workspace

Timeline
→ Relevant Workspace

============================================================
136. NO DUPLICATION RULE
============================================================

DO NOT create separate:

Workshop Payment

Sales Payment

CRM Payment

Insurance Payment

Purchase Payment databases.

They are financial transactions connected to source modules.

DO NOT duplicate:

Customer

Vendor

Invoice

Job Card

Vehicle Sale

Purchase

Insurance Claim

Employee

Branch

============================================================
137. FINANCE ACCEPTANCE CHECKLIST
============================================================

Before Finance & Accounts is considered complete:

[ ] Finance Dashboard

[ ] Date Filter

[ ] Branch Filter

[ ] Today's Sales

[ ] Collections

[ ] Expenses

[ ] Customer Outstanding

[ ] Vendor Payable

[ ] Cash Balance

[ ] Bank Balance

[ ] Receivables

[ ] Receivable Detail

[ ] Source Traceability

[ ] Customer Payment

[ ] Advance Payment

[ ] Partial Payment

[ ] Full Payment

[ ] Payment Modes

[ ] Customer Advance

[ ] Customer Credit

[ ] Credit Limit

[ ] Credit Warning

[ ] Receivable Ageing

[ ] Customer Statement

[ ] Insurance Receivable

[ ] Payables

[ ] Payable Detail

[ ] Vendor Advance

[ ] Vendor Partial Payment

[ ] Vendor Full Payment

[ ] Vendor Outstanding

[ ] Payable Ageing

[ ] Payment Hold

[ ] Transactions

[ ] Transaction Detail

[ ] Money In

[ ] Money Out

[ ] Transaction Status

[ ] Payment Reversal

[ ] Cheque

[ ] Cheque Clearance

[ ] Cheque Bounce

[ ] Expenses

[ ] Expense Category

[ ] Expense Approval

[ ] Recurring Expense UI

[ ] Cash Account

[ ] Bank Account

[ ] Internal Transfer

[ ] Bank Reconciliation UI

[ ] Card / UPI Settlement

[ ] Credit Note

[ ] Debit Note

[ ] Vendor Credit Note

[ ] Refund

[ ] Refund Approval

[ ] Invoice Financial View

[ ] Tax Summary

[ ] Daily Closing

[ ] Opening Cash

[ ] Expected Cash

[ ] Actual Cash

[ ] Cash Difference

[ ] Branch Closing

[ ] Sales Report

[ ] Collection Report

[ ] Outstanding Report

[ ] Payable Report

[ ] Expense Report

[ ] Cash Flow

[ ] P&L Presentation

[ ] Branch Comparison

[ ] Documents

[ ] Timeline

[ ] Permission-Sensitive Values

[ ] No backend/API generated

============================================================
138. STRICT DO-NOT RULES
============================================================

DO NOT:

- Recreate Workshop invoices inside Finance.
- Recreate Vehicle Sale invoices inside Finance.
- Recreate Vendor invoices unnecessarily.
- Re-enter payments already recorded in source modules.
- Create separate payment databases per module.
- Delete completed financial transactions.
- Delete original payment after refund.
- Overwrite original payment during reversal.
- Treat internal transfer as revenue.
- Treat internal transfer as expense.
- Treat unused customer advance as invoice payment.
- Hide overdue receivables.
- Hide overdue payables.
- Hide cheque bounce.
- Hide cash closing difference.
- Silently change expected cash to match actual cash.
- Lose source transaction references.
- Lose branch attribution.
- Mix operational transaction creation with accounting
  duplication.
- Implement complex statutory accounting rules during UI phase.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
139. FINAL FINANCE EXPERIENCE
============================================================

When management opens Finance they should immediately
understand:

HOW MUCH DID WE BILL TODAY?

HOW MUCH DID WE COLLECT?

WHICH CUSTOMERS OWE US MONEY?

WHICH PAYMENTS ARE OVERDUE?

HOW MUCH DO INSURANCE COMPANIES OWE US?

HOW MUCH DO WE OWE VENDORS?

WHICH VENDOR PAYMENTS ARE DUE?

WHAT EXPENSES HAVE OCCURRED?

HOW MUCH CASH SHOULD WE HAVE?

HOW MUCH CASH DO WE ACTUALLY HAVE?

WHAT IS IN EACH BANK ACCOUNT?

WHICH TRANSACTIONS ARE UNMATCHED?

ARE ANY CHEQUES PENDING OR BOUNCED?

ARE ANY REFUNDS PENDING?

WHAT CREDIT / DEBIT ADJUSTMENTS EXIST?

HAS TODAY'S CASH BEEN CLOSED?

IS THERE ANY CLOSING DIFFERENCE?

WHAT ARE SALES, COLLECTIONS AND EXPENSES BY BRANCH?

WHAT IS THE CURRENT FINANCIAL POSITION?

============================================================
140. FINAL PRINCIPLE
============================================================

FINANCE SHOULD NOT FEEL LIKE:

WORKSHOP PAYMENT
+
SALES PAYMENT
+
PURCHASE PAYMENT
+
INSURANCE PAYMENT
+
CUSTOMER OUTSTANDING
+
VENDOR OUTSTANDING
+
REFUND
+
EXPENSE
+
CASH
+
BANK

AS SEPARATE UNRELATED SYSTEMS.

IT SHOULD FEEL LIKE:

BUSINESS TRANSACTION
        ↓
INVOICE / PAYABLE
        ↓
RECEIVABLE / PAYABLE
        ↓
PAYMENT / RECEIPT
        ↓
PARTIAL / FULL / ADVANCE
        ↓
ADJUSTMENT / REFUND IF REQUIRED
        ↓
OUTSTANDING
        ↓
CASH / BANK
        ↓
DAILY CLOSING
        ↓
REPORTING
        ↓
COMPLETE FINANCIAL TRACEABILITY

ONE FINANCIAL SOURCE OF TRUTH.

CONNECTED TO EVERY BUSINESS MODULE.

NO DUPLICATE ENTRY.

NO DESTRUCTIVE FINANCIAL HISTORY.

BRANCH-AWARE.

PERMISSION-AWARE.

MINIMUM NAVIGATION.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/09_FINANCE_ACCOUNTS.md
============================================================