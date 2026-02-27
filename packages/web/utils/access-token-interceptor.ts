import { useAuthStore } from "@/stores/auth";
import { InternalAxiosRequestConfig } from "axios";

export function handleAccessTokenInterceptor(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}
