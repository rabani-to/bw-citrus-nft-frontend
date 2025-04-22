'use server'
import { prisma } from '@/lib/prisma'
import { Types } from '@/types'
import { getSession } from '@auth0/nextjs-auth0'
import { actionResult } from 'http-react'

export async function createCollection(collectionName: string) {
  const session = await getSession()

  if (session) {
    const { user } = session!

    const preferences = await prisma.preferences.findFirst({
      where: {
        user_id: user.email
      }
    })
    const newCollection = await prisma.collection.create({
      data: {
        name: collectionName,
        items: [],
        nickname: preferences?.username
      }
    })

    return actionResult(newCollection)
  }
}

export async function getCollections() {
  const session = await getSession()

  if (session) {
    const { user } = session
    const preferences = await prisma.preferences.findFirst({
      where: {
        user_id: user.email
      }
    })

    const collections = await prisma.collection.findMany({
      where: {
        nickname: preferences?.username
      }
    })

    if (collections.length === 0) {
      const newCollections = [
        await prisma.collection.create({
          data: {
            name: 'Not listed',
            default: true,
            nickname: preferences?.username
          }
        })
      ]

      return actionResult(newCollections)
    }

    return actionResult(collections)
  } else return actionResult([] as Types.Collection[])
}

export async function addToCollection({
  collectionId,
  questionId
}: {
  collectionId: string
  questionId: string
}) {
  const existingCollection = (await prisma.collection.findFirst({
    where: {
      id: collectionId
    }
  }))!

  const isInCollection = existingCollection.items.indexOf(questionId) !== -1

  const updated = await prisma.collection.update({
    where: {
      id: collectionId
    },
    data: {
      items: isInCollection
        ? // Remove if already added to collection or add if not in collection
          existingCollection.items.filter(id => id !== questionId)
        : [...existingCollection.items, questionId]
    }
  })

  return actionResult(updated)
}

export async function addToNewCollection({
  questionId,
  collectionName
}: {
  questionId: string
  collectionName: string
}) {
  const session = await getSession()

  const { user } = session!

  const preferences = await prisma.preferences.findFirst({
    where: {
      user_id: user.email
    }
  })

  const newCollection = await prisma.collection.create({
    data: {
      name: collectionName,
      items: [questionId],
      nickname: preferences?.username,
      default: false,
      description: ''
    }
  })

  return actionResult(newCollection)
}

export async function getCollection(id: string) {
  const collection = await prisma.collection.findFirst({
    where: {
      id
    }
  })

  if (!collection) return null

  const quizzes = await prisma.newQuiz.findMany({
    where: {
      questions: {
        some: {
          id: {
            in: collection?.items
          }
        }
      }
    },
    select: {
      questions: true,
      topics: true
    }
  })

  const questionsData = quizzes.reduce(
    (previous, next) => ({
      ...previous,
      questions: [
        ...previous.questions,
        ...next.questions.filter(
          question => collection?.items.indexOf(question.id) !== -1
        )
      ],
      topics: [...previous.topics, ...next.topics]
    }),
    { topics: [], questions: [] }
  )

  const { questions, topics } = questionsData

  const collectionData: Types.NewQuiz = {
    id: collection?.id!,
    name: collection?.name!,
    imageUrl: '/default-quiz-image.png',
    description: collection?.description!,
    nickname: collection?.nickname!,
    questions,
    topics,
    context: '',
    visibility: 'public'
  }

  return collectionData
}