import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Calculator, ArrowUp, Sparkles, Activity } from "lucide-react";

export const SportsMotionFX: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animFrame: number;
    let isTicking = false;

    const handleScroll = () => {
      if (!isTicking) {
        animFrame = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 400) {
            setShowScrollTop(true);
          } else {
            setShowScrollTop(false);
          }
          lastScrollY = currentScrollY;
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animFrame);
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
        style={{ scaleX: scrollYProgress }}
      />

      {/* 2. FLOATING QUICK SCROLL TO TOP */}
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={scrollToTop}
            className="p-3 bg-neutral-900/90 border border-white/15 text-neutral-300 hover:text-white rounded-xl shadow-lg hover:border-white/30 transition-all cursor-pointer backdrop-blur-md hover:bg-neutral-800"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </>
  );
};
