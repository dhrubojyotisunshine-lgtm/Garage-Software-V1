/**
 * Hand-authored screen definitions.
 *
 * Screens with no page in the reference set live here rather than in
 * definitions.generated.ts, which the Python generator overwrites wholesale.
 *
 * Membership is one such module: the reference product's menu did not expose
 * it, so its field set is derived from how garages actually run service plans —
 * a plan with a validity and included benefits, and customers enrolled against
 * a plan for a period.
 */

import type { ScreenDef } from './definitions.generated'

export const manualScreenDefs: Record<string, ScreenDef> = {
  'membership-plan-list': {
    title: 'Membership Plans',
    columns: [
      'Plan Name',
      'Code',
      'Validity',
      'Price',
      'Discount %',
      'Free Services',
      'Members',
      'Status',
    ],
    fields: [],
  },

  'membership-plan-add': {
    title: 'Add Membership Plan',
    columns: [],
    fields: [
      { name: 'name', label: 'Plan Name', type: 'text', required: true },
      { name: 'code', label: 'Plan Code', type: 'text', required: true },
      { name: 'vehicle_type', label: 'Applies To Vehicle Type', type: 'select' },
      { name: 'validity_months', label: 'Validity (Months)', type: 'select', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true },
      { name: 'tax_rate', label: 'Tax Rate', type: 'select' },
      { name: 'labour_discount', label: 'Labour Discount %', type: 'number' },
      { name: 'spare_discount', label: 'Spare Discount %', type: 'number' },
      { name: 'free_services', label: 'Free Services Included', type: 'number' },
      { name: 'free_pickup', label: 'Free Pickup & Drop', type: 'select' },
      { name: 'roadside_assistance', label: 'Roadside Assistance', type: 'select' },
      { name: 'benefits', label: 'Benefits', type: 'textarea' },
      { name: 'terms', label: 'Terms & Conditions', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select' },
    ],
  },

  'membership-list': {
    title: 'Members',
    columns: [
      'Membership No',
      'Customer',
      'Mobile',
      'Vehicle',
      'Plan',
      'Start Date',
      'Expiry Date',
      'Services Used',
      'Status',
    ],
    fields: [],
  },

  'membership-add': {
    title: 'Enrol Member',
    columns: [],
    fields: [
      { name: 'customer', label: 'Customer', type: 'select', required: true },
      { name: 'vehicle', label: 'Vehicle', type: 'select', required: true },
      { name: 'plan', label: 'Membership Plan', type: 'select', required: true },
      { name: 'membership_no', label: 'Membership No', type: 'text' },
      { name: 'start_date', label: 'Start Date', type: 'date', required: true },
      { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
      { name: 'amount', label: 'Amount Charged', type: 'number' },
      { name: 'payment_mode', label: 'Payment Mode', type: 'select' },
      { name: 'reference', label: 'Payment Reference', type: 'text' },
      { name: 'branch', label: 'Branch', type: 'select' },
      { name: 'auto_renew', label: 'Auto Renew', type: 'select' },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
  },

  'membership-renewal-list': {
    title: 'Renewals Due',
    columns: [
      'Membership No',
      'Customer',
      'Mobile',
      'Plan',
      'Expiry Date',
      'Days Left',
      'Last Reminder',
      'Status',
    ],
    fields: [],
  },
}
