import React, { useState, useRef, useCallback } from 'react';
import bowPinkImg from '../assets/bow-pink.png';
import tomWebm    from '../assets/tom.webm';
import tomMp4     from '../assets/tom.mp4';
import tomGif     from '../assets/tom-animated.gif';
import { Sparkles } from 'lucide-react';

const EVASIVE_LABELS = [
  'متأكدة؟ ',
  'فكري تاني ! ',
  'مفيش مفر يعني',
  'خلاص تمام شكلي لبست! ',
];

function randomOffset(maxDistance, minDistance) {
  if (maxDistance <= 0) return 0;

  const minimum = Math.min(minDistance, maxDistance);
  const offset = (Math.random() * 2 - 1) * maxDistance;
  return Math.abs(offset) < minimum
    ? (offset >= 0 ? minimum : -minimum)
    : offset;
}

export default function Stage2_Question({ onNext }) {
  const [labelIdx, setLabelIdx]         = useState(-1);
  const [btnPos, setBtnPos]             = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount]     = useState(0);
  const [shake, setShake]               = useState(false);
  const [notSureTaps, setNotSureTaps]   = useState(0);

  const zoneRef = useRef(null);
  const btnRef  = useRef(null);

  const isFinal = labelIdx >= EVASIVE_LABELS.length - 1;
  const currentLabel = labelIdx < 0 ? 'أكيد، مستعدة 🌸' : EVASIVE_LABELS[labelIdx];

  // When clicking "لسه مش متأكدة": Does NOT proceed! Just shakes playfully!
  const handleNotSureClick = (e) => {
    if (e && e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    setShake(true);
    setNotSureTaps(prev => prev + 1);

    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }

    setTimeout(() => {
      setShake(false);
    }, 400);
  };

  // Random position generator within bounds for the evasive button
  const moveButton = useCallback(() => {
    if (isFinal) {
      // Final state: Proceed to next stage!
      onNext();
      return;
    }

    if (zoneRef.current && btnRef.current) {
      const zoneRect = zoneRef.current.getBoundingClientRect();
      const btnRect  = btnRef.current.getBoundingClientRect();

      // Available margins
      const maxDeltaX = Math.max(0, (zoneRect.width - btnRect.width) / 2 - 10);
      const maxDeltaY = Math.max(0, (zoneRect.height - btnRect.height) / 2 - 10);

      setBtnPos({
        x: randomOffset(maxDeltaX, 40),
        y: randomOffset(maxDeltaY, 20),
      });
    }

    // Gentle haptic feedback if on mobile
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(30);
    }

    setLabelIdx(prev => prev + 1);
    setClickCount(c => c + 1);
  }, [isFinal, onNext]);

  return (
    <div className="stage-enter w-full pb-4">
      {/* ── Cute Bow Banner Header ── */}
      <div className="flex justify-center mb-2">
        <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-blush-200 shadow-sm flex items-center gap-2">
          <img src={bowPinkImg} alt="bow" className="w-5 h-auto" />
          <span className="text-xs font-alexandria font-semibold text-blush-700">
            الخطوة الثانية 🎀
          </span>
          <img src={bowPinkImg} alt="bow" className="w-5 h-auto" />
        </div>
      </div>

      {/* ── Main Question Card ── */}
      <div className="bg-white/90 backdrop-blur-xl rounded-4xl border border-blush-200/90 shadow-card-glow p-4 sm:p-6 relative overflow-hidden">
        {/* Glow corner circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blush-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blush-300/40 rounded-full blur-2xl pointer-events-none" />

        {/* ── Header with Tom Video (WebM / MP4 Looping Animation) ── */}
        <div className="text-center mt-1 mb-6">
          {/* Animated video container */}
          <div className="w-full max-w-[200px] sm:max-w-[240px] h-40 sm:h-48 mx-auto mb-3.5 rounded-3xl overflow-hidden border-2 border-blush-300/90 shadow-md bg-white flex items-center justify-center p-1">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            >
              <source src={tomWebm} type="video/webm" />
              <source src={tomMp4}  type="video/mp4" />
              <img
                src={tomGif}
                alt="توم الشرير"
                className="w-full h-full object-cover rounded-2xl"
              />
            </video>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-rose-charcoal font-marhey leading-relaxed">
            خطوة عشان ابقي واضح اهو
          </h1>
          <p className="mt-1.5 text-xs text-rose-charcoal/70 font-alexandria leading-relaxed max-w-xs mx-auto">
           اختاري موافقة علي اليوم ولا لا 
          </p>
        </div>

        {/* ── Choice 1: "لسه مش متأكدة" (غير شغال / لا يؤدي لشيء) ── */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleNotSureClick}
            onTouchStart={handleNotSureClick}
            className={`w-full min-h-12 py-3.5 px-4 sm:px-6 rounded-2xl font-alexandria font-bold text-sm text-white select-none
                       bg-gradient-to-r from-blush-400 via-blush-400 to-blush-300
                       shadow-sm hover:opacity-90 active:scale-[0.98]
                       flex items-center justify-center gap-2.5 transition-all duration-200 ${
                         shake ? 'animate-wiggle' : ''
                       }`}
          >
            <span>لسه مش متأكدة</span>
            <Sparkles size={16} className="text-white/80" />
          </button>

          {/* Feedback showing the button doesn't do anything */}
          {notSureTaps > 0 && (
            <p className="text-center text-[11px] font-alexandria font-bold text-blush-600 mt-2 animate-bounce">
              {notSureTaps === 1 && 'اومال ايه انا اللي مكلماك كل شوية'}
              {notSureTaps === 2 && 'مفيش غير حل واحد'}
              {notSureTaps >= 3 && 'بتدوسي هنا ليه تاني؟ الزرار التاني هو اللي هيعديكي! 🤭'}
            </p>
          )}
        </div>

        {/* Divider with cute text */}
        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-blush-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-alexandria text-rose-charcoal/40 bg-white px-2 rounded-full">
            أو
          </span>
          <div className="flex-grow border-t border-blush-200"></div>
        </div>

        {/* ── Choice 2: Evasive Playful Button (Moves on Tap/Click) ── */}
        <div
          ref={zoneRef}
          className="relative min-h-[120px] flex flex-col items-center justify-center p-2 rounded-2xl bg-blush-50/50 border border-blush-100/80 overflow-hidden"
        >
          <button
            ref={btnRef}
            onClick={moveButton}
            onTouchStart={(e) => {
              // On mobile: immediately trigger move on touch without waiting for click delay
              e.preventDefault();
              moveButton();
            }}
            style={{
              transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
              transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            className={`min-h-12 py-3 px-4 sm:px-6 rounded-2xl font-alexandria font-bold text-sm select-none shadow-sm transition-colors duration-200 flex items-center gap-2 ${
              isFinal
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md animate-bounce'
                : 'bg-white text-blush-600 border-2 border-blush-400 hover:bg-blush-50 active:bg-blush-100'
            }`}
          >
            <span>{currentLabel}</span>
          </button>

          {/* Interactive Hint */}
          <p className="mt-3 text-[11px] font-alexandria text-blush-400 text-center">
            {clickCount === 0 && ''}
            {clickCount > 0 && !isFinal && ''}
            {isFinal && ' مبروك دوسي عليه عشان توصلي للمرحلة اللي جيا'}
          </p>
        </div>
      </div>
    </div>
  );
}
