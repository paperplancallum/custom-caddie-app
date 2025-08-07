# Custom Caddie - Product Requirement Document

## Executive Summary
Custom Caddie is a premium golf gift customization platform that allows customers to create personalized golf accessory sets with custom engraving, embroidery, and branding options.

## Tech Stack Recommendation

### Recommended Approach: Next.js + Stripe SDK + Airtable
**Why this combo works best:**
- **Next.js**: Perfect for the visual customization experience with SSR/SSG for SEO
- **Stripe SDK**: More control over the checkout flow and customer data
- **Airtable**: Excellent for order management with visual interface for non-technical staff

### Alternative: Shopify Custom App
- Use Shopify's infrastructure but build a custom frontend
- Leverage Shopify's order management, inventory, and fulfillment
- More expensive but less development overhead

## 1. Project Overview

### Vision
Create a seamless, visual-first customization experience for premium golf gifts that converts browsers into buyers through instant previews and simplified personalization.

### Goals
- 15% conversion rate from customizer to purchase
- < 3 minutes average customization time
- 4.8+ star customer satisfaction
- 30% repeat customer rate

### Success Metrics
- Customizer completion rate
- Cart abandonment rate
- Average order value
- Customer lifetime value
- Design approval rate

## 2. Technical Architecture

### Frontend (Next.js 14+)
```
/app
  /(marketing)
    /page.tsx                 # Landing page
    /about
    /reviews
  /(customizer)
    /customize/page.tsx       # Main customizer
    /customize/[setId]/page.tsx
    /preview/[orderId]/page.tsx
  /(checkout)
    /cart/page.tsx
    /success/page.tsx
  /api
    /create-checkout
    /save-design
    /generate-preview
    /webhook/stripe
```

### Backend Services
```javascript
// Key APIs needed
POST /api/designs          # Save customer design
GET  /api/designs/:id      # Retrieve saved design
POST /api/orders           # Create order after payment
POST /api/previews         # Generate product previews
POST /api/stripe/checkout  # Create Stripe session
POST /api/stripe/webhook   # Handle payment confirmation
```

### Database Schema (Airtable)

**Designs Table**
- id (auto)
- email
- design_data (JSON)
- created_at
- updated_at
- status (draft/completed)

**Orders Table**
- order_id
- stripe_payment_id
- customer_email
- customer_name
- shipping_address
- design_id (linked)
- items (JSON)
- total_amount
- status (pending/paid/production/shipped)
- created_at

**Products Table**
- product_id
- name
- base_price
- customization_options
- inventory_count

## 3. Core Features

### 3.1 Product Customizer

#### Visual Builder Interface
```typescript
interface CustomizerState {
  selectedSet: 'A' | 'B' | 'C' | 'custom';
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
    logo?: File;
  };
  pricing: {
    basePrice: number;
    customizationFee: number;
    total: number;
  };
}
```

#### Real-time Preview System
- Canvas-based rendering for instant updates
- Pre-rendered product images with overlay system
- WebGL for 3D product views (stretch goal)

#### Save & Share Functionality
```typescript
// Save design without account
const saveDesign = async (design: CustomizerState) => {
  const response = await fetch('/api/designs', {
    method: 'POST',
    body: JSON.stringify(design)
  });
  const { shareUrl, editUrl } = await response.json();
  return { shareUrl, editUrl };
};
```

### 3.2 Checkout Integration

#### Stripe SDK Implementation
```typescript
// Checkout flow
const handleCheckout = async () => {
  // 1. Save design to Airtable
  const design = await saveDesign(customizerState);
  
  // 2. Create Stripe checkout session
  const session = await fetch('/api/create-checkout', {
    method: 'POST',
    body: JSON.stringify({
      designId: design.id,
      items: customizerState.items,
      amount: customizerState.pricing.total
    })
  });
  
  // 3. Redirect to Stripe
  const { url } = await session.json();
  window.location.href = url;
};

// Webhook handler for order confirmation
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  
  if (event.type === 'checkout.session.completed') {
    // Create order in Airtable
    await createOrder({
      stripePaymentId: event.data.object.payment_intent,
      designId: event.data.object.metadata.designId,
      customer: event.data.object.customer_details,
      amount: event.data.object.amount_total
    });
    
    // Send confirmation email with design preview
    await sendOrderConfirmation(event.data.object.customer_email);
  }
}
```

### 3.3 Order Management (Airtable)

#### Airtable Integration
```typescript
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// Save design
export const saveDesignToAirtable = async (design: CustomizerState) => {
  const record = await base('Designs').create({
    'Email': design.email,
    'Design Data': JSON.stringify(design),
    'Status': 'Draft',
    'Created': new Date().toISOString()
  });
  return record.id;
};

// Create order after payment
export const createOrder = async (orderData: OrderData) => {
  const record = await base('Orders').create({
    'Order ID': generateOrderId(),
    'Stripe Payment ID': orderData.stripePaymentId,
    'Design': [orderData.designId],
    'Customer Email': orderData.customer.email,
    'Customer Name': orderData.customer.name,
    'Shipping Address': JSON.stringify(orderData.customer.address),
    'Total Amount': orderData.amount / 100,
    'Status': 'Paid',
    'Order Date': new Date().toISOString()
  });
  return record;
};
```

## 4. User Experience Flow

### Customer Journey
1. **Landing Page** → Product showcase with "Customize Now" CTA
2. **Set Selection** → Choose pre-built set or "Build Your Own"
3. **Customization** → Visual builder with real-time preview
4. **Personalization** → Add names, initials, logos
5. **Review** → Final preview with gift box visualization
6. **Checkout** → Stripe payment with shipping details
7. **Confirmation** → Order summary with tracking info

