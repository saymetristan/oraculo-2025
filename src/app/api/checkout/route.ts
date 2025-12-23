import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRODUCTS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { tier, readingId } = await request.json()

    if (!tier || !readingId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const product = tier === 'pack' ? PRODUCTS.PACK_MISTICO : PRODUCTS.LECTURA_COMPLETA
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: ['https://via.placeholder.com/500x500?text=El+Oraculo+2025'],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/revelacion/${readingId}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/revelacion/${readingId}?cancelled=true`,
      metadata: {
        readingId,
        tier,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
