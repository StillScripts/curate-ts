import { camelSplit, getKeys } from "../../../utils/common"
import { useQuiz } from "../context/QuizContext"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

const ConfirmationValues = () => {
  const { memo, index, userInput, dispatch } = useQuiz()

  const handleEdit = (key: string) => {
    let newIndex = index
    //alert(key);
    getKeys(memo).forEach((num) => {
      if (memo[num]?.includes(key)) {
        newIndex = num
      }
    })
    //alert(JSON.stringify(memo));
    dispatch && dispatch({ type: "edit", payload: newIndex })
  }

  return (
    <ul
      role="list"
      className="my-5 mx-2 h-[48vh] w-72 divide-y divide-gray-500 overflow-y-scroll rounded bg-white bg-opacity-10"
    >
      {Object.keys(userInput).map((key, id) => (
        <li key={key + id} className="flex items-center justify-between py-4">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {camelSplit(key).toUpperCase()}
            </p>
            <p className="text-sm text-gray-300">{userInput[key]}</p>
          </div>
          <PencilSquareIcon
            onClick={() => {
              handleEdit(key)
            }}
            className="mr-3 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200"
          />
        </li>
      ))}
    </ul>
  )
}

export default ConfirmationValues
