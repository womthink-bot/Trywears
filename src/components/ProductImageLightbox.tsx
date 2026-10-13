import React, { useState, useEffect, useCallback, useRef } from "react";
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
  MessageCircle
} from "lucide-react";
import { FolderFileItem } from "../types/folderTree";
import { getWhatsAppUrl } from "./WhatsAppChatWidget";

interface ProductImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: FolderFileItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  folderPath?: string;
  folderName?: string;
  onRequestQuote?: (productInfo: { name: string; image: string; path: string }) => void;
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
  const [showSpecsModal, setShowSpecsModal] = useState<boolean>(false);

  const currentImage = images[currentIndex] || images[0];

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

  // Handle Pan dragging via mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    // Only drag on left click
    if (e.button !== 0) return;
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
      
      // Calculate max allowed pan bounds based on zoom level to keep image visible
      const maxBoundX = (window.innerWidth * (zoomLevel - 1)) / 1.5 + 200;
      const maxBoundY = (window.innerHeight * (zoomLevel - 1)) / 1.5 + 200;

      const newX = Math.max(-maxBoundX, Math.min(maxBoundX, dragStartRef.current.startPosX + dx));
      const newY = Math.max(-maxBoundY, Math.min(maxBoundY, dragStartRef.current.startPosY + dy));

      setPosition({ x: newX, y: newY });
    },
    [isDragging, zoomLevel]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
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

  // Touch drag support for mobile/tablet
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

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom support (capped at max 3.0 / 300%)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomLevel((prev) => {
      const nextZoom = Math.max(0.7, Math.min(3, Math.round((prev + zoomDelta) * 100) / 100));
      if (nextZoom <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextZoom;
    });
  };

  // Double click to toggle 1.75x zoom
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

  const cleanName = currentImage
    ? currentImage.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .toUpperCase()
    : "";

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center select-none overflow-hidden">
          {/* Deep Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
          {/* Breadcrumb Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="p-1.5 rounded-lg bg-red-600/20 text-[#ff3b3b] border border-red-500/30 shrink-0">
              <Folder className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-black text-sm sm:text-base text-white tracking-tight truncate">
                {cleanName}
              </h3>
              <p className="font-mono text-[10px] text-neutral-400 truncate flex items-center gap-2">
                <span>{folderName || "Try Products Folder"}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-[#ff4d4d] font-bold">
                  {currentIndex + 1} OF {images.length}
                </span>
                {currentImage.width && currentImage.height && (
                  <>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-400">
                      {currentImage.width} × {currentImage.height} px
                    </span>
                  </>
                )}
                {zoomLevel > 1 && (
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <Move className="w-2.5 h-2.5" /> Drag mouse to pan
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Controls (Desktop / Tablet) */}
            <div className="hidden sm:flex items-center gap-1 bg-neutral-900/90 border border-neutral-700 rounded-xl p-1 shadow-lg">
              <button
                onClick={() => {
                  setZoomLevel((z) => {
                    const next = Math.max(0.7, z - 0.25);
                    if (next <= 1) setPosition({ x: 0, y: 0 });
                    return next;
                  });
                }}
                className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetZoomAndPan}
                className="px-2 py-1 text-[11px] font-mono font-bold text-neutral-200 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                title="Reset Zoom & Pan (0 / R)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
                className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={resetZoomAndPan}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Reset Position"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Copy URL */}
            <button
              onClick={handleCopy}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Copy Image URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">COPY LINK</span>
                </>
              )}
            </button>

            {/* Product Description Drawer Toggle */}
            <button
              onClick={() => setShowSpecsModal((prev) => !prev)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showSpecsModal
                  ? "bg-[#E21D1D] text-white border-red-500 shadow-[0_0_15px_rgba(226,29,29,0.5)]"
                  : "bg-neutral-900/90 border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500"
              }`}
              title="View Product Description"
            >
              <FileText className="w-4 h-4 text-[#ff4d4d]" />
              <span className="hidden sm:inline">DESCRIPTION</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hidden sm:flex p-2 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-white transition-all cursor-pointer shadow-lg active:scale-95"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-90 group"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 rounded-2xl bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white transition-all cursor-pointer backdrop-blur-md shadow-2xl active:scale-90 group"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Main High-Res Image Viewport with Pan & Drag */}
        <div
          className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 pb-24 sm:pb-28 overflow-hidden"
          onWheel={handleWheel}
        >
          <div
            className={`relative flex items-center justify-center select-none ${
              zoomLevel > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
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
              alt={cleanName}
              draggable={false}
              className="max-w-[94vw] max-h-[82vh] sm:max-w-[92vw] sm:max-h-[85vh] object-contain rounded-xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none select-none"
            />
          </div>

          {/* Zoom hint banner when zoomed in */}
          {zoomLevel > 1 && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-15 px-3 py-1.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-md text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none animate-fade-in shadow-xl">
              <Move className="w-3 h-3 text-[#ff4d4d]" />
              <span>Click & drag to explore | Double click to reset</span>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Thumbnails Scroller */}
          <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto max-w-full sm:max-w-xl py-1 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={img.fileId || idx}
                onClick={() => onIndexChange(idx)}
                className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "border-red-500 scale-105 shadow-[0_0_15px_rgba(226,29,29,0.7)]"
                    : "border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img.thumbnail || img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                if (onRequestQuote) {
                  onRequestQuote({
                    name: cleanName,
                    image: currentImage.url,
                    path: currentImage.filePath || folderPath || ""
                  });
                }
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-red-900/40 transition-all cursor-pointer active:scale-95"
            >
              <FileCheck className="w-4 h-4" />
              <span>REQUEST SAMPLE QUOTE</span>
            </button>
          </div>
        </div>

        {/* OEM SPECIFICATIONS & SEO DESCRIPTION DRAWER */}
        <AnimatePresence>
          {showSpecsModal && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-[480px] bg-neutral-950/95 backdrop-blur-2xl border-l border-neutral-800 flex flex-col p-6 overflow-y-auto custom-scrollbar shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-red-600/20 text-[#ff3b3b] border border-red-500/30">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-base text-white uppercase tracking-tight">
                      {cleanName}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {currentImage.subCategory || folderName || "Bespoke Garment Division"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Specifications"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description Content */}
              <div className="py-5 space-y-4 font-mono text-xs text-neutral-300 leading-relaxed">
                <div>
                  <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-wider block mb-1.5">
                    PRODUCT DESCRIPTION
                  </span>
                  <div className="whitespace-pre-line text-[11px] text-neutral-300 bg-neutral-900/70 p-4 rounded-2xl border border-neutral-800/80 leading-relaxed">
                    {currentImage.description || "Tournament-grade physical sample manufactured factory-direct at our Sialkot atelier. Custom private label branding, 3D silicone badging, zero-fade sublimation, and worldwide DDP express shipping."}
                  </div>
                </div>

                {/* Sialkot OEM Capabilities Highlights */}
                <div className="p-4 rounded-2xl bg-black/70 border border-neutral-800/80 space-y-2.5">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                    FACTORY DIRECT MANUFACTURING HIGHLIGHTS:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <span className="text-neutral-500 block text-[9px]">MINIMUM ORDER:</span>
                      <span className="text-white font-bold">20 PCS / COLORWAY</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <span className="text-neutral-500 block text-[9px]">PROTOTYPING:</span>
                      <span className="text-emerald-400 font-bold">ON-DEMAND SAMPLING</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <span className="text-neutral-500 block text-[9px]">MANUFACTURING:</span>
                      <span className="text-white font-bold">SIALKOT, PAKISTAN</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/5">
                      <span className="text-neutral-500 block text-[9px]">EXPORT MARKETS:</span>
                      <span className="text-white font-bold">USA, UK, CA, EU, AUS</span>
                    </div>
                  </div>
                </div>

                {/* SEO Keywords Pills (No unprofessional heading, badges displayed directly) */}
                {currentImage.seoKeywords && currentImage.seoKeywords.length > 0 && (
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {currentImage.seoKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[9.5px] text-neutral-400 font-mono hover:text-white transition-colors"
                        >
                          #{kw.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4 border-t border-neutral-800 space-y-2.5 font-mono text-xs">
                <button
                  onClick={() => {
                    if (onRequestQuote) {
                      onRequestQuote({
                        name: cleanName,
                        image: currentImage.url,
                        path: currentImage.filePath || folderPath || ""
                      });
                    }
                    setShowSpecsModal(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-900/30"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>REQUEST B2B SAMPLE QUOTE</span>
                </button>

                <a
                  href={getWhatsAppUrl(`Hi Try Wears, I want to inquire about custom production for ${cleanName} (${currentImage.subCategory || folderName || ""})`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/30 transition-colors text-center cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>INQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}
    </AnimatePresence>
  );
};
