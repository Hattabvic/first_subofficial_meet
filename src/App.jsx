import React, { useState, useCallback } from 'react';
import Stage1_Terms      from './components/Stage1_Terms.jsx';
import Stage2_Question   from './components/Stage2_Question.jsx';
import Stage3_Scratch    from './components/Stage3_Scratch.jsx';
import Stage4_Ticket     from './components/Stage4_Ticket.jsx';
import FloatingBackground from './components/FloatingBackground.jsx';
import { ArrowRight }    from 'lucide-react';
import bowPinkImg        from './assets/bow-pink.png';

export default function App() {
  const [stage, setStage] = useState(0);

  const next = useCallback(() => setStage(s => Math.min(s + 1, 3)), []);
  const prev = useCallback(() => setStage(s => Math.max(s - 1, 0)), []);

  const stepLabels = [
    'الشروط',
    'السؤال',
    'الخربشة',
    'التذكرة',
  ];

  return (
    <div className="app-shell flex flex-col items-center justify-start px-3 select-none relative overflow-x-hidden">
      {/* ── Ambient Floating Hearts & Petals Background ── */}
      <FloatingBackground />

      {/* ── Top Bar with Back Button & Progress Dots ── */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between mb-3 px-1 h-10 relative z-10">
        {/* Back button */}
        {stage > 0 ? (
          <button
            onClick={prev}
            className="flex min-h-8 items-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-full text-xs font-semibold font-alexandria
                       text-rose-charcoal/80 bg-white/70 hover:bg-white hover:text-blush-600 active:scale-95
                       shadow-sm border border-blush-200/60 backdrop-blur-md transition-all duration-200"
            aria-label="الرجوع للخطوة السابقة"
          >
            <ArrowRight size={14} className="stroke-[2.5]" />
            <span className="hidden sm:inline">رجوع</span>
          </button>
        ) : (
          <div className="w-8 sm:w-16" />
        )}

        {/* Mini Step indicators */}
        <div aria-label="التقدم بين المراحل" className="flex items-center gap-1 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-blush-200/50 shadow-sm">
          {stepLabels.map((lbl, idx) => {
            const isActive = stage === idx;
            const isDone   = stage > idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  // Only allow clicking previous steps
                  if (idx < stage) setStage(idx);
                }}
                disabled={idx > stage}
                title={lbl}
                aria-label={`المرحلة ${idx + 1}: ${lbl}`}
                aria-current={isActive ? 'step' : undefined}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              >
                <span className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-6 h-6 bg-gradient-to-r from-blush-500 to-blush-400 text-white text-[11px] font-bold shadow-sm'
                    : isDone
                    ? 'w-5 h-5 bg-blush-200 text-blush-700 text-[10px] font-medium hover:bg-blush-300'
                    : 'w-2 h-2 bg-blush-200/80'
                }`}>
                  {isActive ? (idx + 1) : isDone ? '✓' : ''}
                </span>
              </button>
            );
          })}
          <span className="whitespace-nowrap text-[10px] font-semibold text-blush-700 sm:hidden">
            {stepLabels[stage]}
          </span>
        </div>

        {/* Small top bow */}
        <div className="w-8 sm:w-16 flex justify-end items-center">
          <img src={bowPinkImg} alt="Bow" className="w-6 h-auto drop-shadow-sm opacity-80" />
        </div>
      </header>

      {/* ── Dynamic Stage View ── */}
      <main key={stage} className="w-full max-w-md mx-auto relative z-10">
        {stage === 0 && <Stage1_Terms    onNext={next} />}
        {stage === 1 && <Stage2_Question onNext={next} onBack={prev} />}
        {stage === 2 && <Stage3_Scratch  onNext={next} onBack={prev} />}
        {stage === 3 && <Stage4_Ticket   onBack={prev} />}
      </main>

      {/* ── Soft Footer ── */}
      <footer className="mt-6 sm:mt-8 text-center relative z-10">
        <p className="text-xs text-blush-400 font-alexandria font-medium tracking-wide flex items-center justify-center gap-1.5 opacity-90">
          <span>صُنعت بكل حب ولطف</span>
          <img src={bowPinkImg} alt="bow" className="w-3.5 h-auto inline-block" />
        </p>
      </footer>
    </div>
  );
}
