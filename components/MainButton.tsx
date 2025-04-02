"use client"

import { HTMLProps, useEffect, useRef } from "react"

import Image from "next/image"
import { PowerGlitch } from "@/lib/powerglitch"

import asset_button_bg from "@/assets/bg-button.png"
import { cn } from "@/lib/utils"

export default function MainButton({
  children,
  className,
  ...props
}: HTMLProps<HTMLButtonElement> & {
  asLink?: boolean
  href?: string
  target?: "_blank"
}) {
  const isLink = "href" in props
  const ref = useRef<any>(null)
  useEffect(() => {
    if (!ref.current) return
    PowerGlitch.glitch(ref.current, {
      playMode: "hover",
      hideOverflow: false,
      timing: {
        duration: 350,
        iterations: 1,
      },
      shake: {
        velocity: 4,
        amplitudeX: 0.05,
        amplitudeY: 0.08,
      },
      slice: {
        count: 3,
        velocity: 9,
      },
    })
  })

  const Container = isLink ? "a" : "button"

  return (
    <Container
      {...(props as any)}
      ref={ref}
      className={cn(
        "relative inline-flex items-center text-base font-bold h-12 px-6",
        className
      )}
    >
      <Image
        src={asset_button_bg}
        placeholder="blur"
        className="absolute top-0 left-0 size-full"
        alt=""
      />
      <div className="text-black content relative z-1 inline-flex items-center">
        {children}
      </div>
    </Container>
  )
}