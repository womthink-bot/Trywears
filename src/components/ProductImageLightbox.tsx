import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  FileCheck,
  Folder,
  Layers,
  Sparkles,
  RotateCcw,
  Move,
  FileText,
  Info,
  MessageCircle,
  DollarSign,
  Calculator,
  ShieldCheck,
  Truck,
  Clock,
  ArrowRight,
  ArrowLeft,
  Package,
  Award,
  Star,
  CheckCircle2,
  Tag,
  Factory,
  TrendingUp,
  Percent,
  BadgeCheck,
  ShoppingBag,
  Lock,
  Unlock
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FolderFileItem } from "../types/folderTree";
import { CATEGORIES_DATA, WholesalePricing, WholesaleTier, CategoryProduct } from "../data/categoriesData";
import { getWhatsAppUrl } from "./WhatsAppChatWidget";

interface ProductImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: FolderFileItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  folderPath?: string;
  folderName?: string;
  onRequestQuote?: (productInfo: {
    name: string;
    image: string;
    path: string;
    targetUnitPrice?: string;
    quantity?: number;
    unitType?: string;
  }) => void;
}

export const ProductImageLightbox: React.FC<ProductImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  folderPath,
  folderName,
  onRequestQuote
}) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const isImageLocked = !isAuthenticated && currentIndex >= 5;
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startPosX: number; startPosY: number }>({
    x: 0,
    y: 0,
    startPosX: 0,
    startPosY: 0
  });

  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);

  // Simulated order quantity for wholesale tiers (Default 100)
  const [simulatedQty, setSimulatedQty] = useState<number>(100);

  const currentImage = images[currentIndex] || images[0];

  // Resolve full product details & pricing from catalog
  const resolvedProduct: CategoryProduct | null = useMemo(() => {
    if (!currentImage) return null;

    const imgUrl = currentImage.url || "";
    const rawFileId = (currentImage.fileId || "").replace(/^ik-/, "");
    const cleanCurrentName = currentImage.name.replace(/\.[^/.]+$/, "").trim().toLowerCase();

    for (const cat of CATEGORIES_DATA) {
      for (const prod of cat.products || []) {
        const prodFileId = (prod.id || "").replace(/^ik-/, "");
        const prodName = prod.name.trim().toLowerCase();
        if (
          (prod.image && prod.image === imgUrl) ||
          (rawFileId && prodFileId === rawFileId) ||
          prodName === cleanCurrentName ||
          cleanCurrentName.includes(prodName) ||
          prodName.includes(cleanCurrentName)
        ) {
          return prod;
        }
      }
    }

    // Fallback if currentImage had embedded pricing
    if (currentImage.pricing) {
      return {
        id: currentImage.fileId || "item",
        sampleNum: 1,
        name: currentImage.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").toUpperCase(),
        subtitle: currentImage.subCategory || "Custom Athletic Apparel",
        image: currentImage.url,
        badge: "OEM READY",
        subCategory: currentImage.subCategory || "Activewear",
        subCategoryId: "activewear",
        gsm: currentImage.gsm || "280 GSM",
        fabric: currentImage.fabric || "Performance Blend",
        accentColor: "#E21D1D",
        moq: "25",
        colorways: [],
        specs: ["Flatlock Stitching", "Anti-Pilling", "4-Way Stretch", "Sublimation / Screen Print Ready"],
        pricing: currentImage.pricing as WholesalePricing
      } as CategoryProduct;
    }

    return null;
  }, [currentImage]);

  const pricing: WholesalePricing | undefined = resolvedProduct?.pricing || currentImage?.pricing;

  // Active wholesale tier based on current simulated quantity
  const activeTier: WholesaleTier | null = useMemo(() => {
    if (!pricing || !pricing.tiers || pricing.tiers.length === 0) return null;
    for (const t of pricing.tiers) {
      if (t.maxQty === null && simulatedQty >= t.minQty) return t;
      if (t.maxQty !== null && simulatedQty >= t.minQty && simulatedQty <= t.maxQty) return t;
    }
    return pricing.tiers[0];
  }, [pricing, simulatedQty]);

  // Order value calculations
  const orderSubtotal = useMemo(() => {
    if (!activeTier) return 0;
    return simulatedQty * activeTier.unitPrice;
  }, [activeTier, simulatedQty]);

  const tier1Price = pricing?.tiers?.[0]?.unitPrice || pricing?.tier1Price || 0;
  const tier5Price = pricing?.tiers?.[pricing.tiers.length - 1]?.unitPrice || pricing?.startingWholesalePrice || tier1Price;
  const baselineCost = simulatedQty * tier1Price;
  const totalSavingsDollars = Math.max(0, baselineCost - orderSubtotal);
  const savingsPercent = activeTier ? activeTier.savingsPercent : 0;
  const maxSavingsPercent = pricing?.tiers?.[pricing.tiers.length - 1]?.savingsPercent || 42.5;

  // Estimated retail resale value benchmark (typically 3.5x to 4.5x factory price)
  const estimatedRetailPerUnit = useMemo(() => {
    return Math.round((tier1Price * 3.8) * 2) / 2;
  }, [tier1Price]);

  const estimatedResaleMarginPercent = useMemo(() => {
    if (!activeTier || estimatedRetailPerUnit <= 0) return 65;
    const margin = ((estimatedRetailPerUnit - activeTier.unitPrice) / estimatedRetailPerUnit) * 100;
    return Math.round(margin);
  }, [activeTier, estimatedRetailPerUnit]);

  // Reset zoom and pan on index change
  useEffect(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    setCopiedUrl(false);
  }, [currentIndex]);

  const resetZoomAndPan = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const newIdx = (currentIndex - 1 + images.length) % images.length;
    onIndexChange(newIdx);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const newIdx = (currentIndex + 1) % images.length;
    onIndexChange(newIdx);
  }, [currentIndex, images.length, onIndexChange]);

  // Pan dragging support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1 || e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || zoomLevel <= 1) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const maxBoundX = (window.innerWidth * (zoomLevel - 1)) / 1.5 + 200;
      const maxBoundY = (window.innerHeight * (zoomLevel - 1)) / 1.5 + 200;
      const newX = Math.max(-maxBoundX, Math.min(maxBoundX, dragStartRef.current.startPosX + dx));
      const newY = Math.max(-maxBoundY, Math.min(maxBoundY, dragStartRef.current.startPosY + dy));
      setPosition({ x: newX, y: newY });
    },
    [isDragging, zoomLevel]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch drag support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomLevel <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomLevel <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    const maxBoundX = (window.innerWidth * (zoomLevel - 1)) / 1.5 + 200;
    const maxBoundY = (window.innerHeight * (zoomLevel - 1)) / 1.5 + 200;
    const newX = Math.max(-maxBoundX, Math.min(maxBoundX, dragStartRef.current.startPosX + dx));
    const newY = Math.max(-maxBoundY, Math.min(maxBoundY, dragStartRef.current.startPosY + dy));
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomLevel((prev) => {
      const nextZoom = Math.max(0.7, Math.min(3, Math.round((prev + zoomDelta) * 100) / 100));
      if (nextZoom <= 1) setPosition({ x: 0, y: 0 });
      return nextZoom;
    });
  };

  // Double click toggle zoom
  const handleDoubleClick = () => {
    if (zoomLevel > 1) {
      resetZoomAndPan();
    } else {
      setZoomLevel(1.75);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(prev + 0.25, 3));
      } else if (e.key === "-") {
        setZoomLevel((prev) => {
          const next = Math.max(prev - 0.25, 0.7);
          if (next <= 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === "0" || e.key === "r" || e.key === "R") {
        resetZoomAndPan();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose, resetZoomAndPan]);

  const handleCopy = () => {
    if (!currentImage) return;
    navigator.clipboard.writeText(currentImage.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const displayName = resolvedProduct?.name || currentImage?.name
    ? (resolvedProduct?.name || currentImage.name)
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .toUpperCase()
    : "BESPOKE ATHLETIC APPAREL";

  const displaySubtitle = resolvedProduct?.subtitle || currentImage?.subCategory || folderName || "Export-Grade Athletic Apparel";
  const displayCategory = resolvedProduct?.subCategory || currentImage?.subCategory || folderName || "Activewear Armory";
  const displayFabric = resolvedProduct?.fabric || currentImage?.fabric || "4-Way Stretch Performance Spandex / Nylon";
  const displayGsm = resolvedProduct?.gsm || currentImage?.gsm || "280 GSM";
  const unitLabel = pricing?.unitType === "set" ? "set" : "piece";
  const unitLabelPlural = pricing?.unitType === "set" ? "sets" : "pieces";

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <div className="fixed inset-0 z-[120] bg-[#07080e] text-white flex flex-col overflow-y-auto custom-scrollbar select-none">
          
          {/* ==============================================================
              TOP STICKY NAVIGATION BAR (Full Width, Crisp & Spacious)
          ============================================================== */}
          <header className="sticky top-0 z-30 px-4 sm:px-8 py-3.5 bg-[#0d0e17]/95 backdrop-blur-xl border-b border-neutral-800 flex items-center justify-between gap-4 shadow-xl">
            {/* Left: Back / Close button + Breadcrumbs */}
            <div className="flex items-center gap-3 sm:gap-4 truncate">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-sm group"
                title="Back to Catalog (Esc)"
              >
                <ArrowLeft className="w-4 h-4 text-[#ff4d4d] group-hover:-translate-x-0.5 transition-transform" />
                <span>BACK</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono truncate">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-[10px] shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TRY WEARS SIALKOT FACTORY DIRECT</span>
                </span>
                <span className="text-neutral-600 hidden sm:inline">/</span>
                <span className="text-neutral-400 truncate uppercase hidden sm:inline">
                  {displayCategory}
                </span>
                <span className="text-neutral-600 hidden md:inline">/</span>
                <span className="text-white font-bold truncate hidden md:inline">
                  {displayName}
                </span>
              </div>
            </div>

            {/* Right: Product navigation & actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-mono text-xs">
              {/* Prev / Next Counter */}
              <div className="flex items-center bg-black/60 border border-neutral-800 rounded-xl px-2.5 py-1 gap-2 text-neutral-300">
                <button
                  onClick={handlePrev}
                  disabled={images.length <= 1}
                  className="hover:text-white p-0.5 disabled:opacity-30 cursor-pointer"
                  title="Previous Product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-bold text-white text-[11px]">
                  {currentIndex + 1} of {images.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={images.length <= 1}
                  className="hover:text-white p-0.5 disabled:opacity-30 cursor-pointer"
                  title="Next Product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Copy URL */}
              <button
                onClick={handleCopy}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs"
                title="Copy Image URL"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? "Copied" : "Share"}</span>
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="hidden sm:flex p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-white transition-all cursor-pointer shadow-lg active:scale-95"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* ==============================================================
              FULL PAGE 2-COLUMN MAIN VIEWPORT (Spacious, Clear, High-Contrast)
          ============================================================== */}
          <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ============================================================
                  LEFT COLUMN: PRODUCT IMAGE STAGE & GALLERY (STICKY ON DESKTOP)
              ============================================================ */}
              <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 flex flex-col gap-4">
                
                {/* Large Product Image Container with Zoom & Pan */}
                <div
                  className="relative w-full h-[450px] xs:h-[520px] sm:h-[620px] lg:h-[680px] rounded-3xl bg-gradient-to-b from-[#111322] via-[#0b0c14] to-black border border-neutral-800 flex items-center justify-center p-6 overflow-hidden shadow-2xl group"
                  onWheel={handleWheel}
                >
                  {/* Subtle Grid Backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                  {/* Top-Left Badges */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 border border-red-500/40 text-[#ff4d4d] font-mono text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                      <Award className="w-3.5 h-3.5 text-[#ff4d4d]" />
                      <span>100% SIALKOT EXPORT GRADE</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-700 text-neutral-200 font-mono text-[9px] font-bold backdrop-blur-md">
                      <BadgeCheck className="w-3 h-3 text-emerald-400" />
                      <span>AQL 2.5 PRE-SHIPMENT QC</span>
                    </span>
                  </div>

                  {/* Top-Right Floating Zoom Toolset */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/85 border border-neutral-700/80 rounded-2xl p-1.5 backdrop-blur-md shadow-xl">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.25))}
                      className="p-1.5 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs font-bold text-white px-2 min-w-[44px] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                      className="p-1.5 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Zoom In (+)"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    {zoomLevel > 1 && (
                      <button
                        onClick={resetZoomAndPan}
                        className="p-1.5 rounded-xl hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer ml-1"
                        title="Reset (0)"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Main Garment Cutout with Pan & Drag */}
                  <div
                    className={`relative w-full h-full flex items-center justify-center select-none ${
                      zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
                    }`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onDoubleClick={handleDoubleClick}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                      transformOrigin: "center center",
                      transition: isDragging ? "none" : "transform 0.15s ease-out"
                    }}
                  >
                    <img
                      src={currentImage.url}
                      alt={displayName}
                      draggable={false}
                      className={`max-w-full max-h-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none transition-transform ${
                        isImageLocked ? "filter blur-[16px] opacity-60 scale-105" : ""
                      }`}
                    />
                  </div>

                  {/* Lock Overlay if locked */}
                  {isImageLocked && (
                    <div
                      onClick={openAuthModal}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center cursor-pointer"
                    >
                      <div className="p-4 sm:p-6 rounded-3xl bg-[#090d16]/95 border-2 border-red-500/60 shadow-[0_0_50px_rgba(226,29,29,0.4)] flex flex-col items-center gap-3 max-w-sm">
                        <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/60 flex items-center justify-center text-red-500">
                          <Lock className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="font-display font-black text-base uppercase text-white tracking-wider">
                          Full Spec &amp; Zoom Locked
                        </h4>
                        <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                          This high-definition export sample photo and FOB tier pricing are reserved for verified buyers. Sign up free in 10 seconds to unlock.
                        </p>
                        <button
                          onClick={openAuthModal}
                          className="w-full py-3 px-4 rounded-xl bg-[#E21D1D] hover:bg-red-600 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>SIGN UP FREE TO UNLOCK FULL SAMPLE</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bottom-Left Unit Badge */}
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider backdrop-blur-md border shadow-lg ${
                        pricing?.unitType === "set"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                      }`}
                    >
                      {pricing?.unitType === "set"
                        ? `${pricing.piecesInSet}-PIECE MATCHING SET`
                        : "INDIVIDUAL GARMENT (1-PC)"}
                    </span>
                  </div>

                  {/* Bottom-Right Zoom Hint */}
                  <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-[10px] font-mono text-neutral-400 bg-black/80 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                    Click & drag to explore
                  </div>
                </div>

                {/* Category Samples Thumbnail Carousel */}
                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-2 uppercase font-bold text-neutral-300">
                      <Layers className="w-4 h-4 text-[#ff4d4d]" />
                      <span>CATEGORY SAMPLES ({images.length} Items)</span>
                    </span>
                    <span className="text-neutral-500 text-[11px]">Click any sample to view</span>
                  </div>

                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 custom-scrollbar">
                    {images.map((img, idx) => (
                      <button
                        key={img.fileId || idx}
                        onClick={() => onIndexChange(idx)}
                        className={`relative shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 bg-black transition-all cursor-pointer ${
                          currentIndex === idx
                            ? "border-red-500 shadow-[0_0_20px_rgba(226,29,29,0.7)] scale-105"
                            : "border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600"
                        }`}
                        title={img.name}
                      >
                        <img
                          src={img.thumbnail || img.url}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sialkot Manufacturing Credibility Trust Card */}
                <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 grid grid-cols-3 gap-3 text-center font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5 space-y-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
                    <span className="text-white font-bold block text-[11px]">100% Quality Pass</span>
                    <span className="text-[9px] text-neutral-400 block">Pre-shipment AQL 2.5</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5 space-y-1">
                    <Truck className="w-4 h-4 text-blue-400 mx-auto" />
                    <span className="text-white font-bold block text-[11px]">Worldwide DDP</span>
                    <span className="text-[9px] text-neutral-400 block">DHL Express Air 5-7d</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5 space-y-1">
                    <Factory className="w-4 h-4 text-amber-400 mx-auto" />
                    <span className="text-white font-bold block text-[11px]">Direct Atelier</span>
                    <span className="text-[9px] text-neutral-400 block">Zero Middleman Markup</span>
                  </div>
                </div>

              </div>

              {/* ============================================================
                  RIGHT COLUMN: 5-TIER PRICING & WHOLESALE STRATEGY (SPACIOUS)
              ============================================================ */}
              <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
                
                {/* 1. PRODUCT HEADER & SIALKOT FACTORY DIRECT BADGE */}
                <div className="space-y-3 pb-5 border-b border-neutral-800">
                  <div className="flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-[#ff4d4d] font-bold uppercase tracking-wider text-[11px]">
                        {displayCategory}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
                      MIN. ORDER (MOQ): 20 {unitLabelPlural.toUpperCase()}
                    </span>
                  </div>

                  <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
                    {displayName}
                  </h1>

                  <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                    {displaySubtitle}
                  </p>

                  {/* Supplier Trust Bar & Profit Margin Opportunity Callout */}
                  <div className="flex items-center gap-3 pt-1 text-xs font-mono text-neutral-300 flex-wrap">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold text-sm">4.9</span>
                      <span className="text-neutral-400">(184 Verified Global OEM Orders)</span>
                    </div>
                    <span className="text-neutral-700">•</span>
                    <span className="text-emerald-400 font-medium">TRY WEARS Factory Direct Sialkot</span>
                    <span className="text-neutral-700">•</span>
                    <span className="text-neutral-400">Response: &lt; 2h</span>
                  </div>

                  {/* BUYER PROFIT OPPORTUNITY BANNER (Yahan buyer ko apna direct faida nazar aata hai) */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-black border border-emerald-500/40 flex items-center justify-between gap-3 font-mono">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <TrendingUp className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
                          ESTIMATED RETAIL RESALE MARGIN:
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-white font-bold text-sm">
                            Typical Retail: ${estimatedRetailPerUnit.toFixed(2)} USD
                          </span>
                          <span className="text-neutral-400 text-xs">
                            vs Factory ${tier5Price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block uppercase">YOUR MARGIN:</span>
                      <span className="text-emerald-400 font-black text-base sm:text-lg">
                        ~{estimatedResaleMarginPercent}% PROFIT
                      </span>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    2. THE 5 WHOLESALE TIER RATES (Spacious, Clear, Zero Truncation)
                ============================================================ */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#10111d] border border-neutral-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <DollarSign className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="font-mono font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                          5-TIER WHOLESALE FOB PRICING SCHEDULE
                        </h3>
                        <span className="font-mono text-xs text-neutral-400 block">
                          FOB Sialkot Export Port • All Prices in USD ($)
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-xs font-black px-3 py-1.5 rounded-xl border uppercase ${
                        pricing?.unitType === "set"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
                          : "bg-blue-500/10 text-blue-300 border-blue-500/40"
                      }`}
                    >
                      Rate per {pricing?.unitType === "set" ? `${pricing.piecesInSet}-Piece Set` : "Single Piece"}
                    </span>
                  </div>

                  {/* 5 Distinct Clearly Spaced Tier Cards (No clipping!) */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-2 font-mono">
                    {(pricing?.tiers || []).map((t) => {
                      const isActive = activeTier?.tierIndex === t.tierIndex;
                      return (
                        <div
                          key={t.tierIndex}
                          onClick={() => setSimulatedQty(t.minQty)}
                          className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isActive
                              ? "bg-emerald-950/80 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-103 ring-2 ring-emerald-400/50"
                              : "bg-black/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-black text-[8px] uppercase px-2 py-0.5 rounded-full tracking-wider whitespace-nowrap shadow-md">
                              SELECTED TIER
                            </span>
                          )}

                          <div className="text-center pb-2">
                            <span className="text-[10px] font-bold text-neutral-400 block uppercase">
                              {t.tierName}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-white block">
                              {t.minQty}{t.maxQty ? `–${t.maxQty}` : "+"} {unitLabelPlural}
                            </span>
                          </div>

                          <div className="text-center py-2 border-t border-b border-white/5 my-1">
                            <span
                              className={`font-display font-black text-lg sm:text-xl block tracking-tight ${
                                isActive ? "text-emerald-400" : "text-white"
                              }`}
                            >
                              ${t.unitPrice.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-neutral-400 block">
                              /{unitLabel}
                            </span>
                          </div>

                          <div className="pt-1 text-center">
                            <span
                              className={`text-[9.5px] font-bold block ${
                                t.savingsPercent > 0 ? "text-emerald-400" : "text-neutral-500"
                              }`}
                            >
                              {t.savingsPercent > 0 ? `Save ${t.savingsPercent}%` : "Base MOQ"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Set Inclusions Explanation Notice */}
                  {pricing?.unitType === "set" && pricing?.setInclusions && (
                    <div className="p-4 rounded-2xl bg-neutral-950/90 border border-amber-500/40 text-xs font-mono text-amber-200/90 flex items-start gap-3">
                      <Package className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block uppercase text-xs mb-0.5">
                          Complete Set Composition Included in Price:
                        </strong>
                        <p className="text-neutral-300 text-xs leading-relaxed">
                          {pricing.setInclusions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ============================================================
                    3. INTERACTIVE ORDER CALCULATOR & BUYER SAVINGS DISPLAY
                ============================================================ */}
                <div className="p-5 sm:p-6 rounded-3xl bg-black/60 border border-neutral-800 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#ff4d4d]" />
                      <span>ORDER QUANTITY & COST ESTIMATOR</span>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      {activeTier?.tierName} Rate Applied (${activeTier?.unitPrice.toFixed(2)}/u)
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[25, 50, 100, 250, 500, 1000].map((q) => (
                      <button
                        key={q}
                        onClick={() => setSimulatedQty(q)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          simulatedQty === q
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950 scale-102"
                            : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600"
                        }`}
                      >
                        {q} {q === 25 ? "(MOQ)" : unitLabelPlural}
                      </button>
                    ))}
                  </div>

                  {/* Custom Quantity Stepper */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setSimulatedQty((q) => Math.max(25, q - 25))}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold cursor-pointer transition-colors"
                    >
                      -25
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="number"
                        min={25}
                        step={5}
                        value={simulatedQty}
                        onChange={(e) => setSimulatedQty(Math.max(1, parseInt(e.target.value) || 25))}
                        className="w-full bg-neutral-900/90 border border-neutral-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-white font-mono text-base font-bold text-center focus:outline-none"
                      />
                      <span className="absolute right-4 top-3 text-xs text-neutral-500 uppercase pointer-events-none">
                        {unitLabelPlural}
                      </span>
                    </div>
                    <button
                      onClick={() => setSimulatedQty((q) => q + 25)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold cursor-pointer transition-colors"
                    >
                      +25
                    </button>
                  </div>

                  {/* Financial Summary Card (Highlighting Customer Value & Savings) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-black border border-emerald-500/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Applied Unit Rate:</span>
                      <span className="text-emerald-400 font-display font-black text-xl sm:text-2xl">
                        ${(activeTier?.unitPrice || 12).toFixed(2)}
                      </span>
                      <span className="text-neutral-500 text-[10px] block">USD per {unitLabel}</span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Estimated Order Total:</span>
                      <span className="text-white font-display font-black text-xl sm:text-2xl">
                        ${orderSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-neutral-500 text-[10px] block">USD (FOB Sialkot Dry Port)</span>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-neutral-800 sm:pl-4 pt-3 sm:pt-0">
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold">Total Volume Savings:</span>
                      <span className="text-emerald-400 font-black text-lg sm:text-xl block">
                        {savingsPercent > 0 ? `Save $${totalSavingsDollars.toFixed(2)} (${savingsPercent}%)` : "Baseline MOQ Rate"}
                      </span>
                      <span className="text-neutral-500 text-[10px] block">vs. Starting Tier 1</span>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    4. LEAD TIMES, SAMPLE REBATE POLICY & SIALKOT FACTORY SPECS
                ============================================================ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  {/* Lead Times & Samples */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>LEAD TIMES & PROTOTYPING</span>
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Sample Prototype:</span>
                        <span className="text-white font-bold">{pricing?.estimatedSampleDays || "5-7 days"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Bulk Production:</span>
                        <span className="text-white font-bold">{pricing?.estimatedBulkDays || "14-21 days"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Sample Cost:</span>
                        <span className="text-emerald-400 font-bold">${pricing?.samplePriceUSD?.toFixed(2) || "29.00"} USD</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 pt-1.5 border-t border-white/5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Sample cost is 100% refunded on bulk order.</span>
                      </p>
                    </div>
                  </div>

                  {/* Technical Garment Specs */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-400" />
                      <span>MATERIAL & CONSTRUCTION</span>
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between truncate">
                        <span className="text-neutral-400 shrink-0">Fabric:</span>
                        <span className="text-white font-bold truncate ml-2">{displayFabric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Weight:</span>
                        <span className="text-white font-bold">{displayGsm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Complexity:</span>
                        <span className="text-emerald-400 font-bold">{pricing?.complexity || "Export Standard"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">FOB Port:</span>
                        <span className="text-white font-bold">Sialkot / Lahore Dry Port</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. OEM / PRIVATE LABEL CUSTOMIZATION SERVICES */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
                  <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff4d4d]" />
                    <span>PRIVATE LABEL & OEM CUSTOMIZATION (INCLUDED):</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-neutral-300">Custom 3D Silicone / Embroidery Logo</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-neutral-300">Custom Woven Neck Labels & Care Tags</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-neutral-300">Custom Frosted EVA Zipper Polybags</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-neutral-300">Pantone Color Matching & Custom Tech-Packs</span>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    6. PRIMARY B2B ACTION BUTTONS (BIG, PROMINENT & HIGH-CONVERSION)
                ============================================================ */}
                <div className="pt-2 pb-6 space-y-3 font-mono text-xs">
                  {/* Primary RFQ Button - Automatically tags product in B2B Quotation Form */}
                  <button
                    onClick={() => {
                      const quotePayload = {
                        id: resolvedProduct?.id || currentImage.fileId || `tw-${Date.now()}`,
                        name: displayName,
                        articleNumber: (resolvedProduct as any)?.articleNumber || `TW-${displayCategory.substring(0, 3).toUpperCase()}-${resolvedProduct?.sampleNum || String(Date.now()).slice(-4)}`,
                        category: displayCategory,
                        categoryName: displayCategory,
                        subCategory: displayCategory,
                        image: currentImage.url,
                        fabric: displayFabric,
                        gsm: displayGsm,
                        targetUnitPrice: (activeTier?.unitPrice || pricing?.tier1Price || 12).toFixed(2),
                        quantity: simulatedQty,
                        unitType: pricing?.unitType || "piece",
                        pricing: pricing,
                        setInclusions: pricing?.setInclusions
                      };

                      if (onRequestQuote) {
                        onRequestQuote(quotePayload);
                      }
                      window.dispatchEvent(
                        new CustomEvent("open-quote-page", {
                          detail: quotePayload
                        })
                      );
                      onClose();
                    }}
                    className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-red-950/60 transition-all cursor-pointer active:scale-98"
                  >
                    <FileCheck className="w-5 h-5" />
                    <span>
                      REQUEST TECH PACK RFQ ({simulatedQty} {unitLabelPlural.toUpperCase()} @ ${(activeTier?.unitPrice || 12).toFixed(2)}/u)
                    </span>
                  </button>

                  {/* Add to RFQ Cart Button */}
                  <button
                    onClick={() => {
                      const cartPayload = {
                        id: `cart-${Date.now()}`,
                        product: {
                          id: resolvedProduct?.id || currentImage.fileId || `tw-${Date.now()}`,
                          name: displayName,
                          category: displayCategory,
                          price: `$${(activeTier?.unitPrice || 12).toFixed(2)}`,
                          rating: 4.9,
                          image: currentImage.url,
                          description: displaySubtitle,
                          specs: [displayFabric, displayGsm, `${pricing?.unitType === "set" ? "Set" : "Piece"} wholesale`],
                          customizable: true,
                          inStock: true
                        },
                        quantity: simulatedQty,
                        selectedSize: "Mixed B2B (Standard Grading)",
                        customization: {
                          unitType: pricing?.unitType || "piece",
                          tierName: activeTier?.tierName || "Tier 1",
                          unitPrice: `$${(activeTier?.unitPrice || 12).toFixed(2)}`,
                          subtotal: `$${orderSubtotal.toFixed(2)}`,
                          fabric: displayFabric,
                          gsm: displayGsm
                        }
                      };

                      window.dispatchEvent(
                        new CustomEvent("add-to-cart", {
                          detail: cartPayload
                        })
                      );
                      setAddedToCartToast(true);
                      setTimeout(() => setAddedToCartToast(false), 3000);
                    }}
                    className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg active:scale-98 ${
                      addedToCartToast
                        ? "bg-emerald-600 text-white shadow-emerald-950"
                        : "bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-emerald-500 text-neutral-200 hover:text-white"
                    }`}
                  >
                    {addedToCartToast ? (
                      <>
                        <Check className="w-5 h-5 text-white animate-bounce" />
                        <span>✓ ADDED TO RFQ CART ({simulatedQty} {unitLabelPlural.toUpperCase()})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 text-emerald-400" />
                        <span>ADD TO RFQ CART ({simulatedQty} {unitLabelPlural.toUpperCase()} • ${(activeTier?.unitPrice || 12).toFixed(2)}/u)</span>
                      </>
                    )}
                  </button>

                  {/* Secondary WhatsApp & Sample Inquiry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={getWhatsAppUrl(
                        `Hello TRY WEARS Sialkot, I am interested in ordering ${displayName} (${displayCategory}). Target Quantity: ${simulatedQty} ${unitLabelPlural}, Quoted Tier Rate: $${(activeTier?.unitPrice || 12).toFixed(2)} USD/unit. Please send tech-pack quotation and sample process.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3.5 sm:py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/40 transition-colors text-center cursor-pointer shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>CHAT ON WHATSAPP (SIALKOT REP)</span>
                    </a>

                    <button
                      onClick={() => {
                        const samplePayload = {
                          id: `sample-${resolvedProduct?.id || currentImage.fileId || Date.now()}`,
                          name: `[SAMPLE PROTOTYPE] ${displayName}`,
                          articleNumber: `TW-SMP-${resolvedProduct?.sampleNum || String(Date.now()).slice(-4)}`,
                          category: displayCategory,
                          categoryName: displayCategory,
                          subCategory: displayCategory,
                          image: currentImage.url,
                          fabric: displayFabric,
                          gsm: displayGsm,
                          targetUnitPrice: (pricing?.samplePriceUSD || 29).toFixed(2),
                          quantity: 1,
                          unitType: "sample",
                          pricing: pricing
                        };

                        if (onRequestQuote) {
                          onRequestQuote(samplePayload);
                        }
                        window.dispatchEvent(
                          new CustomEvent("open-quote-page", {
                            detail: samplePayload
                          })
                        );
                        onClose();
                      }}
                      className="py-3.5 sm:py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      <span>ORDER PROTOTYPE SAMPLE (${(pricing?.samplePriceUSD || 29).toFixed(0)})</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </main>
        </div>
      )}
    </AnimatePresence>
  );
};
