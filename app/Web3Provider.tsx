"use client"

import type { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { base } from "wagmi/chains"
import { WagmiProvider, createConfig, http } from "wagmi"
import { fallback } from "viem"

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: fallback([
      // Here we can add our custom RPCs for Base
      // Default to public RPC - HTTP
      http(),
    ]),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export default function Web3Provider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          appInfo={{
            appName: "Web3 Template",
          }}
          modalSize="compact" // or "wide"
        >
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
