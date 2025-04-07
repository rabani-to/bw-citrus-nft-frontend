import { type PropsWithChildren } from "react"
import { MdOutlineArrowForwardIos } from "react-icons/md"

import { cn } from "@/lib/utils"

export default function SecondaryButton({
  children,
  className,
  onClick,
}: PropsWithChildren<{
  className?: string
  onClick?: () => void
}>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group text-lemon-green text-base font-default font-bold h-12 px-6",
        className
      )}
    >
      <svg
        className="size-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 163 50"
        fill="none"
      >
        <path
          fill="currentColor"
          d="M2 3S1 3 2 3h3-1 1L4 2H3h7l2-1h12l1-1 1 1h8l1-1h6l1 1 2-1h6v1h7l2 1h2l1-1 1 1h3-1 3a997 997 0 0 0 14 0h80l1 1v20l-1 2v6l1 1h-1v2c1 0 0 0 0 0v1l1 1-1 1v3l1 1-1 5v3l-1 1H89l-6-1h-1l-1 1H60l-1-1H1l-1-1v-7s1 0 0 0c0 0 1 0 0 0v-1s1 0 0 0l1-1H0v-2l1-1H0v-2h1v-2H0l1-2V12l1-2V4h1-1 1L2 3Zm159 20h1-1ZM128 4h-1 1-1 1ZM3 11H2h1l-1-1h1v1Zm158-3 1-1h-1l-1 6v-1h1l-1 1v1-1 9h1V9h1l-1-1ZM44 48h3v1l1-1h87v1h19-2l-1-1h-11a499 499 0 0 0-10 0h-11a60 60 0 0 0-6 0H13l-1-1-1 1h-1l-5-1H3v1s-1 0 0 0l1-1v1h3-2 6-4 8-1 8-3 6-1 8c0 1 0 0 0 0h12ZM3 35v-1 13h4v-1H4h4l-1 1h9-1 25-1 7-3 16l1 1 1-1h2-1 5l1 1 1-1h3-1 4v1h1v-1h-1 1v1h1v-1h-1 22-1 21-7 45v-3l1-2-1-2-1-3v-4l2 9v-1h1l-1 1c1 0 0 0 0 0v1l1-1v-5l-1-1v-8 2h1v3h1s-1 0 0 0v-4l1-1v-1l-1-1h1l-1-1v-1l1-1v-3l-1-1 1-3-1-2v-3 1l-1-1V8h1V7v3-3h-14l-2-1h-23 31-1 3-1 7-9l-4-1h-25l-6-1H68l-1-1H42a179 179 0 0 1-8 0l-2 1H3v8l1-1v3l-1 1v-1 4-2 5H2h1v6h1v1H3v-1 2h1l-1 1v6-1ZM129 4h4l1 1h26-4c0-1 0 0 0 0h-1l-2-1h-11a1380 1380 0 0 0-6 0h-7ZM7 3H5h1-1 2Zm154 3Zm-1-1-1-1v1h-1 2ZM3 20v-1 1s-1 0 0 0Zm46 27h-3 3Zm3 0h3-3Zm109-28ZM6 3h1-1Zm149 3v1-1h1-1Zm0 42h-2 2ZM3 5a37 37 0 0 1 0-1L2 5h1Zm139-1h1-1Zm-34 0Zm53 18ZM45 48v1h1l-1-1Zm117-26h-1 1ZM2 15v1-1Zm159 6Zm-2-10v-1 1ZM3 19v-1 1ZM3 9H2h1Zm123-5h1-1ZM29 48h1-1ZM6 47h1-1ZM161 5ZM3 13Zm153 33h1a42 42 0 0 0 0-1l-1 1Zm3-35Zm-6-5h1-1ZM14 47h-1 1Zm36 0h1-1ZM3 30v-1 1ZM141 4Zm-19 0Zm17 0ZM57 49h-1 1ZM2 6V5v1Zm119-2Zm20 44h1-1Zm2-44ZM2 25h1-1ZM150 4ZM3 22v-1 1Zm0 17v1-1Zm31 9h1-1Zm34 0v-1 1ZM7 47Zm6 1 1-1-1 1h1-1Zm106-1Zm-86 1h1-1ZM3 14Zm0 27v1-1Zm158-16ZM7 4Zm62-1h1-1Zm54 1Zm15 0ZM3 12v1-1Zm62 37ZM3 18Zm48 29ZM161 7V6v1Zm-12-3h-1 1Zm12 5ZM3 8Zm158 12Zm0 3ZM3 21Zm0 5v1-1Zm-2 4Zm30 18h-1 1Zm11 1v-1 1Zm25-1v-1 1Zm88 0Zm-84 0v-1 1Zm-21 1Zm-14 0v-1 1Zm121-6ZM118 4h1-1Zm18 0Zm-21 0ZM25 1Zm12 48v-1 1Zm24-1Zm-17 1h-1 1Zm114-16v1-1ZM3 29Zm158-5ZM3 42ZM2 16ZM158 6Z"
        />
      </svg>

      <div className="gap-2 content relative z-1 inline-flex items-center">
        {children}

        <MdOutlineArrowForwardIos className="scale-110 group-hover:translate-x-px" />
      </div>
    </button>
  )
}