import { BN_ZERO } from "@/lib/constants"
import { erc721Abi, type Address } from "viem"
import { useReadContract } from "wagmi"

export const useNftBalance = (
  address?: Address,
  nftAddress?: Address
) => {
  const { data: balance = BN_ZERO, ...result } = useReadContract({
    address: nftAddress,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [address!],
    scopeKey: `nftBalanceOf-${address}-${nftAddress}`,
    query: {
      enabled: Boolean(address && nftAddress),
      refetchInterval: 3_000,
    },
  })

  const isDataFetched = Boolean(balance)

  return {
    data: {
      raw: isDataFetched ? balance : BN_ZERO,
      // Para un NFT el balance es simplemente la cantidad que tiene (ej: 1, 2, etc.)
      formatted: isDataFetched ? balance.toString() : "0",
    },
    ...result,
  }
}
