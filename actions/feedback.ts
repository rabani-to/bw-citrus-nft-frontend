'use server'

const token = process.env.AIRTABLE_TOKEN

import { actionResult } from 'http-react'
import Airtable from 'airtable'
import { getSession } from '@auth0/nextjs-auth0'

const airtable = new Airtable({
  apiKey: token
})

const feedback = airtable.base('appJLAWWVkOOL17kp').table('tblY0v4OzqXViaYW3')

let temporaryFeedbackCache: Record<string, boolean> = {}

export async function sendFeedback(form: FormData) {
  const session = await getSession()

  if (!session) {
    return actionResult({
      message: 'Did you login?'
    })
  }

  const userEmail = session.user.email

  if (temporaryFeedbackCache[userEmail]) {
    return actionResult({
      message: 'Thanks for your feedback'
    })
  }

  temporaryFeedbackCache[userEmail] = true

  const {
    comment = '',
    reaction = '',
    path
  } = Object.fromEntries(form.entries()) as Record<string, string>

  await feedback.create({
    email: userEmail,
    comment,
    path,
    reaction
  })

  return actionResult({
    message: 'Thanks for your feedback'
  })
}