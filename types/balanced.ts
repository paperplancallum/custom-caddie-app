export type GiftSet = 'executive' | 'signature' | 'custom';

export interface BalancedCustomization {
  // Set Selection
  set: GiftSet;
  
  // Core Personalization
  personalization: {
    name: string;
    initials: string;
    customText?: string; // Optional message/quote
  };
  
  // Product Customization (simplified)
  products: {
    golfBalls: {
      personalizationType: 'initials' | 'name' | 'custom';
      font: 'classic' | 'modern' | 'script';
    };
    accessories: {
      finish: 'gold' | 'silver' | 'black';
      includeGiftBox: boolean;
    };
  };
  
  // Gift Options
  giftOptions: {
    isGift: boolean;
    giftMessage?: string;
    rushDelivery: boolean;
  };
  
  quantity: 1 | 2 | 3 | 4 | 5;
}

export const GIFT_SETS = {
  executive: {
    name: 'The Executive',
    price: 149,
    items: ['12 Premium Golf Balls', 'Leather Divot Tool', 'Metal Ball Marker', 'Premium Tees'],
    description: 'Essential elegance for the corporate golfer',
    image: '/executive.jpg'
  },
  signature: {
    name: 'The Signature',
    price: 249,
    items: ['12 Premium Golf Balls', 'Leather Divot Tool', 'Metal Ball Marker', 'Premium Tees', 'Golf Towel'],
    description: 'Our most popular complete collection',
    image: '/signature.jpg'
  },
  custom: {
    name: 'Bespoke Collection',
    price: 399,
    items: ['Choose Your Items', 'Full Customization', 'Premium Packaging'],
    description: 'Curated specifically for you',
    image: '/custom.jpg'
  }
}

export const FONT_STYLES = {
  classic: { 
    name: 'Classic', 
    className: 'font-serif',
    preview: 'Aa',
    description: 'Traditional & Timeless'
  },
  modern: { 
    name: 'Modern', 
    className: 'font-sans',
    preview: 'Aa',
    description: 'Clean & Contemporary'
  },
  script: { 
    name: 'Script', 
    className: 'font-serif italic',
    preview: 'Aa',
    description: 'Elegant & Refined'
  }
}