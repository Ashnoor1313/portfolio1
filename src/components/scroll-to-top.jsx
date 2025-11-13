// src/components/ScrollToTop.jsx
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Simple ScrollToTop button (plain JS).
 * Replaces custom Button component so it works without UI libs.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      data-testid="button-scroll-to-top"
      className={`fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      } bg-gradient-to-r from-blue-400 to-pink-400 text-white shadow-[0_0_25px_6px_rgba(0,255,255,0.12)] border border-white/10`}
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </button>
  );
}
