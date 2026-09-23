import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoveHorizontal, Eye, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

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
        image: "/images/hero-3d/01_purple_jersey.jpg",
        badge: "CLO 3D MATCH GRADE",
        specs: "Purple & Gold V-Neck • 180GSM Micro-Interlock • Zero-Fade Italian Sublimation",
        accentColor: "#9333EA"
      },
      {
        id: "sports-2",
        name: "Classic Striped Football Kit",
        category: "SPORTS WEARS",
        image: "/images/hero-3d/02_white_blue_jersey.jpg",
        badge: "PRO ATHLETIC KIT",
        specs: "White/Blue Striped • Anti-Bacterial Dri-Fit • Laser-Cut Ventilation",
        accentColor: "#3B82F6"
      },
      {
        id: "sports-3",
        name: "Vanguard Squad Match Jersey",
        category: "SPORTS WEARS",
        image: "/images/hero-3d/05_navy_jersey.jpg",
        badge: "MATCH LEVEL UNIFORM",
        specs: "Deep Navy & Royal Blue • Ergonomic Raglan Seaming • High-Flex Poly",
        accentColor: "#2563EB"
      },
      {
        id: "sports-4",
        name: "Sublimated Championship Team Kit",
        category: "SPORTS WEARS",
        image: "/images/hero-3d/sports_red_match_jersey.jpg",
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
        image: "/images/hero-3d/gym_seamless.jpg",
        badge: "3D SEAMLESS KNIT",
        specs: "320GSM Ribbed Compression • Ergonomic Muscle Mapping • Anti-Odor Spandex",
        accentColor: "#3B82F6"
      },
      {
        id: "gym-2",
        name: "Sculpted Hexagonal Impact Armor Top",
        category: "GYM AND FITNESS WEARS",
        image: "/images/hero-3d/06_padded_armor.jpg",
        badge: "HEX IMPACT FOAM ARMOR",
        specs: "Sculpted Abdominal & Shoulder Protection • 4-Way Stretch Compression",
        accentColor: "#06B6D4"
      },
      {
        id: "gym-3",
        name: "Pro Bodybuilding Stringer Tank",
        category: "GYM AND FITNESS WEARS",
        image: "/images/hero-3d/gym_stringer_tank.jpg",
        badge: "PERFORMANCE STRINGER",
        specs: "Deep Athletic Armholes • Quick-Dry 160GSM Microfiber • Raw Edge Stitch",
        accentColor: "#E21D1D"
      },
      {
        id: "gym-4",
        name: "4-Way Muscle Fit Compression Top",
        category: "GYM AND FITNESS WEARS",
        image: "/images/hero-3d/gym_compression_top.jpg",
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
        image: "/images/hero-3d/street_hoodie.jpg",
        badge: "450GSM FRENCH TERRY",
        specs: "100% Pre-Shrunk Organic Cotton • Double Layer Hood • Dropped Seams",
        accentColor: "#F59E0B"
      },
      {
        id: "street-2",
        name: "Heavyweight Raglan Zip Street Hoodie",
        category: "STREET WEARS",
        image: "/images/hero-3d/03_red_white_hoodie.jpg",
        badge: "HEAVYWEIGHT RAGLAN",
        specs: "Red/White Contrast Raglan • Heavy Antique Silver YKK Hardware • Boxy Fit",
        accentColor: "#EF4444"
      },
      {
        id: "street-3",
        name: "Washed Heavyweight Oversized Street Tee",
        category: "STREET WEARS",
        image: "/images/hero-3d/street_oversized_tee.jpg",
        badge: "300GSM OVERSIZED TEE",
        specs: "Washed Vintage Charcoal • Dropped Shoulders • Heavy Ribbed Crewneck",
        accentColor: "#A855F7"
      },
      {
        id: "street-4",
        name: "Urban Techwear Streetwear Jacket",
        category: "STREET WEARS",
        image: "/images/hero-3d/street_tech_jacket.jpg",
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
        image: "/images/hero-3d/leather_biker.jpg",
        badge: "1.2MM COWHIDE LEATHER",
        specs: "Drum-Dyed Top-Grain Cowhide • Heavy YKK Asymmetric Zips • Quilted Lining",
        accentColor: "#E21D1D"
      },
      {
        id: "leather-2",
        name: "Heritage Wool & Leather Varsity",
        category: "LEATHER JACKETS",
        image: "/images/hero-3d/leather_varsity.jpg",
        badge: "MELTON WOOL & COWHIDE",
        specs: "Heavy 24oz Melton Wool Body • Genuine Cowhide Sleeves • Snap Hardware",
        accentColor: "#D97706"
      },
      {
        id: "leather-3",
        name: "Waxed Cafe Racer Moto Leather Jacket",
        category: "LEATHER JACKETS",
        image: "/images/hero-3d/leather_cafe_racer.jpg",
        badge: "MANDARIN SNAP MOTO",
        specs: "Distressed Top-Grain Waxed Leather • Quilted Shoulders • Antique Brass Hardware",
        accentColor: "#B45309"
      },
      {
        id: "leather-4",
        name: "Aviator Shearling Bomber Leather Jacket",
        category: "LEATHER JACKETS",
        image: "/images/hero-3d/leather_aviator_jacket.jpg",
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

  // Active category state
  const [activeCategory, setActiveCategory] = useState<number>(currentCategoryIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Sync with prop if changed from outside
  useEffect(() => {
    setActiveCategory(currentCategoryIndex);
  }, [currentCategoryIndex]);

  // Handle category change and notify parent
  const changeCategory = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(CATEGORIES_3D_DATA.length - 1, index));
    setActiveCategory(clamped);
    setProgress(0);
    if (onCategoryChange) {
      onCategoryChange(clamped);
    }
  }, [onCategoryChange]);

  // ================= 1. AUTO-CHANGE FUNCTIONALITY ("khod sy change bhi hon") =================
  const AUTO_DURATION = 5500; // 5.5 seconds per category
  const TICK_INTERVAL = 50;
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAutoPlaying) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTO_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTO_DURATION) {
        setActiveCategory((prev) => {
          const next = (prev + 1) % CATEGORIES_3D_DATA.length;
          if (onCategoryChange) onCategoryChange(next);
          return next;
        });
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, TICK_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeCategory, isAutoPlaying, onCategoryChange]);

  // ================= 2. MOUSE MOVEMENT FUNCTIONALITY ("sath mouse movement sy bhi change hon") =================
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Drag interaction state
  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const dragOffset = useRef(0);
  const currentDragOffset = useRef(0);
  const [panX, setPanX] = useState(0);

  // Active / Hovered product
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Garment3DProduct | null>(null);

  // Smooth lerp animation loop for butter-smooth momentum
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      // Interpolate cursor coords
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      // Interpolate drag / pan offset
      currentDragOffset.current += (dragOffset.current - currentDragOffset.current) * 0.1;

      // Base pan from cursor position (-1 to 1) -> moves items horizontally
      const cursorPan = -currentPos.current.x * 200;
      const totalPan = cursorPan + currentDragOffset.current;

      setCoords({
        x: currentPos.current.x,
        y: currentPos.current.y
      });
      setPanX(totalPan);

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Last mouse zone to avoid rapid jitter
  const lastZoneRef = useRef<number>(activeCategory);

  // Handle mouse move across container:
  // - Computes normalized coordinates for 3D tilt & pan
  // - Divides screen into 4 interactive zones to change categories with horizontal cursor movement!
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Normalized from -1 (left) to +1 (right), -1 (top) to +1 (bottom)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    targetPos.current = {
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY))
    };

    // Calculate mouse position zone across 4 categories (0 to 1 across width)
    const ratio = Math.max(0, Math.min(0.999, (e.clientX - rect.left) / rect.width));
    const detectedZone = Math.floor(ratio * 4); // 0, 1, 2, 3

    // Change category when moving mouse across zones (with slight hysteresis)
    if (detectedZone !== lastZoneRef.current && Math.abs(ratio - (detectedZone * 0.25 + 0.125)) < 0.15) {
      lastZoneRef.current = detectedZone;
      changeCategory(detectedZone);
    }

    // Drag handling
    if (isDragging.current) {
      const deltaX = e.clientX - startDragX.current;
      dragOffset.current += deltaX * 0.4;
      startDragX.current = e.clientX;

      // Drag threshold to change category
      if (dragOffset.current > 160) {
        changeCategory((activeCategory - 1 + 4) % 4);
        dragOffset.current = 0;
      } else if (dragOffset.current < -160) {
        changeCategory((activeCategory + 1) % 4);
        dragOffset.current = 0;
      }
    }
  }, [activeCategory, changeCategory]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startDragX.current = e.clientX;
    setIsAutoPlaying(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    dragOffset.current = 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    dragOffset.current = 0;
    targetPos.current = { x: 0, y: 0 };
    setIsAutoPlaying(true);
  };

  // Wheel scroll to change category
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 40) {
      if (e.deltaX > 0 || e.deltaY > 0) {
        changeCategory((activeCategory + 1) % 4);
      } else {
        changeCategory((activeCategory - 1 + 4) % 4);
      }
    }
  };

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDragging.current = true;
      startDragX.current = e.touches[0].clientX;
      setIsAutoPlaying(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

    targetPos.current = {
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY))
    };

    if (isDragging.current) {
      const deltaX = touch.clientX - startDragX.current;
      dragOffset.current += deltaX * 0.7;
      startDragX.current = touch.clientX;

      if (dragOffset.current > 120) {
        changeCategory((activeCategory - 1 + 4) % 4);
        dragOffset.current = 0;
      } else if (dragOffset.current < -120) {
        changeCategory((activeCategory + 1) % 4);
        dragOffset.current = 0;
      }
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    dragOffset.current = 0;
    setIsAutoPlaying(true);
  };

  // 3D tilt values
  const rotateY = coords.x * 14;
  const rotateX = -coords.y * 8;

  const currentCollection = CATEGORIES_3D_DATA[activeCategory] || CATEGORIES_3D_DATA[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col items-center justify-between overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        perspective: "1200px"
      }}
    >
      {/* Dynamic Overhead Spotlight that tracks cursor */}
      <div
        className="absolute top-0 w-[640px] h-[360px] rounded-full blur-[110px] pointer-events-none opacity-45 transition-transform duration-300"
        style={{
          background: `radial-gradient(circle, ${currentCollection.accentColor}40 0%, rgba(255, 255, 255, 0.15) 35%, transparent 70%)`,
          transform: `translateX(${coords.x * 220}px) translateY(-40px)`
        }}
      />

      {/* Luxury Charcoal Studio Background Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/70 to-neutral-950 pointer-events-none" />

      {/* Studio Floor Reflection & Shadow Plane */}
      <div 
        className="absolute bottom-16 left-0 right-0 h-44 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
          transform: "rotateX(75deg)"
        }}
      />

      {/* TOP: MINIMALIST CATEGORY HUD (NO CLUTTERED TEXT, CLEAN STATUS & CATEGORY PILLS) */}
      <div className="relative z-30 w-full px-4 pt-2 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Active 4 Categories Selector Pills (Click or hover to switch) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-black/80 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-xl">
          {CATEGORIES_3D_DATA.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(idx)}
                onMouseEnter={() => changeCategory(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/40 font-black scale-105"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <span className={isActive ? "text-white/80" : "text-[#E21D1D]"}>{cat.code}</span>
                <span>{cat.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Auto-Change Play/Pause & Left/Right Arrows */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-2xl font-mono text-xs">
          <button
            onClick={() => changeCategory((activeCategory - 1 + 4) % 4)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Previous Category"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-[#E21D1D] font-black">{currentCollection.code}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">04</span>

          <button
            onClick={() => changeCategory((activeCategory + 1) % 4)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Next Category"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-neutral-700">|</span>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title={isAutoPlaying ? "Pause Auto-Change" : "Resume Auto-Change"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* CENTER: INTERACTIVE 3D MOVING STAGE (DYNAMIC CATEGORY PRODUCTS WITH 3D CURSOR PARALLAX) */}
      <div className="relative z-20 w-full flex-1 flex items-center justify-center my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCollection.id}
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex items-center justify-center gap-5 sm:gap-8 lg:gap-12 transition-transform duration-75 ease-out w-full px-4"
            style={{
              transform: `translateX(${panX}px)`,
              transformStyle: "preserve-3d"
            }}
          >
            {(() => {
              const activeCursorIdx = hoveredIdx !== null 
                ? hoveredIdx 
                : Math.max(0, Math.min(3, Math.floor(((coords.x + 1) / 2) * 4)));

              return currentCollection.products.map((product, idx) => {
                const itemOffsetX = (idx - 1.5) * 230 + panX;
                const normalizedDist = Math.abs(itemOffsetX) / 320;
                const isCenter = normalizedDist < 0.6;
                const isHovered = activeCursorIdx === idx;

                const zDepth = isHovered ? 65 : isCenter ? 35 : Math.max(0, 20 - normalizedDist * 12);
                const scale = isHovered ? 1.07 : isCenter ? 1.02 : 0.94;
                const brightness = isHovered ? 1.1 : isCenter ? 1.0 : 0.88;

                // Individual 3D card tilt towards cursor
                const cardRotateY = rotateY * (isHovered ? 1.1 : 0.7);
                const cardRotateX = rotateX * (isHovered ? 1.1 : 0.7);

                return (
                  <motion.div
                    key={product.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => {
                      setSelectedProduct(product);
                      if (onSelectProduct) onSelectProduct(product);
                    }}
                    animate={{
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 4 + (idx % 2) * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.35
                    }}
                    className="relative shrink-0 w-[200px] sm:w-[240px] lg:w-[270px] aspect-3/4 flex flex-col items-center justify-end group transition-all duration-300 cursor-pointer"
                    style={{
                      transform: `translateZ(${zDepth}px) rotateY(${cardRotateY}deg) rotateX(${cardRotateX}deg) scale(${scale})`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Garment Studio Card */}
                    <div 
                      className={`relative w-full h-full rounded-3xl overflow-hidden transition-all duration-300 border ${
                        isHovered
                          ? "border-[#E21D1D] shadow-2xl shadow-[#E21D1D]/35 scale-[1.02]"
                          : isCenter
                          ? "border-white/25 shadow-xl shadow-black/85"
                          : "border-white/10 opacity-90 shadow-lg shadow-black/90"
                      }`}
                      style={{
                        filter: `brightness(${brightness})`,
                        background: "radial-gradient(circle at 50% 30%, #222226 0%, #121215 65%, #09090b 100%)"
                      }}
                    >
                      {/* Garment Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-white/10 pointer-events-none" />

                      {/* Top Micro Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white font-mono text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {product.badge}
                        </span>
                        
                        <div className="w-6 h-6 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-[#E21D1D] transition-colors">
                          <Eye className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Bottom Title Bar on Card */}
                      <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-0.5">
                        <span className="text-[9px] font-mono text-[#E21D1D] uppercase font-bold tracking-widest">
                          {product.category}
                        </span>
                        <span className="text-xs sm:text-sm font-display font-black text-white uppercase tracking-wide truncate">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    {/* REALISTIC 3D CONTACT FLOOR SHADOW UNDERNEATH GARMENT */}
                    <div
                      className="w-3/4 h-7 rounded-[100%] blur-[12px] bg-black/90 transition-all duration-300 mt-2.5"
                      style={{
                        transform: `translateX(${-coords.x * 12}px) scale(${isHovered ? 0.85 : 1})`,
                        opacity: isHovered ? 0.5 : 0.85
                      }}
                    />
                  </motion.div>
                );
              });
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM: 4 MINI GARMENT CARDS (CHOTA SIZE OF UPPER IMAGES TO FILL SPACE & MENTION HOVERED PRODUCT) */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-4 pb-3 pt-2 pointer-events-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
          {(() => {
            const activeCursorIdx = hoveredIdx !== null 
              ? hoveredIdx 
              : Math.max(0, Math.min(3, Math.floor(((coords.x + 1) / 2) * 4)));

            return currentCollection.products.map((product, idx) => {
              const isMentioned = activeCursorIdx === idx;

              return (
                <button
                  key={`mini-shelf-${product.id}`}
                  onClick={() => {
                    setSelectedProduct(product);
                    if (onSelectProduct) onSelectProduct(product);
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative p-2 sm:p-2.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-2.5 sm:gap-3 group backdrop-blur-md ${
                    isMentioned
                      ? "border-[#E21D1D] bg-neutral-900/95 shadow-xl shadow-[#E21D1D]/35 scale-[1.03] ring-1 ring-[#E21D1D]/50"
                      : "border-white/10 bg-black/60 hover:bg-black/85 hover:border-white/20 opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Mini Image (Chota Size) */}
                  <div className="w-11 h-14 sm:w-13 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-900 border border-white/10 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                    />
                    {isMentioned && (
                      <div className="absolute inset-0 bg-[#E21D1D]/20 pointer-events-none" />
                    )}
                  </div>

                  {/* Info & Active Mention */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`font-mono text-[9px] font-black uppercase tracking-wider ${
                        isMentioned ? "text-[#E21D1D]" : "text-neutral-500"
                      }`}>
                        0{idx + 1}
                      </span>
                      {isMentioned && (
                        <span className="inline-flex items-center gap-1 bg-[#E21D1D]/20 border border-[#E21D1D]/40 text-[#E21D1D] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                          <span className="w-1 h-1 rounded-full bg-[#E21D1D]" />
                          CURSOR FOCUS
                        </span>
                      )}
                    </div>

                    <span className={`font-display font-bold text-[11px] sm:text-xs truncate uppercase mt-0.5 block leading-tight ${
                      isMentioned ? "text-white font-black" : "text-neutral-300"
                    }`}>
                      {product.name}
                    </span>

                    <span className="text-[9px] font-mono text-neutral-400 truncate uppercase mt-0.5 block">
                      {product.badge}
                    </span>
                  </div>
                </button>
              );
            });
          })()}
        </div>

        {/* Progress Bar for Auto-Change */}
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-3">
          <div
            className="bg-[#E21D1D] h-full transition-all duration-75 ease-linear glow-red-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* INSPECT 3D GARMENT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden z-10 shadow-2xl"
            >
              <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Authentic TRY WEARS Crest in Modal */}
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
                  ✕
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
                    className="px-5 py-3.5 rounded-xl border border-neutral-800 text-neutral-300 font-mono text-xs font-bold uppercase hover:bg-neutral-900 transition-colors cursor-pointer"
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
