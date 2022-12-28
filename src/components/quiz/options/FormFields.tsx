import type { Field as FieldType } from "../../../types/core";
import { classNames } from "../../../utils/common";
import { DEFAULT_GRID, useQuiz } from "../context/QuizContext";
import { Field } from 'react-final-form'

interface FormFieldsProps {
  fields: FieldType[];
}

const FormFields: React.FC<FormFieldsProps> = ({ fields }) => {
  const { q } = useQuiz();
  return (
    <div className="mt-5">
      <div className={classNames("grid", q.gridClasses || DEFAULT_GRID)}>
        {fields.map((opt) =>
          opt.element === "input" ? (
            <div className="mt-2" key={opt.key}>
              <label
                htmlFor={opt.key}
                className="block text-sm font-medium text-gray-300"
              >
                {opt.label}
              </label>
              <div className="mt-1">
                <Field
                  component="input"
                  name={opt.key}
                  id={opt.key}
                  className="block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...opt.props}
                />
              </div>
            </div>
          ) : (
            <select key={opt.key} {...opt.props}></select>
          )
        )}
      </div>
    </div>
  );
};

export default FormFields;
