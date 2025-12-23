'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { OrnamentDivider } from '@/components/ui/OrnamentDivider'
import { ParticleEffect } from '@/components/ui/ParticleEffect'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticleEffect />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Mystical Symbol */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: 'spring' }}
          >
            <span className="text-6xl md:text-7xl text-gold">◈</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            El Oráculo
          </motion.h1>

          <motion.p
            className="font-display text-2xl md:text-3xl text-gold mb-4 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            2025
          </motion.p>

          <OrnamentDivider symbol="✦" />

          {/* Subtitle */}
          <motion.p
            className="font-body text-xl md:text-2xl text-bronze max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            El año termina, pero tu historia no. Antes de cerrar este capítulo, 
            permíteme ver lo que el tiempo ha tejido para ti.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link href="/ritual">
              <Button variant="primary" className="text-lg px-12 py-5">
                Iniciar mi Lectura
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicator */}
          <motion.p
            className="mt-8 text-sm text-bronze/60 font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            7 preguntas · 3 minutos · Tu carta personalizada
          </motion.p>
        </motion.div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 px-6 bg-cream-dark/30">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-display text-3xl md:text-4xl text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Lo que el Oráculo te revelará
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                symbol: '◇',
                title: 'Tu Carta Personal',
                description: 'Una carta de tarot única generada especialmente para ti, basada en tu año.',
              },
              {
                symbol: '✧',
                title: 'Veredicto de 2024',
                description: 'Un análisis directo y honesto de lo que este año significó en tu camino.',
              },
              {
                symbol: '◈',
                title: 'Profecías 2025',
                description: 'Tres visiones específicas sobre lo que el próximo año tiene guardado para ti.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card-mystical text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-4xl text-gold mb-4 block">{item.symbol}</span>
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="font-body text-bronze">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-display text-3xl md:text-4xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            El Ritual
          </motion.h2>

          <motion.p
            className="font-body text-lg text-bronze mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Un proceso simple pero poderoso. Responde con honestidad — 
            el Oráculo ve más allá de las palabras.
          </motion.p>

          <div className="space-y-8">
            {[
              'Reflexiona sobre tu 2024 a través de 7 preguntas',
              'El Oráculo analiza tus respuestas y tu elemento',
              'Recibe tu carta, veredicto y profecías personalizadas',
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="w-8 h-8 flex items-center justify-center border border-gold text-gold font-display text-sm">
                  {index + 1}
                </span>
                <span className="font-body text-lg">{step}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/ritual">
              <Button variant="gold" className="text-lg px-12 py-5">
                Comenzar el Ritual
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-bronze/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-bronze/60 font-sans text-sm">
            © 2024 El Oráculo. Una experiencia de fin de año.
          </p>
        </div>
      </footer>
    </main>
  )
}
