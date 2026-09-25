import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ZoomIn, Eye, ArrowUpRight, X } from "lucide-react";

export interface Garment3DProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  badge: string;
  specs: string;
  accentColor: string;
}

export interface CategoryCollection {
  id: string;
  categoryName: string;
  code: string;
  tagline: string;
  accentColor: string;
  products: Garment3DProduct[];
}

export const CATEGORIES_3D_DATA: CategoryCollection[] = [
  {
    id: "cat-sports",
    categoryName: "SPORTS WEARS",
    code: "01",
    tagline: "PRO MATCH JERSEYS • ATHLETIC UNIFORMS • TEAM KITS",
    accentColor: "#E21D1D",
    products: [
      {
        id: "sports-1",
        name: "Sublimated Pro Match Jersey",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/01_purple_jersey.png",
        badge: "CLO 3D MATCH GRADE",
        specs: "Purple & Gold V-Neck • 180GSM Micro-Interlock • Zero-Fade Italian Sublimation",
        accentColor: "#9333EA"
      },
      {
        id: "sports-2",
        name: "Classic Striped Football Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        badge: "PRO ATHLETIC KIT",
        specs: "White/Blue Striped • Anti-Bacterial Dri-Fit • Laser-Cut Ventilation Panels",
        accentColor: "#3B82F6"
      },
      {
        id: "sports-3",
        name: "Vanguard Squad Match Jersey",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/05_navy_jersey.png",
        badge: "MATCH LEVEL UNIFORM",
        specs: "Deep Navy & Royal Blue • Ergonomic Raglan Seaming • High-Flex Poly",
        accentColor: "#2563EB"
      },
      {
        id: "sports-4",
        name: "Sublimated Championship Team Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "PRO ATHLETIC JERSEY",
        specs: "Crimson & Midnight Technical Mesh • Rapid Moisture Dry • Reinforced Seams",
        accentColor: "#E21D1D"
      }
    ]
  },
  {
    id: "cat-gym",
    categoryName: "GYM AND FITNESS WEARS",
    code: "02",
    tagline: "SEAMLESS KNIT • 4-WAY COMPRESSION • HIGH-FLEX PERFORMANCE",
    accentColor: "#3B82F6",
    products: [
      {
        id: "gym-1",
        name: "Seamless Ergonomic 3D Compression Top",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "3D SEAMLESS KNIT",
        specs: "320GSM Ribbed Compression • Ergonomic Muscle Mapping • Anti-Odor Spandex",
        accentColor: "#3B82F6"
      },
      {
        id: "gym-2",
        name: "Sculpted Hexagonal Impact Armor Top",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/06_padded_armor.png",
        badge: "HEX IMPACT FOAM ARMOR",
        specs: "Sculpted Abdominal & Shoulder Protection • 4-Way Stretch Compression",
        accentColor: "#06B6D4"
      },
      {
        id: "gym-3",
        name: "Pro Bodybuilding Stringer Tank",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        badge: "PERFORMANCE STRINGER",
        specs: "Deep Athletic Armholes • Quick-Dry 160GSM Microfiber • Raw Edge Stitch",
        accentColor: "#E21D1D"
      },
      {
        id: "gym-4",
        name: "4-Way Muscle Fit Compression Top",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_compression_top.png",
        badge: "ERGONOMIC RASHGUARD",
        specs: "Muscle-Mapped Contouring • Honeycomb Breathable Panels • UV50+ Anti-Chafing",
        accentColor: "#10B981"
      }
    ]
  },
  {
    id: "cat-street",
    categoryName: "STREET WEARS",
    code: "03",
    tagline: "450GSM FRENCH TERRY • DROPPED SHOULDERS • BOX-FIT SILHOUETTES",
    accentColor: "#F59E0B",
    products: [
      {
        id: "street-1",
        name: "Luxury 450GSM French Terry Boxy Hoodie",
        category: "STREET WEARS",
        image: "/images/street-wears/street_hoodie.png",
        badge: "450GSM FRENCH TERRY",
        specs: "100% Pre-Shrunk Organic Cotton • Double Layer Hood • Dropped Seams",
        accentColor: "#F59E0B"
      },
      {
        id: "street-2",
        name: "Heavyweight Raglan Zip Street Hoodie",
        category: "STREET WEARS",
        image: "/images/street-wears/03_red_white_hoodie.png",
        badge: "HEAVYWEIGHT RAGLAN",
        specs: "Red/White Contrast Raglan • Heavy Antique Silver YKK Hardware • Boxy Fit",
        accentColor: "#EF4444"
      },
      {
        id: "street-3",
        name: "Washed Heavyweight Oversized Street Tee",
        category: "STREET WEARS",
        image: "/images/street-wears/street_oversized_tee.png",
        badge: "300GSM OVERSIZED TEE",
        specs: "Washed Vintage Charcoal • Dropped Shoulders • Heavy Ribbed Crewneck",
        accentColor: "#A855F7"
      },
      {
        id: "street-4",
        name: "Urban Techwear Streetwear Jacket",
        category: "STREET WEARS",
        image: "/images/street-wears/street_tech_jacket.png",
        badge: "URBAN TECHWEAR",
        specs: "Matte Black Weatherproof Shell • Dual Tactical Zips • Modern Street Silhouette",
        accentColor: "#E21D1D"
      }
    ]
  },
  {
    id: "cat-leather",
    categoryName: "LEATHER JACKETS",
    code: "04",
    tagline: "100% FULL-GRAIN COWHIDE • YKK HARDWARE • BESPOKE CRAFTSMANSHIP",
    accentColor: "#E21D1D",
    products: [
      {
        id: "leather-1",
        name: "Full-Grain Cowhide Biker Moto Jacket",
        category: "LEATHER JACKETS",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "1.2MM COWHIDE LEATHER",
        specs: "Drum-Dyed Top-Grain Cowhide • Heavy YKK Asymmetric Zips • Quilted Lining",
        accentColor: "#E21D1D"
      },
      {
        id: "leather-2",
        name: "Heritage Wool & Leather Varsity",
        category: "LEATHER JACKETS",
        image: "/images/leather-jackets/leather_varsity.png",
        badge: "MELTON WOOL & COWHIDE",
        specs: "Heavy 24oz Melton Wool Body • Genuine Cowhide Sleeves • Snap Hardware",
        accentColor: "#D97706"
      },
      {
        id: "leather-3",
        name: "Waxed Cafe Racer Moto Leather Jacket",
        category: "LEATHER JACKETS",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        badge: "MANDARIN SNAP MOTO",
        specs: "Distressed Top-Grain Waxed Leather • Quilted Shoulders • Antique Brass Hardware",
        accentColor: "#B45309"
      },
      {
        id: "leather-4",
        name: "Aviator Shearling Bomber Leather Jacket",
        category: "LEATHER JACKETS",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        badge: "SHEARLING AVIATOR BOMBER",
        specs: "Rich Espresso Full-Grain Leather • Heavy Shearling Wool Collar • Brass Buckle Straps",
        accentColor: "#854D0E"
      }
    ]
  }
];

interface Interactive3DGarmentsStageProps {
  currentCategoryIndex?: number;
  onCategoryChange?: (index: number) => void;
  onSelectProduct?: (product: Garment3DProduct) => void;
}

export const Interactive3DGarmentsStage: React.FC<Interactive3DGarmentsStageProps> = ({
  currentCategoryIndex = 0,
  onCategoryChange,
  onSelectProduct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active category & product states
  const [activeCategory, setActiveCategory] = useState<number>(currentCategoryIndex);
  const [activeFocusCard, setActiveFocusCard] = useState<number>(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [localTilt, setLocalTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Garment3DProduct | null>(null);

  // Sync with prop if changed from outside
  useEffect(() => {
    setActiveCategory(currentCategoryIndex);
  }, [currentCategoryIndex]);

  // Handle category change and notify parent
  const changeCategory = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(CATEGORIES_3D_DATA.length - 1, index));
    setActiveCategory(clamped);
    setActiveFocusCard(0);
    setHoveredCardIdx(null);
    if (onCategoryChange) {
      onCategoryChange(clamped);
    }
  }, [onCategoryChange]);

  // Handle local micro-tilt on hovered product
  const handleProductMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setLocalTilt({ x: x * 14, y: -y * 10 });
  };

  const handleProductMouseLeave = () => {
    setHoveredCardIdx(null);
    setLocalTilt({ x: 0, y: 0 });
  };

  // Auto-play cycle for slides
  useEffect(() => {
    if (!isAutoPlaying || hoveredCardIdx !== null) return;

    const timer = setInterval(() => {
      setActiveFocusCard((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, hoveredCardIdx]);

  const currentCollection = CATEGORIES_3D_DATA[activeCategory] || CATEGORIES_3D_DATA[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-between select-none py-2"
      style={{ perspective: "1500px" }}
    >
      {/* 1. TOP CATEGORY SELECTOR (SIMPLE, SLEEK PILLS) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mb-4 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES_3D_DATA.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(idx)}
                className={`px-4 sm:px-5 py-2 rounded-full font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#E21D1D] text-white shadow-[0_0_25px_rgba(226,29,29,0.55)] font-black scale-105"
                    : "text-neutral-400 hover:text-white bg-black/60 hover:bg-neutral-900 border border-white/10"
                }`}
              >
                <span className={isActive ? "text-white/80" : "text-[#E21D1D]"}>{cat.code}</span>
                <span>{cat.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Minimal Category Tagline */}
        <p className="text-[10px] sm:text-xs font-mono text-neutral-400 tracking-widest uppercase text-center mt-1">
          {currentCollection.tagline}
        </p>
      </div>

      {/* 2. FREESTANDING 3D GARMENTS SHOWCASE (NO BOXES, INSTANT CURSOR HOVER ZOOM) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-6 my-auto min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCollection.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {currentCollection.products.map((product, idx) => {
              const isHovered = hoveredCardIdx === idx;
              const isAnotherHovered = hoveredCardIdx !== null && hoveredCardIdx !== idx;
              const isAutoActive = hoveredCardIdx === null && activeFocusCard === idx;

              // 3D Transform values
              let scale = 1;
              let zDepth = 0;
              let translateY = 0;
              let rotY = 0;
              let rotX = 0;
              let opacity = 1;

              if (isHovered) {
                scale = 1.32; // PROMINENT ZOOM ON HOVER
                zDepth = 120; // Glides forward in 3D perspective
                translateY = -28; // Lifts upward
                rotY = localTilt.x; // Responsive micro-tilt
                rotX = localTilt.y;
                opacity = 1;
              } else if (isAnotherHovered) {
                scale = 0.88; // Recedes smoothly when another product is zoomed
                zDepth = -30;
                translateY = 6;
                opacity = 0.38;
              } else if (isAutoActive) {
                scale = 1.05;
                zDepth = 30;
                translateY = -6;
                opacity = 1;
              }

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => {
                    setHoveredCardIdx(idx);
                    setActiveFocusCard(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseMove={(e) => handleProductMouseMove(e, idx)}
                  onMouseLeave={handleProductMouseLeave}
                  onClick={() => {
                    setSelectedProduct(product);
                    if (onSelectProduct) onSelectProduct(product);
                  }}
                  className={`relative flex flex-col items-center justify-end cursor-pointer group transition-all duration-500 ease-out ${
                    isHovered ? "z-40" : "z-10"
                  }`}
                  style={{
                    transform: `translateZ(${zDepth}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Atmospheric Glow Spotlight Behind Freestanding Garment */}
                  <div
                    className={`absolute inset-0 rounded-full blur-[45px] transition-all duration-500 pointer-events-none ${
                      isHovered
                        ? "opacity-90 scale-125"
                        : isAutoActive
                        ? "opacity-40 scale-100"
                        : "opacity-0 scale-75"
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${product.accentColor} 0%, rgba(226, 29, 29, 0.25) 45%, transparent 70%)`
                    }}
                  />

                  {/* FREESTANDING PRODUCT IMAGE (100% TRANSPARENT PNG CUTOUT - NO BOX, NO FRAME) */}
                  <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] lg:h-[430px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain filter transition-all duration-500 drop-shadow-[0_22px_32px_rgba(0,0,0,0.85)] ${
                        isHovered
                          ? "scale-105 drop-shadow-[0_32px_45px_rgba(0,0,0,0.95)]"
                          : isAnotherHovered
                          ? "grayscale-[20%] opacity-40 scale-95"
                          : ""
                      }`}
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle Zoom Badge On Hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-2 right-2 bg-black/85 backdrop-blur-md border border-[#E21D1D]/70 text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xl pointer-events-none"
                      >
                        <ZoomIn className="w-3.5 h-3.5 text-[#E21D1D] animate-pulse" />
                        <span>ZOOMED 3D</span>
                      </motion.div>
                    )}
                  </div>

                  {/* 3D Soft Floor Contact Shadow */}
                  <div
                    className="w-3/4 h-5 rounded-[100%] blur-[12px] bg-black/95 transition-all duration-500 pointer-events-none -mt-2"
                    style={{
                      transform: `scale(${isHovered ? 1.4 : isAutoActive ? 1.1 : 0.95})`,
                      opacity: isHovered ? 0.95 : isAnotherHovered ? 0.25 : 0.65
                    }}
                  />

                  {/* CLEAN PRODUCT TYPOGRAPHY (NO BOX CONTAINER) */}
                  <div
                    className={`mt-2 flex flex-col items-center text-center transition-all duration-400 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : isAnotherHovered
                        ? "opacity-25 translate-y-1"
                        : "opacity-80 translate-y-0"
                    }`}
                  >
                    <span className="text-[9px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
                      {product.badge}
                    </span>
                    <h4 className="text-xs sm:text-sm lg:text-base font-display font-black text-white uppercase tracking-wider mt-0.5 line-clamp-1 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h4>

                    {/* Quick Specs Revealed on Hover */}
                    <div className="h-5 flex items-center justify-center mt-1">
                      {isHovered ? (
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[9px] font-mono text-neutral-300 line-clamp-1 max-w-[200px]"
                        >
                          {product.specs}
                        </motion.span>
                      ) : (
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                          0{idx + 1} / 04 • HOVER TO ZOOM
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. SLEEK MINIMALIST CONTROLS BAR (CLEAN SLOTS & TOUR PLAY/PAUSE) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-3 mt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
          <span className="text-white font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
            HOVER ANY PRODUCT TO ZOOM • CLICK FOR B2B TECH PACK
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Minimal 4-Slot Dot Selectors */}
          <div className="flex items-center gap-1.5">
            {currentCollection.products.map((p, idx) => {
              const isSelected = activeFocusCard === idx || hoveredCardIdx === idx;
              return (
                <button
                  key={`dot-${p.id}`}
                  onClick={() => {
                    setActiveFocusCard(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={handleProductMouseLeave}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "w-7 bg-[#E21D1D] shadow-[0_0_10px_#E21D1D]"
                      : "w-2 bg-white/20 hover:bg-white/50"
                  }`}
                  title={p.name}
                />
              );
            })}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white font-mono text-[10px] uppercase transition-colors cursor-pointer"
            title={isAutoPlaying ? "Pause Auto-Tour" : "Start Auto-Tour"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">TOUR ON</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span className="hidden sm:inline">PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. FULLSCREEN 3D PRODUCT INSPECTOR MODAL (OPENED ON CLICK) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden z-10 shadow-2xl"
            >
              <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                />

                {/* Floating Authentic TRY WEARS Crest */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/85 backdrop-blur-md border border-[#E21D1D]/50 px-3 py-1.5 rounded-full shadow-xl">
                  <div className="w-6 h-6 rounded-full bg-black p-0.5 border border-[#E21D1D] flex items-center justify-center">
                    <img src="/images/trylogo_transparent.png" alt="TRY WEARS" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                    GENUINE TRY WEARS PRODUCT
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/80 border border-white/20 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 bg-neutral-950">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#E21D1D] uppercase font-black tracking-widest block">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <span className="bg-[#E21D1D]/20 border border-[#E21D1D]/40 text-[#E21D1D] font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {selectedProduct.badge}
                  </span>
                </div>

                <div className="p-4 bg-neutral-900/90 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                    MANUFACTURING & FABRIC SPECIFICATIONS
                  </span>
                  <p className="text-xs font-mono text-neutral-200">
                    {selectedProduct.specs}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="#b2b-calculator"
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3.5 rounded-xl text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-[#E21D1D]/30"
                  >
                    REQUEST B2B SAMPLE / TECH PACK
                  </a>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-3.5 rounded-xl border border-white/20 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
