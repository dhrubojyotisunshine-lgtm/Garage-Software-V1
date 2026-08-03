# ENTERPRISE GARAGE ERP
# 05_MODULE_FLOWS/10_EMPLOYEE_HR.md
# EMPLOYEE & HR — COMPLETE UI, PROCESS & WORKSPACE SPECIFICATION

Version: 1.0
Status: FINAL / FROZEN
Implementation: Frontend UI Only
Technology: HTML5 + CSS3 + Bootstrap 5 + JavaScript + jQuery

============================================================
1. PURPOSE
============================================================

Employee & HR manages the COMPLETE employee operational
lifecycle inside Garage ERP.

The Employee Workspace is the CENTRAL employee record.

The system should connect:

Employee

Department

Designation

Branch

Role

Skills

Technician Profile

Service Advisor Profile

Shift

Attendance

Leave

Work Allocation

Workshop Performance

Sales / CRM Performance

Documents

Salary / Payroll-Ready Information

Activity

Employment History

Timeline

without creating disconnected employee records in different
modules.

============================================================
2. PRIMARY HR NAVIGATION
============================================================

EMPLOYEE & HR

    HR Dashboard

    Employees

    Attendance & Leave

Do NOT create excessive permanent sidebar menus for:

Departments

Designations

Skills

Shifts

Attendance Logs

Leave Requests

Technician Performance

Advisor Performance

Documents

Employee History

These should exist through contextual pages, tabs, drawers,
configuration or employee workspaces.

============================================================
3. COMPLETE EMPLOYEE PROCESS
============================================================

Employee Creation
        ↓
Employment Information
        ↓
Branch Assignment
        ↓
Department
        ↓
Designation
        ↓
System Role / Access
        ↓
Skills & Specialization
        ↓
Shift
        ↓
Attendance
        ↓
Leave
        ↓
Operational Assignment
        ↓
Work / Job Performance
        ↓
Performance Review
        ↓
Documents
        ↓
Employment Changes
        ↓
Exit / Inactive
        ↓
Complete Employee History

============================================================
4. CORE EMPLOYEE PRINCIPLE
============================================================

ONE PERSON
        ↓
ONE EMPLOYEE MASTER
        ↓
USED ACROSS ERP

Example:

Employee:
Amit Patil

Designation:
Senior Technician

Branch:
Pune Main

Skills:
Engine / Electrical

The SAME employee must be used in:

Job Card

Mechanic Assignment

Inspection

Labour

Quality Check

Attendance

Performance

Activity Logs

Do NOT create separate Workshop Technician records.

============================================================
5. HR DASHBOARD
============================================================

Use:

T01 Dashboard

Purpose:

Provide today's workforce and HR operational visibility.

============================================================
6. HR DASHBOARD KPIs
============================================================

Recommended:

Total Employees

Present Today

Absent Today

On Leave

Late Today

Technicians Available

Technicians Busy

Employees Off Shift

Pending Leave Requests

Documents Expiring

============================================================
7. HR DASHBOARD SECONDARY KPIs
============================================================

Possible:

Employees by Branch

Employees by Department

Technician Utilization

Jobs Completed Today

Overtime Today

New Joiners

Employees on Notice

============================================================
8. HR ATTENTION REQUIRED
============================================================

Show:

Late Employee

Absent Employee

Leave Approval Pending

Employee Document Expiring

Driving License Expiring

Technician Overloaded

Technician Unassigned

Shift Conflict

Attendance Missing

Employee Exit Pending

============================================================
9. HR QUICK ACTIONS
============================================================

Recommended:

+ Add Employee

Mark Attendance

Add Leave

Assign Shift

Search Employee

More ▼

============================================================
10. EMPLOYEE LIST
============================================================

Use:

T02 List Page

Primary Action:

+ Add Employee

============================================================
11. EMPLOYEE QUICK FILTERS
============================================================

All

Active

Technicians

Service Advisors

Sales

Drivers

Present

Absent

On Leave

Inactive

============================================================
12. EMPLOYEE SEARCH
============================================================

Search:

Employee Code

Employee Name

Mobile

Email

Department

Designation

Skill

============================================================
13. EMPLOYEE FILTERS
============================================================

Branch

Department

Designation

Role

Employment Type

Status

Joining Date

Shift

============================================================
14. EMPLOYEE LIST TABLE
============================================================

Recommended columns:

Employee

Employee Code

Branch

Department

Designation

Shift

Attendance Today

Current Work Status

Employment Status

Actions

============================================================
15. ADD EMPLOYEE
============================================================

Use:

T05 Add/Edit Form

Sections:

Basic Information

Contact

Employment

Branch & Department

Role / Access Context

Skills

Shift

Emergency Contact

Documents

Notes

Do NOT create one huge uncontrolled form.

============================================================
16. BASIC INFORMATION
============================================================

Fields:

Employee Code

First Name *

Last Name

Profile Photo

Gender where required

Date of Birth where required

Mobile *

Alternate Mobile

Email

Address

Status

