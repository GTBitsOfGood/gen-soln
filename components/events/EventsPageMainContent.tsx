import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import { getUpcomingEvents, getNearestEvents } from "requests/events";
import { CAUSE_CARDS } from "utils/causes";
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
  }
});

interface Props {
  upcomingEvents: DatePaginatedEventCards;
}

const EventsPageMainContent: React.FC<Props> = ({ upcomingEvents }) => {
  const { mainContainer, listContainer, nearestEventsContainer } = useStyles();

  const { position, error } = usePosition();

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
          totalCount: -1,
          isLastPage: false
        });

        setNearestEvents(result);
      }
    };

    void fetchNearestEvents();
  }, [position, error]);

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
                  date: upcomingEvents.date,
                  totalCount: upcomingEvents.totalCount,
                  isLastPage: upcomingEvents.isLastPage
                })
              }
            />
          </div>
        </>
      )}
      {nearestEvents && nearestEvents.cards.length > 0 && (
        <>
          <div className={nearestEventsContainer}>
            <CoreTypography variant="h2">
              Volunteer Events Near You
            </CoreTypography>
            <div className={listContainer}>
              <EventsPageEventList
                paginatedEventCardsData={nearestEvents}
                getMoreEvents={(page: number) =>
                  getNearestEvents({
                    page,
                    lat: nearestEvents.lat,
                    long: nearestEvents.long,
                    totalCount: nearestEvents.totalCount,
                    isLastPage: nearestEvents.isLastPage
                  })
                }
              />
            </div>
          </div>
        </>
      )}
      <div className={nearestEventsContainer}>
        <CoreTypography variant="h2">Volunteer For a Cause</CoreTypography>
        <div className={listContainer}>
          <EventsPageCauseList paginatedCauseCardsData={CAUSE_CARDS} />
        </div>
      </div>
    </div>
  );
};

export default EventsPageMainContent;
