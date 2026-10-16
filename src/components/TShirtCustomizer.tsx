import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Maximize2,
  Minimize2,
  ExternalLink,
  ShoppingBag,
  Send,
  RotateCcw,
  Sparkles,
  Layers,
  Palette,
  CheckCircle2,
  Eye,
  Info,
  Download,
  FileText
} from "lucide-react";
import { Product, CartItem } from "../types";

export interface TShirtCustomizerProps {
  product?: Product | null;
  onAddToCart?: (cartItem: CartItem) => void;
  onNavigateToQuote?: (productInfo: any) => void;
}

export const DEFAULT_CUSTOMIZER_PRODUCT: Product = {
  id: "custom-sportswear-atelier",
  name: "Try Wears Sportswear & Gear Design Studio",
  category: "Custom Sportswear",
  price: "$48.00",
  rating: 5,
  image: "/products/leather-jackets/leather_varsity.png",
  description: "Interactive 2D/3D Sportswear Customizer: Multi-product design studio for Compression Sets, Varsity Jackets, Quilted Bomber Sets, Sports Bras, Crop Sets, and Retro Tracksuits with live multi-panel pixel shading, text, numbers, and custom logo upload.",
  specs: [
    "6 Active Silhouettes: Compression Set, Bra & Shorts, Varsity Jacket, Bomber, Crop Set, Tracksuit",
    "Real-Time Multi-Panel Canvas Pixel Shading & Dynamic Colorway Recoloring",
    "Interactive Text, Player Numbers, and Custom Logo Upload with Real-Time Drag & Resize",
    "High-Resolution Live Studio Preview Mode with Instant Pixel-Perfect Rendering",
    "Direct Factory Tech Pack RFQ Generation & Wholesale MOQ Calculation"
  ],
  inStock: true,
  customizable: true
};

