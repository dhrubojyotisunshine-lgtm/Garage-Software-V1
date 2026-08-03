# ENTERPRISE GARAGE ERP
# 04_ALL_MODULES.md
# MASTER MODULE & BUSINESS OBJECT ARCHITECTURE

Version: 1.0
Status: MASTER MODULE ARCHITECTURE
Applies To: Complete Enterprise Garage ERP Web Admin
Implementation Phase: Frontend UI Only

============================================================
1. PURPOSE
============================================================

This document defines the COMPLETE MODULE ARCHITECTURE of the
Enterprise Garage ERP.

This file tells Claude:

- What the main modules are
- What each module is responsible for
- What appears in navigation
- What the primary business objects are
- What requires a workspace
- What belongs inside another workspace
- What requires an operational board
- What belongs in Masters
- What belongs in Settings
- What belongs in Administration
- How modules connect with each other

IMPORTANT:

This file defines MODULE BOUNDARIES.

Detailed fields, processes, statuses, actions, tabs and business
flows will be defined in separate module process files.

Do NOT invent detailed processes based only on this file.

============================================================
2. CORE ARCHITECTURE PRINCIPLE
============================================================

The ERP must be organized around BUSINESS WORK rather than
individual features.

Correct:

WORKSHOP
    ↓
JOB CARD
    ↓
COMPLETE JOB CARD WORKSPACE

Incorrect:

WORKSHOP
    ↓
Inspection Menu
Estimate Menu
Bay Menu
Mechanic Menu
Labour Menu
Parts Menu
QC Menu
Payment Menu

Features remain available.

Navigation complexity is reduced.

============================================================
3. MASTER MODULE STRUCTURE
============================================================

The complete ERP is organized into:

01. Dashboard

02. CRM

03. Workshop

04. Inventory

05. Vehicle Sales

06. Counter Sale

07. Purchase & Vendor

08. Insurance

09. Customer Programs

10. Finance & Accounts

11. HRM

12. Reports & Analytics

13. Masters

14. Administration

15. Settings

16. Help Center

Additionally, the system contains SHARED CAPABILITIES that are
used contextually across modules.

============================================================
4. SHARED SYSTEM CAPABILITIES
============================================================

These are NOT automatically separate sidebar modules:

Global Search

Global Create

Notifications

Reminders

Approvals

Documents

Media

Voice Notes

Communication

Activity Timeline

Audit Logging

Import / Export

Soft Delete

Custom Fields

Dashboard Customization

Print / PDF

Branch Context

Financial Year

User Permissions

These capabilities must appear where the business process needs
them.

============================================================
5. MODULE 01 — DASHBOARD
============================================================

PURPOSE:

Provide overall operational visibility and quick access.

PRIMARY SCREEN:

Main Dashboard

RESPONSIBILITIES:

Business Overview

Branch Overview

Workshop Overview

Sales Overview

Inventory Alerts

Finance Overview

Customer Activity

Pending Approvals

Reminders

Notifications

Recent Activity

Quick Actions

MODULE TYPE:

T01 Dashboard

DO NOT:

Turn Dashboard into a transaction-entry module.

Dashboard cards/widgets should drill down to the relevant
module/list/workspace.

============================================================
6. DASHBOARD CONTEXT
============================================================

Dashboard should support:

Branch

All Branches

Date Range

Financial Year where applicable

Role-ready widget visibility

Dashboard customization preparation

Possible quick actions:

New Lead

New Customer

New Appointment

New Job Card

Counter Sale

Vehicle Sale

Purchase

Receive Payment

Expense

============================================================
7. MODULE 02 — CRM
============================================================

PURPOSE:

Manage prospective customers, existing customers, communication,
follow-ups and customer relationships.

PRIMARY BUSINESS OBJECTS:

Lead

Customer

Appointment / Follow-Up where applicable

PRIMARY NAVIGATION:

CRM Dashboard

Leads

Customers

Do NOT create separate permanent navigation for every
communication method.

============================================================
8. CRM — LEAD WORKSPACE
============================================================

Lead is an ACTIVE BUSINESS PROCESS.

Use:

T03 Primary Business Workspace

Lead Workspace may contain:

Lead Information

Customer Information

Vehicle Information

Requirement / Interest

Lead Source

Assigned Executive

Follow-Up

Appointment

Call

SMS

WhatsApp

Email

Quotation / Estimate Link

Notes

Reminders

Documents

Activities

Timeline

Lead Conversion

Exact process is defined in:

05_MODULE_FLOWS/02_CRM.md

============================================================
9. CRM — CUSTOMER
============================================================

Customer is a CENTRAL SHARED ENTITY.

Customer information may include:

Profile

Contact

Addresses

Vehicles

Job Cards

Service History

Vehicle Purchases

Counter Sales

Invoices

Payments

Outstanding

Insurance

Membership

Loyalty

AMC

Wallet

Documents

Communication

Timeline

Do NOT duplicate Customer Masters across modules.

============================================================
10. CRM RELATIONSHIPS
============================================================

Lead
        ↓
Customer
        ↓
Vehicle
        ↓
Appointment
        ↓
Job Card

Customer also connects to:

Vehicle Sale

Counter Sale

Insurance

Finance

Membership

Loyalty

AMC

Wallet

