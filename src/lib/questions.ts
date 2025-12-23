import { Question } from './types'

export const QUESTIONS: Question[] = [
  {
    id: 'palabra',
    title: 'Una palabra',
    subtitle: '¿Qué palabra define tu 2024?',
    placeholder: 'Transición, caos, despertar...',
    type: 'short',
  },
  {
    id: 'victoria',
    title: 'Tu victoria',
    subtitle: '¿Cuál fue tu mayor logro este año?',
    placeholder: 'Puede ser grande o pequeño. Lo que importa es que fue tuyo.',
    type: 'long',
  },
  {
    id: 'soltar',
    title: 'Lo que soltaste',
    subtitle: '¿Qué dejaste ir finalmente?',
    placeholder: 'Una persona, una creencia, un miedo, un hábito...',
    type: 'long',
  },
  {
    id: 'riesgo',
    title: 'El riesgo',
    subtitle: '¿Qué riesgo tomaste... o evitaste?',
    placeholder: 'Sé honesto. Ambas respuestas revelan algo.',
    type: 'long',
  },
  {
    id: 'aprendizaje',
    title: 'La lección',
    subtitle: '¿Qué aprendiste sobre ti mismo?',
    placeholder: 'Algo que no sabías el 1 de enero.',
    type: 'long',
  },
  {
    id: 'manifestar',
    title: 'Tu intención',
    subtitle: '¿Qué quieres manifestar en 2025?',
    placeholder: 'No lo que "deberías" querer. Lo que realmente deseas.',
    type: 'long',
  },
  {
    id: 'elemento',
    title: 'Tu elemento',
    subtitle: 'Elige el elemento que guiará tu próximo año',
    placeholder: '',
    type: 'element',
  },
]

export const ELEMENTS = [
  {
    id: 'fuego',
    name: 'Fuego',
    symbol: '🔥',
    description: 'Transformación, pasión, acción',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'agua',
    name: 'Agua',
    symbol: '💧',
    description: 'Intuición, fluidez, emociones',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'tierra',
    name: 'Tierra',
    symbol: '🌍',
    description: 'Estabilidad, abundancia, raíces',
    color: 'from-green-600 to-emerald-700',
  },
  {
    id: 'aire',
    name: 'Aire',
    symbol: '💨',
    description: 'Libertad, claridad, comunicación',
    color: 'from-slate-300 to-slate-500',
  },
] as const
