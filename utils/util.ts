import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify as querystringify } from "querystringify";

import errors from "utils/errors";

interface APISuccessResponse<T> {
  success: true;
  payload: T;
}

interface APIFailureResponse {
  success: false;
  message: string;
}

const hasOwnProperties = <S, T extends PropertyKey>(
  obj: S,
  properties: T[]
): obj is S & Record<T, unknown> => {
  return (
    typeof obj === "object" &&
    obj != null &&
    properties.every(prop => prop in obj)
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const handleGetRequestWithPayloadResponse = async <S extends object, T>(
  { method, query }: NextApiRequest,
  res: NextApiResponse,
  serverAction: (input: S) => Promise<T>,
  parameters: (keyof S)[] = [],
  convertQueryToServerActionInput: (
    queryRecord: Record<keyof S, string | string[]>
  ) => S
): Promise<void> => {
  if (method?.toUpperCase() !== "GET")
    throw new Error(
      "Tried using the GET request handler for a non-GET request!"
    );

  try {
    if (!hasOwnProperties(query, parameters)) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in req.query: [${parameters.toString()}]`
      });

      return;
    }

    const input = convertQueryToServerActionInput(query);
    const response: APISuccessResponse<T> = {
      success: true,
      payload: await serverAction(input)
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

// eslint-disable-next-line @typescript-eslint/ban-types
export const handlePostRequestWithPayloadResponse = async <S extends object, T>(
  { method, body }: NextApiRequest,
  res: NextApiResponse,
  serverAction: (input: S) => Promise<T>,
  parameters: (keyof S)[] = []
): Promise<void> => {
  if (method?.toUpperCase() !== "POST")
    throw new Error(
      "Tried using the POST request handler for a non-POST request!"
    );

  try {
    if (!hasOwnProperties(body, parameters)) {
      res.status(400).json({
        success: false,
        message: `One or more of the following properties was missing in req.body: [${parameters.toString()}]`
      });

      return;
    }

    const response: APISuccessResponse<T> = {
      success: true,
      payload: await serverAction(body)
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
  queryParameters: object = {}
): Promise<T> => {
  const isGetRequest = options.method?.toUpperCase() === "GET";

  const fullUrl = isGetRequest
    ? `${url}?${querystringify(queryParameters)}`
    : url;

  const res = await fetch(fullUrl, {
    mode: "same-origin",
    ...options
  });

  const json = (await res.json()) as APISuccessResponse<T> | APIFailureResponse;

  if (!json) throw new Error("Couldn't connect to API.");
  if (!json.success) throw new Error(json.message);

  return json.payload;
};

export const nthDate = (date: number) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
