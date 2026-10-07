import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Scissors,
  Layers,
  CheckCircle2,
  Upload,
  ShieldCheck,
  ChevronRight,
  Sliders,
  DollarSign,
  Package,
  Zap,
  RefreshCw,
  Cpu,
  Building,
  Shirt,
  Dumbbell,
  Flame,
  Shield,
  Palette,
  FileCheck2,
  Lock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Crosshair,
  Award,
  Check,
  Tag,
  Box,
  Compass,
  Calculator,
  MessageSquare,
  Printer,
  Sparkle,
  Target,
  Users,
  Repeat,
  BadgeCheck,
  Globe2,
  ArrowUpRight,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TShirtCustomizer } from "../components/TShirtCustomizer";
import { CustomProductsShowcase } from "../components/CustomProductsShowcase";
import { SportsB2BMarquee } from "../components/SportsB2BMarquee";
import { Product } from "../types";

interface CustomizationPageProps {
  customizerProduct: Product | null;
  onAddToCart: (item: any) => void;
  onNavigatePage: (page: string) => void;
}

// ✦ 4 IN-HOUSE INDUSTRIAL CUSTOMIZATION METHODS (HIGH CONTRAST & BRIGHT)
const IN_HOUSE_CUSTOMIZATION_METHODS = [
  {
    id: "sublimation",
    title: "Full-Body Italian Sublimation",
    badge: "ZERO-FADE GAS INFUSION",
    badgeColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    icon: Palette,
    summary:
      "Full-garment color, sponsor logos, and complex patterns dyed directly into the fabric polymers — not coated on top of it.",
    details:
      "Engineered with 210°C Italian heat-gas infusion. Colors become part of the yarn fibers, ensuring zero cracking, zero peeling, and zero fading even after 100+ high-temp wash cycles.",
    bestFor: "Championship football jerseys, basketball kits, rugby uniforms, and multi-color gradient artworks.",
    durability: "Lifetime Color Fastness (AATCC Class 5)",
    setupTime: "48-Hour Strike-Off Sample"
  },
  {
    id: "embroidery",
    title: "High-Density 3D Precision Embroidery",
    badge: "ELEVATED TACTILE FINISH",
    badgeColor: "text-red-400 border-red-500/40 bg-red-500/10",
    icon: Sparkles,
    summary:
      "Digitized vector emblems stitched directly into the fabric using Tajima multi-head computer embroidery.",
    details:
      "Creates a rich, raised 3D profile with satin stitching, gold metallic threading, or heavy chenille texture. Built to outlast the garment itself without fraying or stitch unraveling.",
    bestFor: "Luxury heavyweight hoodies, varsity jackets, polo collars, bomber outers, and structured caps.",
    durability: "Permanent Structural Seam (Zero Fraying)",
    setupTime: "Digital CAD Digitizing in 24 Hours"
  },
  {
    id: "screen-printing",
    title: "Industrial Screen & 3D High-Relief Puff",
    badge: "HIGH-VOLUME EFFICIENCY",
    badgeColor: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
    icon: Printer,
    summary:
      "Ultra-cost-efficient printing for bold 1-3 color brand graphics, vintage distressed logos, and 4mm raised puff prints.",
    details:
      "Utilizing eco-friendly plastisol and soft-hand water-based inks with automated carousel presses. Delivers crisp edge sharpness, Pantone-certified hue matching, and high wash longevity.",
    bestFor: "Streetwear boxy tees, heavyweight tracksuits, sweatpants, gym stringers, and volume team drops.",
    durability: "75+ Industrial Laundry Cycles",
    setupTime: "Automated Screen Burning in 24 Hours"
  },
  {
    id: "laser-cutting",
    title: "CNC Laser Cutting & Micro-Perforation",
    badge: "BIOMETRIC ATHLETIC FIT",
    badgeColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    icon: Crosshair,
    summary:
      "Computer-guided laser cutting for micro-perforated airflow panels and seamless thermo-bonded hems.",
    details:
      "Cuts fabric with ±0.1mm tolerance, sealing synthetic edges simultaneously to eliminate raw seam friction. Strategically places ventilation zones where athletic heat maps demand breathability.",
    bestFor: "High-compression tights, pro marathon singlets, combat rashguards, and bonded tactical shorts.",
    durability: "Zero Seam Fraying & Thermo-Bonded Strength",
    setupTime: "CAD Vector Toolpath in 12 Hours"
  }
];

