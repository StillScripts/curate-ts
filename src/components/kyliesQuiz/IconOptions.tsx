import { RadioGroup } from "@headlessui/react";
import type { IconOption } from "../../types/core";
import { classNames } from "../../utils/common";
import { DEFAULT_GRID, useQuiz } from "./app/QuizContext";

interface IconOptionsProps {
  options: IconOption[];
  questionKey: string;
}

const IconOptions: React.FC<IconOptionsProps> = ({ options, questionKey }) => {
  const { dispatch, q } = useQuiz();

  const handleClick = (value: string) => {
    dispatch &&
      dispatch({
        type: "handleInput",
        payload: { [questionKey]: value },
      });
  };

  return (
    <RadioGroup
      //value={userInput ? userInput[questionKey] : ""}
      onChange={handleClick}
      className="mt-5"
    >
      <RadioGroup.Label className="sr-only">{q?.question}</RadioGroup.Label>
      <div
        className={classNames(
          "grid",
          q.gridClasses || DEFAULT_GRID
        )}
      >
        {options.map((opt) => (
          <RadioGroup.Option
            key={opt.key}
            value={opt.key}
            className={({ active, checked }) =>
              classNames(
                "cursor-pointer focus:outline-none",
                active ? "ring-2 ring-indigo-500" : "",
                checked ? "border-white bg-opacity-20" : "",
                "flex flex-col items-center rounded border-2 border-transparent bg-white bg-opacity-5 p-2 shadow-sm hover:bg-opacity-20"
              )
            }
          >
            {opt.icon}
            <RadioGroup.Label as="span">{opt.label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default IconOptions;
