import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Upload, 
  Folder, 
  FolderOpen, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Trash2, 
  RefreshCw, 
  Check, 
  FileCheck, 
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface MediaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFolder?: string;
  onMediaChanged?: () => void;
}

interface MediaItem {
  name: string;
  relativePath: string;
  type: "image" | "video";
  size: number;
  updatedAt: string;
}

const SECTION_FOLDERS: Array<{ id: string; label: string; description: string; sectionName: string }> = [
  {
    id: "home-page/hero-section",
    label: "Hero Section (Media & Videos)",
    description: "Images and 3D videos for the main hero slider. No text overlay.",
    sectionName: "Home Page Hero Slider"
  },
  {
    id: "home-page/categories-section",
    label: "Categories Section",
    description: "Apparel categories (Sports Wears, Gym & Fitness, Street Wears, Leather Jackets).",
    sectionName: "Categories Section"
  },
  {
    id: "home-page/catalog-section",
    label: "Catalog Section",
    description: "Product photos for championship gear, gloves, rashguards, tracksuits, shorts.",
    sectionName: "Products Catalog"
  },
  {
    id: "home-page/customizer-section",
    label: "Customizer Section",
    description: "3D Customizer base garments and preview textures.",
    sectionName: "Bespoke 3D Lab"
  },
  {
    id: "home-page/factory-section",
    label: "Factory Capabilities",
    description: "OEM/ODM factory floor, stitching lines, and ISO laboratory photos.",
    sectionName: "Factory Tour"
  },
  {
    id: "home-page/b2b-calculator-section",
    label: "B2B Calculator Section",
    description: "Packaging mockups, wholesale freight containers, and volume orders.",
    sectionName: "Wholesale Calculator"
  },
  {
    id: "home-page/technology-section",
    label: "Technology & Specs",
    description: "Metacarpal carbon weave and gel matrix shock absorption imagery.",
    sectionName: "Tech Specs"
  },
  {
    id: "home-page/testimonials-section",
    label: "Testimonials Section",
    description: "Champion fighters, athlete avatars, and endorsement photos.",
    sectionName: "Testimonials"
  },
  {
    id: "home-page/branding",
    label: "Branding & Logos",
    description: "Try Wears primary logo, transparent logo, and badge marks.",
    sectionName: "Global Branding"
  },
  {
    id: "videos",
    label: "Global Videos",
    description: "All high-definition background clips, 3D motions, MP4 & WebM loops.",
    sectionName: "Video Library"
  }
];

