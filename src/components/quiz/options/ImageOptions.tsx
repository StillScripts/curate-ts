import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import type { ImageOption } from "../../../types/core";
import { classNames } from "../../../utils/common";
import { DEFAULT_GRID, useQuiz } from  "../context/QuizContext";

interface ImageOptionsProps {
  options: ImageOption[];
  handleClick: (value: string) => void;
}

const ImageOptions: React.FC<ImageOptionsProps> = ({
  options,
  handleClick
}) => {
  const { q, userInput } = useQuiz();

  return (
    <RadioGroup
      //value={userInput ? userInput[questionKey] : null}
      onChange={handleClick}
      className="mt-5"
    >
      <RadioGroup.Label className="sr-only">{q?.question}</RadioGroup.Label>
      <div className={classNames("grid", q.gridClasses || DEFAULT_GRID)}>
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
            <Image
              {...opt.image}
              alt={opt.image?.alt}
              width={opt.image.width || 200}
              height={opt.image.height || 200}
            />
            <RadioGroup.Label as="span">{opt.label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ImageOptions;
