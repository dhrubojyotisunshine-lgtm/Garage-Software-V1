/**
 * Workshop MVP validation schemas.
 *
 * These drive React Hook Form / Ant Design validation today and will validate
 * Express requests unchanged in the backend phase.
 */

import { z } from 'zod'
import {
  emailSchema,
  gstinSchema,
  mobileSchema,
  pincodeSchema,
  registrationSchema,
  requiredString,
  vinSchema,
} from './common'

/* ---------------------------------------------------------------- customer */

export const customerSchema = z.object({
  name: requiredString('Customer name'),
  type: z.enum(['Individual', 'Business']).default('Individual'),
  mobile: mobileSchema,
  altMobile: mobileSchema.optional().or(z.literal('')),
  email: emailSchema.optional().or(z.literal('')),
  addressLine: z.string().trim().optional(),
  city: requiredString('City'),
  state: requiredString('State'),
  pincode: pincodeSchema.optional().or(z.literal('')),
  gstin: gstinSchema.optional().or(z.literal('')),
  /** Entered in rupees; converted to paise by the store. */
  creditLimit: z.number().nonnegative().optional(),
})

export type CustomerInput = z.infer<typeof customerSchema>

/* ----------------------------------------------------------------- vehicle */

export const vehicleSchema = z.object({
  registration: registrationSchema,
  manufacturer: requiredString('Manufacturer'),
  model: requiredString('Model'),
  variant: z.string().trim().optional(),
  fuelType: z.enum(['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']),
  transmission: z.enum(['Manual', 'Automatic', 'AMT', 'CVT']).optional(),
  colour: z.string().trim().optional(),
  manufacturingYear: z
    .number()
    .int()
    .min(1980, 'Year looks too early')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
    .optional(),
  vin: vinSchema.optional().or(z.literal('')),
  engineNumber: z.string().trim().optional(),
})

export type VehicleInput = z.infer<typeof vehicleSchema>

/* ---------------------------------------------------------------- job card */

export const jobCardSchema = z.object({
  customerId: requiredString('Customer'),
  vehicleId: requiredString('Vehicle'),
  serviceType: requiredString('Service type'),
  priority: z.enum(['Low', 'Normal', 'High', 'Urgent']).default('Normal'),
  complaintsText: requiredString('Customer complaint'),
  odometer: z
    .number({ invalid_type_error: 'Enter the odometer reading' })
    .int()
    .nonnegative('Odometer cannot be negative'),
  fuelLevel: z.enum(['E', '1/4', '1/2', '3/4', 'F']).default('1/2'),
  advisorId: requiredString('Service advisor'),
  expectedDelivery: z.union([z.string(), z.date()]).refine((v) => Boolean(v), {
    message: 'Expected delivery is required',
  }),
})

export type JobCardInput = z.infer<typeof jobCardSchema>

/* -------------------------------------------------------------- line items */

export const labourItemSchema = z.object({
  name: requiredString('Labour description'),
  quantity: z.number().positive('Hours must be greater than zero'),
  /** Rupees in the form; converted to paise on save. */
  rate: z.number().nonnegative('Rate cannot be negative'),
  discountPercent: z.number().min(0).max(100).default(0),
  taxRate: z.number().min(0).max(28).default(18),
})

export const partItemSchema = z.object({
  productId: requiredString('Product'),
  quantity: z.number().positive('Quantity must be greater than zero'),
  rate: z.number().nonnegative('Rate cannot be negative'),
  discountPercent: z.number().min(0).max(100).default(0),
})

export type LabourItemInput = z.infer<typeof labourItemSchema>
export type PartItemInput = z.infer<typeof partItemSchema>

/* ----------------------------------------------------------------- payment */

export const paymentSchema = z.object({
  amount: z.number().positive('Amount must be greater than zero'),
  mode: z.enum(['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque']),
  reference: z.string().trim().optional(),
})

export type PaymentInput = z.infer<typeof paymentSchema>

/* ---------------------------------------------------------------- delivery */

export const deliverySchema = z.object({
  vehicleCleaned: z.boolean().default(false),
  accessoriesReturned: z.boolean().default(false),
  documentsHanded: z.boolean().default(false),
  customerSatisfied: z.boolean().default(false),
  receivedBy: requiredString('Received by'),
})

export type DeliveryInput = z.infer<typeof deliverySchema>

/* ------------------------------------------------------------ assignment */

export const assignmentSchema = z.object({
  technicianId: requiredString('Technician'),
  bay: z.string().trim().optional(),
})

export type AssignmentInput = z.infer<typeof assignmentSchema>
