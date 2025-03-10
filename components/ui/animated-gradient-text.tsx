"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function AnimatedGradientText({
  children,
  className,
  from = "from-primary",
  via = "via-secondary",
  to = "to-accent",
}: AnimatedGradientTextProps) {
  const { useSimplifiedEffects } = useAnimationPerformance()

  return (
    <div
      className={cn("animate-text-gradient bg-gradient-to-r bg-clip-text text-transparent", from, via, to, className)}
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: useSimplifiedEffects ? "0% 0%" : "var(--x-position, 0%) var(--y-position, 0%)",
      }}
    >
      {children}
    </div>
  )
}

