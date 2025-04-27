'use server'

import { prisma } from '@/lib/prisma'
import { Types } from '@/types'
import { getSession } from '@auth0/nextjs-auth0'
import { actionResult } from 'http-react'

async function getUserPreferences() {
  try {
    const session = await getSession()
    if (!session) return null

    const user = session.user
    const preferences = await prisma.preferences.findFirst({
      where: { user_id: user.email }
    })

    return preferences
  } catch (error) {
    console.error('Error fetching user preferences:', error)
    return null
  }
}

export async function createCollection(collectionName: string) {
  try {
    const preferences = await getUserPreferences()
    if (!preferences) return actionResult(null)

    const collection = await prisma.collection.create({
      data: {
        name: collectionName,
        items: [],
        nickname: preferences.username
      }
    })

    return actionResult(collection)
  } catch (error) {
    console.error('Error creating collection:', error)
    return actionResult(null)
  }
}

export async function getCollections() {
  try {
    const preferences = await getUserPreferences()
    if (!preferences) return actionResult([] as Types.Collection[])

    const collections = await prisma.collection.findMany({
      where: { nickname: preferences.username }
    })

    if (collections.length > 0) return actionResult(collections)

    const defaultCollection = await prisma.collection.create({
      data: {
        name: 'Not listed',
        default: true,
        nickname: preferences.username
      }
    })

    return actionResult([defaultCollection])
  } catch (error) {
    console.error('Error fetching collections:', error)
    return actionResult([] as Types.Collection[])
  }
}

export async function addToCollection({
  collectionId,
  questionId
}: {
  collectionId: string
  questionId: string
}) {
  try {
    const collection = await prisma.collection.findFirst({
      where: { id: collectionId }
    })
    if (!collection) return actionResult(null)

    const exists = collection.items.includes(questionId)

    const updatedItems = exists
      ? collection.items.filter(id => id !== questionId)
      : [...collection.items, questionId]

    const updatedCollection = await prisma.collection.update({
      where: { id: collectionId },
      data: { items: updatedItems }
    })

    return actionResult(updatedCollection)
  } catch (error) {
    console.error('Error updating collection:', error)
    return actionResult(null)
  }
}

export async function addToNewCollection({
  questionId,
  collectionName
}: {
  questionId: string
  collectionName: string
}) {
  try {
    const preferences = await getUserPreferences()
    if (!preferences) return actionResult(null)

    const collection = await prisma.collection.create({
      data: {
        name: collectionName,
        items: [questionId],
        nickname: preferences.username,
        default: false,
        description: ''
      }
    })

    return actionResult(collection)
  } catch (error) {
    console.error('Error creating new collection:', error)
    return actionResult(null)
  }
}

export async function getCollection(id: string) {
  try {
    const collection = await prisma.collection.findFirst({
      where: { id }
    })
    if (!collection) return null

    const quizzes = await prisma.newQuiz.findMany({
      where: {
        questions: { some: { id: { in: collection.items } } }
      },
      select: {
        questions: true,
        topics: true
      }
    })

    let questions = []
    let topics = []
    let i = 0

    while (i < quizzes.length) {
      let quiz = quizzes[i]
      let j = 0

      while (j < quiz.questions.length) {
        let question = quiz.questions[j]
        if (collection.items.includes(question.id)) {
          questions = [...questions, question]
        }
        j = j + 1
      }

      topics = [...topics, ...quiz.topics]
      i = i + 1
    }

    const collectionData: Types.NewQuiz = {
      id: collection.id,
      name: collection.name,
      imageUrl: '/default-quiz-image.png',
      description: collection.description,
      nickname: collection.nickname,
      questions,
      topics,
      context: '',
      visibility: 'public'
    }

    return collectionData
  } catch (error) {
    console.error('Error fetching collection details:', error)
    return null
  }
}
