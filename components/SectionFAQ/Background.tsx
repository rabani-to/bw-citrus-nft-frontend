"use client"

import asset_bg_bottom from "@/assets/bg-bottom.jpg"
import asset_bg_bottom_white from "@/assets/bg-bottom-white.jpg"

export default function Background({
  theme = "dark",
}: {
  theme?: "dark" | "light"
}) {
  return (
    <figure
      className="size-full absolute top-0 left-0"
      style={{
        backgroundImage: `url(${
          (theme === "dark" ? asset_bg_bottom : asset_bg_bottom_white).src
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    />
  )
}