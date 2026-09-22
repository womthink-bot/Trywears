import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Factory, 
  Cpu, 
  Scissors, 
  Flame, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  Box, 
  Tag, 
  Sparkles,
  ArrowRight,
  PackageCheck,
  PlaneTakeoff,
  Award
} from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  icon: any;
}

const PRODUCTION_STEPS: Step[] = [
  {
    number: "01",
    title: "DIGITAL TECH-PACK & 3D CAD MODELING",
    subtitle: "Precision Virtual Prototyping (3-5 Days)",
    description: "Our apparel and combat engineers take your hand sketches, Pantone color codes, and club crests to build comprehensive vector tech-packs and photorealistic 3D mockups for team review.",
    specs: ["Sub-millimeter pattern grading (XS to 5XL)", "Pantone PMS color fidelity matching", "Virtual 3D 360-degree rotation view"],
    icon: Cpu
  },
  {
    number: "02",
    title: "PREMIUM RAW MATERIAL SOURCING",
    subtitle: "Full-Grain Leather & 450GSM French Terry",
    description: "Direct tannery cowhide leather, 240GSM 4-way compression Lycra, tearproof microfiber satin, and multi-layer high-density EVA shock absorbing foams sourced directly from certified mills.",
    specs: ["100% genuine full-grain cowhide leather", "OEKO-TEX certified skin-safe textiles", "Tear-tensile tested up to 850 Newtons"],
    icon: Factory
  },
  {
    number: "03",
    title: "AUTOMATED CNC LASER DIE-CUTTING",
    subtitle: "Zero Distortion Precision Patterning",
    description: "Computer-controlled high-speed laser cutting tables eliminate manual cutting errors, ensuring exact seam tolerances across every single team uniform and glove shell.",
    specs: ["0.1mm cutting tolerance edge-to-edge", "Automated nesting minimizes textile waste", "Heat-sealed edges prevent thread fraying"],
    icon: Scissors
  },
  {
    number: "04",
    title: "6-THREAD INDUSTRIAL FLATLOCK STITCHING",
    subtitle: "Championship Seam Structural Integrity",
    description: "Double-reinforced high-stress zones, 6-thread flatlock stitching that lies flat against the athlete's skin to prevent grappling friction burns, and industrial nylon bonded threads.",
    specs: ["Heavy-duty bonded nylon/Kevlar threads", "Dual-lock reinforcement at crotch & underarms", "Smooth non-chafing flatlock seam finish"],
    icon: Flame
  },
  {
    number: "05",
    title: "ITALIAN SUBLIMATION & 3D TAJIMA EMBROIDERY",
    subtitle: "Zero-Fade Colors & 3D Tactile Badges",
    description: "High-definition Japanese Tajima multi-head embroidery machines for 3D raised club crests, combined with high-heat Italian sublimation printing that never cracks, peels, or fades.",
    specs: ["Zero-fade high-heat Italian sublimation ink", "12-color high-density 3D metallic embroidery", "Silicone anti-slip waist grip printing"],
    icon: Sparkles
  },
  {
    number: "06",
    title: "AQL 2.5 QUALITY CONTROL & GLOBAL AIR EXPORT",
    subtitle: "Strict Inspection to Doorstep Delivery",
    description: "Every single unit undergoes rigorous 4-point visual and mechanical stress inspection before being barcoded, polybagged, and dispatched via express DHL/FedEx air freight.",
    specs: ["100% individual product manual QC", "Custom barcode & SKU retail polybagging", "Worldwide door-to-door express customs clearance"],
    icon: PlaneTakeoff
  }
];

