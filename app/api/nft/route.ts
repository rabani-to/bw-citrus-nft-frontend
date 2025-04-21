import {
	generateSimpleOTP,
	getOrCreateWallet,
	serverEncryptMessage
  } from '@/lib/crypto'
  import { type NextRequest } from 'next/server'
  import { type Address, encodePacked, isAddress, toBytes, keccak256 } from 'viem'
  import { Resend } from 'resend'
  import { NFTCode } from '@/components/email/Templates'
  import { prisma } from '@/lib/prisma'
  import { isValidCode } from '@/lib/secure'
  
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  export const dynamic = 'force-dynamic'
  
  const DENNY_ID = 'B2BD05'
  export async function POST(request: NextRequest) {
	const { searchParams } = request.nextUrl
  
	const rejectRequest = () =>
	  Response.json({ error: 'Unauthorized' }, { status: 403 })
  
	const code = searchParams.get('code') ?? ''
	const recipient = searchParams.get('recipient') as Address
  
	if (
	  isValidCode(code) &&
	  code !== DENNY_ID &&
	  isAddress(recipient, {
		strict: true
	  })
	) {
	  const user = await prisma.preferences.findFirst({
		where: {
		  referalCode: code
		}
	  })
  
	  if (!user) return rejectRequest()
  
	  const wallet = await getOrCreateWallet(code)
	  const signature = await wallet.signMessage({
		message: {
		  raw: keccak256(
			encodePacked(
			  ['bytes3', 'address', 'address'],
			  [`0x${code}`, recipient, wallet.address]
			)
		  )
		}
	  })
  
	  const secondFACode = await generateSimpleOTP()
  
	  await resend.emails.send({
		from: 'no-reply@lemon.tips',
		text: '',
		subject: 'Claim your Lemon NFT',
		to: user?.user_id,
		react: NFTCode({ code: secondFACode })
	  })
  
	  const res = Response.json({
		content: serverEncryptMessage(
		  JSON.stringify({
			signature,
			authSigner: wallet.address
		  }),
		  secondFACode
		),
		ok: true
	  })
  
	  res.headers.append('Access-Control-Allow-Credentials', 'true')
	  res.headers.append('Access-Control-Allow-Origin', '*')
	  res.headers.append(
		'Access-Control-Allow-Methods',
		'GET,DELETE,PATCH,POST,PUT'
	  )
	  res.headers.append(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	  )
  
	  res.headers.append('Cache-Control', 'no-cache, must-revalidate')
  
	  return res
	}
  
	return rejectRequest()
  }