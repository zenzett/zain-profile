"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useAnimationPerformance } from "@/hooks/use-animation-performance";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

const AnimatedCounter = ({ value, duration = 1.5, formatValue = (value) => Math.round(value).toString(), className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const { useMinimalAnimations } = useAnimationPerformance();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  // Adjust spring configuration based on performance
  const springConfig = useMinimalAnimations ? { duration: duration * 0.5 * 1000 } : { duration: duration * 1000 };

  const springValue = useSpring(motionValue, springConfig);

  // If minimal animations, just set the value directly
  useEffect(() => {
    if (useMinimalAnimations) {
      setDisplayValue(formatValue(value));
      return;
    }

    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value, useMinimalAnimations, formatValue]);

  // Only set up the spring animation if not using minimal animations
  useEffect(() => {
    if (useMinimalAnimations) return;

    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(formatValue(latest));
    });
    return unsubscribe;
  }, [springValue, formatValue, useMinimalAnimations]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
