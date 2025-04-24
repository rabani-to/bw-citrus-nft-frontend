import { mainnet, polygon, base, arbitrum } from 'wagmi/chains'

/**
 * Base chain configuration with private RPCs
 */
export const privateBaseTestnet = base

export const baseMainnet = {
  ...base,
  id: 8453,
  name: 'Base Mainnet',
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org'
    }
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org']
    }
  }
} as const

export const CHAIN_ID_BASE = base.id
