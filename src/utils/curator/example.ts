// Building an example that would work for Textured Art by Kylie

import type { Field, Question } from "../../types/core";

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

const base: Question = {
  type: "field",
  question: "Please enter your contact details",
  input: [firstName, lastName, email, phone],
};

const question1: Question = {
  type: "image",
  question: "What are you interested in?",
  input: [
    {
      label: "Learn More About Me",
      key: "learn-more",
      image: { src: "/favicon.ico", alt: "Learn more" },
    },
    {
      label: "Request A Custom Art Piece",
      key: "custom-art",
      image: { src: "/favicon.ico", alt: "Custom art" },
    },
  ],
};

const question2: Question = {
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
};

const question3: Question = {
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
};

export const quiz = {
  opener: question1,
  learnMore: {
    title: "Simple learn more request",
    description: "User who wants to learn more.",
    questions: [base],
  },
  customArt: {
    title: "Custom art request",
    description: "User who wants order a custom art piece.",
    questions: [question2, question3, base],
  },
};
