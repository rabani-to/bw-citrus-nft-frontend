"use client"

import { Fragment, useEffect } from "react"
import Link from "next/link"

import { TopNavigation } from "@/components/SectionHome"
import { IoIosArrowBack } from "react-icons/io"

import BlackBrush from "@/components/BlackBrush"
import SectionFAQ from "@/components/SectionFAQ"
import { ImSpinner10 } from "react-icons/im"
import { FORM_IDS } from "./constants"
import { redirect } from "next/navigation"

export default function PageForm({
  params,
}: {
  params: {
    id: string
  }
}) {
  useEffect(() => {
    ;(window as any)?.Tally?.loadEmbeds()
  })

  if (!Object.values(FORM_IDS).includes(params.id)) {
    redirect("/404")
  }

  return (
    <Fragment>
      <TopNavigation />
      <div className="h-16 pointer-events-none">
        <BlackBrush className="w-full h-80 relative z-1 -translate-y-40" />
      </div>

      <div className="bg-white p-4 pt-40 pb-24">
        <section className="max-w-2xl relative mx-auto">
          <nav className="flex whitespace-nowrap items-center text-4xl font-wbb text-black">
            <Link
              className="flex group items-center gap-1 py-2 rounded-lg"
              href="/"
            >
              <IoIosArrowBack className="scale-[1.5] text-xl group-hover:-translate-x-px" />
              <span>BACK</span>
            </Link>

            <span className="mx-3 scale-125">/</span>

            <span>
              CLAIM <span>ROLE</span>
            </span>
          </nav>

          <iframe
            onLoad={(e) => {
              document.getElementById("spinner")?.classList.add("hidden")
              e.currentTarget.classList.remove("opacity-0")
            }}
            className="outline-none opacity-0 transition-opacity"
            data-tally-src={`https://tally.so/embed/${params.id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            loading="lazy"
            height="120"
            width="100%"
          />

          <nav
            id="spinner"
            className="flex -mt-4 flex-col text-black items-center justify-center"
          >
            <ImSpinner10 className="animate-[spin_1.5s_infinite_linear] text-6xl" />
            <p className="mt-2 opacity-70 text-sm">Loading content...</p>
          </nav>

          <div className="absolute h-12 w-12 xs:w-56 bg-white bottom-3 right-0"></div>
        </section>
      </div>

      <SectionFAQ className="[&_>_section]:mt-32" theme="light" />
    </Fragment>
  )
}