export type PolicyOfferType = 'Auto' | 'Health' | 'Home' | 'Travel';
export type PolicyOfferStatus = 'Pending' | 'Approved' | 'Payment Required';

export interface PolicyOffer {
  id: string;
  customer: string;
  type: PolicyOfferType;
  premium: string;
  status: PolicyOfferStatus;
}
