import type { Field } from "../../types/core";

interface FormProps {
  fields: Field[];
}

const Form: React.FC<FormProps> = ({ fields }) => (
  <div className="mt-5 grid grid-cols-2 gap-3">
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
            <input
              {...opt.props}
              id={opt.key}
              className="text-gray-700 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      ) : (
        <select key={opt.key} {...opt.props}></select>
      )
    )}
  </div>
);

export default Form;
