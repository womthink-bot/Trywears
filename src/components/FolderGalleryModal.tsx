import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  Image as ImageIcon,
  X,
  Search,
  ZoomIn,
  ChevronRight,
  ArrowLeft,
  FileCheck,
  Sparkles,
  Layers
} from "lucide-react";
import { FolderNode, FolderFileItem } from "../types/folderTree";

interface FolderGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderNode: FolderNode | null;
  onSelectSubfolder?: (node: FolderNode) => void;
  onSelectImage: (images: FolderFileItem[], selectedIndex: number, folderPath: string, folderName: string) => void;
  onRequestQuote?: (productInfo: { name: string; image: string; path: string }) => void;
}

export const FolderGalleryModal: React.FC<FolderGalleryModalProps> = ({
  isOpen,
  onClose,
  folderNode,
  onSelectSubfolder,
  onSelectImage,
  onRequestQuote
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Collect all images: direct files, or if this folder has 0 direct files but has children, collect recursively!
  const allImages = useMemo(() => {
    if (!folderNode) return [];
    if ((folderNode.files || []).length > 0) {
      return folderNode.files;
    }
    // Collect from children
    const collected: FolderFileItem[] = [];
    function collect(node: FolderNode) {
      if (node.files && node.files.length > 0) {
        collected.push(...node.files);
      }
      (node.children || []).forEach(collect);
    }
    collect(folderNode);
    return collected;
  }, [folderNode]);

  // Filter images by search query
  const filteredImages = useMemo(() => {
    if (!searchQuery.trim()) return allImages;
    const q = searchQuery.toLowerCase();
    return allImages.filter(
      (img) =>
        img.name.toLowerCase().includes(q) ||
        (img.filePath || "").toLowerCase().includes(q)
    );
  }, [allImages, searchQuery]);

  // Breadcrumbs from folder path
  const breadcrumbSegments = useMemo(() => {
    if (!folderNode?.path) return [];
    return folderNode.path.split("/").filter(Boolean);
  }, [folderNode?.path]);

  return (
    <AnimatePresence>
      {isOpen && folderNode && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0c14] border border-neutral-700/80 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden z-10"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-neutral-800/90 bg-gradient-to-r from-neutral-950 via-[#10101b] to-neutral-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
            {/* Title & Breadcrumbs */}
            <div className="min-w-0 flex-1">
              {/* Breadcrumb Path */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 overflow-x-auto no-scrollbar pb-1 mb-1">
                <Folder className="w-3.5 h-3.5 text-[#ff4d4d] shrink-0" />
                {breadcrumbSegments.map((seg, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />}
                    <span
                      className={`truncate ${
                        idx === breadcrumbSegments.length - 1
                          ? "text-white font-bold"
                          : "text-neutral-400"
                      }`}
                    >
                      {seg}
                    </span>
                  </React.Fragment>
                ))}
              </div>

              {/* Main Folder Title */}
              <div className="flex items-center gap-3">
                <h2 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight uppercase truncate">
                  {folderNode.name}
                </h2>
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-600/20 text-[#ff4d4d] border border-red-500/30 whitespace-nowrap">
                  {allImages.length} SAMPLES
                </span>
              </div>
            </div>

            {/* Search Input & Close Action */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Quick Filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter samples by name..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
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

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subfolders Navigation Pills (if this folder has children) */}
          {folderNode.children && folderNode.children.length > 0 && (
            <div className="px-4 sm:px-6 py-2.5 border-b border-neutral-800 bg-neutral-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#ff4d4d]" />
                <span>SUB-FOLDERS ({folderNode.children.length}):</span>
              </span>
              {folderNode.children.map((child) => (
                <button
                  key={child.path}
                  onClick={() => {
                    if (onSelectSubfolder) onSelectSubfolder(child);
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 font-mono text-xs text-neutral-200 hover:text-white transition-all cursor-pointer group"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#ff4d4d] group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[200px]">{child.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400 group-hover:text-white">
                    {child.totalFiles}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Gallery Grid Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {filteredImages.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ImageIcon className="w-12 h-12 text-neutral-600 mx-auto" />
                <h4 className="font-display font-bold text-base text-white">
                  No Samples Found
                </h4>
                <p className="font-mono text-xs text-neutral-400 max-w-sm mx-auto">
                  {searchQuery
                    ? `No products match "${searchQuery}". Try a different filter.`
                    : "No image files are directly in this folder."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {filteredImages.map((img, idx) => {
                  const cleanItemName = img.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .toUpperCase();

                  return (
                    <motion.div
                      key={img.fileId || img.url}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.15 }}
                      onClick={() =>
                        onSelectImage(
                          filteredImages,
                          idx,
                          folderNode.path,
                          folderNode.name
                        )
                      }
                      className="group relative bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 hover:border-red-500/60 rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-md hover:shadow-red-950/40"
                    >
                      {/* Image Thumbnail Container */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/60 flex items-center justify-center mb-2">
                        <img
                          src={img.thumbnail || img.url}
                          alt={cleanItemName}
                          loading="lazy"
                          className="w-full h-full object-contain filter group-hover:scale-108 transition-transform duration-300 drop-shadow-md"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = img.url;
                          }}
                        />

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-2 rounded-full bg-red-600 text-white shadow-xl scale-75 group-hover:scale-100 transition-transform">
                            <ZoomIn className="w-4 h-4" />
                          </span>
                        </div>

                        {/* Sample Code Badge on image */}
                        <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/85 text-white border border-neutral-700/80 shadow">
                          {cleanItemName}
                        </span>

                        {/* Sample Index Badge */}
                        <span className="absolute top-1.5 right-1.5 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-neutral-300 border border-neutral-700">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* Product Action */}
                      <div className="flex items-center justify-between font-mono text-[9px] pt-0.5">
                        <span className="text-neutral-400 font-bold">OEM SAMPLE</span>
                        <span className="text-[#ff4d4d] font-bold group-hover:underline flex items-center gap-0.5">
                          VIEW →
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E21D1D] animate-ping" />
              <span>
                Showing {filteredImages.length} of {allImages.length} products in{" "}
                <span className="text-white font-bold">{folderNode.name}</span>
              </span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 hidden sm:inline">
                Click any image to inspect high-resolution details
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer font-bold"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
