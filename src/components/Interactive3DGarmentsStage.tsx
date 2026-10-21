import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ZoomIn, Eye, ArrowUpRight, X } from "lucide-react";
import { CATEGORIES_DATA } from "../data/categoriesData";
import { ProductImageLightbox } from "./ProductImageLightbox";
import { FolderFileItem } from "../types/folderTree";
import defaultTreeData from "../data/imagekit_folder_tree.json";

// Quick lookup index for exact FolderFileItem by url or fileId
const treeFileMap: Record<string, FolderFileItem> = {};
function indexTree(node: any) {
  if (node.files && Array.isArray(node.files)) {
    for (const f of node.files) {
      if (f.fileId) treeFileMap[f.fileId] = f;
      if (f.url) treeFileMap[f.url] = f;
    }
  }
  if (node.children && Array.isArray(node.children)) {
    for (const c of node.children) {
      indexTree(c);
    }
  }
}
indexTree(defaultTreeData);

function getFolderFileItem(p: any, categoryName: string): FolderFileItem {
  const cleanId = (p.id || "").replace(/^ik-/, "");
  const found = treeFileMap[cleanId] || treeFileMap[p.image];
  if (found) {
    return {
      ...found,
      description: found.description || p.description,
      seoKeywords: found.seoKeywords || p.seoKeywords,
      subCategory: found.subCategory || p.subCategory || categoryName,
      category: found.category || categoryName
    };
  }
  const cleanName = (p.name || "").endsWith(".webp") ? p.name : `${p.name}.webp`;
  const sub = p.subCategory || categoryName;
  return {
    fileId: cleanId || `try-${Math.random().toString(36).slice(2)}`,
    name: cleanName,
    filePath: `/Try Products/${categoryName}/${sub}/${cleanName}`,
    url: p.image,
    thumbnail: p.image,
    description: p.description,
    seoTitle: p.seoTitle,
    seoSummary: p.seoSummary,
    seoKeywords: p.seoKeywords,
    category: categoryName,
    subCategory: p.subCategory,
    tags: Array.isArray(p.specs) ? p.specs : [p.specs || ""]
  };
}

export interface Garment3DProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  badge: string;
  specs: string;
  accentColor: string;
  fileItem: FolderFileItem;
}

export interface CategoryCollection {
  id: string;
  categoryName: string;
  code: string;
  tagline: string;
  accentColor: string;
  products: Garment3DProduct[];
}

