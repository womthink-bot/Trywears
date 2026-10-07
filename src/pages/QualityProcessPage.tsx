import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Gauge,
  Microscope,
  FileCheck,
  ChevronRight,
  Shield,
  Download,
  Building,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Crosshair,
  FileText,
  Clock,
  Flame,
  Check,
  AlertCircle,
  Eye,
  Scan,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SportsB2BMarquee } from "../components/SportsB2BMarquee";

interface QualityProcessPageProps {
  onNavigatePage: (page: string) => void;
}

const QC_STAGES = [
  {
    step: "01",
    title: "Raw Material Tensile & Martindale Abrasion Ingestion",
    subtitle: "INGESTION LAB AUDIT",
    desc: "Every batch of raw cotton fleece, top-grain cowhide, and performance spandex undergoes automated tensile pull-load testing (ISO 13934) and 50,000-cycle Martindale friction tests before cutting.",
    tolerance: "99.8% Batch Tensile Consistency",
    labEquipment: "Instron Tensile Load Frame & Martindale Rub Tester",
    benchmark: "50,000 Cycles Zero-Pill",
    icon: Microscope,
    accent: "#E21D1D"
  },
  {
    step: "02",
    title: "CAD/CAM Laser Slicing & Computerized Graded Patterns",
    subtitle: "0.1MM CNC PRECISION",
    desc: "Lectra & Gerber multi-ply computerized knife cutters slice patterns across 50 layers with zero fabric skewing, ensuring identical grade tolerances from XS to 5XL.",
    tolerance: "± 0.1mm Geometric Cut Accuracy",
    labEquipment: "Lectra Vector Automated CNC Cutting Line",
    benchmark: "100% Vector Contour Match",
    icon: Cpu,
    accent: "#3B82F6"
  },
  {
    step: "03",
    title: "6-Thread Flatlock & Bonded Heavy-Duty Seaming",
    subtitle: "STRUCTURAL REINFORCEMENT",
    desc: "Specialized Yamato 6-thread flatlock machines assemble athletic wear with zero friction interior seams. Combat gloves are hand-closed with 4-ply bonded nylon thread tested to withstand 850 Newtons of lateral tension.",
    tolerance: "Zero-Burst Seam Integrity Under Max Load",
    labEquipment: "Yamato Multi-Thread Flatlockers & Adler Heavy Stitchers",
    benchmark: "850N Lateral Burst Load",
    icon: Layers,
    accent: "#F59E0B"
  },
  {
    step: "04",
    title: "Hydraulic Knuckle Shock Dispersion & Impact Lab",
    subtitle: "PNEUMATIC DROP TESTING",
    desc: "Boxing gloves and shin guards are placed under pneumatic drop hammers delivering 30 Joules of kinetic force to measure deceleration damping across multi-layer EVA and latex foam cores.",
    tolerance: "< 150G Peak Deceleration (CE Level 2 Compliant)",
    labEquipment: "Custom Pneumatic Impact Tower with Piezo Sensors",
    benchmark: "30-Joule Kinetic Damping",
    icon: Gauge,
    accent: "#10B981"
  },
  {
    step: "05",
    title: "210°C Italian Inks Sublimation & 100-Wash Colorfastness",
    subtitle: "MOLECULAR DYE BONDING",
    desc: "Sublimated sportswear is pressed at 210°C to molecularly gas-fuse Italian dye pigments into polyester fibers. Samples undergo 100 commercial high-temp wash tests with zero color bleed.",
    tolerance: "Grade 4.5+ Gray Scale Color Fastness (AATCC 61)",
    labEquipment: "Monti Antonio Vacuum Heat Press & Xenon Fade Chamber",
    benchmark: "100 High-Temp Industrial Washes",
    icon: Activity,
    accent: "#8B5CF6"
  },
  {
    step: "06",
    title: "100% Pre-Shipment Zero-Defect Final White-Glove Audit",
    subtitle: "AQL 1.0 CRITICAL INSPECTION",
    desc: "Every single finished garment and piece of gear is individually inspected for dimensional sizing, thread trimming, metal detector needle checks, and barcode retail packaging.",
    tolerance: "AQL 1.0 Standard (Zero Defect Dispatch Policy)",
    labEquipment: "Lock Inspection Conveyor Metal Detectors & Light Tables",
    benchmark: "100% Piece-by-Piece Verification",
    icon: FileCheck,
    accent: "#EC4899"
  }
];

