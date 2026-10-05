import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Sparkles,
  Building,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  ChevronDown,
  Upload,
  FileText,
  FileCheck2,
  Lock,
  Package,
  Sliders,
  DollarSign,
  Clock,
  Layers,
  Scissors,
  Award,
  Globe,
  Phone,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Copy,
  Download,
  Send,
  MessageCircle,
  CheckCircle2,
  Tag,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES_DATA, CategoryProduct } from "../data/categoriesData";

interface B2BQuotationPageProps {
  onNavigatePage: (page: string) => void;
  preselectedProduct?: any;
}

export interface TaggedInquiryItem {
  id: string;
  articleCode: string;
  name: string;
  category: string;
  image: string;
  fabric: string;
  gsm: string;
  colorway: string;
  brandingTechnique: string;
  privateLabelTrims: string[];
  sizes: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    "2XL": number;
    "3XL": number;
    "4XL": number;
    Custom: number;
  };
  totalUnits: number;
  targetUnitPrice: string;
  notes: string;
}

const FABRIC_OPTIONS = [
  "450–550 GSM Organic French Terry (Heavyweight)",
  "380–420 GSM 100% Cotton Fleece",
  "1.2mm Full-Grain Drum-Dyed Cowhide Leather",
  "180–220 GSM Micro-Interlock Poly (Italian Dri-Fit)",
  "280 GSM Poly-Spandex High-Compression Tricot",
  "240 GSM Birdseye Mesh (Sublimation Grade)",
  "100% Ripstop Matte Nylon (Water-Resistant)",
  "Custom Fabric Blend (Specified in Notes)"
];

const BRANDING_METHODS = [
  "High-Density 3D Silicone Puff Print",
  "Japanese Tajima Computerized Embroidery",
  "Zero-Hand Italian Digital Sublimation",
  "24K Hot-Foil & Heated Leather Debossing",
  "Vintage Distressed Screen Print (Water-Based)",
  "Reflective High-Vis Heat Transfer",
  "Custom Chenille & Felt Patch Applique",
  "Laser-Etched Metal Crest / Rivets"
];

const TRIMS_LIST = [
  "Custom Damask Woven Neck Tags",
  "Recycled Frosted Zip-Lock Polybags with Barcode",
  "Embossed Genuine Leather Patch",
  "Laser-Engraved Gunmetal Aglets & Eyelets",
  "Heavyweight 400 GSM Brand Hangtags & String",
  "High-Grade YKK Metal Zippers",
  "Custom Satin Care & Size Labels"
];

