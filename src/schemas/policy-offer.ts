import { z } from 'zod';

export const policyOfferTypeSchema = z.enum(['Auto', 'Health', 'Home', 'Travel'], {
  error: 'Type is required',
});

export const policyOfferStatusSchema = z.enum(['Pending', 'Approved', 'Payment Required'], {
  error: 'Status is required',
});

export const policyOfferSchema = z.object({
  id: z.string().optional(),
  customer: z.string().min(1, { error: 'Customer is required' }),
  type: policyOfferTypeSchema,
  premium: z.string().min(1, { error: 'Premium is required' }),
  status: policyOfferStatusSchema,
});
