'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-2 border-bronze/20 border-t-gold rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function MysticalLoader() {
  const symbols = ['✧', '◈', '✦', '◇']
  
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        <motion.div
          className="w-32 h-32 border border-gold/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 border border-bronze/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 border border-gold/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-3xl text-gold"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ◈
          </motion.span>
        </div>
      </div>
      
      <div className="flex space-x-4">
        {symbols.map((symbol, i) => (
          <motion.span
            key={i}
            className="text-xl text-gold/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>
      
      <motion.p
        className="font-body text-bronze italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        El Oráculo está leyendo tu destino...
      </motion.p>
    </div>
  )
}
