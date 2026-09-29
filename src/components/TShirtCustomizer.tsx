import React, { useState } from "react";
import {
  Check,
  ShieldCheck,
  Eye,
  RotateCw,
  Trophy,
  ShoppingBag,
  Pipette,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Product, CartItem } from "../types";

interface TShirtCustomizerProps {
  product: Product;
  onAddToCart: (cartItem: CartItem) => void;
}

export type GearType = "hoodie" | "tracksuit" | "tee" | "gloves" | "shorts" | "robe";
export type ViewMode = "front" | "back";
export type DesignPatternStyle =
  | "chevron"
  | "racing"
  | "split"
  | "carbon"
  | "sash"
  | "stripes"
  | "raglan"
  | "camo"
  | "waves"
  | "fade"
  | "splatter"
  | "minimal";

interface TeamPreset {
  id: string;
  name: string;
  badge: string;
  city: string;
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
    name: "Strike Force",
    badge: "🥊",
    city: "Las Vegas Pro",
    athleteName: "STRIKE FORCE",
    squadNumber: "09",
    gearType: "hoodie",
    designStyle: "chevron",
    bodyColorId: "charcoal",
    contrastColorId: "accent-crimson",
    trimColorId: "crimson",
    teamCode: "SF-09"
  },
  {
    id: "apex-boxing",
    name: "Apex Boxing",
    badge: "🏆",
    city: "Brooklyn Club",
    athleteName: "APEX SQUAD",
    squadNumber: "01",
    gearType: "tracksuit",
    designStyle: "racing",
    bodyColorId: "gold",
    contrastColorId: "carbon",
    trimColorId: "gold",
    teamCode: "APX-01"
  },
  {
    id: "titan-crew",
    name: "Titan Fight",
    badge: "⚡",
    city: "London Ring",
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
    name: "Viper Combat",
    badge: "⚔️",
    city: "Tokyo Ring",
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
    name: "Ironclad Guild",
    badge: "🛡️",
    city: "Chicago Ring",
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
    name: "Monarch Clan",
    badge: "👑",
    city: "Monaco Night",
    athleteName: "DYNASTY",
    squadNumber: "88",
    gearType: "robe",
    designStyle: "sash",
    bodyColorId: "charcoal",
    contrastColorId: "accent-gold",
    trimColorId: "gold",
    teamCode: "MNR-88"
  }
];

// Rich Athletic Color Palette + Custom Color support
const PRESET_BODY_COLORS = [
  { id: "charcoal", name: "Charcoal Black", hex: "#171719", isPremium: false },
  { id: "jet-black", name: "Stealth Jet Black", hex: "#08080a", isPremium: false },
  { id: "crimson", name: "Matte Crimson", hex: "#e21d1d", isPremium: false },
  { id: "teal", name: "Try Teal", hex: "#0d9488", isPremium: true },
  { id: "navy", name: "Midnight Navy", hex: "#1e293b", isPremium: false },
  { id: "cobalt", name: "Cobalt Electric", hex: "#2563eb", isPremium: true },
  { id: "white", name: "Pristine White", hex: "#f3f4f6", isPremium: true },
  { id: "gold", name: "24K Royal Gold", hex: "#D4AF37", isPremium: true },
  { id: "solar", name: "Solar Volt Lime", hex: "#84cc16", isPremium: true },
  { id: "orange", name: "Blaze Orange", hex: "#ea580c", isPremium: false },
  { id: "purple", name: "Dynasty Purple", hex: "#7e22ce", isPremium: true }
];

const PRESET_CONTRAST_COLORS = [
  { id: "match", name: "Match Body", hex: "match" },
  { id: "carbon", name: "Carbon Matte", hex: "#101012" },
  { id: "accent-crimson", name: "Crimson Strike", hex: "#e21d1d" },
  { id: "accent-teal", name: "Teal Strike", hex: "#0d9488" },
  { id: "accent-cobalt", name: "Cobalt Blue", hex: "#2563eb" },
  { id: "accent-white", name: "White Panel", hex: "#f3f4f6" },
  { id: "accent-gold", name: "Gold Foil", hex: "#D4AF37" },
  { id: "accent-solar", name: "Solar Volt", hex: "#84cc16" },
  { id: "accent-orange", name: "Blaze Orange", hex: "#ea580c" }
];

const PRESET_TRIM_COLORS = [
  { id: "crimson", name: "Crimson Red", hex: "#e21d1d" },
  { id: "gold", name: "24K Gold", hex: "#D4AF37" },
  { id: "black", name: "Charcoal Black", hex: "#1c1c1e" },
  { id: "white", name: "Pure White", hex: "#f3f4f6" },
  { id: "teal", name: "Teal Tech", hex: "#0d9488" },
  { id: "cobalt", name: "Cobalt Blue", hex: "#2563eb" },
  { id: "solar", name: "Solar Volt", hex: "#84cc16" },
  { id: "orange", name: "Blaze Orange", hex: "#ea580c" }
];

