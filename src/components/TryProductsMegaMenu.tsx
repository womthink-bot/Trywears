import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  X,
  ExternalLink,
  Flame,
  Dumbbell,
  Shirt,
  ShieldCheck,
  PackageCheck
} from "lucide-react";
import { FolderNode, FolderFileItem } from "../types/folderTree";
import defaultTreeData from "../data/imagekit_folder_tree.json";
import { FolderGalleryModal } from "./FolderGalleryModal";
import { ProductImageLightbox } from "./ProductImageLightbox";

// Category Icons Mapping
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "sports wears": <Shirt className="w-4 h-4 text-[#ff3b3b]" />,
  "gym & fitness wears": <Dumbbell className="w-4 h-4 text-[#38bdf8]" />,
  "street wears": <Flame className="w-4 h-4 text-[#fbbf24]" />,
  "jackets": <ShieldCheck className="w-4 h-4 text-[#34d399]" />
};

const CATEGORY_COLORS: Record<string, string> = {
  "sports wears": "#ff3b3b",
  "gym & fitness wears": "#38bdf8",
  "street wears": "#fbbf24",
  "jackets": "#34d399"
};

interface TryProductsMegaMenuProps {
  onNavigateToQuote?: (initialProduct?: string) => void;
  onNavigateToCatalog?: (folder?: FolderNode, categoryName?: string) => void;
}