============================================================
11. MODULE 03 — WORKSHOP
============================================================

PURPOSE:

Manage the COMPLETE vehicle service and repair lifecycle.

PRIMARY BUSINESS OBJECT:

JOB CARD

This is one of the most important modules in the ERP.

PRIMARY NAVIGATION:

Workshop Dashboard

Job Cards

Operational views should be accessible primarily through
Workshop Dashboard.

============================================================
12. WORKSHOP — JOB CARD WORKSPACE
============================================================

Job Card is the PRIMARY WORKSPACE.

Use:

T03 Primary Business Workspace

The COMPLETE service process must remain connected to the Job
Card.

High-level process:

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
Mechanic / Supervisor Assignment
        ↓
Repair Process
        ↓
Repair Evidence / Advice
        ↓
Labour / Spares / Lubes / Outsource
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

Detailed Workshop specification will be defined separately.

============================================================
13. WORKSHOP — REPAIR CONTENT
============================================================

Job Card repair context must support, where specified:

Voice

Parts Advice

Advice

Advice Note

Dent

Scratch

Broken Damage

Erase Damage Mark

Erase All Damage Marks

Photos

Repair Notes

Work Progress

Additional Work

Customer Re-Approval where required

Do NOT create independent global modules for these.

============================================================
14. WORKSHOP — ITEM MANAGEMENT
============================================================

Job Card must support unified service item management.

Item categories:

Labour

Spares

Lubricants

Outsource Items

Total Items

Each relevant item should support appropriate:

Quantity

Rate / Price

Discount

Tax

Amount

Total

Additional item-specific fields are defined in Workshop flow.

============================================================
15. WORKSHOP — OPERATIONAL VIEWS
============================================================

Workshop also requires operational visibility.

Views may include:

Service Calendar

Vehicle Queue

Bay Board

Technician Board

Service History

These are NOT replacements for Job Card Workspace.

Preferred access:

Workshop Dashboard
        ↓
Operational Widget
        ↓
View Full Board

Use:

T06 Operational Board where full-screen view is required.

============================================================
16. WORKSHOP — SERVICE CALENDAR
============================================================

Provides operational scheduling for:

Appointments

Check-In

Technicians

Bays

Expected Deliveries

Daily View

Weekly View

Monthly View

Exact functionality defined in Workshop flow.

============================================================
17. WORKSHOP — VEHICLE QUEUE
============================================================

Provides visual vehicle progression.

Possible stages:

Waiting

Check-In

Inspection

Repair

QC

Ready

Delivered

Clicking vehicle/job should open Job Card Workspace.

============================================================
18. WORKSHOP — BAY BOARD
============================================================

Provides:

Available Bays

Occupied Bays

Maintenance Bays

Current Vehicle

Current Technician

Progress

Expected Completion

Bay assignment itself remains connected to Job Card.

============================================================
19. WORKSHOP — TECHNICIAN BOARD
============================================================

Provides:

Technician Availability

Attendance Context

Current Job

Assigned Jobs

Pending Jobs

Completed Jobs

Workload

Efficiency / Performance where applicable

Job click opens Job Card.

============================================================
20. WORKSHOP — SERVICE HISTORY
============================================================

Service History should be accessible contextually from:

Customer

Vehicle

Job Card

Global Search

It may display:

Previous Job Cards

Invoices

Payments

Parts

Labour

Lubes

Warranty

Insurance

Recommendations

Documents

============================================================
21. MODULE 04 — INVENTORY
============================================================

PURPOSE:

Manage spare parts, lubricants, accessories and stock movement.

PRIMARY BUSINESS OBJECTS:

Product / Item

Stock

Warehouse / Store where applicable

PRIMARY NAVIGATION:

Inventory Dashboard

Products

Stock

Do NOT create a separate permanent menu for every stock
transaction.

============================================================
22. INVENTORY — PRODUCT
============================================================

Product may represent:

Spare Part

Lubricant

Accessory

Consumable

Other Stock Item

Product Detail may include:

Basic Information

Category

Brand

Unit

Barcode

Pricing

Tax

Stock

Minimum Stock

Maximum Stock

Reorder Level

Suppliers

Compatible Vehicles where applicable

Locations

Transactions

Documents

Activity

============================================================
23. INVENTORY — STOCK OPERATIONS
============================================================

Inventory must support, where applicable:

Opening Stock

Stock In

Stock Out

Job Card Issue

Job Card Return

Purchase Receipt

Purchase Return

Counter Sale

Sales Return

Stock Adjustment

Damage

Loss

Transfer

Physical Verification

Reservation

Release Reservation

These should be represented as connected stock transactions,
not unrelated independent systems.

============================================================
24. INVENTORY — WORKSHOP CONNECTION
============================================================

Job Card Spare Consumption
        ↓
Inventory Issue / Reservation
        ↓
Stock Update

Job Card Return
        ↓
Inventory Return
        ↓
Stock Update

Workshop users should perform relevant item actions from the Job
Card.

Inventory users should see resulting stock transactions from
Inventory.

============================================================
25. INVENTORY — MULTI-BRANCH
============================================================

Stock should be prepared for:

Branch

Store / Warehouse where applicable

Location / Rack / Bin where applicable

Stock Transfer may connect:

Branch A
        ↓
Branch B

Exact rules defined in Inventory flow.

