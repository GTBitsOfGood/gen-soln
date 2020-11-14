import React from "react";

import CoreTypography from "@core/typography";
import { getAllEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";

// const allEventsFirstPage

interface Props {
  allEvents: DatePaginatedEventCards;
}

const EventsPageAllEventsList: React.FC<Props> = ({ allEvents }) => {
  return allEvents.cards.length > 0 ? (
    <>
      <CoreTypography variant="h2">All Events</CoreTypography>
      <div>
        <EventsPageInfiniteScroll
          paginatedEventCardsData={allEvents}
          getMoreEvents={(page: number) =>
            getAllEvents({
              page,
              date: allEvents.date
            })
          }
        />
      </div>
    </>
  ) : null;
};

export default EventsPageAllEventsList;