export const CATEGORIES_3D_DATA: CategoryCollection[] = [
  {
    id: "cat-sports-wears",
    categoryName: "SPORTS WEARS",
    code: "01",
    tagline: "MATCH-GRADE TEAMWEAR • QUICK-DRY INTERLOCK • DIGITAL SUBLIMATION",
    accentColor: "#E21D1D",
    products: [
      {
        id: "hero-sports-1",
        name: "Pro Match Sublimated Jersey",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/01_purple_jersey.png",
        badge: "INTERLOCK 180 GSM",
        specs: "100% Dry-Fit Polyester • Laser-Cut Mesh Panels • Flatlock Seams",
        accentColor: "#8A2BE2",
        fileItem: {
          fileId: "hero-sports-1",
          name: "Pro Match Sublimated Jersey",
          filePath: "/Try Products/SPORTS WEARS/FOOTBALL UNIFORM/01_purple_jersey.png",
          url: "/images/sports-wears/01_purple_jersey.png",
          thumbnail: "/images/sports-wears/01_purple_jersey.png",
          category: "SPORTS WEARS",
          subCategory: "Football Uniforms & Match Kits",
          description: "Manufactured factory-direct at our Sialkot, Pakistan atelier, the Pro Match Sublimated Jersey is engineered exclusively for pro club tournaments and competitive athletes.\n\nCloth Quality & Fabric Specifications: 180-200 GSM 100% micro-interlock technical polyester with moisture-wicking capillary channels. Anti-microbial, anti-odor silver ion finish with certified Italian zero-fade sublimation inks.\n\nWorkmanship & Product Quality: Reinforced four-thread flatlock seam construction, breathable laser-cut side ventilation mesh panels, and ribbed stretch crew collar designed for tournament-level endurance.\n\nColors & Pattern Finishes: Deep Royal Purple & Electric Gold vector sublimation, sharp graphic contrast, zero peeling or cracking.\n\nB2B Production & OEM Sourcing: Sourced direct from our Sialkot facility. LOW MOQ 20 pcs per colorway. On-demand pre-production physical sampling, worldwide shipping as per client choice (Air & Sea freight terms).",
          seoTitle: "Pro Match Sublimated Jersey - Custom Football Teamwear Manufacturer | TRY WEARS",
          seoSummary: "Pro Match Sublimated Jersey manufactured factory-direct in Sialkot, Pakistan. 180 GSM micro-interlock dry-fit polyester, Italian zero-fade inks, LOW MOQ 20 pcs.",
          seoKeywords: ["custom football jersey manufacturer", "sublimated sportswear supplier", "sports apparel factory", "team kits manufacturer sialkot", "try wears sportswear"]
        }
      },
      {
        id: "hero-sports-2",
        name: "Tournament Athletic Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/02_white_blue_jersey.png",
        badge: "MICRO-POLY 190 GSM",
        specs: "Italian Sublimation Ink • Anti-Bacterial Treatment • Reinforced Collar",
        accentColor: "#0070F3",
        fileItem: {
          fileId: "hero-sports-2",
          name: "Tournament Athletic Kit",
          filePath: "/Try Products/SPORTS WEARS/FOOTBALL UNIFORM/02_white_blue_jersey.png",
          url: "/images/sports-wears/02_white_blue_jersey.png",
          thumbnail: "/images/sports-wears/02_white_blue_jersey.png",
          category: "SPORTS WEARS",
          subCategory: "Tournament Athletic Kits",
          description: "Precision engineered athletic kit designed for high-intensity competitive sports and university tournaments.\n\nCloth Quality & Fabric Specifications: 190 GSM high-filament micro-polyester with hydro-mesh underarm panels for optimal body heat regulation and 4-way ergonomic stretch.\n\nWorkmanship & Product Quality: High-tensile bar-tacked stress points, twin-needle hem stitching, customized with silicone 3D club crests and player numbering.\n\nColors & Pattern Finishes: Arctic White & Cyan Blue precision gradient sublimation with fade-resistant dye technology.\n\nB2B Production & OEM Sourcing: LOW MOQ 20 pcs, rapid sampling, full OEM customization directly from Sialkot.",
          seoTitle: "Tournament Athletic Kit - Custom Athletic Uniforms Manufacturer | TRY WEARS",
          seoSummary: "Tournament Athletic Kit: 190 GSM micro-polyester, Italian dye sublimation, custom silicone badges, LOW MOQ 20 units.",
          seoKeywords: ["athletic uniforms manufacturer", "custom sports jerseys", "sublimation teamwear sialkot", "wholesale sports apparel", "try wears"]
        }
      },
      {
        id: "hero-sports-3",
        name: "Squad Elite Match Jersey",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/05_navy_jersey.png",
        badge: "HYDROPHILIC DRY-FIT",
        specs: "Strategic Breathability Zones • 4-Way Ergonomic Stretch • LOW MOQ 20 Pcs",
        accentColor: "#1E3A8A",
        fileItem: {
          fileId: "hero-sports-3",
          name: "Squad Elite Match Jersey",
          filePath: "/Try Products/SPORTS WEARS/FOOTBALL UNIFORM/05_navy_jersey.png",
          url: "/images/sports-wears/05_navy_jersey.png",
          thumbnail: "/images/sports-wears/05_navy_jersey.png",
          category: "SPORTS WEARS",
          subCategory: "Squad Match Jerseys",
          description: "High-spec teamwear jersey engineered for endurance, speed, and premium retail presentation.\n\nCloth Quality & Fabric Specifications: 185 GSM hydrophobic dry-fit knit with micro-perforated back panels. Quick evaporation keeps players dry under intense heat.\n\nWorkmanship & Product Quality: Seamless shoulder construction reduces friction during full arm motion. Bar-tacked seams and taped interior collar.\n\nColors & Pattern Finishes: Deep Navy & Fluorescent Volt accents with ultra-durable heat-transfer brand branding.\n\nB2B Production & OEM Sourcing: Factory-direct production in Sialkot, low minimum order quantities, bespoke club labeling.",
          seoTitle: "Squad Elite Match Jersey - Performance Sportswear OEM | TRY WEARS",
          seoSummary: "Squad Elite Match Jersey: 185 GSM hydrophilic knit, micro-perforated back, OEM branding, LOW MOQ 20 pcs.",
          seoKeywords: ["teamwear supplier uk", "custom match kit manufacturer", "performance sportswear factory", "sialkot sports exporter"]
        }
      },
      {
        id: "hero-sports-4",
        name: "Championship Red Match Kit",
        category: "SPORTS WEARS",
        image: "/images/sports-wears/sports_red_match_jersey.png",
        badge: "PRO SPEC 200 GSM",
        specs: "Ultra-Tough Seam Stitching • Custom Numbering & Crests • OEM Sialkot Factory",
        accentColor: "#E21D1D",
        fileItem: {
          fileId: "hero-sports-4",
          name: "Championship Red Match Kit",
          filePath: "/Try Products/SPORTS WEARS/FOOTBALL UNIFORM/sports_red_match_jersey.png",
          url: "/images/sports-wears/sports_red_match_jersey.png",
          thumbnail: "/images/sports-wears/sports_red_match_jersey.png",
          category: "SPORTS WEARS",
          subCategory: "Championship Pro Kits",
          description: "Our flagship tournament match kit engineered for professional clubs and international federation standards.\n\nCloth Quality & Fabric Specifications: 200 GSM heavyweight athletic interlock with ribbed collar and raglan sleeve construction. Ultra-high tensile strength and tear resistance.\n\nWorkmanship & Product Quality: Reinforced triple-needle seams, bar-tacked side splits, bespoke 3D embossed TPU silicone emblems.\n\nColors & Pattern Finishes: Crimson Red & Onyx Black contrast geometric layout with vibrant colorfast pigment.\n\nB2B Production & OEM Sourcing: Produced in Sialkot, Pakistan. Export ready for UK, USA, CA, and EU markets with low MOQ.",
          seoTitle: "Championship Red Match Kit - Pro Sports Apparel Manufacturer | TRY WEARS",
          seoSummary: "Championship Red Match Kit: 200 GSM athletic interlock, triple-needle seams, 3D TPU emblems, LOW MOQ 20 pcs.",
          seoKeywords: ["pro match kit manufacturer", "custom soccer jersey supplier", "sialkot garment factory", "sports apparel exporter"]
        }
      }
    ]
  },
  {
    id: "cat-gym-fitness",
    categoryName: "GYM & FITNESS",
    code: "02",
    tagline: "HIGH-COMPRESSION ACTIVEWEAR • SQUAT-PROOF • SEAMLESS KNIT",
    accentColor: "#10B981",
    products: [
      {
        id: "hero-gym-1",
        name: "Seamless Compression Top",
        category: "GYM & FITNESS",
        image: "/images/gym-fitness/gym_seamless.png",
        badge: "SEAMLESS KNIT 280 GSM",
        specs: "90% Nylon 10% Spandex • Contoured Rib Weave • 4-Way Elastic Memory",
        accentColor: "#10B981",
        fileItem: {
          fileId: "hero-gym-1",
          name: "Seamless Compression Top",
          filePath: "/Try Products/GYM & FITNESS WEARS/MENS GYM & FITNESS WEARS/gym_seamless.png",
          url: "/images/gym-fitness/gym_seamless.png",
          thumbnail: "/images/gym-fitness/gym_seamless.png",
          category: "GYM & FITNESS WEARS",
          subCategory: "Seamless Activewear",
          description: "Artisanal circular-knit seamless construction engineered for zero chafing and targeted body contouring.\n\nCloth Quality & Fabric Specifications: 280 GSM premium 90% technical nylon and 10% spandex blend. Squat-proof opacity, 4-way elastic recovery, and moisture-wicking micro-yarns.\n\nWorkmanship & Product Quality: Circular knitting eliminates side seams entirely. Engineered compression ribs support core musculature during heavy lifts.\n\nColors & Pattern Finishes: Charcoal Heather & Sage Green colorways with high-density silicone branding.\n\nB2B Production & OEM Sourcing: Factory-direct production in Sialkot, Pakistan. LOW MOQ 20 units per colorway, custom private labeling.",
          seoTitle: "Seamless Compression Top - Custom Gym Activewear Manufacturer | TRY WEARS",
          seoSummary: "Seamless Compression Top: 280 GSM circular knit nylon/spandex, squat-proof opacity, zero-chafe design, LOW MOQ 20 pcs.",
          seoKeywords: ["seamless gym wear manufacturer", "activewear factory sialkot", "compression tops supplier", "private label activewear"]
        }
      },
      {
        id: "hero-gym-2",
        name: "Impact Padded Armor Top",
        category: "GYM & FITNESS",
        image: "/images/gym-fitness/06_padded_armor.png",
        badge: "HEX IMPACT SHIELD",
        specs: "EVA Shock Padding • High-Denier Compression Mesh • Moisture Wicking",
        accentColor: "#F59E0B",
        fileItem: {
          fileId: "hero-gym-2",
          name: "Impact Padded Armor Top",
          filePath: "/Try Products/GYM & FITNESS WEARS/MENS GYM & FITNESS WEARS/06_padded_armor.png",
          url: "/images/gym-fitness/06_padded_armor.png",
          thumbnail: "/images/gym-fitness/06_padded_armor.png",
          category: "GYM & FITNESS WEARS",
          subCategory: "Protective Compression Gear",
          description: "Heavy-duty impact protection top engineered for contact sports, combat training, and aggressive athletic drills.\n\nCloth Quality & Fabric Specifications: 250 GSM high-tensile compression poly-elastane integrated with ergonomic thermoformed EVA foam padding cells.\n\nWorkmanship & Product Quality: Independent flex pads articulate naturally with body mechanics. Flat-locked anti-tear stitching ensures padding stays firmly anchored.\n\nColors & Pattern Finishes: Stealth Matte Black with reflective geometric screen accents.\n\nB2B Production & OEM Sourcing: Direct OEM manufacturing from Sialkot with LOW MOQ 20 pcs and custom brand packaging.",
          seoTitle: "Impact Padded Armor Top - Protective Fightwear Manufacturer | TRY WEARS",
          seoSummary: "Impact Padded Armor Top: Ergonomic EVA impact pads, 250 GSM compression fabric, flatlock seams, OEM factory Sialkot.",
          seoKeywords: ["padded compression shirt", "combat training gear manufacturer", "impact sportswear supplier", "sialkot fitness factory"]
        }
      },
      {
        id: "hero-gym-3",
        name: "Bodybuilding Stringer Tank",
        category: "GYM & FITNESS",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        badge: "COMBED COTTON SPANDEX",
        specs: "Deep Cut Armholes • Raw Hem Edge • Anti-Pilling Wash Pre-Treated",
        accentColor: "#EF4444",
        fileItem: {
          fileId: "hero-gym-3",
          name: "Bodybuilding Stringer Tank",
          filePath: "/Try Products/GYM & FITNESS WEARS/MENS GYM & FITNESS WEARS/gym_stringer_tank.png",
          url: "/images/gym-fitness/gym_stringer_tank.png",
          thumbnail: "/images/gym-fitness/gym_stringer_tank.png",
          category: "GYM & FITNESS WEARS",
          subCategory: "Gym Tanks & Stringers",
          description: "Classic bodybuilding athletic stringer engineered for physique athletes and fitness lifestyle brands.\n\nCloth Quality & Fabric Specifications: 190 GSM 95% combed cotton / 5% elastane with enzyme silicone wash for an ultra-soft hand feel and zero wash shrinkage.\n\nWorkmanship & Product Quality: Y-back racerback strap cut, deep side dropped armholes, curved scoop bottom hem with bar-tack reinforcement.\n\nColors & Pattern Finishes: Crimson Red, Athletic Heather Grey, and Jet Black with vintage distressed screen-prints.\n\nB2B Production & OEM Sourcing: Factory direct export from Sialkot, LOW MOQ 20 units, custom woven size tags.",
          seoTitle: "Bodybuilding Stringer Tank - Wholesale Gym Clothing Manufacturer | TRY WEARS",
          seoSummary: "Bodybuilding Stringer Tank: 190 GSM combed cotton elastane, deep drop armholes, silicone wash finish, LOW MOQ 20 pcs.",
          seoKeywords: ["gym stringers manufacturer", "bodybuilding apparel supplier", "wholesale activewear", "sialkot garment exporter"]
        }
      },
      {
        id: "hero-gym-4",
        name: "High-Tensile Rashguard Top",
        category: "GYM & FITNESS",
        image: "/images/gym-fitness/gym_compression_top.png",
        badge: "THERMO-REGULATING",
        specs: "UPF 50+ Sun Guard • Flat-Lock No-Chafe Seams • Anti-Odor Silver Ions",
        accentColor: "#06B6D4",
        fileItem: {
          fileId: "hero-gym-4",
          name: "High-Tensile Rashguard Top",
          filePath: "/Try Products/GYM & FITNESS WEARS/MENS GYM & FITNESS WEARS/gym_compression_top.png",
          url: "/images/gym-fitness/gym_compression_top.png",
          thumbnail: "/images/gym-fitness/gym_compression_top.png",
          category: "GYM & FITNESS WEARS",
          subCategory: "Compression Rashguards",
          description: "Professional grade compression top built for BJJ, MMA grapple training, and high-intensity gym performance.\n\nCloth Quality & Fabric Specifications: 260 GSM heavy compression 85% polyester / 15% spandex with UPF 50+ sun protection and rubberized anti-ride waistband.\n\nWorkmanship & Product Quality: 6-thread flatlock stitching with reinforced collar and sleeves, engineered to withstand aggressive mat friction.\n\nColors & Pattern Finishes: Deep Ocean Cyan with sublimation artwork that will never peel, crack, or fade.\n\nB2B Production & OEM Sourcing: Full custom cut & sew in Sialkot, LOW MOQ 20 pcs, worldwide shipping.",
          seoTitle: "High-Tensile Rashguard Top - Custom MMA & Fitness Rashguards | TRY WEARS",
          seoSummary: "High-Tensile Rashguard: 260 GSM compression poly-spandex, 6-thread flatlock seams, anti-slip waistband, LOW MOQ 20 units.",
          seoKeywords: ["custom rashguard manufacturer", "bjj compression top supplier", "fightwear factory sialkot", "gym activewear supplier"]
        }
      }
    ]
  },
  {
    id: "cat-street-wears",
    categoryName: "STREET WEARS",
    code: "03",
    tagline: "LUXURY HEAVYWEIGHT STREETWEAR • 450–550 GSM • CUSTOM CUT & SEW",
    accentColor: "#F59E0B",
    products: [
      {
        id: "hero-street-1",
        name: "French Terry Boxy Hoodie",
        category: "STREET WEARS",
        image: "/images/street-wears/street_hoodie.png",
        badge: "HEAVYWEIGHT 480 GSM",
        specs: "100% Combed Loopback Cotton • Double-Layer Hood • Kangaroo Pocket Bar-Tacked",
        accentColor: "#F59E0B",
        fileItem: {
          fileId: "hero-street-1",
          name: "French Terry Boxy Hoodie",
          filePath: "/Try Products/STREET WEARS/MENS STREET WEARS/street_hoodie.png",
          url: "/images/street-wears/street_hoodie.png",
          thumbnail: "/images/street-wears/street_hoodie.png",
          category: "STREET WEARS",
          subCategory: "Heavyweight Hoodies",
          description: "Ultra-heavyweight luxury streetwear hoodie crafted with dropped shoulders and relaxed boxy drape.\n\nCloth Quality & Fabric Specifications: 480 GSM 100% combed cotton loopback French terry. Pre-shrunk tight weave with zero fleece lint shedding.\n\nWorkmanship & Product Quality: Double-layer hood without cheap drawstrings for modern aesthetic. Bar-tacked kangaroo pocket corners and 2x2 ribbed heavy spandex cuffs.\n\nColors & Pattern Finishes: Desert Sand, Bone White, and Washed Onyx. Compatible with 3D puff print and custom chenille patches.\n\nB2B Production & OEM Sourcing: Manufactured factory-direct in Sialkot, Pakistan. LOW MOQ 20 pcs per colorway, custom private label neck tags.",
          seoTitle: "French Terry Boxy Hoodie - Heavyweight Streetwear Manufacturer | TRY WEARS",
          seoSummary: "French Terry Boxy Hoodie: 480 GSM 100% combed cotton, double-layer hood, drop-shoulder fit, LOW MOQ 20 pcs.",
          seoKeywords: ["heavyweight hoodie manufacturer", "480 gsm hoodie blanks", "streetwear manufacturer uk", "custom streetwear sialkot"]
        }
      },
      {
        id: "hero-street-2",
        name: "Vintage Drop-Shoulder Tee",
        category: "STREET WEARS",
        image: "/images/street-wears/street_oversized_tee.png",
        badge: "SINGLE JERSEY 260 GSM",
        specs: "Acid Mineral Wash • Thick 1.25-inch Ribbed Collar • Pre-Shrunk Luxury Blank",
        accentColor: "#EC4899",
        fileItem: {
          fileId: "hero-street-2",
          name: "Vintage Drop-Shoulder Tee",
          filePath: "/Try Products/STREET WEARS/MENS STREET WEARS/street_oversized_tee.png",
          url: "/images/street-wears/street_oversized_tee.png",
          thumbnail: "/images/street-wears/street_oversized_tee.png",
          category: "STREET WEARS",
          subCategory: "Oversized Tees",
          description: "Luxury blank t-shirt tailored with a heavyweight drape, wide chest, and premium high-rib collar.\n\nCloth Quality & Fabric Specifications: 260 GSM 100% ring-spun combed cotton single jersey. Hand-treated acid mineral wash finish for vintage texture.\n\nWorkmanship & Product Quality: Heavy 1.25-inch thick 1x1 rib collar that never sags, blind-stitch hems, twin-needle reinforced shoulders.\n\nColors & Pattern Finishes: Vintage Faded Charcoal, Distressed Moss, and Aged Chalk.\n\nB2B Production & OEM Sourcing: Factory direct export from Sialkot, LOW MOQ 20 units, custom screen-printing and DTG ready.",
          seoTitle: "Vintage Drop-Shoulder Tee - 260 GSM Oversized T-Shirt Factory | TRY WEARS",
          seoSummary: "Vintage Drop-Shoulder Tee: 260 GSM combed cotton, acid mineral wash, thick rib collar, LOW MOQ 20 units.",
          seoKeywords: ["heavyweight t shirt manufacturer", "vintage washed tee blank", "oversized tee supplier", "sialkot clothing exporter"]
        }
      },
      {
        id: "hero-street-3",
        name: "Colorblocked Raglan Hoodie",
        category: "STREET WEARS",
        image: "/images/street-wears/03_red_white_hoodie.png",
        badge: "BRUSHED FLEECE 450 GSM",
        specs: "Contrast Paneling • 3D High-Density Rubber Print • Chunky Silver Eyelets",
        accentColor: "#EF4444",
        fileItem: {
          fileId: "hero-street-3",
          name: "Colorblocked Raglan Hoodie",
          filePath: "/Try Products/STREET WEARS/MENS STREET WEARS/03_red_white_hoodie.png",
          url: "/images/street-wears/03_red_white_hoodie.png",
          thumbnail: "/images/street-wears/03_red_white_hoodie.png",
          category: "STREET WEARS",
          subCategory: "Raglan Street Hoodies",
          description: "Contemporary two-tone streetwear pullover featuring cut-and-sew geometric contrast panels.\n\nCloth Quality & Fabric Specifications: 450 GSM brushed cotton-poly fleece for soft thermal insulation and structural bulk.\n\nWorkmanship & Product Quality: Precision color-blocked seams, taped neck seam, matte nickel eyelets with flat braided cotton drawcords.\n\nColors & Pattern Finishes: Crimson Red & Alabaster White split paneling with high-density micro-screen print.\n\nB2B Production & OEM Sourcing: Sialkot OEM factory direct, LOW MOQ 20 units, sample turnaround 5-7 days.",
          seoTitle: "Colorblocked Raglan Hoodie - Custom Cut & Sew Streetwear | TRY WEARS",
          seoSummary: "Colorblocked Raglan Hoodie: 450 GSM brushed fleece, custom cut & sew paneling, OEM branding, LOW MOQ 20 units.",
          seoKeywords: ["custom cut and sew manufacturer", "colorblock hoodie factory", "streetwear brand manufacturer", "sialkot hoodie supplier"]
        }
      },
      {
        id: "hero-street-4",
        name: "Tactical Oversized Tech Jacket",
        category: "STREET WEARS",
        image: "/images/street-wears/street_tech_jacket.png",
        badge: "WEATHERPROOF RIPSTOP",
        specs: "DWR Water-Repellent Shell • YKK Matte Zips • Utility Modular Cargo Pockets",
        accentColor: "#8B5CF6",
        fileItem: {
          fileId: "hero-street-4",
          name: "Tactical Oversized Tech Jacket",
          filePath: "/Try Products/STREET WEARS/MENS STREET WEARS/street_tech_jacket.png",
          url: "/images/street-wears/street_tech_jacket.png",
          thumbnail: "/images/street-wears/street_tech_jacket.png",
          category: "STREET WEARS",
          subCategory: "Tactical Tech Outerwear",
          description: "Utilitarian technical outerwear featuring modular pocket architecture and waterproof membrane.\n\nCloth Quality & Fabric Specifications: 220 GSM high-density diamond ripstop nylon with DWR fluorocarbon-free water-resistant coating and breathable mesh lining.\n\nWorkmanship & Product Quality: Taped waterproof seam joints, YKK reverse-coil matte black zippers, modular velcro patch chest panels.\n\nColors & Pattern Finishes: Stealth Blackout & Tactical Slate with reflective trim piping.\n\nB2B Production & OEM Sourcing: Sialkot factory direct, LOW MOQ 20 units, custom silicone zipper pullers.",
          seoTitle: "Tactical Oversized Tech Jacket - Techwear Outerwear Factory | TRY WEARS",
          seoSummary: "Tactical Oversized Tech Jacket: Diamond ripstop nylon, DWR water resistance, YKK zippers, LOW MOQ 20 units.",
          seoKeywords: ["techwear manufacturer", "tactical jacket supplier", "outerwear factory sialkot", "private label streetwear"]
        }
      }
    ]
  },
  {
    id: "cat-jackets",
    categoryName: "JACKETS",
    code: "04",
    tagline: "PREMIUM ARTISANAL LEATHER, PUFFERS & VARSITY JACKETS",
    accentColor: "#E21D1D",
    products: [
      {
        id: "hero-jacket-1",
        name: "Heritage Wool Varsity Jacket",
        category: "JACKETS",
        image: "/images/leather-jackets/leather_varsity.png",
        badge: "GENUINE LEATHER SLEEVES",
        specs: "24oz Melton Wool Body • Full-Grain Cowhide Arms • Custom Chenille Embroidery",
        accentColor: "#E21D1D",
        fileItem: {
          fileId: "hero-jacket-1",
          name: "Heritage Wool Varsity Jacket",
          filePath: "/Try Products/JACKETS/Leather Jackets (Faux Leather)/leather_varsity.png",
          url: "/images/leather-jackets/leather_varsity.png",
          thumbnail: "/images/leather-jackets/leather_varsity.png",
          category: "JACKETS",
          subCategory: "Varsity & Letterman Jackets",
          description: "Timeless American collegiate varsity jacket handcrafted with master artisanal leatherwork in Sialkot.\n\nCloth Quality & Fabric Specifications: Heavyweight 24oz 80% Melton wool body matched with 1.2mm top-grain genuine cowhide leather sleeves.\n\nWorkmanship & Product Quality: Diamond quilted thermal poly-satin lining, antique brass snap closures, heavy striped acrylic rib collar and waistband.\n\nColors & Pattern Finishes: Midnight Black wool with Bone White cowhide leather sleeves. Ready for custom high-pile chenille patches and chainstitch embroidery.\n\nB2B Production & OEM Sourcing: Handcrafted in Sialkot, Pakistan. LOW MOQ 20 units, bespoke branding and custom trims.",
          seoTitle: "Heritage Wool Varsity Jacket - Custom Letterman Jacket Manufacturer | TRY WEARS",
          seoSummary: "Heritage Wool Varsity Jacket: 24oz Melton wool, 1.2mm genuine leather sleeves, chenille embroidery, LOW MOQ 20 units.",
          seoKeywords: ["varsity jacket manufacturer sialkot", "leather varsity supplier", "custom letterman jackets", "outerwear factory pakistan"]
        }
      },
      {
        id: "hero-jacket-2",
        name: "Full-Grain Biker Moto Jacket",
        category: "JACKETS",
        image: "/images/leather-jackets/leather_biker.png",
        badge: "1.2MM COWHIDE LEATHER",
        specs: "Asymmetric Heavy-Duty Brass Zipper • Quilted Satin Lining • Snap-Down Lapels",
        accentColor: "#71717A",
        fileItem: {
          fileId: "hero-jacket-2",
          name: "Full-Grain Biker Moto Jacket",
          filePath: "/Try Products/JACKETS/Biker Jackets/leather_biker.png",
          url: "/images/leather-jackets/leather_biker.png",
          thumbnail: "/images/leather-jackets/leather_biker.png",
          category: "JACKETS",
          subCategory: "Motorcycle & Biker Jackets",
          description: "Rugged motorcycle jacket handcrafted from drum-dyed full-grain leather for maximum abrasion resistance.\n\nCloth Quality & Fabric Specifications: 1.2-1.3mm drum-dyed premium cowhide leather. Waxed oil pull-up finish develops a rich natural patina over time.\n\nWorkmanship & Product Quality: Heavy YKK #10 asymmetric brass zip, bi-swing back shoulder action gussets, snap-down notch collar, and zippered expanding cuffs.\n\nColors & Pattern Finishes: Deep Pitch Black with distressed hand-waxed seam burnishing.\n\nB2B Production & OEM Sourcing: Handcrafted in Sialkot, world capital of leatherwork. LOW MOQ 20 units, custom embossed branding.",
          seoTitle: "Full-Grain Biker Moto Jacket - Handcrafted Leather Jacket Manufacturer | TRY WEARS",
          seoSummary: "Full-Grain Biker Moto Jacket: 1.2mm cowhide leather, heavy YKK brass zips, action back gussets, LOW MOQ 20 pcs.",
          seoKeywords: ["leather jacket manufacturer sialkot", "biker jacket supplier", "custom leather outerwear", "pakistan leather exporter"]
        }
      },
      {
        id: "hero-jacket-3",
        name: "Minimalist Cafe Racer Jacket",
        category: "JACKETS",
        image: "/images/leather-jackets/leather_cafe_racer.png",
        badge: "HAND-BUFFED LEATHER",
        specs: "Mandarin Snap Collar • Gusseted Action Back Shoulders • Antique Brass Hardware",
        accentColor: "#D97706",
        fileItem: {
          fileId: "hero-jacket-3",
          name: "Minimalist Cafe Racer Jacket",
          filePath: "/Try Products/JACKETS/Racer Jackets - minimal biker/leather_cafe_racer.png",
          url: "/images/leather-jackets/leather_cafe_racer.png",
          thumbnail: "/images/leather-jackets/leather_cafe_racer.png",
          category: "JACKETS",
          subCategory: "Cafe Racer Leather Jackets",
          description: "Sleek European cafe racer jacket tailored with clean lines, clean chest pockets, and ergonomic motoring silhouette.\n\nCloth Quality & Fabric Specifications: 1.1mm supple semi-aniline lambskin or cowhide leather with a smooth buttery touch.\n\nWorkmanship & Product Quality: Band snap collar, center-front brass zip, zippered chest slash pockets, and breathable twill cotton torso lining.\n\nColors & Pattern Finishes: Rich Cognac Tan with subtle hand-burnished edge highlights.\n\nB2B Production & OEM Sourcing: Manufactured factory direct in Sialkot, LOW MOQ 20 units, bespoke inner woven branding.",
          seoTitle: "Minimalist Cafe Racer Jacket - Premium Leather Outerwear OEM | TRY WEARS",
          seoSummary: "Minimalist Cafe Racer Jacket: 1.1mm supple semi-aniline leather, mandarin snap collar, antique brass hardware, LOW MOQ 20 units.",
          seoKeywords: ["cafe racer jacket manufacturer", "leather outerwear supplier", "custom leather jacket factory", "sialkot leather artisan"]
        }
      },
      {
        id: "hero-jacket-4",
        name: "Aviator Shearling Flight Jacket",
        category: "JACKETS",
        image: "/images/leather-jackets/leather_aviator_jacket.png",
        badge: "SHEEPSKIN SHEARLING",
        specs: "Plush Natural Wool Collar & Cuffs • Buckled Throat Latch • Extreme Thermal Grade",
        accentColor: "#B45309",
        fileItem: {
          fileId: "hero-jacket-4",
          name: "Aviator Shearling Flight Jacket",
          filePath: "/Try Products/JACKETS/Flight Jackets/leather_aviator_jacket.png",
          url: "/images/leather-jackets/leather_aviator_jacket.png",
          thumbnail: "/images/leather-jackets/leather_aviator_jacket.png",
          category: "JACKETS",
          subCategory: "Shearling & Aviator Jackets",
          description: "Heavy winter aviator flight jacket built with plush shearling wool interior for sub-zero thermal insulation.\n\nCloth Quality & Fabric Specifications: Genuine double-face shearling sheepskin leather with 18mm dense wool interior pelt.\n\nWorkmanship & Product Quality: Double leather buckle throat straps, side waist adjustment buckles, heavy brass storm zipper with wind flap.\n\nColors & Pattern Finishes: Vintage Distressed Brown outer shell with warm Cream wool fleece collar.\n\nB2B Production & OEM Sourcing: Sialkot artisanal leather craftsmanship, LOW MOQ 20 units, bespoke gift packaging.",
          seoTitle: "Aviator Shearling Flight Jacket - Luxury Shearling Outerwear Supplier | TRY WEARS",
          seoSummary: "Aviator Shearling Flight Jacket: Genuine double-face sheepskin shearling, 18mm dense wool pelt, LOW MOQ 20 units.",
          seoKeywords: ["shearling jacket manufacturer", "aviator flight jacket supplier", "luxury leather factory sialkot", "winter outerwear manufacturer"]
        }
      }
    ]
  }
];

