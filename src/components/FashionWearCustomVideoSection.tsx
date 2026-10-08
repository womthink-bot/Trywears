import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence
} from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
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

export const FashionWearCustomVideoSection: React.FC<{ onNavigatePage?: (page: string) => void }> = ({ onNavigatePage }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Official loop video source
  const videoSource = "/media/home/videos/allPV.webm";

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);

  // Video event handlers and auto-loop trigger with viewport awareness
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    let lastUpdate = 0;
    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate > 250) { // Throttled to 4 times/sec max to avoid React render thrashing
        lastUpdate = now;
        setCurrentTime(video.currentTime);
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isMuted, videoSource]);

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

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartCustomOrder = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      const el = document.getElementById("customizer");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
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

          {/* Action Trigger Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleStartCustomOrder}
              className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 cursor-pointer active:scale-95"
            >
              <Scissors className="w-4 h-4" />
              <span>START CUSTOM ORDER</span>
            </button>
          </div>
        </div>

        {/* ================= 2. BIG CINEMATIC FASHION VIDEO PLAYER ================= */}
        <div
          style={{ transform: "translate3d(0, 0, 0)" }}
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
          </div>

          {/* Core HTML5 Video Element with Full Autoplay, Infinite Loop & Inline Streaming */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[440px] lg:min-h-[520px] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              key={videoSource}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onClick={togglePlay}
              className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 ease-out"
            >
              <source src="/media/home/videos/allPV.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

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
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#E21D1D] fill-current" />}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-neutral-400" />
                      <span className="text-[10px] text-neutral-400 uppercase hidden sm:inline">MUTED</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 uppercase hidden sm:inline">AUDIO ON</span>
                    </>
                  )}
                </button>

                {/* Live Indicator */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  className="px-2 py-1 rounded-md bg-red-600/20 text-[#E21D1D] border border-red-600/30 text-[10px] font-bold uppercase cursor-pointer hover:bg-red-600/30"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-pulse" />
                    LIVE RUNWAY
                  </span>
                </button>

                {/* Time Display */}
                <div className="text-neutral-400 text-[11px] font-mono tracking-wider">
                  <span className="text-white font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                </div>
              </div>

              {/* Right Side Options: Speed, Fullscreen */}
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
        </div>

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

                  {/* Active bottom highlight bar */}
                  {isActive && (
                    <motion.div
                      layoutId="fashion-pillar-active-bar"
                      className="absolute bottom-0 inset-x-0 h-1 bg-[#E21D1D]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Pillar Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatureTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#111118] border border-neutral-800 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* Left Side: Overview & Description */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-black text-[#E21D1D] uppercase px-2.5 py-1 rounded-lg bg-[#E21D1D]/15 border border-[#E21D1D]/30">
                      PILLAR {DEFAULT_FASHION_FEATURES[activeFeatureTab].code}
                    </span>
                    <h4 className="text-lg sm:text-2xl font-display font-black text-white uppercase">
                      {DEFAULT_FASHION_FEATURES[activeFeatureTab].title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                    {DEFAULT_FASHION_FEATURES[activeFeatureTab].description}
                  </p>

                  {/* Bullet Specs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {DEFAULT_FASHION_FEATURES[activeFeatureTab].specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Factory Turnaround Box */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1">
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

                  <button
                    onClick={handleStartCustomOrder}
                    className="w-full py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>REQUEST FACTORY QUOTE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
