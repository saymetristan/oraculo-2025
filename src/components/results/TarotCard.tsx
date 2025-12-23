'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TarotCardProps {
  name: string
  meaning: string
  imageBase64?: string
  isRevealed?: boolean
  isPremium?: boolean
}

export function TarotCard({
  name,
  meaning,
  imageBase64,
  isRevealed = false,
  isPremium = false,
}: TarotCardProps) {
  const [revealed, setRevealed] = useState(isRevealed)

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="tarot-card w-64 h-96 md:w-80 md:h-[480px] cursor-pointer"
        onClick={() => !revealed && setRevealed(true)}
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: revealed ? 0 : 180, opacity: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <div className="tarot-card-inner w-full h-full">
          {/* Card Back */}
          <div className="tarot-card-front w-full h-full bg-ink border-4 border-gold flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-6xl text-gold">◈</span>
              </motion.div>
              <p className="text-gold/60 font-display text-sm mt-4 italic">
                Toca para revelar
              </p>
            </div>
          </div>

          {/* Card Front */}
          <div className="tarot-card-back w-full h-full bg-cream border-4 border-gold overflow-hidden">
            {imageBase64 ? (
              <div className="relative w-full h-full">
                <Image
                  src={`data:image/png;base64,${imageBase64}`}
                  alt={name}
                  fill
                  className="object-cover"
                />
                {/* Overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                  <p className="text-cream font-display text-lg text-center">
                    {name}
                  </p>
                </div>
                {/* Watermark for non-premium */}
                {!isPremium && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-ink/50 px-4 py-2 rotate-[-15deg]">
                      <p className="text-cream/80 font-sans text-xs uppercase tracking-widest">
                        Vista Previa
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Fallback if no image
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-cream to-cream-dark">
                <span className="text-6xl text-gold mb-6">◇</span>
                <h3 className="font-display text-2xl text-center mb-2">{name}</h3>
                <p className="font-body text-sm text-bronze text-center italic">
                  {meaning}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Card Info */}
      <motion.div
        className="mt-6 text-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-display text-2xl mb-2">{name}</h3>
        <p className="font-body text-bronze italic">{meaning}</p>
      </motion.div>
    </div>
  )
}
