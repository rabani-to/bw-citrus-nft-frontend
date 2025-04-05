"use client"

import type { JSX, PropsWithChildren } from "react"
import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import { PowerGlitch } from "@/lib/powerglitch"
import { cn } from "@/lib/utils"

import asset_profile_banner_r from "@/assets/profile-banner-r.png"
import asset_profile_banner_l from "@/assets/profile-banner-l.png"
import asset_tape from "@/assets/tape.png"
import asset_tape_green from "@/assets/tape-green.png"
import asset_board from "@/assets/board.png"

export function StepBoard({
  className,
  children,
  position,
  whitelistCount,
}: PropsWithChildren<{
  position: "left" | "right"
  whitelistCount?: number
  className?: string
}>) {
  return (
    <section
      className={cn(
        "flex-grow max-w-[36rem] sm:max-w-none -translate-y-6 sm:translate-y-0 sm:pt-20",
        className
      )}
    >
      <div className="relative">
        <div className="z-1 relative sm:absolute pt-12 sm:pt-4 px-8 pb-20 sm:pb-8 inset-0 flex flex-col items-center">
          <figure className="absolute flex justify-center top-full sm:top-0 left-0 w-full">
            <TapeContainer
              color="green"
              className={cn(
                "top-0 pt-1.5 pb-0.5 text-center px-7 sm:absolute -translate-y-7",
                position === "left"
                  ? "left-0 sm:-translate-x-3"
                  : "right-0 sm:translate-x-6"
              )}
            >
              <nav className="flex sm:block items-center justify-center gap-2">
                <div className="text-xl">WHITELISTED</div>
                <div className="text-3xl sm:text-4xl sm:-mt-2">
                  {whitelistCount || "0"} PPL
                </div>
              </nav>
            </TapeContainer>
          </figure>

          {children}
        </div>

        <figure className="absolute inset-0 sm:relative">
          <Image
            className="size-full sm:size-auto"
            placeholder="blur"
            alt=""
            src={asset_board}
          />
        </figure>
      </div>
    </section>
  )
}

export function NFTProfile({
  label,
  title,
  imageSRC,
  position,
  actionTrigger,
  className,
}: {
  label: string
  title: string
  imageSRC: StaticImageData
  actionTrigger?: JSX.Element
  position: "left" | "right"
  className?: string
}) {
  return (
    <div
      className={cn("relative text-black z-1 w-full max-w-[28rem]", className)}
      style={{
        filter:
          position === "left"
            ? "drop-shadow(41px 6px 38px black)"
            : "drop-shadow(-41px 6px 38px black)",
      }}
    >
      <div className="absolute p-10 inset-0 flex flex-col items-center">
        <TapeContainer className="text-5xl -mt-20">{label}</TapeContainer>

        <Image
          onLoad={(e) => {
            PowerGlitch.glitch(e.currentTarget, {
              playMode: "hover",
              hideOverflow: false,
              timing: {
                duration: 450,
                iterations: 1,
              },
              shake: {
                velocity: 5,
                amplitudeX: 0.05,
                amplitudeY: 0.08,
              },
              slice: {
                count: 4,
                velocity: 10,
              },
            })
          }}
          placeholder="blur"
          alt=""
          src={imageSRC}
        />

        <h1 className="font-wbb mb-4 mt-6 text-6xl text-center">{title}</h1>

        {actionTrigger}
      </div>

      <Image
        placeholder="blur"
        alt=""
        src={
          position === "left" ? asset_profile_banner_r : asset_profile_banner_l
        }
      />
    </div>
  )
}

export function Step({
  children,
  className,
  number,
}: PropsWithChildren<{ number: number; className?: string }>) {
  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row sm:gap-6 items-center font-wbb",
        className
      )}
    >
      <span className="text-4xl whitespace-nowrap">STEP {number}</span>
      <span className="text-2xl max-w-[28rem] sm:max-w-none text-center sm:text-left w-full sm:pr-4 description">
        {children}
      </span>
    </nav>
  )
}

export function TapeContainer({
  children,
  className,
  color = "black",
}: PropsWithChildren<{
  className?: string
  color?: "black" | "green"
}>) {
  return (
    <div className={cn("relative px-12 py-7", className)}>
      <figure className="absolute inset-0">
        <Image
          fill
          className="size-full"
          placeholder="blur"
          src={color === "black" ? asset_tape : asset_tape_green}
          alt=""
        />
      </figure>
      <div
        className={cn(
          "whitespace-nowrap relative z-1 font-wbb",
          color === "black" ? "text-lemon-green" : "text-black"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function ModalLink({
  children,
  href,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      className="underline underline-offset-4 decoration-black/40 hover:decoration-black"
      target="_blank"
      href={href}
    >
      {children}
    </Link>
  )
}