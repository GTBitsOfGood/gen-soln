import fetch from "isomorphic-unfetch";
import urls from "config";

export const getNonprofitNames = async () => {
  return fetch(urls.apis.getNonprofitNames, {
    method: "get",
    mode: "same-origin"
  })
    .then(res => res.json())
    .then(json => {
      if (!json) throw new Error("Couldn't connect to API.");
      if (!json.success) throw new Error(json.message);
      return json.payload;
    });
};
