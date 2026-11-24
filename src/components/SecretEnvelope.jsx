import React, { useState } from "react";
import bowPinkImg from "../assets/bow-pink.png";
import { Heart, Sparkles, X } from "lucide-react";

export default function SecretEnvelope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 w-full">
      {/* ── Envelope Header Title ── */}
      <div className="text-center mb-2.5">
        <span className="text-xs font-alexandria font-bold text-blush-600 bg-white/80 px-3.5 py-1 rounded-full border border-blush-200 shadow-sm inline-flex items-center gap-1.5">
          <Heart size={12} className="fill-blush-500 text-blush-500" />
          <span>رسالة خاصة</span>
          <Heart size={12} className="fill-blush-500 text-blush-500" />
        </span>
      </div>

      {/* ── Interactive Envelope Container ── */}
      <div
        onClick={() => !isOpen && setIsOpen(true)}
        className={`relative w-full rounded-3xl transition-all duration-500 border-2 shadow-card-glow cursor-pointer select-none overflow-hidden ${
          isOpen
            ? "bg-gradient-to-b from-blush-50 via-white to-blush-50 border-blush-300 p-4 sm:p-6"
            : "bg-gradient-to-br from-blush-200 via-blush-100 to-blush-200 hover:from-blush-100 hover:to-blush-200 border-blush-300 p-4 sm:p-5 active:scale-98"
        }`}
      >
        {!isOpen ? (
          /* ── CLOSED ENVELOPE VIEW ── */
          <div className="flex flex-col items-center justify-center py-3 text-center">
            {/* Bow Seal */}
            <div className="relative mb-2">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center border-2 border-blush-300 shadow-sm">
                <img src={bowPinkImg} alt="Bow seal" className="w-8 h-auto" />
              </div>
              <span className="absolute -bottom-1 -right-1 text-base animate-pulse">
                💌
              </span>
            </div>

            <h4 className="font-marhey font-bold text-sm sm:text-base text-rose-charcoal mt-1">
              في كلمة أخيرة ليكي هنا.. 🎀
            </h4>
            <p className="text-[11px] font-alexandria text-blush-600 font-medium mt-1 flex items-center gap-1">
              <span>اضغطي لفتح الظرف وقراءة الرسالة</span>
              <Sparkles size={12} />
            </p>
          </div>
        ) : (
          /* ── OPEN LETTER VIEW ── */
          <div className="relative stage-enter">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-0 left-0 w-7 h-7 rounded-full bg-blush-100 hover:bg-blush-200 text-rose-charcoal/60 flex items-center justify-center transition-colors"
              title="إغلاق الظرف"
            >
              <X size={14} />
            </button>

            {/* Letter Header */}
            <div className="text-center mb-3">
              <img
                src={bowPinkImg}
                alt="bow"
                className="w-6 h-auto mx-auto mb-1 opacity-80"
              />
              <h3 className="font-marhey font-bold text-lg text-blush-600">
                كلمة ليك يحمص🌸
              </h3>
            </div>

            {/* Letter Content Card */}
            <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-blush-200/90 shadow-sm text-center">
              <p className="font-alexandria font-semibold text-xs leading-relaxed text-rose-charcoal/90"></p>

              <div className="mt-4 pt-3 border-t border-blush-100 flex items-center justify-center gap-1.5 text-blush-600 text-xs font-marhey">
                <span>
                  {" "}
                  حاولت اكون مختلف شوية المهم الطريقة تكون عجبتك هكون مبسوط لما
                  اشوفك و اجدد نيتي ليكي ولكن المره دي بشكل واضح ونحط النقط علي
                  الحروف عشان مش هحب اخسرك تاني{" "}
                </span>
                <Heart size={13} className="fill-blush-500 text-blush-500" />
              </div>
            </div>

            <p className="text-center text-[10px] font-alexandria text-rose-charcoal/40 mt-3">
              (يمكنك النقر على زر الإغلاق لإعادة طي الظرف 💌)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
