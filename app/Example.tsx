"use client"

import { Button } from "@/components/ui/button"
import { useAccountBalance } from "@/hooks/erc20"
import { beautifyAddress, cn } from "@/lib/utils"
import { useRkAccountModal } from "@/lib/wallet"
import { useAccount } from "wagmi"

const BASE_USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const

export default function Example({ className }: { className?: string }) {
  const { address } = useAccount()
  const { openAccountModal } = useRkAccountModal()
  const { data: balance } = useAccountBalance(address, BASE_USDC_ADDRESS)

  return (
    <div
      className={cn(
        "bg-black/3 border text-center border-black/3 w-full max-w-sm p-6 rounded-2xl",
        className
      )}
    >
      <p className="mt-2">
        <span className="text-5xl font-semibold">
          {
            // Make the number look nicer with commas
            Number(balance.formatted).toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }
        </span>{" "}
        USDC
      </p>

      <p className="text-sm opacity-70">
        {address ? `Connected: ${beautifyAddress(address)}` : "No wallet found"}
      </p>

      <Button
        onClick={openAccountModal}
        className="text-xl rounded-xl h-14 mt-6 w-full"
        size="lg"
      >
        {address ? "Manage Account" : "Connect Wallet"}
      </Button>
    </div>
  )
}
