import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Question } from '../interface'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPrevQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,
      fetchQuestions: async (limit) => {
        const res = await fetch('http://localhost:5173/data.json')
        const data = await res.json()

        const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
        set({ questions })
      },
      selectAnswer: (questionId, answerIndex) => {
        set((state) => {
          const questions = state.questions.map((question) => {
            if (question.id === questionId) {
              const isCorrectUserAnswer = question.correctAnswer === answerIndex
              if (isCorrectUserAnswer) confetti()
              return {
                ...question,
                userSelectedAnswer: answerIndex,
                isCorrectUserAnswer
              }
            }
            return question
          })
          return { questions }
        })
      },
      goNextQuestion: () => {
        const { currentQuestion, questions } = get()
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion })
        }
      },
      goPrevQuestion: () => {
        const { currentQuestion } = get()
        const prevQuestion = currentQuestion - 1
        if (prevQuestion >= 0) {
          set({ currentQuestion: prevQuestion })
        }
      },
      reset: () => {
        set({ currentQuestion: 0, questions: [] })
      }
    }),
    {
      name: 'questions'
    }
  )
)
