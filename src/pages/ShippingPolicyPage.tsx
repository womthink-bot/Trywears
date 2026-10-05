import React from "react";
import { 
  Truck, 
  Plane, 
  Ship, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  FileCheck, 
  Globe2, 
  Sparkles 
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const ShippingPolicyPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const SHIPPING_MODES = [
    {
      icon: <Plane className="w-6 h-6 text-[#E21D1D]" />,
      name: "DHL / FedEx Priority Express (DDP Air)",
      time: "3 - 5 Business Days",
      bestFor: "Prototypes, Pre-Production Samples & Agiles Runs (30 - 300 Pcs)",
      desc: "Doorstep delivery directly to your UK studio, home, or office with full real-time GPS tracking. Zero customs hassle.",
      duty: "DDP (Delivered Duty Paid) Available — All UK VAT & Import Tariffs Handled"
    },
    {
      icon: <Truck className="w-6 h-6 text-[#E21D1D]" />,
      name: "Air Cargo Consolidated Freight",
      time: "6 - 9 Business Days",
      bestFor: "Commercial Medium Bulk Shipments (300 - 2,000 Pcs)",
      desc: "Economical air logistics via Heathrow (LHR), Manchester (MAN), or Birmingham (BHX) with airport-to-door courier transfer.",
      duty: "Full Commercial Export Invoice & Certificate of Origin (Form A) Included"
    },
    {
      icon: <Ship className="w-6 h-6 text-[#E21D1D]" />,
      name: "Ocean Sea Freight (FCL / LCL)",
      time: "24 - 30 Days",
      bestFor: "High-Volume Container Shipments (2,000+ Units)",
      desc: "Maximum cost efficiency for major fashion houses and retail distributors delivering to Southampton or Felixstowe ports.",
      duty: "FOB / CIF / DDP Terms Available with Complete Bill of Lading (B/L)"
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
          <span className="text-[#E21D1D] font-bold">SHIPPING POLICY</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>UK & INTERNATIONAL B2B EXPORT LOGISTICS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              SHIPPING POLICY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">UK DDP DISPATCH</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Transparent, fast, and fully insured B2B shipping protocols for UK clothing brands. Delivered Duty Paid (DDP) options with zero unexpected import surprise fees delivered straight to your doorstep in London, Manchester, Birmingham, Leeds, or anywhere in the UK.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>ESTIMATE SHIPPING TO UK POSTCODE</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Shipping Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SHIPPING_MODES.map((mode, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-black/60 border border-neutral-800">
                    {mode.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-500/10">
                    {mode.time}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black text-white uppercase">{mode.name}</h3>
                  <span className="text-[11px] font-mono text-[#E21D1D] font-bold block mt-1">{mode.bestFor}</span>
                  <p className="text-xs font-mono text-neutral-400 mt-2">{mode.desc}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-[11px] font-mono text-neutral-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{mode.duty}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Master Packaging & Carton Standards */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0a0a10] border border-neutral-800 space-y-6">
          <h2 className="text-2xl font-display font-black text-white uppercase">
            INDUSTRIAL EXPORT PACKAGING SPECIFICATIONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">01</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">Individually Polybagged</h4>
              <p className="text-[11px] font-mono text-neutral-400">Each garment folded in 80-micron frosted anti-dust zip polybag with desiccant silica pouch.</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">02</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">7-Ply Corrugated Cartons</h4>
              <p className="text-[11px] font-mono text-neutral-400">Heavy-duty 7-ply double-wall outer boxes tested to withstand 200+ kg crush compression.</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">03</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">Waterproof Shrink Wrap</h4>
              <p className="text-[11px] font-mono text-neutral-400">Every master carton wrapped in heavy plastic barrier and reinforced strapping bands.</p>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-2">
              <span className="text-xs font-mono font-black text-[#E21D1D]">04</span>
              <h4 className="text-sm font-display font-bold text-white uppercase">Live Airway Tracking</h4>
              <p className="text-[11px] font-mono text-neutral-400">Direct DHL/FedEx tracking link emailed immediately upon airport dispatch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
