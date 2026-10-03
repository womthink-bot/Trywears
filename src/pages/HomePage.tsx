import React from "react";
import { SportsHeroSlider } from "../components/SportsHeroSlider";
import { SportsB2BMarquee } from "../components/SportsB2BMarquee";
import { ScrollDeconstructed3DGarment } from "../components/ScrollDeconstructed3DGarment";
import { CustomProductsShowcase } from "../components/CustomProductsShowcase";
import { BrandLogosMarqueeSection } from "../components/BrandLogosMarqueeSection";
import { FactoryLiveVideoShowcase } from "../components/FactoryLiveVideoShowcase";
import { FashionWearCustomVideoSection } from "../components/FashionWearCustomVideoSection";
import { TShirtCustomizer } from "../components/TShirtCustomizer";
import { WebsiteConfig, Product } from "../types";
import { ShieldCheck, RefreshCw, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HomePageProps {
  config: WebsiteConfig;
  customizerProduct: Product | null;
  onAddToCart: (item: any) => void;
  contactName: string;
  setContactName: (val: string) => void;
  contactSubmitting: boolean;
  contactSuccess: boolean;
  handleContactSubmit: (e: React.FormEvent) => void;
  onNavigatePage: (page: string) => void;
  onOpenMediaFolder?: (folder: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  config,
  customizerProduct,
  onAddToCart,
  contactName,
  setContactName,
  contactSubmitting,
  contactSuccess,
  handleContactSubmit,
  onNavigatePage,
  onOpenMediaFolder
}) => {
  return (
    <div className="space-y-0">
      {/* 1. DYNAMIC SPORTS HERO SLIDER (ANIMATED HUD & CONTROLS - ZERO TEXT ON TOP) */}
      <SportsHeroSlider
        slides={config.hero.slides}
        onOpenMediaFolder={onOpenMediaFolder}
      />

      {/* 2. B2B CLIENT MARQUEE */}
      <SportsB2BMarquee />

      {/* 3. 3D DECONSTRUCTED GARMENT STAGE */}
      <ScrollDeconstructed3DGarment />

      {/* 4. BESPOKE 3D GLOVE / T-SHIRT CUSTOMIZER */}
      <section id="customizer" className="py-24 px-4 sm:px-6 bg-neutral-900/40 dark:bg-black/80 border-y border-neutral-200/60 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              INTERACTIVE BESPOKE ENGINEERING
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              3D BESPOKE PROTOTYPE LAB
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-md mx-auto">
              Simulate colorways, custom leather paneling, embossed brand crests, and metallic piping with real-time B2B tech pack estimation.
            </p>
          </div>

          {customizerProduct ? (
            <TShirtCustomizer product={customizerProduct} onAddToCart={onAddToCart} />
          ) : (
            <div className="text-center py-8 font-mono text-neutral-500 text-xs">No customizable assets active.</div>
          )}
        </div>
      </section>

      {/* 5. BESPOKE CUSTOM PRODUCT MANUFACTURING SHOWCASE */}
      <CustomProductsShowcase />

      {/* 5.1 DYNAMIC RIGHT-TO-LEFT LOGO MARQUEE & LEFT-TO-RIGHT DESCRIPTION SLIDER */}
      <BrandLogosMarqueeSection />

      {/* 6. FACTORY LIVE PRODUCTION & CRAFTSMANSHIP VIDEOS */}
      <FactoryLiveVideoShowcase />

      {/* 7. HIGH-STATUS FASHION WEAR CUSTOMIZATION & BIG VIDEO ATELIER */}
      <FashionWearCustomVideoSection />

      {/* 8. STORIES & TESTIMONIALS SECTION */}
      <section id="stories" className="py-24 px-6 bg-neutral-50 dark:bg-[#050505] border-b border-neutral-200/60 dark:border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              VERIFIED BUYER FEEDBACK
            </span>
            <h2 className="text-4xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              INTERNATIONAL B2B CLIENT REVIEWS
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase max-w-lg mx-auto">
              Read feedback from sportswear founders, fight tournament directors, and fitness apparel wholesalers across USA, UK, Europe, and Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {config.testimonials.map((test, idx) => (
              <div
                key={test.id}
                className="bg-white dark:bg-[#0c0c0c] border border-neutral-200/60 dark:border-white/5 p-8 rounded-3xl relative overflow-hidden group space-y-6 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#E21D1D]">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm dark:text-neutral-300 italic font-sans leading-relaxed text-neutral-700">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="w-10 h-10 bg-[#E21D1D]/10 border border-[#E21D1D]/25 rounded-full flex items-center justify-center font-display font-black text-[#E21D1D] text-xs">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold dark:text-white uppercase">
                      {test.author}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      {test.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DIRECT FACTORY PRODUCTION RFQ FORM */}
      <section id="collaborations" className="py-24 bg-white dark:bg-[#050505] transition-colors border-b border-neutral-200/60 dark:border-neutral-900">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#E21D1D] tracking-widest block uppercase">
              DIRECT FACTORY INQUIRY & SAMPLING
            </span>
            <h2 className="text-3xl font-display font-black tracking-tight dark:text-white uppercase leading-none">
              REQUEST B2B PRODUCTION QUOTE
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase leading-relaxed max-w-lg mx-auto">
              Looking to launch or scale your custom apparel, combat fightwear, or sports kit line? Submit your specifications to receive a direct factory quotation within 4 hours.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-neutral-50 dark:bg-[#0c0c0c]/60 p-8 rounded-3xl border border-neutral-200/60 dark:border-white/5 space-y-6 relative">
            <AnimatePresence>
              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white dark:bg-neutral-950 z-30 rounded-3xl flex flex-col items-center justify-center text-center p-6"
                >
                  <ShieldCheck className="w-12 h-12 text-emerald-500 animate-bounce mb-4" />
                  <h4 className="font-display font-black text-md dark:text-white uppercase">
                    PRODUCTION INQUIRY SECURED
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-2 max-w-sm leading-relaxed">
                    Your RFQ has been routed to our Lead Manufacturing Engineer. We will respond with formal quotation and sample timeline within 4 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Buyer Name / Brand Entity
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MARCUS THOMPSON (APEX ATHLETICS)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value.toUpperCase())}
                  className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Business Email / WhatsApp Hotline
                </label>
                <input
                  type="email"
                  required
                  placeholder="BUYER@BRAND.COM"
                  className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Production Requirements & Estimated Quantities
              </label>
              <textarea
                required
                rows={4}
                placeholder="DESCRIBE YOUR REQUIRED PRODUCT (e.g. 200 Pcs 500-GSM French Terry Hoodies with 3D Puff Print, or 100 Pairs 1.2mm Boxing Gloves)..."
                className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={contactSubmitting}
              className="w-full bg-neutral-950 dark:bg-[#E21D1D] hover:bg-neutral-900 dark:hover:bg-red-750 text-white font-display font-black py-4 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {contactSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>{contactSubmitting ? "TRANSMITTING RFQ..." : "SUBMIT FORMAL PRODUCTION RFQ"}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