export const MediaManagerModal: React.FC<MediaManagerModalProps> = ({
  isOpen,
  onClose,
  defaultFolder = "home-page/hero-section",
  onMediaChanged
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string>(defaultFolder);
  const [foldersData, setFoldersData] = useState<Record<string, MediaItem[]>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch media from server API
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        if (data.folders) {
          setFoldersData(data.folders);
        }
      }
    } catch (err) {
      console.warn("Could not fetch media list from server:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
      if (defaultFolder) {
        setSelectedFolder(defaultFolder);
      }
    }
  }, [isOpen, defaultFolder]);

  // Upload file to selected folder
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSuccessMsg(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch("/api/media/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folder: selectedFolder,
            fileName: file.name,
            fileData: base64Data
          })
        });

        if (res.ok) {
          setSuccessMsg(`File "${file.name}" uploaded successfully! Website updated automatically.`);
          await fetchMedia();
          if (onMediaChanged) {
            onMediaChanged();
          }
          setTimeout(() => setSuccessMsg(null), 4000);
        }
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete file from selected folder
  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm(`Delete "${item.name}" from ${selectedFolder}?`)) return;

    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: selectedFolder,
          fileName: item.name
        })
      });

      if (res.ok) {
        setSuccessMsg(`File "${item.name}" deleted.`);
        await fetchMedia();
        if (onMediaChanged) {
          onMediaChanged();
        }
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!isOpen) return null;

  const currentFolderFiles = foldersData[selectedFolder] || [];
  const currentFolderConfig = SECTION_FOLDERS.find((f) => f.id === selectedFolder) || SECTION_FOLDERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white"
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#E21D1D]/20 border border-[#E21D1D]/30 text-[#E21D1D]">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg uppercase tracking-wider text-white flex items-center gap-2">
                <span>WEBSITE MEDIA FOLDERS & AUTO-SYNC</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  AUTO LIVE
                </span>
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Folders for all website images and videos. Any file placed or changed here automatically appears on the site.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMedia}
              disabled={loading}
              className="p-2 rounded-xl border border-white/10 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1.5"
              title="Refresh files from server disk"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline font-mono">Sync Disk</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-white/10 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATION MESSAGE */}
        {successMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-6 py-2.5 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* LEFT SIDEBAR: FOLDER SELECTOR */}
          <div className="md:col-span-4 border-r border-white/10 bg-neutral-950/50 p-4 overflow-y-auto space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold px-2 py-1">
              Website Folders (Images & Videos)
            </div>

            {SECTION_FOLDERS.map((folder) => {
              const count = (foldersData[folder.id] || []).length;
              const isSelected = selectedFolder === folder.id;

              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#E21D1D]/15 border-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/10"
                      : "bg-neutral-900/60 border-white/5 text-neutral-300 hover:bg-neutral-800 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Folder className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#E21D1D]" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                    <div className="min-w-0">
                      <div className="font-display font-bold text-xs uppercase tracking-wide truncate">
                        {folder.label}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500 truncate">
                        media/{folder.id}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 font-bold ${
                    isSelected ? "bg-[#E21D1D] text-white" : "bg-neutral-800 text-neutral-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT MAIN AREA: FOLDER CONTENTS & UPLOADER */}
          <div className="md:col-span-8 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Active Folder Info Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950 p-4 rounded-xl border border-white/10">
                <div>
                  <div className="text-[10px] font-mono text-[#E21D1D] uppercase font-bold tracking-widest">
                    CURRENT FOLDER
                  </div>
                  <h4 className="text-base font-display font-bold text-white uppercase mt-0.5">
                    /public/media/{selectedFolder}/
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    {currentFolderConfig.description}
                  </p>
                </div>

                {/* Upload Button */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="media-file-input"
                  />
                  <label
                    htmlFor="media-file-input"
                    className={`inline-flex items-center gap-2 bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-bold uppercase px-4 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-[#E21D1D]/30 transition-all ${
                      uploading ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Add File To Folder"}</span>
                  </label>
                </div>
              </div>

              {/* Automatic Behavior Explanatory Banner */}
              <div className="p-3.5 bg-neutral-800/60 rounded-xl border border-white/10 text-xs text-neutral-300 font-sans leading-relaxed flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-display uppercase tracking-wide">
                    Automatic Section Updates:
                  </strong>
                  Koi bhi image ya video is folder me save ya replace ki jaye, website foran usko dynamically pick karke display karegi. Zero manual coding required!
                </div>
              </div>

              {/* Files Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-neutral-400 font-bold">
                    Files inside this folder ({currentFolderFiles.length})
                  </span>
                </div>

                {currentFolderFiles.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl p-6 bg-neutral-950/40">
                    <Folder className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                    <h5 className="font-display font-bold text-sm text-neutral-300 uppercase">
                      This folder is currently empty
                    </h5>
                    <p className="text-xs text-neutral-500 font-mono mt-1">
                      Click "Add File To Folder" or drag an image/video here to populate this section.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {currentFolderFiles.map((file) => {
                      const isVid = file.type === "video";

                      return (
                        <div
                          key={file.name}
                          className="bg-neutral-950 rounded-xl border border-white/10 overflow-hidden group hover:border-[#E21D1D]/50 transition-all flex flex-col justify-between"
                        >
                          {/* Media Thumbnail Container */}
                          <div className="relative h-32 bg-black flex items-center justify-center overflow-hidden">
                            {isVid ? (
                              <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                                <video
                                  src={file.relativePath}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                  loop
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <VideoIcon className="w-8 h-8 text-white/80" />
                                </div>
                              </div>
                            ) : (
                              <img
                                src={file.relativePath}
                                alt={file.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                            )}

                            {/* Type Pill */}
                            <span className={`absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase shadow ${
                              isVid ? "bg-amber-500 text-black" : "bg-neutral-800 text-white"
                            }`}>
                              {file.type}
                            </span>
                          </div>

                          {/* Info & Actions */}
                          <div className="p-3 space-y-2">
                            <div className="text-xs font-mono font-bold text-white truncate" title={file.name}>
                              {file.name}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                              <span>{(file.size / 1024).toFixed(1)} KB</span>
                              <span className="text-emerald-400 font-bold">Active</span>
                            </div>

                            <div className="flex items-center gap-1.5 pt-1">
                              <a
                                href={file.relativePath}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex-1 text-center text-[10px] font-mono flex items-center justify-center gap-1"
                                title="Open full media"
                              >
                                <Eye className="w-3 h-3" />
                                <span>View</span>
                              </a>
                              <button
                                onClick={() => handleDelete(file)}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/30 transition-colors"
                                title="Delete file from folder"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Folder Footer Help */}
            <div className="text-[11px] font-mono text-neutral-500 border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Server Path: <code className="text-neutral-300">/public/media/{selectedFolder}/</code></span>
              <span className="text-[#E21D1D] font-bold">Try Wears Production Asset Pipeline v2.0</span>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};
