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
  ZoomOut,
  Factory,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkle,
  Box,
  Sliders,
  Play,
  Pause,
  Maximize2
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
  heroImage: string;
  heroImageAlt: string;
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
    heroImage: "/images/3d_jersey_clo.jpg",
    heroImageAlt: "3D Clo match grade tournament jersey with anatomical construction",
    bgImage: "/images/backgrounds/sports_bg.jpg",
    bgAlt: "Professional sports athletes on stadium field under floodlights",
    description: "TOURNAMENT-GRADE FOOTBALL KITS, BASKETBALL UNIFORMS, AND PRO RUGBY JERSEYS ENGINEERED FOR HIGH-AEROBIC BREATHABILITY AND EXTREME MATCH-PULL DURABILITY.",
    alignImageLeft: true, // Left: Big Image | Right: 9 Products (3x3)
    stats: [
      { label: "120+ PRODUCTS", value: "OEM SAMPLES" },
      { label: "24 HR DISPATCH", value: "SAMPLE SERVICE" },
      { label: "100% QUALITY OEM", value: "GUARANTEED" },
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
      },
      {
        id: "sports-10",
        sampleNum: 10,
        name: "Championship Royal Gold Match Kit",
        subtitle: "Gold Accent V-Neck Sublimation",
        image: "/images/sports-wears/royal_gold_jersey.jpg",
        badge: "CHAMPIONSHIP GOLD",
        gsm: "225-GSM",
        fabric: "High-Tensile Micro-Interlock Poly",
        accentColor: "#F59E0B",
        moq: "25 PCS",
        colorways: [
          { name: "Gold Mirage", hex: "#F59E0B" },
          { name: "Royal Obsidian", hex: "#1E3A8A" },
          { name: "Pure White", hex: "#FFFFFF" }
        ],
        specs: ["Italian Micro-Sublimation Zero Bleed", "Reinforced 4-Needle Flatlock Seams", "Capillary Anti-Perspirant Channels", "Lightweight Dynamic V-Neck"]
      },
      {
        id: "sports-11",
        sampleNum: 11,
        name: "Pro Pitch Tournament Team Uniform",
        subtitle: "Multi-Panel Athletic Pitch Kit",
        image: "/images/sports-wears/squad_tournament_kit.jpg",
        badge: "PRO TOURNAMENT",
        gsm: "210-GSM",
        fabric: "Aerodynamic Micro-Pique Poly",
        accentColor: "#3B82F6",
        moq: "25 PCS",
        colorways: [
          { name: "Pitch Cobalt", hex: "#2563EB" },
          { name: "Carbon Grey", hex: "#374151" },
          { name: "Crimson Blaze", hex: "#EF4444" }
        ],
        specs: ["Dynamic Lateral Ventilation Panels", "Sublimated High-Def Club Badging", "Ergonomic 4-Way Stretch Cut", "Pre-Shrunk Molecular Polymer"]
      },
      {
        id: "sports-12",
        sampleNum: 12,
        name: "League Division Striped Football Kit",
        subtitle: "Vertical Engineered Contrast Fit",
        image: "/images/sports-wears/striped_football_kit.jpg",
        badge: "LEAGUE DIVISION",
        gsm: "200-GSM",
        fabric: "Dri-Fit Anti-Chafing Polyester",
        accentColor: "#0284C7",
        moq: "25 PCS",
        colorways: [
          { name: "Sky & White", hex: "#0284C7" },
          { name: "Navy Contrast", hex: "#1E3A8A" },
          { name: "Fire & Gold", hex: "#D97706" }
        ],
        specs: ["Warp-Knit Tear Resistant Fabric", "Laser Heat-Cut Aerodynamic Trim", "Curved Athletic Drop-Hem", "Silicone Gripper Band"]
      },
      {
        id: "sports-13",
        sampleNum: 13,
        name: "Pro Club Precision Match Jersey",
        subtitle: "Raglan Sleeve Sublimated Jersey",
        image: "/images/sports-wears/pro_match_jersey.jpg",
        badge: "PRECISION MATCH",
        gsm: "220-GSM",
        fabric: "Diamond-Interlock Wicking Poly",
        accentColor: "#8B5CF6",
        moq: "25 PCS",
        colorways: [
          { name: "Electric Violet", hex: "#8B5CF6" },
          { name: "Midnight Navy", hex: "#0F172A" },
          { name: "Solar Yellow", hex: "#EAB308" }
        ],
        specs: ["400N Match Pull Tested Seams", "High-Definition 300DPI Graphics", "Breathable Mesh Armpits", "Anatomical Raglan Shoulder"]
      },
      {
        id: "sports-14",
        sampleNum: 14,
        name: "Vanguard Obsidian Tactical Jersey",
        subtitle: "Deep Navy & Anthracite Fit",
        image: "/images/sports-wears/05_navy_jersey.png",
        badge: "TACTICAL MATCH",
        gsm: "215-GSM",
        fabric: "Thermal Dissipation Microfiber",
        accentColor: "#1D4ED8",
        moq: "25 PCS",
        colorways: [
          { name: "Navy Obsidian", hex: "#1D4ED8" },
          { name: "Tactical Charcoal", hex: "#1F2937" },
          { name: "Acid Lime", hex: "#84CC16" }
        ],
        specs: ["Thermo-Regulating Honeycomb Weave", "Reinforced Collar Ribbing", "Ultrasonic Sonic Badging", "Fade-Proof Molecular Inks"]
      },
      {
        id: "sports-15",
        sampleNum: 15,
        name: "Apex Velocity Striker Match Kit",
        subtitle: "Crimson High-Speed Aero Fit",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "VELOCITY STRIKER",
        gsm: "220-GSM",
        fabric: "Capillary Micro-Interlock Poly",
        accentColor: "#DC2626",
        moq: "25 PCS",
        colorways: [
          { name: "Crimson Blaze", hex: "#DC2626" },
          { name: "Deep Onyx", hex: "#09090B" },
          { name: "Pure White", hex: "#FFFFFF" }
        ],
        specs: ["4-Way Compression Body Mapping", "Laser Perforated Upper Spine", "Silicone Gripper Waistband", "Rapid Evaporation Polymer"]
      },
      {
        id: "sports-16",
        sampleNum: 16,
        name: "Azure Pitch Pro Match Kit",
        subtitle: "Cyan & White Dynamic Interlock",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        badge: "AZURE PRO",
        gsm: "195-GSM",
        fabric: "Anti-Bacterial Dri-Fit Weave",
        accentColor: "#0EA5E9",
        moq: "25 PCS",
        colorways: [
          { name: "Cyan Azure", hex: "#0EA5E9" },
          { name: "Navy Shadow", hex: "#0C4A6E" },
          { name: "Volt Orange", hex: "#F97316" }
        ],
        specs: ["Anti-Snag Warp Knit Fabric", "Silver-Ion Anti-Bacterial Yarn", "Soft-Touch Neck Taping", "Zero-Chafe Hem Seam"]
      },
      {
        id: "sports-17",
        sampleNum: 17,
        name: "Imperial Division Match Jersey",
        subtitle: "Violet & Obsidian Gold Trim",
        image: "/images/sports-wears/01_purple_jersey.png",
        badge: "IMPERIAL DIVISION",
        gsm: "220-GSM",
        fabric: "High-Flex Micro-Interlock Poly",
        accentColor: "#9333EA",
        moq: "25 PCS",
        colorways: [
          { name: "Imperial Violet", hex: "#9333EA" },
          { name: "Metallic Gold", hex: "#EAB308" },
          { name: "Pitch Black", hex: "#09090B" }
        ],
        specs: ["Molecular Sublimation Bonding", "High-Torque Shoulder Seaming", "Breathable Ribbed V-Neck", "Tension Release Side Splits"]
      },
      {
        id: "sports-18",
        sampleNum: 18,
        name: "Tournament All-Star Basketball Tank",
        subtitle: "Deep-Cut Athletic Armholes",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "ALL-STAR PRO",
        gsm: "210-GSM",
        fabric: "Dual-Knit Birdseye Poly",
        accentColor: "#B91C1C",
        moq: "25 PCS",
        colorways: [
          { name: "Crimson All-Star", hex: "#B91C1C" },
          { name: "Stealth Black", hex: "#18181B" },
          { name: "Championship Gold", hex: "#F59E0B" }
        ],
        specs: ["Wide Cut Shoulder Architecture", "Reinforced Neck & Arm Ribbing", "Extended Drop-Tail Hem", "4-Way Aerobic Elasticity"]
      }
    ]
  },
  {
    id: "gym-fitness",
    index: 1,
    code: "02",
    name: "GYM & FITNESS APPAREL",
    tagline: "4-WAY POWER COMPRESSION • ERGONOMIC MAPPING",
    badge: "3D POWER KNIT",
    themeColor: "#3B82F6",
    heroImage: "/images/3d_gym_wear.jpg",
    heroImageAlt: "High performance bodybuilding gym athlete wearing dedicated training apparel",
    bgImage: "/images/backgrounds/gym_bg.jpg",
    bgAlt: "Intense athletic fitness workout and bodybuilders in moody gym",
    description: "HIGH PERFORMANCE DEDICATED APPAREL DESIGNED FOR INTENSE GYM TRAINING, POWERLIFTING, AND BODYBUILDING. SQUAT-PROOF, SWEAT-WICKING, MAXIMUM RANGE OF MOTION.",
    alignImageLeft: false, // Sides Change! Left: 9 Products (3x3) | Right: Big Image
    stats: [
      { label: "120+ PRODUCTS", value: "OEM SAMPLES" },
      { label: "24 HR DISPATCH", value: "SAMPLE SERVICE" },
      { label: "100% QUALITY OEM", value: "GUARANTEED" },
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
      },
      {
        id: "gym-10",
        sampleNum: 10,
        name: "Hex Impact Protective Combat Guard",
        subtitle: "Reinforced EVA Padding Skin",
        image: "/images/gym-fitness/hex_impact_armor.jpg",
        badge: "HEX COMBAT GUARD",
        gsm: "350-GSM",
        fabric: "Closed-Cell EVA Foam & Spandex",
        accentColor: "#06B6D4",
        moq: "30 PCS",
        colorways: [
          { name: "Cyan Combat", hex: "#06B6D4" },
          { name: "Stealth Onyx", hex: "#09090B" },
          { name: "Gunmetal", hex: "#475569" }
        ],
        specs: ["10mm Hexagonal Absorptive Pads", "Ergonomic Bicep & Rib Armor", "Zero-Shift Anti-Slip Lining", "Multi-Directional High Flex"]
      },
      {
        id: "gym-11",
        sampleNum: 11,
        name: "Vascular Muscle Power Rashguard",
        subtitle: "Dual-Knit Hydro-Lock Compression",
        image: "/images/gym-fitness/muscle_compression_top.jpg",
        badge: "VASCULAR POWER",
        gsm: "295-GSM",
        fabric: "High-Compression Poly-Elastane",
        accentColor: "#10B981",
        moq: "30 PCS",
        colorways: [
          { name: "Forest Emerald", hex: "#10B981" },
          { name: "Dark Obsidian", hex: "#18181B" },
          { name: "Silver Surge", hex: "#94A3B8" }
        ],
        specs: ["Graduated Muscular Pressure Fit", "Ultrasonic Welded Flat Seams", "Capillary Cooling Microfiber", "Sublimated Grip Band Hem"]
      },
      {
        id: "gym-12",
        sampleNum: 12,
        name: "Seamless Core Athletic Training Top",
        subtitle: "Zoned Breathable Mesh Mapping",
        image: "/images/gym-fitness/seamless_training_top.jpg",
        badge: "CORE SEAMLESS",
        gsm: "310-GSM",
        fabric: "Tubular Microfiber Polyamide",
        accentColor: "#3B82F6",
        moq: "30 PCS",
        colorways: [
          { name: "Cobalt Blue", hex: "#3B82F6" },
          { name: "Charcoal Heather", hex: "#374151" },
          { name: "Volt Green", hex: "#22C55E" }
        ],
        specs: ["3D Body-Mapped Airflow Channels", "Chafe-Free Seamless Cylindrical Weave", "Silver-Ion Odor Defense", "High Shape Retention"]
      },
      {
        id: "gym-13",
        sampleNum: 13,
        name: "Heavy Drop Bodybuilding Stringer Tank",
        subtitle: "Raw Edge Athletic Taper Cut",
        image: "/images/gym-fitness/bodybuilding_stringer.jpg",
        badge: "HEAVY STRINGER",
        gsm: "185-GSM",
        fabric: "Lightweight Brushed Poly-Cotton",
        accentColor: "#EF4444",
        moq: "50 PCS",
        colorways: [
          { name: "Bloodline Crimson", hex: "#EF4444" },
          { name: "Charcoal Shadow", hex: "#18181B" },
          { name: "Pure White", hex: "#FFFFFF" }
        ],
        specs: ["Deep Racer Y-Back Contour", "Reinforced Hem Bar-Tacks", "Ultra-Breathable Open Cut", "Extended Scallop Drop Tail"]
      },
      {
        id: "gym-14",
        sampleNum: 14,
        name: "3D Seamless Ergonomic Rashguard",
        subtitle: "Pro Fighter Skin Compression",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "PRO FIGHTER SKIN",
        gsm: "320-GSM",
        fabric: "High-Tensile Spandex Knit",
        accentColor: "#2563EB",
        moq: "30 PCS",
        colorways: [
          { name: "Navy Cobalt", hex: "#2563EB" },
          { name: "Matte Black", hex: "#0F172A" },
          { name: "Solar Orange", hex: "#EA580C" }
        ],
        specs: ["Vascular Stabilizing Support", "Reinforced Anti-Tear Collar", "Full Upper Body Range of Motion", "Thermal Moisture Exhaust"]
      },
      {
        id: "gym-15",
        sampleNum: 15,
        name: "Anatomical Hex Impact Armor Shield",
        subtitle: "Sternum & Core Dual Protection",
        image: "/images/gym-fitness/06_padded_armor.png",
        badge: "ANATOMICAL HEX",
        gsm: "345-GSM",
        fabric: "Closed-Cell Foam & Micro-Mesh",
        accentColor: "#0891B2",
        moq: "30 PCS",
        colorways: [
          { name: "Glacier Blue", hex: "#0891B2" },
          { name: "Stealth Obsidian", hex: "#09090B" },
          { name: "Titanium Grey", hex: "#64748B" }
        ],
        specs: ["Sternum & Rib Impact Absorption", "Breathable Mesh Perimeter", "Flatlock Smooth Stitches", "Machine Washable Foam Cells"]
      },
      {
        id: "gym-16",
        sampleNum: 16,
        name: "V-Taper Athletic Performance Tank",
        subtitle: "Ergonomic Y-Back Silhouette",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        badge: "V-TAPER PERFORMANCE",
        gsm: "180-GSM",
        fabric: "Microfiber Rapid Dry Poly",
        accentColor: "#DC2626",
        moq: "50 PCS",
        colorways: [
          { name: "Scarlet Flame", hex: "#DC2626" },
          { name: "Midnight Black", hex: "#111827" },
          { name: "Steel Grey", hex: "#4B5563" }
        ],
        specs: ["Lat Flare Freedom Design", "Soft-Touch Flat Binding", "Ultra-Low Hydrophobic Drag", "Laser Cut Eyelets"]
      },
      {
        id: "gym-17",
        sampleNum: 17,
        name: "Lockdown Thermal Base Layer Top",
        subtitle: "Brushed Composite Cold Gear",
        image: "/images/gym-fitness/gym_compression_top.png",
        badge: "THERMAL BASE LAYER",
        gsm: "300-GSM",
        fabric: "Micro-Fleece Spandex Composite",
        accentColor: "#059669",
        moq: "30 PCS",
        colorways: [
          { name: "Hunter Green", hex: "#059669" },
          { name: "Pitch Onyx", hex: "#09090B" },
          { name: "Arctic Silver", hex: "#E2E8F0" }
        ],
        specs: ["Internal Nano-Fleece Heat Trap", "4-Way Compressive Elasticity", "Reinforced Raglan Sleeves", "Anti-Microbial Finish"]
      },
      {
        id: "gym-18",
        sampleNum: 18,
        name: "Ribbed Power Seamless Muscle Tee",
        subtitle: "High Elasticity Form Top",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "POWER SEAMLESS",
        gsm: "315-GSM",
        fabric: "Polyamide Microfiber Yarn",
        accentColor: "#3B82F6",
        moq: "30 PCS",
        colorways: [
          { name: "Royal Azure", hex: "#3B82F6" },
          { name: "Deep Charcoal", hex: "#1F2937" },
          { name: "Pure White", hex: "#FFFFFF" }
        ],
        specs: ["Zoned Compression Architecture", "Sweat Wicking Aerated Ribs", "Zero-Abrasion Neck Collar", "2nd-Skin Athletic Hug"]
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
    heroImage: "/images/3d_streetwear.jpg",
    heroImageAlt: "Luxury heavyweight French terry streetwear hoodie and techwear street apparel",
    bgImage: "/images/backgrounds/street_bg.jpg",
    bgAlt: "Cinematic night urban city street with glowing neon lights and street fashion atmosphere",
    description: "BESPOKE LUXURY STREETWEAR SILHOUETTES INCLUDING BOXY 450GSM FRENCH TERRY HOODIES, HEAVY VINTAGE WASH TEES, AND MODERN TECHWEAR OUTERWEAR BUILT FOR HIGH-END BOUTIQUE LABELS.",
    alignImageLeft: true, // Sides Change! Left: Big Image | Right: 9 Products (3x3)
    stats: [
      { label: "120+ PRODUCTS", value: "OEM SAMPLES" },
      { label: "24 HR DISPATCH", value: "SAMPLE SERVICE" },
      { label: "100% QUALITY OEM", value: "GUARANTEED" },
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
      },
      {
        id: "street-10",
        sampleNum: 10,
        name: "500GSM Heavyweight Luxury Boxy Hoodie",
        subtitle: "Structured Oversized Loopback",
        image: "/images/street-wears/heavyweight_boxy_hoodie.jpg",
        badge: "500GSM LUXURY",
        gsm: "500-GSM",
        fabric: "100% Organic Heavy Combed Cotton",
        accentColor: "#F59E0B",
        moq: "30 PCS",
        colorways: [
          { name: "Vintage Bone", hex: "#E7E5E4" },
          { name: "Obsidian Black", hex: "#18181B" },
          { name: "Faded Sage", hex: "#4D7C0F" }
        ],
        specs: ["Double-Layer Heavy Self-Fabric Hood", "Reinforced Seamless Kangaroo Pouch", "Drop Shoulder Luxury Boxy Silhouette", "Pre-Shrunk Cold Wash Loopback"]
      },
      {
        id: "street-11",
        sampleNum: 11,
        name: "Vintage Mineral Acid-Washed Tee",
        subtitle: "320GSM Heavyweight Jersey",
        image: "/images/street-wears/vintage_oversized_tee.jpg",
        badge: "320GSM VINTAGE TEE",
        gsm: "320-GSM",
        fabric: "Enzyme Bleached Heavy Cotton",
        accentColor: "#A855F7",
        moq: "50 PCS",
        colorways: [
          { name: "Mineral Slate", hex: "#475569" },
          { name: "Acid Black", hex: "#1E293B" },
          { name: "Dust Mauve", hex: "#701A75" }
        ],
        specs: ["1.3\" High-Density Heavy Rib Collar", "Artisanal Enzyme Mineral Distress", "Cover-Stitched Shoulder Seams", "Relaxed Boxy Skater Fit"]
      },
      {
        id: "street-12",
        sampleNum: 12,
        name: "Tactical Modular Utility Anorak",
        subtitle: "Matte DWR Weatherproof Shell",
        image: "/images/street-wears/tactical_tech_jacket.jpg",
        badge: "TACTICAL ANORAK",
        gsm: "360-GSM",
        fabric: "Diamond Ripstop Poly DWR",
        accentColor: "#EF4444",
        moq: "25 PCS",
        colorways: [
          { name: "Tactical Onyx", hex: "#0F172A" },
          { name: "Military Olive", hex: "#3F6212" },
          { name: "Desert Tan", hex: "#78716C" }
        ],
        specs: ["Aquaguard Waterproof Heavy Zips", "Multi-Modular Front Cargo Pouches", "Adjustable Shock-Cord Hood & Hem", "Taped Inner Weatherproof Seams"]
      },
      {
        id: "street-13",
        sampleNum: 13,
        name: "Raglan Heavyweight Zip Street Hoodie",
        subtitle: "Two-Tone Cut & Sew Raglan",
        image: "/images/street-wears/raglan_zip_hoodie.jpg",
        badge: "RAGLAN ZIP",
        gsm: "440-GSM",
        fabric: "Brushed Loopback French Terry",
        accentColor: "#DC2626",
        moq: "30 PCS",
        colorways: [
          { name: "Crimson & Heather", hex: "#DC2626" },
          { name: "Black & Bone", hex: "#1C1917" },
          { name: "Navy & Khaki", hex: "#1E3A8A" }
        ],
        specs: ["#8 Antique Silver YKK Full Zip", "Raglan Colorblock Shoulder Panels", "Thick 2x2 Heavy Spandex Ribbing", "Double-Stitched Pocket Welts"]
      },
      {
        id: "street-14",
        sampleNum: 14,
        name: "Signature Street Oversized French Terry",
        subtitle: "450GSM Pure Cotton Pullover",
        image: "/images/street-wears/street_hoodie.png",
        badge: "SIGNATURE STREET",
        gsm: "450-GSM",
        fabric: "100% Combed Loopback Cotton",
        accentColor: "#F59E0B",
        moq: "30 PCS",
        colorways: [
          { name: "Desert Sand", hex: "#D97706" },
          { name: "Washed Charcoal", hex: "#262626" },
          { name: "Crisp Chalk", hex: "#F3F4F6" }
        ],
        specs: ["Double Layer Rigid Hood Silhouette", "Dropped Shoulder Oversized Cut", "Bar-Tack Tension Reinforcements", "Custom Engraved Metal Eyelets"]
      },
      {
        id: "street-15",
        sampleNum: 15,
        name: "Two-Tone Urban Track Zip Hoodie",
        subtitle: "Red & White Split Architecture",
        image: "/images/street-wears/03_red_white_hoodie.png",
        badge: "URBAN TRACK",
        gsm: "420-GSM",
        fabric: "Brushed Heavy Cotton Poly",
        accentColor: "#EF4444",
        moq: "30 PCS",
        colorways: [
          { name: "Scarlet & White", hex: "#EF4444" },
          { name: "Charcoal & Yellow", hex: "#CA8A04" },
          { name: "Cobalt & Grey", hex: "#2563EB" }
        ],
        specs: ["Antique Silver Metal Puller", "Reinforced Raglan Sleeves", "Heavy Ribbed Cuffs and Hem", "Twin Patch Kangaroo Pockets"]
      },
      {
        id: "street-16",
        sampleNum: 16,
        name: "Heavyweight Boxy Drop-Shoulder Tee",
        subtitle: "280GSM Combed Skater Tee",
        image: "/images/street-wears/street_oversized_tee.png",
        badge: "BOXY SKATER TEE",
        gsm: "280-GSM",
        fabric: "Pre-Shrunk 100% Pure Cotton",
        accentColor: "#9333EA",
        moq: "50 PCS",
        colorways: [
          { name: "Deep Violet", hex: "#7E22CE" },
          { name: "Raw Cream", hex: "#FEF3C7" },
          { name: "Pitch Black", hex: "#09090B" }
        ],
        specs: ["Heavy 1.25\" Ribbed Neckline", "Double-Needle Hem Stitching", "Drop Shoulder Box Silhouette", "Reactive Pre-Shrunk Dye"]
      },
      {
        id: "street-17",
        sampleNum: 17,
        name: "Modular Waterproof Techwear Shell",
        subtitle: "Cyber Tactical Urban Jacket",
        image: "/images/street-wears/street_tech_jacket.png",
        badge: "CYBER TECH SHELL",
        gsm: "350-GSM",
        fabric: "DWR Matte Poly Membrane",
        accentColor: "#E21D1D",
        moq: "25 PCS",
        colorways: [
          { name: "Matte Blackout", hex: "#09090B" },
          { name: "Cyber Grey", hex: "#64748B" },
          { name: "Ranger Green", hex: "#3F6212" }
        ],
        specs: ["Dual Waterproof Aquaguard Zips", "Articulated Elbow Flex Seams", "Modular Quick-Access Pockets", "Breathable Armpit Eyelets"]
      },
      {
        id: "street-18",
        sampleNum: 18,
        name: "Vintage Mineral Acid Distress Pullover",
        subtitle: "480GSM Heavyweight Fleece",
        image: "/images/street-wears/street_hoodie.png",
        badge: "MINERAL DISTRESS",
        gsm: "480-GSM",
        fabric: "Enzyme Bleached Heavy Cotton",
        accentColor: "#D97706",
        moq: "30 PCS",
        colorways: [
          { name: "Acid Camel", hex: "#D97706" },
          { name: "Mineral Smoke", hex: "#374151" },
          { name: "Washed Bone", hex: "#E5E7EB" }
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
    heroImage: "/images/3d_leather_jacket.jpg",
    heroImageAlt: "Handcrafted 1.2mm drum-dyed full-grain leather motorcycle jacket",
    bgImage: "/images/backgrounds/leather_bg.jpg",
    bgAlt: "Vintage motorcycle cafe racer on highway at dusk with handcrafted leather ambiance",
    description: "GRADE-A DRUM-DYED FULL-GRAIN LEATHER OUTERWEAR, ASYMMETRIC MOTO JACKETS, GENUINE SHEARLING AVIATORS, AND WOOL/LEATHER VARSITY SQUAD COATS HANDCRAFTED BY GENERATIONAL MASTERS.",
    alignImageLeft: false, // Sides Change! Left: 9 Products (3x3) | Right: Big Image
    stats: [
      { label: "120+ PRODUCTS", value: "OEM SAMPLES" },
      { label: "24 HR DISPATCH", value: "SAMPLE SERVICE" },
      { label: "100% QUALITY OEM", value: "GUARANTEED" },
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
      },
      {
        id: "leather-10",
        sampleNum: 10,
        name: "Waxed Hand-Distressed Cafe Racer",
        subtitle: "1.2mm Hand-Finished Top-Grain",
        image: "/images/leather-jackets/waxed_cafe_racer.jpg",
        badge: "WAXED CAFE RACER",
        gsm: "1.2MM LEATHER",
        fabric: "Drum-Dyed Waxed Cowhide",
        accentColor: "#B45309",
        moq: "15 PCS",
        colorways: [
          { name: "Bourbon Cognac", hex: "#78350F" },
          { name: "Distressed Espresso", hex: "#38220F" },
          { name: "Charcoal Oil", hex: "#1E293B" }
        ],
        specs: ["Hand-Applied Wax & Heat Buffing", "Gusseted Action Back for Mobility", "Solid Cast Brass Hardware", "Silky Quilted Poly Liner"]
      },
      {
        id: "leather-11",
        sampleNum: 11,
        name: "Heritage Melton Wool & Leather Varsity",
        subtitle: "Heavyweight 24oz Wool & Cowhide Sleeves",
        image: "/images/leather-jackets/heritage_wool_varsity.jpg",
        badge: "HERITAGE VARSITY",
        gsm: "24OZ WOOL",
        fabric: "Melton Wool & Top-Grain Cowhide",
        accentColor: "#D97706",
        moq: "20 PCS",
        colorways: [
          { name: "Burgundy & Cream", hex: "#831843" },
          { name: "Forest & Gold", hex: "#14532D" },
          { name: "Midnight & Bone", hex: "#1E293B" }
        ],
        specs: ["Insulated Thermal Diamond Quilt", "Genuine Top-Grain Leather Sleeves", "Chenille Embroidered Patch Ready", "Heavy Gauge Brass Snaps"]
      },
      {
        id: "leather-12",
        sampleNum: 12,
        name: "Full-Grain Asymmetric Biker Moto",
        subtitle: "Heavyweight 1.3mm Road Armor",
        image: "/images/leather-jackets/full_grain_biker_moto.jpg",
        badge: "FULL GRAIN MOTO",
        gsm: "1.3MM LEATHER",
        fabric: "Grade-A Natural Steerhide",
        accentColor: "#DC2626",
        moq: "15 PCS",
        colorways: [
          { name: "Jet Obsidian", hex: "#09090B" },
          { name: "Antique Brown", hex: "#451A03" },
          { name: "Oxblood Red", hex: "#881337" }
        ],
        specs: ["Asymmetrical Heavy YKK #10 Zip", "Snap-Down Lapels & Collar", "Belted Roller Buckle Waistline", "Zipped Expanding Sleeve Cuffs"]
      },
      {
        id: "leather-13",
        sampleNum: 13,
        name: "Aviator Genuine Shearling Flight Coat",
        subtitle: "Authentic Sheepskin Shearling Fur",
        image: "/images/leather-jackets/aviator_shearling_flight.jpg",
        badge: "GENUINE SHEARLING",
        gsm: "1.4MM LEATHER",
        fabric: "Full-Grain Leather with Natural Shearling",
        accentColor: "#854D0E",
        moq: "15 PCS",
        colorways: [
          { name: "Dark Chocolate", hex: "#271206" },
          { name: "Vintage Tan", hex: "#A16207" },
          { name: "Black Wool", hex: "#09090B" }
        ],
        specs: ["100% Genuine Natural Sheep Wool Lapels", "Double Buckle Throat Latch Straps", "Heavy Ribbed Storm Knit Trim", "Deep Hand-Warmer Pockets"]
      },
      {
        id: "leather-14",
        sampleNum: 14,
        name: "Classic Asymmetric Cowhide Moto",
        subtitle: "Double-Rider Silhouette",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "DOUBLE RIDER",
        gsm: "1.2MM LEATHER",
        fabric: "100% Drum-Dyed Cowhide",
        accentColor: "#E21D1D",
        moq: "15 PCS",
        colorways: [
          { name: "Pitch Black", hex: "#09090B" },
          { name: "Vintage Rust", hex: "#7C2D12" },
          { name: "Deep Ruby", hex: "#991B1B" }
        ],
        specs: ["Diamond Quilted Thermal Lining", "Antique Silver Hardware", "Shoulder Epaulets with Snaps", "Internal Concealed Pocket"]
      },
      {
        id: "leather-15",
        sampleNum: 15,
        name: "Two-Tone Chenille Varsity Jacket",
        subtitle: "Ivory Leather & Wool Blend",
        image: "/images/leather-jackets/leather_varsity.png",
        badge: "CHENILLE VARSITY",
        gsm: "24OZ MELTON",
        fabric: "Melton Wool + Grain Leather",
        accentColor: "#059669",
        moq: "20 PCS",
        colorways: [
          { name: "Emerald & Bone", hex: "#059669" },
          { name: "Crimson & Ivory", hex: "#DC2626" },
          { name: "Onyx & Cream", hex: "#18181B" }
        ],
        specs: ["Heavy 2x2 Striped Ribbed Knit", "Solid Metal Brass Snap Fasteners", "Interior Welded Phone Pocket", "Double-Stitched Seam Strength"]
      },
      {
        id: "leather-16",
        sampleNum: 16,
        name: "Vintage Mandarin Cafe Racer Leather",
        subtitle: "Diamond Quilted Bicep Panels",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        badge: "MANDARIN RACER",
        gsm: "1.1MM LEATHER",
        fabric: "Waxed Top-Grain Cowhide",
        accentColor: "#B45309",
        moq: "15 PCS",
        colorways: [
          { name: "Amber Cognac", hex: "#B45309" },
          { name: "Espresso", hex: "#38220F" },
          { name: "Midnight Slate", hex: "#1E293B" }
        ],
        specs: ["Mandarin Snap Collar Security", "Diamond Quilted Shoulder Armor", "Bi-Swing Back Shoulder Pleats", "Heavy Antique Brass Zippers"]
      },
      {
        id: "leather-17",
        sampleNum: 17,
        name: "Rich Espresso Shearling Bomber",
        subtitle: "Natural Wool Lapel Flight Jacket",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        badge: "ESPRESSO SHEARLING",
        gsm: "1.3MM LEATHER",
        fabric: "Waxed Cowhide & Shearling Wool",
        accentColor: "#78350F",
        moq: "15 PCS",
        colorways: [
          { name: "Espresso Rich", hex: "#78350F" },
          { name: "Vintage Tan", hex: "#A16207" },
          { name: "Obsidian Fur", hex: "#09090B" }
        ],
        specs: ["Dual Throat Latch Buckles", "Storm Ribbed Wool Cuffs", "Heavy Duty #10 Metal Zipper", "Thermal Fleece Interior"]
      },
      {
        id: "leather-18",
        sampleNum: 18,
        name: "Blackout Double-Rider Moto Coat",
        subtitle: "1.3mm Heavyweight Leather Armor",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "BLACKOUT RIDER",
        gsm: "1.3MM LEATHER",
        fabric: "Grade-A Natural Drum-Dyed Hide",
        accentColor: "#DC2626",
        moq: "15 PCS",
        colorways: [
          { name: "Blackout Matte", hex: "#09090B" },
          { name: "Charcoal Wax", hex: "#1C1917" },
          { name: "Dark Cherry", hex: "#701A75" }
        ],
        specs: ["Reinforced Elbow Armor Pockets", "Heavy Action Pleat Shoulders", "Full Satin Wind-Block Lining", "Solid Steel Roller Buckle"]
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
  onHoverChange?: (hovered: boolean) => void;
}

const Interactive3DProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  scrollYProgress,
  onInspect,
  onHoverChange
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

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
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
      className={`h-full ${isHovered ? "z-50 relative" : "z-10 relative"}`}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={() => onInspect(product)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className={`relative h-full rounded-2xl border transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer group bg-neutral-950/85 backdrop-blur-md ${
          isHovered
            ? "border-[#E21D1D]/80 shadow-[0_28px_60px_rgba(0,0,0,0.98)] bg-neutral-900/95 ring-1 ring-[#E21D1D]/40"
            : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60"
        }`}
      >
        {/* Dynamic Specular Gloss Sheen follows cursor */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl z-20 opacity-30 overflow-hidden"
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

        {/* 100% TRANSPARENT PNG GARMENT CUTOUT WITH SMOOTH HOVER ZOOM & 3D FLOAT */}
        <div
          className="relative w-full h-[155px] sm:h-[170px] flex items-center justify-center my-1.5"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Reactive 3D Ground Shadow */}
          <motion.div
            className="absolute bottom-1 w-3/4 h-3.5 rounded-full blur-[7px] pointer-events-none"
            animate={{
              scale: isHovered ? 1.25 : [0.92, 1.05, 0.92],
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

          {/* Transparent Product Cutout Image with Smooth, Clear Hover Zoom in 3D (Text does NOT zoom, ONLY product zooms) */}
          <motion.div
            className="relative z-40 max-w-full max-h-full flex items-center justify-center pointer-events-none"
            style={{
              transform: isHovered ? "translateZ(80px)" : "translateZ(20px)"
            }}
            animate={{
              scale: isHovered ? 1.58 : 1,
              y: isHovered ? -10 : [0, -5, 0]
            }}
            transition={{
              scale: { type: "spring", stiffness: 340, damping: 22 },
              y: isHovered
                ? { duration: 0.22, ease: "easeOut" }
                : { duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`max-w-full max-h-[145px] sm:max-h-[160px] object-contain filter transition-all duration-300 ${
                isHovered
                  ? "drop-shadow-[0_28px_45px_rgba(0,0,0,0.98)] brightness-110 contrast-105"
                  : "drop-shadow-[0_14px_20px_rgba(0,0,0,0.8)] opacity-95"
              }`}
              loading="lazy"
            />
          </motion.div>

          {/* Subtle Hover Inspect Indicator in corner */}
          <div
            className={`absolute top-1 right-1 bg-black/80 border border-white/20 text-white p-1.5 rounded-full transition-all duration-200 z-30 ${
              isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-1"
            }`}
            title="Click to Inspect 3D Fabric Details"
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
// Features: Section-level useScroll, dynamic category-specific live
// moving background imagery with scroll parallax, cinematic zoom,
// volumetric spotlight sweeps, 3D mouse perspective shift,
// ambient particle atmosphere, and under-card glowing chamber!
// ==============================================================
const CATEGORY_BACKGROUND_THEMES: Record<
  string,
  {
    environmentBadge: string;
    ambientSecondary: string;
    watermark: string;
    atmosphereTag: string;
    laserColor: string;
  }
> = {
  "sports-wears": {
    environmentBadge: "LIVE STADIUM FLOODLIGHTS • ARENA SECTOR 01",
    ambientSecondary: "#9333EA",
    watermark: "MATCH PRO ARMORY // SUBLIMATION // 400N SEAMS // ZERO FADE",
    atmosphereTag: "TURF FLOODLIGHTS • HIGH AEROBIC MESH",
    laserColor: "#E21D1D"
  },
  "gym-fitness": {
    environmentBadge: "CYBER POWER CAGE • ATHLETIC FACILITY 02",
    ambientSecondary: "#06B6D4",
    watermark: "POWER COMPRESSION // DUAL KNIT // MUSCLE LOCK MATRIX",
    atmosphereTag: "ISO TRAINING CAGE • CHALK DUST DISPERSION",
    laserColor: "#3B82F6"
  },
  "street-wears": {
    environmentBadge: "METROPOLITAN BRUTALISM • NEON SECTOR 03",
    ambientSecondary: "#EF4444",
    watermark: "OVERSIZED LUXURY // 460GSM TERRY // RAW HEM BRUTALISM",
    atmosphereTag: "NEON RAIN ASPHALT • CONCRETE ARCHITECTURE",
    laserColor: "#F59E0B"
  },
  "leather-jackets": {
    environmentBadge: "HAND-CRAFTED ATELIER • TUNGSTEN FORGE 04",
    ambientSecondary: "#B45309",
    watermark: "1.2MM DRUM DYED // BRASS HARDWARE // HEIRLOOM GRAIN",
    atmosphereTag: "TUNGSTEN WORKSHOP • VINTAGE MOTORCYCLE ATELIER",
    laserColor: "#D97706"
  }
};

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
  const themeDetails =
    CATEGORY_BACKGROUND_THEMES[category.id] || CATEGORY_BACKGROUND_THEMES["sports-wears"];

  // Multi-page product sliding and auto-slide state
  const [currentPage, setCurrentPage] = useState(0);
  const [isHoveredOnProducts, setIsHoveredOnProducts] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  const pageSize = 9;
  const totalPages = Math.ceil(category.products.length / pageSize);
  const currentProducts = category.products.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Auto-slide effect:
  // If mouse is NOT hovering over products, it auto-slides down / to next batch every 3.8s!
  // If mouse IS hovering over products, auto-slide halts/pauses ("agr mouse product pr ho to nechy slide nah ho")!
  useEffect(() => {
    if (isHoveredOnProducts || !autoSlideEnabled || totalPages <= 1) {
      return;
    }

    const intervalTime = 50;
    const totalDuration = 7000; // 7s calm interval per slide
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setSlideDirection("next");
          setCurrentPage((p) => (p + 1) % totalPages);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHoveredOnProducts, autoSlideEnabled, totalPages]);

  const handlePrevPage = () => {
    setSlideDirection("prev");
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setSlideProgress(0);
  };

  const handleNextPage = () => {
    setSlideDirection("next");
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setSlideProgress(0);
  };

  // Scroll Progress across this specific category section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Section-wide 3D Mouse Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgMouseX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-24, 24]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.8, -1.8]), {
    damping: 30,
    stiffness: 180
  });
  const bgMouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
    damping: 30,
    stiffness: 180
  });

  // Scroll Parallax for Section-Wide Living Background Image
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [-130, 130]);
  const bgParallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.24, 1.07, 1.22]);
  const bgParallaxRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [-1.8, 1.8] : [1.8, -1.8]
  );

  // Large Typographic Watermark Smooth Horizontal Parallax
  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? ["-6%", "6%"] : ["6%", "-6%"]
  );

  // Volumetric Sweeping Spotlight Gliding across Background
  const spotlightSweepX = useTransform(scrollYProgress, [0, 1], ["-40%", "140%"]);
  const spotlightRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [-20, 20] : [20, -20]
  );

  // Parallax calculations for the Big Contextual Hero Card
  const heroY = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const heroRotateY = useTransform(
    scrollYProgress,
    [0, 1],
    isLeftImage ? [3.5, -3.5] : [-3.5, 3.5]
  );
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [2.5, -2.5]);
  const heroBgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.04, 1.1]);
  const lightSheenX = useTransform(scrollYProgress, [0, 1], ["-120%", "220%"]);

  // Scanning Laser Line through Under-Grid Chamber
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id={`cat-section-${category.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden min-h-[920px] select-none"
    >
      {/* ============================================================== */}
      {/* 1. DYNAMIC CATEGORY-SPECIFIC LIVING BACKGROUND SYSTEM          */}
      {/* Moves on scroll with parallax, zoom, and live 3D mouse tilt    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Living Background Image with 3D Depth & Scroll Parallax */}
        <motion.div
          style={{
            y: bgParallaxY,
            x: bgMouseX,
            scale: bgParallaxScale,
            rotate: bgParallaxRotate,
            rotateX: bgMouseRotateX,
            rotateY: bgMouseRotateY,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-[-12%] w-[124%] h-[124%]"
        >
          <img
            src={category.bgImage}
            alt={category.bgAlt}
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-125 saturate-125"
          />

          {/* Continuous Subtle Camera Breathe Float */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              scale: [1, 1.025, 1],
              opacity: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Multi-layered Vignettes: Center translucency + deep edge fading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/45 to-black z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-[1]" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 25%, rgba(0, 0, 0, 0.8) 85%, black 100%)"
          }}
        />

        {/* Sweeping Live Volumetric Spotlight Beam on Scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2] opacity-35"
          style={{
            x: spotlightSweepX,
            rotate: spotlightRotate,
            background: `linear-gradient(90deg, transparent 0%, ${category.themeColor}33 45%, rgba(255,255,255,0.25) 50%, ${themeDetails.ambientSecondary}33 55%, transparent 100%)`,
            filter: "blur(40px)"
          }}
        />

        {/* Ambient Category Pulsing Glow Orb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[180px] pointer-events-none z-[2]"
          style={{
            backgroundColor: category.themeColor,
            left: isLeftImage ? "5%" : "55%"
          }}
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.18, 0.32, 0.18]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Large Typographic Watermark Gliding across Background */}
        <motion.div
          style={{ x: watermarkX }}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] pointer-events-none select-none z-[2] opacity-[0.06] whitespace-nowrap"
        >
          <span className="font-display font-black text-[120px] sm:text-[180px] uppercase tracking-tighter text-white block">
            {themeDetails.watermark}
          </span>
        </motion.div>

        {/* Technical Blueprint Coordinate Grid Overlay */}
        <div
          className="absolute inset-0 z-[2] opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${category.themeColor} 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Live Ambient Floating Particles & Embers (12 Dynamic motes) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? category.themeColor : themeDetails.ambientSecondary,
                width: `${2 + (i % 3) * 2}px`,
                height: `${2 + (i % 3) * 2}px`,
                left: `${8 + (i * 7.5)}%`,
                top: `${15 + (i % 5) * 16}%`,
                filter: "blur(0.5px)"
              }}
              animate={{
                y: [-35 - (i * 4), 35 + (i * 4), -35 - (i * 4)],
                x: [-18 + (i % 4) * 8, 18 - (i % 4) * 8, -18 + (i % 4) * 8],
                opacity: [0.15, 0.75, 0.15],
                scale: [0.8, 1.4, 0.8]
              }}
              transition={{
                duration: 4.8 + (i % 4) * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.28
              }}
            />
          ))}
        </div>

        {/* Background Environment Live Status Tag in Top Right Corner */}
        <div className="absolute top-4 right-6 z-[3] hidden md:flex items-center gap-2 font-mono text-[9px] text-neutral-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: category.themeColor }}
          />
          <span className="tracking-wider uppercase">{themeDetails.environmentBadge}</span>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND CONTENT: 5-COL HERO + 7-COL 3x3 PRODUCT GRID     */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ============================================================== */}
          {/* BIG CONTEXTUAL HERO IMAGE BLOCK (MATCHING USER IMAGE.PNG EXACTLY!) */}
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
              className="relative rounded-3xl overflow-hidden border border-neutral-700/80 bg-neutral-950/95 flex-1 h-full flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] group min-h-[580px] backdrop-blur-md"
            >
              {/* Big High-Resolution 3D Model / Garment Image (3d_gym_wear.jpg, 3d_jersey_clo.jpg) */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={category.heroImage}
                  alt={category.heroImageAlt || category.name}
                  style={{ scale: heroBgScale }}
                  className="w-full h-full object-cover object-top filter brightness-[0.88] contrast-110 transition-transform duration-700 ease-out"
                />
                {/* Vignette gradients for pristine text readability matching image.png */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Dynamic Sweeping Light Reflection Sheen as you scroll */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-20 z-10"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.45) 48%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 52%, transparent 65%)",
                  x: lightSheenX
                }}
              />

              {/* Top Category Badge */}
              <div
                className="relative z-10 p-6 sm:p-7 flex items-center justify-between"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="inline-flex items-center gap-2 bg-black/85 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.themeColor }}
                  />
                  <span className="font-mono text-[10px] font-black text-white uppercase tracking-wider">
                    {category.code} / 04 — {category.name}
                  </span>
                </div>

                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: category.themeColor }}
                />
              </div>

              {/* Bottom Card Content matching image.png */}
              <div
                className="relative z-10 p-6 sm:p-7 space-y-4"
                style={{ transform: "translateZ(25px)" }}
              >
                <div>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#E21D1D] uppercase block mb-1">
                    {category.code} / 04 - {category.name}
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed font-medium">
                    {category.description}
                  </p>
                </div>

                {/* KEY STATS BLOCK (MATCHING IMAGE.PNG EXACTLY) */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                    KEY STATS
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {category.stats.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex flex-col justify-center"
                      >
                        <span className="font-mono text-[11px] sm:text-xs font-black text-white block">
                          {st.label}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-400 block uppercase mt-0.5 truncate">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION CTA BUTTONS (MATCHING IMAGE.PNG EXACTLY) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="#collections"
                    className="bg-[#E21D1D] hover:bg-red-700 text-white font-display font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xl shadow-red-900/40 transition-all cursor-pointer"
                  >
                    <span>EXPLORE {category.name.split(" ")[0]} COLLECTION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#b2b-calculator"
                    className="bg-black/70 hover:bg-black/95 text-white border border-white/25 hover:border-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
                  >
                    <span>REQUEST OEM QUOTE</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================== */}
          {/* 9 PRODUCT CARDS GRID (3x3 EQUAL MATCHING HEIGHT!)              */}
          {/* WITH CLEAN LEFT/RIGHT NAVIGATION AND SMOOTH HOVER ZOOM         */}
          {/* ============================================================== */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between h-full relative ${
              isLeftImage ? "lg:order-2" : "lg:order-1"
            }`}
            onMouseEnter={() => setIsHoveredOnProducts(true)}
            onMouseLeave={() => setIsHoveredOnProducts(false)}
          >
            {/* Ambient Under-Grid Chamber Backdrop Layer */}
            <div className="absolute inset-0 -m-3 sm:-m-4 pointer-events-none rounded-3xl overflow-hidden -z-10">
              <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[6px] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />

              {/* Scanning Laser Line through Under-Grid Chamber */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] opacity-35 z-0"
                style={{
                  top: scanLineY,
                  background: `linear-gradient(90deg, transparent 5%, ${category.themeColor} 50%, transparent 95%)`
                }}
              />

              {/* Glowing Aura directly behind product cards */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full blur-[120px] pointer-events-none"
                style={{
                  backgroundColor: category.themeColor,
                  opacity: 0.16
                }}
                animate={{
                  scale: [0.92, 1.12, 0.92],
                  opacity: [0.12, 0.22, 0.12]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Header Bar above products with clean, intuitive navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-[#E21D1D]">
                  [SAMPLE LINEUP]
                </span>
                <h4 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight">
                  {category.name}
                </h4>
                <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900/90 px-2.5 py-0.5 rounded-full border border-neutral-800">
                  {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, category.products.length)} OF {category.products.length}
                </span>
              </div>

              {/* Clean Left/Right Controls with Page Indicator */}
              <div className="flex items-center gap-2">
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 bg-black/85 border border-neutral-700/80 rounded-xl p-1 shadow-lg backdrop-blur-md">
                    <button
                      onClick={handlePrevPage}
                      aria-label="Previous Products (Left)"
                      title="Previous Products"
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[10px] font-bold text-white px-2 tracking-wider">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      aria-label="Next Products (Right)"
                      title="Next Products"
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-90"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 3x3 Grid of 9 Products with Smooth Transition */}
            <div className="relative flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={currentPage}
                  custom={slideDirection}
                  variants={{
                    enter: (dir) => ({
                      opacity: 0,
                      y: dir === "next" ? 20 : -20,
                      scale: 0.99
                    }),
                    center: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.35, ease: "easeOut" }
                    },
                    exit: (dir) => ({
                      opacity: 0,
                      y: dir === "next" ? -20 : 20,
                      scale: 0.99,
                      transition: { duration: 0.25, ease: "easeIn" }
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5 flex-1 relative z-10"
                >
                  {currentProducts.map((product, pIdx) => (
                    <Interactive3DProductCard
                      key={product.id}
                      product={product}
                      index={pIdx}
                      scrollYProgress={scrollYProgress}
                      onInspect={onInspect}
                      onHoverChange={(hovered) => {
                        if (hovered) setIsHoveredOnProducts(true);
                      }}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar with Interactive Dots & Total Count */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D]" />
                  <span>9 SAMPLES DISPLAYED • {category.products.length} TOTAL IN CATEGORY</span>
                </span>

                {/* Interactive Page Dots */}
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSlideDirection(i > currentPage ? "next" : "prev");
                        setCurrentPage(i);
                        setSlideProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentPage === i
                          ? "w-7 bg-[#E21D1D]"
                          : "w-2 bg-neutral-700 hover:bg-neutral-500"
                      }`}
                      title={`Jump to Page ${i + 1}`}
                    />
                  ))}
                </div>

                <span className="hidden sm:inline text-neutral-500">
                  {isHoveredOnProducts ? "HOVER PAUSED" : "AUTO-ADVANCING"}
                </span>
              </div>
            )}
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
  const [modalZoom, setModalZoom] = useState<number>(1.0);

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
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span className="font-mono text-xs font-black tracking-widest text-[#E21D1D] uppercase">
                PRO ATHLETIC GEAR & APPAREL • STREET / ATHLEISURE / LEATHER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase leading-none">
              4 CORE OEM CATEGORIES & SAMPLE ARMORY
            </h2>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-2 max-w-2xl uppercase">
              Balanced 1:1 layout with full-height contextual imagery and matching 3x3 product showcases with smooth hover zoom.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 shrink-0">
            <Factory className="w-4 h-4 text-[#E21D1D]" />
            <span>OEM FACTORY PRODUCTION • 24 HR DISPATCH</span>
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
                    CATEGORY {cat.code} • 18 SAMPLES
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
            72 TOTAL SAMPLES (18/CAT)
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
            onInspect={(prod) => {
              setModalZoom(1.0);
              setInspectModalProduct(prod);
            }}
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
                {/* Transparent Product Cutout Image with Glow & Zoom Controls */}
                <div className="relative h-[290px] sm:h-[350px] flex flex-col items-center justify-center bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4 overflow-hidden">
                  <div
                    className="absolute w-48 h-48 rounded-full blur-[80px] pointer-events-none"
                    style={{ backgroundColor: inspectModalProduct.accentColor, opacity: 0.35 }}
                  />
                  <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={inspectModalProduct.image}
                      alt={inspectModalProduct.name}
                      animate={{
                        y: modalZoom === 1 ? [0, -6, 0] : 0,
                        scale: modalZoom
                      }}
                      transition={{
                        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                        scale: { type: "spring", stiffness: 300, damping: 25 }
                      }}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] relative z-10 transition-transform"
                    />
                  </div>

                  {/* Zoom Controls inside Modal */}
                  <div className="relative z-20 flex items-center gap-2 mt-2 bg-black/85 px-3 py-1 rounded-full border border-neutral-700/80 backdrop-blur-md">
                    <span className="font-mono text-[9px] text-neutral-400 font-bold">ZOOM:</span>
                    {[1.0, 1.5, 2.2].map((zVal) => (
                      <button
                        key={zVal}
                        onClick={() => setModalZoom(zVal)}
                        className={`font-mono text-[9px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          modalZoom === zVal
                            ? "bg-[#E21D1D] text-white font-bold"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        {zVal}X
                      </button>
                    ))}
                  </div>
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
