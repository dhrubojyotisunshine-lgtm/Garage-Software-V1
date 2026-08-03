# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/12_ADMIN_SETTINGS_ACCESS_CONTROL.md
# ADMINISTRATION, SETTINGS & ACCESS CONTROL
# COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Administration is the CENTRAL configuration and control area
of Garage ERP.

It manages:

Organization Profile

Branches

Users

Roles

Permissions

Masters

Workshop Configuration

Job Card Configuration

Inventory Configuration

Purchase Configuration

CRM Configuration

Vehicle Sales Configuration

Insurance / Warranty Configuration

Finance Configuration

HR Configuration

Taxes

Payment Methods

Numbering / Document Series

Document Templates

Print Settings

Communication Templates

Notifications

System Preferences

Audit & Security

The objective is NOT to create dozens of disconnected
administration modules.

Configuration should be organized logically inside ONE
Administration workspace.

============================================================
2. PRIMARY NAVIGATION
============================================================

ADMINISTRATION

    Organization & Branches

    Users & Access

    Configuration

    Templates & Documents

    Audit & Security

Do NOT create permanent sidebar menus for every setting.

Example:

Taxes

Payment Methods

Job Card Status

Service Types

Leave Types

Expense Categories

Number Series

Notification Rules

should exist inside Configuration.

============================================================
3. CORE ADMINISTRATION PRINCIPLE
============================================================

ORGANIZATION
        ↓
BRANCHES
        ↓
USERS
        ↓
ROLES
        ↓
PERMISSIONS
        ↓
BUSINESS CONFIGURATION
        ↓
DOCUMENT / COMMUNICATION SETTINGS
        ↓
SECURITY
        ↓
AUDIT

Administration defines HOW the ERP operates.

Operational modules use these configurations.

============================================================
4. ADMINISTRATION DASHBOARD / LANDING
============================================================

Use configuration landing page instead of unnecessary KPI
dashboard.

Recommended cards:

Organization

Branches

Users

Roles & Permissions

Workshop

Inventory

Purchase

CRM

Vehicle Sales

Insurance & Warranty

Finance

HR

Taxes

Payment Methods

Numbering

Documents

Notifications

Security

Audit Logs

============================================================
5. CONFIGURATION SEARCH
============================================================

CRITICAL for large ERP.

Provide:

Search Settings...

Example search:

"tax"

Results:

Finance → Tax Configuration

Workshop → Service Tax

Document → Tax Display

Example:

"job card"

Results:

Workshop → Job Card Numbering

Workshop → Job Card Status

Workshop → Job Card Print

============================================================
6. ORGANIZATION PROFILE
============================================================

Use:

T05 Settings Form

Sections:

Business Information

Contact

Address

Registration

Branding

Regional Settings

Documents

============================================================
7. BUSINESS INFORMATION
============================================================

Fields:

Organization Name *

Legal Name

Business Type

Registration Number

Tax Registration Number

Website

Email

Phone

Alternate Phone

============================================================
8. ORGANIZATION ADDRESS
============================================================

Fields:

Address Line 1

Address Line 2

City

State / Province

Postal Code

Country

============================================================
9. ORGANIZATION BRANDING
============================================================

Support:

Logo

Print Logo

Favicon

Business Name

Header Text

Footer Text

Authorized Signature

Stamp / Seal

============================================================
10. REGIONAL SETTINGS
============================================================

Possible:

Country

Timezone

Date Format

Time Format

Currency

Number Format

Language

Financial Year Start

Frontend configuration only.

============================================================
11. ORGANIZATION DOCUMENTS
============================================================

Possible:

Business Registration

Tax Certificate

Trade License

Other Organization Documents

============================================================
12. BRANCH MANAGEMENT
============================================================

Branches are CRITICAL because ERP is multi-branch.

Use:

T02 List Page

Primary Action:

+ Add Branch

============================================================
13. BRANCH LIST
============================================================

Recommended columns:

Branch Code

Branch Name

City

Phone

Manager

Workshop

Inventory

Status

Actions

============================================================
14. ADD BRANCH
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Address

Contact

Manager

Operational Configuration

Financial Configuration

Document Configuration

Status

============================================================
15. BRANCH BASIC INFORMATION
============================================================

Fields:

Branch Code *

Branch Name *

Organization

Branch Type

Opening Date

Status

============================================================
16. BRANCH TYPES
============================================================

Possible:

Main Branch

Workshop

Service Center

Sales Branch

Warehouse

Body Shop

Combined Branch

Other

============================================================
17. BRANCH OPERATIONAL CAPABILITIES
============================================================

Frontend should allow configuration such as:

Workshop Enabled

Vehicle Sales Enabled

Inventory Enabled

Purchase Enabled

CRM Enabled

Insurance Enabled

Finance Enabled

============================================================
18. BRANCH MANAGER
============================================================

Select from Employee Master.

Do NOT create separate branch manager record.

============================================================
19. BRANCH WORKSPACE
============================================================

Recommended tabs:

Overview

Operations

Users

Numbering

Finance

Documents

Settings

Timeline

============================================================
20. BRANCH-SPECIFIC CONFIGURATION
============================================================

Configuration may support:

Organization Default

OR

Branch Override

Example:

Default Job Card Prefix:
JC

Mumbai Override:
MUM-JC

Pune Override:
PUN-JC

============================================================
21. CONFIGURATION INHERITANCE
============================================================

Frontend should clearly indicate:

Using Organization Default

OR

Branch Override Active

Actions:

Use Default

Override

Reset to Default

============================================================
22. BRANCH STATUS
============================================================

Possible:

Active

Inactive

Temporarily Closed

Do NOT delete branches with transaction history.

