'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'gold'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    gold: 'btn-gold',
  }

  return (
    <motion.button
      type={type}
      className={`${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
