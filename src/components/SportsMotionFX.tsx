import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Calculator, ArrowUp, Sparkles, Activity } from "lucide-react";

export const SportsMotionFX: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);

  // Laser Scanline Position based on scroll
  const scanlineY = useTransform(scrollYProgress, [0, 1], ["0vh", "95vh"]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId: any = null;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = Math.abs(currentScrollY - lastScrollY);
      setScrollVelocity(Math.min(velocity, 40));
      lastScrollY = currentScrollY;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollVelocity(0);
      }, 150);

      if (currentScrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. TOP SCROLL PROGRESS BAR WITH METALLIC SHEEN */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E21D1D] via-red-500 to-[#E21D1D] origin-left z-50 shadow-[0_0_12px_#E21D1D]"
        style={{ scaleX }}
      />

      {/* 2. SUBTLE CYBER-SPORTS MOUSE CURSOR RADIAL SPOTLIGHT */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(226, 29, 29, 0.05), transparent 75%)`
        }}
      />

      {/* 3. CINEMATIC AMBIENT LASER SCANLINE ON SCROLL */}
      {scrollVelocity > 5 && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 h-0.5 z-40 bg-gradient-to-r from-transparent via-[#E21D1D] to-transparent shadow-[0_0_20px_#E21D1D] opacity-70 transition-opacity duration-200"
          style={{ top: scanlineY }}
        />
      )}

      {/* 4. FLOATING QUICK B2B RFQ TRIGGER */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5"
        >
          <a
            href="#b2b-calculator"
            className="flex items-center gap-2 bg-[#E21D1D] hover:bg-red-700 text-white font-mono text-xs font-black py-3 px-4 rounded-2xl shadow-2xl shadow-[#E21D1D]/40 cursor-pointer group"
          >
            <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline uppercase">B2B RFQ CALCULATOR</span>
          </a>

          <button
            onClick={scrollToTop}
            className="self-end p-2.5 bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white rounded-xl shadow-lg hover:border-white/30 transition-all cursor-pointer backdrop-blur-md"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </>
  );
};
