import { useQuiz } from "../context/QuizContext";
import FormFields from "../options/FormFields";
import IconOptions from "../options/IconOptions";
import ImageOptions from "../options/ImageOptions";

/** The input options for a given question */
const Options = () => {
  const { q, dispatch } = useQuiz();

  const handleClick = (key: string, value: string, oneClick?: boolean) => {
    if (dispatch) {
      dispatch({
        type: "handleInput",
        payload: { [key]: value },
      });
      if (oneClick) {
        dispatch({
          type: "next",
        });
      }
    }
  };

  switch (q.type) {
    case "form":
      return <FormFields fields={q.input} />;
    case "icon":
      return (
        <IconOptions
          options={q.input}
          handleClick={(value) => handleClick(q.key, value, q.oneClick)}
        />
      );
    case "image":
      return (
        <ImageOptions
          options={q.input}
          handleClick={(value) => handleClick(q.key, value, q.oneClick)}
        />
      );
    default:
      return null;
  }
};

export default Options
