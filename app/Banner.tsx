"use client"

import { atomWithStorage } from "jotai/utils"
import { useAtom, atom } from "jotai"
import { Fragment, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const storageAtom = atomWithStorage("show.nft.banner", true)
const defaultAtom = atom(true)

const WITH_STORAGE = false // * Disable for Cartel Banner Launch
export default function Banner() {
  const { toast } = useToast()
  const [show, setShow] = useAtom(WITH_STORAGE ? storageAtom : defaultAtom)

  useEffect(() => {
    if (show) {
      toast({
        title: "🍋 Join the Zealy Sprint",
        onOpenChange: setShow,
        description: (
          <Fragment>
            <p>
              To celebrate the launch of our NFTs, we have a{" "}
              <Link
                target="_blank"
                className="text-lemon-green"
                href="https://zealy.io/cw/lemondapp/leaderboard/e9e87493-0836-4c5d-8111-f9c64124b4aa"
              >
                Zealy Sprint with 400 USDT in prizes
              </Link>
              .
            </p>
          </Fragment>
        ),
      })
    }
  }, [show])

  return null
}