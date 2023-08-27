import { Game } from './components/Game'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="max-w-sm w-full flex flex-col items-center">
        <header className="mb-4">
          <h1 className="text-4xl text-center">JavaScript Quiz</h1>
        </header>
        {questions.length === 0 ? <Start /> : <Game />}
      </section>
    </main>
  )
}

export default App
