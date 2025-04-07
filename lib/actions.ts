"use server"

import { kv } from "@vercel/kv"
import { toDataPoint } from "./utils"

export const getLevelsData = async () => {
  const [l1, l2, l3, l4] = (await Promise.all(
    ["l1", "l2", "l3", "l4"].map((level) => kv.get(toDataPoint(level)))
  )) as number[]

  return {
    l1,
    l2,
    l3,
    l4,
  }
}