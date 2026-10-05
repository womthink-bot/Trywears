import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  FileCheck, 
  Scale, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Building,
  ChevronRight,
  Zap,
  Globe2,
  Lock,
  Plus,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PageProps {
  onNavigatePage: (page: string) => void;
}

export const SupportPage: React.FC<PageProps> = ({ onNavigatePage }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const SUPPORT_LIST = [
    {
      id: "shipping-policy",
      number: "01",
      category: "shipping",
      title: "Shipping Policy & UK DDP Logistics",
      badge: "DUTY PAID (DDP)",
      tagline: "DHL / FedEx Priority Express (3-5 Days) & Consolidated Air/Ocean Freight",
      videoUrl: "/videos/allPV.mp4",
      kpis: [
        { label: "Courier Air", val: "3-5 Days UK" },
        { label: "Customs DDP", val: "All Taxes Paid" },
        { label: "Tracking", val: "Live GPS" }
      ],
      description:
        "Comprehensive, transparent international B2B export logistics. We offer Delivered Duty Paid (DDP) door-to-door shipping to London, Manchester, Birmingham, Leeds, Glasgow, and worldwide. Zero unexpected import tariffs or customs clearance headaches.",
      highlights: [
        "DHL / FedEx Express 3-5 day doorstep air delivery to UK",
        "Delivered Duty Paid (DDP) - All UK VAT & import taxes covered",
        "Live GPS airway bill tracking provided immediately upon airport dispatch",
        "7-ply double-wall waterproof corrugated master cartons"
      ],
      linkText: "View Full Shipping Policy & Rates"
    },
    {
      id: "return-refund-policy",
      number: "02",
      category: "warranty",
      title: "Return and Refund Policy & Quality Warranty",
      badge: "AQL 1.0 GUARANTEE",
      tagline: "Pre-Production Approval Guarantee & 100% Defect Remanufacture",
      videoUrl: "/videos/aboutV1.webm",
      kpis: [
        { label: "QC Standard", val: "AQL 1.0" },
        { label: "Tolerance", val: "±0.5 cm" },
        { label: "Claim Window", val: "14 Days" }
      ],
      description:
        "Because all garments and fight gear are custom-made to your exact brand specifications, our policy operates on upfront prototype sign-off and strict AQL 1.0 manufacturing standards. Any verified stitching defect or dimensional deviation beyond ±0.5 cm is replaced or credited immediately.",
      highlights: [
        "Pre-Production Sample (PPS) physical approval before bulk starts",
        "100% factory replacement or credit for manufacturing flaws",
        "Strict ±0.5 cm industry dimensional tolerance warranty",
        "14-day defect claim inspection window upon UK delivery"
      ],
      linkText: "View Full Return & Warranty Terms"
    },
    {
      id: "terms-and-conditions",
      number: "03",
      category: "legal",
      title: "Terms and Conditions & IP Protection",
      badge: "MUTUAL NDA & IP SECURITY",
      tagline: "Commercial Supply Agreement & Client Intellectual Property Protection",
      videoUrl: "/videos/leatherBG.mp4",
      kpis: [
        { label: "IP Ownership", val: "100% Client" },
        { label: "Contract", val: "Mutual NDA" },
        { label: "Payment", val: "50/50 Milestones" }
      ],
      description:
        "Your unique designs, logos, patterns, and tech packs remain 100% your exclusive intellectual property. We operate under strict legally binding Non-Disclosure Agreements (NDAs). Standard production operates on a secure 50% deposit and 50% pre-shipment sign-off structure.",
      highlights: [
        "100% client intellectual property ownership guarantee",
        "Mutual Non-Disclosure Agreement (NDA) for all tech packs",
        "Clear Proforma Invoice (PI) milestone escrow structure",
        "Compliance with UK & International Trade Standards"
      ],
      linkText: "View Complete Terms & Agreement"
    },
    {
      id: "moq-lead-time",
      number: "04",
      category: "moq",
      title: "MOQ and Lead Time Matrix (+)",
      badge: "LOW MOQ 30 PCS",
      tagline: "Fast 7-10 Day Sampling, 14-21 Day Bulk & Emergency Rush Priority Lanes",
      videoUrl: "/videos/streetwearsBG.mp4",
      kpis: [
        { label: "Low MOQ", val: "30 Pcs / Color" },
        { label: "Sampling", val: "7-10 Days" },
        { label: "Rush Lane", val: "10-Day Option" }
      ],
      description:
        "Designed to empower emerging British streetwear founders and growing sports labels to launch without excess deadstock risk. Low minimum order quantities starting from just 30 units per design, with transparent timelines and emergency 10-day rush manufacturing options.",
      highlights: [
        "Low MOQ starting at 30 pcs per design/colorway",
        "Sample turnaround in 7-10 working days",
        "Bulk production completed in 14-21 days",
        "Priority emergency express lines for urgent UK events"
      ],
      linkText: "Explore Interactive MOQ Matrix (+)"
    },
    {
      id: "order-process",
      number: "05",
      category: "workflow",
      title: "Order Process & 6-Step Client Journey",
      badge: "6-STAGE WORKFLOW",
      tagline: "From First Tech Pack to Direct Doorstep UK Delivery",
      videoUrl: "/videos/gymandfitnessBG.mp4",
      kpis: [
        { label: "Quote Time", val: "< 24 Hours" },
        { label: "Stages", val: "6 Key Steps" },
        { label: "Video QC", val: "4K HD Walkthrough" }
      ],
      description:
        "A clear, structured 6-step manufacturing workflow: 1. Inquiry & Free Tech Pack Review, 2. 3D Digital CAD Approval, 3. Physical Pre-Production Sample, 4. Bulk Cut & Sew Production, 5. 100% QA Inspection & 4K Video Sign-Off, and 6. Express DDP Delivery.",
      highlights: [
        "Free tech pack review and price quotation in GBP (£) within 24 hours",
        "360° 3D garment visualization & Pantone dye verification",
        "Pre-production prototype with 100% sample fee refund on bulk",
        "Comprehensive 4K video inspection before final balance dispatch"
      ],
      linkText: "View 6-Step Order Workflow"
    }
  ];

  const filteredSupport = activeFilter === "all"
    ? SUPPORT_LIST
    : SUPPORT_LIST.filter(s => s.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#E21D1D] selection:text-white pb-32 relative overflow-hidden">
      
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <div className="border-b border-neutral-800 bg-[#0c0c12] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-300">
            <button
              onClick={() => onNavigatePage("home")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-200"
            >
              <Building className="w-3.5 h-3.5 text-[#E21D1D]" />
              <span>HOME</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-bold bg-[#d946ef]/20 px-2.5 py-0.5 rounded border border-[#d946ef]/40 text-[#f0abfc]">
              SUPPORT & POLICIES HUB
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 CLIENT ASSURANCE & DEDICATED DESK</span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER WITH AMBIENT GLOW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-6 relative">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#d946ef]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/50 text-[#f0abfc] text-xs font-mono font-bold tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CLIENT ASSURANCE, POLICIES & LOGISTICS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-none">
              CLIENT SUPPORT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] via-white to-red-400">POLICIES HUB</span>
            </h1>
            <p className="text-neutral-100 text-base sm:text-lg font-sans leading-relaxed">
              Transparent trade policies, rapid UK DDP shipping protocols, low minimum order quantities, and factory quality warranties. Everything you need for a seamless and risk-free manufacturing partnership.
            </p>
          </div>

          <button
            onClick={() => onNavigatePage("b2b-quote")}
            className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(226,29,29,0.5)] hover:scale-105 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>CONTACT 24/7 SUPPORT DESK</span>
          </button>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none font-mono text-xs">
          {[
            { id: "all", label: "All Support (5)" },
            { id: "shipping", label: "01. Shipping & DDP" },
            { id: "warranty", label: "02. Quality Warranty" },
            { id: "legal", label: "03. Terms & NDA" },
            { id: "moq", label: "04. MOQ & Lead Time (+)" },
            { id: "workflow", label: "05. Order Process" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all uppercase whitespace-nowrap cursor-pointer font-bold ${
                activeFilter === tab.id
                  ? "bg-[#d946ef] text-white shadow-[0_0_15px_rgba(217,70,239,0.5)] scale-102"
                  : "bg-[#11111a] hover:bg-[#1a1a28] text-neutral-300 border border-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC SUPPORT SECTIONS WITH LIVE VIDEOS & RICH CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-12">
          {filteredSupport.map((sup, idx) => (
            <motion.div
              key={sup.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#0f0f18] border border-neutral-700 hover:border-[#d946ef] transition-all duration-300 shadow-2xl overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual Video & Media Stage (Col 5) */}
                <div className="lg:col-span-5 relative bg-black overflow-hidden min-h-[320px] lg:min-h-full flex items-center justify-center">
                  <video
                    src={sup.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-black/40 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0f18]" />

                  {/* Top Left Live Indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/25 backdrop-blur-md z-10">
                    <span className="w-2 h-2 rounded-full bg-[#d946ef] animate-ping" />
                    <span className="font-mono text-[9px] font-black text-white uppercase tracking-wider">
                      SUPPORT {sup.number} REEL
                    </span>
                  </div>

                  {/* Bottom KPIs Float Card */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="p-3 rounded-2xl bg-black/85 border border-white/20 backdrop-blur-md grid grid-cols-3 gap-2 text-center font-mono shadow-xl">
                      {sup.kpis.map((k, ki) => (
                        <div key={ki}>
                          <span className="text-[9px] text-neutral-400 uppercase block">{k.label}</span>
                          <span className="text-xs font-black text-[#f0abfc] block mt-0.5">{k.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content & Policy Highlights Body (Col 7) */}
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between bg-[#0f0f18]">
                  <div className="space-y-4">
                    
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-black text-[#d946ef] px-3.5 py-1 rounded-xl bg-[#d946ef]/20 border border-[#d946ef]/40">
                          PILLAR {sup.number}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                          {sup.badge}
                        </span>
                      </div>

                      <button
                        onClick={() => onNavigatePage(sup.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>View Dedicated Page</span>
                        <ChevronRight className="w-4 h-4 text-[#d946ef]" />
                      </button>
                    </div>

                    {/* Titles */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight leading-snug">
                        {sup.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-mono font-bold text-[#f0abfc] uppercase tracking-wider mt-1">
                        {sup.tagline}
                      </p>
                    </div>

                    {/* Detailed Paragraph */}
                    <p className="text-white text-sm sm:text-base leading-relaxed font-normal">
                      {sup.description}
                    </p>

                    {/* Spec Bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {sup.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#090910] border border-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-[#d946ef] shrink-0 mt-0.5" />
                          <span className="text-xs font-mono text-neutral-100 font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      onClick={() => onNavigatePage(sup.id)}
                      className="px-6 py-3.5 rounded-xl bg-[#d946ef] hover:bg-fuchsia-600 text-white font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-105"
                    >
                      <span>{sup.linkText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigatePage("b2b-quote")}
                      className="text-xs font-mono text-neutral-300 hover:text-white transition-colors text-center sm:text-right cursor-pointer"
                    >
                      Need support on your order? <span className="text-[#ff4d4d] font-bold underline">Talk to Merchandiser</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. DIRECT CONTACT HELPLINE BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0f0f18] border border-neutral-700 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold text-[#d946ef] uppercase tracking-widest block">
              DIRECT FACTORY COMMUNICATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
              NEED IMMEDIATE ASSISTANCE OR ORDER TRACKING?
            </h3>
            <p className="text-neutral-100 text-sm font-sans leading-relaxed font-normal">
              Our dedicated client merchandisers operate 24/7 on WhatsApp, Email, and Phone to assist you with tech pack evaluations, shipping status, customs documentation, and commercial invoices.
            </p>
          </div>

          <div className="bg-[#090910] p-6 rounded-2xl border border-neutral-700 space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <Mail className="w-4 h-4 text-[#ff4d4d] shrink-0" />
              <span className="text-white font-bold">export@trywears.com</span>
            </div>
            <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-white font-bold">+92 300 0000000 (WhatsApp 24/7)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#d946ef] shrink-0" />
              <span className="text-neutral-200">Sialkot Industrial Zone, Pakistan</span>
            </div>
            <button
              onClick={() => onNavigatePage("b2b-quote")}
              className="w-full py-3 mt-2 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase text-center transition-all shadow-md cursor-pointer hover:scale-102"
            >
              START PROJECT INQUIRY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
