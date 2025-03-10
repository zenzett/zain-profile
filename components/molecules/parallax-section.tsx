"use client";

import type React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useAnimationPerformance } from "@/hooks/use-animation-performance";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  overflow?: "hidden" | "visible";
}

const ParallaxSection = ({ children, className, speed = 0.2, direction = "up", overflow = "hidden" }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { disableParallax } = useAnimationPerformance();

  // Always call useScroll hook, but disable it if needed
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use a smaller speed value for better performance
  const optimizedSpeed = speed * 0.5;

  // Create transforms regardless of whether they'll be used
  const y = useTransform(scrollYProgress, [0, 1], ["0%", direction === "up" ? `${-optimizedSpeed * 100}%` : `${optimizedSpeed * 100}%`]);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", direction === "left" ? `${-optimizedSpeed * 100}%` : `${optimizedSpeed * 100}%`]);

  // If parallax is disabled, render without motion effects
  if (disableParallax) {
    return (
      <div ref={ref} className={cn("relative", overflow === "hidden" ? "overflow-hidden" : "", className)}>
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", overflow === "hidden" ? "overflow-hidden" : "", className)}>
      <motion.div style={{ y, x }} className="w-full h-full" transition={{ type: "tween" }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
