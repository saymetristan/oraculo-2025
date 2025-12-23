import OpenAI from 'openai'

// Lazy initialization to avoid build-time errors
let openaiInstance: OpenAI | null = null

export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}
