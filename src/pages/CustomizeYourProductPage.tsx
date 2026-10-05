import React, { useState } from "react";
import { 
  Sliders, 
  Sparkles, 
  Scissors, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Rotate3d, 
  ShieldCheck, 
  Download, 
  ChevronRight,
  Flame,
  Check
} from "lucide-react";
import { TShirtCustomizer, DEFAULT_CUSTOMIZER_PRODUCT } from "../components/TShirtCustomizer";

interface PageProps {
  onNavigatePage?: (page: string) => void;
  onAddToCart?: (item: any) => void;
}

export const CustomizeYourProductPage: React.FC<PageProps> = ({ onNavigatePage, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("hoodies");

  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const APPAREL_CATEGORIES = [
    {
      id: "hoodies",
      name: "Luxury Heavyweight Hoodies",
      ukSearch: "Custom Hoodies Manufacturer UK",
      gsm: "450 - 550 GSM",
      moq: "30 Pcs",
      lead: "14 - 21 Days",
      fabrics: "100% Organic Combed Cotton / Loopback French Terry",
      features: "Stiff Double-Lined Hood, 2x2 Heavy Ribbing, Drop Shoulder, Seamless Kangaroo Pocket",
      image: "/images/trycustom_hoodie.png"
    },
    {
      id: "gym-tees",
      name: "Oversized & Athletic Gym Tees",
      ukSearch: "Bespoke Gym T-Shirts UK",
      gsm: "220 - 300 GSM",
      moq: "50 Pcs",
      lead: "14 - 18 Days",
      fabrics: "Heavyweight Cotton Single Jersey / 4-Way Stretch Lycra",
      features: "Thick 1.25-inch Ribbed Collar, Split Hem, Silicon Anti-Chafe Seaming",
      image: "/images/trycustom_gymtee.png"
    },
    {
      id: "tracksuits",
      name: "Cut & Sew Tracksuits & Joggers",
      ukSearch: "Custom Tracksuits Cut & Sew UK",
      gsm: "380 - 450 GSM",
      moq: "30 Sets",
      lead: "18 - 21 Days",
      fabrics: "Brushed Fleece, Interlock Poly-Cotton, Technical Nylon Taslan",
      features: "Deep Zippered Pockets, Custom Drawcord Aglets, Elastic Cuffs",
      image: "/images/trycustom_tracksuit.png"
    },
    {
      id: "varsity",
      name: "Artisan Leather & Wool Varsity Jackets",
      ukSearch: "Custom Varsity Jackets UK",
      gsm: "24oz Melton Wool / Cowhide",
      moq: "20 Pcs",
      lead: "21 - 25 Days",
      fabrics: "Full Grain Leather Sleeves, Quilted Diamond Satin Lining",
      features: "Chenille 3D Varsity Badges, Heavy Metal Snaps, Striped Rib Trim",
      image: "/images/trycustom_varsity.png"
    },
    {
      id: "fightwear",
      name: "MMA Fight Shorts & Rashguards",
      ukSearch: "Custom MMA Fight Wear UK",
      gsm: "240 GSM Spandex Blend",
      moq: "30 Pcs",
      lead: "14 - 18 Days",
      fabrics: "4-Way Poly-Elastane, Reinforced Lycra Crotch Gusset",
      features: "Sublimated Indestructible Graphics, Internal Grip Drawstring",
      image: "/images/trycustom_rashguard.png"
    }
  ];

  const activeProduct = APPAREL_CATEGORIES.find(c => c.id === selectedCategory) || APPAREL_CATEGORIES[0];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SERVICES</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">CUSTOMIZE YOUR PRODUCT</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>INTERACTIVE BESPOKE CLOTHING BUILDER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              CUSTOMIZE YOUR PRODUCT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">SELECT YOUR SILHOUETTE</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Select your custom garment category, choose GSM fabric weights, specify colors, print styles, and trims. Tailored specifically for UK fashion founders, fitness gym chains, combat sports gyms, and retail brands.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>SUBMIT CUSTOM SPEC FOR PRICE (£)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {APPAREL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-[#E21D1D] text-white shadow-[0_0_20px_rgba(226,29,29,0.5)] scale-105"
                  : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Feature & Spec Details */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0b12] border border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                {activeProduct.ukSearch}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase">
                {activeProduct.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Fabric GSM:</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">{activeProduct.gsm}</span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Low UK MOQ:</span>
                <span className="text-sm font-mono font-bold text-emerald-400 mt-1 block">{activeProduct.moq}</span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Production Time:</span>
                <span className="text-sm font-mono font-bold text-white mt-1 block">{activeProduct.lead}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-neutral-300">
                <span className="text-[#E21D1D] font-bold">Fabric Blends: </span>
                <span>{activeProduct.fabrics}</span>
              </div>
              <div className="text-xs font-mono text-neutral-300">
                <span className="text-[#E21D1D] font-bold">Key Custom Features: </span>
                <span>{activeProduct.features}</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/80 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              FACTORY CUSTOMIZATION INCLUDES:
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                <span>Custom Cut & Sew Pattern</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                <span>Screen Print / Puff / Embroidery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                <span>Woven Neck & Care Labels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                <span>Individually Barcoded Polybags</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E21D1D] shrink-0" />
                <span>Express UK Air Freight (DDP)</span>
              </div>
            </div>

            <button
              onClick={handleQuoteClick}
              className="w-full py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-lg cursor-pointer"
            >
              CUSTOMIZE & ORDER ({activeProduct.name})
            </button>
          </div>
        </div>

        {/* 3D Customizer Direct Interactive Lab */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
              LIVE 3D PROTOTYPE LAB
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase">
              EXPERIMENT WITH COLORWAYS & LABELS
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Select panels, test branding placements, and add your custom build directly to your B2B quotation request.
            </p>
          </div>

          <TShirtCustomizer
            product={DEFAULT_CUSTOMIZER_PRODUCT}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};
