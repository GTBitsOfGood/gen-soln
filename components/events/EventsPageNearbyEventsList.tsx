import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import { getNearestEvents } from "requests/events";
import { LocationPaginatedEventCards } from "utils/types";

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
  date: string;
}

const EventsPageNearbyEvents: React.FC<Props> = ({ date }) => {
  const { mainContainer, listContainer, nearestEventsContainer } = useStyles();
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
                        date: date
                      })
                  : undefined
              }
              shouldWait={position == null}
              setHasNoEvents={setHasNoNearestEvents}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPageNearbyEvents;
