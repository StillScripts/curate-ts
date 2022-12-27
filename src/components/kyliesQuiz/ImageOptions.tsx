/* eslint-disable @next/next/no-img-element */
import type { ImageOption } from "../../types/core";
import { useQuiz } from "./app/QuizContext";

interface ImageOptionsProps {
  options: ImageOption[];
  questionKey: string;
}
const ImageOptions: React.FC<ImageOptionsProps> = ({
  options,
  questionKey,
}) => {
  const { dispatch } = useQuiz();

  const handleClick = (value: string) => {
    dispatch &&
      dispatch({
        type: "handleInput",
        payload: { [questionKey]: value },
      });
  };

  return (
    <div className="mt-4">
      {options.map((opt) => (
        <div
          onClick={() => handleClick(opt.key)}
          className="rounded border p-2"
          key={opt.key}
        >
          {opt.label && <p>{opt.label}</p>}
          <img
            {...opt.image}
            src={opt.image.src as string}
            alt={opt.image?.alt}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageOptions;
