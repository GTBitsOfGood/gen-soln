import fetch from "isomorphic-unfetch";
import urls from "../config";

export const getOrgNames = async () => {
  return fetch(urls.baseUrl + urls.apis.getOrgNames, {
    method: "get",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
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
