import { API_BASE_URL } from "@/constants/app";
import { handleAccessTokenInterceptor } from "@/utils/access-token-interceptor";
import axios from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(handleAccessTokenInterceptor);

export default api;
