import { filters } from "./filters";
import { PaginatedCauseCards } from "./types";

export const CAUSE_CARDS: PaginatedCauseCards = {
  cards: filters["cause"].map(({ text, value }) => {
    return {
      cause: text,
      imagePath: "/defaultImages/defaultCause.png",
      filterValue: value
    };
  }),
  page: 0,
  totalCount: filters["cause"].length,
  isLastPage: true
};
