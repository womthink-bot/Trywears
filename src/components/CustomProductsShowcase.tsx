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
// ✦ TRY WEARS CUSTOM PRODUCTS GALLERY DATA
// Every product has a transparent background (PNG without background),
// displaying custom designs and brand logos ready for wholesale clients.
// Auto-cycles every 2 seconds as requested by the user.
// ============================================================================

export interface CustomClientProduct {
  id: string;
  name: string;
  clientBrand: string;
  country: string;
  orderVolume: string;
  image: string; // Transparent PNG with no background!
  alt: string;
  badge: string;
  customizationDetails: string;
  fabricSpecs: string;
}

interface Hotspot {
  x: number;
  y: number;
  title: string;
  desc: string;
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
  hotspots: Hotspot[];
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
      "Try Wears customize products bhi bana kar deta hai — Football, Basketball aur cricket teams ke liye 100% bespoke kits, custom numbers aur team crests.",
    description:
      "Try Wears sirf standard catalog nahi balkay aapke club, brand ya team ke mutabiq 100% custom products bana kar deta hai. Custom team crest, player numbers, pantone color matching aur zero-fade Italian sublimation printing.",
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
    hotspots: [
      {
        x: 48,
        y: 28,
        title: "Custom Club Crest",
        desc: "High-density 3D silicone or metallic heat-sealed team badge"
      },
      {
        x: 30,
        y: 52,
        title: "Italian Sublimation",
        desc: "Zero-fade digital sublimation ink deeply infused in yarn"
      },
      {
        x: 70,
        y: 65,
        title: "Ergonomic Side Panels",
        desc: "Laser-cut hexagonal mesh zones for ultra ventilation"
      }
    ],
    // ✦ 4 Ready Custom Products with Transparent Backgrounds (Auto-rotate every 2s)
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
      "Aapke fitness brand ya gym ke liye 100% custom activewear, seamless muscle-fit tops aur aesthetic bodybuilding stringers.",
    description:
      "Aapke fitness brand ya gym label ke liye bespoke compression tops, high-flex stringers, seamless gym sets aur custom aesthetic cuts. Aapki marzi ke custom GSM fabrics, branded jacquard elastics aur private rubber tags ke sath.",
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
    hotspots: [
      {
        x: 50,
        y: 35,
        title: "3D Muscle Mapping",
        desc: "Contoured compression ribs that enhance pectoral definition"
      },
      {
        x: 25,
        y: 58,
        title: "4-Way Power Flex",
        desc: "Adaptive stretch retains shape through heavy lifting cycles"
      },
      {
        x: 75,
        y: 42,
        title: "Anti-Chafing Flatlock",
        desc: "Seamless circular knit prevents skin irritation during workouts"
      }
    ],
    // ✦ 4 Ready Custom Gym Products with Transparent Backgrounds
    clientProducts: [
      {
        id: "gym-prod-1",
        name: "Titan 3D Seamless Ribbed Compression Top",
        clientBrand: "TITAN STRENGTH APPAREL",
        country: "DUBAI / UAE",
        orderVolume: "300 PCS PRIVATE LABEL",
        image: "/images/gym-fitness/gym_seamless.png",
        alt: "Seamless 3D Ergonomic Blue Compression Top",
        badge: "SEAMLESS 3D KNIT",
        customizationDetails: "Muscle-mapped contour ribbing, custom matte rubber hem tag, bespoke sizing",
        fabricSpecs: "320 GSM Nylon-Spandex Composite"
      },
      {
        id: "gym-prod-2",
        name: "PowerFlex 4-Way Muscle Compression Shirt",
        clientBrand: "IRON CORE PERFORMANCE",
        country: "GERMANY",
        orderVolume: "450 PCS WHOLESALE BATCH",
        image: "/images/gym-fitness/gym_compression_top.png",
        alt: "4-Way Adaptive Muscle Flex Compression Shirt",
        badge: "4-WAY POWER FLEX",
        customizationDetails: "3D reflective silicone chest logo, reinforced flatlock anti-chafing seams",
        fabricSpecs: "280 GSM Anti-Chafe Poly-Elastane"
      },
      {
        id: "gym-prod-3",
        name: "Olympus Pro Bodybuilding Stringer Tank",
        clientBrand: "OLYMPUS GYM CHAIN",
        country: "USA",
        orderVolume: "500 PCS WHOLESALE ORDER",
        image: "/images/gym-fitness/gym_stringer_tank.png",
        alt: "Pro Bodybuilding Stringer Tank with Custom Cut",
        badge: "CUSTOM STRINGER CUT",
        customizationDetails: "Deep Y-back cut, high-density plastisol gym emblem, woven brand label",
        fabricSpecs: "100% Combed Slub Cotton 180 GSM"
      },
      {
        id: "gym-prod-4",
        name: "HexImpact Combat Padded Armor Top",
        clientBrand: "VALIANT COMBAT ACADEMY",
        country: "NETHERLANDS",
        orderVolume: "250 PCS CUSTOM ORDER",
        image: "/images/gym-fitness/06_padded_armor.png",
        alt: "Hexagonal Padded Combat Armor Compression Shirt",
        badge: "MOLDED HEX FOAM PADDING",
        customizationDetails: "Integrated shoulder & abdominal impact foam guards with club logo",
        fabricSpecs: "High-Density Molded EVA + Lycra Shell"
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
      "Heavyweight luxury oversized hoodies, vintage acid-wash tees aur custom cut-and-sew garments aapke label ke mutabiq.",
    description:
      "Heavyweight luxury drop-shoulder hoodies, boxy vintage wash tees aur custom streetwear outerwear. Aapke custom 3D puff prints, chenille embroidery patches, custom engraved metal aglets aur bespoke woven neck labels ke sath.",
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
    hotspots: [
      {
        x: 50,
        y: 38,
        title: "High-Density Puff Print",
        desc: "Raised 3D tactile screen printing with razor-sharp edges"
      },
      {
        x: 28,
        y: 22,
        title: "Drop Shoulder Cut",
        desc: "Relaxed street silhouette with reinforced twin-needle neck rib"
      },
      {
        x: 72,
        y: 70,
        title: "Vintage Acid Wash",
        desc: "Handcrafted stone & enzyme washing for authentic patina"
      }
    ],
    // ✦ 4 Ready Custom Streetwear Products with Transparent Backgrounds
    clientProducts: [
      {
        id: "street-prod-1",
        name: "Nocturne Mineral Wash Heavy Boxy Tee",
        clientBrand: "NOCTURNE STREETWEAR",
        country: "LOS ANGELES, USA",
        orderVolume: "500 PCS DROP DELIVERED",
        image: "/images/street-wears/street_oversized_tee.png",
        alt: "Mineral Wash Heavy Boxy Streetwear Tee",
        badge: "MINERAL ACID WASH",
        customizationDetails: "Enzyme washed vintage patina, high-density 3D puff chest print, bespoke neck tag",
        fabricSpecs: "280 GSM 100% Combed Cotton"
      },
      {
        id: "street-prod-2",
        name: "Metropolis 500 GSM French Terry Drop Hoodie",
        clientBrand: "METROPOLIS APPAREL",
        country: "LONDON, UK",
        orderVolume: "400 PCS BESPOKE BATCH",
        image: "/images/street-wears/street_hoodie.png",
        alt: "Heavyweight 500 GSM French Terry Streetwear Hoodie",
        badge: "500 GSM FRENCH TERRY",
        customizationDetails: "Custom engraved gunmetal eyelets & aglets, chenille chest patch, double-layer hood",
        fabricSpecs: "500 GSM 100% Cotton Loopback Terry"
      },
      {
        id: "street-prod-3",
        name: "Redline Varsity Two-Tone Raglan Hoodie",
        clientBrand: "DISTRICT 9 STREET LABEL",
        country: "FRANCE",
        orderVolume: "350 PCS ORDER DELIVERED",
        image: "/images/street-wears/03_red_white_hoodie.png",
        alt: "Two-Tone Red and White Heavy Streetwear Hoodie",
        badge: "TWO-TONE CUT & SEW",
        customizationDetails: "Contrast raglan sleeves, embroidered sleeve numbers, thick kangaroo pocket",
        fabricSpecs: "450 GSM Heavy Brushed Fleece"
      },
      {
        id: "street-prod-4",
        name: "CyberTech Modular Tactical Anorak Jacket",
        clientBrand: "SHADOW DIVISION TECHWEAR",
        country: "TOKYO, JAPAN",
        orderVolume: "200 PCS LIMITED RUN",
        image: "/images/street-wears/street_tech_jacket.png",
        alt: "Modular Technical Streetwear Windbreaker Jacket",
        badge: "WATERPROOF RIPSTOP",
        customizationDetails: "Taped waterproof YKK zippers, modular cross-body sling, custom silicone arm patch",
        fabricSpecs: "3-Layer Laminated Waterproof Nylon Ripstop"
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
      "Original cowhide leather biker jackets, championship boxing gloves aur custom fight team shorts tailor-made banaiye.",
    description:
      "Handcrafted real cowhide leather motorcycle jackets, pro boxing championship gloves aur bespoke combat robes. Biometric made-to-measure sizing, custom foil debossing, metallic embroidery aur multi-layer impact foam padding.",
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
    hotspots: [
      {
        x: 45,
        y: 32,
        title: "Drum-Dyed Cowhide",
        desc: "Supple 1.2mm leather treated for scratch resistance"
      },
      {
        x: 25,
        y: 55,
        title: "Asymmetric YKK Zip",
        desc: "Heavy-duty #10 antique brass zippers built for longevity"
      },
      {
        x: 68,
        y: 68,
        title: "Diamond Quilted Panels",
        desc: "Reinforced shoulder and elbow articulation padding"
      }
    ],
    // ✦ 4 Ready Custom Leather Products with Transparent Backgrounds
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
  const [activeIdx, setActiveIdx] = useState(0);
  const current = CUSTOM_DIVISIONS[activeIdx];

  // ✦ AUTO-CYCLE STATE: Changes product image every 2 seconds (2000ms)
  const [currentProductIdx, setCurrentProductIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const currentProduct = current.clientProducts[currentProductIdx] || current.clientProducts[0];

  // 3D Turntable and Tilt States
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [manualRotationY, setManualRotationY] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewPreset, setViewPreset] = useState<"iso" | "front" | "detail">("iso");
  const [isHovered, setIsHovered] = useState(false);

  // Background 3D Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tilt physics for 3D stage card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 24,
    stiffness: 220
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 24,
    stiffness: 220
  });

  // ✦ AUTO-CYCLE TIMER: Exactly 2 Seconds (2000ms)
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
    setActiveHotspot(null);
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

  // Drag to rotate turntable manually
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    setIsAutoRotating(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    startX.current = e.clientX;
    setManualRotationY((prev) => prev + delta * 0.7);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
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

  // Auto-rotate 3D continuous loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isAutoRotating && !isHovered) {
        setManualRotationY((prev) => (prev + dt * 25) % 360);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating, isHovered]);

  // Background 3D Wireframe Canvas Animation (Deep Red #E21D1D)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 3D Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1]
    ];

