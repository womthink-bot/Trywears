import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Send, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Award,
  Scissors,
  CheckCircle2, 
  FileCheck, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Zap, 
  Globe2, 
  Lock, 
  Rotate3d, 
  Sliders, 
  Check, 
  ArrowRight,
  Plus,
  Home,
  MessageSquare,
  LogOut,
  Unlock,
  UserCheck,
  UserPlus,
  User
} from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { AdminLeadsModal } from "./components/AdminLeadsModal";
import { motion, AnimatePresence } from "motion/react";
import { SportsHeroSlider, HeroSlide } from "./components/SportsHeroSlider";
import { SportsB2BMarquee } from "./components/SportsB2BMarquee";
import { CustomProductsShowcase } from "./components/CustomProductsShowcase";
import { ScrollDeconstructed3DGarment } from "./components/ScrollDeconstructed3DGarment";
import { BrandLogosMarqueeSection } from "./components/BrandLogosMarqueeSection";
import { FactoryLiveVideoShowcase } from "./components/FactoryLiveVideoShowcase";
import { FashionWearCustomVideoSection } from "./components/FashionWearCustomVideoSection";
import { TShirtCustomizer, DEFAULT_CUSTOMIZER_PRODUCT } from "./components/TShirtCustomizer";
import { CartDrawer } from "./components/CartDrawer";
import { SportsMotionFX } from "./components/SportsMotionFX";
import { SecurityAlerts } from "./components/SecurityAlerts";
import { SocialLinks } from "./components/SocialLinks";
import { WhatsAppChatWidget, WHATSAPP_DISPLAY, getWhatsAppUrl } from "./components/WhatsAppChatWidget";
import { SportsFontSwitcher } from "./components/SportsFontSwitcher";
import { TryProductsMegaMenu, TryProductsMobileAccordion } from "./components/TryProductsMegaMenu";
import { FolderNode } from "./types/folderTree";

// Core Pages
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { CustomizationPage } from "./pages/CustomizationPage";
import { QualityProcessPage } from "./pages/QualityProcessPage";
import { SamplingPoliciesPage } from "./pages/SamplingPoliciesPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { FAQPage } from "./pages/FAQPage";
import { B2BQuotationPage } from "./pages/B2BQuotationPage";

// Master Hub Pages for Services & Support
import { ServicesPage } from "./pages/ServicesPage";
import { SupportPage } from "./pages/SupportPage";

// 10 UK-Optimized Services & Support Pages
import { DesignCustomizationPage } from "./pages/DesignCustomizationPage";
import { BrandCustomizationPage } from "./pages/BrandCustomizationPage";
import { CustomizeYourProductPage } from "./pages/CustomizeYourProductPage";
import { SampleDevelopmentPage } from "./pages/SampleDevelopmentPage";
import { BulkProductionPage } from "./pages/BulkProductionPage";
import { ShippingPolicyPage } from "./pages/ShippingPolicyPage";
import { ReturnRefundPolicyPage } from "./pages/ReturnRefundPolicyPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { MOQLeadTimePage } from "./pages/MOQLeadTimePage";
import { OrderProcessPage } from "./pages/OrderProcessPage";

export type AppPage =
  | "home"
  | "catalog"
  | "try-products"
  | "about-us"
  | "services"
  | "support"
  | "customization"
  | "quality-process"
  | "sampling-policies"
  | "privacy-policy"
  | "faq"
  | "b2b-quote"
  | "design-customization"
  | "brand-customization"
  | "customize-your-product"
  | "sample-development"
  | "bulk-production"
  | "shipping-policy"
  | "return-refund-policy"
  | "terms-and-conditions"
  | "moq-lead-time"
  | "order-process";

