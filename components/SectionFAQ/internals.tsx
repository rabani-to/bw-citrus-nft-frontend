"use client"

import type { PropsWithChildren } from "react"
import { AiOutlinePlus } from "react-icons/ai";
import type { JSX } from "react"

export function FAQItem({
  title,
  children,
}: PropsWithChildren<{
  title: string | JSX.Element
}>) {
  return (
    <details>
      <summary
        role="button"
        onClick={(e) => {
          e.preventDefault() // Prevent the default behavior of the summary element

          const parent = e.currentTarget.parentElement
          document.querySelectorAll("details").forEach((current) => {
            if (current !== parent) current.removeAttribute("open")
          })
          parent?.toggleAttribute("open")
        }}
        className="cursor-pointer marker:hidden select-none list-none relative"
      >
        <Divider />

        <div className="nav text-left py-3.5 flex text-lemon-green items-center justify-between">
          <span className="text-lg font-medium">{title}</span>
          <AiOutlinePlus className="text-3xl shrink-0 scale-95" />
        </div>
      </summary>
      <p className="text-lg opacity-85 pb-6 font-normal w-full text-left">
        {children}
      </p>
    </details>
  )
}

export const Divider = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1083 8"
    className="w-full h-3"
    fill="none"
  >
    <path
      fill="#fff"
      d="M16 6H0h3l4-1h3-1c1-1 0-1-1-1h3V3H9c1 0 0 0 0 0h4l2-1h-5l2-1H6l9-1h27a103 103 0 0 0 15 0h217-160l4 1h204l10-1h78l30 1h41l27-1h24l8 1h27a3823 3823 0 0 0 56 0h44a806 806 0 0 1 18 0h126l22 1h204l25 1h17-4 1-16a334053 334053 0 0 1 6 1h2-4 17-24 3-65 31l33 1h22-63 3-7l-4-1-5 1h5-33 8a10581 10581 0 0 1 48 0h45l-2 1h2-8 4a199 199 0 0 1-28 0h-6 30l-3 1a526 526 0 0 1-54-1h-36 45l5 1h48-5 3-5 3l-6 1h-89l-6-1h-80a101 101 0 0 0-12 0H686l-55-1H16Zm839-2h7-34 27ZM708 4h8l1-1h-29v1h6-2 9-5 12ZM270 5h-9 11a12225 12225 0 0 0 26 0h-11 32-7 400a4374 4374 0 0 0 33 0l14 1h153-100l-25-1H357l-5-1-2 1h-80Zm698-2h-36a441 441 0 0 1-21 0h-59a397 397 0 0 1-26-1h-60a282 282 0 0 0-16 0h-83a231 231 0 0 0-25 0h-78a9551 9551 0 0 0-43-1h-16l-20 1H179h434a321 321 0 0 1 18 0h108l4 1 8-1h2l6 1h21a197 197 0 0 0 11 0h30a115 115 0 0 1 12 0h172l3 1 7-1h7l14 1h10l-3-1h-36 1-6 2-36ZM476 3H376h3-15 1-44 70-11 96Zm338 2h130-48a11873 11873 0 0 1-43 0h-39ZM619 4h102a596 596 0 0 1 20 0H619Zm224 1h2l13 1h15l10-1 1 1h66-6l-12-1a902 902 0 0 0-19 0h-70ZM329 3h-5 14-59 31-3 22Zm-35 1h35-35Zm421 1h51a92 92 0 0 0 3 0h-19a80973 80973 0 0 1-25 0h-10Zm28-1h3l14 1h25l-42-1ZM624 3h-43 43Zm32 1 1-1h-21l5 1h20-5Zm242 0 23 1-3-1h-20ZM276 6h42-42Zm255-2h-1 16a399 399 0 0 0-15 0Zm216 0a196 196 0 0 1 16 0h4-20ZM534 3h10a9178 9178 0 0 1 2 0h-22 15-5Zm290 4h-38 38Zm133-1h40-40ZM384 4h-31 31Zm615 2h-1 2a4057 4057 0 0 0 16 0h-17ZM871 4h-7 15-8ZM722 6h23-23Zm163-2a217 217 0 0 0 5 0h-5 3-3ZM783 7Zm151-1ZM426 3h-13 13Zm607 3V5h-17l17 1ZM354 4h14-14Zm440 0h12-12ZM395 3h16-16Zm346 1h-9 9ZM349 6h11-11Zm622-1h-15 16-1ZM824 7h-12 12ZM702 6h-15 15ZM512 4h-10 10ZM326 4h-15 15Zm707-1ZM411 4h-11 11Zm345 0h-8 8Zm278 2h-4 4ZM350 4h-7 7Zm312 1h-9 9ZM512 3h-12 12Zm510 3h-5 5Zm21 2-9-1 9 1Zm-97-3ZM675 5h-8 8Zm41-1h4-4ZM549 4h-4 4Zm-28 0h-5 5Zm150 2h-5 5Zm184-4h-6 6ZM504 3h4-4Zm210 3h-8 8Zm231 0h-7 7ZM842 4h5-5ZM613 4h-4 4Zm61 2h6-6Zm44-4 6-1-6 1Zm187 4h5-5ZM459 3h-4 4Zm445 1h4-4Zm37 2h-4 4ZM564 4h-3 3Zm116 0h-4 4Zm2-1h-4 4Zm163-1h2-2Zm185 6h-3 3Zm-39-4h-2 2ZM667 4h3-3ZM414 6h-1 3-2Zm480-2h-2 2ZM788 5h2-2Zm218 0h-3 3Zm40-2h-2 2ZM565 3h2-2Zm243-1h2-2ZM528 3h2-2Zm-37 0h-2 2Zm396 3h2-2ZM478 3h2-2Zm96 0h2-2Zm358 1v1l1-1h-1Zm101-1h2-2ZM374 4h-1 1Zm131 1h-3 3Zm314-1h-1 1Zm191 1h-1 1ZM488 4h-1 1Zm343 3h-1 1Zm-39-3Zm-8 0a48 48 0 0 0 1 0h-1Zm-61 0h2-2Zm88 0h2-2Z"
    />
  </svg>
)