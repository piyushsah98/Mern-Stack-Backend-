import axios from "axios";
import { useAuthContext } from "../auth/context/AuthProvider";

export const useApi = () => {
  const AuthContext = useAuthContext();

  const api = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true, // so that our server can set or read cookies in the browser
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${AuthContext.accessToken}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status == 401) {
        const res = await axios.post("/api/auth/refresh");

        AuthContext.setAccessToken(res.data.accessToken);

        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axios(error.config);
      }
      return Promise.reject(error);
    },
  );
  return api;
};
