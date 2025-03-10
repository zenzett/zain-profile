"use client"

import { useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  formatValue = (value) => Math.round(value).toString(),
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(formatValue(latest))
    })
    return unsubscribe
  }, [springValue, formatValue])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}

