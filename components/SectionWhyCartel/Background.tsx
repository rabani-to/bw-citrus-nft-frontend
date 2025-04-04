"use client"

import asset_bg_cathedral from "@/assets/cathedral.jpg"

export default function Background() {
  return (
    <figure
      className="size-full absolute top-0 left-0"
      style={{
        backgroundImage: `url(${asset_bg_cathedral.src})`,
        backgroundSize: "cover",
      }}
    />
  )
}