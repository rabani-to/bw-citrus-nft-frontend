"use client"

import { FaTelegramPlane, FaTiktok, FaDiscord } from "react-icons/fa"
import { SiLinktree } from "react-icons/si"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="px-10 pt-20 pb-16 bg-black w-full">
      <div className="flex gap-4 flex-col md:flex-row mx-auto max-w-screen-xl w-full">
        <figure className="w-full md:mt-4 shrink-0 mx-auto max-w-[10rem]">
          <img src="/lemon-text.svg" alt="" />
        </figure>

        <div className="w-full py-4" />

        <div className="flex flex-col md:flex-row w-full [&_a]:whitespace-nowrap md:text-left text-center gap-8 sm:gap-16">
          <div className="py-4 space-y-2">
            <h2 className="font-medium text-lg whitespace-nowrap">
              The Cartel
            </h2>
            <ul className="font-light gap-2 opacity-80 flex flex-col items-center md:items-start">
              <Link href="/#FAQ">Zealy Sprint (400 USDT)</Link>
              <Link href="/#">Homepage</Link>
              <Link href="/#FAQ">FAQ</Link>
            </ul>
          </div>

          <div className="py-4 space-y-2">
            <h2 className="font-medium text-lg">Lemon Dapp</h2>
            <ul className="font-light gap-2 opacity-80 flex flex-col items-center md:items-start">
              <Link target="_blank" href="https://discord.gg/CDt5R4NK8Z">
                Lemonade Discord
              </Link>
              <Link target="_blank" href="https://lmdt.xyz/">
                Read the docs
              </Link>
              <Link target="_blank" href="https://t.me/lemon_dapp">
                Telegram
              </Link>
            </ul>
          </div>

          <div className="py-4 space-y-2">
            <h2 className="font-medium text-lg">Follow us</h2>

            <ul className="font-light flex items-center space-x-2 justify-center md:justify-start">
              <Link
                target="_blank"
                className="mr-1"
                href="https://discord.com/invite/CDt5R4NK8Z"
              >
                <FaDiscord className="text-2xl scale-125" />
              </Link>

              <Link target="_blank" href="https://linktr.ee/lemon_dapp">
                <SiLinktree className="text-2xl" />
              </Link>

              <Link target="_blank" href="https://www.tiktok.com/@lemon_dapp">
                <FaTiktok className="text-2xl" />
              </Link>

              <Link target="_blank" href="https://t.me/lemon_dapp">
                <FaTelegramPlane className="text-2xl" />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}