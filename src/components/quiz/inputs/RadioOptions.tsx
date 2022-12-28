import { RadioGroup } from "@headlessui/react";
//import { CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Field } from "react-final-form";
import type { QIcon, QImage } from "../../../types/core";
import { classNames } from "../../../utils/common";
import { DEFAULT_GRID } from "../context/QuizContext";

interface RadioOptionsProps {
  q: QIcon | QImage;
  handleClick: (value: string) => void;
}
const RadioOptions: React.FC<RadioOptionsProps> = ({ q, handleClick }) => {
  return (
    <Field name={q.key}>
      {({ input }) => (
        <div>
          <RadioGroup
            name={input.name}
            value={input.value}
            onChange={q.oneClick ? handleClick : input.onChange}
            className="mt-5"
          >
            <RadioGroup.Label className="sr-only">
              {q?.question}
            </RadioGroup.Label>
            <div className={classNames("grid", q.gridClasses || DEFAULT_GRID)}>
              {q.type === "icon"
                ? q.input.map((opt) => (
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
                      {({ checked }) => (
                        <>
                          {opt.icon}

                          <RadioGroup.Label as="span">
                            {opt.label}
                          </RadioGroup.Label>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))
                : q.input.map((opt) => (
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
                      {({ checked }) => (
                        <>
                          <Image
                            {...opt.image}
                            alt={opt.image?.alt}
                            width={opt.image.width || 200}
                            height={opt.image.height || 200}
                          />
                          <RadioGroup.Label as="span">
                            {opt.label}
                          </RadioGroup.Label>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
            </div>
          </RadioGroup>
        </div>
      )}
    </Field>
  );
};

export default RadioOptions;
