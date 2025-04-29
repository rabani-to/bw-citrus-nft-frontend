import { useAccount } from 'wagmi'

export const useConnectedAccount = () => {
  return useAccount()
}