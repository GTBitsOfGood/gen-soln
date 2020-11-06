export const SORT_OPTIONS = [
  { text: "Closest to you", value: "location" },
  { text: "Most signed up", value: "participants" }
] as const;
export type OptionValue = typeof SORT_OPTIONS[number]["value"];
export const INITIAL_SORT = SORT_OPTIONS[1].value;