============================================================
26. INVENTORY — ALERTS
============================================================

Inventory Dashboard may include:

Low Stock

Out of Stock

Reorder Required

Pending Purchase

Dead Stock

Fast Moving Items

Damaged Stock

Expiring Items where applicable

============================================================
27. MODULE 05 — VEHICLE SALES
============================================================

PURPOSE:

Manage vehicle inventory and complete vehicle sales lifecycle.

PRIMARY BUSINESS OBJECTS:

Sale Vehicle

Vehicle Sale

PRIMARY NAVIGATION:

Vehicle Sales Dashboard

Vehicle Inventory

Vehicle Sales

Vehicle Sale should use a workspace.

============================================================
28. VEHICLE INVENTORY
============================================================

Vehicle inventory may contain:

Manufacturer

Model

Variant

Fuel Type

Transmission

Color

VIN / Chassis

Engine Number

Manufacturing Year

Purchase / Acquisition Details

Location

Branch

Cost

Selling Price

Status

Documents

Images

Vehicle preparation details where required

============================================================
29. VEHICLE SALE WORKSPACE
============================================================

High-level connected areas may include:

Customer

Vehicle

Quotation

Booking

Booking Amount

Accessories

Discount

Exchange Vehicle

Finance

Insurance

RTO

Documents

Billing

Payments

Outstanding

Delivery

Delivery Checklist

Customer Acknowledgement

Timeline

Exact process is defined separately.

============================================================
30. VEHICLE SALES PRINCIPLE
============================================================

Do NOT create permanent menus such as:

Quotation

Booking

Finance

Insurance

RTO

Billing

Delivery

when these represent stages of ONE Vehicle Sale.

Keep them connected inside Vehicle Sale Workspace.

Independent Finance/Insurance operational management may still
exist in their relevant modules.

============================================================
31. MODULE 06 — COUNTER SALE
============================================================

PURPOSE:

Provide fast retail billing for parts, lubricants, accessories
and other counter-sale items.

PRIMARY BUSINESS OBJECT:

Counter Sale

PRIMARY NAVIGATION:

POS / New Sale

Sales History

The primary experience should optimize billing speed.

============================================================
32. COUNTER SALE WORKSPACE
============================================================

Possible components:

Customer

Walk-In Customer

Vehicle where applicable

Barcode Scan

Product Search

Item Entry

Quantity

Price

Discount

Tax

Stock Availability

Subtotal

Grand Total

Payment

Payment Mode

Invoice

Receipt

Return / Exchange where applicable

Hold Sale

Resume Sale

Exact process defined separately.

============================================================
33. COUNTER SALE RELATIONSHIPS
============================================================

Counter Sale
        ↓
Inventory Stock Out

Counter Sale
        ↓
Customer History

Counter Sale
        ↓
Finance Transaction

Return
        ↓
Stock Return
        ↓
Financial Adjustment

============================================================
34. MODULE 07 — PURCHASE & VENDOR
============================================================

PURPOSE:

Manage procurement, vendors and incoming stock/services.

PRIMARY BUSINESS OBJECTS:

Vendor

Purchase Request where applicable

Purchase Order

Goods Receipt / GRN

Purchase Invoice

Purchase Return

PRIMARY NAVIGATION:

Purchase Dashboard

Purchase Orders

Vendors

Additional collections may be accessible inside Purchase
Dashboard/workspace depending on final flow.

============================================================
35. VENDOR PRINCIPLE
============================================================

Use ONE Vendor entity.

Vendor may serve:

Parts Purchase

Lubricant Purchase

Accessories

Outside Workshop Jobs

Other Services

Finance Payables

Do NOT create separate Vendor databases per module.

============================================================
36. PURCHASE PROCESS
============================================================

High-level process:

Requirement
        ↓
Purchase Request where required
        ↓
Approval
        ↓
Vendor / Quotation where required
        ↓
Purchase Order
        ↓
Goods Receipt / GRN
        ↓
Quality / Quantity Verification
        ↓
Purchase Invoice
        ↓
Stock Update
        ↓
Payment
        ↓
Return / Adjustment where required

Detailed rules defined separately.

============================================================
37. PURCHASE WORKSPACE
============================================================

Purchase Order should remain connected to:

Vendor

Items

Quantities

Prices

Tax

Discount

Expected Delivery

Approval

GRN

Received Quantity

Pending Quantity

Invoices

Payments

Returns

Documents

Timeline

============================================================
38. MODULE 08 — INSURANCE
============================================================

PURPOSE:

Manage vehicle insurance information and insurance-related
workshop claims.

PRIMARY BUSINESS OBJECTS:

Insurance Policy

Insurance Claim

PRIMARY NAVIGATION:

Insurance Dashboard

Policies

Claims

============================================================
39. INSURANCE POLICY
============================================================

Policy may contain:

Customer

Vehicle

Insurance Company

Policy Number

Policy Type

Start Date

Expiry Date

Premium

IDV where applicable

Agent

Documents

Renewal Reminder

History

============================================================
40. INSURANCE CLAIM WORKSPACE
============================================================

Possible connected areas:

Customer

Vehicle

Policy

Claim Number

Accident / Damage Information

Surveyor

Inspection

Estimate

Parts Approval

Labour Approval

Customer Liability

