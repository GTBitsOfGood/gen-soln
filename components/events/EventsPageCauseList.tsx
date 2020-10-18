import React from "react";

import CardPaginationList from "@core/list";
import { filters } from "utils/filters";
import { PaginatedCauseCards } from "utils/types";

import EventsPageCauseCard from "./EventsPageCauseCard";
import EventsPageCauseCardGlimmer from "./EventsPageCauseCardGlimmer";
import useRouterQueryParamsState from "./sidebar/useRouterQueryParamsState";

const CAUSE_CARDS: PaginatedCauseCards = {
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

const EventsPageCauseList: React.FC = () => {
  const { put } = useRouterQueryParamsState("cause");

  return (
    <CardPaginationList
      paginatedCardsData={CAUSE_CARDS}
      cardGlimmer={<EventsPageCauseCardGlimmer />}
      renderCard={cardData => (
        <EventsPageCauseCard
          causeCardData={cardData}
          onClick={() => {
            put(cardData.filterValue);
          }}
        />
      )}
      cardWidth={358}
    />
  );
};

export default EventsPageCauseList;
