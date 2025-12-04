export function getWeekRangeLabel() {
  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);
  start.setDate(start.getDate() - 6);

  const fmt = (d) =>
    d.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
    });

  return `${fmt(start)} - ${fmt(end)}`;
}
