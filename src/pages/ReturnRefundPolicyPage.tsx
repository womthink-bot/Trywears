import React from "react";
import { 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Sparkles, 
  Award, 
  Clock 
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const ReturnRefundPolicyPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const GUARANTEE_PILLARS = [
    {
      title: "Pre-Production Sample (PPS) Sign-Off",
      desc: "Bulk manufacturing never starts until you physically hold, test, and formally approve your pre-production prototype sample in writing or via high-resolution video call."
    },
    {
      title: "Dimensional & Tolerance Guarantee",
      desc: "All garments are produced within strict ±0.5 cm industry standard tolerances. Any garment falling outside agreed tech pack size specs is replaced free of charge."
    },
    {
      title: "Defect Replacement / Credit Note",
      desc: "In the rare event of a stitching defect, incorrect print artwork, or fabric flaw, we immediately remanufacture the affected pieces or credit your commercial balance."
    },
    {
      title: "14-Day Claim Review Window",
      desc: "Inspect your delivery upon receipt in the UK. You have 14 full business days to submit any discrepancy reports with macro photos to our dedicated account manager."
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
          <span className="text-[#E21D1D] font-bold">RETURN AND REFUND POLICY</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
              <span>B2B OEM MANUFACTURING QUALITY WARRANTY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              RETURN AND REFUND POLICY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">QUALITY ASSURANCE</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Because all garments, fight gear, and streetwear products are 100% custom-made to your bespoke tech pack and brand specifications, our policy is built on proactive Pre-Production Sample approval and rigorous AQL 1.0 quality control.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>CONTACT FACTORY QA DESK</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Guarantee Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUARANTEE_PILLARS.map((pil, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#E21D1D]">CLAUSE 0{idx + 1}</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-display font-black text-white uppercase">{pil.title}</h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>

        {/* Claim Resolution Process */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0a0a10] border border-neutral-800 space-y-6">
          <h2 className="text-2xl font-display font-black text-white uppercase">
            HOW DISCREPANCY CLAIMS ARE HANDLED (3-STEP RESOLUTION)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">STEP 01</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">Notify Within 14 Days</h4>
              <p className="text-xs font-mono text-neutral-400">Email photos of any defect or measurement variance alongside your order PO number.</p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">STEP 02</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">24-Hour Engineering Audit</h4>
              <p className="text-xs font-mono text-neutral-400">Our QA director checks production archive retain samples against the digital tech pack spec.</p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">STEP 03</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">Express Remanufacture / Refund</h4>
              <p className="text-xs font-mono text-neutral-400">Validated defects are rushed on our priority emergency sewing line or credited immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
