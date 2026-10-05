import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  ArrowRight, 
  Rotate3d, 
  Scissors, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award,
  ChevronRight,
  Globe2
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const OrderProcessPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const PROCESS_STEPS = [
    {
      step: "01",
      title: "Inquiry & Tech Pack Submission",
      time: "Within 24 Hours",
      desc: "Send us your tech packs, sketches, reference photos, or sample requests. Our senior textile engineers analyze your requirements and issue an itemized factory price quotation in GBP (£) including all trims and DDP UK shipping.",
      checklist: ["Free CAD Tech Pack review", "GSM fabric weight consultation", "Transparent tiered volume pricing (£)"]
    },
    {
      step: "02",
      title: "Digital 3D CAD Mockup & Swatch Approval",
      time: "24 - 48 Hours",
      desc: "We generate high-resolution 3D garment visualizations showing exact print coordinates, Pantone dye codes, woven tag positions, and seam stitch callouts for your digital approval.",
      checklist: ["360° 3D garment rendering", "Pantone TCX/TPX color verification", "Print & embroidery strike-off mockups"]
    },
    {
      step: "03",
      title: "Physical Pre-Production Sample (PPS)",
      time: "7 - 10 Working Days",
      desc: "We craft your physical prototype with exact custom fabrics, 3D puff print, and private label neck tags, then dispatch it via DHL Express straight to your UK address in 3-4 days.",
      checklist: ["Real bespoke cut & sew construction", "Fit & wash testing on body", "100% sample fee credited toward bulk"]
    },
    {
      step: "04",
      title: "Bulk Production & In-Line QC",
      time: "14 - 21 Days",
      desc: "Upon your sample approval and 50% deposit, our automated laser cutting tables, screen carousels, and master sewing lines manufacture your collection under strict ISO 9001:2015 supervision.",
      checklist: ["AQL 1.0 zero-defect monitoring", "Precision dimensional tolerance check", "Continuous production status photo updates"]
    },
    {
      step: "05",
      title: "Final Inspection & 4K Video Sign-Off",
      time: "1 - 2 Days",
      desc: "Every garment is thread-trimmed, steam-ironed, barcoded, and sealed into frosted zip polybags. We share a comprehensive 4K video walk-through and measurement audit before final balance dispatch.",
      checklist: ["100% garment by garment audit", "Barcoded individual retail polybags", "Double-walled 7-ply export carton packing"]
    },
    {
      step: "06",
      title: "Express DDP Air/Sea Delivery to UK Doorstep",
      time: "3 - 5 Days Air / 25 Days Sea",
      desc: "Dispatched under Delivered Duty Paid (DDP) terms directly to your London, Manchester, Birmingham, Leeds warehouse or residence with all UK customs tariffs and VAT handled.",
      checklist: ["Live DHL/FedEx GPS tracking", "Zero surprise customs duty charges", "Direct delivery into UK 3PL warehouse"]
    }
  ];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SUPPORT</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">ORDER PROCESS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>STEP-BY-STEP BRITISH B2B CLIENT WORKFLOW</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              HOW TO ORDER & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">FACTORY PRODUCTION PROCESS</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              From your initial concept or tech pack to final DDP doorstep delivery across the United Kingdom. Our proven 6-stage manufacturing protocol guarantees zero quality surprises, transparent GBP (£) pricing, and on-time drop dates.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>START STEP 01 (REQUEST FREE QUOTE)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black text-[#E21D1D] px-3 py-1 rounded-lg bg-[#E21D1D]/15 border border-[#E21D1D]/30">
                    STAGE {item.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10">
                    {item.time}
                  </span>
                </div>

                <h3 className="text-xl font-display font-black text-white uppercase leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-neutral-800">
                {item.checklist.map((c, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E21D1D] shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Conversion CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E21D1D] uppercase">
              <Globe2 className="w-4 h-4" />
              <span>DIRECT FACTORY COMMUNICATION (24/7 WHATSAPP & EMAIL)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              READY TO COMMENCE YOUR CUSTOM APPAREL DROP?
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              Submit your inquiry now or speak directly with our Senior Production Merchandiser to review your tech pack, fabric swatches, and turnaround deadlines.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] shrink-0 cursor-pointer"
          >
            GET STARTED (REQUEST QUOTATION)
          </button>
        </div>
      </div>
    </div>
  );
};
