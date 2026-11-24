/**
 * HelloKittySVG.jsx
 * Custom SVG components:
 *   - KittiBow        : Full decorative Hello Kitty-style bow
 *   - SmallBow        : Compact bow for inline / icon use
 *   - KittiCharacter  : Kawaii minimalist cat character (peeking/sitting)
 *   - BarcodeGraphic  : Minimalist barcode for the ticket footer
 */

import React from 'react';

/* ───────────────────────────────────────────────────────────── */
/* KittiBow — large decorative bow                               */
/* ───────────────────────────────────────────────────────────── */
export const KittiBow = ({ size = 72, className = '' }) => {
  const h = size * 0.62;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="فيونكة"
    >
      {/* Left wing outer */}
      <ellipse cx="28" cy="37" rx="27" ry="20" fill="#FF69B4" />
      {/* Left wing inner highlight */}
      <ellipse cx="24" cy="33" rx="16" ry="12" fill="#FFB3C6" opacity="0.65" />
      {/* Left shine */}
      <ellipse cx="18" cy="27" rx="6" ry="3.5" fill="white" opacity="0.45" />

      {/* Right wing outer */}
      <ellipse cx="92" cy="37" rx="27" ry="20" fill="#FF69B4" />
      {/* Right wing inner highlight */}
      <ellipse cx="96" cy="33" rx="16" ry="12" fill="#FFB3C6" opacity="0.65" />
      {/* Right shine */}
      <ellipse cx="102" cy="27" rx="6" ry="3.5" fill="white" opacity="0.45" />

      {/* Center knot */}
      <ellipse cx="60" cy="37" rx="14" ry="14" fill="#FF69B4" />
      <ellipse cx="60" cy="37" rx="8"  ry="9"  fill="#FF85A2" />
      <circle  cx="60" cy="34" r="3"            fill="white"   opacity="0.4" />
    </svg>
  );
};

/* ───────────────────────────────────────────────────────────── */
/* SmallBow — compact variant for icons / headers               */
/* ───────────────────────────────────────────────────────────── */
export const SmallBow = ({ size = 36, className = '' }) => {
  const h = size * 0.62;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="28" cy="37" rx="27" ry="20" fill="#FF69B4" />
      <ellipse cx="24" cy="33" rx="16" ry="12" fill="#FFB3C6" opacity="0.65" />
      <ellipse cx="18" cy="27" rx="6"  ry="3.5" fill="white"  opacity="0.45" />
      <ellipse cx="92" cy="37" rx="27" ry="20" fill="#FF69B4" />
      <ellipse cx="96" cy="33" rx="16" ry="12" fill="#FFB3C6" opacity="0.65" />
      <ellipse cx="102" cy="27" rx="6" ry="3.5" fill="white"  opacity="0.45" />
      <ellipse cx="60" cy="37" rx="14" ry="14" fill="#FF69B4" />
      <ellipse cx="60" cy="37" rx="8"  ry="9"  fill="#FF85A2" />
      <circle  cx="60" cy="34" r="3"            fill="white"   opacity="0.4" />
    </svg>
  );
};

