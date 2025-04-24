'use client'

import { isAddress, type Address, type Hex } from 'viem'

import copy from 'copy-to-clipboard'
import { toast } from 'sonner'
import { Fragment, useState } from 'react'
import dynamic from 'next/dynamic'
import { FaShareSquare } from 'react-icons/fa'
import { GiPostStamp } from 'react-icons/gi'

import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import MinterModal, {
  useCollectionMintedTimes
} from '@/app/profile/[nickname]/MinterModal'
import { CHAIN_ID_BASE } from '@/lib/chains'
import { isValidCode } from '@/lib/secure'
import { FaCheckToSlot } from 'react-icons/fa6'
import Tooltip from './Tooltip'

const AnimatedPOAP = dynamic(
  () => import('@/components/learning/AnimatedPOAP'),
  {
    ssr: false,
    loading: () => (
      <figure className='size-60 border-2 bg-black/5 rounded-full' />
    )
  }
)

const PoapMint = ({
  image,
  mintable = true,
  collectionId,
  onOpenChange,
  ownerAddressOrCode,
  trigger,
  nftData
}: {
  collectionId?: Hex
  ownerAddressOrCode?: string
  mintable?: boolean
  image: string
  onOpenChange?: (open: boolean) => void
  trigger: JSX.Element
  nftData?: {
    tokenId: bigint
    chainId: number
    address: Address
  }
}) => {
  const [showMint, setShowMint] = useState(false)

  const isValidOwner =
    ownerAddressOrCode &&
    // Check if the owner is a valid address or code
    (isAddress(ownerAddressOrCode) || isValidCode(ownerAddressOrCode))

  function handleCopyLink() {
    toast('Badge link copied 👌', {
      description:
        'The link to share your NFTs has been copied to your clipboard',
      position: 'bottom-right'
    })

    if (isValidOwner) {
      copy(
        `${location.origin}/badges/${ownerAddressOrCode}/${
          collectionId ? `?id=${collectionId}` : ''
        }`
      )
    }
  }

  const { total: mintedTimes } = useCollectionMintedTimes(collectionId!)

  return (
    <Fragment>
      <MinterModal
        collectionId={collectionId!}
        isOpen={showMint}
        onClose={() => setShowMint(false)}
      />
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent boxed className='max-w-[24rem]'>
          <div className='absolute flex items-center gap-1 top-0 left-0 p-3 text-sm'>
            <FaCheckToSlot className='text-lemon-green-dark text-lg' />
            <strong
              title='Times the badge has been minted as an NFT'
              className='text-lemon-green-dark font-semibold cursor-help'
            >
              {mintedTimes} NFT Minted
            </strong>
          </div>
          <div className='grid pt-4 place-items-center'>
            <AnimatedPOAP imageURL={image} />

            {mintable ? (
              <Button
                onClick={() => setShowMint(true)}
                variant='login'
                className='mt-12 w-full font-semibold text-lg h-12 rounded-xl'
              >
                Mint Badge
              </Button>
            ) : Boolean(nftData?.address && nftData?.tokenId) ? (
              <Button
                variant='login'
                onClick={() => window.open(getPOAPLink(nftData!), '_blank')}
                className='mt-12 trigger w-full font-semibold text-lg h-12 rounded-xl'
              >
                View in OpenSea
              </Button>
            ) : (
              <div className='mt-12' />
            )}

            {isValidOwner ? (
              <Button
                onClick={handleCopyLink}
                className='w-full group gap-4 mt-3 font-semibold text-lg h-12 rounded-xl'
              >
                <span>Share Badge</span>
                <FaShareSquare className='scale-105 group-hover:scale-110' />
              </Button>
            ) : (
              <DialogClose asChild>
                <Button className='w-full mt-3 font-semibold text-lg h-12 rounded-xl'>
                  Close window
                </Button>
              </DialogClose>
            )}

            {mintable ? (
              <p className='text-xs mt-2.5 -mb-1.5 opacity-70'>
                *mint this badge to your NFT collection
              </p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export const getPOAPLink = (nftData: {
  tokenId: bigint
  chainId: number
  address: Address
}) => {
  const BASE_URL =
    nftData.chainId === CHAIN_ID_BASE
      ? `https://opensea.io/assets/base/${nftData.address}/${nftData.tokenId}`
      : `https://opensea.io/assets/arbitrum/${nftData.address}/${nftData.tokenId}`

  return BASE_URL
}

export default PoapMint