const STRESS_TEST_METRICS = [
  {
    metric: "850 N",
    label: "SEAM BURST TENSILE LOAD",
    sub: "ISO 13934-1 High-Tension Strength",
    status: "PASS (99.8% Batch Accuracy)",
    progress: 98,
    color: "#ff4d4d"
  },
  {
    metric: "50,000+",
    label: "MARTINDALE ABRASION CYCLES",
    sub: "Zero Pilling on 550 GSM Terry & Poly",
    status: "PASS (Heavy Duty Commercial)",
    progress: 96,
    color: "#60a5fa"
  },
  {
    metric: "GRADE 4.5+",
    label: "GRAYSCALE COLORFASTNESS",
    sub: "AATCC 61 100-Wash Zero Fade",
    status: "PASS (Italian Molecular Dyes)",
    progress: 95,
    color: "#34d399"
  },
  {
    metric: "< 140 G",
    label: "KINETIC SHOCK DAMPING",
    sub: "CE Level 2 Drop Hammer Peak Deceleration",
    status: "PASS (Title Fight Safe)",
    progress: 92,
    color: "#fbbf24"
  }
];

const CERTIFICATIONS = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System Certified",
    authority: "Bureau Veritas International",
    desc: "Certified industrial manufacturing workflow, documented traceability, and continuous quality improvement loops."
  },
  {
    code: "CE MARKING LEVEL 2",
    title: "Personal Protective Combat Equipment",
    authority: "European Standards EN 13277",
    desc: "Certified protective performance, shock absorption, and anatomical ergonomic safety for combat fightwear."
  },
  {
    code: "OEKO-TEX STANDARD 100",
    title: "Harmful Substances & Skin Safety",
    authority: "Testex Zurich Laboratory",
    desc: "100% free of harmful formaldehyde, heavy metals, azo dyes, and carcinogenic compounds."
  },
  {
    code: "SEDEX SMETA 4-PILLAR",
    title: "Ethical Trade & Fair Working Conditions",
    authority: "Sedex Global Audit",
    desc: "Audited labor standards, health & safety, living wages, environmental ethics, and zero child labor."
  }
];

