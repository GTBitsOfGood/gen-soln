import React from "react";

import { useRouter } from "next/router";

import CardPaginationList from "@core/list";
import config from "config";
import { PaginatedEventCards } from "utils/types";

import EventsPageEventCard from "./EventsPageEventCard";
import EventsPageEventCardGlimmer from "./EventsPageEventCardGlimmer";

interface Props {
  paginatedEventCardsData?: PaginatedEventCards;
  getMoreEvents?: (newPage: number) => Promise<PaginatedEventCards>;
}

const EventsPageEventList: React.FC<Props> = ({
  paginatedEventCardsData,
  getMoreEvents
}) => {
  const router = useRouter();
  return (
    <CardPaginationList
      paginatedCardsData={paginatedEventCardsData}
      fetchCards={getMoreEvents}
      cardGlimmer={<EventsPageEventCardGlimmer />}
      renderCard={cardData => (
        <EventsPageEventCard
          eventCardData={cardData}
          onClick={() => {
            void router.push(
              config.pages.event(),
              config.pages.event(cardData._id)
            );
          }}
        />
      )}
    />
  );
};

export default EventsPageEventList;
