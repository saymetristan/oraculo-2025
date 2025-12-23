'use client'

import { useEffect, useState } from 'react'

export function ParticleEffect() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
