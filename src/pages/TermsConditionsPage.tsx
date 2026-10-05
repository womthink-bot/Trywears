import React from "react";
import { 
  FileCheck, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  DollarSign, 
  Scale, 
  Sparkles 
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const TermsConditionsPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const TERMS_SECTIONS = [
    {
      title: "1. OEM / ODM Manufacturing Contract & Scope",
      desc: "Every custom manufacturing engagement is governed by a legally binding Proforma Invoice (PI) and Tech Pack specification sheet signed by both parties. Any subsequent changes to specs after fabric cutting has commenced must be agreed upon in writing."
    },
    {
      title: "2. Intellectual Property (IP) & Non-Disclosure (NDA)",
      desc: "Your design patterns, tech packs, logos, artwork, and brand identities remain 100% your exclusive intellectual property. TRY WEARS operates under strict Non-Disclosure Protocols and will never replicate, market, or sell your proprietary designs to third parties."
    },
    {
      title: "3. Payment Terms & Commercial Milestone Escrow",
      desc: "Standard production terms require a 50% deposit upon formal Tech Pack and PO sign-off to procure certified yarn and begin knitting/dyeing, with the remaining 50% balance payable upon 100% pre-shipment quality inspection and video sign-off before dispatch."
    },
    {
      title: "4. Production Tolerances & Dimensional Specifications",
      desc: "Industrial garment manufacturing operates under standard international apparel tolerances of ±0.5 cm (±0.2 inches) across chest, length, and sleeve dimensions, and ±5% GSM fabric weight variation due to natural textile wash treatments."
    },
    {
      title: "5. Lead Times & Shipping Liability",
      desc: "Lead times begin from the date of final PPS sample sign-off and deposit receipt. TRY WEARS provides comprehensive transit insurance for all air and sea freight shipments up to port of entry / client doorstep."
    },
    {
      title: "6. UK & International Commercial Compliance",
      desc: "All products manufactured comply with international REACH standards, OEKO-TEX eco-dye safety guidelines, CE certification for combat protective equipment, and UK labelling regulations."
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
          <span className="text-[#E21D1D] font-bold">TERMS AND CONDITIONS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Scale className="w-3.5 h-3.5 animate-pulse" />
              <span>COMMERCIAL B2B MANUFACTURING AGREEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              TERMS AND CONDITIONS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">IP PROTECTION</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Transparent, fair, and legally binding B2B manufacturing terms designed to protect British clothing founders, fight promoters, and global retail brands.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>REQUEST MUTUAL NDA AGREEMENT</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Terms Sections List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TERMS_SECTIONS.map((sec, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-3"
            >
              <h3 className="text-lg font-display font-black text-white uppercase">{sec.title}</h3>
              <p className="text-xs font-mono text-neutral-300 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
