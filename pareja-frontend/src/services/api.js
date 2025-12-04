import axios from "axios";

const api = axios.create({
  baseURL: "https://pareja-backend-cjau.onrender.com/api",
});

export default api;
