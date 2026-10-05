import React from "react";
import { 
  Scissors, 
  Sparkles, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Rotate3d, 
  ShieldCheck, 
  Download, 
  PenTool, 
  Ruler, 
  Palette, 
  Check, 
  ChevronRight,
  Flame,
  Globe2
} from "lucide-react";
import { motion } from "motion/react";

interface PageProps {
  onNavigatePage?: (page: string) => void;
}

export const DesignCustomizationPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const handleQuoteClick = () => {
    if (onNavigatePage) {
      onNavigatePage("b2b-quote");
    } else {
      window.location.href = "#b2b-quote";
    }
  };

  const UK_SEARCH_SERVICES = [
    {
      icon: <PenTool className="w-6 h-6 text-[#E21D1D]" />,
      title: "Complete Tech Pack Creation & CAD Drafting",
      ukKeyword: "Tech Pack Design Services UK",
      desc: "Turn rough sketches, phone photos, or moodboards into factory-ready master CAD specification sheets with full seam callouts, stitch density, and tolerances.",
      points: [
        "Vector flats with multi-angle views (Front, Back, Side, Inseam)",
        "Graded measurement size specs from UK XS to 5XL",
        "Bill of Materials (BOM) & fabric GSM weight certification",
        "Print & embroidery placement mapping with millimeter coordinates"
      ]
    },
    {
      icon: <Ruler className="w-6 h-6 text-[#E21D1D]" />,
      title: "Pattern Making, Fit Grading & UK Silhouette Tailoring",
      ukKeyword: "Bespoke Clothing Pattern Cutter UK",
      desc: "Custom master patterns engineered specifically for UK & European retail fits — from oversized drop-shoulder boxy hoodies to tailored gym stringers and combat fight shorts.",
      points: [
        "True-to-size UK/EU sizing standards (High Street & Luxury)",
        "Custom shrinkage & tension compensation algorithms",
        "Digital Gerber / Lectra pattern grading formats (DXF / PDF)",
        "Precision ergonomic articulation for athletic and fight gear"
      ]
    },
    {
      icon: <Palette className="w-6 h-6 text-[#E21D1D]" />,
      title: "Pantone Color Matching & Custom Fabric Dyeing",
      ukKeyword: "Pantone TCX / TPX Fabric Dyeing UK",
      desc: "Exact color replication matching your brand's Pantone TCX/TPX codes with zero batch-to-batch shade drift and ISO colorfastness grade 4.5+.",
      points: [
        "100% organic cotton, bamboo, French terry & nylon spandex",
        "Acid wash, pigment dye, mineral wash & vintage enzyme fades",
        "Reactive low-impact eco dye baths with zero toxic heavy metals",
        "Lab-dip swatches delivered to UK within 5 business days"
      ]
    },
    {
      icon: <Rotate3d className="w-6 h-6 text-[#E21D1D]" />,
      title: "3D Garment Simulation & Virtual Fit Testing",
      ukKeyword: "3D Virtual Garment Prototyping UK",
      desc: "CLO 3D & Browzwear digital garment renderings that simulate fabric drape, weight, stretch, and 3D puff embroidery before cutting physical fabric.",
      points: [
        "360-degree interactive 3D digital prototypes for client review",
        "Tension heatmaps to diagnose tight spots and stress points",
        "Realistic high-definition 4K 3D renders for pre-order marketing",
        "Reduces physical sample iterations by up to 60%"
      ]
    }
  ];

  const DECORATION_TECHNIQUES = [
    {
      title: "3D Raised High-Density Puff Print",
      spec: "Up to 4mm Elevation",
      detail: "Ultra-sharp silicone puff ink that does not crack or flatten after 100+ commercial wash cycles."
    },
    {
      title: "Japanese Chainstitch & Chenille Varsity",
      spec: "Tajima Precision 12-Color",
      detail: "High-loft wool blend chenille crests with metallic gold/silver thread border chainstitching."
    },
    {
      title: "Sublimation & Screen Discharge Printing",
      spec: "Zero-Handfeel Breathability",
      detail: "Deep pigment discharge that removes shirt dye and replaces with vibrant inks for soft vintage handle."
    },
    {
      title: "Reflective 3M & Glow Silicone",
      spec: "EN ISO 20471 Certified",
      detail: "High-visibility nighttime reflectivity for high-performance athletic and tactical streetwear."
    }
  ];

  return (
    <div className="bg-[#050508] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#E21D1D] selection:text-white">
      {/* Top Breadcrumb & SEO Metadata Bar */}
      <div className="max-w-7xl mx-auto space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button onClick={() => onNavigatePage && onNavigatePage("home")} className="hover:text-white transition-colors">HOME</button>
          <span>/</span>
          <span className="text-neutral-500">SERVICES</span>
          <span>/</span>
          <span className="text-[#E21D1D] font-bold">DESIGN CUSTOMIZATION</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>UK & GLOBAL APPAREL DESIGN SERVICES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              DESIGN CUSTOMIZATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">TECH PACK CREATION</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              Industrial cut & sew pattern drafting, 3D garment CAD rendering, and fabric engineering tailored for British streetwear labels, fitness brands, and fight clubs. From London to Manchester, we turn your creative concepts into production-ready master specs.
            </p>
          </div>

          <button
            onClick={handleQuoteClick}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.45)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" />
            <span>SUBMIT TECH PACK FOR FREE REVIEW</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Core UK Search Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UK_SEARCH_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#E21D1D]/60 transition-all duration-300 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-black/60 border border-neutral-800">
                  {srv.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 border border-white/5">
                  {srv.ukKeyword}
                </span>
              </div>

              <h3 className="text-xl font-display font-black text-white uppercase tracking-wide">
                {srv.title}
              </h3>

              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                {srv.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                {srv.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-mono text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E21D1D] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decoration & Printing Matrix */}
        <div className="p-8 rounded-3xl bg-[#0a0a10] border border-neutral-800 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest">
                PREMIUM EMBELLISHMENT TECHNOLOGIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                SCREEN, EMBROIDERY & HEAT TRANSFER TECHNIQUES
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Tested for 100+ UK Commercial Laundromat Cycles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DECORATION_TECHNIQUES.map((tech, i) => (
              <div key={i} className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#E21D1D]">0{i + 1}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    {tech.spec}
                  </span>
                </div>
                <h4 className="text-sm font-display font-bold text-white uppercase">{tech.title}</h4>
                <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">{tech.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UK Client FAQ & Conversion CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-black border border-[#E21D1D]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E21D1D] uppercase">
              <Globe2 className="w-4 h-4" />
              <span>FOR UK FASHION HOUSES & APPAREL STARTUPS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              HAVE A DESIGN READY IN PHOTOSHOP, ILLUSTRATOR, OR HAND SKETCH?
            </h3>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              Our engineering team reviews your design files within 24 hours, calculates fabric GSM requirements, creates your master CAD tech pack, and issues an official factory price quotation in GBP (£).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleQuoteClick}
              className="px-8 py-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider text-center transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] cursor-pointer"
            >
              REQUEST TECH PACK REVIEW (£ GBP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
