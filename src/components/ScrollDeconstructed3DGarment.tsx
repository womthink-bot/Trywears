import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronDown,
  RotateCw,
  Scan,
  Activity,
  Sliders,
  Maximize2,
  Package,
  Cpu
} from "lucide-react";

export interface DeconstructedGarmentData {
  id: string;
  name: string;
  category: string;
  badge: string;
  gsm: string;
  fabric: string;
  image: string;
  accentColor: string;
  parts: {
    collar: { title: string; desc: string };
    chest: { title: string; desc: string };
    sleeves: { title: string; desc: string };
    torso: { title: string; desc: string };
    hem: { title: string; desc: string };
  };
}

const DECONSTRUCTED_GARMENTS: DeconstructedGarmentData[] = [
  {
    id: "pro-jersey",
    name: "Sublimated Pro Match Jersey",
    category: "SPORTS WEARS",
    badge: "CLO 3D MATCH GRADE",
    gsm: "220-GSM",
    fabric: "High-Tensile Micro-Interlock & Honeycomb Mesh",
    image: "/images/sports-wears/01_purple_jersey.png",
    accentColor: "#E21D1D",
    parts: {
      collar: {
        title: "AEROREADY 3D RIBBED COLLAR",
        desc: "Laser-cut 1.2\" low-drag athletic contour with anti-curl inner taping"
      },
      chest: {
        title: "3D EMBOSSED TRY WEARS CREST",
        desc: "High-frequency ultrasonic heat-seal with metallic drop-shadow"
      },
      sleeves: {
        title: "ANATOMICAL RAGLAN FREEDOM",
        desc: "Dual flatlock seams rated for 400N tensile match-pull resistance"
      },
      torso: {
        title: "220-GSM MICRO-INTERLOCK WEAVE",
        desc: "Italian anti-fade sublimation with molecular capillary moisture dispersion"
      },
      hem: {
        title: "DYNAMIC CURVED SCOOP HEM",
        desc: "Reinforced twin-needle hem stay prevents untucking during sprint contact"
      }
    }
  },
  {
    id: "gym-armor",
    name: "Seamless Ergonomic 3D Compression Top",
    category: "GYM & FITNESS",
    badge: "4-WAY POWER COMPRESSION",
    gsm: "320-GSM",
    fabric: "3D Zone-Knit Poly-Elastane Matrix",
    image: "/images/gym-fitness/gym_seamless.png",
    accentColor: "#3B82F6",
    parts: {
      collar: {
        title: "ERGONOMIC LOW-CHAFE NECK",
        desc: "Fused seamless border prevents barbell and collarbone friction"
      },
      chest: {
        title: "REFLECTIVE TRY WEARS EMBLEM",
        desc: "Micro-prismatic luminescence visible up to 200m in low-light gym training"
      },
      sleeves: {
        title: "RADIAL DELTOID COMPRESSION",
        desc: "Graduated 18mmHg vascular support boosts upper-body oxygen circulation"
      },
      torso: {
        title: "HEXAGONAL VENTILATION CHANNELS",
        desc: "Micro-perforated abdominal core matrix cools body by -2.4°C under heavy loads"
      },
      hem: {
        title: "ANTI-SLIP SILICONE GRIP WAIST",
        desc: "Zero-ride-up interior polymer beads withstand 500+ Olympic squats"
      }
    }
  },
  {
    id: "street-hoodie",
    name: "Luxury 500GSM Boxy French Terry Hoodie",
    category: "STREET WEARS",
    badge: "500GSM HEAVYWEIGHT FLEECE",
    gsm: "500-GSM",
    fabric: "100% Pre-Shrunk Combed Loopback Cotton",
    image: "/images/street-wears/street_hoodie.png",
    accentColor: "#F59E0B",
    parts: {
      collar: {
        title: "SCULPTURAL DOUBLE-LAYER HOOD",
        desc: "Structured dual-ply construction stands tall without drawstring slouch"
      },
      chest: {
        title: "TRY WEARS MONOGRAM CREST",
        desc: "Subtle tonal embroidery directly woven into dense 500GSM cotton loops"
      },
      sleeves: {
        title: "DROPPED-SHOULDER URBAN DRAPE",
        desc: "Generous brutalist sleeve volume with tight 2x2 ribbed heavy cuffs"
      },
      torso: {
        title: "500GSM VINTAGE MINERAL FLEECE",
        desc: "Acid-washed custom heavyweight weave with plush brushed interior"
      },
      hem: {
        title: "TIGHTENED WIDE BOX-CUT RIB",
        desc: "Pre-shrunk 3\" elastane rib holds cropped waistline perfectly"
      }
    }
  },
  {
    id: "leather-moto",
    name: "Full-Grain Cowhide Biker Moto Jacket",
    category: "LEATHER JACKETS",
    badge: "1.2MM DRUM-DYED COWHIDE",
    gsm: "1.2MM LEATHER",
    fabric: "100% Grade-A Full Grain Cowhide",
    image: "/images/leather-jackets/leather_biker.png",
    accentColor: "#E21D1D",
    parts: {
      collar: {
        title: "NOTCHED ASYMMETRICAL LAPEL",
        desc: "Heavy brass snap-down collar with reinforced leather facing"
      },
      chest: {
        title: "TRY WEARS BESPOKE LEATHER SHIELD",
        desc: "Hot-stamped artisanal leather hallmark debossed at 180°C"
      },
      sleeves: {
        title: "GUSSETED ZIPPERED GAUNTLETS",
        desc: "Heavy antique silver YKK #10 zippers allow snug gauntlet glove fit"
      },
      torso: {
        title: "1.2MM NATURAL DRUM-DYED HIDE",
        desc: "Ages into a rich heirloom patina; zero synthetic polyurethane coatings"
      },
      hem: {
        title: "INTEGRATED ROLLER BUCKLE BELT",
        desc: "Cast steel hardware and double-riveted leather loops lock the waist"
      }
    }
  }
];

export const ScrollDeconstructed3DGarment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedGarment, setSelectedGarment] = useState<DeconstructedGarmentData>(DECONSTRUCTED_GARMENTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColor, setSelectedColor] = useState<string>("Crimson Obsidian");
  const [isManualScrubbing, setIsManualScrubbing] = useState<boolean>(false);
  const [scrubValue, setScrubValue] = useState<number>(0);
  const [activeCallout, setActiveCallout] = useState<string | null>("chest");
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth Spring Damping for 60fps cinematic fluidity
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Use either scroll progress or manual scrubber progress
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    if (isManualScrubbing) {
      setCurrentProgress(scrubValue);
      return;
    }

    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentProgress(latest);
      setScrubValue(latest);
    });

    return () => unsubscribe();
  }, [smoothProgress, isManualScrubbing, scrubValue]);

  // Mouse Parallax for 3D Camera Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Calculations for Deconstruction Layers (Progress 0 -> 1)
  // 0.00 - 0.20: Fully assembled, floating
  // 0.20 - 0.70: Exploded 3D deconstruction
  // 0.70 - 0.85: Micro-texture inspection
  // 0.85 - 1.00: Re-assembly & High-Ticket Reservation

  const deconstructFactor = Math.min(1, Math.max(0, (currentProgress - 0.15) / 0.55));
  const exploded = deconstructFactor > 0.1;

  // Layer offsets
  const collarY = -deconstructFactor * 110;
  const collarZ = deconstructFactor * 70;
  const collarRotX = deconstructFactor * 22;

  const leftSleeveX = -deconstructFactor * 135;
  const leftSleeveZ = deconstructFactor * 45;
  const leftSleeveRotY = -deconstructFactor * 30;

  const rightSleeveX = deconstructFactor * 135;
  const rightSleeveZ = deconstructFactor * 45;
  const rightSleeveRotY = deconstructFactor * 30;

  const crestZ = deconstructFactor * 120;
  const crestScale = 1 + deconstructFactor * 0.25;

  const torsoScale = 1 - deconstructFactor * 0.05;
  const torsoZ = -deconstructFactor * 20;

  const hemY = deconstructFactor * 90;
  const hemZ = deconstructFactor * 50;

  // Dynamic Phase Title
  let phaseLabel = "STAGE 1: ASSEMBLED HERO APPAREL";
  if (currentProgress >= 0.2 && currentProgress < 0.65) {
    phaseLabel = "STAGE 2: SCROLL-DRIVEN 3D DECONSTRUCTION";
  } else if (currentProgress >= 0.65 && currentProgress < 0.85) {
    phaseLabel = "STAGE 3: MICRO-TEXTURE & FABRIC SPEC";
  } else if (currentProgress >= 0.85) {
    phaseLabel = "STAGE 4: BESPOKE RE-ASSEMBLY & TECH-PACK";
  }

  return (
    <section
      id="3d-deconstruction"
      ref={containerRef}
      className="relative w-full bg-[#050507] text-white border-b border-neutral-800"
      style={{ minHeight: "260vh" }}
    >
      {/* STICKY VIEWPORT CONTAINER (LOCKS TO SCREEN AS USER SCROLLS DOWN) */}
      <div
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Studio Background with Perspective Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#050507] to-black pointer-events-none" />

        {/* Ambient Volumetric Lighting Flare */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-30"
          style={{
            background: `radial-gradient(circle, ${selectedGarment.accentColor} 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`,
            transform: `translate(-50%, -50%) translate(${mouseTilt.x * 60}px, ${mouseTilt.y * 60}px)`
          }}
        />

        {/* Perspective 3D Stage Floor Grid */}
        <div
          className="absolute bottom-0 inset-x-0 h-80 pointer-events-none opacity-40 overflow-hidden"
          style={{ perspective: "500px" }}
        >
          <div
            className="w-[200%] -ml-[50%] h-[350px] origin-top"
            style={{
              transform: `rotateX(75deg) translateY(-20px)`,
              backgroundImage: `
                linear-gradient(to right, rgba(226, 29, 29, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)"
            }}
          />
        </div>

        {/* ================= 1. TOP HUD HEADER BAR ================= */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 flex items-center justify-between gap-4">
          {/* Left: Section Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/80 border border-[#E21D1D]/50 flex items-center justify-center text-[#E21D1D] shadow-lg shadow-[#E21D1D]/25">
              <Layers className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
                  $20K IMMERSIVE 3D EXPERIENCE
                </span>
                <span className="bg-[#E21D1D]/20 text-[#E21D1D] text-[9px] font-mono px-2 py-0.5 rounded-full border border-[#E21D1D]/40 font-bold">
                  DECONSTRUCTED 3D
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-display font-black text-white uppercase tracking-tight">
                SCROLL-DRIVEN GARMENT DECONSTRUCTION
              </h2>
            </div>
          </div>

          {/* Right: Active Phase Badge & Scroll Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-[11px] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="text-neutral-300 font-bold uppercase">{phaseLabel}</span>
            </div>

            <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-xl font-mono text-[11px] text-neutral-400">
              EXPLOSION: <span className="text-white font-bold">{Math.round(deconstructFactor * 100)}%</span>
            </div>
          </div>
        </div>

        {/* ================= 2. MAIN INTERACTIVE 3D STAGE ================= */}
        <div className="relative z-20 w-full flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 my-auto">
          {/* Left Side: Garment Selector Pills */}
          <div className="hidden lg:flex flex-col gap-2 z-30 shrink-0 w-64 pr-4">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">
              SELECT GARMENT ARCHITECTURE
            </span>
            {DECONSTRUCTED_GARMENTS.map((garment) => {
              const isActive = selectedGarment.id === garment.id;
              return (
                <button
                  key={garment.id}
                  onClick={() => setSelectedGarment(garment)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                    isActive
                      ? "bg-neutral-900 border-[#E21D1D] shadow-lg shadow-[#E21D1D]/25 ring-1 ring-[#E21D1D]"
                      : "bg-black/60 border-white/10 hover:border-white/25 hover:bg-neutral-900/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={garment.image}
                    alt={garment.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-[#E21D1D] font-bold block uppercase leading-tight">
                      {garment.category}
                    </span>
                    <span className="text-xs font-display font-bold text-white uppercase truncate block mt-0.5">
                      {garment.name}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Spec Matrix */}
            <div className="mt-3 p-3.5 rounded-2xl bg-black/80 border border-white/10 space-y-2">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                FABRIC SHADER ATTRIBUTES
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-neutral-500 block text-[8px]">WEAVE WEIGHT</span>
                  <span className="text-white font-black">{selectedGarment.gsm}</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-neutral-500 block text-[8px]">TEX RENDER</span>
                  <span className="text-[#E21D1D] font-black">60 FPS 3D</span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: 3D DECONSTRUCTED GARMENT CANVAS */}
          <div
            className="relative flex-1 w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* The 3D Exploded Rig Container */}
            <div
              className="relative w-[280px] sm:w-[340px] md:w-[390px] aspect-3/4 flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform: `rotateY(${mouseTilt.x * 15}deg) rotateX(${-mouseTilt.y * 12}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* 1. COLLAR LAYER (Floats Upwards and Tilts) */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-30"
                style={{
                  transform: `translateY(${collarY}px) translateZ(${collarZ}px) rotateX(${collarRotX}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Collar Highlight Overlay / Cutout */}
                <div className="absolute top-0 inset-x-0 h-24 rounded-t-3xl overflow-hidden border-t-2 border-[#E21D1D]/80 shadow-[0_-10px_30px_rgba(226,29,29,0.4)]">
                  <img
                    src={selectedGarment.image}
                    alt="Collar Layer"
                    className="w-full h-full object-cover object-top filter brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E21D1D]/30 via-transparent to-black/60" />
                </div>

                {/* Floating Callout Pointer for Collar */}
                {exploded && (
                  <div
                    onClick={() => setActiveCallout("collar")}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 backdrop-blur-md border border-[#E21D1D] px-2.5 py-1 rounded-full shadow-2xl pointer-events-auto cursor-pointer animate-bounce"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
                    <span className="font-mono text-[9px] font-black text-white whitespace-nowrap">
                      {selectedGarment.parts.collar.title}
                    </span>
                  </div>
                )}
              </div>

              {/* 2. LEFT SLEEVE LAYER (Floats Outward Left & Rotates) */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-20"
                style={{
                  transform: `translateX(${leftSleeveX}px) translateZ(${leftSleeveZ}px) rotateY(${leftSleeveRotY}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute top-10 left-0 w-28 h-56 rounded-l-3xl overflow-hidden border-l-2 border-white/40 shadow-[-15px_0_35px_rgba(0,0,0,0.8)]">
                  <img
                    src={selectedGarment.image}
                    alt="Left Sleeve"
                    className="w-full h-full object-cover object-left filter brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Left Sleeve Pinpoint Callout */}
                {exploded && (
                  <div
                    onClick={() => setActiveCallout("sleeves")}
                    className="absolute top-28 -left-12 flex items-center gap-2 bg-black/90 backdrop-blur-md border border-white/30 hover:border-[#E21D1D] px-2 py-1 rounded-full shadow-2xl pointer-events-auto cursor-pointer transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-[8px] font-bold text-neutral-200 whitespace-nowrap">
                      RAGLAN SLEEVE SEAM
                    </span>
                  </div>
                )}
              </div>

              {/* 3. RIGHT SLEEVE LAYER (Floats Outward Right & Rotates) */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-20"
                style={{
                  transform: `translateX(${rightSleeveX}px) translateZ(${rightSleeveZ}px) rotateY(${rightSleeveRotY}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute top-10 right-0 w-28 h-56 rounded-r-3xl overflow-hidden border-r-2 border-white/40 shadow-[15px_0_35px_rgba(0,0,0,0.8)]">
                  <img
                    src={selectedGarment.image}
                    alt="Right Sleeve"
                    className="w-full h-full object-cover object-right filter brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                </div>
              </div>

              {/* 4. MAIN TORSO & CORE FABRIC BODY (Central Anchor) */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                style={{
                  transform: `translateZ(${torsoZ}px) scale(${torsoScale})`,
                  background: "radial-gradient(circle at 50% 30%, #1e1e24 0%, #0d0d12 65%, #050507 100%)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Main Product Image */}
                <img
                  src={selectedGarment.image}
                  alt={selectedGarment.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Micro-Weave Wireframe Scanner Grid (Appears during Stage 2 & 3) */}
                {exploded && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(226,29,29,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(226,29,29,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px"
                    }}
                  />
                )}

                {/* Dynamic Specular Lighting Sweep */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(circle at ${50 + mouseTilt.x * 30}% ${40 + mouseTilt.y * 30}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
                  }}
                />
              </div>

              {/* 5. 3D EMBOSSED TRY WEARS CHEST CREST (Floats High Forward in Z-Space) */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out z-40"
                style={{
                  transform: `translateZ(${crestZ}px) scale(${crestScale})`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="relative -mt-16 -ml-16 pointer-events-auto cursor-pointer group" onClick={() => setActiveCallout("chest")}>
                  {/* Glowing 3D Emblem Plate */}
                  <div className="w-16 h-16 rounded-2xl bg-black/90 border-2 border-[#E21D1D] p-1.5 shadow-[0_0_35px_rgba(226,29,29,0.7)] group-hover:scale-110 transition-transform">
                    <img
                      src="/images/trylogo_transparent.png"
                      alt="TRY WEARS Crest"
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(226,29,29,0.8)]"
                    />
                  </div>

                  {/* Pinpoint Radar Pulse */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#E21D1D] animate-ping" />

                  {exploded && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-black/95 backdrop-blur-xl border border-[#E21D1D] px-2.5 py-1 rounded-full shadow-2xl whitespace-nowrap">
                      <span className="font-mono text-[9px] font-black text-white">
                        EMBOSSED TRY WEARS SHIELD
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 6. LOWER HEM ANATOMY (Floats Downward) */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out z-20"
                style={{
                  transform: `translateY(${hemY}px) translateZ(${hemZ}px)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute bottom-0 inset-x-0 h-16 rounded-b-3xl overflow-hidden border-b-2 border-white/40 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                  <img
                    src={selectedGarment.image}
                    alt="Hem"
                    className="w-full h-full object-cover object-bottom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </div>

              {/* 3D Contact Shadow on Floor */}
              <div
                className="absolute -bottom-10 w-4/5 h-8 rounded-[100%] blur-[16px] bg-black/90 transition-all duration-300"
                style={{
                  transform: `translateX(${-mouseTilt.x * 15}px) scale(${1 - deconstructFactor * 0.2})`,
                  opacity: 0.9 - deconstructFactor * 0.3
                }}
              />
            </div>
          </div>

          {/* Right Side: High-Ticket B2B Reservation & Micro-Spec Card */}
          <div className="z-30 shrink-0 w-full lg:w-80 mt-4 lg:mt-0 lg:pl-4">
            <div className="bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
              {/* Active Callout Details */}
              <div className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#E21D1D] font-black tracking-widest uppercase">
                    MICRO-LAYER TELEMETRY
                  </span>
                  <span className="text-[8px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    CLICK PINS
                  </span>
                </div>

                <h4 className="text-sm font-display font-black text-white uppercase mt-1">
                  {activeCallout === "collar"
                    ? selectedGarment.parts.collar.title
                    : activeCallout === "sleeves"
                    ? selectedGarment.parts.sleeves.title
                    : activeCallout === "torso"
                    ? selectedGarment.parts.torso.title
                    : selectedGarment.parts.chest.title}
                </h4>

                <p className="text-[11px] font-mono text-neutral-300 leading-relaxed mt-1">
                  {activeCallout === "collar"
                    ? selectedGarment.parts.collar.desc
                    : activeCallout === "sleeves"
                    ? selectedGarment.parts.sleeves.desc
                    : activeCallout === "torso"
                    ? selectedGarment.parts.torso.desc
                    : selectedGarment.parts.chest.desc}
                </p>
              </div>

              {/* Colorway Switcher */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                  COLORWAY: <span className="text-white font-bold">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { name: "Crimson Obsidian", hex: "#E21D1D" },
                    { name: "Electric Cobalt", hex: "#2563EB" },
                    { name: "Hyper Stealth Black", hex: "#171717" },
                    { name: "Vintage Bone", hex: "#E5E5E5" }
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-white scale-110 shadow-lg shadow-white/30"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Luxury Size Selector (S - XXL) */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                  SAMPLE SIZE SPECIFICATION
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 rounded-xl font-mono text-xs font-black transition-all cursor-pointer ${
                        selectedSize === sz
                          ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/30 scale-105"
                          : "bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* High-Ticket Action Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href="#b2b-calculator"
                  className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 rounded-2xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-[#E21D1D]/35 transition-all cursor-pointer"
                >
                  <span>REQUEST 3D TECH PACK & SAMPLE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    OEM / ODM SIALKOT FACTORY
                  </span>
                  <span>MOQ: 50 PCS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. BOTTOM CONTROL HUD & MANUAL 3D SCRUBBER ================= */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-5 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Scroll Down Guide Animation */}
          <div className="flex items-center gap-3 text-neutral-400 text-xs font-mono">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2.5 rounded-full bg-[#E21D1D] animate-bounce" />
            </div>
            <div>
              <span className="text-white font-bold block uppercase text-[11px]">
                SCROLL DOWN TO DECONSTRUCT IN 3D
              </span>
              <span className="text-[9px] text-neutral-500">
                MOVE MOUSE TO TILT 360° CAMERA
              </span>
            </div>
          </div>

          {/* Interactive Manual Scrub Slider */}
          <div className="flex-1 max-w-md w-full flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl">
            <Sliders className="w-4 h-4 text-[#E21D1D] shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-neutral-400 uppercase">3D EXPLOSION SCRUBBER</span>
                <span className="text-white font-bold">{Math.round(currentProgress * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={currentProgress}
                onMouseDown={() => setIsManualScrubbing(true)}
                onTouchStart={() => setIsManualScrubbing(true)}
                onMouseUp={() => setIsManualScrubbing(false)}
                onTouchEnd={() => setIsManualScrubbing(false)}
                onChange={(e) => {
                  setScrubValue(parseFloat(e.target.value));
                  setCurrentProgress(parseFloat(e.target.value));
                }}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#E21D1D]"
              />
            </div>
          </div>

          {/* Mobile Garment Selector Tabs */}
          <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            {DECONSTRUCTED_GARMENTS.map((g) => (
              <button
                key={`mob-${g.id}`}
                onClick={() => setSelectedGarment(g)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[9px] font-bold uppercase transition-all whitespace-nowrap ${
                  selectedGarment.id === g.id
                    ? "bg-[#E21D1D] text-white"
                    : "bg-neutral-900 border border-white/10 text-neutral-400"
                }`}
              >
                {g.category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
