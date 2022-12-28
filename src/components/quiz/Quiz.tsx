import { useQuiz } from "./context/QuizContext";
import type { FormEvent } from "react";
import Buttons from "./sections/Buttons";
import { Form } from "react-final-form";
import InputOptions from "./sections/InputOptions";

const Quiz = ({
  className = "flex max-w-lg flex-col rounded-2xl bg-white/10 p-4 text-white",
}) => {
  const quiz = useQuiz();
  if (!quiz) {
    return null;
  }

  const { dispatch, q, confirmationStage, userInput } = quiz;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    confirmationStage
      ? dispatch({ type: "submit" })
      : dispatch({ type: "next" });
  };

  return (
    <div className={className}>
      <h3 className="text-center text-2xl font-bold">
        {confirmationStage ? "Confirm your answers" : q.question}
      </h3>
      {/* {q.type === "icon" && <ControlledRadio q={q} />} */}
      <Form
        onSubmit={onSubmit}
        //validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {confirmationStage ? (
              <div>{JSON.stringify(userInput)}</div>
            ) : (
              <InputOptions />
            )}

            <Buttons />
          </form>
        )}
      />
    </div>
  );
};

export default Quiz;
