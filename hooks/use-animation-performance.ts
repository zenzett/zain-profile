"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import useIsMobile from "@/hooks/use-mobile";

export function useAnimationPerformance() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [performanceLevel, setPerformanceLevel] = useState<"high" | "medium" | "low">("high");

  // Check device performance on mount
  useEffect(() => {
    // Simple performance detection based on device memory and processor count
    // This is a basic heuristic and could be improved
    const checkPerformance = () => {
      // @ts-ignore - navigator.deviceMemory is not in the TypeScript types
      const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
      const processors = navigator.hardwareConcurrency || 4; // Default to 4 cores

      if (memory <= 2 || processors <= 2 || isMobile) {
        return "low";
      } else if (memory <= 4 || processors <= 4) {
        return "medium";
      } else {
        return "high";
      }
    };

    // Set performance level based on device capabilities
    setPerformanceLevel(checkPerformance());
  }, [isMobile]);

  // Always respect user's reduced motion preference
  const finalPerformanceLevel = prefersReducedMotion ? "low" : performanceLevel;

  return {
    // Enable animations unless user prefers reduced motion or on low-performance device
    enabled: finalPerformanceLevel !== "low",
    // Use minimal animations if user prefers reduced motion or on low-performance device
    useMinimalAnimations: finalPerformanceLevel === "low",
    // Use simplified effects on medium performance devices
    useSimplifiedEffects: finalPerformanceLevel !== "high",
    // Standard animation duration based on performance level
    duration: finalPerformanceLevel === "high" ? 0.5 : finalPerformanceLevel === "medium" ? 0.3 : 0.1,
    // Disable heavy effects on low performance devices
    disableParallax: finalPerformanceLevel === "low",
    disableTilt: finalPerformanceLevel === "low",
    disableGlare: finalPerformanceLevel !== "high",
    performanceLevel: finalPerformanceLevel,
  };
}
