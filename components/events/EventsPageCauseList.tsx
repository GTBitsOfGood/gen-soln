import React from "react";

import CardPaginationList from "@core/list";
import { PaginatedCauseCards } from "utils/types";

import EventsPageCauseCard from "./EventsPageCauseCard";
import EventsPageCauseCardGlimmer from "./EventsPageCauseCardGlimmer";
import useRouterQueryParamsState from "./sidebar/useRouterQueryParamsState";

interface Props {
  paginatedCauseCardsData: PaginatedCauseCards;
}

const EventsPageCauseList: React.FC<Props> = ({ paginatedCauseCardsData }) => {
  const { put } = useRouterQueryParamsState("cause");

  return (
    <CardPaginationList
      paginatedCardsData={paginatedCauseCardsData}
      cardGlimmer={<EventsPageCauseCardGlimmer />}
      renderCard={cardData => (
        <EventsPageCauseCard
          cause={cardData.cause}
          imagePath={cardData.imagePath}
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
