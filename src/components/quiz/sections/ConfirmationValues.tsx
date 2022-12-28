import { camelSplit } from "../../../utils/common";
import { useQuiz } from "../context/QuizContext";

const ConfirmationValues = () => {
  const { userInput } = useQuiz();
  return (
    <ul
      role="list"
      className="my-5 mx-2 h-[50vh] w-72 divide-y divide-gray-500 overflow-y-scroll rounded bg-white bg-opacity-10"
    >
      {Object.keys(userInput).map((key, id) => (
        <li key={key + id} className="flex py-4">
          {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {camelSplit(key).toUpperCase()}
            </p>
            <p className="text-sm text-gray-300">{userInput[key]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ConfirmationValues;
