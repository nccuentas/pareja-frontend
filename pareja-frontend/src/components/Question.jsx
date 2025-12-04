import Scale from "./Scale";

export default function Question({ title, description, value, onChange }) {
  return (
    <div className="question">
      <h2 className="question-title">{title}</h2>
      {description && <p className="question-desc">{description}</p>}
      <Scale value={value} onChange={onChange} />
    </div>
  );
}
