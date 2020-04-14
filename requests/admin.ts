import urls from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const login = async (email: string, password: string) =>
  fetchRequestWithPayloadResponse<string>(urls.apis.login, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

export const checkTokenRequest = async (token: string) =>
  fetchRequestWithPayloadResponse(urls.apis.checkToken, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  });
