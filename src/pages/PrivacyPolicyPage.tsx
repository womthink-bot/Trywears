import React from "react";
import {
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  EyeOff,
  Database,
  Globe
} from "lucide-react";

interface PrivacyPolicyPageProps {
  onNavigatePage: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigatePage }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#E21D1D] selection:text-white pb-24 space-y-20">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E21D1D]/20 via-red-950/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 text-[#E21D1D] text-xs font-mono font-bold tracking-widest uppercase">
            <Lock className="w-3.5 h-3.5 text-[#E21D1D]" />
            <span>B2B INTELLECTUAL PROPERTY & DATA PRIVACY CHARTER</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.1]">
            PRIVACY POLICY & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-neutral-400">IP PROTECTION NDA</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-mono max-w-3xl mx-auto uppercase leading-relaxed">
            Try Wears enforces the highest standard of international trade confidentiality. Your design sketches, vector artworks, CLO 3D blueprints, custom sizing grading, and client identities are legally protected under strict factory non-disclosure protocols.
          </p>

          <div className="text-xs font-mono text-neutral-500">
            LAST REVISED & LEGALLY AUDITED: SEPTEMBER 2026 • GLOBAL B2B COMPLIANCE
          </div>
        </div>
      </section>

      {/* 2. CORE PRIVACY PILLARS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Article 1 */}
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#E21D1D] uppercase">
            <EyeOff className="w-4 h-4" />
            <span>ARTICLE 01 • PROPRIETARY DESIGN & TECH PACK CONFIDENTIALITY</span>
          </div>
          <h3 className="text-xl font-display font-black text-white uppercase">
            100% NON-DISCLOSURE GUARANTEE (NDA ENFORCED)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            All design files, Tech Packs, artwork vectors, CAD files, pattern specifications, colorway formulas, and proprietary blends submitted to Try Wears remain the exclusive intellectual property of the client. Try Wears will never display, duplicate, sell, or disclose your custom designs to third parties, competitors, or open marketplace platforms without explicit written authorization.
          </p>
        </div>

        {/* Article 2 */}
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#E21D1D] uppercase">
            <Lock className="w-4 h-4" />
            <span>ARTICLE 02 • PRIVATE LABEL & OEM TRADEMARK INTEGRITY</span>
          </div>
          <h3 className="text-xl font-display font-black text-white uppercase">
            WHITE-LABEL DISPATCH & ZERO FACTORY BRANDING
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Unless authorized by a co-branding sponsorship agreement, all OEM manufactured merchandise is strictly shipped under 100% white-label conditions. Custom neck tags, hangtags, care labels, barcoded polybags, and outer master cartons will display solely your brand identity and registered trademarks.
          </p>
        </div>

        {/* Article 3 */}
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#E21D1D] uppercase">
            <Database className="w-4 h-4" />
            <span>ARTICLE 03 • SECURE DATA STORAGE & ENCRYPTION</span>
          </div>
          <h3 className="text-xl font-display font-black text-white uppercase">
            256-BIT SSL ENCRYPTED TRANSMISSION & CLOUD VAULT
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Client contact credentials, order history, billing documents, and vector assets transmitted via our website, REST APIs, or secure file transfer protocols are encrypted with AES-256 bit protocols. We adhere strictly to GDPR (EU General Data Protection Regulation) and CCPA standards. We never sell or lease business data.
          </p>
        </div>

        {/* Article 4 */}
        <div className="p-8 rounded-3xl bg-neutral-900/70 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono font-bold text-[#E21D1D] uppercase">
            <Globe className="w-4 h-4" />
            <span>ARTICLE 04 • CUSTOMS COMPLIANCE & INTERNATIONAL LOGISTICS</span>
          </div>
          <h3 className="text-xl font-display font-black text-white uppercase">
            LEGAL CUSTOMS DECLARATION & INVOICE INTEGRITY
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            All export documentation, commercial invoices, and airway bills are structured in full compliance with international trade laws (Incoterms 2020 DDP, FOB, CIF). Commercial details are shared strictly with certified customs authorities and logistics carriers (DHL, FedEx, Maersk) solely to ensure clearance and delivery.
          </p>
        </div>

      </section>

      {/* 3. EXECUTE MUTUAL NDA CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-white/10 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#E21D1D]/10 border border-[#E21D1D]/30 flex items-center justify-center text-[#E21D1D] mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-display font-black text-white uppercase">
            NEED A FORMAL BILATERAL NDA SIGNED BY OUR DIRECTORS?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-xl mx-auto">
            We are glad to execute your company's standard bilateral Non-Disclosure Agreement before receiving your proprietary CAD files or 3D mockups.
          </p>
          <a
            href="mailto:legal@trywears.com?subject=Mutual%20NDA%20Execution%20Request"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Email Legal Team for Custom NDA</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
