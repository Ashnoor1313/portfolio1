// src/hooks/use-scroll-animation.js
import { useRef, useState, useEffect } from "react";

/**
 * useScrollAnimation
 * Returns { ref, isVisible } — simple IntersectionObserver hook.
 * - ref: attach to the element you want to observe
 * - isVisible: boolean that becomes true when element intersects (threshold 0.12)
 *
 * This hook unobserves after the first intersection (one-time reveal). If you
 * want repeated animations, remove the observer.unobserve(...) call.
 */
export default function useScrollAnimation({ threshold = 0.12, root = null } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // one-time reveal:
            obs.unobserve(entry.target);
          }
        });
      },
      { root, threshold }
    );

    obs.observe(node);

    return () => {
      try {
        obs.disconnect();
      } catch (e) {}
    };
  }, [ref, root, threshold]);

  return { ref, isVisible };
}

