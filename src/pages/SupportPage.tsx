import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  FileCheck, 
  Scale, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Building,
  ChevronRight,
  Zap,
  Globe2,
  Lock,
  Box,
  BadgeCheck,
  FileCode2,
  FileText,
  Navigation,
  Check,
  Layers,
  AlertCircle,
  Award,
  Sparkle,
  Cpu,
  Eye,
  Sliders,
  CheckCheck,
  Plane,
  Anchor,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SocialLinks } from "../components/SocialLinks";
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from "../components/WhatsAppChatWidget";

interface PageProps {
  onNavigatePage: (page: string) => void;
}

export const SupportPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#E21D1D] selection:text-white pb-32 relative overflow-hidden">
      
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <div className="border-b border-neutral-800 bg-[#0c0c12] sticky top-0 z-40">
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
            <span className="text-white font-bold bg-[#d946ef]/20 px-2.5 py-0.5 rounded border border-[#d946ef]/40 text-[#f0abfc]">
              SUPPORT & POLICIES HUB
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 CLIENT ASSURANCE & DEDICATED DESK</span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER WITH AMBIENT GLOW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-6 relative">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#d946ef]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/50 text-[#f0abfc] text-xs font-mono font-bold tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CLIENT ASSURANCE, POLICIES & LOGISTICS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              CLIENT SUPPORT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-white to-red-400">POLICIES HUB</span>
            </h1>
            <p className="text-neutral-100 text-base sm:text-lg font-sans leading-relaxed">
              Transparent trade policies, rapid UK DDP shipping protocols, low minimum order quantities, and factory quality warranties. Everything you need for a seamless and risk-free manufacturing partnership.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("b2b-quote")}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.5)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>CONTACT 24/7 SUPPORT DESK</span>
          </button>
        </div>

        {/* Quick Filter Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none font-mono text-xs">
          {[
            { id: "all", label: "All Policies (5)" },
            { id: "shipping", label: "01. Shipping & DDP" },
            { id: "warranty", label: "02. Quality Warranty" },
            { id: "legal", label: "03. Terms & NDA" },
            { id: "moq", label: "04. MOQ & Lead Time (+)" },
            { id: "workflow", label: "05. Order Process" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all uppercase whitespace-nowrap cursor-pointer font-bold ${
                activeFilter === tab.id
                  ? "bg-[#d946ef] text-white shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-102"
                  : "bg-[#11111a] hover:bg-[#1a1a28] text-neutral-300 border border-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DISTINCT BESPOKE SUPPORT SECTIONS (DENSE, BALANCED, ZERO EMPTY SPACE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ============================================================== */}
        {/* PILLAR 01: SHIPPING & UK DDP - LOGISTICS RADAR & TRANSIT SPLIT */}
        {/* ============================================================== */}
        {(activeFilter === "all" || activeFilter === "shipping") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#090e18] border border-neutral-700 hover:border-[#38bdf8] transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left: Video with Live Global Airway HUD */}
              <div className="lg:col-span-5 relative bg-black min-h-[420px] lg:min-h-full overflow-hidden group">
                <video
                  src="/media/support/videos/shipping_policy_SQ1.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e18] via-transparent to-black/40" />

                {/* Radar Sweep Animation */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-sky-500/40 backdrop-blur-md">
                  <Navigation className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    GLOBAL AIRWAY DISPATCH ACTIVE
                  </span>
                </div>

                {/* Floating Logistics Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-sky-500/30 backdrop-blur-md space-y-2 font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between text-sky-400 font-bold text-[10px]">
                    <span>DELIVERED DUTY PAID (DDP)</span>
                    <span>DOOR-TO-DOOR UK</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
                    <div className="bg-sky-500/10 p-1.5 rounded-lg border border-sky-500/20">
                      <span className="text-[8px] text-neutral-400 uppercase block">Express Air</span>
                      <span className="text-white font-bold text-xs">3-5 Days</span>
                    </div>
                    <div className="bg-sky-500/10 p-1.5 rounded-lg border border-sky-500/20">
                      <span className="text-[8px] text-neutral-400 uppercase block">UK Import Tax</span>
                      <span className="text-emerald-400 font-bold text-xs">0% Hidden</span>
                    </div>
                    <div className="bg-sky-500/10 p-1.5 rounded-lg border border-sky-500/20">
                      <span className="text-[8px] text-neutral-400 uppercase block">Carton Spec</span>
                      <span className="text-white font-bold text-xs">7-Ply Double</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Technical Freight Channels & Route Details - Dense & Filled */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between bg-[#090e18]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-black text-sky-400 px-3.5 py-1 rounded-xl bg-sky-500/20 border border-sky-500/40">
                        PILLAR 01 • LOGISTICS & SHIPPING
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        DUTY PAID (DDP)
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigatePage("shipping-policy")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>View Dedicated Page</span>
                      <ChevronRight className="w-4 h-4 text-sky-400" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      Shipping Policy & UK DDP Logistics
                    </h2>
                    <p className="text-xs sm:text-sm font-mono font-bold text-sky-400 uppercase tracking-wider mt-1">
                      DHL / FedEx Priority Express (3-5 Days) & Consolidated Air/Ocean Freight
                    </p>
                  </div>

                  <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                    Comprehensive, transparent international B2B export logistics. We offer Delivered Duty Paid (DDP) door-to-door shipping to London, Manchester, Birmingham, Leeds, Glasgow, and worldwide. Zero unexpected import tariffs or customs clearance headaches.
                  </p>

                  {/* 3 Tier Freight Mode Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono">
                    <div className="p-3 rounded-xl bg-[#060910] border border-sky-500/20">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <Plane className="w-3.5 h-3.5" />
                        <span className="font-bold text-xs">Priority Air</span>
                      </div>
                      <span className="text-white text-sm font-black block mt-1">3 - 5 Days</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">DHL Doorstep Delivery</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#060910] border border-sky-500/20">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <Truck className="w-3.5 h-3.5" />
                        <span className="font-bold text-xs">Air Cargo</span>
                      </div>
                      <span className="text-white text-sm font-black block mt-1">7 - 10 Days</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">Consolidated Bulk Freight</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#060910] border border-sky-500/20">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <Anchor className="w-3.5 h-3.5" />
                        <span className="font-bold text-xs">Sea Container</span>
                      </div>
                      <span className="text-white text-sm font-black block mt-1">22 - 28 Days</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">LCL / FCL High-Volume</span>
                    </div>
                  </div>

                  {/* Comprehensive UK Airport & DDP Routing Table (Fills space seamlessly) */}
                  <div className="p-4 rounded-2xl bg-[#050810] border border-neutral-800 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-sky-300 font-bold border-b border-neutral-800 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Globe2 className="w-4 h-4 text-sky-400" />
                        <span>UK DDP CLEARANCE & AIRPORT LOGISTICS STANDARDS</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        100% TAX PAID
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-neutral-300 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">▪</span>
                        <span><strong>Zero UK VAT Burden:</strong> All import duties, VAT declarations & EORI documents are pre-settled by TRYWEARS.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">▪</span>
                        <span><strong>Direct Airport Hubs:</strong> Direct cargo routing into London Heathrow (LHR), Manchester (MAN), and East Midlands (EMA).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">▪</span>
                        <span><strong>Heavy-Duty Packaging:</strong> 7-ply double-wall export corrugated boxes with individual moisture-barrier silica bags.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold">▪</span>
                        <span><strong>Live Tracking Link:</strong> Instant master Air Waybill (AWB) tracking link emailed as soon as cargo departs the runway.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3.5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigatePage("shipping-policy")}
                    className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105"
                  >
                    <span>View Full Shipping Policy & Rates</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-neutral-400">All shipments fully insured up to commercial value</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 02: RETURN & REFUND - REVERSED AQL 1.0 INSPECTION CARD  */}
        {/* ============================================================== */}
        {(activeFilter === "all" || activeFilter === "warranty") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#140c10] border border-neutral-700 hover:border-emerald-500 transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left: Quality Warranty Content (Reversed Layout) - Dense & Filled */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between bg-[#140c10] order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-black text-emerald-400 px-3.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                        PILLAR 02 • QUALITY WARRANTY
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                        AQL 1.0 STANDARD
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigatePage("return-refund-policy")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>View Dedicated Page</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      Return and Refund Policy & Quality Warranty
                    </h2>
                    <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mt-1">
                      Pre-Production Approval Guarantee & 100% Defect Remanufacture
                    </p>
                  </div>

                  <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                    Because all garments and fight gear are custom-made to your exact brand specifications, our policy operates on upfront prototype sign-off and strict AQL 1.0 manufacturing standards. Any verified stitching defect or dimensional deviation beyond ±0.5 cm is replaced or credited immediately.
                  </p>

                  {/* 4 Pillars of Buyer Protection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center">
                    <div className="p-3 rounded-xl bg-[#090507] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">QC Standard</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">AQL 1.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090507] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Tolerance</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">±0.5 cm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090507] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Claim Window</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">14 Days</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090507] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Remake Cost</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">100% Free</span>
                    </div>
                  </div>

                  {/* Rich 6-Point Quality Assurance Audit Table (Fills space perfectly) */}
                  <div className="p-4 rounded-2xl bg-[#0a0507] border border-neutral-800 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-neutral-800 pb-2">
                      <span className="flex items-center gap-1.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span>ZERO-DEFECT BUYER ASSURANCE & REPLACEMENT GUARANTEE</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        100% COVERED
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-neutral-300 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Physical PPS Approval:</strong> Bulk production starts solely after you physically inspect, test & sign off the sample.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Stitch & Seam Stress Test:</strong> Multi-needle flatlock seams pull-tested up to 45 lbs of pressure without distortion.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Needle Detector Scan:</strong> 100% metal-free garment pass through conveyor scanner to ensure complete safety.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Free Defect Replacement:</strong> Any stitching flaw or print defect is remanufactured and air-shipped at our expense.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3.5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigatePage("return-refund-policy")}
                    className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105"
                  >
                    <span>View Full Return & Warranty Terms</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-neutral-400">14-day claim window upon doorstep delivery</span>
                </div>
              </div>

              {/* Right: Video Chamber with Quality Assurance HUD */}
              <div className="lg:col-span-5 relative bg-black min-h-[420px] lg:min-h-full overflow-hidden group order-1 lg:order-2">
                <video
                  src="/media/support/videos/return_refund_policy_SQ2.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140c10] via-transparent to-black/40" />

                <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-emerald-500/40 backdrop-blur-md">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    AQL 1.0 QUALITY INSPECTION
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 03: TERMS & NDA - FULL-WIDTH SECURITY VAULT BANNER      */}
        {/* ============================================================== */}
        {(activeFilter === "all" || activeFilter === "legal") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-b from-[#131109] to-[#0a0907] border border-neutral-700 hover:border-amber-500 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              
              {/* Left Narrative & Legal Protection Matrix - Dense & Filled */}
              <div className="space-y-5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-black text-amber-400 px-3.5 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40">
                    PILLAR 03 • IP SECURITY & NDA
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    100% CLIENT OWNERSHIP
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
                    Terms and Conditions & IP Protection
                  </h2>
                  <p className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wider mt-1">
                    Commercial Supply Agreement & Client Intellectual Property Protection
                  </p>
                </div>

                <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                  Your unique designs, logos, patterns, and tech packs remain 100% your exclusive intellectual property. We operate under strict legally binding Non-Disclosure Agreements (NDAs). Standard production operates on a secure 50% deposit and 50% pre-shipment sign-off structure.
                </p>

                {/* NDA Protection Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">Mutual NDA Signed</span>
                      <span className="text-[10px] text-neutral-300 block">Patterns & CADs protected legally</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 flex items-start gap-2.5">
                    <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-bold block">50/50 Milestone Escrow</span>
                      <span className="text-[10px] text-neutral-300 block">Balance paid after 4K video approval</span>
                    </div>
                  </div>
                </div>

                {/* Additional Commercial Security Details */}
                <div className="p-4 rounded-2xl bg-black/70 border border-neutral-800 space-y-2 font-mono text-xs text-neutral-300">
                  <div className="flex items-center justify-between text-amber-300 font-bold border-b border-neutral-800 pb-1.5">
                    <span>IP CONFIDENTIALITY & ESCROW ASSURANCES</span>
                    <span className="text-[10px] text-emerald-400">LEGAL BINDING</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▪</span>
                      <span><strong>No Public Display:</strong> Your bespoke designs are never shared with 3rd parties without explicit consent.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">▪</span>
                      <span><strong>Fixed Price Guarantee:</strong> Guaranteed unit quotation in GBP (£) locked on Proforma Invoice.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigatePage("terms-and-conditions")}
                    className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Complete Terms & Agreement</span>
                  </button>
                </div>
              </div>

              {/* Right: Video Frame with Security Tag */}
              <div className="w-full lg:w-[460px] h-[380px] rounded-3xl overflow-hidden bg-black border border-neutral-700 relative group shadow-2xl">
                <video
                  src="/media/support/videos/terms_conditions_SQ3.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-amber-500/30 backdrop-blur-md flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">IP Security</span>
                    <span className="text-xs font-bold text-white block">Exclusive Brand Confidentiality</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    Protected
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 04: MOQ & LEAD TIME - SPEEDWAY TIERS & MATRIX           */}
        {/* ============================================================== */}
        {(activeFilter === "all" || activeFilter === "moq") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#0c120e] border border-neutral-700 hover:border-[#10b981] transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left: Video with Speedometer HUD */}
              <div className="lg:col-span-5 relative bg-black min-h-[420px] lg:min-h-full overflow-hidden group">
                <video
                  src="/media/support/videos/moq_lead_time_SQ4.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e] via-transparent to-black/40" />

                <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-emerald-500/40 backdrop-blur-md">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "8s" }} />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    LOW MOQ & FAST PRODUCTION
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-emerald-500/30 backdrop-blur-md space-y-1 text-center font-mono shadow-2xl">
                  <span className="text-xs font-black text-emerald-400 uppercase block">
                    EMERGENCY 10-DAY RUSH LANE AVAILABLE
                  </span>
                  <span className="text-[10px] text-neutral-300 block">
                    Expedited turnaround slots for verified UK drops & deadlines
                  </span>
                </div>
              </div>

              {/* Right: Tiered MOQ Matrix & Capacity Breakdown - Dense & Filled */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between bg-[#0c120e]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-black text-emerald-400 px-3.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                        PILLAR 04 • MOQ & LEAD TIMES
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        LOW MOQ 30 PCS
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigatePage("moq-lead-time")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>View Dedicated Page</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      MOQ and Lead Time Matrix (+)
                    </h2>
                    <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mt-1">
                      Fast 7-10 Day Sampling, 14-21 Day Bulk & Emergency Rush Priority Lanes
                    </p>
                  </div>

                  <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                    Designed to empower emerging British streetwear founders and growing sports labels to launch without excess deadstock risk. Low minimum order quantities starting from just 30 units per design, with transparent timelines and emergency 10-day rush manufacturing options.
                  </p>

                  {/* 3 Tier Volume Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-center">
                    <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Startup Drop</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">30 - 100 Pcs</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">Zero deadstock risk</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Scale Run</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">250 - 500 Pcs</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">Save ~24% unit cost</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20">
                      <span className="text-white font-bold text-xs block">Enterprise Bulk</span>
                      <span className="text-emerald-400 font-black text-sm block mt-0.5">1,000+ Units</span>
                      <span className="text-[10px] text-neutral-300 block mt-0.5">Industrial container tier</span>
                    </div>
                  </div>

                  {/* Turnaround & Production Capacity Details Table */}
                  <div className="p-4 rounded-2xl bg-[#060c08] border border-neutral-800 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-neutral-800 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>PRODUCTION CAPACITY & EMERGENCY TURNAROUND MATRIX</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        GUARANTEED
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-neutral-300 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Sampling PPS (7-10 Days):</strong> Physical pre-production sample dispatched with custom trimmings & branding.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Bulk Production (14-21 Days):</strong> Complete industrial cut, sew, print, wash & individual retail polybagging.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Emergency 10-Day Rush Slot:</strong> Express manufacturing line for urgent UK fashion events & brand launches.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">▪</span>
                        <span><strong>Monthly Plant Output:</strong> 60,000+ pcs monthly industrial capacity across 4 manufacturing divisions.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3.5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigatePage("moq-lead-time")}
                    className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105"
                  >
                    <span>Explore Interactive MOQ Matrix (+)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-neutral-400">Emergency 10-day priority lines upon request</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* PILLAR 05: ORDER PROCESS - REVERSED 6-STEP WORKFLOW CHAMBER    */}
        {/* ============================================================== */}
        {(activeFilter === "all" || activeFilter === "workflow") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#120a16] border border-neutral-700 hover:border-[#d946ef] transition-all duration-300 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Left: 6-Step Workflow Narrative (Reversed Layout) - Dense & Filled */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-between bg-[#120a16] order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-black text-[#d946ef] px-3.5 py-1 rounded-xl bg-[#d946ef]/20 border border-[#d946ef]/40">
                        PILLAR 05 • ORDER WORKFLOW
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        6-STEP JOURNEY
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigatePage("order-process")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>View Dedicated Page</span>
                      <ChevronRight className="w-4 h-4 text-[#d946ef]" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                      Order Process & 6-Step Client Journey
                    </h2>
                    <p className="text-xs sm:text-sm font-mono font-bold text-[#f0abfc] uppercase tracking-wider mt-1">
                      From First Tech Pack to Direct Doorstep UK Delivery
                    </p>
                  </div>

                  <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                    A clear, structured 6-step manufacturing workflow: 1. Inquiry & Free Tech Pack Review, 2. 3D Digital CAD Approval, 3. Physical Pre-Production Sample, 4. Bulk Cut & Sew Production, 5. 100% QA Inspection & 4K Video Sign-Off, and 6. Express DDP Delivery.
                  </p>

                  {/* 6 Step Progress Flow */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">01. Free Tech Review</span>
                      <span className="text-white text-xs font-medium block">Quote in 24h</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">02. 3D CAD Mockup</span>
                      <span className="text-white text-xs font-medium block">Pantone Match</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">03. PPS Prototype</span>
                      <span className="text-white text-xs font-medium block">7-10 Days DHL</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">04. Bulk Production</span>
                      <span className="text-white text-xs font-medium block">Cut, Sew & Print</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">05. 4K Video QC</span>
                      <span className="text-white text-xs font-medium block">Balance Sign-off</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#09060b] border border-fuchsia-500/20">
                      <span className="text-[#f0abfc] font-bold block text-[10px]">06. DDP Delivery</span>
                      <span className="text-white text-xs font-medium block">UK Doorstep</span>
                    </div>
                  </div>

                  {/* Detailed Stage Execution Protocol (Fills space seamlessly) */}
                  <div className="p-4 rounded-2xl bg-[#0a050d] border border-neutral-800 space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[#f0abfc] font-bold border-b border-neutral-800 pb-2">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#d946ef]" />
                        <span>STRUCTURED END-TO-END FACTORY EXECUTION</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        TRANSPARENT
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-neutral-300 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="text-[#d946ef] font-bold">▪</span>
                        <span><strong>Fast-Response Desk:</strong> Dedicated senior merchandiser allocated on WhatsApp & Email within 2 hours.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#d946ef] font-bold">▪</span>
                        <span><strong>100% Sample Fee Credit:</strong> Initial prototype sampling cost deducted in full from bulk order balance.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#d946ef] font-bold">▪</span>
                        <span><strong>4K Video Sign-Off:</strong> HD close-up video of bulk garments sent before you release the final balance payment.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#d946ef] font-bold">▪</span>
                        <span><strong>Consolidated Doorstep Delivery:</strong> Customs cleared DDP air shipping delivered right into your warehouse or boutique.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3.5 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigatePage("order-process")}
                    className="px-6 py-3.5 rounded-xl bg-[#d946ef] hover:bg-fuchsia-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-105"
                  >
                    <span>View 6-Step Order Workflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-neutral-400">100% sample fee credited upon bulk placement</span>
                </div>
              </div>

              {/* Right: Video Chamber with 6-Step Stepper HUD */}
              <div className="lg:col-span-5 relative bg-black min-h-[420px] lg:min-h-full overflow-hidden group order-1 lg:order-2">
                <video
                  src="/media/support/videos/order_process_SQ5.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a16] via-transparent to-black/40" />

                <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-fuchsia-500/40 backdrop-blur-md">
                  <Layers className="w-3.5 h-3.5 text-[#d946ef]" />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    6-STAGE CLIENT JOURNEY
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>

      {/* 4. DIRECT CONTACT HELPLINE BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f0f18] border border-neutral-700 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold text-[#d946ef] uppercase tracking-widest block">
              DIRECT FACTORY COMMUNICATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              NEED IMMEDIATE ASSISTANCE OR ORDER TRACKING?
            </h3>
            <p className="text-neutral-100 text-sm font-sans leading-relaxed font-normal">
              Our dedicated client merchandisers operate 24/7 on WhatsApp, Email, Phone, and all official social networks to assist you with tech pack evaluations, shipping status, customs documentation, and commercial invoices.
            </p>

            {/* Official 7 Social Networks Grid */}
            <div className="pt-2">
              <span className="text-xs font-mono font-bold text-neutral-300 uppercase block mb-2">
                Connect on Official Channels (7 Networks):
              </span>
              <SocialLinks variant="footer" />
            </div>
          </div>

          <div className="bg-[#090910] p-6 rounded-2xl border border-neutral-700 space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <Mail className="w-4 h-4 text-[#ff4d4d] shrink-0" />
              <span className="text-white font-bold">export@trywears.com</span>
            </div>
            <a 
              href={getWhatsAppUrl("Hello TRYWEARS, I need support regarding my order / inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 pb-2 border-b border-neutral-800 group hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-white font-bold group-hover:text-emerald-400">{WHATSAPP_DISPLAY} (WhatsApp 24/7)</span>
            </a>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#d946ef] shrink-0" />
              <span className="text-neutral-200">Sialkot Industrial Zone, Pakistan</span>
            </div>
            
            <a
              href={getWhatsAppUrl("Hello TRYWEARS, I would like to start a live inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-mono text-xs font-black uppercase text-center transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>LIVE WHATSAPP CHAT</span>
            </a>

            <button
              onClick={() => onNavigatePage("b2b-quote")}
              className="w-full py-2.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase text-center transition-all shadow-md cursor-pointer hover:scale-102"
            >
              START B2B PROJECT INQUIRY
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
