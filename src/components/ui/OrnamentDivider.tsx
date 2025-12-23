'use client'

import { motion } from 'framer-motion'

interface OrnamentDividerProps {
  symbol?: string
  className?: string
}

export function OrnamentDivider({ symbol = '✧', className = '' }: OrnamentDividerProps) {
  return (
    <motion.div 
      className={`divider-ornate ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-gold text-2xl">{symbol}</span>
    </motion.div>
  )
}
