'use server'

import { kv } from '@vercel/kv'
import { getDailyRewardData } from '@/app/points/actions'
import type { LeadNFT } from './queries'
import { prisma } from './prisma'
import { redis } from './redis'
import {
  KEY_LEMONADADE_DB,
  TASK_INVITE_1,
  TASK_INVITE_10,
  TASK_INVITE_5,
  TASK_LEMON_NFT,
  TASK_QUIZ
} from '@/app/points/constants'
import { getUserLemonPoints } from '@/components/Navbar/actions'
import { getUserDiscord, MISSION_DISCORD } from '@/app/zlink/discord/utils'
import {
  getCampData,
  MISSION_CAMP_SPOTIFY,
  MISSION_CAMP_TWITTER
} from '@/app/zlink/camp/utils'

const MAX_POINTS_VALUE = 37 // 25 + 10 + 2 invites

const getPointsCellKey = (referral: string) => `points.${referral}`
export const addPoints = async (referral: string, points: number) => {
  if (referral && points >= 0) {
    const userData = getPointsCellKey(referral)
    const currentPoints = (await kv.get<number>(userData)) || 0

    if (currentPoints + points >= MAX_POINTS_VALUE) {
      // Set the points to the max value
      await kv.set(userData, MAX_POINTS_VALUE)
    } else {
      await kv.incrby(userData, points)
    }
  }
}

export const getPoints = async (referral: string) => {
  if (referral) {
    const count = await kv.get<number>(getPointsCellKey(referral))
    return count || 0
  }

  return 0
}

export const isOwnedLemonNFT = async (referral?: string) => {
  if (!referral) return Promise.resolve(false)

  return new Promise<boolean>(resolve => {
    fetch(`https://www.lmdt.xyz/api/claimed/${referral}`)
      .then(r => r.json())
      .catch(() => resolve(false))
      .then((data: LeadNFT) => resolve(data?.isClaimed === true))
  })
}

export const validateCreatorData = async (referral?: string) => {
  if (!referral) {
    return Promise.resolve({
      preferences: null,
      isValid: false
    })
  }

  const preferences = await prisma.preferences.findFirst({
    where: {
      referalCode: referral
    },
    select: {
      id: true,
      username: true,
      name: true,
      user_id: true,
      profile_picture: true
    }
  })

  const quizzes = await prisma.newQuiz.findMany({
    where: {
      nickname: preferences?.username
    },
    select: {
      questions: {
        select: {
          id: true
        }
      }
    }
  })

  // Check if user has created at 3 quizzes with at least 6 items
  return {
    preferences,
    isValid: Boolean(
      quizzes.length > 2 &&
        quizzes.filter(q => q.questions.length >= 5).length > 2
    )
  }
}

export const updateLemonadeStandFor = async (
  _referral?: string,
  unsafeForcePointsValue = 0
) => {
  if (!_referral) return

  const referral = `${_referral}`

  const __setPoints = (points: number) =>
    redis.zadd(KEY_LEMONADADE_DB, {
      member: referral,
      score: points * 1e6
    })

  if (unsafeForcePointsValue) {
    await __setPoints(unsafeForcePointsValue)
    return // Exit early if points are forced
  }

  let points = await getPoints(referral) // Get invite total points

  const { isValid: isValidCreator } = await validateCreatorData(referral)
  if (isValidCreator) points += 5
  if (await isOwnedLemonNFT(referral)) points += 7

  // Social points
  if (await getUserDiscord(referral)) points += MISSION_DISCORD.points

  // Camp Network

  const campData = await getCampData(referral)
  if (campData?.spotifyId) points += MISSION_CAMP_SPOTIFY.points
  if (campData?.twitterId) points += MISSION_CAMP_TWITTER.points

  const totalDailyPoints =
    (await getDailyRewardData(referral))?.totalEarned || 0

  points += totalDailyPoints

  // End by setting the points to the leaderboard
  await __setPoints(points)
}

export const getLemonadeStand = async (
  totalItems: number | 'all' = 20
): Promise<Array<string>> => {
  const results = (await redis.zrange(
    KEY_LEMONADADE_DB,
    0,
    totalItems === 'all' ? -1 : totalItems - 1,
    {
      rev: true
    }
  )) as Array<string>

  return results as any
}

export const getSimpleLemonadeData = async (_referral?: string) => {
  if (!_referral) return null

  const referral = `${_referral}`
  const { preferences, isValid } = await validateCreatorData(referral)
  const username =
    preferences?.username || preferences?.user_id?.split('@')[0] || 'unknown'

  return {
    referral,
    isValidCreator: isValid,
    name: preferences?.name,
    position: await redis.zrevrank(KEY_LEMONADADE_DB, referral),
    profile_picture: preferences?.profile_picture || '/default_profile.png',
    points: await getUserLemonPoints(referral),
    username
  }
}

export const getLemonadeData = async (_referral?: string) => {
  const user = await getSimpleLemonadeData(_referral)
  if (!user) return null

  const { referral, isValidCreator, position, profile_picture, username } = user
  const completedTasks: Array<string> = []
  const refferPoints = await getPoints(referral) // Get invite total points

  if (refferPoints >= 25) completedTasks.push(TASK_INVITE_10)
  if (refferPoints >= 10) completedTasks.push(TASK_INVITE_5)
  if (refferPoints >= 2) completedTasks.push(TASK_INVITE_1)

  if (await isOwnedLemonNFT(referral)) completedTasks.push(TASK_LEMON_NFT)
  if (isValidCreator) completedTasks.push(TASK_QUIZ)

  // Social points
  const discord = await getUserDiscord(referral)
  if (discord) completedTasks.push(MISSION_DISCORD.id)

  // Camp Network
  const campData = await getCampData(referral)
  if (campData?.spotifyId) completedTasks.push(MISSION_CAMP_SPOTIFY.id)
  if (campData?.twitterId) completedTasks.push(MISSION_CAMP_TWITTER.id)

  return {
    referral,
    position,
    points: user?.points || 0,
    username,
    completedTasks,
    profile_picture
  }
}

type Unpromise<T> = T extends Promise<infer U> ? U : never

export type SimpleLemonatedData = Unpromise<
  ReturnType<typeof getSimpleLemonadeData>
>
export type LemonatedData = Unpromise<ReturnType<typeof getLemonadeData>>