Insurance Liability

Job Card Link

Repair Progress

Documents

Photos

Invoice

Split Billing

Settlement

Payment

Timeline

Detailed process defined separately.

============================================================
41. INSURANCE + WORKSHOP RELATIONSHIP
============================================================

Insurance Claim
        ↕
Job Card

Job Card should show insurance context when applicable.

Insurance Claim should show related repair/job status.

Do NOT force duplicate repair data entry.

============================================================
42. MODULE 09 — CUSTOMER PROGRAMS
============================================================

PURPOSE:

Manage customer retention and prepaid/value programs.

PRIMARY AREAS:

Membership

Loyalty

AMC

Wallet

PRIMARY NAVIGATION:

Customer Programs Dashboard

Membership

Loyalty

AMC

Wallet

These may remain separate because they represent distinct
business programs.

============================================================
43. MEMBERSHIP
============================================================

Membership may include:

Customer

Plan

Start Date

Expiry

Benefits

Discounts

Usage

Renewal

Payment

Status

Documents

History

============================================================
44. LOYALTY
============================================================

Loyalty may include:

Customer

Points Earned

Points Redeemed

Balance

Transaction History

Expiry

Rules

Adjustments

============================================================
45. AMC
============================================================

AMC may include:

Customer

Vehicle

AMC Plan

Included Services

Usage Limit

Start Date

Expiry

Consumed Services

Remaining Services

Renewal

Payment

Documents

History

============================================================
46. CUSTOMER WALLET
============================================================

Wallet may include:

Customer

Balance

Credit

Debit

Refund

Adjustment

Transaction History

Source Record

Do NOT treat Wallet as normal accounting cash without Finance
integration.

============================================================
47. MODULE 10 — FINANCE & ACCOUNTS
============================================================

PURPOSE:

Manage financial transactions, receivables, payables,
accounting and financial reporting.

PRIMARY AREAS:

Finance Dashboard

Transactions

Accounts

Ledgers

Receivables

Payables

Tax / GST

Financial Statements

PRIMARY NAVIGATION should remain controlled.

============================================================
48. FINANCE TRANSACTIONS
============================================================

Transaction workspace/center may support:

Receipt

Payment

Journal

Contra

Debit Note

Credit Note

Expense

Income

Advance

Refund

Other approved voucher types

Do NOT create every voucher as a global sidebar module.

============================================================
49. RECEIVABLES
============================================================

Receivables may originate from:

Workshop Invoice

Vehicle Sale

Counter Sale

Insurance

Membership

AMC

Other Customer Transactions

Finance should provide:

Outstanding

Ageing

Partial Payments

Advance Adjustment

Credit

Receipt History

============================================================
50. PAYABLES
============================================================

Payables may originate from:

Purchase

Vendor

Outside Job

Expenses

Other approved transactions

Finance should provide:

Outstanding

Due Date

Ageing

Payments

Adjustments

Vendor Ledger

============================================================
51. PAYMENT CAPABILITY
============================================================

Reusable payment UI should support where applicable:

Advance

Partial

Full

Refund

Payment Modes:

Cash

Card

UPI

Bank Transfer

Cheque

Credit

Wallet where allowed

Payment should maintain transaction history.

Exact rules are defined in relevant module flows.

============================================================
52. FINANCE DOCUMENT CONNECTION
============================================================

Finance must connect to source documents.

Example:

Payment
        ↓
Invoice
        ↓
Job Card

Payment
        ↓
Vehicle Sale

Payment
        ↓
Purchase Invoice

Users should be able to navigate between transaction and source.

============================================================
53. TAX / GST
============================================================

Prepare UI architecture for:

Tax Rates

CGST

SGST

IGST

Taxable Amount

HSN / SAC where applicable

GST Reports

Tax Invoice

Credit / Debit Notes

Exact accounting logic will be defined later.

============================================================
54. FINANCIAL STATEMENTS
============================================================

Report areas may include:

Profit & Loss

Balance Sheet

Cash Flow

Trial Balance

Day Book

Cash Book

Bank Book

Receivables

Payables

Ledger

Tax Reports

These belong primarily in Finance / Reports, not global sidebar
as individual modules.

============================================================
55. MODULE 11 — HRM
============================================================

PURPOSE:

Manage employees and internal workforce operations.

PRIMARY BUSINESS OBJECT:

Employee

PRIMARY NAVIGATION:

HR Dashboard

Employees

Attendance

Leave

Payroll

Performance

============================================================
56. EMPLOYEE WORKSPACE
============================================================

Employee may include:

Profile

Contact

Department

Designation

Branch

Role

Joining

Shift

Attendance

Leave

Payroll

Salary

Documents

Performance

Training where applicable

Assets / Tools where applicable

Activity

============================================================
57. HRM RELATIONSHIP WITH WORKSHOP
============================================================

Technicians

Service Advisors

Supervisors

Managers

are Employees.

Do NOT create duplicate technician/person databases.

Workshop role-specific information should reference Employee.

============================================================
58. ATTENDANCE
============================================================

Attendance may include:

Daily Attendance

Shift

Check-In

Check-Out

Late

Half Day

Absent

Overtime

Attendance Adjustment

Branch

============================================================
59. LEAVE
============================================================

Leave may include:

Leave Type

Balance

Request

Approval

