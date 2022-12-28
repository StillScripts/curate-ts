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

export interface Opt<T = string> {
  label?: string;
  key: T;
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

export interface ImageOption<T = string> extends Opt<T> {
  image: ImageProps;
}

export interface IconOption<T = string> extends Opt<T> {
  icon: JSX.Element;
}

export interface QCommon {
  question: string;
  gridClasses?: string;
  helpText?: string;
}

export interface QForm extends QCommon {
  type: "form";
  input: Field[];
}

export interface QImage<T = string> extends QCommon {
  key: string;
  type: "image";
  input: ImageOption<T>[];
}

export interface QIcon<T = string> extends QCommon {
  key: string;
  type: "icon";
  input: IconOption<T>[];
}

export type Question = QForm | QImage | QIcon;

/**
 * The Quiz defines all the questions in a quiz. 
 * It has an opener question, which will either be an Image or Icon question,
 * and it has question paths which follow on from the initial question. 
 * The generic (T) is the key that is used for the quiz
 */
export type Quiz<T extends string> = {
  opener: QImage<T> | QIcon<T>; 
  paths: Record<T, Question[]>;
};