============================================================
23. USERS & ACCESS
============================================================

Users represent ERP login identities.

Employee and User are related but NOT identical.

Employee:
Business staff identity.

User:
System login identity.

============================================================
24. USER PROCESS
============================================================

Employee / Authorized Person
        ↓
Create User
        ↓
Login Identity
        ↓
Assign Role
        ↓
Assign Branch Access
        ↓
Optional Permission Override
        ↓
Activate
        ↓
User Access
        ↓
Activity / Security History

============================================================
25. USER LIST
============================================================

Use:

T02 List Page

Primary Action:

+ Add User

Quick filters:

All

Active

Inactive

Locked

Employees

Admins

Multi-Branch

============================================================
26. USER TABLE
============================================================

Recommended columns:

User

Employee

Email / Username

Role

Primary Branch

Additional Branches

Last Login

Status

Actions

============================================================
27. ADD USER
============================================================

Sections:

Identity

Employee Link

Login

Role

Branch Access

Permission Override

Security

============================================================
28. USER IDENTITY
============================================================

Possible:

Link Employee

Display Name

Email

Mobile

Username

============================================================
29. EMPLOYEE LINK
============================================================

When user is an employee:

Search Employee
        ↓
Link Existing Employee
        ↓
Use Existing Identity

Do NOT duplicate employee information.

============================================================
30. NON-EMPLOYEE USER
============================================================

System may support authorized external/admin user where
business requires it.

Clearly mark:

User Type:
Non-Employee

============================================================
31. USER LOGIN STATUS
============================================================

Possible:

Active

Inactive

Locked

Suspended

Password Reset Required

============================================================
32. USER BRANCH ACCESS
============================================================

Support:

Primary Branch

Additional Branches

All Branches where authorized

============================================================
33. USER ACCESS SUMMARY
============================================================

Example:

Role:
Service Advisor

Branches:
Pune Main

Modules:
Workshop
Customers
CRM

Restrictions:
No Cost View
No Financial Reports

============================================================
34. USER QUICK ACTIONS
============================================================

Possible:

Edit User

Change Role

Manage Branch Access

Reset Password UI

Lock User

Unlock User

Deactivate

View Activity

============================================================
35. USER DEACTIVATION
============================================================

Do NOT delete historical users.

Deactivate login while retaining:

Created Records

Approvals

Payments

Job Cards

Audit History

============================================================
36. ROLES
============================================================

Roles provide reusable access profiles.

Examples:

Organization Admin

Branch Manager

Workshop Manager

Service Advisor

Technician

Parts Manager

Purchase Manager

Sales Manager

Sales Executive

CRM Executive

Insurance Executive

Finance Manager

Accountant

Cashier

HR Manager

Read Only

============================================================
37. ROLE LIST
============================================================

Use:

T02 List Page

Columns:

Role

Description

Users

Branch Scope

Permission Count

Status

Actions

============================================================
38. CREATE ROLE
============================================================

Process:

Role Information
        ↓
Module Access
        ↓
Action Permissions
        ↓
Sensitive Data Permissions
        ↓
Branch Scope
        ↓
Review
        ↓
Save

============================================================
39. ROLE INFORMATION
============================================================

Fields:

Role Name *

Description

Role Type

Status

============================================================
40. ROLE TYPES
============================================================

Possible:

System Role

Custom Role

System roles may be protected from destructive changes.

============================================================
41. PERMISSION STRUCTURE
============================================================

Permission design should use:

MODULE
    ↓
FEATURE
    ↓
ACTION

Example:

Workshop
    Job Card
        View
        Create
        Edit
        Cancel
        Print
        Approve Estimate
        Generate Invoice
        Receive Payment

============================================================
42. COMMON PERMISSION ACTIONS
============================================================

Possible:

View

Create

Edit

Delete where permitted

Cancel

Approve

Reject

Assign

Print

Export

Import

View Cost

View Price

View Profit

Manage

============================================================
43. MODULE PERMISSION GROUPS
============================================================

Prepare groups for:

Dashboard

Workshop

Customers & Vehicles

CRM

Inventory

Purchase

Vehicle Sales

Insurance & Warranty

Finance

Employee & HR

Reports & Analytics

Administration

============================================================
44. WORKSHOP PERMISSIONS
============================================================

Possible:

View Job Card

Create Job Card

Edit Job Card

Cancel Job Card

Check-In

Inspection

Estimate

Approve / Override Estimate

Assign Bay

Assign Technician

Add Labour

Add Parts

Add Lubricants

Add Outsource

QC

Generate Invoice

Gate Pass

Delivery

Print Documents

============================================================
45. INVENTORY PERMISSIONS
============================================================

Possible:

View Stock

View Cost

Create Item

Edit Item

Stock Adjustment

Approve Adjustment

Stock Transfer

Issue Stock

Return Stock

View Ledger

Export

============================================================
46. PURCHASE PERMISSIONS
============================================================

Possible:

View Purchase

Create Request

Approve Request

Create PO

Approve PO

Receive Goods

Create Purchase

View Purchase Cost

Purchase Return

Vendor Management

============================================================
47. CRM PERMISSIONS
============================================================

Possible:

View Leads

Create Lead

Edit Lead

Assign Lead

Follow-Up

Convert Lead

Mark Lost

View All Executives

Campaign Access

Complaint Access

============================================================
48. VEHICLE SALES PERMISSIONS
============================================================

Possible:

View Vehicle Stock

View Purchase Cost

View Margin

Create Vehicle

Edit Vehicle

Create Booking

Approve Discount

Cancel Booking

Create Sale

Delivery

Exchange Vehicle

============================================================
49. INSURANCE PERMISSIONS
============================================================