// ✦ 4-STEP PRIVATE-LABEL CUSTOMIZATION WORKFLOW
const CUSTOMIZATION_WORKFLOW = [
  {
    step: "01",
    title: "Tell Us The Garment & Brand Elements",
    desc: "Share your vector logos (AI/PDF), Pantone color codes, and garment styles you want to launch. No rigid presets — we adapt to your sketches.",
    icon: FileText
  },
  {
    step: "02",
    title: "Tailored Method Recommendation",
    desc: "We recommend the exact customization technique based on your fabric GSM, garment ergonomics, and graphic complexity — never a lazy default.",
    icon: Target
  },
  {
    step: "03",
    title: "Sample First For Complete Approval",
    desc: "We craft an express physical pre-production sample. You inspect and approve fabric hand-feel, fit grading, and customization before bulk cutting.",
    icon: BadgeCheck
  },
  {
    step: "04",
    title: "Exact Bulk Run & Reorder Continuity",
    desc: "Bulk production replicates your approved sample identically — utilizing the same certified yarn dye lot and machine settings for seamless reorders.",
    icon: Repeat
  }
];

// ✦ FABRIC MATRIX
const FABRIC_MATERIALS = [
  {
    category: "STREETWEAR & FASHION",
    name: "450–550 GSM Organic French Terry & Loopback Cotton",
    badge: "ULTRA HEAVYWEIGHT",
    desc: "100% combed ring-spun cotton. Carbon-sanded exterior for peach-soft touch with rigid structured drape for oversized hoodies & streetwear fits.",
    moq: "25 Pcs / Colorway",
    leadTime: "7-10 Days",
    accent: "#F59E0B"
  },
  {
    category: "COMBAT & FIGHT GEAR",
    name: "1.2mm Full-Grain Drum-Dyed Cowhide & Multi-Core EVA",
    badge: "TITLE FIGHT GRADE",
    desc: "Premium Pakistani A-grade leather tanned with zero hazardous metals. Laminated with 4-layer EVA shock-dispersion cores for championship gloves and shin guards.",
    moq: "15 Pairs / Model",
    leadTime: "7-10 Days",
    accent: "#10B981"
  },
  {
    category: "PERFORMANCE SPORTSWEAR",
    name: "180–220 GSM Micro-Interlock Poly with Italian Dri-Fit",
    badge: "ZERO-FADE SUBLIMATION",
    desc: "Moisture-wicking, anti-bacterial 4-way stretch knit. Infused with non-toxic Italian inks at 210°C. Never cracks, fades, or peels.",
    moq: "25 Sets / Design",
    leadTime: "6-8 Days",
    accent: "#E21D1D"
  },
  {
    category: "FITNESS & ACTIVEWEAR",
    name: "280 GSM Poly-Spandex High-Compression Tricot",
    badge: "SQUAT-PROOF COMPRESSION",
    desc: "High-denier spandex blend with 6-thread flatlock stitching. Seamless friction-free seams engineered for extreme athletic range of motion.",
    moq: "25 Pcs / Colorway",
    leadTime: "7-10 Days",
    accent: "#3B82F6"
  }
];

const PRIVATE_LABEL_TRIMS = [
  {
    title: "Custom Woven Neck Labels",
    desc: "High-density damask woven tags with laser-cut edges. Soft touch and zero skin irritation.",
    icon: Tag
  },
  {
    title: "Frosted Matte Zip Lock Polybags",
    desc: "100% recycled eco-EVA with custom logo screenprint, ventilation eyelets, and retail barcodes.",
    icon: Package
  },
  {
    title: "Custom Engraved Metal Hardware",
    desc: "Gunmetal, antique brass, and matte black aglets, eyelets, and YKK custom zip pullers.",
    icon: Box
  },
  {
    title: "Embossed Genuine Leather Patches",
    desc: "Vegetable-tanned leather crests with heat-debossed logos, edge-stitched onto outerwear and hats.",
    icon: Shield
  }
];

