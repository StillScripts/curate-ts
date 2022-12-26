import type { Field } from "../../types/core";

interface FormProps {
  fields: Field[];
}

const Form: React.FC<FormProps> = ({ fields }) => (
  <div>
    {fields.map((opt) =>
      opt.element === "input" ? (
        <input key={opt.key} {...opt.props} />
      ) : (
        <select key={opt.key} {...opt.props}></select>
      )
    )}
  </div>
);

export default Form;