============================================================
17. EMPLOYMENT INFORMATION
============================================================

Fields:

Joining Date *

Employment Type *

Department *

Designation *

Reporting Manager

Branch *

Employee Status

Probation End Date where applicable

Notice Period where applicable

============================================================
18. EMPLOYMENT TYPES
============================================================

Possible:

Permanent

Contract

Temporary

Part-Time

Intern

Consultant

Other

============================================================
19. EMPLOYEE STATUS
============================================================

Possible:

Active

Probation

On Leave

Notice Period

Suspended where business permits

Inactive

Exited

============================================================
20. DEPARTMENT
============================================================

Possible garage departments:

Workshop

Service

Body Shop

Parts

Inventory

Purchase

Sales

CRM

Insurance

Finance

Administration

Management

Drivers / Logistics

Other

Departments should be configurable.

============================================================
21. DESIGNATION
============================================================

Possible:

Workshop Manager

Service Manager

Service Advisor

Supervisor

Technician

Senior Technician

Helper

Electrician

Dent Technician

Painter

Parts Manager

Storekeeper

Purchase Executive

Sales Executive

CRM Executive

Insurance Executive

Accountant

Cashier

Driver

Branch Manager

Other

============================================================
22. BRANCH ASSIGNMENT
============================================================

Every operational employee should have:

Primary Branch

Optional Additional Branch Access

Department

Reporting Manager

Current Assignment Status

============================================================
23. MULTI-BRANCH EMPLOYEE
============================================================

Where permitted:

Primary Branch:
Pune

Additional Access:
Mumbai

Temporary Assignment:
Mumbai
01 Aug 2026 → 07 Aug 2026

Do NOT duplicate employee to represent another branch.

============================================================
24. ROLE VS DESIGNATION
============================================================

CRITICAL.

Designation represents business position.

Role represents system access.

Example:

Designation:
Service Advisor

System Role:
Workshop Advisor

Do NOT assume designation automatically equals permission role.

============================================================
25. SYSTEM USER CONNECTION
============================================================

Employee may optionally have ERP login.

Show:

Login Enabled

Username / Email

Assigned Role

Last Login

Account Status

Do NOT create separate employee information inside Users.

============================================================
26. EMPLOYEE SKILLS
============================================================

Skills are especially important for workshop employees.

Possible:

General Service

Engine

Transmission

Electrical

Diagnostics

AC

Brake

Suspension

Wheel Alignment

Dent Repair

Painting

Body Work

EV

Hybrid

Commercial Vehicle

Other

============================================================
27. SKILL INFORMATION
============================================================

Each skill may include:

Skill

Level

Certification

Experience

Valid Until where applicable

Notes

============================================================
28. SKILL LEVEL
============================================================

Possible:

Trainee

Basic

Intermediate

Advanced

Expert

Certified

============================================================
29. TECHNICIAN PROFILE
============================================================

Technician is NOT a separate employee database.

Employee
        ↓
Designation / Operational Type = Technician
        ↓
Technician Profile Enabled

============================================================
30. TECHNICIAN PROFILE INFORMATION
============================================================

Show:

Employee

Technician Code

Skills

Specialization

Experience

Current Branch

Current Shift

Current Bay

Current Job

Workload

Availability

Efficiency

Completed Jobs

============================================================
31. TECHNICIAN AVAILABILITY
============================================================

Possible operational statuses:

Available

Assigned

Working

Paused

On Break

On Leave

Off Shift

Unavailable

============================================================
32. TECHNICIAN WORKLOAD
============================================================

Show:

Current Jobs

Pending Tasks

Estimated Work Hours

Completed Today

Delayed Jobs

Current Bay

============================================================
33. TECHNICIAN + JOB CARD
============================================================

Job Card
        ↓
Mechanic Assignment
        ↓
Select Employee
        ↓
Check Skill
        ↓
Check Availability
        ↓
Check Workload
        ↓
Assign
        ↓
Employee Workspace Updated

============================================================
34. MULTIPLE TECHNICIANS
============================================================

Job Card may require:

Primary Technician

Additional Technician(s)

Supervisor

Each assignment should remain identifiable.

============================================================
35. TECHNICIAN TASK ASSIGNMENT
============================================================

Where Job Card supports task-level allocation:

Repair Task
        ↓
Technician
        ↓
Estimated Time
        ↓
Start
        ↓
Pause
        ↓
Resume
        ↓
Complete
        ↓
Actual Time

============================================================
36. TECHNICIAN TIME TRACKING
============================================================

Frontend should demonstrate:

Assigned Time

Started At

Paused Duration

Resumed At

Completed At

Actual Working Duration

No automatic timer backend required.

============================================================
37. TECHNICIAN HOLD
============================================================

Possible hold reasons:

Waiting for Parts

Waiting for Approval

Waiting for Bay

Waiting for Customer

Waiting for Outside Job

Technical Assistance

Other

============================================================
38. TECHNICIAN PERFORMANCE
============================================================

Performance should use operational data.

Possible indicators:

Jobs Assigned

Jobs Completed

