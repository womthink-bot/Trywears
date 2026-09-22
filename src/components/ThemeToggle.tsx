import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      id="theme-toggle-button"
      onClick={onToggle}
      className="relative p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-black/40 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer group focus:outline-none"
      title={theme === "light" ? "Switch to Cinematic Dark Mode" : "Switch to Editorial Light Mode"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon className="w-5 h-5 text-neutral-300 group-hover:scale-110 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};