export const TryProductsMegaMenu: React.FC<TryProductsMegaMenuProps> = ({
  onNavigateToQuote,
  onNavigateToCatalog
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tree, setTree] = useState<FolderNode>(defaultTreeData as unknown as FolderNode);
  const [selectedCatIndex, setSelectedCatIndex] = useState<number>(0);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Gallery Modal State (Fallback)
  const [galleryFolder, setGalleryFolder] = useState<FolderNode | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState<FolderFileItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxFolderName, setLightboxFolderName] = useState<string>("");
  const [lightboxFolderPath, setLightboxFolderPath] = useState<string>("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Try to load latest tree from server API if updated
  useEffect(() => {
    fetch("/api/imagekit/tree")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.tree) {
          setTree(data.tree);
        }
      })
      .catch(() => {});
  }, []);

  // Listen to global open-tryproducts-folder event
  useEffect(() => {
    const handleCustomOpen = (e: any) => {
      if (e.detail) {
        if (onNavigateToCatalog) {
          onNavigateToCatalog(e.detail);
        } else {
          setGalleryFolder(e.detail);
          setIsGalleryOpen(true);
        }
        setIsOpen(false);
      }
    };
    window.addEventListener("open-tryproducts-folder", handleCustomOpen);
    return () => window.removeEventListener("open-tryproducts-folder", handleCustomOpen);
  }, [onNavigateToCatalog]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Main Categories (Children of Root)
  const categories = useMemo(() => tree.children || [], [tree]);

  const activeCategory = categories[selectedCatIndex] || categories[0];
  const subCategories = activeCategory?.children || [];
  const activeSubCategory = subCategories[selectedSubIndex] || subCategories[0];
  const deepChildren = activeSubCategory?.children || [];

  // Open Catalog for any folder
  const handleOpenFolder = (node: FolderNode) => {
    setIsOpen(false);
    if (onNavigateToCatalog) {
      onNavigateToCatalog(node);
    } else {
      setGalleryFolder(node);
      setIsGalleryOpen(true);
    }
  };

  // Open Catalog for category
  const handleOpenCategory = (catName?: string) => {
    setIsOpen(false);
    if (onNavigateToCatalog) {
      onNavigateToCatalog(undefined, catName || "all");
    }
  };

  // Open Lightbox from gallery
  const handleOpenImage = (
    images: FolderFileItem[],
    index: number,
    folderPath: string,
    folderName: string
  ) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxFolderPath(folderPath);
    setLightboxFolderName(folderName);
    setIsLightboxOpen(true);
  };

  // Pre-fill quote form
  const handleRequestQuote = (info: { name: string; image: string; path: string }) => {
    if (onNavigateToQuote) {
      onNavigateToQuote(info.name);
    }
  };

  // Quick Search Matches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: FolderNode[] = [];

    function findFolders(node: FolderNode) {
      if (node.name.toLowerCase().includes(q) && node.path !== "/Try Products") {
        results.push(node);
      }
      (node.children || []).forEach(findFolders);
    }

    (tree.children || []).forEach(findFolders);
    return results.slice(0, 12);
  }, [tree, searchQuery]);

  return (
    <>
      {/* Navbar Dropdown Anchor */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
            isOpen
              ? "text-white bg-[#E21D1D] shadow-[0_0_20px_rgba(226,29,29,0.5)] scale-102 font-black"
              : "text-neutral-200 hover:text-white hover:bg-neutral-800/80 border border-neutral-700/60"
          }`}
          title="Browse All Try Products Folders & Samples"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3b3b]" />
          </span>
          <span className="font-extrabold text-white tracking-wide">TRY PRODUCTS</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/60 text-[#ff7070] border border-red-500/30 font-black">
            2,372
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-neutral-400"
            }`}
          />
        </button>

        {/* Desktop Mega-Menu Floating Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[92vw] max-w-5xl bg-[#090910] border border-neutral-700/80 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[100] overflow-hidden flex flex-col backdrop-blur-2xl"
            >
              {/* Header Bar with Live Search & Statistics */}
              <div className="px-5 py-3.5 bg-neutral-950 border-b border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-600/20 text-[#ff3b3b] border border-red-500/30">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white tracking-wide uppercase">
                      TRY PRODUCTS DIRECT FACTORY CATALOG
                    </h3>
                    <p className="font-mono text-[9px] text-neutral-400">
                      4 Main Categories • {tree.totalFiles || 2372} High-Res B2B Production Samples
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenCategory("all")}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-[11px] font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>OPEN FULL CATALOG PAGE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Instant Filter Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search folder or kit..."
                      className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SEARCH RESULTS OVERLAY (if user is typing) */}
              {searchQuery.trim() ? (
                <div className="p-5 max-h-[460px] overflow-y-auto">
                  <div className="text-[10px] font-mono text-neutral-400 mb-3 uppercase tracking-wider">
                    Search Results ({searchResults.length} folders found):
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 font-mono text-xs">
                      No matching folders found for "{searchQuery}".
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {searchResults.map((node) => (
                        <button
                          key={node.path}
                          onClick={() => handleOpenFolder(node)}
                          className="text-left p-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/60 transition-all cursor-pointer group flex items-start gap-2.5"
                        >
                          <FolderOpen className="w-4 h-4 text-[#ff4d4d] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-display font-bold text-xs text-white uppercase truncate group-hover:text-[#ff4d4d] transition-colors">
                              {node.name}
                            </h4>
                            <p className="font-mono text-[9px] text-neutral-400 truncate">
                              {node.path.replace("/Try Products/", "")}
                            </p>
                            <span className="inline-block mt-1 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 text-[#ff4d4d]">
                              {node.totalFiles || node.fileCount} SAMPLES • OPEN GALLERY →
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* 3-COLUMN CASCADING DIRECTORY BROWSER */
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] max-h-[520px]">
                  {/* COLUMN 1: MAIN CATEGORIES (4-Cols) */}
                  <div className="md:col-span-4 border-r border-neutral-800/80 p-3 space-y-1.5 bg-neutral-950/40 overflow-y-auto">
                    <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block px-2 py-1">
                      1. SELECT MAIN CATEGORY
                    </span>
                    {categories.map((cat, idx) => {
                      const isCatActive = idx === selectedCatIndex;
                      const catKey = cat.name.toLowerCase();
                      const icon = CATEGORY_ICONS[catKey] || <Folder className="w-4 h-4 text-[#ff3b3b]" />;
                      const accentColor = CATEGORY_COLORS[catKey] || "#ff3b3b";

                      return (
                        <button
                          key={cat.path}
                          onMouseEnter={() => {
                            setSelectedCatIndex(idx);
                            setSelectedSubIndex(0);
                          }}
                          onClick={() => {
                            setSelectedCatIndex(idx);
                            setSelectedSubIndex(0);
                          }}
                          className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                            isCatActive
                              ? "bg-neutral-800/90 border border-neutral-600 text-white shadow-lg"
                              : "hover:bg-neutral-900/60 border border-transparent text-neutral-300"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="p-2 rounded-xl shrink-0"
                              style={{
                                backgroundColor: isCatActive ? `${accentColor}25` : "rgba(255,255,255,0.05)",
                                border: `1px solid ${isCatActive ? accentColor : "transparent"}`
                              }}
                            >
                              {icon}
                            </span>
                            <div className="min-w-0">
                              <h4 className="font-display font-black text-xs uppercase tracking-tight truncate group-hover:text-white">
                                {cat.name}
                              </h4>
                              <p className="font-mono text-[9px] text-neutral-400">
                                {cat.children.length} Divisions • {cat.totalFiles} Items
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isCatActive ? "translate-x-0.5 text-white" : "opacity-40"
                            }`}
                          />
                        </button>
                      );
                    })}

                    {/* Quick Button to Open Whole Category Gallery */}
                    {activeCategory && (
                      <div className="pt-2 px-1">
                        <button
                          onClick={() => handleOpenFolder(activeCategory)}
                          className="w-full py-2.5 px-3 rounded-xl bg-red-600/15 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-white font-mono text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group"
                        >
                          <span>OPEN ALL {activeCategory.name} ({activeCategory.totalFiles})</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* COLUMN 2: SUB-CATEGORIES (4-Cols) */}
                  <div className="md:col-span-4 border-r border-neutral-800/80 p-3 space-y-1 bg-black/40 overflow-y-auto">
                    <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block px-2 py-1">
                      2. SUB-CATEGORIES ({subCategories.length})
                    </span>

                    {subCategories.length === 0 ? (
                      <div className="text-neutral-500 font-mono text-xs p-4">
                        No sub-folders in this category.
                      </div>
                    ) : (
                      subCategories.map((sub, idx) => {
                        const isSubActive = idx === selectedSubIndex;
                        const hasChildren = (sub.children || []).length > 0;

                        return (
                          <div
                            key={sub.path}
                            className={`w-full rounded-xl transition-all flex items-center justify-between ${
                              isSubActive
                                ? "bg-neutral-800 text-white"
                                : "hover:bg-neutral-900/80 text-neutral-300"
                            }`}
                          >
                            <button
                              onMouseEnter={() => setSelectedSubIndex(idx)}
                              onClick={() => {
                                setSelectedSubIndex(idx);
                                if (!hasChildren) {
                                  handleOpenFolder(sub);
                                }
                              }}
                              className="flex-1 text-left px-3 py-2 text-xs font-mono truncate flex items-center gap-2 cursor-pointer"
                            >
                              <Folder className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0" />
                              <span className="truncate font-bold">{sub.name}</span>
                            </button>

                            <button
                              onClick={() => handleOpenFolder(sub)}
                              title="Open All Images in this sub-folder"
                              className="px-2.5 py-1 text-[9px] font-mono font-bold text-neutral-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors cursor-pointer mr-1"
                            >
                              {sub.totalFiles || sub.fileCount} ↗
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* COLUMN 3: DEEP SUB-SUB FOLDERS / LEAF FOLDERS (4-Cols) */}
                  <div className="md:col-span-4 p-3 space-y-1.5 bg-neutral-950/60 overflow-y-auto">
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                        3. LEAF FOLDERS & SAMPLES
                      </span>
                      {activeSubCategory && (
                        <button
                          onClick={() => handleOpenFolder(activeSubCategory)}
                          className="text-[9px] font-mono text-[#ff4d4d] hover:underline font-bold"
                        >
                          View All ({activeSubCategory.totalFiles}) →
                        </button>
                      )}
                    </div>

                    {deepChildren.length === 0 ? (
                      /* If active subcategory has no deeper folders, show its direct files or preview */
                      <div className="p-4 space-y-3">
                        <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-center space-y-2">
                          <FolderOpen className="w-8 h-8 text-[#ff4d4d] mx-auto" />
                          <h5 className="font-display font-bold text-sm text-white uppercase">
                            {activeSubCategory?.name || "Folder"}
                          </h5>
                          <p className="font-mono text-[10px] text-neutral-400">
                            {activeSubCategory?.totalFiles || 0} direct product sample images ready to view.
                          </p>
                          <button
                            onClick={() => activeSubCategory && handleOpenFolder(activeSubCategory)}
                            className="mt-2 w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg cursor-pointer"
                          >
                            OPEN IMAGES GALLERY ➔
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* List of leaf folders (e.g. Football Mens, Football Womens, etc.) */
                      deepChildren.map((deep) => (
                        <button
                          key={deep.path}
                          onClick={() => handleOpenFolder(deep)}
                          className="w-full text-left p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 hover:border-red-500/50 border border-neutral-800 transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FolderOpen className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0 group-hover:scale-110 transition-transform" />
                            <div className="min-w-0">
                              <span className="font-display font-bold text-xs text-neutral-200 group-hover:text-white uppercase truncate block">
                                {deep.name}
                              </span>
                              <span className="font-mono text-[8px] text-neutral-400">
                                {deep.totalFiles || deep.fileCount} images
                              </span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#ff4d4d] group-hover:translate-x-0.5 transition-transform">
                            VIEW →
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Mega-Menu Bottom Quick Jump Footer */}
              <div className="px-5 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    Active CDN: <span className="text-white font-bold">ik.imagekit.io/pngplvaq1</span> (Zero Hosting Load)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      const el = document.getElementById("category-showcase");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[#ff4d4d] hover:underline font-bold"
                  >
                    Jump to 3D Showcase ➔
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dedicated Folder Gallery Modal */}
      <FolderGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        folderNode={galleryFolder}
        onSelectSubfolder={(sub) => setGalleryFolder(sub)}
        onSelectImage={handleOpenImage}
        onRequestQuote={handleRequestQuote}
      />

      {/* Fullscreen High-Res Image Lightbox */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        folderName={lightboxFolderName}
        folderPath={lightboxFolderPath}
        onRequestQuote={handleRequestQuote}
      />
    </>
  );
};

// ==============================================================
// MOBILE ACCORDION COMPONENT FOR HAMBURGER DRAWER
// ==============================================================
export const TryProductsMobileAccordion: React.FC<{
  onOpenFolderModal?: (node: FolderNode) => void;
  onNavigateToCatalog?: (folder?: FolderNode, categoryName?: string) => void;
}> = ({ onOpenFolderModal, onNavigateToCatalog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [tree] = useState<FolderNode>(defaultTreeData as unknown as FolderNode);

  const categories = tree.children || [];

  const handleSelectFolder = (node: FolderNode) => {
    if (onNavigateToCatalog) {
      onNavigateToCatalog(node);
    } else if (onOpenFolderModal) {
      onOpenFolderModal(node);
    }
  };

  const handleOpenAllCategory = (catName: string) => {
    if (onNavigateToCatalog) {
      onNavigateToCatalog(undefined, catName);
    } else {
      const found = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
      if (found && onOpenFolderModal) onOpenFolderModal(found);
    }
  };

  return (
    <div className="pt-2 border-t border-neutral-800 space-y-1">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => {
            if (onNavigateToCatalog) {
              onNavigateToCatalog();
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          className="flex-1 text-left py-2.5 px-3 rounded-xl text-xs font-mono font-black uppercase transition-colors flex items-center justify-between cursor-pointer bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
            <span className="text-[#ff4d4d]">TRY PRODUCTS CATALOG</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/60 text-neutral-300">
              {tree.totalFiles || 2372}
            </span>
          </span>
          <span className="text-[10px] text-red-400 font-bold">VIEW PAGE ➔</span>
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
          title="Toggle Folders"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180 text-[#ff4d4d]" : ""}`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="pl-2 space-y-1.5 pt-1.5">
          {categories.map((cat) => {
            const isCatOpen = openCat === cat.name;
            return (
              <div key={cat.path} className="rounded-xl bg-neutral-950/80 border border-neutral-800/80 overflow-hidden">
                <button
                  onClick={() => setOpenCat(isCatOpen ? null : cat.name)}
                  className="w-full text-left p-2.5 flex items-center justify-between text-xs font-mono font-bold text-neutral-200 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-[#ff4d4d]" />
                    <span className="uppercase text-[11px]">{cat.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-neutral-500 font-mono">({cat.totalFiles})</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCatOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isCatOpen && (
                  <div className="p-2 space-y-1 bg-black/40 border-t border-neutral-800/60">
                    <button
                      onClick={() => handleOpenAllCategory(cat.name)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-red-600/20 text-[#ff4d4d] text-[10px] font-mono font-bold uppercase hover:bg-red-600 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>Open All {cat.name} ({cat.totalFiles})</span>
                      <span>➔</span>
                    </button>

                    {(cat.children || []).map((sub) => (
                      <div key={sub.path} className="pl-1 space-y-1">
                        <button
                          onClick={() => handleSelectFolder(sub)}
                          className="w-full text-left px-2 py-1.5 rounded text-[11px] font-mono text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-between"
                        >
                          <span className="truncate">{sub.name}</span>
                          <span className="text-[9px] text-neutral-500 font-bold shrink-0">
                            {sub.totalFiles || sub.fileCount} ↗
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

