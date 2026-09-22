import React, { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  Video, 
  Sparkles, 
  Check, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Layers, 
  Sliders, 
  RefreshCw,
  Play,
  Film,
  Globe,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Hero3DVideoSettings {
  videoUrl: string;
  videoTitle: string;
  isCustomUploaded: boolean;
  enable3DTilt: boolean;
  tiltIntensity: number; // 1 to 3
  isMuted: boolean;
  volume: number; // 0 to 1
  playbackSpeed: number;
  showHoloGrid: boolean;
  show3DParticles: boolean;
  activeMode: "3d-video" | "hologram" | "slides";
}

export const PRESET_3D_VIDEOS = [
  {
    id: "preset-boxing",
    title: "Championship Boxing Gloves 3D Arena Loop",
    category: "Pro Combat",
    url: "https://assets.mixkit.co/videos/preview/mixkit-boxing-gloves-in-a-gym-42171-large.mp4",
    poster: "/media/home-page/b2b-calculator-section/boxing-gloves.jpg",
    description: "Cinematic close-up of elite handcrafted leather gloves in championship lighting."
  },
  {
    id: "preset-punching",
    title: "Heavy Bag Power Impact 3D Motion",
    category: "Training Lab",
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-punching-bag-in-a-dark-gym-42721-large.mp4",
    poster: "/media/home-page/catalog-section/prod-6-rashguard.jpg",
    description: "Dramatic dynamic combat athlete workout with high-contrast cinematic shadows."
  },
  {
    id: "preset-boxer-prep",
    title: "Fight Camp Speed & Agility Combat Sequence",
    category: "Corner Team",
    url: "https://assets.mixkit.co/videos/preview/mixkit-boxer-training-with-a-punching-bag-41982-large.mp4",
    poster: "/media/home-page/hero-section/gym-fitness/bg-gym.jpg",
    description: "High-intensity athletic conditioning with aerodynamic movement and neon backlights."
  },
  {
    id: "preset-impact",
    title: "High-Velocity Striking & Shockwave Focus",
    category: "Armory Test",
    url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-punching-a-boxing-bag-42723-large.mp4",
    poster: "/media/home-page/hero-section/sports-wears/bg-sports.jpg",
    description: "Biomechanics impact testing showcasing durability and glove foam response."
  }
];

interface Hero3DVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: Hero3DVideoSettings;
  onSaveSettings: (settings: Hero3DVideoSettings) => void;
}

