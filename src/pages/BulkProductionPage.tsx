import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  Layers, 
  ShieldCheck, 
  Award, 
  TrendingDown, 
  Clock, 
  Factory, 
  Truck,
  Globe2
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const BulkProductionPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const BULK_TIERS = [
    {
      tier: "Starter Batch",
      qty: "30 - 99 Pcs / Colorway",
      leadTime: "14 - 18 Days",
      bestFor: "Emerging UK Streetwear & Startup Activewear Labels",
      features: [
        "100% Custom Cut & Sew Silhouette",
        "Screen / 3D Puff Print / Embroidery included",
        "Custom Woven Neck Labels & Care Tags",
        "Individual Frosted Zip Polybags with UK Barcodes"
      ]
    },
    {
      tier: "Commercial Growth",
      qty: "100 - 499 Pcs / Colorway",
      leadTime: "16 - 20 Days",
      bestFor: "Established British Brands & Gym Apparel Retailers",
      features: [
        "Everything in Starter Batch + 18% Price Discount",
        "Custom Engraved Metal Aglets & YKK Zippers",
        "Custom Pantone Fabric Dye Batch",
        "Free High-Res Studio Production Photography"
      ]
    },
    {
      tier: "Enterprise Scale",
      qty: "500 - 5,000+ Pcs",
      leadTime: "21 - 28 Days",
      bestFor: "Major UK High-Street Retailers & Global E-Commerce Houses",
      features: [
        "Maximum Factory Tier Pricing (Up to 42% Savings)",
        "Dedicated Production Line & Quality Auditor",
        "Air DDP or Sea Freight direct to UK Port / 3PL Warehouse",
        "Flexible 30% Deposit / 70% Pre-Shipment Milestone Terms"
      ]
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
          <span className="text-[#E21D1D] font-bold">BULK PRODUCTION</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>LOW MOQ TO HIGH VOLUME SCALABLE INDUSTRIAL CUT & SEW</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              BULK PRODUCTION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">OEM MANUFACTURING</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Scale your clothing brand with direct industrial manufacturing. From agile low-MOQ runs (starting at 30 units per design) to commercial high-volume container shipments for British fashion brands, gym chains, and combat academies.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>CALCULATE BULK PRICE (£ GBP)</span>
          </button>
        </div>
      </div>

      {/* Production Tiers Grid */}
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {BULK_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#E21D1D] uppercase">TIER 0{idx + 1}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    {tier.leadTime}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-black text-white uppercase">{tier.tier}</h3>
                  <div className="text-lg font-mono font-bold text-white mt-1">{tier.qty}</div>
                  <p className="text-xs font-mono text-neutral-400 mt-2">{tier.bestFor}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-neutral-800">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs font-mono text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleQuoteClick}
                className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-[#E21D1D] hover:text-white text-white font-mono text-xs font-black uppercase text-center transition-all cursor-pointer"
              >
                SELECT {tier.tier}
              </button>
            </div>
          ))}
        </div>

        {/* Quality Assurance ISO Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E21D1D] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>AQL 1.0 / 2.5 INTERNATIONAL QUALITY PROTOCOL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              EVERY PIECE INSPECTED BEFORE EXPORT PACKING
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              Our in-line quality auditors check stitch tension, seam symmetry, GSM weight, dimensional tolerances (±0.5 cm), colorfastness, and barcode accuracy on 100% of garments before packing into export-grade double-corrugated master cartons.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] shrink-0 cursor-pointer"
          >
            REQUEST FACTORY BULK PROPOSAL
          </button>
        </div>
      </div>
    </div>
  );
};