export const CustomizationPage: React.FC<CustomizationPageProps> = ({
  customizerProduct,
  onAddToCart,
  onNavigatePage
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // B2B Calculator state
  const [selectedCategory, setSelectedCategory] = useState("Streetwear & Hoodies");
  const [quantity, setQuantity] = useState(100);
  const [customPackaging, setCustomPackaging] = useState(true);
  const [customHardware, setCustomHardware] = useState(true);
  const [puffPrint, setPuffPrint] = useState(true);

  // Tech Pack Submit State
  const [techPackFile, setTechPackFile] = useState<File | null>(null);
  const [techPackSubmitted, setTechPackSubmitted] = useState(false);
  const [brandEmail, setBrandEmail] = useState("");

  // Update SEO Title & Meta Description on mount
  useEffect(() => {
    document.title = "Custom Apparel Manufacturing & Private Label OEM/ODM | TRYWEARS";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Turn your brand into real custom garments from the pattern up. In-house sublimation, 3D embroidery, screen printing, and laser cutting in Sialkot, Pakistan. Low MOQ 50-100 pcs."
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

  // Calculate rough unit price
  const basePrices: Record<string, number> = {
    "Streetwear & Hoodies": 28.5,
    "Combat Gloves & Shin Guards": 36.0,
    "Sublimated Team Sports Kits": 19.5,
    "Gym Fitness Compression Sets": 22.0
  };

  const basePrice = basePrices[selectedCategory] || 25;
  let volumeDiscount = 0;
  if (quantity >= 500) volumeDiscount = 0.28;
  else if (quantity >= 250) volumeDiscount = 0.20;
  else if (quantity >= 100) volumeDiscount = 0.12;
  else if (quantity >= 50) volumeDiscount = 0.05;

  const extras = (customPackaging ? 1.5 : 0) + (customHardware ? 1.8 : 0) + (puffPrint ? 1.2 : 0);
  const estimatedUnitPrice = Math.max(12, Number(((basePrice * (1 - volumeDiscount)) + extras).toFixed(2)));
  const estimatedTotal = Number((estimatedUnitPrice * quantity).toFixed(2));

  const handleTechPackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTechPackSubmitted(true);
    setTimeout(() => {
      setTechPackSubmitted(false);
      setTechPackFile(null);
      setBrandEmail("");
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E21D1D] selection:text-white pb-24 sm:pb-32 relative overflow-x-hidden">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND VIDEO ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/media/home/videos/streetwearsBG.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.5] contrast-125 scale-105 opacity-35"
        />

        {/* Dark Vignettes with high clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#070709]/80 to-[#070709] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E21D1D]/20 via-transparent to-transparent pointer-events-none" />

        {/* Scanning Laser Beam */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D]/40 to-transparent pointer-events-none"
        />

        {/* Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(226, 29, 29, 0.4) 1px, transparent 0)`,
            backgroundSize: "44px 44px"
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 0. SEO BREADCRUMB & REAL-TIME FACTORY STATUS BAR               */}
      {/* ============================================================== */}
      <div className="border-b border-neutral-800 bg-black/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-300 overflow-x-auto scrollbar-none">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-bold shrink-0"
            >
              <Building className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>HOME</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-[#E21D1D] font-black uppercase whitespace-nowrap">CUSTOMIZATION ATELIER</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[10px] text-neutral-300 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="uppercase tracking-wider font-bold text-neutral-200 text-[9px] sm:text-[10px]">
                IN-HOUSE SIALKOT FACILITY
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-neutral-200 font-bold">50–100 PCS MOQ • 2,000+ BRANDS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CINEMATIC HERO: TURN YOUR BRAND INTO REAL GARMENTS           */}
      {/* ============================================================== */}
      <section className="relative py-12 sm:py-20 lg:py-28 px-3.5 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-800/80">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[350px] bg-[#E21D1D]/20 blur-[140px] sm:blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] sm:w-[450px] h-[200px] sm:h-[300px] bg-red-950/30 blur-[120px] sm:blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Atelier Copy & Action CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-7"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E21D1D]/20 border border-[#E21D1D]/50 text-[#ff4d4d] text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase shadow-[0_0_15px_rgba(226,29,29,0.3)]">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>OEM / ODM PRIVATE LABEL MANUFACTURING</span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-neutral-300 tracking-wider font-bold">
                Sialkot Direct • Low MOQ 50–100 Pcs
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.1]">
              TURN YOUR BRAND INTO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                REAL GARMENTS
              </span>{" "}
              — NOT JUST A LOGO ON A BLANK SHIRT.
            </h1>

            <p className="text-neutral-200 font-sans text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
              Most low-MOQ suppliers simply heat-press your logo onto generic stock blanks. At Try Wears, we architect the garment around your brand from the pattern up — custom fabric GSM, bespoke cut & sew grading, and in-house customization methods chosen to match what you’re actually selling, not whatever blank happens to be in stock.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href="#customization-methods"
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-105 flex items-center justify-center gap-2 text-center"
              >
                <Scissors className="w-4 h-4" />
                <span>Explore In-House Methods</span>
              </a>
              <button
                onClick={() => onNavigatePage("b2b-quote")}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                <Upload className="w-4 h-4 text-[#ff4d4d]" />
                <span>Submit Tech Pack Under NDA</span>
              </button>
            </div>

            {/* Quick Guarantees Grid - Fully responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-neutral-800 font-mono text-xs">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#121218] border border-neutral-700/80 shadow-md flex sm:block items-center justify-between">
                <span className="text-white font-black text-sm">50–100 PCS</span>
                <span className="text-[10px] text-neutral-300 uppercase font-bold sm:mt-0.5">FLEXIBLE START MOQ</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#121218] border border-neutral-700/80 shadow-md flex sm:block items-center justify-between">
                <span className="text-[#ff3333] font-black text-sm">100% IN-HOUSE</span>
                <span className="text-[10px] text-neutral-300 uppercase font-bold sm:mt-0.5">SIALKOT PRODUCTION</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#121218] border border-neutral-700/80 shadow-md flex sm:block items-center justify-between">
                <span className="text-emerald-400 font-black text-sm">2,000+ BRANDS</span>
                <span className="text-[10px] text-neutral-300 uppercase font-bold sm:mt-0.5">GLOBALLY DELIVERED</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Video Production Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-neutral-700 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group">
              <div className="relative h-[320px] sm:h-[420px] lg:h-[500px] w-full overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/media/home/videos/streetwearsGP.webm"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-110 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Scanning Laser Beam */}
                <motion.div
                  animate={{ y: [0, 420, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D] to-transparent opacity-80 pointer-events-none shadow-[0_0_8px_#E21D1D]"
                />

                {/* Top Video Controls */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-white/25 backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-300" /> : <Volume2 className="w-4 h-4 text-[#ff4d4d]" />}
                  </button>
                  <button
                    onClick={toggleVideoPlayback}
                    className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-white/25 backdrop-blur-md transition-colors cursor-pointer"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4 text-neutral-300" /> : <Play className="w-4 h-4 text-[#ff4d4d]" />}
                  </button>
                </div>

                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-md">
                  <Scissors className="w-3.5 h-3.5 text-[#ff4d4d]" />
                  <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
                    CUT & SEW CRAFT
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-black/85 border border-white/20 backdrop-blur-md space-y-1 shadow-2xl">
                    <span className="font-mono text-[10px] sm:text-[11px] font-black text-[#ff4d4d] uppercase block tracking-wider">
                      CUSTOM FROM THE PATTERN UP
                    </span>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                      Graded CAD master patterns, tailored fabric dyeing, and precision in-house embellishment.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Marquee Partner Strip */}
      <SportsB2BMarquee />

      {/* ============================================================== */}
      {/* 2. DEDICATED CUSTOM PRODUCTS SHOWCASE (CP1 TO CP7)             */}
      {/* ============================================================== */}
      <CustomProductsShowcase />

      {/* ============================================================== */}
      {/* 3. CUSTOMIZATION METHODS, DONE IN-HOUSE (HIGH CONTRAST)        */}
      {/* ============================================================== */}
      <section id="customization-methods" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800 relative space-y-8 sm:space-y-12">
        
        {/* Section Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[300px] sm:h-[500px] bg-[#E21D1D]/10 blur-[150px] sm:blur-[180px] rounded-full pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-neutral-800 pb-5 sm:pb-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
              100% SIALKOT IN-HOUSE EXECUTION • NO THIRD-PARTY DELAYS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
              CUSTOMIZATION METHODS, <span className="text-[#ff3333]">DONE IN-HOUSE</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-sans leading-relaxed">
              We run all four processes ourselves at our Sialkot facility — no subcontracting a print shop across town and hoping the color match holds from sample to bulk.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigatePage("b2b-quote")}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider border border-red-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(226,29,29,0.35)]"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Methods Grid with High Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {IN_HOUSE_CUSTOMIZATION_METHODS.map((method, idx) => {
            const IconComp = method.icon;
            return (
              <div
                key={method.id}
                className="p-5 sm:p-7 lg:p-8 rounded-3xl bg-[#121219] border border-neutral-700 hover:border-[#E21D1D] transition-all duration-300 space-y-5 sm:space-y-6 flex flex-col justify-between group shadow-[0_15px_45px_rgba(0,0,0,0.85)] relative overflow-hidden"
              >
                {/* Subtle top card highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D]/60 to-transparent group-hover:via-[#E21D1D] transition-all" />

                <div className="space-y-3.5 sm:space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E21D1D]/20 border border-[#E21D1D]/50 flex items-center justify-center text-[#ff4d4d] shadow-[0_0_15px_rgba(226,29,29,0.3)] shrink-0">
                        <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="font-mono text-xs font-black text-neutral-300 uppercase tracking-wider">
                        METHOD 0{idx + 1}
                      </span>
                    </div>

                    <span className={`px-2.5 sm:px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase group-hover:text-[#ff3333] transition-colors leading-tight">
                    {method.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-sans font-medium leading-relaxed">
                    {method.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {method.details}
                  </p>
                </div>

                <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 border-t border-neutral-800 text-xs font-mono">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#1a1a24] border border-neutral-700/80">
                    <span className="text-[10px] sm:text-[11px] text-[#ff6b6b] block uppercase font-black tracking-wider">BEST APPLICATION:</span>
                    <span className="text-neutral-100 text-xs sm:text-sm mt-0.5 sm:mt-1 block font-sans font-medium">{method.bestFor}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#171720] border border-neutral-700">
                      <span className="text-neutral-400 block text-[9px] sm:text-[10px] uppercase font-bold">DURABILITY:</span>
                      <span className="text-emerald-400 font-bold block truncate mt-0.5">{method.durability}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#171720] border border-neutral-700">
                      <span className="text-neutral-400 block text-[9px] sm:text-[10px] uppercase font-bold">SAMPLING TIME:</span>
                      <span className="text-white font-bold block truncate mt-0.5">{method.setupTime}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* In-House Manufacturing Facility Guarantee Card */}
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14141d] via-[#1b1b26] to-[#14141d] border border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-display font-black text-white uppercase leading-snug">
                THE SIALKOT IN-HOUSE PRODUCTION GUARANTEE
              </h4>
              <p className="text-xs sm:text-sm text-neutral-200 font-sans mt-1 leading-relaxed">
                Every print bed, embroidery head, sublimation press, and laser cutter lives on our own factory floor — ensuring strict ISO 9001 quality control and true color fidelity.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigatePage("quality-process")}
            className="w-full md:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-lg text-center"
          >
            Inspect Quality Lab
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. HOW PRIVATE-LABEL CUSTOMIZATION WORKS WITH US (BRIGHT)      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800 space-y-8 sm:space-y-12 relative">
        
        {/* Glow */}
        <div className="absolute top-1/3 right-1/4 w-[350px] sm:w-[600px] h-[250px] sm:h-[400px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest">
            CLEAR, TRANSPARENT B2B PROTOCOL
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
            HOW PRIVATE-LABEL CUSTOMIZATION <span className="text-[#ff3333]">WORKS WITH US</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-mono uppercase">
            From your raw design concept to verified pre-production sample to precise bulk delivery.
          </p>
        </div>

        {/* 4-Step Roadmap with High Contrast & Vivid Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {CUSTOMIZATION_WORKFLOW.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 sm:p-7 rounded-3xl bg-[#121219] border border-neutral-700 relative space-y-4 sm:space-y-5 hover:border-[#E21D1D] transition-all duration-300 group flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.8)]"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-[#ff3333] drop-shadow-[0_0_10px_rgba(226,29,29,0.5)]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#1b1b26] border border-neutral-700 flex items-center justify-center text-[#ff4d4d] group-hover:text-white transition-colors shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-black text-white uppercase leading-snug group-hover:text-[#ff4d4d] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-neutral-800 text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center justify-between font-bold bg-emerald-950/30 px-3 py-2 rounded-xl border border-emerald-500/25">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>STEP {idx + 1} VERIFIED</span>
                  </span>
                  <span className="text-neutral-400 text-[9px] uppercase font-normal">ISO 9001</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. BUILT FOR BRANDS STARTING SMALL & SCALING (HIGH CONTRAST)   */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800">
        <div className="rounded-3xl bg-gradient-to-br from-[#161622] via-[#101018] to-[#161622] border border-neutral-700 p-5 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#E21D1D]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-mono font-bold uppercase shadow-sm">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>OVER 2,000 GLOBAL BRANDS TRUSTED</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-tight">
                BUILT FOR BRANDS <span className="text-[#ff3333]">STARTING SMALL</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-neutral-100 font-sans leading-relaxed">
                Most factories set minimums that only make sense once you’re already established. We start at <strong className="text-white underline decoration-[#E21D1D] decoration-2">50–100 pieces per style/colorway</strong> — enough to launch a real product line without the upfront risk of a 500+ piece minimum before you’ve sold a single unit.
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                We’ve worked with over 2,000 brands, from first-time founders testing a single design to established labels running seasonal reorders — the sampling and customization process stays the same either way.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#0d0d14] backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-neutral-700 space-y-4 sm:space-y-5 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-neutral-400 font-bold">Launch Tier MOQ:</span>
                <span className="text-white font-black text-sm">50–100 Pcs</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-neutral-400 font-bold">Physical Sampling:</span>
                <span className="text-[#ff3333] font-black text-sm">5–7 Days Express</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-neutral-400 font-bold">Reorder Continuity:</span>
                <span className="text-emerald-400 font-black text-sm">100% Match</span>
              </div>
              
              <button
                onClick={() => onNavigatePage("b2b-quote")}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-102 text-center"
              >
                Launch Your First 50 Pcs
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. MATERIAL & TECHNICAL FABRIC MATRIX                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800 space-y-8 sm:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 border-b border-neutral-800 pb-5 sm:pb-6">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest">
              CERTIFIED SOURCING & IN-HOUSE MILLS
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              PREMIUM TECHNICAL FABRIC & MATERIAL MATRIX
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-300 font-bold uppercase">
            ALL FABRICS OEKO-TEX & LAB TESTED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {FABRIC_MATERIALS.map((mat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-7 lg:p-8 rounded-3xl bg-[#121219] border border-neutral-700 hover:border-neutral-500 transition-all space-y-4 sm:space-y-5 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-black text-neutral-300 uppercase tracking-widest">
                    {mat.category}
                  </span>
                  <span 
                    className="px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase border shadow-sm"
                    style={{
                      backgroundColor: `${mat.accent}20`,
                      color: mat.accent,
                      borderColor: `${mat.accent}50`
                    }}
                  >
                    {mat.badge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-display font-black text-white uppercase">
                  {mat.name}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-neutral-800 text-xs font-mono">
                <div className="bg-[#1a1a24] p-3 sm:p-3.5 rounded-xl border border-neutral-700">
                  <span className="text-neutral-400 block text-[9px] sm:text-[10px] font-bold">MINIMUM ORDER:</span>
                  <span className="text-white font-black text-xs sm:text-sm mt-0.5 block truncate">{mat.moq}</span>
                </div>
                <div className="bg-[#1a1a24] p-3 sm:p-3.5 rounded-xl border border-neutral-700">
                  <span className="text-neutral-400 block text-[9px] sm:text-[10px] font-bold">SAMPLE TIME:</span>
                  <span className="text-emerald-400 font-black text-xs sm:text-sm mt-0.5 block truncate">{mat.leadTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PRIVATE LABEL TRIMS & PACKAGING                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800 space-y-8 sm:space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest">
            100% PRIVATE LABEL READY
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            BRANDING TRIMS & RETAIL PACKAGING
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRIVATE_LABEL_TRIMS.map((trim, idx) => {
            const IconComp = trim.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-[#121219] border border-neutral-700 space-y-3 shadow-lg"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E21D1D]/20 border border-[#E21D1D]/50 text-[#ff4d4d] flex items-center justify-center shadow-md shrink-0">
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-display font-black text-white uppercase">
                  {trim.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {trim.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. INTERACTIVE 3D PROTOTYPING LAB                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest">
            INTERACTIVE COLORWAY & TEXTURE SIMULATOR
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            3D DIGITAL PROTOTYPING LAB
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-mono max-w-xl mx-auto uppercase font-bold">
            Test custom colorways, metallic accents, and private label trims before placing your physical production run.
          </p>
        </div>

        <div className="rounded-3xl bg-[#121219] border border-neutral-700 p-4 sm:p-8 shadow-2xl">
          <TShirtCustomizer product={customizerProduct} onAddToCart={onAddToCart} />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. INTERACTIVE B2B PRICE & MOQ CALCULATOR                      */}
      {/* ============================================================== */}
      <section id="b2b-calculator" className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 border-b border-neutral-800">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-[#121219] border border-neutral-700 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6 sm:space-y-8">
          
          <div className="border-b border-neutral-800 pb-5 sm:pb-6 space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest block">
              REAL-TIME PRODUCTION ESTIMATOR
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
              INSTANT B2B BULK COST CALCULATOR
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono">
              Adjust quantity and specifications for estimated factory direct unit pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Controls */}
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-black text-neutral-200 uppercase">
                  Product Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#1c1c28] border border-neutral-700 rounded-2xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D] cursor-pointer"
                >
                  <option>Streetwear & Hoodies</option>
                  <option>Combat Gloves & Shin Guards</option>
                  <option>Sublimated Team Sports Kits</option>
                  <option>Gym Fitness Compression Sets</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-200 font-bold uppercase">Order Quantity:</span>
                  <span className="text-[#ff3333] font-black text-sm">{quantity} Units</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={25}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#E21D1D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 font-bold">
                  <span>MOQ 50</span>
                  <span>100 Units</span>
                  <span>500 Units</span>
                  <span>1000+ Units</span>
                </div>
              </div>

              {/* Custom Addons Checkboxes */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <span className="text-xs font-mono font-black text-neutral-300 uppercase block">
                  Private Label Extras
                </span>

                <label className="flex items-start sm:items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#1a1a24] border border-neutral-700 cursor-pointer hover:border-neutral-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold leading-snug">Custom Frosted Polybags & Barcode Hangtags</span>
                    <span className="text-neutral-400 text-[10px]">+$1.50 / unit</span>
                  </div>
                </label>

                <label className="flex items-start sm:items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#1a1a24] border border-neutral-700 cursor-pointer hover:border-neutral-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={customHardware}
                    onChange={(e) => setCustomHardware(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold leading-snug">Custom Engraved Gunmetal Aglets & YKK Zippers</span>
                    <span className="text-neutral-400 text-[10px]">+$1.80 / unit</span>
                  </div>
                </label>

                <label className="flex items-start sm:items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#1a1a24] border border-neutral-700 cursor-pointer hover:border-neutral-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={puffPrint}
                    onChange={(e) => setPuffPrint(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold leading-snug">High-Density 3D Puff Print / Embroidery</span>
                    <span className="text-neutral-400 text-[10px]">+$1.20 / unit</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="p-5 sm:p-8 rounded-3xl bg-[#181824] border border-neutral-700 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest block">
                  ESTIMATED FACTORY DIRECT QUOTE
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-neutral-700">
                    <span className="text-neutral-300 font-medium">Selected Product:</span>
                    <span className="text-white font-bold">{selectedCategory}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-neutral-700">
                    <span className="text-neutral-300 font-medium">Volume Discount:</span>
                    <span className="text-emerald-400 font-bold">{Math.round(volumeDiscount * 100)}% OFF</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-neutral-700">
                    <span className="text-neutral-300 font-medium">Est. Unit Price:</span>
                    <span className="text-xl sm:text-2xl font-display font-black text-white">${estimatedUnitPrice} <span className="text-xs font-mono font-normal text-neutral-300">/ unit</span></span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-neutral-200 font-bold uppercase">Estimated Bulk Total:</span>
                    <span className="text-lg sm:text-xl font-display font-black text-[#ff3333]">${estimatedTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <button
                  onClick={() => onNavigatePage("b2b-quote")}
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-102 text-center"
                >
                  <span>Lock In Quote & Order Sample</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] font-mono text-neutral-400 text-center uppercase font-bold">
                  * Final pricing confirmed upon Tech Pack review & size breakdown.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. TECH PACK & DESIGN FILE UPLOAD FORM                        */}
      {/* ============================================================== */}
      <section id="tech-pack-upload" className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-[#121219] border border-neutral-700 space-y-5 sm:space-y-6 shadow-2xl">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-[10px] sm:text-xs font-mono font-black text-[#ff4d4d] uppercase tracking-widest">
              CONFIDENTIAL CAD / VECTOR SUBMISSION
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
              SUBMIT YOUR TECH PACK OR SKETCH
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono max-w-md mx-auto">
              Protected by automatic B2B Non-Disclosure Agreement (NDA). Upload your AI, PDF, PSD, or PNG files.
            </p>
          </div>

          <form onSubmit={handleTechPackSubmit} className="space-y-4 sm:space-y-6">
            <AnimatePresence>
              {techPackSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Tech Pack received & encrypted under NDA. Our lead sample engineer will respond within 4 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="border-2 border-dashed border-neutral-700 hover:border-[#E21D1D] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#1a1a24] hover:bg-[#20202e]">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff4d4d] mb-2 sm:mb-3 animate-bounce" />
              <span className="text-xs sm:text-sm font-mono font-black text-white uppercase">
                {techPackFile ? `Selected: ${techPackFile.name}` : "DRAG & DROP TECH PACK (PDF, AI, PSD, ZIP, PNG)"}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-1 font-bold">
                Max file size: 50MB • All blueprints strictly protected under NDA
              </span>
              <input
                type="file"
                onChange={(e) => setTechPackFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="email"
                required
                placeholder="YOUR BRAND / BUYER EMAIL"
                value={brandEmail}
                onChange={(e) => setBrandEmail(e.target.value)}
                className="bg-[#1c1c28] border border-neutral-700 rounded-2xl px-4 py-3 sm:py-3.5 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
              />
              <input
                type="text"
                placeholder="ESTIMATED LAUNCH QUANTITY (e.g. 100 PCS)"
                className="bg-[#1c1c28] border border-neutral-700 rounded-2xl px-4 py-3 sm:py-3.5 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer hover:scale-101 text-center"
            >
              Submit Tech Pack for Formal Quotation
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
