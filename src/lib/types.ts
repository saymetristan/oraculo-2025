export interface RitualAnswers {
  palabra: string
  victoria: string
  soltar: string
  riesgo: string
  aprendizaje: string
  manifestar: string
  elemento: 'fuego' | 'agua' | 'tierra' | 'aire'
}

export interface Profecia {
  numero: number
  titulo: string
  contenido: string
  es_premium: boolean
}

export interface OracleReading {
  id: string
  veredicto: string
  carta_nombre: string
  carta_significado: string
  carta_imagen?: string
  profecias: Profecia[]
  elemento: {
    nombre: string
    interpretacion: string
  }
  ritual_cierre: string
  is_paid: boolean
  created_at: string
}

export interface Question {
  id: keyof RitualAnswers
  title: string
  subtitle: string
  placeholder: string
  type: 'short' | 'long' | 'element'
}