export const QualityProcessPage: React.FC<QualityProcessPageProps> = ({ onNavigatePage }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update SEO Title & Meta Description on mount
  useEffect(() => {
    document.title = "Industrial Quality Assurance & 6-Stage QC Protocol | TRYWEARS";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore TRYWEARS uncompromising 6-stage industrial quality assurance protocol: tensile stress testing, CNC pattern precision, pneumatic shock damping, and AQL 1.0 zero-defect standards."
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
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#E21D1D] selection:text-white pb-32 relative overflow-hidden">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND VIDEO ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/media/quality/videos/LeatherBG.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.4] contrast-125 scale-105 opacity-20"
        />

        {/* Dark Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/90 via-[#07070a]/80 to-[#07070a] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />

        {/* Blueprint Coordinate Grid */}
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
      <div className="border-b border-neutral-800 bg-[#0c0c12]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-300">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-200"
            >
              <Building className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>HOME</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-bold bg-red-500/20 px-2.5 py-0.5 rounded border border-red-500/40 text-red-400">
              QUALITY ASSURANCE & TESTING LAB
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AQL 1.0 ZERO-DEFECT STANDARD VERIFIED</span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4 text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISO 9001:2015 • CE LEVEL 2 • OEKO-TEX</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CINEMATIC HERO SECTION                                      */}
      {/* ============================================================== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-800">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E21D1D]/15 blur-[160px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Quality Protocol Introduction */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/20 border border-[#E21D1D]/50 text-[#ff4d4d] text-xs font-mono font-black tracking-widest uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>UNCOMPROMISING PRECISION STANDARDS</span>
              </div>
              <span className="text-xs font-mono font-bold text-neutral-300 tracking-wider">
                AQL 1.0 Zero-Defect • ISO 9001 Audited
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.08]">
              THE 6-STAGE INDUSTRIAL{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                QUALITY PROTOCOL.
              </span>
            </h1>

            <p className="text-neutral-100 font-sans text-base sm:text-lg leading-relaxed font-normal">
              Every garment, glove, and combat armor piece crafted at TRYWEARS is subject to rigorous laboratory stress analysis, pneumatic shock impact damping, and computerized CNC laser tolerances.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigatePage("sampling-policies")}
                className="px-7 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.5)] cursor-pointer hover:scale-105 flex items-center gap-2"
              >
                <span>Order Physical Sample for QC Testing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigatePage("customization")}
                className="px-7 py-4 rounded-xl bg-[#11111a] hover:bg-[#1a1a28] border border-neutral-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Customization Suite</span>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>
            </div>

            {/* Quick Tolerance Summary Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#0e0e18] border border-neutral-700">
                <span className="text-white font-black text-sm block">AQL 1.0</span>
                <span className="text-[10px] text-neutral-300 font-bold block uppercase mt-0.5">DISPATCH POLICY</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0e0e18] border border-neutral-700">
                <span className="text-emerald-400 font-black text-sm block">± 0.1MM</span>
                <span className="text-[10px] text-neutral-300 font-bold block uppercase mt-0.5">CNC ACCURACY</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0e0e18] border border-neutral-700">
                <span className="text-[#ff4d4d] font-black text-sm block">100% METAL SCAN</span>
                <span className="text-[10px] text-neutral-300 font-bold block uppercase mt-0.5">NEEDLE DETECTOR</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Video QC Inspection Reel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-neutral-700 bg-neutral-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] group">
              <div className="relative h-[460px] sm:h-[500px] w-full overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src="/media/quality/videos/qualityprocess1.webm"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-110 group-hover:scale-105 transition-transform duration-700"
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
                    className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-300" /> : <Volume2 className="w-4 h-4 text-[#E21D1D]" />}
                  </button>
                  <button
                    onClick={toggleVideoPlayback}
                    className="p-2 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                    title={isVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4 text-neutral-300" /> : <Play className="w-4 h-4 text-[#E21D1D]" />}
                  </button>
                </div>

                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-md">
                  <Scan className="w-3.5 h-3.5 text-[#E21D1D]" />
                  <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
                    LIVE TESTING LAB TELEMETRY
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="p-4 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-md space-y-1.5">
                    <span className="font-mono text-[10px] font-black text-[#ff4d4d] uppercase block">
                      LEATHER & COMPRESSION INTEGRITY
                    </span>
                    <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                      Drum-dyed hide thickness verification, multi-layer EVA foam core inspection, and seam pull strength telemetry.
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
      {/* 2. SIX STAGE INTERACTIVE QUALITY WORKFLOW                      */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-800 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-black text-[#ff4d4d] px-3.5 py-1 rounded-xl bg-red-500/20 border border-red-500/40 inline-block uppercase tracking-wider">
              STEP-BY-STEP MANUFACTURING AUDIT
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              INDUSTRIAL QUALITY ASSURANCE WORKFLOW
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-300 uppercase">
            CLICK ANY STAGE TO INSPECT LAB METRICS
          </span>
        </div>

        {/* Stage Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QC_STAGES.map((stg, idx) => {
            const isActive = activeStage === idx;
            const Icon = stg.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-[#181216] border-[#E21D1D] shadow-[0_0_25px_rgba(226,29,29,0.35)] scale-102"
                    : "bg-[#0e0e18] hover:bg-[#141422] border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-black ${isActive ? "text-[#ff4d4d]" : "text-neutral-300"}`}>
                    STAGE {stg.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#ff4d4d]" : "text-neutral-400"}`} />
                </div>
                <h4 className="text-xs font-display font-bold text-white uppercase line-clamp-2">
                  {stg.subtitle}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#0e0e18] border border-neutral-700 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-8 relative overflow-hidden"
          >
            {/* Ambient subtle glow */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-15"
              style={{ backgroundColor: QC_STAGES[activeStage].accent }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d4d] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>QC PROTOCOL STAGE {QC_STAGES[activeStage].step} OF 06</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {QC_STAGES[activeStage].title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-100 font-sans leading-relaxed font-normal">
                  {QC_STAGES[activeStage].desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-[#080810] border border-neutral-700 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase block">TOLERANCE THRESHOLD:</span>
                    <span className="text-xs font-mono font-black text-emerald-400">{QC_STAGES[activeStage].tolerance}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#080810] border border-neutral-700 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase block">LAB EQUIPMENT DEPLOYED:</span>
                    <span className="text-xs font-mono font-bold text-white">{QC_STAGES[activeStage].labEquipment}</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Certification Badge */}
              <div className="p-8 rounded-3xl bg-[#080810] border border-neutral-700 text-center space-y-4 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-[#E21D1D]/20 border border-[#E21D1D]/40 flex items-center justify-center text-[#ff4d4d] mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-display font-black text-white uppercase">
                  ZERO DEFECT CERTIFICATION
                </h4>
                <p className="text-[11px] font-mono text-neutral-300 leading-relaxed">
                  Passed units receive serialized batch tags & digital inspection logs before export dispatch.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase">
                    ✓ {QC_STAGES[activeStage].benchmark}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ============================================================== */}
      {/* 3. PHYSICAL MATERIAL STRESS TESTING LAB (HIGH CONTRAST & CRISP) */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-800 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-black text-[#ff4d4d] px-3.5 py-1 rounded-xl bg-red-500/20 border border-red-500/40 inline-block uppercase tracking-wider">
            EMPIRICAL LAB DATA
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            PHYSICAL STRESS & DURABILITY TESTING MATRIX
          </h2>
          <p className="text-sm text-neutral-200 font-sans max-w-2xl mx-auto leading-relaxed font-normal">
            Every material batch is tested in our climate-controlled lab against strict European & US athletic performance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STRESS_TEST_METRICS.map((st, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#0e0e18] border border-neutral-700 hover:border-neutral-500 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-4xl sm:text-5xl font-display font-black block tracking-tight" style={{ color: st.color }}>
                  {st.metric}
                </span>
                <h4 className="text-sm font-mono font-black text-white uppercase tracking-wide">
                  {st.label}
                </h4>
                <p className="text-xs font-mono text-neutral-200 font-medium">
                  {st.sub}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                <div className="w-full h-2 bg-[#080810] rounded-full overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${st.progress}%`, backgroundColor: st.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{st.status}</span>
                  <span className="text-white font-bold">{st.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. GLOBAL ACCREDITATIONS & CERTIFICATIONS (HIGH CONTRAST)       */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-neutral-800 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-black text-[#ff4d4d] px-3.5 py-1 rounded-xl bg-red-500/20 border border-red-500/40 inline-block uppercase tracking-wider">
            GLOBAL ACCREDITATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            CERTIFIED COMPLIANCE & SAFETY STANDARDS
          </h2>
          <p className="text-sm text-neutral-200 font-sans max-w-2xl mx-auto leading-relaxed">
            International regulatory compliances and verified third-party laboratory accreditations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#0e0e18] border border-neutral-700 hover:border-red-500/50 shadow-xl transition-all space-y-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono font-black text-white px-3.5 py-1.5 rounded-xl bg-[#E21D1D]/20 border border-[#E21D1D]/50">
                  {cert.code}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-300 uppercase">
                  {cert.authority}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                {cert.title}
              </h4>

              <p className="text-sm text-neutral-100 font-sans leading-relaxed font-normal">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. REQUEST SGS / TÜV LAB REPORTS CTA (HIGH CONTRAST)            */}
      {/* ============================================================== */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/70 via-[#12121e] to-black border border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              NEED CUSTOM LAB TEST CERTIFICATES FOR YOUR BRAND?
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              REQUEST SGS / TÜV LAB REPORTS
            </h3>
            <p className="text-sm text-neutral-100 font-sans leading-relaxed font-normal">
              We provide formal lab certificates for tensile pull load, colorfastness, and impact damping with your brand name.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("sampling-policies")}
            className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] cursor-pointer shrink-0 hover:scale-105"
          >
            Order Certified Pre-Production Sample
          </button>
        </div>
      </section>

    </div>
  );
};
