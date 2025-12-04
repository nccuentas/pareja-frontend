export function safePercent(value) {
  if (isNaN(value) || value == null) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return Math.round(value);
}