export const B2BQuotationPage: React.FC<B2BQuotationPageProps> = ({
  onNavigatePage,
  preselectedProduct
}) => {
  // 1. Search & Filter State for Product Catalog Browser
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("all");
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false);
  const [customItemName, setCustomItemName] = useState("");
  const [customItemCategory, setCustomItemCategory] = useState("Streetwear & Hoodies");

  // Flattened product list with unique article codes
  const allCatalogProducts = useMemo(() => {
    const list: (CategoryProduct & { categoryName: string; articleNumber: string })[] = [];
    CATEGORIES_DATA.forEach((cat, catIdx) => {
      cat.products.forEach((prod, prodIdx) => {
        const prefix = cat.name.substring(0, 3).toUpperCase();
        const articleNumber = `TW-${prefix}-${String(catIdx + 1).padStart(2, "0")}${String(prodIdx + 1).padStart(2, "0")}`;
        list.push({
          ...prod,
          categoryName: cat.name,
          articleNumber
        });
      });
    });
    return list;
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allCatalogProducts.filter((p) => {
      const matchesCategory =
        selectedCategoryTab === "all" ||
        p.categoryName.toLowerCase().includes(selectedCategoryTab.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(selectedCategoryTab.toLowerCase());
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.articleNumber.toLowerCase().includes(query) ||
        p.subCategory.toLowerCase().includes(query) ||
        p.fabric.toLowerCase().includes(query) ||
        p.gsm.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allCatalogProducts, selectedCategoryTab, searchQuery]);

  // 2. Tagged Items in the RFQ Inquiry Tray
  const [taggedItems, setTaggedItems] = useState<TaggedInquiryItem[]>(() => {
    if (preselectedProduct) {
      return [
        {
          id: `item-${Date.now()}`,
          articleCode: preselectedProduct.articleNumber || "TW-CUSTOM-01",
          name: preselectedProduct.name,
          category: preselectedProduct.categoryName || "Custom Order",
          image: preselectedProduct.image || "/images/sports-wears/sportswearsP1.png",
          fabric: preselectedProduct.fabric || FABRIC_OPTIONS[0],
          gsm: preselectedProduct.gsm || "450 GSM",
          colorway: "Midnight Black / Custom Pantone",
          brandingTechnique: BRANDING_METHODS[0],
          privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
          sizes: {
            XS: 10,
            S: 25,
            M: 35,
            L: 35,
            XL: 20,
            "2XL": 10,
            "3XL": 0,
            "4XL": 0,
            Custom: 0
          },
          totalUnits: 135,
          targetUnitPrice: "28.50",
          notes: "Include high-density silicone puff on chest and custom woven neck tags."
        }
      ];
    }
    return [
      {
        id: `item-${Date.now()}`,
        articleCode: "TW-STR-0101",
        name: "550 GSM Heavyweight Oversized French Terry Hoodie",
        category: "STREET WEARS",
        image: "/images/street-wears/street_women_cropped_hoodie_set_v2.png",
        fabric: FABRIC_OPTIONS[0],
        gsm: "550 GSM",
        colorway: "Vintage Washed Black (#111111)",
        brandingTechnique: BRANDING_METHODS[0],
        privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1], TRIMS_LIST[3]],
        sizes: {
          XS: 10,
          S: 25,
          M: 35,
          L: 35,
          XL: 20,
          "2XL": 10,
          "3XL": 0,
          "4XL": 0,
          Custom: 0
        },
        totalUnits: 135,
        targetUnitPrice: "28.50",
        notes: "Peach-sanded finish, double-layer hood, metal aglets with engraved logo."
      }
    ];
  });

  const [expandedItemId, setExpandedItemId] = useState<string | null>(taggedItems[0]?.id || null);

  // 3. Buyer & Brand Form Fields
  const [buyerInfo, setBuyerInfo] = useState({
    companyName: "",
    brandWebsite: "",
    fullName: "",
    jobRole: "Brand Owner / Founder",
    email: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
    deliveryCountry: "United States",
    deliveryCity: "",
    targetDeliveryDate: "",
    estimatedBudget: "$5,000 - $15,000",
    incoterm: "DDP (Delivered Duty Paid - Air Courier)",
    additionalInstructions: "",
    ndaRequested: true,
    includePhysicalSample: true
  });

  // 4. File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqReferenceNumber, setRfqReferenceNumber] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Update Page Title
  useEffect(() => {
    document.title = "B2B Custom Quotation & Tech Pack Portal | TRYWEARS";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handler: Add Catalog Product to Tagged Items
  const handleTagProduct = (product: CategoryProduct & { categoryName: string; articleNumber: string }) => {
    const newItem: TaggedInquiryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      articleCode: product.articleNumber,
      name: product.name,
      category: product.categoryName,
      image: product.image,
      fabric: product.fabric || FABRIC_OPTIONS[0],
      gsm: product.gsm || "450 GSM",
      colorway: "Primary Catalog Colorway",
      brandingTechnique: BRANDING_METHODS[0],
      privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
      sizes: {
        XS: 5,
        S: 15,
        M: 25,
        L: 25,
        XL: 15,
        "2XL": 5,
        "3XL": 0,
        "4XL": 0,
        Custom: 0
      },
      totalUnits: 90,
      targetUnitPrice: "26.00",
      notes: `Based on model ${product.name} with custom brand label.`
    };

    setTaggedItems((prev) => [...prev, newItem]);
    setExpandedItemId(newItem.id);
  };

  // Handler: Add Non-Catalog Custom Item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    const newItem: TaggedInquiryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      articleCode: `TW-BESPOKE-${String(taggedItems.length + 1).padStart(2, "0")}`,
      name: customItemName.trim(),
      category: customItemCategory,
      image: "/images/sports-wears/sportswearsP1.png",
      fabric: FABRIC_OPTIONS[0],
      gsm: "Custom GSM",
      colorway: "Custom Colorway / Pantone",
      brandingTechnique: BRANDING_METHODS[0],
      privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
      sizes: {
        XS: 5,
        S: 15,
        M: 25,
        L: 25,
        XL: 15,
        "2XL": 5,
        "3XL": 0,
        "4XL": 0,
        Custom: 0
      },
      totalUnits: 90,
      targetUnitPrice: "25.00",
      notes: "Custom design submitted via attached tech pack."
    };

    setTaggedItems((prev) => [...prev, newItem]);
    setExpandedItemId(newItem.id);
    setCustomItemName("");
    setIsCustomItemModalOpen(false);
  };

  // Handler: Update Tagged Item Field
  const handleUpdateItemField = (id: string, field: keyof TaggedInquiryItem, value: any) => {
    setTaggedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Handler: Update Size Breakdown
  const handleUpdateSize = (id: string, sizeKey: keyof TaggedInquiryItem["sizes"], value: number) => {
    setTaggedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newSizes = { ...item.sizes, [sizeKey]: Math.max(0, value || 0) };
          const newTotal = Object.values(newSizes).reduce<number>((a, b) => a + (Number(b) || 0), 0);
          return { ...item, sizes: newSizes, totalUnits: newTotal };
        }
        return item;
      })
    );
  };

  // Handler: Toggle Trim Selection
  const handleToggleTrim = (id: string, trim: string) => {
    setTaggedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const exists = item.privateLabelTrims.includes(trim);
          const newTrims = exists
            ? item.privateLabelTrims.filter((t) => t !== trim)
            : [...item.privateLabelTrims, trim];
          return { ...item, privateLabelTrims: newTrims };
        }
        return item;
      })
    );
  };

  // Handler: Remove Tagged Item
  const handleRemoveItem = (id: string) => {
    if (taggedItems.length <= 1) {
      alert("At least 1 product must remain in the quotation request.");
      return;
    }
    setTaggedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler: File Uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArr]);
    }
  };

  const handleRemoveFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // Calculate Overall Inquiry Totals
  const overallUnits = useMemo(() => {
    return (taggedItems || []).reduce((sum, item) => sum + (item?.totalUnits || 0), 0);
  }, [taggedItems]);

  const estimatedBulkTotalUSD = useMemo(() => {
    return (taggedItems || []).reduce((sum, item) => {
      if (!item) return sum;
      const unitCost = parseFloat(item.targetUnitPrice) || 25;
      return sum + (unitCost * (item.totalUnits || 0));
    }, 0);
  }, [taggedItems]);

  // Handler: Submit Quotation
  const handleSubmitQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `TW-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqReferenceNumber(generatedRef);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  // Copy RFQ Code
  const handleCopyRef = () => {
    navigator.clipboard.writeText(rfqReferenceNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E21D1D] selection:text-white pb-36 relative overflow-hidden">
      
      {/* 1. CINEMATIC AMBIENT BACKGROUND VIDEO ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/videos/allPV.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.4] contrast-125 scale-105 opacity-25"
        />

        {/* Dark Gradient Vignettes for 100% Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#070709]/85 to-[#070709] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#E21D1D]/15 via-transparent to-transparent pointer-events-none" />

        {/* Coordinate Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(226, 29, 29, 0.4) 1px, transparent 0)`,
            backgroundSize: "44px 44px"
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* TOP FACTORY STATUS & BREADCRUMB                                */}
      {/* ============================================================== */}
      <div className="border-b border-neutral-900 bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>HOME</span>
            </button>
            <span className="text-neutral-700">/</span>
            <span className="text-[#E21D1D] font-bold">B2B QUOTATION & TECH PACK PORTAL</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-neutral-400">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider font-bold text-neutral-300">
                DIRECT SIALKOT FACTORY RFQ GATEWAY
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>STRICT NDA CONFIDENTIALITY GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN QUOTATION WORKFLOW OR SUCCESS RECEIPT                     */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
        
        {/* If Submitted: Show Comprehensive RFQ Confirmation Receipt */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold tracking-widest uppercase">
                <span>FORMAL B2B RFQ SUBMITTED & ENCRYPTED UNDER NDA</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                INQUIRY DISPATCHED SUCCESSFULLY!
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-xl mx-auto leading-relaxed">
                Thank you, <span className="text-white font-bold">{buyerInfo.fullName || "Valued Buyer"}</span>. Your multi-product tech pack and specifications have been routed to our Lead Manufacturing Engineer in Sialkot.
              </p>
            </div>

            {/* Reference Number & Quick Actions */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">RFQ INQUIRY REFERENCE NUMBER:</span>
                <span className="text-xl font-display font-black text-[#E21D1D] tracking-wider">{rfqReferenceNumber}</span>
              </div>

              <button
                onClick={handleCopyRef}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E21D1D]" />}
                <span>{copiedCode ? "Reference Copied!" : "Copy Reference"}</span>
              </button>
            </div>

            {/* Inquiry Summary Review */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-black text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-[#E21D1D]" />
                <span>INQUIRY LINE ITEMS ({taggedItems.length} Products • {overallUnits} Total Units)</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {taggedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-black overflow-hidden border border-white/10 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#E21D1D] font-bold block">{item.articleCode}</span>
                        <h4 className="font-display font-bold text-white uppercase text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-neutral-400 text-[10px]">{item.fabric} • {item.brandingTechnique}</span>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-neutral-800 sm:pl-4">
                      <span className="text-white font-bold block text-sm">{item.totalUnits} Units</span>
                      <span className="text-emerald-400 text-[11px]">Est. ${item.targetUnitPrice} / unit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="p-6 rounded-2xl bg-black/60 border border-neutral-800 space-y-3 font-mono text-xs">
              <h4 className="font-bold text-white uppercase flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-[#E21D1D]" />
                <span>WHAT HAPPENS NEXT?</span>
              </h4>
              <ul className="space-y-2 text-neutral-400 text-[11px]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">1.</span>
                  <span>Our Sialkot factory sample engineer will review your pattern, GSM, and vector files.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">2.</span>
                  <span>A formal PDF Proforma Invoice & digital CAD 3D virtual render will be emailed to <strong className="text-white">{buyerInfo.email || "your email"}</strong> within 4-6 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">3.</span>
                  <span>Physical pre-production counter-sample dispatched via DHL Express in 6-8 business days.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setTaggedItems([]);
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Another RFQ
              </button>

              <button
                onClick={() => onNavigatePage("home")}
                className="px-8 py-3.5 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] cursor-pointer"
              >
                Return to Home Storefront
              </button>
            </div>
          </motion.div>
        ) : (
          
          /* Form Content: Multi-Product Catalog Browser + Tagged Items Manager + Buyer Details */
          <form onSubmit={handleSubmitQuotation} className="space-y-12">
            
            {/* Header Title */}
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/15 border border-[#E21D1D]/40 text-[#E21D1D] text-xs font-mono font-black tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OEM / ODM MULTI-PRODUCT RFQ & TECH PACK BUILDER</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.08]">
                B2B CUSTOM QUOTATION &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E21D1D] via-red-400 to-white">
                  TECH PACK ATELIER.
                </span>
              </h1>

              <p className="text-neutral-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Browse our factory catalog, tag multiple products, specify custom sizes, GSM, and private label trims, or attach your own CAD blueprints under strict NDA protection.
              </p>
            </div>

            {/* ========================================================== */}
            {/* SECTION 1: INTERACTIVE PRODUCT SEARCH & CATALOG TAGGER     */}
            {/* ========================================================== */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                    STEP 01 • SELECT & TAG PRODUCTS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                    FACTORY CATALOG & ARTICLE SEARCH
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCustomItemModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E21D1D]" />
                    <span>Add Custom Non-Catalog Item</span>
                  </button>
                </div>
              </div>

              {/* Search Bar & Category Tabs */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Product Name, Article Number (e.g. TW-SPO-0101), GSM, or Subcategory..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#E21D1D]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Quick Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "all", label: "All Categories" },
                    { id: "sports", label: "Sports Wears" },
                    { id: "gym", label: "Gym & Fitness" },
                    { id: "street", label: "Street Wears" },
                    { id: "jackets", label: "Jackets" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedCategoryTab(tab.id)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategoryTab === tab.id
                          ? "bg-[#E21D1D] text-white font-black shadow-[0_0_15px_rgba(226,29,29,0.4)]"
                          : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtered Products Scrollable Shelf */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredProducts.slice(0, 16).map((product) => {
                  const isAlreadyTagged = taggedItems.some((item) => item.articleCode === product.articleNumber);
                  return (
                    <div
                      key={product.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                        isAlreadyTagged
                          ? "bg-neutral-900/90 border-[#E21D1D]/50 shadow-[0_0_15px_rgba(226,29,29,0.2)]"
                          : "bg-neutral-900/50 hover:bg-neutral-900 border-neutral-800"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="relative aspect-square w-full rounded-xl bg-black/60 overflow-hidden flex items-center justify-center p-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#E21D1D] font-mono text-[9px] font-bold">
                            {product.articleNumber}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono text-neutral-400 block uppercase line-clamp-1">
                            {product.subCategory}
                          </span>
                          <h4 className="text-xs font-display font-black text-white uppercase line-clamp-1 group-hover:text-red-400 transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">
                            {product.gsm} • {product.moq}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTagProduct(product)}
                        className={`w-full mt-3 py-2 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAlreadyTagged
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#E21D1D] hover:bg-red-700 text-white shadow-md hover:scale-102"
                        }`}
                      >
                        {isAlreadyTagged ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Tagged In RFQ (+1)</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Tag to Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

            </section>

            {/* ========================================================== */}
            {/* SECTION 2: TAGGED INQUIRY ITEMS TRAY (DETAILED SPECS)      */}
            {/* ========================================================== */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                    STEP 02 • CONFIGURE SIZES, GSM & TRIMS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                    INQUIRY LINE ITEMS ({taggedItems.length} Products Tagged)
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block text-[9px] uppercase">TOTAL INQUIRY QUANTITY:</span>
                    <span className="text-emerald-400 font-bold text-sm">{overallUnits} Units</span>
                  </div>
                </div>
              </div>

              {/* Tagged Items List */}
              <div className="space-y-4">
                {taggedItems.map((item, idx) => {
                  const isExpanded = expandedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-3xl bg-neutral-900/70 border border-neutral-800 overflow-hidden transition-all"
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                        className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-black overflow-hidden border border-white/10 flex-shrink-0 p-1">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-[#E21D1D]/15 border border-[#E21D1D]/30 text-[#E21D1D] font-mono text-[9px] font-bold">
                                {item.articleCode}
                              </span>
                              <span className="text-neutral-400 text-xs font-mono uppercase">{item.category}</span>
                            </div>

                            <h4 className="text-sm sm:text-base font-display font-black text-white uppercase mt-0.5">
                              {item.name}
                            </h4>

                            <span className="text-[11px] font-mono text-neutral-400">
                              {item.totalUnits} Units • {item.fabric.split("(")[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(item.id);
                            }}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Remove Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Accordion Body: In-Depth Product Customization Form */}
                      {isExpanded && (
                        <div className="p-6 sm:p-8 border-t border-neutral-800 bg-black/40 space-y-6">
                          
                          {/* Sizing Grid (Per Size Quantity) */}
                          <div className="space-y-2">
                            <label className="text-xs font-mono font-bold text-neutral-300 uppercase block">
                              Quantity Breakdown by Size (Total: {item.totalUnits} Units)
                            </label>

                            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                              {(["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "Custom"] as const).map((sizeKey) => (
                                <div key={sizeKey} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                                  <span className="text-[10px] font-mono font-bold text-neutral-400 block uppercase">
                                    {sizeKey}
                                  </span>
                                  <input
                                    type="number"
                                    min={0}
                                    value={item.sizes[sizeKey] || 0}
                                    onChange={(e) => handleUpdateSize(item.id, sizeKey, parseInt(e.target.value) || 0)}
                                    className="w-full bg-black/60 border border-white/10 rounded-lg py-1 text-center font-mono text-xs font-bold text-white mt-1 focus:outline-none focus:border-[#E21D1D]"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Material, Colorway & Branding Specifications */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                            <div className="space-y-1.5">
                              <label className="font-bold text-neutral-400 uppercase text-[10px]">
                                Fabric & GSM Specification
                              </label>
                              <select
                                value={item.fabric}
                                onChange={(e) => handleUpdateItemField(item.id, "fabric", e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E21D1D]"
                              >
                                {FABRIC_OPTIONS.map((fab, fIdx) => (
                                  <option key={fIdx} value={fab}>
                                    {fab}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-bold text-neutral-400 uppercase text-[10px]">
                                Colorway / Pantone Shade
                              </label>
                              <input
                                type="text"
                                value={item.colorway}
                                onChange={(e) => handleUpdateItemField(item.id, "colorway", e.target.value)}
                                placeholder="e.g. Midnight Black, Pantone 186C"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E21D1D]"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-bold text-neutral-400 uppercase text-[10px]">
                                Primary Branding Method
                              </label>
                              <select
                                value={item.brandingTechnique}
                                onChange={(e) => handleUpdateItemField(item.id, "brandingTechnique", e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E21D1D]"
                              >
                                {BRANDING_METHODS.map((bm, bIdx) => (
                                  <option key={bIdx} value={bm}>
                                    {bm}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Private Label Trims Checklist */}
                          <div className="space-y-2 font-mono text-xs">
                            <label className="font-bold text-neutral-400 uppercase text-[10px] block">
                              Included Private Label Trims & Packaging
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                              {TRIMS_LIST.map((trim, tIdx) => {
                                const isChecked = item.privateLabelTrims.includes(trim);
                                return (
                                  <label
                                    key={tIdx}
                                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                                      isChecked
                                        ? "bg-neutral-900 border-[#E21D1D]/50 text-white"
                                        : "bg-black/40 border-neutral-800 text-neutral-400 hover:text-white"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleTrim(item.id, trim)}
                                      className="accent-[#E21D1D] w-3.5 h-3.5"
                                    />
                                    <span className="text-[11px] font-mono line-clamp-1">{trim}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* Special Manufacturing Notes for this item */}
                          <div className="space-y-1.5 font-mono text-xs">
                            <label className="font-bold text-neutral-400 uppercase text-[10px]">
                              Item Specific Manufacturing Notes & Cut Details
                            </label>
                            <textarea
                              rows={2}
                              value={item.notes}
                              onChange={(e) => handleUpdateItemField(item.id, "notes", e.target.value)}
                              placeholder="e.g. Peach-sanded handfeel, drop shoulder cut, flatlock stitching on armholes, custom barcoding on polybag..."
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white text-xs font-mono focus:outline-none focus:border-[#E21D1D]"
                            />
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </section>

            {/* ========================================================== */}
            {/* SECTION 3: TECH PACK & VECTOR ARTWORK UPLOADER             */}
            {/* ========================================================== */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
              
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                  STEP 03 • ATTACH BLUEPRINTS & CAD FILES
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  TECH PACK & VECTOR ARTWORK UPLOAD
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Protected under strict B2B Non-Disclosure Agreement (NDA). Formats: PDF, AI, PSD, SVG, PNG, ZIP (Max 100MB).
                </p>
              </div>

              <label className="border-2 border-dashed border-neutral-800 hover:border-[#E21D1D] rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-neutral-900/40 hover:bg-neutral-900/70">
                <Upload className="w-10 h-10 text-[#E21D1D] mb-3 animate-bounce" />
                <span className="text-xs font-mono font-bold text-white uppercase">
                  CLICK OR DRAG & DROP TECH PACK / VECTOR ARTWORK FILES
                </span>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">
                  Upload multiple files • Graded size charts • Mockup previews
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase block">
                    ATTACHED FILES ({uploadedFiles.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileText className="w-4 h-4 text-[#E21D1D] flex-shrink-0" />
                          <span className="text-white truncate font-bold">{file.name}</span>
                          <span className="text-neutral-500 text-[10px]">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </section>

            {/* ========================================================== */}
            {/* SECTION 4: BUYER, BRAND & LOGISTICS INFORMATION            */}
            {/* ========================================================== */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
              
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                  STEP 04 • BUYER & DELIVERY LOGISTICS
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  BRAND PROFILE & SHIPPING DESTINATION
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Brand / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerInfo.companyName}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, companyName: e.target.value })}
                    placeholder="e.g. Prime Athletic Co."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Brand Website or Instagram
                  </label>
                  <input
                    type="text"
                    value={buyerInfo.brandWebsite}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, brandWebsite: e.target.value })}
                    placeholder="e.g. www.primeathletics.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Buyer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerInfo.fullName}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, fullName: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Official Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerInfo.email}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                    placeholder="e.g. sourcing@brand.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={buyerInfo.phoneCountryCode}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, phoneCountryCode: e.target.value })}
                      className="w-16 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-center text-white focus:outline-none focus:border-[#E21D1D]"
                    />
                    <input
                      type="tel"
                      required
                      value={buyerInfo.phoneNumber}
                      onChange={(e) => setBuyerInfo({ ...buyerInfo, phoneNumber: e.target.value })}
                      placeholder="555-019-2834"
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Delivery Country & City *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerInfo.deliveryCountry}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, deliveryCountry: e.target.value })}
                    placeholder="e.g. United States, Los Angeles"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Target Launch / Delivery Deadline
                  </label>
                  <input
                    type="date"
                    value={buyerInfo.targetDeliveryDate}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, targetDeliveryDate: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Estimated Total Budget (USD)
                  </label>
                  <select
                    value={buyerInfo.estimatedBudget}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, estimatedBudget: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  >
                    <option>$2,000 - $5,000 (Small Batch Sampling)</option>
                    <option>$5,000 - $15,000 (Core Collection Launch)</option>
                    <option>$15,000 - $50,000 (Scale Retail Production)</option>
                    <option>$50,000+ (Enterprise Multi-Country Wholesale)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase text-[10px]">
                    Shipping Preference
                  </label>
                  <select
                    value={buyerInfo.incoterm}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, incoterm: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  >
                    <option>DDP (Doorstep Delivery with Duty & Taxes Paid)</option>
                    <option>Express Air Courier (DHL / FedEx Express)</option>
                    <option>Sea Cargo (FOB Karachi Port for 1000+ Units)</option>
                    <option>Air Cargo (CIF Airport Dispatch)</option>
                  </select>
                </div>

              </div>

              {/* Guarantees & Checkboxes */}
              <div className="pt-4 border-t border-neutral-800 space-y-3 font-mono text-xs">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={buyerInfo.ndaRequested}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, ndaRequested: e.target.checked })}
                    className="accent-[#E21D1D] w-4 h-4"
                  />
                  <div className="text-[11px]">
                    <span className="text-white font-bold block">Apply Formal Mutual Non-Disclosure Agreement (NDA)</span>
                    <span className="text-neutral-400 text-[10px]">Protects all vector artwork, dimensions, and proprietary pattern grading from 3rd party disclosure.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={buyerInfo.includePhysicalSample}
                    onChange={(e) => setBuyerInfo({ ...buyerInfo, includePhysicalSample: e.target.checked })}
                    className="accent-[#E21D1D] w-4 h-4"
                  />
                  <div className="text-[11px]">
                    <span className="text-white font-bold block">Dispatch 1 Physical Pre-Production Sample First (7-Day Courier)</span>
                    <span className="text-neutral-400 text-[10px]">Inspect fabric feel, sizing, and embroidery in hand before authorizing bulk factory run.</span>
                  </div>
                </label>
              </div>

            </section>

            {/* ========================================================== */}
            {/* SUBMIT BUTTON & SUMMARY BAR                                */}
            {/* ========================================================== */}
            <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left font-mono">
                <span className="text-xs font-bold text-[#E21D1D] uppercase tracking-widest block">
                  READY TO DISPATCH RFQ TO SIALKOT ENGINEERING
                </span>
                <h4 className="text-lg sm:text-xl font-display font-black text-white uppercase">
                  {taggedItems.length} Products • {overallUnits} Total Units Configured
                </h4>
                <p className="text-xs text-neutral-400">
                  Estimated Sampling: 6–8 Days • Bulk Production: 12–16 Days • Formal Proforma via Email in 4 Hours.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-5 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-sm font-black uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(226,29,29,0.5)] cursor-pointer hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Encrypting & Dispatching RFQ...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Tech Pack & Lock In Factory Direct Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL: ADD CUSTOM NON-CATALOG ITEM                             */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isCustomItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-lg font-display font-black text-white uppercase">
                  Add Custom Bespoke Product
                </h3>
                <button
                  onClick={() => setIsCustomItemModalOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCustomItem} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase">Product Name or Style Reference *</label>
                  <input
                    type="text"
                    required
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    placeholder="e.g. Heavyweight Puffer Vest with Sherpa Collar"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase">Category</label>
                  <select
                    value={customItemCategory}
                    onChange={(e) => setCustomItemCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                  >
                    <option>Streetwear & Hoodies</option>
                    <option>Sports & Match Uniforms</option>
                    <option>Gym & Activewear Compression</option>
                    <option>Combat Gear & Gloves</option>
                    <option>Leather Jackets & Outerwear</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCustomItemModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-black uppercase"
                  >
                    Add to Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
