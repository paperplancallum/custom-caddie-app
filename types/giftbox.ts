export type GiftSet = 'executive' | 'signature';

export interface GiftBoxCustomization {
  // Who is receiving this gift?
  recipient: {
    name: string;
    initials: string; // Auto-generated
    relationship?: string; // e.g., "Dad", "Boss", "Friend"
  };
  
  // Set Selection
  set: GiftSet;
  
  // Design Style for all products (crest only now)
  designStyle: 'crest';
  
  // Crest specific options
  crestStyle?: 'heritage' | 'royal' | 'classic' | 'modern';
  crestTextType: 'initials' | 'firstName' | 'lastName' | 'custom';
  crestCustomText?: string;
  crestFont?: 'serif' | 'sans' | 'script' | 'gothic' | 'modern';
  crestTextSize?: number; // Size as percentage (e.g., 100 = normal size)
  
  // Individual Item Customization
  items: {
    golfBalls: {
      included: boolean;
      quantity: 6 | 12 | 24;
      personalization: {
        style: 'crest' | 'text';
        // Crest options
        crestSize?: number; // Size as percentage (100 = normal)
        // Text options
        lines?: 1 | 2;
        line1?: {
          type: 'fullName' | 'firstName' | 'lastName' | 'custom';
          text: string;
          font: 'classic' | 'modern' | 'script' | 'bold' | 'elegant';
          size: number; // Size in pixels
          textCase?: 'uppercase' | 'capitalize' | 'none';
        };
        line2?: {
          text: string;
          font: 'classic' | 'modern' | 'script' | 'bold' | 'elegant';
          size: number; // Size in pixels
          textCase?: 'uppercase' | 'capitalize' | 'none';
        };
      };
    };
    
    golfTees: {
      included: boolean;
      quantity: 25 | 50 | 100;
      color: 'natural';
      personalization: {
        type: 'initials' | 'name' | 'message' | 'date';
        text: string;
        fontSize?: number; // Font size in pixels (8-16)
        maxCharacters?: number; // Maximum character limit
      };
    };
    
    golfTowel: {
      included: boolean;
      color: 'navy' | 'black' | 'red';
      personalization: {
        type: 'initials' | 'name';
        text: string;
        position: 'corner';
        fontSize?: number; // 14-36px
        fontFamily?: 'classic' | 'modern' | 'script' | 'bold' | 'elegant';
      };
    };
    
    divotTool: {
      included: boolean;
      finish: 'silver'; // Fixed to silver only
      personalization: {
        crestSize?: number; // Size as percentage (50-150)
      };
    };
    
    ballMarker: {
      included: boolean;
      personalization: {
        crestSize?: number; // Size as percentage (50-150)
      };
    };
  };
  
  // Gift Options
  giftOptions: {
    occasion?: string; // Birthday, Retirement, Father's Day, etc.
    includeCard: boolean;
    cardMessage?: string;
    giftWrap: boolean;
  };
  
  quantity: number;
}

export const GIFT_SETS = {
  executive: {
    name: 'Executive Set',
    price: 149,
    includes: {
      golfBalls: true,
      golfTees: true,
      golfTowel: false,
      divotTool: true,
      ballMarker: false
    },
    golfBallQuantity: 4,
    golfTeeQuantity: 25,
    description: 'Essential items for the business golfer'
  },
  signature: {
    name: 'Signature Set',
    price: 249,
    includes: {
      golfBalls: true,
      golfTees: true,
      golfTowel: true,
      divotTool: true,
      ballMarker: true
    },
    golfBallQuantity: 8,
    golfTeeQuantity: 50,
    description: 'Complete collection with all accessories'
  }
}

export const OCCASIONS = [
  'Birthday',
  'Father\'s Day',
  'Retirement',
  'Christmas',
  'Corporate Gift',
  'Tournament Prize',
  'Thank You',
  'Just Because'
]

export const RELATIONSHIPS = [
  'Dad',
  'Husband',
  'Boss',
  'Friend',
  'Colleague',
  'Client',
  'Brother',
  'Grandfather'
]