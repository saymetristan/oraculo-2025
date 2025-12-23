import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })
  }
  return stripeInstance
}

export const PRODUCTS = {
  LECTURA_COMPLETA: {
    name: 'Lectura Completa',
    price: 499, // $4.99 en centavos
    description: 'Las 3 profecías + carta HD + veredicto completo + ritual de cierre',
  },
  PACK_MISTICO: {
    name: 'Pack Místico',
    price: 999, // $9.99 en centavos
    description: 'Todo incluido + PDF del ritual + Vision Board template',
  },
}
