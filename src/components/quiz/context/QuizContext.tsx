import type { Dispatch } from "react"
import { useContext } from "react"
import { createContext, useReducer } from "react"
import type { Question, Quiz } from "../../../types/core"
import { quiz } from "../../../utils/curator/example"

export const DEFAULT_GRID = "grid-cols-1 gap-3 sm:grid-cols-2"

export interface QuizState {
  index: number
  q: Question
  quiz: Quiz<string>
  userInput: Record<string, string | number>
  confirmationStage: boolean
  memo: Record<number, string[]>
}

export type QuizAction =
  | { type: "back" } // Go back to previous question
  | { type: "next" } // Go to next question
  | { type: "submit" } // Send the userInput data to the server
  | { type: "handleInput"; payload: Record<string, string | number> } // Update userInput
  | { type: "edit"; payload: number } // Change an existing answer

export interface ProviderValues extends QuizState {
  dispatch: Dispatch<QuizAction>
}

const QuizContext = createContext<ProviderValues | undefined>(undefined)

const reducer = (state: QuizState, action: QuizAction): QuizState => {
  const path = state.userInput[quiz.opener.key]
  const questions = path ? state.quiz.paths[path] : undefined
  switch (action.type) {
    case "back":
      if (state.index === 0) {
        console.log("Error, cannot go back.")
        return state
      }
      if (state.index === 1) {
        return { ...state, q: state.quiz.opener, index: 0 }
      }
      if (state.confirmationStage) {
        return {
          ...state,
          confirmationStage: false,
          index: state.index - 1,
        }
      }
      if (!questions) {
        alert("Error, no questions on this path.")
        return state
      }
      return {
        ...state,
        q: questions[state.index - 2] as Question,
        index: state.index - 1,
      }
    case "next":
      if (!questions) {
        alert("Error, no questions on this path.")
        return state
      }
      if (state.index >= questions.length) {
        return {
          ...state,
          confirmationStage: true,
          index: state.index + 1,
        }
      }
      return {
        ...state,
        q: questions[state.index] as Question,
        index: state.index + 1,
      }
    case "submit":
      alert(JSON.stringify(state.userInput))
      return state
    case "handleInput":
      return {
        ...state,
        userInput: {
          ...state.userInput,
          ...action.payload,
        },
        memo: {
          ...state.memo,
          [state.index]:
            state.q.type === "form"
              ? state.q.input.map((opt) => opt.key)
              : [state.q.key],
        },
      }
    case "edit":
      alert(action.payload)
      return {
        ...state,
        index: action.payload,
        confirmationStage: false,
      }
    default:
      throw new Error()
  }
}

const validateQuiz = (quiz: Quiz<string>) => {
  const openerKeys = quiz.opener.input.map((opt) => opt.key)
  const pathKeys = Object.keys(quiz.paths)
  openerKeys.forEach((key) => {
    if (!pathKeys.includes(key)) {
      alert(`Missing a path for the following option: ${key}`)
    }
  })
  pathKeys.forEach((key) => {
    if (!openerKeys.includes(key)) {
      alert(`There are no options for the following path: ${key}`)
    }
  })
  return quiz
}

interface QuizProviderProps {
  children: React.ReactNode
  quiz: Quiz<string>
}

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  quiz,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    q: quiz.opener,
    quiz: validateQuiz(quiz),
    userInput: {},
    index: 0,
    confirmationStage: false,
    memo: {},
  })

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const values = useContext(QuizContext)
  if (typeof values === "undefined") {
    throw new Error("Quiz has no provider")
  }
  return values
}

export default QuizContext
