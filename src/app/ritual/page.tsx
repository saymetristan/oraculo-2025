'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { QuestionCard } from '@/components/ritual/QuestionCard'
import { ElementSelector } from '@/components/ritual/ElementSelector'
import { MysticalLoader } from '@/components/ui/LoadingSpinner'
import { QUESTIONS } from '@/lib/questions'
import { RitualAnswers } from '@/lib/types'

export default function RitualPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [answers, setAnswers] = useState<RitualAnswers>({
    palabra: '',
    victoria: '',
    soltar: '',
    riesgo: '',
    aprendizaje: '',
    manifestar: '',
    elemento: 'fuego',
  })

  const currentQuestion = QUESTIONS[currentStep]
  const isLastQuestion = currentStep === QUESTIONS.length - 1
  const isElementQuestion = currentQuestion?.type === 'element'

  const updateAnswer = useCallback((value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }, [currentQuestion?.id])

  const canProceed = () => {
    if (isElementQuestion) return true
    const currentValue = answers[currentQuestion.id as keyof RitualAnswers]
    return currentValue && currentValue.toString().trim().length > 0
  }

  const handleNext = async () => {
    if (!canProceed()) return

    if (isLastQuestion) {
      // Submit to API
      setIsLoading(true)
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        })

        if (!response.ok) throw new Error('Failed to generate reading')

        const data = await response.json()
        
        // Store reading in localStorage for the results page
        localStorage.setItem('oracle_reading', JSON.stringify(data))
        
        // Navigate to results
        router.push(`/revelacion/${data.id}`)
      } catch (error) {
        console.error('Error:', error)
        setIsLoading(false)
        alert('Hubo un error al generar tu lectura. Intenta de nuevo.')
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <MysticalLoader />
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-3xl text-gold">◈</span>
          <h1 className="font-display text-2xl mt-4">El Ritual</h1>
        </motion.div>

        {/* Question Content */}
        <AnimatePresence mode="wait">
          {isElementQuestion ? (
            <ElementSelector
              key="element"
              selected={answers.elemento}
              onSelect={(element) => setAnswers(prev => ({ ...prev, elemento: element as RitualAnswers['elemento'] }))}
            />
          ) : (
            <QuestionCard
              key={currentStep}
              question={currentQuestion}
              value={answers[currentQuestion.id as keyof RitualAnswers] as string}
              onChange={updateAnswer}
              questionNumber={currentStep + 1}
              totalQuestions={QUESTIONS.length}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleBack}
            className={`font-sans text-bronze hover:text-ink transition-colors ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            ← Anterior
          </button>

          <Button
            variant={isLastQuestion ? 'gold' : 'primary'}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {isLastQuestion ? 'Revelar mi Lectura' : 'Continuar →'}
          </Button>
        </motion.div>

        {/* Keyboard hint */}
        <motion.p
          className="text-center mt-8 text-sm text-bronze/40 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Presiona Enter para continuar
        </motion.p>
      </div>
    </main>
  )
}
