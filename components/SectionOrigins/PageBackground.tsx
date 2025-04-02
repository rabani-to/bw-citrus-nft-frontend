"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

import asset_explainer from "@/assets/explainer.png"

export default function PageBackground({ className }: { className?: string }) {
  const ref = useRef<any>(null)

  const removeBg = () => {
    if (ref?.current?.complete) {
      ref.current.classList.remove("bg-slate-200")
    }
  }

  useEffect(() => removeBg())

  return (
    <img
      ref={ref as any}
      onLoad={removeBg}
      className={cn("w-full bg-slate-200", className)}
      src={asset_explainer.src}
      alt=""
    />
  )
}