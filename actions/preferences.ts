'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { actionData, actionResult } from 'http-react'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import { redis } from '@/lib/redis'
import { NewFollower } from '@/components/email/Templates'

const resend = new Resend(process.env.RESEND_API_KEY)

async function getLoggedUserPreferences() {
  const session = await getSession()
  if (!session) return null

  const { user } = session
  const preferences = await prisma.preferences.findFirst({
    where: { user_id: user?.email }
  })
  return { preferences, user }
}

async function sendFollowNotification(follower: any, target: any) {
  const followerUsername = follower.username || follower.user_id.split('@')[0] || 'new_user'
  const emailKey = `follow:${target.user_id}:${follower.user_id}`

  const alreadySent = await redis.get(emailKey)

  if (!alreadySent) {
    await resend.emails.send({
      from: 'no-reply@lemon.tips',
      subject: `User @${followerUsername} is now following you on Lemon`,
      to: target.user_id,
      text: '',
      react: NewFollower({ username: followerUsername, count: target.following?.length || 1 })
    })
    await redis.set(emailKey, true)
  }
}

export async function followUser(username: string, forceRevalidatePath: boolean = true) {
  const sessionData = await getLoggedUserPreferences()

  if (!sessionData) {
    return actionResult({}, { error: ['Please login'], status: 403 })
  }

  const { preferences, user } = sessionData

  if (!preferences) return actionData(null, { status: 404 })

  if (preferences.user_id === username) {
    return actionResult(preferences, { error: ['You can’t follow yourself'], status: 403 })
  }

  const target = await prisma.preferences.findFirst({ where: { username } })
  if (!target) return actionData(null, { status: 404 })

  const isAlreadyFollowing = preferences.following.includes(target.id)

  if (target.user_id && !isAlreadyFollowing) {
    await sendFollowNotification(preferences, target)
  }

  const updatedFollowing = isAlreadyFollowing
    ? preferences.following.filter(id => id !== target.id)
    : [...preferences.following, target.id]

  const updatedPreferences = await prisma.preferences.update({
    where: { id: preferences.id },
    data: { following: updatedFollowing }
  })

  if (forceRevalidatePath) {
    revalidatePath(`/api/preferences/${username}`)
  }

  return actionResult(updatedPreferences)
}

export async function getPreferences() {
  const sessionData = await getLoggedUserPreferences()
  return sessionData ? actionResult(sessionData.preferences) : undefined as any
}

export async function totalUsers() {
  const usersCount = await prisma.preferences.count({
    where: { username: { contains: '' } }
  })
  return usersCount
}
