import * as Types from '@prisma/client'

export type QuizWithLikes = Types.PrismaClient & {
  likes: number
}

export type QuizStatsType = {
  normal: {
    classic: {
      averageDuration: number
      averageScore: number
      averageCorrect: number
      averageIncorrect: number
    }
    flashcards: {
      averageDuration: number
      averageScore: number
      averageCorrect: number
      averageIncorrect: number
    }
    limonada: {
      averageDuration: number
      averageScore: number
      averageCorrect: number
      averageIncorrect: number
    }
  }
  advanced: {}
}

export { Types }