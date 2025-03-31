import {
  useAccountModal,
  useConnectModal,
  useChainModal,
} from "@rainbow-me/rainbowkit"

import { useAccount, useSwitchChain } from "wagmi"

export const useRkAccountModal = () => {
  const { isConnected, address } = useAccount()
  const { openChainModal } = useChainModal()
  const { openConnectModal = openChainModal } = useConnectModal()
  const { openAccountModal = openConnectModal } = useAccountModal()
  const chainSwitch = useSwitchChain()

  return {
    address,
    chainSwitch,
    isConnected,
    openAccountModal,
    openConnectModal,
    openChainModal,
  }
}
