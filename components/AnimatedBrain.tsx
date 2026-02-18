'use client';

import { useEffect, useState } from 'react';

export default function AnimatedBrain() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.dx;
          let newY = p.y + p.dy;
          let newDx = p.dx;
          let newDy = p.dy;

          if (newX <= 50 || newX >= 350) newDx = -newDx;
          if (newY <= 50 || newY >= 350) newDy = -newDy;

          newX = Math.max(50, Math.min(350, newX));
          newY = Math.max(50, Math.min(350, newY));

          return { ...p, x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 flex items-center justify-center mb-12">
      <svg width="400" height="400" className="drop-shadow-xl">
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Brain outline */}
        <circle cx="200" cy="200" r="140" fill="url(#brainGradient)" opacity="0.15" />
        <path
          d="M 200 80 Q 280 140 280 200 Q 280 280 200 320 Q 120 280 120 200 Q 120 140 200 80"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          opacity="0.4"
        />

        {/* Left hemisphere */}
        <path
          d="M 200 90 Q 160 120 160 180 Q 160 240 190 290"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Right hemisphere */}
        <path
          d="M 200 90 Q 240 120 240 180 Q 240 240 210 290"
          fill="none"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Connecting synapses */}
        {particles.map((p, idx) => {
          const nextP = particles[(idx + 1) % particles.length];
          const dist = Math.sqrt((p.x - nextP.x) ** 2 + (p.y - nextP.y) ** 2);
          if (dist < 80) {
            return (
              <line
                key={`line-${p.id}`}
                x1={p.x}
                y1={p.y}
                x2={nextP.x}
                y2={nextP.y}
                stroke="url(#brainGradient)"
                strokeWidth="1"
                opacity={0.3 * (1 - dist / 80)}
              />
            );
          }
          return null;
        })}

        {/* Particles (neurons) */}
        {particles.map((p) => (
          <g key={`particle-${p.id}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="url(#brainGradient)"
              filter="url(#glow)"
              className="animate-pulse"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="8"
              fill="url(#brainGradient)"
              opacity="0.1"
            />
          </g>
        ))}
      </svg>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