Reject

Cancellation

History

Calendar

============================================================
60. PAYROLL
============================================================

Payroll may include:

Salary Structure

Basic

Allowance

Deduction

Overtime

Incentive

Advance

Loan where applicable

Tax / Statutory preparation

Payslip

Payment Status

History

============================================================
61. PERFORMANCE
============================================================

Performance may include:

Employee

Period

Targets

KPIs

Technician Productivity

Efficiency

Completed Jobs

Revenue Contribution where appropriate

Ratings

Remarks

Review History

============================================================
62. MODULE 12 — REPORTS & ANALYTICS
============================================================

PURPOSE:

Provide centralized cross-module reporting.

PRIMARY NAVIGATION:

Report Center

Report Center categories:

Dashboard Analytics

CRM

Workshop

Inventory

Vehicle Sales

Counter Sale

Purchase

Insurance

Customer Programs

Finance

HRM

Administration

============================================================
63. REPORT CENTER PRINCIPLE
============================================================

Do NOT create dozens of global report menu items.

Use:

Report Center
        ↓
Category
        ↓
Report
        ↓
Filters
        ↓
Result

Reports should use:

T07 Report Template.

============================================================
64. REPORT CAPABILITIES
============================================================

Reports may support:

Date Filter

Branch Filter

Financial Year

Status

User

Customer

Vehicle

Category

Comparison

Summary

Charts where useful

Detailed Table

Export

Print

Drill-Down

============================================================
65. MODULE 13 — MASTERS
============================================================

PURPOSE:

Centralize reference data used across ERP modules.

PRIMARY NAVIGATION:

Master Center

Use:

T09 Master Management

Do NOT create every master as a global sidebar item.

============================================================
66. MASTER CATEGORIES
============================================================

Possible categories:

VEHICLE

Manufacturer

Model

Variant

Fuel Type

Transmission

Color

Vehicle Type

WORKSHOP

Service Type

Complaint

Inspection Checklist

Labour Type

Job Type

Bay

Service Package

Repair Category

PRODUCT

Category

Brand

Unit

HSN / SAC

Stock Location

FINANCE

Tax

Payment Mode

Bank

Expense Head

Income Head

FINANCE PARTNER

Finance Company

INSURANCE

Insurance Company

Policy Type

HR

Department

Designation

Shift

Leave Type

Other master data may be added only when required by approved
module flows.

============================================================
67. MASTER REUSE RULE
============================================================

A master must be defined ONCE and reused.

Example:

Payment Mode

should NOT have:

Workshop Payment Mode Master

Vehicle Sale Payment Mode Master

Counter Sale Payment Mode Master

Use one shared Payment Mode master where business rules permit.

============================================================
68. MODULE 14 — ADMINISTRATION
============================================================

PURPOSE:

Manage users, access control, auditability and administrative
operations.

PRIMARY AREAS:

Users

Roles & Permissions

Approval Workflow

Activity Logs

Audit Logs

Login History

Recycle Bin

Import / Export History

============================================================
69. USERS
============================================================

User may connect to:

Employee

Branch

Role

Permissions

Status

Login Access

User-specific settings

Do NOT duplicate Employee information unnecessarily.

============================================================
70. ROLES & PERMISSIONS
============================================================

Prepare UI for:

Role

Module Access

Page Access

View

Create

Edit

Delete

Approve

Print

Export

Special Actions

Branch Scope

Data Scope where required later

No backend permission enforcement required during current UI
phase.

============================================================
71. APPROVAL WORKFLOW
============================================================

Administration configures approval rules.

Possible contexts:

Estimate

Discount

Purchase

Expense

Refund

Leave

Other business approvals

Actual operational approval occurs inside relevant workspace.

============================================================
72. ACTIVITY LOG
============================================================

Activity Log provides user-friendly operational history.

Possible fields:

Date

Time

User

Module

Record

Action

Description

Branch

============================================================
73. AUDIT LOG
============================================================

Audit Log is deeper system change tracking.

Possible fields:

User

Module

Record

Action

Field

Old Value

New Value

Timestamp

IP / Device placeholder where applicable later

============================================================
74. RECYCLE BIN
============================================================

Centralized soft-delete management.

Functions:

Module Filter

Search

Deleted By

Deleted Date

Restore

Permanent Delete

Permanent Delete requires confirmation.

============================================================
75. IMPORT / EXPORT HISTORY
============================================================

Contextual imports happen in relevant modules.

Administration may show centralized history:

Module

File

Type

Imported By

Date

Total Rows

Success

Failed

Status

Error Report

============================================================
76. MODULE 15 — SETTINGS
============================================================

PURPOSE:

Configure company-level ERP behavior.

PRIMARY NAVIGATION:

Settings

Use:

T08 Settings Template.

Settings may use internal contextual navigation.

============================================================
77. SETTINGS CATEGORIES
============================================================

Prepare categories such as:

General

Company Profile

Branches

Financial Year

Localization

GST / Tax

Document Numbering

Workshop

Inventory

Vehicle Sales

Finance

Notifications

SMS

Email

WhatsApp

Print Templates

Custom Fields

Menu Configuration

Dashboard Configuration

Security

Backup / Data preparation where applicable

Integrations

Feature / License Preparation

Exact settings will be defined separately.

