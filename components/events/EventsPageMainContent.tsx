import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreDivider from "@core/divider";
import CoreTypography from "@core/typography";
import { getUpcomingEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

import EventsPageCauseList from "./EventsPageCauseList";
import EventsPageEventList from "./EventsPageEventList";
import EventsPageNearbyEventsList from "./EventsPageNearbyEventsList";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "5%"
  },
  listContainer: {
    paddingTop: 24
  },
  nearestEventsContainer: {
    marginTop: 60
  },
  divider: {
    marginTop: 72,
    marginBottom: 72
  }
});

interface Props {
  upcomingEvents: DatePaginatedEventCards;
}

const EventsPageMainContent: React.FC<Props> = ({ upcomingEvents }) => {
  const { mainContainer, listContainer, divider } = useStyles();

  return (
    <div className={mainContainer}>
      {upcomingEvents.cards.length > 0 && (
        <>
          <CoreTypography variant="h2">
            Upcoming Volunteer Events
          </CoreTypography>
          <div className={listContainer}>
            <EventsPageEventList
              paginatedEventCardsData={upcomingEvents}
              getMoreEvents={(page: number) =>
                getUpcomingEvents({
                  page,
                  date: upcomingEvents.date
                })
              }
            />
          </div>
        </>
      )}
      <EventsPageNearbyEventsList
        date={upcomingEvents.date}
      ></EventsPageNearbyEventsList>
      <CoreDivider className={divider} />
      <CoreTypography variant="h2">Volunteer For a Cause</CoreTypography>
      <div className={listContainer}>
        <EventsPageCauseList />
      </div>
      <CoreDivider className={divider} />
    </div>
  );
};

export default EventsPageMainContent;