/* ───────────────────────────────────────────────────────────── */
/* KittiCharacter — kawaii cat sitting warmly                    */
/* ───────────────────────────────────────────────────────────── */
export const KittiCharacter = ({ size = 110, className = '' }) => {
  const h = size * 1.18;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="شخصية كيتي"
    >
      {/* ── Body ── */}
      <ellipse cx="55" cy="104" rx="30" ry="23" fill="#FFE8F0" />

      {/* ── Dress (skirt overlay) ── */}
      <path
        d="M28 96 Q55 118 82 96 Q82 124 28 124 Z"
        fill="#FF85A2"
        opacity="0.85"
      />

      {/* ── Dress bow detail ── */}
      {/* left petal */}
      <ellipse cx="44" cy="100" rx="7"  ry="4.5" fill="#FF69B4" />
      {/* right petal */}
      <ellipse cx="66" cy="100" rx="7"  ry="4.5" fill="#FF69B4" />
      {/* center knot */}
      <circle  cx="55" cy="100" r="4.5"           fill="#FF85A2" />

      {/* ── Arms ── */}
      <ellipse cx="24" cy="90" rx="9" ry="15" fill="#FFE8F0" transform="rotate(-12 24 90)" />
      <ellipse cx="86" cy="90" rx="9" ry="15" fill="#FFE8F0" transform="rotate(12 86 90)" />

      {/* ── Head ── */}
      <ellipse cx="55" cy="50" rx="32" ry="30" fill="#FFF0F5" />

      {/* ── Ears ── */}
      <path d="M25 30 L16 10 L38 24 Z" fill="#FFF0F5" />
      <path d="M85 30 L94 10 L72 24 Z" fill="#FFF0F5" />
      {/* inner ear pink */}
      <path d="M27 28 L20 15 L35 24 Z" fill="#FFD1DC" />
      <path d="M83 28 L90 15 L75 24 Z" fill="#FFD1DC" />

      {/* ── Hair bow (top-right) ── */}
      {/* left petal */}
      <ellipse cx="74" cy="17" rx="11" ry="7.5" fill="#FF69B4" />
      {/* right petal */}
      <ellipse cx="88" cy="17" rx="11" ry="7.5" fill="#FF69B4" />
      {/* highlight */}
      <ellipse cx="74" cy="14" rx="7"  ry="4"   fill="#FFB3C6" opacity="0.6" />
      {/* center */}
      <circle  cx="81" cy="17" r="6"             fill="#FF85A2" />
      <circle  cx="81" cy="15" r="2.5"           fill="white"   opacity="0.4" />

      {/* ── Eyes ── */}
      <ellipse cx="41" cy="50" rx="5.5" ry="6.5" fill="#4A2C36" />
      <ellipse cx="69" cy="50" rx="5.5" ry="6.5" fill="#4A2C36" />
      {/* eye shine */}
      <circle  cx="43" cy="47" r="2"              fill="white" />
      <circle  cx="71" cy="47" r="2"              fill="white" />

      {/* ── Nose ── */}
      <ellipse cx="55" cy="59" rx="4.5" ry="2.8" fill="#FF85A2" />

      {/* ── Whiskers ── */}
      <line x1="15" y1="54" x2="40" y2="57" stroke="#4A2C36" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="15" y1="60" x2="40" y2="60" stroke="#4A2C36" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="70" y1="57" x2="95" y2="54" stroke="#4A2C36" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="70" y1="60" x2="95" y2="60" stroke="#4A2C36" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

      {/* ── Blush cheeks ── */}
      <ellipse cx="31" cy="62" rx="8" ry="5" fill="#FFB3C6" opacity="0.5" />
      <ellipse cx="79" cy="62" rx="8" ry="5" fill="#FFB3C6" opacity="0.5" />

      {/* ── Mouth (subtle) ── */}
      <path d="M49 67 Q55 72 61 67" stroke="#4A2C36" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
};

/* ───────────────────────────────────────────────────────────── */
/* BarcodeGraphic — minimalist barcode for ticket footer         */
/* ───────────────────────────────────────────────────────────── */
export const BarcodeGraphic = ({ className = '' }) => {
  // Hand-crafted bar pattern (alternating widths: 1=narrow, 2=medium, 3=wide)
  const pattern = [2,1,1,3,1,2,1,1,3,1,2,2,1,1,2,3,1,1,2,1,3,1,1,2,1,3,1,2,1,1,2,3,1];
  const unit    = 4;   // pixels per unit
  const height  = 44;
  let   x       = 0;
  const totalW  = pattern.reduce((s, w) => s + w * unit, 0);

  return (
    <svg
      width={totalW}
      height={height}
      viewBox={`0 0 ${totalW} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="barcode"
    >
      {pattern.map((w, i) => {
        const barX = x;
        x += w * unit;
        // Even indices → black bar; odd → gap (transparent)
        if (i % 2 !== 0) return null;
        return (
          <rect
            key={i}
            x={barX}
            y={0}
            width={w * unit - 1}
            height={height}
            fill="#4A2C36"
            opacity="0.72"
          />
        );
      })}
    </svg>
  );
};
