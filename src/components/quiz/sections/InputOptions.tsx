import { useQuiz } from "../context/QuizContext";
import FormFields from "../inputs/FormFields";
import RadioOptions from "../inputs/RadioOptions";

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
      return <FormFields q={q} />;
    case "icon":
      return (
        <RadioOptions
          q={q}
          handleClick={(value) => handleClick(q.key, value, q.oneClick)}
        />
      );
    case "image":
      return (
        <RadioOptions
          q={q}
          handleClick={(value) => handleClick(q.key, value, q.oneClick)}
        />
      );
    default:
      return null;
  }
};

export default Options
