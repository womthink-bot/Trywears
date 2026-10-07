import React, { useState, useEffect } from "react";
import { Type, Check, X, RotateCcw, ChevronDown, EyeOff, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface SportsFontOption {
  id: string;
  name: string;
  family: string;
  tag: string;
  vibe: string;
  preview: string;
}

export const SPORTS_FONTS: SportsFontOption[] = [
  {
    id: "chakra",
    name: "Chakra Petch",
    family: "'Chakra Petch', sans-serif",
    tag: "POPULAR",
    vibe: "Modern Championship & Technical Sportswear",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "oxanium",
    name: "Oxanium",
    family: "'Oxanium', sans-serif",
    tag: "TECHWEAR",
    vibe: "Futuristic Precision & Athletic Fightwear",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "teko",
    name: "Teko",
    family: "'Teko', sans-serif",
    tag: "JERSEY BLOCK",
    vibe: "Tall Condensed Varsity & Pro Sports Kits",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "bebas",
    name: "Bebas Neue",
    family: "'Bebas Neue', sans-serif",
    tag: "HEAVY IMPACT",
    vibe: "Bold Stadium & Combat Arena Typography",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "russo",
    name: "Russo One",
    family: "'Russo One', sans-serif",
    tag: "COMBAT / MMA",
    vibe: "Solid Heavy Punch & Fight League Heavyweight",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "rajdhani",
    name: "Rajdhani",
    family: "'Rajdhani', sans-serif",
    tag: "GEOMETRIC",
    vibe: "Crisp Sharp High-Performance Athletics",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "koulen",
    name: "Koulen",
    family: "'Koulen', sans-serif",
    tag: "STRIKE BLOCK",
    vibe: "Contemporary Combat & Athletic Block",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "anton",
    name: "Anton",
    family: "'Anton', sans-serif",
    tag: "STREETWEAR",
    vibe: "Heavy Weight 550 GSM Luxury Streetwear",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "barlow",
    name: "Barlow Condensed",
    family: "'Barlow Condensed', sans-serif",
    tag: "CLEAN GYM",
    vibe: "Sleek Athletic Compression & Training",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "saira",
    name: "Saira Condensed",
    family: "'Saira Condensed', sans-serif",
    tag: "MOTORSPORT",
    vibe: "Aggressive Velocity & Dynamic Performance",
    preview: "CORE APPAREL & GEAR"
  },
  {
    id: "aeromove",
    name: "Aeromove (Uploaded)",
    family: "'Aeromove', 'Chakra Petch', sans-serif",
    tag: "CUSTOM TTF",
    vibe: "Uploaded Demo Font",
    preview: "CORE APPAREL & GEAR"
  }
];

export const SportsFontSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Developer Mode toggle: Hidden by default for visitors.
  // Accessible only via URL query (?dev=true) or shortcut (Ctrl+Shift+D or Ctrl+Shift+F)
  const [isDevMode, setIsDevMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const urlParams = new URLSearchParams(window.location.search);
    const hasDevParam = urlParams.get("dev") === "true" || urlParams.get("dev") === "1" || urlParams.get("fontdev") === "true";
    const hasLocalFlag = localStorage.getItem("trywears_dev_font_visible") === "true";
    return hasDevParam || hasLocalFlag;
  });

  const [selectedFontId, setSelectedFontId] = useState<string>(() => {
    if (typeof window === "undefined") return "chakra";
    return localStorage.getItem("trywears_selected_font") || "chakra";
  });

  const applyFont = (fontId: string) => {
    const fontObj = SPORTS_FONTS.find((f) => f.id === fontId) || SPORTS_FONTS[0];
    setSelectedFontId(fontObj.id);
    if (typeof window !== "undefined") {
      localStorage.setItem("trywears_selected_font", fontObj.id);

      // Apply to DOM root CSS variable & inject dynamic style override
      document.documentElement.style.setProperty("--font-display", fontObj.family);
      document.documentElement.style.setProperty("--font-sports", fontObj.family);

      let styleEl = document.getElementById("dynamic-sports-font-style");
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "dynamic-sports-font-style";
        document.head.appendChild(styleEl);
      }
      styleEl.innerHTML = `
        h1, h2, h3, h4, h5, h6, .font-display, .font-sports, .font-sportfield {
          font-family: ${fontObj.family} !important;
        }
      `;
    }
  };

  // On mount: restore saved font without showing any UI to public visitors
  useEffect(() => {
    applyFont(selectedFontId);
  }, []);

  // Keyboard shortcut listener for Developer Mode (Ctrl + Shift + D or Ctrl + Shift + F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d" || e.key === "F" || e.key === "f")) {
        e.preventDefault();
        setIsDevMode((prev) => {
          const nextVal = !prev;
          localStorage.setItem("trywears_dev_font_visible", nextVal ? "true" : "false");
          if (nextVal) setIsOpen(true);
          return nextVal;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hideDevMode = () => {
    setIsDevMode(false);
    setIsOpen(false);
    localStorage.removeItem("trywears_dev_font_visible");
  };

  const currentFont = SPORTS_FONTS.find((f) => f.id === selectedFontId) || SPORTS_FONTS[0];

  // Completely hidden on public frontend unless in developer mode
  if (!isDevMode) {
    return null;
  }

  return (
    <aside aria-label="Sports font developer switcher" className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-[340px] sm:w-[380px] max-h-[520px] rounded-3xl bg-[#0c0c14] border border-neutral-700 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col text-white backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-red-950 via-[#181826] to-[#0c0c14] border-b border-neutral-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#E21D1D]/20 border border-[#E21D1D]/40 text-[#ff4d4d]">
                  <Type className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    SPORTS FONTS SELECTOR
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E21D1D] text-white font-bold">DEV ONLY</span>
                  </h4>
                  <span className="text-[10px] text-neutral-300 font-mono block">
                    Live Typography Studio (Press Ctrl+Shift+D to hide)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={hideDevMode}
                  title="Hide Dev Mode"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <EyeOff className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Font Options List */}
            <div className="p-3 overflow-y-auto space-y-2 flex-1 custom-scrollbar max-h-[360px]">
              {SPORTS_FONTS.map((font) => {
                const isSelected = selectedFontId === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => applyFont(font.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                      isSelected
                        ? "bg-[#181216] border-[#E21D1D] shadow-[0_0_20px_rgba(226,29,29,0.3)]"
                        : "bg-[#12121e] hover:bg-[#19192b] border-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-neutral-200"}`}>
                          {font.name}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                          isSelected ? "bg-red-500/30 text-red-300" : "bg-neutral-800 text-neutral-400"
                        }`}>
                          {font.tag}
                        </span>
                      </div>
                      
                      {/* Live Text Preview in this Font */}
                      <div 
                        className="text-sm text-white uppercase tracking-wider truncate"
                        style={{ fontFamily: font.family }}
                      >
                        {font.preview}
                      </div>

                      <span className="text-[10px] text-neutral-400 block truncate">
                        {font.vibe}
                      </span>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#E21D1D] text-white" : "bg-neutral-800 text-neutral-600 group-hover:text-neutral-300"
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Status */}
            <div className="p-3 bg-[#08080e] border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-300">
              <span className="truncate max-w-[180px]">
                Active: <strong className="text-emerald-400 font-bold">{currentFont.name}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => applyFont("chakra")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] text-[#ff4d4d]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={hideDevMode}
                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold"
                >
                  Hide Pill
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button (Visible only when dev mode is active) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#12121e] hover:bg-[#1a1a2e] text-white border border-neutral-600 hover:border-[#E21D1D] shadow-[0_10px_35px_rgba(0,0,0,0.8)] font-mono text-xs font-bold transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-pulse" />
        <Type className="w-4 h-4 text-[#ff4d4d]" />
        <span className="text-white">
          Font: <strong className="text-red-400 font-black">{currentFont.name}</strong>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>
    </aside>
  );
};
