import { API_BASE_URL } from "@/constants/app";
import { handleAccessTokenInterceptor } from "@/utils/access-token-interceptor";
import axios from "axios";

const graphql = axios.create({
  baseURL: `${API_BASE_URL}/graphql`,
  method: "POST",
  headers: {
    Accept: "application/graphql-response+json, application/json",
    "Content-Type": "application/json",
  },
});

graphql.interceptors.request.use(handleAccessTokenInterceptor);

export default graphql;
