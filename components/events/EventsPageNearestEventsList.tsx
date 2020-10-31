import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import { getNearestEvents } from "requests/events";
import { LocationPaginatedEventCards } from "utils/types";

import EventsPageEventList from "./EventsPageEventList";
import { usePosition } from "./usePosition";

const useStyles = makeStyles({
  listContainer: {
    paddingTop: 24
  },
  nearestEventsContainer: {
    marginTop: 60
  }
});

const EventsPageNearestEventsListContainer: React.FC = ({ children }) => {
  const { listContainer, nearestEventsContainer } = useStyles();
  return (
    <div className={nearestEventsContainer}>
      <CoreTypography variant="h2">Volunteer Events Near You</CoreTypography>
      <div className={listContainer}>{children}</div>
    </div>
  );
};

interface Props {
  date: string;
}

const EventsPageNearestEventsList: React.FC<Props> = ({ date }) => {
  const { position, hasError: hasPositionError } = usePosition(false);

  const [nearestEvents, setNearestEvents] = useState<
    LocationPaginatedEventCards
  >();

  useEffect(() => {
    const fetchNearestEvents = async () => {
      if (position) {
        const result = await getNearestEvents({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          page: 0,
          date
        });

        setNearestEvents(result);
      }
    };

    void fetchNearestEvents();
  }, [date, position]);

  if (hasPositionError) {
    return null;
  }
  if (nearestEvents == null) {
    return (
      <EventsPageNearestEventsListContainer>
        <EventsPageEventList type="LOADING" />
      </EventsPageNearestEventsListContainer>
    );
  }
  if (nearestEvents.cards.length === 0) {
    return null;
  }

  return (
    <EventsPageNearestEventsListContainer>
      <EventsPageEventList
        paginatedEventCardsData={nearestEvents}
        getMoreEvents={(page: number) =>
          getNearestEvents({
            page,
            date,
            lat: nearestEvents.lat,
            long: nearestEvents.long
          })
        }
        type="DATA"
      />
    </EventsPageNearestEventsListContainer>
  );
};

export default EventsPageNearestEventsList;
