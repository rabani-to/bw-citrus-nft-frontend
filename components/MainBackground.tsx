"use client"

import { Fragment, useRef } from "react"
import Image from "next/image"
import { PowerGlitch } from "@/lib/powerglitch"

import asset_cover from "@/assets/cover.png"
import asset_cover_mobile from "@/assets/main-mobile.jpg"
import asset_cover_eyes from "@/assets/cover-eyes.svg"
import { LOGO_TCC_PLACEHOLDER } from "@/lib/constants"

export default function MainBackground() {
  const ref = useRef<any>(null)

  return (
    <Fragment>
      <Image
        style={{
          backgroundImage: `url(${LOGO_TCC_PLACEHOLDER})`,
          backgroundSize: "cover",
        }}
        onLoad={(e) => {
          e.currentTarget.style.backgroundImage = "none"

          if (ref.current) return
          ref.current = PowerGlitch.glitch(e.currentTarget, {
            playMode: "always",
            hideOverflow: true,
            timing: {
              duration: 3000,
            },
          })
        }}
        width={816}
        height={448}
        className="mx-auto relative mt-40 z-3 w-full max-w-2xl"
        src="/logo.svg"
        alt=""
      />

      <div className="absolute hidden md:block inset-0 pointer-events-none">
        <figure className="absolute eyes inset-0 z-2">
          <style jsx scoped>
            {`
              .eyes {
                animation: eyes 3.5s infinite;
                opacity: 0;
              }

              @keyframes eyes {
                0%,
                100% {
                  opacity: 0;
                }
                90% {
                  opacity: 1;
                }
              }
            `}
          </style>
          <div
            className="size-full object-top object-cover"
            style={{
              backgroundImage: `url(${asset_cover_eyes.src})`,
              backgroundSize: "cover",
            }}
          />
        </figure>

        <figure className="absolute inset-0 z-1">
          <div
            className="size-full object-top object-cover"
            style={{
              backgroundImage: `url(${asset_cover.src})`,
              backgroundSize: "cover",
            }}
          />
        </figure>
      </div>

      <figure className="absolute md:hidden inset-0 pointer-events-none">
        <div
          className="size-full object-top object-cover"
          style={{
            backgroundImage: `url(${asset_cover_mobile.src})`,
            backgroundSize: "cover",
          }}
        />
      </figure>
    </Fragment>
  )
}