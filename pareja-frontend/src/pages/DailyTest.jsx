import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";

export default function DailyTest() {
  const nav = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) nav("/");
  }, [user, nav]);

  const [form, setForm] = useState({
    feelings: 3,
    communication: 3,
    trust: 3,
    discomfort: false,
    notes: "",
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const totalQuestions = 4; // 3 de escala + 1 de incomodidad
  const answered =
    (form.feelings ? 1 : 0) +
    (form.communication ? 1 : 0) +
    (form.trust ? 1 : 0) +
    1; // contamos incomodidad siempre

  const handleSubmit = async () => {
    if (!user) return;
    setSending(true);
    setError("");

    try {
      const today = new Date().toISOString().slice(0, 10);
      await api.post("/daily", {
        user,
        date: today,
        ...form,
      });

      nav("/home");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (!user) return null;

  const displayName = user === "nicolas" ? "Nicolás" : "Kely";

  return (
    <div className={`screen test-screen test-screen-${user}`}>
      <header className="test-header">
        <span className="test-user">{displayName}</span>
        <ProgressBar step={answered} total={totalQuestions} />
      </header>

      <main className="test-main">
        <Question
          title="¿Cómo te sentiste hoy en la relación?"
          description="Piensa en el día en general."
          value={form.feelings}
          onChange={(v) => setForm({ ...form, feelings: v })}
        />

        <Question
          title="¿Cómo sentiste la comunicación?"
          description="Qué tanto pudiste hablar o expresarte."
          value={form.communication}
          onChange={(v) => setForm({ ...form, communication: v })}
        />

        <Question
          title="¿Qué tan tranquil@ y segur@ te sentiste?"
          description="Si hubo calma, confianza, poca ansiedad."
          value={form.trust}
          onChange={(v) => setForm({ ...form, trust: v })}
        />

        <div className="question">
          <h2 className="question-title">
            ¿Algo te hizo sentir incómod@ hoy?
          </h2>
          <div className="choice-row">
            <button
              type="button"
              className={`choice-btn ${
                form.discomfort ? "choice-active" : ""
              }`}
              onClick={() => setForm({ ...form, discomfort: true })}
            >
              Sí
            </button>
            <button
              type="button"
              className={`choice-btn ${
                !form.discomfort ? "choice-active" : ""
              }`}
              onClick={() => setForm({ ...form, discomfort: false })}
            >
              No
            </button>
          </div>

          <textarea
            className="notes-input"
            placeholder="Puedes escribir algo si quieres (opcional)."
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          className="btn-primary full-width"
          onClick={handleSubmit}
          disabled={sending}
        >
          {sending ? "Guardando..." : "Guardar y volver al inicio"}
        </button>
      </main>
    </div>
  );
}
