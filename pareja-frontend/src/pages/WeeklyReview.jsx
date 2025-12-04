import { useNavigate } from "react-router-dom";
import useWeeklyReview from "../hooks/useWeeklyReview";
import { getWeekRangeLabel } from "../utils/dates";
import ChartBar from "../components/ChartBar";

function PersonalReview({ name, colorClass, data }) {
  // ✅ CASO: aún no hay datos para esta persona
  if (!data || !data.percentages) {
    return (
      <section className="review-section">
        <h2 className={colorClass}>{name}</h2>
        <p className="review-empty">
          Aún no hay suficientes respuestas esta semana.
        </p>
      </section>
    );
  }

  return (
    <section className="review-section">
      <h2 className={colorClass}>{name}</h2>

      <ChartBar
        label="Sentimientos"
        value={data.percentages.feelings}
        colorClass={colorClass}
      />
      <ChartBar
        label="Comunicación"
        value={data.percentages.communication}
        colorClass={colorClass}
      />
      <ChartBar
        label="Confianza"
        value={data.percentages.trust}
        colorClass={colorClass}
      />

      <ul className="review-list">
        {data.text.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

export default function WeeklyReview() {
  const nav = useNavigate();
  const { data, loading, error } = useWeeklyReview();
  const rangeLabel = getWeekRangeLabel();

  return (
    <div className="screen review-screen">
      {/* HEADER */}
      <header className="review-header">
        <h1>Resumen de la semana</h1>
        <p>{rangeLabel}</p>
      </header>

      {/* CONTENIDO */}
      <main className="review-main">
        {loading && <p>Cargando resumen...</p>}

        {error && (
          <p className="error-text">
            No se pudo cargar el resumen semanal.
          </p>
        )}

        {!loading && !error && data && data.message && (
          <p className="review-empty">{data.message}</p>
        )}

        {!loading && !error && data && !data.message && (
          <>
            <PersonalReview
              name="Nicolás"
              colorClass="chart-nicolas"
              data={data.nicolas}
            />

            <PersonalReview
              name="Kely"
              colorClass="chart-kely"
              data={data.kely}
            />

            <section className="review-section">
              <h2>Recomendación general</h2>
              <p className="review-suggestion">
                {data.suggestion ||
                  "Usen este espacio como punto de partida para conversar con calma y respeto."}
              </p>
            </section>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="review-footer">
        <button
          className="btn-secondary full-width"
          onClick={() => nav("/home")}
        >
          Volver al inicio
        </button>

        <button
          className="btn-text full-width"
          onClick={() => nav("/")}
        >
          Cambiar de persona
        </button>
      </footer>
    </div>
  );
}
