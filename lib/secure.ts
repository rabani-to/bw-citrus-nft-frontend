import { formatEther, isHex } from 'viem'

export type StateMessage = {
  address: string
  userId: string
  stateMessage: string
  chainId: string | number
  nonce: string | number
}

export const getStateMessage = ({
  address,
  userId,
  stateMessage,
  chainId,
  nonce
}: StateMessage) =>
  JSON.stringify(
    {
      address,
      userId,
      stateMessage,
      chainId: String(chainId),
      nonce: String(nonce ?? 0)
    },
    null,
    2
  )

export const getClaimBalanceMessage = ({
  balance,
  ...message
}: Omit<StateMessage, 'stateMessage'> & {
  balance: bigint
}) => {
  return getStateMessage({
    ...message,
    stateMessage: JSON.stringify({
      action: 'claim',
      balance: formatEther(balance)
    })
  })
}

export const isValidCode = (code: string) =>
  code.length === 6 && isHex(`0x${code}`)