import React from "react";
import { makeStyles } from "@material-ui/core";

import EventsPageEventList from "./EventsPageEventList";
import { getUpcomingEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

import CoreTypography from "@core/typography";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "5%"
  },
  listContainer: {
    paddingTop: 24
  }
});

interface Props {
  upcomingEvents: DatePaginatedEventCards;
}

const EventsPageMainContent: React.FC<Props> = ({ upcomingEvents }) => {
  const { mainContainer, listContainer } = useStyles();

  return (
    <div className={mainContainer}>
      <CoreTypography variant="h2">
        {upcomingEvents.eventCards.length > 0
          ? "Upcoming Volunteer Events"
          : ""}
      </CoreTypography>
      <div className={listContainer}>
        <EventsPageEventList
          paginatedEventCardsData={upcomingEvents}
          getMoreEvents={(page: number) =>
            getUpcomingEvents({
              page,
              date: upcomingEvents.date,
              totalCount: upcomingEvents.totalCount,
              isLastPage: upcomingEvents.isLastPage
            })
          }
        />
      </div>
    </div>
  );
};

export default EventsPageMainContent;
