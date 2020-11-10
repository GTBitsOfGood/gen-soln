import { ParsedUrlQuery } from "querystring";

export const SORT_OPTIONS = [
  { text: "Closest to you", value: "location" },
  { text: "Most signed up", value: "participants" }
] as const;
export type SortValue = typeof SORT_OPTIONS[number]["value"];
export const DEFAULT_SORT_VALUE = SORT_OPTIONS[1].value;
export const SORT_VALUE_QUERY_KEY = "sortValue";

const isValidSortValue = (str: string): str is SortValue =>
  SORT_OPTIONS.map(_ => _.value).some(value => value === str);

export const getSortValueInQuery = (query: ParsedUrlQuery) => {
  const sortValue = query[SORT_VALUE_QUERY_KEY];

  if (
    Array.isArray(sortValue) ||
    sortValue == null ||
    !isValidSortValue(sortValue)
  ) {
    return undefined;
  }

  return sortValue;
};
