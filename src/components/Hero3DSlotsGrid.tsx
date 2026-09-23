import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  Video, 
  Sparkles, 
  Maximize2, 
  Check, 
  Film, 
  Eye, 
  Rotate3d,
  Layers,
  ShieldCheck,
  RefreshCw,
  Play,
  X
} from "lucide-react";
import { Hero3DSlot } from "../types";

interface Hero3DSlotsGridProps {
  slots: Hero3DSlot[];
  categoryName: string;
  slideId: string;
  onSlotVideoActivate?: (videoUrl: string, title: string) => void;
}

const SLOTS_STORAGE_KEY = "trywears_custom_slots_media_v1";

export const Hero3DSlotsGrid: React.FC<Hero3DSlotsGridProps> = ({
  slots,
  categoryName,
  slideId,
  onSlotVideoActivate
}) => {
  // Store custom uploaded media per slotId
  const [customMedia, setCustomMedia] = useState<Record<string, { url: string; isVideo: boolean; title?: string }>>(() => {
    try {
      const saved = localStorage.getItem(SLOTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load custom slot media:", e);
    }
    return {};
  });

  const [activeSlotModal, setActiveSlotModal] = useState<Hero3DSlot | null>(null);
  const [uploadingSlotId, setUploadingSlotId] = useState<string | null>(null);
  const [focusedSlotId, setFocusedSlotId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Save to localStorage when customMedia updates
  const updateSlotMedia = (slotId: string, url: string, isVideo: boolean, title?: string) => {
    setCustomMedia((prev) => {
      const updated = {
        ...prev,
        [slotId]: { url, isVideo, title }
      };
      try {
        localStorage.setItem(SLOTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage error:", err);
      }
      return updated;
    });
  };

  // Handle direct file upload for a specific 3D slot
  const handleSlotFileUpload = async (slot: Hero3DSlot, file: File) => {
    if (!file) return;

    const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name);
    setUploadingSlotId(slot.id);

    try {
      // Immediate local Blob URL for instant responsiveness
      const blobUrl = URL.createObjectURL(file);
      updateSlotMedia(slot.id, blobUrl, isVideo, file.name);

      if (onSlotVideoActivate && isVideo) {
        onSlotVideoActivate(blobUrl, slot.title);
      }

      // Background server upload for persistence
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              updateSlotMedia(slot.id, data.url, isVideo, file.name);
            }
          }
        } catch (serverErr) {
          console.warn("Backend slot upload fallback to blob:", serverErr);
        } finally {
          setUploadingSlotId(null);
        }
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Slot upload error:", err);
      setUploadingSlotId(null);
    }
  };

  return (
    <div className="w-full select-none">
      {/* 2x2 Pure 3D Video & Garment Cards Grid - No Text Clutter */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {slots.map((slot) => {
          const slotCustom = customMedia[slot.id];
          const hasCustomVideo = slotCustom?.isVideo;
          const displayMediaUrl = slotCustom?.url || slot.videoUrl || slot.image;
          const isVideoMedia = 
            Boolean(hasCustomVideo) || 
            Boolean(slot.videoUrl && !slotCustom) || 
            Boolean(displayMediaUrl?.toLowerCase().match(/\.(mp4|webm|mov|ogg)($|\?)/)) ||
            Boolean(displayMediaUrl?.startsWith("data:video/"));
          const isUploading = uploadingSlotId === slot.id;

          return (
            <div
              key={slot.id}
              onClick={() => {
                if (isVideoMedia && onSlotVideoActivate) {
                  onSlotVideoActivate(displayMediaUrl, slot.title);
                }
              }}
              className={`group relative rounded-2xl bg-black border transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer ${
                focusedSlotId === slot.id
                  ? "border-[#E21D1D] ring-2 ring-[#E21D1D]/40 scale-[1.02]"
                  : "border-white/15 hover:border-[#E21D1D] hover:shadow-[0_0_25px_rgba(226,29,29,0.35)]"
              }`}
            >
              {/* Media Container (Pure 3D Video or 3D Garment Render with 4/5 Aspect Ratio) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
                
                {/* Video Playback if available */}
                {isVideoMedia ? (
                  <video
                    src={displayMediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95] contrast-[1.05]"
                  />
                ) : (
                  <img
                    src={displayMediaUrl}
                    alt=""
                    onError={(e) => {
                      // Fallback to slot image or general 3D image
                      e.currentTarget.src = "/media/home-page/hero-section/sports-wears/slot-1.jpg";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Hover Action Overlay: Sleek Expand & Inspect Trigger */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 z-20 backdrop-blur-xs">
                  {/* View 3D Simulation Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlotModal(slot);
                    }}
                    className="bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-[10px] font-black py-2.5 px-3.5 rounded-xl uppercase flex items-center justify-center gap-1.5 shadow-xl transition-transform active:scale-95 cursor-pointer"
                    title="Inspect 3D Garment & Tech Specs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW 3D SIMULATION</span>
                  </button>

                  {/* Play in Hero Background */}
                  {isVideoMedia && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSlotVideoActivate) {
                          onSlotVideoActivate(displayMediaUrl, slot.title);
                        }
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white font-mono text-[9px] font-bold py-1.5 px-3 rounded-lg uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md"
                    >
                      <Play className="w-3 h-3 text-red-400" />
                      <span>PLAY HERO</span>
                    </button>
                  )}
                </div>

                {/* Uploading progress spinner overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-1.5 z-30">
                    <RefreshCw className="w-6 h-6 text-[#E21D1D] animate-spin" />
                    <span className="text-[10px] font-mono text-white font-bold uppercase tracking-widest">
                      SAVING 3D MEDIA...
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: FULL 3D SLOT DETAIL & EXPANDED VIEWER */}
      <AnimatePresence>
        {activeSlotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSlotModal(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden z-10 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-neutral-900 flex items-center justify-between bg-black/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/30 flex items-center justify-center">
                    <Video className="w-4 h-4 text-[#E21D1D]" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                      {activeSlotModal.title}
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-400">
                      {categoryName} • 3D Garment Simulation Details
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSlotModal(null)}
                  className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Large Media Preview */}
              <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
                {customMedia[activeSlotModal.id]?.isVideo || activeSlotModal.videoUrl ? (
                  <video
                    src={customMedia[activeSlotModal.id]?.url || activeSlotModal.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={customMedia[activeSlotModal.id]?.url || activeSlotModal.image}
                    alt={activeSlotModal.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Modal Specs & Upload Actions */}
              <div className="p-5 space-y-4 bg-neutral-950">
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1.5">
                  <span className="text-[9px] font-mono text-[#E21D1D] font-bold uppercase block">
                    MANUFACTURING & FABRIC SPECIFICATIONS
                  </span>
                  <p className="text-xs font-mono text-neutral-300">
                    {activeSlotModal.specs || "Custom high-performance athletic blend with 3D ergonomic pattern construction."}
                  </p>
                </div>

                {/* Professional B2B Buyer Action */}
                <div className="flex gap-3">
                  <a
                    href="#b2b-calculator"
                    onClick={() => setActiveSlotModal(null)}
                    className="flex-1 bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black py-3 rounded-xl uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
                  >
                    <span>REQUEST B2B SAMPLE / TECH PACK</span>
                  </a>

                  <button
                    onClick={() => setActiveSlotModal(null)}
                    className="px-5 py-3 rounded-xl border border-neutral-800 text-neutral-300 font-mono text-xs font-bold uppercase hover:bg-neutral-900 cursor-pointer"
                  >
                    Close
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
