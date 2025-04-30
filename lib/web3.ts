'use client'

import '@rainbow-me/rainbowkit/styles.css'

import { type PropsWithChildren } from 'react'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { arbitrum, base } from 'viem/chains'

import {
  rainbowWallet,
  bitgetWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets'

const config = getDefaultConfig({
  appName: 'lemon-dapp',
  projectId: '2c41a1b0c6a0be9633853d10732dd8ee',
  chains: [arbitrum, base],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        bitgetWallet,
        rainbowWallet,
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet
      ]
    }
  ],
  ssr: true
})

const client = new QueryClient()

export const Provider = ({ children }: PropsWithChildren) => {
	return (
	  <WagmiProvider config={config}>
		<QueryClientProvider client={client}>
		  <RainbowKitProvider showRecentTransactions>
			{children}
		  </RainbowKitProvider>
		</QueryClientProvider>
	  </WagmiProvider>
	)
  }