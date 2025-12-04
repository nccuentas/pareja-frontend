export default function ProgressBar({ step, total }) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="progress">
      <div className="progress-track">
        <div
          className="progress-bar"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="progress-label">
        {step}/{total}
      </span>
    </div>
  );
}
