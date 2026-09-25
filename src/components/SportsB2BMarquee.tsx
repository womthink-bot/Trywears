import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Sparkles, Shield, Flame, Award, Globe, Zap } from "lucide-react";

const MARQUEE_ROW_1 = [
  "FACTORY DIRECT B2B WHOLESALE",
  "LOW MOQ 25 PCS / STYLE",
  "180+ GLOBAL GYMS & PROMOTIONS OUTFITTED",
  "RAPID 5-DAY TECH-PACK SAMPLES",
  "100% AQL 2.5 QUALITY INSPECTION",
  "EXPRESS AIR FREIGHT (DHL / FEDEX)",
  "FULL PRIVATE LABEL & CUSTOM WOVEN TAGGING",
  "MONTHLY CAPACITY: 50,000+ UNITS"
];

const MARQUEE_ROW_2 = [
  "SUBLIMATED INTERLOCK TECHWEAR",
  "GENUINE FULL-GRAIN DRUM-DYED COWHIDE",
  "500-GSM HEAVYWEIGHT FLEECE BOX HOODIES",
  "4-WAY POWER COMPRESSION FABRIC MATRIX",
  "CAD VECTOR PATTERN GRADING (XS TO 5XL)",
  "CUSTOM EMBOSSED SILICONE & METALLIC CRESTS",
  "CLO 3D SAMPLE FITTING & SIMULATION",
  "ISO 9001 CERTIFIED SIALKOT APPAREL HUB"
];

export const SportsB2BMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  // Dynamic 3D Perspective Skew & Rotation on Scroll
  const skewX = useTransform(smoothProgress, [0, 0.5, 1], [-4, 0, 4]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1.02, 0.96]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 py-6 overflow-hidden bg-[#060608] border-y border-neutral-800 select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient Red Laser Beam Lights */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E21D1D] to-transparent shadow-[0_0_15px_#E21D1D]" />
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E21D1D] to-transparent shadow-[0_0_15px_#E21D1D]" />

      {/* Cyber Grid Background Hatch */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(226,29,29,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* 3D Moving Marquee Rig */}
      <motion.div
        style={{
          skewX,
          rotateX,
          scale,
          transformStyle: "preserve-3d"
        }}
        className="space-y-3 transition-transform duration-100 ease-out"
      >
        {/* ROW 1: Slides Left with Red Highlight */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee shrink-0 items-center">
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-6 pr-6">
                {MARQUEE_ROW_1.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-neutral-900/90 border border-white/10 hover:border-[#E21D1D]/60 px-4 py-2 rounded-2xl shadow-lg transition-all group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
                    <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white group-hover:text-[#E21D1D] transition-colors">
                      {item}
                    </span>
                    <span className="text-[#E21D1D] text-xs font-black">★</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Slides Right with High-Contrast Crimson Bar */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee-reverse shrink-0 items-center">
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-6 pr-6">
                {MARQUEE_ROW_2.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#E21D1D] text-white px-4 py-2 rounded-2xl shadow-md shadow-[#E21D1D]/30 transition-transform hover:scale-105"
                  >
                    <Zap className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                      {item}
                    </span>
                    <span className="text-white/60 text-xs font-black">◆</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
