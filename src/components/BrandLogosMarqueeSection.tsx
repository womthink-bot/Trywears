import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Award, Factory, Sparkles, Globe2, ArrowRight } from "lucide-react";

// Clean, realistic dummy brand logos designed with authentic athletic & combat vector emblems
const BRAND_LOGOS = [
  {
    name: "VANGUARD ATHLETICS",
    category: "Pro Team Sports & Sublimation",
    country: "USA",
    svg: (
      <svg viewBox="0 0 180 45" className="h-9 w-auto fill-current">
        <path d="M12 8 L22 36 L16 36 L6 8 Z" />
        <path d="M26 8 L16 36 L22 36 L32 8 Z" />
        <text x="40" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="2.5">
          VANGUARD
        </text>
        <text x="40" y="38" fontFamily="monospace" fontWeight="700" fontSize="7" letterSpacing="3" opacity="0.6">
          ATHLETICS
        </text>
      </svg>
    )
  },
  {
    name: "KINETIC PRO LAB",
    category: "Compression & Activewear",
    country: "GERMANY",
    svg: (
      <svg viewBox="0 0 170 45" className="h-9 w-auto fill-current">
        <circle cx="16" cy="22" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M16 10 L24 22 L16 34 L8 22 Z" />
        <text x="36" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
          KINETIC<tspan fill="#E21D1D">PRO</tspan>
        </text>
        <text x="36" y="37" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3.5" opacity="0.6">
          PERFORMANCE LAB
        </text>
      </svg>
    )
  },
  {
    name: "TITAN COMBAT GEAR",
    category: "1.2mm Boxing & Fight Armor",
    country: "UK",
    svg: (
      <svg viewBox="0 0 160 45" className="h-9 w-auto fill-current">
        <path d="M8 8 L24 8 L24 14 L18 14 L18 36 L14 36 L14 14 L8 14 Z" />
        <text x="30" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="3">
          TITAN
        </text>
        <text x="30" y="38" fontFamily="monospace" fontWeight="700" fontSize="7" letterSpacing="3" opacity="0.6">
          COMBAT GEAR
        </text>
      </svg>
    )
  },
  {
    name: "AURA ACTIVEWEAR",
    category: "Seamless Ribbed Gym Sets",
    country: "DUBAI / UAE",
    svg: (
      <svg viewBox="0 0 150 45" className="h-9 w-auto fill-current">
        <path d="M8 36 L18 8 L28 36 L22 36 L18 24 L14 36 Z M18 14 L15 21 L21 21 Z" />
        <circle cx="28" cy="12" r="3" fill="#E21D1D" />
        <text x="36" y="27" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="4">
          AURA
        </text>
        <text x="36" y="37" fontFamily="monospace" fontWeight="600" fontSize="6.5" letterSpacing="3" opacity="0.6">
          ACTIVE STUDIO
        </text>
      </svg>
    )
  },
  {
    name: "VALKYRIE FIGHT CLUB",
    category: "Championship MMA & Boxing",
    country: "AUSTRALIA",
    svg: (
      <svg viewBox="0 0 185 45" className="h-9 w-auto fill-current">
        <path d="M6 10 L16 34 L26 10 L21 10 L16 25 L11 10 Z" />
        <path d="M16 6 L18 12 L14 12 Z" fill="#E21D1D" />
        <text x="34" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2.5">
          VALKYRIE
        </text>
        <text x="34" y="37" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3" opacity="0.6">
          FIGHT DIVISION
        </text>
      </svg>
    )
  },
  {
    name: "NOCTURNE STREETWEAR",
    category: "500 GSM Heavyweight Fleece",
    country: "FRANCE",
    svg: (
      <svg viewBox="0 0 180 45" className="h-9 w-auto fill-current">
        <rect x="6" y="10" width="20" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12 16 L20 28 M20 16 L12 28" stroke="currentColor" strokeWidth="2" />
        <text x="34" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2.5">
          NOCTURNE
        </text>
        <text x="34" y="37" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="4" opacity="0.6">
          PARIS ATELIER
        </text>
      </svg>
    )
  },
  {
    name: "COBALT APPAREL",
    category: "Tournament Match Kits",
    country: "CANADA",
    svg: (
      <svg viewBox="0 0 160 45" className="h-9 w-auto fill-current">
        <path d="M22 10 C14 10 8 16 8 23 C8 30 14 36 22 36 L24 36 L24 30 L22 30 C17 30 14 27 14 23 C14 19 17 16 22 16 L24 16 L24 10 Z" />
        <text x="32" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">
          COBALT
        </text>
        <text x="32" y="38" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3" opacity="0.6">
          SPORTSWEAR
        </text>
      </svg>
    )
  },
  {
    name: "AEROSTRIDE FIT",
    category: "Athletic Dri-Fit Tech",
    country: "JAPAN",
    svg: (
      <svg viewBox="0 0 175 45" className="h-9 w-auto fill-current">
        <path d="M6 26 C12 14 22 10 30 10 L26 16 C20 16 12 20 8 28 Z" fill="#E21D1D" />
        <path d="M12 34 C18 24 26 20 34 20 L30 26 C24 26 18 29 14 36 Z" />
        <text x="40" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
          AEROSTRIDE
        </text>
        <text x="40" y="37" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3" opacity="0.6">
          TOKYO SPEED LAB
        </text>
      </svg>
    )
  },
  {
    name: "IRONCLAD GYM WEAR",
    category: "Bodybuilding Heavy Cotton",
    country: "USA",
    svg: (
      <svg viewBox="0 0 170 45" className="h-9 w-auto fill-current">
        <polygon points="6,22 18,10 30,22 18,34" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="18" cy="22" r="4" fill="#E21D1D" />
        <text x="38" y="27" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="15" letterSpacing="2">
          IRONCLAD
        </text>
        <text x="38" y="37" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3.5" opacity="0.6">
          STRENGTH DIVISION
        </text>
      </svg>
    )
  },
  {
    name: "ZENITH MOTO LEATHER",
    category: "Full-Grain Leather Jackets",
    country: "ITALY",
    svg: (
      <svg viewBox="0 0 160 45" className="h-9 w-auto fill-current">
        <path d="M6 10 L26 10 L10 30 L26 30 L26 36 L6 36 L22 16 L6 16 Z" />
        <text x="34" y="28" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="3">
          ZENITH
        </text>
        <text x="34" y="38" fontFamily="monospace" fontWeight="700" fontSize="6.5" letterSpacing="3" opacity="0.6">
          MOTORWEAR
        </text>
      </svg>
    )
  }
];

