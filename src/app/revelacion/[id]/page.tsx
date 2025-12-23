'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useSearchParams } from 'next/navigation'
import { TarotCard } from '@/components/results/TarotCard'
import { ProphecyCard } from '@/components/results/ProphecyCard'
import { PaywallSection } from '@/components/results/PaywallSection'
import { OrnamentDivider } from '@/components/ui/OrnamentDivider'
import { ParticleEffect } from '@/components/ui/ParticleEffect'
import { Button } from '@/components/ui/Button'
import { OracleReading } from '@/lib/types'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RevelacionPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [reading, setReading] = useState<OracleReading | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if payment was successful
    if (searchParams.get('success') === 'true') {
      setIsPaid(true)
    }

    // Load reading from localStorage
    const storedReading = localStorage.getItem('oracle_reading')
    if (storedReading) {
      const parsed = JSON.parse(storedReading)
      if (parsed.id === params.id) {
        setReading(parsed)
      }
    }
  }, [params.id, searchParams])

  const handleUnlock = async (tier: 'lectura' | 'pack') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          readingId: reading?.id,
        }),
      })

      const { sessionId } = await response.json()
      
      const stripe = await stripePromise
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    const shareText = `✧ El Oráculo 2025 ✧\n\nMi carta: ${reading?.carta_nombre}\n\n"${reading?.veredicto}"\n\nDescubre tu lectura en:`
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Lectura del Oráculo 2025',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      alert('¡Enlace copiado al portapapeles!')
    }
  }

  if (!reading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-body text-bronze">Cargando tu lectura...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative">
      <ParticleEffect />

      {/* Header */}
      <section className="py-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-4xl text-gold">◈</span>
          <h1 className="font-display text-3xl md:text-4xl mt-4">Tu Revelación</h1>
          <p className="font-body text-bronze mt-2 italic">El Oráculo ha hablado</p>
        </motion.div>
      </section>

      {/* Tarot Card Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2
            className="font-display text-2xl mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tu Carta Personal
          </motion.h2>

          <TarotCard
            name={reading.carta_nombre}
            meaning={reading.carta_significado}
            imageBase64={reading.carta_imagen}
            isRevealed={true}
            isPremium={isPaid}
          />
        </div>
      </section>

      <OrnamentDivider symbol="✦" className="max-w-xl mx-auto" />

      {/* Veredicto Section */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="font-display text-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            El Veredicto de tu 2024
          </motion.h2>

          <motion.blockquote
            className="font-body text-xl md:text-2xl text-bronze italic leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            "{reading.veredicto}"
          </motion.blockquote>
        </div>
      </section>

      <OrnamentDivider symbol="◇" className="max-w-xl mx-auto" />

      {/* Profecías Section */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="font-display text-2xl mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Tus Profecías para 2025
          </motion.h2>

          <div className="space-y-6">
            {reading.profecias.map((prophecy, index) => (
              <ProphecyCard
                key={prophecy.numero}
                prophecy={prophecy}
                isLocked={prophecy.es_premium && !isPaid}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Elemento Section */}
      <section className="py-12 px-6 bg-cream-dark/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="font-display text-2xl mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tu Elemento: {reading.elemento.nombre}
          </motion.h2>
          
          <motion.p
            className="font-body text-bronze leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {reading.elemento.interpretacion}
          </motion.p>
        </div>
      </section>

      {/* Ritual de Cierre (Premium) */}
      {isPaid && reading.ritual_cierre && (
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="card-mystical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-display text-2xl mb-6 text-center">
                ✧ Ritual de Cierre ✧
              </h2>
              <p className="font-body text-bronze leading-relaxed whitespace-pre-line">
                {reading.ritual_cierre}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Paywall */}
      {!isPaid && (
        <PaywallSection onUnlock={handleUnlock} isLoading={isLoading} />
      )}

      {/* Share Section */}
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl mb-4">Comparte tu Lectura</h2>
          <p className="font-body text-bronze mb-6">
            Deja que otros descubran lo que el Oráculo tiene para ellos
          </p>
          <Button variant="secondary" onClick={handleShare}>
            Compartir ✧
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-bronze/10 text-center">
        <p className="text-bronze/60 font-sans text-sm">
          © 2024 El Oráculo. Que 2025 sea tu mejor año.
        </p>
      </footer>
    </main>
  )
}
