import { useQuiz } from "./context/QuizContext";
import ImageOptions from "./options/ImageOptions";
import IconOptions from "./options/IconOptions";
import Form from "./options/FormFields";
import { classNames } from "../../utils/common";
import type { Question as QType } from "../../types/core";
import type { FormEvent } from "react";
import ControlledRadio from "./options/ControlledRadio";

/** The input options for a given question */
const Options = ({ q }: { q: QType }) => {
  switch (q.type) {
    case "form":
      return <Form fields={q.input} />;
    case "icon":
      return <IconOptions options={q.input} questionKey={q.key} />;
    case "image":
      return <ImageOptions options={q.input} questionKey={q.key} />;
    default:
      return null;
  }
};

/** Back and Next buttons that allow the user to move between questions */
const Buttons = () => {
  const quiz = useQuiz();

  const { dispatch, q, index, userInput } = quiz;

  const disabled = q.type === "form" ? false : !userInput[q.key];

  return (
    <div className="mt-5 flex w-full items-center justify-between border-t border-white border-opacity-10 pt-3">
      {index > 0 ? (
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "back" });
          }}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back
        </button>
      ) : (
        <div></div>
      )}
      <button
        type="submit"
        disabled={disabled}
        className={classNames(
          "inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700",
          "hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        )}
      >
        Next
      </button>
    </div>
  );
};

const Quiz = ({
  className = "flex max-w-lg flex-col rounded-xl bg-white/10 p-4 text-white",
}) => {
  const quiz = useQuiz();
  if (!quiz) {
    return null;
  }

  const { dispatch, q, confirmationStage, userInput } = quiz;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "next" });
  };

  return (
    <div className={className}>
      <h3 className="text-center text-2xl font-bold">
        {confirmationStage ? "Confirm your answers" : q.question}
      </h3>
      {q.type === "icon" && <ControlledRadio q={q} />}
      {confirmationStage ? (
        <div>{JSON.stringify(userInput)}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/** Answer options */}
          <Options q={q} />

          {/** Back and Next buttons */}
          <Buttons />
        </form>
      )}
    </div>
  );
};

export default Quiz;
