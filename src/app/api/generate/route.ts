import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/openai'
import { ORACLE_SYSTEM_PROMPT, buildUserPrompt, TAROT_IMAGE_PROMPT } from '@/lib/prompts'
import { RitualAnswers, OracleReading } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const answers: RitualAnswers = await request.json()

    // Validate answers
    if (!answers.palabra || !answers.elemento) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const openai = getOpenAI()

    // Generate reading with GPT-5.2 using Responses API
    const textResponse = await openai.responses.create({
      model: 'gpt-5.2',
      input: `${ORACLE_SYSTEM_PROMPT}\n\n${buildUserPrompt(answers)}\n\nResponde ÚNICAMENTE con el objeto JSON, sin texto adicional antes o después.`,
      reasoning: {
        effort: 'medium'
      },
      text: {
        verbosity: 'medium'
      }
    })

    // Parse the JSON response from output
    let readingData
    try {
      // Extract text from response output
      const textOutput = textResponse.output.find((item: any) => item.type === 'text')
      let outputText = textOutput?.text || ''
      
      // Clean any markdown code blocks if present
      outputText = outputText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      readingData = JSON.parse(outputText)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      console.error('Raw output:', textResponse.output)
      return NextResponse.json(
        { error: 'Failed to parse oracle response' },
        { status: 500 }
      )
    }

    // Generate tarot card image with gpt-image-1.5
    const imagePrompt = TAROT_IMAGE_PROMPT(
      readingData.carta_nombre,
      answers.elemento,
      readingData.carta_significado
    )

    let imageBase64 = null
    try {
      const imageResponse = await openai.images.generate({
        model: 'gpt-image-1.5',
        prompt: imagePrompt,
        size: '1024x1536', // Portrait for tarot card
        quality: 'high',
        response_format: 'b64_json',
      })

      if (imageResponse.data && imageResponse.data[0]) {
        imageBase64 = imageResponse.data[0].b64_json
      }
    } catch (imageError) {
      console.error('Failed to generate image:', imageError)
      // Continue without image - we'll use a fallback
    }

    // Generate unique ID
    const id = `oracle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const reading: OracleReading = {
      id,
      veredicto: readingData.veredicto,
      carta_nombre: readingData.carta_nombre,
      carta_significado: readingData.carta_significado,
      carta_imagen: imageBase64 || undefined,
      profecias: readingData.profecias,
      elemento: readingData.elemento,
      ritual_cierre: readingData.ritual_cierre,
      is_paid: false,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(reading)
  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}
