import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Volume2,
  VolumeX,
  Plus,
  ArrowUpRight,
  Check,
  Shield,
  Activity,
  Award,
  Image,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WebsiteConfig, CartItem, Product } from "./types";
import { ThemeToggle } from "./components/ThemeToggle";
import { TShirtCustomizer } from "./components/TShirtCustomizer";
import { CartDrawer } from "./components/CartDrawer";
import { SecurityAlerts } from "./components/SecurityAlerts";
import { SportsHeroSlider } from "./components/SportsHeroSlider";
import { SportsB2BMarquee } from "./components/SportsB2BMarquee";
import { SportsMotionFX } from "./components/SportsMotionFX";
import { B2BWholesaleCalculator } from "./components/B2BWholesaleCalculator";
import { B2BFactoryCapabilities } from "./components/B2BFactoryCapabilities";
import { MediaManagerModal } from "./components/MediaManagerModal";
import fallbackConfig from "./data/website_config.json";

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [mediaManagerFolder, setMediaManagerFolder] = useState("home-page/hero-section");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  
  // Customizer default product state
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);

  // Audio track ambient loop simulation
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  // Notification Banner
  const [bannerText, setBannerText] = useState("FREE METROPOLITAN EXPRESS AIR DISPATCH ON ALL SIGNATURE ORDERS OVER $150");

  // Contact Form Submission State
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactName, setContactName] = useState("");

  // Load configuration from Express Backend API
  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/config");
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        // Find default customizable product for glove customizer
        const customProduct = data.products.find((p: any) => p.customizable) || data.products[0];
        setCustomizerProduct(customProduct);
      } else {
        throw new Error("Config endpoint returned non-OK status");
      }
    } catch (err) {
      console.warn("Failed to fetch website config from backend, using local fallback config:", err);
      // Immediately load the local fallback so the user is never stuck on loading screen!
      setConfig(fallbackConfig as any);
      const customProduct = (fallbackConfig.products as any).find((p: any) => p.customizable) || fallbackConfig.products[0];
      setCustomizerProduct(customProduct as any);
    }
  };

  useEffect(() => {
    fetchConfig();

    // Check if ?admin=true or ?media=true is in URL
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true" || params.get("media") === "true") {
        setIsMediaManagerOpen(true);
      }
    } catch (e) {
      // Non-blocking
    }

    // Background admin shortcut: Ctrl+Shift+A / Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsMediaManagerOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync theme to root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#050505";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#ffffff";
    }
  }, [theme]);

  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>("ALL");

  // Update HTML `<title>` and `<meta>` tags dynamically to support 100% white-labeled SEO
  useEffect(() => {
    if (config) {
      document.title = config.seo.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", config.seo.description);
    }
  }, [config]);

  // Slideshow interval timer
  useEffect(() => {
    if (!isSlidePlaying || !config) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % config.hero.slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isSlidePlaying, config]);

  // Theme Toggler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Add Item to Shipment Cart
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      // If it's a non-customized product, stack quantity
      if (!item.customization) {
        const existingIdx = prev.findIndex(
          (c) => c.product.id === item.product.id && c.selectedSize === item.selectedSize
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += item.quantity;
          return updated;
        }
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  // Cart actions
  const handleUpdateCartQuantity = (index: number, qty: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = qty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Form submission handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName) return;
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactName("");
      }, 5000);
    }, 1500);
  };

  if (!config) {
    return (
      <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center text-center p-6 select-none">
        <div className="w-10 h-10 border-2 border-neutral-800 border-t-amber-500 rounded-full animate-spin mb-4" />
        <h4 className="font-display font-black text-xs text-white uppercase tracking-widest">
          TRY WEARS LOGISTICS INTERFACE BOOTING...
        </h4>
        <p className="text-[9px] font-mono text-neutral-500 mt-1 uppercase">
          Compiling luxury assets & server specifications
        </p>
      </div>
    );
  }

  // Define global accent style object
  const accentColor = config.global.accentColor || "#D4AF37";

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 selection:bg-[#E21D1D] selection:text-white relative">
      {/* Dynamic Mouse Motion Glow & Top Scroll Progress Bar */}
      <SportsMotionFX />

      {/* Security Protection Layer (Global Right Click and ShortCuts blocker) */}
      <SecurityAlerts />

      {/* SECURE WHITE-LABEL SEO HEADER INFORMATION (Hidden from visual stream but readable by bots) */}
      <div className="sr-only select-none pointer-events-none">
        <h1>{config.seo.title}</h1>
        <h2>{config.seo.description}</h2>
        <p>White-labeled, handcrafted combat sportwear and championship gear. Zero third party frameworks.</p>
      </div>

      {/* 1. TOP NOTIFICATION RUNNER */}
      <div className="bg-neutral-950 text-white py-2 px-4 border-b border-neutral-900 overflow-hidden relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto text-[9px] font-mono tracking-widest font-black uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
            <span
              data-editable-path="bannerText"
              data-editable-label="Top Announcement Banner Text"
            >
              ★ FACTORY DIRECT B2B COMBAT WEAR & FIGHT GEAR • LOW MOQ 25 PCS • EXPRESS WORLDWIDE AIR DISPATCH
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#b2b-calculator" className="hover:text-[#E21D1D] transition-colors text-emerald-400 font-bold">INSTANT B2B RFQ</a>
            <span>•</span>
            <a href="#factory-capabilities" className="hover:text-[#E21D1D] transition-colors">SIALKOT & NY HUBS</a>
            <span>•</span>
            <span className="text-[#E21D1D] font-bold">ISO 9001 CERTIFIED</span>
          </div>
        </div>
      </div>

      {/* 2. PREMIUM NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-900/80 transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Branded Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center shrink-0">
              <img 
                src={config.global.logo || "/images/trylogo.png"} 
                alt="Try Wears Logo" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div>
              <span
                data-editable-path="global.brandName"
                data-editable-label="Header Brand Name"
                className="font-display font-black text-base sm:text-lg tracking-widest dark:text-white block uppercase leading-none"
              >
                {config.global.brandName}
              </span>
              <span
                data-editable-path="global.tagline"
                data-editable-label="Header Brand Tagline"
                className="text-[9px] font-mono font-bold tracking-widest text-[#E21D1D] block uppercase mt-1.5"
              >
                {config.global.tagline}
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-mono font-bold uppercase tracking-widest">
            <a href="#collections" className="hover:text-[#E21D1D] dark:hover:text-[#E21D1D] transition-colors">Collections</a>
            <a href="#b2b-calculator" className="text-[#E21D1D] hover:underline transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping" />
              B2B Wholesale RFQ
            </a>
            <a href="#factory-capabilities" className="hover:text-[#E21D1D] dark:hover:text-[#E21D1D] transition-colors">Factory & OEM</a>
            <a href="#customizer" className="hover:text-[#E21D1D] dark:hover:text-[#E21D1D] transition-colors">Bespoke 3D Lab</a>
            <a href="#technology" className="hover:text-[#E21D1D] dark:hover:text-[#E21D1D] transition-colors">Tech Specs</a>
            <a href="#collaborations" className="hover:text-[#E21D1D] dark:hover:text-[#E21D1D] transition-colors">Enlist</a>
          </nav>

          {/* Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Elegant Theme Toggle Switcher */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Shopping Shipment Bag */}
            <button
              id="shopping-cart-button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/40 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer group"
              title="Open Shipment Bag Inventory"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:scale-105 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E21D1D] text-white font-mono font-bold text-[9px] h-4 w-4 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. DYNAMIC SPORTS HERO SLIDER (ANIMATED HUD & CONTROLS - ZERO TEXT ON TOP) */}
      <SportsHeroSlider 
        slides={config.hero.slides} 
        onOpenMediaFolder={(folder) => {
          setMediaManagerFolder(folder);
          setIsMediaManagerOpen(true);
        }}
      />

      {/* 4. INFINITE SPORTS B2B MANUFACTURING MARQUEE */}
      <SportsB2BMarquee />

      {/* 4. ASYMMETRICAL BENTO GRID PRODUCTS SECTION */}
      <section id="collections" className="py-24 px-6 bg-neutral-50 dark:bg-[#050505] border-b border-neutral-200/60 dark:border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Heading & Category Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block mb-1 uppercase">
                BRAND ARMORY & OEM CATALOG
              </span>
              <h2 className="text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
                CHAMPIONSHIP APPAREL & GEAR
              </h2>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "ALL", label: "ALL CATEGORIES" },
                { id: "Sports Wears", label: "SPORTS WEARS" },
                { id: "Gym and Fitness Wears", label: "GYM & FITNESS" },
                { id: "Street Wears", label: "STREET WEARS" },
                { id: "Leather Jackets", label: "LEATHER JACKETS" },
              ].map((cat) => {
                const isActive = selectedCatalogCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatalogCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#E21D1D] text-white shadow-md shadow-[#E21D1D]/30"
                        : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bento Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {config.products
              .filter((p) =>
                selectedCatalogCategory === "ALL"
                  ? true
                  : p.category.toLowerCase() === selectedCatalogCategory.toLowerCase()
              )
              .map((prod, idx) => {
              // Create an asymmetrical layout based on index (making it feel editorial!)
              const isLargeCard = idx === 0;
              const gridClass = isLargeCard
                ? "md:col-span-8 flex flex-col md:flex-row"
                : "md:col-span-4 flex flex-col justify-between";

              return (
                <div
                  key={prod.id}
                  className={`bg-white dark:bg-[#0c0c0c] rounded-3xl border border-neutral-200/60 dark:border-white/5 overflow-hidden group hover:shadow-2xl hover:border-[#E21D1D]/40 dark:hover:border-[#E21D1D]/25 transition-all duration-300 relative ${gridClass}`}
                >
                  {/* Security transparent protection layer */}
                  <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-none" />

                  {/* Left Column or Upper Column: Image container with overlay protection */}
                  <div className={`relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden ${
                    isLargeCard ? "md:w-1/2 min-h-[300px]" : "h-64"
                  }`}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Absolute Overlay blocks direct save */}
                    <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" />

                    <div className="absolute top-4 right-4 z-10 bg-black/75 backdrop-blur-xs px-3 py-1 rounded-full text-[9px] font-mono text-[#E21D1D] font-bold border border-[#E21D1D]/20">
                      {prod.category}
                    </div>
                  </div>

                  {/* Right Column or Content Block */}
                  <div className={`p-6 flex flex-col justify-between ${
                    isLargeCard ? "md:w-1/2" : ""
                  }`}>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3
                            data-editable-path={`products[${idx}].name`}
                            data-editable-label={`Product ${idx + 1} Name`}
                            className="text-lg font-display font-bold dark:text-white uppercase leading-tight"
                          >
                            {prod.name}
                          </h3>
                        </div>
                        <span
                          data-editable-path={`products[${idx}].price`}
                          data-editable-label={`Product ${idx + 1} Price`}
                          className="font-mono font-black text-[#E21D1D] shrink-0 text-sm"
                        >
                          {prod.price}
                        </span>
                      </div>

                      <p
                        data-editable-path={`products[${idx}].description`}
                        data-editable-label={`Product ${idx + 1} Description`}
                        className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed"
                      >
                        {prod.description}
                      </p>

                      {/* Specs Bullet Points */}
                      <ul className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        {prod.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                            <span className="h-1 w-1 bg-[#E21D1D] rounded-full" />
                            <span
                              data-editable-path={`products[${idx}].specs[${sIdx}]`}
                              data-editable-label={`Product ${idx + 1} Spec ${sIdx + 1}`}
                            >
                              {spec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex gap-2 mt-6">
                      {prod.customizable ? (
                        <a
                          href="#customizer"
                          className="flex-1 bg-[#E21D1D] hover:bg-red-700 text-white text-center font-display font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>CUSTOMIZE BIOMETRICS</span>
                          <Plus className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToCart({
                              product: prod,
                              quantity: 1,
                              selectedSize: "Standard"
                            })
                          }
                          className="flex-1 bg-neutral-950 dark:bg-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-white text-center font-display font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <span>SECURE DIRECT ORDER</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. B2B WHOLESALE FOB PRICING & RFQ CALCULATOR */}
      <B2BWholesaleCalculator />

      {/* 6. FACTORY OEM & PRODUCTION INFRASTRUCTURE */}
      <B2BFactoryCapabilities />

      {/* 7. INTERACTIVE CUSTOMIZER SECTION */}
      <section id="customizer" className="py-24 border-b border-neutral-200/60 dark:border-neutral-900 bg-white dark:bg-[#050505] transition-colors">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center space-y-3 px-6">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              TRY WEARS BESPOKE LAB • TEAM & SQUAD GEAR
            </span>
            <h2 className="text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              REAL TEAM GEAR & BESPOKE CUSTOMIZER
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-2xl mx-auto leading-relaxed">
              Design authentic fight team jerseys, championship lace-up boxing gloves, and MMA trunks. Choose from real pro combat team presets or construct custom squad kits with personalized athlete numbers and club crests.
            </p>
          </div>

          {customizerProduct ? (
            <TShirtCustomizer product={customizerProduct} onAddToCart={handleAddToCart} />
          ) : (
            <div className="text-center py-12 font-mono text-neutral-500 text-xs">No customizable assets active.</div>
          )}
        </div>
      </section>

      {/* 6. TECHNICAL INNOVATION OVERVIEW */}
      <section id="technology" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-900">
        
        {/* Anti theft overlays */}
        <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-none" />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E21D1D]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block mb-1">
                {config.technology.subtitle}
              </span>
              <h2
                data-editable-path="technology.title"
                data-editable-label="Tech Section Heading"
                className="text-4xl font-display font-black tracking-tight uppercase"
              >
                {config.technology.title}
              </h2>
            </div>
            <p className="md:col-span-5 text-xs text-neutral-400 font-mono leading-relaxed">
              We completely discard old padded templates. Every gloving shield utilizes multi-layered matrices tested under 1200lbs of punch impact to safeguard bone structures.
            </p>
          </div>

          {/* Features Column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.technology.features.map((feat, idx) => (
              <div
                key={feat.id}
                className="p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl space-y-6 hover:border-[#E21D1D]/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#E21D1D]/10 rounded-2xl flex items-center justify-center font-display font-black text-[#E21D1D] text-lg border border-[#E21D1D]/20 group-hover:scale-105 transition-transform">
                  0{idx + 1}
                </div>
                <div className="space-y-2">
                  <h3
                    data-editable-path={`technology.features[${idx}].title`}
                    data-editable-label={`Tech Feature ${idx + 1} Title`}
                    className="text-lg font-display font-bold text-white uppercase tracking-tight"
                  >
                    {feat.title}
                  </h3>
                  <p
                    data-editable-path={`technology.features[${idx}].desc`}
                    data-editable-label={`Tech Feature ${idx + 1} Description`}
                    className="text-xs text-neutral-400 leading-relaxed font-sans"
                  >
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Biomechanical Specs Matrix spreadsheet */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E21D1D]" />
              <h4 className="font-display font-black text-xs uppercase tracking-widest">
                CERTIFIED TOURNAMENT METRICS COMPARISON
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] text-neutral-400 border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-white uppercase">
                    <th className="py-3 px-4">Performance Vectors</th>
                    <th className="py-3 px-4 text-[#E21D1D]">Try Wears Sovereign series</th>
                    <th className="py-3 px-4">Cheap competitors</th>
                    <th className="py-3 px-4">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  <tr>
                    <td className="py-4 px-4 text-white font-bold">Kinetic Shock Absorption</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">98.2% Dissipation</td>
                    <td className="py-4 px-4">42.1% (Standard Foam)</td>
                    <td className="py-4 px-4 text-neutral-300">Absolute Wrist Safety</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-white font-bold">Structural Chassis Skin</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">Carbon Fiber + 24K Leather</td>
                    <td className="py-4 px-4">Synthetic Vinyl Pleather</td>
                    <td className="py-4 px-4 text-neutral-300">10x Grip Lifespan</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-white font-bold">Wrist Anchorage Locking</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">Triple-Cuff Alignment Bar</td>
                    <td className="py-4 px-4">Single Thin Velcro Wrap</td>
                    <td className="py-4 px-4 text-neutral-300">Prevents striking shifts</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-white font-bold">Internal Air Exchange</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">Aerospace Mesh Dry Vent</td>
                    <td className="py-4 px-4">Unventilated Closed Shell</td>
                    <td className="py-4 px-4 text-neutral-300">No mold or sweat retention</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORIES & TESTIMONIALS SECTION */}
      <section id="stories" className="py-24 px-6 bg-neutral-50 dark:bg-[#050505] border-b border-neutral-200/60 dark:border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              GLOBAL ENLISTED REVIEWS
            </span>
            <h2 className="text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              CHAMPIONSHIP ANECDOTES
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-sm mx-auto">
              Read feedback from certified world title belt holders and pro grappling masterminds.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.testimonials.map((test, idx) => (
              <div
                key={test.id}
                className="bg-white dark:bg-[#0c0c0c] border border-neutral-200/60 dark:border-white/5 p-8 rounded-3xl relative overflow-hidden group space-y-6 flex flex-col justify-between"
              >
                {/* Security transparent protection layer */}
                <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-none" />

                <div className="space-y-4">
                  {/* Rating Stars mock */}
                  <div className="flex gap-1 text-[#E21D1D]">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <span key={sIdx} className="text-sm font-bold">★</span>
                    ))}
                  </div>

                  <p
                    data-editable-path={`testimonials[${idx}].quote`}
                    data-editable-label={`Testimonial ${idx + 1} Quote`}
                    className="text-sm dark:text-neutral-300 italic font-sans leading-relaxed text-neutral-700"
                  >
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-[#E21D1D]/10 border border-[#E21D1D]/25 rounded-full flex items-center justify-center font-display font-black text-[#E21D1D] text-xs">
                    {test.avatar}
                  </div>
                  <div>
                    <h4
                      data-editable-path={`testimonials[${idx}].author`}
                      data-editable-label={`Testimonial ${idx + 1} Author`}
                      className="text-xs font-display font-bold dark:text-white uppercase"
                    >
                      {test.author}
                    </h4>
                    <span
                      data-editable-path={`testimonials[${idx}].role`}
                      data-editable-label={`Testimonial ${idx + 1} Role`}
                      className="text-[10px] font-mono text-neutral-400 uppercase"
                    >
                      {test.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHITE-LABEL SPONSORSHIP & COLLABORATION FORM */}
      <section id="collaborations" className="py-24 bg-white dark:bg-[#050505] transition-colors border-b border-neutral-200/60 dark:border-neutral-900">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              ELITE DIVISION INGESTION
            </span>
            <h2 className="text-3xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              INITIATE BRAND COLLABORATION
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase leading-relaxed max-w-md mx-auto">
              Are you an active professional titleholder, sports club owner, or dedicated combat gear collector? Register your credentials to join our priority sponsorship program.
            </p>
          </div>

          {/* Secure Form */}
          <form onSubmit={handleContactSubmit} className="bg-neutral-50 dark:bg-[#0c0c0c]/60 p-8 rounded-3xl border border-neutral-200/60 dark:border-white/5 space-y-6 relative">
            {/* Form Success overlay */}
            <AnimatePresence>
              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white dark:bg-neutral-950 z-30 rounded-3xl flex flex-col items-center justify-center text-center p-6"
                >
                  <ShieldCheck className="w-12 h-12 text-emerald-500 animate-bounce mb-4" />
                  <h4 className="font-display font-black text-md dark:text-white uppercase">
                    CREDENTIAL ENVELOPE SECURED
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-2 max-w-sm leading-relaxed">
                    Logistics record has been mapped successfully. Our sponsorship representative will contact you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Fighter / Representative Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MARCUS 'SLEDGE' THOMPSON"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value.toUpperCase())}
                  className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Hotline / Secure Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. SLEDGE@TRYWEARS.COM"
                  className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Athletic Rank or Corporate Role
                </label>
                <select className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#E21D1D]">
                  <option>PROFESSIONAL COMBAT CHAMPION</option>
                  <option>SPORTS GYM OWNER / INSTRUCTOR</option>
                  <option>ACTIVE TOURNAMENT ATHLETE</option>
                  <option>FIGHT WEAR PREMIUM RETAILER</option>
                  <option>COLLECTOR / VIP MEMBER</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Corporate Location Coordinates
                </label>
                <input
                  type="text"
                  required
                  placeholder="CITY, STATE / COUNTRY"
                  className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Enlistment Proposal Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="PROPOSE YOUR SPONSORSHIP TERMS..."
                className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={contactSubmitting}
              className="w-full bg-neutral-950 dark:bg-[#E21D1D] hover:bg-neutral-900 dark:hover:bg-red-750 text-white dark:text-white font-display font-black py-4 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {contactSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>{contactSubmitting ? "ENCRYPTING TRANSMISSION..." : "SUBMIT SPONSORSHIP CREDENTIALS"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* 9. PREMIUM WHITE-LABEL FOOTER */}
      <footer className="bg-neutral-950 text-white py-16 px-6 border-t border-neutral-900 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-xs font-mono">
          
          {/* Logo Brand column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img src={config.global.logo || "/images/trylogo.png"} alt="Try Wears Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display font-black text-base tracking-widest uppercase">
                {config.global.brandName}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 max-w-xs leading-relaxed uppercase">
              Elite handcrafted boxing gloves, custom combat gears, championship shin guards, and ultra-durability performance sports wears designed for professional combat sports champions.
            </p>
          </div>

          {/* Locations */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              GLOBAL LOGISTICS
            </span>
            <ul className="space-y-1.5 text-neutral-400 uppercase text-[10px]">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0 text-[#E21D1D]" /> New York HQ Center</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-600" /> Tokyo Shibuya Ring</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-600" /> London Ring Facility</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              SECURE CONNECTS
            </span>
            <ul className="space-y-1.5 text-neutral-400 uppercase text-[10px]">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0 text-[#E21D1D]" /> {config.global.phone}</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0 text-[#E21D1D]" /> {config.global.email}</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              INTEL REEDS
            </span>
            <div className="flex gap-3 text-neutral-400">
              <a href="#" className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Brand Copyright legal statement */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-neutral-600 uppercase">
          <div>
            © {new Date().getFullYear()} {config.global.brandName}. ALL RIGHTS RESERVED. DESIGN CONFIGURED GLOBALLY.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Biosecure Protection Rules</a>
            <span>•</span>
            <a href="#" className="hover:underline">Logistics Shipment Terms</a>
          </div>
        </div>
      </footer>

      {/* 10. SECURE SHIPMENT SHOPPING CART PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 11. DYNAMIC WEBSITE MEDIA FOLDERS MANAGER (IMAGES & VIDEOS AUTO-SYNC) */}
      <MediaManagerModal
        isOpen={isMediaManagerOpen}
        onClose={() => setIsMediaManagerOpen(false)}
        defaultFolder={mediaManagerFolder}
        onMediaChanged={fetchConfig}
      />
    </div>
  );
}