// 12 Authentic Pro Sportswear / Combat / Streetwear Design Cuts
const DESIGN_PATTERNS: { id: DesignPatternStyle; name: string; icon: string; tag: string }[] = [
  { id: "chevron", name: "Chevron Cut", icon: "📐", tag: "V-Angles" },
  { id: "racing", name: "Speed Slash", icon: "⚡", tag: "Aerodynamic" },
  { id: "split", name: "Two-Tone Split", icon: "🔲", tag: "50/50 Dual" },
  { id: "carbon", name: "Carbon Hex", icon: "🕸️", tag: "Fiber Mesh" },
  { id: "sash", name: "Champion Sash", icon: "🎗️", tag: "Title Band" },
  { id: "stripes", name: "Twin Tracks", icon: "🏁", tag: "Dual Center" },
  { id: "raglan", name: "Raglan Armor", icon: "🥋", tag: "Shoulder Yoke" },
  { id: "camo", name: "Tactical Camo", icon: "🪖", tag: "Digital Camo" },
  { id: "waves", name: "Martial Waves", icon: "🌊", tag: "Seigaiha Crest" },
  { id: "fade", name: "Ombre Fade", icon: "🌅", tag: "Gradient Mix" },
  { id: "splatter", name: "Acid Grunge", icon: "🎨", tag: "Street Wash" },
  { id: "minimal", name: "Clean Classic", icon: "👑", tag: "Pro Seams" }
];

const GEAR_CONFIG: Record<GearType, { name: string; basePrice: number; icon: string }> = {
  hoodie: { name: "Combat Pro Hoodie", basePrice: 135.0, icon: "🧥" },
  tracksuit: { name: "Team Tracksuit (2-Pc)", basePrice: 195.0, icon: "🏃" },
  tee: { name: "Athletic Tee / Rashguard", basePrice: 65.0, icon: "👕" },
  gloves: { name: "Pro Boxing Gloves", basePrice: 185.0, icon: "🥊" },
  shorts: { name: "Combat Fight Shorts", basePrice: 78.0, icon: "🩳" },
  robe: { name: "Walkout Ring Robe", basePrice: 165.0, icon: "🥋" }
};

