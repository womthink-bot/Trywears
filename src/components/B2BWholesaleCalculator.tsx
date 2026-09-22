import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  Send, 
  CheckCircle, 
  Layers, 
  Truck, 
  Clock, 
  Download, 
  Sparkles, 
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  HelpCircle,
  FileText
} from "lucide-react";

interface GearItemOption {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  baseFactoryCost: number; // For 25 pcs
  bulkTier50: number;
  bulkTier100: number;
  bulkTier250: number;
  bulkTier500: number;
  bulkTier1000: number;
  image: string;
  specs: string[];
}

const GEAR_OPTIONS: GearItemOption[] = [
  {
    id: "jersey",
    name: "Pro Sublimated Sports Team Match Jersey",
    category: "Sports Wears",
    retailPrice: 55,
    baseFactoryCost: 19.5,
    bulkTier50: 16.5,
    bulkTier100: 13.8,
    bulkTier250: 11.5,
    bulkTier500: 9.8,
    bulkTier1000: 8.2,
    image: "/media/home-page/catalog-section/prod-1-jersey.jpg",
    specs: ["180GSM Micro-Interlock Poly fabric", "Italian Zero-fade sublimation printing", "Laser-cut ventilation side mesh"]
  },
  {
    id: "tracksuit",
    name: "Corner Crew Pro Warmup Tracksuit (2-Piece)",
    category: "Sports Wears",
    retailPrice: 195,
    baseFactoryCost: 58,
    bulkTier50: 49,
    bulkTier100: 42,
    bulkTier250: 37,
    bulkTier500: 32,
    bulkTier1000: 27,
    image: "/media/home-page/catalog-section/prod-7-tracksuit.jpg",
    specs: ["Heavyweight brushed tricot poly-fleece", "Aerodynamic side racing stripes", "Full-length metal zipper with custom puller"]
  },
  {
    id: "rashguard",
    name: "Vanguard Gym MMA Compression Rashguard",
    category: "Gym and Fitness Wears",
    retailPrice: 95,
    baseFactoryCost: 26,
    bulkTier50: 21,
    bulkTier100: 17.5,
    bulkTier250: 14.8,
    bulkTier500: 12.5,
    bulkTier1000: 10.2,
    image: "/media/home-page/catalog-section/prod-6-rashguard.jpg",
    specs: ["240GSM 4-way stretch Lycra/Spandex", "Full all-over Italian sublimation printing", "6-thread flatlock anti-chafing seams"]
  },
  {
    id: "fitness_set",
    name: "Seamless 4-Way Gym Compression Set",
    category: "Gym and Fitness Wears",
    retailPrice: 85,
    baseFactoryCost: 28,
    bulkTier50: 23,
    bulkTier100: 19,
    bulkTier250: 16,
    bulkTier500: 13.5,
    bulkTier1000: 11.2,
    image: "/media/home-page/catalog-section/prod-2-gymset.jpg",
    specs: ["320GSM High-flex seamless knit", "Squat-proof compression contouring", "Anti-slip ribbed waistband"]
  },
  {
    id: "hoodie",
    name: "Heavyweight 450GSM French Terry Hoodie",
    category: "Street Wears",
    retailPrice: 135,
    baseFactoryCost: 38,
    bulkTier50: 32,
    bulkTier100: 27,
    bulkTier250: 23.5,
    bulkTier500: 19.8,
    bulkTier1000: 16.5,
    image: "/media/home-page/catalog-section/prod-3-hoodie.jpg",
    specs: ["100% combed cotton French terry (450GSM)", "Double-layered heavyweight hood with aglets", "3D Puff embroidery & dropped shoulder fit"]
  },
  {
    id: "street_tee",
    name: "Acid-Wash Oversized Heavy Streetwear Tee",
    category: "Street Wears",
    retailPrice: 48,
    baseFactoryCost: 16,
    bulkTier50: 13.5,
    bulkTier100: 11.2,
    bulkTier250: 9.6,
    bulkTier500: 8.2,
    bulkTier1000: 6.9,
    image: "/media/home-page/catalog-section/prod-8-tee.jpg",
    specs: ["260GSM 100% Pre-shrunk organic cotton", "Vintage mineral stone-wash treatment", "Thick 1.25\" ribbed collar"]
  },
  {
    id: "leather_biker",
    name: "Artisanal Full-Grain Cowhide Biker Leather Jacket",
    category: "Leather Jackets",
    retailPrice: 295,
    baseFactoryCost: 95,
    bulkTier50: 84,
    bulkTier100: 75,
    bulkTier250: 68,
    bulkTier500: 59,
    bulkTier1000: 49.5,
    image: "/media/home-page/catalog-section/prod-4-leather-biker.jpg",
    specs: ["1.2mm 100% Full-grain drum-dyed cowhide", "Heavy YKK antique silver zippers", "Diamond-quilted thermal satin lining"]
  },
  {
    id: "varsity",
    name: "Heritage Melton Wool & Leather Varsity Jacket",
    category: "Leather Jackets",
    retailPrice: 260,
    baseFactoryCost: 82,
    bulkTier50: 72,
    bulkTier100: 64,
    bulkTier250: 57,
    bulkTier500: 49,
    bulkTier1000: 42,
    image: "/media/home-page/catalog-section/prod-5-varsity.jpg",
    specs: ["24oz Melton wool core body", "Genuine top-grain cowhide leather sleeves", "Chenille squad embroidery & enamel snaps"]
  }
];

