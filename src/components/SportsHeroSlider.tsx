import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
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
import { Interactive3DGarmentsStage } from "./Interactive3DGarmentsStage";
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

const HERO_SLIDE_BG_VIDEOS = [
  { id: 0, url: "/media/home/videos/sportswearsBG.webm", title: "Sports Wears" },
  { id: 1, url: "/media/home/videos/gymandfitnessBG.webm", title: "Gym & Fitness" },
  { id: 2, url: "/media/home/videos/streetwearsBG.webm", title: "Street Wears" },
  { id: 3, url: "/media/home/videos/leatherBG.webm", title: "Leather Jackets" }
];

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-sports-wears",
    category: "SPORTS WEARS",
    title: "CUSTOM SUBLIMATED SPORTS & MATCH KITS",
    subtitle: "SOCCER • BASKETBALL • CRICKET • RUGBY • TRACK & FIELD",
    description: "Championship aerodynamic athletic jerseys and tracksuits engineered with Italian sublimation inks, laser-cut ventilation, and 4-way stretch interlock fabrics.",
    image: "/media/home/videos/sportswearsBG.webm",
    buttonText: "CUSTOM TEAM KITS",
    buttonLink: "#b2b-calculator",
    tag: "SPORTS WEARS • MATCH KITS"
  },
  {
    id: "slide-gym-fitness",
    category: "GYM & FITNESS",
    title: "HIGH-COMPRESSION GYM & ACTIVEWEAR",
    subtitle: "SEAMLESS • SQUAT-PROOF • MUSCLE-FIT COMPRESSION",
    description: "High-denier squat-proof seamless activewear, contour-ribbed fitness sets, compression rashguards, and quick-dry gym stringers built for maximum athletic performance.",
    image: "/media/home/videos/gymandfitnessBG.webm",
    buttonText: "ORDER ACTIVEWEAR",
    buttonLink: "#b2b-calculator",
    tag: "GYM & FITNESS • ACTIVEWEAR"
  },
  {
    id: "slide-street-wears",
    category: "STREET WEARS",
    title: "LUXURY HEAVYWEIGHT STREETWEAR APPAREL",
    subtitle: "450–550 GSM HOODIES • BOXY TEES • VINTAGE MINERAL WASH",
    description: "Bespoke custom-cut streetwear blanks crafted from 100% combed loopback French terry and heavy single jersey. 3D puff screen-printing and high-density Tajima embroidery.",
    image: "/media/home/videos/streetwearsBG.webm",
    buttonText: "START STREETWEAR LINE",
    buttonLink: "#b2b-calculator",
    tag: "STREET WEARS • HEAVYWEIGHT"
  },
  {
    id: "slide-leather-jackets",
    category: "JACKETS",
    title: "PREMIUM LEATHER, PUFFER, VARSITY & BOMBER JACKETS",
    subtitle: "GENUINE LEATHER • DOWN PUFFERS • VARSITY WOOL • FLIGHT BOMBERS",
    description: "Master artisanal outerwear production. Genuine top-grain cowhide biker jackets, quilted down winter puffers, classic American wool-leather varsity squad jackets, and tactical flight bombers.",
    image: "/media/home/videos/leatherBG.webm",
    buttonText: "BESPOKE JACKET ORDERS",
    buttonLink: "#b2b-calculator",
    tag: "JACKETS • LEATHER • PUFFER • VARSITY"
  }
];

