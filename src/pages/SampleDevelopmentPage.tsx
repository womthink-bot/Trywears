import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Plane, 
  DollarSign, 
  RotateCcw,
  Scissors
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const SampleDevelopmentPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const SAMPLE_STEPS = [
    {
      step: "01",
      title: "Tech Pack Analysis & Pattern Generation",
      time: "Day 1 - 2",
      desc: "Our master pattern engineers digitize your measurements, prepare Gerber vector cut patterns, and program embroidery & screen mesh screens."
    },
    {
      step: "02",
      title: "Fabric Sourcing & Pantone Dye Lab-Dips",
      time: "Day 3 - 4",
      desc: "We knit/source the exact specified fabric GSM (450 GSM French Terry, 240 GSM Spandex, 24oz Wool) and dye to your exact Pantone shade."
    },
    {
      step: "03",
      title: "Bespoke Cut, Print, Embroidery & Assembly",
      time: "Day 5 - 7",
      desc: "Precision laser fabric cutting, 3D puff print strike-off application, custom woven neck label insertion, and heavy-duty bar-tack seaming."
    },
    {
      step: "04",
      title: "Quality Control & 4K Pre-Shipment Video Review",
      time: "Day 7 - 8",
      desc: "Comprehensive dimensional measurement report against your spec sheet with full 4K HD macro photography and video sent to your WhatsApp/Email."
    },
    {
      step: "05",
      title: "Express DHL Air Courier Direct to UK Doorstep",
      time: "Day 8 - 11",
      desc: "Dispatched via DHL Express / FedEx Priority with end-to-end tracking to your UK studio or home address in 3 to 4 business days."
    }
  ];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SERVICES</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">SAMPLE DEVELOPMENT</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>RAPID 7-10 DAY SAMPLE PROTOTYPING FOR UK BRANDS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              SAMPLE DEVELOPMENT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">PRE-PRODUCTION PPS</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Test fabric weight, silhouette drape, 3D puff print elevation, and custom private label trims in hand before committing to full bulk production. 100% sample fee credited back toward your commercial production order.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>ORDER PHYSICAL PROTOTYPE SAMPLE</span>
          </button>
        </div>
      </div>

      {/* Main 5 Step Timeline */}
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {SAMPLE_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-black text-[#E21D1D]">{item.step}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-base font-display font-black text-white uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 100% Sample Refund Guarantee Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <RotateCcw className="w-4 h-4" />
              <span>100% RISK-FREE SAMPLING GUARANTEE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              SAMPLE COSTS DEDUCTED 100% FROM YOUR BULK INVOICE
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              We operate on an honest factory partnership model. When you approve your pre-production prototype and place your bulk order (MOQ 30+ pcs), the entire sample fee is subtracted directly from your bulk production invoice.
            </p>
          </div>

          <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800 space-y-3 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-neutral-400">Sample Turnaround:</span>
              <span className="text-white font-bold">7 - 10 Days</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-neutral-400">DHL Express UK:</span>
              <span className="text-emerald-400 font-bold">3 - 4 Days Doorstep</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-neutral-400">Free Spec Revision:</span>
              <span className="text-white font-bold">1 Free Adjustment</span>
            </div>
            <button
              onClick={handleQuoteClick}
              className="w-full py-3 mt-2 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase text-center transition-colors shadow-lg cursor-pointer"
            >
              START SAMPLE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
