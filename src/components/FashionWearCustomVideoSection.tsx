import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Upload,
  Sparkles,
  Scissors,
  Layers,
  Sparkle,
  CheckCircle2,
  Sliders,
  Film,
  Download,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  X,
  Plus,
  Tv,
  Eye,
  Zap
} from "lucide-react";

export interface FashionFeature {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  sampleImage?: string;
}

const DEFAULT_FASHION_FEATURES: FashionFeature[] = [
  {
    id: "fash-1",
    code: "01",
    title: "450-550 GSM Heavyweight Fleece & Drop-Shoulder Fits",
    subtitle: "CUSTOM CUT & SEW LUXURY HOODIES",
    description:
      "Engineered from 100% combed ring-spun organic cotton & loopback French Terry. Features double-lined stiff structured hoods, seamless front kangaroo pockets, reinforced 2x2 heavy ribbing, and luxury boxy silhouettes.",
    specs: ["450–550 GSM Ultra-Heavyweight", "Pre-Shrunk & Carbon Finished", "Custom Pantone Color Matching", "Reinforced Bar-Tack Stitching"]
  },
  {
    id: "fash-2",
    code: "02",
    title: "Vintage Mineral Wash, Acid Fading & Hand Distress",
    subtitle: "ARTISANAL TEXTILE TREATMENTS",
    description:
      "Proprietary ozone washing, stone wash fading, and hand-distressed grinding on collars, cuffs, and hems for that ultra-coveted 90s vintage luxury look with zero fabric degradation.",
    specs: ["Pigment Dye & Acid Wash Options", "Distressed Edge Grinding", "Zero-Bleed Reactive Inks", "Enzyme Softener Finish"]
  },
  {
    id: "fash-3",
    code: "03",
    title: "3D High-Density Puff Print & Chenille Embroidery",
    subtitle: "DIMENSIONAL EMBELLISHMENTS",
    description:
      "Precision raised silicone puff printing up to 4mm elevation, multi-color Japanese chainstitch embroidery, and fuzzy chenille varsity crests that retain sharp edges after 100+ industrial washes.",
    specs: ["Up to 4mm Raised 3D Puff", "Gold / Silver Metallic Threads", "Chenille & Felt Appliqué", "Glow-In-The-Dark & Reflective Inks"]
  },
  {
    id: "fash-4",
    code: "04",
    title: "Gunmetal Engraved Hardware & Complete Private Label",
    subtitle: "LUXURY OEM BRANDING PACKAGING",
    description:
      "Fully customized matte black & gunmetal metal aglets, embossed rubber neck labels, woven damask size tags, luxury hangtags with safety pins, and frosted matte zip-lock branded polybags.",
    specs: ["Engraved Metal Cord Aglets", "YKK Luxury Two-Way Zippers", "Woven Damask & Satin Labels", "Custom Barcoded Retail Bags"]
  }
];

const PRESET_FASHION_VIDEOS = [
  {
    id: "preset-all-pv",
    name: "Try Wears Signature Fashion & Streetwear Drop",
    url: "/videos/allPV.mp4",
    badge: "OFFICIAL 4K RUNWAY",
    desc: "Cinematic 4K signature showcase of Try Wears custom apparel, hoodies, caps, and oversized streetwear fits."
  },
  {
    id: "preset-street",
    name: "Luxury Streetwear Atelier & Runway Drop",
    url: "/videos/streetwearsBG.mp4",
    badge: "STREETWEAR RUNWAY",
    desc: "Cinematic showcase of oversized fleece hoodies, cargo joggers, and streetwear silhouettes."
  },
  {
    id: "preset-street-gp",
    name: "Streetwear Craftsmanship & Printing Floor",
    url: "/videos/streetwearsGP.mp4",
    badge: "FABRIC & CUT",
    desc: "High-speed precision textile cutting and custom embroidery seaming in action."
  },
  {
    id: "preset-leather",
    name: "Artisan Leather Jackets & Varsity Craft",
    url: "/videos/leatherBG.mp4",
    badge: "VARSITY & LEATHER",
    desc: "Full-grain top-tier cowhide & wool varsity tailoring with custom chainstitch badges."
  },
  {
    id: "preset-leather-gp",
    name: "Bespoke Leather Hardware & Finish",
    url: "/videos/leatherGP.mp4",
    badge: "HARDWARE & DETAILS",
    desc: "Handcrafted metal hardware riveting, edge dyeing, and luxury lining integration."
  }
];

