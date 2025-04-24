import { keccak256, toHex } from 'viem'

export const toId = (str: string) => keccak256(toHex(str))
export const ZERO_BN = BigInt(0)