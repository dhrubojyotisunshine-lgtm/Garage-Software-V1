/**
 * Quotation validation.
 *
 * Drives the form today and will validate the API request unchanged.
 */

import { z } from 'zod'
import { requiredString } from './common'

export const quotationSchema = z.object({
  customerId: requiredString('Customer'),
  vehicleId: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  complaintsText: z.string().trim().optional(),
  /** Entered in rupees; the store converts to paise. */
  discount: z.number().nonnegative('Discount cannot be negative').optional(),
  discountType: z.enum(['percent', 'amount']).default('amount'),
  validUntil: z.union([z.string(), z.date()]).refine((v) => Boolean(v), {
    message: 'A validity date is required — a quote without one never expires',
  }),
  notes: z.string().trim().optional(),
  terms: z.string().trim().optional(),
})

export type QuotationInput = z.infer<typeof quotationSchema>

/** A percentage discount above 100 would invert the total. */
export const quotationDiscountSchema = z
  .object({ discount: z.number().nonnegative(), discountType: z.enum(['percent', 'amount']) })
  .refine((v) => v.discountType !== 'percent' || v.discount <= 100, {
    message: 'A percentage discount cannot exceed 100',
    path: ['discount'],
  })
