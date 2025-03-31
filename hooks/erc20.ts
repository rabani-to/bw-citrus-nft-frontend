import { BN_ZERO } from "@/lib/constants"
import { erc20Abi, formatUnits, type Address } from "viem"
import { useReadContract } from "wagmi"

export const useAccountBalance = (
  address?: Address,
  tokenAddress?: Address
) => {
  const { data: balance = BN_ZERO, ...result } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi, // Pass the ABI of the contract
    functionName: "balanceOf", // The function you want to call
    args: [address!],
    // Scope helps to cache the data
    // and avoid refetching it when the address changes
    // or when the token address changes
    scopeKey: `balanceOf-${address}-${tokenAddress}`,
    query: {
      // We won't fetch the data if the address is not defined
      // or if the token address is not defined
      enabled: Boolean(address && tokenAddress),
      // We want to refetch the data every 3 seconds
      // to keep the balance up to date
      refetchInterval: 3_000,
    },
  })

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
    scopeKey: `decimals-${tokenAddress}`,
    query: {
      enabled: Boolean(tokenAddress),
    },
  })

  // Expect for both: decimals + balance result to be ready
  const isDataFetched = Boolean(balance && decimals)

  return {
    data: {
      raw: isDataFetched ? balance : BN_ZERO,
      formatted: isDataFetched ? formatUnits(balance, decimals!) : "0.00",
    },
    // We always return hook result to be consistent with other hooks
    ...result,
  }
}
