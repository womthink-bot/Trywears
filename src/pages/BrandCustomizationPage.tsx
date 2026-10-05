import React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  Tag, 
  Package, 
  Layers, 
  ShieldCheck, 
  FileCheck, 
  ChevronRight,
  Globe2,
  Barcode,
  Award
} from "lucide-react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const BrandCustomizationPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const BRANDING_ELEMENTS = [
    {
      title: "Woven Damask & High-Density Satin Neck Labels",
      ukKeyword: "Custom Woven Neck Tags UK",
      desc: "High-thread-count damask labels with heat-sealed laser-cut edges that prevent itching and fraying. Options include center-fold, end-fold, mitre-fold, and all-around stitch.",
      specs: ["High-definition 50-denier yarn", "Up to 8 Pantone thread colors", "Soft satin or matte vintage weave", "OEKO-TEX Standard 100 Class 1"]
    },
    {
      title: "Heat-Transfer Tagless Size & Care Labels",
      ukKeyword: "Tagless Care Label Printing UK",
      desc: "Screen-printed tagless neck transfers containing UK size indicators, washing icons, fiber content, and country of origin. Smooth on skin with zero peeling.",
      specs: ["Stretchable elastomeric polyurethane", "Passed 50+ commercial boil washes", "Single-color or full metallic foil", "Compliant with UK Garment Labelling Laws"]
    },
    {
      title: "Luxury Heavyweight Swing Tags & Metal Cord Badges",
      ukKeyword: "Luxury Clothing Swing Tags UK",
      desc: "400–700 GSM duplexed cardstock swing tags with matte velvet lamination, debossed foil stamping, eyelet reinforcement, and black wax cord with branded safety pins.",
      specs: ["FSC Certified luxury stock", "Gold / Silver / Holographic foil stamping", "Matte soft-touch velvet coating", "Custom die-cut geometric shapes"]
    },
    {
      title: "Gunmetal Engraved Aglets & Custom Metal Hardware",
      ukKeyword: "Custom Metal Aglets & Hardware UK",
      desc: "Solid brass & zinc alloy cord ends, eyelets, snaps, and YKK zipper pulls custom engraved or laser-etched with your brand logo in matte black, chrome, or antique bronze.",
      specs: ["Anti-corrosion electroplating", "Heavyweight luxury feel", "Custom millimeter diameter matching", "Available for hoodies, joggers, and shorts"]
    },
    {
      title: "Frosted Matte Zip-Lock Polybags & Barcoding",
      ukKeyword: "Custom Branded Polybags UK",
      desc: "Eco-friendly biodegradable EVA / CPE frosted zip-lock garment bags printed with your logo, ventilation air holes, suffocation warnings, and UK EAN/UPC barcodes.",
      specs: ["70–100 micron heavy gauge", "UK Retail & Amazon FBA compliant", "Anti-static dust-proof zipper", "100% recyclable LDPE / compostable"]
    },
    {
      title: "Rubberized Silicone & 3D TPU Badges",
      ukKeyword: "Custom Silicone & TPU Patches UK",
      desc: "Raised 3D soft PVC, silicone, and reflective TPU chest and arm patches for tactical outerwear, luxury streetwear, and waterproof technical sports jackets.",
      specs: ["Multi-layer 3D relief height", "Sewing channel perimeter", "Velcro hook-and-loop backing option", "High UV and weathering resistance"]
    }
  ];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Breadcrumb & Header */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SERVICES</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">BRAND CUSTOMIZATION</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>100% PRIVATE LABEL & OEM TRIMMING SOLUTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              BRAND CUSTOMIZATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">PRIVATE LABEL PACKAGING</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Complete private label OEM trimming and branded presentation for UK clothing brands. From bespoke woven damask tags and custom engraved metal hardware to frosted zip retail polybags with UK EAN barcoding ready for high-street boutiques and eCommerce fulfillment.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>ORDER BRAND TRIMS SAMPLE PACK</span>
          </button>
        </div>
      </div>

      {/* Grid of Branding Elements */}
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDING_ELEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#E21D1D]">TRIM 0{idx + 1}</span>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 px-2 py-0.5 rounded bg-black/60 border border-white/5">
                    {item.ukKeyword}
                  </span>
                </div>

                <h3 className="text-lg font-display font-black text-white uppercase leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-neutral-800">
                {item.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E21D1D] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* UK E-Commerce & Retail Readiness Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
              RETAIL & AMAZON UK / TIKTOK SHOP READY
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              100% TURNKEY PRIVATE LABEL FOR BRITISH CLOTHING BRANDS
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              Every garment leaves our factory fully finished with your neck tags, wash instructions compliant with UK Trading Standards, swing tags pinned, barcode stickers applied, folded, and sealed in branded frosted polybags. Ready to ship straight into your warehouse or 3PL fulfillment center.
            </p>
          </div>

          <div className="bg-black/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div className="text-xs font-mono text-neutral-400 space-y-2">
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Trims MOQ:</span>
                <span className="text-white font-bold">100 Sets</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Sampling Time:</span>
                <span className="text-emerald-400 font-bold">5 - 7 Days</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>UK Label Compliance:</span>
                <span className="text-white font-bold">100% Guaranteed</span>
              </div>
            </div>

            <button
              onClick={handleQuoteClick}
              className="w-full py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase text-center transition-colors shadow-lg cursor-pointer"
            >
              REQUEST BRAND TRIMS QUOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
