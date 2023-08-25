import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    Authorization: import.meta.env.VITE_API_AUTH_TOKEN,
  },
});