export const FashionWearCustomVideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video playback states - default to the newly uploaded /videos/allPV.mp4
  const [videoSource, setVideoSource] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("trywears_fashion_video_custom");
      return saved || "/videos/allPV.mp4";
    } catch {
      return "/videos/allPV.mp4";
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  // Video change modal state
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);
  const [customVideoUrlInput, setCustomVideoUrlInput] = useState<string>("");
  const [uploadFeedback, setUploadFeedback] = useState<string>("");

  // Parallax / Scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const videoY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSource]);

  // Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute/Unmute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Playback speed cycle (0.75x -> 1x -> 1.25x -> 1.5x)
  const cyclePlaybackSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [0.75, 1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
  };

  // Handle scrubber seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle Custom Video Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setUploadFeedback("Please select a valid video file (MP4, WebM, MOV).");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setVideoSource(localUrl);
    try {
      localStorage.setItem("trywears_fashion_video_custom", localUrl);
    } catch {}
    setUploadFeedback(`✓ Successfully loaded video: "${file.name}"`);
    setTimeout(() => {
      setIsUploaderOpen(false);
      setUploadFeedback("");
    }, 1200);
  };

  // Handle URL Apply
  const handleApplyUrl = () => {
    if (!customVideoUrlInput.trim()) return;
    setVideoSource(customVideoUrlInput.trim());
    try {
      localStorage.setItem("trywears_fashion_video_custom", customVideoUrlInput.trim());
    } catch {}
    setUploadFeedback("✓ Custom fashion video URL updated successfully!");
    setTimeout(() => {
      setIsUploaderOpen(false);
      setUploadFeedback("");
    }, 1200);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section
      id="fashion-custom-video-studio"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 overflow-hidden border-b border-neutral-900 selection:bg-[#E21D1D] selection:text-white"
    >
      {/* Dynamic Luxury Ambient Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-b from-[#E21D1D]/15 via-red-950/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Cyber Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ================= 1. LUXURY SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>HAUTE STREETWEAR & BESPOKE CUT-SEW ATELIER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.1]">
              CUSTOM FASHION WEAR & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">LUXURY ATELIER</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 font-mono uppercase tracking-wide leading-relaxed">
              Design & manufacture your high-status fashion collections. From 550 GSM heavyweight organic French Terry hoodies and acid-washed vintage silhouettes to custom gunmetal hardware and private label packaging.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsUploaderOpen(true)}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-white/5 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#E21D1D]" />
              <span>Upload / Change Video</span>
            </button>

            <a
              href="#customizer"
              className="px-5 py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] hover:scale-105 cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
              <span>Start Custom Order</span>
            </a>
          </div>
        </div>

        {/* ================= 2. BIG CINEMATIC FASHION VIDEO PLAYER ================= */}
        <motion.div
          style={{ scale: videoScale, y: videoY }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group"
        >
          {/* Top Atmospheric Video Badge Bar */}
          <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E21D1D]" />
              </span>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                4K ATELIER FASHION FEED • PRIVATE LABEL RUNWAY
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsUploaderOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-red-500 text-[11px] font-mono font-bold text-neutral-300 hover:text-white uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Change or upload fashion video"
              >
                <Film className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="hidden sm:inline">Change Video</span>
              </button>
            </div>
          </div>

          {/* Core HTML5 Video Element with Full Autoplay, Loop & Inline Streaming */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[440px] lg:min-h-[520px] bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSource}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onClick={togglePlay}
              className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlays for High-Contrast Luxury Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

            {/* Big Center Play/Pause Pulsing Trigger (Visible on Pause or Hover) */}
            <AnimatePresence>
              {(!isPlaying || isHovered) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={togglePlay}
                  className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 backdrop-blur-xl border border-white/25 hover:border-[#E21D1D] flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:scale-110 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#E21D1D] fill-current ml-1" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* ================= BOTTOM INTERACTIVE VIDEO CONTROLS BAR ================= */}
          <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-3">
            
            {/* Interactive Progress Scrubber */}
            <div
              onClick={handleSeek}
              className="w-full h-2 hover:h-3 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all relative overflow-hidden group/scrub"
            >
              <div
                className="h-full bg-gradient-to-r from-red-600 to-[#E21D1D] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Playback Controls & Status Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-[#E21D1D]" />}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#E21D1D] animate-pulse" />
                  )}
                  <span className="text-[10px] uppercase font-bold text-neutral-300">
                    {isMuted ? "MUTED" : "AUDIO ON"}
                  </span>
                </button>

                {/* Time Display */}
                <div className="text-neutral-400 text-[11px] font-mono tracking-wider">
                  <span className="text-white font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                </div>
              </div>

              {/* Right Side Options: Speed, Fullscreen, Video Selector */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Playback Speed Switcher */}
                <button
                  onClick={cyclePlaybackSpeed}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer"
                  title="Cycle Playback Speed"
                >
                  {playbackSpeed}x SPEED
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 3. FOUR CORE FASHION WEAR CUSTOMIZATION PILLARS ================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                OEM / ODM FASHION WEAR CAPABILITIES
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wide mt-1">
                FOUR PILLARS OF LUXURY APPAREL CUSTOMIZATION
              </h3>
            </div>

            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
              SELECT PILLAR TO EXPLORE SPECS
            </span>
          </div>

          {/* Interactive 4 Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {DEFAULT_FASHION_FEATURES.map((feat, idx) => {
              const isActive = activeFeatureTab === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeatureTab(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? "bg-neutral-900 border-[#E21D1D] shadow-[0_0_25px_rgba(226,29,29,0.3)] scale-[1.02]"
                      : "bg-[#0c0c0c] hover:bg-neutral-900/80 border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Top Code Badge */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className={`text-xs font-mono font-black ${isActive ? "text-[#E21D1D]" : "text-neutral-500"}`}>
                      {feat.code}
                    </span>
                    <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${
                      isActive ? "bg-[#E21D1D]/20 text-[#E21D1D]" : "bg-white/5 text-neutral-400"
                    }`}>
                      {isActive ? "ACTIVE" : "EXPLORE"}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-display font-black text-white uppercase tracking-wider line-clamp-2">
                      {feat.subtitle}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-400 mt-1 line-clamp-2">
                      {feat.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Full Detail Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatureTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                {/* Left Description Column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E21D1D] uppercase">
                    <Zap className="w-4 h-4" />
                    <span>CRAFT SPECIFICATION • {DEFAULT_FASHION_FEATURES[activeFeatureTab].code}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                    {DEFAULT_FASHION_FEATURES[activeFeatureTab].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {DEFAULT_FASHION_FEATURES[activeFeatureTab].description}
                  </p>

                  {/* Highlights Bullet Tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {DEFAULT_FASHION_FEATURES[activeFeatureTab].specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/50 border border-white/5 text-xs font-mono text-neutral-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action & Quick B2B Specs Matrix */}
                <div className="bg-black/60 border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      FACTORY SAMPLING & PRODUCTION
                    </span>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Low MOQ:</span>
                        <span className="text-white font-bold">30 Pcs / Colorway</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Sample Turnaround:</span>
                        <span className="text-emerald-400 font-bold">7 - 10 Working Days</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Bulk Production:</span>
                        <span className="text-white font-bold">14 - 21 Days</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Global Shipping:</span>
                        <span className="text-white font-bold">DHL / FedEx Express DDP</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#b2b-calculator"
                    className="w-full py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Calculate Custom Fashion MOQ</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ================= VIDEO UPLOADER & PRESET PICKER MODAL ================= */}
      <AnimatePresence>
        {isUploaderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsUploaderOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E21D1D] uppercase">
                  <Film className="w-4 h-4" />
                  <span>FASHION VIDEO MANAGEMENT LAB</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                  CHANGE / UPLOAD FASHION WEAR VIDEO
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  Select a runway preset or upload your custom fashion brand video directly.
                </p>
              </div>

              {/* Upload Feedback alert */}
              {uploadFeedback && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadFeedback}</span>
                </div>
              )}

              {/* OPTION 1: CHOOSE FROM CINEMATIC PRESETS */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  Option 1: Select Atelier Runway Preset
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_FASHION_VIDEOS.map((preset) => {
                    const isSelected = videoSource === preset.url;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setVideoSource(preset.url);
                          try {
                            localStorage.setItem("trywears_fashion_video_custom", preset.url);
                          } catch {}
                          setUploadFeedback(`✓ Preset activated: "${preset.name}"`);
                          setTimeout(() => {
                            setIsUploaderOpen(false);
                            setUploadFeedback("");
                          }, 1000);
                        }}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#E21D1D]/15 border-[#E21D1D] shadow-[0_0_15px_rgba(226,29,29,0.3)]"
                            : "bg-black/50 hover:bg-black/80 border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono font-black text-[#E21D1D] uppercase px-2 py-0.5 rounded-md bg-black/60">
                            {preset.badge}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#E21D1D]" />}
                        </div>
                        <h5 className="text-xs font-display font-bold text-white uppercase line-clamp-1">
                          {preset.name}
                        </h5>
                        <p className="text-[10px] font-mono text-neutral-400 mt-1 line-clamp-2">
                          {preset.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* OPTION 2: DIRECT FILE UPLOAD FROM PC */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  Option 2: Direct Video Upload (MP4 / WebM / MOV)
                </span>

                <label className="border-2 border-dashed border-white/20 hover:border-[#E21D1D] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-black/40 hover:bg-black/70">
                  <Upload className="w-8 h-8 text-[#E21D1D] mb-2" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    CLICK TO BROWSE & UPLOAD FASHION VIDEO
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 mt-1">
                    Supports high-resolution MP4, WebM, MOV clips
                  </span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* OPTION 3: PASTE DIRECT VIDEO URL */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  Option 3: External Video URL / CDN Link
                </span>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/my-fashion-runway-video.mp4"
                    value={customVideoUrlInput}
                    onChange={(e) => setCustomVideoUrlInput(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                  />
                  <button
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-2 border-t border-white/10">
                <button
                  onClick={() => setIsUploaderOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white font-mono text-xs uppercase transition-colors cursor-pointer"
                >
                  Close Manager
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
