"use client"

import { useEffect, useState } from "react"

export function useFormattedDate(date: Date | string) {
  const [formattedDate, setFormattedDate] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFormattedDate(
      new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    )
  }, [date])

  // Return empty string during SSR, actual value after mounting
  return mounted ? formattedDate : ""
}

export function useRandomInt(min: number, max: number) {
  const [randomValue, setRandomValue] = useState(min) // Use consistent initial value
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRandomValue(Math.floor(Math.random() * (max - min + 1)) + min)
  }, [min, max])

  // Return min during SSR, random value after mounting
  return mounted ? randomValue : min
}

