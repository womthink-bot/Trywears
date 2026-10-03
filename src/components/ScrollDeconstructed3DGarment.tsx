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
// Clean, ultra-smooth 60fps hardware-accelerated interaction
// ==============================================================
interface ProductCardProps {
  product: CategoryProduct;
  index: number;
  onInspect: (product: CategoryProduct) => void;
}

const Interactive3DProductCard: React.FC<ProductCardProps> = ({
  product,
  onInspect
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onInspect(product)}
      className="relative h-full rounded-2xl border border-neutral-800 hover:border-[#E21D1D]/80 bg-neutral-950/85 hover:bg-neutral-900/95 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer group transition-all duration-300 ease-out hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)] hover:-translate-y-1 select-none"
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform, border-color, background-color"
      }}
    >
      {/* Ambient Backlight Glow matching product accent */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[50px] pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: product.accentColor,
          opacity: isHovered ? 0.35 : 0.05
        }}
      />

      {/* Top Card Info */}
      <div className="z-10 flex items-start justify-between gap-1 mb-1">
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

      {/* 100% TRANSPARENT PNG GARMENT CUTOUT WITH SMOOTH HOVER ZOOM */}
      <div className="relative w-full h-[155px] sm:h-[170px] flex items-center justify-center my-1.5 overflow-visible">
        {/* Soft ground contact shadow */}
        <div
          className={`absolute bottom-1 w-3/4 h-3.5 rounded-full blur-[6px] bg-black/80 transition-all duration-300 pointer-events-none ${
            isHovered ? "scale-110 opacity-90" : "scale-95 opacity-60"
          }`}
        />

        {/* Product Image with smooth 60fps CSS transform */}
        <div className="relative z-20 max-w-full max-h-full flex items-center justify-center pointer-events-none">
          <img
            src={product.image}
            alt={product.name}
            className={`max-w-full max-h-[145px] sm:max-h-[160px] object-contain transition-transform duration-300 ease-out transform-gpu will-change-transform ${
              isHovered
                ? "scale-110 drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] brightness-105"
                : "scale-100 drop-shadow-[0_10px_18px_rgba(0,0,0,0.75)] opacity-95"
            }`}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Inspect Indicator button */}
        <div
          className={`absolute top-1 right-1 bg-black/80 border border-white/20 text-white p-1.5 rounded-full transition-all duration-200 z-30 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          title="Click to Inspect 3D Fabric Details"
        >
          <ZoomIn className="w-3.5 h-3.5 text-[#E21D1D]" />
        </div>
      </div>

      {/* Bottom Card Meta */}
      <div className="z-10 space-y-1 pt-1.5 border-t border-neutral-800">
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
    </div>
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

// ==============================================================
// ✦ HIGH-PERFORMANCE HARDWARE-ACCELERATED SEAMLESS VIDEO PLAYER
// Completely isolated, never interrupted during mouse scrolling or hover
// ==============================================================
const SmoothSeamlessVideo: React.FC<{ src: string; className?: string }> = React.memo(
  ({ src, className }) => {
    const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = vidRef.current;
      if (!video) return;

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.currentTime = 0;

      const tryPlay = () => {
        if (video.paused) {
          video.play().catch(() => {});
        }
      };

      tryPlay();

      const onInteraction = () => tryPlay();
      window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
      window.addEventListener("touchstart", onInteraction, { once: true, passive: true });
      window.addEventListener("keydown", onInteraction, { once: true, passive: true });

      return () => {
        window.removeEventListener("pointerdown", onInteraction);
        window.removeEventListener("touchstart", onInteraction);
        window.removeEventListener("keydown", onInteraction);
      };
    }, [src]);

    return (
      <video
        ref={vidRef}
        key={src}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className={className || "w-full h-full object-cover object-center filter brightness-[0.95] contrast-105 pointer-events-none"}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          backfaceVisibility: "hidden"
        }}
      />
    );
  },
  (prev, next) => prev.src === next.src && prev.className === next.className
);

interface CategoryShowcaseSectionProps {
  category: CategoryData;
  onInspect: (product: CategoryProduct) => void;
}

const CategoryShowcaseSection: React.FC<CategoryShowcaseSectionProps> = React.memo(({
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
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

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
  };

  // Calm, efficient 7s auto-slide timer
  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSlideDirection("next");
      setCurrentPage((p) => (p + 1) % totalPages);
    }, 7000);

    return () => clearInterval(timer);
  }, [totalPages]);

  const handlePrevPage = () => {
    setSlideDirection("prev");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNextPage = () => {
    setSlideDirection("next");
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  // Scroll Progress across this specific category section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll Parallax for Section-Wide Living Background Image
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const bgParallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.16]);

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
  const heroBgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.06]);
  const lightSheenX = useTransform(scrollYProgress, [0, 1], ["-120%", "220%"]);

  // Scanning Laser Line through Under-Grid Chamber
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  return (
    <section
      ref={sectionRef}
      id={`cat-section-${category.id}`}
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
            scale: bgParallaxScale,
            transform: "translate3d(0, 0, 0)",
            willChange: "transform"
          }}
          className="absolute inset-[-8%] w-[116%] h-[116%]"
        >
          <img
            src={category.bgImage}
            alt={category.bgAlt}
            loading="lazy"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-125 saturate-125"
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

        {/* Subtle Ambient Vignette & Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-[3]" />

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
            <div
              className="relative rounded-3xl overflow-hidden border border-neutral-700/80 bg-neutral-950 flex-1 h-full flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] group min-h-[580px]"
            >
              {/* Big High-Resolution 3D Model / Garment Image or Seamless Video Loop */}
              <div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(0)" }}>
                {category.heroVideo || category.heroImage.endsWith(".mp4") ? (
                  <SmoothSeamlessVideo src={category.heroVideo || category.heroImage} />
                ) : (
                  <motion.img
                    src={category.heroImage}
                    alt={category.heroImageAlt || category.name}
                    style={{ scale: heroBgScale }}
                    className="w-full h-full object-cover object-top filter brightness-[0.88] contrast-110 transition-transform duration-700 ease-out"
                  />
                )}
                {/* Vignette gradients for pristine text readability matching image.png */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
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
                    {(category.stats || [
                      { label: "100% FACTORY", value: "DIRECT" },
                      { label: "LOW MOQ 25", value: "PER STYLE" },
                      { label: "EXPRESS", value: "DDP AIR" }
                    ]).map((st, sIdx) => (
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
                      SUB-CATEGORIES ({(category.subCategories || []).length})
                    </span>
                    <span className="text-[9px] font-mono text-[#E21D1D] font-bold">
                      CLICK TO FILTER
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(category.subCategories || []).map((sub) => {
                      const isSubActive = selectedSubCategory === sub.id;
                      const count = (category.products || []).filter((p) => p.subCategoryId === sub.id).length;
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
            </div>
          </div>

          {/* ============================================================== */}
          {/* 9 PRODUCT CARDS GRID (3x3 EQUAL MATCHING HEIGHT!)              */}
          {/* WITH CLEAN LEFT/RIGHT NAVIGATION AND SMOOTH HOVER ZOOM         */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between h-full relative ${
              isLeftImage ? "lg:order-2" : "lg:order-1"
            }`}
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
                  {(category.products || []).length}
                </span>
              </button>

              {(category.subCategories || []).map((sub) => {
                const isSubActive = selectedSubCategory === sub.id;
                const count = (category.products || []).filter((p) => p.subCategoryId === sub.id).length;
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
                      onInspect={onInspect}
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
                  AUTO-ADVANCING
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
});

// ==============================================================
// 3. MAIN SCROLL-DECONSTRUCTED EXPORT ARMORY COMPONENT
// ==============================================================
export const ScrollDeconstructed3DGarment: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>(CATEGORIES_DATA);
  const [activeTab, setActiveTab] = useState<string>("sports-wears");
  const [inspectModalProduct, setInspectModalProduct] = useState<CategoryProduct | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(1.0);

  // Load developer uploaded override categories on mount & listen to live event
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});

    const handleCategoriesUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setCategories(e.detail);
      }
    };

    window.addEventListener("trywears_categories_updated", handleCategoriesUpdate);
    return () => window.removeEventListener("trywears_categories_updated", handleCategoriesUpdate);
  }, []);

  // Active Category Scroll-Spy: detect which category is currently in view
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const cat of categories) {
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
  }, [categories]);

  // Smooth scroll to specific category section
  const handleScrollToCategory = (catId: string) => {
    setActiveTab(catId);
    const el = document.getElementById(`cat-section-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeCategory = categories.find((c) => c.id === activeTab) || categories[0] || CATEGORIES_DATA[0];

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
                TRY WEARS GLOBAL OEM/ODM MANUFACTURING DIVISIONS • SIALKOT FACTORY DIRECT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-tight">
              CORE APPAREL & GEAR DIVISIONS FOR GLOBAL BUYERS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 mt-2 max-w-3xl leading-relaxed uppercase">
              Factory direct manufacturing for sports federations, fitness chains, fight leagues, and luxury streetwear brands. Browse 72+ physical production samples with custom Pantone matching, Italian sublimation, 550 GSM heavyweight French Terry, and private label trims.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 font-mono text-xs text-white shrink-0 shadow-lg">
            <Factory className="w-4 h-4 text-[#E21D1D]" />
            <div>
              <span className="text-[#E21D1D] font-bold block text-[10px]">DIRECT B2B SUPPLY</span>
              <span className="font-black uppercase tracking-wider">LOW MOQ 25 PCS • 7-DAY SAMPLING</span>
            </div>
          </div>
        </div>

        {/* 4 CATEGORIES QUICK-JUMP BUTTONS WITH DYNAMIC ACTIVE GLIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {categories.map((cat) => {
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
                    CATEGORY {cat.code} • {cat.products?.length || 0} SAMPLES
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-white group-hover:text-[#E21D1D] transition-colors truncate block">
                    {cat.name}
                  </span>

                  {/* Sub-categories preview pills */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {cat.subCategories?.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[7.5px] font-mono text-neutral-400 bg-neutral-900/90 px-1.5 py-0.5 rounded border border-white/5 truncate max-w-[105px]"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {(cat.subCategories?.length || 0) > 3 && (
                      <span className="text-[7.5px] font-mono text-[#E21D1D] font-bold self-center">
                        +{(cat.subCategories?.length || 0) - 3}
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
            {categories.map((c) => (
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
            {categories.reduce((acc, curr) => acc + (curr.products?.length || 0), 0)} TOTAL SAMPLES
          </span>
        </div>
      </div>

      {/* ================= 2. THE 4 ALTERNATING BALANCED SECTIONS ================= */}
      <div className="divide-y divide-neutral-900">
        {categories.map((category) => (
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
