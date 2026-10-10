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
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SportsHeroSlider, HeroSlide } from "./components/SportsHeroSlider";
import { SportsB2BMarquee } from "./components/SportsB2BMarquee";
import { CustomProductsShowcase } from "./components/CustomProductsShowcase";
import { ScrollDeconstructed3DGarment } from "./components/ScrollDeconstructed3DGarment";
import { B2BFactoryCapabilities } from "./components/B2BFactoryCapabilities";
import { BrandLogosMarqueeSection } from "./components/BrandLogosMarqueeSection";
import { FactoryLiveVideoShowcase } from "./components/FactoryLiveVideoShowcase";
import { FashionWearCustomVideoSection } from "./components/FashionWearCustomVideoSection";
import { TShirtCustomizer, DEFAULT_CUSTOMIZER_PRODUCT } from "./components/TShirtCustomizer";
import { CartDrawer } from "./components/CartDrawer";
import { ThemeToggle } from "./components/ThemeToggle";
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
  const [config, setConfig] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [bannerText, setBannerText] = useState<string>(
    "★ FACTORY DIRECT B2B COMBAT WEAR & SPORTS APPAREL • LOW MOQ 30-50 PCS • EXPRESS UK & WORLDWIDE DDP AIR DISPATCH"
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
      <div className="bg-[#08080c] text-white py-2 px-4 sm:px-6 lg:px-10 xl:px-14 border-b border-neutral-800/80 overflow-hidden relative z-50">
        <div className="w-full flex items-center justify-between text-[9.5px] sm:text-[10px] font-mono tracking-widest font-black uppercase">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E21D1D] animate-ping shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none text-neutral-200">
              {bannerText}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <button
              onClick={() => navigateTo("sample-development")}
              className="hover:text-white transition-colors text-emerald-400 font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>EXPRESS 7-DAY SAMPLE DESK</span>
            </button>
            <span className="text-neutral-700">|</span>
            <span className="text-[#ff3b3b] font-bold tracking-wider">ISO 9001:2015 & CE CERTIFIED FACTORY</span>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE FULL-SCREEN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#07070b]/95 backdrop-blur-2xl border-b border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-3 sm:py-3.5 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Branded Logo */}
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-3.5 group text-left cursor-pointer shrink-0"
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl bg-neutral-900/60 p-1 border border-neutral-800 group-hover:border-[#E21D1D]/60 flex items-center justify-center shrink-0 transition-all duration-300 shadow-md">
              <img 
                src={config?.global?.logo || "/images/trylogo.png"} 
                alt="Try Wears Logo" 
                className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(226,29,29,0.3)]" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div>
              <span className="font-display font-black text-lg sm:text-xl lg:text-2xl tracking-[0.14em] text-white block uppercase leading-none group-hover:text-[#ff3b3b] transition-colors">
                {config?.global?.brandName || "TRY WEARS"}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#ff3b3b] block uppercase mt-1 whitespace-nowrap">
                {config?.global?.tagline || "OEM/ODM COMBAT SPORTS & ATHLETIC APPAREL FACTORY"}
              </span>
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

            {/* SERVICES Button (Clickable -> Services Page, Hover -> Dropdown) */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo("services")}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isServicesActive
                    ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 pt-2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="p-3 bg-[#0a0a12] border border-neutral-700 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.95)] space-y-1">
                  <button
                    onClick={() => navigateTo("services")}
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
                      onClick={() => navigateTo(item.page)}
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
              </div>
            </div>

            {/* SUPPORT Button (Clickable -> Support Page, Hover -> Dropdown) */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown("support")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigateTo("support")}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSupportActive
                    ? "text-[#ff3b3b] bg-[#e21d1d]/12 border border-[#e21d1d]/40 shadow-[0_0_15px_rgba(226,29,29,0.2)] font-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60 border border-transparent"
                }`}
              >
                <span>Support</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 pt-2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="p-3 bg-[#0a0a12] border border-neutral-700 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.95)] space-y-1">
                  <button
                    onClick={() => navigateTo("support")}
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
                      onClick={() => navigateTo(item.page)}
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
              </div>
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
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* High-Impact B2B Quote Action Button */}
            <button
              onClick={() => navigateTo("b2b-quote")}
              className={`hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg whitespace-nowrap active:scale-95 ${
                activePage === "b2b-quote"
                  ? "bg-red-700 text-white ring-2 ring-white shadow-[0_0_25px_rgba(226,29,29,0.6)]"
                  : "bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white shadow-[0_0_20px_rgba(226,29,29,0.4)] hover:shadow-[0_0_30px_rgba(226,29,29,0.6)] hover:scale-102"
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>GET B2B QUOTE</span>
            </button>

            {/* Theme Toggle Switcher */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />

            {/* Shopping Bag */}
            <button
              id="shopping-cart-button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:p-3 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 hover:border-neutral-600 transition-all cursor-pointer group shadow-md"
              title="Open Shipment Bag Inventory"
            >
              <ShoppingBag className="w-4 h-4 text-neutral-200 group-hover:text-white group-hover:scale-108 transition-transform" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E21D1D] text-white font-mono font-black text-[9px] h-5 w-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#07070b]">
                  {(cart || []).reduce((sum, i) => sum + (i?.quantity || 1), 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors cursor-pointer"
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
              className="xl:hidden border-t border-neutral-800 bg-[#0a0a10] px-5 py-5 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Main Links */}
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => navigateTo("home")}
                  className={`text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-colors flex items-center justify-between cursor-pointer ${
                    activePage === "home" ? "bg-[#E21D1D]/20 text-[#ff4d4d]" : "text-neutral-200"
                  }`}
                >
                  <span>Home</span>
                  {activePage === "home" && <span className="w-2 h-2 rounded-full bg-[#E21D1D]" />}
                </button>

                <button
                  onClick={() => navigateTo("about-us")}
                  className={`text-left py-2 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-colors flex items-center justify-between cursor-pointer ${
                    activePage === "about-us" ? "bg-[#E21D1D]/20 text-[#ff4d4d]" : "text-neutral-200"
                  }`}
                >
                  <span>About Us</span>
                  {activePage === "about-us" && <span className="w-2 h-2 rounded-full bg-[#E21D1D]" />}
                </button>

                {/* Mobile TRY PRODUCTS CATALOG ACCORDION */}
                <TryProductsMobileAccordion
                  onNavigateToCatalog={navigateToCatalog}
                  onOpenFolderModal={(node) => {
                    navigateToCatalog(node);
                  }}
                />
              </div>

              {/* Mobile SERVICES Section */}
              <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                <button
                  onClick={() => navigateTo("services")}
                  className="w-full text-left px-3 py-1 flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#d946ef] tracking-widest uppercase block">
                      SERVICES (ALL OVERVIEW)
                    </span>
                    <div className="w-6 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">View Page →</span>
                </button>

                {SERVICES_MENU_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigateTo(item.page)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      activePage === item.page
                        ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold"
                        : "text-neutral-200 hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </button>
                ))}
              </div>

              {/* Mobile SUPPORT Section */}
              <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                <button
                  onClick={() => navigateTo("support")}
                  className="w-full text-left px-3 py-1 flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#d946ef] tracking-widest uppercase block">
                      SUPPORT & POLICIES (OVERVIEW)
                    </span>
                    <div className="w-6 h-0.5 bg-[#d946ef] rounded-full mt-1" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">View Page →</span>
                </button>

                {SUPPORT_MENU_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigateTo(item.page)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      activePage === item.page
                        ? "bg-[#E21D1D]/20 text-[#ff4d4d] font-bold"
                        : "text-neutral-200 hover:bg-white/5"
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

              <div className="pt-2 border-t border-neutral-800">
                <button
                  onClick={() => navigateTo("b2b-quote")}
                  className="w-full py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase text-center cursor-pointer shadow-[0_0_20px_rgba(226,29,29,0.4)] flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>GET B2B QUOTATION / TECH PACK</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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

            {/* 5. 3D Bespoke Prototype Lab & Customizer */}
            <section id="customizer" className="py-20 px-4 sm:px-6 bg-neutral-900/40 dark:bg-black/80 border-y border-neutral-200/60 dark:border-neutral-800 transition-colors">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
                    INTERACTIVE BESPOKE ENGINEERING
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
                    3D BESPOKE PROTOTYPE LAB
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-md mx-auto">
                    Simulate colorways, custom leather paneling, embossed brand crests, and metallic piping with real-time B2B tech pack estimation.
                  </p>
                </div>

                <TShirtCustomizer
                  product={DEFAULT_CUSTOMIZER_PRODUCT}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </section>

            {/* 6. B2B Factory Lifecycle & Private Label Capabilities */}
            <B2BFactoryCapabilities onNavigatePage={navigateTo} />

            {/* 7. Global Brands & Federations Trust Marquee */}
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
            onNavigateToQuote={(prodName) => {
              navigateTo("b2b-quote");
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
          />
        )}
        {activePage === "quality-process" && <QualityProcessPage onNavigatePage={navigateTo} />}
        {activePage === "sampling-policies" && <SamplingPoliciesPage onNavigatePage={navigateTo} />}
        {activePage === "privacy-policy" && <PrivacyPolicyPage onNavigatePage={navigateTo} />}
        {activePage === "faq" && <FAQPage onNavigatePage={navigateTo} />}
        {activePage === "b2b-quote" && <B2BQuotationPage onNavigatePage={navigateTo} />}

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
            <span>•</span>
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

      {/* Persistent Live WhatsApp Chat Widget */}
      <WhatsAppChatWidget />

      {/* Developer Sports Font Switcher (Live Preview & Switcher) */}
      <SportsFontSwitcher />
    </div>
  );
}

export default App;
