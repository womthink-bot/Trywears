import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Search,
  X,
  ZoomIn,
  FileCheck,
  MessageCircle,
  Filter,
  Sparkles,
  Layers,
  ArrowLeft,
  Shirt,
  Dumbbell,
  Flame,
  ShieldCheck,
  Check,
  PackageCheck,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw
} from "lucide-react";
import { FolderNode, FolderFileItem } from "../types/folderTree";
import defaultTreeData from "../data/imagekit_folder_tree.json";
import { ProductImageLightbox } from "../components/ProductImageLightbox";
import { getWhatsAppUrl } from "../components/WhatsAppChatWidget";

// Category configuration
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

// Helper: Collect all files recursively from a folder node
function collectAllFiles(node: FolderNode): FolderFileItem[] {
  const result: FolderFileItem[] = [];
  function recurse(n: FolderNode) {
    if (n.files && n.files.length > 0) {
      result.push(...n.files);
    }
    if (n.children && n.children.length > 0) {
      n.children.forEach(recurse);
    }
  }
  recurse(node);
  return result;
}

interface CatalogPageProps {
  initialFolder?: FolderNode | null;
  initialCategoryName?: string | null;
  onNavigatePage: (page: string) => void;
  onNavigateToQuote?: (productName?: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialFolder,
  initialCategoryName,
  onNavigatePage,
  onNavigateToQuote
}) => {
  const [tree, setTree] = useState<FolderNode>(defaultTreeData as unknown as FolderNode);
  const [selectedFolder, setSelectedFolder] = useState<FolderNode | null>(initialFolder || null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    initialCategoryName || "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(36);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxImages, setLightboxImages] = useState<FolderFileItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxFolderName, setLightboxFolderName] = useState<string>("");
  const [lightboxFolderPath, setLightboxFolderPath] = useState<string>("");

  // Sync latest tree data if server has new sync
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

  // Update when initialFolder or initialCategoryName changes from outside
  useEffect(() => {
    if (initialFolder) {
      setSelectedFolder(initialFolder);
      // Determine its top category
      const topCat = (tree.children || []).find((c) =>
        initialFolder.path.toLowerCase().includes(c.name.toLowerCase())
      );
      if (topCat) {
        setSelectedCategoryName(topCat.name);
      }
      setCurrentPage(1);
    }
  }, [initialFolder, tree]);

  useEffect(() => {
    if (initialCategoryName && !initialFolder) {
      setSelectedCategoryName(initialCategoryName);
      setSelectedFolder(null);
      setCurrentPage(1);
    }
  }, [initialCategoryName, initialFolder]);

  // Main 4 Categories from root tree
  const categories = useMemo(() => tree.children || [], [tree]);

  // Determine active category node
  const activeCategoryNode = useMemo(() => {
    if (selectedCategoryName === "all") return null;
    return categories.find(
      (c) => c.name.toLowerCase() === selectedCategoryName.toLowerCase()
    ) || null;
  }, [categories, selectedCategoryName]);

  // Base list of files based on selected folder or selected category
  const baseFiles = useMemo(() => {
    if (selectedFolder) {
      return collectAllFiles(selectedFolder);
    }
    if (activeCategoryNode) {
      return collectAllFiles(activeCategoryNode);
    }
    return collectAllFiles(tree);
  }, [selectedFolder, activeCategoryNode, tree]);

  // Filter by search query
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return baseFiles;
    const q = searchQuery.toLowerCase().trim();
    return baseFiles.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.filePath && f.filePath.toLowerCase().includes(q))
    );
  }, [baseFiles, searchQuery]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFolder, selectedCategoryName, searchQuery, pageSize]);

  // Pagination calculation
  const totalItems = filteredFiles.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredFiles.slice(start, start + pageSize);
  }, [filteredFiles, currentPage, pageSize]);

  // Handle folder toggle in sidebar tree
  const toggleFolderExpand = (path: string) => {
    setExpandedFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  // Select folder handler
  const handleSelectFolder = (node: FolderNode) => {
    setSelectedFolder(node);
    // Find parent category to sync tab
    const parentCat = categories.find((c) =>
      node.path.toLowerCase().includes(c.name.toLowerCase())
    );
    if (parentCat) {
      setSelectedCategoryName(parentCat.name);
    }
    setIsSidebarOpenMobile(false);
  };

  // Select category handler
  const handleSelectCategory = (catName: string) => {
    setSelectedCategoryName(catName);
    setSelectedFolder(null);
    setSearchQuery("");
  };

  // Open Lightbox
  const handleOpenLightbox = (indexInPaginated: number) => {
    const globalIndex = (currentPage - 1) * pageSize + indexInPaginated;
    setLightboxImages(filteredFiles);
    setLightboxIndex(globalIndex);
    setLightboxFolderName(selectedFolder ? selectedFolder.name : selectedCategoryName.toUpperCase());
    setLightboxFolderPath(selectedFolder ? selectedFolder.path : "/Try Products");
    setIsLightboxOpen(true);
  };

  // Breadcrumb path segments
  const breadcrumbSegments = useMemo(() => {
    if (selectedFolder) {
      return selectedFolder.path.split("/").filter(Boolean);
    }
    if (activeCategoryNode) {
      return ["Try Products", activeCategoryNode.name];
    }
    return ["Try Products", "All Categories"];
  }, [selectedFolder, activeCategoryNode]);

  // Subfolders to show as filter pills above grid
  const subfolderPills = useMemo(() => {
    if (selectedFolder && selectedFolder.children && selectedFolder.children.length > 0) {
      return selectedFolder.children;
    }
    if (activeCategoryNode && activeCategoryNode.children) {
      return activeCategoryNode.children;
    }
    return [];
  }, [selectedFolder, activeCategoryNode]);

  return (
    <div className="min-h-screen bg-[#07070c] text-white">
      {/* 1. COMPACT HERO BANNER & CATALOG INTRO */}
      <section className="relative pt-6 pb-4 sm:pt-8 sm:pb-5 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 bg-gradient-to-b from-[#11111d] via-[#090910] to-[#07070c] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-3.5">
          {/* Breadcrumbs Trail */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
            <button
              onClick={() => {
                setSelectedCategoryName("all");
                setSelectedFolder(null);
                setSearchQuery("");
              }}
              className="text-neutral-300 hover:text-white font-bold transition-colors cursor-pointer"
            >
              TRY Products Catalog
            </button>
            {breadcrumbSegments.slice(1).map((seg, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
                <span
                  className={
                    idx === breadcrumbSegments.length - 2
                      ? "text-[#ff4d4d] font-bold"
                      : "text-neutral-400"
                  }
                >
                  {seg}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Compact Catalog Title & Quick Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">
                TRY PRODUCTS CATALOG
              </h1>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/20 text-[#ff4d4d] border border-red-500/30">
                {totalItems} SAMPLES READY
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <button
                onClick={() => onNavigateToQuote && onNavigateToQuote("Full Catalog Inquiry")}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E21D1D] to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-900/30 transition-all cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>REQUEST BULK QUOTE</span>
              </button>
            </div>
          </div>

          {/* 2. MAIN CATEGORY SELECTOR TABS */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => handleSelectCategory("all")}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategoryName === "all" && !selectedFolder
                  ? "bg-[#E21D1D] text-white shadow-md font-black"
                  : "bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ALL DIVISIONS</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/50 text-white font-bold">
                {tree.totalFiles || 2372}
              </span>
            </button>

            {categories.map((cat) => {
              const isCatActive =
                selectedCategoryName.toLowerCase() === cat.name.toLowerCase() &&
                !selectedFolder;
              const catColor = CATEGORY_COLORS[cat.name.toLowerCase()] || "#ff3b3b";
              const catIcon = CATEGORY_ICONS[cat.name.toLowerCase()] || <Folder className="w-3.5 h-3.5" />;

              return (
                <button
                  key={cat.path}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isCatActive
                      ? "text-white shadow-md font-black"
                      : "bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-300 hover:text-white"
                  }`}
                  style={isCatActive ? { backgroundColor: catColor } : {}}
                >
                  {catIcon}
                  <span>{cat.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/50 text-white font-bold">
                    {cat.totalFiles || cat.fileCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN CATALOG BODY (2-COLUMN: SIDEBAR FOLDERS + PRODUCTS GRID) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Mobile Filter Toggle & Search Bar Bar */}
        <div className="lg:hidden mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/90 border border-neutral-800 p-3 rounded-2xl">
          <button
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ff4d4d]" />
            <span>{isSidebarOpenMobile ? "Hide Categories Tree" : "Browse Folder Directory"}</span>
          </button>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter samples by name or code..."
              className="w-full bg-neutral-950 border border-neutral-700/80 rounded-xl pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==============================================================
              LEFT COLUMN: HIERARCHICAL FOLDER DIRECTORY SIDEBAR
          ============================================================== */}
          <aside
            className={`lg:col-span-4 xl:col-span-3 space-y-4 ${
              isSidebarOpenMobile ? "block" : "hidden lg:block"
            }`}
          >
            {/* Sidebar Sticky Box */}
            <div className="bg-[#0b0b14] border border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-5 sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#ff4d4d]" />
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-white">
                    FOLDER DIRECTORY
                  </h3>
                </div>
                {(selectedFolder || selectedCategoryName !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedFolder(null);
                      setSelectedCategoryName("all");
                      setSearchQuery("");
                    }}
                    className="text-[10px] font-mono font-bold text-neutral-400 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Instant Search in Sidebar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter catalog..."
                  className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
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

              {/* FOLDER ACCORDION TREE */}
              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                {categories.map((cat) => {
                  const isCatSelected =
                    (selectedCategoryName.toLowerCase() === cat.name.toLowerCase() && !selectedFolder) ||
                    (selectedFolder && selectedFolder.path.toLowerCase().includes(cat.name.toLowerCase()));
                  const isExpanded = expandedFolders[cat.path] ?? isCatSelected;

                  return (
                    <div
                      key={cat.path}
                      className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden"
                    >
                      {/* Top Category Row */}
                      <div className="flex items-center justify-between p-2">
                        <button
                          onClick={() => handleSelectFolder(cat)}
                          className={`flex-1 text-left flex items-center gap-2 font-mono text-xs uppercase truncate transition-colors cursor-pointer ${
                            isCatSelected ? "text-white font-bold" : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          <Folder className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0" />
                          <span className="truncate">{cat.name}</span>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                            {cat.totalFiles}
                          </span>
                          {cat.children && cat.children.length > 0 && (
                            <button
                              onClick={() => toggleFolderExpand(cat.path)}
                              className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                              title="Toggle Subfolders"
                            >
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform ${
                                  isExpanded ? "rotate-180 text-white" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sub-Folders List */}
                      {isExpanded && cat.children && cat.children.length > 0 && (
                        <div className="pl-3 pr-2 pb-2 space-y-1 bg-black/40 border-t border-neutral-800/80 pt-1.5">
                          {cat.children.map((sub) => {
                            const isSubSelected = selectedFolder?.path === sub.path;
                            const isSubExpanded = expandedFolders[sub.path] ?? isSubSelected;
                            const hasDeeper = sub.children && sub.children.length > 0;

                            return (
                              <div key={sub.path} className="space-y-0.5">
                                <div
                                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 transition-all ${
                                    isSubSelected
                                      ? "bg-red-600/20 text-[#ff4d4d] font-bold border border-red-500/40"
                                      : "hover:bg-neutral-800/70 text-neutral-300 hover:text-white"
                                  }`}
                                >
                                  <button
                                    onClick={() => handleSelectFolder(sub)}
                                    className="flex-1 text-left flex items-center gap-1.5 font-mono text-[11px] truncate cursor-pointer"
                                  >
                                    <ChevronRight className="w-3 h-3 text-neutral-500 shrink-0" />
                                    <span className="truncate">{sub.name}</span>
                                  </button>

                                  <div className="flex items-center gap-1 shrink-0">
                                    <span className="text-[8px] font-mono px-1 rounded bg-neutral-800 text-neutral-400">
                                      {sub.totalFiles}
                                    </span>
                                    {hasDeeper && (
                                      <button
                                        onClick={() => toggleFolderExpand(sub.path)}
                                        className="p-0.5 text-neutral-400 hover:text-white cursor-pointer"
                                      >
                                        <ChevronDown
                                          className={`w-3 h-3 transition-transform ${
                                            isSubExpanded ? "rotate-180" : ""
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Deeper Leaf Sub-folders (Level 3) */}
                                {isSubExpanded && hasDeeper && (
                                  <div className="pl-4 space-y-0.5 pt-0.5 pb-1">
                                    {sub.children.map((deep) => {
                                      const isDeepSelected = selectedFolder?.path === deep.path;
                                      return (
                                        <button
                                          key={deep.path}
                                          onClick={() => handleSelectFolder(deep)}
                                          className={`w-full text-left flex items-center justify-between px-2 py-1 rounded font-mono text-[10px] transition-colors cursor-pointer ${
                                            isDeepSelected
                                              ? "bg-[#ff4d4d] text-white font-bold"
                                              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                                          }`}
                                        >
                                          <span className="truncate">• {deep.name}</span>
                                          <span className="text-[8px] opacity-75 shrink-0">
                                            {deep.totalFiles}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* SUB-FOLDER DRILLDOWN (Nested in Left Sidebar) */}
              {subfolderPills.length > 0 && (
                <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#ff4d4d]" />
                      <span>SUB-CATEGORIES:</span>
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {subfolderPills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    {subfolderPills.map((sub) => {
                      const isSubSelected = selectedFolder?.path === sub.path;
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleSelectFolder(sub)}
                          className={`w-full px-2.5 py-1.5 rounded-xl font-mono text-[11px] transition-all cursor-pointer flex items-center justify-between ${
                            isSubSelected
                              ? "bg-[#E21D1D] text-white shadow-md font-bold"
                              : "bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white"
                          }`}
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <Folder className="w-3 h-3 text-[#ff4d4d] shrink-0" />
                            <span className="truncate">{sub.name}</span>
                          </span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-neutral-400 shrink-0">
                            {sub.totalFiles}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Factory Support Callout in Sidebar */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT SIALKOT FACTORY</span>
                </div>
                <p className="text-[10px] text-neutral-400 leading-relaxed">
                  Need a custom tech pack or samples sent to UK/US? Our engineering team responds within 2 hours.
                </p>
                <a
                  href={getWhatsAppUrl("Hi Try Wears, I am browsing your online catalog and want to discuss custom OEM manufacturing.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center block transition-colors shadow-md"
                >
                  CHAT ON WHATSAPP
                </a>
              </div>
            </div>
          </aside>

          {/* ==============================================================
              RIGHT COLUMN: PRODUCT GRID & LIGHTBOX (STARTS AT TOP)
          ============================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* TOOLBAR: PRODUCT COUNT, ACTIVE FILTER TAG, PAGE SIZE */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 border border-neutral-800 px-4 py-3 rounded-2xl font-mono text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-neutral-400">Showing:</span>
                <span className="text-white font-bold">
                  {totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0} -{" "}
                  {Math.min(currentPage * pageSize, totalItems)}
                </span>
                <span className="text-neutral-500">of</span>
                <span className="text-[#ff4d4d] font-bold">{totalItems} Products</span>

                {selectedFolder && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700 text-[10px]">
                    <span>Folder: {selectedFolder.name}</span>
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className="hover:text-[#ff4d4d] cursor-pointer"
                      title="Clear folder filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-red-600/20 text-[#ff4d4d] border border-red-500/30 text-[10px]">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Page Size Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-neutral-500 text-[10px]">Per Page:</span>
                {[24, 36, 72].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPageSize(size)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                      pageSize === size
                        ? "bg-red-600 text-white"
                        : "bg-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT GRID */}
            {paginatedFiles.length === 0 ? (
              <div className="py-24 text-center bg-[#090910] border border-neutral-800 rounded-3xl space-y-4">
                <PackageCheck className="w-12 h-12 text-neutral-600 mx-auto" />
                <h3 className="font-display font-black text-xl text-white uppercase">
                  No Products Found
                </h3>
                <p className="font-mono text-xs text-neutral-400 max-w-md mx-auto">
                  {searchQuery
                    ? `No samples matched the search query "${searchQuery}". Try a different keyword or reset filters.`
                    : "No products are directly located in this selection. Please select another sub-category."}
                </p>
                <button
                  onClick={() => {
                    setSelectedFolder(null);
                    setSelectedCategoryName("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  VIEW ALL 2,372 SAMPLES
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {paginatedFiles.map((file, idx) => {
                  const cleanName = file.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .toUpperCase();

                  return (
                    <motion.div
                      key={file.fileId || file.url}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: Math.min(idx * 0.015, 0.2) }}
                      className="group bg-[#0b0b14] hover:bg-neutral-900 border border-neutral-800/90 hover:border-red-500/70 rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-red-950/40"
                    >
                      {/* Product Thumbnail Container with Zoom Overlay - Large & Clear */}
                      <div
                        onClick={() => handleOpenLightbox(idx)}
                        className="relative w-full aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black flex items-center justify-center mb-3 cursor-pointer"
                      >
                        <img
                          src={file.thumbnail || file.url}
                          alt={cleanName}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover sm:object-contain group-hover:scale-106 transition-transform duration-300 drop-shadow-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = file.url;
                          }}
                        />

                        {/* Hover Zoom Prompt */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-3 rounded-full bg-red-600 text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform flex items-center gap-1.5 font-mono text-xs font-bold px-4 py-2">
                            <ZoomIn className="w-4 h-4" />
                            <span>INSPECT</span>
                          </span>
                        </div>

                        {/* Item Code Badge overlaid on the image */}
                        <span className="absolute bottom-2.5 left-2.5 font-mono text-[11px] font-black px-2.5 py-1 rounded-lg bg-black/90 text-white border border-neutral-700/80 shadow-xl backdrop-blur-md">
                          {cleanName}
                        </span>

                        {/* OEM Ready Quality Badge */}
                        <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] font-bold px-2 py-0.5 rounded-lg bg-red-600/90 text-white shadow-lg">
                          OEM READY
                        </span>
                      </div>

                      {/* Product Metadata Info - Actions: Request Quote & WhatsApp */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-800/80 font-mono text-[10px]">
                          <button
                            onClick={() => {
                              if (onNavigateToQuote) {
                                onNavigateToQuote(cleanName);
                              }
                            }}
                            className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-red-600 text-neutral-200 hover:text-white font-bold uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow"
                            title="Get B2B Tech Pack Quote"
                          >
                            <FileCheck className="w-3.5 h-3.5 text-[#ff4d4d] group-hover:text-white" />
                            <span>QUOTE</span>
                          </button>

                          <a
                            href={getWhatsAppUrl(`Hi Try Wears, I want a B2B quote for sample ${cleanName} (Folder: ${file.filePath})`)}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 border border-emerald-500/30 shadow"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>CHAT</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="p-4 bg-[#090910] border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <span className="text-neutral-400">
                  Page <span className="text-white font-bold">{currentPage}</span> of{" "}
                  <span className="text-white font-bold">{totalPages}</span> ({totalItems} total products)
                </span>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {/* Previous Button */}
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(p - 1, 1));
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* Numbered Page Buttons with Smart Ellipsis */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 2
                      );
                    })
                    .map((page, idx, arr) => {
                      const prevPage = arr[idx - 1];
                      const showEllipsisBefore = prevPage && page - prevPage > 1;

                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="px-1 text-neutral-600">...</span>
                          )}
                          <button
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 400, behavior: "smooth" });
                            }}
                            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                              currentPage === page
                                ? "bg-red-600 text-white shadow-md shadow-red-900/50"
                                : "bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-700"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  {/* Next Button */}
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(p + 1, totalPages));
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. FULL-SCREEN PRODUCT LIGHTBOX FOR HIGH-RESOLUTION INSPECTION */}
      <ProductImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={(idx) => setLightboxIndex(idx)}
        folderName={lightboxFolderName}
        folderPath={lightboxFolderPath}
        onRequestQuote={(prod) => {
          setIsLightboxOpen(false);
          if (onNavigateToQuote) {
            onNavigateToQuote(prod.name);
          }
        }}
      />
    </div>
  );
};
