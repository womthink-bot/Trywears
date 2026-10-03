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
  MessageSquare
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

const PRINT_TECHNIQUES = [
  {
    title: "3D High-Density Silicone Puff",
    elevation: "Up to 4.0mm Raised Profile",
    durability: "100+ Industrial Washes",
    desc: "Engineered high-relief puff printing with ultra-crisp edges. Does not crack or deflate over time.",
    icon: "🔥"
  },
  {
    title: "Japanese Precision Chainstitch & Chenille",
    elevation: "Artisan Textured Finish",
    durability: "Lifetime Structural Seam",
    desc: "Tajima computer embroidery heads crafting vintage varsity patches, gold metallic crests, and thick chenille lettering.",
    icon: "🧵"
  },
  {
    title: "Italian Digital Sublimation Infusion",
    elevation: "Zero-Hand Breathable Ink",
    durability: "Permanent Molecular Bond",
    desc: "Direct-to-fabric gas infusion with PMS Pantone accuracy. 100% breathable through mesh pores.",
    icon: "🎨"
  },
  {
    title: "Hot-Foil Stamping & Deep Leather Debossing",
    elevation: "Metallic & Relief Ingot",
    durability: "Permanent Leather Finish",
    desc: "Hydraulic heated steel dies stamping 24K gold foil or deep debossed emblems into boxing glove cuffs.",
    icon: "⚡"
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
    document.title = "Custom Apparel Manufacturing & Private Label Atelier | TRYWEARS";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Full-service OEM/ODM custom apparel manufacturing in Sialkot, Pakistan. 3D virtual sampling, 500 GSM heavyweight fabrics, Italian sublimation, 3D puff print, and low MOQ 25 pcs."
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
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E21D1D] selection:text-white pb-32 relative overflow-hidden">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND VIDEO ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/videos/streetwearsBG.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.45] contrast-125 scale-105 opacity-30"
        />

        {/* Dark Vignettes for pristine text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#070709]/85 to-[#070709] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E21D1D]/15 via-transparent to-transparent pointer-events-none" />

        {/* Scanning Laser Beam */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E21D1D]/40 to-transparent pointer-events-none"
        />

        {/* Coordinate Grid */}
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
            <span className="text-[#E21D1D] font-bold">CUSTOMIZATION ATELIER</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-neutral-400">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider font-bold text-neutral-300">
                CUSTOM CAD SAMPLING: 7-DAY DISPATCH
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>LOW MOQ 25 PCS • FULL PRIVATE LABEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CINEMATIC HERO SECTION                                      */}
      {/* ============================================================== */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E21D1D]/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Atelier Copy & Action CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/15 border border-[#E21D1D]/40 text-[#E21D1D] text-xs font-mono font-black tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OEM / ODM PRIVATE LABEL BESPOKE ATELIER</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 tracking-wider">
                Sialkot, Pakistan • Low MOQ 25 Pcs
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.08]">
              FULL-SERVICE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                CUSTOMIZATION ATELIER.
              </span>
            </h1>

            <p className="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
              From technical cut & sew patterns and 550 GSM French Terry to custom engraved hardware, embossed leather crests, and barcoded retail packaging — build your exact brand vision with zero limitations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#b2b-calculator"
                className="px-6 py-3.5 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-105 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Instant B2B Cost Calculator</span>
              </a>
              <a
                href="#tech-pack-upload"
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#E21D1D]" />
                <span>Submit Tech Pack Under NDA</span>
              </a>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-900 font-mono text-xs">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-white font-bold block">LOW MOQ 25</span>
                <span className="text-[10px] text-neutral-400 block uppercase">PER STYLE / COLOR</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-[#E21D1D] font-bold block">7-10 DAYS</span>
                <span className="text-[10px] text-neutral-400 block uppercase">EXPRESS SAMPLING</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <span className="text-emerald-400 font-bold block">DDP WORLDWIDE</span>
                <span className="text-[10px] text-neutral-400 block uppercase">AIR COURIER</span>
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
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group">
              <div className="relative h-[460px] sm:h-[500px] w-full overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/videos/streetwearsGP.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-110 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Scanning Laser Beam */}
                <motion.div
                  animate={{ y: [0, 460, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
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

                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-md">
                  <Scissors className="w-3.5 h-3.5 text-[#E21D1D]" />
                  <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
                    CUT & SEW CRAFT
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="p-4 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md space-y-1.5">
                    <span className="font-mono text-[10px] font-black text-[#E21D1D] uppercase block">
                      CAD VIRTUAL PATTERN ENGINEERING
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Custom 2D/3D graded tech packs, millimeter-accurate grading, and automated CNC fabric cutters.
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
      {/* 2. INTERACTIVE 3D PROTOTYPING LAB                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
            INTERACTIVE COLORWAY & TEXTURE SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            3D DIGITAL PROTOTYPING LAB
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-xl mx-auto uppercase">
            Test custom colorways, metallic accents, and private label trims before placing your physical production run.
          </p>
        </div>

        {customizerProduct ? (
          <div className="rounded-3xl bg-neutral-950/80 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
            <TShirtCustomizer product={customizerProduct} onAddToCart={onAddToCart} />
          </div>
        ) : null}
      </section>

      {/* ============================================================== */}
      {/* 3. MATERIAL & TECHNICAL FABRIC MATRIX                         */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
              CERTIFIED SOURCING & IN-HOUSE MILLS
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              PREMIUM TECHNICAL FABRIC & MATERIAL MATRIX
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-500 uppercase">
            ALL FABRICS OEKO-TEX & LAB TESTED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FABRIC_MATERIALS.map((mat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    {mat.category}
                  </span>
                  <span 
                    className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase border"
                    style={{
                      backgroundColor: `${mat.accent}15`,
                      color: mat.accent,
                      borderColor: `${mat.accent}30`
                    }}
                  >
                    {mat.badge}
                  </span>
                </div>

                <h4 className="text-lg font-display font-black text-white uppercase">
                  {mat.name}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {mat.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-900 text-xs font-mono">
                <div className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block text-[10px]">MINIMUM ORDER:</span>
                  <span className="text-white font-bold">{mat.moq}</span>
                </div>
                <div className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block text-[10px]">SAMPLE TIME:</span>
                  <span className="text-emerald-400 font-bold">{mat.leadTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EMBELLISHMENT & PRINTING TECHNOLOGIES                       */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
            ADVANCED FINISHING & BRANDING
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            INDUSTRIAL EMBELLISHMENT & PRINTING METHODS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINT_TECHNIQUES.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#E21D1D]">
                  <span>METHOD #{idx + 1}</span>
                  <span className="text-lg">{pt.icon}</span>
                </div>

                <h4 className="text-sm font-display font-black text-white uppercase">
                  {pt.title}
                </h4>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 space-y-1 text-[11px] font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Profile:</span>
                  <span className="text-white">{pt.elevation}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Wash Life:</span>
                  <span className="text-emerald-400">{pt.durability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PRIVATE LABEL TRIMS & PACKAGING                             */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
            100% PRIVATE LABEL READY
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            BRANDING TRIMS & RETAIL PACKAGING
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRIVATE_LABEL_TRIMS.map((trim, idx) => {
            const IconComp = trim.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#E21D1D]/15 border border-[#E21D1D]/40 text-[#E21D1D] flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-display font-black text-white uppercase">
                  {trim.title}
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {trim.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. INTERACTIVE B2B PRICE & MOQ CALCULATOR                      */}
      {/* ============================================================== */}
      <section id="b2b-calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-900">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-8">
          
          <div className="border-b border-neutral-800 pb-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
              REAL-TIME PRODUCTION ESTIMATOR
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              INSTANT B2B BULK COST CALCULATOR
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Adjust quantity and specifications for estimated factory direct unit pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
                  Product Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D] cursor-pointer"
                >
                  <option>Streetwear & Hoodies</option>
                  <option>Combat Gloves & Shin Guards</option>
                  <option>Sublimated Team Sports Kits</option>
                  <option>Gym Fitness Compression Sets</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-300 font-bold uppercase">Order Quantity:</span>
                  <span className="text-[#E21D1D] font-black">{quantity} Units</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={1000}
                  step={25}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#E21D1D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>MOQ 25</span>
                  <span>100 Units</span>
                  <span>500 Units</span>
                  <span>1000+ Units</span>
                </div>
              </div>

              {/* Custom Addons Checkboxes */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase block">
                  Private Label Extras
                </span>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={customPackaging}
                    onChange={(e) => setCustomPackaging(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold">Custom Frosted Polybags & Barcode Hangtags</span>
                    <span className="text-neutral-500 text-[10px]">+$1.50 / unit</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={customHardware}
                    onChange={(e) => setCustomHardware(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold">Custom Engraved Gunmetal Aglets & YKK Zippers</span>
                    <span className="text-neutral-500 text-[10px]">+$1.80 / unit</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                  <input
                    type="checkbox"
                    checked={puffPrint}
                    onChange={(e) => setPuffPrint(e.target.checked)}
                    className="accent-[#E21D1D] w-4 h-4 cursor-pointer"
                  />
                  <div className="text-xs font-mono">
                    <span className="text-white block font-bold">High-Density 3D Puff Print / Embroidery</span>
                    <span className="text-neutral-500 text-[10px]">+$1.20 / unit</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                  ESTIMATED FACTORY DIRECT QUOTE
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-neutral-800">
                    <span className="text-neutral-400">Selected Product:</span>
                    <span className="text-white font-bold">{selectedCategory}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-neutral-800">
                    <span className="text-neutral-400">Volume Discount:</span>
                    <span className="text-emerald-400 font-bold">{Math.round(volumeDiscount * 100)}% OFF</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-neutral-800">
                    <span className="text-neutral-400">Est. Unit Price:</span>
                    <span className="text-2xl font-display font-black text-white">${estimatedUnitPrice} <span className="text-xs font-mono font-normal text-neutral-400">/ unit</span></span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-neutral-300 font-bold uppercase">Estimated Bulk Total:</span>
                    <span className="text-xl font-display font-black text-[#E21D1D]">${estimatedTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigatePage("sampling-policies")}
                  className="w-full py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-102"
                >
                  <span>Lock In Quote & Order Sample</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] font-mono text-neutral-500 text-center uppercase">
                  * Final pricing confirmed upon Tech Pack review & size breakdown.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TECH PACK & DESIGN FILE UPLOAD FORM                         */}
      {/* ============================================================== */}
      <section id="tech-pack-upload" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
              CONFIDENTIAL CAD / VECTOR SUBMISSION
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              SUBMIT YOUR TECH PACK OR SKETCH
            </h3>
            <p className="text-xs text-neutral-400 font-mono max-w-md mx-auto">
              Protected by automatic B2B Non-Disclosure Agreement (NDA). Upload your AI, PDF, PSD, or PNG files.
            </p>
          </div>

          <form onSubmit={handleTechPackSubmit} className="space-y-6">
            <AnimatePresence>
              {techPackSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Tech Pack received & encrypted under NDA. Our lead sample engineer will respond within 4 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="border-2 border-dashed border-neutral-800 hover:border-[#E21D1D] rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-neutral-900/40 hover:bg-neutral-900/70">
              <Upload className="w-10 h-10 text-[#E21D1D] mb-3 animate-bounce" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                {techPackFile ? `Selected: ${techPackFile.name}` : "DRAG & DROP TECH PACK (PDF, AI, PSD, ZIP, PNG)"}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 mt-1">
                Max file size: 50MB • All blueprints strictly protected under NDA
              </span>
              <input
                type="file"
                onChange={(e) => setTechPackFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                required
                placeholder="YOUR BRAND / BUYER EMAIL"
                value={brandEmail}
                onChange={(e) => setBrandEmail(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3.5 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
              />
              <input
                type="text"
                placeholder="ESTIMATED LAUNCH QUANTITY (e.g. 200 PCS)"
                className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3.5 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer hover:scale-101"
            >
              Submit Tech Pack for Formal Quotation
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
