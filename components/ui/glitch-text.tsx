"use client"

import { useState } from "react"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  disableEffects?: boolean | null
}

export function GlitchText({ text, className, glitchOnHover = true, disableEffects = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const { useSimplifiedEffects } = useAnimationPerformance()

  const handleMouseEnter = () => {
    if (glitchOnHover && !disableEffects) setIsGlitching(true)
  }

  const handleMouseLeave = () => {
    if (glitchOnHover && !disableEffects) setIsGlitching(false)
  }

  // Use simplified effects for better performance
  const shouldUseFullGlitch = isGlitching && !useSimplifiedEffects && !disableEffects

  return (
    <div
      className={cn(
        "relative inline-block",
        isGlitching && useSimplifiedEffects && !disableEffects && "animate-pulse",
        shouldUseFullGlitch &&
          "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-primary/10 after:opacity-50 after:animate-glitch-skew",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={cn("relative inline-block", shouldUseFullGlitch && "animate-glitch")}>{text}</span>
      {shouldUseFullGlitch && (
        <>
          <span className="absolute top-0 left-0 w-full h-full text-primary animate-glitch-1" aria-hidden="true">
            {text}
          </span>
          <span className="absolute top-0 left-0 w-full h-full text-accent animate-glitch-2" aria-hidden="true">
            {text}
          </span>
        </>
      )}
    </div>
  )
}

