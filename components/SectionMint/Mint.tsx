'use client'

import { useAccount, useWriteContract } from 'wagmi'
import { erc721Abi } from 'viem'
import { useState, useCallback } from 'react'

interface MintButtonProps {
  nftAddress: `0x${string}`
}

export function MintButton({ nftAddress }: MintButtonProps) {
  const { address, isConnected } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<bigint>(BigInt(1))

  const handleMint = useCallback(async () => {
    if (!isConnected || !address) {
      setErrorMessage('Por favor, conecta tu wallet.')
      return
    }

    try {
      setErrorMessage(null)

      const hash = await writeContractAsync({
        address: nftAddress,
        abi: erc721Abi,
        functionName: 'safeTransferFrom',
        args: [address, '0xRecipientAddress...', tokenId],
        account: address
      })

      setTransactionHash(hash)
    } catch (error: any) {
      const fallbackMessage = 'Ocurrió un error al intentar mintear.'
      setErrorMessage(error?.shortMessage || fallbackMessage)
    }
  }, [isConnected, address, nftAddress, tokenId, writeContractAsync])

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleMint}
        disabled={!isConnected || isPending}
        className="bg-lemon-green px-4 py-2 rounded-xl text-black font-semibold hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-lemon-green"
      >
        {isPending ? 'Minteando...' : 'Mintear NFT'}
      </button>

      {errorMessage && (
        <span className="text-red-500 text-sm" role="alert">
          {errorMessage}
        </span>
      )}

      {transactionHash && (
        <a
          href={`https://etherscan.io/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-lemon-green underline"
        >
          Ver transacción en Etherscan
        </a>
      )}
    </div>
  )
}
