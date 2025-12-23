'use client'

import { motion } from 'framer-motion'
import { ELEMENTS } from '@/lib/questions'

interface ElementSelectorProps {
  selected: string
  onSelect: (element: string) => void
}

export function ElementSelector({ selected, onSelect }: ElementSelectorProps) {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Title */}
      <motion.span
        className="text-gold font-display text-lg mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tu elemento
      </motion.span>

      <motion.h2
        className="font-display text-3xl md:text-4xl mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Elige el elemento que guiará tu 2025
      </motion.h2>

      <motion.p
        className="text-bronze font-body mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Confía en tu intuición. El que te llame, es el correcto.
      </motion.p>

      {/* Elements Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {ELEMENTS.map((element, index) => (
          <motion.button
            key={element.id}
            className={`
              relative p-6 md:p-8 border-2 transition-all duration-300
              ${selected === element.id 
                ? 'border-gold bg-gold/10' 
                : 'border-bronze/20 hover:border-bronze/40'
              }
            `}
            onClick={() => onSelect(element.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection indicator */}
            {selected === element.id && (
              <motion.div
                className="absolute top-3 right-3 w-3 h-3 bg-gold rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              />
            )}

            <span className="text-4xl md:text-5xl mb-4 block">{element.symbol}</span>
            <h3 className="font-display text-xl md:text-2xl mb-2">{element.name}</h3>
            <p className="font-body text-sm text-bronze">{element.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
