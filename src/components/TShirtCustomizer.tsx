import React, { useState } from "react";
import { Check, ShieldCheck, Cpu, Flame, Hammer, Users, RotateCw, Trophy, Sparkles, Layers, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, CartItem } from "../types";

interface TShirtCustomizerProps {
  product: Product;
  onAddToCart: (cartItem: CartItem) => void;
}

export type GearType = "hoodie" | "tracksuit" | "tee" | "gloves" | "shorts" | "robe";
export type ViewMode = "front" | "back";
export type DesignPatternStyle = "chevron" | "racing" | "split" | "carbon" | "minimal";

interface TeamPreset {
  id: string;
  name: string;
  badge: string;
  city: string;
  tagline: string;
  athleteName: string;
  squadNumber: string;
  gearType: GearType;
  designStyle: DesignPatternStyle;
  bodyColorId: string;
  contrastColorId: string;
  trimColorId: string;
  teamCode: string;
}

const REAL_TEAM_SAMPLES: TeamPreset[] = [
  {
    id: "strike-force",
    name: "Strike Force MMA",
    badge: "🥊",
    city: "Las Vegas Combat Pro",
    tagline: "CHAMPIONSHIP SQUAD",
    athleteName: "STRIKE FORCE",
    squadNumber: "09",
    gearType: "hoodie",
    designStyle: "chevron",
    bodyColorId: "charcoal",
    contrastColorId: "accent-crimson",
    trimColorId: "crimson",
    teamCode: "SF-2026"
  },
  {
    id: "apex-boxing",
    name: "Apex Boxing Academy",
    badge: "🏆",
    city: "Brooklyn Fight Club",
    tagline: "GOLDEN GLOVES SQUAD",
    athleteName: "APEX SQUAD",
    squadNumber: "01",
    gearType: "tracksuit",
    designStyle: "racing",
    bodyColorId: "gold",
    contrastColorId: "carbon",
    trimColorId: "gold",
    teamCode: "APX-GOLD"
  },
  {
    id: "titan-crew",
    name: "Titan Fight Team",
    badge: "⚡",
    city: "London Ring League",
    tagline: "HEAVYWEIGHT DIVISION",
    athleteName: "TITAN CREW",
    squadNumber: "77",
    gearType: "shorts",
    designStyle: "split",
    bodyColorId: "teal",
    contrastColorId: "accent-teal",
    trimColorId: "gold",
    teamCode: "TTN-77"
  },
  {
    id: "viper-mma",
    name: "Viper Combat Club",
    badge: "⚔️",
    city: "Tokyo International Ring",
    tagline: "TOURNAMENT CORNER",
    athleteName: "VIPER COMBAT",
    squadNumber: "12",
    gearType: "tee",
    designStyle: "carbon",
    bodyColorId: "white",
    contrastColorId: "accent-crimson",
    trimColorId: "crimson",
    teamCode: "VPR-12"
  },
  {
    id: "ironclad-sparring",
    name: "Ironclad Sparring Guild",
    badge: "🛡️",
    city: "Chicago Golden Ring",
    tagline: "ELITE ARMORY ROSTER",
    athleteName: "IRONCLAD",
    squadNumber: "05",
    gearType: "gloves",
    designStyle: "minimal",
    bodyColorId: "charcoal",
    contrastColorId: "carbon",
    trimColorId: "crimson",
    teamCode: "IRN-05"
  },
  {
    id: "monarch-robe",
    name: "Monarch Dynasty Clan",
    badge: "👑",
    city: "Monaco Grand Fight Night",
    tagline: "ROYAL CHAMPION WALKOUT",
    athleteName: "DYNASTY",
    squadNumber: "88",
    gearType: "robe",
    designStyle: "minimal",
    bodyColorId: "charcoal",
    contrastColorId: "accent-gold",
    trimColorId: "gold",
    teamCode: "MNR-88"
  }
];

