import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function noOp() {}

/**
 * Format an ethereum address to a more readable format.
 */
export const beautifyAddress = (
  address: string = "",
  chunkSize = 5,
  separator = "..."
) =>
  `${address.substr(0, chunkSize)}${separator}${address.substr(
    -chunkSize,
    chunkSize
  )}`
