"use client";

import { useAnimationPerformance } from "@/hooks/use-animation-performance";
import { cn } from "@/lib/utils";

import type React from "react";
interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

const AnimatedGradientText = ({ children, className, from = "from-primary", via = "via-secondary", to = "to-accent" }: AnimatedGradientTextProps) => {
  const { useSimplifiedEffects } = useAnimationPerformance();

  // If simplified effects, use a static gradient instead of animated
  const gradientClasses = useSimplifiedEffects ? `bg-gradient-to-r bg-clip-text text-transparent ${from} ${via} ${to}` : `animate-text-gradient bg-gradient-to-r bg-clip-text text-transparent ${from} ${via} ${to}`;

  return (
    <div
      className={cn(gradientClasses, className)}
      style={{
        backgroundSize: useSimplifiedEffects ? "100% 100%" : "200% 200%",
        backgroundPosition: useSimplifiedEffects ? "0% 0%" : "var(--x-position, 0%) var(--y-position, 0%)",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedGradientText;
