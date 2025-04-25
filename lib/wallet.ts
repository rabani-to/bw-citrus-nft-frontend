import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useLemonWallet = (referalCode: string | null) => {
  const KEY = referalCode ? `/api/crypto/wallet/${referalCode}` : null
  const {
    data: wallet,
    isLoading,
    isValidating
  } = useSWR<{
    address: string | null
  }>(KEY, key => fetch(key).then(res => res.json()))

  const { trigger: createWallet, isMutating } = useSWRMutation(
    KEY,
    async function updateUser(url) {
      fetch(url, {
        method: 'POST'
      }).then(res => res.json())
    }
  )

  return {
    wallet,
    isLoading: isLoading || isValidating,
    isCreatingWallet: isMutating,
    createWallet
  }
}