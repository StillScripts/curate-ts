import { useQuiz } from "./context/QuizContext"
import Buttons from "./sections/Buttons"
import { Form } from "react-final-form"
import InputOptions from "./sections/InputOptions"
import ConfirmationValues from "./sections/ConfirmationValues"

const Quiz = ({
  className = "flex max-w-lg flex-col rounded-2xl bg-white/10 p-4 text-white",
}) => {
  const quiz = useQuiz()
  if (!quiz) {
    return null
  }

  const { dispatch, q, confirmationStage } = quiz

  const onSubmit = (values: Record<string, string | number>) => {
    if (confirmationStage) {
      dispatch({ type: "submit" })
    } else {
      dispatch({ type: "handleInput", payload: values })
      dispatch({ type: "next" })
    }
  }

  return (
    <div className={className}>
      <h3 className="text-center text-2xl font-bold">
        {confirmationStage
          ? quiz.quiz.confirmationHeading || "Confirm your answers"
          : q.question}
      </h3>
      <Form
        onSubmit={onSubmit}
        //validate={validate} This will block the submission before it hits onSubmit()
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {confirmationStage ? <ConfirmationValues /> : <InputOptions />}
            <Buttons />
          </form>
        )}
      />
    </div>
  )
}

export default Quiz
