import React, { useState } from "react";
import { 
  Clock, 
  Plus, 
  Minus, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Zap, 
  Award,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const MOQLeadTimePage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const [expandedId, setExpandedId] = useState<string | null>("cat-1");

  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const MOQ_TABLE = [
    {
      id: "cat-1",
      category: "Heavyweight Streetwear Hoodies & Sweats",
      ukSearch: "Custom Hoodies Low MOQ UK (30 Pcs)",
      moq: "30 Pcs / Colorway",
      sampleTime: "7 - 10 Days",
      bulkTime: "14 - 18 Days",
      fabrics: "450-550 GSM Organic Cotton, French Terry, Brushed Fleece",
      pricingTier: "£14.50 - £24.00 (Volume Dependent)",
      details: [
        "Sizes: UK XS to 5XL (Mixed size curve allowed in 30 pcs)",
        "Includes 3D Puff Screen Print or Multi-color Embroidery",
        "Custom Woven Neck Labels & 80-micron Frosted Polybag included",
        "Rush 10-day production lane available upon request"
      ]
    },
    {
      id: "cat-2",
      category: "Bespoke Gym T-Shirts & Stringers",
      ukSearch: "Custom Activewear Manufacturer UK Low MOQ",
      moq: "50 Pcs / Colorway",
      sampleTime: "5 - 7 Days",
      bulkTime: "12 - 16 Days",
      fabrics: "220-300 GSM Heavy Jersey, 4-Way Poly-Spandex Lycra",
      pricingTier: "£6.80 - £12.50 (Volume Dependent)",
      details: [
        "Soft-touch silicone discharge print or high-definition heat transfer",
        "Anti-microbial & moisture-wicking certified yarn",
        "Twin-needle hem stitching with reinforced shoulder taping",
        "Individual barcode stickers for UK retail inventory systems"
      ]
    },
    {
      id: "cat-3",
      category: "Cut & Sew Tracksuits & Cargo Joggers",
      ukSearch: "Custom Cut & Sew Tracksuits UK (30 Sets MOQ)",
      moq: "30 Sets / Colorway",
      sampleTime: "8 - 10 Days",
      bulkTime: "16 - 20 Days",
      fabrics: "380-450 GSM Heavy French Terry, Technical Taslan Nylon",
      pricingTier: "£26.00 - £42.00 / Full Set",
      details: [
        "Custom gunmetal cord aglets with brand laser engraving",
        "Heavy YKK hardware zippers on cargo pockets and ankle cuffs",
        "Custom side-stripe jacquard knit tape available",
        "Full DDP Air Freight to UK doorstep within 4 days of completion"
      ]
    },
    {
      id: "cat-4",
      category: "Artisan Leather & Wool Varsity Jackets",
      ukSearch: "Custom Varsity Leather Jackets UK Low MOQ",
      moq: "20 Pcs / Style",
      sampleTime: "10 - 12 Days",
      bulkTime: "21 - 25 Days",
      fabrics: "24oz Melton Wool & Full Grain Cowhide Leather Sleeves",
      pricingTier: "£48.00 - £85.00 (Volume Dependent)",
      details: [
        "Multi-color fuzzy chenille varsity crests & chainstitch embroidery",
        "Diamond quilted internal thermal satin lining with interior chest pocket",
        "Solid brass matte enamel snaps with brand debossing",
        "Hand-finished edge dyes and certified leather grade"
      ]
    },
    {
      id: "cat-5",
      category: "MMA Fight Shorts & BJJ Rashguards",
      ukSearch: "Custom Fightwear Manufacturer UK Low MOQ",
      moq: "30 Pcs / Design",
      sampleTime: "6 - 8 Days",
      bulkTime: "14 - 18 Days",
      fabrics: "240 GSM 4-Way Stretch Poly-Elastane, Lycra Crotch Flex",
      pricingTier: "£11.50 - £19.00 (Volume Dependent)",
      details: [
        "Indestructible deep Italian sublimation print (never peels or fades)",
        "Interlocking flatlock 6-thread reinforced athletic seams",
        "Internal drawstring with non-slip silicone waistband grip",
        "IBJJF & UK Fight Federation competition legal compliance"
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SUPPORT</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">MOQ AND LEAD TIME</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>LOW MOQ FACTORY DIRECT SPEED FOR UK BRANDS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              MOQ & LEAD TIME <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">PRODUCTION MATRIX</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Transparent, low minimum order quantities starting from just 30 units per design. Rapid 7-10 day sampling and 14-21 day bulk turnaround designed to empower British streetwear brands, fitness startups, and gym chains to launch fast with zero excess deadstock risk.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>CALCULATE YOUR MOQ PRICE (£ GBP)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Interactive Expandable Category List */}
        <div className="space-y-4">
          {MOQ_TABLE.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-[#0d0d14] border-[#E21D1D] shadow-[0_0_30px_rgba(226,29,29,0.2)]"
                    : "bg-neutral-900/60 hover:bg-neutral-900/90 border-neutral-800"
                }`}
              >
                {/* Header Row Trigger */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-6 sm:p-8 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                      {item.ukSearch}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                      {item.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
                    <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-neutral-400 block text-[9px] uppercase">MOQ:</span>
                      <span className="text-white font-bold">{item.moq}</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-neutral-400 block text-[9px] uppercase">Sample:</span>
                      <span className="text-emerald-400 font-bold">{item.sampleTime}</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-neutral-400 block text-[9px] uppercase">Bulk Lead:</span>
                      <span className="text-white font-bold">{item.bulkTime}</span>
                    </div>

                    <div className="p-2 rounded-full bg-[#E21D1D]/20 border border-[#E21D1D]/40 text-[#E21D1D]">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-neutral-800 p-6 sm:p-8 bg-black/40 space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-wider block">
                            Fabrics & Estimated Range:
                          </span>
                          <p className="text-xs font-mono text-neutral-300">{item.fabrics}</p>
                          <div className="text-sm font-mono font-bold text-white pt-1">
                            Estimated Unit Range: <span className="text-emerald-400">{item.pricingTier}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-wider block">
                            Included Factory Specifications:
                          </span>
                          <div className="space-y-1.5">
                            {item.details.map((d, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E21D1D] shrink-0" />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-neutral-800/80">
                        <button
                          onClick={handleQuoteClick}
                          className="px-6 py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                        >
                          <span>GET EXACT B2B QUOTE FOR {item.category.toUpperCase()}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Express Rush Lane Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-black border border-[#E21D1D]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <Zap className="w-4 h-4" />
              <span>EXPRESS PRIORITY SEWING LANES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              NEED YOUR APPAREL FOR A UK EVENT OR DROP IN 10 DAYS?
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              We operate dedicated emergency manufacturing cells capable of cutting, printing, and assembling orders of up to 200 units within 7-10 working days, dispatched via DHL Express DDP directly to your venue or warehouse.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] shrink-0 cursor-pointer"
          >
            REQUEST EXPRESS PRODUCTION QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};
