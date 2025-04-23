'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@auth0/nextjs-auth0'
import { Prisma } from '@prisma/client'
import { actionResult, isDefined } from 'http-react'
import { $form, actionData, jsonCompare } from 'http-react/dist/utils/shared'
import { revalidatePath } from 'next/cache'
import { getCollection } from './collections'
import { Types } from '@/types'

export async function getQuiz({
  id,
  type
}: {
  id: string
  type?: 'quiz' | 'collection'
}) {
  try {
    if (type === 'quiz') {
      const quiz = await prisma.newQuiz.findFirst({
        where: {
          id
        }
      })

      if (quiz) return actionData(quiz)

      const legacyQuiz = await prisma.quiz.findFirst({
        where: {
          id
        }
      })

      if (legacyQuiz) {
        const migratedQuiz = getMigratedQuiz(legacyQuiz)

        // Update existing migrated quz
        await prisma.newQuiz.update({
          data: {
            ...{
              ...migratedQuiz,
              // Removing id to prevent prisma errors
              id: undefined
            }
          },
          where: {
            id
          }
        })

        return actionResult(migratedQuiz)
      }
    }
    const collection = await getCollection(id)

    return actionResult(collection)
  } catch {
    return actionResult(null)
  }
}

export async function toggleFavorite(id: string) {
  const user_id = (await getSession())?.user.email

  if (user_id) {
    const currentPreferences = (await prisma.preferences.findFirst({
      where: {
        user_id
      }
    }))!

    const addFavorite = currentPreferences.favorites.indexOf(id) === -1

    await prisma.preferences.update({
      data: {
        favorites: addFavorite
          ? [...currentPreferences.favorites, id]
          : currentPreferences.favorites.filter(favorite => favorite !== id)
      },
      where: {
        user_id
      }
    })

    revalidatePath('/explore')
  }
}

export async function migrateLocalFavorites(newFavorites: string[]) {
  const user_id = (await getSession())?.user.email

  if (user_id) {
    const preferences = (await prisma.preferences.findFirst({
      where: {
        user_id
      }
    }))!

    const updatedFavorites = Array.from(
      new Set([...preferences.favorites, ...(newFavorites || [])])
    )

    if (!jsonCompare(preferences.favorites, updatedFavorites)) {
      await prisma.preferences.update({
        where: {
          user_id
        },
        data: {
          favorites: updatedFavorites
        }
      })
    }
    return actionData(updatedFavorites)
  } else return actionData([])
}

