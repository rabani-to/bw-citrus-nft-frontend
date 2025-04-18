"use client"

import { useAccount, useWriteContract } from "wagmi"
import { erc721Abi } from "viem"
import { useState } from "react"

export function MintButton({ nftAddress }: { nftAddress: `0x${string}` }) {
  const { address, isConnected } = useAccount()
  const { writeContractAsync, isPending } = useWriteContract()
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<bigint> (BigInt(1)) // Cambia esto al ID del token que quieras mintear

  const handleMint = async () => {
    if (!isConnected || !address) {
      setError("Conecta tu wallet primero.")
      return
    }

    try {
      setError(null)
      const hash = await writeContractAsync({
        address: nftAddress,
        abi: erc721Abi,
        functionName: "safeTransferFrom", // cambia esto si tu función tiene otro nombre o parámetros
        args: [address, "0xRecipientAddress...", tokenId], // Cambia esto si tu función tiene otros parámetros
        account: address,
      })
      setTxHash(hash)
    } catch (err: any) {
      setError(err?.shortMessage || "Error al mintear.")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleMint}
        disabled={!isConnected || isPending}
        className="bg-lemon-green px-4 py-2 rounded-xl text-black font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Minteando..." : "Mintear NFT"}
      </button>

      {error && <span className="text-red-500 text-sm">{error}</span>}
      {txHash && (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-lemon-green underline"
        >
          Ver en Etherscan
        </a>
      )}
    </div>
  )
}
