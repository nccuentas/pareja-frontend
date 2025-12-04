import { useEffect, useState } from "react";
import api from "../services/api";

export default function useWeeklyReview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const res = await api.get("/weekly");
        if (!active) return;
        setData(res.data);
      } catch (err) {
        console.error(err);
        if (active) setError("No se pudo cargar el resumen.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
