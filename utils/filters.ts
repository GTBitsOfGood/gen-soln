import { Dropdown } from "./types";

export const FILTER_TYPES = ["cause", "location", "time"] as const;
const CAUSES = [
  { text: "Arts", value: "ARTS" },
  { text: "Culture and Humanities", value: "CULTURE_AND_HUMANITIES" },
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

export interface Filter<T extends Readonly<Dropdown[]> = Readonly<Dropdown[]>> {
  type: typeof FILTER_TYPES[number];
  options: T;
}
type FilterOption<T extends Filter> = T["options"][number]["value"];

export const causesFilter: Filter<typeof CAUSES> = {
  type: "cause",
  options: CAUSES
};
export type CausesFilterOption = FilterOption<typeof causesFilter>;

export const timesFilter: Filter<typeof TIMES> = {
  type: "time",
  options: TIMES
};
export type TimesFilterOption = FilterOption<typeof timesFilter>;

export const locationsFilter: Filter = {
  type: "location",
  options: []
};
export type LocationsFilterOption = FilterOption<typeof locationsFilter>;
