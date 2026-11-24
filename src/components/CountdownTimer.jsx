import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TARGET_DATE = new Date('2026-12-05T16:00:00');

function getTimeRemaining() {
  const total = TARGET_DATE.getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days    = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, isPassed: false };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'أيام',   value: timeLeft.days },
    { label: 'ساعات',  value: timeLeft.hours },
    { label: 'دقائق',  value: timeLeft.minutes },
    { label: 'ثواني',  value: timeLeft.seconds },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-blush-200/90 shadow-sm mt-5">
      {/* Header */}
      <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2 mb-3 px-1">
        <span className="text-xs font-alexandria font-bold text-rose-charcoal flex items-center gap-1.5">
          <Clock size={14} className="text-blush-500" />
          <span>الوقت المتبقي حتى اللقاء</span>
        </span>
        <span className="text-[10px] font-alexandria text-blush-600 bg-blush-50 border border-blush-200 px-2.5 py-0.5 rounded-full font-semibold">
          5 ديسمبر 2026 ⏳
        </span>
      </div>

      {/* Grid of countdown boxes */}
      <div className="grid grid-cols-4 gap-1.5 min-[380px]:gap-2 text-center">
        {units.map((u, i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-blush-50 to-white rounded-2xl p-1.5 min-[380px]:p-2 border border-blush-100 shadow-sm flex flex-col items-center justify-center"
          >
            <span className="text-lg min-[380px]:text-xl sm:text-2xl font-black font-alexandria text-blush-600 tracking-tight leading-none">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] min-[380px]:text-[10px] font-alexandria text-rose-charcoal/60 font-medium mt-1">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
