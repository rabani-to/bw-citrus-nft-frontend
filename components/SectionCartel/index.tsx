"use client"

import useSWR from "swr"
import dynamic from "next/dynamic"
import { getLevelsData } from "@/lib/actions"

import { FORM_IDS } from "@/app/form/[id]/constants"

const LevelOne = dynamic(() => import("./LevelOne"))

export default function SectionCartel() {
  const { data } = useSWR<{
    l1: number
    l2: number
    l3: number
    l4: number
  }>("nfts.numbers", {
    fetcher: async () => {
      return await getLevelsData()
    },
    dedupingInterval: 1000 * 60 * 10, // 10 minutes
    refreshInterval: 1000 * 60 * 5, // 5 minutes
  })

  const openForm = (id: string) => window.open(`/form/${id}`, "_blank")

  return (
    <section
      id="CARTEL"
      className="w-full mt-12 pt-28 mb-24 flex flex-col gap-36 relative z-2 max-w-5xl mx-auto"
    >
      <LevelOne count={data?.l1} onWhitelist={() => openForm(FORM_IDS.L1)} />
    </section>
  )
}