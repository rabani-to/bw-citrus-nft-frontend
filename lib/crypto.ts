import crypto from 'crypto'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { redis } from '@/lib/redis'
import { type Address } from 'viem'

const ALGORITHM = 'aes-256-ctr'
function getPassKey(forcedKey?: string) {
  if (!process.env.SECURE_PASSPHRASE && !forcedKey) {
    throw new Error('SECURE_PASSPHRASE not set')
  }

  return Buffer.concat(
    [
      Buffer.from(forcedKey || process.env.SECURE_PASSPHRASE!),
      Buffer.alloc(32)
    ],
    32
  )
}

export function serverEncryptMessage(text: string, forceKey?: string) {
  const key = getPassKey(forceKey)

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return `${iv.toString('hex')}${encrypted.toString('hex')}`
}

export function serverDecryptMessage(text: string, forceKey?: string) {
  const key = getPassKey(forceKey)

  const iv = Buffer.from(text.substring(0, 32), 'hex')
  const encryptedText = Buffer.from(text.substring(32), 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  const decrypted = decipher.update(encryptedText)
  return Buffer.concat([decrypted, decipher.final()]).toString()
}

export async function getOrCreateWallet(refCode: string) {
  const hashedWallet = await redis.get<string>(`${refCode}.wallet`)
  if (hashedWallet) {
    // Decrypt the wallet and return the account
    return privateKeyToAccount(serverDecryptMessage(hashedWallet) as Address)
  }

  // Generate a new wallet and store+hash it
  const walletPrivate = generatePrivateKey()
  await redis.set(`${refCode}.wallet`, serverEncryptMessage(walletPrivate))

  return privateKeyToAccount(walletPrivate)
}

export async function getUserWalletAddress(
  refCode: string
): Promise<string | null> {
  const hashedWallet = await redis.get<string>(`${refCode}.wallet`)
  if (hashedWallet) {
    // Decrypt the wallet and return the account
    const wallet = privateKeyToAccount(
      serverDecryptMessage(hashedWallet) as Address
    )

    return wallet.address
  }

  return null
}

export const generateSimpleOTP = () =>
  new Promise<string>(res =>
    // Uses Node Crypto to genarate cryptographically strong pseudo-random data
    // crypto.randomBytes(size[, callback])
    // For more check
    // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    crypto.randomBytes(3, (err, buffer) => {
      res(parseInt(buffer.toString('hex'), 16).toString().substr(0, 6))
    })
  )