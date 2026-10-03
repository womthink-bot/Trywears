import React, { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  Award,
  Factory,
  CheckCircle2,
  Users,
  Globe2,
  Layers,
  Sparkles,
  ArrowRight,
  MapPin,
  Building,
  Check,
  Shirt,
  Dumbbell,
  Flame,
  Shield,
  Compass,
  FileCheck2,
  Palette,
  Scissors,
  Truck,
  MessageSquare,
  Calculator,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Eye,
  Crosshair,
  Maximize2,
  Zap,
  Activity,
  PackageCheck
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { SportsB2BMarquee } from "../components/SportsB2BMarquee";

interface AboutUsPageProps {
  onNavigatePage: (page: string) => void;
}

// B2B Client & Brand Logo Showcase Data
const CLIENT_PARTNERS = [
  { name: "APEX COMBAT LEAGUE", country: "USA • LAS VEGAS", badge: "PRO LEAGUE", icon: "🥊" },
  { name: "VANGUARD ATHLETICS", country: "UK • LONDON", badge: "ACTIVEWEAR", icon: "🏋️" },
  { name: "OBSIDIAN STREETWEAR", country: "USA • NEW YORK", badge: "500 GSM LUXURY", icon: "🔥" },
  { name: "KRONOS FIGHT CLUB", country: "GERMANY • BERLIN", badge: "CHAMPIONSHIP", icon: "⚡" },
  { name: "PRIME TOURNAMENT KITS", country: "UAE • DUBAI", badge: "FIFA MATCH GRADE", icon: "⚽" },
  { name: "TITAN MOTORCYCLE CO.", country: "ITALY • MILAN", badge: "1.2MM COWHIDE", icon: "🏍️" },
  { name: "NORDIC FIT LAB", country: "SWEDEN • STOCKHOLM", badge: "SEAMLESS ACTIVE", icon: "❄️" },
  { name: "AURA LUXE APPAREL", country: "FRANCE • PARIS", badge: "PRIVATE LABEL", icon: "✨" }
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigatePage }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);

  // Update SEO Title & Meta Description on mount
  useEffect(() => {
    document.title = "About TRYWEARS | Custom Apparel Manufacturer in Pakistan";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Discover TRYWEARS, a Sialkot-based sportswear and apparel manufacturing partner for custom sportswear, private label gym wear, streetwear, and jackets."
      );
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E21D1D] selection:text-white pb-32 relative overflow-hidden">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND VIDEO ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Seamless looping ambient video */}
        <video
          src="/videos/allPV.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.45] contrast-125 scale-105 opacity-30"
        />

        {/* Ambient Dark Gradient Vignette for 100% Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#070709]/85 to-[#070709] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E21D1D]/15 via-transparent to-transparent pointer-events-none" />

        {/* Scanning High-Tech Laser Beam */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D]/40 to-transparent pointer-events-none"
        />

        {/* Dynamic Background Noise Texture & Blueprint Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(226, 29, 29, 0.4) 1px, transparent 0)`,
            backgroundSize: "44px 44px"
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 0. SEO BREADCRUMB & REAL-TIME FACTORY STATUS BAR               */}
      {/* ============================================================== */}
      <div className="border-b border-neutral-900 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>HOME</span>
            </button>
            <span className="text-neutral-700">/</span>
            <span className="text-[#E21D1D] font-bold">ABOUT TRYWEARS</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-neutral-400">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider font-bold text-neutral-300">
                PLANT ACTIVE: SIALKOT EXPORT HUB (UTC+5)
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISO 9001 • CE • OEKO-TEX 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 01: Built Behind the Brand                             */}
      {/* Brand story · Sialkot, Pakistan · Manufacturer identity        */}
      {/* ============================================================== */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        
        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#E21D1D]/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story Copy & Core Principle */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Section Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/15 border border-[#E21D1D]/40 text-[#E21D1D] text-xs font-mono font-black tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>SECTION 01 • BUILT BEHIND THE BRAND</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 tracking-wider">
                Brand story · Sialkot, Pakistan · Manufacturer identity
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.08]">
              EVERY GREAT APPAREL BRAND STARTS WITH AN IDEA.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                WE HELP BRING IT TO LIFE.
              </span>
            </h1>

            {/* Copy Content */}
            <div className="space-y-4 text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                At <strong className="text-white font-semibold">TRYWEARS</strong>, we believe the most powerful brands are built on more than what people see. They are built on the quality of every garment, the details behind every design, and the people who turn creative ideas into something real.
              </p>
              <p>
                Based in <strong className="text-white font-semibold">Sialkot, Pakistan</strong>, TRYWEARS is a sportswear and apparel manufacturing and supply partner specializing in <span className="text-neutral-100 font-medium">sportswear, gym and fitness wear, streetwear, and jackets</span>. We work with clothing brands, emerging entrepreneurs, retailers, and wholesale buyers looking to develop apparel collections that reflect their own identity.
              </p>
              <p>
                Our approach brings product vision and manufacturing together. Whether you are developing a new clothing label or expanding an existing collection, we aim to make the journey from concept to finished garment clearer, more practical, and more aligned with your brand.
              </p>
            </div>

            {/* Principle Callout Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E21D1D]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1 z-10">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-3.5 h-3.5 text-[#E21D1D]" />
                  <span className="text-[11px] font-mono font-black text-[#E21D1D] uppercase tracking-wider">
                    THE TRYWEARS PRINCIPLE
                  </span>
                </div>
                <p className="text-base sm:text-xl font-display font-black text-white uppercase tracking-tight">
                  Your vision sets the direction. We help build what comes next.
                </p>
              </div>

              <button
                onClick={() => onNavigatePage("customization")}
                className="px-5 py-3 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(226,29,29,0.35)] shrink-0 cursor-pointer hover:scale-105 z-10"
              >
                <span>Customize Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive 9:16 Video & Industrial Craft Visual Chamber */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-none rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group">
              
              {/* Background Factory Video Loop with 9:16 Aspect Ratio */}
              <div className="relative aspect-[9/16] w-full max-h-[660px] overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/videos/aboutV1.webm"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Vignettes & Tech Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

                {/* Scanning Laser Beam */}
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D] to-transparent opacity-60 pointer-events-none"
                />

                {/* Top Video Controls */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#E21D1D]" />}
                  </button>
                  <button
                    onClick={toggleVideoPlayback}
                    className="p-2 rounded-xl bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4 text-neutral-400" /> : <Play className="w-4 h-4 text-[#E21D1D]" />}
                  </button>
                </div>

                {/* Live Factory Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
                  <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
                    TRYWEARS PRODUCTION REEL
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3">
                  <div className="p-4 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#E21D1D] font-black uppercase">SIALKOT OEM/ODM POWERHOUSE</span>
                      <span className="text-neutral-400">ESTD 1998</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center font-mono">
                      <div>
                        <span className="text-white font-black text-xs block">100,000+</span>
                        <span className="text-[8px] text-neutral-400 block uppercase">SQ FT PLANT</span>
                      </div>
                      <div>
                        <span className="text-[#E21D1D] font-black text-xs block">450+</span>
                        <span className="text-[8px] text-neutral-400 block uppercase">ARTISANS</span>
                      </div>
                      <div>
                        <span className="text-white font-black text-xs block">64+</span>
                        <span className="text-[8px] text-neutral-400 block uppercase">COUNTRIES</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* BRAND PARTNER & BUYER MARQUEE ("JIN KA KAAM KIA HAI")           */}
      {/* ============================================================== */}
      <section className="py-12 bg-black/90 border-b border-neutral-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-black text-neutral-400 uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#E21D1D]" />
            <span>TRUSTED OEM MANUFACTURING PARTNER FOR GLOBAL BRANDS</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            SUPPLYING EUROPE • UK • USA • MIDDLE EAST • AUSTRALIA
          </span>
        </div>

        {/* Scrolling Partner Logos */}
        <div className="relative flex overflow-x-hidden group">
          <div className="flex space-x-4 animate-marquee py-2 whitespace-nowrap">
            {CLIENT_PARTNERS.concat(CLIENT_PARTNERS).map((partner, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-[#E21D1D]/60 hover:bg-neutral-900 transition-all duration-300 shadow-md cursor-default"
              >
                <span className="text-xl">{partner.icon}</span>
                <div className="text-left font-mono">
                  <span className="text-xs font-black text-white block uppercase tracking-wide">
                    {partner.name}
                  </span>
                  <span className="text-[9px] text-neutral-400 block uppercase">
                    {partner.country} • <strong className="text-[#E21D1D]">{partner.badge}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Reverse Marquee */}
        <SportsB2BMarquee />
      </section>

      {/* ============================================================== */}
      {/* SECTION 02: One Manufacturing Partner. Four Apparel Directions */}
      {/* Sportswear · Fitness · Streetwear · Jackets                     */}
      {/* ============================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-900 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>SECTION 02 • FOUR APPAREL DIRECTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
            ONE MANUFACTURING PARTNER.{" "}
            <span className="text-[#3B82F6]">FOUR APPAREL DIRECTIONS.</span>
          </h2>

          <p className="text-sm sm:text-base font-mono text-neutral-400 uppercase tracking-wide leading-relaxed">
            Different markets. Different movements. One clear manufacturing vision.
          </p>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            At TRYWEARS, we bring four essential apparel categories together to support brands with different audiences, ambitions, and product ideas.
          </p>
        </motion.div>

        {/* 4 Dedicated Cards with Video & Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 01. Sportswear Manufacturing */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-[#E21D1D] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(226,29,29,0.15)]"
          >
            {/* Visual Media Header */}
            <div className="relative h-56 w-full overflow-hidden bg-black">
              <video
                src="/videos/sportswearsGP.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <Shirt className="w-3.5 h-3.5 text-[#E21D1D]" />
                <span className="font-mono text-[9px] font-black text-white uppercase">DIVISION 01</span>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-[#E21D1D] font-black uppercase tracking-wider block">
                  CLO 3D MATCH GRADE • ZERO-FADE SUBLIMATION
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  Sportswear Manufacturing
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-neutral-300 text-sm leading-relaxed">
                From custom sports jerseys and teamwear to training apparel, we support the development of sportswear designed around your specifications, visual identity, and intended use.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                  {["Custom Sports Jerseys", "Teamwear Kits", "Training Apparel", "Pro Sublimation"].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Target: Custom Sportswear Manufacturer</span>
                  <button
                    onClick={() => {
                      onNavigatePage("home");
                      setTimeout(() => {
                        document.getElementById("cat-section-sports-wears")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#E21D1D]/15 hover:bg-[#E21D1D] text-[#E21D1D] hover:text-white border border-[#E21D1D]/40 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Division</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 02. Gym & Fitness Wear Manufacturing */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-[#3B82F6] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
          >
            {/* Visual Media Header */}
            <div className="relative h-56 w-full overflow-hidden bg-black">
              <video
                src="/videos/gymandfitnessGP.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <Dumbbell className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span className="font-mono text-[9px] font-black text-white uppercase">DIVISION 02</span>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-[#3B82F6] font-black uppercase tracking-wider block">
                  4-WAY POWER STRETCH • SEAMLESS KNIT
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  Gym & Fitness Wear Manufacturing
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-neutral-300 text-sm leading-relaxed">
                For fitness brands and activewear labels, we support custom gym clothing built around your preferred designs, fits, fabrics, and branding requirements.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                  {["Private Label Gym Wear", "Seamless Sets", "Compression Rashguards", "Activewear Leggings"].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Target: Private Label Gym Wear Manufacturer</span>
                  <button
                    onClick={() => {
                      onNavigatePage("home");
                      setTimeout(() => {
                        document.getElementById("cat-section-gym-fitness")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3B82F6]/15 hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white border border-[#3B82F6]/40 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Division</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 03. Streetwear Manufacturing */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-[#F59E0B] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]"
          >
            {/* Visual Media Header */}
            <div className="relative h-56 w-full overflow-hidden bg-black">
              <video
                src="/videos/streetwearsGP.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="font-mono text-[9px] font-black text-white uppercase">DIVISION 03</span>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-[#F59E0B] font-black uppercase tracking-wider block">
                  500 GSM HEAVYWEIGHT • FRENCH TERRY • ACID WASH
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  Streetwear Manufacturing
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-neutral-300 text-sm leading-relaxed">
                From statement T-shirts and hoodies to sweatshirts, joggers, and coordinated casualwear, we help clothing labels develop streetwear collections that express their individual aesthetic.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                  {["500 GSM Heavyweight Hoodies", "Oversized Vintage Tees", "French Terry Joggers", "Puff Print"].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Target: Custom Streetwear Manufacturer</span>
                  <button
                    onClick={() => {
                      onNavigatePage("home");
                      setTimeout(() => {
                        document.getElementById("cat-section-street-wears")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F59E0B]/15 hover:bg-[#F59E0B] text-[#F59E0B] hover:text-white border border-[#F59E0B]/40 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Division</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 04. Custom Jacket Manufacturing */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-[#10B981] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
          >
            {/* Visual Media Header */}
            <div className="relative h-56 w-full overflow-hidden bg-black">
              <video
                src="/videos/leatherGP.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <Shield className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-mono text-[9px] font-black text-white uppercase">DIVISION 04</span>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="font-mono text-[10px] text-[#10B981] font-black uppercase tracking-wider block">
                  1.2MM DRUM-DYED COWHIDE • MELTON VARSITY
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                  Custom Jacket Manufacturing
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-neutral-300 text-sm leading-relaxed">
                From lightweight outerwear to lifestyle and sports-inspired jackets, we help bring outerwear concepts to production with attention to design details, construction, and brand presentation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                  {["1.2mm Cowhide Leather", "Melton Wool Varsity", "Biker Moto Jackets", "Aviator Shearling"].map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Target: Custom Jacket Manufacturer</span>
                  <button
                    onClick={() => {
                      onNavigatePage("home");
                      setTimeout(() => {
                        document.getElementById("cat-section-leather-jackets")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981] text-[#10B981] hover:text-white border border-[#10B981]/40 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Division</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section 02 Single Point of Contact Sourcing Callout */}
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800 text-center max-w-4xl mx-auto space-y-3 shadow-xl">
          <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-sans">
            Whether you are sourcing a <strong className="text-white">custom sportswear manufacturer</strong>, a <strong className="text-white">private label gym wear manufacturer</strong>, a <strong className="text-white">streetwear production partner</strong>, or a <strong className="text-white">custom jacket supplier</strong>, TRYWEARS offers a single point of contact for discussing your apparel manufacturing requirements.
          </p>
        </div>

      </section>

      {/* ============================================================== */}
      {/* SECTION 03: From Your First Sketch to Your Next Collection     */}
      {/* Product development · Customization · Private label            */}
      {/* ============================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-900 space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>SECTION 03 • PRODUCT DEVELOPMENT & PRIVATE LABEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
            FROM YOUR FIRST SKETCH TO{" "}
            <span className="text-[#10B981]">YOUR NEXT COLLECTION</span>
          </h2>

          <p className="text-base sm:text-lg font-mono text-neutral-300 uppercase tracking-wide">
            Your brand should never feel like someone else's product.
          </p>
        </motion.div>

        {/* Narrative & Practical Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-6 space-y-5 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              We understand that every apparel business has its own goals. Some brands are preparing their first launch. Others are developing a seasonal collection, expanding their product range, or looking for a manufacturing partner that understands their specifications.
            </p>
            <p>
              <strong className="text-white">TRYWEARS</strong> approaches every project by starting with the product you want to create.
            </p>
            <p>
              Share your design concepts, reference images, technical specifications, or product requirements. Together, we can discuss the appropriate manufacturing options for your collection, including garment construction, fabric choices, colours, logo application, and private label branding, depending on the product and project scope.
            </p>
            <p>
              Our manufacturing discussions focus on the details that matter to your business: what you want to produce, how you want it presented, the quantities you require, and the specifications your finished garments need to follow.
            </p>
            <p>
              For brands seeking a <strong className="text-white font-semibold">private label clothing manufacturer in Pakistan</strong>, this creates a practical starting point for developing products under their own brand identity.
            </p>
          </div>

          {/* Interactive Roadmap Box with Animated Laser Scanner */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 relative overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest flex items-center gap-2">
                <Scissors className="w-4 h-4" />
                <span>END-TO-END DEVELOPMENT PIPELINE</span>
              </h4>
              <span className="text-[10px] font-mono text-neutral-500">SIALKOT FACILITY</span>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  step: "01",
                  title: "Design Concepts & Tech Packs",
                  desc: "Share reference sketches, CAD mockups, vector artwork, or tech measurements.",
                  icon: "📐"
                },
                {
                  step: "02",
                  title: "Fabric Sourcing & GSM Weight",
                  desc: "Custom pantone dyeing, moisture-wicking interlock, 500 GSM terry, or 1.2mm leather.",
                  icon: "🧵"
                },
                {
                  step: "03",
                  title: "Logo Application & Private Label Trims",
                  desc: "Silicone heat transfers, 3D embroidery, woven neck tags, custom zipper pulls & wash care labels.",
                  icon: "🏷️"
                },
                {
                  step: "04",
                  title: "Precision Sampling & Bulk Delivery",
                  desc: "Pre-production samples dispatched in 7-10 days, followed by QA-inspected bulk production.",
                  icon: "✈️"
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/30 text-[#E21D1D] font-mono text-xs font-black flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <h5 className="text-xs font-mono font-bold text-white uppercase">{item.title}</h5>
                    </div>
                    <p className="text-[11px] font-mono text-neutral-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Section 03 Punchline */}
            <div className="p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-mono text-xs font-bold uppercase tracking-wide text-center">
              No generic vision for your brand. Just a clearer path from your idea to a manufacturable product.
            </div>
          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* SECTION 04: Rooted in Sialkot. Ready for Your Market.          */}
      {/* International sourcing · B2B partnerships · Call to action    */}
      {/* ============================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Globe2 className="w-3.5 h-3.5" />
            <span>SECTION 04 • GLOBAL B2B PARTNERSHIPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight">
            ROOTED IN SIALKOT.{" "}
            <span className="text-[#A855F7]">READY FOR YOUR MARKET.</span>
          </h2>

          <p className="text-base sm:text-lg font-mono text-neutral-300 uppercase tracking-wide">
            Local manufacturing knowledge. A global brand mindset.
          </p>
        </motion.div>

        {/* Narrative & International Reach */}
        <div className="space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          <p>
            <strong className="text-white font-semibold">Sialkot, Pakistan</strong>, has an established presence in sports goods and export-oriented manufacturing. It is where TRYWEARS is based, bringing its apparel manufacturing and supply capabilities to businesses looking for a production partner beyond their own local market.
          </p>
          <p>
            We welcome enquiries from <span className="text-white font-medium">sportswear brands, fitness labels, streetwear startups, clothing retailers, distributors, and wholesale buyers</span> across the <strong className="text-white">United Kingdom, United States, Europe, and other international markets</strong>.
          </p>
          <p>
            We believe successful manufacturing partnerships are built through clear specifications, realistic expectations, open communication, and attention to the finished product. That is why we encourage buyers to share their <span className="text-neutral-100 font-medium">product category, design references, branding requirements, estimated quantities, and delivery destination</span> when starting a conversation.
          </p>
          <p>
            Whether you are planning your first private label collection or sourcing new products for an established business, TRYWEARS is ready to discuss your manufacturing requirements and explore how we can work together.
          </p>
          <p className="text-lg font-display font-bold text-white uppercase tracking-wide pt-2">
            Your next collection deserves more than a supplier. It deserves a manufacturing partner who understands your vision.
          </p>
        </div>

        {/* What to Share Check-List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 max-w-4xl shadow-xl">
          <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>WHEN STARTING A CONVERSATION WITH US, PLEASE SHARE:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs text-neutral-300">
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">01.</span>
              <span>Product Category & Style</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">02.</span>
              <span>Design References & Sketches</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">03.</span>
              <span>Branding & Logo Details</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">04.</span>
              <span>Estimated Order Quantities</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">05.</span>
              <span>Delivery Country & Destination</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-center gap-2.5">
              <span className="text-[#E21D1D] font-bold">06.</span>
              <span>Target Launch Timeline</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FINAL CALL TO ACTION: Let's Build Your Next Collection         */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-14 text-center space-y-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
        >
          {/* Ambient red glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E21D1D]/20 blur-[130px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E21D1D]/15 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase relative z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S BUILD YOUR NEXT COLLECTION</span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight max-w-3xl mx-auto relative z-10">
            TELL US WHAT YOU WANT TO CREATE.
          </h3>

          <p className="text-neutral-300 font-mono text-sm sm:text-base max-w-2xl mx-auto uppercase relative z-10">
            Let's discuss your products, customization requirements, and manufacturing needs.
          </p>

          <div className="pt-2 relative z-10">
            <span className="text-sm sm:text-base font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-white to-red-400 uppercase tracking-widest">
              TRYWEARS — Made for Your Vision. Built for Your Brand.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={() => onNavigatePage("customization")}
              className="px-7 py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start a Project Discussion</span>
            </button>

            <button
              onClick={() => {
                onNavigatePage("home");
                setTimeout(() => {
                  document.getElementById("b2b-calculator")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#E21D1D]" />
              <span>Calculate Order MOQ & Pricing</span>
            </button>
          </div>
        </motion.div>

      </section>

    </div>
  );
};
