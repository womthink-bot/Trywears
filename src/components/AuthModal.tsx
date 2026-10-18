import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  User,
  Building,
  Tag,
  ArrowRight,
  Eye,
  Check,
  Flame,
  Shirt,
  Dumbbell,
  Package
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const COUNTRY_CODES = [
  { code: "+1", country: "US / CA" },
  { code: "+44", country: "United Kingdom" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+31", country: "Netherlands" },
  { code: "+971", country: "UAE" },
  { code: "+92", country: "Pakistan" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+81", country: "Japan" }
];

const INTEREST_OPTIONS = [
  { id: "sports", label: "Sports Wears & Uniforms", icon: Shirt, badge: "TEAMWEAR" },
  { id: "gym", label: "Gym & Fitness Compression", icon: Dumbbell, badge: "ACTIVEWEAR" },
  { id: "street", label: "Streetwear & Heavyweight Hoodies", icon: Flame, badge: "FRENCH TERRY" },
  { id: "jackets", label: "Leather & Varsity Jackets", icon: ShieldCheck, badge: "COWHIDE/WOOL" },
  { id: "combat", label: "Martial Arts & Boxing Gear", icon: Sparkles, badge: "FIGHTWEAR" },
  { id: "custom", label: "Custom OEM & Private Label", icon: Package, badge: "OEM FACTORY" }
];

const VOLUME_OPTIONS = [
  "20 – 50 Pcs (Startup / Boutique Drop)",
  "50 – 200 Pcs (Core Collection Run)",
  "200 – 500 Pcs (Scale & Retail Distribution)",
  "500 – 2,000+ Pcs (Established Brand Volume)"
];

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signUp, signIn, isAuthenticated, user, logout } = useAuth();

  const [mode, setMode] = useState<"signup" | "signin">("signup");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Sports Wears & Uniforms",
    "Streetwear & Heavyweight Hoodies"
  ]);
  const [orderVolume, setOrderVolume] = useState(VOLUME_OPTIONS[1]);

  // Sign In Field
  const [signInIdentifier, setSignInIdentifier] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  if (!isAuthModalOpen) return null;

  const toggleInterest = (label: string) => {
    setSelectedInterests((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage("Please enter your phone or WhatsApp number.");
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (selectedInterests.length === 0) {
      setErrorMessage("Please select at least one product category of interest.");
      return;
    }

    signUp({
      name: fullName.trim(),
      phone: `${countryCode} ${phoneNumber.trim()}`,
      email: emailAddress.trim(),
      company: companyName.trim() || undefined,
      interests: selectedInterests,
      orderVolume
    });

    setIsSuccessToast(true);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signInIdentifier.trim()) {
      setErrorMessage("Please enter your registered email address or phone number.");
      return;
    }

    signIn(signInIdentifier.trim());
    setIsSuccessToast(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#090d16] border-2 border-neutral-700/80 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto text-white"
        >
          {/* Top Brand Banner Header */}
          <div className="relative px-5 sm:px-8 pt-6 pb-5 bg-gradient-to-b from-[#121a2e] to-[#090d16] border-b border-neutral-800">
            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close and continue in preview mode"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                100% FREE B2B ACCESS · ZERO HIDDEN FEES
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Unlock className="w-6 h-6 text-[#E21D1D] shrink-0" />
              <span>UNLOCK FULL FACTORY CATALOG</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-mono mt-1 leading-relaxed">
              Sign up free to instantly remove catalog blur, inspect high-resolution export photos, and unlock wholesale FOB tier pricing.
            </p>

            {/* Mode Selector Tabs */}
            <div className="flex items-center gap-2 mt-4 p-1 rounded-xl bg-black/60 border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
                  mode === "signup"
                    ? "bg-[#E21D1D] text-white shadow-lg shadow-red-950/50"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                1. Free Sign Up (Instant Unlock)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
                  mode === "signin"
                    ? "bg-neutral-800 text-white shadow-lg"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                2. Returning Buyer Sign In
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-5 sm:px-8 py-5 max-h-[68vh] overflow-y-auto">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {mode === "signup" ? (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                {/* 1. Name & Company Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span>Your Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Brand / Club / Company</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Apparel / Gym Club"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>

                {/* 2. Phone / WhatsApp & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-2 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-neutral-200 font-mono text-[11px] focus:outline-none focus:border-red-500 shrink-0"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} ({c.country})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 555-019-2831"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>

                {/* 3. Products of Interest Multi-Select */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E21D1D]" />
                      <span>What Products Are You Interested In? *</span>
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Select all that apply
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((opt) => {
                      const isSelected = selectedInterests.includes(opt.label);
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleInterest(opt.label)}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "bg-red-950/40 border-red-500 text-white shadow-md shadow-red-950/30"
                              : "bg-[#0b101c] border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#E21D1D]" : "text-neutral-500"}`} />
                            <span className="font-mono text-xs truncate">{opt.label}</span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? "bg-[#E21D1D] border-red-500 text-white"
                                : "border-neutral-700 bg-neutral-900"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Target Order Volume */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Estimated Batch Volume
                  </label>
                  <select
                    value={orderVolume}
                    onChange={(e) => setOrderVolume(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1526] border border-neutral-700 text-neutral-200 font-mono text-xs focus:outline-none focus:border-red-500 transition"
                  >
                    {VOLUME_OPTIONS.map((vol) => (
                      <option key={vol} value={vol}>
                        {vol}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Sign Up Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E21D1D] via-red-600 to-[#b91313] hover:from-red-600 hover:to-red-700 text-white font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(226,29,29,0.5)] transition-all cursor-pointer active:scale-98"
                >
                  <Unlock className="w-4 h-4" />
                  <span>SIGN UP FREE &amp; UNLOCK PRODUCTS NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Sign In Form */
              <form onSubmit={handleSignInSubmit} className="space-y-4 py-2">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Registered Email Address or Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or phone number"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e1526] border border-neutral-700 text-white font-mono text-xs focus:outline-none focus:border-red-500 transition"
                  />
                  <p className="text-[11px] font-mono text-neutral-400 mt-1">
                    Enter the email or phone number you registered with to restore full catalog unlock.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>SIGN IN &amp; RESTORE FULL ACCESS</span>
                </button>
              </form>
            )}

            {/* Bottom Guarantee & Dismiss */}
            <div className="pt-4 mt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict privacy guarantee. No spam, ever.</span>
              </span>

              <button
                type="button"
                onClick={closeAuthModal}
                className="text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
              >
                Continue in preview mode (blurred)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
