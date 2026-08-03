/**
 * Shared Zod schemas.
 *
 * These drive React Hook Form validation today and will drive Express request
 * validation later — the same object, not a reimplementation.
 *
 * Ref: 03_PAGE_TEMPLATES.md §24, 06_MERN_IMPLEMENTATION_PLAN.md §2.2
 */

import { z } from 'zod'

/** Indian mobile: 10 digits starting 6-9, with optional +91 / 0 prefix. */
export const mobileSchema = z
  .string()
  .trim()
  .regex(/^(?:\+?91[-\s]?|0)?[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')

export const emailSchema = z.string().trim().email('Enter a valid email address')

/** GSTIN: 2-digit state, 10-char PAN, entity digit, Z, checksum. */
export const gstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/, 'Enter a valid 15-character GSTIN')

export const panSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{5}\d{4}[A-Z]$/, 'Enter a valid 10-character PAN')

export const pincodeSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit PIN code')

/**
 * Vehicle registration. Accepts the common Indian formats plus BH series.
 * Stored uppercase without separators.
 */
export const registrationSchema = z
  .string()
  .trim()
  .toUpperCase()
  .transform((v) => v.replace(/[\s-]/g, ''))
  .refine(
    (v) => /^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{1,4}$/.test(v) || /^\d{2}BH\d{4}[A-Z]{1,2}$/.test(v),
    'Enter a valid registration number, e.g. MH12AB4582',
  )

/** VIN / chassis: 17 characters, excluding I, O and Q. */
export const vinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN must be 17 characters and exclude I, O and Q')

/** Money entered in rupees by a human, stored as integer paise. */
export const moneySchema = z
  .number({ invalid_type_error: 'Enter an amount' })
  .finite()
  .nonnegative('Amount cannot be negative')
  .transform((rupees) => Math.round(rupees * 100))

export const quantitySchema = z
  .number({ invalid_type_error: 'Enter a quantity' })
  .finite()
  .positive('Quantity must be greater than zero')

export const percentSchema = z
  .number()
  .min(0, 'Cannot be less than 0%')
  .max(100, 'Cannot be more than 100%')

export const idSchema = z.string().min(1, 'Required')

export const requiredString = (label: string) =>
  z.string({ required_error: `${label} is required` }).trim().min(1, `${label} is required`)

/** Present on every operational document. 04_ALL_MODULES.md §96 */
export const branchScopedSchema = z.object({
  companyId: idSchema,
  branchId: idSchema,
  financialYear: z.string().regex(/^\d{4}-\d{2}$/, 'Financial year must look like 2026-27'),
})

/** Standard list query, mirrors T02's URL contract. */
export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(10).max(200).default(25),
  search: z.string().trim().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  branchId: z.string().optional(),
  financialYear: z.string().optional(),
})

export type ListQueryInput = z.infer<typeof listQuerySchema>

export const addressSchema = z.object({
  line1: requiredString('Address line 1'),
  line2: z.string().trim().optional(),
  city: requiredString('City'),
  state: requiredString('State'),
  pincode: pincodeSchema,
  country: z.string().default('India'),
})

export type AddressInput = z.infer<typeof addressSchema>
