import api from "@/configs/api";
import { AuthSignInDto, AuthSignInResponse } from "@portfolio/api";
import { AxiosResponse } from "axios";

export function signIn(
  payload: AuthSignInDto,
): Promise<AxiosResponse<AuthSignInResponse>> {
  return api.post("/auth/sign-in", payload);
}
