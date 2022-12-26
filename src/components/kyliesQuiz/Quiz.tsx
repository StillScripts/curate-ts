import type { Question as QuestionType } from "../../types/core";
import { useQuiz } from "./app/QuizContext";
import ImageOptions from "./ImageOptions";
import IconOptions from "./IconOptions";
import Form from "./FormFields";
import { classNames } from "../../utils/common";

interface QuestionProps {
  q?: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ q }) => {
  const quiz = useQuiz();
  if (!q || !quiz) {
    return null;
  }

  const { dispatch, index, userInput } = quiz;



  const disabled = q.type === "field" ? false : !!userInput[q.key]

  return (
    <div>
      <h3 className="text-center text-2xl font-bold">{q.question}</h3>
      <form>
        {q.type === "image" && <ImageOptions options={q.input} key={q.key} />}
        {q.type === "icon" && <IconOptions options={q.input} key={q.key} />}
        {q.type === "field" && <Form fields={q.input} />}
        <div className="mt-5 flex w-full items-center justify-between border-t border-white border-opacity-10 py-4">
          {index > 0 ? (
            <button
              type="button"
              onClick={() => {
                dispatch && dispatch({ type: "back" });
              }}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          <button
            type="button"
            disabled={disabled}
            className={classNames(
              "inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700",
              "hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            Next
          </button>
        </div>
      </form>
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

  return (
    <div className={className}>
      <Question q={quiz.q} />
      {/* <p>{all.index}</p>
      <p>{all.path}</p> */}
    </div>
  );
};

export default Quiz;