const PRIVATE_LABEL_SERVICES = [
  {
    title: "Custom Woven Neck & Hem Labels",
    desc: "Damask high-density woven labels with your brand logo, sizing, and origin details.",
    tag: "INCLUDED"
  },
  {
    title: "Custom Barcoded Retail Polybags",
    desc: "Self-adhesive sealed transparent polybags with your branded print & Amazon-ready barcode.",
    tag: "OEM STANDARD"
  },
  {
    title: "Embossed Leather Crests",
    desc: "Heat-pressed brass mold embossing on glove cuffs, headgear, and leather patches.",
    tag: "COMBAT EXCLUSIVE"
  },
  {
    title: "Branded Metal Hardware & Aglets",
    desc: "Laser-engraved drawstrings, metallic aglets, and custom molded zipper pullers.",
    tag: "LUXURY APPAREL"
  },
  {
    title: "Full Sublimated Inner Linings",
    desc: "Custom printed moisture-wicking satin inside walkout robes, jackets, and fight shorts.",
    tag: "PREMIUM FINISH"
  },
  {
    title: "Rigid Magnetic Fight Boxes",
    desc: "Luxury presentation gift packaging for pro champions, sponsor kits, and retail lines.",
    tag: "PACKAGING UPGRADE"
  }
];

export const B2BFactoryCapabilities: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [sampleModalOpen, setSampleModalOpen] = useState<boolean>(false);
  const [sampleSent, setSampleSent] = useState<boolean>(false);

  return (
    <section id="factory-capabilities" className="py-24 px-6 bg-[#09090b] text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Background athletic accent gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E21D1D]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest uppercase block">
              INDUSTRIAL SPORTS MANUFACTURING & OEM POWERHOUSE
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase leading-none">
              FACTORY LIFECYCLE & PRIVATE LABEL CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-2xl">
              From raw hide selection in our Sialkot manufacturing hub to laser cutting, sublimation, and worldwide air cargo — discover how Try Wears produces championship equipment trusted by combat brands globally.
            </p>
          </div>

          {/* Swatch Kit CTA button */}
          <button
            onClick={() => setSampleModalOpen(true)}
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-[#E21D1D]/40 text-white font-mono text-xs font-bold px-6 py-4 rounded-2xl cursor-pointer hover:border-[#E21D1D] transition-all shrink-0"
          >
            <Box className="w-4 h-4 text-[#E21D1D]" />
            <span>ORDER FACTORY SWATCH BOX ($49)</span>
          </button>
        </div>

        {/* 1. FACTORY METRICS BENTO STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Monthly Production</span>
            <div className="text-3xl sm:text-4xl font-display font-black text-white">50,000+</div>
            <span className="text-[11px] text-[#E21D1D] block">Units / Month Capacity</span>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Clubs & Brands</span>
            <div className="text-3xl sm:text-4xl font-display font-black text-white">180+</div>
            <span className="text-[11px] text-emerald-400 block">Outfitted Worldwide</span>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Export Reach</span>
            <div className="text-3xl sm:text-4xl font-display font-black text-white">38</div>
            <span className="text-[11px] text-neutral-400 block">Countries Served</span>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Quality Standard</span>
            <div className="text-3xl sm:text-4xl font-display font-black text-emerald-400">AQL 2.5</div>
            <span className="text-[11px] text-neutral-400 block">ISO 9001 Certified</span>
          </div>
        </div>

        {/* 2. 6-STAGE PRODUCTION WORKFLOW */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
              <Factory className="w-4 h-4 text-[#E21D1D]" />
              THE 6-STAGE INDUSTRIAL MANUFACTURING PROCESS:
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              Step {activeStep + 1} of 6
            </span>
          </div>

          {/* Interactive Step Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PRODUCTION_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "border-[#E21D1D] bg-[#E21D1D]/15 text-white"
                      : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-[#E21D1D]">{step.number}</span>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-display font-bold leading-tight uppercase block truncate">
                    {step.title.split(" ")[0]} {step.title.split(" ")[1] || ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Display Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.03] border border-white/15 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#E21D1D] text-white font-mono font-black text-xs flex items-center justify-center">
                  {PRODUCTION_STEPS[activeStep].number}
                </span>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#E21D1D] uppercase tracking-wider block">
                    {PRODUCTION_STEPS[activeStep].subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                    {PRODUCTION_STEPS[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-sans text-neutral-300 leading-relaxed max-w-3xl">
                {PRODUCTION_STEPS[activeStep].description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {PRODUCTION_STEPS[activeStep].specs.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-neutral-900/80 border border-white/10 text-neutral-300 text-xs font-mono px-3 py-1.5 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-[#1c1c20] to-[#101012] border border-white/10 rounded-2xl p-6 space-y-4 font-mono text-xs">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">
                FACTORY PROTOCOL HIGHLIGHT
              </span>
              <div className="space-y-2 text-neutral-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Quality Check:</span>
                  <span className="font-bold text-white">ISO 9001:2015</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Turnaround:</span>
                  <span className="font-bold text-emerald-400">Rapid 5-Day Sample</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Tolerance:</span>
                  <span className="font-bold text-white">±0.5% Variance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Export Carriers:</span>
                  <span className="font-bold text-[#E21D1D]">DHL, FedEx, Sea Cargo</span>
                </div>
              </div>

              <a
                href="#b2b-calculator"
                className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-2.5 px-4 rounded-xl text-center block uppercase tracking-wider text-[11px] transition-colors"
              >
                CALCULATE THIS GEAR IN BULK
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. PRIVATE LABEL & OEM BRANDING SERVICES */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest uppercase block">
              100% WHITE-LABEL & PRIVATE BRANDING
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase">
              OEM BRANDING & PACKAGING SUITE
            </h3>
            <p className="text-xs font-mono text-neutral-400 max-w-xl mt-1">
              Every garment and fight glove leaves our factory completely customized with your insignia, custom tags, retail packaging, and barcoding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRIVATE_LABEL_SERVICES.map((serv, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#E21D1D]/40 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-[#E21D1D] bg-[#E21D1D]/15 border border-[#E21D1D]/30 px-2.5 py-0.5 rounded-full uppercase">
                    {serv.tag}
                  </span>
                  <Tag className="w-4 h-4 text-neutral-400 group-hover:text-[#E21D1D] transition-colors" />
                </div>
                <h4 className="text-base font-display font-black text-white uppercase group-hover:text-[#E21D1D] transition-colors">
                  {serv.title}
                </h4>
                <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                  {serv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SWATCH KIT MODAL */}
      {sampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121214] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => {
                setSampleModalOpen(false);
                setSampleSent(false);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {!sampleSent ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#E21D1D] font-bold uppercase">
                    PHYSICAL MATERIAL EVALUATION
                  </span>
                  <h3 className="text-2xl font-display font-black text-white uppercase">
                    ORDER FACTORY SWATCH BOX
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    Get actual material cuts delivered to your gym/office before committing to a 100+ unit order. Includes full-grain leather, French terry, Lycra, satin, and stitching swatches.
                  </p>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-emerald-300">
                  ★ <strong>100% Refundable:</strong> The $49 sample pack fee is credited directly against your first bulk order of 50+ units!
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      Recipient / Club Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Iron Clad Fight Gym"
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      Shipping Address (Street, City, Postal Code, Country)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter complete address for DHL Air express delivery..."
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSampleSent(true)}
                  className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#E21D1D]/20"
                >
                  DISPATCH SAMPLE SWATCH BOX ($49)
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase">
                  SAMPLE SWATCH DISPATCHED
                </h3>
                <p className="text-xs font-mono text-neutral-300">
                  Your physical textile swatch box has been queued for DHL Air Express dispatch. We will send tracking updates directly to your email!
                </p>
                <button
                  onClick={() => {
                    setSampleModalOpen(false);
                    setSampleSent(false);
                  }}
                  className="w-full bg-neutral-800 text-white font-display font-bold py-3 rounded-xl text-xs uppercase"
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
