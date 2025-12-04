import { useNavigate } from "react-router-dom";

export default function SelectUser() {
  const nav = useNavigate();

  const pickUser = (user) => {
    localStorage.setItem("user", user);
    nav("/home");
  };

  return (
    <div className="split-screen">
      <button
        className="split-half split-half-nicolas"
        onClick={() => pickUser("nicolas")}
      >
        <span className="split-name">Nicolás</span>
      </button>

      <button
        className="split-half split-half-kely"
        onClick={() => pickUser("kely")}
      >
        <span className="split-name">Kely</span>
      </button>
    </div>
  );
}
