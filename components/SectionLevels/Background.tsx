"use client"

import asset_devastation from "@/assets/devastation.jpg"

export default function Background() {
  return (
    <figure
      className="size-full absolute top-0 left-0"
      style={{
        backgroundImage: `url(${asset_devastation.src})`,
        backgroundSize: "cover",
      }}
    />
  )
}