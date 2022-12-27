// Building an example that would work for Textured Art by Kylie

import { AcademicCapIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import type { Field, Question, Quiz } from "../../types/core";

type PathKeys = "custom-art" | "learn-more";

const firstName = {
  element: "input",
  label: "First Name",
  key: "first",
  props: { placeholder: "Your first name", type: "text", required: true },
} satisfies Field;

const lastName = {
  element: "input",
  label: "Last Name",
  key: "last",
  props: { placeholder: "Your last name", type: "text", required: true },
} satisfies Field;

const email = {
  element: "input",
  label: "Email Address",
  key: "email",
  props: { placeholder: "Your email", type: "email", required: true },
} satisfies Field;

const phone = {
  element: "input",
  label: "Phone Number",
  key: "phone",
  props: { placeholder: "Your phone", type: "tel", required: false },
} satisfies Field;

export const base = {
  type: "form",
  question: "Please enter your contact details",
  input: [firstName, lastName, email, phone],
} satisfies Question;

export const question2 = {
  key: "design",
  type: "image",
  question: "What design do you like best?",
  input: [
    {
      key: "learn-more",
      image: { src: "/favicon.ico", alt: "Learn more" },
    },
    {
      key: "custom-art",
      image: { src: "/favicon.ico", alt: "Custom art" },
    },
  ],
} satisfies Question;

export const question3 = {
  key: "colours",
  type: "image",
  question: "What colours do you like best?",
  input: [
    {
      key: "learn-more",
      image: { src: "/favicon.ico", alt: "Learn more" },
    },
    {
      key: "custom-art",
      image: { src: "/favicon.ico", alt: "Custom art" },
    },
  ],
} satisfies Question;

export const quiz: Quiz<PathKeys> = {
  opener: {
    key: "interest",
    type: "icon",
    question: "What are you interested in?",
    input: [
      {
        label: "Learn More About Me",
        key: "learn-more",
        icon: (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-900 text-white">
            <AcademicCapIcon className="h-8 w-8" aria-hidden="true" />
          </div>
        ),
      },
      {
        label: "Request A Custom Art Piece",
        key: "custom-art",
        icon: (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-900 text-white">
            <PaintBrushIcon className="h-8 w-8" aria-hidden="true" />
          </div>
        ),
      },
    ],
  },
  paths: {
    "custom-art": [question2, question3, base],
    "learn-more": [base],
  },
};
