import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import { stringify as querystringify } from "query-string";

import errors from "utils/errors";

interface APISuccessResponse<T> {
  success: true;
  payload: T;
}

interface APIFailureResponse {
  success: false;
  message: string;
}

type QueryParameterValues = string | number | boolean | string[] | null; // feel free to add more types as required, just make sure you know how querystringify handles them.
type Interface<T> = { [key in keyof T]: QueryParameterValues };

export const convertToStringArr = (
  input: undefined | null | string | string[],
  ignoreEmptyString = false
): string[] => {
  if (Array.isArray(input)) {
    return input;
  }

  if (input == null || (ignoreEmptyString && input === "")) {
    return [];
  }

  return [input];
};

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

export const handleGetRequestWithPayloadResponse = async <
  S extends Interface<S>,
  T
>(
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

export const handlePostRequestWithPayloadResponse = async <
  S extends Interface<S>,
  T
>(
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
export const fetchRequestWithPayloadResponse = async <
  T,
  S extends Interface<S> = undefined
>(
  url: string,
  options: RequestInit = {},
  queryParameters?: S
): Promise<T> => {
  const isGetRequest = options.method?.toUpperCase() === "GET";

  let fullUrl;
  if (isGetRequest && queryParameters != null) {
    for (const key in queryParameters) {
      const val = queryParameters[key];
      if (Array.isArray(val) && val.length === 0) {
        // @ts-ignore: We could create another object to deal with this type error but that seems unnecessary
        queryParameters[key] = ""; // querystringify will ignore empty arrays, but our API endpoint methods expect all query params to be present in the incoming request. So we replace empty arrays with empty strings since querystringify doesn't ignore them.
      }
    }
    fullUrl = `${url}?${querystringify(queryParameters)}`;
  } else {
    fullUrl = url;
  }

  const res = await fetch(fullUrl, {
    mode: "same-origin",
    ...options
  });

  const json = (await res.json()) as APISuccessResponse<T> | APIFailureResponse;

  if (!json) throw new Error("Couldn't connect to API.");
  if (!json.success) throw new Error(json.message);

  return json.payload;
};
