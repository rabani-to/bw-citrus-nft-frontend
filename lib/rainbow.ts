import {
	useAccountModal,
	useConnectModal,
	useChainModal
  } from '@rainbow-me/rainbowkit'
  
  export const useRkAccountModal = () => {
	const { openChainModal } = useChainModal()
	const { openConnectModal = openChainModal } = useConnectModal()
	const { openAccountModal = openConnectModal } = useAccountModal()
  
	return {
	  openAccountModal,
	  openConnectModal,
	  openChainModal
	}
  }