export const Hero3DVideoModal: React.FC<Hero3DVideoModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSaveSettings
}) => {
  const [settings, setSettings] = useState<Hero3DVideoSettings>(currentSettings);
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "presets" | "controls">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState(settings.videoUrl);
  const [previewPlaying, setPreviewPlaying] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Sync when currentSettings changes
  React.useEffect(() => {
    setSettings(currentSettings);
    setUrlInput(currentSettings.videoUrl);
  }, [currentSettings]);

  // Handle local video file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate video file
    if (!file.type.startsWith("video/") && !file.name.match(/\.(mp4|webm|mov|m4v)$/i)) {
      setUploadError("Please select a valid video format (.mp4, .webm, .mov)");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setUploadError("Video file size exceeds 100MB limit. Please compress or optimize the video.");
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(15);

    try {
      // 1. Create immediate object URL for instant preview without delay
      const localBlobUrl = URL.createObjectURL(file);
      
      // Update local preview state
      setSettings((prev) => ({
        ...prev,
        videoUrl: localBlobUrl,
        videoTitle: file.name,
        isCustomUploaded: true,
        activeMode: "3d-video"
      }));
      setUploadProgress(45);

      // 2. Read as base64 and upload to server for persistence
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          setUploadProgress(75);

          const response = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.url) {
              setSettings((prev) => ({
                ...prev,
                videoUrl: data.url,
                videoTitle: file.name,
                isCustomUploaded: true,
                activeMode: "3d-video"
              }));
              setUrlInput(data.url);
            }
          }
        } catch (serverErr) {
          console.warn("Backend upload note: using local video stream buffer.", serverErr);
        } finally {
          setIsUploading(false);
          setUploadProgress(100);
        }
      };

      reader.onerror = () => {
        setUploadError("Failed to read video file.");
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || "Failed to process video file.");
      setIsUploading(false);
    }
  };

  // Drag and Drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setSettings((prev) => ({
      ...prev,
      videoUrl: urlInput.trim(),
      videoTitle: "External 3D Video Stream",
      isCustomUploaded: true,
      activeMode: "3d-video"
    }));
  };

  const handleSelectPreset = (preset: typeof PRESET_3D_VIDEOS[0]) => {
    setSettings((prev) => ({
      ...prev,
      videoUrl: preset.url,
      videoTitle: preset.title,
      isCustomUploaded: false,
      activeMode: "3d-video"
    }));
    setUrlInput(preset.url);
  };

  const handleSaveAndClose = () => {
    onSaveSettings(settings);
    onClose();
  };

  const handleResetToDefault = () => {
    const defaultSettings: Hero3DVideoSettings = {
      videoUrl: PRESET_3D_VIDEOS[0].url,
      videoTitle: PRESET_3D_VIDEOS[0].title,
      isCustomUploaded: false,
      enable3DTilt: true,
      tiltIntensity: 2,
      isMuted: true,
      volume: 0.5,
      playbackSpeed: 1,
      showHoloGrid: true,
      show3DParticles: true,
      activeMode: "3d-video"
    };
    setSettings(defaultSettings);
    setUrlInput(PRESET_3D_VIDEOS[0].url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E21D1D]/10 border border-[#E21D1D]/20 flex items-center justify-center">
                <Video className="w-5 h-5 text-[#E21D1D]" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider flex items-center gap-2">
                  <span>3D HERO VIDEO & MEDIA LAB</span>
                  <span className="bg-[#E21D1D] text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                    TRY WEARS 3D
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Upload your 3D animation videos (.mp4 / .webm) or select cinematic fight gear loops
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 pt-4 border-b border-neutral-900 bg-neutral-950 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "upload"
                  ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/25"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload 3D Video File</span>
            </button>

            <button
              onClick={() => setActiveTab("url")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "url"
                  ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/25"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Video Link / URL</span>
            </button>

            <button
              onClick={() => setActiveTab("presets")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "presets"
                  ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/25"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>3D Motion Presets ({PRESET_3D_VIDEOS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("controls")}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "controls"
                  ? "bg-[#E21D1D] text-white shadow-lg shadow-[#E21D1D]/25"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3D Effects & Audio</span>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* TAB 1: FILE UPLOAD (DRAG & DROP) */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-800 hover:border-[#E21D1D] rounded-3xl p-8 sm:p-12 text-center bg-black/40 hover:bg-[#E21D1D]/5 transition-all cursor-pointer group space-y-4"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/m4v"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-neutral-800 group-hover:border-[#E21D1D] flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                    <Upload className="w-8 h-8 text-neutral-400 group-hover:text-[#E21D1D] transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-black text-base text-white uppercase tracking-wider">
                      DROP YOUR 3D RENDERED VIDEO HERE
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono">
                      or click to browse from your computer / phone (.MP4, .WEBM, .MOV)
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Max Size: 100MB • Hardware Accelerated 3D Playback</span>
                  </div>
                </div>

                {/* Upload Status / Progress */}
                {isUploading && (
                  <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white font-bold flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E21D1D]" />
                        PROCESSING 3D VIDEO ASSET...
                      </span>
                      <span className="text-[#E21D1D] font-black">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E21D1D] h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {uploadError && (
                  <div className="p-4 bg-red-950/60 border border-red-800/80 rounded-2xl text-red-200 text-xs font-mono">
                    {uploadError}
                  </div>
                )}

                {/* Helpful Instruction Note */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                    <strong className="text-white uppercase block">Tips for Best 3D Video Quality:</strong>
                    <p>
                      Render your 3D animation (e.g. from Blender, Cinema 4D, After Effects, or 3ds Max) with an aspect ratio of 16:9 or 21:9 at 1080p, 30fps or 60fps, encoded in H.264 MP4. Seamless 5 to 15-second loops produce the smoothest experience!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: URL INPUT */}
            {activeTab === "url" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-mono text-neutral-300 uppercase font-bold block">
                    Direct 3D Video URL (.mp4 / .webm)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://your-domain.com/videos/championship-3d-loop.mp4"
                      className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-[#E21D1D] rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none"
                    />
                    <button
                      onClick={handleApplyUrl}
                      className="bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase px-6 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Apply Link
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-500">
                    Supports direct CDN links, Cloudflare R2, AWS S3, or any publicly accessible MP4 video URL.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: PRESET 3D VIDEOS */}
            {activeTab === "presets" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRESET_3D_VIDEOS.map((preset) => {
                  const isSelected = settings.videoUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#E21D1D]/10 border-[#E21D1D] shadow-lg shadow-[#E21D1D]/20"
                          : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950">
                          <img
                            src={preset.poster}
                            alt={preset.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-[#E21D1D]">
                            {preset.category}
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#E21D1D] text-white p-1 rounded-full">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h5 className="font-display font-black text-sm text-white uppercase">
                            {preset.title}
                          </h5>
                          <p className="text-[10px] font-mono text-neutral-400 mt-1 leading-relaxed">
                            {preset.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-500">FORMAT: MP4 1080P LOOP</span>
                        <span className={`font-bold ${isSelected ? "text-[#E21D1D]" : "text-neutral-400"}`}>
                          {isSelected ? "ACTIVE IN HERO" : "CLICK TO ACTIVATE"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 4: 3D EFFECTS & CONTROLS */}
            {activeTab === "controls" && (
              <div className="space-y-6">
                
                {/* 3D Hero Mode Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-mono text-neutral-300 uppercase font-bold block">
                    Hero Section Presentation Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "3d-video", label: "3D Video Loop", desc: "Cinematic full-bleed video with 3D gyro tilt" },
                      { id: "hologram", label: "3D Hologram Gear", desc: "Interactive 360 rotating glove model" },
                      { id: "slides", label: "3D Multi-Slide", desc: "Sports catalog cards with 3D perspective" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setSettings((p) => ({ ...p, activeMode: mode.id as any }))}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          settings.activeMode === mode.id
                            ? "bg-[#E21D1D]/15 border-[#E21D1D] text-white shadow-md shadow-[#E21D1D]/20"
                            : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span className="font-display font-black text-xs block uppercase">
                          {mode.label}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-500 mt-1 block">
                          {mode.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3D Gyro / Parallax Tilt Toggle & Slider */}
                <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-display font-black text-xs text-white uppercase">
                        Interactive 3D Mouse Parallax & Gyro Tilt
                      </h5>
                      <p className="text-[10px] font-mono text-neutral-400">
                        Hero canvas shifts dynamically in 3D space when moving your cursor or tilting phone
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings((p) => ({ ...p, enable3DTilt: !p.enable3DTilt }))}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        settings.enable3DTilt ? "bg-[#E21D1D]" : "bg-neutral-800"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                          settings.enable3DTilt ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {settings.enable3DTilt && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                        <span>3D TILT INTENSITY</span>
                        <span className="text-white font-bold">
                          {settings.tiltIntensity === 1 ? "Subtle (1x)" : settings.tiltIntensity === 2 ? "Balanced (2x)" : "Intense 3D (3x)"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        value={settings.tiltIntensity}
                        onChange={(e) => setSettings((p) => ({ ...p, tiltIntensity: Number(e.target.value) }))}
                        className="w-full accent-[#E21D1D]"
                      />
                    </div>
                  )}
                </div>

                {/* 3D Overlays (Grid & Particles) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                    <div>
                      <h6 className="font-display font-bold text-xs text-white uppercase">
                        3D Holographic Cyber Grid
                      </h6>
                      <p className="text-[9px] font-mono text-neutral-400">
                        Futuristic perspective floor grid
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings((p) => ({ ...p, showHoloGrid: !p.showHoloGrid }))}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                        settings.showHoloGrid ? "bg-[#E21D1D]" : "bg-neutral-800"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          settings.showHoloGrid ? "left-5.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                    <div>
                      <h6 className="font-display font-bold text-xs text-white uppercase">
                        Dynamic Spark & Particle Mesh
                      </h6>
                      <p className="text-[9px] font-mono text-neutral-400">
                        Floating combat embers in Z-space
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings((p) => ({ ...p, show3DParticles: !p.show3DParticles }))}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                        settings.show3DParticles ? "bg-[#E21D1D]" : "bg-neutral-800"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          settings.show3DParticles ? "left-5.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSettings((p) => ({ ...p, isMuted: !p.isMuted }))}
                      className="p-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                    >
                      {settings.isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#E21D1D]" />}
                    </button>
                    <div>
                      <h6 className="font-display font-bold text-xs text-white uppercase">
                        Video Audio Track
                      </h6>
                      <p className="text-[9px] font-mono text-neutral-400">
                        {settings.isMuted ? "Currently Muted for Autoplay Compliance" : "Sound Enabled"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* LIVE PREVIEW BOX (BOTTOM OF MODAL) */}
            <div className="border border-neutral-800 bg-black/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  CURRENT ACTIVE 3D ASSET: <span className="text-white font-bold">{settings.videoTitle || "No Video Loaded"}</span>
                </span>
                {settings.isCustomUploaded && (
                  <span className="text-[9px] font-mono text-[#E21D1D] bg-[#E21D1D]/10 border border-[#E21D1D]/20 px-2 py-0.5 rounded font-bold">
                    CUSTOM USER 3D VIDEO
                  </span>
                )}
              </div>

              {settings.videoUrl ? (
                <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden bg-neutral-950 border border-white/10 group">
                  <video
                    ref={previewVideoRef}
                    src={settings.videoUrl}
                    autoPlay
                    loop
                    muted={settings.isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80">
                    Preview: {settings.activeMode.toUpperCase()} MODE ACTIVE
                  </div>
                </div>
              ) : (
                <div className="aspect-video max-h-36 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-500">
                  Select a preset or upload your video file above
                </div>
              )}
            </div>

          </div>

          {/* Modal Footer Controls */}
          <div className="p-6 border-t border-neutral-900 bg-neutral-950 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleResetToDefault}
              className="text-neutral-400 hover:text-white font-mono text-xs uppercase flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 font-mono text-xs font-bold text-neutral-300 hover:text-white uppercase transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveAndClose}
                className="px-8 py-3 rounded-xl bg-[#E21D1D] hover:bg-red-700 font-display font-black text-xs text-white uppercase tracking-wider transition-all shadow-xl shadow-[#E21D1D]/30 flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>SAVE & ACTIVATE IN HERO</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
