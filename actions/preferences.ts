'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { actionData, actionResult } from 'http-react'
import { revalidatePath } from 'next/cache'

import { Resend } from 'resend'
import { redis } from '@/lib/redis'
import { NewFollower } from '@/components/email/Templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function followUser(
  username: string,
  forceRevalidatePath: boolean = true
) {
  const session = await getSession()

  if (!session) {
    return actionResult(
      {},
      {
        error: ['Please login'],
        status: 403
      }
    )
  }

  const { user } = session

  const preferences = await prisma.preferences.findFirst({
    where: {
      user_id: user?.email
    }
  })

  if (preferences) {
    if (preferences.user_id === username) {
      return actionResult(preferences, {
        error: ['You cant follow yourself'],
        status: 403
      })
    }

    const followTarget = await prisma.preferences.findFirst({
      where: {
        username
      }
    })

    if (!followTarget) return actionData(null, { status: 404 })

    const isFollowingUser =
      preferences.following.indexOf(followTarget.id) !== -1

    if (followTarget.user_id) {
      const follower_email = preferences.user_id
      const to_follow_email = followTarget.user_id
      const count = followTarget?.following?.length || 1

      const FOLLOW_KEY = `follow:${to_follow_email}:${follower_email}`

      const isFollowEmailSent = await redis.get(FOLLOW_KEY)

      if (!isFollowEmailSent && !isFollowingUser) {
        // Send email only once

        const username =
          preferences.username ||
          preferences.user_id.split('@')[0] ||
          'new_user'

        // send email to user
        await resend.emails.send({
          from: 'no-reply@lemon.tips',
          subject: `User @${username} is now following you on Lemon`,
          to: to_follow_email,
          text: '',
          react: NewFollower({
            username,
            count
          })
        })

        await redis.set(FOLLOW_KEY, true)
      }
    }

    const updatedPreferences = await prisma.preferences.update({
      where: {
        id: preferences.id
      },
      data: {
        following: isFollowingUser
          ? preferences.following.filter(
              following => following !== followTarget.id
            )
          : [...preferences.following, followTarget.id]
      }
    })

    if (forceRevalidatePath) revalidatePath(`/api/preferences/${username}`)
    return actionResult(updatedPreferences)
  }
}

export async function getPreferences() {
  const session = await getSession()

  if (session) {
    const { user } = session
    const preferences = await prisma.preferences.findFirst({
      where: {
        user_id: user.email
      }
    })

    return actionResult(preferences)!
  }

  return undefined as any
}

export async function totalUsers() {
  const totalUsers = await prisma.preferences.count({
    where: {
      username: {
        contains: ''
      }
    }
  })

  return totalUsers
}