Possible:

View Policy

Create Policy

Renew Policy

Create Claim

Edit Claim

Survey

Approval Entry

Settlement

Close Claim

Warranty Claim

============================================================
50. FINANCE PERMISSIONS
============================================================

CRITICAL.

Possible:

View Receivables

Receive Payment

View Payables

Make Vendor Payment

View Cash

View Bank

Add Expense

Approve Expense

Create Credit Note

Create Debit Note

Issue Refund

Reverse Transaction

Daily Closing

Reopen Closing

View Profit

View All Branch Finance

============================================================
51. HR PERMISSIONS
============================================================

Possible:

View Employee

Create Employee

Edit Employee

View Salary

View Bank Details

Attendance

Attendance Correction

Leave Approval

Employee Transfer

Employee Exit

Performance

============================================================
52. REPORT PERMISSIONS
============================================================

Possible:

View Workshop Reports

View Inventory Reports

View Purchase Reports

View Sales Reports

View Finance Reports

View HR Reports

View Cost Reports

View Profit Reports

View All Branch Reports

Export Reports

============================================================
53. ADMINISTRATION PERMISSIONS
============================================================

Possible:

Organization Settings

Branch Management

User Management

Role Management

Configuration

Templates

Security

Audit Logs

============================================================
54. SENSITIVE DATA PERMISSIONS
============================================================

Separate permissions should exist for sensitive values.

Examples:

View Purchase Cost

View Vehicle Cost

View Margin

View Profit

View Salary

View Employee Bank Details

View Bank Balance

View Vendor Payable

View All Branch Financials

============================================================
55. ROLE PERMISSION MATRIX
============================================================

Use matrix UI.

Example:

                         View   Create   Edit   Cancel   Approve
Job Card                  ✓       ✓       ✓       -        -
Estimate                  ✓       ✓       ✓       -        ✓
Invoice                   ✓       -       -       -        -
Payment                   ✓       ✓       -       -        -
Refund                    -       -       -       -        -

Use:

Select All

Clear All

Expand Module

Collapse Module

============================================================
56. PERMISSION DEPENDENCY WARNING
============================================================

Example:

User has:
Approve Estimate

but does not have:
View Estimate

Show warning:

"Approve Estimate requires View Estimate."

Frontend should demonstrate dependency awareness.

============================================================
57. USER PERMISSION OVERRIDE
============================================================

Role provides default permissions.

User-specific override may:

Grant Additional Permission

Restrict Permission

Avoid using overrides unless required.

============================================================
58. PERMISSION SOURCE
============================================================

For each permission show:

Inherited from Role

Granted to User

Restricted for User

============================================================
59. EFFECTIVE ACCESS PREVIEW
============================================================

CRITICAL.

Provide:

Preview Access

Example:

User:
Amit Sharma

Role:
Branch Manager

Branch:
Pune

Can Access:
Workshop
Inventory
CRM
Reports

Cannot Access:
Salary
Organization Finance
Role Management

============================================================
60. BRANCH ACCESS + PERMISSION
============================================================

Permission and branch scope must work together.

Example:

Permission:
View Job Cards

Branch Access:
Pune

Result:

Can view Pune Job Cards.

NOT Mumbai Job Cards.

============================================================
61. CONFIGURATION WORKSPACE
============================================================

Use ONE central configuration page.

Recommended categories:

General

Workshop

Customer & CRM

Inventory

Purchase

Vehicle Sales

Insurance & Warranty

Finance

HR

Documents

Notifications

============================================================
62. GENERAL CONFIGURATION
============================================================

Possible:

Regional Settings

Date / Time

Currency

Number Format

Timezone

Financial Year

Default Branch Behaviour

============================================================
63. WORKSHOP CONFIGURATION
============================================================

Possible:

Service Types

Job Card Types

Job Card Statuses

Priority

Complaint Types

Inspection Templates

Check-In Checklist

Accessories Checklist

Service Packages

Labour Categories

Outside Job Types

QC Templates

Hold Reasons

Delivery Checklist

Feedback Configuration

============================================================
64. SERVICE TYPES
============================================================

Examples:

General Service

Periodic Service

Repair

Quick Service

Body Repair

Accidental

Insurance

Warranty

Inspection

Other

============================================================
65. JOB CARD TYPES
============================================================

Possible:

Normal

Insurance

Warranty

Internal

Repeat Repair

Comeback

Quick Service

============================================================
66. PRIORITY CONFIGURATION
============================================================

Possible:

Normal

High

Urgent

Emergency

============================================================
67. CHECK-IN CHECKLIST CONFIGURATION
============================================================

Configurable items:

Spare Wheel

Jack

Tool Kit

Music System

Documents

Floor Mats

Fuel Level

Other Accessories

============================================================
68. INSPECTION TEMPLATE
============================================================

Possible sections:

Engine

Brake

Suspension

Tyres

Battery

Electrical

AC

Body

Fluids

Safety

Custom Sections

============================================================
69. DENT / DAMAGE CONFIGURATION
============================================================

Prepare:

Dent

Scratch

Broken

Crack

Paint Damage

Other

Actions:

Mark

Erase

Erase All

============================================================
70. JOB CARD MEDIA CONFIGURATION
============================================================

Prepare support for:

Voice

Photos

Videos

Advice

Advice Note

Dents / Damage Marking

============================================================
71. WORK ITEM CONFIGURATION
============================================================

Job Card work items must support:

Labour

Spares

Lubes

Outsource Item

Total Items

Each item should support:

Quantity

Rate / Price

Discount where applicable

Tax where applicable

Total

============================================================
72. SERVICE PACKAGE CONFIGURATION
============================================================

Package may contain:

Labour

Parts

Lubricants

Inspection

Discount

Package Price

Validity

============================================================
73. LABOUR MASTER CONFIGURATION
============================================================

Fields:

Labour Code

Labour Name

Category

Standard Hours

Standard Rate

Tax

Status

============================================================
74. OUTSIDE JOB TYPE CONFIGURATION
============================================================

Possible:

Dent

Painting

Machining

Glass

Electrical Specialist

Towing

Other

============================================================
75. QC TEMPLATE CONFIGURATION
============================================================

Support reusable QC templates.

Possible:

General Service QC

Body Repair QC

Insurance QC

Quick Service QC

============================================================
76. INVENTORY CONFIGURATION
============================================================

Possible:

Categories

Subcategories

Brands

Units

Warehouses / Stores

Stock Locations

Reorder Rules

Adjustment Reasons

Transfer Reasons

Issue Reasons

Return Reasons

============================================================
77. UNIT CONFIGURATION
============================================================

Examples:

Piece

Set

Pair

Liter

Milliliter

Kilogram

Gram

Meter

Box

============================================================
78. STOCK LOCATION CONFIGURATION
============================================================

Possible:

Main Store

Workshop Store

Body Shop Store

Lubricant Store

Damaged Stock

Warranty Return

Branch Warehouse

============================================================
79. STOCK ADJUSTMENT REASONS
============================================================

Possible:

Physical Count

Damage

Loss

Correction

Expired

Internal Consumption

Other

============================================================
80. PURCHASE CONFIGURATION
============================================================

Possible:

Purchase Request Status

PO Status

Approval Rules UI

Purchase Terms

Payment Terms

GRN Settings

Return Reasons

Vendor Categories

============================================================
81. VENDOR CATEGORY
============================================================

Possible:

Parts Supplier

Lubricant Supplier

Vehicle Supplier

Outsource Vendor

Service Provider

General Vendor

============================================================
82. CRM CONFIGURATION
============================================================

Possible:

Lead Sources

Lead Stages

Lead Priorities

Lost Reasons

Follow-Up Types

Appointment Types

Complaint Types

Complaint Priority

Campaign Types

============================================================
83. LEAD SOURCES
============================================================

Possible:

Walk-In

Phone

Website

WhatsApp

Referral

Social Media

Campaign

Existing Customer

Other

============================================================
84. LOST LEAD REASONS
============================================================

Possible:

Price

No Response

Competitor

Not Interested

Postponed

Wrong Lead

Finance Issue

Other

============================================================
85. VEHICLE SALES CONFIGURATION
============================================================

Possible:

Vehicle Categories

Vehicle Conditions

Fuel Types

Transmission

Ownership Types

Booking Status

Cancellation Reasons

Sale Status

Delivery Checklist

Exchange Evaluation

============================================================
86. VEHICLE CONDITION
============================================================

Possible:

New

Used

Certified Used

Demo

Other

============================================================
87. INSURANCE CONFIGURATION
============================================================

Possible:

Insurance Companies

Policy Types

Claim Types

Claim Status

Coverage Types

Survey Status

Settlement Status

============================================================
88. WARRANTY / AMC CONFIGURATION
============================================================

Possible:

Warranty Types

Warranty Providers

Coverage Types

Exclusions

AMC Types

Service Limits

Warranty Claim Status

============================================================
89. FINANCE CONFIGURATION
============================================================

Possible:

Payment Methods

Expense Categories

Credit Terms

Tax

Financial Accounts

Cash Counters

Refund Reasons

Credit Note Reasons

Debit Note Reasons

Closing Settings

============================================================
90. PAYMENT METHODS
============================================================

Possible:

Cash

Card

UPI

Bank Transfer

Cheque

Wallet

Credit

Other

Each may contain:

Name

Code

Financial Account

Active

============================================================
91. FINANCIAL ACCOUNTS
============================================================

Possible:

Cash Account

Petty Cash

Bank

Card Settlement

UPI Settlement

Other

============================================================
92. EXPENSE CATEGORIES
============================================================

Examples:

Rent

Electricity

Internet

Fuel

Travel

Office

Workshop

Maintenance

Marketing

Professional

Miscellaneous

============================================================
93. CREDIT TERMS
============================================================

Possible configuration:

Credit Days

Credit Limit Default

Overdue Warning

Approval Required

============================================================
94. TAX CONFIGURATION
============================================================

Frontend should prepare:

Tax Name

Tax Code

Rate

Inclusive / Exclusive

Effective Date

Applicable Modules

Status

Exact tax compliance logic belongs to backend phase.

============================================================
95. TAX GROUP
============================================================

Where required:

Tax Group

Components

Combined Rate

Applicable Category

============================================================
96. HR CONFIGURATION
============================================================

Possible:

Departments

Designations

Employment Types

Skills

Skill Levels

Shifts

Leave Types

Holidays

Attendance Status

Exit Reasons

Document Types

============================================================
97. DEPARTMENT CONFIGURATION
============================================================

Manage:

Department Name

Code

Manager where applicable

Status

============================================================
98. DESIGNATION CONFIGURATION
============================================================

Manage:

Designation

Department

Description

Status

Do NOT embed permissions directly into designation.

============================================================
99. SHIFT CONFIGURATION
============================================================

Fields:

Shift Name

Start

End

Break

Grace Time

Weekly Off

Status

============================================================
100. LEAVE TYPE CONFIGURATION
============================================================

Fields:

Leave Type

Code

Paid / Unpaid

Half Day Allowed

Attachment Required

Status

Actual accrual rules later.

============================================================
101. HOLIDAY CONFIGURATION
============================================================

Fields:

Holiday

Date

Branch / Organization