Tasks Completed

Estimated Hours

Actual Hours

Efficiency

Rework

QC Failure

Comeback Job

Attendance

============================================================
39. TECHNICIAN EFFICIENCY
============================================================

Frontend may display:

Available Hours

Productive Hours

Assigned Hours

Completed Labour Hours

Efficiency %

Exact calculation rules later.

============================================================
40. REWORK / COMEBACK
============================================================

Where Workshop identifies:

Rework

Repeat Repair

Customer Comeback

Employee performance context may display it.

Do NOT automatically blame a technician.

Show factual linked Job Card information.

============================================================
41. SERVICE ADVISOR PROFILE
============================================================

Service Advisor remains Employee.

Show operational summary:

Customers Handled

Job Cards Created

Open Job Cards

Estimate Approval

Average Delivery Time

Customer Feedback

Revenue Handled

Pending Follow-Ups

============================================================
42. SALES EXECUTIVE PROFILE
============================================================

Where Vehicle Sales exists:

Leads Assigned

Follow-Ups

Bookings

Sales

Conversion

Deliveries

Customer Feedback

============================================================
43. CRM EXECUTIVE PROFILE
============================================================

Show:

Leads Assigned

Follow-Ups Due

Overdue Follow-Ups

Appointments

Converted Leads

Lost Leads

============================================================
44. DRIVER PROFILE
============================================================

Driver remains Employee.

Possible information:

Driving License

License Expiry

Vehicle Type Eligibility

Assigned Vehicle

Pickup / Drop Tasks

Attendance

Status

============================================================
45. EMPLOYEE WORKSPACE
============================================================

Use:

T03 Primary Business Workspace

Recommended navigation:

Overview

Work

Attendance

Leave

Performance

Documents

Employment History

Timeline

============================================================
46. EMPLOYEE HEADER
============================================================

Example:

EMPLOYEE #EMP-00128

Amit Patil

[ ACTIVE ] [ PRESENT ]

Senior Technician

Workshop Department

Pune Main Branch

Shift:
09:00 AM – 06:00 PM

Current:
Working • JC-2026-001248

Actions:

[ Assign Work ]

[ More ▼ ]

============================================================
47. EMPLOYEE OVERVIEW
============================================================

Should answer:

Who is this employee?

Which branch?

Which department?

What designation?

What role?

What shift?

Are they present today?

Are they currently available?

What work are they doing?

What skills do they have?

Are documents valid?

============================================================
48. EMPLOYEE WORK TAB
============================================================

Depending on role show relevant operational work.

Technician:

Assigned Job Cards

Repair Tasks

Current Job

Completed Work

Service Advisor:

Job Cards

Customers

Approvals

Deliveries

Sales / CRM:

Leads

Follow-Ups

Bookings

Sales

============================================================
49. ATTENDANCE & LEAVE
============================================================

Use:

Combined operational workspace.

Recommended views:

Today

Attendance Register

Leave Requests

Calendar

============================================================
50. ATTENDANCE PROCESS
============================================================

Employee
        ↓
Scheduled Shift
        ↓
Check-In
        ↓
Attendance Status
        ↓
Break if tracked
        ↓
Check-Out
        ↓
Working Hours
        ↓
Overtime if applicable
        ↓
Daily Attendance Finalized

============================================================
51. ATTENDANCE METHODS
============================================================

Frontend may prepare:

Manual

Admin Entry

Biometric

Mobile

QR

Device

Integration methods are future backend concerns.

============================================================
52. ATTENDANCE TODAY
============================================================

Show:

Employee

Shift

Check-In

Check-Out

Working Hours

Late

Early Exit

Overtime

Status

============================================================
53. ATTENDANCE STATUS
============================================================

Possible:

Present

Absent

Late

Half Day

On Leave

Weekly Off

Holiday

Work From Other Branch

Missing Punch

============================================================
54. CHECK-IN
============================================================

Capture/display:

Employee

Date

Shift

Check-In Time

Branch

Method

Remarks

============================================================
55. CHECK-OUT
============================================================

Capture/display:

Check-Out Time

Working Hours

Break Duration

Overtime

Early Exit

Remarks

============================================================
56. LATE ATTENDANCE
============================================================

Example:

Shift:
09:00 AM

Check-In:
09:24 AM

Late:
24 Minutes

Display clearly.

============================================================
57. MISSING ATTENDANCE
============================================================

Examples:

Missing Check-In

Missing Check-Out

No Attendance

Require correction / review indicator.

============================================================
58. ATTENDANCE CORRECTION
============================================================

Process:

Attendance Issue
        ↓
Correction Request
        ↓
Original Value
        ↓
Requested Value
        ↓
Reason
        ↓
Approval
        ↓
Updated Attendance
        ↓
History Preserved

============================================================
59. ATTENDANCE REGISTER
============================================================

Use:

T02 List / Register

Filters:

Date

Employee

Branch

Department

Shift

Status

============================================================
60. ATTENDANCE MONTHLY VIEW
============================================================

Show employee rows with day-wise statuses.

