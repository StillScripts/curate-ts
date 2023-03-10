import type { SVGProps } from "react"
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
//import { DEFAULT_GRID, useQuiz } from "../context/QuizContext";
import type { QIcon } from "../../../types/core"
import { classNames } from "../../../utils/common"

export default function ControlledRadio({ q }: { q: QIcon }) {
  const [selected, setSelected] = useState(q.input[0])

  //const { dispatch } = useQuiz();

  return (
    <div className="mt-5 w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">{q.question}</RadioGroup.Label>
          <div className={classNames("grid", "grid-cols-1 gap-4")}>
            {q.input.map((opt) => (
              <RadioGroup.Option
                key={opt.key}
                value={opt.key}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-indigo-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-md">
                          {opt.icon}
                          <RadioGroup.Label
                            as="p"
                            className={`mt-4 font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {opt.label}
                          </RadioGroup.Label>
                        </div>
                      </div>

                      <div className="shrink-0 text-white">
                        {checked && <CheckIcon className="h-6 w-6" />}
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
