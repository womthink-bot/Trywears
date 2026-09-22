import React from "react";

const MARQUEE_ITEMS = [
  "FACTORY DIRECT B2B WHOLESALE",
  "LOW MOQ 25 PCS / STYLE",
  "180+ GLOBAL GYMS & PROMOTIONS OUTFITTED",
  "RAPID 5-DAY TECH-PACK SAMPLES",
  "100% AQL 2.5 QUALITY INSPECTION",
  "EXPRESS AIR FREIGHT (DHL / FEDEX)",
  "FULL PRIVATE LABEL & CUSTOM WOVEN TAGGING",
  "MONTHLY CAPACITY: 50,000+ UNITS",
  "CERTIFIED COW-HIDE & 450GSM FRENCH TERRY"
];

export const SportsB2BMarquee: React.FC = () => {
  return (
    <div className="bg-[#E21D1D] text-white py-3.5 overflow-hidden border-y border-red-800 select-none shadow-lg relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 2 }).map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 shrink-0 pr-8">
            {MARQUEE_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase">
                  {item}
                </span>
                <span className="text-white/40 text-xs font-black">★</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
