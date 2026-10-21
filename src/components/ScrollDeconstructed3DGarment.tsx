import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence
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
  Maximize2,
  Lock,
  Unlock,
  Users
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { ProductImageLightbox } from "./ProductImageLightbox";
import { FolderFileItem } from "../types/folderTree";
import defaultTreeData from "../data/imagekit_folder_tree.json";

import {
  CATEGORIES_DATA,
  CategoryData,
  CategoryProduct,
  SubCategoryItem
} from "../data/categoriesData";

export type { CategoryData, CategoryProduct, SubCategoryItem };
export { CATEGORIES_DATA };

// Quick lookup index for exact FolderFileItem by url or fileId
const treeFileMap: Record<string, FolderFileItem> = {};
function indexTree(node: any) {
  if (node.files && Array.isArray(node.files)) {
    for (const f of node.files) {
      if (f.fileId) treeFileMap[f.fileId] = f;
      if (f.url) treeFileMap[f.url] = f;
    }
  }
  if (node.children && Array.isArray(node.children)) {
    for (const c of node.children) {
      indexTree(c);
    }
  }
}
indexTree(defaultTreeData);

function getFolderFileItem(p: any, categoryName: string): FolderFileItem {
  const cleanId = (p.id || "").replace(/^ik-/, "");
  const found = treeFileMap[cleanId] || treeFileMap[p.image];
  if (found) {
    return {
      ...found,
      description: found.description || p.description,
      seoKeywords: found.seoKeywords || p.seoKeywords,
      subCategory: found.subCategory || p.subCategory || categoryName,
      category: found.category || categoryName,
      pricing: p.pricing || (found as any).pricing,
      gsm: p.gsm || (found as any).gsm,
      fabric: p.fabric || (found as any).fabric,
      moq: p.moq || (found as any).moq
    };
  }
  const cleanName = (p.name || "").endsWith(".webp") ? p.name : `${p.name}.webp`;
  const sub = p.subCategory || categoryName;
  return {
    fileId: cleanId || `try-${Math.random().toString(36).slice(2)}`,
    name: cleanName,
    filePath: `/Try Products/${categoryName}/${sub}/${cleanName}`,
    url: p.image,
    thumbnail: p.image,
    description: p.description,
    seoTitle: p.seoTitle,
    seoSummary: p.seoSummary,
    seoKeywords: p.seoKeywords,
    category: categoryName,
    subCategory: p.subCategory,
    tags: Array.isArray(p.specs) ? p.specs : [p.specs || ""],
    pricing: p.pricing,
    gsm: p.gsm,
    fabric: p.fabric,
    moq: p.moq
  };
}

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
  index,
  onInspect
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = !isAuthenticated && index >= 5;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (isLocked) {
          openAuthModal();
        } else {
          onInspect(product);
        }
      }}
      className="relative w-full h-full min-h-[340px] xs:min-h-[380px] sm:min-h-[420px] md:min-h-[460px] xl:min-h-[500px] rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800/90 hover:border-[#E21D1D] bg-white dark:bg-neutral-950 overflow-hidden cursor-pointer group transition-all duration-300 ease-out shadow-sm hover:shadow-[0_20px_50px_rgba(226,29,29,0.35)] hover:-translate-y-1.5 select-none"
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform, border-color"
      }}
    >
      {/* Ambient Backlight Glow matching product accent */}
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[60px] pointer-events-none transition-opacity duration-300 z-10"
        style={{
          backgroundColor: product.accentColor || "#E21D1D",
          opacity: isHovered ? 0.35 : 0.05
        }}
      />

      {/* Subtle First 5 Preview Indicator Tag (Only if not logged in) */}
      {!isAuthenticated && index < 5 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="font-mono text-[8.5px] font-black px-2.5 py-1 rounded-full bg-emerald-600/95 text-white shadow-xl flex items-center gap-1 backdrop-blur-md border border-emerald-400/40">
            <Unlock className="w-2.5 h-2.5" />
            <span>PREVIEW</span>
          </span>
        </div>
      )}

      {/* FULL-BLEED PRODUCT IMAGE FILLING THE ENTIRE BOX */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <img
          src={product.image}
          alt={product.name || "Factory Apparel Sample"}
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out transform-gpu will-change-transform ${
            isLocked
              ? "filter blur-[8px] opacity-70 scale-105"
              : isHovered
              ? "scale-108 brightness-105 contrast-105"
              : "scale-100 opacity-95"
          }`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80&auto=format&fit=crop";
          }}
        />

        {/* Subtle cinematic gradient overlay over image for depth and arrow contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />

        {/* Lock Overlay for index >= 5 when not authenticated */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none bg-black/60 backdrop-blur-[3px]">
            <span className="px-4 py-2.5 rounded-2xl bg-black/90 border border-red-500 text-xs font-mono font-black text-white flex items-center gap-2 shadow-[0_0_30px_rgba(226,29,29,0.6)]">
              <Lock className="w-4 h-4 text-red-500 animate-pulse" />
              <span>UNLOCK FREE</span>
            </span>
          </div>
        )}
      </div>

      {/* RED ARROW BUTTON FLOATING DIRECTLY OVER THE IMAGE */}
      <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E21D1D] hover:bg-red-600 border border-red-400/50 text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(226,29,29,0.7)] group-hover:scale-110 group-hover:shadow-[0_6px_25px_rgba(226,29,29,0.95)]">
          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
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
    environmentBadge: "PRO MATCH TEAMWEAR • QUICK-DRY INTERLOCK & DIGITAL SUBLIMATION",
    ambientSecondary: "#9333EA",
    watermark: "SPORTS WEARS // PRO TEAMWEAR // DIGITAL SUBLIMATION // OEM SIALKOT",
    atmosphereTag: "PRO MATCH KITS • QUICK-DRY INTERLOCK",
    laserColor: "#E21D1D"
  },
  "gym-fitness": {
    environmentBadge: "ACTIVEWEAR & COMPRESSION APPAREL • 4-WAY STRETCH & SQUAT-PROOF",
    ambientSecondary: "#06B6D4",
    watermark: "GYM & FITNESS // 4-WAY COMPRESSION // SQUAT PROOF // ATHLETIC WEAR",
    atmosphereTag: "PERFORMANCE ACTIVEWEAR • FLATLOCK SEAMING",
    laserColor: "#3B82F6"
  },
  "street-wears": {
    environmentBadge: "LUXURY STREETWEAR APPAREL • 450–550 GSM COMBED FRENCH TERRY",
    ambientSecondary: "#EF4444",
    watermark: "STREET WEARS // 480GSM FRENCH TERRY // BESPOKE CUT & SEW // HOODIES & TEES",
    atmosphereTag: "HEAVYWEIGHT STREETWEAR • BOX HOODIES & TEES",
    laserColor: "#F59E0B"
  },
  "leather-jackets": {
    environmentBadge: "FULL-GRAIN GENUINE LEATHER • HANDCRAFTED VARSITY & MOTO JACKETS",
    ambientSecondary: "#B45309",
    watermark: "LEATHER JACKETS // 1.2MM DRUM-DYED COWHIDE // MELTON WOOL VARSITY // SIALKOT",
    atmosphereTag: "HANDCRAFTED LEATHER • COWHIDE & SHEARLING",
    laserColor: "#D97706"
  }
};

// ==============================================================
// ✦ HIGH-PERFORMANCE HARDWARE-ACCELERATED SEAMLESS VIDEO PLAYER
// Pauses when offscreen to conserve GPU/decoding buffers, plays 60fps smoothly in view
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

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.08 }
      );

      observer.observe(video);

      const onInteraction = () => {
        if (video.paused && document.contains(video)) {
          const rect = video.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            video.play().catch(() => {});
          }
        }
      };

      window.addEventListener("pointerdown", onInteraction, { once: true, passive: true });
      window.addEventListener("touchstart", onInteraction, { once: true, passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener("pointerdown", onInteraction);
        window.removeEventListener("touchstart", onInteraction);
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

  // Multi-page product sliding, gender filter & rich subcategory state
  const [genderFilter, setGenderFilter] = useState<"all" | "mens" | "womens">("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const subCategoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollSubCategories = (direction: "left" | "right") => {
    if (subCategoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      subCategoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Derive all distinct, real subcategories from the actual product list
  const derivedSubCategories = useMemo(() => {
    const map = new Map<
      string,
      {
        id: string;
        rawName: string;
        label: string;
        gender: "mens" | "womens" | "unisex";
        count: number;
      }
    >();

    (category.products || []).forEach((p) => {
      const raw = (p.subCategory || "General").trim();
      const id = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const isWomens = /women|female|ladies|bra|legging/i.test(raw);
      const isMens = /men|male|stringer/i.test(raw) && !/women/i.test(raw);
      const gender: "mens" | "womens" | "unisex" = isWomens ? "womens" : isMens ? "mens" : "unisex";

      const cleanLabel = raw
        .replace(/for\s+/i, "")
        .replace(/Uhiform/i, "Uniform")
        .replace(/Uniforms?/i, "Uniform")
        .replace(/\s+/g, " ")
        .trim();

      if (!map.has(id)) {
        map.set(id, { id, rawName: raw, label: cleanLabel, gender, count: 0 });
      }
      map.get(id)!.count++;
    });

    return Array.from(map.values());
  }, [category.products]);

  // Counts for Gender Filter tabs
  const genderCounts = useMemo(() => {
    let mens = 0;
    let womens = 0;
    (category.products || []).forEach((p) => {
      const raw = (p.subCategory || "").toLowerCase();
      const isW = /women|female|ladies|bra|legging/.test(raw);
      const isM = /men|male|stringer/.test(raw) && !/women/.test(raw);
      if (isW) {
        womens++;
      } else if (isM) {
        mens++;
      } else {
        // Unisex products (e.g. Martial Arts suits, unisex hoodies) belong in both
        mens++;
        womens++;
      }
    });
    return {
      all: (category.products || []).length,
      mens,
      womens
    };
  }, [category.products]);

  // Subcategories visible according to gender filter
  const visibleSubCategories = useMemo(() => {
    if (genderFilter === "all") return derivedSubCategories;
    return derivedSubCategories.filter((s) => s.gender === genderFilter || s.gender === "unisex");
  }, [derivedSubCategories, genderFilter]);

  // Products filtered by gender and selected subcategory
  const filteredProducts = useMemo(() => {
    return (category.products || []).filter((p) => {
      const raw = (p.subCategory || "").trim();
      const id = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      // Gender check
      if (genderFilter !== "all") {
        const isWomens = /women|female|ladies|bra|legging/i.test(raw);
        const isMens = /men|male|stringer/i.test(raw) && !/women/i.test(raw);
        const isUnisex = !isWomens && !isMens;

        if (genderFilter === "mens" && !isMens && !isUnisex) return false;
        if (genderFilter === "womens" && !isWomens && !isUnisex) return false;
      }

      // Subcategory check
      if (selectedSubCategory !== "all") {
        if (id !== selectedSubCategory) return false;
      }

      return true;
    });
  }, [category.products, genderFilter, selectedSubCategory]);

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

  const handlePrevPage = () => {
    setSlideDirection("prev");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNextPage = () => {
    setSlideDirection("next");
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section
      ref={sectionRef}
      id={`cat-section-${category.id}`}
      className="relative py-6 sm:py-10 lg:py-14 px-1.5 sm:px-3 md:px-4 lg:px-5 overflow-hidden min-h-auto select-none w-full bg-white dark:bg-black transition-colors"
    >
      {/* ============================================================== */}
      {/* 1. DYNAMIC CATEGORY-SPECIFIC LIVING BACKGROUND SYSTEM          */}
      {/* Hardware-accelerated, zero-stutter background presentation     */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Living Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={category.bgImage}
            alt={category.bgAlt}
            loading="lazy"
            className="w-full h-full object-cover object-center filter opacity-15 dark:opacity-100 brightness-110 dark:brightness-[0.32] contrast-105 dark:contrast-125 saturate-100 dark:saturate-125 transition-all"
          />
        </div>

        {/* Multi-layered Vignettes: Center translucency + deep edge fading */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white dark:from-black dark:via-black/45 dark:to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-transparent to-white/95 dark:from-black/80 dark:via-transparent dark:to-black/80 z-[1]" />
        <div
          className="absolute inset-0 z-[1] hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 25%, rgba(0, 0, 0, 0.8) 85%, black 100%)"
          }}
        />
        <div
          className="absolute inset-0 z-[1] block dark:hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 25%, rgba(255, 255, 255, 0.9) 85%, #ffffff 100%)"
          }}
        />

        {/* Ambient Category Glowing Atmosphere */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none z-[2] opacity-15 dark:opacity-25"
          style={{
            backgroundColor: category.themeColor,
            left: isLeftImage ? "10%" : "50%"
          }}
        />

        {/* Large Typographic Watermark */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none select-none z-[2] opacity-[0.04] dark:opacity-[0.05] whitespace-nowrap overflow-hidden"
        >
          <span className="font-display font-black text-[120px] sm:text-[180px] uppercase tracking-tighter text-neutral-900 dark:text-white block">
            {themeDetails.watermark}
          </span>
        </div>

        {/* Technical Blueprint Coordinate Grid Overlay */}
        <div
          className="absolute inset-0 z-[2] opacity-10 dark:opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${category.themeColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Subtle Ambient Vignette & Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50 dark:from-black/40 dark:via-transparent dark:to-black/60 pointer-events-none z-[3]" />

        {/* Background Environment Live Status Tag in Top Right Corner */}
        <div className="absolute top-4 right-6 z-[3] hidden md:flex items-center gap-2 font-mono text-[9px] text-neutral-700 dark:text-neutral-400 bg-white/85 dark:bg-black/60 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 backdrop-blur-md shadow-sm">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: category.themeColor }}
          />
          <span className="tracking-wider uppercase">{themeDetails.environmentBadge}</span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND CONTENT: FULL-PAGE FLUID HERO + 3x3 PRODUCT GRID */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-full mx-auto px-1 sm:px-2 md:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch">
          
          {/* ============================================================== */}
          {/* BIG CONTEXTUAL HERO IMAGE BLOCK */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-4 xl:col-span-3 2xl:col-span-3 flex flex-col h-full ${
              isLeftImage ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700/80 bg-white dark:bg-neutral-950 flex-1 h-full flex flex-col justify-between shadow-lg dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] group min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] xl:min-h-[780px] 2xl:min-h-[840px] transition-colors"
            >
              {/* Big High-Resolution 3D Model / Garment Image or Seamless Video Loop */}
              <div className="absolute inset-0 overflow-hidden" style={{ transform: "translate3d(0, 0, 0)" }}>
                {category.heroVideo || category.heroImage.endsWith(".mp4") || category.heroImage.endsWith(".webm") ? (
                  <SmoothSeamlessVideo src={category.heroVideo || category.heroImage} />
                ) : (
                  <img
                    src={category.heroImage}
                    alt={category.heroImageAlt || category.name}
                    className="w-full h-full object-cover object-top opacity-35 dark:opacity-100 filter brightness-100 dark:brightness-[0.88] contrast-105 dark:contrast-110"
                  />
                )}
                {/* Vignette gradients for pristine text readability in both Light and Dark mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/40 dark:from-black dark:via-black/70 dark:to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent pointer-events-none" />
              </div>

              {/* Dynamic Clean Light Sheen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-15 z-10"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)"
                }}
              />

              {/* Top Category Badge */}
              <div
                className="relative z-10 p-4 sm:p-7 flex items-center justify-between"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-black/85 border border-neutral-300 dark:border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-xs dark:shadow-lg">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.themeColor }}
                  />
                  <span className="font-mono text-[9px] sm:text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-wider">
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
                className="relative z-10 p-4 sm:p-7 space-y-3 sm:space-y-4"
                style={{ transform: "translateZ(25px)" }}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#E21D1D] uppercase block mb-1">
                    {category.code} / 04 - {category.name}
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-200 leading-relaxed font-bold sm:font-semibold">
                    {category.description}
                  </p>
                </div>

                {/* KEY STATS BLOCK (MATCHING IMAGE.PNG EXACTLY) */}
                <div className="pt-2 border-t border-neutral-300 dark:border-white/10">
                  <span className="text-[10px] font-mono font-black text-neutral-900 dark:text-neutral-400 uppercase tracking-widest block mb-2">
                    KEY STATS
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {(category.stats || [
                      { label: "100% FACTORY", value: "DIRECT" },
                      { label: "LOW MOQ 20", value: "PER STYLE" },
                      { label: "WORLDWIDE FREIGHT", value: "AIR & SEA" }
                    ]).map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white/95 dark:bg-black/80 backdrop-blur-md p-1.5 sm:p-2.5 rounded-xl border border-neutral-300 dark:border-white/15 flex flex-col justify-center text-center shadow-xs dark:shadow-md"
                      >
                        <span className="font-mono text-[8.5px] xs:text-[10px] sm:text-xs font-black text-neutral-900 dark:text-white block leading-tight truncate">
                          {st.label}
                        </span>
                        <span className="font-mono text-[7px] xs:text-[8px] font-bold text-neutral-600 dark:text-neutral-400 block uppercase mt-0.5 truncate">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUB-CATEGORIES DIVISION SELECTOR */}
                <div className="pt-2 border-t border-neutral-300 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-black text-neutral-900 dark:text-neutral-400 uppercase tracking-widest block">
                      SUB-CATEGORIES ({(category.subCategories || []).length})
                    </span>
                    <span className="text-[9px] font-mono text-[#E21D1D] font-bold">
                      CLICK TO FILTER
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
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
                              : "bg-white hover:bg-neutral-100 dark:bg-black/80 dark:hover:bg-neutral-900/90 border-neutral-300 hover:border-[#E21D1D] dark:border-white/15 text-neutral-900 hover:text-black dark:text-neutral-300 dark:hover:text-white shadow-xs"
                          }`}
                        >
                          <span className="truncate font-bold">{sub.name}</span>
                          {/* Small count box: Black background with White numbers */}
                          <span className={`text-[8.5px] font-mono font-black px-1.5 py-0.5 rounded-md min-w-[24px] text-center ${
                            isSubActive ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"
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
                    className="bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 hover:border-black dark:bg-black/70 dark:hover:bg-black/95 dark:text-white dark:border-white/25 dark:hover:border-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-xs dark:shadow-none"
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
            className={`lg:col-span-8 xl:col-span-9 2xl:col-span-9 flex flex-col justify-between h-full relative ${
              isLeftImage ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Ambient Under-Grid Chamber Backdrop Layer */}
            <div className="absolute inset-0 -m-3 sm:-m-4 pointer-events-none rounded-3xl overflow-hidden -z-10">
              <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/60 backdrop-blur-[6px] border border-neutral-200 dark:border-white/10 rounded-3xl shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />

              {/* Subtle Laser Accent Line through Under-Grid Chamber */}
              <div
                className="absolute left-0 right-0 top-1/2 h-[1px] opacity-25 z-0 pointer-events-none"
                style={{
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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2 pb-2 border-b border-neutral-200 dark:border-neutral-800/80">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-xs sm:text-sm font-black text-[#E21D1D]">
                  [SAMPLE LINEUP]
                </span>
                <h4 className="font-display font-black text-base sm:text-lg lg:text-xl text-neutral-900 dark:text-white uppercase tracking-tight flex items-center flex-wrap gap-1.5">
                  <span>{category.name}</span>
                  {genderFilter !== "all" && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                      / {genderFilter === "mens" ? "MEN'S" : "WOMEN'S"}
                    </span>
                  )}
                  {selectedSubCategory !== "all" && (
                    <span className="text-[#E21D1D] font-mono text-xs font-bold uppercase">
                      / {derivedSubCategories.find((s) => s.id === selectedSubCategory)?.label || selectedSubCategory}
                    </span>
                  )}
                </h4>
                <span className="font-mono text-[10.5px] sm:text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900/90 px-3 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-xs">
                  {filteredProducts.length > 0 ? currentPage * pageSize + 1 : 0}-{Math.min((currentPage + 1) * pageSize, filteredProducts.length)} OF {filteredProducts.length}
                </span>

                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-catalog-page", {
                        detail: { categoryName: category.name }
                      })
                    )
                  }
                  className="inline-flex font-mono text-[11px] sm:text-xs font-black text-[#E21D1D] hover:underline items-center gap-1 cursor-pointer ml-1"
                  title="Open All Products in Dedicated Catalog Page"
                >
                  <span>VIEW FULL CATALOG ➔</span>
                </button>
              </div>

              {/* Clean Left/Right Controls with Page Indicator */}
              <div className="flex items-center gap-2">
                {totalPages > 1 && (
                  <div className="flex items-center gap-2 bg-white dark:bg-black/85 border border-neutral-200 dark:border-neutral-700/80 rounded-xl p-1 shadow-md dark:shadow-lg backdrop-blur-md">
                    <button
                      onClick={handlePrevPage}
                      aria-label="Previous Products (Left)"
                      title="Previous Products"
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white px-2.5 tracking-wider">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      aria-label="Next Products (Right)"
                      title="Next Products"
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 1. GENDER / DIVISION SELECTOR TABS (MENS / WOMENS / ALL) */}
            {(genderCounts.mens > 0 && genderCounts.womens > 0) && (
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 pb-1.5 border-b border-neutral-200 dark:border-neutral-800/80 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <Users className="w-3.5 h-3.5 text-[#E21D1D]" />
                  <span>COLLECTION:</span>
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setGenderFilter("all");
                      setSelectedSubCategory("all");
                      setCurrentPage(0);
                    }}
                    className={`px-3 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      genderFilter === "all"
                        ? "bg-[#E21D1D] text-white shadow-md shadow-red-900/40"
                        : "bg-white hover:bg-neutral-100 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 shadow-xs"
                    }`}
                  >
                    <span>ALL SAMPLES</span>
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-mono font-black ${genderFilter === "all" ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"}`}>
                      {genderCounts.all}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setGenderFilter("mens");
                      setSelectedSubCategory("all");
                      setCurrentPage(0);
                    }}
                    className={`px-3 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      genderFilter === "mens"
                        ? "bg-[#E21D1D] text-white shadow-md shadow-red-900/40"
                        : "bg-white hover:bg-neutral-100 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 shadow-xs"
                    }`}
                  >
                    <span>MEN'S APPAREL</span>
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-mono font-black ${genderFilter === "mens" ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"}`}>
                      {genderCounts.mens}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setGenderFilter("womens");
                      setSelectedSubCategory("all");
                      setCurrentPage(0);
                    }}
                    className={`px-3 py-1 rounded-lg font-mono text-[10px] sm:text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      genderFilter === "womens"
                        ? "bg-[#E21D1D] text-white shadow-md shadow-red-900/40"
                        : "bg-white hover:bg-neutral-100 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 shadow-xs"
                    }`}
                  >
                    <span>WOMEN'S APPAREL</span>
                    <span className={`text-[8.5px] px-1.5 py-0.5 rounded-md font-mono font-black ${genderFilter === "womens" ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"}`}>
                      {genderCounts.womens}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. COMPACT SUBCATEGORIES TRACK WITH SMOOTH HORIZONTAL SCROLL ARROWS (< and >) */}
            <div className="relative flex items-center gap-1.5 mb-3.5 bg-neutral-100/90 dark:bg-black/75 p-1.5 sm:p-2 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 backdrop-blur-md shadow-sm dark:shadow-none">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={() => scrollSubCategories("left")}
                className="p-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-[#E21D1D] text-neutral-700 dark:text-neutral-300 hover:text-white border border-neutral-200 dark:border-neutral-800 transition-colors shrink-0 shadow-xs cursor-pointer active:scale-90"
                title="Scroll Categories Left"
                aria-label="Scroll Categories Left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 mr-1 font-mono text-[9px] sm:text-[10px] font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-wider pl-1 shrink-0">
                <Layers className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="hidden md:inline">SUB-CATEGORIES:</span>
              </div>

              {/* Scrollable Container with all compact subcategory pills */}
              <div
                ref={subCategoryScrollRef}
                className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth py-0.5"
              >
                <button
                  type="button"
                  onClick={() => handleSelectSubCategory("all")}
                  className={`px-2.5 py-1 sm:py-1.5 rounded-lg font-mono text-[9.5px] sm:text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    selectedSubCategory === "all"
                      ? "bg-[#E21D1D] text-white shadow-md shadow-red-900/40 font-black scale-102"
                      : "bg-white hover:bg-neutral-100 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 text-neutral-700 hover:text-black dark:text-neutral-400 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 shadow-xs"
                  }`}
                >
                  <span>ALL {genderFilter === "mens" ? "MEN'S" : genderFilter === "womens" ? "WOMEN'S" : ""} SAMPLES</span>
                  <span
                    className={`text-[8.5px] font-mono font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center ${
                      selectedSubCategory === "all" ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"
                    }`}
                  >
                    {filteredProducts.length}
                  </span>
                </button>

                {visibleSubCategories.map((sub) => {
                  const isSubActive = selectedSubCategory === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSelectSubCategory(sub.id)}
                      className={`px-2.5 py-1 sm:py-1.5 rounded-lg font-mono text-[9.5px] sm:text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        isSubActive
                          ? "bg-[#E21D1D] text-white shadow-md shadow-red-900/40 font-black scale-102"
                          : "bg-white hover:bg-neutral-100 dark:bg-neutral-900/80 dark:hover:bg-neutral-800 text-neutral-800 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-300 dark:border-neutral-800 shadow-xs"
                      }`}
                    >
                      <span className="font-bold">{sub.label}</span>
                      <span
                        className={`text-[8.5px] font-mono font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center ${
                          isSubActive ? "bg-black text-white" : "bg-neutral-900 dark:bg-neutral-800 text-white shadow-xs"
                        }`}
                      >
                        {sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={() => scrollSubCategories("right")}
                className="p-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-[#E21D1D] text-neutral-700 dark:text-neutral-300 hover:text-white border border-neutral-200 dark:border-neutral-800 transition-colors shrink-0 shadow-xs cursor-pointer active:scale-90"
                title="Scroll Categories Right"
                aria-label="Scroll Categories Right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
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
                  className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 xl:gap-4.5 2xl:gap-5 flex-1 relative z-10"
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
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-neutral-200 dark:border-neutral-800/80 text-[10px] font-mono text-neutral-600 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D]" />
                  <span>
                    {filteredProducts.length} SAMPLES DISPLAYED
                    {selectedSubCategory !== "all"
                      ? ` IN ${(derivedSubCategories.find((s) => s.id === selectedSubCategory)?.label || selectedSubCategory).toUpperCase()}`
                      : genderFilter !== "all"
                      ? ` IN ${genderFilter === "mens" ? "MEN'S APPAREL" : "WOMEN'S APPAREL"}`
                      : ` • ${category.products.length} TOTAL IN CATEGORY`}
                  </span>
                </span>

                {/* Interactive Page Controls */}
                <div className="flex items-center gap-1.5">
                  {totalPages <= 8 ? (
                    [...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSlideDirection(i > currentPage ? "next" : "prev");
                          setCurrentPage(i);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentPage === i
                            ? "w-7 bg-[#E21D1D]"
                            : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                        }`}
                        title={`Jump to Page ${i + 1}`}
                      />
                    ))
                  ) : (
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <button
                        onClick={handlePrevPage}
                        className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                      >
                        PREV
                      </button>
                      <span className="text-neutral-900 dark:text-white px-1 font-bold">
                        PAGE {currentPage + 1} OF {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                      >
                        NEXT
                      </button>
                    </div>
                  )}
                </div>

                <span className="hidden sm:inline text-neutral-500 font-mono text-[9px]">
                  CLICK ARROW TO BROWSE
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
  const [lightboxImages, setLightboxImages] = useState<FolderFileItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxFolderName, setLightboxFolderName] = useState<string>("");
  const [lightboxFolderPath, setLightboxFolderPath] = useState<string>("");

  const handleInspectProduct = (prod: CategoryProduct, cat: CategoryData) => {
    const fileItems = (cat.products || []).map((p) => getFolderFileItem(p, cat.name));
    const cleanId = (prod.id || "").replace(/^ik-/, "");
    const idx = fileItems.findIndex(
      (f) => f.url === prod.image || f.fileId === cleanId
    );
    setLightboxImages(fileItems);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxFolderName(prod.subCategory || cat.name);
    setLightboxFolderPath(`/Try Products/${cat.name}/${prod.subCategory || cat.name}`);
    setIsLightboxOpen(true);
  };

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
      className="relative w-full bg-white dark:bg-black text-neutral-900 dark:text-white selection:bg-[#E21D1D] selection:text-white transition-colors"
    >
      {/* ================= 1. SECTION INTRO HEADER & QUICK JUMP BAR ================= */}
      <div className="relative pt-20 sm:pt-24 pb-8 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-14 w-full max-w-[2160px] mx-auto border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="font-mono text-xs font-black tracking-widest text-[#E21D1D] uppercase">
                TRY WEARS GLOBAL OEM/ODM MANUFACTURING DIVISIONS • SIALKOT FACTORY DIRECT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              CORE APPAREL & GEAR DIVISIONS FOR GLOBAL BUYERS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-300 mt-2 max-w-3xl leading-relaxed uppercase">
              Factory direct manufacturing for sports federations, fitness chains, fight leagues, and luxury streetwear brands. Browse 72+ physical production samples with custom Pantone matching, Italian sublimation, 550 GSM heavyweight French Terry, and private label trims.
            </p>
          </div>

          {/* Quick Actions Pills */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-white/10 font-mono text-xs text-neutral-900 dark:text-white shadow-md dark:shadow-lg">
              <Factory className="w-4 h-4 text-[#E21D1D]" />
              <div>
                <span className="text-[#E21D1D] font-bold block text-[10px]">DIRECT B2B SUPPLY</span>
                <span className="font-black uppercase tracking-wider">LOW MOQ 20 PCS • ON-DEMAND SAMPLING</span>
              </div>
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
                    ? "border-[#E21D1D] shadow-lg shadow-[#E21D1D]/20 bg-neutral-100 dark:bg-neutral-900/90"
                    : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-[#E21D1D]/60 hover:bg-neutral-50 dark:hover:bg-neutral-900 shadow-xs"
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
                  <span className="font-mono text-[9px] font-bold text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-300 block">
                    CATEGORY {cat.code} • {cat.products?.length || 0} SAMPLES
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-[#E21D1D] transition-colors truncate block">
                    {cat.name}
                  </span>

                  {/* Sub-categories preview pills */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {cat.subCategories?.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[7.5px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/90 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-white/5 truncate max-w-[105px]"
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
                    isActive ? "text-[#E21D1D] translate-x-1" : "text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-1"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STICKY / FLOATING CATEGORIES NAVIGATION HUD ================= */}
      <div className="sticky top-0 z-30 py-2.5 px-4 sm:px-6 bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs font-mono shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
          <span className="text-[#E21D1D] font-bold tracking-wider">TRY WEARS FACTORY DIVISIONS</span>
          <span className="text-neutral-400 dark:text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-800 dark:text-neutral-300 uppercase truncate">
            CATEGORY {activeCategory.code}: {activeCategory.name}
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
                    : "w-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-500"
                }`}
                title={c.name}
              />
            ))}
          </div>

          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 hidden md:inline">
            {(categories || []).reduce((acc, curr) => acc + (curr.products?.length || 0), 0)} TOTAL SAMPLES
          </span>
        </div>
      </div>

      {/* ================= 2. THE 4 ALTERNATING BALANCED SECTIONS ================= */}
      <div className="divide-y divide-neutral-900">
        {categories.map((category) => (
          <CategoryShowcaseSection
            key={category.id}
            category={category}
            onInspect={(prod) => handleInspectProduct(prod, category)}
          />
        ))}
      </div>

      {/* ================= 3. FULLSCREEN HIGH-RES PRODUCT LIGHTBOX (EXACTLY AS IN MEGA MENU) ================= */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        folderName={lightboxFolderName}
        folderPath={lightboxFolderPath}
        onRequestQuote={(info) => {
          setIsLightboxOpen(false);
          window.dispatchEvent(
            new CustomEvent("open-quote-page", {
              detail: info
            })
          );
        }}
      />
    </div>
  );
};