Optional / Mandatory

Status

============================================================
102. NUMBERING & DOCUMENT SERIES
============================================================

CRITICAL.

Central configuration for document numbering.

Possible documents:

Customer

Vehicle

Job Card

Estimate

Invoice

Receipt

Gate Pass

Purchase Request

PO

GRN

Purchase

Purchase Return

Vehicle Booking

Vehicle Sale

Insurance Policy

Insurance Claim

Warranty Claim

Payment

Expense

Credit Note

Debit Note

Refund

Employee

============================================================
103. NUMBER SERIES CONFIGURATION
============================================================

Fields:

Document Type

Prefix

Starting Number

Number Length

Suffix

Financial Year

Branch Code

Reset Rule

Preview

============================================================
104. NUMBER SERIES PREVIEW
============================================================

Example:

Document:
Job Card

Prefix:
JC

Branch:
PUN

Year:
2026

Preview:

PUN-JC-2026-000128

============================================================
105. RESET RULE
============================================================

Possible:

Never

Yearly

Financial Year

Monthly where business requires

No actual numbering engine now.

============================================================
106. BRANCH NUMBER SERIES
============================================================

Allow:

Organization Default

Branch Override

Example:

Pune:
PUN-JC-0001

Mumbai:
MUM-JC-0001

============================================================
107. DOCUMENT TEMPLATE MANAGEMENT
============================================================

Use:

Templates & Documents Workspace

Documents may include:

Job Card

Inspection Report

Estimate

Invoice

Receipt

Gate Pass

Purchase Order

GRN

Vehicle Booking

Vehicle Sale

Insurance Claim

Warranty Claim

Customer Statement

Daily Closing

============================================================
108. TEMPLATE LIST
============================================================

Recommended columns:

Template

Document Type

Branch

Default

Last Updated

Status

Actions

============================================================
109. TEMPLATE CONFIGURATION
============================================================

Frontend should support:

Header

Logo

Business Information

Customer Information

Vehicle Information

Document Information

Item Table

Totals

Terms

Signature

Footer

============================================================
110. TEMPLATE PREVIEW
============================================================

CRITICAL.

Configuration
        ↓
Live Preview
        ↓
Desktop / Print Preview
        ↓
Save

============================================================
111. PRINT SETTINGS
============================================================

Possible:

Paper Size

Orientation

Margins

Header

Footer

Copies

Show Logo

Show Tax

Show Signature

Show Terms

============================================================
112. DOCUMENT TERMS
============================================================

Configurable terms for:

Estimate

Job Card

Invoice

Purchase Order

Vehicle Booking

Vehicle Sale

Insurance

Warranty

============================================================
113. COMMUNICATION TEMPLATES
============================================================

Prepare templates for:

SMS

WhatsApp

Email

Internal Notification

No communication API integration now.

============================================================
114. COMMUNICATION EVENTS
============================================================

Possible:

Appointment Confirmation

Vehicle Check-In

Estimate Ready

Estimate Approval Request

Repair Started

Additional Approval

Vehicle Ready

Invoice Generated

Payment Received

Service Reminder

Insurance Expiry

Warranty Expiry

Lead Follow-Up

Booking Confirmation

============================================================
115. TEMPLATE VARIABLES
============================================================

Example:

{{customer_name}}

{{vehicle_number}}

{{job_card_number}}

{{estimate_amount}}

{{invoice_number}}

{{amount}}

{{branch_name}}

{{advisor_name}}

Frontend preview should demonstrate variable placeholders.

============================================================
116. NOTIFICATION CONFIGURATION
============================================================

Configure events and recipients.

Possible channels:

In-App

Email

SMS

WhatsApp

============================================================
117. NOTIFICATION RECIPIENTS
============================================================

Possible:

Customer

Assigned Employee

Service Advisor

Manager

Branch Admin

Role

Specific User

============================================================
118. NOTIFICATION RULE EXAMPLE
============================================================

Event:
Estimate Approval Pending

After:
2 Hours

Notify:
Service Advisor

After:
6 Hours

Notify:
Workshop Manager

Frontend rule builder only.

============================================================
119. SERVICE REMINDER SETTINGS
============================================================

Possible:

Days Before

Kilometers Before

Reminder Frequency

Channel

Template

============================================================
120. SYSTEM PREFERENCES
============================================================

Possible:

Default Landing Page

Default Branch

Items Per Page

Auto Refresh UI Preference

Default Date Range

Table Density

Print Behaviour

Frontend preferences only.

============================================================
121. WORKSHOP DISPLAY SETTINGS
============================================================

Possible:

Show Vehicle Image

Show Customer Credit

Show Technician Workload

Show Bay Availability

Show Estimated Delivery

Show Job Timer

Show Cost based on permission

============================================================
122. DASHBOARD CONFIGURATION PREPARATION
============================================================

Future-ready:

Visible Widgets

Widget Order

Default Date Range

Branch Context

Do NOT build complex dashboard builder now.

============================================================
123. DATA STATUS CONFIGURATION
============================================================

Where statuses are configurable, distinguish:

System Status

Custom Label

System behaviour should not depend only on visible label.

Frontend should visually prepare this concept.

============================================================
124. MASTER DATA STATUS
============================================================

Master records should generally support:

Active

Inactive

Do NOT delete master values already used in transactions.

============================================================
125. MASTER DATA DEPENDENCY WARNING
============================================================

Example:

Service Type:
General Service

Used in:
1,248 Job Cards

Action:
Deactivate

Warning:

"This value is already used in transactions. Existing records
will remain unchanged."

============================================================
126. SECURITY SETTINGS
============================================================

Prepare UI for:

Password Policy

Login Security

Session