============================================================
78. COMPANY PROFILE
============================================================

Possible:

Company Name

Logo

Address

Contact

Email

Website

GST Number

PAN

Registration Details

Invoice Details

Bank Details

Document Header/Footer

============================================================
79. BRANCH SETTINGS
============================================================

Branch may include:

Branch Name

Code

Address

Contact

GST Context

Warehouse / Store association

Workshop association

Users

Document Series

Status

============================================================
80. DOCUMENT NUMBERING
============================================================

Prepare configuration for document series such as:

Job Card

Estimate

Invoice

Receipt

Gate Pass

Purchase Order

GRN

Vehicle Sale

Insurance Claim

Other approved documents

No backend auto-numbering required during current UI phase.

============================================================
81. NOTIFICATION SETTINGS
============================================================

Possible channels:

In-App

SMS

Email

WhatsApp

Possible events:

Appointment

Estimate Approval

Job Status

Vehicle Ready

Invoice

Payment

Service Reminder

Insurance Renewal

Membership Renewal

AMC Renewal

Other approved events

============================================================
82. CUSTOM FIELDS
============================================================

Custom Fields configuration should support selecting target
business object.

Possible targets:

Lead

Customer

Vehicle

Job Card

Product

Vendor

Purchase

Vehicle Sale

Insurance

Employee

Other supported records

Custom field types may include:

Text

Number

Date

Select

Multi-Select

Checkbox

Textarea

Exact implementation defined later.

============================================================
83. MENU CONFIGURATION
============================================================

Prepare UI architecture for future:

Show / Hide Menu

Reorder

Role-wise visibility

Branch-wise visibility

Future subscription/license visibility

Do NOT implement this as security.

============================================================
84. MODULE 16 — HELP CENTER
============================================================

PURPOSE:

Provide user assistance.

Possible areas:

User Manual

Getting Started

Video Tutorials

FAQ

Keyboard Shortcuts

Release Notes

Support Ticket

Remote Support

System Information

============================================================
85. CROSS-MODULE ENTITY — VEHICLE
============================================================

Vehicle is a SHARED CORE ENTITY.

Vehicle may connect to:

Customer

Lead

Workshop

Service History

Insurance

Vehicle Sale

AMC

Warranty

Reminders

Documents

Do NOT create unrelated vehicle databases for each module.

============================================================
86. VEHICLE RECORD
============================================================

Vehicle may include:

Registration Number

VIN / Chassis

Engine Number

Manufacturer

Model

Variant

Fuel

Transmission

Color

Manufacturing Year

Customer / Owner

Odometer

Insurance

Service History

Documents

Photos

Reminders

Current status where applicable

============================================================
87. CROSS-MODULE CAPABILITY — WARRANTY
============================================================

Warranty is primarily connected to:

Vehicle

Job Card

Part

Service

Warranty may include:

Warranty Type

Start

Expiry

Mileage Limit

Covered Item

Claim

Approval

Replacement / Repair

Documents

History

Warranty process details will be defined in relevant flow.

============================================================
88. CROSS-MODULE CAPABILITY — REMINDERS
============================================================

Reminder types may include:

Service Due

Insurance Renewal

PUC

Membership

AMC

Warranty

Payment

Follow-Up

Birthday

Appointment

Other business reminders

Reminders should surface through:

Dashboard

Notifications

Customer

Vehicle

Relevant Workspace

Central Reminder Center may be added if module specification
requires operational management.

============================================================
89. CROSS-MODULE CAPABILITY — COMMUNICATION
============================================================

Communication channels:

Call

SMS

WhatsApp

Email

Communication should remain attached to relevant business
record.

Examples:

Lead Communication

Customer Communication

Job Card Communication

Insurance Communication

Payment Reminder

============================================================
90. CROSS-MODULE CAPABILITY — DOCUMENTS
============================================================

Documents should remain attached to their business context.

Examples:

Customer Documents

Vehicle Documents

Job Card Documents

Insurance Documents

Purchase Documents

Employee Documents

Generated PDFs

Do NOT force users into a separate Document module for routine
record-specific work.

============================================================
91. CROSS-MODULE CAPABILITY — MEDIA
============================================================

Media may include:

Photos

Videos

Voice Notes

Possible usage:

Vehicle Check-In

Inspection

Damage

Repair

QC

Delivery

Insurance Claim

Vehicle Sale

Documents/media should maintain category and context.

============================================================
92. CROSS-MODULE CAPABILITY — APPROVAL
============================================================

Approval may be used by:

Estimate

Additional Work

Discount

Purchase

Expense

Refund

Insurance

Leave

Other approved processes

Configuration:

Administration

Operational action:

Relevant Workspace

============================================================
93. CROSS-MODULE CAPABILITY — PRINT / PDF
============================================================

Possible generated documents:

Job Card

Inspection Report

Estimate

Mechanic Sheet

Invoice

Receipt

Gate Pass

Quotation

Booking Form

Vehicle Sale Invoice

Delivery Note

Purchase Order

GRN

Insurance Documents

Membership / AMC Documents

Payslip

Reports

Use T11 Print / Document Preview.

============================================================
94. CROSS-MODULE CAPABILITY — TOOL & EQUIPMENT
============================================================

Workshop may require Tool & Equipment management.

Possible business objects:

Tool

