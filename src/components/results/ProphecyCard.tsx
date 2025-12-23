'use client'

import { motion } from 'framer-motion'
import { Profecia } from '@/lib/types'

interface ProphecyCardProps {
  prophecy: Profecia
  isLocked: boolean
  index: number
}

export function ProphecyCard({ prophecy, isLocked, index }: ProphecyCardProps) {
  return (
    <motion.div
      className={`card-mystical relative ${isLocked ? 'overflow-hidden' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15 }}
    >
      {/* Number */}
      <div className="flex items-start gap-4">
        <span className="w-8 h-8 flex items-center justify-center border border-gold text-gold font-display text-sm shrink-0">
          {prophecy.numero}
        </span>
        
        <div className="flex-1">
          <h3 className="font-display text-xl mb-2">{prophecy.titulo}</h3>
          
          {isLocked ? (
            <div className="relative">
              <p className="font-body text-bronze blur-sm select-none">
                {prophecy.contenido}
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-cream/80">
                <span className="text-gold">🔒</span>
              </div>
            </div>
          ) : (
            <p className="font-body text-bronze leading-relaxed">
              {prophecy.contenido}
            </p>
          )}
        </div>
      </div>

      {/* Premium indicator */}
      {isLocked && (
        <div className="absolute top-2 right-2">
          <span className="text-xs font-sans text-gold/60 uppercase tracking-wider">
            Premium
          </span>
        </div>
      )}
    </motion.div>
  )
}
