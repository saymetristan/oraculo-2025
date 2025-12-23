'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface PaywallSectionProps {
  onUnlock: (tier: 'lectura' | 'pack') => void
  isLoading: boolean
}

export function PaywallSection({ onUnlock, isLoading }: PaywallSectionProps) {
  return (
    <motion.section
      className="py-16 px-6 bg-ink text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-4xl text-gold">✧</span>
        
        <h2 className="font-display text-3xl md:text-4xl mt-6 mb-4">
          Tu lectura completa te espera
        </h2>
        
        <p className="font-body text-cream/70 max-w-xl mx-auto mb-12">
          Has visto solo un fragmento de lo que el Oráculo tiene para ti. 
          Desbloquea las profecías restantes, tu carta en alta definición y el ritual de cierre.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Lectura Completa */}
          <div className="border border-gold/30 p-8 hover:border-gold transition-colors">
            <h3 className="font-display text-xl text-gold mb-2">Lectura Completa</h3>
            <p className="text-4xl font-display mb-4">$4.99 <span className="text-sm text-cream/60">USD</span></p>
            
            <ul className="text-left text-sm font-body text-cream/80 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Las 3 profecías desbloqueadas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Carta de tarot en alta resolución
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Veredicto completo del Oráculo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Ritual de cierre de año
              </li>
            </ul>

            <Button
              variant="secondary"
              onClick={() => onUnlock('lectura')}
              disabled={isLoading}
              className="w-full border-gold text-gold hover:bg-gold hover:text-ink"
            >
              {isLoading ? 'Procesando...' : 'Desbloquear'}
            </Button>
          </div>

          {/* Pack Místico */}
          <div className="border-2 border-gold p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-xs font-sans px-3 py-1 uppercase tracking-wider">
              Más Popular
            </div>
            
            <h3 className="font-display text-xl text-gold mb-2">Pack Místico</h3>
            <p className="text-4xl font-display mb-4">$9.99 <span className="text-sm text-cream/60">USD</span></p>
            
            <ul className="text-left text-sm font-body text-cream/80 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Todo de Lectura Completa
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> PDF del ritual imprimible
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Template de Vision Board 2025
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> Meditación guiada (audio)
              </li>
            </ul>

            <Button
              variant="gold"
              onClick={() => onUnlock('pack')}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Procesando...' : 'Obtener Pack'}
            </Button>
          </div>
        </div>

        <p className="mt-8 text-xs text-cream/40 font-sans">
          Pago seguro con Stripe. Acceso inmediato después del pago.
        </p>
      </div>
    </motion.section>
  )
}