Equipment

Tool Allocation

Return

Maintenance

Calibration

Breakdown

History

Operational allocation should connect to Workshop / Technician
where applicable.

Master/configuration placement will be finalized in Workshop
process specification.

============================================================
95. CROSS-MODULE CAPABILITY — OUTSIDE JOB
============================================================

Outside Job belongs primarily to Job Card process.

It connects:

Job Card

Vendor

Job Type

Cost

Vendor Invoice

Status

Attachments

Remarks

Finance may see payable implications.

Purchase/Vendor module may show vendor history.

Do NOT create duplicate Outside Job records independently.

============================================================
96. MULTI-BRANCH MODULE RULE
============================================================

The following modules are branch-aware where applicable:

Dashboard

CRM

Workshop

Inventory

Vehicle Sales

Counter Sale

Purchase

Insurance

Customer Programs

Finance

HRM

Reports

Administration

Masters / Settings where relevant

Operational records should belong to a specific branch.

Management reports may support All Branches.

============================================================
97. BRANCH DATA PRINCIPLE
============================================================

Do NOT make Branch a decorative dropdown only.

UI should visibly prepare for branch ownership/context.

Examples:

Job Card
→ Pune Main Branch

Stock
→ Pune Main Branch / Main Store

Employee
→ Mumbai Branch

Vehicle Sale
→ Nashik Branch

Report
→ All Branches

============================================================
98. FUTURE SAAS PREPARATION
============================================================

Current product:

COMPANY
        ↓
BRANCH
        ↓
BUSINESS OPERATIONS

Future SaaS:

TENANT / ORGANIZATION
        ↓
BRANCH
        ↓
BUSINESS OPERATIONS

Do NOT implement Tenant UI now.

Do NOT add subscription screens to normal Admin workflow unless
later specifically required.

Current architecture must simply avoid blocking future SaaS
conversion.

============================================================
99. BUSINESS OBJECT → TEMPLATE MAP
============================================================

Dashboard
→ T01

Lead List
→ T02

Lead
→ T03 Workspace

Customer List
→ T02

Customer
→ T04 / T03 depending approved CRM flow

Job Card List
→ T02

Job Card
→ T03

Vehicle Queue
→ T06

Bay Board
→ T06

Technician Board
→ T06

Service Calendar
→ T06

Product List
→ T02

Product
→ T04

Vehicle Inventory
→ T02

Vehicle Sale
→ T03

Counter Sale
→ Specialized T03 / transaction workspace

Purchase Order
→ T03

Vendor
→ T04

Insurance Claim
→ T03

Insurance Policy
→ T04

Membership
→ T03/T04 depending flow

AMC
→ T03

Finance Transaction
→ T03/T05 depending transaction

Employee
→ T03/T04

Report
→ T07

Master Center
→ T09

Settings
→ T08

Print Documents
→ T11

============================================================
100. PRIMARY BUSINESS WORKSPACES
============================================================

The following should receive special workspace attention:

Lead Workspace

Customer Workspace / Customer 360

Job Card Workspace

Vehicle Sale Workspace

Counter Sale Workspace

Purchase Workspace

Insurance Claim Workspace

Membership / AMC Workspace where process depth requires

Finance Transaction Workspace where required

Employee Workspace

These workspaces should follow one consistent ERP interaction
language.

============================================================
101. MODULE RELATIONSHIP MAP
============================================================

CRM
        ↓
Customer
        ↓
Vehicle
        ↓
Workshop
        ↓
Invoice
        ↓
Finance

CRM
        ↓
Customer
        ↓
Vehicle Sale
        ↓
Insurance / Finance
        ↓
Payment
        ↓
Delivery

Workshop
        ↓
Spares / Lubes
        ↓
Inventory

Inventory
        ↑
Purchase
        ↓
Vendor

Workshop
        ↔
Insurance Claim

Customer
        ↔
Membership / Loyalty / AMC / Wallet

Employee
        ↔
Workshop Technician / Advisor / Supervisor

All financial source transactions
        ↓
Finance & Accounts

============================================================
102. NO DUPLICATE ENTITY RULE
============================================================

Do NOT create separate versions of:

Customer

Vehicle

Employee

Vendor

Product

Payment Mode

Tax

Branch

Insurance Company

Finance Company

where one shared entity/master can serve multiple modules.

Use relationships.

============================================================
103. FEATURE PLACEMENT DECISION
============================================================

When Claude encounters a feature, determine:

Is it a PRIMARY BUSINESS OBJECT?
→ List + Workspace/Detail

Is it part of completing another record?
→ Workspace

Is it a quick contextual action?
→ Drawer / Modal

Is it monitoring?
→ Dashboard / Operational Board

Is it configuration?
→ Settings

Is it reference data?
→ Masters

Is it administration/security?
→ Administration

Is it analytical?
→ Reports

Do NOT automatically create a page.

============================================================
104. MODULE FLOW FILES
============================================================

Detailed specifications will be stored separately.

Recommended structure:

05_MODULE_FLOWS/

01_DASHBOARD.md

02_CRM.md

03_WORKSHOP.md

04_INVENTORY.md

05_VEHICLE_SALES.md

06_COUNTER_SALE.md

07_PURCHASE_VENDOR.md

08_INSURANCE.md

09_CUSTOMER_PROGRAMS.md

