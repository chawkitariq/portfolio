import { useAuthStore } from "@/stores/auth";
import { AxiosError } from "axios";

export function handleLogoutInterceptor(error: AxiosError) {
  const logout = useAuthStore.getState().logout;
  if (error.response?.status === 401) {
    logout();
  }
  return Promise.reject(error);
}
