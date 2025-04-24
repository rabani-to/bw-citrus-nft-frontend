'use client'

import { Fragment, useState } from 'react'
import { FaEthereum } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useSimulateContract,
  useWriteContract
} from 'wagmi'
import { formatEther, type Hex, parseAbi, parseEther } from 'viem'
import { ZERO_BN } from '@/lib/viem'
import { useRkAccountModal } from '@/lib/rainbow'
import { toast } from 'sonner'
import { shortifyDecimals } from '@/lib/numbers'

import { arbitrum, base } from 'viem/chains'

export const BADGE_FACTORY_BASE = '0xEA4fe23a97b75a87C972A02cF6b234369869a04C'
export const BADGE_FACTORY_ARBITRUM =
  '0xc8d51aB38927D8D7F2e384111261A11966B3d26f'

export const MINT_ABI = parseAbi([
  'event BadgeMinted(bytes3 indexed lemonId, address indexed recipient, bytes32 collectionId, uint256 tokenId)',
  'function mintBadge(bytes32 _collectionId, address recipient, bytes3 referralCode) external payable',
  'function getCollectionFees(bytes32 collectionId) public view returns (uint256 total)',
  'function getCollectionAddress(bytes32 collectionId) public view returns (address)',
  'function balanceOf(address owner) external view returns (uint256 balance)',
  'function mint(address recipient) external returns (uint256 tokenId)' // owned by factory
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
  const isMintingArb = !isMintingBase

  const ADDRESS = isMintingBase ? BADGE_FACTORY_BASE : BADGE_FACTORY_ARBITRUM

  const CHAIN = isMintingBase ? base : arbitrum

  const { openChainModal } = useRkAccountModal()

  const { writeContractAsync, isPending } = useWriteContract()

  const { address, chainId } = useAccount()

  const { data: mintFees = parseEther('0.00003') } = useReadContract({
    chainId: CHAIN.id,
    abi: MINT_ABI,
    functionName: 'getCollectionFees',
    args: [collectionId],
    address: ADDRESS,
    scopeKey: `fees.${collectionId}.${CHAIN.id}`
  })

  // Balances for both chains
  const { data: arbBalance } = useBalance({
    address,
    chainId: arbitrum.id,
    query: {
      enabled: Boolean(address) && isOpen,
      refetchInterval: 5000 // 5 seconds
    }
  })

  const { data: baseBalance } = useBalance({
    address,
    chainId: base.id,
    query: {
      enabled: Boolean(address) && isOpen,
      refetchInterval: 5000 // 5 seconds
    }
  })

  async function claimAsNFT() {
    if (!address) return toast.error('Please connect your wallet first')
    if (!collectionId) return toast.error('Badge not found')

    if (
      (isMintingBase && chainId !== base.id) ||
      (isMintingArb && chainId !== arbitrum.id)
    ) {
      return openChainModal?.()
    }

    if (
      (isMintingBase && (baseBalance?.value || ZERO_BN) < mintFees) ||
      (isMintingArb && (arbBalance?.value || ZERO_BN) < mintFees)
    ) {
      return toast.error('Insufficient funds')
    }

    const tx = await writeContractAsync({
      abi: MINT_ABI,
      functionName: 'mintBadge',
      address: ADDRESS,
      chain: CHAIN,
      args: [
        collectionId,
        address,
        address ? `0x${address}` : '0x000000' // 3 bytes
      ],
      value: mintFees
    })

    if (tx) {
      toast.success('NFT minted successfully')
      window.open(
        `${
          isMintingBase ? 'https://basescan.org' : 'https://arbiscan.io'
        }/tx/${tx}`,
        '_blank'
      )
      onClose?.()
    }
  }

  return (
    <Fragment>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='max-w-md'>
          <Tabs onValueChange={setTab as any} value={tab}>
            <TabsList className='grid grid-cols-2'>
              <TabsTrigger
                className='text-xl justify-center text-center font-semibold'
                value='base'
              >
                Base Mainnet
              </TabsTrigger>
              <TabsTrigger
                className='text-xl justify-center text-center font-semibold'
                value='arb'
              >
                Arbitrum
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='grid place-items-center'>
            <FaEthereum className='text-4xl mt-4' />
            <p className='mt-2'>
              <strong>
                {shortifyDecimals(
                  formatEther(
                    (isMintingBase ? baseBalance : arbBalance)?.value || ZERO_BN
                  ),
                  6
                )}{' '}
                ETH
              </strong>{' '}
              <span className='opacity-70'>available</span>
            </p>

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

export const useCollectionMintedTimes = (collectionId: Hex) => {
  const BASE_CONFIG = {
    abi: MINT_ABI,
    args: [collectionId],
    functionName: 'getCollectionAddress'
  } as const

  const { data: resuls = [] } = useReadContracts({
    contracts: [
      {
        chainId: base.id,
        address: BADGE_FACTORY_BASE,
        ...BASE_CONFIG
      },
      {
        chainId: arbitrum.id,
        address: BADGE_FACTORY_ARBITRUM,
        ...BASE_CONFIG
      }
    ],
    query: { enabled: Boolean(collectionId) },
    scopeKey: `collection.${collectionId}.addresses`
  })

  const baseAddress = resuls[0]?.result
  const arbAddress = resuls[1]?.result

  console.debug({ baseAddress, arbAddress })

  const BASE_SIMULATION = {
    abi: MINT_ABI,
    functionName: 'mint'
  } as const

  const simulationBase = useSimulateContract({
    ...BASE_SIMULATION,
    account: BADGE_FACTORY_BASE,
    args: [BADGE_FACTORY_ARBITRUM], // Simulate minting to other address
    address: baseAddress,
    chainId: base.id
  })

  const simulationArb = useSimulateContract({
    ...BASE_SIMULATION,
    account: BADGE_FACTORY_ARBITRUM,
    args: [BADGE_FACTORY_BASE], // Simulate minting to other address
    address: arbAddress,
    chainId: arbitrum.id
  })

  const onlyBase = Number(simulationBase.data?.result || 0)
  const onlyArb = Number(simulationArb.data?.result || 0)

  return {
    onlyBase,
    onlyArb,
    total: onlyBase + onlyBase
  }
}