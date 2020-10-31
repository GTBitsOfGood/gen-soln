import React from "react";

import { useRouter } from "next/router";

import { CoreCardPaginationList, CoreCardListGlimmer } from "@core/lists";
import config from "config";
import { PaginatedEventCards } from "utils/types";

import EventsPageEventCard, { CARD_WIDTH } from "./EventsPageEventCard";
import EventsPageEventCardGlimmer from "./EventsPageEventCardGlimmer";

interface DataProps {
  paginatedEventCardsData: PaginatedEventCards;
  getMoreEvents: (newPage: number) => Promise<PaginatedEventCards>;
  type: "DATA";
}

interface LoadingProps {
  type: "LOADING";
}

const EventsPageEventList: React.FC<DataProps | LoadingProps> = props => {
  const router = useRouter();

  switch (props.type) {
    case "LOADING":
      return (
        <CoreCardListGlimmer
          cardWidth={CARD_WIDTH}
          cardGlimmer={<EventsPageEventCardGlimmer />}
        />
      );
    case "DATA":
      return (
        <CoreCardPaginationList
          paginatedCardsData={props.paginatedEventCardsData}
          fetchCards={props.getMoreEvents}
          cardWidth={CARD_WIDTH}
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
    default: {
      const _exhaustiveCheck: never = props;
      return _exhaustiveCheck;
    }
  }
};

export default EventsPageEventList;
