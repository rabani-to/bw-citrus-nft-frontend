import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Fragment, useMemo, useState } from 'react'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode-svg'

import { useLemonWallet } from '@/lib/wallet'

import { FaCheck, FaRegCopy } from 'react-icons/fa6'
import { Dialog, DialogContent } from '../ui/dialog'

export default function LemonWallet({
  referalCode
}: {
  referalCode?: string | null
}) {
  const [isDeposite, setIsDeposite] = useState(false)

  const {
    wallet,
    isLoading,
    createWallet,
    isCreatingWallet: isCreating
  } = useLemonWallet(referalCode!)

  const { toast } = useToast()
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyAddress = () => {
    if (!copiedAddress) {
      copy(wallet?.address ?? 'N/A')
      toast({
        title: 'Copied',
        description: 'Address was copied to clipboard',
        duration: 1_800
      })
      setCopiedAddress(true)

      setTimeout(() => {
        setCopiedAddress(false)
      }, 2000)
    }
  }

  const walletQR = useMemo(() => {
    if (!wallet?.address) return null
    return new QRCode({
      content: wallet?.address,
      padding: 0,
      width: 80,
      height: 80,
      color: '#000000',
      background: 'transparent'
    })
      .svg()
      .replace(/<svg /, '<svg viewBox="0 0 80 80" class="w-full h-full"')
  }, [wallet?.address])

  const isCreatingWallet = isLoading || isCreating

  return (
    <div>
      <Dialog onOpenChange={setIsDeposite} open={isDeposite}>
        <DialogContent boxed>
          <h2 className='text-xl font-semibold'>Deposit Crypto</h2>
          <figure
            className='size-56 mt-5 mx-auto'
            dangerouslySetInnerHTML={{
              __html: walletQR || ''
            }}
          />

          <p className='text-center text-sm max-w-xs mx-auto'>
            Scan the QR code or copy the address below to deposit funds to your
            Lemon wallet.
          </p>

          <section className='mt-4 mb-2'>
            <div className='border-2 shadow-sm p-2 pl-4 rounded-lg flex justify-between items-center'>
              <span className='text-ellipsis overflow-hidden max-w-[13rem] sm:max-w-[50vw] lg:max-w-[25vw]'>
                {wallet?.address}
              </span>
              <Button onClick={copyAddress} className='p-4' variant='ghost'>
                {copiedAddress ? (
                  <FaCheck />
                ) : (
                  <FaRegCopy className='text-base' />
                )}
              </Button>
            </div>
          </section>
        </DialogContent>
      </Dialog>

      <div className='hidden'>
        <nav className='flex mb-2 items-center gap-2.5'>
          <p className='flex-grow'>Lemon Web3 Wallet</p>

          <p>
            <span className='opacity-60'>0</span>{' '}
            <span className='text-lemon-green-dark'>LEMON</span>
          </p>

          <p>
            <span className='opacity-60'>{0}</span>{' '}
            <span className='text-lemon-green-dark'>USDT</span>
          </p>
        </nav>

        {wallet?.address ? (
          <Fragment>
            <div className='border-2 shadow-sm p-2 pl-4 rounded-lg flex justify-between items-center'>
              <span className='text-ellipsis overflow-hidden max-w-[13rem] sm:max-w-[50vw] lg:max-w-[25vw]'>
                {wallet.address}
              </span>
              <Button onClick={copyAddress} className='p-4' variant='ghost'>
                {copiedAddress ? (
                  <FaCheck />
                ) : (
                  <FaRegCopy className='text-base' />
                )}
              </Button>
            </div>
            <div className='mt-5'>
              <Button
                onClick={() => setIsDeposite(true)}
                className='w-full rounded-lg flex !opacity-100 items-center text-base h-14 bg-topic-gradient'
                variant='link-outlined'
              >
                Deposit Balance
              </Button>
            </div>
          </Fragment>
        ) : (
          <Button
            onClick={() => createWallet()}
            disabled={isCreatingWallet}
            className='w-full rounded-lg flex !opacity-100 items-center text-base h-14 bg-topic-gradient'
            variant='link-outlined'
          >
            {isCreatingWallet ? 'Working...' : 'Create Lemon Wallet'}
          </Button>
        )}
      </div>
    </div>
  )
}