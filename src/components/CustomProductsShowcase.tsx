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
  PackageCheck
} from "lucide-react";

// ============================================================================
// ✦ TRY WEARS BESPOKE WHOLESALE PRODUCTS
// High-definition transparent PNG cutouts without background.
// Displays ready custom-designed apparel with client brand logos.
// Auto-cycles every 2 seconds.
// ============================================================================

export interface CustomClientProduct {
  id: string;
  name: string;
  clientBrand: string;
  country: string;
  orderVolume: string;
  image: string; // Transparent PNG with no background
  alt: string;
  badge: string;
  customizationDetails: string;
  fabricSpecs: string;
}

interface CustomDivision {
  id: string;
  categoryTitle: string;
  code: string;
  tagline: string;
  heroHeadline: string;
  subHeadline: string;
  urduHighlight: string;
  description: string;
  features: string[];
  specs: { label: string; val: string }[];
  clientProducts: CustomClientProduct[];
}

const CUSTOM_DIVISIONS: CustomDivision[] = [
  {
    id: "sports-wears",
    categoryTitle: "Sports Wears & Match Kits",
    code: "01",
    tagline: "FULL ITALIAN SUBLIMATION & PRO TEAMWEAR",
    heroHeadline: "CUSTOMIZED",
    subHeadline: "MATCH KITS & JERSEYS",
    urduHighlight:
      "Direct OEM/ODM production for sports clubs, academies, tournament leagues, and brand distributors with custom club crests, player numbering, and laser ventilation.",
    description:
      "Try Wears manufactures complete turnkey teamwear collections for global football, basketball, rugby, and cricket leagues. Features Pantone precision color matching, zero-fade Italian heat sublimation, and reinforced 4-needle flatlock seams.",
    features: [
      "Zero-Fade Italian Sublimation Printing",
      "Custom 3D Silicone Crests & Rubber Badges",
      "Player Names & Precision Custom Numbers",
      "Youth XS to Adult 5XL Custom Sizing"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "20 PCS / SQUAD" },
      { label: "SAMPLE PROTOTYPE", val: "4-6 DAYS" },
      { label: "FABRIC TECH", val: "180 GSM MICRO-DRY INTERLOCK" },
      { label: "STITCHING", val: "REINFORCED 4-NEEDLE FLATLOCK" }
    ],
    clientProducts: [
      {
        id: "sports-prod-1",
        name: "Wildcats Pro Basketball Tournament Kit",
        clientBrand: "WILDCATS BASKETBALL ACADEMY",
        country: "USA",
        orderVolume: "350 PCS ORDER DELIVERED",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        alt: "Wildcats 24 Pro Sublimated Red Match Jersey",
        badge: "CUSTOM LOGO & NUMBERING",
        customizationDetails: "Wildcats 24 bespoke chest font, silicone team emblem, black mesh side panels",
        fabricSpecs: "180 GSM Micro-Dry Interlock"
      },
      {
        id: "sports-prod-2",
        name: "Vipers FC Sublimated Gold & Purple Away Kit",
        clientBrand: "VIPERS PREMIER LEAGUE",
        country: "UNITED KINGDOM",
        orderVolume: "600 PCS ORDER DELIVERED",
        image: "/images/sports-wears/01_purple_jersey.png",
        alt: "Vipers Purple and Gold Sublimated Match Kit",
        badge: "FULL DIGITAL SUBLIMATION",
        customizationDetails: "Gold metallic sponsor print, geometric diagonal gradient sublimation",
        fabricSpecs: "190 GSM Honeycomb Aerodynamic Poly"
      },
      {
        id: "sports-prod-3",
        name: "Cobalt Striped Championship Football Kit",
        clientBrand: "COBALT ATHLETIC CLUB",
        country: "CANADA",
        orderVolume: "420 PCS ORDER DELIVERED",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        alt: "Cobalt White and Blue Striped Pro Football Jersey",
        badge: "DUAL-TONE STRIPES & CREST",
        customizationDetails: "Engineered vertical stripes, heat-sealed rubber sponsor, ribbed V-neck",
        fabricSpecs: "CoolPass High-Ventilation Polyester"
      },
      {
        id: "sports-prod-4",
        name: "Vanguard Squad Deep Navy Match Kit",
        clientBrand: "VANGUARD FC AUSTRALIA",
        country: "AUSTRALIA",
        orderVolume: "500 PCS ORDER DELIVERED",
        image: "/images/sports-wears/05_navy_jersey.png",
        alt: "Vanguard Deep Navy and Royal Blue Jersey",
        badge: "RAGLAN ERGONOMIC SLEEVES",
        customizationDetails: "Raglan seam articulation, laser-cut ventilation holes, woven neck tag",
        fabricSpecs: "180 GSM Anti-Bacterial Dry-Fit"
      }
    ]
  },
  {
    id: "gym-fitness",
    categoryTitle: "Gym & Seamless Activewear",
    code: "02",
    tagline: "4-WAY POWER COMPRESSION & SEAMLESS KNIT",
    heroHeadline: "BESPOKE",
    subHeadline: "GYM & COMPRESSION WEAR",
    urduHighlight:
      "Custom-engineered for fitness labels, bodybuilding brands, and luxury activewear startups with high-flex squat-proof fabrics and custom silicone branding.",
    description:
      "Full-spectrum OEM manufacturing of muscle-mapped compression rashguards, seamless contour leggings, high-support sports bras, and deep-cut athletic stringers with anti-microbial silver yarn tech and custom branded jacquard waistbands.",
    features: [
      "4-Way Adaptive Muscle-Flex Compression",
      "High-Density 3D Rubber & Silicone Branding",
      "Custom Branded Jacquard Knit Waistbands",
      "Squat-Proof & Anti-Odor Silver Yarn Technology"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 PCS / STYLE" },
      { label: "SAMPLE PROTOTYPE", val: "5-6 DAYS" },
      { label: "FABRIC TECH", val: "NYLON-SPANDEX COMPOSITE 320 GSM" },
      { label: "FINISH", val: "SWEAT-WICKING ANTIMICROBIAL" }
    ],
    clientProducts: [
      {
        id: "gym-prod-1",
        name: "Women's Sculpted Seamless Ribbed Bra & Leggings Set",
        clientBrand: "AURA ACTIVEWEAR",
        country: "UK & DUBAI",
        orderVolume: "300 SETS PRIVATE LABEL",
        image: "/images/gym-fitness/gym_women_seamless_set_v2.png",
        alt: "Women's Seamless Mauve Sports Bra & Leggings Set",
        badge: "SEAMLESS 2-PIECE SET",
        customizationDetails: "Bespoke high-waist contour ribbing, laser-cut ventilation, silicone heat transfer logos",
        fabricSpecs: "320 GSM Nylon-Spandex Composite"
      },
      {
        id: "gym-prod-2",
        name: "Women's High-Support Racerback Gym Suit",
        clientBrand: "EMERALD FITNESS CO.",
        country: "AUSTRALIA",
        orderVolume: "450 SETS WHOLESALE BATCH",
        image: "/images/gym-fitness/gym_women_emerald_bra_set_v2.png",
        alt: "Women's High Support Forest Emerald Activewear Suit",
        badge: "HIGH-SUPPORT SUIT",
        customizationDetails: "Removable foam cups, bonded waistband, reinforced flatlock anti-chafing seams",
        fabricSpecs: "340 GSM Moisture-Wicking Poly-Elastane"
      },
      {
        id: "gym-prod-3",
        name: "Men's 2-Piece Compression Top & Tights Base Layer Suit",
        clientBrand: "APEX STRENGTH APPAREL",
        country: "USA",
        orderVolume: "500 SETS WHOLESALE ORDER",
        image: "/images/gym-fitness/gym_men_compression_suit_v2.png",
        alt: "Men's 2-Piece Compression Rashguard and Tights Suit",
        badge: "2-PIECE COMPRESSION SUIT",
        customizationDetails: "Muscle-mapped contouring, graduated vascular pressure fit, flatlock seams",
        fabricSpecs: "290 GSM 4-Way Stretch Poly-Spandex"
      },
      {
        id: "gym-prod-4",
        name: "Men's Sleeveless Workout Hoodie & 2-in-1 Shorts Set",
        clientBrand: "OLYMPUS ATHLETICS",
        country: "GERMANY",
        orderVolume: "350 SETS PRIVATE LABEL",
        image: "/images/gym-fitness/gym_men_training_set_v2.png",
        alt: "Men's Pro Training Workout Hoodie & Shorts Set",
        badge: "MEN'S TRAINING SET",
        customizationDetails: "Deep armhole cut, built-in compression liner phone pocket, heavy drawstrings",
        fabricSpecs: "260 GSM French Terry Cotton & Poly Liner"
      }
    ]
  },
  {
    id: "streetwear-hoodies",
    categoryTitle: "Luxury Streetwear & Hoodies",
    code: "03",
    tagline: "450-550 GSM FRENCH TERRY & BOXY TEES",
    heroHeadline: "CUSTOM",
    subHeadline: "LUXURY STREETWEAR",
    urduHighlight:
      "Crafted for luxury streetwear brands and limited apparel drops with 500 GSM loopback cotton, vintage acid washes, 3D puff embroidery, and custom engraved metal aglets.",
    description:
      "Heavyweight drop-shoulder oversized hoodies, boxy vintage wash tees, and modular cargo utility pants. Engineered with pre-shrunk combed cotton, double-layered stiff hoods, and bespoke damask private labeling.",
    features: [
      "450–550 GSM 100% Combed Cotton Loopback Terry",
      "Vintage Mineral & Acid Wash Garment Dyeing",
      "High-Density 3D Puff Print & Chenille Badges",
      "Custom Engraved Gunmetal Hardware & Aglets"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "25 PCS / DESIGN" },
      { label: "SAMPLE PROTOTYPE", val: "6-8 DAYS" },
      { label: "FABRIC TECH", val: "PRE-SHRUNK LUXURY COMBED COTTON" },
      { label: "LABELING", val: "BESPOKE WOVEN NECK & WASH LABELS" }
    ],
    clientProducts: [
      {
        id: "street-prod-1",
        name: "Women's Cropped Boxy Hoodie & Wide-Leg Sweats Tracksuit",
        clientBrand: "NOCTURNE STREETWEAR",
        country: "LOS ANGELES, USA",
        orderVolume: "500 SETS DROP DELIVERED",
        image: "/images/street-wears/street_women_cropped_hoodie_set_v2.png",
        alt: "Women's Cropped Heavyweight Tracksuit Set",
        badge: "WOMEN'S 420GSM TRACKSUIT",
        customizationDetails: "Cropped boxy cut, custom engraved metal aglets, high-waisted wide-leg sweatpants",
        fabricSpecs: "420 GSM 100% Pre-Shrunk Combed Cotton"
      },
      {
        id: "street-prod-2",
        name: "Women's Washed Graphic Tee & Parachute Cargo Pants Set",
        clientBrand: "METROPOLIS APPAREL",
        country: "LONDON, UK",
        orderVolume: "400 SETS BESPOKE BATCH",
        image: "/images/street-wears/street_women_boxy_tee_cargo_set_v2.png",
        alt: "Women's Drop Shoulder Tee and Parachute Cargo Set",
        badge: "WOMEN'S CARGO STREET SET",
        customizationDetails: "Enzyme washed vintage patina, parachute pants with drawcord toggles, deep utility pockets",
        fabricSpecs: "300 GSM Combed Jersey & Tactical Ripstop"
      },
      {
        id: "street-prod-3",
        name: "Men's Luxury 450GSM French Terry Boxy Hoodie & Sweats Set",
        clientBrand: "DISTRICT 9 STREET LABEL",
        country: "FRANCE",
        orderVolume: "350 SETS ORDER DELIVERED",
        image: "/images/street-wears/street_men_heavy_hoodie_set_v2.png",
        alt: "Men's Luxury 450GSM Boxy Hoodie & Sweats Tracksuit",
        badge: "MEN'S 450GSM TRACKSUIT",
        customizationDetails: "Double layer hood without drawstrings, heavy 2x2 ribbing, dropped shoulder boxy cut",
        fabricSpecs: "450 GSM Heavy French Terry Cotton"
      },
      {
        id: "street-prod-4",
        name: "Men's Vintage Washed Heavy Tee & Tactical Cargo Pants Set",
        clientBrand: "SHADOW DIVISION TECHWEAR",
        country: "TOKYO, JAPAN",
        orderVolume: "300 SETS LIMITED RUN",
        image: "/images/street-wears/street_men_vintage_tee_cargo_set_v2.png",
        alt: "Men's Heavy Tee & Tactical Cargo Pants Outfit Set",
        badge: "MEN'S TACTICAL STREET SET",
        customizationDetails: "Drop-shoulder boxy tee, modular webbing straps on cargo pants, YKK ankle zips",
        fabricSpecs: "300 GSM Heavy Jersey & Reinforced Ripstop"
      }
    ]
  },
  {
    id: "leather-combat",
    categoryTitle: "Leather & Combat Fight Gear",
    code: "04",
    tagline: "1.2MM TOP-GRAIN COWHIDE & PRO COMBAT",
    heroHeadline: "HANDCRAFTED",
    subHeadline: "LEATHER & FIGHT GEAR",
    urduHighlight:
      "Manufactured for world championship boxing federations, MMA promotions, and motorcycle apparel labels with full-grain leather and multi-core EVA shock foam.",
    description:
      "Hand-shaped top-grain cowhide boxing gloves, tournament shin guards, and classic leather biker jackets. Built with multi-layer kinetic shock dispersion cores, 24K gold foil debossed badges, and heavy bonded nylon seams.",
    features: [
      "100% Full-Grain Drum-Dyed Cowhide Leather",
      "Biometric Custom Made-to-Measure Patterns",
      "Heavy-Duty Antique Brass YKK Zippers",
      "Custom Quilted Silk / Satin Inner Lining"
    ],
    specs: [
      { label: "MINIMUM ORDER", val: "10 PCS (1 PC BESPOKE)" },
      { label: "SAMPLE PROTOTYPE", val: "7-10 DAYS" },
      { label: "LEATHER GRADE", val: "1.2MM TOP-GRAIN MOTO SPEC" },
      { label: "HARDWARE", val: "CORROSION-RESISTANT YKK BRASS" }
    ],
    clientProducts: [
      {
        id: "leather-prod-1",
        name: "Apex Asymmetric Cowhide Leather Biker Jacket",
        clientBrand: "APEX RIDERS MOTOR CLUB",
        country: "TEXAS, USA",
        orderVolume: "120 PCS CUSTOM BATCH",
        image: "/images/leather-jackets/leather_biker.png",
        alt: "Handcrafted 1.2mm Cowhide Leather Biker Jacket",
        badge: "1.2MM TOP-GRAIN COWHIDE",
        customizationDetails: "Embossed club logo on back panel, antique brass #10 YKK zippers, quilted red silk lining",
        fabricSpecs: "100% Full-Grain Sialkot Cowhide"
      },
      {
        id: "leather-prod-2",
        name: "Highland Aviator Shearling Flight Bomber",
        clientBrand: "HERITAGE AVIATION OUTFITTERS",
        country: "NORWAY",
        orderVolume: "85 PCS BESPOKE RUN",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        alt: "Aviator Shearling Leather Flight Bomber Jacket",
        badge: "GENUINE SHEARLING COLLAR",
        customizationDetails: "Heavyweight antiqued leather, double-buckle throat latch, custom embossed squadron crest",
        fabricSpecs: "Antiqued Drum-Dyed Nappa Leather"
      },
      {
        id: "leather-prod-3",
        name: "Black Diamond Minimalist Cafe Racer Jacket",
        clientBrand: "VINTAGE SPEED CO.",
        country: "AUSTRALIA",
        orderVolume: "150 PCS WHOLESALE ORDER",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        alt: "Minimalist Top-Grain Leather Cafe Racer Jacket",
        badge: "SLIM RACER ARTICULATION",
        customizationDetails: "Biometric athletic tailored fit, zippered gusset sleeves, debossed chest logo",
        fabricSpecs: "1.1mm Supple Semi-Aniline Cowhide"
      },
      {
        id: "leather-prod-4",
        name: "Championship Wool & Cowhide Varsity Jacket",
        clientBrand: "GOLDEN GLOVES TOURNAMENT",
        country: "UNITED KINGDOM",
        orderVolume: "200 PCS CHAMPIONSHIP GEAR",
        image: "/images/leather-jackets/leather_varsity.png",
        alt: "Custom Wool and Genuine Cowhide Varsity Jacket",
        badge: "CHENILLE & REAL LEATHER",
        customizationDetails: "Heavy Melton wool body, genuine cowhide leather sleeves, multi-layer chenille patches",
        fabricSpecs: "24oz Melton Wool + 1.2mm Cowhide"
      }
    ]
  }
];