### Mobile Optimization
- Touch-optimized customizer controls
- Simplified mobile layout with accordion sections
- Progressive disclosure of options
- Swipe gestures for preview rotation

## 5. Component Library

### Key Components
```typescript
// Core customizer components
<SetSelector />           // Choose base set
<ItemCustomizer />        // Customize individual items
<PersonalizationPanel />  // Names and initials input
<ColorPicker />          // Color selection widget
<PreviewCanvas />        // Real-time preview
<PriceCalculator />      // Dynamic pricing display
<ShareModal />           // Share design functionality
<CheckoutButton />       // Stripe integration

// Supporting components
<ProductGallery />       // Image carousel
<ReviewCarousel />       // Customer testimonials
<FAQAccordion />        // Frequently asked questions
<GiftBoxPreview />      // 3D gift box visualization
```

## 6. API Endpoints

### Design Management
```typescript
// Save design
POST /api/designs
Body: { design: CustomizerState, email?: string }
Response: { id: string, shareUrl: string, editUrl: string }

// Get design
GET /api/designs/:id
Response: { design: CustomizerState, createdAt: Date }

// Update design
PUT /api/designs/:id
Body: { design: CustomizerState }
Response: { success: boolean }
```

### Order Processing
```typescript
// Create Stripe checkout
POST /api/checkout/create
Body: { designId: string, customer: CustomerInfo }
Response: { checkoutUrl: string, sessionId: string }

// Handle Stripe webhook
POST /api/webhooks/stripe
Body: Stripe Event
Response: { received: boolean }

// Get order status
GET /api/orders/:id
Response: { order: Order, trackingInfo?: TrackingInfo }
```

## 7. Third-Party Integrations

### Stripe Configuration
```javascript
// Product setup in Stripe
{
  "products": [
    {
      "id": "set_a",
      "name": "Custom Caddie Set A",
      "price": 4999,
      "metadata": {
        "includes": "balls,tees,divot,marker"
      }
    },
    {
      "id": "customization_fee",
      "name": "Personalization Fee",
      "price": 1000
    }
  ]
}
```

### Email Service (SendGrid/Resend)
- Order confirmation with design preview
- Production updates
- Shipping notifications
- Review requests post-delivery

### Image Processing (Sharp/Cloudinary)
- Generate product previews
- Resize and optimize images
- Create social sharing images
- PDF proof generation

## 8. Security & Performance

### Security Requirements
- PCI compliance (handled by Stripe)
- HTTPS everywhere
- Rate limiting on API endpoints
- Input sanitization for customization text
- CORS configuration for API access

### Performance Targets
- < 2s initial page load
- < 100ms preview updates
- < 500ms design save
- 99.9% uptime
- CDN for static assets

## 9. Analytics & Tracking

### Key Events to Track
```javascript
// Google Analytics 4 / Mixpanel events
track('customizer_started', { set_type: 'A' });
track('item_customized', { item: 'golf_balls', options: {...} });
track('design_saved', { design_id: '123' });
track('checkout_initiated', { value: 99.99 });
track('purchase_completed', { order_id: '456', value: 99.99 });
track('design_shared', { method: 'email' });
```

### Conversion Funnel
1. Landing page view
2. Customizer opened
3. Customization completed
4. Checkout initiated
5. Purchase completed

## 10. Development Phases

### Phase 1: MVP (4 weeks)
- Basic customizer with text personalization
- Three pre-built sets
- Stripe checkout integration
- Order management in Airtable
- Email confirmations

### Phase 2: Enhanced Experience (3 weeks)
- Real-time preview system
- Save and share functionality
- Mobile optimization
- Customer accounts
- Order tracking

### Phase 3: Advanced Features (4 weeks)
- Logo upload and processing
- 3D product previews
- AR preview capability
- Bulk ordering
- Gift messaging

### Phase 4: Scale & Optimize (Ongoing)
- A/B testing framework
- Performance optimization
- International shipping
- Multiple languages
- B2B portal

## 11. Testing Strategy

### Unit Tests
- Customizer state management
- Price calculation logic
- API endpoint validation

### Integration Tests
- Stripe payment flow
- Airtable synchronization
- Email delivery

### E2E Tests
- Complete customer journey
- Mobile responsiveness
- Cross-browser compatibility

### User Testing
- Usability testing with 10+ users
- A/B test different customizer layouts
- Conversion rate optimization

## 12. Launch Strategy

### Soft Launch (Week 1)
- Friends and family beta
- 50% discount for first 100 customers
- Gather feedback and iterate

### Public Launch (Week 2-4)
- Press release to golf publications
- Influencer partnerships
- Google Ads campaign
- Social media advertising

### Post-Launch (Ongoing)
- Customer feedback integration
- Feature requests prioritization
- Performance monitoring
- Conversion optimization

## Appendix A: Environment Variables

```env
# Next.js
NEXT_PUBLIC_SITE_URL=https://customcaddie.com

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Airtable
AIRTABLE_API_KEY=xxx
AIRTABLE_BASE_ID=xxx

# Email Service
SENDGRID_API_KEY=xxx
FROM_EMAIL=orders@customcaddie.com

# Analytics
NEXT_PUBLIC_GA_ID=G-xxx
MIXPANEL_TOKEN=xxx

# Image Processing
CLOUDINARY_URL=xxx
```

## Appendix B: Deployment Architecture

```yaml
# Vercel deployment
framework: nextjs
buildCommand: npm run build
outputDirectory: .next
environmentVariables:
  - STRIPE_SECRET_KEY
  - AIRTABLE_API_KEY
  
# CDN Configuration
cdn:
  provider: Cloudflare
  caching:
    - /images/*: 1 year
    - /_next/static/*: 1 year
    - /api/*: no-cache
```