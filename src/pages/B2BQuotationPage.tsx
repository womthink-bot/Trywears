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
  DollarSign,
  Clock,
  Layers,
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
  Zap,
  SlidersHorizontal,
  ChevronUp,
  X,
  ExternalLink,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES_DATA, CategoryProduct, WholesalePricing } from "../data/categoriesData";
import { SocialLinks } from "../components/SocialLinks";
import { getWhatsAppUrl } from "../components/WhatsAppChatWidget";

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
  pricing?: WholesalePricing;
  unitType?: string;
  setInclusions?: string;
}

export function getTierUnitPrice(pricing: WholesalePricing | undefined, qty: number): string {
  if (!pricing || !pricing.tiers || pricing.tiers.length === 0) return "22.00";
  for (const t of pricing.tiers) {
    if (t.maxQty === null && qty >= t.minQty) return t.unitPrice.toFixed(2);
    if (t.maxQty !== null && qty >= t.minQty && qty <= t.maxQty) return t.unitPrice.toFixed(2);
  }
  return pricing.tiers[0].unitPrice.toFixed(2);
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
  // Sidebar Catalog Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("all");
  const [selectedSubCategoryTab, setSelectedSubCategoryTab] = useState("all");
  const [visibleProductsCount, setVisibleProductsCount] = useState(12);
  const [isCatalogSidebarOpen, setIsCatalogSidebarOpen] = useState(true);
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

  // Available Sub-Categories for current category selection
  const availableSubCategories = useMemo(() => {
    if (selectedCategoryTab === "all") {
      const map = new Map<string, { id: string; name: string }>();
      CATEGORIES_DATA.forEach((c) => {
        (c.subCategories || []).forEach((sub) => {
          if (!map.has(sub.id)) {
            map.set(sub.id, sub);
          }
        });
      });
      return Array.from(map.values());
    }
    const cat = CATEGORIES_DATA.find((c) => c.id === selectedCategoryTab);
    return cat?.subCategories || [];
  }, [selectedCategoryTab]);

  // Filtered products for the sidebar catalog browser
  const filteredProducts = useMemo(() => {
    return allCatalogProducts.filter((product) => {
      // Category Filter
      let matchCat = true;
      if (selectedCategoryTab !== "all") {
        if (selectedCategoryTab === "sports") matchCat = product.categoryName.toLowerCase().includes("sports");
        else if (selectedCategoryTab === "gym") matchCat = product.categoryName.toLowerCase().includes("gym") || product.categoryName.toLowerCase().includes("fitness");
        else if (selectedCategoryTab === "street") matchCat = product.categoryName.toLowerCase().includes("street");
        else if (selectedCategoryTab === "jackets") matchCat = product.categoryName.toLowerCase().includes("jacket");
        else matchCat = product.categoryName.toLowerCase().includes(selectedCategoryTab.toLowerCase());
      }
      if (!matchCat) return false;

      // Sub-Category Filter
      if (selectedSubCategoryTab !== "all") {
        const prodSub = (product.subCategory || "").toLowerCase().trim();
        const activeSub = selectedSubCategoryTab.toLowerCase().trim();
        const matchSub =
          prodSub.includes(activeSub) ||
          activeSub.includes(prodSub) ||
          (product.tags && product.tags.some((t) => t.toLowerCase().includes(activeSub)));
        if (!matchSub) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchArt = product.articleNumber.toLowerCase().includes(q);
        const matchSub = product.subCategory.toLowerCase().includes(q);
        const matchFab = product.fabric ? product.fabric.toLowerCase().includes(q) : false;
        return matchName || matchArt || matchSub || matchFab;
      }

      return true;
    });
  }, [allCatalogProducts, selectedCategoryTab, selectedSubCategoryTab, searchQuery]);

  // Tagged Line Items State
  const [taggedItems, setTaggedItems] = useState<TaggedInquiryItem[]>(() => {
    const defaultProduct = allCatalogProducts[0];
    const initQty = 50;
    const initialPrice = defaultProduct?.pricing ? getTierUnitPrice(defaultProduct.pricing, initQty) : "22.50";
    return [
      {
        id: "item-default-1",
        articleCode: defaultProduct?.articleNumber || "TW-STR-0101",
        name: defaultProduct?.name || "Oversized Heavyweight 500 GSM French Terry Boxy Hoodie",
        category: defaultProduct?.categoryName || "Streetwear & Hoodies",
        image: defaultProduct?.image || "https://ik.imagekit.io/pngplvaq1/Try%20Products/SPORTS%20WEARS/VOLLYBALL%20UNIFORM/Vollyball%20Uniform%20Womens/TRY_12501.webp?updatedAt=1791625660898",
        fabric: FABRIC_OPTIONS[0],
        gsm: "500 GSM",
        colorway: "Vintage Washed Acid Charcoal / Pantone 19-4008 TCX",
        brandingTechnique: BRANDING_METHODS[0],
        privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
        sizes: {
          XS: 5,
          S: 10,
          M: 15,
          L: 12,
          XL: 8,
          "2XL": 0,
          "3XL": 0,
          "4XL": 0,
          Custom: 0
        },
        totalUnits: initQty,
        targetUnitPrice: initialPrice,
        notes: "Peach sanded finish with custom silicon high-density logo and distressed cuffs.",
        pricing: defaultProduct?.pricing,
        unitType: defaultProduct?.pricing?.unitType || "piece",
        setInclusions: defaultProduct?.pricing?.setInclusions
      }
    ];
  });

  const [expandedItemId, setExpandedItemId] = useState<string | null>("item-default-1");
  const [autoTaggedNotification, setAutoTaggedNotification] = useState<string | null>(null);

  // Uploaded Tech Pack & Blueprint Files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Buyer & Company Contact State
  const [buyerInfo, setBuyerInfo] = useState({
    companyName: "",
    brandWebsite: "",
    fullName: "",
    email: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
    deliveryCountry: "",
    targetDeliveryDate: "",
    estimatedBudget: "$5,000 - $15,000 (Core Collection Launch)",
    incoterm: "DDP (Doorstep Delivery with Duty & Taxes Paid)",
    ndaRequested: true,
    includePhysicalSample: true
  });

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqReferenceNumber, setRfqReferenceNumber] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Handle incoming preselected product (from "Request Tech Pack RFQ" button)
  useEffect(() => {
    if (!preselectedProduct) return;

    const pName = typeof preselectedProduct === "string" ? preselectedProduct : preselectedProduct.name;
    if (!pName) return;

    const matched = allCatalogProducts.find((p) => {
      if (preselectedProduct.articleNumber && p.articleNumber === preselectedProduct.articleNumber) return true;
      if (preselectedProduct.id && p.id === preselectedProduct.id) return true;
      if (p.name.trim().toLowerCase() === pName.trim().toLowerCase()) return true;
      if (preselectedProduct.image && p.image === preselectedProduct.image) return true;
      return false;
    });

    const initQty = preselectedProduct.quantity || (preselectedProduct.pricing ? preselectedProduct.pricing.startingMOQ : 50);
    const resolvedPricing = preselectedProduct.pricing || matched?.pricing;
    const initPrice = preselectedProduct.targetUnitPrice
      ? parseFloat(preselectedProduct.targetUnitPrice)
      : resolvedPricing
      ? parseFloat(getTierUnitPrice(resolvedPricing, initQty))
      : 22.5;

    const articleCode =
      preselectedProduct.articleNumber ||
      matched?.articleNumber ||
      `TW-${(preselectedProduct.category || "OEM").substring(0, 3).toUpperCase()}-${String(Date.now()).slice(-4)}`;

    const newItem: TaggedInquiryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      articleCode,
      name: matched?.name || pName,
      category: matched?.categoryName || preselectedProduct.categoryName || preselectedProduct.category || "Custom Manufacturing",
      image: preselectedProduct.image || matched?.image || "https://ik.imagekit.io/pngplvaq1/Try%20Products/SPORTS%20WEARS/VOLLYBALL%20UNIFORM/Vollyball%20Uniform%20Womens/TRY_12501.webp?updatedAt=1791625660898",
      fabric: preselectedProduct.fabric || matched?.fabric || FABRIC_OPTIONS[0],
      gsm: preselectedProduct.gsm || matched?.gsm || "300 GSM",
      colorway: "Primary Catalog Colorway / Custom Pantone",
      brandingTechnique: BRANDING_METHODS[0],
      privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
      sizes: {
        XS: Math.round(initQty * 0.1),
        S: Math.round(initQty * 0.2),
        M: Math.round(initQty * 0.3),
        L: Math.round(initQty * 0.25),
        XL: Math.round(initQty * 0.15),
        "2XL": 0,
        "3XL": 0,
        "4XL": 0,
        Custom: 0
      },
      totalUnits: initQty,
      targetUnitPrice: String(initPrice),
      notes: `Tagged from product page. Target Qty: ${initQty} ${preselectedProduct.unitType || "units"}. Quoted Tier Rate: $${initPrice}/unit.`,
      pricing: resolvedPricing,
      unitType: preselectedProduct.unitType || resolvedPricing?.unitType || "piece",
      setInclusions: resolvedPricing?.setInclusions
    };

    setTaggedItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          totalUnits: initQty,
          targetUnitPrice: String(initPrice),
          pricing: resolvedPricing,
          unitType: newItem.unitType
        };
        return copy;
      }
      const filtered = prev.filter((it) => !it.articleCode.includes("STR-0101"));
      return [newItem, ...filtered];
    });

    setExpandedItemId(newItem.id);
    setAutoTaggedNotification(`✓ Tagged: ${newItem.name} (${initQty} Units @ $${initPrice}/unit)`);

    // Smooth scroll directly to the form top
    setTimeout(() => {
      const formEl = document.getElementById("rfq-main-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }, [preselectedProduct, allCatalogProducts]);

  // Handler: Add Catalog Product to Tagged Items
  const handleTagProduct = (product: CategoryProduct & { categoryName: string; articleNumber: string }) => {
    const totalUnits = 50;
    const resolvedPrice = product.pricing ? getTierUnitPrice(product.pricing, totalUnits) : "18.50";
    const newItem: TaggedInquiryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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
        S: 10,
        M: 15,
        L: 12,
        XL: 8,
        "2XL": 0,
        "3XL": 0,
        "4XL": 0,
        Custom: 0
      },
      totalUnits,
      targetUnitPrice: resolvedPrice,
      notes: `Based on model ${product.name} with custom brand label.`,
      pricing: product.pricing,
      unitType: product.pricing?.unitType || "piece",
      setInclusions: product.pricing?.setInclusions
    };

    setTaggedItems((prev) => {
      const exists = prev.some((p) => p.articleCode === product.articleNumber);
      if (exists) return prev;
      return [...prev, newItem];
    });
    setExpandedItemId(newItem.id);
    setAutoTaggedNotification(`✓ Added to RFQ Form: ${product.name}`);
  };

  // Handler: Add Custom Non-Catalog Item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim()) return;

    const newItem: TaggedInquiryItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      articleCode: `TW-BESPOKE-${String(taggedItems.length + 1).padStart(2, "0")}`,
      name: customItemName.trim(),
      category: customItemCategory,
      image: "https://ik.imagekit.io/pngplvaq1/Try%20Products/SPORTS%20WEARS/VOLLYBALL%20UNIFORM/Vollyball%20Uniform%20Womens/TRY_12501.webp?updatedAt=1791625660898",
      fabric: FABRIC_OPTIONS[0],
      gsm: "Custom GSM",
      colorway: "Custom Colorway / Pantone",
      brandingTechnique: BRANDING_METHODS[0],
      privateLabelTrims: [TRIMS_LIST[0], TRIMS_LIST[1]],
      sizes: {
        XS: 5,
        S: 10,
        M: 15,
        L: 12,
        XL: 8,
        "2XL": 0,
        "3XL": 0,
        "4XL": 0,
        Custom: 0
      },
      totalUnits: 50,
      targetUnitPrice: "22.50",
      notes: "Custom bespoke product specification submitted via tech pack."
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

  // Handler: Update Size Breakdown with Dynamic Tier Pricing
  const handleUpdateSize = (id: string, sizeKey: keyof TaggedInquiryItem["sizes"], value: number) => {
    setTaggedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newSizes = { ...item.sizes, [sizeKey]: Math.max(0, value || 0) };
          const newTotal = Object.values(newSizes).reduce<number>((a, b) => a + (Number(b) || 0), 0);
          const autoUnitPrice = item.pricing ? getTierUnitPrice(item.pricing, newTotal) : item.targetUnitPrice;
          return { ...item, sizes: newSizes, totalUnits: newTotal, targetUnitPrice: autoUnitPrice };
        }
        return item;
      })
    );
  };

  // Handler: Update Quantity directly
  const handleUpdateTotalUnits = (id: string, newTotal: number) => {
    setTaggedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const qty = Math.max(1, newTotal);
          const autoUnitPrice = item.pricing ? getTierUnitPrice(item.pricing, qty) : item.targetUnitPrice;
          // Scale sizes proportionally
          const currentSum: number = Object.values(item.sizes).reduce<number>((a, b) => a + (Number(b) || 0), 0) || 1;
          const ratio: number = qty / currentSum;
          const newSizes = {
            XS: Math.round(item.sizes.XS * ratio),
            S: Math.round(item.sizes.S * ratio),
            M: Math.round(item.sizes.M * ratio),
            L: Math.round(item.sizes.L * ratio),
            XL: Math.round(item.sizes.XL * ratio),
            "2XL": Math.round(item.sizes["2XL"] * ratio),
            "3XL": Math.round(item.sizes["3XL"] * ratio),
            "4XL": Math.round(item.sizes["4XL"] * ratio),
            Custom: 0
          };
          return { ...item, totalUnits: qty, targetUnitPrice: autoUnitPrice, sizes: newSizes };
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
      const unitCost = parseFloat(item.targetUnitPrice) || 20;
      return sum + unitCost * (item.totalUnits || 0);
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
    }, 1000);
  };

  // Copy RFQ Code
  const handleCopyRef = () => {
    navigator.clipboard.writeText(rfqReferenceNumber);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Direct WhatsApp Inquiry format
  const handleWhatsAppInstantQuote = () => {
    const itemsSummary = taggedItems
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.name} (${it.totalUnits} ${it.unitType || "units"} @ $${it.targetUnitPrice}/u)`
      )
      .join("\n");

    const msg = `*NEW B2B RFQ INQUIRY - TRY WEARS SIALKOT FACTORY*
*Company:* ${buyerInfo.companyName || "Private Brand"}
*Buyer Name:* ${buyerInfo.fullName || "Buyer"}
*Email:* ${buyerInfo.email || "Pending"}
*Delivery Destination:* ${buyerInfo.deliveryCountry || "International"}
*Total Units:* ${overallUnits} Units
*Est. Total Value:* $${estimatedBulkTotalUSD.toFixed(2)} USD

*Products Tagged in RFQ:*
${itemsSummary}

Please review our specs and send the official Proforma Invoice & counter-sample dispatch timeline.`;

    window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#E21D1D] selection:text-white pb-36 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-[#070709]/90 to-[#070709]" />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(226, 29, 29, 0.4) 1px, transparent 0)`,
            backgroundSize: "44px 44px"
          }}
        />
      </div>

      {/* Top Status & Breadcrumb Header */}
      <div className="border-b border-neutral-900 bg-black/90 backdrop-blur-xl sticky top-0 z-40">
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
            <span className="text-[#E21D1D] font-bold">B2B QUOTATION FORM</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider font-bold text-neutral-300">
                DIRECT SIALKOT FACTORY RFQ GATEWAY
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-neutral-800 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>STRICT NDA GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* ============================================================== */}
        {/* SUCCESS RECEIPT (AFTER FORM SUBMISSION)                        */}
        {/* ============================================================== */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-8 font-mono"
          >
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-widest uppercase">
                <span>FORMAL B2B RFQ SUBMITTED & ENCRYPTED UNDER NDA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                INQUIRY DISPATCHED SUCCESSFULLY!
              </h2>

              <p className="text-sm text-neutral-300 font-sans max-w-xl mx-auto leading-relaxed">
                Thank you, <span className="text-white font-bold">{buyerInfo.fullName || "Valued Buyer"}</span>. Your multi-product tech pack and specifications have been routed to our Lead Manufacturing Engineer in Sialkot.
              </p>
            </div>

            {/* Reference Number & Quick Actions */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">RFQ INQUIRY REFERENCE NUMBER:</span>
                <span className="text-2xl font-display font-black text-[#E21D1D] tracking-wider">{rfqReferenceNumber}</span>
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
              <h3 className="text-sm font-black text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-[#E21D1D]" />
                <span>INQUIRY LINE ITEMS ({taggedItems.length} Products • {overallUnits} Total Units)</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {taggedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-black overflow-hidden border border-white/10 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#E21D1D] font-bold block">{item.articleCode}</span>
                        <h4 className="font-display font-bold text-white uppercase text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-neutral-400 text-[10px]">{item.fabric} • {item.brandingTechnique}</span>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-neutral-800 sm:pl-4">
                      <span className="text-white font-bold block text-sm">{item.totalUnits} {item.unitType === "set" ? "Sets" : "Units"}</span>
                      <span className="text-emerald-400 text-[11px]">Est. ${item.targetUnitPrice} / unit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setTaggedItems([]);
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Another RFQ
              </button>

              <button
                onClick={() => onNavigatePage("home")}
                className="px-8 py-3.5 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.4)] cursor-pointer"
              >
                Return to Home Storefront
              </button>
            </div>
          </motion.div>
        ) : (

          /* ============================================================== */
          /* PRIMARY VIEW: THE B2B RFQ & TECH PACK QUOTATION FORM          */
          /* ============================================================== */
          <div className="space-y-6">

            {/* UNMISTAKABLE FORM IDENTITY HEADER (No confusion with product catalog) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border-2 border-neutral-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E21D1D]/15 via-transparent to-transparent pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21D1D]/20 border border-[#E21D1D]/50 text-[#ff4d4d] text-xs font-mono font-black tracking-widest uppercase">
                    <ClipboardList className="w-4 h-4 text-[#ff4d4d]" />
                    <span>OFFICIAL FACTORY RFQ & TECH PACK FORM</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white uppercase">
                    REQUEST FACTORY DIRECT TECH PACK QUOTE
                  </h1>

                  <p className="text-neutral-300 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                    Specify your garments, quantities, custom fabrics, and branding below. Our Sialkot engineering team will review your specs and email an official PDF Proforma Invoice with factory pricing in 2–4 hours.
                  </p>
                </div>

                {/* Form Progress Stepper Badges */}
                <div className="flex flex-wrap md:flex-col gap-2 shrink-0 font-mono text-[11px]">
                  <div className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>1. Products & Sizes</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-700 text-black flex items-center justify-center text-[9px] font-bold">2</span>
                    <span>2. Buyer & Logistics</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-neutral-700 text-black flex items-center justify-center text-[9px] font-bold">3</span>
                    <span>3. Tech Pack Files</span>
                  </div>
                </div>
              </div>

              {/* Notification Banner when an item was pre-tagged */}
              {autoTaggedNotification && (
                <div className="mt-5 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold">{autoTaggedNotification}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoTaggedNotification(null)}
                    className="text-neutral-400 hover:text-white text-xs font-mono"
                  >
                    Dismiss ✕
                  </button>
                </div>
              )}
            </div>

            {/* 2-COLUMN LAYOUT: MAIN FORM ON LEFT (70%), CATEGORIES & SUMMARY ON RIGHT (30%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* ============================================================ */}
              {/* LEFT COLUMN: THE ACTUAL QUOTATION FORM (70% WIDTH)          */}
              {/* ============================================================ */}
              <div className="lg:col-span-8 space-y-8" id="rfq-main-form">
                <form onSubmit={handleSubmitQuotation} className="space-y-8">

                  {/* -------------------------------------------------------- */}
                  {/* STEP 1: CONFIGURE TAGGED GARMENTS, SIZES & SPECS        */}
                  {/* -------------------------------------------------------- */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                          STEP 01 • GARMENTS & CUSTOM SPECIFICATIONS
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
                          <Package className="w-5 h-5 text-[#E21D1D]" />
                          <span>SELECTED PRODUCTS ({taggedItems.length})</span>
                        </h2>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsCustomItemModalOpen(true)}
                          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#E21D1D]" />
                          <span>+ Add Custom Item</span>
                        </button>
                      </div>
                    </div>

                    {/* Tagged Items List */}
                    <div className="space-y-6">
                      {taggedItems.map((item, idx) => {
                        const isExpanded = expandedItemId === item.id;
                        const itemSubtotal = item.totalUnits * (parseFloat(item.targetUnitPrice) || 0);

                        return (
                          <div
                            key={item.id}
                            className="rounded-3xl bg-neutral-900/80 border-2 border-neutral-800/90 overflow-hidden shadow-lg transition-all"
                          >
                            {/* Product Header Bar */}
                            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 border-b border-neutral-800">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/10 overflow-hidden flex-shrink-0 p-1 flex items-center justify-center">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-black/80 text-[#ff4d4d] font-mono text-[10px] font-bold border border-red-900/40">
                                      {item.articleCode}
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                                      {item.category}
                                    </span>
                                  </div>

                                  <h3 className="font-display font-black text-white text-base sm:text-lg uppercase line-clamp-1">
                                    {item.name}
                                  </h3>

                                  <div className="flex items-center gap-3 text-xs font-mono">
                                    <span className="text-emerald-400 font-bold">
                                      ${item.targetUnitPrice} / {item.unitType === "set" ? "Set" : "Unit"}
                                    </span>
                                    <span className="text-neutral-500">•</span>
                                    <span className="text-white font-bold">
                                      Total: {item.totalUnits} {item.unitType === "set" ? "Sets" : "Units"}
                                    </span>
                                    <span className="text-neutral-500">•</span>
                                    <span className="text-neutral-300">
                                      Est. Subtotal: <strong className="text-emerald-400">${itemSubtotal.toFixed(2)}</strong>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Toggle & Delete Buttons */}
                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <span>{isExpanded ? "Collapse Specs" : "Edit Sizes & Trims"}</span>
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>

                                {taggedItems.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                    title="Remove Item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Expanded Specifications Form */}
                            {isExpanded && (
                              <div className="p-5 sm:p-6 space-y-6 bg-black/40">

                                {/* 1. Wholesale Tier Calculator & Quantity Stepper */}
                                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 font-mono">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                      <span className="text-xs font-bold text-white uppercase block">
                                        ORDER QUANTITY & APPLIED WHOLESALE TIER
                                      </span>
                                      <span className="text-[10px] text-neutral-400">
                                        Higher volume automatically unlocks lower Sialkot factory direct unit rates.
                                      </span>
                                    </div>

                                    {/* Quick Quantity Presets */}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      {[25, 50, 100, 250, 500, 1000].map((q) => (
                                        <button
                                          key={q}
                                          type="button"
                                          onClick={() => handleUpdateTotalUnits(item.id, q)}
                                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                            item.totalUnits === q
                                              ? "bg-[#E21D1D] text-white shadow-sm"
                                              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                          }`}
                                        >
                                          {q}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* 5 Wholesale Tiers Visual Strip */}
                                  {item.pricing?.tiers && (
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                                      {item.pricing.tiers.map((tier, tIdx) => {
                                        const isActive =
                                          (tier.maxQty === null && item.totalUnits >= tier.minQty) ||
                                          (tier.maxQty !== null &&
                                            item.totalUnits >= tier.minQty &&
                                            item.totalUnits <= tier.maxQty);

                                        return (
                                          <div
                                            key={tIdx}
                                            onClick={() => handleUpdateTotalUnits(item.id, tier.minQty)}
                                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                              isActive
                                                ? "bg-emerald-950/70 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500 scale-102"
                                                : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                                            }`}
                                          >
                                            <span className="text-[9px] block text-neutral-400 uppercase font-bold">
                                              {tier.tierName} ({tier.minQty}{tier.maxQty ? `–${tier.maxQty}` : "+"})
                                            </span>
                                            <span
                                              className={`font-display font-black text-sm block my-0.5 ${
                                                isActive ? "text-emerald-400" : "text-white"
                                              }`}
                                            >
                                              ${tier.unitPrice.toFixed(2)}
                                            </span>
                                            <span className="text-[8.5px] text-neutral-500 block">
                                              {tier.savingsPercent > 0 ? `-${tier.savingsPercent}% OFF` : "MOQ Base"}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>

                                {/* 2. Size Breakdown Grid */}
                                <div className="space-y-2 font-mono text-xs">
                                  <div className="flex items-center justify-between">
                                    <label className="font-bold text-neutral-300 uppercase text-[11px] flex items-center gap-1.5">
                                      <span>SIZE BREAKDOWN GRID (TOTAL: {item.totalUnits} UNITS)</span>
                                    </label>
                                    <span className="text-[10px] text-neutral-500">
                                      Enter quantity per size (sum matches total)
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                    {(["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"] as const).map((sz) => (
                                      <div key={sz} className="space-y-1 text-center">
                                        <span className="text-[10px] font-bold text-neutral-400 block">{sz}</span>
                                        <input
                                          type="number"
                                          min={0}
                                          value={item.sizes[sz] || 0}
                                          onChange={(e) => handleUpdateSize(item.id, sz, parseInt(e.target.value) || 0)}
                                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2 text-center text-white font-mono text-xs font-bold focus:outline-none focus:border-[#E21D1D]"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* 3. Fabric, GSM, Colorway & Branding Specifications */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                                  <div className="space-y-1.5">
                                    <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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
                                    <label className="font-bold text-neutral-300 uppercase text-[10px] block">
                                      Colorway / Pantone Shade
                                    </label>
                                    <input
                                      type="text"
                                      value={item.colorway}
                                      onChange={(e) => handleUpdateItemField(item.id, "colorway", e.target.value)}
                                      placeholder="e.g. Midnight Black / Pantone 186C"
                                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#E21D1D]"
                                    />
                                  </div>

                                  <div className="space-y-1.5">
                                    <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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

                                {/* 4. Private Label Trims Checklist */}
                                <div className="space-y-2 font-mono text-xs">
                                  <label className="font-bold text-neutral-300 uppercase text-[10px] block">
                                    Included Private Label Trims & Packaging (Check to Include)
                                  </label>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {TRIMS_LIST.map((trim, tIdx) => {
                                      const isChecked = item.privateLabelTrims.includes(trim);
                                      return (
                                        <label
                                          key={tIdx}
                                          className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                                            isChecked
                                              ? "bg-neutral-900 border-[#E21D1D]/60 text-white"
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

                                {/* 5. Special Manufacturing Notes for this item */}
                                <div className="space-y-1.5 font-mono text-xs">
                                  <label className="font-bold text-neutral-300 uppercase text-[10px] block">
                                    Garment Construction & Fit Notes
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
                  </div>

                  {/* -------------------------------------------------------- */}
                  {/* STEP 2: BUYER PROFILE, COMPANY & SHIPPING LOGISTICS     */}
                  {/* -------------------------------------------------------- */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
                    <div className="border-b border-neutral-800 pb-5">
                      <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                        STEP 02 • BUYER CONTACT & SHIPPING LOGISTICS
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Building className="w-5 h-5 text-[#E21D1D]" />
                        <span>COMPANY PROFILE & DESTINATION</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                      
                      <div className="space-y-1.5">
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
                          Brand / Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerInfo.companyName}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, companyName: e.target.value })}
                          placeholder="e.g. Apex Combat Athletics"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
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
                        <label className="font-bold text-neutral-300 uppercase text-[10px] block">
                          Target Launch / Delivery Deadline
                        </label>
                        <input
                          type="date"
                          value={buyerInfo.targetDeliveryDate}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, targetDeliveryDate: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>

                    </div>

                    {/* Guarantees & Checkboxes */}
                    <div className="pt-3 border-t border-neutral-800 space-y-3 font-mono text-xs">
                      <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={buyerInfo.ndaRequested}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, ndaRequested: e.target.checked })}
                          className="accent-[#E21D1D] w-4 h-4"
                        />
                        <div className="text-[11px]">
                          <span className="text-white font-bold block">Apply Formal Mutual Non-Disclosure Agreement (NDA)</span>
                          <span className="text-neutral-400 text-[10px]">Protects all tech pack CADs, vector artwork, dimensions, and proprietary pattern grading from 3rd party disclosure.</span>
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
                          <span className="text-white font-bold block">Dispatch 1 Physical Pre-Production Sample First (100% Refundable on Bulk)</span>
                          <span className="text-neutral-400 text-[10px]">Inspect fabric feel, sizing, and embroidery in hand before authorizing bulk factory run.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* -------------------------------------------------------- */}
                  {/* STEP 3: TECH PACK & VECTOR BLUEPRINT UPLOAD             */}
                  {/* -------------------------------------------------------- */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6">
                    <div className="border-b border-neutral-800 pb-5">
                      <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                        STEP 03 • BLUEPRINTS & CAD FILES
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Upload className="w-5 h-5 text-[#E21D1D]" />
                        <span>TECH PACK & VECTOR ARTWORK UPLOAD</span>
                      </h2>
                      <p className="text-xs text-neutral-400 font-mono mt-1">
                        Formats: PDF, AI, PSD, SVG, PNG, ZIP. Protected under strict B2B NDA.
                      </p>
                    </div>

                    <label className="border-2 border-dashed border-neutral-800 hover:border-[#E21D1D] rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-neutral-900/40 hover:bg-neutral-900/70">
                      <Upload className="w-9 h-9 text-[#E21D1D] mb-3 animate-bounce" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        CLICK OR DRAG & DROP TECH PACK / VECTOR ARTWORK FILES
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 mt-1">
                        Upload graded size charts, embroidery vector outlines, or mockups
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
                          ATTACHED BLUEPRINT FILES ({uploadedFiles.length}):
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
                                className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* -------------------------------------------------------- */}
                  {/* SUBMISSION ACTION BUTTONS                               */}
                  {/* -------------------------------------------------------- */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border-2 border-neutral-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold text-[#E21D1D] uppercase tracking-widest block">
                        READY TO DISPATCH RFQ TO FACTORY
                      </span>
                      <h4 className="text-lg font-display font-black text-white uppercase">
                        {taggedItems.length} Products • {overallUnits} Total Units
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Formal Proforma Invoice emailed within 2–4 hours.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleWhatsAppInstantQuote}
                        className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Instant WhatsApp RFQ</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-2xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(226,29,29,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Encrypting RFQ...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Official RFQ</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              </div>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: STICKY ORDER SUMMARY & SIDEBAR CATALOG BROWSER */}
              {/* ("Categories ko side pr kr do taky form nazar aye")         */}
              {/* ============================================================ */}
              <div className="lg:col-span-4 space-y-6 sticky top-16">

                {/* 1. STICKY RFQ LIVE ORDER SUMMARY */}
                <div className="p-6 rounded-3xl bg-neutral-950 border-2 border-emerald-500/40 shadow-2xl space-y-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-emerald-400" />
                      <span>LIVE RFQ SUMMARY</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {taggedItems.length} ITEMS
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Total Configured Units:</span>
                      <strong className="text-white text-sm">{overallUnits} Units</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Est. Wholesale Total:</span>
                      <strong className="text-emerald-400 font-display font-black text-xl">
                        ${estimatedBulkTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </strong>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>100% Sample Cost Credit</span>
                      </div>
                      <p className="text-neutral-400 text-[10px]">
                        Prototype sample fee refunded entirely against your bulk production order.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSubmitQuotation}
                        className="w-full py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(226,29,29,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Submit Official RFQ Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. SIDEBAR CATALOG & CATEGORIES BROWSER */}
                {/* Clean, compact sidebar where categories live without pushing the form down */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#E21D1D]" />
                      <span className="font-bold text-white uppercase text-xs">TAG MORE FROM CATALOG</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCatalogSidebarOpen(!isCatalogSidebarOpen)}
                      className="text-neutral-400 hover:text-white text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isCatalogSidebarOpen ? "Hide" : "Show"}</span>
                      {isCatalogSidebarOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isCatalogSidebarOpen && (
                    <div className="space-y-4">
                      {/* Search Input */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search product or article..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E21D1D]"
                        />
                      </div>

                      {/* Category Buttons on the Side */}
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: "all", label: "All" },
                          { id: "sports", label: "Sports" },
                          { id: "gym", label: "Gym" },
                          { id: "street", label: "Street" },
                          { id: "jackets", label: "Jackets" }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategoryTab(cat.id);
                              setSelectedSubCategoryTab("all");
                              setVisibleProductsCount(12);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10.5px] uppercase font-bold transition-colors cursor-pointer ${
                              selectedCategoryTab === cat.id
                                ? "bg-[#E21D1D] text-white"
                                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      {/* Sub-Category Compact Dropdown */}
                      {availableSubCategories.length > 0 && (
                        <div className="space-y-1">
                          <label className="text-[10px] text-neutral-500 uppercase block">Subcategory:</label>
                          <select
                            value={selectedSubCategoryTab}
                            onChange={(e) => {
                              setSelectedSubCategoryTab(e.target.value);
                              setVisibleProductsCount(12);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-2 text-white text-xs focus:outline-none focus:border-[#E21D1D]"
                          >
                            <option value="all">All Subcategories ({filteredProducts.length})</option>
                            {availableSubCategories.map((sub) => (
                              <option key={sub.id} value={sub.name}>
                                {sub.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Compact Scrollable Product List */}
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredProducts.slice(0, visibleProductsCount).map((product) => {
                          const isAlreadyTagged = taggedItems.some(
                            (it) => it.articleCode === product.articleNumber
                          );

                          return (
                            <div
                              key={product.id}
                              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                                isAlreadyTagged
                                  ? "bg-neutral-900/90 border-emerald-500/40"
                                  : "bg-neutral-900/40 hover:bg-neutral-900 border-neutral-800"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-black overflow-hidden border border-white/5 flex-shrink-0 p-0.5">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-[9px] text-[#ff4d4d] font-bold block truncate">
                                    {product.articleNumber}
                                  </span>
                                  <h5 className="text-[11px] text-white font-bold truncate">
                                    {product.name}
                                  </h5>
                                  <span className="text-[9px] text-emerald-400">
                                    From ${(product.pricing?.startingWholesalePrice || 8.5).toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleTagProduct(product)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all shrink-0 cursor-pointer ${
                                  isAlreadyTagged
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-[#E21D1D] hover:bg-red-700 text-white"
                                }`}
                              >
                                {isAlreadyTagged ? "Tagged ✓" : "+ Tag"}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {filteredProducts.length > visibleProductsCount && (
                        <button
                          type="button"
                          onClick={() => setVisibleProductsCount((prev) => prev + 12)}
                          className="w-full py-1.5 text-center text-[10px] text-neutral-400 hover:text-white uppercase font-bold cursor-pointer transition-colors"
                        >
                          Load More (+{filteredProducts.length - visibleProductsCount})
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Direct Factory Support Channels */}
                <div className="p-5 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                    NEED ASSISTANCE WITH YOUR TECH PACK?
                  </span>
                  <SocialLinks variant="contact" />
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL: ADD CUSTOM BESPOKE NON-CATALOG ITEM                     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isCustomItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-6 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h3 className="text-base font-display font-black text-white uppercase">
                  Add Custom Bespoke Garment
                </h3>
                <button
                  onClick={() => setIsCustomItemModalOpen(false)}
                  className="text-neutral-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCustomItem} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-300 uppercase block">
                    Garment Name or Style Reference *
                  </label>
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
                  <label className="font-bold text-neutral-300 uppercase block">Category</label>
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
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-black uppercase cursor-pointer"
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
