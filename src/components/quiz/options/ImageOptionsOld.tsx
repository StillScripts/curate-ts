import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import type { ImageOption } from "../../../types/core";
import { classNames } from "../../../utils/common";
import { DEFAULT_GRID, useQuiz } from  "../context/QuizContext";

interface ImageOptionsProps {
  options: ImageOption[];
  questionKey: string;
}

const ImageOptions: React.FC<ImageOptionsProps> = ({
  options,
  questionKey,
}) => {
  const { dispatch, q, userInput } = useQuiz();

  const handleClick = (value: string) => {
    dispatch &&
      dispatch({
        type: "handleInput",
        payload: { [questionKey]: value },
      });
  };

  return (
    <div
      className="mt-5"
    >
      <p className="sr-only">{q?.question}</p>
      <div className={classNames("grid", q.gridClasses || DEFAULT_GRID)}>
        {options.map((opt) => (
          <div
            key={opt.key}
            onClick={()=>handleClick(opt.key)}
            className={
              classNames(
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500",
                //active ? "ring-2 ring-indigo-500" : "",
                //checked ? "border-white bg-opacity-20" : "",
                "flex flex-col items-center rounded border-2 border-transparent bg-white bg-opacity-5 p-2 shadow-sm hover:bg-opacity-20"
              )
            }
          >
            <Image
              {...opt.image}
              alt={opt.image?.alt}
              width={opt.image.width || 200}
              height={opt.image.height || 200}
            />
            <span>{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageOptions;