Account Lock

Two-Factor Authentication

Trusted Devices

IP Restrictions where future required

============================================================
127. PASSWORD POLICY
============================================================

Possible:

Minimum Length

Uppercase Required

Lowercase Required

Number Required

Special Character Required

Password Expiry

Prevent Password Reuse

Frontend only.

============================================================
128. ACCOUNT LOCK SETTINGS
============================================================

Possible:

Failed Attempts

Lock Duration

Admin Unlock Required

============================================================
129. SESSION SETTINGS
============================================================

Possible:

Session Timeout

Concurrent Login Policy

Remember Me

Force Logout

============================================================
130. TWO-FACTOR AUTHENTICATION
============================================================

Frontend may prepare:

Disabled

Optional

Required for Admin

Required for Finance

Required for All Users

No OTP backend implementation now.

============================================================
131. LOGIN HISTORY
============================================================

Show:

User

Date / Time

IP

Device

Browser

Branch

Status

============================================================
132. ACTIVE SESSION UI
============================================================

Show:

User

Device

Location Approximation where available later

Login Time

Last Activity

Actions:

Revoke Session

Frontend demo only.

============================================================
133. AUDIT LOG
============================================================

Audit is immutable system trace.

Use:

T02 Advanced List

Search:

User

Module

Record

Action

============================================================
134. AUDIT LOG FILTERS
============================================================

Date

Branch

User

Module

Action

Record Type

Severity where applicable

============================================================
135. AUDIT LOG TABLE
============================================================

Recommended:

Date / Time

User

Branch

Module

Action

Record

Description

IP / Device where available

============================================================
136. AUDIT DETAIL
============================================================

Show:

User

Date / Time

Module

Entity

Record

Action

Previous Value

New Value

Reason

Source

============================================================
137. IMPORTANT AUDITED ACTIONS
============================================================

Examples:

Login

Failed Login

User Created

Role Changed

Permission Changed

Job Card Cancelled

Estimate Approval Changed

Invoice Cancelled

Payment Reversed

Refund Issued

Stock Adjusted

Purchase Cancelled

Vehicle Sale Cancelled

Expense Approved

Daily Closing Reopened

Employee Deactivated

============================================================
138. AUDIT LOG RULE
============================================================

Users should NOT be able to casually edit or delete audit
history.

Frontend must not show normal Edit/Delete actions.

============================================================
139. ACTIVITY LOG VS AUDIT LOG
============================================================

Activity Log:

Human-readable business activity.

Audit Log:

Detailed system change trace.

Do NOT merge them into one confusing concept.

============================================================
140. CONFIGURATION CHANGE HISTORY
============================================================

Important settings should show:

Changed By

Changed At

Previous Value

New Value

Reason where required

============================================================
141. DANGEROUS SETTINGS
============================================================

Changes that can materially affect operations should show
warning.

Examples:

Tax Rate

Number Series

Financial Year

Branch Deactivation

Role Permissions

Payment Account

============================================================
142. CONFIRMATION PATTERN
============================================================

For sensitive actions use:

Action

Impact Summary

Reason

Confirmation

Example:

DEACTIVATE BRANCH

Branch:
Mumbai

Open Job Cards:
18

Active Users:
12

Pending Deliveries:
4

Review before confirmation.

============================================================
143. ADMIN PERMISSION SAFETY
============================================================

Frontend should prevent accidental lockout conceptually.

Example:

Removing your own:
Role Management

User Management

Administration Access

Show warning.

============================================================
144. SUPER ADMIN PREPARATION
============================================================

Current phase is multi-branch Admin UI.

Future SaaS conversion will introduce platform-level:

Tenant

Subscription

License

Plan

Usage Limits

Global SaaS Administration

Do NOT mix these into current Garage Admin.

============================================================
145. FUTURE SAAS BOUNDARY
============================================================

Current:

ORGANIZATION ADMIN
        ↓
BRANCHES
        ↓
USERS
        ↓
OPERATIONS

Future SaaS:

PLATFORM SUPER ADMIN
        ↓
TENANT / ORGANIZATION
        ↓
SUBSCRIPTION
        ↓
LICENSE
        ↓
ORGANIZATION ADMIN
        ↓
BRANCHES
        ↓
USERS

Keep architecture ready, but do NOT build SaaS screens now.

============================================================
146. GLOBAL ADMIN SEARCH
============================================================

Global ERP search may find:

User

Branch

Role

Configuration

Template

Example:

SETTING

Job Card Numbering

Administration
→ Configuration
→ Numbering

============================================================
147. ADMIN QUICK ACTIONS
============================================================

Context dependent:

Add Branch

Add User

Create Role

Clone Role

Configure Module

Create Template

Add Tax

Add Payment Method

Add Number Series

View Audit

============================================================
148. ROLE CLONE
============================================================

Useful for creating similar roles.

Existing Role
        ↓
Clone
        ↓
New Role Name
        ↓
Review Permissions
        ↓
Save

Do NOT accidentally copy users assigned to original role.

============================================================
149. IMPORT / EXPORT CONFIGURATION PREPARATION
============================================================

Frontend may prepare master data import/export for:

Services

Labour

Parts Categories

Brands

Vendors

Customers where operational module permits

No actual import engine now.

============================================================
150. CONFIGURATION EMPTY STATE
============================================================

Example:

No Service Types Configured

[ + Add Service Type ]

Provide clear action.

============================================================
151. CONFIGURATION LIST PATTERN
============================================================

For lightweight masters use reusable table/drawer pattern.

Example:

Service Types

Name

Code

Status

Actions

[ + Add ]

Do NOT create separate HTML page for every small master.

============================================================
152. CONFIGURATION DRAWER
============================================================