    const edges: [number, number][] = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 9], [1, 8], [1, 7],
      [2, 11], [2, 10], [2, 6], [2, 3], [2, 4],
      [3, 4], [3, 9], [3, 8], [3, 6],
      [4, 5], [4, 9], [4, 11],
      [5, 9],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11]
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.008;

      const cx = canvas.width * 0.4;
      const cy = canvas.height * 0.5;
      const scale = Math.min(canvas.width, canvas.height) * 0.38;

      const cosY = Math.cos(angle);
      const sinY = Math.sin(angle);
      const cosX = Math.cos(angle * 0.6);
      const sinX = Math.sin(angle * 0.6);

      const projected = rawVertices.map(([x, y, z]) => {
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;
        let ry = y * cosX - rz * sinX;
        rz = y * sinX + rz * cosX;

        const distance = 4;
        const pers = distance / (distance + rz * 0.5);
        return {
          x: cx + rx * scale * 0.35 * pers,
          y: cy + ry * scale * 0.35 * pers,
          z: rz
        };
      });

      ctx.strokeStyle = "rgba(226, 29, 29, 0.18)";
      ctx.lineWidth = 1.2;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.fillStyle = "rgba(226, 29, 29, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePrevProduct = () => {
    setCurrentProductIdx((prev) =>
      prev === 0 ? current.clientProducts.length - 1 : prev - 1
    );
    setActiveHotspot(null);
  };

  const handleNextProduct = () => {
    setCurrentProductIdx((prev) =>
      (prev + 1) % current.clientProducts.length
    );
    setActiveHotspot(null);
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

  const getStageRotation = () => {
    if (viewPreset === "front") return { rotateY: 0, scale: 1.05 };
    if (viewPreset === "detail") return { rotateY: 15, scale: 1.35 };
    return { rotateY: manualRotationY, scale: 1 };
  };

  const stageStyle = getStageRotation();

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
                TRY WEARS BESPOKE OEM & ODM DIVISION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-white leading-[1.08]">
              TRY WEARS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] to-red-500 underline decoration-[#E21D1D]/40 decoration-4 underline-offset-8">
                CUSTOMIZE PRODUCTS
              </span>{" "}
              BHI BANA KAR DETA HAI
            </h2>

            <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-wider leading-relaxed pt-1">
              Wholesalers, fitness brands aur sports clubs ke liye 100% ready customized products — custom brand logos, client designs, Italian sublimation aur private labeling ke sath.
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
              onClick={() => {
                setActiveIdx(idx);
                setActiveHotspot(null);
              }}
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

        {/* MAIN INTERACTIVE 3D PERSPECTIVE STAGE CONTAINER */}
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
              {/* ✦ 2-SECOND ANIMATED PROGRESS INDICATOR (Auto-Cycles every 2s) */}
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
                    TRY WEARS • CUSTOM PRODUCTS SHOWCASE
                  </span>
                  <span className="hidden md:inline text-neutral-600">|</span>
                  <span className="hidden md:inline text-emerald-400 font-bold">
                    AUTO-CHANGING EVERY 2 SECONDS
                  </span>
                </div>

                {/* Auto-Cycle Control & 3D Views */}
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

                  <div className="hidden sm:flex items-center gap-1">
                    <button
                      onClick={() => setViewPreset("iso")}
                      className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${
                        viewPreset === "iso"
                          ? "bg-[#E21D1D] text-white"
                          : "bg-neutral-900 text-neutral-400 hover:text-white"
                      }`}
                    >
                      3D ISO
                    </button>
                    <button
                      onClick={() => setViewPreset("front")}
                      className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-colors cursor-pointer ${
                        viewPreset === "front"
                          ? "bg-[#E21D1D] text-white"
                          : "bg-neutral-900 text-neutral-400 hover:text-white"
                      }`}
                    >
                      FRONT 0°
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN GRID: Left Live 3D Garment Stage | Right Custom Technical Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
              
              {/* LEFT 3D STAGE (7 COLS): Auto-Changing Transparent PNGs Every 2s, Hotspots, Turntable */}
              <div
                className="lg:col-span-7 relative bg-[#070709] border-b lg:border-b-0 lg:border-r border-neutral-800/80 overflow-hidden flex flex-col justify-between p-4 sm:p-6 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleDragMove}
                onMouseUp={handleMouseUp}
              >
                {/* 1. Live 3D Wireframe Canvas in Background */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 pointer-events-none opacity-60 z-0"
                />

                {/* 2. Holographic Coordinate Radar Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
                  <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-dashed border-[#E21D1D]/40 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-[#E21D1D]/20 animate-[spin_40s_linear_infinite_reverse]" />
                  <div className="absolute w-[160px] sm:w-[220px] h-[160px] sm:h-[220px] rounded-full border border-neutral-700/40" />
                </div>

                {/* Top Overlay: Client Brand Badge for Current Product */}
                <div className="relative z-20 flex items-center justify-between gap-2">
                  {/* Wholesaler / Client Brand Highlight Badge */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-2 shadow-lg"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span className="text-white font-bold">{currentProduct.clientBrand}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-emerald-400 font-bold">{currentProduct.orderVolume}</span>
                    </motion.div>
                  </AnimatePresence>

                  {/* 3D Spin and Manual Rotate Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      className={`p-2 rounded-xl backdrop-blur-md border text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isAutoRotating
                          ? "bg-[#E21D1D]/20 border-[#E21D1D] text-[#E21D1D]"
                          : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                      title={isAutoRotating ? "Pause 3D Auto Spin" : "Play 3D Auto Spin"}
                    >
                      {isAutoRotating ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold hidden sm:inline">3D SPIN</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold hidden sm:inline">SPIN 360°</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setManualRotationY((prev) => prev + 45)}
                      className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#E21D1D] transition-colors cursor-pointer"
                      title="Rotate +45°"
                    >
                      <Rotate3d className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. CENTER FLOATING 3D GARMENT VIEWPORT WITH AUTO-CHANGE EVERY 2 SECONDS */}
                <div className="relative z-10 flex-1 flex items-center justify-center min-h-[350px] sm:min-h-[430px] my-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 0.88, rotateY: stageStyle.rotateY - 20 }}
                      animate={{ opacity: 1, scale: stageStyle.scale, rotateY: stageStyle.rotateY }}
                      exit={{ opacity: 0, scale: 0.88, rotateY: stageStyle.rotateY + 20 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Floating Dynamic Shadow underneath garment */}
                      <motion.div
                        animate={{
                          scale: [0.9, 1.05, 0.9],
                          opacity: [0.35, 0.55, 0.35]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -bottom-8 w-48 sm:w-64 h-8 bg-black/80 rounded-full blur-xl pointer-events-none"
                      />

                      {/* 3D Levitating Garment Cutout without background */}
                      <motion.div
                        animate={{ y: [-7, 7, -7] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          transition: isDragging.current ? "none" : "transform 0.1s ease-out"
                        }}
                        className="relative z-10 group"
                      >
                        <img
                          src={currentProduct.image}
                          alt={currentProduct.alt}
                          className="max-h-[300px] sm:max-h-[390px] w-auto object-contain filter drop-shadow-[0_25px_35px_rgba(226,29,29,0.25)] select-none transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                        />

                        {/* Interactive 3D Inspection Hotspots */}
                        {current.hotspots.map((spot, hIdx) => {
                          const isSpotActive = activeHotspot?.title === spot.title;
                          return (
                            <div
                              key={hIdx}
                              style={{
                                left: `${spot.x}%`,
                                top: `${spot.y}%`,
                                transform: "translate(-50%, -50%) translateZ(40px)"
                              }}
                              className="absolute z-30"
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHotspot(isSpotActive ? null : spot);
                                }}
                                className="relative p-1 rounded-full group/btn cursor-pointer"
                              >
                                <span className="absolute inset-0 rounded-full bg-[#E21D1D] animate-ping opacity-75" />
                                <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#E21D1D] text-white text-[10px] font-bold shadow-lg border border-white">
                                  +
                                </span>
                              </button>

                              {/* Hotspot Floating Tooltip */}
                              <AnimatePresence>
                                {isSpotActive && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute left-1/2 -translate-x-1/2 bottom-8 w-48 sm:w-56 bg-neutral-950/95 backdrop-blur-md border border-[#E21D1D] p-3 rounded-xl shadow-2xl text-left z-40"
                                  >
                                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-neutral-800">
                                      <span className="text-[10px] font-mono font-bold text-[#E21D1D] uppercase">
                                        SPEC INSPECTION
                                      </span>
                                      <button
                                        onClick={() => setActiveHotspot(null)}
                                        className="text-neutral-400 hover:text-white"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <h5 className="text-xs font-mono font-black text-white uppercase">
                                      {spot.title}
                                    </h5>
                                    <p className="text-[10px] font-sans text-neutral-300 mt-0.5 leading-tight">
                                      {spot.desc}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ✦ 4 MINI THUMBNAIL SELECTORS (User can view all 4 products & click or watch auto-cycle) */}
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
                            setIsAutoCycling(false); // User clicked manually
                          }}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-center gap-2 ${
                            isSelected
                              ? "bg-neutral-900 border-[#E21D1D] shadow-[0_0_15px_rgba(226,29,29,0.35)] ring-1 ring-[#E21D1D]"
                              : "bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <div className="w-9 h-11 shrink-0 flex items-center justify-center">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                            />
                          </div>
                          <div className="hidden sm:block min-w-0">
                            <span className="text-[8.5px] font-mono font-bold text-[#E21D1D] uppercase block truncate">
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
                      className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 border-l-4 border-l-[#E21D1D] space-y-1.5"
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

                  {/* Prominent Custom Capability Notice (Urdu + English) */}
                  <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] font-sans text-neutral-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-white text-xs uppercase">
                      <Scissors className="w-3 h-3 text-[#E21D1D]" />
                      <span>WHOLESALER BESPOKE ORDER FACILITY</span>
                    </div>
                    <p className="leading-relaxed">
                      {current.urduHighlight}
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
                Aap photo ya sketch dein, hum exact physical sample deliver karein gay.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                LOW 20 PCS MOQ
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
                Naye sports brands aur gym clubs ke liye flexible production batches.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] shrink-0">
              <Rotate3d className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-black text-white uppercase">
                FREE 3D CAD VISUALS
              </h4>
              <p className="text-[11px] font-sans text-neutral-400 mt-0.5">
                Bulk production se pehle 360-degree digital approval preview.
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
