import type { ImageProps } from "next/image";
import type { DetailedHTMLProps } from "react";

// These are specific input props for React
type InputPropsReact = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SelectPropsReact = DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export interface Opt {
  label?: string;
  key: string;
}

export interface Input extends Opt {
  element: "input";
  props: InputPropsReact;
}

export interface Select extends Opt {
  element: "select";
  props: SelectPropsReact;
}

export type Field = Input | Select;

export interface ImageOption extends Opt {
  image: ImageProps;
}

export interface IconOption extends Opt {
  icon: JSX.Element;
}

export interface QCommon {
  question: string;
  helpText?: string;
}

export interface QForm extends QCommon {
  type: "field";
  input: Field[];
}

export interface QImage extends QCommon {
  key: string;
  type: "image";
  input: ImageOption[];
}

export interface QIcon extends QCommon {
  key: string;
  type: "icon";
  input: IconOption[];
}

export type Question = QForm | QImage | QIcon;

export type Quiz = {
  opener: Question;
  paths: Record<string, Question[]>;
};
