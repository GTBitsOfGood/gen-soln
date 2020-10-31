import React from "react";

import { CoreCardList } from "@core/lists";
import { filters } from "utils/filters";

import EventsPageCauseCard from "./EventsPageCauseCard";
import useRouterQueryParamsState from "./sidebar/useRouterQueryParamsState";

const CAUSE_CARDS = filters["cause"].map(({ text, value }) => ({
  cause: text,
  imagePath: "/defaultImages/defaultCause.png",
  filterValue: value
}));

const EventsPageCauseList: React.FC = () => {
  const { put } = useRouterQueryParamsState("cause");

  return (
    <CoreCardList
      cardWidth={250}
      cardsData={CAUSE_CARDS}
      renderCard={cardData => (
        <EventsPageCauseCard
          causeCardData={cardData}
          onClick={() => {
            put(cardData.filterValue);
          }}
          isSmall
        />
      )}
    />
  );
};

export default EventsPageCauseList;
