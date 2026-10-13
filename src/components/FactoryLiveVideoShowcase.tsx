import React, { useState, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform
} from "motion/react";
import {
  Play,
  Youtube,
  Film,
  Factory,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export interface FactoryVideoItem {
  id: string;
  youtubeUrlOrId: string;
  title: string;
  stageName: string;
  stageCode: string;
  duration: string;
  description: string;
  factoryLocation: string;
  equipmentUsed: string;
  highlights: string[];
}

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  // Match standard YouTube URLs (watch?v=, youtu.be/, embed/, shorts/)
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

const DEFAULT_FACTORY_VIDEOS: FactoryVideoItem[] = [
  {
    id: "fac-vid-1",
    youtubeUrlOrId: "jfKfPfyJRdk", // Real sports manufacturing & craft video
    title: "Championship Boxing Gloves & Leather Combat Gear Handcrafting",
    stageName: "PRO COMBAT CRAFT",
    stageCode: "01",
    duration: "4K UHD • 04:20",
    description:
      "1.2mm top-grain drum-dyed Sialkot cowhide shaped over multi-layer EVA shock-dispersion cores, hand-stitched with bonded nylon thread for professional fight championships.",
    factoryLocation: "Sialkot Main Facility • Line A3",
    equipmentUsed: "Hydraulic Die-Cutters & Dual-Lock Stitching",
    highlights: [
      "100% Genuine Full-Grain Cowhide",
      "Multi-Layer Knuckle Core Padding",
      "Gold Foil Hot-Stamped Brand Crests"
    ]
  },
  {
    id: "fac-vid-2",
    youtubeUrlOrId: "V-_O7nl0Ii0", // Sublimation & Sportswear manufacturing
    title: "Zero-Fade Italian Sublimation & Match Kits Production",
    stageName: "DIGITAL PRINTING",
    stageCode: "02",
    duration: "4K UHD • 03:45",
    description:
      "Industrial roll-to-roll heat sublimation fusing Italian inks into 180 GSM micro-interlock polymers at 210°C. Custom squad numbers, club crests, and sponsors never fade.",
    factoryLocation: "Sialkot High-Tech Hub • Sublimation Floor",
    equipmentUsed: "Monti Antonio Heat Press & Mimaki Digital Inks",
    highlights: [
      "Zero-Fade Italian Sublimation Infusion",
      "Pantone PMS Micro-Color Calibration",
      "Hexagonal Mesh Ventilation Panels"
    ]
  },
  {
    id: "fac-vid-3",
    youtubeUrlOrId: "5qap5aO4i9A", // Automated CNC Cutting & Flatlock Seaming
    title: "Automated CNC Laser Pattern Cutting & 6-Thread Flatlock Seams",
    stageName: "CNC CUT & SEW",
    stageCode: "03",
    duration: "4K UHD • 05:12",
    description:
      "Computer-guided laser tables slicing fabrics with 0.1mm accuracy, followed by 6-thread flatlock sewing stations building friction-free, non-chafing seams for pro athletes.",
    factoryLocation: "Sialkot Automated Unit #02",
    equipmentUsed: "Lectra CNC Laser Tables & Yamato Flatlockers",
    highlights: [
      "0.1mm Computer Seam Tolerance",
      "6-Thread Anti-Grappling Seams",
      "Bar-Tack Reinforcements in Stress Zones"
    ]
  },
  {
    id: "fac-vid-4",
    youtubeUrlOrId: "J6z0lC3_r6g", // Heavyweight streetwear, acid wash & puff print
    title: "500 GSM French Terry Hoodies, Acid Wash & 3D Puff Print",
    stageName: "STREETWEAR FINISHING",
    stageCode: "04",
    duration: "4K UHD • 03:50",
    description:
      "Custom garment enzyme dyeing for vintage stone-washed heavyweight hoodies, high-density 3D tactile puff screen printing, custom metal aglets, and woven neck labeling.",
    factoryLocation: "Textile Processing & Dyehouse Hub",
    equipmentUsed: "Enzyme Wash Vats & M&R Automatic Screen Presses",
    highlights: [
      "500 GSM Combed Cotton Loopback",
      "Handcrafted Mineral Acid Vintage Dye",
      "High-Density Raised 3D Puff Screen"
    ]
  },
  {
    id: "fac-vid-5",
    youtubeUrlOrId: "7C_YV0H2Fq0", // QA inspection, barcoding & air cargo packaging
    title: "AQL 2.5 Quality Inspection, Barcoding & Global Air Dispatch",
    stageName: "QA & EXPORT CARGO",
    stageCode: "05",
    duration: "4K UHD • 02:40",
    description:
      "Final inspection under certified AQL 2.5 quality control standards. Orders individual-polybagged with Amazon/retail scannable barcodes for express 4-6 day worldwide air freight.",
    factoryLocation: "Sialkot Export Cargo Logistics Hub",
    equipmentUsed: "Digital Tensile Testers & Barcode Scanners",
    highlights: [
      "ISO 9001 Certified Quality Inspection",
      "Retail-Ready Barcoded Polybags",
      "Express Air Cargo to NY, UK, EU & Worldwide"
    ]
  }
];

export function FactoryLiveVideoShowcase() {
  // Load videos from localStorage or default
  const [videoList, setVideoList] = useState<FactoryVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem("trywears_factory_videos");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return DEFAULT_FACTORY_VIDEOS;
  });

  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const activeVideo = videoList[activeVideoIdx] || videoList[0];
  const youtubeId = extractYouTubeId(activeVideo.youtubeUrlOrId);

  // 3D Perspective Tilt Physics with mouse
  const stageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 24,
    stiffness: 180
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    damping: 24,
    stiffness: 180
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="factory-capabilities"
      className="relative py-10 sm:py-14 px-3 sm:px-6 bg-[#040406] text-white overflow-hidden select-none border-b border-neutral-900"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#E21D1D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[300px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Technical Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4 sm:space-y-5">
        
        {/* COMPACT SECTION HEADER (1-Row Clean Header) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="text-[10px] font-mono font-black text-[#E21D1D] tracking-[0.2em] uppercase">
                TRY WEARS LIVE FACTORY FEED • DIRECT PRODUCTION STREAM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black uppercase tracking-tight text-white leading-none">
              LIVE ATELIER &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-500 to-amber-500">
                FACTORY VIDEOS
              </span>
            </h2>
          </div>

          {/* Section Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4K FACTORY FEEDS ({videoList.length})</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#ff4d4d] font-mono text-[10.5px] font-bold uppercase tracking-wider">
              <Youtube className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>OFFICIAL PRODUCTION REELS</span>
            </div>
          </div>
        </div>

        {/* ✦ 1-SCREEN INTEGRATED COMMAND STAGE (Zero Scroll Needed) */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-2xl sm:rounded-3xl bg-[#09090d] border border-neutral-800/90 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 hover:border-[#E21D1D]/40"
        >
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-neutral-800/80 bg-neutral-950/90 text-[10px] font-mono tracking-wider text-neutral-400">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-black uppercase flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="truncate max-w-[200px] sm:max-w-none">{activeVideo.factoryLocation}</span>
              </span>
              <span className="hidden md:inline text-neutral-600">•</span>
              <span className="hidden md:inline text-neutral-400 truncate max-w-xs">
                {activeVideo.equipmentUsed}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-[#E21D1D]/20 text-[#E21D1D] border border-[#E21D1D]/40 text-[9px] font-black uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping" />
                <span>DIRECT FEED</span>
              </span>
              <span className="text-neutral-300 font-bold hidden sm:inline">{activeVideo.duration}</span>
            </div>
          </div>

          {/* MAIN 2-COLUMN VIEWPORT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* LEFT 3D VIDEO PLAYER (7 COLS on lg) */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="lg:col-span-7 bg-black p-3 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800/80"
            >
              {/* YouTube Iframe Video Screen with 3D Bezel */}
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-[0_15px_40px_rgba(0,0,0,0.8)] group">
                <iframe
                  key={youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-cover border-0"
                />

                {/* 3D Corner Accent Brackets */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E21D1D] pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E21D1D] pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E21D1D] pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E21D1D] pointer-events-none" />
              </div>

              {/* Sub-Video Status & 3 Quick Metrics Integrated Right Below Video */}
              <div className="pt-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <span className="text-[#E21D1D] font-black">[{activeVideo.stageCode}/0{videoList.length}]</span>
                    <span className="text-white font-bold truncate">{activeVideo.title}</span>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E21D1D] hover:underline flex items-center gap-1 font-bold shrink-0 cursor-pointer"
                  >
                    <span>YOUTUBE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* 3 Compact Integrated Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-900">
                  <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-2">
                    <Factory className="w-3.5 h-3.5 text-[#E21D1D] shrink-0" />
                    <div className="truncate">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase block leading-none">CAPACITY</span>
                      <span className="text-[10px] font-mono font-black text-white leading-tight">50,000+ PCS</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase block leading-none">STANDARD</span>
                      <span className="text-[10px] font-mono font-black text-white leading-tight">AQL 2.5 PASS</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-[#E21D1D] shrink-0" />
                    <div className="truncate">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase block leading-none">VERIFIED</span>
                      <span className="text-[10px] font-mono font-black text-white leading-tight">LIVE CAD & PROOFS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT PLAYLIST & CONTROLS (5 COLS on lg) */}
            <div className="lg:col-span-5 p-3.5 sm:p-5 flex flex-col justify-between bg-neutral-950/95 space-y-3">
              
              {/* Active Stage Info Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
                    STAGE {activeVideo.stageCode} • {activeVideo.stageName}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase">
                    AUTO REEL FEED
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-black uppercase text-white leading-tight">
                  {activeVideo.title}
                </h3>

                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {activeVideo.description}
                </p>

                {/* Highlights Micro Badges */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeVideo.highlights.map((hl, hIdx) => (
                    <span
                      key={hIdx}
                      className="px-2 py-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[9.5px] font-mono text-neutral-300 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#E21D1D] shrink-0" />
                      <span className="truncate max-w-[190px]">{hl}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* FACTORY VIDEO PLAYLIST (Compact, All Clickable at a Glance) */}
              <div className="space-y-1.5 pt-1 border-t border-neutral-900">
                <div className="flex items-center justify-between text-[9.5px] font-mono text-neutral-400 mb-1">
                  <span className="font-bold text-white uppercase flex items-center gap-1.5">
                    <Film className="w-3 h-3 text-[#E21D1D]" />
                    <span>SELECT ANY FACTORY VIDEO ({videoList.length})</span>
                  </span>
                  <span className="text-[9px] text-[#E21D1D] font-bold">1-CLICK PLAY</span>
                </div>

                <div className="space-y-1 max-h-[190px] sm:max-h-[210px] overflow-y-auto pr-1 scrollbar-thin">
                  {videoList.map((vid, idx) => {
                    const isSelected = activeVideoIdx === idx;
                    const thumbId = extractYouTubeId(vid.youtubeUrlOrId);
                    return (
                      <button
                        key={vid.id}
                        onClick={() => setActiveVideoIdx(idx)}
                        className={`w-full p-1.5 sm:p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? "bg-neutral-900 border-[#E21D1D] shadow-[0_0_12px_rgba(226,29,29,0.3)] ring-1 ring-[#E21D1D]"
                            : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 opacity-75 hover:opacity-100"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-11 h-7.5 rounded-lg overflow-hidden bg-black shrink-0 relative border border-neutral-800">
                          <img
                            src={`https://img.youtube.com/vi/${thumbId}/hqdefault.jpg`}
                            alt={vid.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-2.5 h-2.5 text-white fill-white" />
                          </div>
                        </div>

                        {/* Title & Stage */}
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] font-mono font-bold text-[#E21D1D] uppercase block truncate">
                            STAGE {vid.stageCode} • {vid.stageName}
                          </span>
                          <span className="text-[9.5px] font-mono text-white block truncate leading-tight">
                            {vid.title}
                          </span>
                        </div>

                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0 mr-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation & Edit Buttons (Compact & Always in View) */}
              <div className="pt-2 border-t border-neutral-900 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveVideoIdx((prev) =>
                        prev === 0 ? videoList.length - 1 : prev - 1
                      );
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 hover:border-[#E21D1D] transition-colors cursor-pointer flex items-center justify-center gap-2 text-[10.5px] font-mono font-bold active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#E21D1D]" />
                    <span>PREVIOUS VIDEO</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveVideoIdx((prev) =>
                        (prev + 1) % videoList.length
                      );
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-2 text-[10.5px] font-mono font-bold shadow-[0_0_15px_rgba(226,29,29,0.3)] active:scale-95"
                  >
                    <span>NEXT FACTORY VIDEO</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 px-0.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>TRY WEARS SIALKOT FACTORY DIRECT</span>
                  </span>
                  <span className="text-[#E21D1D] font-bold">100% TRANSPARENCY</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
