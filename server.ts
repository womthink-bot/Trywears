import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { CATEGORIES_DATA } from "./src/data/categoriesData";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for video and media base64 uploads
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Define config, media, uploads, and videos directories using process.cwd() (safe for both tsx and bundled CJS)
const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "website_config.json");
const CATEGORIES_OVERRIDE_PATH = path.join(process.cwd(), "src", "data", "custom_categories_override.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MEDIA_DIR = path.join(process.cwd(), "public", "media");
const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");
const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

// Ensure directories exist
if (!fs.existsSync(path.dirname(CONFIG_FILE_PATH))) {
  fs.mkdirSync(path.dirname(CONFIG_FILE_PATH), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(VIDEOS_DIR)) {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// Ensure all media section directories exist
const mediaSubfolders = [
  "home-page/hero-section",
  "home-page/categories-section",
  "home-page/catalog-section",
  "home-page/customizer-section",
  "home-page/factory-section",
  "home-page/b2b-calculator-section",
  "home-page/technology-section",
  "home-page/testimonials-section",
  "home-page/branding",
  "videos"
];
mediaSubfolders.forEach((sub) => {
  const fullPath = path.join(MEDIA_DIR, sub);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Fast byte-range partial content video streaming for instant startup
app.get("/videos/:filename", (req, res, next) => {
  const filename = req.params.filename;
  const filePath = path.join(VIDEOS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return next();
  }
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=31536000, immutable"
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable"
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// High-performance static cache options (30 days browser cache + etag)
const staticCacheOptions = {
  maxAge: "30d",
  immutable: true,
  etag: true,
  lastModified: true
};

// Serve public uploads, media, products, images, and videos statically with optimal caching
app.use("/uploads", express.static(UPLOADS_DIR, staticCacheOptions));
app.use("/media", express.static(MEDIA_DIR, staticCacheOptions));
app.use("/products", express.static(PRODUCTS_DIR, staticCacheOptions));
app.use("/images", express.static(PRODUCTS_DIR, staticCacheOptions));
app.use("/images", express.static(path.join(process.cwd(), "public", "images"), staticCacheOptions));
app.use("/videos", express.static(VIDEOS_DIR, staticCacheOptions));
app.use("/videos", express.static(path.join(MEDIA_DIR, "videos"), staticCacheOptions));

// Helper function to scan all media folders dynamically
function scanMediaFolders() {
  const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
  const videoExts = [".mp4", ".webm", ".mov", ".mkv", ".ogg"];
  const result: Record<string, Array<{ name: string; relativePath: string; type: "image" | "video"; size: number; updatedAt: string }>> = {};

  mediaSubfolders.forEach((sub) => {
    const dirPath = path.join(MEDIA_DIR, sub);
    result[sub] = [];
    if (fs.existsSync(dirPath)) {
      try {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
          if (file.startsWith(".")) return;
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            const isImg = imageExts.includes(ext);
            const isVid = videoExts.includes(ext);
            if (isImg || isVid) {
              result[sub].push({
                name: file,
                relativePath: `/media/${sub}/${file}`,
                type: isVid ? "video" : "image",
                size: stat.size,
                updatedAt: stat.mtime.toISOString()
              });
            }
          }
        });
        // Sort alphabetically for consistent ordering
        result[sub].sort((a, b) => a.name.localeCompare(b.name));
      } catch (err) {
        console.warn(`Could not read media folder ${sub}:`, err);
      }
    }
  });

  return result;
}

// Default website configuration (fully white-labeled, elite 2030 branding)
const defaultWebsiteConfig = {
  seo: {
    title: "Try Wears | Elite Handcrafted Combat Gear, Custom Fightwear & Sports Apparel",
    description: "Try Wears specializes in elite handcrafted boxing gloves, custom fight gear, championship shin guards, and ultra-durable performance sportswear designed for athletes and champions."
  },
  global: {
    brandName: "Try Wears",
    tagline: "OEM/ODM COMBAT SPORTS & ATHLETIC APPAREL FACTORY",
    accentColor: "#E21D1D", // Crimson Red Bento Grid Theme
    logo: "/images/trylogo.png",
    phone: "+1 (800) 555-TRYW",
    email: "b2b@trywears.com",
    address: "Factory & Export Division: Sialkot Industrial Zone | Global Sales: HQ-2030 Manhattan, NY",
    socials: {
      instagram: "trywears",
      twitter: "trywears",
      youtube: "trywears"
    }
  },
  hero: {
    slides: [
      {
        id: "slide-1",
        title: "OEM / ODM COMBAT ARMORY & PRO FIGHT GEAR FACTORY",
        subtitle: "DIRECT B2B FACTORY WHOLESALE • LOW MOQ 25 PCS",
        description: "Industrial manufacturing of championship boxing gloves, biomechanical shin guards & headgear for international promotions, gyms, and sports brands. 100% genuine cowhide, IMF multi-layer shock foam, and custom embossed laser-branding.",
        image: "/images/hero_1.jpg",
        buttonText: "CALCULATE B2B WHOLESALE",
        buttonLink: "#b2b-calculator",
        tag: "FACTORY DIRECT • LOW MOQ"
      },
      {
        id: "slide-2",
        title: "CUSTOM SQUAD TRACKSUITS & TEAM CORNER HOODIES",
        subtitle: "OFFICIAL CLUB APPAREL & ATHLETIC UNIFORMS",
        description: "Outfitting elite fight camps, national boxing federations, and collegiate sports academies. Heavyweight 450GSM French terry, custom tapered warmups, high-density 3D Tajima embroidery, and sublimated squad rosters.",
        image: "/images/hero_2.jpg",
        buttonText: "REQUEST TEAM RFQ",
        buttonLink: "#b2b-calculator",
        tag: "TEAM ROSTER PRODUCTION"
      },
      {
        id: "slide-3",
        title: "PRO MMA RASHGUARDS & TOURNAMENT FIGHT SHORTS",
        subtitle: "4-WAY COMPRESSION & HIGH-TENSILE TEARPROOF SATIN",
        description: "Engineered for IBJJF, UFC-grade grappling, and Muay Thai arenas. Zero-fade Italian sublimation inks, 6-thread flatlock stitching, antimicrobial Lycra, and custom silicone grip waistbands.",
        image: "/images/hero_3.jpg",
        buttonText: "EXPLORE OEM APPAREL",
        buttonLink: "#collections",
        tag: "PRIVATE LABEL APPAREL"
      },
      {
        id: "slide-4",
        title: "END-TO-END PRIVATE LABEL & RAPID TECH PACKS",
        subtitle: "FROM SKETCH TO GLOBAL FREIGHT CONTAINER",
        description: "Launch your own combat sports brand with complete factory support: custom woven neck tags, barcoded polybags, hangtags, certified laboratory drop-testing, and express worldwide DHL Air Cargo.",
        image: "/images/b2b_factory.jpg",
        buttonText: "START TECH-PACK SAMPLE",
        buttonLink: "#sample-kit",
        tag: "RAPID 5-DAY SAMPLES"
      }
    ]
  },
  products: [
    {
      id: "prod-1",
      name: "Try Wears Complete Championship Armory Set",
      category: "Elite Packages",
      price: "$550.00",
      rating: 4.9,
      image: "/images/product_collage.jpg",
      description: "Ultimate collection of professional-grade gear and premium apparel, custom tailored for championships.",
      specs: ["Custom tailoring & personalized nameplate", "Includes all essential gear & luggage", "Certificated professional grade"],
      customizable: false,
      inStock: true
    },
    {
      id: "prod-2",
      name: "Try Wears Vanguard Premium Compression Rash Guard",
      category: "Fight Apparel",
      price: "$95.00",
      rating: 4.8,
      image: "/images/product_1.jpg",
      description: "Premium micro-weave body with teal compression sleeves, designed for high-intensity grappling and elite sparring thermal regulation.",
      specs: ["Vanguard compression fiber", "Anti-friction flatlock stitching", "Vibrant sublimation branding"],
      customizable: false,
      inStock: true
    },
    {
      id: "prod-3",
      name: "Try Wears Apex Tech Training Tee",
      category: "Sports Wear",
      price: "$65.00",
      rating: 5.0,
      image: "/images/product_2.jpg",
      description: "Folded performance tee with premium knit pattern, moisture-wicking technology, and elite brush stroke branding.",
      specs: ["Moisture-wicking athletic knit", "Ergonomic shoulder seams", "Breathable core design"],
      customizable: true,
      inStock: true
    },
    {
      id: "prod-4",
      name: "Try Wears Legacy Elite Training Hoodie",
      category: "Sports Wear",
      price: "$135.00",
      rating: 4.9,
      image: "/images/product_3.jpg",
      description: "Premium full-zip hoodie with teal-lined hood interior, engineered for comfortable warmups and sleek tournament style.",
      specs: ["Double-knit thermal fleece", "Dual side secure pockets", "Embroidered signature brush logo"],
      customizable: false,
      inStock: true
    },
    {
      id: "prod-5",
      name: "Try Wears Sovereign Pro Lace-Up Boxing Gloves",
      category: "Combat Gear",
      price: "$185.00",
      rating: 5.0,
      image: "/images/gloves.jpg",
      description: "Hand-stitched championship sparring & competition gloves with carbon-shield metacarpal foam and authentic leather finish.",
      specs: ["High-density IMF shock absorbing core", "Full lace-up orthopedic wrist lock", "Anatomical thumb safety lock"],
      customizable: true,
      inStock: true
    },
    {
      id: "prod-6",
      name: "Try Wears Apex Muay Thai & MMA Team Fight Shorts",
      category: "Fight Apparel",
      price: "$78.00",
      rating: 4.9,
      image: "/images/shorts.jpg",
      description: "Engineered tournament fight trunks featuring ultra-light tearproof microfiber satin, high curved side-slits, and reinforced waistband.",
      specs: ["4-way stretch flex inner crotch panel", "Curved leg slits for unrestricted kicks", "Sublimated club & team crest slots"],
      customizable: true,
      inStock: true
    },
    {
      id: "prod-7",
      name: "Try Wears Corner Crew Pro Warmup Track Jacket",
      category: "Team Apparel",
      price: "$145.00",
      rating: 4.9,
      image: "/images/tracksuit.jpg",
      description: "Official team corner warmup jacket with aerodynamic shoulder paneling, thermal dry-tech knit, and sponsor patch zones.",
      specs: ["Thermal-regulating dry-tech knit", "Full metallic zip with protective chin guard", "Water-resistant zippered coach pockets"],
      customizable: true,
      inStock: true
    },
    {
      id: "prod-8",
      name: "Try Wears Pro Shield Shock Shin Guards",
      category: "Combat Gear",
      price: "$120.00",
      rating: 4.8,
      image: "/images/shin_guards.jpg",
      description: "Ultra-lightweight high-impact shin and instep protectors built with dual injected foam layers and non-slip neoprene lining.",
      specs: ["Pre-curved ergonomic tibia ridge", "Dual industrial hook-and-loop rear straps", "Reinforced instep kick protection"],
      customizable: false,
      inStock: true
    },
    {
      id: "prod-9",
      name: "Try Wears Monarch Silk Walkout Fight Robe",
      category: "Team Apparel",
      price: "$165.00",
      rating: 5.0,
      image: "/images/robe.jpg",
      description: "Ceremonial corner walkout fight robe tailored in heavyweight black satin silk with oversized hood and 24K gold metallic lapel embroidery.",
      specs: ["Heavyweight liquid-drape satin silk", "Wide oversized ceremonial hood & flared sleeves", "Reinforced tied satin sash with sponsor zones"],
      customizable: true,
      inStock: true
    }
  ],
  technology: {
    title: "METALLIC METACARPAL TECH",
    subtitle: "2030 COMBAT INNOVATIONS",
    features: [
      {
        id: "tech-1",
        title: "Carbon-Weave Frame",
        desc: "High-modulus carbon fiber shell distributed along stress points to deflect high-impact kinetic force."
      },
      {
        id: "tech-2",
        title: "Gel Matrix Dispersion",
        desc: "Shock-discharging core that evenly dissipates impact energy, minimizing knuckle fatigue and bone strain."
      },
      {
        id: "tech-3",
        title: "Biomechanical Wrist Lock",
        desc: "Extended triple-cuff structural system aligns the wrist and forearm, completely eliminating striking shifts."
      }
    ]
  },
  testimonials: [
    {
      id: "test-1",
      quote: "Try Wears combat gear feels like an extension of your own hand. The carbon gloves have completely transformed my punch support and speed.",
      author: "Marcus 'Sledge' Thompson",
      role: "WBA Heavyweight Champion",
      avatar: "MT"
    },
    {
      id: "test-2",
      quote: "I've worn every elite brand in my 15-year career. The Aegis Shin Guards are the first ones that never slide during hard grappling-to-kick transitions.",
      author: "Sora Takahashi",
      role: "ONE Championship Lightweight Fighter",
      avatar: "ST"
    }
  ]
};

// GET /api/config: Retrieve current website configuration with automatic folder media synchronization
app.get("/api/config", (req, res) => {
  try {
    let config: any;
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      config = JSON.parse(data);
    } else {
      config = JSON.parse(JSON.stringify(defaultWebsiteConfig));
    }

    // Auto-sync media from the structured folders
    const media = scanMediaFolders();

    // 1. Home Page Hero Section: Strictly 4 Core Category Slides
    const heroMedia = media["home-page/hero-section"] || [];
    const heroImages = heroMedia.filter((m) => m.type === "image");
    const heroVideos = heroMedia.filter((m) => m.type === "video");
    const globalVideos = (media["videos"] || []).filter((m) => m.type === "video");

    // Strictly limit hero slides to the 4 main categories
    if (config.hero && config.hero.slides) {
      config.hero.slides = config.hero.slides.slice(0, 4);
      // Map folder images to the 4 slides if available
      heroImages.slice(0, 4).forEach((img, idx) => {
        if (config.hero.slides[idx]) {
          config.hero.slides[idx].image = img.relativePath;
        }
      });
    }

    // If hero or global video exists, auto set active video
    if (globalVideos.length > 0) {
      config.hero.active3DVideoUrl = "/videos/sportswearsBG.mp4";
    } else if (heroVideos.length > 0) {
      config.hero.active3DVideoUrl = heroVideos[0].relativePath;
    } else {
      config.hero.active3DVideoUrl = "/videos/sportswearsBG.mp4";
    }

    // 2. Catalog Section: Auto-sync product card images
    const catalogImages = media["home-page/catalog-section"] || [];
    if (catalogImages.length > 0 && config.products) {
      config.products.forEach((prod: any, idx: number) => {
        if (catalogImages[idx]) {
          prod.image = catalogImages[idx].relativePath;
        }
      });
    }

    // 3. Branding Section: Auto-sync brand logo
    const brandingFiles = media["home-page/branding"] || [];
    const logoFile = brandingFiles.find((f) => f.name.includes("trylogo") || f.name.includes("logo"));
    if (logoFile && config.global) {
      config.global.logo = logoFile.relativePath;
    }

    return res.json(config);
  } catch (error) {
    console.error("Error reading website configuration:", error);
    return res.status(500).json({ error: "Failed to read configuration." });
  }
});

// POST /api/config: Save new website configuration
app.post("/api/config", (req, res) => {
  try {
    const newConfig = req.body;
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(newConfig, null, 2), "utf-8");
    return res.json({ success: true, message: "Configuration saved successfully." });
  } catch (error) {
    console.error("Error writing website configuration:", error);
    return res.status(500).json({ error: "Failed to save configuration." });
  }
});

// Helper function to scan a directory recursively for images & media
function scanDirRecursive(dirPath: string, urlPrefix: string): Record<string, string[]> {
  const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".mp4", ".webm"];
  const result: Record<string, string[]> = {};

  if (!fs.existsSync(dirPath)) return result;

  function walk(currentDir: string, relativePath: string) {
    try {
      const items = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const item of items) {
        if (item.name.startsWith(".") || item.name === "node_modules") continue;
        const fullPath = path.join(currentDir, item.name);
        const rel = relativePath ? `${relativePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
          walk(fullPath, rel);
        } else if (item.isFile()) {
          const ext = path.extname(item.name).toLowerCase();
          if (imageExts.includes(ext)) {
            const folderKey = relativePath || "root";
            if (!result[folderKey]) result[folderKey] = [];
            result[folderKey].push(`${urlPrefix}/${rel}`);
          }
        }
      }
    } catch (e) {
      console.warn("Error scanning directory:", dirPath, e);
    }
  }

  walk(dirPath, "");
  return result;
}

// GET /api/folders/scan: Recursively scan media and products folders for instant auto-display
app.get("/api/folders/scan", (req, res) => {
  try {
    const mediaTree = scanDirRecursive(MEDIA_DIR, "/media");
    const productsTree = scanDirRecursive(PRODUCTS_DIR, "/products");
    return res.json({
      success: true,
      media: mediaTree,
      products: productsTree,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error scanning dynamic folders:", error);
    return res.status(500).json({ error: "Failed to scan folders." });
  }
});

// GET /api/categories: Get current categories with any custom uploaded overrides
app.get("/api/categories", (req, res) => {
  try {
    if (fs.existsSync(CATEGORIES_OVERRIDE_PATH)) {
      const data = fs.readFileSync(CATEGORIES_OVERRIDE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      return res.json({ success: true, customOverride: true, categories: parsed });
    }
    return res.json({ success: true, customOverride: false, categories: null });
  } catch (error) {
    console.error("Error loading categories override:", error);
    return res.status(500).json({ error: "Failed to load categories override." });
  }
});

// Helper to determine category, sub-category, and metadata from uploaded file path
function parseUploadedProductInfo(relativePath: string, explicitCategory?: string) {
  const parts = relativePath.split(/[/\\]/).filter(Boolean);
  const fileName = parts.pop() || "product.png";
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  const cleanProductName = nameWithoutExt
    .replace(/^[0-9]+_/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  let targetCat = explicitCategory && explicitCategory !== "auto" && explicitCategory !== "all" ? explicitCategory : "";
  let subCategoryTitle = "Core Collection";
  let subCategoryId = "core-collection";

  // Check path segments for Category mapping if not explicitly forced
  if (!targetCat && parts.length > 0) {
    const rootName = parts[0].toLowerCase();
    if (rootName.includes("sport") || rootName.includes("jersey") || rootName.includes("football") || rootName.includes("soccer") || rootName.includes("basketball") || rootName.includes("rugby")) {
      targetCat = "sports-wears";
    } else if (rootName.includes("gym") || rootName.includes("fitness") || rootName.includes("active") || rootName.includes("legging") || rootName.includes("bra") || rootName.includes("compression") || rootName.includes("rashguard") || rootName.includes("tank")) {
      targetCat = "gym-fitness";
    } else if (rootName.includes("street") || rootName.includes("hoodie") || rootName.includes("fleece") || rootName.includes("jogger") || rootName.includes("pant") || rootName.includes("tee") || rootName.includes("oversized")) {
      targetCat = "street-wears";
    } else if (rootName.includes("leather") || rootName.includes("jacket") || rootName.includes("moto") || rootName.includes("combat") || rootName.includes("boxing") || rootName.includes("glove") || rootName.includes("biker")) {
      targetCat = "leather-jackets";
    }
  }

  if (!targetCat) {
    targetCat = "sports-wears";
  }

  // Determine SubCategory from folders
  if (parts.length >= 2) {
    const firstPart = parts[0].toLowerCase();
    if (firstPart === targetCat || firstPart.includes("gym") || firstPart.includes("sport") || firstPart.includes("street") || firstPart.includes("leather")) {
      subCategoryTitle = parts[1].replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      subCategoryId = parts[1].toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    } else {
      subCategoryTitle = parts[0].replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      subCategoryId = parts[0].toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    }
  } else if (parts.length === 1) {
    const singleFolder = parts[0].toLowerCase();
    if (singleFolder !== targetCat && singleFolder !== "products" && singleFolder !== "product") {
      subCategoryTitle = parts[0].replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      subCategoryId = parts[0].toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    } else {
      subCategoryTitle = "Bespoke Collection";
      subCategoryId = "bespoke-collection";
    }
  } else {
    subCategoryTitle = "Custom Line";
    subCategoryId = "custom-line";
  }

  // Category specific specs
  let gsm = "180-GSM";
  let fabric = "High-Tensile Micro-Interlock Poly";
  let accentColor = "#E21D1D";

  if (targetCat === "sports-wears") {
    gsm = "190-GSM";
    fabric = "Micro-Interlock Dry-Fit Poly";
    accentColor = "#E21D1D";
  } else if (targetCat === "gym-fitness") {
    gsm = "320-GSM";
    fabric = "4-Way Power Stretch Nylon-Spandex";
    accentColor = "#3B82F6";
  } else if (targetCat === "street-wears") {
    gsm = "500-GSM";
    fabric = "Heavyweight 100% Combed French Terry Cotton";
    accentColor = "#F59E0B";
  } else if (targetCat === "leather-jackets") {
    gsm = "1.2MM";
    fabric = "100% Drum-Dyed Full-Grain Cowhide Leather";
    accentColor = "#10B981";
  }

  return {
    targetCat,
    subCategoryTitle,
    subCategoryId,
    cleanProductName,
    fileName,
    gsm,
    fabric,
    accentColor
  };
}

// In-memory active upload batches map
const activeUploadBatches: Record<string, {
  batchId: string;
  replaceDummy: boolean;
  targetCategory: string;
  categoriesState: any[];
  uploadedCount: number;
  uploadedProducts: any[];
  createdAt: number;
}> = {};

// Clean up stale batches older than 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const id of Object.keys(activeUploadBatches)) {
    if (now - activeUploadBatches[id].createdAt > 30 * 60 * 1000) {
      delete activeUploadBatches[id];
    }
  }
}, 5 * 60 * 1000);

// POST /api/developer/batch-start: Initialize a new lightweight file-by-file upload batch session
app.post("/api/developer/batch-start", (req, res) => {
  try {
    const { replaceDummy, targetCategory } = req.body;
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    let categoriesState: any[] = [];
    if (fs.existsSync(CATEGORIES_OVERRIDE_PATH)) {
      try {
        const raw = fs.readFileSync(CATEGORIES_OVERRIDE_PATH, "utf-8");
        categoriesState = JSON.parse(raw);
      } catch (e) {
        categoriesState = JSON.parse(JSON.stringify(CATEGORIES_DATA));
      }
    } else {
      categoriesState = JSON.parse(JSON.stringify(CATEGORIES_DATA));
    }

    if (!Array.isArray(categoriesState) || categoriesState.length === 0) {
      categoriesState = JSON.parse(JSON.stringify(CATEGORIES_DATA));
    }

    // If replaceDummy is true, clear previous dummy products for target category or all
    if (replaceDummy) {
      if (targetCategory && targetCategory !== "all" && targetCategory !== "auto") {
        const catObj = categoriesState.find((c: any) => c.id === targetCategory);
        if (catObj) {
          catObj.products = [];
          catObj.subCategories = [];
        }
      } else {
        categoriesState.forEach((c: any) => {
          c.products = [];
          c.subCategories = [];
        });
      }
    }

    activeUploadBatches[batchId] = {
      batchId,
      replaceDummy: Boolean(replaceDummy),
      targetCategory: targetCategory || "auto",
      categoriesState,
      uploadedCount: 0,
      uploadedProducts: [],
      createdAt: Date.now()
    };

    console.log(`[Batch-Start] Initialized batch ${batchId} for category: "${targetCategory}", replaceDummy: ${replaceDummy}`);
    return res.json({ success: true, batchId, message: "Upload session initialized." });
  } catch (error: any) {
    console.error("Error starting batch upload:", error);
    return res.status(500).json({ error: error.message || "Failed to initialize upload session." });
  }
});

// POST /api/developer/upload-single-file: Stream a single image file to avoid browser tab memory exhaustion
app.post("/api/developer/upload-single-file", (req, res) => {
  try {
    const { batchId, relativePath, fileName: rawName, fileData, targetCategory: clientCat } = req.body;

    if (!batchId || !activeUploadBatches[batchId]) {
      return res.status(400).json({ error: "Invalid or expired upload batch session." });
    }
    if (!fileData || !relativePath) {
      return res.status(400).json({ error: "fileData and relativePath are required." });
    }

    const batch = activeUploadBatches[batchId];
    const targetCategory = clientCat && clientCat !== "auto" ? clientCat : batch.targetCategory;

    const parsed = parseUploadedProductInfo(relativePath, targetCategory !== "all" && targetCategory !== "auto" ? targetCategory : undefined);
    const cleanFileName = (rawName || parsed.fileName).replace(/[^a-zA-Z0-9.\-_]/g, "_");

    // Target storage directory: public/products/<targetCat>/<subCategoryId>
    const targetDir = path.join(PRODUCTS_DIR, parsed.targetCat, parsed.subCategoryId);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Decode Base64 and write single file immediately to disk
    const matches = fileData.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 format." });
    }

    const fileBuffer = Buffer.from(matches[2], "base64");
    const fullSavePath = path.join(targetDir, cleanFileName);
    fs.writeFileSync(fullSavePath, fileBuffer);

    batch.uploadedCount++;
    const webUrl = `/products/${parsed.targetCat}/${parsed.subCategoryId}/${cleanFileName}`;

    // Find or create category in batch.categoriesState
    let catObj = batch.categoriesState.find((c: any) => c.id === parsed.targetCat);
    if (!catObj) {
      catObj = {
        id: parsed.targetCat,
        code: "0" + (batch.categoriesState.length + 1),
        name: parsed.targetCat.replace(/-/g, " ").toUpperCase(),
        tagline: "CUSTOM UPLOADED FACTORY DIVISION",
        badge: "OEM FACTORY ACTIVE",
        themeColor: parsed.accentColor,
        heroImage: webUrl,
        heroImageAlt: parsed.cleanProductName,
        bgImage: "/images/backgrounds/sports_bg.jpg",
        bgAlt: "Background",
        description: "Custom uploaded production collection.",
        stats: [
          { label: "100% FACTORY", value: "DIRECT" },
          { label: "LOW MOQ 25", value: "PER STYLE" },
          { label: "7-DAY SAMPLE", value: "EXPRESS" }
        ],
        highlights: ["Custom Pantone Dyelot", "Laser Cut Seaming", "Private Label Trims"],
        alignImageLeft: true,
        subCategories: [],
        products: []
      };
      batch.categoriesState.push(catObj);
    }

    // Add subCategory if not exists
    if (!catObj.subCategories) catObj.subCategories = [];
    let subObj = catObj.subCategories.find((s: any) => s.id === parsed.subCategoryId);
    if (!subObj) {
      subObj = {
        id: parsed.subCategoryId,
        name: parsed.subCategoryTitle,
        tagline: `Bespoke ${parsed.subCategoryTitle} Collection`
      };
      catObj.subCategories.push(subObj);
    }

    // Add Product object
    if (!catObj.products) catObj.products = [];
    const newProduct = {
      id: `custom-prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      sampleNum: catObj.products.length + 1,
      name: parsed.cleanProductName,
      subtitle: `${parsed.subCategoryTitle} Production Model`,
      image: webUrl,
      badge: "FACTORY OEM PRODUCTION",
      subCategory: parsed.subCategoryTitle,
      subCategoryId: parsed.subCategoryId,
      gsm: parsed.gsm,
      fabric: parsed.fabric,
      accentColor: parsed.accentColor,
      moq: "25 PCS",
      colorways: [
        { name: "Obsidian Black", hex: "#111111" },
        { name: "Crimson Red", hex: "#E21D1D" },
        { name: "Pure White", hex: "#FFFFFF" }
      ],
      specs: [
        `${parsed.gsm} ${parsed.fabric}`,
        "Precision Cut & Sew Construction",
        "Custom Private Label Neck & Wash Tags",
        "Individual Frosted Matte Ziplock Packaging"
      ]
    };

    catObj.products.push(newProduct);
    batch.uploadedProducts.push(newProduct);

    return res.json({
      success: true,
      fileName: cleanFileName,
      productName: parsed.cleanProductName,
      category: parsed.targetCat,
      subCategory: parsed.subCategoryTitle,
      uploadedCount: batch.uploadedCount
    });
  } catch (error) {
    console.error("Error uploading single file:", error);
    return res.status(500).json({ error: "Failed to upload file." });
  }
});

