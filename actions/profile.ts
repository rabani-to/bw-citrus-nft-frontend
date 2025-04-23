'use server'

import { actionData, actionResult, isDefined } from 'http-react'
import { prisma } from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { put } from '@vercel/blob'
import { CORE_TEAM } from './core-members'

export async function getProfile(
  username: string,
  createDefaultCollection?: boolean
) {
  const preferences = await prisma.preferences.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive'
      }
    }
  })

  const $username = preferences?.username || username

  const $id = preferences?.id

  if (preferences) {
    if (createDefaultCollection) {
      const totalQuizzes = await prisma.collection.count({
        where: {
          nickname: preferences?.username
        }
      })

      if (totalQuizzes === 0) {
        await prisma.collection.create({
          data: {
            name: 'Not listed',
            default: true,
            description: '',
            items: [],
            nickname: preferences?.username
          }
        })
      }
    }
  }

  const followers = await prisma.preferences.findMany({
    where: {
      following: {
        hasSome: $id ? [$id!] : []
      }
    },
    select: {
      username: true,
      name: true,
      profile_picture: true
    }
  })

  const collections = await prisma.collection.findMany({
    where: {
      nickname: {
        equals: $username,
        mode: 'insensitive'
      }
    },
    select: {
      name: true,
      id: true,
      items: true,
      nickname: true
    }
  })

  const publicQuizzes = await prisma.newQuiz.findMany({
    where: {
      AND: [
        {
          nickname: {
            equals: $username,
            mode: 'insensitive'
          }
        },
        {
          visibility: 'public'
        }
      ]
    },
    select: {
      nickname: true,
      name: true,
      questions: {
        select: {
          id: true
        }
      },
      imageUrl: true,
      topics: true,
      id: true
    }
  })

  const allUserQuizzesIds = publicQuizzes.map(q => q.id)

  const allLikes = await prisma.preferences.findMany({
    select: {
      favorites: true
    },
    where: {
      favorites: {
        hasSome: allUserQuizzesIds
      }
    }
  })

  let likesById: {
    [k: string]: number
  } = {}

  allLikes.forEach(({ favorites }) => {
    favorites.forEach(favorite => {
      if (!(favorite in likesById)) {
        likesById[favorite] = 1
      } else {
        likesById[favorite]++
      }
    })
  })

  // There are quizzes or collections created by user
  const infoExists = publicQuizzes.length > 0 || collections.length > 0

  const isCoreTeam = CORE_TEAM.indexOf(username) !== -1

  return actionResult(
    preferences
      ? {
          info: preferences
            ? {
                verified: true,
                isCoreTeam,
                ...preferences,
                followers,
                profile_picture:
                  preferences.profile_picture || '/default_profile.png',
                cover_picture:
                  preferences.cover_picture || '/default_cover.jpg',
                user_id: undefined
              }
            : infoExists
            ? ({
                isCoreTeam,
                profile_picture: '/default_profile.png',
                cover_picture: '/default_cover.jpg',
                id: undefined,
                language: '',
                sound: true,
                user_id: undefined,
                favorites: [],
                following: [],
                username,
                name: username
              } as unknown as typeof preferences)
            : null,
          followers: followers.length,
          // If following preferences don't exist yet for user, show 0
          following: preferences?.following.length || 0,
          collections,
          publicQuizzes: publicQuizzes.toReversed().map(quiz => ({
            ...quiz,
            likes: likesById[quiz.id] ?? 0
          }))
        }
      : null!
  )
}

export async function searchUsers({
  username = '',
  page = 0
}: {
  username: string
  page: number
}) {
  const v1Preferences = await prisma.preferences.findMany({
    where: {
      username: null
    }
  })

  for (let preference of v1Preferences) {
    await prisma.preferences.update({
      where: {
        id: preference.id
      },
      data: {
        username: preference.user_id.split('@')[0]
      }
    })
  }

  const totalPages = Math.ceil(
    (await prisma.preferences.count({
      where: {
        OR: [
          {
            username: {
              contains: username,
              mode: 'insensitive'
            }
          },
          {
            name: {
              contains: username,
              mode: 'insensitive'
            }
          }
        ]
      }
    })) / 9
  )

  const allUsers = await prisma.preferences.findMany({
    take: -9,
    skip: page * 9,
    orderBy: {
      created: 'asc'
    },
    where: {
      OR: [
        {
          username: {
            contains: username,
            mode: 'insensitive'
          }
        },
        {
          name: {
            contains: username,
            mode: 'insensitive'
          }
        }
      ]
    }
  })

  const data = {
    pages: totalPages,
    users: allUsers.toReversed().map(user => ({
      ...user,
      user_id: undefined // Remove email
    }))
  }

  return actionData(data)
}

