import urls from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";

export const login = async (email: string, password: string): Promise<string> =>
  fetchRequestWithPayloadResponse<string>(urls.apis.login, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

export const recoverPassword = async (email: string): Promise<boolean> =>
  fetchRequestWithPayloadResponse<boolean>(urls.apis.recoverPassword, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });
