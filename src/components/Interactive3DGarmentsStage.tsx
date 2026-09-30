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
        name: "Sublimated Wildcats #24 Basketball Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sportswearsP1.png",
        badge: "PRO BASKETBALL MATCH KIT",
        specs: "Crimson & Midnight Black Set • 220GSM Birdseye Mesh • Zero-Fade Italian Sublimation",
        accentColor: "#E21D1D"
      },
      {
        id: "sports-2",
        name: "Classic Black & Gold Football Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sportswearsP2.png",
        badge: "CHAMPIONSHIP MATCH GRADE",
        specs: "Matte Black & Metallic Gold V-Neck • 200GSM Micro-Interlock • Anti-Bacterial Dri-Fit",
        accentColor: "#F59E0B"
      },
      {
        id: "sports-3",
        name: "Vanguard Speed Stripe Soccer Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sportswearsP3.png",
        badge: "PRO ATHLETIC SOCCER KIT",
        specs: "Crisp White & Dynamic Red/Blue Stripes • High-Flex Poly • Laser-Cut Ventilation",
        accentColor: "#3B82F6"
      },
      {
        id: "sports-4",
        name: "Sublimated Teal & Orange Match Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sportswearsP4.png",
        badge: "PRO SQUAD UNIFORM SET",
        specs: "Teal Cyan & Neon Orange Panels • Rapid Capillary Moisture Dry • Reinforced Seams",
        accentColor: "#06B6D4"
      }
    ]
  },
  {
    id: "cat-gym",
    categoryName: "GYM AND FITNESS WEARS",
    code: "02",
    tagline: "WOMEN'S ACTIVEWEAR SETS • MEN'S COMPRESSION SUITS • 4-WAY STRETCH",
    accentColor: "#3B82F6",
    products: [
      {
        id: "gym-1",
        name: "Women's Seamless Sports Bra & Contour Leggings Set",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_women_seamless_set_v2.png",
        badge: "WOMEN'S SEAMLESS 2-PIECE SET",
        specs: "Sculpted Sports Bra • High-Waisted Ribbed Contour Leggings • 4-Way Spandex",
        accentColor: "#EC4899"
      },
      {
        id: "gym-2",
        name: "Women's High-Support Racerback Bra & Active Leggings Suit",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_women_emerald_bra_set_v2.png",
        badge: "WOMEN'S ACTIVE GYM SUIT",
        specs: "Impact-Absorbing Racerback Bra • Booty-Contour Compression Leggings • Moisture-Wicking",
        accentColor: "#10B981"
      },
      {
        id: "gym-3",
        name: "Men's 2-Piece Compression Rashguard & Tights Base Layer Suit",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_men_compression_suit_v2.png",
        badge: "MEN'S 2-PIECE COMPRESSION SUIT",
        specs: "Long-Sleeve Muscle Compression Top • Full-Length Base Layer Tights • Flatlock Stitch",
        accentColor: "#06B6D4"
      },
      {
        id: "gym-4",
        name: "Men's Pro Sleeveless Workout Hoodie & 2-in-1 Training Shorts Set",
        category: "GYM AND FITNESS WEARS",
        image: "/images/gym-fitness/gym_men_training_set_v2.png",
        badge: "MEN'S GYM TRAINING SET",
        specs: "Deep-Cut Athletic Hooded Tank • 5-inch 2-in-1 Compression Liner Shorts",
        accentColor: "#E21D1D"
      }
    ]
  },
  {
    id: "cat-street",
    categoryName: "STREET WEARS",
    code: "03",
    tagline: "WOMEN'S & MEN'S HEAVYWEIGHT TRACKSUITS • VINTAGE CARGO SETS",
    accentColor: "#F59E0B",
    products: [
      {
        id: "street-1",
        name: "Women's Cropped Boxy Hoodie & Wide-Leg Street Sweatpants Set",
        category: "STREET WEARS",
        image: "/images/street-wears/street_women_cropped_hoodie_set_v2.png",
        badge: "WOMEN'S 420GSM TRACKSUIT",
        specs: "Cropped Boxy Heavy Hoodie • High-Waisted Wide-Leg Sweats • Vintage Bone Oat",
        accentColor: "#F59E0B"
      },
      {
        id: "street-2",
        name: "Women's Washed Oversized Graphic Tee & Parachute Cargo Pants Set",
        category: "STREET WEARS",
        image: "/images/street-wears/street_women_boxy_tee_cargo_set_v2.png",
        badge: "WOMEN'S CARGO STREET SET",
        specs: "Drop-Shoulder Vintage Tee • High-Waisted Toggle Parachute Cargo Pants • Sage Olive",
        accentColor: "#10B981"
      },
      {
        id: "street-3",
        name: "Men's Luxury 450GSM French Terry Boxy Hoodie & Sweatpants Set",
        category: "STREET WEARS",
        image: "/images/street-wears/street_men_heavy_hoodie_set_v2.png",
        badge: "MEN'S 450GSM TRACKSUIT",
        specs: "450GSM Heavyweight French Terry • Dropped Shoulders • Heavy Cuffed Sweats",
        accentColor: "#E21D1D"
      },
      {
        id: "street-4",
        name: "Men's Vintage Washed Heavy Oversized Tee & Tactical Cargo Pants Set",
        category: "STREET WEARS",
        image: "/images/street-wears/street_men_vintage_tee_cargo_set_v2.png",
        badge: "MEN'S TACTICAL STREET SET",
        specs: "300GSM Enzyme Washed Heavy Tee • Multi-Pocket Utility Tactical Cargo Pants",
        accentColor: "#8B5CF6"
      }
    ]
  },
  {
    id: "cat-leather",
    categoryName: "JACKETS",
    code: "04",
    tagline: "LEATHER • PUFFER • VARSITY • BOMBER & WINDBREAKER JACKETS",
    accentColor: "#E21D1D",
    products: [
      {
        id: "jacket-1",
        name: "Full-Grain Cowhide Biker Leather Jacket",
        category: "JACKETS",
        image: "/images/jackets/leather_biker.png",
        badge: "LEATHER BIKER JACKET",
        specs: "100% Genuine Full-Grain Leather • Asymmetric YKK Zippers • Heavy Quilted Silk Lining",
        accentColor: "#E21D1D"
      },
      {
        id: "jacket-2",
        name: "High-Insulation Quilted Winter Puffer Jacket",
        category: "JACKETS",
        image: "/images/jackets/leather_aviator_jacket.png",
        badge: "PUFFER DOWN JACKET",
        specs: "Heavy Down Fill Insulation • Water-Resistant Ripstop Shell • Storm Hood & Thermal Cuffs",
        accentColor: "#D97706"
      },
      {
        id: "jacket-3",
        name: "Heritage Wool & Leather Varsity Letterman Jacket",
        category: "JACKETS",
        image: "/images/jackets/leather_varsity.png",
        badge: "VARSITY BOMBER JACKET",
        specs: "24oz Heavy Melton Wool Body • Genuine Leather Sleeves • Striped Rib Knit Collar & Cuffs",
        accentColor: "#B45309"
      },
      {
        id: "jacket-4",
        name: "Modern Urban Technical Bomber & Windbreaker Jacket",
        category: "JACKETS",
        image: "/images/jackets/leather_cafe_racer.png",
        badge: "TACTICAL BOMBER JACKET",
        specs: "Weatherproof Matte Shell • Utility Sleeve Pockets • Military Heavy-Duty Ribbed Hem",
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

  const currentCollection = CATEGORIES_3D_DATA[activeCategory] || CATEGORIES_3D_DATA[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-between select-none py-1"
    >
      {/* 1. TOP CATEGORY SELECTOR (SIMPLE, SLEEK PILLS) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mb-2 flex flex-col items-center gap-1.5">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES_3D_DATA.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(idx)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-xs sm:text-xs font-bold uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#E21D1D] text-white shadow-[0_0_20px_rgba(226,29,29,0.5)] font-black scale-105"
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
        <p className="text-[10px] sm:text-[11px] font-mono text-neutral-400 tracking-widest uppercase text-center mt-0.5">
          {currentCollection.tagline}
        </p>
      </div>

      {/* 2. FREESTANDING 3D GARMENTS SHOWCASE (COMPACT SIZE & BUTTERY-SMOOTH HOVER ZOOM) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-2 sm:px-4 my-auto min-h-[300px] sm:min-h-[330px] md:min-h-[360px] lg:min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCollection.id}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-end justify-center"
          >
            {currentCollection.products.map((product, idx) => {
              const isHovered = hoveredCardIdx === idx;
              const isAnotherHovered = hoveredCardIdx !== null && hoveredCardIdx !== idx;

              return (
                <motion.div
                  key={product.id}
                  animate={{
                    scale: isHovered ? 1.16 : isAnotherHovered ? 0.93 : 1,
                    y: isHovered ? -12 : isAnotherHovered ? 3 : 0,
                    opacity: isAnotherHovered ? 0.42 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                    mass: 0.6
                  }}
                  onMouseEnter={() => {
                    setHoveredCardIdx(idx);
                    setActiveFocusCard(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  onClick={() => {
                    setSelectedProduct(product);
                    if (onSelectProduct) onSelectProduct(product);
                  }}
                  className={`relative flex flex-col items-center justify-end cursor-pointer group transform-gpu will-change-transform ${
                    isHovered ? "z-40" : "z-10"
                  }`}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Atmospheric Glow Spotlight Behind Freestanding Garment */}
                  <div
                    className={`absolute inset-0 rounded-full blur-[36px] transition-opacity duration-500 ease-out pointer-events-none ${
                      isHovered ? "opacity-85 scale-110" : "opacity-0 scale-75"
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${product.accentColor} 0%, rgba(226, 29, 29, 0.22) 50%, transparent 75%)`
                    }}
                  />

                  {/* FREESTANDING PRODUCT IMAGE (COMPACT, SLEEK PROPORTIONS WITH CRISP RESOLUTION) */}
                  <div className="relative w-full max-w-[190px] sm:max-w-[220px] md:max-w-[240px] h-[190px] sm:h-[230px] md:h-[260px] lg:h-[285px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain filter transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)] ${
                        isHovered
                          ? "scale-105 drop-shadow-[0_26px_36px_rgba(0,0,0,0.95)]"
                          : ""
                      }`}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle Zoom Badge On Hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1.5 right-1.5 bg-black/85 backdrop-blur-md border border-[#E21D1D]/70 text-white font-mono text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg pointer-events-none"
                      >
                        <ZoomIn className="w-3 h-3 text-[#E21D1D]" />
                        <span>ZOOMED</span>
                      </motion.div>
                    )}
                  </div>

                  {/* 3D Soft Floor Contact Shadow */}
                  <div
                    className="w-2/3 h-4 rounded-[100%] blur-[10px] bg-black/90 transition-all duration-400 ease-out pointer-events-none -mt-1"
                    style={{
                      transform: `scale(${isHovered ? 1.25 : 0.95})`,
                      opacity: isHovered ? 0.9 : isAnotherHovered ? 0.25 : 0.6
                    }}
                  />

                  {/* CLEAN PRODUCT TYPOGRAPHY (SLEEK & REFINED) */}
                  <div
                    className={`mt-1.5 flex flex-col items-center text-center transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : isAnotherHovered ? "opacity-30" : "opacity-85"
                    }`}
                  >
                    <span className="text-[8px] sm:text-[9px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
                      {product.badge}
                    </span>
                    <h4 className="text-xs sm:text-xs lg:text-sm font-display font-black text-white uppercase tracking-wider mt-0.5 line-clamp-1 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h4>

                    {/* Quick Specs Revealed on Hover */}
                    <div className="h-4 flex items-center justify-center mt-0.5">
                      {isHovered ? (
                        <motion.span
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[8px] sm:text-[9px] font-mono text-neutral-300 line-clamp-1 max-w-[190px]"
                        >
                          {product.specs}
                        </motion.span>
                      ) : (
                        <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                          0{idx + 1} / 04 • HOVER TO ZOOM
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
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
                  onMouseLeave={() => setHoveredCardIdx(null)}
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
