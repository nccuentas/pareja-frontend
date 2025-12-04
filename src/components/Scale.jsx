export default function Scale({ value, onChange }) {
  return (
    <div className="scale">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`scale-item ${value === n ? "scale-item-active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
