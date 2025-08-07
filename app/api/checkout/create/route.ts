import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { designId, customerEmail, items, amount, setName } = body

    const session = await createCheckoutSession({
      designId,
      customerEmail,
      items,
      amount,
      setName,
    })

    return NextResponse.json({ 
      checkoutUrl: session.url,
      sessionId: session.id 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}