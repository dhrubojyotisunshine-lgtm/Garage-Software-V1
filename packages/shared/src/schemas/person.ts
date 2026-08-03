/**
 * Person validation. Shared with the API later.
 */

import { z } from 'zod'
import { emailSchema, mobileSchema, requiredString } from './common'

export const personSchema = z.object({
  firstName: requiredString('First name'),
  lastName: z.string().trim().optional(),
  displayName: z.string().trim().optional(),
  email: emailSchema.optional().or(z.literal('')),
  mobile: mobileSchema.optional().or(z.literal('')),
  landline: z.string().trim().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  dateOfBirth: z.union([z.string(), z.date()]).optional(),
  designation: z.string().trim().optional(),
  joinDate: z.union([z.string(), z.date()]).optional(),
  leftDate: z.union([z.string(), z.date()]).optional(),
  addressLine: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
})

export type PersonInput = z.infer<typeof personSchema>
