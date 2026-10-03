import React, { useState } from "react";
import {
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Plane,
  FileCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Box,
  Truck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SamplingPoliciesPageProps {
  onNavigatePage: (page: string) => void;
}

const SAMPLE_STEPS = [
  {
    step: "01",
    day: "Day 1–2",
    title: "CLO 3D Digital Simulation & Pattern Grading",
    desc: "Our CAD engineers convert your tech pack sketches or vector artwork into an anatomical 3D digital garment simulation to verify seam placement and proportion before cutting any physical fabric."
  },
  {
    step: "02",
    day: "Day 3–4",
    title: "Custom Lab Dip Dye & Fabric Sourcing",
    desc: "Pantone-matched dye dips for 500 GSM French Terry, sublimation strike-offs, or drum-dyed cowhide selection tested under D65 daylight lamps."
  },
  {
    step: "03",
    day: "Day 5–7",
    title: "Precision Cut, Stitching & Hardware Integration",
    desc: "Master sample tailors stitch the prototype utilizing exact production-grade 6-thread flatlock machines, applying your custom engraved aglets, woven neck tags, and 3D puff embroidery."
  },
  {
    step: "04",
    day: "Day 8",
    title: "White-Glove Lab Audit & 360° Video Signoff",
    desc: "Dimensional measurements recorded, seam stress-tested, and a 4K 360° video review sent to you via WhatsApp / email for preliminary digital signoff."
  },
  {
    step: "05",
    day: "Day 9–11",
    title: "DHL / FedEx Express Door-to-Door Air Dispatch",
    desc: "Dispatched with tracking number directly to your studio or office. Typical delivery transit is 3-4 working days worldwide."
  }
];

export const SamplingPoliciesPage: React.FC<SamplingPoliciesPageProps> = ({ onNavigatePage }) => {
  const [sampleType, setSampleType] = useState("Streetwear Luxury Hoodie");
  const [sampleSubmitting, setSampleSubmitting] = useState(false);
  const [sampleSuccess, setSampleSuccess] = useState(false);

  const handleSampleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleSubmitting(true);
    setTimeout(() => {
      setSampleSubmitting(false);
      setSampleSuccess(true);
      setTimeout(() => setSampleSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#E21D1D] selection:text-white pb-24 space-y-24">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E21D1D]/20 via-red-950/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
            <Package className="w-3.5 h-3.5 text-[#E21D1D]" />
            <span>EXPRESS 7-10 DAYS PROTOTYPING • 100% BULK REFUNDABLE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.1]">
            OEM & ODM <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">SAMPLING POLICIES</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-mono max-w-3xl mx-auto uppercase leading-relaxed">
            We believe you should touch, wear, and test the structural perfection of your custom gear before placing bulk production orders. Our sample prototyping is fast, transparent, and 100% credited back to your account.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#sample-request-form"
              className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] cursor-pointer hover:scale-105"
            >
              Request Custom Sample Pack
            </a>
            <button
              onClick={() => onNavigatePage("quality-process")}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Review QC & Testing Protocols</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE SAMPLE GUARANTEES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D]">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-black text-white uppercase">
              100% SAMPLE FEE REFUND
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              When you approve your physical prototype and proceed to your bulk production order (minimum MOQ 50 pcs), your entire sample development fee is directly credited and deducted from your invoice.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-black text-white uppercase">
              7–10 WORKING DAYS SPEED
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Our dedicated sample atelier operates independently from the main bulk production lines. This ensures your customized prototype is cut, sewn, trimmed, and dispatched in record turnaround.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-black text-white uppercase">
              DHL EXPRESS AIR DISPATCH
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              All physical samples are shipped via priority air courier with tracking number. Typical transit is 3-4 days to USA, Canada, UK, Europe, Australia, and UAE.
            </p>
          </div>

        </div>
      </section>

      {/* 3. STEP-BY-STEP PROTOTYPING TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
            FROM TECH PACK TO PHYSICAL REALITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
            THE 5-STEP SAMPLING & APPROVAL PROTOCOL
          </h2>
        </div>

        <div className="space-y-4">
          {SAMPLE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center font-mono font-black text-lg text-[#E21D1D] shrink-0">
                  {step.step}
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    {step.day}
                  </span>
                  <h4 className="text-base font-display font-black text-white uppercase">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-1 max-w-2xl leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SIGNED OFF</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE SAMPLE ORDER REQUEST FORM */}
      <section id="sample-request-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
              CONFIDENTIAL PROTOTYPE INGESTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              ORDER YOUR PHYSICAL PROTOTYPE SAMPLE
            </h3>
            <p className="text-xs text-neutral-400 font-mono max-w-md mx-auto">
              Our master sample technicians will contact you within 4 hours to review your size chart, colorway swatches, and hardware requirements.
            </p>
          </div>

          <form onSubmit={handleSampleRequest} className="space-y-6">
            <AnimatePresence>
              {sampleSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Sample request logged into Sample Division queue. Our lead engineer will reach out with sample invoice & CLO-3D draft.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Product Type</label>
                <select
                  value={sampleType}
                  onChange={(e) => setSampleType(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
                >
                  <option>Streetwear Luxury Hoodie (500 GSM)</option>
                  <option>Pro Combat Boxing Gloves (1.2mm Cowhide)</option>
                  <option>Sublimated Pro Match Uniform</option>
                  <option>MMA Fight Rashguard & Compression Short</option>
                  <option>Full-Grain Leather Bomber Jacket</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Brand Name & Website</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VANGUARD ATHLETICS"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Buyer Email</label>
                <input
                  type="email"
                  required
                  placeholder="BUYER@BRAND.COM"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">WhatsApp / Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Sample Specifications & Custom Trims</label>
              <textarea
                rows={3}
                placeholder="Mention specific colorways, 3D puff print requirements, or custom metal aglets needed..."
                className="w-full bg-black/60 border border-white/15 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-[#E21D1D]"
              />
            </div>

            <button
              type="submit"
              disabled={sampleSubmitting}
              className="w-full py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {sampleSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Package className="w-4 h-4" />
              )}
              <span>{sampleSubmitting ? "PROCESSING SAMPLE TICKET..." : "REQUEST CUSTOM SAMPLE PACK & DHL AIR DISPATCH"}</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
