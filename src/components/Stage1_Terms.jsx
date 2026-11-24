import React, { useState } from 'react';
import kittyHeadImg from '../assets/kitty-head.png';
import bowPinkImg   from '../assets/bow-pink.png';
import { Check, Sparkles } from 'lucide-react';

const BASIC_TERMS = [
  { id: 1, label: 'طرحة كاملة'   },
  { id: 2, label: 'كمام طويلة'  },
  { id: 3, label: 'جيبة / فستان' },
];

export default function Stage1_Terms({ onNext }) {
  const [checked, setChecked] = useState({});
  // Makeup slider starts at 100% so she has to interactively lower it to <= 50%
  const [makeupLevel, setMakeupLevel] = useState(100);

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isMakeupPassed = makeupLevel <= 50;
  
  // Count basic terms (max 3) + 1 if makeup <= 50%
  const checkedBasicCount = BASIC_TERMS.filter(t => checked[t.id]).length;
  const totalCompleted    = checkedBasicCount + (isMakeupPassed ? 1 : 0);
  const allChecked        = checkedBasicCount === 3 && isMakeupPassed;

  return (
    <div className="stage-enter w-full pb-4">
      {/* ── Hello Kitty Character Peeking Warmly ── */}
      <div className="relative flex justify-center -mb-7 z-10">
        <img
          src={kittyHeadImg}
          alt="Hello Kitty"
          className="w-36 h-auto drop-shadow-md floating-element transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ── Main Contract Card ── */}
      <div className="bg-white/90 backdrop-blur-xl rounded-4xl border border-blush-200/80 shadow-card-glow overflow-hidden pt-9 px-6 pb-6 relative">
        {/* Decorative corner accent */}
        <div className="absolute top-3 left-4 opacity-70">
          <img src={bowPinkImg} alt="bow" className="w-7 h-auto" />
        </div>
        <div className="absolute top-3 right-4 opacity-70">
          <img src={bowPinkImg} alt="bow" className="w-7 h-auto" />
        </div>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold font-alexandria bg-blush-100/90 text-blush-700 mb-2.5">
            الخطوة الأولى 🎀
          </span>
          <h1 className="text-xl font-extrabold text-rose-charcoal font-marhey leading-relaxed">
            الشروط للموافقة على الدعوة 📜🎀
          </h1>
          <p className="mt-1.5 text-xs text-rose-charcoal/70 font-alexandria font-normal">
            يرجى التأشير واستيفاء جميع البنود للمتابعة:
          </p>
        </div>

        {/* ── Checkbox Items 1, 2, 3 ── */}
        <div className="space-y-3">
          {BASIC_TERMS.map(term => {
            const isChecked = !!checked[term.id];
            return (
              <div
                key={term.id}
                onClick={() => toggle(term.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none active:scale-[0.98] ${
                  isChecked
                    ? 'bg-gradient-to-r from-blush-100/80 to-white/90 border-blush-400 shadow-sm'
                    : 'bg-white/60 hover:bg-white/90 border-blush-100 hover:border-blush-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{term.emoji}</span>
                  <div>
                    <h3 className={`font-alexandria font-bold text-sm transition-colors ${
                      isChecked ? 'text-blush-700 line-through opacity-80' : 'text-rose-charcoal'
                    }`}>
                      {term.label}
                    </h3>
                    <p className="text-[11px] font-alexandria text-rose-charcoal/50">
                      {term.desc}
                    </p>
                  </div>
                </div>

                {/* Custom Kawaii Checkbox */}
                <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked
                    ? 'bg-gradient-to-br from-blush-500 to-blush-400 border-blush-500 shadow-sm pop-check'
                    : 'border-blush-300 bg-white/80'
                }`}>
                  {isChecked && <Check size={16} className="text-white stroke-[3]" />}
                </div>
              </div>
            );
          })}

          {/* ── Term 4: Interactive Makeup Slider ("جمال رباني") ── */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 ${
            isMakeupPassed
              ? 'bg-gradient-to-br from-blush-100/70 via-white to-emerald-50/40 border-blush-400 shadow-sm'
              : 'bg-white/80 border-blush-200 shadow-sm'
          }`}>
            {/* Header of Item 4 */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">
                  {makeupLevel === 100 ? '💄' : isMakeupPassed ? '✨' : '💅'}
                </span>
                <div>
                  <h3 className="font-alexandria font-bold text-sm text-rose-charcoal flex items-center gap-1.5">
                    <span>جمال رباني</span>
                    <Sparkles size={13} className="text-blush-500" />
                  </h3>
                  <p className="text-[11px] font-alexandria text-rose-charcoal/50">
                    حددي نسبة المكياج 
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-2.5 py-1 rounded-xl text-xs font-alexandria font-bold flex items-center gap-1 ${
                isMakeupPassed
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  : 'bg-rose-100 text-rose-600 border border-rose-200'
              }`}>
                {isMakeupPassed ? (
                  <>
                    <Check size={13} className="stroke-[3]" />
                    <span>مقبول</span>
                  </>
                ) : (
                  <span>مرفوض</span>
                )}
              </div>
            </div>

            {/* Slider with Live Counter */}
            <div className="mt-3 bg-blush-50/60 p-3 rounded-xl border border-blush-100">
              <div className="flex justify-between items-center text-xs font-alexandria font-semibold mb-2">
                <span className="text-rose-charcoal/70">نسبة المكياج:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-alexandria ${
                  makeupLevel === 100
                    ? 'bg-rose-500 text-white animate-pulse'
                    : isMakeupPassed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-blush-400 text-white'
                }`}>
                  {makeupLevel}%
                </span>
              </div>

              {/* Custom Range Input */}
              <input
                type="range"
                min="1"
                max="100"
                value={makeupLevel}
                onChange={(e) => setMakeupLevel(Number(e.target.value))}
                className="w-full h-2.5 bg-blush-200 rounded-lg appearance-none cursor-pointer accent-blush-500"
              />

              <div className="flex justify-between text-[10px] font-alexandria text-rose-charcoal/40 mt-1 px-0.5">
                <span>100% (أوفر)</span>
                <span className="font-bold text-blush-600">50% (الحد الأقصى)</span>
                <span>1% (طبيعي 100%)</span>
              </div>
            </div>

            {/* Dynamic Playful Message Based on Level */}
            <div className="mt-2.5 text-center">
              {makeupLevel === 100 && (
                <p className="text-xs font-alexandria font-bold text-rose-500 animate-bounce">
                  قللي شوية! كده ده مش جمال رباني  
                </p>
              )}
              {makeupLevel > 50 && makeupLevel < 100 && (
                <p className="text-xs font-alexandria font-semibold text-blush-600">
                  كده لسه كتير سيكا.. قللي لـ 50% أو أقل عشان يتوافق عليه 
                </p>
              )}
              {isMakeupPassed && (
                <p className="text-xs font-alexandria font-bold text-emerald-600 flex items-center justify-center gap-1">
                  <span>كده تمام </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Progress Indicator ── */}
        <div className="mt-6 pt-4 border-t border-blush-100/80">
          <div className="flex justify-between items-center text-xs font-alexandria text-rose-charcoal/60 mb-2">
            <span>نسبة الاستيفاء:</span>
            <span className="font-bold text-blush-600">
              {allChecked ? 'مكتمل بنجاح! 🌸' : `${totalCompleted} من 4`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-blush-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-500 transition-all duration-400 ease-out"
              style={{ width: `${(totalCompleted / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Action Button ── */}
        <button
          onClick={allChecked ? onNext : undefined}
          disabled={!allChecked}
          className={`w-full mt-6 py-3.5 rounded-2xl font-alexandria font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            allChecked
              ? 'bg-gradient-to-r from-blush-500 via-blush-500 to-blush-400 text-white shadow-blush-md hover:shadow-blush-lg active:scale-95 btn-pulse'
              : 'bg-blush-200/70 text-blush-400/80 cursor-not-allowed'
          }`}
        >
          <span>{allChecked ? 'أوافق على جميع الشروط ' : 'أوافق على جميع الشروط'}</span>
          {allChecked && <img src={bowPinkImg} alt="bow" className="w-4 h-auto inline-block brightness-200" />}
        </button>

        {!allChecked && (
          <p className="text-center text-[11px] font-alexandria text-blush-400 mt-2.5">
            {!isMakeupPassed
              ? '* قللي نسبة المكياج في السلايدر  💕'
              : '* علّمي على باقي الشروط للمتابعة 💕'}
          </p>
        )}
      </div>
    </div>
  );
}
