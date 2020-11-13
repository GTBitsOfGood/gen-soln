import React, { useState, useCallback, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { getFilteredEvents } from "requests/events";
import { FilterPaginatedEventCards, FilterPageRequest } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";
import EventsPageFilteredHeader from "./header/EventsPageFilteredHeader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "5%"
  }
});

interface Props {
  filteredEventsFirstPageData: FilterPaginatedEventCards;
  filteredEventstotalCount: number;
}

const EventsPageFilteredContent: React.FC<Props> = ({
  filteredEventsFirstPageData,
  filteredEventstotalCount
}) => {
  const { root } = useStyles();

  const [position, setPosition] = useState<Position>();

  const setPositionCallback = useCallback((position: Position) => {
    setPosition(position);
  }, []);

  const [
    locationSortedFilteredEvents,
    setLocationSortedFilteredEvents
  ] = useState<FilterPaginatedEventCards>(); // will be exactly the same as filteredEventsFirstPageData, except it will contain accurate coordinates and card data sorted by location.

  const {
    causes,
    cities,
    times,
    date,
    sortValue
  } = filteredEventsFirstPageData;
  const callGetFilteredEvents = useCallback(
    async ({
      page,
      lat,
      long
    }: Pick<FilterPageRequest, "page" | "lat" | "long">) =>
      getFilteredEvents({
        page,
        lat,
        long,
        causes,
        cities,
        times,
        date,
        sortValue
      }),
    [causes, cities, date, sortValue, times]
  );

  useEffect(() => {
    const fetchLocationSortedFilteredEvents = async () => {
      if (position && sortValue === "location") {
        const result = await callGetFilteredEvents({
          page: 0,
          lat: position.coords.latitude,
          long: position.coords.longitude
        });

        setLocationSortedFilteredEvents(result);
      }
    };

    void fetchLocationSortedFilteredEvents();
  }, [callGetFilteredEvents, position, sortValue]);

  let paginatedEventCardsData, getMoreEvents;

  switch (sortValue) {
    case "participants":
      paginatedEventCardsData = filteredEventsFirstPageData;
      getMoreEvents = (newPage: number) =>
        callGetFilteredEvents({
          page: newPage,
          lat: filteredEventsFirstPageData.lat,
          long: filteredEventsFirstPageData.long
        });

      break;
    case "location":
      if (locationSortedFilteredEvents == null) {
        paginatedEventCardsData = filteredEventsFirstPageData; // will have empty cards, see pages/events/index.tsx
      } else {
        paginatedEventCardsData = locationSortedFilteredEvents;
        getMoreEvents = (newPage: number) =>
          callGetFilteredEvents({
            page: newPage,
            lat: locationSortedFilteredEvents.lat,
            long: locationSortedFilteredEvents.long
          });
      }
      break;
    default: {
      const _exhaustiveCheck: never = sortValue;
      return _exhaustiveCheck;
    }
  }

  return (
    <div className={root}>
      <EventsPageFilteredHeader
        resultsLength={filteredEventstotalCount}
        setPosition={setPositionCallback}
      />
      <EventsPageInfiniteScroll
        paginatedEventCardsData={paginatedEventCardsData}
        getMoreEvents={getMoreEvents}
        // Need this to forcibly update EventsPageInfiniteScroll since it relies on props to set initial state values. We could have also done this via a useEffect inside the component.
        // Since card data comes from the server as JSON, it is JSON serializable.
        key={`${sortValue}_${JSON.stringify(paginatedEventCardsData.cards)}`}
      />
    </div>
  );
};

export default EventsPageFilteredContent;