const TICKER_STATEMENTS = [
  "★ DIRECT OEM/ODM CONTRACT MANUFACTURING FOR GLOBAL SPORTSWEAR LABELS & CHAMPIONSHIP FIGHT PROMOTIONS",
  "★ LOW MOQ 25 PIECES PER MODEL • 100% BESPOKE SIZING FROM YOUTH XS TO ADULT 5XL",
  "★ CERTIFIED ITALIAN ZERO-FADE SUBLIMATION INKS • 210°C MOLECULAR FIBER INFUSION",
  "★ 450–550 GSM HEAVYWEIGHT PRE-SHRUNK FRENCH TERRY LOOPBACK COTTON & DROPPED SHOULDER CUTS",
  "★ 1.2MM TOP-GRAIN DRUM-DYED COWHIDE LEATHER & MULTI-LAYER EVA KNUCKLE SHOCK DISPERSION",
  "★ COMPLETE WHITE-LABEL PACKAGING • ENGRAVED GUNMETAL HARDWARE • FROSTED MATTE ZIPLOCK BAGS",
  "★ RAPID 7-DAY SAMPLE PROTOTYPING WITH 100% SAMPLE FEE REFUND ON BULK ORDERS",
  "★ ISO 9001:2015 AUDITED INDUSTRIAL FACILITY • SEDEX SMETA ETHICAL COMPLIANCE • DDP EXPRESS AIR FREIGHT"
];

export const BrandLogosMarqueeSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-[#040406] text-white border-b border-neutral-900 overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-gradient-to-r from-transparent via-[#E21D1D]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] font-mono text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>GLOBAL B2B CONTRACT SUPPLY • WHITE-LABEL CLIENT PORTFOLIO</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
          TRUSTED OEM/ODM MANUFACTURER FOR OVER 180+ INTERNATIONAL BRANDS
        </h3>
        <p className="text-xs font-mono text-neutral-400 uppercase max-w-2xl mx-auto">
          From tournament match uniforms to luxury streetwear drops and title fight armor — Try Wears powers leading global apparel labels.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1. MOVING LOGOS CAROUSEL: SLIDING RIGHT TO LEFT (Infinite Smooth Motion)  */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-4 border-y border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md">
        
        {/* Edge gradient fade masks */}
        <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-[#040406] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-[#040406] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max">
          {/* First Loop */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35
            }}
            className="flex items-center gap-8 sm:gap-14 pr-8 sm:pr-14"
          >
            {BRAND_LOGOS.concat(BRAND_LOGOS).map((brand, idx) => (
              <div
                key={idx}
                className="group/logo flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-[#E21D1D]/60 transition-all duration-300 shadow-md cursor-pointer hover:scale-105 shrink-0"
              >
                <div className="text-neutral-400 group-hover/logo:text-white transition-colors duration-300">
                  {brand.svg}
                </div>
                <div className="hidden sm:block pl-3 border-l border-neutral-800 text-left">
                  <span className="text-[8px] font-mono font-bold text-[#E21D1D] uppercase block">
                    {brand.country}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 group-hover/logo:text-neutral-200 block whitespace-nowrap">
                    {brand.category}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOVING DESCRIPTION TICKER: SLIDING LEFT TO RIGHT (Opposite Flow)       */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-3 bg-[#0a0a0d] border-b border-neutral-800/80 mt-4">
        
        {/* Edge gradient fade masks */}
        <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#040406] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#040406] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40
            }}
            className="flex items-center gap-12 pr-12 font-mono text-[11px] font-black text-neutral-300 uppercase tracking-widest"
          >
            {TICKER_STATEMENTS.concat(TICKER_STATEMENTS).map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <span className="text-[#E21D1D] font-bold">{text}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D]/60" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3. THREE BOTTOM CORE B2B FACTORY PERKS (Upgraded from Roman Urdu to fluent B2B English) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-3.5 hover:border-[#E21D1D]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                ANY TECH PACK & CUT SPEC
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5 leading-tight">
                Send your sketch, PDF vector, or sample photo — our master tailors engineer exact physical prototypes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-3.5 hover:border-[#E21D1D]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                LOW 20–25 PCS STARTUP MOQ
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5 leading-tight">
                Flexible production batches for emerging sportswear labels, fight academies, and gym clothing brands.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-3.5 hover:border-[#E21D1D]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                CLO-3D DIGITAL SIGN-OFF
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5 leading-tight">
                360° anatomical 3D garment render approved prior to physical cutting with zero pattern risk.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
