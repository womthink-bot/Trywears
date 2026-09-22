import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Calculator, ArrowUp } from "lucide-react";

export const SportsMotionFX: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
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
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. TOP SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E21D1D] via-red-500 to-[#E21D1D] origin-left z-50 shadow-md shadow-[#E21D1D]/50"
        style={{ scaleX }}
      />

      {/* 2. SUBTLE CYBER-SPORTS MOUSE CURSOR RADIAL SPOTLIGHT */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(226, 29, 29, 0.045), transparent 80%)`
        }}
      />

      {/* 3. FLOATING QUICK B2B RFQ TRIGGER */}
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