Example:

P = Present

A = Absent

L = Leave

H = Holiday

WO = Weekly Off

HD = Half Day

Late = Late

============================================================
61. SHIFT MANAGEMENT
============================================================

Shift should remain lightweight configuration.

Possible:

General Shift

Morning Shift

Evening Shift

Night Shift

Custom Shift

============================================================
62. SHIFT INFORMATION
============================================================

Fields:

Shift Name

Start Time

End Time

Break Duration

Grace Time

Weekly Off

Status

============================================================
63. EMPLOYEE SHIFT ASSIGNMENT
============================================================

Employee
        ↓
Select Shift
        ↓
Effective Date
        ↓
End Date where temporary
        ↓
Save

Maintain shift history.

============================================================
64. SHIFT CHANGE
============================================================

Do NOT overwrite historical shift assignment.

Show:

Old Shift

New Shift

Effective Date

Changed By

Reason

============================================================
65. LEAVE MANAGEMENT
============================================================

Leave should connect directly to employee availability.

Process:

Leave Request
        ↓
Leave Type
        ↓
Date / Range
        ↓
Reason
        ↓
Approval
        ↓
Attendance Updated
        ↓
Employee Availability Updated

============================================================
66. LEAVE TYPES
============================================================

Possible:

Casual Leave

Sick Leave

Paid Leave

Unpaid Leave

Emergency Leave

Half Day

Comp Off

Other

Configurable later.

============================================================
67. LEAVE REQUEST
============================================================

Fields:

Employee *

Leave Type *

From Date *

To Date *

Duration

Half Day where applicable

Reason *

Attachment

Contact During Leave

============================================================
68. LEAVE STATUS
============================================================

Possible:

Draft

Pending

Approved

Rejected

Cancelled

============================================================
69. LEAVE APPROVAL
============================================================

Use contextual Drawer.

Show:

Employee

Branch

Department

Leave Type

Dates

Duration

Reason

Current Workload

Assigned Jobs where relevant

Actions:

Approve

Reject

============================================================
70. TECHNICIAN LEAVE WARNING
============================================================

When approving leave, frontend may show:

3 active Job Cards assigned.

Affected:

JC-2026-001248

JC-2026-001251

JC-2026-001254

Action:

Review Assignments

Do NOT automatically remove assignments.

============================================================
71. LEAVE BALANCE PREPARATION
============================================================

Frontend may display:

Leave Type

Opening

Used

Pending

Available

Actual leave accrual rules later.

============================================================
72. HOLIDAYS
============================================================

Holiday configuration may contain:

Holiday Name

Date

Branch

Optional / Mandatory

Notes

============================================================
73. WEEKLY OFF
============================================================

Weekly off may come from:

Shift

Employee Schedule

Branch Configuration

Show clearly in attendance calendar.

============================================================
74. OVERTIME
============================================================

Frontend may prepare:

Date

Employee

Normal Hours

Additional Hours

Approved Overtime

Reason

Approval

Actual payroll calculation later.

============================================================
75. EMPLOYEE PERFORMANCE
============================================================

Performance must be role-aware.

Do NOT show identical metrics to every employee type.

============================================================
76. TECHNICIAN PERFORMANCE METRICS
============================================================

Possible:

Jobs Completed

Tasks Completed

Productive Hours

Efficiency

Average Completion Time

QC Pass

QC Failure

Rework

Comeback

Attendance

============================================================
77. SERVICE ADVISOR PERFORMANCE
============================================================

Possible:

Job Cards

Estimate Approval Rate

Average Job Value

On-Time Delivery

Customer Rating

Pending Approvals

Customer Follow-Ups

============================================================
78. SALES PERFORMANCE
============================================================

Possible:

Leads

Bookings

Vehicle Sales

Conversion Rate

Revenue

Delivery

Cancellation

============================================================
79. CRM PERFORMANCE
============================================================

Possible:

Follow-Ups

Appointments

Lead Conversion

Overdue Follow-Ups

Lost Leads

============================================================
80. PERFORMANCE DATE FILTER
============================================================

Support:

Today

Week

Month

Quarter

Year

Custom

============================================================
81. PERFORMANCE COMPARISON
============================================================

Where authorized:

Employee vs Previous Period

Employee vs Team Average

Branch Team Comparison

Avoid misleading rankings where data is incomplete.

============================================================
82. PERFORMANCE DETAILS
============================================================

Every performance metric should allow source traceability.

Example:

Jobs Completed:
18

Action:
View Jobs

Do NOT display unexplained numbers.

============================================================
83. EMPLOYEE DOCUMENTS
============================================================

Possible:

Profile Photo

ID Proof

Address Proof

Resume

Employment Contract

Driving License

Certificates

Training Certificates

Experience Letter

Education Documents

Other

============================================================
84. DOCUMENT INFORMATION
============================================================

Fields:

Document Type

Document Number

Issue Date

Expiry Date

Attachment

Verification Status

Remarks

============================================================
85. DOCUMENT EXPIRY
============================================================

Track:

Valid

Expiring Soon

Expired

No Expiry

Examples:

Driving License

Certification

Contract

============================================================
86. DOCUMENT ALERT
============================================================

Example:

DRIVING LICENSE EXPIRING

Employee:
Ravi Kumar

Expiry:
10 Aug 2026

Show on:

HR Dashboard

Employee Workspace

============================================================
87. CERTIFICATION
============================================================

Technician certifications may include:

Certification Name

Authority

Skill

Issue Date

Expiry Date

Certificate

Status

============================================================
88. TRAINING HISTORY
============================================================

Employee may have:

Training

Date

Provider

Skill

Result

Certificate

Remarks

============================================================
89. SALARY / PAYROLL-READY INFORMATION
============================================================

Current UI phase should prepare employee payroll information
without building a complete statutory payroll engine.

Possible fields:

Salary Type

Basic Salary

Allowance

Incentive Eligibility

Overtime Eligibility

Payment Method

Bank Information

============================================================
90. SALARY VISIBILITY
============================================================

Salary information is permission-sensitive.

Only authorized users should see:

Salary

Bank Details

Compensation

Payroll Information

Frontend must allow section hiding.

============================================================
91. PAYROLL-READY ATTENDANCE SUMMARY
============================================================

Possible monthly summary:

Working Days

Present

Absent

Paid Leave

Unpaid Leave

Half Days

Late Days

Overtime Hours

============================================================
92. INCENTIVE PREPARATION
============================================================

Future incentive rules may use:

Labour Revenue

Jobs Completed

Vehicle Sales

Lead Conversion

Parts Sales

Customer Rating

Frontend may show incentive context.

No calculation engine required now.

============================================================
93. EMPLOYEE BANK INFORMATION
============================================================

Possible:

Account Holder

Bank

Masked Account Number

IFSC / Routing information where applicable

Payment Method

Sensitive values should be permission-controlled.

============================================================
94. EMERGENCY CONTACT
============================================================

Fields:

Name

Relationship

Mobile

Alternate Mobile

Address where needed

============================================================
95. EMPLOYMENT HISTORY
============================================================

Maintain important employment changes.

Examples:

Employee Joined

Probation Completed

Branch Changed

Department Changed

Designation Changed

Reporting Manager Changed

Shift Changed

Role Changed

Status Changed

Notice Started

Exited

============================================================
96. TRANSFER EMPLOYEE
============================================================

Process:

Current Branch
        ↓
Transfer Request / Action
        ↓
New Branch
        ↓
Effective Date
        ↓
Department / Designation Review
        ↓
Active Job Assignment Review
        ↓
Confirm
        ↓
History Updated

============================================================
97. TRANSFER WARNING
============================================================

Before transfer show:

Active Job Cards

Current Bay Assignment

Pending Tasks

Open Customer Follow-Ups

Other responsibilities

Do NOT silently break operational assignments.

============================================================
98. DESIGNATION CHANGE
============================================================

Capture:

Current Designation

New Designation

Effective Date

Reason

Approver where applicable

Maintain history.

============================================================
99. DEPARTMENT CHANGE
============================================================

Capture:

Current Department

New Department

Effective Date

Reason

============================================================
100. REPORTING MANAGER CHANGE
============================================================

Maintain:

Old Manager

New Manager

Effective Date

Reason

============================================================
101. EMPLOYEE EXIT
============================================================

Process:

Exit Initiated
        ↓
Last Working Date
        ↓
Exit Reason
        ↓
Review Active Assignments
        ↓
Reassign Work
        ↓
Review System Access
        ↓
Asset / Responsibility Handover
        ↓
Final Attendance Context
        ↓
Deactivate Employee
        ↓
History Preserved

============================================================
102. EXIT REASONS
============================================================

Possible:

Resignation

Termination

Retirement

Contract End

Absconding

Transfer Outside Organization

Other

============================================================
103. EXIT CHECKLIST
============================================================

Frontend should prepare:

Active Jobs Reviewed

Customers / Leads Reassigned

Pending Tasks Reassigned

Documents Reviewed

Assets Returned

Access Disable Required

Final Attendance Reviewed

Remarks

============================================================
104. EMPLOYEE DEACTIVATION
============================================================

Do NOT delete employee.

Status:

INACTIVE / EXITED

Historical references must continue showing employee name.

============================================================
105. EMPLOYEE REJOIN
============================================================

Where business allows:

Exited Employee
        ↓
Rejoin
        ↓
New Joining Date
        ↓
New Branch / Department / Designation
        ↓
Employment History Continues

Avoid unnecessary duplicate employee where same identity is
confirmed.

============================================================
106. EMPLOYEE TIMELINE
============================================================

Timeline should show business-level employee history.

Examples:

Employee Created

Joined

Branch Assigned

Role Assigned

Skill Added

Shift Assigned

Attendance Corrected

Leave Approved

Job Assigned

Job Completed

Certification Added

Branch Transferred

Designation Changed

Notice Started

Exited

Rejoined

