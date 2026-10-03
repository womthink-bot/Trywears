import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderUp,
  X,
  Upload,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  FolderOpen,
  Image as ImageIcon,
  Check,
  ShieldCheck,
  Sliders,
  Terminal,
  FileBox,
  Eye,
  CheckCircle,
  Dumbbell,
  Shirt,
  Flame,
  Shield,
  RotateCcw
} from "lucide-react";
import { CATEGORIES_DATA, CategoryData } from "../data/categoriesData";

interface ParsedFileItem {
  file: File;
  relativePath: string;
  category: string;
  subCategory: string;
  productName: string;
  size: number;
}

interface DeveloperProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesUpdated: (newCategories: CategoryData[]) => void;
}

const CATEGORY_OPTIONS = [
  {
    id: "gym-fitness",
    code: "02",
    title: "GYM & FITNESS",
    subtitle: "Activewear, Seamless, Rashguards, Compression",
    icon: Dumbbell,
    accent: "#3B82F6"
  },
  {
    id: "sports-wears",
    code: "01",
    title: "SPORTS WEARS",
    subtitle: "Tournament Kits, Jerseys, Football, Basketball",
    icon: Shirt,
    accent: "#E21D1D"
  },
  {
    id: "street-wears",
    code: "03",
    title: "STREET WEARS",
    subtitle: "500 GSM Heavyweight Hoodies, Acid Wash, Fleece",
    icon: Flame,
    accent: "#F59E0B"
  },
  {
    id: "leather-jackets",
    code: "04",
    title: "LEATHER & COMBAT",
    subtitle: "1.2mm Cowhide, Boxing Gloves, Moto Jackets",
    icon: Shield,
    accent: "#10B981"
  },
  {
    id: "auto",
    code: "ALL",
    title: "AUTO-DETECT (ALL)",
    subtitle: "Detect from root folder names automatically",
    icon: Layers,
    accent: "#A855F7"
  }
];

