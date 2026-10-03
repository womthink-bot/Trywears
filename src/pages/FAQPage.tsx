import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Package,
  CreditCard,
  Truck,
  Layers,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQPageProps {
  onNavigatePage: (page: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: "MOQ & Orders" | "Payments & Escrow" | "Shipping & Lead Times" | "Customization & Tech Packs" | "Quality & Returns";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "MOQ & Orders",
    question: "What is your Minimum Order Quantity (MOQ) per style and colorway?",
    answer: "Our standard B2B production MOQ is 25–30 pieces per model/colorway for luxury hoodies, combat boxing gloves, and sublimated athletic kits. For large customized runs, tiered volume discounts apply at 50, 100, 250, and 500+ units."
  },
  {
    category: "MOQ & Orders",
    question: "Can I split my MOQ across different sizes (e.g. S, M, L, XL, XXL)?",
    answer: "Yes! You can freely distribute your order quantity across standard size breakdowns (XS through 5XL) or provide your own custom garment sizing specs without additional tooling fees."
  },
  {
    category: "MOQ & Orders",
    question: "How does your 100% Sample Fee Refund policy work?",
    answer: "When you order a customized physical prototype and subsequently place the bulk production order (50+ units), 100% of your sample development cost is deducted directly from your bulk production invoice."
  },
  {
    category: "Payments & Escrow",
    question: "What payment methods and B2B terms do you accept?",
    answer: "We accept International Wire Transfer (T/T), Letter of Credit (L/C at sight for large containers), Stripe / Credit Card (for sample prototyping), and B2B Alibaba Trade Assurance Escrow for complete buyer payment protection."
  },
  {
    category: "Payments & Escrow",
    question: "What is your standard production payment schedule?",
    answer: "Standard production terms are 50% deposit to initiate raw material sourcing and CNC cutting, with the remaining 50% balance payable upon completion after you inspect the 360° 4K video inspection and pre-dispatch lab report."
  },
  {
    category: "Shipping & Lead Times",
    question: "What is your turnaround lead time for sample and bulk production?",
    answer: "Physical sample prototypes are manufactured and dispatched in 7–10 working days. Bulk production orders of 100–1,000 units require approximately 14–21 working days depending on custom embroidery and wash complexity."
  },
  {
    category: "Shipping & Lead Times",
    question: "Do you offer DDP (Delivered Duty Paid) shipping to the USA, UK & Europe?",
    answer: "Yes! Under DDP terms, Try Wears handles all international export documentation, air or ocean freight, customs clearance, and import duties. Your shipment arrives directly at your warehouse or retail facility with zero customs hassle."
  },
  {
    category: "Customization & Tech Packs",
    question: "What format should I provide my designs in? What if I don't have a Tech Pack?",
    answer: "We accept Adobe Illustrator (.AI), Vector PDF, Photoshop (.PSD), or high-res PNG files. If you only have sketches, reference photos, or concept mockups, our in-house CAD team will generate a complete production-grade Tech Pack and CLO 3D simulation for you."
  },
  {
    category: "Customization & Tech Packs",
    question: "Can you manufacture custom engraved metal hardware and luxury branded polybags?",
    answer: "Yes! We engineer custom matte black, gunmetal, or gold engraved cord aglets, branded YKK zippers, custom molded silicone patches, woven damask neck labels, and frosted matte zip-lock retail bags with your barcodes."
  },
  {
    category: "Quality & Returns",
    question: "What happens if there are sizing or stitching defects in my shipment?",
    answer: "We manufacture under strict AQL 1.0 zero-defect standards with 100% individual pre-shipment piece audits. In the rare event of any factory manufacturing defect, we provide immediate free priority remanufacturing or instant credit refund."
  },
  {
    category: "Quality & Returns",
    question: "Can I book a live video audit or visit your factory floor in person?",
    answer: "Absolutely. We welcome our brand partners to visit our 100,000 sq ft manufacturing hub in Sialkot, Pakistan or book a live 1-on-1 virtual video inspection with our head production engineer via WhatsApp or Zoom."
  }
];

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigatePage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = ["All Categories", "MOQ & Orders", "Payments & Escrow", "Shipping & Lead Times", "Customization & Tech Packs", "Quality & Returns"];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#E21D1D] selection:text-white pb-24 space-y-20">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E21D1D]/20 via-red-950/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#E21D1D]" />
            <span>KNOWLEDGE BASE & BUYER ASSISTANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.1]">
            FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">B2B QUESTIONS</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-mono max-w-3xl mx-auto uppercase leading-relaxed">
            Everything you need to know about placing custom OEM/ODM orders, sample prototyping, factory pricing tiers, lead times, international freight, and quality guarantees.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="text"
              placeholder="SEARCH QUESTIONS (e.g. MOQ, DDP SHIPPING, ESCROW, TECH PACK)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/20 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#E21D1D] shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & ACCORDION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E21D1D] text-white shadow-[0_0_15px_rgba(226,29,29,0.4)]"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-neutral-900/70 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
                        {faq.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-display font-black text-white uppercase">
                        {faq.question}
                      </h4>
                    </div>

                    <div className={`p-2 rounded-lg bg-black/50 border border-white/10 text-neutral-300 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#E21D1D]" : ""}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-t border-white/5"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-neutral-500 font-mono text-xs">
              No matching questions found for "{searchQuery}". Try another keyword or email our lead engineer below.
            </div>
          )}
        </div>

      </section>

      {/* 3. SPEAK WITH SENIOR ENGINEER DIRECTLY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#E21D1D] uppercase tracking-widest block">
              STILL HAVE QUESTIONS ABOUT YOUR CUSTOM COLLECTION?
            </span>
            <h3 className="text-2xl font-display font-black text-white uppercase">
              SPEAK DIRECTLY TO OUR FACTORY TEAM
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              Get an instant technical consultation on fabric GSM, size curves, or customs tariffs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigatePage("sampling-policies")}
              className="px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              Order Sample Prototype
            </button>
            <a
              href="mailto:b2b@trywears.com"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#E21D1D]" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
