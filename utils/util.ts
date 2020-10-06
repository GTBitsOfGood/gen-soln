import qs from "querystringify";
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
  const isGetRequest = req.method === "GET";
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = isGetRequest ? req.query : req.body;
  try {
    if (bodyHasProperties.some(property => !(property in data))) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in ${
          isGetRequest ? "query params" : "req.body"
        }: [${bodyHasProperties.toString()}]`
      });

      return;
    }

    const response: APISuccessResponse<T> = {
      success: true,
      payload: await callback(data)
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
  url: string,
  options: RequestInit = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: object = {}
): Promise<T> => {
  const isGetRequest = options.method === "GET";

  const fullUrl = isGetRequest ? `${url}&${qs.stringify(body)}` : url;

  const fullOptions: RequestInit = {
    mode: "same-origin",
    ...options,
    body: isGetRequest ? undefined : JSON.stringify(body)
  };

  const res = await fetch(fullUrl, fullOptions);

  const json = (await res.json()) as APISuccessResponse<T> | APIFailureResponse;

  if (!json) throw new Error("Couldn't connect to API.");
  if (!json.success) throw new Error(json.message);

  return json.payload;
};

export const returnQueryAsArray = (query: string | string[] | undefined) => {
  if (query == null) {
    return [];
  }
  if (Array.isArray(query)) {
    return query;
  }
  return [query];
};