Use C01 Drawer for small master CRUD.

Examples:

Service Type

Priority

Lead Source

Expense Category

Leave Type

Payment Method

============================================================
153. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

Administration Landing

Configuration Search

Organization Profile

Branding

Regional Settings

Branch List

Add Branch

Branch Workspace

Branch Capabilities

Organization Default

Branch Override

User List

Add User

Employee Link

Role Assignment

Branch Access

User Status

Lock / Unlock

Deactivate User

Role List

Create Role

Role Permission Matrix

Module Permissions

Action Permissions

Sensitive Permissions

Permission Dependency Warning

User Override

Permission Source

Effective Access Preview

General Configuration

Workshop Configuration

Service Types

Job Card Types

Priority

Check-In Checklist

Inspection Template

Dent / Scratch / Broken Configuration

Voice / Photo / Advice Configuration

Labour / Spares / Lubes / Outsource Item Configuration

Service Packages

Labour Master

QC Template

Inventory Configuration

Units

Stock Locations

Adjustment Reasons

Purchase Configuration

Vendor Categories

CRM Configuration

Lead Sources

Lost Reasons

Vehicle Sales Configuration

Insurance Configuration

Warranty Configuration

Finance Configuration

Payment Methods

Financial Accounts

Expense Categories

Credit Terms

Tax Configuration

HR Configuration

Departments

Designations

Skills

Shifts

Leave Types

Holidays

Number Series

Branch Number Series

Number Preview

Document Templates

Template Preview

Print Settings

Terms

Communication Templates

Template Variables

Notification Rules

Service Reminder Settings

System Preferences

Security Settings

Password Policy

Session Settings

2FA UI

Login History

Active Sessions

Audit Logs

Audit Detail

Configuration History

Dangerous Action Warning

Role Clone

Configuration Drawer

No API/backend required.

============================================================
154. RECOMMENDED FRONTEND FILES
============================================================

administration.html

organization-settings.html

branches.html

branch-workspace.html

users.html

user-form.html

roles.html

role-permissions.html

configuration.html

document-templates.html

document-template-editor.html

security.html

audit-logs.html

audit-detail.html

Do NOT create separate HTML files for every small configuration
master.

Use reusable configuration components.

============================================================
155. REUSABLE ADMIN COMPONENTS
============================================================

Settings Search

Settings Category Card

Configuration Table

Configuration Drawer

Organization Form

Branch Selector

Branch Override Indicator

User Card

Employee Link Search

Role Selector

Branch Access Selector

Permission Matrix

Permission Group

Permission Dependency Alert

Effective Access Preview

Sensitive Permission Badge

Master Data Drawer

Status Toggle

Dependency Warning

Number Series Builder

Number Preview

Template Editor

Document Preview

Communication Template Editor

Variable Picker

Notification Rule Builder

Security Setting Card

Login History Table

Audit Table

Audit Detail Drawer

Dangerous Action Modal

============================================================
156. FEATURE → LOCATION MAP
============================================================

Organization
→ Organization & Branches

Branches
→ Organization & Branches

Users
→ Users & Access

Roles
→ Users & Access

Permissions
→ Users & Access

Workshop Masters
→ Configuration / Workshop

Inventory Masters
→ Configuration / Inventory

Purchase Masters
→ Configuration / Purchase

CRM Masters
→ Configuration / CRM

Vehicle Sales Masters
→ Configuration / Vehicle Sales

Insurance Masters
→ Configuration / Insurance

Finance Masters
→ Configuration / Finance

HR Masters
→ Configuration / HR

Tax
→ Configuration / Finance

Payment Methods
→ Configuration / Finance

Numbering
→ Configuration / General

Document Templates
→ Templates & Documents

Communication Templates
→ Templates & Documents

Security
→ Audit & Security

Audit
→ Audit & Security

============================================================
157. NO DUPLICATION RULE
============================================================

DO NOT create separate:

Workshop User

Finance User

Inventory User

CRM User

Technician User

Branch Manager User

They all use central Users + Employee where applicable.

DO NOT duplicate:

Branches

Employees

Roles

Taxes

Payment Methods

Service Types

Document Templates

Number Series

============================================================
158. ADMIN ACCEPTANCE CHECKLIST
============================================================

Before Administration is considered complete:

[ ] Administration Landing

[ ] Configuration Search

[ ] Organization Profile

[ ] Organization Branding

[ ] Regional Settings

[ ] Organization Documents

[ ] Branch List

[ ] Add Branch

[ ] Branch Types

[ ] Branch Capabilities

[ ] Branch Manager

[ ] Branch Workspace

[ ] Organization Default

[ ] Branch Override

[ ] User List

[ ] Add User

[ ] Employee Link

[ ] Non-Employee User

[ ] User Status

[ ] Branch Access

[ ] Multi-Branch Access

[ ] User Deactivation

[ ] Role List

[ ] Create Role

[ ] Clone Role

[ ] Permission Matrix

[ ] Module Permissions

[ ] Feature Permissions

[ ] Action Permissions

[ ] Sensitive Permissions

[ ] Permission Dependencies

[ ] User Overrides

[ ] Permission Source

[ ] Effective Access Preview

[ ] Workshop Configuration

[ ] Job Card Types

[ ] Service Types

[ ] Priority

[ ] Check-In Checklist

[ ] Inspection Templates

[ ] Dent / Scratch / Broken

[ ] Voice / Photos / Advice

[ ] Labour

[ ] Spares

[ ] Lubes

[ ] Outsource Items

[ ] Service Packages

[ ] QC Templates

[ ] Inventory Configuration

[ ] Purchase Configuration

[ ] CRM Configuration

[ ] Vehicle Sales Configuration

[ ] Insurance Configuration

[ ] Warranty Configuration

[ ] Finance Configuration

[ ] HR Configuration

[ ] Tax

[ ] Payment Methods

[ ] Financial Accounts

[ ] Expense Categories

[ ] Number Series

[ ] Branch Number Series

[ ] Number Preview

[ ] Document Templates

[ ] Template Preview

[ ] Print Settings

[ ] Terms

[ ] Communication Templates

[ ] Template Variables

[ ] Notification Rules

[ ] Service Reminder Settings

[ ] System Preferences

[ ] Security Settings

[ ] Password Policy

[ ] Account Lock

[ ] Session Settings

[ ] 2FA UI

[ ] Login History

[ ] Active Sessions

[ ] Audit Logs

[ ] Audit Detail

[ ] Configuration History

[ ] Dangerous Action Warning

[ ] Master Dependency Warning

[ ] Future SaaS Boundary Preserved

[ ] No backend/API generated

============================================================
159. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create dozens of settings sidebar menus.
- Create separate HTML page for every small master.
- Duplicate Employee inside Users.
- Treat Employee and User as identical.
- Treat Designation as Role.
- Automatically give permissions based only on designation.
- Duplicate users per branch.
- Delete historical users.
- Delete branches with transaction history.
- Delete master values already used in transactions.
- Hide permission source.
- Ignore branch scope when evaluating UI access.
- Give sensitive financial permissions through generic View.
- Give salary visibility through generic Employee View.
- Overwrite organization settings without showing branch
  override context.
- Overwrite historical number series blindly.
- Build backend tax compliance logic.
- Build communication APIs.
- Build OTP service.
- Build actual authentication backend.
- Build SaaS Super Admin now.
- Build Subscription / License screens now.
- Generate API code.
- Generate database code.
- Generate mobile app screens.

============================================================
160. FINAL ADMINISTRATION EXPERIENCE
============================================================

When Organization Admin opens Administration they should
immediately understand:

WHAT ORGANIZATION IS CONFIGURED?

HOW MANY BRANCHES EXIST?

WHICH BRANCHES ARE ACTIVE?

WHAT CAN EACH BRANCH OPERATE?

WHO CAN LOGIN?

WHICH EMPLOYEE IS LINKED TO EACH USER?

WHAT ROLE DOES EACH USER HAVE?

WHICH BRANCHES CAN THEY ACCESS?

WHAT CAN THEIR ROLE VIEW?

WHAT CAN THEIR ROLE CREATE OR EDIT?

WHO CAN APPROVE?

WHO CAN SEE COST?

WHO CAN SEE PROFIT?

WHO CAN SEE SALARY?

ARE ANY USER OVERRIDES ACTIVE?

WHAT IS THE USER'S EFFECTIVE ACCESS?

HOW IS WORKSHOP CONFIGURED?

WHAT SERVICE TYPES EXIST?

WHAT INSPECTION / QC CHECKLISTS EXIST?

HOW ARE LABOUR, SPARES, LUBES AND OUTSOURCE ITEMS CONFIGURED?

HOW IS INVENTORY CONFIGURED?

HOW IS PURCHASE CONFIGURED?

HOW IS CRM CONFIGURED?

HOW IS VEHICLE SALES CONFIGURED?

HOW IS FINANCE CONFIGURED?

HOW IS HR CONFIGURED?

WHAT TAXES AND PAYMENT METHODS EXIST?

HOW ARE DOCUMENT NUMBERS GENERATED?

WHAT WILL EACH PRINT DOCUMENT LOOK LIKE?

WHAT CUSTOMER COMMUNICATION TEMPLATES EXIST?

WHAT NOTIFICATIONS ARE CONFIGURED?

WHAT SECURITY RULES EXIST?

WHO CHANGED AN IMPORTANT SETTING?

WHEN WAS IT CHANGED?

WHAT WAS THE PREVIOUS VALUE?

============================================================
161. FINAL PRINCIPLE
============================================================

ADMINISTRATION SHOULD NOT FEEL LIKE:

ORGANIZATION
+
BRANCH
+
USER
+
ROLE
+
PERMISSION
+
100 MASTER TABLES
+
TAX
+
NUMBERING
+
TEMPLATES
+
NOTIFICATIONS
+
SECURITY

AS DISCONNECTED CONFIGURATION SCREENS.

IT SHOULD FEEL LIKE:

ORGANIZATION
        ↓
BRANCHES
        ↓
EMPLOYEES / USERS
        ↓
ROLES
        ↓
PERMISSIONS
        ↓
MODULE CONFIGURATION
        ↓
BUSINESS MASTERS
        ↓
NUMBERING
        ↓
DOCUMENTS
        ↓
COMMUNICATION
        ↓
SECURITY
        ↓
AUDIT

ONE CENTRAL ADMINISTRATION SYSTEM.

SEARCHABLE CONFIGURATION.

REUSABLE MASTER UI.

ORGANIZATION DEFAULTS.

BRANCH OVERRIDES.

CENTRAL USER IDENTITY.

ROLE-BASED ACCESS.

BRANCH-BASED ACCESS.

SENSITIVE DATA CONTROL.

COMPLETE AUDITABILITY.

FUTURE SAAS READY.

BUT CURRENTLY:

MULTI-BRANCH GARAGE ADMIN ONLY.

NO SAAS SUPER ADMIN.

NO SUBSCRIPTION.

NO LICENSE ENGINE.

NO BACKEND.

NO API.

NO MOBILE APP.

============================================================
END OF 05_MODULE_FLOWS/12_ADMIN_SETTINGS_ACCESS_CONTROL.md
============================================================