const BODY_COLORS = [
  { id: "charcoal", name: "Stealth Charcoal Black", hex: "#171719", isPremium: false, gradient: "bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700" },
  { id: "teal", name: "Championship Try Teal", hex: "#0d9488", isPremium: true, gradient: "bg-gradient-to-r from-teal-700 to-teal-500 border border-teal-400" },
  { id: "crimson", name: "Matte Crimson Red", hex: "#e21d1d", isPremium: false, gradient: "bg-gradient-to-r from-red-700 to-red-500 border border-red-400" },
  { id: "white", name: "Elite Pristine White", hex: "#f3f4f6", isPremium: true, gradient: "bg-gradient-to-r from-neutral-100 to-white border border-neutral-200" },
  { id: "gold", name: "Monarch Royal Gold", hex: "#D4AF37", isPremium: true, gradient: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 border border-amber-300" }
];

const CONTRAST_COLORS = [
  { id: "match", name: "Match Body Fabric", hex: "match" },
  { id: "carbon", name: "Composite Carbon Matte", hex: "#101012" },
  { id: "accent-teal", name: "Try Teal Highlight", hex: "#0d9488" },
  { id: "accent-crimson", name: "Crimson Red Strike", hex: "#e21d1d" },
  { id: "accent-gold", name: "Gold Foil Strike", hex: "#D4AF37" }
];

const TRIM_COLORS = [
  { id: "gold", name: "24K Gold Trim", hex: "#D4AF37" },
  { id: "black", name: "Stealth Charcoal Trim", hex: "#1c1c1e" },
  { id: "teal", name: "Teal Tech Trim", hex: "#0d9488" },
  { id: "crimson", name: "Crimson Strike Trim", hex: "#e21d1d" }
];

const DESIGN_PATTERNS: { id: DesignPatternStyle; name: string; desc: string; icon: string }[] = [
  { id: "chevron", name: "Chevron Armor Cut", desc: "Aggressive V-shaped chest & shoulder flight strike", icon: "📐" },
  { id: "racing", name: "Speed Racing Stripes", desc: "Dual aerodynamic speed stripes along lateral seams", icon: "⚡" },
  { id: "split", name: "Diagonal Split Cut", desc: "Modern asymmetrical dual-tone combat aesthetic", icon: "🔲" },
  { id: "carbon", name: "Hex-Carbon Weave", desc: "High-density technical carbon fiber textured panels", icon: "🕸️" },
  { id: "minimal", name: "Monarch Minimalist", desc: "Solid executive body with regal gold piping accents", icon: "👑" }
];

const GEAR_CONFIG: Record<GearType, { name: string; subtitle: string; basePrice: number; icon: string }> = {
  hoodie: {
    name: "COMBAT PRO TEAM HOODIE",
    subtitle: "Heavyweight 450GSM French terry warmup hoodie with lined 3D hood, metal aglet drawstrings, kangaroo pocket, and athlete back print.",
    basePrice: 135.0,
    icon: "🧥"
  },
  tracksuit: {
    name: "FULL TEAM TRACKSUIT (2-PIECE)",
    subtitle: "Complete team warmup suit including zip-up corner jacket with racing stripes and tapered athletic track joggers.",
    basePrice: 195.0,
    icon: "🏃"
  },
  tee: {
    name: "CUSTOM ATHLETIC TEE / RASHGUARD",
    subtitle: "Engineered raglan compression jersey with dynamic chest insignia, moisture-wicking weave, and personalized squad number.",
    basePrice: 65.0,
    icon: "👕"
  },
  gloves: {
    name: "SOVEREIGN PRO BOXING GLOVES",
    subtitle: "Handcrafted 16oz lace-up sparring gloves with custom thumb contrast, wrist cuff, and athlete gym moniker.",
    basePrice: 185.0,
    icon: "🥊"
  },
  shorts: {
    name: "APEX MMA & MUAY THAI SHORTS",
    subtitle: "Tournament satin microfiber fight shorts with curved side-slits, custom waistband and club emblem.",
    basePrice: 78.0,
    icon: "🩳"
  },
  robe: {
    name: "CHAMPIONSHIP WALKOUT ROBE",
    subtitle: "Elite satin corner walkout fight robe with oversized ceremonial hood, wide gold lapels, and custom team back arch.",
    basePrice: 165.0,
    icon: "🥋"
  }
};

export const TShirtCustomizer: React.FC<TShirtCustomizerProps> = ({ product, onAddToCart }) => {
  const [activeGear, setActiveGear] = useState<GearType>("hoodie");
  const [viewMode, setViewMode] = useState<ViewMode>("front");
  const [designStyle, setDesignStyle] = useState<DesignPatternStyle>("chevron");
  const [activeTeamSample, setActiveTeamSample] = useState<string | null>("strike-force");

  // Color states
  const [bodyColor, setBodyColor] = useState(BODY_COLORS[0]); // Stealth Charcoal
  const [contrastColor, setContrastColor] = useState(CONTRAST_COLORS[3]); // Crimson
  const [trimColor, setTrimColor] = useState(TRIM_COLORS[3]); // Crimson
  const [size, setSize] = useState("L");
  const [customName, setCustomName] = useState("STRIKE FORCE");
  const [squadNumber, setSquadNumber] = useState("09");
  const [gloveWeight, setGloveWeight] = useState("16oz");
  const [isTeamOrder, setIsTeamOrder] = useState(false);
  const [teamQuantity, setTeamQuantity] = useState(15);

  // Apply a 1-click real team sample
  const handleApplyTeamSample = (sample: TeamPreset) => {
    setActiveTeamSample(sample.id);
    setActiveGear(sample.gearType);
    setDesignStyle(sample.designStyle);
    setCustomName(sample.athleteName);
    setSquadNumber(sample.squadNumber);

    const bColor = BODY_COLORS.find((c) => c.id === sample.bodyColorId) || BODY_COLORS[0];
    const cColor = CONTRAST_COLORS.find((c) => c.id === sample.contrastColorId) || CONTRAST_COLORS[1];
    const tColor = TRIM_COLORS.find((c) => c.id === sample.trimColorId) || TRIM_COLORS[0];

    setBodyColor(bColor);
    setContrastColor(cColor);
    setTrimColor(tColor);
  };

  // Price Calculation
  const currentGearConfig = GEAR_CONFIG[activeGear];
  let singleItemPrice = currentGearConfig.basePrice;
  if (bodyColor.isPremium) singleItemPrice += 15;
  if (contrastColor.hex !== "match" && contrastColor.hex !== "#101012") singleItemPrice += 10;
  if (trimColor.id === "gold") singleItemPrice += 10;
  if (designStyle === "carbon" || designStyle === "chevron") singleItemPrice += 8;

  let unitPrice = singleItemPrice;
  let discountPercentage = 0;
  if (isTeamOrder) {
    if (teamQuantity >= 25) {
      discountPercentage = 25;
    } else if (teamQuantity >= 10) {
      discountPercentage = 15;
    }
    unitPrice = singleItemPrice * (1 - discountPercentage / 100);
  }

  const finalOrderTotal = isTeamOrder ? unitPrice * teamQuantity : unitPrice;
  const activeContrastHex = contrastColor.hex === "match" ? bodyColor.hex : contrastColor.hex;

  const handleAddCustomToCart = () => {
    const customizedProduct: Product = {
      ...product,
      id: `custom-${activeGear}-${Date.now()}`,
      name: `Try Wears ${currentGearConfig.name} (${customName || "Custom"})`,
      price: `$${unitPrice.toFixed(2)}`,
      category: "Bespoke Custom",
      image:
        activeGear === "gloves"
          ? "/media/home-page/b2b-calculator-section/boxing-gloves.jpg"
          : activeGear === "shorts"
          ? "/media/home-page/catalog-section/prod-9-shorts.jpg"
          : activeGear === "tracksuit"
          ? "/media/home-page/catalog-section/prod-7-tracksuit.jpg"
          : activeGear === "hoodie"
          ? "/media/home-page/catalog-section/prod-3-hoodie.jpg"
          : activeGear === "robe"
          ? "/media/home-page/b2b-calculator-section/fight-robe.jpg"
          : "/media/home-page/catalog-section/prod-8-tee.jpg"
    };

    onAddToCart({
      product: customizedProduct,
      quantity: isTeamOrder ? teamQuantity : 1,
      selectedSize: size,
      customization: {
        gearType: activeGear,
        designStyle: designStyle,
        primaryColor: bodyColor.name,
        contrastColor: contrastColor.name,
        trimColor: trimColor.name,
        athleteName: customName || "TEAM",
        squadNumber: squadNumber || "01",
        weightOrSize: activeGear === "gloves" ? gloveWeight : size,
        orderMode: isTeamOrder ? `Squad Order (${teamQuantity} pcs)` : "Single Athlete",
        teamPreset: activeTeamSample || "Try Wears Custom Lab"
      }
    });
  };

  const hasBackView = activeGear !== "gloves";

  return (
    <div id="customizer-container" className="space-y-10 max-w-7xl mx-auto px-6 py-8">
      {/* 1. REAL TEAM DESIGN SAMPLES / PRESETS STRIP */}
      <div className="bg-neutral-900/60 dark:bg-neutral-950/80 border border-neutral-200/50 dark:border-neutral-800 rounded-3xl p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D]">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                AUTHENTIC CLUB & SQUAD KITS
              </span>
              <h3 className="text-sm font-display font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                REAL TEAM DESIGN SAMPLES (1-CLICK PRESETS)
              </h3>
            </div>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Click any pro team to load authentic combat colorways, patterns & roster insignias
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {REAL_TEAM_SAMPLES.map((sample) => {
            const isSelected = activeTeamSample === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => handleApplyTeamSample(sample)}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "border-[#E21D1D] bg-[#E21D1D]/10 dark:bg-[#E21D1D]/15 shadow-lg shadow-[#E21D1D]/10"
                    : "border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{sample.badge}</span>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase">
                    {sample.teamCode}
                  </span>
                </div>
                <span className="font-display font-black text-xs text-neutral-900 dark:text-white uppercase leading-tight group-hover:text-[#E21D1D] transition-colors truncate w-full">
                  {sample.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono mt-1 truncate w-full">
                  {sample.city}
                </span>
                <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                  <span className="uppercase font-bold text-[#E21D1D]">#{sample.squadNumber}</span>
                  <span className="uppercase">{sample.gearType}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GEAR SELECTION TABS (HOODIE, TRACKSUIT, TEE, GLOVES, SHORTS, ROBE) */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-2xl max-w-4xl mx-auto border border-neutral-200 dark:border-neutral-800">
        {(Object.keys(GEAR_CONFIG) as GearType[]).map((gearKey) => {
          const cfg = GEAR_CONFIG[gearKey];
          const isActive = activeGear === gearKey;
          return (
            <button
              key={gearKey}
              onClick={() => {
                setActiveGear(gearKey);
                setActiveTeamSample(null);
              }}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-display font-black text-xs tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-[#E21D1D] dark:text-white shadow-md"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span>{cfg.icon}</span>
              <span>
                {gearKey === "hoodie"
                  ? "Combat Hoodie"
                  : gearKey === "tracksuit"
                  ? "Full Tracksuit"
                  : gearKey === "tee"
                  ? "Athletic Tee"
                  : gearKey === "gloves"
                  ? "Boxing Gloves"
                  : gearKey === "shorts"
                  ? "Fight Shorts"
                  : "Walkout Robe"}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. DESIGN PATTERN / CUT VARIATIONS SELECTOR */}
      <div className="bg-neutral-50 dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <Layers className="w-4 h-4 text-[#E21D1D]" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
              DESIGN CUT & PATTERNS
            </span>
            <span className="text-xs font-display font-bold dark:text-white uppercase">
              MUKHTALIF DESIGN VARIATIONS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full md:w-auto">
          {DESIGN_PATTERNS.map((pat) => (
            <button
              key={pat.id}
              onClick={() => {
                setDesignStyle(pat.id);
                setActiveTeamSample(null);
              }}
              className={`px-3 py-2 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2 ${
                designStyle === pat.id
                  ? "border-[#E21D1D] bg-[#E21D1D]/10 dark:bg-[#E21D1D]/15 text-[#E21D1D]"
                  : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              <span className="text-sm">{pat.icon}</span>
              <span className="text-[10px] font-display font-bold uppercase truncate">{pat.name.split(" ")[0]} Cut</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN CUSTOMIZER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: REALISTIC INTERACTIVE VECTOR CANVAS */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/60 dark:border-neutral-900 p-8 rounded-3xl relative overflow-hidden min-h-[580px]">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e21d1d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Bar: Front / Back View Toggle */}
          {hasBackView && (
            <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setViewMode("front")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "front"
                    ? "bg-[#E21D1D] text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                FRONT VIEW
              </button>
              <button
                onClick={() => setViewMode("back")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "back"
                    ? "bg-[#E21D1D] text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <RotateCw className="w-3 h-3" />
                BACK NUMBER
              </button>
            </div>
          )}

          {/* Top Right: Active Team & Cut Badge */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-xl text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold dark:text-white uppercase">{customName || "REAL TEAM"}</span>
            <span className="text-[#E21D1D] font-bold">#{squadNumber}</span>
          </div>

          {/* DYNAMIC SVG CANVAS */}
          <div className="w-full max-w-[480px] relative z-10 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_25px_40px_rgba(226,29,29,0.08)] my-4">
            
            {/* 1. PRO TEAM HOODIE (FRONT & BACK) */}
            {activeGear === "hoodie" && (
              <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Hex-Carbon pattern if selected */}
                  <pattern id="hoodie-carbon-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                    <path d="M 6,0 L 12,3.5 L 12,10.5 L 6,14 L 0,10.5 L 0,3.5 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>

                {viewMode === "front" ? (
                  <>
                    {/* Outer Hood Volume (Back/Sides) */}
                    <path
                      d="M 180,120 C 170,40 210,15 250,15 C 290,15 330,40 320,120 Z"
                      fill="#0e0e11"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth="2"
                    />
                    {/* Inner Hood Lining (Colored with Contrast) */}
                    <path
                      d="M 195,115 C 195,55 220,35 250,35 C 280,35 305,55 305,115 C 285,130 215,130 195,115 Z"
                      fill={activeContrastHex}
                      className="transition-colors duration-500"
                    />

                    {/* Left Sleeve */}
                    <path
                      d="M 140,120 L 45,260 L 95,285 L 155,220 Z"
                      fill={activeContrastHex}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth="2"
                      className="transition-colors duration-500"
                    />
                    {/* Left Ribbed Wrist Cuff */}
                    <path d="M 45,260 L 35,285 L 85,310 L 95,285 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />

                    {/* Right Sleeve */}
                    <path
                      d="M 360,120 L 455,260 L 405,285 L 345,220 Z"
                      fill={activeContrastHex}
                      stroke="rgba(0,0,0,0.2)"
                      strokeWidth="2"
                      className="transition-colors duration-500"
                    />
                    {/* Right Ribbed Wrist Cuff */}
                    <path d="M 455,260 L 465,285 L 415,310 L 405,285 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />

                    {/* Main Hoodie Torso Body */}
                    <path
                      d="M 180,120 L 320,120 L 360,120 L 345,430 L 155,430 L 140,120 Z"
                      fill={bodyColor.hex}
                      stroke="rgba(0,0,0,0.25)"
                      strokeWidth="2.5"
                      className="transition-colors duration-500"
                    />

                    {/* DESIGN PATTERNS ON HOODIE */}
                    {designStyle === "chevron" && (
                      <path
                        d="M 145,160 L 250,230 L 355,160 L 352,200 L 250,270 L 148,200 Z"
                        fill={trimColor.hex}
                        className="transition-colors duration-500 opacity-90"
                      />
                    )}
                    {designStyle === "racing" && (
                      <>
                        <line x1="140" y1="120" x2="45" y2="260" stroke={trimColor.hex} strokeWidth="6" />
                        <line x1="360" y1="120" x2="455" y2="260" stroke={trimColor.hex} strokeWidth="6" />
                        <line x1="175" y1="120" x2="170" y2="430" stroke={trimColor.hex} strokeWidth="4" />
                        <line x1="325" y1="120" x2="330" y2="430" stroke={trimColor.hex} strokeWidth="4" />
                      </>
                    )}
                    {designStyle === "split" && (
                      <path
                        d="M 140,120 L 320,120 L 200,430 L 155,430 Z"
                        fill={activeContrastHex}
                        className="transition-colors duration-500 opacity-80"
                      />
                    )}
                    {designStyle === "carbon" && (
                      <rect x="155" y="120" width="190" height="310" fill="url(#hoodie-carbon-grid)" className="pointer-events-none" />
                    )}

                    {/* Kangaroo Front Pouch */}
                    <path
                      d="M 175,310 L 325,310 L 335,420 L 165,420 Z"
                      fill="#121215"
                      stroke={trimColor.hex}
                      strokeWidth="2"
                    />
                    {/* Pouch hand entries */}
                    <line x1="175" y1="310" x2="165" y2="380" stroke={trimColor.hex} strokeWidth="3" />
                    <line x1="325" y1="310" x2="335" y2="380" stroke={trimColor.hex} strokeWidth="3" />

                    {/* Bottom Ribbed Waistband Hem */}
                    <rect x="150" y="430" width="200" height="28" fill="#111114" stroke={trimColor.hex} strokeWidth="1.5" />

                    {/* Hood Drawstrings with Metal Aglets */}
                    <path d="M 225,120 Q 220,170 215,220" stroke="#f3f4f6" strokeWidth="3" fill="none" />
                    <rect x="212" y="220" width="6" height="14" fill={trimColor.hex} rx="1" />

                    <path d="M 275,120 Q 280,170 285,220" stroke="#f3f4f6" strokeWidth="3" fill="none" />
                    <rect x="282" y="220" width="6" height="14" fill={trimColor.hex} rx="1" />

                    {/* Center Chest Try Wears Crest */}
                    <g transform="translate(222, 140)">
                      <circle cx="28" cy="28" r="26" fill="#000000" stroke={trimColor.hex} strokeWidth="2" />
                      <image href="/media/branding/trylogo.png" x="4" y="4" width="48" height="48" referrerPolicy="no-referrer" />
                    </g>

                    {/* Personalized Athlete / Squad Name on Chest */}
                    <text
                      x="250"
                      y="225"
                      textAnchor="middle"
                      fill={bodyColor.hex === "#f3f4f6" ? "#111113" : "#ffffff"}
                      fontSize="14"
                      fontWeight="900"
                      fontFamily="Space Grotesk, Inter"
                      letterSpacing="0.12em"
                      className="uppercase"
                    >
                      {customName || "TRY WEARS"}
                    </text>
                    <text
                      x="250"
                      y="245"
                      textAnchor="middle"
                      fill={trimColor.hex}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      letterSpacing="0.2em"
                      className="uppercase transition-colors duration-500"
                    >
                      COMBAT CORNER CREW
                    </text>
                  </>
                ) : (
                  <>
                    {/* BACK VIEW OF HOODIE */}
                    {/* Back of Hood Down */}
                    <path
                      d="M 180,110 C 170,160 210,195 250,195 C 290,195 330,160 320,110 Z"
                      fill="#0e0e11"
                      stroke={trimColor.hex}
                      strokeWidth="2"
                    />

                    {/* Sleeves */}
                    <path d="M 140,120 L 45,260 L 95,285 L 155,220 Z" fill={activeContrastHex} />
                    <path d="M 360,120 L 455,260 L 405,285 L 345,220 Z" fill={activeContrastHex} />

                    {/* Torso */}
                    <path
                      d="M 180,120 L 320,120 L 360,120 L 345,430 L 155,430 L 140,120 Z"
                      fill={bodyColor.hex}
                      stroke="rgba(0,0,0,0.25)"
                      strokeWidth="2.5"
                    />
                    <rect x="150" y="430" width="200" height="28" fill="#111114" stroke={trimColor.hex} strokeWidth="1.5" />

                    {/* Back Prominent Team Arch */}
                    <text
                      x="250"
                      y="240"
                      textAnchor="middle"
                      fill={bodyColor.hex === "#f3f4f6" ? "#111113" : "#ffffff"}
                      fontSize="18"
                      fontWeight="900"
                      fontFamily="Space Grotesk, Inter"
                      letterSpacing="0.15em"
                      className="uppercase"
                    >
                      {customName || "TRY WEARS"}
                    </text>

                    {/* Giant Squad Number */}
                    <text
                      x="250"
                      y="350"
                      textAnchor="middle"
                      fill={trimColor.hex}
                      fontSize="100"
                      fontWeight="900"
                      fontFamily="Space Grotesk, Inter"
                      className="transition-colors duration-500"
                    >
                      {squadNumber}
                    </text>

                    <line x1="200" y1="375" x2="300" y2="375" stroke={trimColor.hex} strokeWidth="3" />
                    <text
                      x="250"
                      y="400"
                      textAnchor="middle"
                      fill={bodyColor.hex === "#f3f4f6" ? "#555" : "#aaa"}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                      letterSpacing="0.25em"
                      className="uppercase"
                    >
                      OFFICIAL TOURNAMENT EDITION
                    </text>
                  </>
                )}
              </svg>
            )}

            {/* 2. FULL TEAM TRACKSUIT (2-PIECE JACKET + PANTS) */}
            {activeGear === "tracksuit" && (
              <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* TOP HALF: TRACK JACKET */}
                {/* Standup Collar */}
                <path d="M 200,50 L 300,50 L 305,80 Q 250,90 195,80 Z" fill={trimColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />

                {/* Left Sleeve with Racing Stripes */}
                <path d="M 155,70 L 80,180 L 115,200 L 165,150 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                <line x1="155" y1="70" x2="80" y2="180" stroke={trimColor.hex} strokeWidth="5" />

                {/* Right Sleeve with Racing Stripes */}
                <path d="M 345,70 L 420,180 L 385,200 L 335,150 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                <line x1="345" y1="70" x2="420" y2="180" stroke={trimColor.hex} strokeWidth="5" />

                {/* Jacket Body */}
                <path
                  d="M 195,80 L 305,80 L 345,70 L 330,240 L 170,240 L 155,70 Z"
                  fill={bodyColor.hex}
                  stroke="rgba(0,0,0,0.25)"
                  strokeWidth="2"
                />

                {/* Design Style overlay on jacket */}
                {designStyle === "chevron" && (
                  <path d="M 160,110 L 250,150 L 340,110 L 335,135 L 250,175 L 165,135 Z" fill={trimColor.hex} />
                )}
                {designStyle === "split" && (
                  <path d="M 155,70 L 250,80 L 250,240 L 170,240 Z" fill={activeContrastHex} opacity="0.8" />
                )}

                {/* Metallic Center Zipper */}
                <line x1="250" y1="50" x2="250" y2="240" stroke="#d1d5db" strokeWidth="3" />
                <rect x="246" y="110" width="8" height="14" rx="2" fill="#9ca3af" />

                {/* Crest and Moniker */}
                <circle cx="210" cy="120" r="14" fill="#000000" stroke={trimColor.hex} strokeWidth="1.5" />
                <image href="/media/branding/trylogo.png" x="198" y="108" width="24" height="24" referrerPolicy="no-referrer" />
                <text x="285" y="120" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="11" fontWeight="900" fontFamily="Space Grotesk">
                  {customName || "TRACK PRO"}
                </text>
                <text x="285" y="135" textAnchor="middle" fill={trimColor.hex} fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                  #{squadNumber} • SQUAD
                </text>

                {/* BOTTOM HALF: MATCHING ATHLETIC TRACK PANTS */}
                {/* Elastic Pants Waistband */}
                <rect x="175" y="248" width="150" height="16" rx="4" fill="#121215" stroke={trimColor.hex} strokeWidth="1.5" />

                {/* Left Leg (Tapered) */}
                <path
                  d="M 175,264 L 145,470 L 205,470 L 245,340 L 245,264 Z"
                  fill={bodyColor.hex}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="2"
                />
                {/* Left Leg Racing Stripe */}
                <line x1="175" y1="264" x2="145" y2="470" stroke={trimColor.hex} strokeWidth="5" />
                <rect x="145" y="470" width="60" height="14" fill="#111114" stroke={trimColor.hex} />

                {/* Right Leg (Tapered) */}
                <path
                  d="M 325,264 L 355,470 L 295,470 L 255,340 L 255,264 Z"
                  fill={bodyColor.hex}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="2"
                />
                {/* Right Leg Racing Stripe */}
                <line x1="325" y1="264" x2="355" y2="470" stroke={trimColor.hex} strokeWidth="5" />
                <rect x="295" y="470" width="60" height="14" fill="#111114" stroke={trimColor.hex} />

                {/* Squad Number on Left Thigh */}
                <text x="210" y="320" textAnchor="middle" fill={trimColor.hex} fontSize="22" fontWeight="900" fontFamily="Space Grotesk">
                  #{squadNumber}
                </text>
              </svg>
            )}

            {/* 3. TEE / RASHGUARD */}
            {activeGear === "tee" && (
              <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {viewMode === "front" ? (
                  <>
                    <path d="M 200,110 Q 250,98 300,110 Q 250,128 200,110 Z" fill="#0a0a0c" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                    <path d="M 140,100 L 60,175 L 105,215 L 150,210 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
                    <line x1="60" y1="175" x2="105" y2="215" stroke={trimColor.hex} strokeWidth="5" />
                    <path d="M 360,100 L 440,175 L 395,215 L 350,210 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
                    <line x1="440" y1="175" x2="395" y2="215" stroke={trimColor.hex} strokeWidth="5" />

                    <path
                      d="M 200,110 Q 250,145 300,110 L 360,100 L 350,210 L 340,440 Q 250,452 160,440 L 150,210 L 140,100 Z"
                      fill={bodyColor.hex}
                      stroke="rgba(0,0,0,0.15)"
                      strokeWidth="2.5"
                    />

                    {/* Pattern variations on tee */}
                    {designStyle === "chevron" && (
                      <path d="M 150,160 L 250,220 L 350,160 L 345,190 L 250,250 L 155,190 Z" fill={trimColor.hex} />
                    )}
                    {designStyle === "racing" && (
                      <>
                        <line x1="170" y1="110" x2="180" y2="440" stroke={trimColor.hex} strokeWidth="4" />
                        <line x1="330" y1="110" x2="320" y2="440" stroke={trimColor.hex} strokeWidth="4" />
                      </>
                    )}
                    {designStyle === "split" && (
                      <path d="M 140,100 L 250,120 L 200,440 L 160,440 Z" fill={activeContrastHex} opacity="0.85" />
                    )}

                    <path d="M 200,110 Q 250,145 300,110 Q 250,122 200,110 Z" fill={trimColor.hex} />

                    <g transform="translate(218, 140)">
                      <circle cx="32" cy="32" r="28" fill="#000000" stroke={trimColor.hex} strokeWidth="2" />
                      <image href="/media/branding/trylogo.png" x="4" y="4" width="56" height="56" referrerPolicy="no-referrer" />
                    </g>

                    <text x="250" y="245" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="16" fontWeight="900" fontFamily="Space Grotesk">
                      {customName}
                    </text>
                    <text x="250" y="265" textAnchor="middle" fill={trimColor.hex} fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                      TRY WEARS ATHLETE
                    </text>
                  </>
                ) : (
                  <>
                    <path d="M 200,110 Q 250,95 300,110 Q 250,115 200,110 Z" fill={trimColor.hex} />
                    <path d="M 140,100 L 60,175 L 105,215 L 150,210 Z" fill={activeContrastHex} />
                    <path d="M 360,100 L 440,175 L 395,215 L 350,210 Z" fill={activeContrastHex} />
                    <path d="M 200,110 Q 250,95 300,110 L 360,100 L 350,210 L 340,440 Q 250,452 160,440 L 150,210 L 140,100 Z" fill={bodyColor.hex} />

                    <text x="250" y="175" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="18" fontWeight="900" fontFamily="Space Grotesk">
                      {customName || "TRY WEARS"}
                    </text>
                    <text x="250" y="325" textAnchor="middle" fill={trimColor.hex} fontSize="110" fontWeight="900" fontFamily="Space Grotesk">
                      {squadNumber}
                    </text>
                  </>
                )}
              </svg>
            )}

            {/* 4. CHAMPIONSHIP BOXING GLOVES */}
            {activeGear === "gloves" && (
              <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left Glove */}
                <g transform="translate(40, 70)">
                  <path d="M 60,160 C 40,90 80,30 140,25 C 190,20 210,60 210,130 C 210,180 200,230 180,270 L 80,265 C 65,225 60,190 60,160 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                  <path d="M 60,150 C 35,160 15,190 25,225 C 35,255 65,250 85,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                  <path d="M 75,260 L 185,265 L 180,350 L 70,345 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.4)" strokeWidth="3" />
                  <line x1="75" y1="290" x2="182" y2="293" stroke={trimColor.hex} strokeWidth="4" />
                  <line x1="73" y1="320" x2="181" y2="323" stroke={trimColor.hex} strokeWidth="4" />
                  <circle cx="128" cy="305" r="16" fill="#000000" stroke={trimColor.hex} strokeWidth="1.5" />
                  <image href="/media/branding/trylogo.png" x="114" y="291" width="28" height="28" referrerPolicy="no-referrer" />
                  <text x="145" y="125" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="13" fontWeight="900" fontFamily="Space Grotesk">
                    {customName || "TRY WEARS"}
                  </text>
                  <text x="145" y="145" textAnchor="middle" fill={trimColor.hex} fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                    {gloveWeight} • PRO SPEC
                  </text>
                </g>

                {/* Right Glove */}
                <g transform="translate(230, 80)">
                  <path d="M 40,130 C 40,60 60,20 110,25 C 170,30 210,90 190,160 C 190,190 185,225 170,265 L 70,270 C 50,230 40,180 40,130 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                  <path d="M 190,150 C 215,160 235,190 225,225 C 215,255 185,250 165,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                  <path d="M 65,265 L 175,260 L 180,345 L 70,350 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.4)" strokeWidth="3" />
                  <line x1="68" y1="293" x2="175" y2="290" stroke={trimColor.hex} strokeWidth="4" />
                  <line x1="69" y1="323" x2="177" y2="320" stroke={trimColor.hex} strokeWidth="4" />
                  <text x="110" y="125" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="13" fontWeight="900" fontFamily="Space Grotesk">
                    #{squadNumber}
                  </text>
                  <text x="110" y="145" textAnchor="middle" fill={trimColor.hex} fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                    HANDCRAFTED ARMOR
                  </text>
                </g>
              </svg>
            )}

            {/* 5. FIGHT SHORTS */}
            {activeGear === "shorts" && (
              <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 110,130 Q 250,115 390,130 L 395,190 Q 250,175 105,190 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
                <rect x="215" y="130" width="70" height="48" rx="6" fill="#000000" stroke={trimColor.hex} strokeWidth="2" />
                <image href="/media/branding/trylogo.png" x="226" y="133" width="48" height="42" referrerPolicy="no-referrer" />

                <path d="M 105,190 L 80,380 L 195,395 L 245,280 L 250,190 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                <path d="M 395,190 L 420,380 L 305,395 L 255,280 L 250,190 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />

                <path d="M 80,380 L 105,190 L 135,190 L 115,350 Q 95,370 80,380 Z" fill={activeContrastHex} />
                <line x1="80" y1="380" x2="105" y2="190" stroke={trimColor.hex} strokeWidth="4" />
                <path d="M 420,380 L 395,190 L 365,190 L 385,350 Q 405,370 420,380 Z" fill={activeContrastHex} />
                <line x1="420" y1="380" x2="395" y2="190" stroke={trimColor.hex} strokeWidth="4" />

                <text x="165" y="330" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="17" fontWeight="900" fontFamily="Space Grotesk">
                  {customName || "TRY WEARS"}
                </text>
                <text x="350" y="350" textAnchor="middle" fill={trimColor.hex} fontSize="50" fontWeight="900" fontFamily="Space Grotesk">
                  {squadNumber}
                </text>
              </svg>
            )}

            {/* 6. CHAMPIONSHIP WALKOUT ROBE */}
            {activeGear === "robe" && (
              <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {viewMode === "front" ? (
                  <>
                    {/* Ceremonial Oversized Satin Hood */}
                    <path d="M 180,60 C 160,20 220,10 250,10 C 280,10 340,20 320,60 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />
                    
                    {/* Flared Bell Sleeves */}
                    <path d="M 160,80 L 40,240 L 90,270 L 170,170 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                    <line x1="40" y1="240" x2="90" y2="270" stroke={trimColor.hex} strokeWidth="8" />

                    <path d="M 340,80 L 460,240 L 410,270 L 330,170 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                    <line x1="460" y1="240" x2="410" y2="270" stroke={trimColor.hex} strokeWidth="8" />

                    {/* Long Flowing Satin Robe Body */}
                    <path d="M 180,60 L 320,60 L 350,470 L 150,470 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />

                    {/* Wide Embroidered Satin Lapels (Trim/Contrast) */}
                    <path d="M 215,60 L 250,220 L 235,470 L 205,470 L 225,220 L 180,60 Z" fill={activeContrastHex} stroke={trimColor.hex} strokeWidth="2" />
                    <path d="M 285,60 L 250,220 L 265,470 L 295,470 L 275,220 L 320,60 Z" fill={activeContrastHex} stroke={trimColor.hex} strokeWidth="2" />

                    {/* Tied Sash / Belt */}
                    <rect x="150" y="270" width="200" height="22" rx="4" fill={trimColor.hex} />
                    <path d="M 235,292 L 225,380 L 245,380 L 250,292 Z" fill={trimColor.hex} />
                    <path d="M 255,292 L 265,395 L 285,395 L 270,292 Z" fill={trimColor.hex} />

                    {/* Left Lapel Gold Crest */}
                    <circle cx="210" cy="140" r="16" fill="#000000" stroke={trimColor.hex} strokeWidth="1.5" />
                    <image href="/media/branding/trylogo.png" x="196" y="126" width="28" height="28" referrerPolicy="no-referrer" />

                    {/* Right Lapel Team Name */}
                    <text x="290" y="145" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="12" fontWeight="900" fontFamily="Space Grotesk">
                      {customName || "CHAMPION"}
                    </text>
                  </>
                ) : (
                  <>
                    {/* BACK VIEW OF ROBE */}
                    <path d="M 180,60 C 160,110 220,130 250,130 C 280,130 340,110 320,60 Z" fill="#111114" stroke={trimColor.hex} />
                    <path d="M 160,80 L 40,240 L 90,270 L 170,170 Z" fill={bodyColor.hex} />
                    <path d="M 340,80 L 460,240 L 410,270 L 330,170 Z" fill={bodyColor.hex} />
                    <path d="M 180,60 L 320,60 L 350,470 L 150,470 Z" fill={bodyColor.hex} />
                    <rect x="150" y="270" width="200" height="22" rx="4" fill={trimColor.hex} />

                    {/* Grand Back Walkout Arch */}
                    <text x="250" y="190" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="24" fontWeight="900" fontFamily="Space Grotesk" letterSpacing="0.15em">
                      {customName || "TRY WEARS"}
                    </text>
                    <text x="250" y="215" textAnchor="middle" fill={trimColor.hex} fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono" letterSpacing="0.25em">
                      CHAMPIONSHIP WALKOUT ARMOR
                    </text>

                    <text x="250" y="370" textAnchor="middle" fill={trimColor.hex} fontSize="110" fontWeight="900" fontFamily="Space Grotesk">
                      {squadNumber}
                    </text>
                  </>
                )}
              </svg>
            )}
          </div>

          {/* Metric Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-6 py-3.5 rounded-2xl relative z-10 w-full max-w-[480px]">
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4 text-[#E21D1D]" />
              <span className="text-[11px] font-mono font-bold dark:text-neutral-200 uppercase">
                {activeGear === "hoodie" ? "450GSM FRENCH TERRY" : activeGear === "tracksuit" ? "DUAL-KNIT DRY-TECH" : activeGear === "robe" ? "HEAVYWEIGHT SATIN SILK" : "HAND-STITCHED COWHIDE"}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-mono font-bold dark:text-neutral-200 uppercase">TOURNAMENT CERTIFIED</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest uppercase">
                BESPOKE COMBAT LAB
              </span>
              <span className="text-[9px] bg-[#E21D1D]/10 text-[#E21D1D] px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                REAL SQUAD STUDIO
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black dark:text-white tracking-tight uppercase">
              {currentGearConfig.name}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-mono">
              {currentGearConfig.subtitle}
            </p>
          </div>

          {/* SINGLE ATHLETE VS SQUAD ROSTER */}
          <div className="bg-neutral-100 dark:bg-neutral-900/60 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E21D1D]" />
                <span>Order Scale Mode</span>
              </label>
              <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 text-[10px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setIsTeamOrder(false)}
                  className={`px-3 py-1 cursor-pointer transition-colors ${
                    !isTeamOrder ? "bg-[#E21D1D] text-white" : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  SINGLE ATHLETE
                </button>
                <button
                  type="button"
                  onClick={() => setIsTeamOrder(true)}
                  className={`px-3 py-1 cursor-pointer transition-colors ${
                    isTeamOrder ? "bg-[#E21D1D] text-white" : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  TEAM ROSTER (BULK)
                </button>
              </div>
            </div>

            {isTeamOrder && (
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Squad Quantity (10+ Units):</span>
                  <span className="font-bold text-[#E21D1D]">{teamQuantity} Kits ({discountPercentage}% Squad Discount Applied)</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={teamQuantity}
                  onChange={(e) => setTeamQuantity(Number(e.target.value))}
                  className="w-full accent-[#E21D1D] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* ATHLETE NAMEPLATE & SQUAD NUMBER */}
          <div className="grid grid-cols-3 gap-3 bg-neutral-100/50 dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800">
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider dark:text-neutral-200 block">
                Athlete / Team Nameplate
              </label>
              <input
                type="text"
                maxLength={18}
                placeholder="e.g. STRIKE FORCE"
                value={customName}
                onChange={(e) => {
                  setCustomName(e.target.value);
                  setActiveTeamSample(null);
                }}
                className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs font-mono dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider dark:text-neutral-200 block">
                Squad #
              </label>
              <input
                type="text"
                maxLength={3}
                placeholder="09"
                value={squadNumber}
                onChange={(e) => {
                  setSquadNumber(e.target.value);
                  setActiveTeamSample(null);
                }}
                className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono text-center font-bold dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
              />
            </div>
          </div>

          {/* 1. PRIMARY SHELL / FABRIC COLOR */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200 flex items-center justify-between">
              <span>1. Primary Body Fabric Color</span>
              {bodyColor.isPremium && <span className="text-[10px] bg-[#E21D1D]/10 text-[#E21D1D] px-2 py-0.5 rounded-full font-mono font-bold">+ $15.00</span>}
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {BODY_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setBodyColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`relative h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all ${item.gradient} ${
                    bodyColor.id === item.id ? "ring-2 ring-[#E21D1D] scale-105" : "hover:scale-102"
                  }`}
                  title={item.name}
                >
                  {bodyColor.id === item.id && (
                    <Check className={`w-4 h-4 ${item.id === 'white' ? 'text-black' : 'text-white'} font-bold relative z-10`} />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block italic font-mono">
              Active: {bodyColor.name}
            </span>
          </div>

          {/* 2. CONTRAST SLEEVES / HOOD LINING / PANELS */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200 flex items-center justify-between">
              <span>2. Contrast Sleeves, Lapels & Panels</span>
              {contrastColor.hex !== "match" && contrastColor.hex !== "#101012" && (
                <span className="text-[10px] bg-[#E21D1D]/10 text-[#E21D1D] px-2 py-0.5 rounded-full font-mono font-bold">+ $10.00</span>
              )}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CONTRAST_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setContrastColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    contrastColor.id === item.id
                      ? "border-[#E21D1D] bg-[#E21D1D]/5 dark:bg-[#E21D1D]/10 text-[#E21D1D]"
                      : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 block shrink-0"
                    style={{ backgroundColor: item.hex === "match" ? bodyColor.hex : item.hex }}
                  />
                  <span className="text-xs font-bold font-display truncate leading-none">
                    {item.name.replace("Highlight", "").replace("Strike", "")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. TRIM & STRIPES COLOR */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200">
              3. Racing Stripes, Drawstrings & Trim
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TRIM_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setTrimColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    trimColor.id === item.id
                      ? "border-[#E21D1D] bg-[#E21D1D]/5 dark:bg-[#E21D1D]/10 text-[#E21D1D]"
                      : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 block shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="text-xs font-bold font-display truncate leading-none">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. PERFORMANCE SIZE OR GLOVE WEIGHT */}
          {activeGear === "gloves" ? (
            <div className="space-y-2.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200">
                4. Glove Weight & Knuckle Density
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["12oz (Speed)", "14oz (Bag)", "16oz (Sparring)", "18oz (Heavy)"].map((wt) => {
                  const wtCode = wt.split(" ")[0];
                  return (
                    <button
                      key={wt}
                      onClick={() => setGloveWeight(wtCode)}
                      className={`py-2.5 px-2 rounded-xl border font-mono font-bold text-[11px] cursor-pointer transition-all ${
                        gloveWeight === wtCode
                          ? "border-[#E21D1D] bg-[#E21D1D]/10 text-[#E21D1D]"
                          : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {wtCode}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider dark:text-neutral-200">
                4. Performance Fit Size
              </label>
              <div className="grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`py-2.5 rounded-xl border font-mono font-bold text-xs cursor-pointer transition-all ${
                      size === sz
                        ? "border-[#E21D1D] bg-[#E21D1D]/10 text-[#E21D1D]"
                        : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TOTAL SUMMARY */}
          <div className="bg-neutral-100 dark:bg-neutral-900/80 p-5 rounded-2xl flex items-center justify-between border border-neutral-200/80 dark:border-neutral-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block leading-none mb-1">
                {isTeamOrder ? `Squad Order Total (${teamQuantity} Kits)` : "Single Configuration Price"}
              </span>
              <div className="text-2xl font-display font-black dark:text-white">
                ${finalOrderTotal.toFixed(2)}
                {isTeamOrder && (
                  <span className="text-xs font-mono text-neutral-400 font-normal ml-2">
                    (${unitPrice.toFixed(2)}/each)
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-md font-bold inline-block uppercase">
                {isTeamOrder ? `${teamQuantity}X ROSTER READY` : "BESPOKE READY"}
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            id="customizer-submit-button"
            onClick={handleAddCustomToCart}
            className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-bold py-4 rounded-xl transition-all shadow-xl shadow-[#E21D1D]/20 cursor-pointer text-center text-sm tracking-wider hover:scale-[1.01]"
          >
            {isTeamOrder ? `CONFIRM ${teamQuantity}X SQUAD DISPATCH` : "CONFIRM & ADD CUSTOM TO SHIPMENT"}
          </button>

          <div className="flex items-center justify-center gap-2 text-neutral-500 text-[10px] font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AUTHENTIC TOURNAMENT SPECIFICATIONS • GLOBAL CLUB WARRANTY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