10_FINANCE_ACCOUNTS.md

11_HRM.md

12_REPORTS_ANALYTICS.md

13_MASTERS.md

14_ADMINISTRATION.md

15_SETTINGS.md

16_HELP_CENTER.md

Additional shared-process files may be created only when
necessary.

============================================================
105. MODULE FLOW FILE PRIORITY
============================================================

A module flow file defines:

- Exact process
- Exact screens
- Exact workspace sections
- Fields
- Statuses
- Actions
- Drawers
- Modals
- Tables
- Documents
- Calculations
- Validation
- Related records
- Demo interactions

Therefore:

When generating Workshop UI:

Read:

00_GLOBAL_CLAUDE_INSTRUCTIONS.md

01_ADMIN_THEME.md

02_NAVIGATION.md

03_PAGE_TEMPLATES.md

04_ALL_MODULES.md

05_MODULE_FLOWS/03_WORKSHOP.md

Then generate Workshop.

============================================================
106. NO FEATURE LOSS CHECK
============================================================

Before Claude considers module architecture complete, every
approved feature must map to a location.

Internal mapping example:

FEATURE:
Mechanic Assignment

MODULE:
Workshop

BUSINESS OBJECT:
Job Card

LOCATION:
Job Card Workspace

UI:
Assign Technician Drawer

FEATURE:
Technician Workload

MODULE:
Workshop

LOCATION:
Workshop Dashboard

UI:
Widget + Full Operational Board

FEATURE:
Payment

SOURCE:
Job Card

LOCATION:
Job Card Workspace / Finance

UI:
Contextual Payment Section + Finance Transaction

This mapping approach must be used throughout the project.

============================================================
107. MODULE UI GENERATION RULE
============================================================

DO NOT generate all ERP screens at once.

Recommended implementation sequence:

1. Build Global Shell

2. Build reusable components

3. Build Dashboard

4. Build one complete module

5. Validate design consistency

6. Reuse approved components for next module

Recommended first complete operational module:

WORKSHOP

because it exercises:

Workspace

Forms

Tables

Drawers

Modals

Media

Item Grid

Payments

Documents

Timeline

Operational Boards

Print Views

Once Workshop UI is stable, reuse its approved interaction
patterns throughout the ERP.

============================================================
108. MODULE COMPLETION CHECKLIST
============================================================

Before marking ANY module complete:

[ ] All approved features mapped

[ ] Main business objects identified

[ ] Navigation remains minimal

[ ] Required list pages exist

[ ] Required workspaces exist

[ ] Required dashboards exist

[ ] Operational boards exist where necessary

[ ] Contextual actions use correct UI pattern

[ ] Related modules are linked

[ ] Branch context handled

[ ] Status lifecycle handled

[ ] Documents handled

[ ] Timeline/history handled

[ ] Payments handled where relevant

[ ] Print documents handled where relevant

[ ] Realistic demo data used

[ ] No duplicate business entity created

[ ] No unnecessary page created

[ ] No backend/API code generated

============================================================
109. STRICT DO-NOT RULES
============================================================

DO NOT:

- Convert every feature into a module.
- Convert every process step into a menu.
- Remove features for simplicity.
- Duplicate shared entities.
- Duplicate payment systems.
- Duplicate inventory logic.
- Duplicate customer records.
- Duplicate employee/technician records.
- Duplicate vendor records.
- Separate Job Card processes unnecessarily.
- Separate Vehicle Sale processes unnecessarily.
- Separate Insurance Claim processes unnecessarily.
- Put configuration inside operational modules randomly.
- Put master data in multiple places.
- Build SaaS tenant management now.
- Build mobile application now.
- Generate backend/API/database code.

============================================================
110. FINAL PRODUCT ARCHITECTURE
============================================================

ENTERPRISE GARAGE ERP

        │
        ├── Dashboard
        │
        ├── CRM
        │      ├── Leads
        │      └── Customers
        │
        ├── Workshop
        │      └── Job Cards
        │
        ├── Inventory
        │      ├── Products
        │      └── Stock
        │
        ├── Vehicle Sales
        │      ├── Vehicle Inventory
        │      └── Vehicle Sales
        │
        ├── Counter Sale
        │
        ├── Purchase & Vendor
        │
        ├── Insurance
        │
        ├── Customer Programs
        │
        ├── Finance & Accounts
        │
        ├── HRM
        │
        ├── Reports & Analytics
        │
        ├── Masters
        │
        ├── Administration
        │
        ├── Settings
        │
        └── Help Center

Inside each business module:

LIST / DASHBOARD
        ↓
PRIMARY BUSINESS RECORD
        ↓
WORKSPACE
        ↓
COMPLETE RELATED PROCESS

============================================================
111. FINAL ARCHITECTURE PRINCIPLE
============================================================

FEATURE RICH
DOES NOT MEAN
MENU RICH.

The ERP should contain extensive functionality while remaining
easy to navigate.

The architecture must achieve:

MINIMUM MODULE SWITCHING

MINIMUM PAGE SWITCHING

MINIMUM DUPLICATION

MAXIMUM PROCESS CONTEXT

MAXIMUM FEATURE COVERAGE

MAXIMUM REUSABILITY

============================================================
END OF 04_ALL_MODULES.md
============================================================