export const SportsHeroSlider: React.FC<SportsHeroSliderProps> = ({ slides, onOpenMediaFolder }) => {
  const activeSlides = (slides && slides.length > 0) ? slides : DEFAULT_HERO_SLIDES;
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

  // Scroll-Driven 3D Cinematic Motion
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothHeroScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  // 3D Parallax & Depth transforms
  const heroScale = useTransform(smoothHeroScroll, [0, 1], [1, 0.92]);
  const heroY = useTransform(smoothHeroScroll, [0, 1], [0, 140]);
  const heroRotateX = useTransform(smoothHeroScroll, [0, 1], [0, 15]);
  const heroOpacity = useTransform(smoothHeroScroll, [0, 0.85], [1, 0.25]);

  // Video Background 3D Zoom & Recede
  const bgScale = useTransform(smoothHeroScroll, [0, 1], [1.05, 1.25]);
  const bgY = useTransform(smoothHeroScroll, [0, 1], [0, 80]);

  // Floating Cyber Grid Parallax
  const gridY = useTransform(smoothHeroScroll, [0, 1], [120, -40]);
  const gridOpacity = useTransform(smoothHeroScroll, [0, 0.7], [0.25, 0.05]);

  // HUD Top Bar Parallax
  const hudY = useTransform(smoothHeroScroll, [0, 0.4], [0, -50]);
  const hudOpacity = useTransform(smoothHeroScroll, [0, 0.35], [1, 0]);

  // Floating Embers / Particles Parallax
  const particlesY = useTransform(smoothHeroScroll, [0, 1], [0, -260]);

  const SLIDE_DURATION = 8000; // 8 seconds interval between category slides
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

  // Sync Video playback rate, volume & viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = videoSettings.playbackSpeed || 1;
    video.volume = 0;
    video.muted = true;

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
      { threshold: 0.05 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoSettings.playbackSpeed, currentSlide]);

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

  // Slide advancement timer for multi-slide mode (exact 8 seconds per category)
  useEffect(() => {
    if (!isPlaying || !activeSlides || activeSlides.length <= 1) return;

    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(currentPct);
    }, TICK_INTERVAL);

    const slideTimer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [currentSlide, isPlaying, activeSlides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const activeSlideData = activeSlides[currentSlide] || activeSlides[0];

  // Specific 10s video loop for category backgrounds
  const activeVideoUrl = currentSlide === 0 
    ? "/media/home/videos/sportswearsBG.webm" 
    : currentSlide === 1
    ? "/media/home/videos/gymandfitnessBG.webm"
    : currentSlide === 2
    ? "/media/home/videos/streetwearsBG.webm"
    : currentSlide === 3
    ? "/media/home/videos/leatherBG.webm"
    : (videoSettings.videoUrl || "/media/home/videos/sportswearsBG.webm");

  return (
    <section
      id="hero-slider"
      ref={heroRef}
      className="relative min-h-[740px] sm:min-h-[820px] bg-neutral-950 overflow-hidden border-b border-neutral-900 select-none"
    >
      {/* STRAIGHT, STABLE HERO CONTAINER WITH 3D PERSPECTIVE SCROLL DYNAMICS */}
      <div 
        className="w-full h-full min-h-[740px] sm:min-h-[820px] relative flex flex-col justify-between py-10"
        style={{ perspective: "1200px" }}
      >
        {/* ================= BACKGROUND LAYER (3D VIDEO / HOLOGRAPHIC / SLIDES) ================= */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          
          {/* MODE 1: HIGH-PERFORMANCE HARDWARE-ACCELERATED SINGLE ACTIVE VIDEO PLAYER */}
          {videoSettings.activeMode === "3d-video" && (
            <div className="relative w-full h-full" style={{ contain: "strict" }}>
              <video
                key={videoSettings.isCustomUploaded && videoSettings.videoUrl ? videoSettings.videoUrl : activeVideoUrl}
                ref={videoRef}
                src={videoSettings.isCustomUploaded && videoSettings.videoUrl ? videoSettings.videoUrl : activeVideoUrl}
                autoPlay
                loop
                muted={videoSettings.isMuted}
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                className="w-full h-full object-cover object-center scale-105 transition-opacity duration-500 transform-gpu will-change-transform"
                style={{
                  transform: "translateZ(0)",
                  opacity: 0.85
                }}
              />
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
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{
                y: gridY,
                opacity: gridOpacity,
                backgroundImage: `
                  linear-gradient(to right, rgba(226, 29, 29, 0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(226, 29, 29, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                transform: "perspective(600px) rotateX(65deg) scale(1.6)",
                transformOrigin: "bottom center"
              }}
            />
          )}

          {/* Atmospheric Floating 3D Spark Particles */}
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ y: particlesY }}
          >
            {[
              { top: "20%", left: "15%", size: 4, delay: 0 },
              { top: "45%", left: "25%", size: 3, delay: 0.5 },
              { top: "30%", left: "75%", size: 5, delay: 1 },
              { top: "65%", left: "85%", size: 3, delay: 1.5 },
              { top: "15%", left: "60%", size: 4, delay: 2 },
              { top: "80%", left: "40%", size: 3, delay: 2.5 }
            ].map((p, idx) => (
              <div
                key={idx}
                className="absolute rounded-full bg-[#E21D1D] shadow-[0_0_12px_#E21D1D] animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  opacity: 0.7
                }}
              />
            ))}
          </motion.div>

          {/* Athletic Texture Hatch overlay */}
          <div className="absolute inset-0 athletic-hatch opacity-20 pointer-events-none" />
        </div>

        {/* ================= FOREGROUND CONTENT LAYER (HERO STAGE + 4 3D VIDEO BOXES) ================= */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between flex-1 pointer-events-auto">
          
          {/* TOP 3D HUD CONTROLS BAR (PARALLAX ON SCROLL) */}
          <motion.div 
            className="flex flex-wrap items-center justify-between gap-4 pt-2"
            style={{ y: hudY, opacity: hudOpacity }}
          >
            
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

            {/* Right: Audio Controls & Slide Counter (Pure International Storefront) */}
            <div className="flex items-center gap-2.5">
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
                  title={videoSettings.isMuted ? "Unmute Sound" : "Mute Sound"}
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
          </motion.div>

          {/* CENTER: INTERACTIVE 3D MOVING GARMENTS STAGE WITH CONTINUOUS SCROLL DEPTH TRANSFORM */}
          <motion.div 
            className="w-full my-auto py-1"
            style={{
              scale: heroScale,
              y: heroY,
              rotateX: heroRotateX,
              opacity: heroOpacity,
              transformStyle: "preserve-3d"
            }}
          >
            <Interactive3DGarmentsStage 
              currentCategoryIndex={currentSlide} 
              onCategoryChange={(idx) => setCurrentSlide(idx)}
            />
          </motion.div>

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
