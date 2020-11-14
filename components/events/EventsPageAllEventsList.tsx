import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import { getAllEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";

const useStyles = makeStyles({
  listContainer: {
    paddingTop: 24
  }
});

interface Props {
  allEvents: DatePaginatedEventCards;
}

const EventsPageAllEventsList: React.FC<Props> = ({ allEvents }) => {
  const { listContainer } = useStyles();

  return allEvents.cards.length > 0 ? (
    <>
      <CoreTypography variant="h2">All Events</CoreTypography>
      <div className={listContainer}>
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
