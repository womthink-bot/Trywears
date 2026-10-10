import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FolderTree,
  ExternalLink,
  X,
  Eye,
  EyeOff,
  Link2,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  FolderOpen,
  Image as ImageIcon,
  Check
} from "lucide-react";
import { CategoryData } from "../data/categoriesData";

interface ImageKitSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriesUpdated?: (newCategories: CategoryData[]) => void;
}

export const ImageKitSyncModal: React.FC<ImageKitSyncModalProps> = ({
  isOpen,
  onClose,
  onCategoriesUpdated
}) => {
  const [activeTab, setActiveTab] = useState<"sync" | "manual">("sync");
  const [imagekitId, setImagekitId] = useState("pngplvaq1");
  const [urlEndpoint, setUrlEndpoint] = useState("https://ik.imagekit.io/pngplvaq1");
  const [publicKey, setPublicKey] = useState("public_ZIZOwEaN8kHiqOyVn+N0jgzfBTQ=");
  const [rootFolder, setRootFolder] = useState("Try Products");
  const [privateKey, setPrivateKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [replaceExisting, setReplaceExisting] = useState(true);

  // States
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; sampleItems?: any[] } | null>(null);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string; totalSynced?: number; categoriesSummary?: any[] } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Manual import tab states
  const [manualUrls, setManualUrls] = useState("");
  const [manualCategory, setManualCategory] = useState("sports-wears");
  const [manualSubCategory, setManualSubCategory] = useState("Pro Match Kits");
  const [isManualImporting, setIsManualImporting] = useState(false);
  const [manualSuccessMsg, setManualSuccessMsg] = useState<string | null>(null);

  // Load existing config on mount
  useEffect(() => {
    if (isOpen) {
      fetch("/api/imagekit/config")
        .then((r) => r.json())
        .then((data) => {
          if (data && data.success && data.config) {
            if (data.config.imagekitId) setImagekitId(data.config.imagekitId);
            if (data.config.urlEndpoint) setUrlEndpoint(data.config.urlEndpoint);
            if (data.config.publicKey) setPublicKey(data.config.publicKey);
            if (data.config.rootFolder) setRootFolder(data.config.rootFolder);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  const handleTestConnection = async () => {
    setErrorMsg(null);
    setTestResult(null);
    if (!privateKey.trim()) {
      setErrorMsg("Private Key likhna zaroori hai. ImageKit dashboard se unmasked Private Key copy karein.");
      return;
    }
    if (privateKey.includes("*")) {
      setErrorMsg("Private Key me asterisks (***) lagay hain! ImageKit me Eye 👁️ icon ya Copy button daba kar real key copy karein.");
      return;
    }

    setIsTesting(true);
    try {
      const res = await fetch("/api/imagekit/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          privateKey: privateKey.trim(),
          urlEndpoint: urlEndpoint.trim(),
          rootFolder: rootFolder.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: `Connected successfully! Found ${data.itemCount} items in folder '${rootFolder}'.`,
          sampleItems: data.sampleItems
        });
      } else {
        setErrorMsg(data.error || "Connection failed. Please check your Private Key.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while connecting to ImageKit.");
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncAllProducts = async () => {
    setErrorMsg(null);
    setSyncResult(null);

    if (!privateKey.trim()) {
      setErrorMsg("Private Key zaroori hai. ImageKit dashboard se real Private Key copy kar ke yahan paste karein.");
      return;
    }
    if (privateKey.includes("*")) {
      setErrorMsg("Private Key me asterisks (***) lagay hain! ImageKit me Eye 👁️ icon ya Copy button daba kar real key copy karein.");
      return;
    }

    setIsSyncing(true);
    try {
      const res = await fetch("/api/imagekit/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          privateKey: privateKey.trim(),
          urlEndpoint: urlEndpoint.trim(),
          rootFolder: rootFolder.trim(),
          replaceExisting
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncResult({
          success: true,
          message: data.message,
          totalSynced: data.totalSynced,
          categoriesSummary: data.categoriesSummary
        });

        // Fetch refreshed categories and update live view
        fetch("/api/categories")
          .then((r) => r.json())
          .then((catData) => {
            if (catData && catData.categories) {
              if (onCategoriesUpdated) onCategoriesUpdated(catData.categories);
              window.dispatchEvent(
                new CustomEvent("trywears_categories_updated", { detail: catData.categories })
              );
            }
          })
          .catch(() => {});
      } else {
        setErrorMsg(data.error || "ImageKit sync failed.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error while syncing with ImageKit.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleManualImport = async () => {
    setManualSuccessMsg(null);
    setErrorMsg(null);
    const urls = manualUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 5);

    if (urls.length === 0) {
      setErrorMsg("Aik ya ziyada image URLs paste karein.");
      return;
    }

    setIsManualImporting(true);
    try {
      const res = await fetch("/api/imagekit/manual-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls,
          targetCategory: manualCategory,
          subCategoryName: manualSubCategory
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setManualSuccessMsg(`Successfully imported ${data.addedCount} products into ${manualSubCategory}!`);
        setManualUrls("");
        fetch("/api/categories")
          .then((r) => r.json())
          .then((catData) => {
            if (catData && catData.categories) {
              if (onCategoriesUpdated) onCategoriesUpdated(catData.categories);
              window.dispatchEvent(
                new CustomEvent("trywears_categories_updated", { detail: catData.categories })
              );
            }
          })
          .catch(() => {});
      } else {
        setErrorMsg(data.error || "Manual import failed.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network error during manual import.");
    } finally {
      setIsManualImporting(false);
    }
  };

  const handleResetCatalog = async () => {
    if (!window.confirm("Kiya aap wapsi factory default catalog restore karna chahte hain?")) {
      return;
    }
    try {
      const res = await fetch("/api/developer/reset-categories", { method: "POST" });
      if (res.ok) {
        fetch("/api/categories")
          .then((r) => r.json())
          .then((catData) => {
            if (catData && catData.categories) {
              if (onCategoriesUpdated) onCategoriesUpdated(catData.categories);
              window.dispatchEvent(
                new CustomEvent("trywears_categories_updated", { detail: catData.categories })
              );
            }
          })
          .catch(() => {});
        alert("Factory default catalog restored!");
        onClose();
      }
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E21D1D]/15 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D]">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-wide">
                  IMAGEKIT.IO AUTO-SYNC & CDN CONNECTOR
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  LIVE CDN
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                Automatically map 'Try Products' folders, subfolders, and items to website categories
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-6 pt-3 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("sync")}
            className={`pb-3 font-mono text-xs font-bold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === "sync"
                ? "border-[#E21D1D] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <FolderTree className="w-4 h-4 text-[#E21D1D]" />
            <span>AUTOMATED 1-CLICK FOLDER SYNC</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`pb-3 font-mono text-xs font-bold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === "manual"
                ? "border-[#E21D1D] text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Link2 className="w-4 h-4 text-neutral-400" />
            <span>PASTE DIRECT IMAGE URLS</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono">
          {activeTab === "sync" ? (
            <>
              {/* Account Credentials Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">ImageKit ID</span>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{imagekitId}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">Target Main Folder</span>
                  <div className="font-bold text-white flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5 text-[#E21D1D]" />
                    <span>{rootFolder}</span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">CDN Endpoint</span>
                  <div className="text-neutral-300 truncate font-mono text-[11px] bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5">
                    {urlEndpoint}
                  </div>
                </div>
              </div>

              {/* Private Key Input & Helper Guide */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white flex items-center justify-between">
                  <span>ENTER UNMASKED PRIVATE KEY</span>
                  <span className="text-[10px] text-[#E21D1D] font-mono">REQUIRED FOR API SYNC</span>
                </label>

                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="private_E8Z... (ImageKit dashboard se copy karein)"
                    className="w-full bg-black/60 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#E21D1D] pr-10 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Friendly Urdu Instruction Note */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                  <span className="font-bold block mb-1 text-amber-200">
                    💡 Ahem Note (Private Key copy karne ka tareeqa):
                  </span>
                  Aap ne pehle jo key bheji thi us me asterisks <code>(***)</code> lagay thay. ImageKit Dashboard me <strong>Developer options &gt; API Keys</strong> par ja kar:
                  <ol className="list-decimal list-inside mt-1 space-y-0.5 text-neutral-300">
                    <li>Private Key ke sath <strong>Eye (👁️) icon</strong> par click karein taake tare (***) gayab ho jayein.</li>
                    <li>Ya us ke sath walay <strong>Copy</strong> icon par click kar ke yahan paste karein.</li>
                  </ol>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <input
                  type="checkbox"
                  id="replaceExisting"
                  checked={replaceExisting}
                  onChange={(e) => setReplaceExisting(e.target.checked)}
                  className="w-4 h-4 rounded text-[#E21D1D] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="replaceExisting" className="text-neutral-300 cursor-pointer text-[11px]">
                  Replace existing default samples with fresh products from ImageKit folders
                </label>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* Test Result Box */}
              {testResult && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="font-bold text-xs">{testResult.message}</span>
                  </div>
                  {testResult.sampleItems && testResult.sampleItems.length > 0 && (
                    <div className="bg-black/50 p-2 rounded-lg border border-white/5 space-y-1">
                      <span className="text-[10px] text-neutral-400 block uppercase font-bold">Sample Folders & Files Found:</span>
                      {testResult.sampleItems.map((item, idx) => (
                        <div key={idx} className="text-[10px] text-neutral-300 truncate">
                          📁 {item.filePath || item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sync Success Box */}
              {syncResult && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-sm block">{syncResult.message}</span>
                      <span className="text-[10px] text-neutral-400">Website live categories updated!</span>
                    </div>
                  </div>
                  {syncResult.categoriesSummary && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20">
                      {syncResult.categoriesSummary.map((cat, idx) => (
                        <div key={idx} className="bg-black/40 p-2 rounded-lg border border-white/5">
                          <span className="text-[9px] text-neutral-400 block truncate">{cat.name}</span>
                          <span className="font-bold text-white text-xs">{cat.productsCount} products</span>
                          <span className="text-[9px] text-emerald-400 block">{cat.subCategoriesCount} subfolders</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting || isSyncing}
                  className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  <span>TEST CONNECTION</span>
                </button>

                <button
                  type="button"
                  onClick={handleSyncAllProducts}
                  disabled={isTesting || isSyncing}
                  className="flex-[2] py-3 px-4 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer"
                >
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span>{isSyncing ? "SYNCING ALL FOLDERS..." : "1-CLICK SYNC ALL TRY PRODUCTS"}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Manual URL Importer Tab */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-300 text-[11px] leading-relaxed">
                  Agar aap kisi specific ImageKit image ya collection ka URL directly dalna chahein, to yahan paste kar ke category select karein.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">TARGET CATEGORY</label>
                    <select
                      value={manualCategory}
                      onChange={(e) => setManualCategory(e.target.value)}
                      className="w-full bg-black/60 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                    >
                      <option value="sports-wears">01. SPORTS WEARS</option>
                      <option value="gym-fitness">02. GYM & FITNESS</option>
                      <option value="street-wears">03. STREET WEARS</option>
                      <option value="leather-jackets">04. JACKETS</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">SUB-CATEGORY NAME</label>
                    <input
                      type="text"
                      value={manualSubCategory}
                      onChange={(e) => setManualSubCategory(e.target.value)}
                      placeholder="e.g. Football Kits, Tracksuits..."
                      className="w-full bg-black/60 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E21D1D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">IMAGE URLS (1 PER LINE)</label>
                  <textarea
                    rows={4}
                    value={manualUrls}
                    onChange={(e) => setManualUrls(e.target.value)}
                    placeholder="https://ik.imagekit.io/pngplvaq1/Try Products/SPORTS WEARS/jersey1.jpg&#10;https://ik.imagekit.io/pngplvaq1/Try Products/SPORTS WEARS/jersey2.jpg"
                    className="w-full bg-black/60 border border-neutral-700 rounded-xl p-3 text-xs text-white font-mono placeholder:text-neutral-500 focus:outline-none focus:border-[#E21D1D]"
                  />
                </div>

                {manualSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{manualSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleManualImport}
                  disabled={isManualImporting}
                  className="w-full py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  {isManualImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  <span>IMPORT PRODUCT IMAGES NOW</span>
                </button>
              </div>
            </>
          )}

          {/* Fallback Option */}
          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-neutral-500 text-[10px]">
            <span>Need to restore factory default samples?</span>
            <button
              type="button"
              onClick={handleResetCatalog}
              className="text-neutral-400 hover:text-red-400 underline transition-colors cursor-pointer"
            >
              Reset to Factory Default
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
