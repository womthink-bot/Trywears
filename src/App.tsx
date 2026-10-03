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
  FolderOpen,
  Menu,
  X,
  Lock,
  HelpCircle,
  Scissors,
  FileCheck,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WebsiteConfig, CartItem, Product } from "./types";
import { ThemeToggle } from "./components/ThemeToggle";
import { CartDrawer } from "./components/CartDrawer";
import { SecurityAlerts } from "./components/SecurityAlerts";
import { SportsMotionFX } from "./components/SportsMotionFX";
import { MediaManagerModal } from "./components/MediaManagerModal";
import { DeveloperProductUploadModal } from "./components/DeveloperProductUploadModal";
import fallbackConfig from "./data/website_config.json";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { CustomizationPage } from "./pages/CustomizationPage";
import { QualityProcessPage } from "./pages/QualityProcessPage";
import { SamplingPoliciesPage } from "./pages/SamplingPoliciesPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { FAQPage } from "./pages/FAQPage";

export type AppPage =
  | "home"
  | "about-us"
  | "customization"
  | "quality-process"
  | "sampling-policies"
  | "privacy-policy"
  | "faq";

export default function App() {
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [activePage, setActivePage] = useState<AppPage>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const [bannerText, setBannerText] = useState("★ FACTORY DIRECT B2B COMBAT WEAR & SPORTS APPAREL • LOW MOQ 25 PCS • EXPRESS WORLDWIDE DDP AIR DISPATCH");

  // Hidden Developer Mode Folder Upload Modal
  const [isDevUploadOpen, setIsDevUploadOpen] = useState(false);

  // Contact Form Submission State
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactName, setContactName] = useState("");

  // Secret Developer Mode Keyboard Shortcut (Ctrl+Shift+D or Alt+D)
  useEffect(() => {
    const handleDevKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") ||
        (e.altKey && e.key.toLowerCase() === "d")
      ) {
        e.preventDefault();
        setIsDevUploadOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleDevKeyDown);
    return () => window.removeEventListener("keydown", handleDevKeyDown);
  }, []);

  // Hash Routing sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").trim();
      const validPages: AppPage[] = [
        "home",
        "about-us",
        "customization",
        "quality-process",
        "sampling-policies",
        "privacy-policy",
        "faq"
      ];
      if (validPages.includes(hash as AppPage)) {
        setActivePage(hash as AppPage);
      } else if (!hash) {
        setActivePage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page: AppPage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.location.hash = page === "home" ? "" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Load configuration from Express Backend API
  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/config");
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        const customProduct = data.products?.find((p: any) => p.customizable) || data.products?.[0] || (fallbackConfig.products as any)[0];
        setCustomizerProduct(customProduct);
      } else {
        throw new Error("Config endpoint returned non-OK status");
      }
    } catch (err) {
      console.warn("Failed to fetch website config from backend, using local fallback config:", err);
      setConfig(fallbackConfig as any);
      const customProduct = (fallbackConfig.products as any).find((p: any) => p.customizable) || fallbackConfig.products[0];
      setCustomizerProduct(customProduct as any);
    }
  };

  useEffect(() => {
    fetchConfig();

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true" || params.get("media") === "true") {
        setIsMediaManagerOpen(true);
      }
    } catch (e) {}

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

  // Theme Toggler
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size, color }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart(prev => prev.map((item, idx) => (idx === index ? { ...item, quantity } : item)));
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
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
        <div className="w-10 h-10 border-2 border-neutral-800 border-t-red-600 rounded-full animate-spin mb-4" />
        <h4 className="font-display font-black text-xs text-white uppercase tracking-widest">
          TRY WEARS LOGISTICS INTERFACE BOOTING...
        </h4>
        <p className="text-[9px] font-mono text-neutral-500 mt-1 uppercase">
          Compiling luxury assets & server specifications
        </p>
      </div>
    );
  }

  // Header Nav Items: Home, About Us, Customization, Quality & Process, Sampling Policies
  const NAV_ITEMS: { label: string; page: AppPage }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about-us" },
    { label: "Customization", page: "customization" },
    { label: "Quality & Process", page: "quality-process" },
    { label: "Sampling Policies", page: "sampling-policies" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 selection:bg-[#E21D1D] selection:text-white relative">
      {/* Dynamic Mouse Motion Glow & Top Scroll Progress Bar */}
      <SportsMotionFX />

      {/* Security Protection Layer */}
      <SecurityAlerts />

      {/* 1. TOP NOTIFICATION RUNNER */}
      <div className="bg-neutral-950 text-white py-2 px-4 border-b border-neutral-900 overflow-hidden relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto text-[9px] font-mono tracking-widest font-black uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
            <span
              data-editable-path="bannerText"
              data-editable-label="Top Announcement Banner Text"
            >
              {bannerText}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => navigateTo("sampling-policies")}
              className="hover:text-[#E21D1D] transition-colors text-emerald-400 font-bold cursor-pointer"
            >
              EXPRESS SAMPLE DESK
            </button>
            <span>•</span>
            <span className="text-[#E21D1D] font-bold">ISO 9001:2015 CERTIFIED</span>
          </div>
        </div>
      </div>

      {/* 2. PREMIUM NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-900/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          
          {/* Branded Logo */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="h-11 w-11 sm:h-13 sm:w-13 flex items-center justify-center shrink-0">
              <img 
                src={config.global.logo || "/images/trylogo.png"} 
                alt="Try Wears Logo" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div>
              <span className="font-display font-black text-base sm:text-lg tracking-widest dark:text-white block uppercase leading-none">
                {config.global.brandName}
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#E21D1D] block uppercase mt-1">
                {config.global.tagline}
              </span>
            </div>
          </button>

          {/* Clean 5-Item Navigation Menu as Specified */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-mono font-bold uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`flex items-center gap-1.5 transition-all py-1 cursor-pointer relative ${
                    isActive
                      ? "text-[#E21D1D] font-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping" />
                  )}
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 inset-x-0 h-0.5 bg-[#E21D1D]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Action Button */}
            <button
              onClick={() => navigateTo("customization")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-[10px] font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(226,29,29,0.3)] cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Get B2B Quote</span>
            </button>

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

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activePage === item.page;
                  return (
                    <button
                      key={item.page}
                      onClick={() => navigateTo(item.page)}
                      className={`text-left py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-[#E21D1D]/15 text-[#E21D1D] border border-[#E21D1D]/40 font-black"
                          : "text-neutral-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#E21D1D]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-neutral-900">
                <button
                  onClick={() => navigateTo("customization")}
                  className="w-full py-3 rounded-xl bg-[#E21D1D] text-white font-mono text-xs font-black uppercase text-center cursor-pointer shadow-lg"
                >
                  Configure Custom Tech Pack
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. DYNAMIC MULTI-PAGE VIEW ROUTER */}
      <main className="min-h-screen">
        {activePage === "home" && (
          <HomePage
            config={config}
            customizerProduct={customizerProduct}
            onAddToCart={handleAddToCart}
            contactName={contactName}
            setContactName={setContactName}
            contactSubmitting={contactSubmitting}
            contactSuccess={contactSuccess}
            handleContactSubmit={handleContactSubmit}
            onNavigatePage={navigateTo}
            onOpenMediaFolder={(folder) => {
              setMediaManagerFolder(folder);
              setIsMediaManagerOpen(true);
            }}
          />
        )}

        {activePage === "about-us" && (
          <AboutUsPage onNavigatePage={navigateTo} />
        )}

        {activePage === "customization" && (
          <CustomizationPage
            customizerProduct={customizerProduct}
            onAddToCart={handleAddToCart}
            onNavigatePage={navigateTo}
          />
        )}

        {activePage === "quality-process" && (
          <QualityProcessPage onNavigatePage={navigateTo} />
        )}

        {activePage === "sampling-policies" && (
          <SamplingPoliciesPage onNavigatePage={navigateTo} />
        )}

        {activePage === "privacy-policy" && (
          <PrivacyPolicyPage onNavigatePage={navigateTo} />
        )}

        {activePage === "faq" && (
          <FAQPage onNavigatePage={navigateTo} />
        )}
      </main>

      {/* 4. PREMIUM WHITE-LABEL B2B FOOTER */}
      <footer className="bg-neutral-950 text-white py-16 px-6 border-t border-neutral-900 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-xs font-mono">
          
          {/* Logo Brand column */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={config.global.logo || "/images/trylogo.png"}
                  alt="Try Wears Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-base tracking-widest uppercase">
                {config.global.brandName}
              </span>
            </button>
            <p className="text-[10px] text-neutral-500 max-w-xs leading-relaxed uppercase">
              Elite handcrafted boxing gloves, custom combat gears, championship shin guards, and ultra-durability performance sportswear designed for professional combat champions and luxury streetwear labels.
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              PRIMARY NAVIGATION
            </span>
            <ul className="space-y-2 text-neutral-400 uppercase text-[10px]">
              {NAV_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-neutral-600">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Help Links: Privacy Policy & FAQ */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              LEGAL, NDA & SUPPORT
            </span>
            <ul className="space-y-2 text-neutral-400 uppercase text-[10px]">
              <li>
                <button
                  onClick={() => navigateTo("privacy-policy")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-300 font-bold"
                >
                  <Lock className="w-3 h-3 text-[#E21D1D]" />
                  <span>Privacy Policy & IP NDA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("faq")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-300 font-bold"
                >
                  <HelpCircle className="w-3 h-3 text-[#E21D1D]" />
                  <span>B2B Buyer FAQ & Help</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("sampling-policies")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Package className="w-3 h-3 text-[#E21D1D]" />
                  <span>Sample Prototyping Policies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("quality-process")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3 h-3 text-[#E21D1D]" />
                  <span>ISO 9001 & CE Certifications</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Connects & Socials */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-bold text-[#E21D1D] uppercase tracking-widest block">
              SECURE CONNECT
            </span>
            <div className="space-y-1.5 text-neutral-400 uppercase text-[10px]">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0 text-[#E21D1D]" /> {config.global.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0 text-[#E21D1D]" /> {config.global.email}</div>
            </div>

            <div className="pt-2 flex gap-2 text-neutral-400">
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

        {/* Brand Copyright legal statement & Discreet Developer Trigger */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-neutral-500 uppercase">
          <div className="flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} {config.global.brandName}. ALL RIGHTS RESERVED. B2B OEM/ODM PRIVATE LABEL.
            </span>
            {/* Discreet Developer Mode Button */}
            <button
              onClick={() => setIsDevUploadOpen(true)}
              className="opacity-40 hover:opacity-100 hover:text-[#E21D1D] transition-opacity cursor-pointer flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10"
              title="Open Developer Product Ingestion Portal (or press Ctrl+Shift+D / Alt+D)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DEV INGESTION (CTRL+SHIFT+D)</span>
            </button>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigateTo("privacy-policy")} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy & IP NDA
            </button>
            <span>•</span>
            <button onClick={() => navigateTo("faq")} className="hover:text-white transition-colors cursor-pointer">
              Buyer FAQ & Trade Terms
            </button>
          </div>
        </div>
      </footer>

      {/* 5. SECURE SHIPMENT SHOPPING CART PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 6. DYNAMIC WEBSITE MEDIA FOLDERS MANAGER */}
      <MediaManagerModal
        isOpen={isMediaManagerOpen}
        onClose={() => setIsMediaManagerOpen(false)}
        defaultFolder={mediaManagerFolder}
        onMediaChanged={fetchConfig}
      />

      {/* 7. HIDDEN DEVELOPER PRODUCT FOLDER INGESTION & DUMMY REPLACEMENT MODAL */}
      <DeveloperProductUploadModal
        isOpen={isDevUploadOpen}
        onClose={() => setIsDevUploadOpen(false)}
        onCategoriesUpdated={() => {
          fetchConfig();
        }}
      />
    </div>
  );
}
