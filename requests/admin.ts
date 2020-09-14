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