export function CustomProductsShowcase() {
  const [divisions, setDivisions] = useState<CustomDivision[]>(CUSTOM_DIVISIONS);
  const [activeIdx, setActiveIdx] = useState(0);
  const current = divisions[activeIdx] || CUSTOM_DIVISIONS[0];

  // Auto-fetch dynamically any newly added images from public/products folders
  useEffect(() => {
    fetch("/api/products/dynamic")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.categories) {
          setDivisions((prev) =>
            prev.map((div) => {
              const catKey =
                div.id === "leather-combat"
                  ? "leather-jackets"
                  : div.id === "sports-wears"
                  ? "sports-wears"
                  : div.id;

              const matchingKeys = Object.keys(data.categories).filter((k) =>
                k.startsWith(catKey)
              );

              let allFoundImages: string[] = [];
              matchingKeys.forEach((k) => {
                allFoundImages.push(...data.categories[k]);
              });

              // Keep images that are transparent pngs or jpgs
              if (allFoundImages.length > 0) {
                const dynamicList: CustomClientProduct[] = allFoundImages.map((imgUrl, i) => {
                  const fileName = imgUrl.split("/").pop() || `Product ${i + 1}`;
                  const cleanName = fileName
                    .replace(/\.[^/.]+$/, "")
                    .replace(/^[0-9]+_/, "")
                    .replace(/_/g, " ")
                    .toUpperCase();

                  const existing = div.clientProducts.find(
                    (p) => p.image === imgUrl || p.image.endsWith(fileName)
                  );
                  if (existing) return existing;

                  return {
                    id: `dyn-${div.id}-${i}`,
                    name: `${cleanName} (Custom Client Batch)`,
                    clientBrand: `TRY WEARS BESPOKE ORDER #${i + 1}`,
                    country: "EXPORT CLIENT",
                    orderVolume: "250+ PCS BATCH DELIVERED",
                    image: imgUrl,
                    alt: cleanName,
                    badge: "100% FACTORY DIRECT",
                    customizationDetails: "Bespoke Cut & Sew, Sublimation and Client Logo",
                    fabricSpecs: div.specs[2]?.val || "Custom Technical Performance Fabric"
                  };
                });

                return {
                  ...div,
                  clientProducts: dynamicList
                };
              }
              return div;
            })
          );
        }
      })
      .catch((err) => {
        console.warn("Dynamic products sync fallback to defaults:", err);
      });
  }, []);

  // Auto-Cycle: Changes product every 2 seconds
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const currentProduct = current.clientProducts[currentProductIdx] || current.clientProducts[0];

  const [viewPreset, setViewPreset] = useState<"standard" | "zoom">("standard");
  const [isHovered, setIsHovered] = useState(false);

  // Subtle interactive mouse tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 26,
    stiffness: 200
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    damping: 26,
    stiffness: 200
  });

  // Auto-cycle timer: exactly 2 seconds
  useEffect(() => {
    if (!isAutoCycling || isHovered) return;

    const interval = setInterval(() => {
      setCurrentProductIdx((prev) => (prev + 1) % current.clientProducts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoCycling, isHovered, current.clientProducts.length, activeIdx]);

  // Reset product index when category changes
  useEffect(() => {
    setCurrentProductIdx(0);
  }, [activeIdx]);

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
    category: current.categoryTitle,
    quantity: "25-50 Pcs (Team / Small Batch)",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handlePrevProduct = () => {
    setCurrentProductIdx((prev) =>
      prev === 0 ? current.clientProducts.length - 1 : prev - 1
    );
  };

  const handleNextProduct = () => {
    setCurrentProductIdx((prev) =>
      (prev + 1) % current.clientProducts.length
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
        category: current.categoryTitle,
        quantity: "25-50 Pcs (Team / Small Batch)",
        notes: ""
      });
    }, 2500);
  };

  return (
    <section
      id="collections"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#050505] text-white overflow-hidden select-none border-b border-neutral-900"
    >
      {/* Dynamic Background Ambience - Try Wears Red Brand Aura */}
      <div className="absolute top-1/3 left-1/4 w-[750px] h-[500px] bg-[#E21D1D]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber Technical Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* TOP SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="text-[11px] font-mono font-black text-[#E21D1D] tracking-[0.25em] uppercase">
                TRY WEARS BESPOKE OEM & ODM PRIVATE LABEL DIVISION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-[1.08]">
              CUSTOMIZED READY PRODUCTS FOR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] to-red-500 underline decoration-[#E21D1D]/40 decoration-4 underline-offset-8">
                GLOBAL BRANDS & CLUBS
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider leading-relaxed pt-1">
              End-to-end bespoke manufacturing for international apparel wholesalers, fitness chains, and combat federations — complete with custom brand crests, Pantone color matching, Italian sublimation, and retail-ready private labeling.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.35)] flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>START CUSTOM ORDER</span>
            </button>
            <a
              href="#customizer"
              className="px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>3D LAB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#E21D1D]" />
            </a>
          </div>
        </div>

        {/* CATEGORY TABS SELECTOR */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CUSTOM_DIVISIONS.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2.5 border ${
                activeIdx === idx
                  ? "bg-[#E21D1D] text-white border-[#E21D1D] shadow-[0_0_20px_rgba(226,29,29,0.4)] font-black"
                  : "bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border-neutral-800"
              }`}
            >
              <span className={`text-[10px] font-bold ${activeIdx === idx ? "text-white" : "text-[#E21D1D]"}`}>
                [0{idx + 1}]
              </span>
              <span>{cat.categoryTitle}</span>
            </button>
          ))}
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
            className="rounded-3xl bg-[#0a0a0d] border border-neutral-800/90 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden transition-shadow duration-300 hover:border-[#E21D1D]/40"
          >
            {/* Top Tactical Status Bar with 2-Second Auto-Change Progress Bar */}
            <div className="relative border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
              {/* ✦ 2-SECOND ANIMATED PROGRESS INDICATOR */}
              {isAutoCycling && (
                <motion.div
                  key={`${activeIdx}-${currentProductIdx}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-red-600 via-[#E21D1D] to-red-400 z-30 shadow-[0_0_8px_#E21D1D]"
                />
              )}

              <div className="flex items-center justify-between px-4 sm:px-7 py-3 text-[10px] font-mono tracking-widest text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-pulse" />
                  <span className="text-white font-black uppercase">
                    TRY WEARS • HIGH-DEFINITION PRODUCT SHOWCASE
                  </span>
                  <span className="hidden md:inline text-neutral-600">|</span>
                  <span className="hidden md:inline text-emerald-400 font-bold">
                    AUTO-CHANGING EVERY 2 SECONDS
                  </span>
                </div>

                {/* Auto-Cycle Control & Zoom View */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 border ${
                      isAutoCycling
                        ? "bg-[#E21D1D]/20 border-[#E21D1D] text-[#E21D1D]"
                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                    title={isAutoCycling ? "Pause 2s Auto Change" : "Resume 2s Auto Change"}
                  >
                    {isAutoCycling ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{isAutoCycling ? "2S AUTO: ON" : "PAUSED"}</span>
                  </button>

                  <button
                    onClick={() => setViewPreset(viewPreset === "standard" ? "zoom" : "standard")}
                    className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer border ${
                      viewPreset === "zoom"
                        ? "bg-[#E21D1D] text-white border-[#E21D1D]"
                        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"
                    }`}
                  >
                    {viewPreset === "zoom" ? "FIT" : "MAX ZOOM"}
                  </button>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN GRID: Left Large Product Stage | Right Custom Technical Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px]">
              
              {/* LEFT STAGE (7 COLS): Clean Studio Backdrop + HUGE PRODUCT IMAGE FITTING THE BOX */}
              <div className="lg:col-span-7 relative bg-[#070709] border-b lg:border-b-0 lg:border-r border-neutral-800/80 overflow-hidden flex flex-col justify-between p-3 sm:p-5">
                
                {/* ✦ Clean Studio Spotlight Backdrop (No 3D wireframe mesh or radar lines) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(226, 29, 29, 0.08) 0%, rgba(18, 18, 24, 0.5) 50%, #070709 90%)"
                  }}
                />

                {/* Top Overlay: Client Brand Badge for Current Product */}
                <div className="relative z-20 flex items-center justify-between gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-2 shadow-lg"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span className="text-white font-bold">{currentProduct.clientBrand}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-emerald-400 font-bold">{currentProduct.orderVolume}</span>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800 text-[9px] font-mono font-bold text-neutral-300 uppercase">
                      {currentProduct.badge}
                    </span>
                  </div>
                </div>

                {/* ✦ CENTER MAIN PRODUCT VIEWPORT: Product fills the entire box prominently in high quality */}
                <div className="relative z-10 flex-1 flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] my-2 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: viewPreset === "zoom" ? 1.15 : 1.02 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      {/* Realistic floor contact shadow underneath the product */}
                      <div className="absolute -bottom-4 w-72 sm:w-96 lg:w-[480px] h-8 bg-black/90 rounded-[100%] blur-xl pointer-events-none" />

                      {/* HUGE HIGH-DEFINITION CLOTHING IMAGE FITTING THE BOX */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2">
                        <img
                          src={currentProduct.image}
                          alt={currentProduct.alt}
                          className="h-[440px] sm:h-[530px] lg:h-[570px] w-auto max-w-[96%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] select-none transition-transform duration-300 hover:scale-105"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ✦ 4 MINI THUMBNAIL SELECTORS (Shows all 4 ready custom products, auto-cycles every 2s) */}
                <div className="relative z-20 space-y-2 pt-2 border-t border-neutral-800/70">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span>READY WHOLESALER DESIGNS (AUTO-CHANGING EVERY 2S):</span>
                    </span>
                    <span className="text-white font-bold">
                      [0{currentProductIdx + 1} / 0{current.clientProducts.length}]
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {current.clientProducts.map((prod, pIdx) => {
                      const isSelected = currentProductIdx === pIdx;
                      return (
                        <button
                          key={prod.id}
                          onClick={() => {
                            setCurrentProductIdx(pIdx);
                            setIsAutoCycling(false);
                          }}
                          className={`p-1.5 sm:p-2 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-center gap-2 ${
                            isSelected
                              ? "bg-neutral-900 border-[#E21D1D] shadow-[0_0_15px_rgba(226,29,29,0.35)] ring-1 ring-[#E21D1D]"
                              : "bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <div className="w-8 h-10 sm:w-10 sm:h-12 shrink-0 flex items-center justify-center">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                            />
                          </div>
                          <div className="hidden sm:block min-w-0">
                            <span className="text-[8px] font-mono font-bold text-[#E21D1D] uppercase block truncate">
                              {prod.badge}
                            </span>
                            <span className="text-[9px] font-mono text-white block truncate leading-tight">
                              {prod.clientBrand}
                            </span>
                          </div>
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
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-950/90 relative">
                
                {/* Red Brand Corner Accent Marks */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#E21D1D]" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#E21D1D]" />

                <div className="space-y-4">
                  {/* Category Identifier & Code */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black text-[#E21D1D] tracking-widest uppercase">
                      DIVISION [0{activeIdx + 1} / 0{CUSTOM_DIVISIONS.length}]
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      WHOLESALE READY
                    </span>
                  </div>

                  {/* Main Headline */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                      {current.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight leading-tight">
                      {current.heroHeadline}{" "}
                      <span className="text-[#E21D1D]">{current.subHeadline}</span>
                    </h3>
                  </div>

                  {/* ✦ DYNAMIC CLIENT PRODUCT CALLOUT (Updates automatically with the 2-second cycle) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 border-l-4 border-l-[#E21D1D] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-black text-white uppercase">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#E21D1D]" />
                          <span>CLIENT: {currentProduct.clientBrand}</span>
                        </div>
                        <span className="text-[9px] text-[#E21D1D] bg-[#E21D1D]/10 px-2 py-0.5 rounded border border-[#E21D1D]/30">
                          {currentProduct.country}
                        </span>
                      </div>
                      <p className="text-xs text-white font-mono font-bold">
                        {currentProduct.name}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                        {currentProduct.customizationDetails} • Fabric: <strong className="text-neutral-200">{currentProduct.fabricSpecs}</strong>
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Prominent Custom Capability Notice */}
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] font-sans text-neutral-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-white text-xs uppercase">
                      <Scissors className="w-3 h-3 text-[#E21D1D]" />
                      <span>DIRECT FACTORY OEM/ODM FACILITY</span>
                    </div>
                    <p className="leading-relaxed">
                      {current.b2bHighlight || current.urduHighlight}
                    </p>
                  </div>

                  {/* Product Technical Features Grid */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                      FACTORY STANDARDS & CUSTOM OPTIONS:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {current.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 p-2 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-[11px] font-mono text-neutral-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E21D1D] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Factory Specs (MOQ, Turnaround, Fabric Tech) */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
                    {current.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase block">
                          {sp.label}
                        </span>
                        <span className="text-xs font-mono font-black text-white uppercase block mt-0.5">
                          {sp.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Order Controls & Category Switcher */}
                <div className="pt-6 space-y-4 border-t border-neutral-800/80 mt-6">
                  
                  {/* Primary CTA Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(226,29,29,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>ORDER THIS CUSTOM PRODUCT</span>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={handlePrevProduct}
                        className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-[#E21D1D] transition-colors cursor-pointer"
                        title="Previous Custom Product"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextProduct}
                        className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-[#E21D1D] transition-colors cursor-pointer"
                        title="Next Custom Product"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Quick Specs Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span>ISO 9001 FACTORY DIRECT SIALKOT & NY</span>
                    </div>
                    <span className="text-white font-bold">24H CAD MOCKUPS</span>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </div>

        {/* BOTTOM FACTORY CAPABILITY PROMISES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                ANY PRODUCT, ANY CUT
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
                Send your tech pack or sketch — we deliver exact physical prototypes in 7 days.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                LOW 20–25 PCS MOQ
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
                Flexible low-minimum production runs tailored for startups and pro gyms.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Rotate3d className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                3D CAD PREVIEWS
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
                360-degree digital CLO-3D simulation approved prior to bulk cutting.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* CUSTOM RFQ / QUOTE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0e0e12] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#E21D1D]/20 text-[#E21D1D] flex items-center justify-center mx-auto border border-[#E21D1D]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-mono font-black uppercase text-white">
                    INQUIRY MOOSOOL HO GAYI!
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans max-w-sm mx-auto leading-relaxed">
                    Try Wears production team aapki custom design requirements check kar ke 12 ghanton ke andar WhatsApp ya email par rabta karegi.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-mono text-[#E21D1D] font-black uppercase tracking-widest block">
                      TRY WEARS BESPOKE ORDER
                    </span>
                    <h3 className="text-xl sm:text-2xl font-mono font-black uppercase mt-1 text-white">
                      CUSTOM PRODUCT ORDER ESTIMATE
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans mt-1">
                      Batayein aapko kis tarah ki custom tailoring ya private label manufacturing chahiye.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                      >
                        {CUSTOM_DIVISIONS.map((d) => (
                          <option key={d.id} value={d.categoryTitle}>
                            {d.categoryTitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                          Name / Brand *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name / Brand"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                          WhatsApp / Email *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="WhatsApp / Email"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                        Quantity
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                      >
                        <option>1-5 Pcs (Sample Prototype)</option>
                        <option>20-50 Pcs (Team Order / Small Run)</option>
                        <option>100-300 Pcs (Commercial Production)</option>
                        <option>500+ Pcs (Large Wholesale)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                        Custom Requirements / Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Sublimation football kits with custom gold crest, or 500 GSM boxy hoodies..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(226,29,29,0.3)]"
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
