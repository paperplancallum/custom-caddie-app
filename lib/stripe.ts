import Stripe from 'stripe'

// Only initialize Stripe if we have a key
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as any, // Use older stable API version
      typescript: true,
    })
  : null

export async function createCheckoutSession({
  designId,
  customerEmail,
  items,
  amount,
  setName,
}: {
  designId: string
  customerEmail: string
  items: any
  amount: number
  setName: string
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please check your environment variables.')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Custom Caddie ${setName}`,
            description: 'Personalized golf accessories with custom engraving and embroidery. Includes free shipping to US addresses.',
            images: ['https://custom-caddie-app.vercel.app/custom-caddie-logo.png'],
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/customize?canceled=true`,
    metadata: {
      designId,
      items: JSON.stringify(items),
      setType: setName,
    },
    shipping_address_collection: {
      allowed_countries: ['US'], // US only shipping
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0, // Free shipping
            currency: 'usd',
          },
          display_name: 'Free US Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
    ],
  })

  return session
}