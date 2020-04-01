import fetch from "isomorphic-unfetch";
import urls from "../../config";

export const login = async (email, password) => {
  return fetch(urls.baseUrl + urls.apis.login, {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(json => {
      if (!json) {
        throw new Error("Couldn't connect to API.");
      } else if (!json.success) {
        throw new Error(json.message);
      } else {
        return json.payload;
      }
    });
};
