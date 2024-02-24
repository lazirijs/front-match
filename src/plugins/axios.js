import axios from "axios";

const api = axios.create({
  baseURL: "https://back-match.onrender.com",
  withCredentials: true,
});

export { api };
