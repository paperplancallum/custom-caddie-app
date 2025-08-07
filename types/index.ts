export type SetType = 'A' | 'B' | 'C' | 'custom';

export interface CustomizerState {
  selectedSet: SetType;
  items: {
    golfBalls: {
      included: boolean;
      quantity: number;
      customization: {
        type: 'name' | 'signature' | 'both';
        text: string;
        font: string;
        color: string;
      };
    };
    tees: {
      included: boolean;
      quantity: number;
      color: string;
      customText: string;
    };
    divotTool: {
      included: boolean;
      engraving: string;
    };
    ballMarker: {
      included: boolean;
      type: 'metal' | 'leather';
      design: string;
    };
    towel: {
      included: boolean;
      color: string;
      embroideryColor: string;
      embroideryText: string;
      embroideryType: 'initials' | 'name' | 'logo';
    };
  };
  personalization: {
    firstName: string;
    middleName?: string;
    lastName: string;
    initials: string;
    logo?: File | null;
  };
  pricing: {
    basePrice: number;
    customizationFee: number;
    total: number;
  };
}

export interface Design {
  id: string;
  email?: string;
  designData: CustomizerState;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'completed';
  shareUrl?: string;
  editUrl?: string;
}

export interface Order {
  orderId: string;
  stripePaymentId: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  designId: string;
  items: CustomizerState['items'];
  totalAmount: number;
  status: 'pending' | 'paid' | 'production' | 'shipped' | 'delivered';
  createdAt: Date;
  trackingNumber?: string;
  notes?: string;
}

export interface Product {
  productId: string;
  name: string;
  basePrice: number;
  customizationOptions: {
    [key: string]: {
      name: string;
      price: number;
    }[];
  };
  inventoryCount: number;
  images: string[];
}

export interface CustomerInfo {
  email: string;
  name: string;
  phone?: string;
  shippingAddress: Order['shippingAddress'];
}

export interface CheckoutSession {
  designId: string;
  customer: CustomerInfo;
  amount: number;
  items: CustomizerState['items'];
}

export interface PresetSet {
  id: SetType;
  name: string;
  description: string;
  price: number;
  image: string;
  includes: string[];
  popular?: boolean;
}