export const B2BWholesaleCalculator: React.FC = () => {
  const [selectedGearId, setSelectedGearId] = useState<string>("jersey");
  const [quantity, setQuantity] = useState<number>(100);
  
  // OEM Customizations checkboxes
  const [oemOptions, setOemOptions] = useState({
    customWovenLabels: true,
    embroidery3D: true,
    barcodePolybags: true,
    customHangtags: false,
    embossedLeather: true,
  });

  // RFQ Submission state
  const [isRfqModalOpen, setIsRfqModalOpen] = useState<boolean>(false);
  const [rfqSubmitted, setRfqSubmitted] = useState<boolean>(false);
  const [rfqTicket, setRfqTicket] = useState<string>("");
  const [rfqFormData, setRfqFormData] = useState({
    brandName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    country: "United States",
    notes: ""
  });

  const selectedGear = GEAR_OPTIONS.find((g) => g.id === selectedGearId) || GEAR_OPTIONS[0];

  // Calculate Unit Factory Cost according to quantity curve
  const calculateUnitCost = (item: GearItemOption, qty: number): number => {
    let base = item.baseFactoryCost;
    if (qty >= 1000) base = item.bulkTier1000;
    else if (qty >= 500) base = item.bulkTier500;
    else if (qty >= 250) base = item.bulkTier250;
    else if (qty >= 100) base = item.bulkTier100;
    else if (qty >= 50) base = item.bulkTier50;
    else base = item.baseFactoryCost;

    // Add small cost for OEM options depending on volume
    let addOn = 0;
    if (oemOptions.customWovenLabels && qty < 100) addOn += 0.8;
    if (oemOptions.embroidery3D) addOn += 1.5;
    if (oemOptions.customHangtags) addOn += 0.45;
    if (oemOptions.barcodePolybags) addOn += 0.35;
    if (oemOptions.embossedLeather && item.category === "Combat Gear") addOn += 1.2;

    return Number((base + addOn).toFixed(2));
  };

  const unitCost = calculateUnitCost(selectedGear, quantity);
  const totalInvestment = Number((unitCost * quantity).toFixed(2));
  const suggestedRetailTotal = Number((selectedGear.retailPrice * quantity).toFixed(2));
  const projectedProfit = Number((suggestedRetailTotal - totalInvestment).toFixed(2));
  const profitMarginPercent = Math.round((projectedProfit / suggestedRetailTotal) * 100);

  // Turnaround estimations
  const sampleDays = "5 - 7 Days";
  const bulkDays = quantity > 500 ? "22 - 28 Days" : "16 - 20 Days";
  const shippingMethod = quantity >= 500 ? "DHL Air Cargo / Express Sea" : "DHL Express Air (3-5 Days)";

  // Handle RFQ Submit
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `TW-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqTicket(ticketId);
    setRfqSubmitted(true);
  };

  // WhatsApp Pre-filled URL
  const whatsappMessage = encodeURIComponent(
    `Hello Try Wears B2B Factory Desk! I want an official bulk wholesale quote for:\n\n• Product: ${selectedGear.name}\n• Quantity: ${quantity} units\n• Estimated Unit FOB: $${unitCost}\n• Total Est: $${totalInvestment}\n• Brand/Gym: ${rfqFormData.brandName || "My Combat Brand"}\n• Country: ${rfqFormData.country}\n\nPlease share tech-pack template & sample order process.`
  );
  const whatsappUrl = `https://wa.me/18005558799?text=${whatsappMessage}`;

  return (
    <section id="b2b-calculator" className="py-24 px-6 bg-[#070708] border-b border-neutral-900 relative overflow-hidden text-white">
      {/* Background athletic sports grid & accent lighting */}
      <div className="absolute inset-0 carbon-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E21D1D]/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/15 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              FACTORY DIRECT B2B WHOLESALE ENGINE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase leading-none">
              BULK PRODUCTION & RFQ COST CALCULATOR
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-2xl">
              Source championship fight gear & teamwear straight from our Sialkot & New York export production lines. Calculate instant FOB factory pricing, profit margins, and lock in your wholesale batch.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-4 shrink-0 font-mono">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Min. Order Qty</span>
              <span className="text-xl font-bold text-emerald-400">25 PCS / STYLE</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Sample Dispatch</span>
              <span className="text-xl font-bold text-[#E21D1D]">5-7 DAYS</span>
            </div>
          </div>
        </div>

        {/* 1. GEAR SELECTION TABS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E21D1D]" />
              SELECT APPAREL OR COMBAT GEAR CATEGORY:
            </label>
            <span className="text-[11px] font-mono text-neutral-400">
              Active: <strong className="text-white">{selectedGear.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {GEAR_OPTIONS.map((gear) => {
              const isSelected = gear.id === selectedGearId;
              return (
                <button
                  key={gear.id}
                  onClick={() => setSelectedGearId(gear.id)}
                  className={`relative p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between h-36 ${
                    isSelected
                      ? "border-[#E21D1D] bg-[#E21D1D]/10 glow-red-sm scale-[1.02]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="relative h-16 w-full rounded-lg overflow-hidden bg-neutral-900/60 mb-2">
                    <img 
                      src={gear.image} 
                      alt={gear.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 bg-[#E21D1D] text-white p-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate leading-tight">
                      {gear.category}
                    </span>
                    <span className="text-xs font-display font-bold text-white block truncate leading-tight mt-0.5">
                      {gear.name.split(" (")[0]}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold block mt-1">
                      From ${gear.bulkTier1000}/ea
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN INTERACTIVE CALCULATOR PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Volume Slider & OEM Customizations */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8">
            
            {/* Interactive Volume Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 block">
                    PRODUCTION RUN VOLUME (UNITS)
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Slide to view tiered volume factory discounts
                  </span>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 bg-[#E21D1D] text-white px-4 py-1.5 rounded-xl font-display font-black text-xl shadow-lg">
                    {quantity} <span className="text-xs font-mono font-normal">PCS</span>
                  </div>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="25"
                  max="1500"
                  step="25"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#E21D1D]"
                />
                
                {/* Volume Tier Markers */}
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 pt-1">
                  <span className={quantity >= 25 ? "text-white font-bold" : ""}>25 (MOQ)</span>
                  <span className={quantity >= 100 ? "text-white font-bold" : ""}>100 (Club)</span>
                  <span className={quantity >= 250 ? "text-white font-bold" : ""}>250 (Brand)</span>
                  <span className={quantity >= 500 ? "text-white font-bold" : ""}>500 (Master)</span>
                  <span className={quantity >= 1000 ? "text-emerald-400 font-bold" : ""}>1000+ (OEM Container)</span>
                </div>
              </div>

              {/* Quick Volume Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[25, 50, 100, 250, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setQuantity(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      quantity === preset
                        ? "bg-[#E21D1D] text-white font-bold"
                        : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    }`}
                  >
                    {preset} pcs
                  </button>
                ))}
              </div>
            </div>

            {/* OEM / Private Label Options */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 block">
                OEM PRIVATE LABEL & BRANDING UPGRADES:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemOptions.customWovenLabels}
                    onChange={(e) => setOemOptions({ ...oemOptions, customWovenLabels: e.target.checked })}
                    className="w-4 h-4 accent-[#E21D1D] rounded"
                  />
                  <div className="text-xs">
                    <span className="text-white font-bold block">Custom Woven Neck Labels</span>
                    <span className="text-[10px] text-neutral-400">FREE on 100+ pcs</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemOptions.embroidery3D}
                    onChange={(e) => setOemOptions({ ...oemOptions, embroidery3D: e.target.checked })}
                    className="w-4 h-4 accent-[#E21D1D] rounded"
                  />
                  <div className="text-xs">
                    <span className="text-white font-bold block">High-Density 3D Embroidery</span>
                    <span className="text-[10px] text-neutral-400">12-Color Tajima stitch</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemOptions.barcodePolybags}
                    onChange={(e) => setOemOptions({ ...oemOptions, barcodePolybags: e.target.checked })}
                    className="w-4 h-4 accent-[#E21D1D] rounded"
                  />
                  <div className="text-xs">
                    <span className="text-white font-bold block">Individual Barcoded Polybags</span>
                    <span className="text-[10px] text-neutral-400">Amazon/Retail ready</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/20 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={oemOptions.embossedLeather}
                    onChange={(e) => setOemOptions({ ...oemOptions, embossedLeather: e.target.checked })}
                    className="w-4 h-4 accent-[#E21D1D] rounded"
                  />
                  <div className="text-xs">
                    <span className="text-white font-bold block">Embossed Metallic Leather Stamp</span>
                    <span className="text-[10px] text-neutral-400">Laser-heated brass stamp</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Selected Item Specs */}
            <div className="border-t border-white/10 pt-6">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Factory Standards & Materials for {selectedGear.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedGear.specs.map((spec, i) => (
                  <span key={i} className="text-[11px] font-mono bg-white/[0.04] border border-white/10 px-3 py-1 rounded-lg text-neutral-300">
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Quote Summary & Action Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#121214] to-[#0c0c0e] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#E21D1D] text-white text-[10px] font-mono font-black uppercase px-4 py-1 rounded-full shadow-lg">
              REAL-TIME FACTORY QUOTE
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                Factory FOB Price Per Unit
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-display font-black text-white">
                  ${unitCost}
                </span>
                <span className="text-sm font-mono text-neutral-400 line-through">
                  ${selectedGear.retailPrice} MSRP
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  SAVE {Math.round(((selectedGear.retailPrice - unitCost) / selectedGear.retailPrice) * 100)}%
                </span>
              </div>
            </div>

            {/* Financial Analysis Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 font-mono">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block">Total Factory Order</span>
                <span className="text-2xl font-bold text-white">${totalInvestment.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block">Est. Retail Turnover</span>
                <span className="text-2xl font-bold text-neutral-300">${suggestedRetailTotal.toLocaleString()}</span>
              </div>
              <div className="col-span-2 bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3">
                <span className="text-[10px] text-emerald-400 uppercase block font-bold">
                  PROJECTED CLUB/BRAND PROFIT
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-display font-black text-emerald-400">
                    +${projectedProfit.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-300 font-bold">
                    {profitMarginPercent}% Margin
                  </span>
                </div>
              </div>
            </div>

            {/* Logistics Timeline */}
            <div className="space-y-2.5 text-xs font-mono text-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E21D1D]" /> Tech-Pack Prototype:
                </span>
                <span className="font-bold text-white">{sampleDays}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-[#E21D1D]" /> Bulk Production:
                </span>
                <span className="font-bold text-white">{bulkDays}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#E21D1D]" /> Cargo Delivery:
                </span>
                <span className="font-bold text-white">{shippingMethod}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsRfqModalOpen(true)}
                className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-4 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E21D1D]/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>SUBMIT OFFICIAL RFQ INQUIRY</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT WITH B2B FACTORY DESK (WHATSAPP)</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> AQL 2.5 QA Guaranteed</span>
              <span>•</span>
              <span>No Hidden Customs Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ MODAL */}
      <AnimatePresence>
        {isRfqModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121214] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative shadow-2xl"
            >
              <button
                onClick={() => {
                  setIsRfqModalOpen(false);
                  setRfqSubmitted(false);
                }}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white text-xl font-bold cursor-pointer"
              >
                ✕
              </button>

              {!rfqSubmitted ? (
                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#E21D1D] font-black uppercase tracking-widest">
                      TRY WEARS B2B MANUFACTURING DIVISION
                    </span>
                    <h3 className="text-2xl font-display font-black text-white uppercase">
                      REQUEST OFFICIAL B2B QUOTATION
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      We will review your order of <strong>{quantity} units</strong> of {selectedGear.name} and provide full digital tech-pack specs within 12 hours.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                        Gym, Fight Promotion or Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Combat Academy / Titan Fight Wear"
                        value={rfqFormData.brandName}
                        onChange={(e) => setRfqFormData({ ...rfqFormData, brandName: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={rfqFormData.contactPerson}
                          onChange={(e) => setRfqFormData({ ...rfqFormData, contactPerson: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                          Destination Country *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="USA, UK, UAE, etc."
                          value={rfqFormData.country}
                          onChange={(e) => setRfqFormData({ ...rfqFormData, country: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="procurement@brand.com"
                          value={rfqFormData.email}
                          onChange={(e) => setRfqFormData({ ...rfqFormData, email: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+1 ... or +44 ..."
                          value={rfqFormData.whatsapp}
                          onChange={(e) => setRfqFormData({ ...rfqFormData, whatsapp: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-300 uppercase block mb-1">
                        Special Instructions or Logo Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your team colors, size breakdown (S/M/L/XL), or logo embroidery placements..."
                        value={rfqFormData.notes}
                        onChange={(e) => setRfqFormData({ ...rfqFormData, notes: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E21D1D]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#E21D1D]/20"
                  >
                    CONFIRM & TRANSMIT FACTORY RFQ
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                      RFQ Successfully Dispatched to Factory Production Floor
                    </span>
                    <h3 className="text-2xl font-display font-black text-white">
                      TICKET ID: {rfqTicket}
                    </h3>
                    <p className="text-xs font-mono text-neutral-300 max-w-sm mx-auto">
                      Our international sports manufacturing team has received your inquiry for <strong>{quantity} units</strong> of {selectedGear.name}. We will reach out via WhatsApp & email within 6-12 hours with your customized tech pack!
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-left font-mono text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Estimated Unit Cost:</span>
                      <span className="text-white font-bold">${unitCost} FOB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Total Investment:</span>
                      <span className="text-white font-bold">${totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Target Destination:</span>
                      <span className="text-white font-bold">{rfqFormData.country}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsRfqModalOpen(false);
                      setRfqSubmitted(false);
                    }}
                    className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold py-3 rounded-xl text-xs uppercase cursor-pointer"
                  >
                    CLOSE & RETURN TO B2B HUB
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