============================================================
107. EMPLOYEE ACTIVITY VS AUDIT LOG
============================================================

Employee Timeline:

Business employment events.

Audit Log:

System changes/actions.

Do NOT put every technical field update into Employee Timeline.

============================================================
108. EMPLOYEE + WORKSHOP
============================================================

Workshop should consume Employee records for:

Service Advisor

Technician

Supervisor

QC User

Manager

Driver

============================================================
109. EMPLOYEE + JOB CARD
============================================================

Job Card employee assignments should automatically appear in:

Employee Workspace

Technician Board

Performance Context

Do NOT re-enter work manually in HR.

============================================================
110. EMPLOYEE + BAY
============================================================

Technician may have:

Current Bay

Current Vehicle

Current Job Card

Bay history remains operationally owned by Workshop.

============================================================
111. EMPLOYEE + LABOUR
============================================================

Labour entry may reference:

Technician

Hours

Work Performed

Job Card

This may contribute to technician performance.

============================================================
112. EMPLOYEE + QUALITY CHECK
============================================================

QC records may reference:

QC Performed By

Supervisor

Result

Failure / Rework

Maintain source traceability.

============================================================
113. EMPLOYEE + CRM
============================================================

CRM should consume Employee for:

Lead Executive

Follow-Up Owner

Appointment Owner

Complaint Owner

============================================================
114. EMPLOYEE + VEHICLE SALES
============================================================

Vehicle Sales should consume Employee for:

Sales Executive

Manager

Delivery Coordinator

Other responsible users

============================================================
115. EMPLOYEE + PURCHASE
============================================================

Purchase may reference:

Requested By

Buyer

Approved By

Received By

============================================================
116. EMPLOYEE + INVENTORY
============================================================

Inventory transactions may reference:

Issued By

Issued To

Received By

Adjusted By

Technician receiving parts should use Employee identity.

============================================================
117. EMPLOYEE + FINANCE
============================================================

Finance may reference:

Cashier

Payment Received By

Payment Made By

Expense Requested By

Expense Approved By

Closing User

============================================================
118. EMPLOYEE + INSURANCE
============================================================

Insurance may reference:

Insurance Executive

Service Advisor

Claim Coordinator

Approver

============================================================
119. EMPLOYEE + USER ACCESS
============================================================

Employee and System User are related but NOT identical concepts.

Employee:
Business person / staff record.

User:
Login/access identity.

One Employee may have:

No Login

OR

One ERP Login

Frontend should reflect this relationship clearly.

============================================================
120. ROLE & PERMISSION CONNECTION
============================================================

Employee Workspace may show:

System Role

Branch Access

Module Access Summary

Account Status

Detailed permission configuration remains in Administration /
Access Control.

============================================================
121. MULTI-BRANCH ATTENDANCE
============================================================

If employee works at another branch:

Employee:
Amit Patil

Primary:
Pune

Attendance Today:
Mumbai Branch

Show actual attendance branch.

============================================================
122. MULTI-BRANCH PERFORMANCE
============================================================

Performance should retain source branch.

Example:

Pune:
12 Jobs

Mumbai:
4 Jobs

Total:
16 Jobs

============================================================
123. EMPLOYEE AVAILABILITY
============================================================

Availability should consider:

Employee Active?

Attendance Present?

Shift Active?

On Leave?

Already Assigned?

Current Workload?

Skill Match?

============================================================
124. TECHNICIAN ASSIGNMENT UI
============================================================

When assigning technician show useful context.

Example:

Amit Patil
Engine / Electrical
2 Active Jobs
Available 2.5 hrs

Rohit Singh
General Service
4 Active Jobs
High Workload

Do NOT show only employee names.

============================================================
125. SERVICE ADVISOR ASSIGNMENT UI
============================================================

May show:

Advisor

Present / Absent

Open Job Cards

Expected Deliveries

Current Workload

============================================================
126. DRIVER ASSIGNMENT UI
============================================================

May show:

Driver

Attendance

Current Assignment

Driving License Status

Vehicle Eligibility

Availability

============================================================
127. EMPLOYEE CALENDAR
============================================================

Calendar may combine:

Shift

Leave

Holiday

Training

Temporary Branch Assignment

Important operational schedule.

============================================================
128. HR REPORTS
============================================================

Report Center may include:

Employee List

Employee by Branch

Employee by Department

Attendance

Late Attendance

Absence

Leave

Overtime

Technician Performance

Advisor Performance

Sales Performance

CRM Performance

Document Expiry

Certification Expiry

New Joiners

Employee Exit

============================================================
129. ATTENDANCE REPORT
============================================================

Possible columns:

Employee

Branch

Department

Date

Shift

Check-In

Check-Out

Working Hours

Late

Overtime

Status

============================================================
130. LEAVE REPORT
============================================================

Possible:

Employee

Leave Type

From

To

Days

Status

Approved By

============================================================
131. TECHNICIAN PERFORMANCE REPORT
============================================================

Possible:

Technician

Jobs Assigned

Jobs Completed

Estimated Hours

Actual Hours

