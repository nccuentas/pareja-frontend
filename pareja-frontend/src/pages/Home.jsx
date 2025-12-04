import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      nav("/");
    }
  }, [user, nav]);

  if (!user) return null;

  const displayName = user === "nicolas" ? "Nicolás" : "Kely";

  return (
    <div className="screen">
      <header className={`home-header home-header-${user}`}>
        <h1>Hola, {displayName}</h1>
        <p>Gracias por darte un momento para revisar cómo te sientes.</p>
      </header>

      <main className="home-main">
        <button
          className="btn-primary"
          onClick={() => nav("/daily")}
        >
          Hacer check-in de hoy
        </button>

        <button
          className="btn-secondary"
          onClick={() => nav("/weekly")}
        >
          Ver resumen de la semana
        </button>

        <button
          className="btn-text"
          onClick={() => nav("/")}
        >
          Cambiar de persona
        </button>
      </main>
    </div>
  );
}
