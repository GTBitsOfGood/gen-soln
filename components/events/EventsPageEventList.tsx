import React from "react";

import { useRouter } from "next/router";

import CardPaginationList from "@core/list";
import config from "config";
import { PaginatedEventCards } from "utils/types";

import EventsPageEventCard from "./EventsPageEventCard";

interface Props {
  paginatedEventCardsData: PaginatedEventCards;
  getMoreEvents?: (newPage: number) => Promise<PaginatedEventCards>;
  shouldWait?: boolean;
  setHasNoEvents?: (hasNoEvents: boolean) => void;
}

const EventsPageEventList: React.FC<Props> = ({
  paginatedEventCardsData,
  getMoreEvents,
  shouldWait = false,
  setHasNoEvents
}) => {
  const router = useRouter();
  return (
    <CardPaginationList
      paginatedCardsData={paginatedEventCardsData}
      fetchCards={getMoreEvents}
      cardGlimmer={<EventsPageEventCard type="glimmer" />}
      renderCard={cardData => (
        <EventsPageEventCard
          type="data"
          eventCardData={cardData}
          onClick={() => {
            void router.push(
              config.pages.event(),
              config.pages.event(cardData._id)
            );
          }}
        />
      )}
      shouldWait={shouldWait}
      setHasNoResults={setHasNoEvents}
    />
  );
};

export default EventsPageEventList;
