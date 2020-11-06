import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreDivider from "@core/divider";
import CoreTypography from "@core/typography";
import { getUpcomingEvents, getNearestEvents } from "requests/events";
import {
  DatePaginatedEventCards,
  LocationPaginatedEventCards
} from "utils/types";

import EventsPageCauseList from "./EventsPageCauseList";
import EventsPageEventList from "./EventsPageEventList";
import { usePosition } from "./usePosition";

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
  const {
    mainContainer,
    listContainer,
    nearestEventsContainer,
    divider
  } = useStyles();

  const { position, hasError: hasPositionError } = usePosition(false);
  const [hasNoNearestEvents, setHasNoNearestEvents] = useState(false);

  const [nearestEvents] = useState<LocationPaginatedEventCards>({
    lat: 0,
    long: 0,
    page: -1,
    isLastPage: false,
    cards: []
  });

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
      {!hasPositionError && !hasNoNearestEvents && (
        <div className={nearestEventsContainer}>
          <CoreTypography variant="h2">
            Volunteer Events Near You
          </CoreTypography>
          <div className={listContainer}>
            <EventsPageEventList
              paginatedEventCardsData={nearestEvents}
              getMoreEvents={
                position != null
                  ? (page: number) =>
                      getNearestEvents({
                        page,
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        date: upcomingEvents.date
                      })
                  : undefined
              }
              shouldWait={position == null}
              setHasNoEvents={setHasNoNearestEvents}
            />
          </div>
        </div>
      )}
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
