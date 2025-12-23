'use client'

import { motion } from 'framer-motion'
import { Question } from '@/lib/types'

interface QuestionCardProps {
  question: Question
  value: string
  onChange: (value: string) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({
  question,
  value,
  onChange,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between text-sm font-sans text-bronze/60 mb-2">
          <span>Pregunta {questionNumber} de {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-0.5 bg-bronze/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Title */}
      <motion.span
        className="text-gold font-display text-lg mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {question.title}
      </motion.span>

      <motion.h2
        className="font-display text-3xl md:text-4xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {question.subtitle}
      </motion.h2>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {question.type === 'short' ? (
          <input
            type="text"
            className="input-ritual text-2xl"
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={50}
            autoFocus
          />
        ) : (
          <textarea
            className="textarea-ritual"
            placeholder={question.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            rows={4}
            autoFocus
          />
        )}
      </motion.div>

      {/* Character count for long inputs */}
      {question.type === 'long' && (
        <motion.p
          className="mt-2 text-right text-sm text-bronze/40 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value.length}/500
        </motion.p>
      )}
    </motion.div>
  )
}
