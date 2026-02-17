import type { PolicyOffer } from '@/types';

export const POLICY_OFFERS: PolicyOffer[] = [
  { id: '1', customer: 'James Anderson', type: 'Auto', premium: '$1,450', status: 'Pending' },
  { id: '2', customer: 'Sophia Martinez', type: 'Health', premium: '$820', status: 'Approved' },
  { id: '3', customer: 'Liam Johnson', type: 'Home', premium: '$2,100', status: 'Payment Required' },
  { id: '4', customer: 'Emma Wilson', type: 'Travel', premium: '$120', status: 'Approved' },
  { id: '5', customer: 'Oliver Brown', type: 'Auto', premium: '$1,100', status: 'Pending' },
  { id: '6', customer: 'Isabella Garcia', type: 'Health', premium: '$950', status: 'Approved' },
];
