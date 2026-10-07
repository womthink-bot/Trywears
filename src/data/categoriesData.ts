export interface SubCategoryItem {
  id: string;
  name: string;
  tagline?: string;
}

export interface CategoryProduct {
  id: string;
  sampleNum: number;
  name: string;
  subtitle: string;
  image: string;
  badge: string;
  subCategory: string;
  subCategoryId: string;
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
  subCategories: SubCategoryItem[];
  themeColor: string;
  heroImage: string;
  heroImageAlt: string;
  heroVideo?: string;
  bgImage: string;
  bgAlt: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  alignImageLeft: boolean;
  products: CategoryProduct[];
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "sports-wears",
    index: 0,
    code: "01",
    name: "SPORTS WEARS",
    tagline: "CLO 3D MATCH GRADE • ZERO-FADE SUBLIMATION",
    badge: "MATCH GRADE ARMORY",
    themeColor: "#E21D1D",
    heroImage: "/media/home/videos/sportswearsGP.webm",
    heroImageAlt: "3D match grade tournament jersey live video showcasing anatomical construction",
    heroVideo: "/media/home/videos/sportswearsGP.webm",
    bgImage: "/images/backgrounds/sports_bg.webp",
    bgAlt: "Professional sports athletes on stadium field under floodlights",
    description: "TOURNAMENT-GRADE FOOTBALL KITS, BASKETBALL UNIFORMS, AND PRO RUGBY JERSEYS ENGINEERED FOR HIGH-AEROBIC BREATHABILITY AND EXTREME MATCH-PULL DURABILITY.",
    alignImageLeft: true,
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
    subCategories: [
      { id: "football-uniforms", name: "Football Uniforms", tagline: "Match-Grade Kits & Sublimation Jerseys" },
      { id: "basketball-uniforms", name: "Basketball Uniforms", tagline: "Pro Tournament Birdseye Tanks" },
      { id: "rugby-team-kits", name: "Rugby & Team Kits", tagline: "High-Tensile Pull-Resistant Uniforms" },
      { id: "training-athletic", name: "Training & Athletics", tagline: "High-Flex Capillary Activewear" }
    ],
    products: [
      {
        id: "sports-1",
        sampleNum: 1,
        name: "Sublimated Pro Match Jersey",
        subtitle: "Purple & Gold V-Neck",
        image: "/images/sports-wears/sportswearsP1.webp",
        badge: "CLO 3D MATCH GRADE",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/sportswearsP2.webp",
        badge: "PRO ATHLETIC KIT",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/sportswearsP3.webp",
        badge: "MATCH LEVEL UNIFORM",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/sportswearsP4.webp",
        badge: "PRO ATHLETIC JERSEY",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/sports_red_match_jersey.webp",
        badge: "BASKETBALL PRO",
        subCategory: "Basketball Uniforms",
        subCategoryId: "basketball-uniforms",
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
        image: "/images/sports-wears/02_white_blue_jersey.webp",
        badge: "PRO LEAGUE GRADE",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/01_purple_jersey.webp",
        badge: "CLUB EDITION",
        subCategory: "Rugby & Team Kits",
        subCategoryId: "rugby-team-kits",
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
        image: "/images/sports-wears/05_navy_jersey.webp",
        badge: "TACTICAL TRAINING",
        subCategory: "Training & Athletics",
        subCategoryId: "training-athletic",
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
        image: "/images/sports-wears/sports_red_match_jersey.webp",
        badge: "MATCH STRIKER",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/royal_gold_jersey.webp",
        badge: "CHAMPIONSHIP GOLD",
        subCategory: "Rugby & Team Kits",
        subCategoryId: "rugby-team-kits",
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
        image: "/images/sports-wears/squad_tournament_kit.webp",
        badge: "PRO TOURNAMENT",
        subCategory: "Rugby & Team Kits",
        subCategoryId: "rugby-team-kits",
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
        image: "/images/sports-wears/striped_football_kit.webp",
        badge: "LEAGUE DIVISION",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/pro_match_jersey.webp",
        badge: "PRECISION MATCH",
        subCategory: "Rugby & Team Kits",
        subCategoryId: "rugby-team-kits",
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
        image: "/images/sports-wears/05_navy_jersey.webp",
        badge: "TACTICAL MATCH",
        subCategory: "Training & Athletics",
        subCategoryId: "training-athletic",
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
        image: "/images/sports-wears/sports_red_match_jersey.webp",
        badge: "VELOCITY STRIKER",
        subCategory: "Football Uniforms",
        subCategoryId: "football-uniforms",
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
        image: "/images/sports-wears/02_white_blue_jersey.webp",
        badge: "AZURE PRO",
        subCategory: "Training & Athletics",
        subCategoryId: "training-athletic",
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
        image: "/images/sports-wears/01_purple_jersey.webp",
        badge: "IMPERIAL DIVISION",
        subCategory: "Training & Athletics",
        subCategoryId: "training-athletic",
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
        image: "/images/sports-wears/sports_red_match_jersey.webp",
        badge: "ALL-STAR PRO",
        subCategory: "Basketball Uniforms",
        subCategoryId: "basketball-uniforms",
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
    tagline: "WOMEN'S ACTIVEWEAR SETS • MEN'S COMPRESSION SUITS",
    badge: "3D POWER KNIT",
    themeColor: "#3B82F6",
    heroImage: "/media/home/videos/gymandfitnessGP.webm",
    heroImageAlt: "High performance gym and fitness training live video showcasing compression apparel",
    heroVideo: "/media/home/videos/gymandfitnessGP.webm",
    bgImage: "/images/backgrounds/gym_bg.webp",
    bgAlt: "Intense athletic fitness workout and bodybuilders in moody gym",
    description: "HIGH PERFORMANCE DEDICATED APPAREL DESIGNED FOR INTENSE GYM TRAINING, WOMEN'S SEAMLESS ACTIVEWEAR BRA & LEGGINGS SUITS, MEN'S 2-PIECE COMPRESSION SETS, AND SQUAT-PROOF PERFORMANCE GEAR.",
    alignImageLeft: false,
    stats: [
      { label: "120+ PRODUCTS", value: "OEM SAMPLES" },
      { label: "24 HR DISPATCH", value: "SAMPLE SERVICE" },
      { label: "100% QUALITY OEM", value: "GUARANTEED" },
    ],
    highlights: [
      "Women's Seamless Sculpted Sports Bra & Leggings",
      "Squat-Proof 4-Way Compression Spandex",
      "Silver-Ion Infused Anti-Odor Yarn",
      "Men's 2-Piece Rashguard & Base Layer Suits"
    ],
    subCategories: [
      { id: "women-sets", name: "Women's Activewear Sets", tagline: "Seamless Sculpted Bras & High-Rise Leggings" },
      { id: "compression-suits", name: "Compression Base Layer Suits", tagline: "Men's 2-Piece 4-Way Muscle Compression" },
      { id: "training-sets", name: "Gym Training & Workout Suits", tagline: "Deep-Cut Hooded Tanks & Liner Shorts" },
      { id: "seamless-base-layers", name: "Seamless & Base Layers", tagline: "Tubular Micro-Ribbed Thermal Knit" }
    ],
    products: [
      {
        id: "gym-1",
        sampleNum: 1,
        name: "Women's Seamless Sports Bra & Contour Leggings Set",
        subtitle: "Aesthetic 2-Piece Activewear Suit",
        image: "/images/gym-fitness/gym_women_seamless_set_v2.webp",
        badge: "WOMEN'S SEAMLESS 2-PIECE SET",
        subCategory: "Women's Activewear Sets",
        subCategoryId: "women-sets",
        gsm: "320-GSM",
        fabric: "Seamless Micro-Ribbed Nylon & Spandex",
        accentColor: "#EC4899",
        moq: "30 PCS",
        colorways: [
          { name: "Dusty Mauve", hex: "#DB2777" },
          { name: "Stealth Black", hex: "#18181B" },
          { name: "Sage Olive", hex: "#4D7C0F" }
        ],
        specs: ["Sculpted High-Support Ribbed Sports Bra", "High-Waisted Booty-Contour Ribbed Leggings", "100% Squat-Proof 4-Way Compression Knit", "Chafe-Free Seamless Tubular Construction"]
      },
      {
        id: "gym-2",
        sampleNum: 2,
        name: "Women's High-Support Racerback Bra & Active Leggings Suit",
        subtitle: "Forest Emerald Activewear Suit",
        image: "/images/gym-fitness/gym_women_emerald_bra_set_v2.webp",
        badge: "HIGH-SUPPORT GYM SUIT",
        subCategory: "Women's Activewear Sets",
        subCategoryId: "women-sets",
        gsm: "340-GSM",
        fabric: "High-Tensile Spandex & Moisture-Wicking Mesh",
        accentColor: "#10B981",
        moq: "30 PCS",
        colorways: [
          { name: "Forest Emerald", hex: "#10B981" },
          { name: "Midnight Navy", hex: "#1E3A8A" },
          { name: "Shadow Obsidian", hex: "#09090B" }
        ],
        specs: ["Impact-Absorbing Racerback Sports Bra with Removable Pads", "High-Rise Contoured Performance Workout Leggings", "Reinforced Flatlock Double Seams", "Rapid Sweat-Evaporation Breathable Panels"]
      },
      {
        id: "gym-3",
        sampleNum: 3,
        name: "Men's 2-Piece Compression Rashguard & Tights Base Layer Suit",
        subtitle: "Ergonomic Muscle-Mapped Training Suit",
        image: "/images/gym-fitness/gym_men_compression_suit_v2.webp",
        badge: "2-PIECE COMPRESSION SUIT",
        subCategory: "Compression Base Layer Suits",
        subCategoryId: "compression-suits",
        gsm: "290-GSM",
        fabric: "4-Way Muscle Compression Poly-Spandex",
        accentColor: "#06B6D4",
        moq: "30 PCS",
        colorways: [
          { name: "Carbon & Cyan", hex: "#06B6D4" },
          { name: "Stealth Blackout", hex: "#18181B" },
          { name: "Crimson Strike", hex: "#DC2626" }
        ],
        specs: ["Long-Sleeve Muscle Compression Rashguard Top", "Full-Length Athletic Base Layer Compression Tights", "Flatlock Anti-Chafing Seams", "Vascular Muscle Support & UV50+ Protection"]
      },
      {
        id: "gym-4",
        sampleNum: 4,
        name: "Pro Sleeveless Workout Hoodie & 2-in-1 Training Shorts Set",
        subtitle: "Bodybuilding & Conditioning Gym Set",
        image: "/images/gym-fitness/gym_men_training_set_v2.webp",
        badge: "MEN'S GYM TRAINING SET",
        subCategory: "Gym Training & Workout Suits",
        subCategoryId: "training-sets",
        gsm: "260-GSM",
        fabric: "French Terry Cotton & Compression Liner",
        accentColor: "#E21D1D",
        moq: "30 PCS",
        colorways: [
          { name: "Charcoal Heather", hex: "#374151" },
          { name: "Onyx Black", hex: "#18181B" },
          { name: "Volt Athletic", hex: "#84CC16" }
        ],
        specs: ["Deep Athletic Cutout Sleeveless Gym Hoodie", "5-inch 2-in-1 Compression Liner Workout Shorts", "Zippered Phone Pocket on Compression Liner", "Reinforced Drawstrings & Metal Eyelets"]
      },
      {
        id: "gym-5",
        sampleNum: 5,
        name: "Thermal Zone-Knit Base Layer Top",
        subtitle: "High-Compression Cold-Gear",
        image: "/images/gym-fitness/gym_seamless.webp",
        badge: "ZONE-KNIT BASE",
        subCategory: "Seamless & Base Layers",
        subCategoryId: "seamless-base-layers",
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
        image: "/images/gym-fitness/06_padded_armor.webp",
        badge: "HEX CHEST ARMOR",
        subCategory: "Hex Impact Foam Armor",
        subCategoryId: "impact-armor",
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
        image: "/images/gym-fitness/gym_stringer_tank.webp",
        badge: "EXTENDED V-TAPER",
        subCategory: "Bodybuilding Stringers",
        subCategoryId: "stringers-tanks",
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
        image: "/images/gym-fitness/gym_compression_top.webp",
        badge: "LOCKDOWN COMPRESSION",
        subCategory: "Compression & Rashguards",
        subCategoryId: "compression-rashguards",
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
        image: "/images/gym-fitness/gym_seamless.webp",
        badge: "MICRO-RIBBED",
        subCategory: "Seamless & Base Layers",
        subCategoryId: "seamless-base-layers",
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
        image: "/images/gym-fitness/hex_impact_armor.webp",
        badge: "HEX COMBAT GUARD",
        subCategory: "Hex Impact Foam Armor",
        subCategoryId: "impact-armor",
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
        image: "/images/gym-fitness/muscle_compression_top.webp",
        badge: "VASCULAR POWER",
        subCategory: "Compression & Rashguards",
        subCategoryId: "compression-rashguards",
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
        image: "/images/gym-fitness/seamless_training_top.webp",
        badge: "CORE SEAMLESS",
        subCategory: "Seamless & Base Layers",
        subCategoryId: "seamless-base-layers",
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
        image: "/images/gym-fitness/bodybuilding_stringer.webp",
        badge: "HEAVY STRINGER",
        subCategory: "Bodybuilding Stringers",
        subCategoryId: "stringers-tanks",
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
        image: "/images/gym-fitness/gym_seamless.webp",
        badge: "PRO FIGHTER SKIN",
        subCategory: "Compression & Rashguards",
        subCategoryId: "compression-rashguards",
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
        image: "/images/gym-fitness/06_padded_armor.webp",
        badge: "ANATOMICAL HEX",
        subCategory: "Hex Impact Foam Armor",
        subCategoryId: "impact-armor",
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
        image: "/images/gym-fitness/gym_stringer_tank.webp",
        badge: "V-TAPER PERFORMANCE",
        subCategory: "Bodybuilding Stringers",
        subCategoryId: "stringers-tanks",
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
        image: "/images/gym-fitness/gym_compression_top.webp",
        badge: "THERMAL BASE LAYER",
        subCategory: "Seamless & Base Layers",
        subCategoryId: "seamless-base-layers",
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
        image: "/images/gym-fitness/gym_seamless.webp",
        badge: "POWER SEAMLESS",
        subCategory: "Seamless & Base Layers",
        subCategoryId: "seamless-base-layers",
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
    heroImage: "/media/home/videos/streetwearsGP.webm",
    heroImageAlt: "Luxury heavyweight French terry streetwear live video showcasing bespoke silhouettes",
    heroVideo: "/media/home/videos/streetwearsGP.webm",
    bgImage: "/images/backgrounds/street_bg.webp",
    bgAlt: "Cinematic night urban city street with glowing neon lights and street fashion atmosphere",
    description: "BESPOKE LUXURY STREETWEAR SILHOUETTES INCLUDING BOXY 450GSM FRENCH TERRY HOODIES, HEAVY VINTAGE WASH TEES, AND MODERN TECHWEAR OUTERWEAR BUILT FOR HIGH-END BOUTIQUE LABELS.",
    alignImageLeft: true,
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
    subCategories: [
      { id: "women-streetwear", name: "Women's Streetwear Sets", tagline: "Cropped Boxy Hoodies & Cargo Tracksuits" },
      { id: "heavy-hoodies", name: "Heavyweight 450GSM Tracksuits", tagline: "450GSM-500GSM Structured Loopback Fleece Sets" },
      { id: "oversized-cargo-sets", name: "Vintage Tees & Tactical Cargo Sets", tagline: "300GSM Mineral Washed Drop-Shoulder Sets" },
      { id: "techwear-jackets", name: "Techwear & Tactical Shells", tagline: "DWR Weatherproof Utility Modular Outerwear" }
    ],
    products: [
      {
        id: "street-1",
        sampleNum: 1,
        name: "Women's Cropped Boxy Hoodie & Wide-Leg Sweatpants Set",
        subtitle: "Luxury 420GSM 2-Piece Tracksuit",
        image: "/images/street-wears/street_women_cropped_hoodie_set_v2.webp",
        badge: "WOMEN'S 420GSM TRACKSUIT",
        subCategory: "Women's Streetwear Sets",
        subCategoryId: "women-streetwear",
        gsm: "420-GSM",
        fabric: "100% Pre-Shrunk Organic Cotton Fleece",
        accentColor: "#F59E0B",
        moq: "30 PCS",
        colorways: [
          { name: "Vintage Bone", hex: "#E7E5E4" },
          { name: "Washed Obsidian", hex: "#1C1917" },
          { name: "Desert Sand", hex: "#D97706" }
        ],
        specs: ["Cropped Boxy Heavyweight Pullover Hoodie", "High-Waisted Wide-Leg Relaxed Street Sweatpants", "Double-Layer Rigid Structured Hood", "Custom Engraved Metal Drawcord Tips"]
      },
      {
        id: "street-2",
        sampleNum: 2,
        name: "Women's Washed Graphic Tee & Parachute Cargo Pants Set",
        subtitle: "Drop-Shoulder Utility Street Set",
        image: "/images/street-wears/street_women_boxy_tee_cargo_set_v2.webp",
        badge: "WOMEN'S CARGO STREET SET",
        subCategory: "Women's Streetwear Sets",
        subCategoryId: "women-streetwear",
        gsm: "300-GSM",
        fabric: "Vintage Washed Combed Cotton & Ripstop",
        accentColor: "#10B981",
        moq: "30 PCS",
        colorways: [
          { name: "Washed Sage Olive", hex: "#4D7C0F" },
          { name: "Vintage Charcoal", hex: "#262626" },
          { name: "Bone White", hex: "#F5F5F4" }
        ],
        specs: ["Drop-Shoulder Boxy Relaxed Vintage Graphic Tee", "High-Waisted Parachute Cargo Pants with Drawcord Toggles", "Deep Utility 3D Bellows Pockets", "Reinforced Bar-Tack Seams & Double Stitched Hem"]
      },
      {
        id: "street-3",
        sampleNum: 3,
        name: "Men's Luxury 450GSM French Terry Boxy Hoodie & Sweats Set",
        subtitle: "450GSM Heavyweight Street Tracksuit",
        image: "/images/street-wears/street_men_heavy_hoodie_set_v2.webp",
        badge: "MEN'S 450GSM TRACKSUIT",
        subCategory: "Heavyweight 450GSM Tracksuits",
        subCategoryId: "heavy-hoodies",
        gsm: "450-GSM",
        fabric: "Heavy French Terry Loopback Cotton",
        accentColor: "#E21D1D",
        moq: "30 PCS",
        colorways: [
          { name: "Washed Obsidian", hex: "#1C1917" },
          { name: "Charcoal Slate", hex: "#334155" },
          { name: "Faded Olive", hex: "#365314" }
        ],
        specs: ["450GSM Structured Boxy Heavyweight Hoodie", "Heavy Ribbed Cuffed Relaxed Street Track Sweats", "Double-Layered Self-Fabric Hood (No Drawstring Cut)", "Heavy-Gauge 2x2 Cotton Ribbing"]
      },
      {
        id: "street-4",
        sampleNum: 4,
        name: "Men's Vintage Washed Heavy Tee & Tactical Cargo Pants Set",
        subtitle: "Tactical Multi-Pocket Street Set",
        image: "/images/street-wears/street_men_vintage_tee_cargo_set_v2.webp",
        badge: "MEN'S TACTICAL STREET SET",
        subCategory: "Vintage Tees & Tactical Cargo Sets",
        subCategoryId: "oversized-cargo-sets",
        gsm: "300-GSM",
        fabric: "Heavyweight Combed Jersey & Tactical Ripstop",
        accentColor: "#8B5CF6",
        moq: "30 PCS",
        colorways: [
          { name: "Charcoal Slate", hex: "#1E293B" },
          { name: "Stealth Black", hex: "#09090B" },
          { name: "Military Tan", hex: "#78716C" }
        ],
        specs: ["300GSM Heavy Drop-Shoulder Graphic Boxy Tee", "Multi-Pocket Tactical Cargo Pants with Modular Webbing Straps", "Twin-Needle Reinforced Shoulder Taping", "YKK Zippered Ankle Adjusters & Waist Drawcords"]
      },
      {
        id: "street-5",
        sampleNum: 5,
        name: "Vintage Mineral Acid-Wash Hoodie",
        subtitle: "500GSM Heavyweight Loopback",
        image: "/images/street-wears/street_hoodie.webp",
        badge: "500GSM ACID WASH",
        subCategory: "Heavyweight Hoodies",
        subCategoryId: "heavy-hoodies",
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
        image: "/images/street-wears/03_red_white_hoodie.webp",
        badge: "COLORBLOCK STREET",
        subCategory: "Track & Zip Hoodies",
        subCategoryId: "track-zip-hoodies",
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
        image: "/images/street-wears/street_oversized_tee.webp",
        badge: "280GSM BOXY TEE",
        subCategory: "Vintage Oversized Tees",
        subCategoryId: "oversized-tees",
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
        image: "/images/street-wears/street_tech_jacket.webp",
        badge: "TACTICAL RIPSTOP",
        subCategory: "Techwear & Tactical Shells",
        subCategoryId: "techwear-jackets",
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
        image: "/images/street-wears/street_hoodie.webp",
        badge: "RAW-EDGE FLEECE",
        subCategory: "Heavyweight Hoodies",
        subCategoryId: "heavy-hoodies",
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
        image: "/images/street-wears/heavyweight_boxy_hoodie.webp",
        badge: "500GSM LUXURY",
        subCategory: "Heavyweight Hoodies",
        subCategoryId: "heavy-hoodies",
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
        image: "/images/street-wears/vintage_oversized_tee.webp",
        badge: "320GSM VINTAGE TEE",
        subCategory: "Vintage Oversized Tees",
        subCategoryId: "oversized-tees",
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
        image: "/images/street-wears/tactical_tech_jacket.webp",
        badge: "TACTICAL ANORAK",
        subCategory: "Techwear & Tactical Shells",
        subCategoryId: "techwear-jackets",
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
        image: "/images/street-wears/raglan_zip_hoodie.webp",
        badge: "RAGLAN ZIP",
        subCategory: "Track & Zip Hoodies",
        subCategoryId: "track-zip-hoodies",
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
        image: "/images/street-wears/street_hoodie.webp",
        badge: "SIGNATURE STREET",
        subCategory: "Heavyweight Hoodies",
        subCategoryId: "heavy-hoodies",
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
        image: "/images/street-wears/03_red_white_hoodie.webp",
        badge: "URBAN TRACK",
        subCategory: "Track & Zip Hoodies",
        subCategoryId: "track-zip-hoodies",
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
        image: "/images/street-wears/street_oversized_tee.webp",
        badge: "BOXY SKATER TEE",
        subCategory: "Vintage Oversized Tees",
        subCategoryId: "oversized-tees",
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
        image: "/images/street-wears/street_tech_jacket.webp",
        badge: "CYBER TECH SHELL",
        subCategory: "Techwear & Tactical Shells",
        subCategoryId: "techwear-jackets",
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
        image: "/images/street-wears/street_hoodie.webp",
        badge: "MINERAL DISTRESS",
        subCategory: "Heavyweight Hoodies",
        subCategoryId: "heavy-hoodies",
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
    name: "JACKETS",
    tagline: "VARSITY • PUFFER • LEATHER • BOMBER & WINDBREAKER JACKETS",
    badge: "BESPOKE JACKET CRAFT",
    themeColor: "#D97706",
    heroImage: "/media/home/videos/leatherGP.webm",
    heroImageAlt: "Handcrafted 1.2mm drum-dyed full-grain leather motorcycle jacket live showcase video",
    heroVideo: "/media/home/videos/leatherGP.webm",
    bgImage: "/images/backgrounds/leather_bg.webp",
    bgAlt: "Vintage motorcycle cafe racer on highway at dusk with handcrafted leather ambiance",
    description: "GRADE-A DRUM-DYED FULL-GRAIN LEATHER OUTERWEAR, ASYMMETRIC MOTO JACKETS, GENUINE SHEARLING AVIATORS, AND WOOL/LEATHER VARSITY SQUAD COATS HANDCRAFTED BY GENERATIONAL MASTERS.",
    alignImageLeft: false,
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
    subCategories: [
      { id: "biker-leather", name: "Leather Biker Jackets", tagline: "1.2mm Drum-Dyed Cowhide Asymmetric Moto" },
      { id: "winter-puffer", name: "Quilted Puffer Jackets", tagline: "Down-Filled Weatherproof Ripstop Outerwear" },
      { id: "varsity-jackets", name: "Melton Wool & Leather Varsity", tagline: "24oz Melton Wool with Top-Grain Leather Sleeves" },
      { id: "bomber-flight", name: "MA-1 Bomber & Windbreakers", tagline: "Flight Satin Tactical Outerwear" }
    ],
    products: [
      {
        id: "jacket-1",
        sampleNum: 1,
        name: "Full-Grain Cowhide Biker Leather Jacket",
        subtitle: "Asymmetric Heavy Moto Outerwear",
        image: "/images/jackets/jacket_leather.webp",
        badge: "LEATHER BIKER JACKET",
        subCategory: "Leather Biker Jackets",
        subCategoryId: "biker-leather",
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
        id: "jacket-2",
        sampleNum: 2,
        name: "High-Insulation Quilted Winter Puffer Jacket",
        subtitle: "Heavy Down Fill Thermal Outerwear",
        image: "/images/jackets/jacket_puffer.webp",
        badge: "PUFFER DOWN JACKET",
        subCategory: "Quilted Puffer Jackets",
        subCategoryId: "winter-puffer",
        gsm: "700 FILL POWER",
        fabric: "Ripstop Nylon & Duck Down Fill",
        accentColor: "#D97706",
        moq: "20 PCS",
        colorways: [
          { name: "Matte Black", hex: "#0F172A" },
          { name: "Arctic Silver", hex: "#94A3B8" },
          { name: "Midnight Navy", hex: "#1E3A8A" }
        ],
        specs: ["700 Fill-Power High-Loft Thermal Insulation", "Weatherproof DWR Coated Ripstop Shell", "Storm Hood & Heavy Duty Dual-Way Zip", "Elasticized Thermal Wind-Block Cuffs"]
      },
      {
        id: "jacket-3",
        sampleNum: 3,
        name: "Heritage Wool & Leather Varsity Letterman Jacket",
        subtitle: "Custom Chenille Squad Jacket",
        image: "/images/jackets/jacket_varsity.webp",
        badge: "VARSITY BOMBER JACKET",
        subCategory: "Melton Wool & Leather Varsity",
        subCategoryId: "varsity-jackets",
        gsm: "24OZ WOOL",
        fabric: "24oz Melton Wool & Cowhide Sleeves",
        accentColor: "#B45309",
        moq: "20 PCS",
        colorways: [
          { name: "Navy & Cream", hex: "#1E293B" },
          { name: "Burgundy & Ivory", hex: "#831843" },
          { name: "Black & Gold", hex: "#1C1917" }
        ],
        specs: ["24oz Melton Wool Insulated Body", "Genuine Top-Grain Cowhide Leather Sleeves", "Custom Chainstitch & Chenille Embroidery Ready", "Heavy Brass Snap Closure Hardware"]
      },
      {
        id: "jacket-4",
        sampleNum: 4,
        name: "Modern Urban Technical Bomber & Windbreaker",
        subtitle: "MA-1 Tactical Flight Outerwear",
        image: "/images/jackets/jacket_bomber.webp",
        badge: "TACTICAL BOMBER JACKET",
        subCategory: "MA-1 Bomber & Windbreakers",
        subCategoryId: "bomber-flight",
        gsm: "280GSM NYLON",
        fabric: "Flight Satin Weatherproof Shell",
        accentColor: "#854D0E",
        moq: "15 PCS",
        colorways: [
          { name: "Military Olive", hex: "#3F6212" },
          { name: "Stealth Black", hex: "#09090B" },
          { name: "Gunmetal Gray", hex: "#334155" }
        ],
        specs: ["Water-Repellent Flight Satin Shell with Signature Orange Lining", "Heavy Antique Brass Utility Sleeve Zipper Pocket", "Heavy-Gauge Ribbed Collar, Cuffs and Waistband", "Interior Snap-Close Concealed Cargo Pockets"]
      },
      {
        id: "leather-5",
        sampleNum: 5,
        name: "Double-Rider Blackout Moto Jacket",
        subtitle: "Matte Black YKK Gunmetal Hardware",
        image: "/images/leather-jackets/leather_biker.webp",
        badge: "BLACKOUT RIDER",
        subCategory: "Biker & Double-Rider Moto",
        subCategoryId: "biker-moto",
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
        image: "/images/leather-jackets/leather_varsity.webp",
        badge: "EMERALD VARSITY",
        subCategory: "Melton Wool & Leather Varsity",
        subCategoryId: "varsity-jackets",
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
        image: "/images/leather-jackets/leather_cafe_racer.webp",
        badge: "DISTRESSED PATINA",
        subCategory: "Cafe Racer Moto",
        subCategoryId: "cafe-racer",
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
        image: "/images/leather-jackets/leather_aviator_jacket.webp",
        badge: "B-3 FLIGHT COAT",
        subCategory: "Aviator Shearling Coats",
        subCategoryId: "aviator-shearling",
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
        image: "/images/leather-jackets/leather_biker.webp",
        badge: "QUILTED BIKER",
        subCategory: "Biker & Double-Rider Moto",
        subCategoryId: "biker-moto",
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
        image: "/images/leather-jackets/waxed_cafe_racer.webp",
        badge: "WAXED CAFE RACER",
        subCategory: "Cafe Racer Moto",
        subCategoryId: "cafe-racer",
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
        image: "/images/leather-jackets/heritage_wool_varsity.webp",
        badge: "HERITAGE VARSITY",
        subCategory: "Melton Wool & Leather Varsity",
        subCategoryId: "varsity-jackets",
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
        image: "/images/leather-jackets/full_grain_biker_moto.webp",
        badge: "FULL GRAIN MOTO",
        subCategory: "Biker & Double-Rider Moto",
        subCategoryId: "biker-moto",
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
        image: "/images/leather-jackets/aviator_shearling_flight.webp",
        badge: "GENUINE SHEARLING",
        subCategory: "Aviator Shearling Coats",
        subCategoryId: "aviator-shearling",
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
        image: "/images/leather-jackets/leather_biker.webp",
        badge: "DOUBLE RIDER",
        subCategory: "Biker & Double-Rider Moto",
        subCategoryId: "biker-moto",
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
        image: "/images/leather-jackets/leather_varsity.webp",
        badge: "CHENILLE VARSITY",
        subCategory: "Melton Wool & Leather Varsity",
        subCategoryId: "varsity-jackets",
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
        image: "/images/leather-jackets/leather_cafe_racer.webp",
        badge: "MANDARIN RACER",
        subCategory: "Cafe Racer Moto",
        subCategoryId: "cafe-racer",
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
        image: "/images/leather-jackets/leather_aviator_jacket.webp",
        badge: "ESPRESSO SHEARLING",
        subCategory: "Aviator Shearling Coats",
        subCategoryId: "aviator-shearling",
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
        image: "/images/leather-jackets/leather_biker.webp",
        badge: "BLACKOUT RIDER",
        subCategory: "Biker & Double-Rider Moto",
        subCategoryId: "biker-moto",
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