function validateUsername(username: string) {
  if (!username || username.length === 0) return null // Empty username check

  // Updated pattern to prevent consecutive periods and enforce starting/ending with alphanumeric characters
  const usernamePattern =
    /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9][a-zA-Z0-9._+-]*[a-zA-Z0-9]$/

  if (!usernamePattern.test(username)) return null // Validation check

  return username
}

export async function updateProfileData({
  name,
  username
}: Partial<{ name: string; username: string }>) {
  const session = await getSession()

  if (!session) {
    return actionData(null, {
      status: 401
    })
  }

  const { user } = session

  const isUsernameEmpty =
    isDefined(username) && `${username ?? ''}`.trim().length === 0

  const validUsername = validateUsername(username!)

  const currentPreferences = await prisma.preferences.findFirst({
    where: {
      user_id: user.email
    },
    select: {
      username: true,
      name: true
    }
  })

  const newUsernameExists = await prisma.preferences.count({
    where: {
      username: {
        equals: username,
        mode: 'insensitive'
      }
    }
  })

  const usernameTooLong = `${username}`?.length > 32

  const usernameError =
    username === currentPreferences?.username
      ? false
      : !validUsername || newUsernameExists || usernameTooLong

  const nameError = isDefined(name)
    ? !Boolean(name) && `${name ?? ''}`.trim().length < 1
    : false

  if (usernameError || nameError || isUsernameEmpty) {
    return actionData({ error: 'Errors' } as any, {
      status: 400,
      error: {
        username:
          usernameError &&
          (isUsernameEmpty
            ? 'Username cannot be empty'
            : !validUsername
            ? 'Username is not valid'
            : usernameTooLong
            ? 'Username cannot have more than 32 characters'
            : 'Username is already taken'),
        name: nameError && 'Name must be at least 1 character long'
      }
    })
  }

  const willUpdateName =
    isDefined(name) && validUsername && `${name}`.trim().length > 0

  const willUpdateUsername =
    isDefined(username) && `${username}`.trim().length > 1

  // Change nickname in quizzes and collections

  if (willUpdateUsername) {
    await prisma.newQuiz.updateMany({
      where: {
        nickname: {
          equals: currentPreferences?.username?.toLowerCase(),
          mode: 'insensitive'
        }
      },
      data: {
        nickname: username?.toLowerCase()
      }
    })

    await prisma.collection.updateMany({
      where: {
        nickname: {
          equals: currentPreferences?.username?.toLowerCase(),
          mode: 'insensitive'
        }
      },
      data: {
        nickname: username?.toLowerCase()
      }
    })

    await prisma.attempt.updateMany({
      where: {
        nickname: {
          equals: currentPreferences?.username?.toLowerCase(),
          mode: 'insensitive'
        }
      },
      data: {
        nickname: username?.toLowerCase()
      }
    })
  }

  await prisma.flashcardsReview.updateMany({
    where: {
      nickname: {
        equals: currentPreferences?.username?.toLowerCase(),
        mode: 'insensitive'
      }
    },
    data: {
      nickname: username?.toLowerCase()
    }
  })

  const updatedProfileData = await prisma.preferences.update({
    where: {
      user_id: user.email
    },
    data: {
      username: willUpdateUsername ? username : currentPreferences?.username,
      name: willUpdateName ? name : currentPreferences?.name
    }
  })

  return actionData(updatedProfileData)
}

function isValidImageType(imageData: File) {
  const allowedTypes = ['image/png', 'image/gif', 'image/jpeg']
  return allowedTypes.includes(imageData.type)
}

export async function updateProfilePic(form: FormData) {
  const session = await getSession()

  if (!session)
    return actionData(
      { message: 'error' },
      {
        status: 401
      }
    )

  const { user } = session

  const userPreferences = await prisma.preferences.findFirst({
    where: {
      user_id: user.email
    }
  })

  const imageFile = form.get('profile-pic') as File

  const isImageAllowed = isValidImageType(imageFile)

  if (!isImageAllowed)
    return actionData(
      { error: 'Image not allowed' },
      {
        status: 415
      }
    )

  const blob = await put(imageFile.name, imageFile, {
    access: 'public'
  })

  if (blob) {
    const updatedPreferences = await prisma.preferences.update({
      where: {
        id: userPreferences?.id
      },
      data: {
        profile_picture: blob.url
      }
    })

    return actionData(updatedPreferences)
  }
}

export async function getProfileId(username: string) {
  const preferences = await prisma.preferences.findFirst({
    where: {
      username
    }
  })

  return actionData(preferences?.id)
}