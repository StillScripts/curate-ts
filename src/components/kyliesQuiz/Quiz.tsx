import Image from "next/image";
import type { Question as QuestionType } from "../../types/core";

interface QuestionProps {
  q: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ q }) => {
  const { question, input, type } = q;
  return (
    <div>
      <h3 className="text-2xl font-bold">{question}</h3>
      {type === "image" && (
        <div>
          {input.map((opt) => (
            <div className="rounded border p-2" key={opt.key}>
              {opt.label && <p>{opt.label}</p>}
              <Image {...opt.image} alt={opt.image?.alt} />
            </div>
          ))}
        </div>
      )}
      {type === "icon" && (
        <div>
          {input.map((opt) => (
            <div className="rounded border p-2" key={opt.key}>
              {opt.label && <p>{opt.label}</p>}
              {opt.icon}
            </div>
          ))}
        </div>
      )}
      {type === "field" && (
        <form>
          {input.map((opt) =>
            opt.element === "input" ? (
              <input key={opt.key} {...opt.props} />
            ) : (
              <select key={opt.key} {...opt.props}></select>
            )
          )}
        </form>
      )}
    </div>
  );
};

const Quiz = ({
  className = "flex max-w-xs flex-col rounded-xl bg-white/10 p-4 text-white",
}) => {
  return <div className={className}>{/* <Question /> */}</div>;
};

export default Quiz;