export const DeveloperProductUploadModal: React.FC<DeveloperProductUploadModalProps> = ({
  isOpen,
  onClose,
  onCategoriesUpdated
}) => {
  const [fileList, setFileList] = useState<ParsedFileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");
  const [replaceDummy, setReplaceDummy] = useState(true);
  const [targetCategory, setTargetCategory] = useState<string>("gym-fitness");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fast lightweight directory parser
  const processFiles = (files: FileList | File[], activeCat: string) => {
    const list: ParsedFileItem[] = [];
    const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".mp4"];

    Array.from(files).forEach((file) => {
      const lower = file.name.toLowerCase();
      const isValid = validExtensions.some((ext) => lower.endsWith(ext));
      if (!isValid) return;

      const relativePath = (file as any).webkitRelativePath || file.name;
      const parts = relativePath.split(/[/\\]/).filter(Boolean);

      let detectedCat = activeCat !== "auto" ? activeCat : "sports-wears";
      let subCat = "Core Collection";

      if (activeCat === "auto") {
        if (parts.length >= 2) {
          const rootFolder = parts[0].toLowerCase();
          if (rootFolder.includes("sport") || rootFolder.includes("jersey") || rootFolder.includes("football") || rootFolder.includes("soccer") || rootFolder.includes("basketball") || rootFolder.includes("rugby")) {
            detectedCat = "sports-wears";
          } else if (rootFolder.includes("gym") || rootFolder.includes("fitness") || rootFolder.includes("active") || rootFolder.includes("legging") || rootFolder.includes("bra") || rootFolder.includes("compression") || rootFolder.includes("rashguard")) {
            detectedCat = "gym-fitness";
          } else if (rootFolder.includes("street") || rootFolder.includes("hoodie") || rootFolder.includes("fleece") || rootFolder.includes("jogger") || rootFolder.includes("pant") || rootFolder.includes("tee")) {
            detectedCat = "street-wears";
          } else if (rootFolder.includes("leather") || rootFolder.includes("jacket") || rootFolder.includes("moto") || rootFolder.includes("combat") || rootFolder.includes("boxing") || rootFolder.includes("glove")) {
            detectedCat = "leather-jackets";
          }
          subCat = parts[1].replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        }
      } else {
        if (parts.length >= 2) {
          subCat = parts[0].toLowerCase().includes(activeCat)
            ? parts[1].replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
            : parts[0].replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        } else if (parts.length === 1 && parts[0].toLowerCase() !== activeCat) {
          subCat = parts[0].replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
        }
      }

      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/^[0-9]+_/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

      list.push({
        file,
        relativePath,
        category: detectedCat,
        subCategory: subCat,
        productName: cleanName,
        size: file.size
      });
    });

    setFileList(list);
    setIsSuccess(false);
    setStatusMessage(null);
    setCurrentFileIndex(0);
    setUploadedCount(0);
    setCurrentFileName("");
  };

  const handleCategoryChange = (catId: string) => {
    setTargetCategory(catId);
    if (fileList.length > 0) {
      const rawFiles = fileList.map((item) => item.file);
      processFiles(rawFiles, catId);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files, targetCategory);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files, targetCategory);
    }
  };

  // Fast helper for fetch with timeout
  const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = 15000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  // Convert single file to base64 transiently
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Industrial file-by-file streaming upload (Crash-Proof)
  const handleDeployFolder = async () => {
    if (fileList.length === 0) return;

    setIsUploading(true);
    setIsSuccess(false);
    setCurrentFileIndex(0);
    setUploadedCount(0);
    setStatusMessage("Connecting to server...");

    try {
      // 1. Initialize batch session
      const startRes = await fetchWithTimeout("/api/developer/batch-start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replaceDummy,
          targetCategory: targetCategory === "auto" ? "all" : targetCategory
        })
      });

      if (!startRes.ok) {
        throw new Error(`Server returned HTTP ${startRes.status}`);
      }

      const startData = await startRes.json();
      if (!startData.success || !startData.batchId) {
        throw new Error(startData.error || "Failed to initialize upload session.");
      }

      const batchId = startData.batchId;
      const total = fileList.length;
      let successCount = 0;

      // 2. Stream files sequentially
      for (let i = 0; i < total; i++) {
        const item = fileList[i];
        setCurrentFileIndex(i + 1);
        setCurrentFileName(item.productName);
        setStatusMessage(`Uploading product ${i + 1} of ${total}: "${item.productName}"`);

        try {
          const base64Data = await readFileAsBase64(item.file);

          const uploadRes = await fetchWithTimeout("/api/developer/upload-single-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              batchId,
              relativePath: item.relativePath,
              fileName: item.file.name,
              fileData: base64Data,
              targetCategory: targetCategory === "auto" ? undefined : targetCategory
            })
          }, 20000);

          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            if (uploadResult.success) {
              successCount++;
              setUploadedCount(successCount);
            }
          }
        } catch (fileErr) {
          console.error("Single file upload error:", fileErr);
        }

        // Brief delay for smooth UI paint
        await new Promise((r) => setTimeout(r, 10));
      }

      // 3. Finalize batch session
      setStatusMessage("Saving products into category catalog...");
      const finalizeRes = await fetchWithTimeout("/api/developer/batch-finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId })
      });

      const finalizeData = await finalizeRes.json();
      if (finalizeData.success && finalizeData.categories) {
        setIsSuccess(true);
        const selectedCatName = CATEGORY_OPTIONS.find((c) => c.id === targetCategory)?.title || "Selected Category";
        setStatusMessage(`Successfully deployed ${successCount} products into "${selectedCatName}"!`);
        onCategoriesUpdated(finalizeData.categories);
        window.dispatchEvent(
          new CustomEvent("trywears_categories_updated", { detail: finalizeData.categories })
        );
      } else {
        throw new Error(finalizeData.error || "Failed to finalize categories.");
      }
    } catch (err: any) {
      console.error("Batch upload failed:", err);
      setStatusMessage(`Error: ${err.message || "Upload encountered an issue."}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Clean Reset & Restore Factory Catalog
  const handleRestoreDefaults = async () => {
    if (!confirm("Are you sure you want to clean up all uploaded test products and restore the clean factory default catalog?")) return;
    try {
      const response = await fetch("/api/developer/reset-categories", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setFileList([]);
        onCategoriesUpdated(CATEGORIES_DATA);
        window.dispatchEvent(
          new CustomEvent("trywears_categories_updated", { detail: CATEGORIES_DATA })
        );
        alert("Clean factory defaults restored. All test products wiped.");
        onClose();
      }
    } catch (e) {
      console.error("Reset error:", e);
    }
  };

  if (!isOpen) return null;

  const progressPercentage = fileList.length > 0 ? Math.round((currentFileIndex / fileList.length) * 100) : 0;
  const currentCategoryObj = CATEGORY_OPTIONS.find((c) => c.id === targetCategory) || CATEGORY_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-[#09090c] border border-neutral-800 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col max-h-[92vh]"
      >
        {/* Top Developer HUD Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E21D1D]/15 border border-[#E21D1D]/40 flex items-center justify-center text-[#E21D1D]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                  TRY WEARS DEVELOPER INGESTION ENGINE
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold">
                  STREAMING v2.2
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400">
                Targeted single-category upload or full catalog ingestion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* STEP 1: TARGET CATEGORY SELECTOR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E21D1D] text-white flex items-center justify-center text-[10px]">1</span>
                <span>SELECT TARGET CATEGORY TO UPLOAD:</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">
                Only selected category will be updated
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = targetCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? "bg-neutral-900 border-[#E21D1D] shadow-lg shadow-[#E21D1D]/20 scale-[1.02]"
                        : "bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
                    )}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-[#E21D1D] text-white" : "bg-neutral-900 text-neutral-400"
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-neutral-400">
                        {cat.code}
                      </span>
                    </div>
                    <div>
                      <span className={`text-[11px] font-mono font-black block leading-tight ${isSelected ? "text-white" : "text-neutral-300"}`}>
                        {cat.title}
                      </span>
                      <span className="text-[8px] font-mono text-neutral-500 block truncate mt-0.5">
                        {cat.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Target Category Scope Notice */}
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-2.5 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#E21D1D] shrink-0" />
              <div className="text-neutral-300 text-[11px] leading-tight">
                {targetCategory === "auto" ? (
                  <span><strong>Full Catalog Mode:</strong> System will auto-detect categories from root folders.</span>
                ) : (
                  <span>
                    <strong>Target Lock: [{currentCategoryObj.title}]</strong> — Only this category will be modified. All other 3 divisions will remain <strong className="text-emerald-400">100% untouched and safe</strong>.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* STEP 2: UPLOAD DROPZONE */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E21D1D] text-white flex items-center justify-center text-[10px]">2</span>
              <span>DROP PRODUCT FOLDER FOR [{currentCategoryObj.title}]:</span>
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-7 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-[#E21D1D] bg-[#E21D1D]/10"
                  : "border-neutral-800 hover:border-neutral-700 bg-neutral-950/60 hover:bg-neutral-900/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#E21D1D] flex items-center justify-center mx-auto mb-2.5 shadow-xl">
                <FolderUp className="w-6 h-6" />
              </div>

              <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                DRAG & DROP FOLDER HERE, OR CLICK TO BROWSE
              </h4>
              <p className="text-[11px] font-mono text-neutral-400 mt-1 max-w-md mx-auto">
                Select your product folder. Sub-folders inside will become sub-categories.
              </p>
            </div>
          </div>

          {/* Replace Dummy Switch */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-black text-white uppercase block">
                Replace Dummy Products in [{currentCategoryObj.title}]
              </span>
              <span className="text-[10px] font-mono text-neutral-400 block">
                {targetCategory === "auto"
                  ? "Delete dummy samples across all 4 categories and display uploaded items."
                  : `Only delete dummy samples inside "${currentCategoryObj.title}". Other 3 categories will remain safe.`}
              </span>
            </div>
            <input
              type="checkbox"
              checked={replaceDummy}
              onChange={(e) => setReplaceDummy(e.target.checked)}
              className="w-5 h-5 accent-[#E21D1D] rounded cursor-pointer"
            />
          </div>

          {/* Real-time Streaming Progress Bar */}
          {isUploading && (
            <div className="space-y-2 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300 font-bold truncate max-w-[70%]">
                  {statusMessage}
                </span>
                <span className="text-[#E21D1D] font-black">
                  {uploadedCount} / {fileList.length} ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-neutral-900 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-[#E21D1D]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {currentFileName && (
                <div className="text-[10px] font-mono text-neutral-400 truncate">
                  Active Asset: <span className="text-white">{currentFileName}</span>
                </div>
              )}
            </div>
          )}

          {/* Success Banner */}
          {isSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs font-mono text-emerald-300">
                  <span className="font-bold block">DEPLOYMENT SUCCESSFUL</span>
                  <span>{statusMessage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  const targetSectionId = targetCategory !== "auto" ? `cat-section-${targetCategory}` : "3d-deconstruction";
                  const el = document.getElementById(targetSectionId);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-black uppercase cursor-pointer"
              >
                VIEW LIVE STAGE
              </button>
            </div>
          )}

          {/* Parsed Files List Preview */}
          {fileList.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-300">
                <span className="font-bold uppercase flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#E21D1D]" />
                  <span>
                    READY TO DEPLOY ({fileList.length} FILES MAPPED TO {currentCategoryObj.title})
                  </span>
                </span>
                {!isUploading && (
                  <button
                    onClick={() => setFileList([])}
                    className="text-neutral-500 hover:text-red-400 text-[10px] uppercase font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="max-h-40 overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-2 space-y-1.5 scrollbar-thin">
                {fileList.slice(0, 100).map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs font-mono"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-white font-bold block truncate">{f.productName}</span>
                      <span className="text-[9px] text-neutral-400 block truncate">
                        Division: <strong className="text-white">{f.category}</strong> • Sub-category: <strong className="text-neutral-300">{f.subCategory}</strong>
                      </span>
                    </div>

                    <div className="shrink-0">
                      <span className="text-[9px] text-neutral-400 font-bold bg-neutral-800 px-2 py-0.5 rounded">
                        QUEUED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950">
          <button
            onClick={handleRestoreDefaults}
            className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1.5 bg-red-950/30 px-3 py-1.5 rounded-xl border border-red-900/50"
            title="Clean all uploaded test data and restore default catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Wipe Test Data & Restore Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={fileList.length === 0 || isUploading}
              onClick={handleDeployFolder}
              className="px-6 py-2.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 disabled:opacity-50 text-white font-mono font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>
                {isUploading
                  ? `UPLOADING (${uploadedCount}/${fileList.length})...`
                  : `DEPLOY TO [${currentCategoryObj.title}]`}
              </span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
