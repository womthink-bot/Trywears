import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "motion/react";
import {
  Rotate3d,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  CheckCircle2,
  Play,
  Pause,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  Sliders,
  Scissors,
  Flame,
  Shirt,
  Building2,
  Sparkles,
  Award,
  PackageCheck,
  Tag,
  Eye,
  Check
} from "lucide-react";

// ============================================================================
// ✦ TRY WEARS REAL BESPOKE WHOLESALE PRODUCTS (CP1 TO CP7)
// High-definition transparent / showcase products isolated strictly to this page.
// Auto-cycles every 2 seconds. Fully responsive on Mobile, Tablet & Desktop.
// ============================================================================

export interface CustomClientProduct {
  id: string;
  name: string;
  clientBrand: string;
  country: string;
  orderVolume: string;
  image: string;
  alt: string;
  badge: string;
  categoryTag: string;
  customizationDetails: string;
  fabricSpecs: string;
  features: string[];
  specs: { label: string; val: string }[];
}

export const CP_PRODUCTS: CustomClientProduct[] = [
  {
    id: "cp-1",
    name: "Custom Pro Athlete Technical Hooded Tracksuit",
    clientBrand: "APEX ATHLETICS CLUB",
    country: "LOS ANGELES, USA",
    orderVolume: "500 PCS ORDER DELIVERED",
    image: "/images/custom-showcase/cp1.webp",
    alt: "Custom Pro Athlete Technical Hooded Tracksuit",
    badge: "HOODED TRACKSUIT",
    categoryTag: "SPORTS & TRACKSUITS",
    customizationDetails: "Bespoke athletic tailored fit, high-density silicone logo, matte gunmetal drawcord aglets, 2-piece articulated hood",
    fabricSpecs: "400 GSM Technical Double-Knit Cotton-Poly Interlock",
    features: [
      "Heavyweight 400 GSM Interlock Fleece",
      "High-Density 3D Silicone Chest Emblem",
      "Ergonomic Zippered Gusset Pockets",
      "Double-Reinforced 4-Needle Flatlock Seams"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 PCS / COLOR" },
      { label: "SAMPLE PROTOTYPE", val: "5-7 DAYS" },
      { label: "FABRIC TECH", val: "400 GSM DOUBLE-KNIT" },
      { label: "CUSTOMIZATION", val: "SILICONE + WOVEN" }
    ]
  },
  {
    id: "cp-2",
    name: "Bespoke Sublimated Championship Match Jersey",
    clientBrand: "VANGUARD FC AUSTRALIA",
    country: "MELBOURNE, AUSTRALIA",
    orderVolume: "650 PCS WHOLESALE BATCH",
    image: "/images/custom-showcase/cp2.webp",
    alt: "Bespoke Sublimated Championship Match Jersey",
    badge: "SUBLIMATION JERSEY",
    categoryTag: "MATCH KITS & JERSEYS",
    customizationDetails: "Zero-fade Italian sublimation, laser-cut ventilation ports, 3D rubberized chest crest, custom player font set",
    fabricSpecs: "190 GSM Aerodynamic Honeycomb Interlock Polyester",
    features: [
      "Zero-Fade Italian Gas Infusion Sublimation",
      "Custom 3D Soft-Rubber Club Crest",
      "Precision Laser-Cut Underarm Airflow Vents",
      "Youth XS to Adult 5XL Full Sizing Chart"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "20 PCS / SQUAD" },
      { label: "SAMPLE PROTOTYPE", val: "4-6 DAYS" },
      { label: "FABRIC TECH", val: "190 GSM AERODYNAMIC" },
      { label: "PRINTING", val: "ITALIAN SUBLIMATION" }
    ]
  },
  {
    id: "cp-3",
    name: "Heavyweight 480GSM French Terry Streetwear Hoodie",
    clientBrand: "NOCTURNE STREETWEAR",
    country: "LONDON, UNITED KINGDOM",
    orderVolume: "400 PCS BESPOKE DROP",
    image: "/images/custom-showcase/cp3.webp",
    alt: "Heavyweight 480GSM French Terry Streetwear Hoodie",
    badge: "480GSM HOODIE",
    categoryTag: "LUXURY STREETWEAR",
    customizationDetails: "Boxy drop-shoulder cut, double-layered stiff hood, high-density 3D puff print, custom woven neck & wash labels",
    fabricSpecs: "480 GSM 100% Pre-Shrunk Combed Loopback Cotton",
    features: [
      "480 GSM 100% Combed Loopback French Terry",
      "Vintage Enzyme Mineral Wash Patina",
      "3.5mm High-Relief 3D Puff Screenprint",
      "Custom Heavy Ribbed Hem & Cuffs"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 PCS / STYLE" },
      { label: "SAMPLE PROTOTYPE", val: "6-8 DAYS" },
      { label: "FABRIC TECH", val: "480 GSM COTTON" },
      { label: "TRIMS", val: "DAMASK WOVEN TAGS" }
    ]
  },
  {
    id: "cp-4",
    name: "Seamless 4-Way Power Compression Gym Training Set",
    clientBrand: "AURA ACTIVE ATHLETICS",
    country: "DUBAI, UAE",
    orderVolume: "450 SETS PRIVATE LABEL",
    image: "/images/custom-showcase/cp4.webp",
    alt: "Seamless 4-Way Power Compression Gym Training Set",
    badge: "COMPRESSION SET",
    categoryTag: "GYM & ACTIVEWEAR",
    customizationDetails: "Muscle-mapped contour ribbing, squat-proof high-denier knit, anti-microbial silver yarn, branded jacquard waistband",
    fabricSpecs: "320 GSM Nylon-Spandex High-Compression Composite",
    features: [
      "4-Way Adaptive Muscle-Flex Compression",
      "Squat-Proof Anti-Sheer Dense Knit Structure",
      "Moisture-Wicking & Anti-Odor Silver Finish",
      "Heat-Sealed Reflective Brand Accents"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 SETS / MODEL" },
      { label: "SAMPLE PROTOTYPE", val: "5-6 DAYS" },
      { label: "FABRIC TECH", val: "320 GSM NYLON-SPANDEX" },
      { label: "STITCHING", val: "SEAMLESS CIRCULAR" }
    ]
  },
  {
    id: "cp-5",
    name: "Custom Top-Grain Leather Combat & Biker Jacket",
    clientBrand: "APEX RIDERS & COMBAT CO.",
    country: "BERLIN, GERMANY",
    orderVolume: "250 PCS CUSTOM ORDER",
    image: "/images/custom-showcase/cp5.webp",
    alt: "Custom Top-Grain Leather Combat & Biker Jacket",
    badge: "FULL-GRAIN LEATHER",
    categoryTag: "LEATHER & COMBAT",
    customizationDetails: "1.2mm drum-dyed Pakistani cowhide leather, heavy-duty antique brass YKK #10 zippers, quilted red silk lining, embossed crest",
    fabricSpecs: "1.2mm A-Grade Full-Grain Drum-Dyed Cowhide",
    features: [
      "100% Genuine Top-Grain Sialkot Cowhide",
      "Heavy-Duty YKK Brass Hardware & Zippers",
      "Quilted Thermal Silk Inner Lining",
      "Hydraulic Heat-Debossed Back Panel Emblem"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "15 PCS (1 PC PROTO)" },
      { label: "SAMPLE PROTOTYPE", val: "7-10 DAYS" },
      { label: "LEATHER GRADE", val: "1.2MM TOP-GRAIN" },
      { label: "HARDWARE", val: "CORROSION-PROOF BRASS" }
    ]
  },
  {
    id: "cp-6",
    name: "Pro Squad Sublimated Performance Warmup Suit",
    clientBrand: "TITAN SPORTS FEDERATION",
    country: "TORONTO, CANADA",
    orderVolume: "380 SETS DELIVERED",
    image: "/images/custom-showcase/cp6.webp",
    alt: "Pro Squad Sublimated Performance Warmup Suit",
    badge: "WARMUP SUIT",
    categoryTag: "TEAMWEAR & WARMUPS",
    customizationDetails: "Full jacket & jogger matching set, contrast sublimated geometric panelling, zippered leg cuffs, breathable mesh lining",
    fabricSpecs: "240 GSM Diamond-Weave Poly-Microfiber with DWR Finish",
    features: [
      "Durable Water-Repellent (DWR) Outer Shield",
      "Breathable Air-Mesh Inner Core Lining",
      "Zippered Ankle Gussets for Easy Boot Fitting",
      "Custom Woven Federation Badges & Sizing"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "20 SETS / SQUAD" },
      { label: "SAMPLE PROTOTYPE", val: "5-7 DAYS" },
      { label: "FABRIC TECH", val: "240 GSM DIAMOND POLY" },
      { label: "FINISH", val: "WATER-RESISTANT DWR" }
    ]
  },
  {
    id: "cp-7",
    name: "Vintage Washed Oversized Heavy Tee & Cargo Utility Set",
    clientBrand: "METROPOLIS APPAREL DIVISION",
    country: "TOKYO, JAPAN",
    orderVolume: "300 SETS LIMITED EDITION",
    image: "/images/custom-showcase/cp7.webp",
    alt: "Vintage Washed Oversized Heavy Tee & Cargo Utility Set",
    badge: "CARGO STREET SET",
    categoryTag: "STREETWEAR & CARGOS",
    customizationDetails: "Drop-shoulder boxy tee, enzyme vintage mineral wash, modular tactical cargo utility pockets, bungee cord hem adjusters",
    fabricSpecs: "300 GSM Combed Cotton Jersey & Reinforced Ripstop Cotton",
    features: [
      "300 GSM Heavy Single Jersey Cotton Top",
      "Tactical 8-Pocket Modular Cargo Pants",
      "Industrial Enzyme Vintage Wash Patina",
      "Custom Engraved Matte Snap Hardware"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 SETS / RUN" },
      { label: "SAMPLE PROTOTYPE", val: "6-8 DAYS" },
      { label: "FABRIC TECH", val: "300 GSM JERSEY+RIPSTOP" },
      { label: "LABELING", val: "WOVEN NECK & FLAGGED" }
    ]
  }
];

