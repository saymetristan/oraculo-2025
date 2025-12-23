import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { readingId, tier } = session.metadata || {}

      console.log(`Payment completed for reading ${readingId}, tier: ${tier}`)
      
      // Here you would typically:
      // 1. Update the reading in your database to mark it as paid
      // 2. Send a confirmation email
      // 3. Generate any additional content (PDFs, etc.)
      
      break
    }

    case 'payment_intent.succeeded': {
      console.log('Payment intent succeeded')
      break
    }

    case 'payment_intent.payment_failed': {
      console.log('Payment intent failed')
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
