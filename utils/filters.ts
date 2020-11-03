import { ParsedUrlQuery } from "querystring";

import { Dropdown } from "./types";

const CAUSES = [
  {
    text: "Arts, Culture, and Humanities",
    value: "ARTS_CULTURE_AND_HUMANITIES"
  },
  { text: "Education and Research", value: "EDUCATION_AND_RESEARCH" },
  { text: "Environment and Animals", value: "ENVIRONMENT_AND_ANIMALS" },
  { text: "Health", value: "HEALTH" },
  { text: "Human Services", value: "HUMAN_SERVICES" },
  { text: "International", value: "INTERNATIONAL" },
  { text: "Public, Societal", value: "PUBLIC_SOCIETAL" },
  { text: "Religion", value: "RELIGION" },
  { text: "Other", value: "OTHER" }
] as const;
const TIMES = [
  { text: "Today", value: "TODAY" },
  { text: "Tomorrow", value: "TOMORROW" },
  { text: "This Week", value: "WEEK" },
  { text: "This Weekend", value: "WEEKEND" },
  { text: "Next Week", value: "NWEEK" },
  { text: "Next Weekend", value: "NWEEKEND" }
] as const;

export const filters = {
  cause: CAUSES,
  time: TIMES,
  location: [] as Dropdown[] // Just to help TS; not actually going to put values here
} as const;

export type FilterType = keyof typeof filters;
export type FilterOptions<T extends FilterType> = typeof filters[T];
export type FilterValue<T extends FilterType> = FilterOptions<
  T
>[number]["value"];

export const getFilterValuesInQuery = <T extends FilterType>(
  query: ParsedUrlQuery,
  type: T
) => {
  const queryValues = query[type];

  if (queryValues == null) {
    return [];
  }
  if (Array.isArray(queryValues)) {
    return queryValues as Array<FilterValue<T>>;
  }
  return [queryValues] as Array<FilterValue<T>>;
};

export const getFilterCountFromQuery = (query: ParsedUrlQuery) =>
  Object.keys(filters).reduce(
    (sum, filter) =>
      sum + getFilterValuesInQuery(query, filter as FilterType).length,
    0
  );
