import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'El Oráculo 2025 | Tu Lectura Personal de Fin de Año',
  description: 'Descubre qué te depara el 2025. Una experiencia mística personalizada que analiza tu 2024 y te revela profecías para el nuevo año.',
  openGraph: {
    title: 'El Oráculo 2025 | Tu Lectura Personal de Fin de Año',
    description: 'Descubre qué te depara el 2025. Una experiencia mística personalizada.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Oráculo 2025',
    description: 'Descubre qué te depara el 2025.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
