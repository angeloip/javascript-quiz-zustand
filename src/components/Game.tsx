import { type Question as QuestionType } from '../interface'
import { useQuestionsStore } from '../store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBack, ArrowForward } from './Icons'
import { Footer } from './Footer'

const getBackgroundColor = (info: QuestionType, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'bg-zinc-700'
  if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer) {
    return 'bg-zinc-700'
  }
  if (answerIndex === correctAnswer) return 'bg-green-500'
  if (answerIndex === userSelectedAnswer) return 'bg-red-500'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-zinc-800 rounded-md">
      <h5>{info.question}</h5>
      <SyntaxHighlighter language="javascript" style={atomOneDark}>
        {info.code}
      </SyntaxHighlighter>
      <section className="flex flex-col">
        {info.answers.map((answer, index) => (
          <button
            key={index}
            disabled={info.userSelectedAnswer != null}
            onClick={handleClick(index)}
            className={`${getBackgroundColor(
              info,
              index
            )} px-3 py-2 enabled:hover:bg-slate-600 enabled:transition-colors ${
              index < info.answers.length - 1 && 'border-b border-b-gray-600'
            }`}
          >
            {answer}
          </button>
        ))}
      </section>
    </div>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <section className="flex items-center gap-4 mb-3">
        <button
          onClick={goPrevQuestion}
          disabled={currentQuestion === 0}
          className="bg-indigo-500 px-3 py-2 rounded-md font-medium disabled:cursor-not-allowed"
        >
          <ArrowBack />
        </button>
        <span>
          {currentQuestion + 1} / {questions.length}
        </span>
        <button
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
          className="bg-indigo-500 px-3 py-2 rounded-md font-medium disabled:cursor-not-allowed"
        >
          <ArrowForward />
        </button>
      </section>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
