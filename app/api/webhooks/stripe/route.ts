import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createOrderInAirtable } from '@/lib/airtable'
import { sendOrderConfirmation } from '@/lib/email'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Create order in Airtable
      const order = await createOrderInAirtable({
        stripePaymentId: session.payment_intent as string,
        designId: session.metadata?.designId || '',
        customer: {
          email: session.customer_details?.email || '',
          name: session.customer_details?.name || '',
          address: session.customer_details?.address || {},
        },
        amount: session.amount_total || 0,
      })

      // Send confirmation email
      await sendOrderConfirmation(
        session.customer_details?.email || '',
        {
          orderId: order.orderId,
          customerName: session.customer_details?.name || '',
          totalAmount: session.amount_total || 0,
          items: JSON.parse(session.metadata?.items || '{}'),
        }
      )

      console.log('Order created successfully:', order.orderId)
    } catch (error) {
      console.error('Error processing successful payment:', error)
      // Note: We still return 200 to acknowledge receipt of the webhook
    }
  }

  return NextResponse.json({ received: true })
}