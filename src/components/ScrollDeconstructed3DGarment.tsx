import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from "motion/react";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  X,
  Zap,
  ZoomIn,
  Factory,
  Sparkles,
  Layers,
  ChevronRight,
  Compass,
  Sparkle,
  Box,
  Sliders
} from "lucide-react";

export interface CategoryProduct {
  id: string;
  sampleNum: number;
  name: string;
  subtitle: string;
  image: string;
  badge: string;
  gsm: string;
  fabric: string;
  accentColor: string;
  moq: string;
  colorways: { name: string; hex: string }[];
  specs: string[];
}

export interface CategoryData {
  id: string;
  index: number;
  code: string;
  name: string;
  tagline: string;
  badge: string;
  themeColor: string;
  bgImage: string;
  bgAlt: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  alignImageLeft: boolean; // true = big image on left, false = big image on right (alternating sides!)
  products: CategoryProduct[];
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "sports-wears",
    index: 0,
    code: "01",
    name: "SPORTS WEARS",
    tagline: "CLO 3D MATCH GRADE • ZERO-FADE SUBLIMATION",
    badge: "MATCH GRADE ARMORY",
    themeColor: "#E21D1D",
    bgImage: "/images/backgrounds/sports_bg.jpg",
    bgAlt: "Professional sports athletes on stadium field under floodlights",
    description: "Tournament-grade football kits, basketball uniforms, and pro rugby jerseys engineered for high-aerobic breathability and extreme match-pull durability.",
    alignImageLeft: true, // Left: Big Image | Right: 9 Products (3x3)
    stats: [
      { label: "CATALOG SPEC", value: "9 OEM STYLES" },
      { label: "PULL RESISTANCE", value: "400N SEAMS" },
      { label: "MINIMUM ORDER", value: "25 PCS MOQ" },
    ],
    highlights: [
      "Micro-Interlock Capillary Wicking",
      "Laser-Cut Ventilation Side Panels",
      "Reinforced Flatlock Tension Seams",
      "Ultrasonic High-Frequency Badging"
    ],
    products: [
      {
        id: "sports-1",
        sampleNum: 1,
        name: "Sublimated Pro Match Jersey",
        subtitle: "Purple & Gold V-Neck",
        image: "/images/sports-wears/01_purple_jersey.png",
        badge: "CLO 3D MATCH GRADE",
        gsm: "220-GSM",
        fabric: "High-Tensile Micro-Interlock Poly",
        accentColor: "#9333EA",
        moq: "25 PCS",
        colorways: [
          { name: "Purple Obsidian", hex: "#7E22CE" },
          { name: "Royal Cobalt", hex: "#2563EB" },
          { name: "Gold Mirage", hex: "#F59E0B" }
        ],
        specs: ["180GSM Micro-Interlock Poly", "Zero-Fade Italian Sublimation", "Laser-Cut Ventilation Eyelets", "Anatomical Raglan Stretch Seams"]
      },
      {
        id: "sports-2",
        sampleNum: 2,
        name: "Classic Striped Football Kit",
        subtitle: "White & Blue Striped Match Fit",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        badge: "PRO ATHLETIC KIT",
        gsm: "200-GSM",
        fabric: "Anti-Bacterial Dri-Fit Polyester",
        accentColor: "#3B82F6",
        moq: "25 PCS",
        colorways: [
          { name: "Blue & White", hex: "#3B82F6" },
          { name: "Crimson Stripe", hex: "#EF4444" },
          { name: "Emerald Navy", hex: "#10B981" }
        ],
        specs: ["Laser-Cut Ventilation Side Panels", "Anti-Bacterial Hydrophobic Finish", "Reinforced Flatlock Pull Stitches", "Pre-Shrunk 4-Way Poly Weave"]
      },
      {
        id: "sports-3",
        sampleNum: 3,
        name: "Vanguard Squad Match Jersey",
        subtitle: "Deep Navy & Royal Blue",
        image: "/images/sports-wears/05_navy_jersey.png",
        badge: "MATCH LEVEL UNIFORM",
        gsm: "210-GSM",
        fabric: "High-Flex Poly with Quick-Dry Matrix",
        accentColor: "#2563EB",
        moq: "25 PCS",
        colorways: [
          { name: "Navy Royal", hex: "#1D4ED8" },
          { name: "Stealth Onyx", hex: "#18181B" },
          { name: "Solar Orange", hex: "#EA580C" }
        ],
        specs: ["Ergonomic Raglan Seam Blueprint", "Italian Molecular Sublimation", "400N Match-Pull Resistant Seaming", "Dual Curved Dynamic Scoop Hem"]
      },
      {
        id: "sports-4",
        sampleNum: 4,
        name: "Sublimated Championship Kit",
        subtitle: "Crimson & Midnight Technical Mesh",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "PRO ATHLETIC JERSEY",
        gsm: "230-GSM",
        fabric: "Rapid Moisture Dry Technical Mesh",
        accentColor: "#E21D1D",
        moq: "25 PCS",
        colorways: [
          { name: "Crimson Flame", hex: "#E21D1D" },
          { name: "Midnight Charcoal", hex: "#27272A" },
          { name: "Volt Gold", hex: "#EAB308" }
        ],
        specs: ["Rapid Capillary Moisture Dispersion", "High-Frequency Ultrasonic Emblems", "Honeycomb Anti-Chafing Underarm", "Heavy-Duty Stretch Durability"]
      },
      {
        id: "sports-5",
        sampleNum: 5,
        name: "Elite Tournament Basketball Tank",
        subtitle: "Pro Athletics Cut Wildcats #24",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "BASKETBALL PRO",
        gsm: "210-GSM",
        fabric: "Dual-Knit Birdseye Breathable Poly",
        accentColor: "#DC2626",
        moq: "25 PCS",
        colorways: [
          { name: "Crimson Red", hex: "#DC2626" },
          { name: "Black Shadow", hex: "#18181B" },
          { name: "Gold Medal", hex: "#F59E0B" }
        ],
        specs: ["Wide Shoulder Athletic Cut", "Reinforced Armhole Ribbing", "Zero-Bleed Italian Inks", "Drop-Tail Split Hem"]
      },
      {
        id: "sports-6",
        sampleNum: 6,
        name: "Pro Pitch Striped League Kit",
        subtitle: "Cyan & White Dynamic Stripes",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        badge: "PRO LEAGUE GRADE",
        gsm: "190-GSM",
        fabric: "Aerodynamic Micro-Pique Polyester",
        accentColor: "#0284C7",
        moq: "25 PCS",
        colorways: [
          { name: "Sky & White", hex: "#0284C7" },
          { name: "Navy Stripe", hex: "#1E3A8A" },
          { name: "Yellow Amber", hex: "#D97706" }
        ],
        specs: ["Hydro-Dynamic Surface Texture", "Anti-Snag Warp Knit Fabric", "Sublimated Crest Badge", "Ergonomic Underarm Gusset"]
      },
      {
        id: "sports-7",
        sampleNum: 7,
        name: "Imperial Royal Club Jersey",
        subtitle: "Deep Purple & Gold Trim",
        image: "/images/sports-wears/01_purple_jersey.png",
        badge: "CLUB EDITION",
        gsm: "220-GSM",
        fabric: "Diamond-Interlock Moisture Poly",
        accentColor: "#7C3AED",
        moq: "25 PCS",
        colorways: [
          { name: "Imperial Violet", hex: "#7C3AED" },
          { name: "Metallic Gold", hex: "#CA8A04" },
          { name: "Pure White", hex: "#F8FAFC" }
        ],
        specs: ["V-Neck Ergonomic Collar Band", "Anti-Static Finish", "Reinforced Neck Taping", "Ultra-Vivid Neon Sublimation"]
      },
      {
        id: "sports-8",
        sampleNum: 8,
        name: "Stealth Tactical Training Kit",
        subtitle: "Midnight Navy Interlock",
        image: "/images/sports-wears/05_navy_jersey.png",
        badge: "TACTICAL TRAINING",
        gsm: "205-GSM",
        fabric: "Thermal Dissipation Microfiber",
        accentColor: "#1E40AF",
        moq: "25 PCS",
        colorways: [
          { name: "Midnight Navy", hex: "#1E40AF" },
          { name: "Steel Grey", hex: "#475569" },
          { name: "Acid Lime", hex: "#84CC16" }
        ],
        specs: ["Thermo-Regulating Weave", "Flatlock Smooth Stitches", "Silicone Gripper Hem", "Fast Wash Quick-Dry"]
      },
      {
        id: "sports-9",
        sampleNum: 9,
        name: "Apex Striker Match Uniform",
        subtitle: "Scarlet Red High-Speed Fit",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "MATCH STRIKER",
        gsm: "215-GSM",
        fabric: "Rapid Moisture Capillary Poly",
        accentColor: "#B91C1C",
        moq: "25 PCS",
        colorways: [
          { name: "Scarlet Fire", hex: "#B91C1C" },
          { name: "Obsidian", hex: "#09090B" },
          { name: "Silver Metal", hex: "#94A3B8" }
        ],
        specs: ["4-Way Compression Sides", "Laser-Cut Back Ventilation", "Silicone Heat-Seal Logos", "Anti-Odor Bio-Poly Treatment"]
      }
    ]
  },
  {
    id: "gym-fitness",
    index: 1,
    code: "02",
    name: "GYM & FITNESS WEARS",
    tagline: "4-WAY POWER COMPRESSION • ERGONOMIC MAPPING",
    badge: "3D POWER KNIT",
    themeColor: "#3B82F6",
    bgImage: "/images/backgrounds/gym_bg.jpg",
    bgAlt: "Intense athletic fitness workout and bodybuilders in moody gym",
    description: "Anatomically mapped compression rashguards, heavy ribbed seamless tops, stringers, and protective hex armor designed to maximize muscular stability and heat dissipation.",
    alignImageLeft: false, // Sides Change! Left: 9 Products (3x3) | Right: Big Image
    stats: [
      { label: "CATALOG SPEC", value: "9 OEM STYLES" },
      { label: "COMPRESSION", value: "320GSM POWER KNIT" },
      { label: "MINIMUM ORDER", value: "30 PCS MOQ" },
    ],
    highlights: [
      "320GSM Ribbed Muscle Compression",
      "Ergonomic Vascular Zone Mapping",
      "Silver-Ion Infused Anti-Odor Yarn",
      "Zero-Chafe Tubular Seamless Build"
    ],
    products: [
      {
        id: "gym-1",
        sampleNum: 1,
        name: "Seamless Ergonomic Compression Top",
        subtitle: "3D High-Flex Athletic Knit",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "3D SEAMLESS KNIT",
        gsm: "320-GSM",
        fabric: "Ribbed Compression Spandex Blend",
        accentColor: "#3B82F6",
        moq: "30 PCS",
        colorways: [
          { name: "Stealth Black", hex: "#18181B" },
          { name: "Cobalt Blue", hex: "#2563EB" },
          { name: "Combat Charcoal", hex: "#3F3F46" }
        ],
        specs: ["320GSM Ribbed Muscle Compression", "Ergonomic Vascular Mapping", "Anti-Odor Silver-Ion Infused Yarn", "Zero-Chafe Seamless Tubular Construction"]
      },
      {
        id: "gym-2",
        sampleNum: 2,
        name: "Sculpted Hexagonal Impact Armor Top",
        subtitle: "High-Impact Training Protection Top",
        image: "/images/gym-fitness/06_padded_armor.png",
        badge: "HEX IMPACT FOAM ARMOR",
        gsm: "340-GSM",
        fabric: "Closed-Cell Hex Foam & Lycra",
        accentColor: "#06B6D4",
        moq: "30 PCS",
        colorways: [
          { name: "Tactical Cyan", hex: "#06B6D4" },
          { name: "Shadow Black", hex: "#09090B" },
          { name: "Desert Camo", hex: "#78716C" }
        ],
        specs: ["Sculpted Hex Foam Padding in Core/Shoulders", "Energy Absorption Impact Rating", "4-Way Dynamic Flex Range", "Reinforced Flatlock Double Seams"]
      },
      {
        id: "gym-3",
        sampleNum: 3,
        name: "Pro Bodybuilding Stringer Tank",
        subtitle: "Deep-Cut Athletic Armholes",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        badge: "PERFORMANCE STRINGER",
        gsm: "180-GSM",
        fabric: "Ultra-Lightweight Microfiber Poly",
        accentColor: "#E21D1D",
        moq: "50 PCS",
        colorways: [
          { name: "Bloodline Red", hex: "#DC2626" },
          { name: "Onyx Black", hex: "#18181B" },
          { name: "Arctic Ice", hex: "#F8FAFC" }
        ],
        specs: ["Deep Athletic Y-Back Racer Silhouette", "Raw Edge Reinforced Anti-Fray Hem", "Quick-Dry Breathable Microfiber", "Drop Cut V-Taper Cutout Design"]
      },
      {
        id: "gym-4",
        sampleNum: 4,
        name: "4-Way Muscle Fit Compression Top",
        subtitle: "Ergonomic Training Shield",
        image: "/images/gym-fitness/gym_compression_top.png",
        badge: "ERGONOMIC RASHGUARD",
        gsm: "280-GSM",
        fabric: "Muscle-Mapped Contouring Spandex",
        accentColor: "#10B981",
        moq: "30 PCS",
        colorways: [
          { name: "Emerald Green", hex: "#059669" },
          { name: "Obsidian", hex: "#18181B" },
          { name: "Combat Silver", hex: "#64748B" }
        ],
        specs: ["Muscle-Mapped Contouring Fit", "Honeycomb Breathable Mesh Panels", "UV50+ Anti-Chafing Spandex Skin", "Full Range BJJ / MMA / Gym Durability"]
      },
      {
        id: "gym-5",
        sampleNum: 5,
        name: "Thermal Zone-Knit Base Layer Top",
        subtitle: "High-Compression Cold-Gear",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "ZONE-KNIT BASE",
        gsm: "330-GSM",
        fabric: "Brushed Micro-Fleece Spandex Composite",
        accentColor: "#2563EB",
        moq: "30 PCS",
        colorways: [
          { name: "Pitch Black", hex: "#09090B" },
          { name: "Steel Grey", hex: "#64748B" },
          { name: "Navy Blue", hex: "#1E3A8A" }
        ],
        specs: ["Thermal Retention Nano Layer", "Reinforced Muscle Stabilization", "Hydrophobic Sweat Repel", "Ergonomic Raglan Sleeves"]
      },
      {
        id: "gym-6",
        sampleNum: 6,
        name: "Hex Shield Chest Protective Vest",
        subtitle: "Impact Absorbing Training Armor",
        image: "/images/gym-fitness/06_padded_armor.png",
        badge: "HEX CHEST ARMOR",
        gsm: "350-GSM",
        fabric: "High-Density EVA Hex Foam & Poly",
        accentColor: "#0891B2",
        moq: "30 PCS",
        colorways: [
          { name: "Combat Camo", hex: "#0891B2" },
          { name: "Dark Shadow", hex: "#18181B" },
          { name: "Ranger Green", hex: "#15803D" }
        ],
        specs: ["10mm Dense Hexagonal Padding", "Rib & Solar Plexus Guard", "Breathable Perforated Channels", "Zero Slip Grip Interior"]
      },
      {
        id: "gym-7",
        sampleNum: 7,
        name: "Heavy Drop-Tail Bodybuilding Tank",
        subtitle: "Extended Hem V-Taper Cut",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        badge: "EXTENDED V-TAPER",
        gsm: "190-GSM",
        fabric: "95% Cotton / 5% High-Tensile Elastane",
        accentColor: "#EF4444",
        moq: "50 PCS",
        colorways: [
          { name: "Crimson Red", hex: "#EF4444" },
          { name: "Carbon Grey", hex: "#374151" },
          { name: "Crisp White", hex: "#FFFFFF" }
        ],
        specs: ["Extended Scallop Drop Tail Hem", "Reinforced Twin-Needle Seams", "Pre-Shrunk Reactive Dye", "Deep Armhole Lat Flare"]
      },
      {
        id: "gym-8",
        sampleNum: 8,
        name: "Vascular Sculpting Rashguard",
        subtitle: "Lockdown Muscle Grip Poly",
        image: "/images/gym-fitness/gym_compression_top.png",
        badge: "LOCKDOWN COMPRESSION",
        gsm: "290-GSM",
        fabric: "88% Poly / 12% Spandex Hydro-Lock",
        accentColor: "#059669",
        moq: "30 PCS",
        colorways: [
          { name: "Hunter Green", hex: "#059669" },
          { name: "Stealth Black", hex: "#09090B" },
          { name: "Cobalt Rush", hex: "#2563EB" }
        ],
        specs: ["Vascular Pressure Gradient", "Flatlock Seam Zero Abrasion", "UPF 50+ Sun Protection", "Full 360 Degree Elastic Flex"]
      },
      {
        id: "gym-9",
        sampleNum: 9,
        name: "Micro-Ribbed Seamless Muscle Tee",
        subtitle: "Ultra-Flex Tubular Form",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "MICRO-RIBBED",
        gsm: "310-GSM",
        fabric: "Polyamide Microfiber Seamless Yarn",
        accentColor: "#3B82F6",
        moq: "30 PCS",
        colorways: [
          { name: "Asphalt Grey", hex: "#4B5563" },
          { name: "Pure Navy", hex: "#1E3A8A" },
          { name: "Jet Black", hex: "#111827" }
        ],
        specs: ["Zoned Ribbed Stretch Architecture", "Underarm Ventilation Eyelets", "Ultra-Light 2nd Skin Feel", "Shape Retention Elasticity"]
      }
    ]
  },
  {
    id: "street-wears",
    index: 2,
    code: "03",
    name: "STREET WEARS",
    tagline: "450GSM HEAVYWEIGHT FLEECE • LUXURY SILHOUETTES",
    badge: "HEAVYWEIGHT URBAN",
    themeColor: "#F59E0B",
    bgImage: "/images/backgrounds/street_bg.jpg",
    bgAlt: "Cinematic night urban city street with glowing neon lights and street fashion atmosphere",
    description: "Bespoke luxury streetwear silhouettes including boxy 450GSM French terry hoodies, heavy vintage wash tees, and modern techwear outerwear built for high-end boutique brands.",
    alignImageLeft: true, // Sides Change! Left: Big Image | Right: 9 Products (3x3)
    stats: [
      { label: "CATALOG SPEC", value: "9 OEM STYLES" },
      { label: "FLEECE WEIGHT", value: "450-500 GSM" },
      { label: "MINIMUM ORDER", value: "30 PCS MOQ" },
    ],
    highlights: [
      "100% Pre-Shrunk Combed Loopback Cotton",
      "Double Layer Structured Rigid Hoods",
      "Heavy Vintage Enzyme Mineral Washes",
      "Custom Engraved Gunmetal Metal Hardware"
    ],
    products: [
      {
        id: "street-1",
        sampleNum: 1,
        name: "Luxury 450GSM French Terry Hoodie",
        subtitle: "Oversized Streetwear Silhouette",
        image: "/images/street-wears/street_hoodie.png",
        badge: "450GSM FRENCH TERRY",
        gsm: "450-GSM",
        fabric: "100% Pre-Shrunk Combed Cotton",
        accentColor: "#F59E0B",
        moq: "30 PCS",
        colorways: [
          { name: "Washed Obsidian", hex: "#1C1917" },
          { name: "Vintage Bone", hex: "#E7E5E4" },
          { name: "Desert Sand", hex: "#D97706" }
        ],
        specs: ["100% Pre-Shrunk Organic Cotton Fleece", "Double Layer Structured Heavyweight Hood", "Dropped Shoulder Boxy Relaxed Cut", "Custom Engraved Gunmetal Metal Eyelets"]
      },
      {
        id: "street-2",
        sampleNum: 2,
        name: "Heavyweight Raglan Zip Street Hoodie",
        subtitle: "Red/White Contrast Raglan",
        image: "/images/street-wears/03_red_white_hoodie.png",
        badge: "HEAVYWEIGHT RAGLAN",
        gsm: "420-GSM",
        fabric: "Brushed Loopback Fleece Cotton",
        accentColor: "#EF4444",
        moq: "30 PCS",
        colorways: [
          { name: "Crimson & Bone", hex: "#DC2626" },
          { name: "Charcoal Slate", hex: "#334155" },
          { name: "Monochrome Black", hex: "#09090B" }
        ],
        specs: ["Heavy Antique Silver YKK #8 Metal Zipper", "Raglan Colorblock Sleeve Blueprint", "Reinforced 2x2 Thick Ribbed Cuffs", "Pouch Pocket with Bar-Tack Reinforcement"]
      },
      {
        id: "street-3",
        sampleNum: 3,
        name: "Washed Heavyweight Oversized Tee",
        subtitle: "300GSM Vintage Mineral Wash",
        image: "/images/street-wears/street_oversized_tee.png",
        badge: "300GSM OVERSIZED TEE",
        gsm: "300-GSM",
        fabric: "Heavy Vintage Wash Combed Jersey",
        accentColor: "#A855F7",
        moq: "50 PCS",
        colorways: [
          { name: "Vintage Charcoal", hex: "#262626" },
          { name: "Washed Olive", hex: "#365314" },
          { name: "Faded Mauve", hex: "#581C87" }
        ],
        specs: ["1.2\" Heavy Ribbed Crewneck Collar", "Enzyme Acid Vintage Wash Treatment", "Twin-Needle Reinforced Shoulder Taping", "Dropped Seam Relaxed Boxy Fit"]
      },
      {
        id: "street-4",
        sampleNum: 4,
        name: "Urban Techwear Streetwear Jacket",
        subtitle: "Matte Black Tactical Shell",
        image: "/images/street-wears/street_tech_jacket.png",
        badge: "URBAN TECHWEAR",
        gsm: "360-GSM",
        fabric: "Waterproof Matte Poly DWR Shell",
        accentColor: "#E21D1D",
        moq: "25 PCS",
        colorways: [
          { name: "Tactical Matte Black", hex: "#0F172A" },
          { name: "Cyber Silver", hex: "#94A3B8" },
          { name: "Military Olive", hex: "#3F6212" }
        ],
        specs: ["Dual Waterproof Aquaguard Zips", "Multiple Modular Cargo Pockets", "Articulated Elbow Bending Seams", "Matte DWR Weatherproof Performance"]
      },
      {
        id: "street-5",
        sampleNum: 5,
        name: "Vintage Mineral Acid-Wash Hoodie",
        subtitle: "500GSM Heavyweight Loopback",
        image: "/images/street-wears/street_hoodie.png",
        badge: "500GSM ACID WASH",
        gsm: "500-GSM",
        fabric: "Heavy 100% Cotton French Terry",
        accentColor: "#D97706",
        moq: "30 PCS",
        colorways: [
          { name: "Acid Charcoal", hex: "#1F2937" },
          { name: "Faded Concrete", hex: "#6B7280" },
          { name: "Dusk Khaki", hex: "#78716C" }
        ],
        specs: ["Heavy Enzyme Acid Bleach Distress", "Double Ribbed Waist Band", "Seamless Hood Center Seam", "Oversized Silhouette Standard"]
      },
      {
        id: "street-6",
        sampleNum: 6,
        name: "Contrast Two-Tone Zip Street Track",
        subtitle: "Crimson & Heather Grey Blocks",
        image: "/images/street-wears/03_red_white_hoodie.png",
        badge: "COLORBLOCK STREET",
        gsm: "400-GSM",
        fabric: "High-Density Brushed Cotton Poly",
        accentColor: "#DC2626",
        moq: "30 PCS",
        colorways: [
          { name: "Scarlet & White", hex: "#DC2626" },
          { name: "Black & Mustard", hex: "#CA8A04" },
          { name: "Royal & Silver", hex: "#2563EB" }
        ],
        specs: ["Custom Colorblock Cut & Sew", "Antique Silver Metal Puller", "Reinforced Pocket Welts", "Drop Shoulder Comfort Fit"]
      },
      {
        id: "street-7",
        sampleNum: 7,
        name: "Boxy Drop-Shoulder Heavy Tee",
        subtitle: "280GSM Organic Combed Cotton",
        image: "/images/street-wears/street_oversized_tee.png",
        badge: "280GSM BOXY TEE",
        gsm: "280-GSM",
        fabric: "100% Pre-Shrunk Combed Cotton",
        accentColor: "#9333EA",
        moq: "50 PCS",
        colorways: [
          { name: "Obsidian Black", hex: "#09090B" },
          { name: "Raw Cream", hex: "#FEF3C7" },
          { name: "Faded Sage", hex: "#4D7C0F" }
        ],
        specs: ["Square Boxy Torso Fit", "High-Density Thick Collar", "Double-Stitched Sleeve Cuffs", "Silicone Softening Wash"]
      },
      {
        id: "street-8",
        sampleNum: 8,
        name: "Tactical Modular Utility Anorak",
        subtitle: "Weatherproof Ripstop Shell",
        image: "/images/street-wears/street_tech_jacket.png",
        badge: "TACTICAL RIPSTOP",
        gsm: "340-GSM",
        fabric: "DWR Coated Diamond Ripstop Poly",
        accentColor: "#EF4444",
        moq: "25 PCS",
        colorways: [
          { name: "Stealth Black", hex: "#09090B" },
          { name: "Army Drab", hex: "#3F6212" },
          { name: "Gunmetal", hex: "#475569" }
        ],
        specs: ["Dual Front Kangaroo Zip Compartment", "Adjustable Bungee Cinch Hem", "Storm-Flap Velcro Cuffs", "Taped Seam Construction"]
      },
      {
        id: "street-9",
        sampleNum: 9,
        name: "Bespoke Raw-Edge Fleece Pullover",
        subtitle: "460GSM Custom Luxury Fleece",
        image: "/images/street-wears/street_hoodie.png",
        badge: "RAW-EDGE FLEECE",
        gsm: "460-GSM",
        fabric: "Custom Milled Heavyweight Cotton",
        accentColor: "#F59E0B",
        moq: "30 PCS",
        colorways: [
          { name: "Raw Camel", hex: "#D97706" },
          { name: "Shadow Obsidian", hex: "#18181B" },
          { name: "Ghost White", hex: "#F3F4F6" }
        ],
        specs: ["Raw-Cut Hemline with Stay Stitch", "Double Layered Rigid Hood", "Bar-Tack Reinforced Stress Points", "Custom Brand Neck Taping"]
      }
    ]
  },
  {
    id: "leather-jackets",
    index: 3,
    code: "04",
    name: "LEATHER JACKETS",
    tagline: "1.2MM DRUM-DYED COWHIDE • HANDCRAFTED HEIRLOOM",
    badge: "1.2MM FULL GRAIN",
    themeColor: "#D97706",
    bgImage: "/images/backgrounds/leather_bg.jpg",
    bgAlt: "Vintage motorcycle cafe racer on highway at dusk with handcrafted leather ambiance",
    description: "Grade-A drum-dyed full-grain leather outerwear, asymmetric moto jackets, genuine shearling aviators, and wool/leather varsity squad coats handcrafted by generational masters.",
    alignImageLeft: false, // Sides Change! Left: 9 Products (3x3) | Right: Big Image
    stats: [
      { label: "CATALOG SPEC", value: "9 OEM STYLES" },
      { label: "LEATHER GRADE", value: "1.2MM FULL GRAIN" },
      { label: "MINIMUM ORDER", value: "15 PCS MOQ" },
    ],
    highlights: [
      "1.2mm Hand-Selected Drum-Dyed Cowhide",
      "Antique Brass/Silver Heavy YKK Hardware",
      "Diamond-Quilted Thermal Satin Linings",
      "Handcrafted Sialkot Artisanal Craftsmanship"
    ],
    products: [
      {
        id: "leather-1",
        sampleNum: 1,
        name: "Full-Grain Cowhide Biker Moto Jacket",
        subtitle: "Asymmetric Heavy Moto Outerwear",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "1.2MM COWHIDE LEATHER",
        gsm: "1.2MM LEATHER",
        fabric: "100% Grade-A Natural Cowhide",
        accentColor: "#E21D1D",
        moq: "15 PCS",
        colorways: [
          { name: "Obsidian Black", hex: "#09090B" },
          { name: "Antique Brown", hex: "#451A03" },
          { name: "Bloodline Crimson", hex: "#991B1B" }
        ],
        specs: ["1.2mm Drum-Dyed Natural Cowhide", "Heavy Antique Silver YKK Asymmetrical Zips", "Diamond-Quilted Thermal Interior Lining", "Cast Solid Steel Roller Buckle Waist Belt"]
      },
      {
        id: "leather-2",
        sampleNum: 2,
        name: "Heritage Wool & Leather Varsity",
        subtitle: "Custom Chenille Squad Jacket",
        image: "/images/leather-jackets/leather_varsity.png",
        badge: "MELTON WOOL & COWHIDE",
        gsm: "24OZ WOOL",
        fabric: "24oz Melton Wool & Cowhide Sleeves",
        accentColor: "#D97706",
        moq: "20 PCS",
        colorways: [
          { name: "Burgundy & Ivory", hex: "#831843" },
          { name: "Black & Cream", hex: "#1C1917" },
          { name: "Forest & Gold", hex: "#14532D" }
        ],
        specs: ["24oz Melton Wool Insulated Body", "Genuine Top-Grain Cowhide Leather Sleeves", "Custom Chainstitch & Chenille Embroidery Ready", "Heavy Brass Snap Closure Hardware"]
      },
      {
        id: "leather-3",
        sampleNum: 3,
        name: "Waxed Cafe Racer Moto Leather Jacket",
        subtitle: "Mandarin Snap Collar Silhouette",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        badge: "MANDARIN SNAP MOTO",
        gsm: "1.1MM LEATHER",
        fabric: "Distressed Hand-Waxed Cowhide",
        accentColor: "#B45309",
        moq: "15 PCS",
        colorways: [
          { name: "Antique Cognac", hex: "#78350F" },
          { name: "Espresso Brown", hex: "#38220F" },
          { name: "Carbon Slate", hex: "#1E293B" }
        ],
        specs: ["Hand-Distressed Waxed Top-Grain Leather", "Padded Diamond Stitch Bicep & Shoulder Detail", "Bi-Swing Action Back for Riding Comfort", "Heavy Antique Brass Zippers & Snaps"]
      },
      {
        id: "leather-4",
        sampleNum: 4,
        name: "Aviator Shearling Bomber Jacket",
        subtitle: "Authentic Shearling Flight Coat",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        badge: "SHEARLING AVIATOR BOMBER",
        gsm: "1.3MM LEATHER",
        fabric: "Full-Grain Leather with Shearling",
        accentColor: "#854D0E",
        moq: "15 PCS",
        colorways: [
          { name: "Bomber Espresso", hex: "#451A03" },
          { name: "Dark Chocolate", hex: "#271206" },
          { name: "Vintage Tan", hex: "#A16207" }
        ],
        specs: ["Rich Espresso Full-Grain Waxed Cowhide", "Plush Natural Shearling Wool Lapel Collar", "Dual Brass Neck Buckle Throat Latches", "Heavy Ribbed Knit Storm Waist & Cuffs"]
      },
      {
        id: "leather-5",
        sampleNum: 5,
        name: "Double-Rider Blackout Moto Jacket",
        subtitle: "Matte Black YKK Gunmetal Hardware",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "BLACKOUT RIDER",
        gsm: "1.2MM COWHIDE",
        fabric: "Drum-Dyed Top-Grain Cowhide",
        accentColor: "#DC2626",
        moq: "15 PCS",
        colorways: [
          { name: "Matte Blackout", hex: "#09090B" },
          { name: "Charcoal Oil", hex: "#1C1917" },
          { name: "Dark Cherry", hex: "#701A75" }
        ],
        specs: ["Full Grain Hand-Selected Hide", "Reinforced Elbow Impact Armor Pockets", "Heavy Action Pleat Shoulders", "Full Satin Wind-Block Lining"]
      },
      {
        id: "leather-6",
        sampleNum: 6,
        name: "Classic Two-Tone Squad Varsity",
        subtitle: "Emerald Wool & Bone White Leather",
        image: "/images/leather-jackets/leather_varsity.png",
        badge: "EMERALD VARSITY",
        gsm: "24OZ MELTON",
        fabric: "Heavyweight Wool + Premium Leather",
        accentColor: "#059669",
        moq: "20 PCS",
        colorways: [
          { name: "Emerald & Bone", hex: "#059669" },
          { name: "Navy & Cream", hex: "#1E3A8A" },
          { name: "All Black Squad", hex: "#000000" }
        ],
        specs: ["Custom Chenille Squad Embroidery Ready", "Genuine Full-Grain Leather Pocket Welts", "Thick 2x2 Striped Ribbed Collar & Hem", "Quilted Diamond Satin Interior"]
      },
      {
        id: "leather-7",
        sampleNum: 7,
        name: "Vintage Distressed Brown Cafe Racer",
        subtitle: "Hand-Rubbed Patina Finish",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        badge: "DISTRESSED PATINA",
        gsm: "1.2MM COWHIDE",
        fabric: "Hand-Aged Distressed Waxed Cowhide",
        accentColor: "#92400E",
        moq: "15 PCS",
        colorways: [
          { name: "Vintage Cognac", hex: "#92400E" },
          { name: "Worn Saddle", hex: "#78350F" },
          { name: "Dark Walnut", hex: "#3B2219" }
        ],
        specs: ["Hand-Applied Wax Buffed Patina", "Mandarin Snap Throat Collar", "Zippered Gusset Sleeve Cuffs", "Dual Chest Horizontal Pockets"]
      },
      {
        id: "leather-8",
        sampleNum: 8,
        name: "B-3 WWII Fighter Pilot Shearling Coat",
        subtitle: "100% Heavy Merino Wool Lining",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        badge: "B-3 FLIGHT COAT",
        gsm: "1.4MM LEATHER",
        fabric: "Heavy Leather + Genuine Shearling",
        accentColor: "#78350F",
        moq: "15 PCS",
        colorways: [
          { name: "Dark Brown Flight", hex: "#451A03" },
          { name: "Aviator Tan", hex: "#92400E" },
          { name: "Military Black", hex: "#18181B" }
        ],
        specs: ["Natural 15mm Dense Wool Interior", "Double Buckle Collar Latches", "Solid Antique Brass Side Buckles", "Reinforced Cowhide Outer Taping"]
      },
      {
        id: "leather-9",
        sampleNum: 9,
        name: "Diamond-Quilted Biker Leather Jacket",
        subtitle: "Padded Shoulders & Kidney Protector",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "QUILTED BIKER",
        gsm: "1.3MM COWHIDE",
        fabric: "Grade-A Drum-Dyed Cowhide",
        accentColor: "#B91C1C",
        moq: "15 PCS",
        colorways: [
          { name: "Pitch Obsidian", hex: "#09090B" },
          { name: "Cognac Amber", hex: "#B45309" },
          { name: "Dark Ruby", hex: "#831843" }
        ],
        specs: ["Diamond-Stitched Padding Panels", "Heavy Duty #10 Metal Zippers", "Concealed Internal Carry Pocket", "Solid Cast Metal Snap Buttons"]
      }
    ]
  }
];

