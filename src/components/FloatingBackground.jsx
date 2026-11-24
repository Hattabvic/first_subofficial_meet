import React, { useEffect, useState } from 'react';

// Predefined ambient floating particles
const PARTICLES = [
  { id: 1,  symbol: '🌸', left: '8%',  duration: '18s', delay: '0s',  size: '1.2rem', opacity: 0.45 },
  { id: 2,  symbol: '💖', left: '22%', duration: '22s', delay: '4s',  size: '1rem',   opacity: 0.4 },
  { id: 3,  symbol: '✨', left: '38%', duration: '16s', delay: '2s',  size: '0.9rem', opacity: 0.5 },
  { id: 4,  symbol: '🌸', left: '55%', duration: '20s', delay: '7s',  size: '1.4rem', opacity: 0.35 },
  { id: 5,  symbol: '💕', left: '72%', duration: '24s', delay: '1s',  size: '1.1rem', opacity: 0.45 },
  { id: 6,  symbol: '🌸', left: '88%', duration: '19s', delay: '5s',  size: '1.3rem', opacity: 0.4 },
  { id: 7,  symbol: '✨', left: '15%', duration: '17s', delay: '9s',  size: '0.8rem', opacity: 0.4 },
  { id: 8,  symbol: '💖', left: '82%', duration: '21s', delay: '11s', size: '1rem',   opacity: 0.35 },
  { id: 9,  symbol: '🤨', left: '45%', duration: '23s', delay: '6s',  size: '1.2rem', opacity: 0.4 },
];

export default function FloatingBackground() {
  const [clickHearts, setClickHearts] = useState([]);

  // Spawn tap hearts on mobile tap or click
  useEffect(() => {
    const handleTap = (e) => {
      const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);
      if (x === null || y === null) return;

      const id = Date.now() + Math.random();
      const symbols = ['💖', '🌸', '✨', '💕', '🎀'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];

      setClickHearts((prev) => [...prev.slice(-12), { id, x, y, symbol }]);

      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1400);
    };

    window.addEventListener('click', handleTap);
    return () => window.removeEventListener('click', handleTap);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* ── Ambient upward drifting petals and hearts ── */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-[-40px] select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animation: `ambientFloat ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.symbol}
        </span>
      ))}

      {/* ── Tap Burst Hearts ── */}
      {clickHearts.map((h) => (
        <span
          key={h.id}
          className="fixed select-none float-heart"
          style={{
            left: `${h.x - 12}px`,
            top: `${h.y - 15}px`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