interface Interactive3DGarmentsStageProps {
  currentCategoryIndex?: number;
  onCategoryChange?: (index: number) => void;
  onSelectProduct?: (product: Garment3DProduct) => void;
}

export const Interactive3DGarmentsStage: React.FC<Interactive3DGarmentsStageProps> = ({
  currentCategoryIndex = 0,
  onCategoryChange,
  onSelectProduct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active category & product states
  const [activeCategory, setActiveCategory] = useState<number>(currentCategoryIndex);
  const [activeFocusCard, setActiveFocusCard] = useState<number>(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Sync with prop if changed from outside
  useEffect(() => {
    setActiveCategory(currentCategoryIndex);
  }, [currentCategoryIndex]);

  // Handle category change and notify parent
  const changeCategory = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(CATEGORIES_3D_DATA.length - 1, index));
    setActiveCategory(clamped);
    setActiveFocusCard(0);
    setHoveredCardIdx(null);
    if (onCategoryChange) {
      onCategoryChange(clamped);
    }
  }, [onCategoryChange]);

  const currentCollection = CATEGORIES_3D_DATA[activeCategory] || CATEGORIES_3D_DATA[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-between select-none py-1"
    >
      {/* 1. TOP CATEGORY SELECTOR (SIMPLE, SLEEK PILLS) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-2 sm:px-4 mb-2 flex flex-col items-center gap-1.5">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
          {CATEGORIES_3D_DATA.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(idx)}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-mono text-[10px] sm:text-xs font-bold uppercase transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                  isActive
                    ? "bg-[#E21D1D] text-white shadow-[0_0_20px_rgba(226,29,29,0.5)] font-black scale-105"
                    : "text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-white/80 dark:bg-black/60 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-xs"
                }`}
              >
                <span className={isActive ? "text-white/80" : "text-[#E21D1D]"}>{cat.code}</span>
                <span>{cat.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Minimal Category Tagline */}
        <p className="text-[9.5px] sm:text-[11px] font-mono text-neutral-600 dark:text-neutral-400 tracking-wider sm:tracking-widest uppercase text-center mt-0.5 px-3 line-clamp-1">
          {currentCollection.tagline}
        </p>
      </div>

      {/* 2. FREESTANDING 3D GARMENTS SHOWCASE (COMPACT SIZE & BUTTERY-SMOOTH HOVER ZOOM) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-2 sm:px-4 my-auto min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCollection.id}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 items-end justify-center"
          >
            {currentCollection.products.map((product, idx) => {
              const isHovered = hoveredCardIdx === idx;
              const isAnotherHovered = hoveredCardIdx !== null && hoveredCardIdx !== idx;

              return (
                <motion.div
                  key={product.id}
                  animate={{
                    scale: isHovered ? 1.12 : isAnotherHovered ? 0.95 : 1,
                    y: isHovered ? -8 : isAnotherHovered ? 2 : 0,
                    opacity: isAnotherHovered ? 0.5 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 30,
                    mass: 0.5
                  }}
                  onMouseEnter={() => {
                    setHoveredCardIdx(idx);
                    setActiveFocusCard(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setIsLightboxOpen(true);
                    if (onSelectProduct) onSelectProduct(product);
                  }}
                  className={`relative flex flex-col items-center justify-end cursor-pointer group transform-gpu will-change-transform ${
                    isHovered ? "z-40" : "z-10"
                  }`}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Atmospheric Glow Spotlight Behind Freestanding Garment */}
                  <div
                    className={`absolute inset-0 rounded-full blur-[24px] transition-opacity duration-300 pointer-events-none ${
                      isHovered ? "opacity-75 scale-105" : "opacity-0 scale-75"
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${product.accentColor} 0%, rgba(226, 29, 29, 0.2) 50%, transparent 70%)`
                    }}
                  />

                  {/* FREESTANDING PRODUCT IMAGE (COMPACT, SLEEK PROPORTIONS WITH CRISP RESOLUTION) */}
                  <div className="relative w-full max-w-[140px] sm:max-w-[160px] md:max-w-[175px] lg:max-w-[190px] h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain transition-transform duration-300 ease-out transform-gpu will-change-transform drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)] ${
                        isHovered
                          ? "scale-105 drop-shadow-[0_20px_28px_rgba(0,0,0,0.95)]"
                          : ""
                      }`}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle Zoom Badge On Hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-1 right-1 bg-black/90 backdrop-blur-md border border-[#E21D1D]/70 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg pointer-events-none"
                      >
                        <ZoomIn className="w-2.5 h-2.5 text-[#E21D1D]" />
                        <span>ZOOM</span>
                      </motion.div>
                    )}
                  </div>

                  {/* 3D Soft Floor Contact Shadow */}
                  <div
                    className="w-2/3 h-3 rounded-[100%] blur-[8px] bg-black/90 transition-all duration-300 pointer-events-none -mt-1"
                    style={{
                      transform: `scale(${isHovered ? 1.15 : 0.95})`,
                      opacity: isHovered ? 0.85 : isAnotherHovered ? 0.3 : 0.6
                    }}
                  />

                  {/* CLEAN PRODUCT TYPOGRAPHY (SLEEK & REFINED) */}
                  <div
                    className={`mt-1 flex flex-col items-center text-center transition-opacity duration-200 ${
                      isHovered ? "opacity-100" : isAnotherHovered ? "opacity-35" : "opacity-90"
                    }`}
                  >
                    <span className="text-[7.5px] sm:text-[8.5px] font-mono font-black text-[#E21D1D] tracking-wider uppercase">
                      {product.badge}
                    </span>
                    <h4 className="text-[11px] sm:text-xs font-display font-black text-neutral-900 dark:text-white uppercase tracking-wider mt-0.5 line-clamp-1 group-hover:text-red-500 transition-colors max-w-[180px]">
                      {product.name}
                    </h4>

                    {/* Quick Specs Revealed on Hover */}
                    <div className="h-3.5 flex items-center justify-center mt-0.5">
                      {isHovered ? (
                        <motion.span
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-[7.5px] sm:text-[8px] font-mono text-neutral-700 dark:text-neutral-300 line-clamp-1 max-w-[170px]"
                        >
                          {product.specs}
                        </motion.span>
                      ) : (
                        <span className="text-[7.5px] sm:text-[8px] font-mono text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">
                          0{idx + 1} / 04 • HOVER TO ZOOM
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. SLEEK MINIMALIST CONTROLS BAR (CLEAN SLOTS & TOUR PLAY/PAUSE) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-3 sm:px-4 pt-2.5 sm:pt-3 mt-1.5 sm:mt-2 border-t border-neutral-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
          <span className="text-neutral-800 dark:text-white font-bold uppercase tracking-wider text-[9px] sm:text-[11px] truncate max-w-[200px] xs:max-w-[280px] sm:max-w-none">
            TRY WEARS • PREMIER OEM & ODM MANUFACTURER • SIALKOT EXPORT QUALITY GUARANTEED
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Minimal 4-Slot Dot Selectors */}
          <div className="flex items-center gap-1.5">
            {currentCollection.products.map((p, idx) => {
              const isSelected = activeFocusCard === idx || hoveredCardIdx === idx;
              return (
                <button
                  key={`dot-${p.id}`}
                  onClick={() => {
                    setActiveFocusCard(idx);
                    setIsAutoPlaying(false);
                  }}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "w-7 bg-[#E21D1D] shadow-[0_0_10px_#E21D1D]"
                      : "w-2 bg-neutral-300 dark:bg-white/20 hover:bg-neutral-400 dark:hover:bg-white/50"
                  }`}
                  title={p.name}
                />
              );
            })}
          </div>

          <div className="h-4 w-px bg-neutral-200 dark:bg-white/10" />

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white font-mono text-[10px] uppercase transition-colors cursor-pointer border border-neutral-200 dark:border-transparent"
            title={isAutoPlaying ? "Pause Auto-Tour" : "Start Auto-Tour"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">TOUR ON</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
                <span className="hidden sm:inline">PAUSED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. FULLSCREEN HIGH-RES PRODUCT LIGHTBOX (EXACTLY AS IN MEGA MENU & CATALOG) */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={currentCollection.products.map((p) => p.fileItem)}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        folderName={currentCollection.categoryName}
        folderPath={`/Try Products/${currentCollection.categoryName}`}
        onRequestQuote={(info) => {
          setIsLightboxOpen(false);
          window.dispatchEvent(
            new CustomEvent("open-quote-page", {
              detail: { productName: info.name }
            })
          );
        }}
      />
    </div>
  );
};
