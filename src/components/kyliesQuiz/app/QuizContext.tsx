import type { Dispatch } from "react";
import { useContext } from "react";
import { createContext, useReducer } from "react";
import type { Question, Quiz } from "../../../types/core";
import { quiz } from "../../../utils/curator/example";

export interface QuizState {
  index: number;
  q: Question;
  quiz: Quiz;
  userInput: Record<string, string | number>;
}

export type QuizAction =
  | { type: "back" } // Go back to previous question
  | { type: "next" } // Go to next question
  | { type: "submit" } // Send the userInput data to the server
  | { type: "handleInput"; payload: Record<string, string | number> }; // Update userInput

export interface ProviderValues extends QuizState {
  dispatch: Dispatch<QuizAction>;
}

const QuizContext = createContext<ProviderValues | undefined>(undefined);

function reducer(state: QuizState, action: QuizAction): QuizState {
  const path = state.userInput[quiz.opener.key];
  const questions = path ? state.quiz.paths[path] : undefined;
  switch (action.type) {
    case "back":
      if (state.index === 0) {
        console.log("Error, cannot go back.");
        return state;
      }
      if (state.index === 1) {
        return { ...state, q: state.quiz.opener, index: 0 };
      }
      if (!questions) {
        alert("Error, no questions on this path.");
        return state;
      }
      return {
        ...state,
        q: questions[state.index - 2] as Question,
        index: state.index - 1,
      };
    case "next":
      if (!questions) {
        alert("Error, no questions on this path.");
        return state;
      }
      return {
        ...state,
        q: questions[state.index] as Question,
        index: state.index + 1,
      };
    case "handleInput":
      return {
        ...state,
        userInput: {
          ...state.userInput,
          ...action.payload,
        },
      };
    default:
      throw new Error();
  }
}

interface QuizProviderProps {
  children: React.ReactNode;
  quiz: Quiz;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  quiz,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    q: quiz.opener,
    quiz: quiz,
    userInput: {},
    index: 0,
  });

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const values = useContext(QuizContext);
  if (typeof values === "undefined") {
    throw new Error("Quiz has no provider");
  }
  return values;
};

export default QuizContext;