export function App() {
  const [activePage, setActivePage] = useState<AppPage>("home");
  const { isAuthenticated, user, openAuthModal, logout, openAdminModal } = useAuth();
  const [config, setConfig] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [bannerText, setBannerText] = useState<string>(
    "★ FACTORY DIRECT B2B COMBAT WEAR & SPORTS APPAREL • LOW MOQ 20 PCS • WORLDWIDE SHIPPING AS PER CLIENT'S CHOICE (AIR & SEA)"
  );

  // Catalog Navigation State
  const [catalogInitialFolder, setCatalogInitialFolder] = useState<FolderNode | null>(null);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string | null>(null);

  // Nav Dropdowns state
  const [activeDropdown, setActiveDropdown] = useState<"services" | "support" | null>(null);

  // Form submission state for quick newsletter/contact
  const [contactName, setContactName] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Auto-scroll to top on page navigation
  const navigateTo = (page: AppPage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quote Navigation Product State
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<any>(null);

  // Dedicated quote navigation helper
  const navigateToQuote = (productInfo?: any) => {
    setSelectedProductForQuote(productInfo || null);
    setActivePage("b2b-quote");
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dedicated catalog navigation helper (routes to separate catalog page)
  const navigateToCatalog = (folder?: FolderNode, categoryName?: string) => {
    setCatalogInitialFolder(folder || null);
    setCatalogInitialCategory(categoryName || (folder ? null : "all"));
    setActivePage("catalog");
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Global event listener for opening dedicated catalog page from anywhere
  useEffect(() => {
    const handleOpenCatalog = (e: any) => {
      if (e.detail) {
        navigateToCatalog(e.detail.folder, e.detail.categoryName);
      } else {
        navigateToCatalog();
      }
    };
    window.addEventListener("open-catalog-page", handleOpenCatalog);
    return () => window.removeEventListener("open-catalog-page", handleOpenCatalog);
  }, []);

  // Global event listener for opening quote page from anywhere
  useEffect(() => {
    const handleOpenQuote = (e: any) => {
      if (e && e.detail) {
        navigateToQuote(e.detail);
      } else {
        navigateTo("b2b-quote");
      }
    };
    window.addEventListener("open-quote-page", handleOpenQuote);
    return () => window.removeEventListener("open-quote-page", handleOpenQuote);
  }, []);

  // Global event listener for adding to cart from anywhere
  useEffect(() => {
    const handleGlobalAddToCart = (e: any) => {
      if (e && e.detail) {
        handleAddToCart(e.detail);
      }
    };
    window.addEventListener("add-to-cart", handleGlobalAddToCart);
    return () => window.removeEventListener("add-to-cart", handleGlobalAddToCart);
  }, [cart]);

  // Close nav dropdowns (Services/Support) on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown="services"]') && !target.closest('[data-dropdown="support"]')) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeDropdown]);

  // Sync document title on page navigation to always show Try Wears
  useEffect(() => {
    const titles: Record<AppPage, string> = {
      home: "Try Wears | Premier B2B Sports Manufacturer & Custom Fightwear",
      catalog: "TRY Products B2B Catalog | 2,372 Factory Samples | Try Wears",
      "try-products": "TRY Products B2B Catalog | 2,372 Factory Samples | Try Wears",
      "b2b-quote": "B2B Quotation & Tech Pack Portal | Try Wears",
      customization: "Custom Apparel Manufacturing & 3D Studio | Try Wears",
      "customize-your-product": "Customize Your Combat & Sports Gear | Try Wears",
      "about-us": "About Us | Try Wears OEM/ODM Factory",
      "quality-process": "Quality Assurance & QC Testing Protocol | Try Wears",
      services: "B2B Services & Private Label Manufacturing | Try Wears",
      support: "Factory Support & Direct Communication | Try Wears",
      "sampling-policies": "Sampling Policies & Prototype Development | Try Wears",
      "privacy-policy": "Privacy Policy & Data Protection | Try Wears",
      faq: "Frequently Asked Questions | Try Wears",
      "design-customization": "Technical Design & Vector Artwork | Try Wears",
      "brand-customization": "Private Label Trims & Branding | Try Wears",
      "sample-development": "Rapid Sample Development | Try Wears",
      "bulk-production": "High-Volume Production & Tiered Pricing | Try Wears",
      "shipping-policy": "Global DDP Shipping & Express Logistics | Try Wears",
      "return-refund-policy": "Replacement & Return Policy | Try Wears",
      "terms-and-conditions": "International Terms of Trade & B2B Contracts | Try Wears",
      "moq-lead-time": "MOQ & Production Lead Times | Try Wears",
      "order-process": "6-Step Manufacturing Process | Try Wears",
    };
    document.title = titles[activePage] || "Try Wears | Premier B2B Sports Manufacturer & OEM/ODM Fight Gear";
  }, [activePage]);

  useEffect(() => {
    // Fetch initial configuration
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        if (data.global && data.global.bannerText) {
          setBannerText(data.global.bannerText);
        }
      })
      .catch((err) => {
        console.warn("Could not load config from backend, using fallback:", err);
        setConfig({
          global: {
            brandName: "TRY WEARS",
            tagline: "OEM/ODM COMBAT SPORTS & ATHLETIC APPAREL FACTORY",
            announcement: "FACTORY DIRECT B2B WHOLESALE & CUSTOM CLOTHING MANUFACTURING",
            logo: "/images/trylogo.png",
            contactEmail: "info@trywears.com",
            phone: "+92 300 1234567"
          }
        });
      });

    // Theme initialization
    const savedTheme = localStorage.getItem("trywears_theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }

    // Load Cart from local storage
    try {
      const savedCart = localStorage.getItem("trywears_b2b_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("trywears_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleAddToCart = (productConfig: any) => {
    const updated = [...cart, { ...productConfig, id: `custom-${Date.now()}` }];
    setCart(updated);
    try {
      localStorage.setItem("trywears_b2b_cart", JSON.stringify(updated));
    } catch {}
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    const updated = cart.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
    setCart(updated);
    try {
      localStorage.setItem("trywears_b2b_cart", JSON.stringify(updated));
    } catch {}
  };

  const handleRemoveFromCart = (id: string) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    try {
      localStorage.setItem("trywears_b2b_cart", JSON.stringify(updated));
    } catch {}
  };

  const handleClearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("trywears_b2b_cart");
    } catch {}
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName) return;
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setContactName("");
      setTimeout(() => setContactSuccess(false), 5000);
    }, 800);
  };

  const SERVICES_MENU_ITEMS: { label: string; page: AppPage }[] = [
    { label: "Design Customization", page: "design-customization" },
    { label: "Brand Customization", page: "brand-customization" },
    { label: "Customize Your Product", page: "customize-your-product" },
    { label: "Sample Development", page: "sample-development" },
    { label: "Bulk Production", page: "bulk-production" }
  ];

  const SUPPORT_MENU_ITEMS: { label: string; page: AppPage; hasBadge?: boolean }[] = [
    { label: "Shipping Policy", page: "shipping-policy" },
    { label: "Return and Refund Policy", page: "return-refund-policy" },
    { label: "Terms and Conditions", page: "terms-and-conditions" },
    { label: "MOQ and Lead Time", page: "moq-lead-time", hasBadge: true },
    { label: "Order Process", page: "order-process" }
  ];

  const isServicesActive = activePage === "services" || SERVICES_MENU_ITEMS.some(i => i.page === activePage);
  const isSupportActive = activePage === "support" || SUPPORT_MENU_ITEMS.some(i => i.page === activePage);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 selection:bg-[#E21D1D] selection:text-white relative">
      {/* Dynamic Mouse Motion Glow & Top Scroll Progress Bar */}
      <SportsMotionFX />

      {/* Security Protection Layer */}
      <SecurityAlerts />

      {/* 1. TOP NOTIFICATION RUNNER (FULL SCREEN WIDTH) */}
      <div className="bg-[#08080c] text-white py-1.5 sm:py-2 px-2.5 xs:px-4 sm:px-6 lg:px-10 xl:px-14 border-b border-neutral-800/80 overflow-hidden relative z-50">
        <div className="w-full flex items-center justify-between text-[8px] xs:text-[9px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest font-black uppercase">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
            <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
            <span className="truncate flex-1 min-w-0 text-neutral-200">
              {bannerText}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <button
              onClick={() => navigateTo("sample-development")}
              className="hover:text-white transition-colors text-emerald-400 font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CUSTOM SAMPLE DEVELOPMENT ON DEMAND</span>
            </button>
            <span className="text-neutral-700">|</span>
            <span className="text-[#ff3b3b] font-bold tracking-wider">ISO 9001:2015 & CE CERTIFIED FACTORY</span>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE FULL-SCREEN NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#07070b]/98 backdrop-blur-2xl border-b border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all">
        <div className="w-full px-2.5 xs:px-4 sm:px-6 lg:px-10 xl:px-14 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          
          {/* Branded Logo */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-2 xs:gap-2.5 sm:gap-3.5 group text-left cursor-pointer flex-1 min-w-0 mr-1 sm:mr-4"
          >
            <div className="h-9 w-9 xs:h-11 xs:w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl bg-neutral-900/60 p-1 border border-neutral-800 group-hover:border-[#E21D1D]/60 flex items-center justify-center shrink-0 transition-all duration-300 shadow-md">
              <img 
                src={config?.global?.logo || "/images/trylogo.png"} 
                alt="Try Wears Logo" 
                className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(226,29,29,0.3)]" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-display font-black text-sm xs:text-base sm:text-xl lg:text-2xl tracking-[0.1em] sm:tracking-[0.14em] text-white block uppercase leading-none group-hover:text-[#ff3b3b] transition-colors">
                {config?.global?.brandName || "TRY WEARS"}
              </span>
              {/* Full tagline on mobile broken into two lines as requested, single line on tablet/desktop */}
              <div className="text-[7px] xs:text-[8px] sm:text-[10px] font-mono font-bold tracking-wider sm:tracking-widest text-[#ff3b3b] uppercase mt-0.5 sm:mt-1 leading-tight sm:leading-normal">
                <span className="block sm:inline">OEM/ODM COMBAT SPORTS &amp;</span>{" "}
                <span className="block sm:inline">ATHLETIC APPAREL FACTORY</span>
              </div>
            </div>
          </button>

          {/* Clean Executive Navbar with SERVICES & SUPPORT Clickable Hubs & Dropdowns */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-3">
            {/* Home */}
            <button
              onClick={() => navigateTo("home")}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activePage === "home"
                  ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
              }`}
            >
              {activePage === "home" && <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />}
              <span>Home</span>
            </button>

            {/* About Us */}
            <button
              onClick={() => navigateTo("about-us")}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activePage === "about-us"
                  ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
              }`}
            >
              {activePage === "about-us" && <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />}
              <span>About Us</span>
            </button>

            {/* TRY PRODUCTS MULTI-TIER CATALOG DROPDOWN */}
            <TryProductsMegaMenu
              onNavigateToQuote={() => navigateTo("b2b-quote")}
              onNavigateToCatalog={navigateToCatalog}
            />

            {/* SERVICES Dropdown (Click to Open, Closes on outside click - Never opens accidentally on hover) */}
            <div className="relative" data-dropdown="services">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isServicesActive || activeDropdown === "services"
                    ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
                }`}
                title="Click to view Services"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180 text-[#ff3b3b]" : "text-neutral-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 pt-2 w-64 z-50"
                  >
                    <div className="p-3 bg-[#0a0a12] border border-neutral-700 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.95)] space-y-1 backdrop-blur-xl">
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          navigateTo("services");
                        }}
                        className="w-full text-left px-3 py-1.5 border-b border-neutral-800 mb-1 flex items-center justify-between hover:bg-white/5 rounded transition-colors cursor-pointer group/title"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-black text-[#d946ef] tracking-widest uppercase block group-hover/title:text-white">
                            SERVICES OVERVIEW
                          </span>
                          <div className="w-6 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 group-hover/title:text-white">View All →</span>
                      </button>

                      {SERVICES_MENU_ITEMS.map((item) => (
                        <button
                          key={item.page}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateTo(item.page);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                            activePage === item.page
                              ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold"
                              : "text-neutral-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SUPPORT Dropdown (Click to Open, Closes on outside click - Never opens accidentally on hover) */}
            <div className="relative" data-dropdown="support">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "support" ? null : "support")}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSupportActive || activeDropdown === "support"
                    ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
                }`}
                title="Click to view Support & Policies"
              >
                <span>Support</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "support" ? "rotate-180 text-[#ff3b3b]" : "text-neutral-400"
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "support" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 pt-2 w-64 z-50"
                  >
                    <div className="p-3 bg-[#0a0a12] border border-neutral-700 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.95)] space-y-1 backdrop-blur-xl">
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          navigateTo("support");
                        }}
                        className="w-full text-left px-3 py-1.5 border-b border-neutral-800 mb-1 flex items-center justify-between hover:bg-white/5 rounded transition-colors cursor-pointer group/title"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-black text-[#d946ef] tracking-widest uppercase block group-hover/title:text-white">
                            SUPPORT & POLICIES
                          </span>
                          <div className="w-6 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 group-hover/title:text-white">View All →</span>
                      </button>

                      {SUPPORT_MENU_ITEMS.map((item) => (
                        <button
                          key={item.page}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateTo(item.page);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                            activePage === item.page
                              ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold"
                              : "text-neutral-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.hasBadge && (
                              <span className="w-4 h-4 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#d946ef] flex items-center justify-center text-[10px] font-bold">
                                +
                              </span>
                            )}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quality & Process */}
            <button
              onClick={() => navigateTo("quality-process")}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activePage === "quality-process"
                  ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
              }`}
            >
              {activePage === "quality-process" && <span className="w-1.5 h-1.5 rounded-full bg-[#E21D1D] animate-ping shrink-0" />}
              <span>Quality & Process</span>
            </button>
          </nav>

          {/* Header Controls & Unified B2B Quote Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Free B2B Sign Up / Member Unlock Status */}
            {!isAuthenticated ? (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                title="Sign Up Free to Unlock Full Catalog & FOB Wholesale Rates"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden md:inline">FREE SIGN UP</span>
                <span className="md:hidden">SIGN UP</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#0e1422] border border-neutral-700/80 rounded-xl px-2.5 sm:px-3 py-1.5 font-mono text-xs shadow-lg">
                <div className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold truncate max-w-[85px] sm:max-w-[120px] text-white">
                    {user?.name.split(" ")[0]}
                  </span>
                  <span className="hidden lg:inline text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-800">
                    UNLOCKED
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                  title="Sign Out / Lock Catalog"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* High-Impact B2B Quote Action Button (Visible on sm and up) */}
            <button
              onClick={() => navigateTo("b2b-quote")}
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg whitespace-nowrap active:scale-95 ${
                activePage === "b2b-quote"
                  ? "bg-red-700 text-white ring-2 ring-white shadow-[0_0_25px_rgba(226,29,29,0.6)]"
                  : "bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white shadow-[0_0_20px_rgba(226,29,29,0.4)] hover:shadow-[0_0_30px_rgba(226,29,29,0.6)] hover:scale-102"
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>GET B2B QUOTE</span>
            </button>

            {/* Mobile / Tablet Menu Button - Highly visible, clear, and perfectly fitted on all devices */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden flex items-center gap-1.5 xs:gap-2 px-2.5 py-1.5 xs:px-3.5 xs:py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 shrink-0 ${
                isMobileMenuOpen
                  ? "bg-[#E21D1D] border-red-400 text-white shadow-[0_0_20px_rgba(226,29,29,0.5)] ring-2 ring-red-500/40"
                  : "bg-neutral-900/95 border-[#E21D1D] text-white hover:bg-neutral-800 shadow-[0_0_15px_rgba(226,29,29,0.35)] hover:border-red-400"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 xs:w-5 xs:h-5 text-white shrink-0" />
                  <span className="font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider text-white">CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 xs:w-5 xs:h-5 text-[#ff4d4d] shrink-0" />
                  <span className="font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider text-white">MENU</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="xl:hidden border-t border-neutral-800 bg-[#090912]/98 backdrop-blur-2xl px-3.5 sm:px-6 py-4 sm:py-6 space-y-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[82vh] overflow-y-auto overscroll-contain"
            >
              {/* Mobile Auth Banner */}
              {!isAuthenticated ? (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-black border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                        FREE B2B WHOLESALE ACCESS
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-600/30 text-emerald-300">
                      FREE
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-300 leading-snug">
                    Sign up free to unblur all 2,372 factory samples and inspect FOB wholesale tier rates.
                  </p>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98 transition"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>SIGN UP FREE / SIGN IN</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-[#101726] border border-neutral-700 flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-white font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{user?.name}</span>
                    </div>
                    <div className="text-[10px] text-emerald-400">
                      B2B Member Active • All Products Unlocked
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-950 hover:text-red-300 text-neutral-300 text-[11px] font-bold border border-neutral-700 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Top CTA: Get B2B Factory Quote */}
              <button
                onClick={() => navigateTo("b2b-quote")}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E21D1D] via-red-600 to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(226,29,29,0.5)] cursor-pointer active:scale-98 transition-all"
              >
                <FileCheck className="w-4 h-4 shrink-0" />
                <span>REQUEST B2B FACTORY QUOTE / TECH PACK</span>
              </button>

              {/* Section 1: Main Pages */}
              <div className="space-y-1 bg-black/40 p-2.5 rounded-2xl border border-neutral-800/80">
                <div className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest px-2.5 py-1">
                  NAVIGATION
                </div>

                {/* Home */}
                <button
                  onClick={() => navigateTo("home")}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                    activePage === "home"
                      ? "bg-[#E21D1D]/20 text-[#ff4d4d] border border-[#E21D1D]/40 font-black"
                      : "text-neutral-200 hover:bg-neutral-800/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-[#ff4d4d]" />
                    <span>Home</span>
                  </span>
                  {activePage === "home" && <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />}
                </button>

                {/* About Us */}
                <button
                  onClick={() => navigateTo("about-us")}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                    activePage === "about-us"
                      ? "bg-[#E21D1D]/20 text-[#ff4d4d] border border-[#E21D1D]/40 font-black"
                      : "text-neutral-200 hover:bg-neutral-800/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-[#ff4d4d]" />
                    <span>About Us</span>
                  </span>
                  {activePage === "about-us" && <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />}
                </button>

                {/* Quality & Process */}
                <button
                  onClick={() => navigateTo("quality-process")}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-between cursor-pointer ${
                    activePage === "quality-process"
                      ? "bg-[#E21D1D]/20 text-[#ff4d4d] border border-[#E21D1D]/40 font-black"
                      : "text-neutral-200 hover:bg-neutral-800/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#ff4d4d]" />
                    <span>Quality & Process</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                    ISO 9001
                  </span>
                </button>
              </div>

              {/* Section 2: Mobile TRY PRODUCTS CATALOG ACCORDION */}
              <div className="bg-black/40 p-2.5 rounded-2xl border border-neutral-800/80 space-y-2">
                <div className="text-[10px] font-mono font-black text-neutral-400 uppercase tracking-widest px-2.5 py-1 flex items-center justify-between">
                  <span>PRODUCTS CATALOG</span>
                  <span className="text-[#ff4d4d]">2,372 SAMPLES</span>
                </div>

                <TryProductsMobileAccordion
                  onNavigateToCatalog={navigateToCatalog}
                  onOpenFolderModal={(node) => {
                    navigateToCatalog(node);
                  }}
                />
              </div>

              {/* Section 3: Mobile SERVICES Section */}
              <div className="bg-black/40 p-2.5 rounded-2xl border border-neutral-800/80 space-y-1">
                <button
                  onClick={() => navigateTo("services")}
                  className="w-full text-left px-2.5 py-1.5 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/40 rounded-xl"
                >
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#d946ef] tracking-widest uppercase block">
                      SERVICES (ALL OVERVIEW)
                    </span>
                    <div className="w-8 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white flex items-center gap-1">
                    <span>View Page</span>
                    <ArrowRight className="w-3 h-3 text-[#d946ef]" />
                  </span>
                </button>

                <div className="pt-1 space-y-0.5">
                  {SERVICES_MENU_ITEMS.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigateTo(item.page)}
                      className={`w-full text-left py-2 px-2.5 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        activePage === item.page
                          ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold border border-[#E21D1D]/30"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Mobile SUPPORT & POLICIES Section */}
              <div className="bg-black/40 p-2.5 rounded-2xl border border-neutral-800/80 space-y-1">
                <button
                  onClick={() => navigateTo("support")}
                  className="w-full text-left px-2.5 py-1.5 flex items-center justify-between group cursor-pointer hover:bg-neutral-800/40 rounded-xl"
                >
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#d946ef] tracking-widest uppercase block">
                      SUPPORT & POLICIES (OVERVIEW)
                    </span>
                    <div className="w-8 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white flex items-center gap-1">
                    <span>View Page</span>
                    <ArrowRight className="w-3 h-3 text-[#d946ef]" />
                  </span>
                </button>

                <div className="pt-1 space-y-0.5">
                  {SUPPORT_MENU_ITEMS.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigateTo(item.page)}
                      className={`w-full text-left py-2 px-2.5 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                        activePage === item.page
                          ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold border border-[#E21D1D]/30"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {item.hasBadge && (
                          <span className="w-4 h-4 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#d946ef] flex items-center justify-center text-[9px] font-bold">
                            +
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 5: Direct Fast Contact & Assistance */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-[#141424] to-[#0d0d18] border border-neutral-800 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider">
                  DIRECT FACTORY CONTACT (SIALKOT, PK)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 hover:bg-emerald-900/40 text-emerald-400 font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@trywears.com"
                    className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                    <span>Email Us</span>
                  </a>
                </div>
                <div className="text-[10px] font-mono text-neutral-400 text-center pt-1">
                  Low MOQ 20 Pcs • Worldwide DDP Express Shipping
                </div>
              </div>

              {/* Bottom Quick Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 text-red-400" />
                <span>CLOSE NAVIGATION MENU</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Tap-Outside Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="xl:hidden fixed inset-0 top-14 sm:top-20 bg-black/75 backdrop-blur-xs z-40 pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 3. MAIN DYNAMIC PAGE CONTENT SWITCHER */}
      <main>
        {activePage === "home" && (
          <>
            {/* 1. Cinematic Hero Slider with 3D Garments Stage & 4 Background Video Loops */}
            <SportsHeroSlider slides={config?.hero?.slides || config?.heroSlides || []} />

            {/* 2. Sports & B2B Marquee */}
            <SportsB2BMarquee />

            {/* 3. Core Apparel & Gear Divisions */}
            <ScrollDeconstructed3DGarment />

            {/* 4. Real Bespoke Wholesale Products */}
            <CustomProductsShowcase />

            {/* 5. Real Artisan Leather & Wool Varsity Jacket Customizer Lab */}
            <section id="customizer" className="py-20 px-3 xs:px-4 sm:px-6 bg-neutral-900/40 dark:bg-black/80 border-y border-neutral-200/60 dark:border-neutral-800 transition-colors">
              <div className="w-full max-w-[2160px] mx-auto space-y-10 px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-14">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
                    INTERACTIVE 2D / 3D EXPORT ATELIER
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
                    TRY WEARS SPORTSWEAR &amp; GEAR DESIGN STUDIO
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-xl mx-auto">
                    Multi-product customizer for Compression Sets, Varsity Jackets, Bomber Jackets, Bra Sets, Crop Sets, and Retro Tracksuits with live canvas pixel recoloring, custom text, numbers, and draggable logo graphics.
                  </p>
                </div>

                <TShirtCustomizer
                  product={DEFAULT_CUSTOMIZER_PRODUCT}
                  onAddToCart={handleAddToCart}
                  onNavigateToQuote={(prodInfo) => navigateToQuote(prodInfo)}
                />
              </div>
            </section>

            {/* 6. Global Brands & Federations Trust Marquee */}
            <BrandLogosMarqueeSection />

            {/* 8. Factory Live Video Showcase */}
            <FactoryLiveVideoShowcase />

            {/* 9. Fashion Wear Custom Video Section */}
            <FashionWearCustomVideoSection onNavigatePage={navigateTo} />
          </>
        )}

        {/* Dedicated Try Products B2B Catalog Page */}
        {(activePage === "catalog" || activePage === "try-products") && (
          <CatalogPage
            initialFolder={catalogInitialFolder}
            initialCategoryName={catalogInitialCategory}
            onNavigatePage={navigateTo}
            onNavigateToQuote={(prodInfo) => {
              navigateToQuote(typeof prodInfo === "object" ? prodInfo : { name: prodInfo });
            }}
          />
        )}

        {/* Existing Pages */}
        {activePage === "about-us" && <AboutUsPage onNavigatePage={navigateTo} />}
        {activePage === "customization" && (
          <CustomizationPage 
            customizerProduct={DEFAULT_CUSTOMIZER_PRODUCT}
            onAddToCart={handleAddToCart}
            onNavigatePage={navigateTo}
            onNavigateToQuote={(prodInfo) => navigateToQuote(prodInfo)}
          />
        )}
        {activePage === "quality-process" && <QualityProcessPage onNavigatePage={navigateTo} />}
        {activePage === "sampling-policies" && <SamplingPoliciesPage onNavigatePage={navigateTo} />}
        {activePage === "privacy-policy" && <PrivacyPolicyPage onNavigatePage={navigateTo} />}
        {activePage === "faq" && <FAQPage onNavigatePage={navigateTo} />}
        {activePage === "b2b-quote" && (
          <B2BQuotationPage
            onNavigatePage={navigateTo}
            preselectedProduct={selectedProductForQuote}
          />
        )}

        {/* Master Hub Pages */}
        {activePage === "services" && <ServicesPage onNavigatePage={navigateTo} />}
        {activePage === "support" && <SupportPage onNavigatePage={navigateTo} />}

        {/* 10 UK-Targeted Services & Support Pages */}
        {activePage === "design-customization" && <DesignCustomizationPage onNavigatePage={navigateTo} />}
        {activePage === "brand-customization" && <BrandCustomizationPage onNavigatePage={navigateTo} />}
        {activePage === "customize-your-product" && (
          <CustomizeYourProductPage onNavigatePage={navigateTo} onAddToCart={handleAddToCart} />
        )}
        {activePage === "sample-development" && <SampleDevelopmentPage onNavigatePage={navigateTo} />}
        {activePage === "bulk-production" && <BulkProductionPage onNavigatePage={navigateTo} />}
        {activePage === "shipping-policy" && <ShippingPolicyPage onNavigatePage={navigateTo} />}
        {activePage === "return-refund-policy" && <ReturnRefundPolicyPage onNavigatePage={navigateTo} />}
        {activePage === "terms-and-conditions" && <TermsConditionsPage onNavigatePage={navigateTo} />}
        {activePage === "moq-lead-time" && <MOQLeadTimePage onNavigatePage={navigateTo} />}
        {activePage === "order-process" && <OrderProcessPage onNavigatePage={navigateTo} />}
      </main>

      {/* 4. FOOTER WITH HIGH-CONTRAST TEXT & EXACT SERVICES & SUPPORT BLOCKS */}
      <footer className="relative z-30 bg-[#0b0b14] text-white border-t-2 border-neutral-700 pt-16 pb-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={config?.global?.logo || "/images/trylogo.png"} 
                alt="Try Wears Logo" 
                className="h-10 w-10 object-contain"
                referrerPolicy="no-referrer" 
              />
              <span className="font-display font-black text-xl text-white tracking-widest uppercase">
                {config?.global?.brandName || "TRY WEARS"}
              </span>
            </div>
            <p className="text-sm font-sans leading-relaxed text-neutral-100 font-normal">
              Direct OEM/ODM industrial manufacturing facility for world championship fight gear, heavyweight luxury streetwear, sublimated sportswear, and bespoke private label collections.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ISO 9001:2015 & CE CERTIFIED FACTORY</span>
            </div>
            
            {/* 7 Official Social Channels Bar in Brand Col */}
            <div className="pt-1 space-y-2">
              <span className="text-[10px] font-mono text-neutral-300 font-bold uppercase tracking-wider block">
                Official Social Networks (7):
              </span>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Col 2: EXACT "SERVICES" MENU BLOCK WITH PURPLE/MAGENTA ACCENT UNDERLINE */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <button
                onClick={() => navigateTo("services")}
                className="font-display font-black text-sm text-white uppercase tracking-wider hover:text-[#d946ef] transition-colors cursor-pointer block text-left"
              >
                SERVICES
              </button>
              {/* Exact Purple / Magenta Line under SERVICES */}
              <div className="w-8 h-1 bg-[#d946ef] rounded-full mt-1.5" />
            </div>

            <ul className="space-y-2.5 pt-2">
              {SERVICES_MENU_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-[#d946ef] transition-colors cursor-pointer text-neutral-100 hover:font-bold text-left text-xs"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: EXACT "SUPPORT" MENU BLOCK WITH PURPLE/MAGENTA ACCENT UNDERLINE */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <button
                onClick={() => navigateTo("support")}
                className="font-display font-black text-sm text-white uppercase tracking-wider hover:text-[#d946ef] transition-colors cursor-pointer block text-left"
              >
                SUPPORT
              </button>
              {/* Exact Purple / Magenta Line under SUPPORT */}
              <div className="w-8 h-1 bg-[#d946ef] rounded-full mt-1.5" />
            </div>

            <ul className="space-y-2.5 pt-2">
              {SUPPORT_MENU_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-[#d946ef] transition-colors cursor-pointer text-neutral-100 hover:font-bold text-left text-xs flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {item.hasBadge && (
                      <span className="w-4 h-4 rounded-full bg-[#d946ef]/30 border border-[#d946ef]/60 text-[#f0abfc] flex items-center justify-center text-[10px] font-bold">
                        +
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Factory Contact & Quick Dispatches */}
          <div className="space-y-4 font-mono text-xs">
            <h4 className="font-display font-black text-sm text-white uppercase tracking-widest">
              Direct Factory Contact
            </h4>
            <div className="space-y-2.5 text-neutral-100">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff4d4d] shrink-0" />
                <span className="text-white font-medium">Small Industrial Estate, Sialkot, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff4d4d] shrink-0" />
                <span className="text-white font-medium">export@trywears.com</span>
              </div>
              <a 
                href={getWhatsAppUrl("Hello TRYWEARS, I would like to inquire about manufacturing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white font-bold group-hover:text-emerald-400">{WHATSAPP_DISPLAY} (WhatsApp 24/7 Desk)</span>
              </a>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-2 pt-2">
              <span className="text-xs text-white uppercase font-bold block">
                Get Wholesale Price Catalog (£ GBP):
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="bg-[#141424] border border-neutral-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-300 focus:outline-none focus:border-[#E21D1D] w-full"
                />
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-bold uppercase transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  {contactSubmitting ? "..." : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {contactSuccess && (
                <span className="text-xs text-emerald-400 font-bold block">✓ Catalog link dispatched!</span>
              )}
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 mt-10 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-200">
          <div className="font-medium">
            © {new Date().getFullYear()} TRY WEARS SPORTSWEAR & COMBAT APPAREL MANUFACTURING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-white font-bold">
            <span>SIALKOT INDUSTRIAL DIVISION</span>
            <span
              onClick={openAdminModal}
              className="cursor-default select-none hover:text-red-500/70 transition-colors"
              title=""
            >
              •
            </span>
            <span>UK & EUROPE DDP LOGISTICS</span>
          </div>
        </div>
      </footer>

      {/* Shopping Bag Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart || []}
        cartItems={cart || []}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          navigateTo("b2b-quote");
        }}
      />

      {/* B2B Free Sign Up / Member Unlock Modal */}
      <AuthModal />

      {/* Hidden B2B Buyer Leads Admin Vault (Accessed via Ctrl+Shift+A or #admin) */}
      <AdminLeadsModal />

      {/* Persistent Live WhatsApp Chat Widget */}
      <WhatsAppChatWidget />

      {/* Developer Sports Font Switcher (Live Preview & Switcher) */}
      <SportsFontSwitcher />
    </div>
  );
}

export default App;
