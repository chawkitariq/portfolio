import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const graphql = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  method: "POST",
  headers: {
    Accept: "application/graphql-response+json, application/json",
    "Content-Type": "application/json",
  },
});

graphql.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default graphql;
