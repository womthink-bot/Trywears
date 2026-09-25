import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from "motion/react";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
  Factory,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkle,
  Box,
  Sliders,
  Play,
  Pause,
  Maximize2
} from "lucide-react";

import {
  CATEGORIES_DATA,
  CategoryData,
  CategoryProduct,
  SubCategoryItem
} from "../data/categoriesData";

export type { CategoryData, CategoryProduct, SubCategoryItem };
export { CATEGORIES_DATA };

// ==============================================================
// 1. INTERACTIVE 3D PRODUCT CARD COMPONENT
// Features: True 3D perspective tilt with mouse tracking,
// specular glass sheen, floating garment cutout (translateZ 45px),
// column-based tiered scroll parallax, and idle breathing float.
// ==============================================================
interface ProductCardProps {
  product: CategoryProduct;
  index: number;
  scrollYProgress: any;
  onInspect: (product: CategoryProduct) => void;
  onHoverChange?: (hovered: boolean) => void;
}

const Interactive3DProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  scrollYProgress,
  onInspect,
  onHoverChange
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics in 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 22,
    stiffness: 240
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 22,
    stiffness: 240
  });

  // Column calculation (0, 1, 2) for tiered 3D scroll depth separation
  const col = index % 3;
  const row = Math.floor(index / 3);

  // Column-based parallax scroll separation (creates dynamic 3D depth between columns)
  const columnParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    col === 0 ? [-20, 20] : col === 1 ? [0, 0] : [20, -20]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Specular reflection gradient based on mouse position
  const glossX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: columnParallaxY,
        perspective: "1100px"
      }}
      initial={{ opacity: 0, y: 45, rotateX: 18, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: (col * 0.07) + (row * 0.05),
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`h-full ${isHovered ? "z-50 relative" : "z-10 relative"}`}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onInspect(product)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={`relative h-full rounded-2xl border transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer group bg-neutral-950/85 backdrop-blur-md ${
          isHovered
            ? "border-[#E21D1D]/80 shadow-[0_28px_60px_rgba(0,0,0,0.98)] bg-neutral-900/95 ring-1 ring-[#E21D1D]/40"
            : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60"
        }`}
      >
        {/* Dynamic Specular Gloss Sheen follows cursor */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl z-20 opacity-30 overflow-hidden"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 65%)`,
              left: glossX,
              top: glossY,
              transform: "translate(-50%, -50%)",
              width: "140%",
              height: "140%"
            }}
          />
        )}

        {/* Ambient Backlight Glow matching product accent */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: product.accentColor,
            opacity: isHovered ? 0.45 : 0.06
          }}
        />

        {/* Top Card Info (elevated in 3D: translateZ 18px) */}
        <div
          className="z-10 flex items-start justify-between gap-1 mb-1"
          style={{ transform: "translateZ(18px)" }}
        >
          <div className="truncate">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-mono text-[8px] font-bold text-neutral-500 uppercase">
                SAMPLE #{product.sampleNum < 10 ? `0${product.sampleNum}` : product.sampleNum}
              </span>
              {product.subCategory && (
                <>
                  <span className="text-neutral-600 font-mono text-[8px]">•</span>
                  <span 
                    className="font-mono text-[7.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded truncate max-w-[125px]"
                    style={{
                      backgroundColor: `${product.accentColor}20`,
                      color: product.accentColor,
                      border: `1px solid ${product.accentColor}40`
                    }}
                  >
                    {product.subCategory}
                  </span>
                </>
              )}
            </div>
            <h5 className="font-display font-black text-xs text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#E21D1D] transition-colors">
              {product.name}
            </h5>
            <span className="font-mono text-[8px] text-neutral-400 block truncate">
              {product.subtitle}
            </span>
          </div>

          <span
            className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded border uppercase shrink-0"
            style={{
              borderColor: `${product.accentColor}66`,
              color: product.accentColor,
              backgroundColor: `${product.accentColor}15`
            }}
          >
            {product.gsm}
          </span>
        </div>

        {/* 100% TRANSPARENT PNG GARMENT CUTOUT WITH SMOOTH HOVER ZOOM & 3D FLOAT */}
        <div
          className="relative w-full h-[155px] sm:h-[170px] flex items-center justify-center my-1.5"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Reactive 3D Ground Shadow */}
          <motion.div
            className="absolute bottom-1 w-3/4 h-3.5 rounded-full blur-[7px] pointer-events-none"
            animate={{
              scale: isHovered ? 1.25 : [0.92, 1.05, 0.92],
              opacity: isHovered ? 0.95 : 0.75
            }}
            transition={{
              scale: isHovered ? { duration: 0.25 } : { duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.25 }
            }}
            style={{
              background: "rgba(0, 0, 0, 0.95)"
            }}
          />

          {/* Transparent Product Cutout Image with Smooth, Clear Hover Zoom in 3D (Text does NOT zoom, ONLY product zooms) */}
          <motion.div
            className="relative z-40 max-w-full max-h-full flex items-center justify-center pointer-events-none"
            style={{
              transform: isHovered ? "translateZ(80px)" : "translateZ(20px)"
            }}
            animate={{
              scale: isHovered ? 1.58 : 1,
              y: isHovered ? -10 : [0, -5, 0]
            }}
            transition={{
              scale: { type: "spring", stiffness: 340, damping: 22 },
              y: isHovered
                ? { duration: 0.22, ease: "easeOut" }
                : { duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`max-w-full max-h-[145px] sm:max-h-[160px] object-contain filter transition-all duration-300 ${
                isHovered
                  ? "drop-shadow-[0_28px_45px_rgba(0,0,0,0.98)] brightness-110 contrast-105"
                  : "drop-shadow-[0_14px_20px_rgba(0,0,0,0.8)] opacity-95"
              }`}
              loading="lazy"
            />
          </motion.div>

          {/* Subtle Hover Inspect Indicator in corner */}
          <div
            className={`absolute top-1 right-1 bg-black/80 border border-white/20 text-white p-1.5 rounded-full transition-all duration-200 z-30 ${
              isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-1"
            }`}
            title="Click to Inspect 3D Fabric Details"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#E21D1D]" />
          </div>
        </div>

        {/* Bottom Card Meta (translateZ 18px in 3D) */}
        <div
          className="z-10 space-y-1 pt-1.5 border-t border-neutral-800"
          style={{ transform: "translateZ(18px)" }}
        >
          <p className="font-mono text-[8px] text-neutral-400 line-clamp-1">
            {product.fabric}
          </p>

          <div className="flex items-center justify-between font-mono text-[8px]">
            <span className="text-neutral-500">MOQ: {product.moq}</span>
            <span className="flex items-center gap-1 font-bold text-white group-hover:text-[#E21D1D] transition-colors">
              <span>3D SPECS</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==============================================================
// 2. CATEGORY SHOWCASE SECTION COMPONENT
// Features: Section-level useScroll, dynamic category-specific live
// moving background imagery with scroll parallax, cinematic zoom,
// volumetric spotlight sweeps, 3D mouse perspective shift,
// ambient particle atmosphere, and under-card glowing chamber!
// ==============================================================
const CATEGORY_BACKGROUND_THEMES: Record<
  string,
  {
    environmentBadge: string;
    ambientSecondary: string;
    watermark: string;
    atmosphereTag: string;
    laserColor: string;
  }
> = {
  "sports-wears": {
    environmentBadge: "LIVE STADIUM FLOODLIGHTS • ARENA SECTOR 01",
    ambientSecondary: "#9333EA",
    watermark: "MATCH PRO ARMORY // SUBLIMATION // 400N SEAMS // ZERO FADE",
    atmosphereTag: "TURF FLOODLIGHTS • HIGH AEROBIC MESH",
    laserColor: "#E21D1D"
  },
  "gym-fitness": {
    environmentBadge: "CYBER POWER CAGE • ATHLETIC FACILITY 02",
    ambientSecondary: "#06B6D4",
    watermark: "POWER COMPRESSION // DUAL KNIT // MUSCLE LOCK MATRIX",
    atmosphereTag: "ISO TRAINING CAGE • CHALK DUST DISPERSION",
    laserColor: "#3B82F6"
  },
  "street-wears": {
    environmentBadge: "METROPOLITAN BRUTALISM • NEON SECTOR 03",
    ambientSecondary: "#EF4444",
    watermark: "OVERSIZED LUXURY // 460GSM TERRY // RAW HEM BRUTALISM",
    atmosphereTag: "NEON RAIN ASPHALT • CONCRETE ARCHITECTURE",
    laserColor: "#F59E0B"
  },
  "leather-jackets": {
    environmentBadge: "HAND-CRAFTED ATELIER • TUNGSTEN FORGE 04",
    ambientSecondary: "#B45309",
    watermark: "1.2MM DRUM DYED // BRASS HARDWARE // HEIRLOOM GRAIN",
    atmosphereTag: "TUNGSTEN WORKSHOP • VINTAGE MOTORCYCLE ATELIER",
    laserColor: "#D97706"
  }
};

interface CategoryShowcaseSectionProps {
  category: CategoryData;
  onInspect: (product: CategoryProduct) => void;
}

const CategoryShowcaseSection: React.FC<CategoryShowcaseSectionProps> = ({
  category,
  onInspect
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isLeftImage = category.alignImageLeft;
  const themeDetails =
    CATEGORY_BACKGROUND_THEMES[category.id] || CATEGORY_BACKGROUND_THEMES["sports-wears"];

  // Multi-page product sliding, subcategory filtering and auto-slide state
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [isHoveredOnProducts, setIsHoveredOnProducts] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const filteredProducts = selectedSubCategory === "all"
    ? category.products
    : category.products.filter((p) => p.subCategoryId === selectedSubCategory);

  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentProducts = filteredProducts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleSelectSubCategory = (subId: string) => {
    setSelectedSubCategory(subId);
    setCurrentPage(0);
    setSlideProgress(0);
  };

  // Auto-slide effect:
  // If mouse is NOT hovering over products, it auto-slides down / to next batch every 3.8s!
  // If mouse IS hovering over products, auto-slide halts/pauses ("agr mouse product pr ho to nechy slide nah ho")!
  useEffect(() => {
    if (isHoveredOnProducts || !autoSlideEnabled || totalPages <= 1) {
      return;
    }

    const intervalTime = 50;
    const totalDuration = 7000; // 7s calm interval per slide
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setSlideDirection("next");
          setCurrentPage((p) => (p + 1) % totalPages);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHoveredOnProducts, autoSlideEnabled, totalPages]);

  const handlePrevPage = () => {
    setSlideDirection("prev");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setSlideProgress(0);
  };

  const handleNextPage = () => {
    setSlideDirection("next");
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setSlideProgress(0);
  };

  // Scroll Progress across this specific category section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Section-wide 3D Mouse Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-24, 24]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.8, -1.8]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
    damping: 30,
    stiffness: 180
  });

  // Scroll Parallax for Section-Wide Living Background Image
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const bgParallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.24, 1.07, 1.22]);
  const bgParallaxRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [-1.8, 1.8] : [1.8, -1.8]
  );

  // Large Typographic Watermark Smooth Horizontal Parallax
  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? ["-6%", "6%"] : ["6%", "-6%"]
  );

  // Volumetric Sweeping Spotlight Gliding across Background
  const spotlightSweepX = useTransform(scrollYProgress, [0, 1], ["-40%", "140%"]);
  const spotlightRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [-20, 20] : [20, -20]
  );

  // Parallax calculations for the Big Contextual Hero Card
  const heroY = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const heroRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [3.5, -3.5] : [-3.5, 3.5]
  );
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [2.5, -2.5]);
  const heroBgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.04, 1.1]);
  const lightSheenX = useTransform(scrollYProgress, [0, 1], ["-120%", "220%"]);

  // Scanning Laser Line through Under-Grid Chamber
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id={`cat-section-${category.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden min-h-[920px] select-none"
    >
      {/* ============================================================== */}
      {/* 1. DYNAMIC CATEGORY-SPECIFIC LIVING BACKGROUND SYSTEM          */}
      {/* Moves on scroll with parallax, zoom, and live 3D mouse tilt    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Living Background Image with 3D Depth & Scroll Parallax */}
        <motion.div
          style={{
            y: bgParallaxY,
            x: bgMouseX,
            scale: bgParallaxScale,
            rotate: bgParallaxRotate,
            rotateX: bgMouseRotateX,
            rotateY: bgMouseRotateY,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-[-12%] w-[124%] h-[124%]"
        >
          <img
            src={category.bgImage}
            alt={category.bgAlt}
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-125 saturate-125"
          />

          {/* Continuous Subtle Camera Breathe Float */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              scale: [1, 1.025, 1],
              opacity: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Multi-layered Vignettes: Center translucency + deep edge fading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-[1]" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 25%, rgba(0, 0, 0, 0.8) 85%, black 100%)"
          }}
        />

        {/* Sweeping Live Volumetric Spotlight Beam on Scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2] opacity-35"
          style={{
            x: spotlightSweepX,
            rotate: spotlightRotate,
            background: `linear-gradient(90deg, transparent 0%, ${category.themeColor}33 45%, rgba(255,255,255,0.25) 50%, ${themeDetails.ambientSecondary}33 55%, transparent 100%)`,
            filter: "blur(40px)"
          }}
        />

        {/* Ambient Category Pulsing Glow Orb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[180px] pointer-events-none z-[2]"
          style={{
            backgroundColor: category.themeColor,
            left: isLeftImage ? "5%" : "55%"
          }}
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.18, 0.32, 0.18]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Large Typographic Watermark Gliding across Background */}
        <motion.div
          style={{ x: watermarkX }}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] pointer-events-none select-none z-[2] opacity-[0.06] whitespace-nowrap"
        >
          <span className="font-display font-black text-[120px] sm:text-[180px] uppercase tracking-tighter text-white block">
            {themeDetails.watermark}
          </span>
        </motion.div>

        {/* Technical Blueprint Coordinate Grid Overlay */}
        <div
          className="absolute inset-0 z-[2] opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${category.themeColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Live Ambient Floating Particles & Embers (12 Dynamic motes) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? category.themeColor : themeDetails.ambientSecondary,
                width: `${2 + (i % 3) * 2}px`,
                height: `${2 + (i % 3) * 2}px`,
                left: `${8 + (i * 7.5)}%`,
                top: `${15 + (i % 5) * 16}%`,
                filter: "blur(0.5px)"
              }}
              animate={{
                y: [-35 - (i * 4), 35 + (i * 4), -35 - (i * 4)],
                x: [-18 + (i % 4) * 8, 18 - (i % 4) * 8, -18 + (i % 4) * 8],
                opacity: [0.15, 0.75, 0.15],
                scale: [0.8, 1.4, 0.8]
              }}
              transition={{
                duration: 4.8 + (i % 4) * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.28
              }}
            />
          ))}
        </div>

        {/* Background Environment Live Status Tag in Top Right Corner */}
        <div className="absolute top-4 right-6 z-[3] hidden md:flex items-center gap-2 font-mono text-[9px] text-neutral-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: category.themeColor }}
          />
          <span className="tracking-wider uppercase">{themeDetails.environmentBadge}</span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND CONTENT: 5-COL HERO + 7-COL 3x3 PRODUCT GRID     */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ============================================================== */}
          {/* BIG CONTEXTUAL HERO IMAGE BLOCK (MATCHING USER IMAGE.PNG EXACTLY!) */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-5 flex flex-col h-full ${
              isLeftImage ? "lg:order-1" : "lg:order-2"
            }`}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{
                y: heroY,
                rotateY: heroRotateY,
                rotateX: heroRotateX,
                transformStyle: "preserve-3d"
              }}
              className="relative rounded-3xl overflow-hidden border border-neutral-700/80 bg-neutral-950/95 flex-1 h-full flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] group min-h-[580px] backdrop-blur-md"
            >
              {/* Big High-Resolution 3D Model / Garment Image (3d_gym_wear.jpg, 3d_jersey_clo.jpg) */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={category.heroImage}
                  alt={category.heroImageAlt || category.name}
                  style={{ scale: heroBgScale }}
                  className="w-full h-full object-cover object-top filter brightness-[0.88] contrast-110 transition-transform duration-700 ease-out"
                />
                {/* Vignette gradients for pristine text readability matching image.png */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Dynamic Sweeping Light Reflection Sheen as you scroll */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-20 z-10"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.45) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 52%, transparent 65%)",
                  x: lightSheenX
                }}
              />

              {/* Top Category Badge */}
              <div
                className="relative z-10 p-6 sm:p-7 flex items-center justify-between"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="inline-flex items-center gap-2 bg-black/85 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.themeColor }}
                  />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    {category.code} / 04 — {category.name}
                  </span>
                </div>

                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: category.themeColor }}
                />
              </div>

              {/* Bottom Card Content matching image.png */}
              <div
                className="relative z-10 p-6 sm:p-7 space-y-4"
                style={{ transform: "translateZ(25px)" }}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#E21D1D] uppercase block mb-1">
                    {category.code} / 04 - {category.name}
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed font-medium">
                    {category.description}
                  </p>
                </div>

                {/* KEY STATS BLOCK (MATCHING IMAGE.PNG EXACTLY) */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                    KEY STATS
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {category.stats.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col justify-center"
                      >
                        <span className="font-mono text-[11px] sm:text-xs font-black text-white block">
                          {st.label}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-400 block uppercase mt-0.5 truncate">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUB-CATEGORIES DIVISION SELECTOR */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      SUB-CATEGORIES ({category.subCategories.length})
                    </span>
                    <span className="text-[9px] font-mono text-[#E21D1D] font-bold">
                      CLICK TO FILTER
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {category.subCategories.map((sub) => {
                      const isSubActive = selectedSubCategory === sub.id;
                      const count = category.products.filter((p) => p.subCategoryId === sub.id).length;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSelectSubCategory(isSubActive ? "all" : sub.id)}
                          className={`text-left p-2 rounded-xl border text-[10px] font-mono transition-all cursor-pointer flex items-center justify-between group/sub ${
                            isSubActive
                              ? "bg-[#E21D1D] border-[#E21D1D] text-white shadow-lg shadow-red-900/40"
                              : "bg-black/80 hover:bg-neutral-900/90 border-white/15 text-neutral-300 hover:text-white"
                          }`}
                        >
                          <span className="truncate font-bold">{sub.name}</span>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                            isSubActive ? "bg-black/50 text-white" : "bg-neutral-800 text-neutral-400"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ACTION CTA BUTTONS (MATCHING IMAGE.PNG EXACTLY) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="#collections"
                    className="bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xl shadow-red-900/40 transition-all cursor-pointer"
                  >
                    <span>EXPLORE {category.name.split(" ")[0]} COLLECTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#b2b-calculator"
                    className="bg-black/70 hover:bg-black/95 text-white border border-white/25 hover:border-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <span>REQUEST OEM QUOTE</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* 9 PRODUCT CARDS GRID (3x3 EQUAL MATCHING HEIGHT!)              */}
          {/* WITH CLEAN LEFT/RIGHT NAVIGATION AND SMOOTH HOVER ZOOM         */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between h-full relative ${
              isLeftImage ? "lg:order-2" : "lg:order-1"
            }`}
            onMouseEnter={() => setIsHoveredOnProducts(true)}
            onMouseLeave={() => setIsHoveredOnProducts(false)}
          >
            {/* Ambient Under-Grid Chamber Backdrop Layer */}
            <div className="absolute inset-0 -m-3 sm:-m-4 pointer-events-none rounded-3xl overflow-hidden -z-10">
              <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[6px] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />

              {/* Scanning Laser Line through Under-Grid Chamber */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] opacity-35 z-0"
                style={{
                  top: scanLineY,
                  background: `linear-gradient(90deg, transparent 5%, ${category.themeColor} 50%, transparent 95%)`
                }}
              />

              {/* Glowing Aura directly behind product cards */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full blur-[120px] pointer-events-none"
                style={{
                  backgroundColor: category.themeColor,
                  opacity: 0.16
                }}
                animate={{
                  scale: [0.92, 1.12, 0.92],
                  opacity: [0.12, 0.22, 0.12]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Header Bar above products with clean, intuitive navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-[#E21D1D]">
                  [SAMPLE LINEUP]
                </span>
                <h4 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight">
                  {category.name}
                  {selectedSubCategory !== "all" && (
                    <span className="text-[#E21D1D] font-mono text-xs ml-2 normal-case font-bold">
                      / {category.subCategories.find((s) => s.id === selectedSubCategory)?.name}
                    </span>
                  )}
                </h4>
                <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900/90 px-2.5 py-0.5 rounded-full border border-neutral-800">
                  {filteredProducts.length > 0 ? currentPage * pageSize + 1 : 0}-{Math.min((currentPage + 1) * pageSize, filteredProducts.length)} OF {filteredProducts.length}
                </span>
              </div>

              {/* Clean Left/Right Controls with Page Indicator */}
              <div className="flex items-center gap-2">
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/85 border border-neutral-700/80 rounded-xl p-1 shadow-lg backdrop-blur-md">
                    <button
                      onClick={handlePrevPage}
                      aria-label="Previous Products (Left)"
                      title="Previous Products"
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[10px] font-bold text-white px-2 tracking-wider">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      aria-label="Next Products (Right)"
                      title="Next Products"
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* HIGH-TECH SUB-CATEGORY SELECTOR TABS */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3 bg-black/60 p-1.5 sm:p-2 rounded-2xl border border-neutral-800/80 backdrop-blur-md">
              <div className="flex items-center gap-1.5 mr-1 font-mono text-[9px] font-black text-neutral-400 uppercase tracking-wider pl-1">
                <Layers className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="hidden sm:inline">SUB-CATEGORIES:</span>
              </div>

              <button
                onClick={() => handleSelectSubCategory("all")}
                className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSubCategory === "all"
                    ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/30 scale-102"
                    : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                <span>ALL SAMPLES</span>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                  selectedSubCategory === "all" ? "bg-black/40 text-white" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {category.products.length}
                </span>
              </button>

              {category.subCategories.map((sub) => {
                const isSubActive = selectedSubCategory === sub.id;
                const count = category.products.filter((p) => p.subCategoryId === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectSubCategory(sub.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSubActive
                        ? "bg-white text-black shadow-lg shadow-white/20 font-black scale-102"
                        : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800"
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                      isSubActive ? "bg-black text-white" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3x3 Grid of 9 Products with Smooth Transition */}
            <div className="relative flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={currentPage}
                  custom={slideDirection}
                  variants={{
                    enter: (dir) => ({
                      opacity: 0,
                      y: dir === "next" ? 20 : -20,
                      scale: 0.99
                    }),
                    center: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.35, ease: "easeOut" }
                    },
                    exit: (dir) => ({
                      opacity: 0,
                      y: dir === "next" ? -20 : 20,
                      scale: 0.99,
                      transition: { duration: 0.25, ease: "easeIn" }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5 flex-1 relative z-10"
                >
                  {currentProducts.map((product, pIdx) => (
                    <Interactive3DProductCard
                      key={product.id}
                      product={product}
                      index={pIdx}
                      scrollYProgress={scrollYProgress}
                      onInspect={onInspect}
                      onHoverChange={(hovered) => {
                        if (hovered) setIsHoveredOnProducts(true);
                      }}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar with Interactive Dots & Total Count */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D]" />
                  <span>
                    {filteredProducts.length} SAMPLES DISPLAYED
                    {selectedSubCategory !== "all"
                      ? ` IN ${category.subCategories.find((s) => s.id === selectedSubCategory)?.name.toUpperCase()}`
                      : ` • ${category.products.length} TOTAL IN CATEGORY`}
                  </span>
                </span>

                {/* Interactive Page Dots */}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSlideDirection(i > currentPage ? "next" : "prev");
                        setCurrentPage(i);
                        setSlideProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentPage === i
                          ? "w-7 bg-[#E21D1D]"
                          : "w-2 bg-neutral-700 hover:bg-neutral-500"
                      }`}
                      title={`Jump to Page ${i + 1}`}
                    />
                  ))}
                </div>

                <span className="hidden sm:inline text-neutral-500">
                  {isHoveredOnProducts ? "HOVER PAUSED" : "AUTO-ADVANCING"}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

// ==============================================================
// 3. MAIN SCROLL-DECONSTRUCTED EXPORT ARMORY COMPONENT
// ==============================================================
export const ScrollDeconstructed3DGarment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("sports-wears");
  const [inspectModalProduct, setInspectModalProduct] = useState<CategoryProduct | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1.0);

  // Active Category Scroll-Spy: detect which category is currently in view
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const cat of CATEGORIES_DATA) {
        const el = document.getElementById(`cat-section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Smooth scroll to specific category section
  const handleScrollToCategory = (catId: string) => {
    setActiveTab(catId);
    const el = document.getElementById(`cat-section-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeCategory = CATEGORIES_DATA.find((c) => c.id === activeTab) || CATEGORIES_DATA[0];

  return (
    <div
      id="3d-deconstruction"
      className="relative w-full bg-black text-white selection:bg-[#E21D1D] selection:text-white"
    >
      {/* ================= 1. SECTION INTRO HEADER & QUICK JUMP BAR ================= */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 max-w-7xl mx-auto border-b border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="font-mono text-xs font-black tracking-widest text-[#E21D1D] uppercase">
                PRO ATHLETIC GEAR & APPAREL • STREET / ATHLEISURE / LEATHER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-none">
              4 CORE OEM CATEGORIES & SUB-DIVISIONS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-2 max-w-2xl uppercase">
              Main categories featuring dedicated sub-categories (Football Uniforms, Basketball, Compression, Streetwear, Leather MOTO) with interactive 3D product zoom.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 shrink-0">
            <Factory className="w-4 h-4 text-[#E21D1D]" />
            <span>OEM FACTORY PRODUCTION • 24 HR DISPATCH</span>
          </div>
        </div>

        {/* 4 CATEGORIES QUICK-JUMP BUTTONS WITH DYNAMIC ACTIVE GLIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleScrollToCategory(cat.id)}
                className={`relative text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group overflow-hidden ${
                  isActive
                    ? "border-[#E21D1D] shadow-lg shadow-[#E21D1D]/20 bg-neutral-900/90"
                    : "bg-neutral-950 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                }`}
              >
                {/* Active Sliding Glowing Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryGlow"
                    className="absolute inset-0 bg-[#E21D1D]/15 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex-1 min-w-0 pr-2">
                  <span className="font-mono text-[9px] font-bold text-neutral-500 group-hover:text-neutral-300 block">
                    CATEGORY {cat.code} • {cat.products.length} SAMPLES
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-white group-hover:text-[#E21D1D] transition-colors truncate block">
                    {cat.name}
                  </span>

                  {/* Sub-categories preview pills */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {cat.subCategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[7.5px] font-mono text-neutral-400 bg-neutral-900/90 px-1.5 py-0.5 rounded border border-white/5 truncate max-w-[105px]"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subCategories.length > 3 && (
                      <span className="text-[7.5px] font-mono text-[#E21D1D] font-bold self-center">
                        +{cat.subCategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 relative z-10 transition-all ${
                    isActive ? "text-[#E21D1D] translate-x-1" : "text-neutral-500 group-hover:text-white group-hover:translate-x-1"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STICKY / FLOATING 3D SPATIAL SCROLL HUD ================= */}
      <div className="sticky top-0 z-30 py-2.5 px-4 sm:px-6 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
          <span className="text-[#E21D1D] font-bold tracking-wider">3D SCROLL PERSPECTIVE</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-300 uppercase truncate">
            STAGE {activeCategory.code}: {activeCategory.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* 4 Interactive Category Stage Dots */}
          <div className="flex items-center gap-1.5">
            {CATEGORIES_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => handleScrollToCategory(c.id)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === c.id
                    ? "w-7 bg-[#E21D1D]"
                    : "w-2.5 bg-neutral-700 hover:bg-neutral-500"
                }`}
                title={c.name}
              />
            ))}
          </div>

          <span className="text-[10px] text-neutral-400 hidden md:inline">
            72 TOTAL SAMPLES (18/CAT)
          </span>
        </div>
      </div>

      {/* ================= 2. THE 4 ALTERNATING BALANCED SECTIONS ================= */}
      {/*
        Both sides have exact equal matching heights via `items-stretch` and `h-full flex-1`:
        Category 1: SPORTS WEARS -> [Big Image LEFT (Equal Height)] | [9 Products RIGHT (3x3)]
        Category 2: GYM & FITNESS -> [9 Products LEFT (3x3)] | [Big Image RIGHT (Equal Height)] (Sides Change!)
        Category 3: STREET WEARS  -> [Big Image LEFT (Equal Height)] | [9 Products RIGHT (3x3)] (Sides Change!)
        Category 4: LEATHER JACKETS -> [9 Products LEFT (3x3)] | [Big Image RIGHT (Equal Height)] (Sides Change!)
      */}
      <div className="divide-y divide-neutral-900">
        {CATEGORIES_DATA.map((category) => (
          <CategoryShowcaseSection
            key={category.id}
            category={category}
            onInspect={(prod) => {
              setModalZoom(1.0);
              setInspectModalProduct(prod);
            }}
          />
        ))}
      </div>

      {/* ================= 3. QUICK 3D INSPECT & SPEC MODAL ================= */}
      <AnimatePresence>
        {inspectModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25, rotateX: 8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectModalProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Transparent Product Cutout Image with Glow & Zoom Controls */}
                <div className="relative h-[290px] sm:h-[350px] flex flex-col items-center justify-center bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 overflow-hidden">
                  <div
                    className="absolute w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                    style={{ backgroundColor: inspectModalProduct.accentColor, opacity: 0.35 }}
                  />
                  <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={inspectModalProduct.image}
                      alt={inspectModalProduct.name}
                      animate={{
                        y: modalZoom === 1 ? [0, -6, 0] : 0,
                        scale: modalZoom
                      }}
                      transition={{
                        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                        scale: { type: "spring", stiffness: 300, damping: 25 }
                      }}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] relative z-10 transition-transform"
                    />
                  </div>

                  {/* Zoom Controls inside Modal */}
                  <div className="relative z-20 flex items-center gap-2 mt-2 bg-black/85 px-3 py-1 rounded-full border border-neutral-700/80 backdrop-blur-md">
                    <span className="font-mono text-[9px] text-neutral-400 font-bold">ZOOM:</span>
                    {[1.0, 1.5, 2.2].map((zVal) => (
                      <button
                        key={zVal}
                        onClick={() => setModalZoom(zVal)}
                        className={`font-mono text-[9px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          modalZoom === zVal
                            ? "bg-[#E21D1D] text-white font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {zVal}X
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details & Specs */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-[#E21D1D] tracking-widest uppercase">
                        {inspectModalProduct.badge} • SAMPLE #{inspectModalProduct.sampleNum}
                      </span>
                      {inspectModalProduct.subCategory && (
                        <span className="text-[9px] font-mono font-bold text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded-full uppercase">
                          {inspectModalProduct.subCategory}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white mt-1 leading-tight">
                      {inspectModalProduct.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      {inspectModalProduct.subtitle}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">FABRIC GSM:</span>
                      <span className="text-white font-bold">{inspectModalProduct.gsm}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">MATERIAL:</span>
                      <span className="text-white font-bold">{inspectModalProduct.fabric}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">MIN ORDER QUANTITY:</span>
                      <span className="text-emerald-400 font-bold">{inspectModalProduct.moq}</span>
                    </div>
                  </div>

                  {/* Technical Specs List */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider block uppercase mb-2">
                      ENGINEERING SPECIFICATIONS
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-neutral-300">
                      {inspectModalProduct.specs.map((sp, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Colorways */}
                  {inspectModalProduct.colorways.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider block uppercase mb-1.5">
                        AVAILABLE COLORWAYS
                      </span>
                      <div className="flex items-center gap-2">
                        {inspectModalProduct.colorways.map((cw) => (
                          <div
                            key={cw.name}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-mono"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/30"
                              style={{ backgroundColor: cw.hex }}
                            />
                            <span>{cw.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <div className="pt-2">
                    <a
                      href="#b2b-calculator"
                      onClick={() => setInspectModalProduct(null)}
                      className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all cursor-pointer"
                    >
                      <span>ORDER PRODUCTION SAMPLE</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
