import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import EventsPageEventList from "./EventsPageEventList";
import { getUpcomingEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop: 65,
    paddingLeft: 55,
    backgroundColor: "#FAFAFA"
  },
  title: {
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 24,
    lineHeight: "140%",
    color: "#333333"
  },
  listContainer: {
    paddingTop: 25
  }
});

interface Props {
  upcomingEvents: DatePaginatedEventCards;
}

const EventsPageMainContent: React.FC<Props> = ({ upcomingEvents }) => {
  const { mainContainer, title, listContainer } = useStyles();

  return (
    <div className={mainContainer}>
      <Typography className={title}>Upcoming Volunteer Events</Typography>
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
