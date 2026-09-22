import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for video and media base64 uploads
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Define config and uploads directories using process.cwd() (safe for both tsx and bundled CJS)
const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "website_config.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MEDIA_DIR = path.join(process.cwd(), "public", "media");

// Ensure directories exist
if (!fs.existsSync(path.dirname(CONFIG_FILE_PATH))) {
  fs.mkdirSync(path.dirname(CONFIG_FILE_PATH), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
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

// Serve public uploads and media directories statically
app.use("/uploads", express.static(UPLOADS_DIR));
app.use("/media", express.static(MEDIA_DIR));
// Serve public/images statically so they are always guaranteed to load regardless of production build
app.use("/images", express.static(path.join(process.cwd(), "public", "images")));
// Also serve src/assets/images statically so our generated images load flawlessly
app.use("/src/assets/images", express.static(path.join(process.cwd(), "src", "assets", "images")));

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

    // 1. Home Page Hero Section: Auto-sync slides & video
    const heroMedia = media["home-page/hero-section"] || [];
    const heroImages = heroMedia.filter((m) => m.type === "image");
    const heroVideos = heroMedia.filter((m) => m.type === "video");
    const globalVideos = (media["videos"] || []).filter((m) => m.type === "video");

    // If hero section has image files, ensure they are in slides
    if (heroImages.length > 0 && config.hero && config.hero.slides) {
      const updatedSlides = heroImages.map((img, idx) => {
        const existing = config.hero.slides[idx] || {};
        return {
          id: existing.id || `slide-${idx + 1}`,
          category: existing.category || "COMBAT SPORTS APPAREL",
          title: existing.title || `TRY WEARS COLLECTION 0${idx + 1}`,
          subtitle: existing.subtitle || "OEM / ODM HIGH-PERFORMANCE PRODUCTION",
          description: existing.description || "Handcrafted combat apparel, championship gloves, and custom athletic uniforms.",
          image: img.relativePath,
          buttonText: existing.buttonText || "EXPLORE COLLECTION",
          buttonLink: existing.buttonLink || "#b2b-calculator",
          tag: existing.tag || "PREMIUM PRODUCTION",
          slots3D: existing.slots3D || []
        };
      });
      config.hero.slides = updatedSlides;
    }

    // If hero or global video exists, auto set active video
    if (heroVideos.length > 0) {
      config.hero.active3DVideoUrl = heroVideos[0].relativePath;
    } else if (globalVideos.length > 0 && !config.hero.active3DVideoUrl) {
      config.hero.active3DVideoUrl = globalVideos[0].relativePath;
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
