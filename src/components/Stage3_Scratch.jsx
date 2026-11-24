import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import bowPinkImg from '../assets/bow-pink.png';
import { Sparkles, Eye, Wand2 } from 'lucide-react';

const BRUSH_RADIUS = 30;

export default function Stage3_Scratch({ onNext }) {
  const canvasRef      = useRef(null);
  const containerRef   = useRef(null);
  const isDrawingRef   = useRef(false);
  const lastPosRef     = useRef(null);
  const hasRevealedRef = useRef(false);
  const intervalRef    = useRef(null);

  const [scratchPct, setScratchPct]     = useState(0);
  const [hintVisible, setHintVisible]   = useState(true);
  const [isRevealed, setIsRevealed]     = useState(false);

  // Paint the metallic scratch foil on canvas
  const paintScratchLayer = useCallback((canvas) => {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;

    // 1. Base Metallic Champagne-Rose Gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,    '#FFADC2');
    grad.addColorStop(0.25, '#FF8AA6');
    grad.addColorStop(0.5,  '#FFD7E2');
    grad.addColorStop(0.75, '#FF94B0');
    grad.addColorStop(1,    '#FFA8BF');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. Diagonal Subtle Metallic Stripes Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 3;
    for (let x = -H; x < W + H; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }

    // 3. Subtle Inner Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, W - 20, H - 20);

    // 4. Center Holographic / Glitter Star Accents
    const cx = W / 2;
    const cy = H / 2;

    // Draw sparkle crosses
    const drawSparkle = (x, y, r) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.moveTo(x, y - r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.quadraticCurveTo(x, y, x, y + r);
      ctx.quadraticCurveTo(x, y, x - r, y);
      ctx.quadraticCurveTo(x, y, x, y - r);
      ctx.fill();
    };

    drawSparkle(cx - 90, cy - 35, 12);
    drawSparkle(cx + 90, cy - 35, 12);
    drawSparkle(cx - 105, cy + 30, 8);
    drawSparkle(cx + 105, cy + 30, 8);

    // Center Badge Circle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.beginPath();
    ctx.arc(cx, cy - 14, 28, 0, Math.PI * 2);
    ctx.fill();

    // Bow or Heart Icon in center
    ctx.font = '24px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎀', cx, cy - 14);

    // 5. Instruction Typography
    ctx.fillStyle = '#4A1D2B';
    ctx.font = 'bold 17px "Alexandria", sans-serif';
    ctx.fillText('امسح الكارت ياحمص', cx, cy + 30);

    ctx.fillStyle = 'rgba(74, 29, 43, 0.65)';
    ctx.font = '500 12px "Alexandria", sans-serif';

  }, []);

  // Initialize Canvas
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect    = container.getBoundingClientRect();
    const dpr     = window.devicePixelRatio || 1;
    canvas.width  = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Virtual dimensions for drawing
    canvas.virtualWidth  = rect.width;
    canvas.virtualHeight = rect.height;

    paintScratchLayer({
      getContext: () => ctx,
      width:  rect.width,
      height: rect.height,
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paintScratchLayer]);

  // Convert screen coordinates to canvas coordinates
  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches && e.touches.length > 0 ? e.touches[0] : e;
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    };
  };

  // Erase stroke between two points
  const drawErase = (x1, y1, x2, y2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH_RADIUS * 2;
    ctx.lineCap   = 'round';
    ctx.lineJoin  = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Circle at end to avoid jagged edges
    ctx.beginPath();
    ctx.arc(x2, y2, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Measure scratched percentage
  const checkProgress = useCallback(() => {
    if (hasRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx  = canvas.getContext('2d');
    const w    = canvas.width;
    const h    = canvas.height;
    const data = ctx.getImageData(0, 0, w, h).data;

    let cleared = 0;
    const sampleStep = 32; // Fast sampling
    const totalSamples = data.length / sampleStep;

    for (let i = 3; i < data.length; i += sampleStep) {
      if (data[i] < 128) cleared++;
    }

    const pct = Math.round((cleared / totalSamples) * 100);
    setScratchPct(pct);

    if (pct >= 45) {
      triggerFullReveal();
    }
  }, []);

  const triggerFullReveal = useCallback(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;
    setIsRevealed(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    // Fade out canvas
    if (canvasRef.current) {
      canvasRef.current.style.transition = 'opacity 0.6s ease';
      canvasRef.current.style.opacity = '0';
      canvasRef.current.style.pointerEvents = 'none';
    }

    // Celebratory confetti in pink, gold, white
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFB3C6', '#FFD1DC', '#FFD700', '#FFFFFF', '#FF85A2'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#FFFFFF'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#FFFFFF'],
      });
    }, 350);

    // Auto transition to ticket after celebration
    setTimeout(() => {
      onNext();
    }, 1800);
  }, [onNext]);

  const startDraw = (e) => {
    if (hasRevealedRef.current) return;
    if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
    isDrawingRef.current = true;
    setHintVisible(false);

    const pos = getPos(e);
    lastPosRef.current = pos;
    drawErase(pos.x, pos.y, pos.x, pos.y);

    if (!intervalRef.current) {
      intervalRef.current = setInterval(checkProgress, 180);
    }
  };

  const moveDraw = (e) => {
    if (!isDrawingRef.current || hasRevealedRef.current) return;
    if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();

    const pos = getPos(e);
    if (lastPosRef.current) {
      drawErase(lastPosRef.current.x, lastPosRef.current.y, pos.x, pos.y);
    }
    lastPosRef.current = pos;
  };

  const endDraw = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <div className="stage-enter w-full pb-4">
      {/* ── Header ── */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold font-alexandria bg-white/80 border border-blush-200 text-blush-700 shadow-sm mb-2.5">
          <img src={bowPinkImg} alt="bow" className="w-4 h-auto" />
          <span>الخطوة الثالثة </span>
        </div>
        <h1 className="text-2xl font-black text-rose-charcoal font-marhey leading-relaxed">
         هانت قربت توصل
        </h1>
      
      </div>

      {/* ── Scratch Card Outer Container ── */}
      <div className="bg-white/90 backdrop-blur-xl rounded-4xl border-2 border-blush-200/90 shadow-card-glow p-5 relative overflow-hidden">
        {/* Decorative corner stars */}
        <div className="flex justify-between items-center px-1 mb-3 text-xs font-alexandria font-semibold text-blush-600">
          <span className="flex items-center gap-1">
            <Sparkles size={14} /> 
          </span>
          <span className="text-[11px] bg-blush-100 px-2 py-0.5 rounded-full text-blush-700">
            VIP Pass
          </span>
        </div>

        {/* ── Interactive Canvas Frame ── */}
        <div
          ref={containerRef}
          className="relative w-full h-[220px] rounded-3xl overflow-hidden border-2 border-blush-300/80 shadow-inner select-none"
          style={{ touchAction: 'none' }}
        >
          {/* ── Secret Content Underneath ── */}
          <div className="absolute inset-0 bg-gradient-to-br from-blush-50 via-white to-blush-100 flex flex-col items-center justify-center p-4 text-center">
            {/* Soft background watermark */}
            <img
              src={bowPinkImg}
              alt="watermark"
              className="absolute w-44 h-auto opacity-10 pointer-events-none"
            />

            <div className="relative z-10">
              <span className="inline-block text-3xl mb-1 animate-bounce">
                🎉
              </span>
              <h2 className="text-xl font-black text-rose-charcoal font-marhey">
                تم كشف التذكرة بنجاح! 🎀
              </h2>
              <p className="text-xs text-blush-600 font-alexandria font-bold mt-1">
                جاري نقلك لتفاصيل الميعاد والمكان...
              </p>
              <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-white/90 rounded-full border border-blush-200 text-[11px] font-alexandria text-rose-charcoal/70 shadow-sm">
                <span>السبت، 5 ديسمبر 2026</span>
                <span>•</span>
                <span>4:00 عصراً</span>
              </div>
            </div>
          </div>

          {/* ── Interactive Scratch Canvas ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing w-full h-full"
            style={{ touchAction: 'none' }}
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={endDraw}
            onTouchCancel={endDraw}
          />

          {/* ── Hint Animation ── */}
          {hintVisible && !isRevealed && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-alexandria font-semibold text-rose-charcoal/80 border border-blush-200 shadow-sm animate-pulse flex items-center gap-1.5">
                <span>👆 اخربشي بإصبعك هنا</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Progress & Quick Actions ── */}
        <div className="mt-4 pt-3 border-t border-blush-100">
          <div className="flex items-center justify-between text-xs font-alexandria text-rose-charcoal/70 mb-2">
            <span>نسبة الخربشة:</span>
            <span className="font-bold text-blush-600">{scratchPct}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-blush-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blush-400 to-blush-500 rounded-full transition-all duration-200"
              style={{ width: `${Math.min(scratchPct * 2.2, 100)}%` }}
            />
          </div>

          {/* Auto Reveal Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={triggerFullReveal}
              className="inline-flex items-center gap-1.5 text-xs font-alexandria font-medium text-blush-600 hover:text-blush-700 bg-blush-50 hover:bg-blush-100 px-3.5 py-1.5 rounded-full border border-blush-200/80 transition-colors"
            >
              <Wand2 size={13} />
              <span>كشف الكارت تلقائياً ✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
