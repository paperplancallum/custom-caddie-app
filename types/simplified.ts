export type GiftSet = 'executive' | 'signature' | 'custom';

export interface SimplifiedCustomization {
  set: GiftSet;
  personalization: {
    name: string;
    initials: string; // Auto-generated from name
  };
  finish: 'gold' | 'silver' | 'black';
  quantity: 1 | 2 | 3;
}

export interface SimplifiedPricing {
  basePrice: number;
  quantity: number;
  total: number;
}

export const GIFT_SETS = {
  executive: {
    name: 'The Executive',
    price: 149,
    items: ['12 Premium Golf Balls', 'Leather Accessories', 'Personalized Engraving'],
    image: '/executive.jpg'
  },
  signature: {
    name: 'The Signature',
    price: 249,
    items: ['12 Premium Golf Balls', 'Leather Accessories', 'Golf Towel', 'Premium Gift Box'],
    image: '/signature.jpg'
  },
  custom: {
    name: 'Bespoke',
    price: 399,
    items: ['Full Customization', 'Consultation', 'Premium Materials'],
    image: '/custom.jpg'
  }
}