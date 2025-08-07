import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { designId, customerEmail, items, amount, setName } = body

    console.log('Creating checkout session with:', { designId, amount, setName })

    const session = await createCheckoutSession({
      designId,
      customerEmail,
      items,
      amount,
      setName,
    })

    console.log('Stripe session created:', session.id, session.url)

    return NextResponse.json({ 
      checkoutUrl: session.url,
      sessionId: session.id 
    })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error.message 
      },
      { status: 500 }
    )
  }
}