// POST /api/developer/batch-finalize: Save the whole processed categories override and finalize
app.post("/api/developer/batch-finalize", (req, res) => {
  try {
    const { batchId } = req.body;
    if (!batchId || !activeUploadBatches[batchId]) {
      return res.status(400).json({ error: "Invalid or expired upload batch session." });
    }

    const batch = activeUploadBatches[batchId];

    // Persist final categories state to disk
    fs.writeFileSync(CATEGORIES_OVERRIDE_PATH, JSON.stringify(batch.categoriesState, null, 2), "utf-8");

    const responseData = {
      success: true,
      message: `Successfully uploaded and categorized ${batch.uploadedCount} products.`,
      uploadedCount: batch.uploadedCount,
      categories: batch.categoriesState
    };

    // Cleanup session
    delete activeUploadBatches[batchId];

    return res.json(responseData);
  } catch (error) {
    console.error("Error finalizing batch:", error);
    return res.status(500).json({ error: "Failed to finalize batch upload." });
  }
});

// POST /api/developer/upload-folder: Bulk upload folder tree with auto-categorization & dummy deletion
app.post("/api/developer/upload-folder", (req, res) => {
  try {
    const { files, replaceDummy, targetCategory, baseCategories } = req.body;

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "No files provided in folder upload." });
    }

    let categoriesState: any[] = [];

    // Load existing override or take base categories passed from client
    if (fs.existsSync(CATEGORIES_OVERRIDE_PATH)) {
      try {
        categoriesState = JSON.parse(fs.readFileSync(CATEGORIES_OVERRIDE_PATH, "utf-8"));
      } catch (e) {
        categoriesState = baseCategories || [];
      }
    } else {
      categoriesState = baseCategories || [];
    }

    // If replaceDummy is true for the target category, clear dummy products in those categories
    if (replaceDummy) {
      if (targetCategory && targetCategory !== "all") {
        const catObj = categoriesState.find((c: any) => c.id === targetCategory);
        if (catObj) {
          catObj.products = [];
          catObj.subCategories = [];
        }
      } else {
        categoriesState.forEach((c: any) => {
          c.products = [];
          c.subCategories = [];
        });
      }
    }

    let uploadedCount = 0;

    files.forEach((fileItem: any) => {
      const { relativePath, fileData, fileName: rawName } = fileItem;
      if (!fileData || !relativePath) return;

      const parsed = parseUploadedProductInfo(relativePath, targetCategory !== "all" ? targetCategory : undefined);
      const cleanFileName = (rawName || parsed.fileName).replace(/[^a-zA-Z0-9.\-_]/g, "_");

      // Target storage directory on disk: public/products/<targetCat>/<subCategoryId>
      const targetDir = path.join(PRODUCTS_DIR, parsed.targetCat, parsed.subCategoryId);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Decode Base64 and write file
      const matches = fileData.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const fileBuffer = Buffer.from(matches[2], "base64");
        const fullSavePath = path.join(targetDir, cleanFileName);
        fs.writeFileSync(fullSavePath, fileBuffer);
        uploadedCount++;

        const webUrl = `/products/${parsed.targetCat}/${parsed.subCategoryId}/${cleanFileName}`;

        // Find or create category in categoriesState
        let catObj = categoriesState.find((c: any) => c.id === parsed.targetCat);
        if (!catObj) {
          catObj = {
            id: parsed.targetCat,
            code: "0" + (categoriesState.length + 1),
            name: parsed.targetCat.replace(/-/g, " ").toUpperCase(),
            tagline: "CUSTOM UPLOADED FACTORY DIVISION",
            badge: "OEM FACTORY ACTIVE",
            themeColor: parsed.accentColor,
            heroImage: webUrl,
            heroImageAlt: parsed.cleanProductName,
            bgImage: "/images/backgrounds/sports_bg.jpg",
            bgAlt: "Background",
            description: "Custom uploaded production collection.",
            stats: [
              { label: "100% FACTORY", value: "DIRECT" },
              { label: "LOW MOQ 25", value: "PER STYLE" },
              { label: "7-DAY SAMPLE", value: "EXPRESS" }
            ],
            highlights: ["Custom Pantone Dyelot", "Laser Cut Seaming", "Private Label Trims"],
            alignImageLeft: true,
            subCategories: [],
            products: []
          };
          categoriesState.push(catObj);
        }

        // Add subCategory if not exists
        if (!catObj.subCategories) catObj.subCategories = [];
        let subObj = catObj.subCategories.find((s: any) => s.id === parsed.subCategoryId);
        if (!subObj) {
          subObj = {
            id: parsed.subCategoryId,
            name: parsed.subCategoryTitle,
            tagline: `Bespoke ${parsed.subCategoryTitle} Collection`
          };
          catObj.subCategories.push(subObj);
        }

        // Add Product object
        if (!catObj.products) catObj.products = [];
        const newProduct = {
          id: `custom-prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          sampleNum: catObj.products.length + 1,
          name: parsed.cleanProductName,
          subtitle: `${parsed.subCategoryTitle} Production Model`,
          image: webUrl,
          badge: "FACTORY OEM PRODUCTION",
          subCategory: parsed.subCategoryTitle,
          subCategoryId: parsed.subCategoryId,
          gsm: parsed.gsm,
          fabric: parsed.fabric,
          accentColor: parsed.accentColor,
          moq: "25 PCS",
          colorways: [
            { name: "Obsidian Black", hex: "#111111" },
            { name: "Crimson Red", hex: "#E21D1D" },
            { name: "Pure White", hex: "#FFFFFF" }
          ],
          specs: [
            `${parsed.gsm} ${parsed.fabric}`,
            "Precision Cut & Sew Construction",
            "Custom Private Label Neck & Wash Tags",
            "Individual Frosted Matte Ziplock Packaging"
          ]
        };

        catObj.products.push(newProduct);
      }
    });

    // Save override to disk
    fs.writeFileSync(CATEGORIES_OVERRIDE_PATH, JSON.stringify(categoriesState, null, 2), "utf-8");

    return res.json({
      success: true,
      message: `Successfully processed ${uploadedCount} product assets.`,
      uploadedCount,
      categories: categoriesState
    });
  } catch (error) {
    console.error("Error processing developer folder upload:", error);
    return res.status(500).json({ error: "Failed to process folder upload." });
  }
});

// POST /api/developer/reset-categories: Clear all custom overrides and restore default factory catalog
app.post("/api/developer/reset-categories", (req, res) => {
  try {
    if (fs.existsSync(CATEGORIES_OVERRIDE_PATH)) {
      fs.unlinkSync(CATEGORIES_OVERRIDE_PATH);
    }
    return res.json({ success: true, message: "Categories restored to factory default." });
  } catch (error) {
    console.error("Error resetting categories:", error);
    return res.status(500).json({ error: "Failed to reset categories." });
  }
});

// GET /api/products/dynamic: Get all product category image lists dynamically
app.get("/api/products/dynamic", (req, res) => {
  try {
    const productsTree = scanDirRecursive(PRODUCTS_DIR, "/products");
    return res.json({
      success: true,
      categories: productsTree
    });
  } catch (error) {
    console.error("Error getting dynamic products:", error);
    return res.status(500).json({ error: "Failed to get dynamic products." });
  }
});

// GET /api/media: Get complete organized folders and files manifest
app.get("/api/media", (req, res) => {
  try {
    const folders = scanMediaFolders();
    return res.json({ success: true, baseDir: "/media", folders });
  } catch (error) {
    console.error("Error scanning media:", error);
    return res.status(500).json({ error: "Failed to scan media directory." });
  }
});

// POST /api/media/upload: Upload image or video directly to any specific section folder
app.post("/api/media/upload", (req, res) => {
  try {
    const { folder, fileName, fileData, oldFileName } = req.body;

    if (!folder || !fileName || !fileData) {
      return res.status(400).json({ error: "folder, fileName, and fileData are required." });
    }

    // Sanitize folder path to prevent path traversal
    const safeFolder = folder.replace(/\.\./g, "").replace(/^\/+/, "");
    const targetFolderDir = path.join(MEDIA_DIR, safeFolder);

    if (!fs.existsSync(targetFolderDir)) {
      fs.mkdirSync(targetFolderDir, { recursive: true });
    }

    // Extract raw base64 data
    const matches = fileData.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 format." });
    }

    const fileBuffer = Buffer.from(matches[2], "base64");
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const targetPath = path.join(targetFolderDir, cleanFileName);

    // Save the file in the designated section folder
    fs.writeFileSync(targetPath, fileBuffer);

    // If replacing an old file in the same folder
    if (oldFileName && oldFileName !== cleanFileName) {
      const cleanOld = path.basename(oldFileName);
      const oldPath = path.join(targetFolderDir, cleanOld);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const fileUrl = `/media/${safeFolder}/${cleanFileName}`;
    console.log(`Media saved successfully to: ${fileUrl}`);

    return res.json({
      success: true,
      url: fileUrl,
      fileName: cleanFileName,
      folder: safeFolder
    });
  } catch (error) {
    console.error("Error uploading to media folder:", error);
    return res.status(500).json({ error: "Failed to upload media file." });
  }
});

// DELETE /api/media: Delete a file from any section folder
app.delete("/api/media", (req, res) => {
  try {
    const { folder, fileName } = req.body;
    if (!folder || !fileName) {
      return res.status(400).json({ error: "folder and fileName are required." });
    }

    const safeFolder = folder.replace(/\.\./g, "").replace(/^\/+/, "");
    const cleanFileName = path.basename(fileName);
    const targetPath = path.join(MEDIA_DIR, safeFolder, cleanFileName);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return res.json({ success: true, message: "File deleted successfully." });
    } else {
      return res.status(404).json({ error: "File not found." });
    }
  } catch (error) {
    console.error("Error deleting media file:", error);
    return res.status(500).json({ error: "Failed to delete media file." });
  }
});

// POST /api/upload: Upload file (as base64) and safely delete old file if replaced
app.post("/api/upload", (req, res) => {
  try {
    const { fileName, fileData, oldFileName } = req.body;

    if (!fileName || !fileData) {
      return res.status(400).json({ error: "fileName and fileData are required." });
    }

    // Extract raw base64 data and mime type (supports video/mp4, video/webm, image/jpeg, etc.)
    const matches = fileData.match(/^data:([A-Za-z0-9\-+\/.]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 format." });
    }

    const fileBuffer = Buffer.from(matches[2], "base64");
    const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
    const targetPath = path.join(UPLOADS_DIR, safeName);

    // Save the new file
    fs.writeFileSync(targetPath, fileBuffer);

    // URL to return to the client
    const fileUrl = `/uploads/${safeName}`;

    // Securely delete the old image file if it is in the uploads directory to prevent redundant storage
    if (oldFileName) {
      // Parse out the filename if it is a full path or URL
      const cleanOldName = path.basename(oldFileName);
      const oldFilePath = path.join(UPLOADS_DIR, cleanOldName);

      if (fs.existsSync(oldFilePath) && oldFilePath !== targetPath) {
        fs.unlinkSync(oldFilePath);
        console.log(`Deleted redundant old file: ${oldFilePath}`);
      }
    }

    return res.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Failed to process file upload." });
  }
});

// POST /api/copywriter: Generate elite copywriting using Gemini 3.5 Flash
app.post("/api/copywriter", async (req, res) => {
  try {
    const { prompt, section, currentText } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(400).json({
        error: "Gemini API key is not configured yet. Please configure it in the Settings secrets tab.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemInstruction = `
      You are an elite, global-tier athletic copywriter for Try Wears, a high-status combat sports luxury brand.
      You design 2030-era, futuristic, hyper-compelling, cinematic, and powerful headlines and product copies.
      Keep it high-performance, aggressive yet sophisticated, using luxury sports terminology.
      Write ONLY the rewritten copy itself. Do not include markdown codeblocks, quotes, intro, or explanations. Keep it punchy and short.
    `;

    const fullPrompt = `
      Create a copywriting improvement.
      Section Context: ${section || "general website copywriting"}
      Current Text as base: "${currentText || ""}"
      Creative Guideline / Instruction: "${prompt}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const resultText = response.text?.trim() || "";
    return res.json({ text: resultText });
  } catch (error: any) {
    console.error("Gemini copywriter error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI copywriting." });
  }
});

// Set up Vite or production static file server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
