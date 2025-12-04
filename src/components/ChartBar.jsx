export default function ChartBar({ label, value, colorClass }) {
  return (
    <div className="chart-row">
      <div className="chart-label">{label}</div>
      <div className="chart-bar-track">
        <div
          className={`chart-bar-fill ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <div className="chart-value">{value}%</div>
    </div>
  );
}
