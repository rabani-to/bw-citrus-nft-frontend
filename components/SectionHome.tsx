import dynamic from "next/dynamic"

import Link from "next/link"
import MainButton from "@/components/MainButton"
import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

const MainBackground = dynamic(() => import("@/components/MainBackground"))

export default function SectionHome() {
  return (
    <div className="min-h-screen relative">
      <TopNavigation />
      <MainBackground />
    </div>
  )
}

export function TopNavigation() {
  return (
    <nav className="flex px-2 sm:gap-4 z-10 relative h-16 mt-4 items-center justify-between mx-auto max-w-screen-xl w-full">
      <Link href="/">
        <img className="w-24" src="/lemon.svg" alt="" />
      </Link>

      <section className="flex items-center gap-6">
        <LinkItem href="/chapters">Chapters</LinkItem>

        <LinkItem className="hidden sm:block" href="/#COMMUNITY">
          Community
        </LinkItem>

        <LinkItem className="hidden sm:block" href="/#FAQ">
          FAQ
        </LinkItem>
      </section>

      <MainButton className="whitespace-nowrap" href="/#COMMUNITY">
        Join now
      </MainButton>
    </nav>
  )
}

function LinkItem({
  className,
  children,
  href,
}: PropsWithChildren<{
  className?: string
  href: string
}>) {
  return (
    <Link
      href={href}
      className={cn(
        "text-lemon-green font-semibold decoration-2 hover:underline underline-offset-4",
        className
      )}
    >
      {children}
    </Link>
  )
}