export const TShirtCustomizer: React.FC<TShirtCustomizerProps> = ({
  product,
  onAddToCart,
  onNavigateToQuote
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeProductName, setActiveProductName] = useState<string>("Compression Set");

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  }, []);

  // Keep track of active product inside the customizer iframe
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
          const win = iframe.contentWindow as any;
          if (win && win.cur && win.PM && win.PM[win.cur]) {
            setActiveProductName(win.PM[win.cur].title || "Sportswear Gear");
          }
        }
      } catch {
        // cross-origin safety
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  // Extract current customizer design state (colors, canvas snapshot with watermark)
  const extractDesignData = useCallback(() => {
    let title = activeProductName || "Custom Sportswear Gear";
    let shortCategory = "Custom Sportswear";
    let snapshotUrl = "";
    const customizationData: Record<string, string> = {};

    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const win = iframe.contentWindow as any;
        const curId = win.cur;
        if (curId && win.PM && win.PM[curId]) {
          title = win.PM[curId].title || title;
          shortCategory = win.PM[curId].short || shortCategory;

          if (win.gs && win.gs[curId] && win.gs[curId].cols) {
            const slots = win.PM[curId].slots || [];
            win.gs[curId].cols.forEach((col: string, idx: number) => {
              const slotName = slots[idx]?.n || `Panel ${idx + 1}`;
              customizationData[slotName] = col;
            });
          }
        }

        // Use watermarked canvas if provided by TRYWEARS.html
        if (typeof win.getWatermarkedCanvas === "function") {
          const wCanvas = win.getWatermarkedCanvas();
          if (wCanvas) snapshotUrl = wCanvas.toDataURL("image/png");
        } else {
          const canvas = iframe.contentDocument?.getElementById("cv") as HTMLCanvasElement | null;
          if (canvas) {
            snapshotUrl = canvas.toDataURL("image/png");
          }
        }
      }
    } catch (err) {
      console.warn("Could not extract canvas snapshot from customizer iframe:", err);
    }

    return { title, shortCategory, snapshotUrl, customizationData };
  }, [activeProductName]);

  // Send design directly to B2B Quote Form
  const handleSendToQuoteForm = useCallback((payloadOverride?: any) => {
    let data = payloadOverride;
    if (!data) {
      data = extractDesignData();
    }

    const title = data.title || activeProductName || "Custom Sportswear Gear";
    const shortCategory = data.shortCategory || "Custom Sportswear";
    const snapshotUrl = data.snapshotUrl || "";
    const customizationData = data.customizationData || {};

    const formattedSpecs = Object.entries(customizationData)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");

    const productInfo = {
      id: `custom-design-${Date.now()}`,
      articleNumber: `TW-CUST-${String(Date.now()).slice(-4)}`,
      name: `Try Wears Custom ${title}`,
      category: shortCategory,
      categoryName: shortCategory,
      image: snapshotUrl || product?.image || DEFAULT_CUSTOMIZER_PRODUCT.image,
      fabric: "280 GSM Poly-Spandex High-Compression Tricot / Sportswear Spec",
      gsm: "280-320 GSM",
      pricing: {
        startingMOQ: 50,
        unitType: "piece",
        tiers: [
          { minQty: 50, maxQty: 100, unitPrice: 38.0 },
          { minQty: 101, maxQty: 250, unitPrice: 34.0 },
          { minQty: 251, maxQty: null, unitPrice: 29.5 }
        ]
      },
      notes: `🎨 Direct Customizer Design Specs [trywear.com]:\nSilhouettes / Style: ${title}\n` +
        (formattedSpecs || "Standard Colorway") +
        `\n\nWatermarked CAD specification sheet attached from live design studio.`
    };

    if (onNavigateToQuote) {
      onNavigateToQuote(productInfo);
    } else {
      window.dispatchEvent(new CustomEvent("open-quote-page", { detail: productInfo }));
    }

    showToast(`Design ${title} sent directly to B2B Quote Form!`);
  }, [extractDesignData, activeProductName, onNavigateToQuote, product?.image, showToast]);

  // Handle postMessage communication from iframe (e.g. from internal "Send Design to Form" button)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "TRYWEARS_SEND_TO_FORM") {
        handleSendToQuoteForm(e.data.payload);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleSendToQuoteForm]);

  // Download watermarked image
  const handleDownloadImage = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const win = iframe.contentWindow as any;
        if (typeof win.downloadWatermarkedImage === "function") {
          win.downloadWatermarkedImage();
          showToast(`Image downloaded with trywear.com watermark!`);
          return;
        }
      }

      // Fallback if window function is not yet loaded
      const { title, snapshotUrl } = extractDesignData();
      if (snapshotUrl) {
        const link = document.createElement("a");
        link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-trywear.com.png`;
        link.href = snapshotUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Image downloaded with trywear.com watermark!`);
      }
    } catch (err) {
      console.warn("Could not trigger image download:", err);
      showToast("Download initiated!");
    }
  };

  const handleAddToCart = () => {
    const { title, shortCategory, snapshotUrl, customizationData } = extractDesignData();

    const customProduct: Product = {
      id: `custom-gear-${Date.now()}`,
      name: `Try Wears Custom ${title}`,
      category: shortCategory,
      price: "$48.00",
      rating: 5,
      image: snapshotUrl || product?.image || DEFAULT_CUSTOMIZER_PRODUCT.image,
      description: `Factory Custom ${title} engineered in Try Wears Design Studio with custom colorway specification: ${
        Object.entries(customizationData)
          .map(([k, v]) => `${k}: ${v}`)
          .join(" | ") || "Default Custom Colorway"
      }`,
      specs: product?.specs || DEFAULT_CUSTOMIZER_PRODUCT.specs,
      inStock: true,
      customizable: true
    };

    if (onAddToCart) {
      onAddToCart({
        product: customProduct,
        quantity: 1,
        selectedSize: "L (Custom Sizing)",
        customization: customizationData
      });
      showToast(`Customized ${title} added to Cart successfully!`);
    }
  };

  const handleResetColors = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentDocument) {
        const resetBtn = iframe.contentDocument.getElementById("partReset") as HTMLButtonElement | null;
        if (resetBtn) resetBtn.click();
      }
    } catch (err) {
      console.warn("Could not trigger reset:", err);
    }
  };

  const handlePreviewMode = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentDocument) {
        const pvBtn = iframe.contentDocument.getElementById("pvbtn") as HTMLButtonElement | null;
        if (pvBtn) pvBtn.click();
      }
    } catch (err) {
      console.warn("Could not trigger preview:", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${
        isFullScreen
          ? "fixed inset-0 z-50 bg-[#070b14] flex flex-col p-2 sm:p-4 overflow-hidden"
          : "relative w-full rounded-2xl overflow-hidden bg-[#070b14] border-2 border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col"
      }`}
    >
      {/* Top Customizer Control & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0d1424] border-b border-neutral-800 text-white z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-display font-black text-sm tracking-wider uppercase text-white">
              TRY WEARS <span className="text-[#E21D1D]">DESIGN STUDIO</span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-0.5 rounded bg-neutral-800/90 text-neutral-300 border border-neutral-700">
            {activeProductName}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Preview Toggle */}
          <button
            type="button"
            onClick={handlePreviewMode}
            title="Preview Mode"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-[#E21D1D]" />
            <span className="hidden md:inline">Studio Preview</span>
          </button>

          {/* Reset Colors */}
          <button
            type="button"
            onClick={handleResetColors}
            title="Reset Colors to Original"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold font-mono rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </button>

          {/* Download with Watermark trywear.com */}
          <button
            type="button"
            onClick={handleDownloadImage}
            title="Download Design with trywear.com Watermark"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase rounded-lg bg-[#E21D1D] hover:bg-red-600 text-white shadow-md shadow-red-900/40 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Image</span>
          </button>

          {/* Send Directly to Form / Quote */}
          <button
            type="button"
            onClick={() => handleSendToQuoteForm()}
            title="Send this Custom Design directly into B2B Quote Form"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send to Form</span>
          </button>

          {/* Add to Cart */}
          {onAddToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              title="Add design to cart"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          )}

          {/* Fullscreen Expand / Exit */}
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? "Exit Fullscreen (Esc)" : "Expand Fullscreen"}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
          >
            {isFullScreen ? (
              <Minimize2 className="w-4 h-4 text-amber-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-neutral-300" />
            )}
          </button>

          {/* Open in Standalone Tab */}
          <a
            href="/TRYWEARS.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Sportswear Designer in dedicated tab"
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Customizer Iframe Container */}
      <div className={`relative w-full ${isFullScreen ? "flex-1" : "h-[740px] sm:h-[820px]"}`}>
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070b14] text-neutral-300 space-y-3">
            <div className="w-10 h-10 border-4 border-[#E21D1D] border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Loading Try Wears 2D/3D Design Studio...
            </span>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src="/TRYWEARS.html"
          title="Try Wears Sportswear Designer"
          className="w-full h-full border-0 bg-transparent block"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs shadow-2xl border border-emerald-400 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom helper bar when not fullscreen */}
      {!isFullScreen && (
        <div className="px-4 py-2 bg-[#090d16] border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#E21D1D]" />
            <span>Select product above (1 · Product) → Pick panel colors (2 · Colors) → Add custom text &amp; logo → Download with trywear.com watermark or send direct to quote form.</span>
          </div>
          <div className="text-neutral-500 hidden sm:block">
            Watermarked PNG Export (trywear.com) · Direct B2B Quotation Form Transfer
          </div>
        </div>
      )}
    </div>
  );
};
