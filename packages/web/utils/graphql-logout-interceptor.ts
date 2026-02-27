import { useAuthStore } from "@/stores/auth";
import { GraphqlResponse } from "@/types/graphql";
import { AxiosResponse } from "axios";

export function handleGraphqlLogoutInterceptor(response: AxiosResponse) {
  const data = response.data;
  const errors = (data as GraphqlResponse)?.errors;
  if (!errors?.length) return response;
  const originalError = errors?.[0]?.extensions?.originalError;
  const logout = useAuthStore.getState().logout;
  if (originalError?.statusCode === 401) {
    logout();
  }
  return response;
}
