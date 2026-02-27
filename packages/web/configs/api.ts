import { API_BASE_URL } from "@/constants/app";
import { handleAccessTokenInterceptor } from "@/utils/access-token-interceptor";
import { handleLogoutInterceptor } from "@/utils/logout-interceptor";
import axios from "axios";

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(handleAccessTokenInterceptor);
api.interceptors.response.use((r) => r, handleLogoutInterceptor);

export default api;
