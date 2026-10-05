import React, { useState } from "react";
import { 
  Sparkles, 
  Scissors, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Rotate3d, 
  ShieldCheck, 
  Package, 
  Tag, 
  Clock, 
  Truck, 
  Factory, 
  Award, 
  ChevronRight, 
  PenTool, 
  Zap, 
  Globe2, 
  Building,
  Play,
  Maximize2,
  Activity,
  Flame,
  Palette,
  Crosshair,
  Cpu,
  Eye,
  Check,
  FileCode2,
  Box,
  BadgeCheck,
  Sparkle
} from "lucide-react";
import { motion } from "motion/react";

interface PageProps {
  onNavigatePage: (page: string) => void;
}

export const ServicesPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const [selectedColorway, setSelectedColorway] = useState<string>("crimson");

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
              SERVICES MASTER HUB
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>5 BESPOKE MANUFACTURING PILLARS</span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER WITH AMBIENT GLOW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-6 relative">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#d946ef]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#E21D1D]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/50 text-[#f0abfc] text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRY WEARS MANUFACTURING & BESPOKE SERVICES</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              OUR COMPLETE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-white to-red-400">SERVICES SUITE</span>
            </h1>
            <p className="text-neutral-100 text-base sm:text-lg font-sans leading-relaxed">
              From your initial creative concept to high-volume commercial production. Explore our 5 distinct manufacturing pillars designed for British streetwear brands, luxury fashion founders, athletic gym chains, and fight academies.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("b2b-quote")}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.5)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>REQUEST FREE B2B QUOTE (£ GBP)</span>
          </button>
        </div>
      </div>

      {/* 3. DISTINCT BESPOKE SERVICE SECTIONS WITH RICH BALANCED CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ============================================================== */}
        {/* PILLAR 01: DESIGN & CAD - DIGITAL BLUEPRINT HUD STYLE          */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0e0e16] border border-neutral-700 hover:border-[#3B82F6] transition-all duration-300 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: Futuristic CAD Video Box with Scanner HUD */}
            <div className="lg:col-span-5 relative bg-black min-h-[360px] lg:min-h-full overflow-hidden group">
              <video
                src="/videos/design_customization_SR1.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16] via-transparent to-black/40" />
              
              {/* Laser Scanning Line */}
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-75"
              />

              {/* HUD Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-blue-500/40 backdrop-blur-md">
                <Crosshair className="w-3.5 h-3.5 text-[#3B82F6] animate-spin" style={{ animationDuration: "6s" }} />
                <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                  CLO 3D CAD SUITE ACTIVE
                </span>
              </div>

              {/* Floating Tech Blueprint Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-blue-500/30 backdrop-blur-md space-y-2 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between text-[#60a5fa] font-bold text-[10px]">
                  <span>PATTERN TOLERANCE: ±0.5MM</span>
                  <span>UK TRUE-TO-SIZE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center">
                  <div className="bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                    <span className="text-[8px] text-neutral-400 uppercase block">Grading</span>
                    <span className="text-white font-bold text-xs">XS - 5XL</span>
                  </div>
                  <div className="bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                    <span className="text-[8px] text-neutral-400 uppercase block">Pantone</span>
                    <span className="text-[#60a5fa] font-bold text-xs">TCX Match</span>
                  </div>
                  <div className="bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                    <span className="text-[8px] text-neutral-400 uppercase block">Turnaround</span>
                    <span className="text-white font-bold text-xs">24-48 Hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Blueprint Content - Rich, Filled & Balanced */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#0e0e16]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-black text-blue-400 px-3.5 py-1 rounded-xl bg-blue-500/20 border border-blue-500/40">
                      PILLAR 01 • TECHNICAL BLUEPRINTS
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      CAD & 3D SIMULATION
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                    Design Customization & CAD Tech Packs
                  </h2>
                  <p className="text-xs sm:text-sm font-mono font-bold text-blue-400 uppercase tracking-wider mt-1">
                    Turn sketches, moodboards & photos into precision master factory blueprints
                  </p>
                </div>

                <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                  Complete apparel engineering from hand drawings, moodboards, or phone photos. We draft full graded CAD patterns (UK XS to 5XL), bill of materials (BOM), 3D digital CLO virtual fittings, stitch density tolerances, and pantone TCX color-matching sheets.
                </p>

                {/* Primary Spec Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {[
                    "Vector CAD flats with 4-angle seam callouts",
                    "UK & European true-to-size grading specs",
                    "Pantone TCX / TPX lab-dip color strike-offs",
                    "CLO 3D digital drape & tension heatmap"
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#090910] border border-blue-500/20">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="text-xs font-mono text-neutral-100 font-medium">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Rich Content: Master CAD Deliverables Suite */}
                <div className="p-4 rounded-2xl bg-[#080810] border border-neutral-800 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-blue-300 font-bold border-b border-neutral-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <FileCode2 className="w-4 h-4 text-blue-400" />
                      <span>MASTER FACTORY DELIVERABLES INCLUDED</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      PRO GRADE
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">▪</span>
                      <span><strong>Pattern Files:</strong> Formatted in DXF, AI, PDF vector ready for CNC laser cutting tables.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">▪</span>
                      <span><strong>Fabric BOM:</strong> Detailed yarn composition, GSM density, shrinkage rate & rib elasticity.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">▪</span>
                      <span><strong>Stitch Density:</strong> Stitches-per-inch (SPI) & overlock seam strength allowances specified.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">▪</span>
                      <span><strong>Fit Verification:</strong> 3D pressure heatmap tension test to eliminate pre-sample fit errors.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={() => onNavigatePage("design-customization")}
                  className="px-6 py-3.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105"
                >
                  <span>Explore Design Customization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400">Free CAD analysis with tech pack submission</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PILLAR 02: BRAND PACKAGING - REVERSE ASYMMETRICAL LUXURY CARD */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#100f16] border border-neutral-700 hover:border-[#d946ef] transition-all duration-300 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: Luxury Branding Text & Swatch Badges - Rich & Balanced */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#100f16] order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-black text-[#d946ef] px-3.5 py-1 rounded-xl bg-[#d946ef]/20 border border-[#d946ef]/40">
                      PILLAR 02 • PRIVATE LABEL
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      RETAIL READY
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                    Brand Customization & Private Label Packaging
                  </h2>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#f0abfc] uppercase tracking-wider mt-1">
                    50-Denier Damask Woven Labels, Custom Metal Aglets & Frosted Polybags
                  </p>
                </div>

                <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                  Turn raw garments into boutique-grade retail collections. We manufacture 50-denier high-density woven damask neck tags, tagless heat transfers, custom-engraved matte gunmetal aglets, 600 GSM foil-stamped swing tags, and frosted zip polybags with UK EAN barcodes.
                </p>

                {/* Luxury Trim Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {[
                    { title: "Damask Tags", desc: "50-Denier Soft" },
                    { title: "Metal Aglets", desc: "Engraved Alloy" },
                    { title: "Swing Tags", desc: "600 GSM Foil" },
                    { title: "Frosted Bags", desc: "UK EAN Barcode" }
                  ].map((t, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-[#090910] border border-neutral-700 text-center font-mono">
                      <span className="text-white font-black text-xs block">{t.title}</span>
                      <span className="text-[10px] text-[#f0abfc] block mt-0.5">{t.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Rich Content: Private Label Retail Finishing Suite */}
                <div className="p-4 rounded-2xl bg-[#0a0910] border border-neutral-800 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#f0abfc] font-bold border-b border-neutral-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Box className="w-4 h-4 text-[#d946ef]" />
                      <span>FULL BOUTIQUE-READY PACKAGING PROTOCOLS</span>
                    </span>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      100% PRIVATE LABEL
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="text-[#d946ef] font-bold">▪</span>
                      <span><strong>Laser-Cut Neck Tags:</strong> Ultra-soft zero-scratch sonic sealed edges for skin comfort.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#d946ef] font-bold">▪</span>
                      <span><strong>Zippers & Aglets:</strong> Branded YKK / metal zippers with bespoke logo engraving.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#d946ef] font-bold">▪</span>
                      <span><strong>Barcode Stickers:</strong> High-resolution EAN-13 / Amazon FBA scannable stickers attached.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#d946ef] font-bold">▪</span>
                      <span><strong>Individual Polybags:</strong> Clean steam-pressed & packaged in 80-micron frosted zip bags.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={() => onNavigatePage("brand-customization")}
                  className="px-6 py-3.5 rounded-xl bg-[#d946ef] hover:bg-fuchsia-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-105"
                >
                  <span>Explore Brand Customization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400">100% Private Label OEM Secrecy</span>
              </div>
            </div>

            {/* Right: Video Chamber with Luxury Gold/Fuchsia Accents */}
            <div className="lg:col-span-5 relative bg-black min-h-[360px] lg:min-h-full overflow-hidden group order-1 lg:order-2">
              <video
                src="/videos/brand_customization_SR2.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100f16] via-transparent to-black/40" />

              {/* Top Tag */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-fuchsia-500/40 backdrop-blur-md">
                <Tag className="w-3.5 h-3.5 text-[#d946ef]" />
                <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                  LUXURY TRIMS & PACKAGING
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PILLAR 03: FULL-WIDTH CINEMATIC 3D CUSTOMIZER FEATURE STAGE    */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-b from-[#131220] to-[#0a0a10] border border-neutral-700 hover:border-[#E21D1D] p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E21D1D]/15 blur-[140px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Narrative */}
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-black text-[#ff4d4d] px-3.5 py-1 rounded-xl bg-[#E21D1D]/20 border border-[#E21D1D]/40">
                  PILLAR 03 • INTERACTIVE 3D PROTOTYPE LAB
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  LIVE SIMULATION
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Customize Your Product in 3D Real-Time
                </h2>
                <p className="text-xs sm:text-sm font-mono font-bold text-neutral-300 uppercase tracking-wider mt-1">
                  Select Garment Cuts, 220–550 GSM Heavyweight Fleece, and Puff Prints
                </p>
              </div>

              <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                Experience instant bespoke garment engineering. Simulate colorways, switch from 500 GSM loopback French terry to 240 GSM vintage washed cotton, apply 3D puff silicone prints, and generate real-time tech pack estimates.
              </p>

              {/* Interactive Colorway Selector */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-neutral-400 uppercase font-bold block">Preview Colorway Palettes:</span>
                <div className="flex items-center gap-3">
                  {[
                    { id: "crimson", name: "Crimson Red", hex: "#E21D1D" },
                    { id: "obsidian", name: "Obsidian Black", hex: "#171717" },
                    { id: "royal", name: "Royal Blue", hex: "#2563EB" },
                    { id: "emerald", name: "Emerald Pro", hex: "#059669" }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColorway(c.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColorway === c.id
                          ? "border-white bg-white/15 text-white font-bold scale-105 shadow-md"
                          : "border-neutral-700 bg-black/60 text-neutral-400"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigatePage("customize-your-product")}
                  className="px-8 py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(226,29,29,0.5)] hover:scale-105"
                >
                  <Rotate3d className="w-4 h-4" />
                  <span>Launch 3D Customizer Lab</span>
                </button>
              </div>
            </div>

            {/* Right: Visual 3D Preview Frame */}
            <div className="w-full lg:w-[460px] h-[340px] rounded-3xl overflow-hidden bg-black border border-neutral-700 relative group shadow-2xl">
              <video
                src="/videos/customize_product_3d_SR3.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/85 border border-white/20 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#ff4d4d] font-bold block uppercase">Active Simulation</span>
                  <span className="text-xs font-mono font-bold text-white block">500 GSM Heavyweight Hoodie</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  Ready
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PILLAR 04: SAMPLE DEVELOPMENT - 7-10 DAYS EXPRESS PIPELINE     */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#0c120e] border border-neutral-700 hover:border-emerald-500 transition-all duration-300 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: Video with Live Speed Badge */}
            <div className="lg:col-span-5 relative bg-black min-h-[360px] lg:min-h-full overflow-hidden group">
              <video
                src="/videos/sample_development_SR4.webm"
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
                  7-10 DAYS PROTOTYPING
                </span>
              </div>

              {/* Sample Refund Guarantee Callout */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-emerald-500/30 backdrop-blur-md space-y-1 text-center font-mono shadow-2xl">
                <span className="text-xs font-black text-emerald-400 uppercase block">
                  100% SAMPLE COST REFUND GUARANTEE
                </span>
                <span className="text-[10px] text-neutral-300 block">
                  Sample fee credited back immediately upon bulk order placement
                </span>
              </div>
            </div>

            {/* Right: Timeline & Step-by-Step Sampling Process - Rich & Balanced */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#0c120e]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-black text-emerald-400 px-3.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                      PILLAR 04 • RAPID SAMPLING
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      EXPRESS PPS DESK
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                    Sample Development & Rapid Prototyping
                  </h2>
                  <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mt-1">
                    Hold & Test Your Exact Physical Pre-Production Sample (PPS)
                  </p>
                </div>

                <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                  Never gamble on bulk production. We engineer, cut, print, and sew an exact pre-production prototype sample (PPS) with your custom trims and fabrics in 7 to 10 working days, dispatched via DHL Express DDP directly to your UK address in 3-4 days.
                </p>

                {/* Sampling Timeline Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20 font-mono">
                    <span className="text-[#34d399] font-bold text-xs block">Days 1 - 3</span>
                    <span className="text-white text-xs font-bold block mt-1">CAD & Fabric Dye</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Pattern grading & trims</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20 font-mono">
                    <span className="text-[#34d399] font-bold text-xs block">Days 4 - 7</span>
                    <span className="text-white text-xs font-bold block mt-1">Cut, Sew & Print</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Embroidery & assembly</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090910] border border-emerald-500/20 font-mono">
                    <span className="text-[#34d399] font-bold text-xs block">Days 8 - 10</span>
                    <span className="text-white text-xs font-bold block mt-1">DHL DDP Flight</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Doorstep delivery in 3d</span>
                  </div>
                </div>

                {/* Additional Rich Content: Pre-Shipment Sample Quality Audit */}
                <div className="p-4 rounded-2xl bg-[#070e0a] border border-neutral-800 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-neutral-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      <span>PPS PHYSICAL VERIFICATION CHECKLIST</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      100% REFUNDABLE
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">▪</span>
                      <span><strong>Macro 4K Video:</strong> Real-time HD walkthrough of seams, prints & tags before air dispatch.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">▪</span>
                      <span><strong>Measurement Audit:</strong> Chest, sleeve, length & collar verified within ±0.5cm tolerances.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">▪</span>
                      <span><strong>Fabric Wash Test:</strong> Pre-shrunk and tested for colorfastness prior to courier pickup.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">▪</span>
                      <span><strong>Bulk Credit:</strong> Full prototype invoice amount deducted from your bulk production invoice.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={() => onNavigatePage("sample-development")}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105"
                >
                  <span>Explore Sampling Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400">4K HD Video Review Before Dispatch</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* PILLAR 05: BULK PRODUCTION - INDUSTRIAL SCALING GRID           */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#140e0c] border border-neutral-700 hover:border-[#E21D1D] transition-all duration-300 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left: Scalable Manufacturing Content - Rich & Balanced */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#140e0c] order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-black text-[#ff4d4d] px-3.5 py-1 rounded-xl bg-[#E21D1D]/20 border border-[#E21D1D]/40">
                      PILLAR 05 • BULK MANUFACTURING
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      AQL 1.0 INSPECTED
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                    Bulk Production & Scalable OEM Manufacturing
                  </h2>
                  <p className="text-xs sm:text-sm font-mono font-bold text-[#ff4d4d] uppercase tracking-wider mt-1">
                    Low MOQ 30 pcs up to 10,000+ Units with Tiered Savings
                  </p>
                </div>

                <p className="text-neutral-100 text-sm sm:text-base leading-relaxed font-normal">
                  Scale your fashion house or gym brand with direct industrial manufacturing. From agile low-MOQ runs (starting at 30 units per colorway) to high-volume container shipments, every single garment is manufactured under ISO 9001:2015 standards with strict AQL 1.0 zero-defect inspection.
                </p>

                {/* Tiered MOQ Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-center">
                  <div className="p-3 rounded-xl bg-[#090910] border border-neutral-700">
                    <span className="text-white font-bold text-xs block">Low MOQ Run</span>
                    <span className="text-[#ff4d4d] font-black text-base block mt-0.5">30 - 100 Pcs</span>
                    <span className="text-[9px] text-neutral-400 block mt-0.5">Ideal for Brand Launch</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090910] border border-neutral-700">
                    <span className="text-white font-bold text-xs block">Growth Tier</span>
                    <span className="text-[#ff4d4d] font-black text-base block mt-0.5">250 - 500 Pcs</span>
                    <span className="text-[9px] text-neutral-400 block mt-0.5">Save ~24% Per Garment</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090910] border border-neutral-700">
                    <span className="text-white font-bold text-xs block">Enterprise Bulk</span>
                    <span className="text-[#ff4d4d] font-black text-base block mt-0.5">1,000+ Units</span>
                    <span className="text-[9px] text-neutral-400 block mt-0.5">Save ~42% Volume Rate</span>
                  </div>
                </div>

                {/* Additional Rich Content: Plant Machinery & Freight Logistics */}
                <div className="p-4 rounded-2xl bg-[#0c0808] border border-neutral-800 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#ff4d4d] font-bold border-b border-neutral-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Factory className="w-4 h-4 text-[#ff4d4d]" />
                      <span>INDUSTRIAL INFRASTRUCTURE & AIR DDP LOGISTICS</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ISO 9001:2015
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff4d4d] font-bold">▪</span>
                      <span><strong>Tajima 15-Head Embroidery:</strong> Japanese multi-head 3D puff and heavy stitch lines.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff4d4d] font-bold">▪</span>
                      <span><strong>Automated Cutting Beds:</strong> Multi-ply laser fabric cutters with 0.1mm repeatable accuracy.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff4d4d] font-bold">▪</span>
                      <span><strong>Air Freight DDP UK:</strong> Express priority customs-cleared door-to-door (all UK VAT/duty included).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#ff4d4d] font-bold">▪</span>
                      <span><strong>Ocean Container Freight:</strong> Cost-effective LCL / FCL sea freight for high-volume 10,000+ orders.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  onClick={() => onNavigatePage("bulk-production")}
                  className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(226,29,29,0.5)] hover:scale-105"
                >
                  <span>Explore Bulk Production Tiers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-neutral-400">Air DDP & Ocean Freight Container Options</span>
              </div>
            </div>

            {/* Right: High Impact Production Video */}
            <div className="lg:col-span-5 relative bg-black min-h-[360px] lg:min-h-full overflow-hidden group order-1 lg:order-2">
              <video
                src="/videos/bulk_production_SR5.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140e0c] via-transparent to-black/40" />

              <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-red-500/40 backdrop-blur-md">
                <Factory className="w-3.5 h-3.5 text-[#ff4d4d]" />
                <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                  DIRECT FACTORY POWERHOUSE
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* 4. FINAL CALL TO ACTION BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/60 via-[#12121e] to-black border border-neutral-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>DIRECT FACTORY OEM/ODM CONTRACTS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              READY TO DISCUSS YOUR CUSTOM COLLECTION?
            </h3>
            <p className="text-neutral-100 text-sm font-sans leading-relaxed font-normal">
              Send us your reference images, sketches, or tech packs. Our senior production team provides free CAD review, fabric weight consultation, and transparent tiered pricing in GBP (£).
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("b2b-quote")}
            className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] shrink-0 cursor-pointer hover:scale-105"
          >
            START PROJECT DISCUSSION (£ GBP)
          </button>
        </div>
      </div>

    </div>
  );
};
