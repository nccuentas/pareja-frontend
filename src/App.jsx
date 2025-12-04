import { Routes, Route, Navigate } from "react-router-dom";
import SelectUser from "./pages/SelectUser";
import Home from "./pages/Home";
import DailyTest from "./pages/DailyTest";
import WeeklyReview from "./pages/WeeklyReview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectUser />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daily" element={<DailyTest />} />
      <Route path="/weekly" element={<WeeklyReview />} />
      {/* por si entra a una ruta rara */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