// ==============================================================
// 1. INTERACTIVE 3D PRODUCT CARD COMPONENT
// Features: True 3D perspective tilt with mouse tracking,
// specular glass sheen, floating garment cutout (translateZ 45px),
// column-based tiered scroll parallax, and idle breathing float.
// ==============================================================
interface ProductCardProps {
  product: CategoryProduct;
  index: number;
  scrollYProgress: any;
  onInspect: (product: CategoryProduct) => void;
}

const Interactive3DProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  scrollYProgress,
  onInspect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics in 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 22,
    stiffness: 240
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 22,
    stiffness: 240
  });

  // Column calculation (0, 1, 2) for tiered 3D scroll depth separation
  const col = index % 3;
  const row = Math.floor(index / 3);

  // Column-based parallax scroll separation (creates dynamic 3D depth between columns)
  const columnParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    col === 0 ? [-20, 20] : col === 1 ? [0, 0] : [20, -20]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Specular reflection gradient based on mouse position
  const glossX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: columnParallaxY,
        perspective: "1100px"
      }}
      initial={{ opacity: 0, y: 45, rotateX: 18, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.75,
        delay: (col * 0.07) + (row * 0.05),
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onInspect(product)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.25 }
        }}
        className={`relative h-full rounded-2xl border transition-colors duration-300 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer group bg-neutral-950/85 backdrop-blur-md overflow-hidden ${
          isHovered
            ? "border-neutral-500 shadow-[0_22px_45px_rgba(0,0,0,0.95)] bg-neutral-900/90"
            : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60"
        }`}
      >
        {/* Dynamic Specular Gloss Sheen follows cursor */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl z-20 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 65%)`,
              left: glossX,
              top: glossY,
              transform: "translate(-50%, -50%)",
              width: "140%",
              height: "140%"
            }}
          />
        )}

        {/* Ambient Backlight Glow matching product accent */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: product.accentColor,
            opacity: isHovered ? 0.45 : 0.06
          }}
        />

        {/* Top Card Info (elevated in 3D: translateZ 18px) */}
        <div
          className="z-10 flex items-start justify-between gap-1 mb-1"
          style={{ transform: "translateZ(18px)" }}
        >
          <div className="truncate">
            <span className="font-mono text-[8px] font-bold text-neutral-500 uppercase block">
              SAMPLE #{product.sampleNum < 10 ? `0${product.sampleNum}` : product.sampleNum}
            </span>
            <h5 className="font-display font-black text-xs text-white uppercase tracking-tight line-clamp-1 group-hover:text-[#E21D1D] transition-colors">
              {product.name}
            </h5>
            <span className="font-mono text-[8px] text-neutral-400 block truncate">
              {product.subtitle}
            </span>
          </div>

          <span
            className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded border uppercase shrink-0"
            style={{
              borderColor: `${product.accentColor}66`,
              color: product.accentColor,
              backgroundColor: `${product.accentColor}15`
            }}
          >
            {product.gsm}
          </span>
        </div>

        {/* 100% TRANSPARENT PNG GARMENT CUTOUT WITH 3D FLOAT & DYNAMIC GROUND SHADOW */}
        <div
          className="relative w-full h-[155px] sm:h-[170px] flex items-center justify-center my-1.5"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Reactive 3D Ground Shadow */}
          <motion.div
            className="absolute bottom-1 w-3/4 h-3.5 rounded-full blur-[7px] pointer-events-none"
            animate={{
              scale: isHovered ? 0.8 : [0.92, 1.05, 0.92],
              opacity: isHovered ? 0.95 : 0.75
            }}
            transition={{
              scale: isHovered ? { duration: 0.25 } : { duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.25 }
            }}
            style={{
              background: "rgba(0, 0, 0, 0.95)"
            }}
          />

          {/* Transparent Product Cutout Image elevated forward in 3D (translateZ 35px -> 50px) */}
          <motion.div
            className="relative z-10 max-w-full max-h-full flex items-center justify-center"
            style={{
              transform: isHovered ? "translateZ(50px)" : "translateZ(30px)"
            }}
            animate={{
              y: isHovered ? -10 : [0, -5, 0]
            }}
            transition={{
              y: isHovered
                ? { duration: 0.25, ease: "easeOut" }
                : { duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`max-w-full max-h-[145px] sm:max-h-[160px] object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.85)] transition-all duration-300 ${
                isHovered
                  ? "scale-115 drop-shadow-[0_26px_36px_rgba(0,0,0,1)]"
                  : "opacity-95"
              }`}
              loading="lazy"
            />
          </motion.div>

          {/* Hover Quick Zoom / 3D Spec Pill */}
          <div
            className={`absolute top-1 right-1 bg-black/85 border border-white/20 text-white p-1.5 rounded-full transition-all duration-200 z-30 ${
              isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-1"
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#E21D1D]" />
          </div>
        </div>

        {/* Bottom Card Meta (translateZ 18px in 3D) */}
        <div
          className="z-10 space-y-1 pt-1.5 border-t border-neutral-800"
          style={{ transform: "translateZ(18px)" }}
        >
          <p className="font-mono text-[8px] text-neutral-400 line-clamp-1">
            {product.fabric}
          </p>

          <div className="flex items-center justify-between font-mono text-[8px]">
            <span className="text-neutral-500">MOQ: {product.moq}</span>
            <span className="flex items-center gap-1 font-bold text-white group-hover:text-[#E21D1D] transition-colors">
              <span>3D SPECS</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==============================================================
// 2. CATEGORY SHOWCASE SECTION COMPONENT
// Features: Section-level useScroll, 3D curved perspective on Big Image,
// parallax vertical motion, cinematic background scaling, dynamic glass
// reflection sweep, and exact matching equal height with 3x3 grid!
// ==============================================================
interface CategoryShowcaseSectionProps {
  category: CategoryData;
  onInspect: (product: CategoryProduct) => void;
}

const CategoryShowcaseSection: React.FC<CategoryShowcaseSectionProps> = ({
  category,
  onInspect
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isLeftImage = category.alignImageLeft;

  // Scroll Progress across this category section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax calculations for the Big Contextual Hero
  const heroY = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const heroRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [3.5, -3.5] : [-3.5, 3.5]
  );
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [2.5, -2.5]);
  const heroBgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.04, 1.1]);
  const lightSheenX = useTransform(scrollYProgress, [0, 1], ["-120%", "220%"]);

  return (
    <section
      ref={sectionRef}
      id={`cat-section-${category.id}`}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Subtle Ambient Background Light */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[170px] pointer-events-none opacity-15"
        style={{
          backgroundColor: category.themeColor,
          left: isLeftImage ? "10%" : "60%"
        }}
      />

      {/* Atmospheric Floating 3D Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: category.themeColor,
              left: `${12 + i * 15}%`,
              top: `${20 + (i % 4) * 20}%`,
              opacity: 0.3
            }}
            animate={{
              y: [-18, 18, -18],
              x: [-10, 10, -10],
              opacity: [0.15, 0.5, 0.15],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: 4.5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Row Grid: 12 Columns with items-stretch ensuring EXACT equal heights! */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ============================================================== */}
          {/* BIG CONTEXTUAL HERO IMAGE BLOCK (3D PARALLAX & EQUAL HEIGHT!)  */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-5 flex flex-col h-full ${
              isLeftImage ? "lg:order-1" : "lg:order-2"
            }`}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{
                y: heroY,
                rotateY: heroRotateY,
                rotateX: heroRotateX,
                transformStyle: "preserve-3d"
              }}
              className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 flex-1 h-full flex flex-col justify-between shadow-2xl group min-h-[580px]"
            >
              {/* Big Background Lifestyle Image with smooth scroll parallax scale */}
              <motion.img
                src={category.bgImage}
                alt={category.bgAlt}
                style={{ scale: heroBgScale }}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.42] contrast-125 transition-transform duration-700 ease-out"
              />

              {/* Multi-Stop Dark Vignette Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/40" />

              {/* Dynamic Sweeping Light Reflection Sheen as you scroll */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-25 z-10"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.45) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 52%, transparent 65%)",
                  x: lightSheenX
                }}
              />

              {/* Top Badges & Telemetry */}
              <div
                className="relative z-10 p-6 sm:p-7 flex items-center justify-between"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="font-mono text-xs font-black px-3.5 py-1 rounded-full bg-black/85 border border-white/20 text-white uppercase tracking-wider backdrop-blur-md shadow-lg">
                  {category.code} • {category.badge}
                </span>

                <span
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: category.themeColor }}
                />
              </div>

              {/* Bottom Content / Manifesto / Stats */}
              <div
                className="relative z-10 p-6 sm:p-7 space-y-4"
                style={{ transform: "translateZ(25px)" }}
              >
                <div>
                  <span className="font-mono text-[10px] text-white/70 tracking-widest uppercase block mb-1">
                    {category.tagline}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight leading-none">
                    {category.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
                  {category.description}
                </p>

                {/* Engineering Highlights List */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  {category.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-300">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                  {category.stats.map((st, sIdx) => (
                    <div key={sIdx} className="bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                      <span className="font-mono text-[8px] text-neutral-400 block uppercase">
                        {st.label}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-white block truncate">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <a
                    href="#b2b-calculator"
                    className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all cursor-pointer"
                  >
                    <span>REQUEST {category.name} TECH PACK</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* 9 PRODUCT CARDS GRID (3x3 EQUAL MATCHING HEIGHT!)              */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between h-full ${
              isLeftImage ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Header Bar above products with live 3D status */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-[#E21D1D]">
                  [SAMPLE LINEUP]
                </span>
                <h4 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight">
                  {category.name} PRODUCTS
                </h4>
                <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900 px-2.5 py-0.5 rounded-full border border-neutral-800">
                  9 SAMPLES (3x3)
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-400 uppercase tracking-widest hidden sm:flex">
                <Sparkles className="w-3 h-3 text-[#E21D1D] animate-spin" />
                <span>3D TILT • HOVER ZOOM • 3D SPECS</span>
              </div>
            </div>

            {/* Responsive 3x3 Grid of 9 Products with Staggered 3D Scroll Waves */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5 flex-1">
              {category.products.map((product, pIdx) => (
                <Interactive3DProductCard
                  key={product.id}
                  product={product}
                  index={pIdx}
                  scrollYProgress={scrollYProgress}
                  onInspect={onInspect}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ==============================================================
// 3. MAIN SCROLL-DECONSTRUCTED EXPORT ARMORY COMPONENT
// ==============================================================
export const ScrollDeconstructed3DGarment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("sports-wears");
  const [inspectModalProduct, setInspectModalProduct] = useState<CategoryProduct | null>(null);

  // Active Category Scroll-Spy: detect which category is currently in view
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const cat of CATEGORIES_DATA) {
        const el = document.getElementById(`cat-section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Smooth scroll to specific category section
  const handleScrollToCategory = (catId: string) => {
    setActiveTab(catId);
    const el = document.getElementById(`cat-section-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeCategory = CATEGORIES_DATA.find((c) => c.id === activeTab) || CATEGORIES_DATA[0];

  return (
    <div
      id="3d-deconstruction"
      className="relative w-full bg-black text-white selection:bg-[#E21D1D] selection:text-white"
    >
      {/* ================= 1. SECTION INTRO HEADER & QUICK JUMP BAR ================= */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 max-w-7xl mx-auto border-b border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#E21D1D] uppercase">
                EXPORT MANUFACTURING ARMORY • 36 TOTAL SAMPLES (9 PER CATEGORY)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-none">
              4 CORE CATEGORIES & 9 SAMPLES EACH
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-2 max-w-2xl uppercase">
              Balanced 1:1 alternating layout with full-height contextual imagery and matching 3x3 product sample showcases.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 shrink-0">
            <Factory className="w-4 h-4 text-[#E21D1D]" />
            <span>9 CUTOUTS PER CATEGORY • 100% EXPORT GRADE</span>
          </div>
        </div>

        {/* 4 CATEGORIES QUICK-JUMP BUTTONS WITH DYNAMIC ACTIVE GLIDE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleScrollToCategory(cat.id)}
                className={`relative text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group overflow-hidden ${
                  isActive
                    ? "border-[#E21D1D] shadow-lg shadow-[#E21D1D]/20"
                    : "bg-neutral-950 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                }`}
              >
                {/* Active Sliding Glowing Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryGlow"
                    className="absolute inset-0 bg-[#E21D1D]/15 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative z-10">
                  <span className="font-mono text-[10px] font-bold text-neutral-500 group-hover:text-neutral-300 block">
                    CATEGORY {cat.code} • 9 PRODUCTS
                  </span>
                  <span className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-white group-hover:text-[#E21D1D] transition-colors">
                    {cat.name}
                  </span>
                </div>
                <ArrowRight
                  className={`w-4 h-4 relative z-10 transition-all ${
                    isActive ? "text-[#E21D1D] translate-x-1" : "text-neutral-500 group-hover:text-white group-hover:translate-x-1"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STICKY / FLOATING 3D SPATIAL SCROLL HUD ================= */}
      <div className="sticky top-0 z-30 py-2.5 px-4 sm:px-6 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
          <span className="text-[#E21D1D] font-bold tracking-wider">3D SCROLL PERSPECTIVE</span>
          <span className="text-neutral-600 hidden sm:inline">|</span>
          <span className="text-neutral-300 uppercase truncate">
            STAGE {activeCategory.code}: {activeCategory.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* 4 Interactive Category Stage Dots */}
          <div className="flex items-center gap-1.5">
            {CATEGORIES_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => handleScrollToCategory(c.id)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === c.id
                    ? "w-7 bg-[#E21D1D]"
                    : "w-2.5 bg-neutral-700 hover:bg-neutral-500"
                }`}
                title={c.name}
              />
            ))}
          </div>

          <span className="text-[10px] text-neutral-400 hidden md:inline">
            36 TOTAL SAMPLES
          </span>
        </div>
      </div>

      {/* ================= 2. THE 4 ALTERNATING BALANCED SECTIONS ================= */}
      {/*
        Both sides have exact equal matching heights via `items-stretch` and `h-full flex-1`:
        Category 1: SPORTS WEARS -> [Big Image LEFT (Equal Height)] | [9 Products RIGHT (3x3)]
        Category 2: GYM & FITNESS -> [9 Products LEFT (3x3)] | [Big Image RIGHT (Equal Height)] (Sides Change!)
        Category 3: STREET WEARS  -> [Big Image LEFT (Equal Height)] | [9 Products RIGHT (3x3)] (Sides Change!)
        Category 4: LEATHER JACKETS -> [9 Products LEFT (3x3)] | [Big Image RIGHT (Equal Height)] (Sides Change!)
      */}
      <div className="divide-y divide-neutral-900">
        {CATEGORIES_DATA.map((category) => (
          <CategoryShowcaseSection
            key={category.id}
            category={category}
            onInspect={(prod) => setInspectModalProduct(prod)}
          />
        ))}
      </div>

      {/* ================= 3. QUICK 3D INSPECT & SPEC MODAL ================= */}
      <AnimatePresence>
        {inspectModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25, rotateX: 8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectModalProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Transparent Product Cutout Image with Glow */}
                <div className="relative h-[280px] sm:h-[340px] flex items-center justify-center bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 overflow-hidden">
                  <div
                    className="absolute w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                    style={{ backgroundColor: inspectModalProduct.accentColor, opacity: 0.35 }}
                  />
                  <motion.img
                    src={inspectModalProduct.image}
                    alt={inspectModalProduct.name}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] relative z-10"
                  />
                </div>

                {/* Details & Specs */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
                      {inspectModalProduct.badge} • SAMPLE #{inspectModalProduct.sampleNum}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white mt-1 leading-tight">
                      {inspectModalProduct.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      {inspectModalProduct.subtitle}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">FABRIC GSM:</span>
                      <span className="text-white font-bold">{inspectModalProduct.gsm}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">MATERIAL:</span>
                      <span className="text-white font-bold">{inspectModalProduct.fabric}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase">MIN ORDER QUANTITY:</span>
                      <span className="text-emerald-400 font-bold">{inspectModalProduct.moq}</span>
                    </div>
                  </div>

                  {/* Technical Specs List */}
                  <div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider block uppercase mb-2">
                      ENGINEERING SPECIFICATIONS
                    </span>
                    <ul className="space-y-1.5 text-xs font-mono text-neutral-300">
                      {inspectModalProduct.specs.map((sp, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Colorways */}
                  {inspectModalProduct.colorways.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider block uppercase mb-1.5">
                        AVAILABLE COLORWAYS
                      </span>
                      <div className="flex items-center gap-2">
                        {inspectModalProduct.colorways.map((cw) => (
                          <div
                            key={cw.name}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-mono"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/30"
                              style={{ backgroundColor: cw.hex }}
                            />
                            <span>{cw.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <div className="pt-2">
                    <a
                      href="#b2b-calculator"
                      onClick={() => setInspectModalProduct(null)}
                      className="w-full bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all cursor-pointer"
                    >
                      <span>ORDER PRODUCTION SAMPLE</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
