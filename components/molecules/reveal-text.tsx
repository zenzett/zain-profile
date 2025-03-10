"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
}

const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  once = true,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
    // Add rootMargin to trigger earlier for better UX
    rootMargin: "100px",
  })
  const { useMinimalAnimations, duration } = useAnimationPerformance()

  // Simplified variants for better performance
  const variants = useMinimalAnimations
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay: useMinimalAnimations ? 0 : delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default RevealText

