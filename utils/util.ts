import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import errors from "utils/errors";

interface APISuccessResponse<T> {
  success: true;
  payload: T;
}

interface APIFailureResponse {
  success: false;
  message: string;
}

// Use this function on server side to handle incoming API requests:
export const handleRequestWithPayloadResponse = async <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (body: NextApiRequest["body"]) => Promise<T>,
  bodyHasProperties: string[] = []
): Promise<void> => {
  try {
    if (bodyHasProperties.some(property => !(property in req.body))) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in req.body: [${bodyHasProperties.toString()}]`
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
      message: (error instanceof Error && error.message) || errors.GENERIC_TEXT
    };
    res.status(400).json(response);
  }
};

// Use this function on client side to make API requests
export const fetchRequestWithPayloadResponse = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(url, {
    mode: "same-origin",
    ...options
  });

  const json = (await res.json()) as APISuccessResponse<T> | APIFailureResponse;

  if (!json) throw new Error("Couldn't connect to API.");
  if (!json.success) throw new Error(json.message);

  return json.payload;
};
