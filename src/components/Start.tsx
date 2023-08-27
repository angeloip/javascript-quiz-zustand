import { useQuestionsStore } from '../store/questions'

const LIMIT_QUESTION = 5

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION)
  }
  return (
    <button
      onClick={handleClick}
      className="bg-indigo-500 px-3 py-2 rounded-md font-medium"
    >
      ¡Empezar!
    </button>
  )
}