export function CustomProductsShowcase() {
  const [products] = useState<CustomClientProduct[]>(CP_PRODUCTS);
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const currentProduct = products[currentProductIdx] || products[0];

  const [viewPreset, setViewPreset] = useState<"standard" | "zoom">("standard");
  const [isHovered, setIsHovered] = useState(false);

  // Subtle interactive mouse tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    damping: 26,
    stiffness: 200
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    damping: 26,
    stiffness: 200
  });

  // Auto-cycle timer: exactly 2 seconds
  useEffect(() => {
    if (!isAutoCycling || isHovered) return;

    const interval = setInterval(() => {
      setCurrentProductIdx((prev) => (prev + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoCycling, isHovered, products.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // RFQ Quote Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    productName: currentProduct.name,
    quantity: "25-50 Pcs (Team / Small Batch)",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handlePrevProduct = () => {
    setCurrentProductIdx((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNextProduct = () => {
    setCurrentProductIdx((prev) =>
      (prev + 1) % products.length
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setFormData({
        name: "",
        contact: "",
        productName: currentProduct.name,
        quantity: "25-50 Pcs (Team / Small Batch)",
        notes: ""
      });
    }, 2500);
  };

  return (
    <section
      id="collections"
      className="relative py-12 sm:py-20 lg:py-28 px-3.5 sm:px-6 lg:px-8 bg-[#050505] text-white overflow-hidden select-none border-b border-neutral-800/80"
    >
      {/* Dynamic Background Ambience - Try Wears Red Brand Aura */}
      <div className="absolute top-1/3 left-1/4 w-[350px] sm:w-[750px] h-[300px] sm:h-[500px] bg-[#E21D1D]/15 rounded-full blur-[140px] sm:blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[250px] sm:h-[400px] bg-red-950/25 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      {/* Cyber Technical Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* TOP SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-neutral-800/80 pb-5 sm:pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono font-black text-[#ff4d4d] tracking-[0.2em] uppercase">
                TRY WEARS BESPOKE OEM & ODM PRIVATE LABEL DIVISION
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-[1.1]">
              CUSTOMIZED READY PRODUCTS FOR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                GLOBAL BRANDS & CLUBS
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed pt-0.5">
              End-to-end bespoke manufacturing for international apparel wholesalers, fitness chains, and combat federations — complete with custom brand crests, Pantone color matching, Italian sublimation, and retail-ready private labeling.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, productName: currentProduct.name }));
                setIsModalOpen(true);
              }}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>START CUSTOM ORDER</span>
            </button>
            <a
              href="#customizer"
              className="px-3.5 sm:px-4 py-3 rounded-xl bg-[#15151e] hover:bg-[#1e1e2c] text-neutral-200 hover:text-white border border-neutral-700 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>3D LAB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff4d4d]" />
            </a>
          </div>
        </div>

        {/* ✦ 7 CUSTOM PRODUCTS TABS SELECTOR (CP1 TO CP7) - SMOOTH MOBILE HORIZONTAL SCROLL */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {products.map((prod, idx) => {
            const isSelected = currentProductIdx === idx;
            return (
              <button
                key={prod.id}
                onClick={() => {
                  setCurrentProductIdx(idx);
                  setIsAutoCycling(false);
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border shrink-0 ${
                  isSelected
                    ? "bg-[#E21D1D] text-white border-[#E21D1D] shadow-[0_0_20px_rgba(226,29,29,0.4)] font-black scale-102"
                    : "bg-[#121219] hover:bg-[#1a1a24] text-neutral-300 hover:text-white border-neutral-700"
                }`}
              >
                <span className={`text-[10px] font-bold ${isSelected ? "text-white" : "text-[#ff4d4d]"}`}>
                  [0{idx + 1}]
                </span>
                <span>{prod.badge}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN PRODUCT SHOWCASE CONTAINER */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="relative"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="rounded-3xl bg-[#0e0e14] border border-neutral-700 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden transition-shadow duration-300 hover:border-[#E21D1D]"
          >
            {/* Top Tactical Status Bar with 2-Second Auto-Change Progress Bar */}
            <div className="relative border-b border-neutral-700/80 bg-[#12121a] backdrop-blur-md">
              {/* ✦ 2-SECOND ANIMATED PROGRESS INDICATOR */}
              {isAutoCycling && (
                <motion.div
                  key={currentProductIdx}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-red-600 via-[#ff3333] to-red-400 z-30 shadow-[0_0_8px_#E21D1D]"
                />
              )}

              <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 text-[10px] font-mono tracking-wider text-neutral-300 gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse shrink-0" />
                  <span className="text-white font-black uppercase truncate">
                    TRY WEARS • PRODUCT SHOWCASE
                  </span>
                  <span className="hidden md:inline text-neutral-600">|</span>
                  <span className="hidden md:inline text-emerald-400 font-bold">
                    AUTO-CHANGING EVERY 2 SECONDS
                  </span>
                </div>

                {/* Auto-Cycle Control & Zoom View */}
                <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-black uppercase transition-colors cursor-pointer flex items-center gap-1 border ${
                      isAutoCycling
                        ? "bg-[#E21D1D]/25 border-[#ff4d4d] text-[#ff4d4d]"
                        : "bg-[#181824] border-neutral-700 text-neutral-300 hover:text-white"
                    }`}
                    title={isAutoCycling ? "Pause 2s Auto Change" : "Resume 2s Auto Change"}
                  >
                    {isAutoCycling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isAutoCycling ? "2S AUTO: ON" : "PAUSED"}</span>
                  </button>

                  <button
                    onClick={() => setViewPreset(viewPreset === "standard" ? "zoom" : "standard")}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-black uppercase transition-colors cursor-pointer border ${
                      viewPreset === "zoom"
                        ? "bg-[#E21D1D] text-white border-[#E21D1D]"
                        : "bg-[#181824] text-neutral-300 border-neutral-700 hover:text-white"
                    }`}
                  >
                    {viewPreset === "zoom" ? "FIT" : "MAX ZOOM"}
                  </button>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN GRID: Left Large Product Stage | Right Custom Technical Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[auto] lg:min-h-[680px]">
              
              {/* LEFT STAGE (7 COLS): Clean Studio Backdrop + HUGE PRODUCT IMAGE FITTING THE BOX */}
              <div className="lg:col-span-7 relative bg-[#07070a] border-b lg:border-b-0 lg:border-r border-neutral-700/80 overflow-hidden flex flex-col justify-between p-3.5 sm:p-5">
                
                {/* ✦ Clean Studio Spotlight Backdrop */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(226, 29, 29, 0.12) 0%, rgba(22, 22, 30, 0.6) 50%, #07070a 90%)"
                  }}
                />

                {/* Top Overlay: Client Brand Badge for Current Product */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className="bg-[#14141e]/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-xl border border-neutral-700 text-[10px] font-mono text-neutral-200 flex items-center gap-2 shadow-lg"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0" />
                      <span className="text-white font-bold truncate max-w-[140px] sm:max-w-none">{currentProduct.clientBrand}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-emerald-400 font-black">{currentProduct.orderVolume}</span>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="px-2.5 py-1 rounded-lg bg-[#14141e]/95 border border-neutral-700 text-[9px] font-mono font-black text-neutral-200 uppercase">
                      {currentProduct.badge}
                    </span>
                  </div>
                </div>

                {/* ✦ CENTER MAIN PRODUCT VIEWPORT: Flexible responsive scaling */}
                <div className="relative z-10 flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] my-2 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: viewPreset === "zoom" ? 1.15 : 1.02 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      {/* Realistic floor contact shadow underneath the product */}
                      <div className="absolute -bottom-3 w-56 sm:w-80 lg:w-[440px] h-7 bg-black/90 rounded-[100%] blur-xl pointer-events-none" />

                      {/* HUGE HIGH-DEFINITION CLOTHING IMAGE */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center p-1">
                        <img
                          src={currentProduct.image}
                          alt={currentProduct.alt}
                          className="h-[280px] sm:h-[400px] lg:h-[490px] w-auto max-w-[94%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] select-none transition-transform duration-300 hover:scale-105"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ✦ 7 MINI THUMBNAIL SELECTORS (Shows all 7 real custom products, fully scrollable on phone) */}
                <div className="relative z-20 space-y-1.5 pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-[#ff4d4d]" />
                      <span className="font-bold">7 READY WHOLESALER DESIGNS:</span>
                    </span>
                    <span className="text-white font-black">
                      [0{currentProductIdx + 1} / 0{products.length}]
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto sm:grid sm:grid-cols-7 pb-1 scrollbar-none">
                    {products.map((prod, pIdx) => {
                      const isSelected = currentProductIdx === pIdx;
                      return (
                        <button
                          key={prod.id}
                          onClick={() => {
                            setCurrentProductIdx(pIdx);
                            setIsAutoCycling(false);
                          }}
                          className={`p-1 sm:p-1.5 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center shrink-0 w-[58px] sm:w-auto ${
                            isSelected
                              ? "bg-[#181824] border-[#E21D1D] shadow-[0_0_15px_rgba(226,29,29,0.4)] ring-1 ring-[#E21D1D]"
                              : "bg-[#111118] border-neutral-700 hover:border-neutral-500 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <div className="w-7 h-9 sm:w-9 sm:h-11 flex items-center justify-center">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                            />
                          </div>
                          <span className="text-[8px] font-mono font-black text-neutral-200 block truncate w-full mt-0.5">
                            0{pIdx + 1}
                          </span>
                          {isSelected && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT TECHNICAL & ORDER SPECIFICATION PANEL (5 COLS) */}
              <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-[#0e0e16] relative space-y-6">
                
                {/* Red Brand Corner Accent Marks */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#ff3333]" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#ff3333]" />

                <div className="space-y-4">
                  {/* Category Identifier & Code */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black text-[#ff4d4d] tracking-widest uppercase">
                      PRODUCT [0{currentProductIdx + 1} / 0{products.length}]
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#181824] border border-neutral-700 text-[9px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      WHOLESALE READY
                    </span>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                      {currentProduct.categoryTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black uppercase text-white tracking-tight leading-tight">
                      {currentProduct.name}
                    </h3>
                  </div>

                  {/* ✦ DYNAMIC CLIENT PRODUCT CALLOUT */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 rounded-2xl bg-[#14141e] border border-neutral-700 border-l-4 border-l-[#E21D1D] space-y-2 shadow-lg"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-black text-white uppercase">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0" />
                          <span className="truncate max-w-[160px] sm:max-w-none">CLIENT: {currentProduct.clientBrand}</span>
                        </div>
                        <span className="text-[9px] text-[#ff4d4d] bg-[#E21D1D]/15 px-2 py-0.5 rounded border border-[#E21D1D]/40 shrink-0 font-bold">
                          {currentProduct.country}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                        {currentProduct.customizationDetails}
                      </p>
                      <p className="text-xs text-neutral-300 font-sans">
                        Fabric Tech: <strong className="text-white font-bold">{currentProduct.fabricSpecs}</strong>
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Prominent Custom Capability Notice */}
                  <div className="p-3.5 rounded-2xl bg-[#121219] border border-neutral-700 text-xs font-sans text-neutral-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-white text-xs uppercase">
                      <Scissors className="w-3.5 h-3.5 text-[#ff4d4d]" />
                      <span>DIRECT FACTORY OEM/ODM FACILITY</span>
                    </div>
                    <p className="leading-relaxed">
                      Direct OEM/ODM production in Sialkot with bespoke Pantone color matching, 3D silicone crests, high-density puff printing, and certified ISO 9001 export quality standards.
                    </p>
                  </div>

                  {/* Product Technical Features Grid */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider block">
                      FACTORY STANDARDS & CUSTOM OPTIONS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentProduct.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 p-2 rounded-xl bg-[#151520] border border-neutral-700/80 text-xs font-mono text-neutral-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3333] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Factory Specs (MOQ, Turnaround, Fabric Tech) */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                    {currentProduct.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-[#151520] border border-neutral-700">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase block font-bold">
                          {sp.label}
                        </span>
                        <span className="text-xs font-mono font-black text-white uppercase block mt-0.5 truncate">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Order Controls & Category Switcher */}
                <div className="pt-4 space-y-3.5 border-t border-neutral-800">
                  
                  {/* Primary CTA Buttons */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, productName: currentProduct.name }));
                        setIsModalOpen(true);
                      }}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(226,29,29,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>ORDER THIS CUSTOM PRODUCT</span>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={handlePrevProduct}
                        className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] text-white border border-neutral-700 hover:border-[#E21D1D] transition-colors cursor-pointer"
                        title="Previous Custom Product"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextProduct}
                        className="p-3 rounded-xl bg-[#181824] hover:bg-[#202030] text-white border border-neutral-700 hover:border-[#E21D1D] transition-colors cursor-pointer"
                        title="Next Custom Product"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Quick Specs Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ff4d4d]" />
                      <span>ISO 9001 SIALKOT FACTORY DIRECT</span>
                    </div>
                    <span className="text-white font-black">24H CAD MOCKUPS</span>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </div>

        {/* BOTTOM FACTORY CAPABILITY PROMISES - RESPONSIVE 3 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-[#121219] border border-neutral-700 flex items-center gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/40 flex items-center justify-center text-[#ff4d4d] shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                ANY PRODUCT, ANY CUT
              </h4>
              <p className="text-[11px] font-sans text-neutral-300 mt-0.5">
                Send your tech pack or sketch — we deliver exact physical prototypes in 7 days.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121219] border border-neutral-700 flex items-center gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/40 flex items-center justify-center text-[#ff4d4d] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                LOW 50–100 PCS MOQ
              </h4>
              <p className="text-[11px] font-sans text-neutral-300 mt-0.5">
                Flexible low-minimum production runs tailored for startups and pro gyms.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121219] border border-neutral-700 flex items-center gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/40 flex items-center justify-center text-[#ff4d4d] shrink-0">
              <Rotate3d className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                3D CAD PREVIEWS
              </h4>
              <p className="text-[11px] font-sans text-neutral-300 mt-0.5">
                360-degree digital CLO-3D simulation approved prior to bulk cutting.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* CUSTOM RFQ / QUOTE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#12121a] border border-neutral-700 rounded-3xl p-5 sm:p-8 max-w-lg w-full text-white shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1c28] text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#E21D1D]/20 text-[#ff4d4d] flex items-center justify-center mx-auto border border-[#E21D1D]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-mono font-black uppercase text-white">
                    INQUIRY MOOSOOL HO GAYI!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-200 font-sans max-w-sm mx-auto leading-relaxed">
                    Try Wears production team aapki custom design requirements check kar ke 12 ghanton ke andar WhatsApp ya email par rabta karegi.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <span className="text-[10px] font-mono text-[#ff4d4d] font-black uppercase tracking-widest block">
                      TRY WEARS BESPOKE ORDER
                    </span>
                    <h3 className="text-lg sm:text-2xl font-mono font-black uppercase mt-1 text-white">
                      CUSTOM PRODUCT ORDER ESTIMATE
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans mt-1">
                      Batayein aapko kis tarah ki custom tailoring ya private label manufacturing chahiye.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-300 uppercase font-bold block mb-1">
                        Selected Product
                      </label>
                      <select
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        className="w-full bg-[#1a1a24] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.badge})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase font-bold block mb-1">
                          Name / Brand *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name / Brand"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#1a1a24] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase font-bold block mb-1">
                          WhatsApp / Email *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="WhatsApp / Email"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full bg-[#1a1a24] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-300 uppercase font-bold block mb-1">
                        Quantity
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-[#1a1a24] border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                      >
                        <option>1-5 Pcs (Sample Prototype)</option>
                        <option>25-50 Pcs (Team Order / Small Run)</option>
                        <option>100-300 Pcs (Commercial Production)</option>
                        <option>500+ Pcs (Large Wholesale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-300 uppercase font-bold block mb-1">
                        Custom Requirements / Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Sublimation football kits with custom gold crest, or 500 GSM boxy hoodies..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#1a1a24] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(226,29,29,0.35)]"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
