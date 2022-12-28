import { classNames } from "../../../utils/common";
import { useQuiz } from "../context/QuizContext";

/** Back and Next buttons that allow the user to move between questions */
const Buttons = () => {
  const quiz = useQuiz();

  const { dispatch, q, index, userInput, confirmationStage } = quiz;

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
      {confirmationStage ? (
        <button
          type="submit"
          disabled={disabled}
          className={classNames(
            "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium ",
            disabled
              ? "bg-gray-100 text-gray-500 opacity-90"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          )}
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          disabled={disabled}
          className={classNames(
            "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium ",
            disabled
              ? "bg-gray-100 text-gray-500 opacity-90"
              : "bg-gray-100 text-indigo-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            q.oneClick && "hidden"
          )}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Buttons;
