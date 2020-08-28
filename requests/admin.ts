import config from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const login = async (email: string, password: string): Promise<string> =>
  fetchRequestWithPayloadResponse<string>(config.apis.login, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const checkTokenRequest = async (token: string) =>
  fetchRequestWithPayloadResponse(config.apis.checkToken, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  });
