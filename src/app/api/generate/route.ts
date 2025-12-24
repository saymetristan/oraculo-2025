import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/openai'
import { ORACLE_SYSTEM_PROMPT, buildUserPrompt, TAROT_IMAGE_PROMPT } from '@/lib/prompts'
import { RitualAnswers, OracleReading } from '@/lib/types'

// In-memory storage for readings (temporary solution)
// In production, use a database like Supabase or Redis
const readingsCache = new Map<string, OracleReading>()

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
      input: `${ORACLE_SYSTEM_PROMPT}\n\n${buildUserPrompt(answers)}\n\nResponde ÚNICAMENTE con el objeto JSON, sin texto adicional antes o después.`
    })

    // Parse the JSON response from output
    let readingData
    try {
      let outputText = textResponse.output_text || ''; // Use the helper

      if (!outputText) {
        // Fallback for manual parsing if helper is empty
        const textOutput = textResponse.output.find((item: any) => item.type === 'message');
        if (textOutput && 'content' in textOutput) {
          const textContent = textOutput.content?.find((c: any) => c.type === 'text');
          if (textContent && 'text' in textContent) {
            outputText = textContent.text;
          }
        }
      }
      
      // Clean any markdown code blocks if present
      outputText = outputText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      if (!outputText) {
        console.error('No text output found in response:', JSON.stringify(textResponse.output))
        throw new Error('No text content in response')
      }
      
      readingData = JSON.parse(outputText)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      console.error('Raw output:', JSON.stringify(textResponse.output))
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
        // gpt-image-1.5 always returns base64, no need for response_format
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

    // Store reading in cache
    readingsCache.set(id, reading)

    return NextResponse.json(reading)
  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve a reading by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Missing reading ID' },
      { status: 400 }
    )
  }

  const reading = readingsCache.get(id)

  if (!reading) {
    return NextResponse.json(
      { error: 'Reading not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(reading)
}
