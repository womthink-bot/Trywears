import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Flame, 
  ShieldCheck, 
  Factory, 
  Layers, 
  Sparkles,
  Video,
  Upload,
  Volume2,
  VolumeX,
  Rotate3d,
  Sliders,
  Check,
  Maximize2,
  Film,
  FolderOpen
} from "lucide-react";
import { 
  Hero3DVideoModal, 
  Hero3DVideoSettings, 
  PRESET_3D_VIDEOS 
} from "./Hero3DVideoModal";
import { SportsHero3DCanvas } from "./SportsHero3DCanvas";
import { Hero3DSlotsGrid } from "./Hero3DSlotsGrid";
import { Hero3DSlot } from "../types";

export interface HeroSlide {
  id: string;
  category?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  tag: string;
  slots3D?: Hero3DSlot[];
}

interface SportsHeroSliderProps {
  slides: HeroSlide[];
  onOpenMediaFolder?: (folder: string) => void;
}

const STORAGE_KEY = "trywears_3d_hero_settings_v1";

export const SportsHeroSlider: React.FC<SportsHeroSliderProps> = ({ slides, onOpenMediaFolder }) => {
  // 3D Video & Media Settings State
  const [videoSettings, setVideoSettings] = useState<Hero3DVideoSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read saved 3D settings, using default preset.");
    }
    return {
      videoUrl: PRESET_3D_VIDEOS[0].url,
      videoTitle: PRESET_3D_VIDEOS[0].title,
      isCustomUploaded: false,
      enable3DTilt: true,
      tiltIntensity: 2,
      isMuted: true,
      volume: 0.5,
      playbackSpeed: 1,
      showHoloGrid: true,
      show3DParticles: true,
      activeMode: "3d-video"
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // 3D Mouse Parallax & Gyroscopic Spatial Tilt State
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const timerRef = useRef<any>(null);

  const SLIDE_DURATION = 6000;
  const TICK_INTERVAL = 50;

  // Persist video settings
  const handleSaveVideoSettings = async (newSettings: Hero3DVideoSettings) => {
    setVideoSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error("Storage error:", e);
    }

    // Attempt to persist video settings to backend config if accessible
    try {
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hero: {
            active3DVideoUrl: newSettings.videoUrl,
            mediaMode: newSettings.activeMode,
            enable3DTilt: newSettings.enable3DTilt
          }
        })
      });
    } catch (err) {
      // Non-blocking
    }
  };

  // Sync Video playback rate & volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSettings.playbackSpeed || 1;
      videoRef.current.volume = videoSettings.volume ?? 0.5;
      videoRef.current.muted = videoSettings.isMuted;
    }
  }, [videoSettings.playbackSpeed, videoSettings.volume, videoSettings.isMuted, videoSettings.videoUrl]);

  // Handle Mouse 3D Gyro Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoSettings.enable3DTilt || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized -1 to +1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    const factor = videoSettings.tiltIntensity === 1 ? 5 : videoSettings.tiltIntensity === 2 ? 10 : 16;
    setTilt({
      x: -normY * factor,
      y: normX * factor
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Slide advancement timer for multi-slide mode
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;

    setProgress(0);
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentPct);

      if (elapsed >= SLIDE_DURATION) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, TICK_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPlaying, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlideData = slides[currentSlide];

  return (
    <section
      id="hero-slider"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[740px] sm:min-h-[820px] bg-neutral-950 overflow-hidden border-b border-neutral-900 select-none perspective-[1200px]"
    >
      {/* 3D TILT CONTAINER FOR FULL STAGE DEPTH */}
      <div
        className="w-full h-full min-h-[740px] sm:min-h-[820px] transition-transform duration-200 ease-out relative flex flex-col justify-between py-10"
        style={{
          transform: videoSettings.enable3DTilt
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "none",
          transformStyle: "preserve-3d"
        }}
      >
        {/* ================= BACKGROUND LAYER (3D VIDEO / HOLOGRAPHIC / SLIDES) ================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          
          {/* MODE 1: 3D VIDEO BACKGROUND */}
          {videoSettings.activeMode === "3d-video" && (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                key={videoSettings.videoUrl}
                src={videoSettings.videoUrl}
                autoPlay
                loop
                muted={videoSettings.isMuted}
                playsInline
                onLoadedData={() => {
                  setVideoLoaded(true);
                  setVideoError(false);
                }}
                onError={() => {
                  console.warn("Video failed to play, falling back to static poster slide.");
                  setVideoError(true);
                }}
                className={`w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15] scale-105 transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Fallback image if video is loading or failed */}
              {(!videoLoaded || videoError) && (
                <img
                  src={activeSlideData.image}
                  alt={activeSlideData.title}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.1]"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          )}

          {/* MODE 2: INTERACTIVE 3D HOLOGRAPHIC GEAR CANVAS */}
          {videoSettings.activeMode === "hologram" && (
            <div className="relative w-full h-full pointer-events-auto">
              <SportsHero3DCanvas />
              <div className="absolute inset-0 bg-neutral-950/60 pointer-events-none" />
            </div>
          )}

          {/* MODE 3: 3D SLIDESHOW CAROUSEL TRACK */}
          {videoSettings.activeMode === "slides" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideData.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={activeSlideData.image}
                  alt="Try Wears Hero Slide"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Dark Gradients & Vignette for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-neutral-950/70 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-transparent pointer-events-none" />

          {/* 3D HOLOGRAPHIC CYBER FLOOR GRID */}
          {videoSettings.showHoloGrid && (
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(226, 29, 29, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(226, 29, 29, 0.25) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                transform: "perspective(600px) rotateX(65deg) scale(1.6) translateY(120px)",
                transformOrigin: "bottom center"
              }}
            />
          )}

          {/* Athletic Texture Hatch overlay */}
          <div className="absolute inset-0 athletic-hatch opacity-20 pointer-events-none" />
        </div>

        {/* ================= FOREGROUND CONTENT LAYER (HERO STAGE + 4 3D VIDEO BOXES) ================= */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between flex-1 pointer-events-auto">
          
          {/* TOP 3D HUD CONTROLS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            
            {/* Left Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-mono text-neutral-300 shadow-xl">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E21D1D] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E21D1D]" />
                </span>
                <span className="font-black text-white tracking-widest uppercase">
                  B2B COMBAT FACTORY ACTIVE
                </span>
                <span className="text-neutral-600 hidden sm:inline">|</span>
                <span className="hidden sm:inline text-neutral-400">SIALKOT & NY EXPORT DIVISIONS</span>
                <span className="text-neutral-600 hidden md:inline">|</span>
                <span className="hidden md:inline text-emerald-400 font-bold">LOW MOQ 25 PCS</span>
              </div>

              {/* 3D Mode Indicator Badge */}
              <div className="hidden sm:inline-flex items-center gap-2 bg-neutral-900/80 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono text-neutral-300">
                <Rotate3d className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="font-bold text-white uppercase">
                  3D {videoSettings.activeMode.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Right: Media Folders, 3D Video Manager Trigger & Media Controls */}
            <div className="flex items-center gap-2.5">
              
              {/* MEDIA FOLDERS EXPLORER BUTTON */}
              <button
                id="open-hero-media-folder-btn"
                onClick={() => {
                  if (onOpenMediaFolder) {
                    onOpenMediaFolder("home-page/hero-section");
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                className="bg-neutral-900/90 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase px-3.5 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2 transition-all cursor-pointer group"
                title="Open Hero Section Media Folder"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">MEDIA FOLDERS</span>
              </button>

              {/* PRIMARY 3D VIDEO UPLOAD BUTTON */}
              <button
                id="upload-3d-video-btn"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase px-4 py-2 rounded-full shadow-lg shadow-[#E21D1D]/30 border border-white/20 flex items-center gap-2 transition-all scale-100 hover:scale-105 cursor-pointer group"
                title="Upload or manage 3D background videos"
              >
                <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>3D VIDEO</span>
                {videoSettings.isCustomUploaded && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>

              {/* Video Audio Mute/Unmute quick toggle */}
              {videoSettings.activeMode === "3d-video" && (
                <button
                  onClick={() => {
                    const newMuteState = !videoSettings.isMuted;
                    setVideoSettings((prev) => ({ ...prev, isMuted: newMuteState }));
                    if (videoRef.current) {
                      videoRef.current.muted = newMuteState;
                    }
                  }}
                  className="p-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-neutral-300 hover:text-white transition-all cursor-pointer"
                  title={videoSettings.isMuted ? "Unmute 3D Video Sound" : "Mute Video Sound"}
                >
                  {videoSettings.isMuted ? (
                    <VolumeX className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#E21D1D] animate-pulse" />
                  )}
                </button>
              )}

              {/* Slide Counter / Play Pause */}
              <div className="flex items-center gap-2.5 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full font-mono text-xs shadow-xl">
                <span className="text-[#E21D1D] font-black text-xs">
                  0{currentSlide + 1}
                </span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400 text-xs">0{slides.length}</span>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

          {/* CENTER: 2-COLUMN 3D STAGE (LEFT: HEADLINE & CTAs, RIGHT: 4 3D VIDEO / GARMENT SHOWCASE BOXES) */}
          <div 
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto pt-4 pb-6"
            style={{
              transform: "translateZ(45px)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* LEFT COLUMN: CATEGORY HEADLINE, DETAILS & CTAs */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideData.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Category Badge Tag */}
                  <div className="inline-flex items-center gap-2 bg-[#E21D1D] text-white text-[11px] font-mono font-black uppercase px-3.5 py-1 rounded-md tracking-wider sports-skew shadow-lg shadow-[#E21D1D]/30">
                    <span className="sports-skew-reverse flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      {activeSlideData.category || activeSlideData.tag}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <h3 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#E21D1D] uppercase font-black drop-shadow-md">
                    {activeSlideData.subtitle}
                  </h3>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[0.95] uppercase drop-shadow-2xl">
                    {activeSlideData.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-2xl drop-shadow-md">
                    {activeSlideData.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={activeSlideData.buttonLink}
                      className="bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black px-7 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E21D1D]/30 flex items-center gap-2 cursor-pointer group"
                    >
                      <span>{activeSlideData.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </a>

                    <a
                      href="#factory-capabilities"
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-lg"
                    >
                      <Factory className="w-4 h-4 text-neutral-400" />
                      <span>FACTORY TOUR</span>
                    </a>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-neutral-900/90 hover:bg-black text-neutral-300 hover:text-white border border-white/15 font-mono font-bold px-4 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
                    >
                      <Video className="w-4 h-4 text-[#E21D1D]" />
                      <span>CUSTOMIZE 3D VIDEO</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: 4 3D VIDEO & GARMENT SHOWCASE BOXES */}
            <div className="lg:col-span-5 w-full">
              <Hero3DSlotsGrid
                slots={activeSlideData.slots3D || []}
                categoryName={activeSlideData.category || activeSlideData.tag}
                slideId={activeSlideData.id}
                onSlotVideoActivate={(videoUrl, title) => {
                  handleSaveVideoSettings({
                    ...videoSettings,
                    videoUrl,
                    videoTitle: title,
                    isCustomUploaded: true,
                    activeMode: "3d-video"
                  });
                }}
              />
            </div>
          </div>

          {/* BOTTOM NAVIGATION CONTROLS & SLIDE THUMBNAILS (HERO SLIDESHOW) */}
          <div 
            className="space-y-4 pt-4"
            style={{
              transform: "translateZ(30px)"
            }}
          >
            {/* Active Slide Timer Line */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#E21D1D] h-full transition-all duration-75 ease-linear glow-red-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Interactive Slide Tabs & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Slide Selector Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full sm:w-auto">
                {slides.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? "border-[#E21D1D] bg-black/85 shadow-md glow-red-sm"
                          : "border-white/10 bg-black/40 hover:bg-black/60 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[9px] text-[#E21D1D] font-bold block leading-none">
                          0{idx + 1}
                        </span>
                        <span className="font-display font-bold text-white text-[11px] truncate block leading-tight uppercase mt-0.5">
                          {slide.category || slide.tag || slide.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Manual Left/Right Arrow Controls & 3D Mode Shortcuts */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="bg-black/60 border border-white/10 rounded-xl p-1 flex items-center gap-1 mr-2">
                  <button
                    onClick={() => {
                      const nextMode = videoSettings.activeMode === "3d-video" ? "hologram" : videoSettings.activeMode === "hologram" ? "slides" : "3d-video";
                      handleSaveVideoSettings({ ...videoSettings, activeMode: nextMode });
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-neutral-300 hover:text-white uppercase transition-colors flex items-center gap-1 cursor-pointer"
                    title="Cycle 3D Modes"
                  >
                    <Rotate3d className="w-3 h-3 text-[#E21D1D]" />
                    <span>MODE: {videoSettings.activeMode}</span>
                  </button>
                </div>

                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl border border-white/15 bg-black/60 text-neutral-300 hover:text-white hover:border-[#E21D1D] hover:bg-black/90 transition-all cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl border border-white/15 bg-black/60 text-neutral-300 hover:text-white hover:border-[#E21D1D] hover:bg-black/90 transition-all cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          </div>
        </div>

      {/* ================= 3D VIDEO UPLOADER & MEDIA LAB MODAL ================= */}
      <Hero3DVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSettings={videoSettings}
        onSaveSettings={handleSaveVideoSettings}
      />
    </section>
  );
};