export async function searchQuizzes(params: {
  search?: string
  page?: number
  topics: string | string[]
}) {
  const { search = '', page = 0, topics } = params

  const withTopics =
    topics && (Array.isArray(topics) ? topics.length > 0 && topics : [topics])

  const withPagination = isDefined(page) && typeof page === 'number'

  const filter: Prisma.NewQuizFindManyArgs['where'] = withTopics
    ? {
        AND: [
          {
            visibility: 'public'
          },
          {
            name: {
              contains: search as string,
              mode: 'insensitive'
            }
          },
          {
            topics: {
              hasSome: withTopics
            }
          }
        ]
      }
    : {
        AND: [
          {
            visibility: 'public'
          },
          {
            name: {
              contains: search as string,
              mode: 'insensitive'
            }
          }
        ]
      }

  const allLikes = await prisma.preferences.findMany({
    select: {
      favorites: true
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

  const quizzes = await prisma.newQuiz.findMany({
    ...(withPagination && {
      take: 9,
      skip: 9 * page
    }),
    where: filter,
    orderBy: {
      created: 'desc'
    },
    select: {
      id: true,
      imageUrl: true,
      name: true,
      topics: true,
      questions: {
        select: {
          type: true
        }
      }
    }
  })

  const quizzesWithLikes = quizzes.map(quiz => ({
    ...quiz,
    likes: likesById[quiz.id] ?? 0
  })) as (Types.NewQuiz & { likes: number })[]

  const totalQuizzes = await prisma.newQuiz.count({
    where: filter
  })

  const pages = Math.ceil(totalQuizzes / 9)

  return actionResult({
    quizzes: quizzesWithLikes,
    pages
  })
}

export async function migrateQuizzes() {
  const migratedQuizzes = await prisma.newQuiz.findMany({
    select: {
      id: true
    }
  })

  const migratedQuizzesIds = migratedQuizzes.map(quiz => quiz.id)

  const quizzesToMigrate = await prisma.quiz.findMany({
    where: {
      id: {
        notIn: migratedQuizzesIds
      }
    }
  })

  if (quizzesToMigrate.length > 0) {
    const migrations = await prisma.newQuiz.createMany({
      data: quizzesToMigrate.map(getMigratedQuiz)
    })

    console.log(migrations.count + ' Quizzes migrated succesfuly')
  } else {
    console.log('No quizzes to migrate')
  }
}

function getMigratedQuiz(legacyQuiz: Types.Quiz) {
  const newQuiz: Types.NewQuiz = {
    name: legacyQuiz.name,
    context: legacyQuiz.context,
    created: legacyQuiz.created,
    description: '',
    id: legacyQuiz.id,
    integration: null,
    imageUrl: '/default-quiz-image.png',
    nickname: legacyQuiz.nickname,
    prompt: legacyQuiz.prompt,
    questions: legacyQuiz.questions.map(
      legacyQuestion =>
        ({
          id: crypto.randomUUID(),
          correctOptions: legacyQuestion.correctOptions,
          explanation: legacyQuestion.explanation,
          type:
            legacyQuestion.options.length === 0
              ? 'shortAnswer'
              : 'singleChoice',
          imageUrl: '/default-quiz-image.png',
          matches: [],
          suggestedAnswers: [],
          options: legacyQuestion.options,
          points: legacyQuestion.score,
          text: legacyQuestion.question
        } as Types.Question)
    ),
    topics: legacyQuiz.topics,
    visibility: legacyQuiz.visibility
  }

  return newQuiz
}

/**
 * Quizzes mutations
 */

export async function createQuiz(form: FormData) {
  const { title, description = '' } = $form<{
    title: string
    description: string
  }>(form)

  if (!Boolean(title)) {
    return actionData('error', {
      status: 400,
      error: {
        title: title ? '' : 'Title is required'
      }
    })
  }

  const session = await getSession()!
  if (session) {
    const { user } = session

    const preferences = await prisma.preferences.findFirst({
      where: {
        user_id: user.email
      }
    })

    const newQuiz = await prisma.newQuiz.create({
      data: {
        name: title,
        description: description,
        created: new Date(),
        imageUrl: '/default-quiz-image.png',
        context: '',
        nickname: preferences?.username,
        prompt: '',
        questions: [],
        topics: [],
        visibility: 'public'
      }
    })

    return actionData(newQuiz)
  }
}

export async function deleteQuiz({ quizId }) {
  const deletedQuiz = await prisma.newQuiz.delete({
    where: {
      id: quizId
    }
  })

  return actionResult(deletedQuiz)
}

export async function updateMetadata({
  quizId,
  name,
  description,
  topics
}: {
  quizId: string
  name: string
  description: string
  topics: string[]
}) {
  const updatedQuiz = await prisma.newQuiz.update({
    where: {
      id: quizId
    },
    data: {
      name,
      description,
      topics
    }
  })

  // revalidatePath(`/view/quiz/${updatedQuiz?.id}`, 'layout')

  return actionData(updatedQuiz)
}

export async function addQuestion({ quizId }: { quizId: string }) {
  const quiz = await prisma.newQuiz.findFirst({
    where: {
      id: quizId
    }
  })

  if (!quiz)
    return actionData(null, {
      status: 404
    })

  const updatedQuestions = [...quiz.questions]

  updatedQuestions.push({
    text: '',
    correctOptions: [],
    options: [],
    matches: [],
    explanation: '',
    suggestedAnswers: [],
    id: crypto.randomUUID(),
    imageUrl: '/default-quiz-image.png',
    points: 1,
    type: 'singleChoice'
  })

  const updatedQuiz = await prisma.newQuiz.update({
    where: {
      id: quizId
    },
    data: {
      questions: updatedQuestions
    }
  })

  return actionData(updatedQuiz)
}

export async function deleteQuestion({
  questionId,
  quizId
}: {
  questionId: string
  quizId: string
}) {
  const quiz = await prisma.newQuiz.findFirst({
    where: {
      id: quizId
    }
  })

  if (!quiz) {
    return actionData(null, {
      status: 404
    })
  }

  const updatedQuestions = quiz.questions.filter(
    question => question.id !== questionId
  )

  const updatedQuiz = await prisma.newQuiz.update({
    where: {
      id: quizId
    },
    data: {
      questions: updatedQuestions
    }
  })

  return actionData(updatedQuiz)
}

export async function saveAttempt({
  quizId,
  answers,
  duration
}: {
  duration: number
  quizId: string
  answers: {
    answer: string
    questionId: string
    questionIndex: number
  }[]
}) {
  const session = await getSession()

  const user = session?.user

  const preferences = await prisma.preferences.findFirst({
    where: {
      user_id: user?.email
    }
  })

  const savedAttempt = await prisma.attempt.create({
    data: {
      quiz_id: quizId,
      nickname: preferences?.username!,
      answers: answers,
      timeTaken: duration,
      score: 0
    }
  })

  return actionData(savedAttempt)
}

// Trending

const MOST_LIKED_VALUE = 0
const POSTED_FIRST = Number.MAX_SAFE_INTEGER
const POSTED_LAST = 0

function sortByTrend(
  { timestamp: aTimeCreated, likes: aLikes }: any,
  { timestamp: bTimeCreated, likes: bLikes }: any
) {
  const normalize = (givenTimeRatio: number, likedTimes: number) => {
    // TODO: Use a logarithmic scale instead of linear
    let boost = 1
    const formattedTimeRatio = 0.05 + givenTimeRatio
    // range is now from 5% to 105%

    if (likedTimes > 0.2 * MOST_LIKED_VALUE) {
      // if likedTimes is more than 20% of the most liked project we're going to give it a boost
      // the boost is proportional to the number of likes

      const tailwindRatio = likedTimes / MOST_LIKED_VALUE

      boost += Math.min(0.5, tailwindRatio)
      // the boost is capped at 1.5x
    }

    return likedTimes * formattedTimeRatio * boost
  }

  const genesis = POSTED_FIRST
  const period = POSTED_LAST - genesis
  const aScore = normalize((aTimeCreated - genesis) / period, aLikes)
  const bScore = normalize((bTimeCreated - genesis) / period, bLikes)

  // weight the score by the number of likes times the time since it was posted
  // latest posted project will have the lowest weight (close to or ZERO)
  return bScore - aScore

  // Sorting by default is from newest to latest created (used in "NEW" tab)
  //   return aScore - bScore
}

export async function getTrending({ page, topics, search }) {
  const withTopics =
    topics && (Array.isArray(topics) ? topics.length > 0 && topics : [topics])

  const allLikes = await prisma.preferences.findMany({
    select: {
      favorites: true
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

  const filter: Prisma.NewQuizFindManyArgs['where'] = withTopics
    ? {
        AND: [
          {
            id: {
              in: Object.keys(likesById)
            }
          },
          {
            visibility: 'public'
          },
          {
            name: {
              contains: search as string,
              mode: 'insensitive'
            }
          },
          {
            topics: {
              hasSome: withTopics
            }
          }
        ]
      }
    : {
        AND: [
          {
            id: {
              in: Object.keys(likesById)
            }
          },
          {
            visibility: 'public'
          },
          {
            name: {
              contains: search as string,
              mode: 'insensitive'
            }
          }
        ]
      }

  const latestCreated = await prisma.newQuiz.findMany({
    orderBy: {
      created: 'desc'
    },
    // ...(withPagination && {
    take: 9,
    skip: 9 * page,
    // }),
    where: filter,
    select: {
      id: true,
      created: true,
      name: true,
      imageUrl: true,
      topics: true,
      questions: {
        select: {
          id: true
        }
      }
    }
  })

  const trending = latestCreated
    .map(quiz => {
      const dateTimestamp = Date.parse(quiz.created?.toString()!)

      //   const ratio = (likesById[quiz.id] * 10e12) / (Date.now() - dateTimestamp)

      return {
        likes: likesById[quiz.id],
        timestamp: dateTimestamp,
        ...quiz
        // ratio
      }
    })
    .toSorted(sortByTrend)

  const totalQuizzes = await prisma.newQuiz.count({
    where: filter
  })

  const pages = Math.ceil(totalQuizzes / 9)

  return {
    pages,
    quizzes: trending
  }
}