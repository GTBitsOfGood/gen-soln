import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { APISuccessResponse, APIFailureResponse } from "./types";

export const pathWithDonate = (path = "[id]") => `/donate/${path}`;

// Use this function on server side to handle incoming API requests:
export const handleRequestWithPayloadResponse = async <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (body: NextApiRequest["body"]) => Promise<T>,
  bodyHasProperties: string[] = []
) => {
  try {
    if (bodyHasProperties.some(property => !(property in req.body))) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in req.body: [${bodyHasProperties}]`
      });

      return;
    }

    const response: APISuccessResponse<T> = {
      success: true,
      payload: await callback(req.body)
    };
    res.status(200).json(response);
  } catch (error) {
    const response: APIFailureResponse = {
      success: false,
      message: error.message
    };
    res.status(400).json(response);
  }
};

// Use this function on client side to make API requests
export const fetchRequestWithPayloadResponse = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
) => {
  const res = await fetch(url, {
    mode: "same-origin",
    ...options
  });

  const json = (await res.json()) as APISuccessResponse<T> | APIFailureResponse;

  if (!json) throw new Error("Couldn't connect to API.");
  if (!json.success) throw new Error(json.message);

  return json.payload;
};