Efficiency

QC Failures

Rework

============================================================
132. EMPLOYEE GLOBAL SEARCH
============================================================

Global ERP Search should find:

Employee

Employee Code

Mobile

Department

Designation

Example:

EMPLOYEE

Amit Patil

EMP-00128

Senior Technician

Pune Main

Status:
Working

============================================================
133. EMPLOYEE QUICK ACTIONS
============================================================

Context dependent:

Edit Employee

Assign Work

Assign Shift

Add Leave

Mark Attendance

Add Skill

Upload Document

Transfer Branch

Change Designation

Change Department

============================================================
134. EMPLOYEE MORE ACTIONS
============================================================

Possible:

Enable Login

Disable Login

View Role

Add Certification

Attendance Correction

Add Training

Start Notice Period

Exit Employee

Rejoin Employee

============================================================
135. FRONTEND DEMO INTERACTIONS
============================================================

Claude MUST demonstrate:

HR Dashboard

Employee List

Employee Filters

Add Employee

Employee Workspace

Employee Overview

Branch Assignment

Department

Designation

Role Context

Multi-Branch Access

Employee Skills

Skill Level

Technician Profile

Technician Availability

Technician Workload

Technician Assignment

Multiple Technician Assignment

Task Assignment

Start Work

Pause Work

Resume Work

Complete Work

Technician Performance

Service Advisor Profile

Sales Executive Profile

CRM Executive Profile

Driver Profile

Attendance Today

Check-In

Check-Out

Late Attendance

Missing Attendance

Attendance Correction

Monthly Attendance

Shift Assignment

Shift Change

Leave Request

Leave Approval

Technician Leave Warning

Leave Balance UI

Holiday

Weekly Off

Overtime UI

Performance

Documents

Document Expiry

Certification

Training

Payroll-Ready Information

Salary Permission Visibility

Attendance Payroll Summary

Employee Transfer

Designation Change

Department Change

Reporting Manager Change

Notice Period

Employee Exit

Exit Checklist

Employee Deactivation

Employee Rejoin

Employment History

Employee Timeline

No API/backend required.

============================================================
136. RECOMMENDED FRONTEND FILES
============================================================

hr-dashboard.html

employees.html

employee-form.html

employee-workspace.html

attendance-leave.html

attendance-register.html

employee-calendar.html

hr-reports.html

employee-profile-print.html

attendance-report-print.html

Do NOT create unnecessary standalone pages for:

Technician

Service Advisor

Driver

Skills

Shift Assignment

Leave Approval

Performance

Documents

Employment Changes

These should remain connected to Employee / HR workspaces.

============================================================
137. REUSABLE HR COMPONENTS
============================================================

Employee Search

Employee Quick View

Employee Card

Employee Status Badge

Branch Assignment

Department Selector

Designation Selector

Role Summary

Skill Selector

Skill Badge

Technician Availability Card

Workload Indicator

Job Assignment Drawer

Attendance Status

Check-In / Check-Out Drawer

Attendance Correction Drawer

Shift Selector

Leave Request Drawer

Leave Approval Drawer

Workload Warning

Performance Summary

Document Panel

Expiry Alert

Employment Change Drawer

Exit Checklist

Timeline

============================================================
138. FEATURE → LOCATION MAP
============================================================

Employee
→ Employee Workspace

Department
→ Employee / Configuration

Designation
→ Employee / Configuration

Branch
→ Employee / Employment

Role
→ Employee / Access Context

Skills
→ Employee / Skills

Technician
→ Employee / Work

Service Advisor
→ Employee / Work

Driver
→ Employee / Work

Shift
→ Attendance / Employee

Attendance
→ Attendance & Leave

Leave
→ Attendance & Leave

Performance
→ Employee / Performance

Documents
→ Employee / Documents

Transfer
→ Employee / Employment History

Exit
→ Employee Workspace

Timeline
→ Employee / Timeline

============================================================
139. NO DUPLICATION RULE
============================================================

DO NOT create separate:

Technician Master

Service Advisor Master

Sales Executive Master

CRM Executive Master

Driver Master

Cashier Master

Insurance Executive Master

Store Employee Master

They are ALL Employees.

Use role/designation/skills/department to define operational
context.

============================================================
140. EMPLOYEE ACCEPTANCE CHECKLIST
============================================================

Before Employee & HR is considered complete:

[ ] HR Dashboard

[ ] Employee List

[ ] Add Employee

[ ] Employee Code

[ ] Contact Information

[ ] Employment Information

[ ] Employment Type

[ ] Branch

[ ] Multi-Branch

[ ] Department

[ ] Designation

[ ] Reporting Manager

[ ] Employee Status

[ ] Role Context

[ ] Login Status

[ ] Skills

[ ] Skill Level

[ ] Certification

[ ] Technician Profile

[ ] Technician Availability

[ ] Technician Workload

[ ] Technician Assignment

[ ] Multiple Technicians

[ ] Task Assignment

[ ] Technician Time Tracking

[ ] Hold Reason

[ ] Technician Performance

