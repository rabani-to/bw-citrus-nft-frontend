import asset_brush_black from "@/assets/brush.png"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function BlackBrush({ className }: { className?: string }) {
  return (
    <Image src={asset_brush_black} alt="" className={cn("w-full", className)} />
  )
}