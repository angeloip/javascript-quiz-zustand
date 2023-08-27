import { useQuestionsStore } from '../store/questions'

const getResult = () => {
  const questions = useQuestionsStore((state) => state.questions)

  let correctAnswers = 0
  let incorrectAnswers = 0
  let unanswered = 0

  questions.forEach((question) => {
    if (question.userSelectedAnswer == null) {
      unanswered++
    } else if (question.userSelectedAnswer === question.correctAnswer) {
      correctAnswers++
    } else {
      incorrectAnswers++
    }
  })

  return { correctAnswers, incorrectAnswers, unanswered }
}

export const Footer = () => {
  const { correctAnswers, incorrectAnswers, unanswered } = getResult()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer className="flex flex-col gap-3 mt-2 items-center">
      <section className="font-medium flex gap-2 items-center">
        <p>
          Correctas: <span className="text-green-500">{correctAnswers}</span>
        </p>
        -
        <p>
          Incorrectas: <span className="text-red-500">{incorrectAnswers}</span>
        </p>
        -
        <p>
          Sin responder: <span className="text-yellow-500">{unanswered}</span>
        </p>
      </section>
      <button
        onClick={reset}
        className="font-medium bg-zinc-700 py-2 px-3 rounded-md"
      >
        Resetear Prueba
      </button>
    </footer>
  )
}