[ ] Service Advisor Context

[ ] Sales Context

[ ] CRM Context

[ ] Driver Context

[ ] Employee Workspace

[ ] Work Tab

[ ] Attendance

[ ] Check-In

[ ] Check-Out

[ ] Late

[ ] Missing Attendance

[ ] Attendance Correction

[ ] Attendance Register

[ ] Monthly Attendance

[ ] Shift

[ ] Shift Assignment

[ ] Shift History

[ ] Leave

[ ] Leave Request

[ ] Leave Approval

[ ] Workload Warning

[ ] Leave Balance UI

[ ] Holiday

[ ] Weekly Off

[ ] Overtime UI

[ ] Role-Based Performance

[ ] Documents

[ ] Document Expiry

[ ] Training

[ ] Payroll-Ready Information

[ ] Salary Permission Visibility

[ ] Attendance Payroll Summary

[ ] Emergency Contact

[ ] Employment History

[ ] Employee Transfer

[ ] Designation Change

[ ] Department Change

[ ] Manager Change

[ ] Exit Process

[ ] Exit Checklist

[ ] Deactivation

[ ] Rejoin

[ ] Timeline

[ ] Multi-Branch Attendance

[ ] Multi-Branch Performance

[ ] No backend/API generated

============================================================
141. STRICT DO-NOT RULES
============================================================

DO NOT:

- Create separate Technician master.
- Create separate Service Advisor master.
- Create separate Driver master.
- Duplicate Employee by branch.
- Duplicate Employee because designation changed.
- Duplicate Employee because department changed.
- Treat Designation and System Role as the same thing.
- Assume every Employee requires ERP login.
- Delete exited employees.
- Lose employee history after transfer.
- Overwrite historical shift assignment.
- Overwrite historical designation.
- Remove active Job Card assignment silently during leave.
- Remove active work silently during branch transfer.
- Calculate performance from manually duplicated data.
- Display technician performance without source traceability.
- Automatically blame technician for rework/comeback.
- Expose salary/bank information to unauthorized UI roles.
- Build full payroll/statutory engine during frontend phase.
- Generate backend/API/database code.
- Generate mobile app screens.

============================================================
142. FINAL EMPLOYEE WORKSPACE EXPERIENCE
============================================================

When user opens ONE Employee they should immediately
understand:

WHO IS THIS EMPLOYEE?

WHAT IS THEIR EMPLOYEE CODE?

WHICH BRANCH DO THEY BELONG TO?

WHICH DEPARTMENT?

WHAT IS THEIR DESIGNATION?

WHAT SYSTEM ROLE DO THEY HAVE?

DO THEY HAVE ERP LOGIN?

WHAT SKILLS DO THEY HAVE?

WHAT SHIFT ARE THEY WORKING?

ARE THEY PRESENT TODAY?

ARE THEY AVAILABLE RIGHT NOW?

WHAT WORK IS CURRENTLY ASSIGNED?

WHICH JOB CARD ARE THEY WORKING ON?

HOW MUCH WORKLOAD DO THEY HAVE?

WHAT HAVE THEY COMPLETED?

HOW ARE THEY PERFORMING?

ARE THEY ON LEAVE?

DO THEY HAVE UPCOMING LEAVE?

ARE ANY DOCUMENTS EXPIRING?

WHAT CERTIFICATIONS DO THEY HAVE?

HAS THEIR BRANCH / ROLE / DESIGNATION CHANGED?

WHAT IS THEIR COMPLETE EMPLOYMENT HISTORY?

============================================================
143. FINAL PRINCIPLE
============================================================

EMPLOYEE & HR SHOULD NOT FEEL LIKE:

EMPLOYEE
+
TECHNICIAN
+
SERVICE ADVISOR
+
DRIVER
+
ATTENDANCE
+
SHIFT
+
LEAVE
+
PERFORMANCE
+
DOCUMENTS

AS DISCONNECTED SYSTEMS.

IT SHOULD FEEL LIKE:

EMPLOYEE
        ↓
EMPLOYMENT
        ↓
BRANCH / DEPARTMENT / DESIGNATION
        ↓
ROLE + SKILLS
        ↓
SHIFT
        ↓
ATTENDANCE
        ↓
AVAILABILITY
        ↓
OPERATIONAL WORK
        ↓
PERFORMANCE
        ↓
LEAVE
        ↓
DOCUMENTS
        ↓
EMPLOYMENT CHANGES
        ↓
COMPLETE EMPLOYEE HISTORY

ONE EMPLOYEE.

ONE OPERATIONAL IDENTITY.

USED ACROSS ALL MODULES.

ROLE-AWARE.

SKILL-AWARE.

BRANCH-AWARE.

ATTENDANCE-AWARE.

WORKLOAD-AWARE.

PERMISSION-AWARE.

NO DUPLICATE EMPLOYEE ENTRY.

MINIMUM NAVIGATION.

NO FEATURE LOSS.

============================================================
END OF 05_MODULE_FLOWS/10_EMPLOYEE_HR.md
============================================================