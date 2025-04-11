import { createHmac } from "crypto"
import { kv } from "@vercel/kv"
import { toDataPoint } from "@/lib/utils"

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: { role: string }
  }
) => {
  const webhookPayload = await req.json()
  const receivedSignature = new Headers(req.headers).get("tally-signature")

  // Calculate the signature using the signing secret and the payload
  const calculatedSignature = createHmac(
    "sha256",
    process.env.TALLY_SIGNING_SECRET!
  )
    .update(JSON.stringify(webhookPayload))
    .digest("base64")

  const isValid = receivedSignature === calculatedSignature

  if (isValid) {
    // Increment the count for the role by 1
    await kv.incr(toDataPoint(params.role))
  }

  console.debug({
    isValid,
    receivedSignature,
    role: params.role,
  })

  return isValid
    ? Response.json({
        message: "Webhook processed successfully.",
      })
    : Response.json({ error: "Invalid signature." }, { status: 401 })
}