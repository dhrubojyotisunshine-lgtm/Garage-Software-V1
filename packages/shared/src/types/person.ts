/**
 * Person — the staff-side user records.
 *
 * Employees, Support Staff, Accountants and Branch Admins share an identical
 * field set in the reference product, differing only by role. One record type
 * with a role discriminator, rather than four near-duplicate tables.
 *
 * Ref: 04_ALL_MODULES.md §57 — do not create duplicate person databases.
 */

import type { ID, ISODate, ISODateTime } from './common'

export const PERSON_ROLES = [
  'Employee',
  'Support Staff',
  'Accountant',
  'Branch Admin',
] as const

export type PersonRole = (typeof PERSON_ROLES)[number]

export type Gender = 'Male' | 'Female' | 'Other'

export interface Person {
  id: ID
  companyId: ID
  branchId: ID

  code: string
  role: PersonRole

  firstName: string
  lastName?: string
  /** Shown in lists and pickers when set; otherwise first + last. */
  displayName?: string

  email?: string
  mobile?: string
  landline?: string

  gender?: Gender
  dateOfBirth?: ISODate

  /** Employment details — present for Employee, optional elsewhere. */
  designation?: string
  joinDate?: ISODate
  leftDate?: ISODate

  addressLine?: string
  city?: string
  state?: string
  country?: string

  imageUrl?: string

  status: 'Active' | 'Inactive'
  createdAt: ISODateTime
}

export function personDisplayName(p: Pick<Person, 'displayName' | 'firstName' | 'lastName'>) {
  return p.displayName?.trim() || `${p.firstName} ${p.lastName ?? ''}`.trim()
}

/** Route segment for each role, e.g. "support-staff". */
export const PERSON_ROLE_SLUGS: Record<PersonRole, string> = {
  Employee: 'employees',
  'Support Staff': 'support-staff',
  Accountant: 'accountants',
  'Branch Admin': 'branch-admin',
}

export function roleFromSlug(slug?: string): PersonRole | undefined {
  return (Object.keys(PERSON_ROLE_SLUGS) as PersonRole[]).find(
    (r) => PERSON_ROLE_SLUGS[r] === slug,
  )
}

/** Plural label used for page titles. */
export const PERSON_ROLE_PLURAL: Record<PersonRole, string> = {
  Employee: 'Employees',
  'Support Staff': 'Support Staffs',
  Accountant: 'Accountants',
  'Branch Admin': 'Branch Admin',
}
