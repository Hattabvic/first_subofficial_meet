import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { MapPin, Download, CheckCircle2, Calendar, Clock, Sparkles } from 'lucide-react';
import kittyCameraImg from '../assets/kitty-camera.png';
import bowPinkImg     from '../assets/bow-pink.png';
import CountdownTimer from './CountdownTimer.jsx';
import SecretEnvelope from './SecretEnvelope.jsx';

const MAPS_URL =
  'https://www.google.com/maps/dir/31.121896,29.7853956/' +
  'Ezz+Dekheila+Steel+Company+Club,+Ad+Dakhilah,+Dekhela,' +
  'Alexandria+Governorate+5312432/' +
  '@31.118271,29.7811664,3669m/' +
  'data=!3m2!1e3!4b1!4m10!4m9!1m1!4e1!1m5!1m1!' +
  '1s0x14f5ead61f6819c9:0xa6f61f3d9a96f55!2m2!1d29.7961227!2d31.11355!3e0' +
  '?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D';

// Clean SVG barcode with varied bar widths
function BarcodePattern() {
  const bars = [
    2, 1, 1, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3, 1
  ];
  let offset = 0;
  const unit = 3.2;
  const h = 38;
  const totalW = bars.reduce((acc, b) => acc + b * unit, 0);

  return (
    <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`} className="mx-auto opacity-75">
      {bars.map((w, idx) => {
        const x = offset;
        offset += w * unit;
        if (idx % 2 !== 0) return null; // space
        return <rect key={idx} x={x} y={0} width={w * unit - 0.8} height={h} fill="#3B2129" rx={1} />;
      })}
    </svg>
  );
}

export default function Stage4_Ticket() {
  const ticketRef      = useRef(null);
  const [saving,    setSaving]    = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastExit, setToastExit] = useState(false);

  // Initial celebratory burst
  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.35 },
      colors: ['#FF69B4', '#FFB3C6', '#FF85A2', '#FFFFFF', '#FFD700'],
    });
  }, []);

  // Save ticket image via html-to-image
  const handleSaveTicket = async () => {
    if (saving || !ticketRef.current) return;
    setSaving(true);

    try {
      const dataUrl = await toPng(ticketRef.current, {
        pixelRatio: 3,
        cacheBust:  true,
        fontEmbedCSS: `
          @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800;900&family=Marhey:wght@400;600;700&display=swap');
        `,
        style: {
          fontFamily: "'Alexandria', sans-serif",
        },
      });

      const link    = document.createElement('a');
      link.href     = dataUrl;
      link.download = 'تذكرة-للمستقبل.png';
      link.click();

      // Show toast
      setToastExit(false);
      setShowToast(true);
      setTimeout(() => {
        setToastExit(true);
        setTimeout(() => setShowToast(false), 350);
      }, 3000);
    } catch (err) {
      console.error('Save ticket error:', err);
      alert('حصل خطأ أثناء الحفظ، يرجى المحاولة مرة ثانية 🌸');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="stage-enter w-full pb-8">
      {/* ── Top Confetti Badge ── */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold font-alexandria bg-white/80 border border-blush-200 text-blush-700 shadow-sm">
          <Sparkles size={13} />
          <span>تم تأكيد الحجز الرسمي</span>
          <Sparkles size={13} />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          THE VIP TICKET CARD (Target for html-to-image capture)
          ════════════════════════════════════════════════════════════ */}
      <div
        id="ticket-card"
        ref={ticketRef}
        className="bg-white rounded-4xl border-2 border-blush-200/90 shadow-card-glow overflow-hidden relative"
      >
        {/* ── Top Header Section (Pink Luxury Banner) ── */}
        <div className="bg-gradient-to-br from-blush-500 via-blush-400 to-blush-300 p-4 sm:p-6 text-center text-white relative overflow-hidden">
          {/* Subtle light rings */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none" />

          {/* Hello Kitty with Camera posing */}
          <div className="relative z-10 flex justify-center mb-1">
            <img
              src={kittyCameraImg}
              alt="Hello Kitty with Camera"
              className="w-20 sm:w-24 h-auto drop-shadow-md floating-element"
            />
          </div>

          {/* Bow Badge */}
          <div className="flex justify-center mb-2">
            <img src={bowPinkImg} alt="bow" className="w-9 h-auto drop-shadow-sm brightness-125" />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-black font-marhey tracking-wide text-white drop-shadow-sm">
            Special ticket
          </h1>
          <p className="text-xs font-alexandria text-white/90 font-semibold tracking-wider mt-0.5">
            تذكرة للمستقبل ✨
          </p>

          {/* VIP Badge */}
          <div className="mt-3 inline-block bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/30 text-[11px] font-alexandria font-bold tracking-widest text-white">
            ★ VIP ACCESS • SPECIAL GUEST ★
          </div>
        </div>

        {/* ── Perforated Notches & Tear Line ── */}
        <div className="ticket-notch relative py-3 bg-blush-50/40">
          <div className="border-t-2 border-dashed border-blush-300/80 mx-8" />
        </div>

        {/* ── Ticket Body / Details ── */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-b from-blush-50/40 to-white">
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 sm:gap-4">
            {/* Date */}
            <div className="bg-white/80 p-3 sm:p-3.5 rounded-2xl border border-blush-100 shadow-sm">
              <div className="flex items-center gap-1.5 text-blush-500 text-[11px] font-alexandria font-semibold mb-1">
                <Calendar size={13} />
                <span>اليوم والتاريخ</span>
              </div>
              <p className="font-alexandria font-bold text-sm text-rose-charcoal">
                السبت
              </p>
              <p className="font-alexandria font-extrabold text-xs text-blush-600 mt-0.5">
                5 ديسمبر 2026
              </p>
            </div>

            {/* Time */}
            <div className="bg-white/80 p-3 sm:p-3.5 rounded-2xl border border-blush-100 shadow-sm">
              <div className="flex items-center gap-1.5 text-blush-500 text-[11px] font-alexandria font-semibold mb-1">
                <Clock size={13} />
                <span>الوقت المحدد</span>
              </div>
              <p className="font-alexandria font-bold text-sm text-rose-charcoal">
                4:00 عصراً
              </p>
              <p className="font-alexandria font-semibold text-[11px] text-blush-600 mt-0.5">
                وقت الغروب 🌅
              </p>
            </div>
          </div>

          {/* Location Details with Google Maps Button */}
          <div className="mt-4 bg-white/90 p-4 rounded-2xl border border-blush-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-alexandria font-bold text-blush-600 flex items-center gap-1">
                <MapPin size={13} /> المكان 
              </span>
              <span className="text-[10px] font-alexandria text-rose-charcoal/40 bg-blush-50 px-2 py-0.5 rounded-full">
                الإسكندرية
              </span>
            </div>

            <p className="font-alexandria font-bold text-xs text-rose-charcoal leading-relaxed mb-3">
             EZDK CLUB
            </p>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blush-500 to-blush-400 text-white font-alexandria font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-98 transition-all"
            >
              <MapPin size={14} className="stroke-[2.5]" />
              <span>عرض اللوكيشن على الخريطة 📍</span>
            </a>
          </div>
        </div>

        {/* ── Lower Perforated Tear Line ── */}
        <div className="ticket-notch relative py-2 bg-blush-50/30">
          <div className="border-t-2 border-dashed border-blush-300/80 mx-8" />
        </div>

        {/* ── Ticket Footer Stub ── */}
        <div className="px-4 sm:px-6 py-4 bg-blush-50/50 text-center">
          {/* Barcode graphic */}
          <BarcodePattern />

          {/* Serial Number */}
          <p className="text-[10px] font-alexandria tracking-[0.25em] text-rose-charcoal/50 mt-1.5 font-semibold">
            12-05-2026-FUTURE
          </p>

          {/* Warm closing note */}
          <div className="mt-3.5 bg-white/90 py-2 px-3 rounded-xl border border-blush-100 inline-block shadow-sm">
            <p className="text-xs font-alexandria font-medium text-rose-charcoal/80 leading-relaxed">
              مش عايز اقف في الشمس كتير
            </p>
          </div>
        </div>
      </div>
      {/* ═══════════════════ END TICKET CARD ═══════════════════ */}

      {/* ── Live Countdown Timer to Meeting ── */}
      <CountdownTimer />

      {/* ── Download CTA Button (Excluded from captured PNG) ── */}
      <div className="mt-5">
        <button
          onClick={handleSaveTicket}
          disabled={saving}
          className="w-full py-4 px-6 rounded-2xl font-alexandria font-bold text-sm text-white
                     bg-gradient-to-r from-blush-500 via-blush-500 to-blush-400
                     shadow-blush-md hover:shadow-blush-lg active:scale-[0.98]
                     flex items-center justify-center gap-2.5 transition-all duration-200
                     disabled:opacity-70 disabled:cursor-wait"
        >
          {saving ? (
            <>
              <span className="animate-spin text-lg">⏳</span>
              <span>جاري حفظ التذكرة بدقة عالية...</span>
            </>
          ) : (
            <>
              <Download size={18} className="stroke-[2.5]" />
              <span>حفظ التذكرة كصورة 📸</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] font-alexandria text-rose-charcoal/50 mt-2.5">
          * ستُحفظ كصورة واضحة وعالية الدقة (PNG) لمشاركتها والاحتفاظ بها 🎀
        </p>
      </div>

      {/* ── Secret Heartfelt Envelope ── */}
      <SecretEnvelope />

      {/* ── Toast Feedback Notification ── */}
      {showToast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5
                      px-5 py-3 rounded-2xl text-white font-alexandria font-bold text-xs
                      bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg ${
            toastExit ? 'toast-exit' : 'toast-enter'
          }`}
        >
          <CheckCircle2 size={16} className="stroke-[3]" />
          <span>تم حفظ التذكرة بنجاح في جهازك! 🎀</span>
        </div>
      )}
    </div>
  );
}
