'use client'

import { Fragment, useMemo, useState } from 'react'
import { FaEthereum } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { formatEther, parseAbi, parseEther, type Hex } from 'viem'
import { ZERO_BN } from '@/lib/viem'
import { useRkAccountModal } from '@/lib/rainbow'
import { toast } from 'sonner'
import { shortifyDecimals } from '@/lib/numbers'
import { arbitrum, base } from 'viem/chains'

const BADGE_FACTORY_BASE = '0xEA4fe23a97b75a87C972A02cF6b234369869a04C'
const BADGE_FACTORY_ARBITRUM = '0xc8d51aB38927D8D7F2e384111261A11966B3d26f'

const MINT_ABI = parseAbi([
  'event BadgeMinted(bytes3 indexed lemonId, address indexed recipient, bytes32 collectionId, uint256 tokenId)',
  'function mintBadge(bytes32 _collectionId, address recipient, bytes3 referralCode) external payable',
  'function getCollectionFees(bytes32 collectionId) public view returns (uint256 total)',
  'function getCollectionAddress(bytes32 collectionId) public view returns (address)',
  'function balanceOf(address owner) external view returns (uint256 balance)',
  'function mint(address recipient) external returns (uint256 tokenId)'
])

export default function MinterModal({
  collectionId,
  isOpen,
  onClose
}: {
  collectionId: Hex
  isOpen?: boolean
  onClose?: () => void
}) {
  const [tab, setTab] = useState<'base' | 'arb'>('base')
  const isMintingBase = tab === 'base'

  const selectedChain = useMemo(() => {
    return isMintingBase ? base : arbitrum
  }, [isMintingBase])

  const selectedAddress = useMemo(() => {
    return isMintingBase ? BADGE_FACTORY_BASE : BADGE_FACTORY_ARBITRUM
  }, [isMintingBase])

  const { openChainModal } = useRkAccountModal()
  const { address, chainId } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()

  const { data: mintFees } = useReadContract({
    chainId: selectedChain.id,
    abi: MINT_ABI,
    functionName: 'getCollectionFees',
    args: [collectionId],
    address: selectedAddress,
    scopeKey: `fees.${collectionId}.${selectedChain.id}`
  })

  const { data: arbBalance } = useBalance({
    address,
    chainId: arbitrum.id,
    query: { enabled: Boolean(address) && isOpen, refetchInterval: 5000 }
  })

  const { data: baseBalance } = useBalance({
    address,
    chainId: base.id,
    query: { enabled: Boolean(address) && isOpen, refetchInterval: 5000 }
  })

  async function claimAsNFT() {
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!collectionId) {
      toast.error('Badge not found')
      return
    }

    const correctChain = isMintingBase ? base.id : arbitrum.id

    if (chainId !== correctChain) {
      openChainModal?.()
      return
    }

    const balance = isMintingBase ? baseBalance?.value : arbBalance?.value

    if ((balance || ZERO_BN) < (mintFees || parseEther('0.00003'))) {
      toast.error('Insufficient funds')
      return
    }

    const tx = await writeContractAsync({
      abi: MINT_ABI,
      functionName: 'mintBadge',
      address: selectedAddress,
      chain: selectedChain,
      args: [
        collectionId,
        address,
        address ? `0x${address}` : '0x000000'
      ],
      value: mintFees || parseEther('0.00003')
    })

    if (tx) {
      toast.success('NFT minted successfully')
      window.open(
        `${isMintingBase ? 'https://basescan.org' : 'https://arbiscan.io'}/tx/${tx}`,
        '_blank'
      )
      onClose?.()
    }
  }

  function renderBalance() {
    const balance = isMintingBase ? baseBalance?.value : arbBalance?.value
    const formattedBalance = shortifyDecimals(formatEther(balance || ZERO_BN), 6)

    return (
      <p className='mt-2'>
        <strong>{formattedBalance} ETH</strong>{' '}
        <span className='opacity-70'>available</span>
      </p>
    )
  }

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-md'>
          <Tabs onValueChange={setTab as any} value={tab}>
            <TabsList className='grid grid-cols-2'>
              <TabsTrigger className='text-xl justify-center font-semibold' value='base'>
                Base Mainnet
              </TabsTrigger>
              <TabsTrigger className='text-xl justify-center font-semibold' value='arb'>
                Arbitrum
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='grid place-items-center'>
            <FaEthereum className='text-4xl mt-4' />
            {renderBalance()}
            <Button
              disabled={isPending}
              onClick={claimAsNFT}
              className='mt-12 w-full font-semibold text-lg h-12 rounded-xl'
            >
              Mint NFT Badge
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
