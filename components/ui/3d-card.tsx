"use client"

import type React from "react"
import { useRef, useState } from "react"

import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { cn, throttle } from "@/lib/utils"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  glareOpacity?: number
  tiltDegree?: number
  perspective?: number
  glareSize?: number
  borderRadius?: number
  glarePosition?: { x: number; y: number }
  scale?: number
  disabled?: boolean | null
}

export function ThreeDCard({
  children,
  className,
  glareOpacity = 0.2,
  tiltDegree = 10,
  perspective = 1000,
  glareSize = 100,
  borderRadius = 8,
  scale = 1.02,
  disabled = false,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const { disableTilt, disableGlare } = useAnimationPerformance()

  // If tilt is disabled, use reduced values
  const effectiveDisabled = disabled || disableTilt
  const effectiveTiltDegree = disableTilt ? tiltDegree * 0.5 : tiltDegree
  const effectiveScale = disableTilt ? 1 : scale

  // Throttle mouse move for better performance
  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (effectiveDisabled || !cardRef.current) return

    try {
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX
      const mouseY = e.clientY

      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * effectiveTiltDegree
      const rotateX = ((centerY - mouseY) / (rect.height / 2)) * effectiveTiltDegree

      setRotation({ x: rotateX, y: rotateY })

      // Calculate glare position
      if (!disableGlare) {
        const glareX = ((mouseX - rect.left) / rect.width) * 100
        const glareY = ((mouseY - rect.top) / rect.height) * 100
        setGlarePosition({ x: glareX, y: glareY })
      }
    } catch (error) {
      console.error("Error in 3D card effect:", error)
    }
  }, 16) // ~60fps

  const handleMouseEnter = () => {
    if (!effectiveDisabled) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!effectiveDisabled) {
      setIsHovered(false)
      setRotation({ x: 0, y: 0 })
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden transition-transform", className)}
      style={{
        perspective: effectiveDisabled ? "none" : `${perspective}px`,
        borderRadius: `${borderRadius}px`,
        transform:
          isHovered && !effectiveDisabled
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${effectiveScale})`
            : "rotateX(0) rotateY(0) scale(1)",
        transition: "transform 0.2s ease-out",
        willChange: isHovered ? "transform" : "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isHovered && !effectiveDisabled && !disableGlare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
            borderRadius: `${borderRadius}px`,
          }}
        />
      )}
    </div>
  )
}

