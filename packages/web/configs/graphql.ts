import { handleAccessTokenInterceptor } from "@/utils/access-token-interceptor";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const graphql = axios.create({
  baseURL: `${baseURL}/graphql`,
  method: "POST",
  headers: {
    Accept: "application/graphql-response+json, application/json",
    "Content-Type": "application/json",
  },
});

graphql.interceptors.request.use(handleAccessTokenInterceptor);

export default graphql;
