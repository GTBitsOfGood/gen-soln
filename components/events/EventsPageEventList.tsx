import React from "react";

import { useRouter } from "next/router";

import config from "config";
import { PaginatedEventCards } from "utils/types";

import EventsPageCardList from "./EventsPageCardList";
import EventsPageEventCard from "./EventsPageEventCard";
import EventsPageEventCardGlimmer from "./EventsPageEventCardGlimmer";

interface Props {
  paginatedEventCardsData: PaginatedEventCards;
  getMoreEvents: (newPage: number) => Promise<PaginatedEventCards>;
}

const EventsPageEventList: React.FC<Props> = ({
  paginatedEventCardsData,
  getMoreEvents
}) => {
  const router = useRouter();
  return (
    <EventsPageCardList
      paginatedCardsData={paginatedEventCardsData}
      fetchCards={getMoreEvents}
      renderCard={cardData =>
        cardData == null ? (
          <EventsPageEventCardGlimmer />
        ) : (
          <EventsPageEventCard
            eventCardData={cardData}
            onClick={() => {
              void router.push(
                config.pages.event(),
                config.pages.event(cardData._id)
              );
            }}
          />
        )
      }
    />
  );
};

export default EventsPageEventList;