export const TShirtCustomizer: React.FC<TShirtCustomizerProps> = ({ product, onAddToCart }) => {
  const [activeGear, setActiveGear] = useState<GearType>("hoodie");
  const [viewMode, setViewMode] = useState<ViewMode>("front");
  const [designStyle, setDesignStyle] = useState<DesignPatternStyle>("chevron");
  const [activeTeamSample, setActiveTeamSample] = useState<string | null>("strike-force");

  // Colors state with custom color support
  const [bodyColor, setBodyColor] = useState(PRESET_BODY_COLORS[0]);
  const [contrastColor, setContrastColor] = useState(PRESET_CONTRAST_COLORS[2]);
  const [trimColor, setTrimColor] = useState(PRESET_TRIM_COLORS[0]);

  // Custom colors picked by user via native color picker
  const [customBodyHex, setCustomBodyHex] = useState("#e21d1d");
  const [customContrastHex, setCustomContrastHex] = useState("#0d9488");
  const [customTrimHex, setCustomTrimHex] = useState("#D4AF37");

  const [size, setSize] = useState("L");
  const [customName, setCustomName] = useState("STRIKE FORCE");
  const [squadNumber, setSquadNumber] = useState("09");
  const [gloveWeight, setGloveWeight] = useState("16oz");
  const [isTeamOrder, setIsTeamOrder] = useState(false);
  const [teamQuantity, setTeamQuantity] = useState(15);

  const handleApplyTeamSample = (sample: TeamPreset) => {
    setActiveTeamSample(sample.id);
    setActiveGear(sample.gearType);
    setDesignStyle(sample.designStyle);
    setCustomName(sample.athleteName);
    setSquadNumber(sample.squadNumber);

    const bColor = PRESET_BODY_COLORS.find((c) => c.id === sample.bodyColorId) || PRESET_BODY_COLORS[0];
    const cColor = PRESET_CONTRAST_COLORS.find((c) => c.id === sample.contrastColorId) || PRESET_CONTRAST_COLORS[1];
    const tColor = PRESET_TRIM_COLORS.find((c) => c.id === sample.trimColorId) || PRESET_TRIM_COLORS[0];

    setBodyColor(bColor);
    setContrastColor(cColor);
    setTrimColor(tColor);
  };

  // Custom color pick handlers
  const handleCustomBodyColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomBodyHex(hex);
    setBodyColor({
      id: "custom-body",
      name: `Custom (${hex.toUpperCase()})`,
      hex: hex,
      isPremium: true
    });
    setActiveTeamSample(null);
  };

  const handleCustomContrastColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomContrastHex(hex);
    setContrastColor({
      id: "custom-contrast",
      name: `Custom (${hex.toUpperCase()})`,
      hex: hex
    });
    setActiveTeamSample(null);
  };

  const handleCustomTrimColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setCustomTrimHex(hex);
    setTrimColor({
      id: "custom-trim",
      name: `Custom (${hex.toUpperCase()})`,
      hex: hex
    });
    setActiveTeamSample(null);
  };

  // Price Calculation
  const currentGearConfig = GEAR_CONFIG[activeGear];
  let singleItemPrice = currentGearConfig.basePrice;
  if (bodyColor.isPremium) singleItemPrice += 15;
  if (contrastColor.hex !== "match" && contrastColor.hex !== "#101012") singleItemPrice += 10;
  if (trimColor.id === "gold") singleItemPrice += 10;
  if (designStyle === "carbon" || designStyle === "chevron" || designStyle === "camo") singleItemPrice += 8;

  let unitPrice = singleItemPrice;
  let discountPercentage = 0;
  if (isTeamOrder) {
    if (teamQuantity >= 25) discountPercentage = 25;
    else if (teamQuantity >= 10) discountPercentage = 15;
    unitPrice = singleItemPrice * (1 - discountPercentage / 100);
  }

  const finalOrderTotal = isTeamOrder ? unitPrice * teamQuantity : unitPrice;
  const activeContrastHex = contrastColor.hex === "match" ? bodyColor.hex : contrastColor.hex;
  const hasBackView = activeGear !== "gloves" && activeGear !== "shorts";

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
      selectedSize: activeGear === "gloves" ? gloveWeight : size,
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
        teamPreset: activeTeamSample || "Custom"
      }
    });
  };

  return (
    <div id="customizer-container" className="space-y-2.5 max-w-7xl mx-auto">
      {/* ✦ 1-ROW TOP HEADER BAR (BRAND TITLE + GEAR TYPE TABS) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 p-2 px-3 rounded-2xl bg-neutral-900/80 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
          <span className="text-[10px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
            3D BESPOKE LAB
          </span>
          <span className="text-neutral-600 dark:text-neutral-400">•</span>
          <span className="text-xs font-display font-black text-white uppercase tracking-wider">
            {currentGearConfig.name}
          </span>
        </div>

        {/* GEAR SELECTION BUTTONS (COMPACT) */}
        <div className="flex flex-wrap items-center justify-center gap-1">
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
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10.5px] font-display font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#E21D1D] text-white shadow-sm"
                    : "bg-neutral-800/60 dark:bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ✦ 1-SCREEN UNIFIED STUDIO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        
        {/* LEFT STAGE: PRODUCT PREVIEW + EXPANDED 12 CUTS + PRESETS (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/60 dark:border-neutral-800/90 p-3 sm:p-4 rounded-2xl relative">
          
          {/* Top Stage Bar: Front/Back Toggle + 12 DESIGN CUTS HORIZONTAL SCROLL BAR */}
          <div className="flex items-center justify-between gap-2 z-20 pb-1 border-b border-neutral-200 dark:border-neutral-800/80">
            {hasBackView ? (
              <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-0.5 rounded-lg text-[9.5px] font-mono font-bold shrink-0">
                <button
                  onClick={() => setViewMode("front")}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === "front" ? "bg-[#E21D1D] text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-2.5 h-2.5" />
                  FRONT
                </button>
                <button
                  onClick={() => setViewMode("back")}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === "back" ? "bg-[#E21D1D] text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <RotateCw className="w-2.5 h-2.5" />
                  BACK #{squadNumber}
                </button>
              </div>
            ) : (
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                FIGHT SPEC
              </span>
            )}

            {/* ✦ 12 EXPANDED DESIGN CUTS (SMOOTH HORIZONTAL CHIPS SCROLLER) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-[360px] sm:max-w-[460px] scroll-smooth">
              {DESIGN_PATTERNS.map((pat) => {
                const isSelected = designStyle === pat.id;
                return (
                  <button
                    key={pat.id}
                    onClick={() => {
                      setDesignStyle(pat.id);
                      setActiveTeamSample(null);
                    }}
                    className={`px-2 py-1 rounded-lg border text-[9.5px] font-mono font-bold cursor-pointer transition-all flex items-center gap-1 shrink-0 whitespace-nowrap ${
                      isSelected
                        ? "border-[#E21D1D] bg-[#E21D1D] text-white shadow-[0_0_10px_rgba(226,29,29,0.35)]"
                        : "border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-600"
                    }`}
                    title={`${pat.name} (${pat.tag})`}
                  >
                    <span>{pat.icon}</span>
                    <span>{pat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC SVG CANVAS (ALL 12 PATTERNS RENDERED IN REAL-TIME) */}
          <div className="w-full flex items-center justify-center py-1">
            <div className="w-full max-w-[340px] sm:max-w-[370px] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              {/* 1. HOODIE */}
              {activeGear === "hoodie" && (
                <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Carbon Hex Matrix */}
                    <pattern id="hoodie-carbon-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                      <path d="M 6,0 L 12,3.5 L 12,10.5 L 6,14 L 0,10.5 L 0,3.5 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    </pattern>

                    {/* Tactical Camo Pattern */}
                    <pattern id="hoodie-camo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill={bodyColor.hex} />
                      <path d="M 0,0 Q 15,20 30,5 Q 40,25 20,35 Q 5,30 0,0 Z" fill={activeContrastHex} opacity="0.65" />
                      <circle cx="32" cy="28" r="8" fill={trimColor.hex} opacity="0.55" />
                      <path d="M 10,15 Q 25,5 35,20 Z" fill="#08080a" opacity="0.4" />
                    </pattern>

                    {/* Japanese Martial Waves Pattern */}
                    <pattern id="hoodie-waves-grid" width="28" height="14" patternUnits="userSpaceOnUse">
                      <path d="M 0,14 A 14,14 0 0,1 28,14 M 7,14 A 7,7 0 0,1 21,14" fill="none" stroke={trimColor.hex} strokeWidth="1.2" opacity="0.6" />
                    </pattern>

                    {/* Acid Grunge Splatter */}
                    <pattern id="hoodie-splatter-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="6" cy="8" r="2.5" fill={trimColor.hex} opacity="0.7" />
                      <circle cx="22" cy="18" r="1.8" fill={activeContrastHex} opacity="0.75" />
                      <circle cx="14" cy="24" r="3" fill="#ffffff" opacity="0.3" />
                      <circle cx="27" cy="5" r="1.2" fill={trimColor.hex} opacity="0.8" />
                    </pattern>

                    {/* Ombre Fade Gradient */}
                    <linearGradient id="hoodie-ombre-fade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={bodyColor.hex} />
                      <stop offset="50%" stopColor={activeContrastHex} />
                      <stop offset="100%" stopColor={trimColor.hex} />
                    </linearGradient>
                  </defs>

                  {viewMode === "front" ? (
                    <>
                      {/* Hood Inside & Outside */}
                      <path d="M 180,120 C 170,40 210,15 250,15 C 290,15 330,40 320,120 Z" fill="#0e0e11" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
                      <path d="M 195,115 C 195,55 220,35 250,35 C 280,35 305,55 305,115 C 285,130 215,130 195,115 Z" fill={activeContrastHex} />
                      
                      {/* Sleeves */}
                      <path d="M 140,120 L 45,260 L 95,285 L 155,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                      <path d="M 45,260 L 35,285 L 85,310 L 95,285 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />
                      <path d="M 360,120 L 455,260 L 405,285 L 345,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                      <path d="M 455,260 L 465,285 L 415,310 L 405,285 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />
                      
                      {/* Main Body Torso */}
                      <path
                        d="M 180,120 L 320,120 L 360,120 L 345,430 L 155,430 L 140,120 Z"
                        fill={designStyle === "fade" ? "url(#hoodie-ombre-fade)" : designStyle === "camo" ? "url(#hoodie-camo-grid)" : bodyColor.hex}
                        stroke="rgba(0,0,0,0.25)"
                        strokeWidth="2.5"
                      />

                      {/* 1. CHEVRON */}
                      {designStyle === "chevron" && (
                        <path d="M 145,160 L 250,230 L 355,160 L 352,200 L 250,270 L 148,200 Z" fill={trimColor.hex} opacity="0.9" />
                      )}

                      {/* 2. RACING / SPEED */}
                      {designStyle === "racing" && (
                        <>
                          <line x1="140" y1="120" x2="45" y2="260" stroke={trimColor.hex} strokeWidth="6" />
                          <line x1="360" y1="120" x2="455" y2="260" stroke={trimColor.hex} strokeWidth="6" />
                          <line x1="175" y1="120" x2="170" y2="430" stroke={trimColor.hex} strokeWidth="4" />
                          <line x1="325" y1="120" x2="330" y2="430" stroke={trimColor.hex} strokeWidth="4" />
                        </>
                      )}

                      {/* 3. SPLIT */}
                      {designStyle === "split" && (
                        <path d="M 140,120 L 250,120 L 250,430 L 155,430 Z" fill={activeContrastHex} opacity="0.85" />
                      )}

                      {/* 4. CARBON */}
                      {designStyle === "carbon" && (
                        <rect x="155" y="120" width="190" height="310" fill="url(#hoodie-carbon-grid)" pointerEvents="none" />
                      )}

                      {/* 5. CHAMPION SASH */}
                      {designStyle === "sash" && (
                        <path d="M 150,130 L 190,120 L 345,390 L 315,430 Z" fill={trimColor.hex} opacity="0.9" />
                      )}

                      {/* 6. TWIN TRACKS / STRIPES */}
                      {designStyle === "stripes" && (
                        <>
                          <rect x="232" y="120" width="10" height="310" fill={trimColor.hex} />
                          <rect x="258" y="120" width="10" height="310" fill={trimColor.hex} />
                        </>
                      )}

                      {/* 7. RAGLAN ARMOR */}
                      {designStyle === "raglan" && (
                        <path d="M 140,120 L 360,120 L 330,200 L 250,225 L 170,200 Z" fill={activeContrastHex} stroke={trimColor.hex} strokeWidth="2" opacity="0.95" />
                      )}

                      {/* 8. WAVES */}
                      {designStyle === "waves" && (
                        <rect x="155" y="130" width="190" height="290" fill="url(#hoodie-waves-grid)" pointerEvents="none" />
                      )}

                      {/* 9. SPLATTER */}
                      {designStyle === "splatter" && (
                        <rect x="155" y="120" width="190" height="310" fill="url(#hoodie-splatter-grid)" pointerEvents="none" />
                      )}

                      {/* Kangaroo Pocket */}
                      <path d="M 175,310 L 325,310 L 335,420 L 165,420 Z" fill="#121215" stroke={trimColor.hex} strokeWidth="2" />
                      
                      {/* Waistband Ribbing */}
                      <rect x="150" y="430" width="200" height="28" fill="#111114" stroke={trimColor.hex} strokeWidth="1.5" />
                      
                      {/* Drawstrings with Metal Aglets */}
                      <path d="M 225,120 Q 220,170 215,220" stroke="#f3f4f6" strokeWidth="3" fill="none" />
                      <rect x="212" y="220" width="6" height="14" fill={trimColor.hex} rx="1" />
                      <path d="M 275,120 Q 280,170 285,220" stroke="#f3f4f6" strokeWidth="3" fill="none" />
                      <rect x="282" y="220" width="6" height="14" fill={trimColor.hex} rx="1" />

                      {/* Center Brand Crest */}
                      <g transform="translate(222, 140)">
                        <circle cx="28" cy="28" r="26" fill="#000000" stroke={trimColor.hex} strokeWidth="2" />
                        <image href="/media/branding/trylogo.png" x="4" y="4" width="48" height="48" referrerPolicy="no-referrer" />
                      </g>

                      {/* Custom Athlete Name */}
                      <text x="250" y="225" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111113" : "#ffffff"} fontSize="14" fontWeight="900" fontFamily="Space Grotesk">
                        {customName || "TRY WEARS"}
                      </text>
                      <text x="250" y="245" textAnchor="middle" fill={trimColor.hex} fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
                        COMBAT CORNER CREW
                      </text>
                    </>
                  ) : (
                    <>
                      {/* BACK VIEW */}
                      <path d="M 180,110 C 170,160 210,195 250,195 C 290,195 330,160 320,110 Z" fill="#0e0e11" stroke={trimColor.hex} strokeWidth="2" />
                      <path d="M 140,120 L 45,260 L 95,285 L 155,220 Z" fill={activeContrastHex} />
                      <path d="M 360,120 L 455,260 L 405,285 L 345,220 Z" fill={activeContrastHex} />
                      <path d="M 180,120 L 320,120 L 360,120 L 345,430 L 155,430 L 140,120 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" />
                      <rect x="150" y="430" width="200" height="28" fill="#111114" stroke={trimColor.hex} strokeWidth="1.5" />
                      <text x="250" y="240" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111113" : "#ffffff"} fontSize="18" fontWeight="900" fontFamily="Space Grotesk">
                        {customName || "TRY WEARS"}
                      </text>
                      <text x="250" y="350" textAnchor="middle" fill={trimColor.hex} fontSize="100" fontWeight="900" fontFamily="Space Grotesk">
                        {squadNumber}
                      </text>
                    </>
                  )}
                </svg>
              )}

              {/* 2. TRACKSUIT */}
              {activeGear === "tracksuit" && (
                <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 200,50 L 300,50 L 305,80 Q 250,90 195,80 Z" fill={trimColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <path d="M 155,70 L 80,180 L 115,200 L 165,150 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                  <line x1="155" y1="70" x2="80" y2="180" stroke={trimColor.hex} strokeWidth="5" />
                  <path d="M 345,70 L 420,180 L 385,200 L 335,150 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                  <line x1="345" y1="70" x2="420" y2="180" stroke={trimColor.hex} strokeWidth="5" />
                  <path d="M 195,80 L 305,80 L 345,70 L 330,240 L 170,240 L 155,70 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
                  
                  {designStyle === "chevron" && (
                    <path d="M 160,110 L 250,150 L 340,110 L 335,135 L 250,175 L 165,135 Z" fill={trimColor.hex} />
                  )}
                  {designStyle === "racing" && (
                    <>
                      <line x1="175" y1="80" x2="175" y2="240" stroke={trimColor.hex} strokeWidth="4" />
                      <line x1="325" y1="80" x2="325" y2="240" stroke={trimColor.hex} strokeWidth="4" />
                    </>
                  )}
                  {designStyle === "split" && (
                    <path d="M 155,70 L 250,80 L 250,240 L 170,240 Z" fill={activeContrastHex} opacity="0.8" />
                  )}
                  {designStyle === "sash" && (
                    <path d="M 160,80 L 200,80 L 330,220 L 290,240 Z" fill={trimColor.hex} opacity="0.9" />
                  )}
                  {designStyle === "stripes" && (
                    <>
                      <rect x="235" y="80" width="6" height="160" fill={trimColor.hex} />
                      <rect x="259" y="80" width="6" height="160" fill={trimColor.hex} />
                    </>
                  )}

                  <line x1="250" y1="50" x2="250" y2="240" stroke="#d1d5db" strokeWidth="3" />
                  <circle cx="210" cy="120" r="14" fill="#000000" stroke={trimColor.hex} strokeWidth="1.5" />
                  <image href="/media/branding/trylogo.png" x="198" y="108" width="24" height="24" referrerPolicy="no-referrer" />
                  <text x="285" y="120" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="11" fontWeight="900" fontFamily="Space Grotesk">
                    {customName || "TRACK PRO"}
                  </text>
                  <text x="285" y="135" textAnchor="middle" fill={trimColor.hex} fontSize="8" fontWeight="bold" fontFamily="JetBrains Mono">
                    #{squadNumber}
                  </text>

                  {/* Track Pants */}
                  <rect x="175" y="248" width="150" height="16" rx="4" fill="#121215" stroke={trimColor.hex} strokeWidth="1.5" />
                  <path d="M 175,264 L 145,470 L 205,470 L 245,340 L 245,264 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <line x1="175" y1="264" x2="145" y2="470" stroke={trimColor.hex} strokeWidth="5" />
                  <path d="M 325,264 L 355,470 L 295,470 L 255,340 L 255,264 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                  <line x1="325" y1="264" x2="355" y2="470" stroke={trimColor.hex} strokeWidth="5" />
                  <text x="210" y="320" textAnchor="middle" fill={trimColor.hex} fontSize="22" fontWeight="900" fontFamily="Space Grotesk">
                    #{squadNumber}
                  </text>
                </svg>
              )}

              {/* 3. ATHLETIC TEE */}
              {activeGear === "tee" && (
                <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {viewMode === "front" ? (
                    <>
                      <path d="M 200,110 Q 250,98 300,110 Q 250,128 200,110 Z" fill="#0a0a0c" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                      <path d="M 140,100 L 60,175 L 105,215 L 150,210 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
                      <line x1="60" y1="175" x2="105" y2="215" stroke={trimColor.hex} strokeWidth="5" />
                      <path d="M 360,100 L 440,175 L 395,215 L 350,210 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
                      <line x1="440" y1="175" x2="395" y2="215" stroke={trimColor.hex} strokeWidth="5" />
                      <path d="M 200,110 Q 250,145 300,110 L 360,100 L 350,210 L 340,440 Q 250,452 160,440 L 150,210 L 140,100 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.15)" strokeWidth="2.5" />
                      
                      {designStyle === "chevron" && (
                        <path d="M 150,160 L 250,220 L 350,160 L 345,190 L 250,250 L 155,190 Z" fill={trimColor.hex} />
                      )}
                      {designStyle === "racing" && (
                        <>
                          <line x1="160" y1="100" x2="170" y2="440" stroke={trimColor.hex} strokeWidth="5" />
                          <line x1="340" y1="100" x2="330" y2="440" stroke={trimColor.hex} strokeWidth="5" />
                        </>
                      )}
                      {designStyle === "split" && (
                        <path d="M 140,100 L 250,120 L 200,440 L 160,440 Z" fill={activeContrastHex} opacity="0.85" />
                      )}
                      {designStyle === "sash" && (
                        <path d="M 140,100 L 180,100 L 340,410 L 300,440 Z" fill={trimColor.hex} opacity="0.9" />
                      )}
                      {designStyle === "stripes" && (
                        <>
                          <rect x="235" y="110" width="8" height="330" fill={trimColor.hex} />
                          <rect x="257" y="110" width="8" height="330" fill={trimColor.hex} />
                        </>
                      )}
                      {designStyle === "raglan" && (
                        <path d="M 140,100 L 360,100 L 320,180 L 250,200 L 180,180 Z" fill={activeContrastHex} opacity="0.9" />
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

              {/* 4. GLOVES */}
              {activeGear === "gloves" && (
                <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(40, 70)">
                    <path d="M 60,160 C 40,90 80,30 140,25 C 190,20 210,60 210,130 C 210,180 200,230 180,270 L 80,265 C 65,225 60,190 60,160 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                    <path d="M 60,150 C 35,160 15,190 25,225 C 35,255 65,250 85,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                    <path d="M 75,260 L 185,265 L 180,350 L 70,345 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.4)" strokeWidth="3" />
                    <line x1="75" y1="290" x2="182" y2="293" stroke={trimColor.hex} strokeWidth="4" />
                    <circle cx="128" cy="305" r="16" fill="#000000" stroke={trimColor.hex} strokeWidth="1.5" />
                    <image href="/media/branding/trylogo.png" x="114" y="291" width="28" height="28" referrerPolicy="no-referrer" />
                    <text x="145" y="125" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="13" fontWeight="900" fontFamily="Space Grotesk">
                      {customName || "TRY WEARS"}
                    </text>
                    <text x="145" y="145" textAnchor="middle" fill={trimColor.hex} fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                      {gloveWeight} • PRO
                    </text>
                  </g>
                  <g transform="translate(230, 80)">
                    <path d="M 40,130 C 40,60 60,20 110,25 C 170,30 210,90 190,160 C 190,190 185,225 170,265 L 70,270 C 50,230 40,180 40,130 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                    <path d="M 190,150 C 215,160 235,190 225,225 C 215,255 185,250 165,220 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
                    <path d="M 65,265 L 175,260 L 180,345 L 70,350 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.4)" strokeWidth="3" />
                    <line x1="68" y1="293" x2="175" y2="290" stroke={trimColor.hex} strokeWidth="4" />
                    <text x="110" y="125" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="13" fontWeight="900" fontFamily="Space Grotesk">
                      #{squadNumber}
                    </text>
                  </g>
                </svg>
              )}

              {/* 5. SHORTS */}
              {activeGear === "shorts" && (
                <svg viewBox="0 0 500 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 110,130 Q 250,115 390,130 L 395,190 Q 250,175 105,190 Z" fill={activeContrastHex} stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" />
                  <rect x="215" y="130" width="70" height="48" rx="6" fill="#000000" stroke={trimColor.hex} strokeWidth="2" />
                  <image href="/media/branding/trylogo.png" x="226" y="133" width="48" height="42" referrerPolicy="no-referrer" />
                  <path d="M 105,190 L 80,380 L 195,395 L 245,280 L 250,190 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                  <path d="M 395,190 L 420,380 L 305,395 L 255,280 L 250,190 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                  
                  {designStyle === "stripes" && (
                    <>
                      <line x1="120" y1="190" x2="95" y2="380" stroke={trimColor.hex} strokeWidth="6" />
                      <line x1="380" y1="190" x2="405" y2="380" stroke={trimColor.hex} strokeWidth="6" />
                    </>
                  )}

                  <text x="165" y="330" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="17" fontWeight="900" fontFamily="Space Grotesk">
                    {customName || "TRY WEARS"}
                  </text>
                  <text x="350" y="350" textAnchor="middle" fill={trimColor.hex} fontSize="50" fontWeight="900" fontFamily="Space Grotesk">
                    {squadNumber}
                  </text>
                </svg>
              )}

              {/* 6. ROBE */}
              {activeGear === "robe" && (
                <svg viewBox="0 0 500 520" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {viewMode === "front" ? (
                    <>
                      <path d="M 180,60 C 160,20 220,10 250,10 C 280,10 340,20 320,60 Z" fill="#111114" stroke={trimColor.hex} strokeWidth="2" />
                      <path d="M 160,80 L 40,240 L 90,270 L 170,170 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                      <line x1="40" y1="240" x2="90" y2="270" stroke={trimColor.hex} strokeWidth="8" />
                      <path d="M 340,80 L 460,240 L 410,270 L 330,170 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                      <line x1="460" y1="240" x2="410" y2="270" stroke={trimColor.hex} strokeWidth="8" />
                      <path d="M 180,60 L 320,60 L 350,470 L 150,470 Z" fill={bodyColor.hex} stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                      <path d="M 215,60 L 250,220 L 235,470 L 205,470 L 225,220 L 180,60 Z" fill={activeContrastHex} stroke={trimColor.hex} strokeWidth="2" />
                      <path d="M 285,60 L 250,220 L 265,470 L 295,470 L 275,220 L 320,60 Z" fill={activeContrastHex} stroke={trimColor.hex} strokeWidth="2" />
                      <rect x="150" y="270" width="200" height="22" rx="4" fill={trimColor.hex} />
                      <text x="290" y="145" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="12" fontWeight="900" fontFamily="Space Grotesk">
                        {customName || "CHAMPION"}
                      </text>
                    </>
                  ) : (
                    <>
                      <path d="M 180,60 C 160,110 220,130 250,130 C 280,130 340,110 320,60 Z" fill="#111114" stroke={trimColor.hex} />
                      <path d="M 160,80 L 40,240 L 90,270 L 170,170 Z" fill={bodyColor.hex} />
                      <path d="M 340,80 L 460,240 L 410,270 L 330,170 Z" fill={bodyColor.hex} />
                      <path d="M 180,60 L 320,60 L 350,470 L 150,470 Z" fill={bodyColor.hex} />
                      <text x="250" y="190" textAnchor="middle" fill={bodyColor.hex === "#f3f4f6" ? "#111" : "#fff"} fontSize="24" fontWeight="900" fontFamily="Space Grotesk">
                        {customName || "TRY WEARS"}
                      </text>
                      <text x="250" y="370" textAnchor="middle" fill={trimColor.hex} fontSize="110" fontWeight="900" fontFamily="Space Grotesk">
                        {squadNumber}
                      </text>
                    </>
                  )}
                </svg>
              )}
            </div>
          </div>

          {/* ✦ BOTTOM OF STAGE: 1-CLICK PRO TEAM PRESETS (6 CHIPS) */}
          <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/80">
            <div className="flex items-center justify-between mb-1.5 text-[9px] font-mono text-neutral-400">
              <span className="font-bold text-[#E21D1D] uppercase flex items-center gap-1">
                <Trophy className="w-2.5 h-2.5" />
                1-CLICK PRO TEAM PRESETS
              </span>
              <span className="hidden sm:inline">SELECT ANY TEAM TO LOAD FULL LOOK</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {REAL_TEAM_SAMPLES.map((sample) => {
                const isSelected = activeTeamSample === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleApplyTeamSample(sample)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer truncate ${
                      isSelected
                        ? "border-[#E21D1D] bg-[#E21D1D]/15 text-white ring-1 ring-[#E21D1D]"
                        : "border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    <div className="text-xs leading-none">{sample.badge}</div>
                    <span className="text-[9.5px] font-display font-black uppercase block truncate mt-0.5">
                      {sample.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT DECK: PRECISION CONTROLS & CUSTOM COLOR PICKERS (5 COLS - 1 SCREEN VIEW) */}
        <div className="lg:col-span-5 p-3.5 sm:p-4 rounded-2xl bg-neutral-900/80 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800 flex flex-col justify-between space-y-2">
          
          {/* 1. ATHLETE / TEAM NAME & NUMBER (1 COMPACT ROW) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase text-neutral-400 block">
                Athlete / Team Name
              </label>
              <input
                type="text"
                maxLength={18}
                value={customName}
                onChange={(e) => {
                  setCustomName(e.target.value);
                  setActiveTeamSample(null);
                }}
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold dark:text-white focus:outline-none focus:border-[#E21D1D]"
                placeholder="TEAM NAME"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono font-bold uppercase text-neutral-400 block text-center">
                Squad #
              </label>
              <input
                type="text"
                maxLength={3}
                value={squadNumber}
                onChange={(e) => {
                  setSquadNumber(e.target.value);
                  setActiveTeamSample(null);
                }}
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-2 py-1.5 text-xs font-mono text-center font-black dark:text-white focus:outline-none focus:border-[#E21D1D]"
                placeholder="09"
              />
            </div>
          </div>

          {/* 2. BODY COLOR (SWATCHES + NATIVE CUSTOM COLOR DROPPER) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9.5px] font-mono">
              <span className="font-bold text-neutral-400 uppercase">1. Primary Body Color</span>
              <span className="text-[#E21D1D] font-bold truncate max-w-[140px]">{bodyColor.name}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {PRESET_BODY_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setBodyColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 ${
                    bodyColor.id === item.id
                      ? "ring-2 ring-[#E21D1D] scale-110 border-white z-10"
                      : "border-neutral-700/60 hover:scale-105"
                  }`}
                  style={{ backgroundColor: item.hex }}
                  title={item.name}
                >
                  {bodyColor.id === item.id && (
                    <Check className={`w-3.5 h-3.5 ${item.id === "white" ? "text-black" : "text-white"} font-bold`} />
                  )}
                </button>
              ))}

              {/* ✦ CUSTOM BODY COLOR PICKER BUTTON */}
              <label
                className={`relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 ${
                  bodyColor.id === "custom-body"
                    ? "ring-2 ring-white scale-110 border-white"
                    : "border-neutral-600 hover:scale-105"
                }`}
                title="Apni Marzi Ka Koi Bhi Color Choose Karein"
              >
                <input
                  type="color"
                  value={customBodyHex}
                  onChange={handleCustomBodyColorChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Pipette className="w-3.5 h-3.5 text-black drop-shadow font-black" />
              </label>
            </div>
          </div>

          {/* 3. CONTRAST SLEEVES / PANELS (SWATCHES + CUSTOM DROPPER) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9.5px] font-mono">
              <span className="font-bold text-neutral-400 uppercase">2. Contrast Sleeves & Panels</span>
              <span className="text-[#E21D1D] font-bold truncate max-w-[140px]">{contrastColor.name}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {PRESET_CONTRAST_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setContrastColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 ${
                    contrastColor.id === item.id
                      ? "ring-2 ring-[#E21D1D] scale-110 border-white z-10"
                      : "border-neutral-700/60 hover:scale-105"
                  }`}
                  style={{ backgroundColor: item.hex === "match" ? bodyColor.hex : item.hex }}
                  title={item.name}
                >
                  {contrastColor.id === item.id && (
                    <Check className={`w-3 h-3 ${item.id === "accent-white" ? "text-black" : "text-white"} font-bold`} />
                  )}
                </button>
              ))}

              {/* ✦ CUSTOM CONTRAST COLOR PICKER */}
              <label
                className={`relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 ${
                  contrastColor.id === "custom-contrast"
                    ? "ring-2 ring-white scale-110 border-white"
                    : "border-neutral-600 hover:scale-105"
                }`}
                title="Sleeves Ke Liye Apni Marzi Ka Color Choose Karein"
              >
                <input
                  type="color"
                  value={customContrastHex}
                  onChange={handleCustomContrastColorChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Pipette className="w-3.5 h-3.5 text-white drop-shadow font-black" />
              </label>
            </div>
          </div>

          {/* 4. TRIM & ACCENTS (SWATCHES + CUSTOM DROPPER) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[9.5px] font-mono">
              <span className="font-bold text-neutral-400 uppercase">3. Trim, Drawstrings & Accents</span>
              <span className="text-[#E21D1D] font-bold truncate max-w-[140px]">{trimColor.name}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {PRESET_TRIM_COLORS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setTrimColor(item);
                    setActiveTeamSample(null);
                  }}
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 ${
                    trimColor.id === item.id
                      ? "ring-2 ring-[#E21D1D] scale-110 border-white z-10"
                      : "border-neutral-700/60 hover:scale-105"
                  }`}
                  style={{ backgroundColor: item.hex }}
                  title={item.name}
                >
                  {trimColor.id === item.id && (
                    <Check className={`w-3 h-3 ${item.id === "white" ? "text-black" : "text-white"} font-bold`} />
                  )}
                </button>
              ))}

              {/* ✦ CUSTOM TRIM COLOR PICKER */}
              <label
                className={`relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center cursor-pointer transition-all border shrink-0 bg-gradient-to-tr from-yellow-300 via-red-500 to-purple-600 ${
                  trimColor.id === "custom-trim"
                    ? "ring-2 ring-white scale-110 border-white"
                    : "border-neutral-600 hover:scale-105"
                }`}
                title="Trim & Stripes Ke Liye Custom Color Choose Karein"
              >
                <input
                  type="color"
                  value={customTrimHex}
                  onChange={handleCustomTrimColorChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Pipette className="w-3.5 h-3.5 text-white drop-shadow font-black" />
              </label>
            </div>
          </div>

          {/* 5. SIZE / GLOVE WEIGHT + ORDER SCALE MODE (1 COMPACT ROW) */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-mono font-bold uppercase text-neutral-400">
                {activeGear === "gloves" ? "Weight" : "Size"} & Order Scale
              </span>

              {/* Order Mode Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-neutral-700 text-[9px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setIsTeamOrder(false)}
                  className={`px-2 py-0.5 cursor-pointer ${
                    !isTeamOrder ? "bg-[#E21D1D] text-white" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  SINGLE
                </button>
                <button
                  type="button"
                  onClick={() => setIsTeamOrder(true)}
                  className={`px-2 py-0.5 cursor-pointer ${
                    isTeamOrder ? "bg-[#E21D1D] text-white" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  SQUAD BULK
                </button>
              </div>
            </div>

            {/* Size Buttons */}
            <div className="flex items-center gap-1">
              {activeGear === "gloves"
                ? ["12oz", "14oz", "16oz", "18oz"].map((wt) => (
                    <button
                      key={wt}
                      onClick={() => setGloveWeight(wt)}
                      className={`flex-1 py-1 rounded-lg border text-[10px] font-mono font-bold cursor-pointer transition-all ${
                        gloveWeight === wt
                          ? "border-[#E21D1D] bg-[#E21D1D]/15 text-[#E21D1D]"
                          : "border-neutral-800 hover:border-neutral-700 text-neutral-300"
                      }`}
                    >
                      {wt}
                    </button>
                  ))
                : ["XS", "S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`flex-1 py-1 rounded-lg border text-[10px] font-mono font-bold cursor-pointer transition-all ${
                        size === sz
                          ? "border-[#E21D1D] bg-[#E21D1D]/15 text-[#E21D1D]"
                          : "border-neutral-800 hover:border-neutral-700 text-neutral-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
            </div>

            {/* Team Bulk Slider (Only if squad selected) */}
            {isTeamOrder && (
              <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2 text-[9.5px] font-mono">
                <span className="text-neutral-400">{teamQuantity} Kits ({discountPercentage}% Off)</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={teamQuantity}
                  onChange={(e) => setTeamQuantity(Number(e.target.value))}
                  className="flex-1 accent-[#E21D1D] cursor-pointer h-1"
                />
              </div>
            )}
          </div>

          {/* 6. TOTAL PRICE & SUBMIT BUTTON (ALWAYS IN VIEW WITHOUT SCROLLING) */}
          <div className="pt-2 border-t border-neutral-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-neutral-400 uppercase block leading-none">
                  {isTeamOrder ? `Squad Total (${teamQuantity} Kits)` : "Custom Price"}
                </span>
                <div className="text-xl sm:text-2xl font-display font-black text-white leading-tight">
                  ${finalOrderTotal.toFixed(2)}
                  {isTeamOrder && (
                    <span className="text-[10px] font-mono text-neutral-400 font-normal ml-1">
                      (${unitPrice.toFixed(2)}/pc)
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">
                  READY FOR DISPATCH
                </span>
              </div>
            </div>

            <button
              id="customizer-submit-button"
              onClick={handleAddCustomToCart}
              className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(226,29,29,0.35)] cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isTeamOrder ? `CONFIRM ${teamQuantity}X SQUAD DISPATCH` : "CONFIRM & ADD TO SHIPMENT"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
