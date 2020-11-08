import React, { useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core";

import { getFilteredEvents } from "requests/events";
import { SortValue, DEFAULT_SORT_VALUE } from "utils/sortOptions";
import { FilterPaginatedEventCards } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";
import EventsPageFilteredHeader from "./header/EventsPageFilteredHeader";

const useStyles = makeStyles({
  root: {
    padding: 64
  }
});

interface Props {
  filteredEventsFirstPageData?: FilterPaginatedEventCards;
  filteredEventstotalCount: number;
}

const EventsPageFilteredContent: React.FC<Props> = ({
  filteredEventsFirstPageData,
  filteredEventstotalCount
}) => {
  const { root } = useStyles();

  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT_VALUE);
  const [position, setPosition] = useState<Position>();

  const setPositionCallback = useCallback((position: Position) => {
    setPosition(position);
  }, []);

  if (filteredEventsFirstPageData == null) {
    return null;
  }
  const { causes, cities, times, date } = filteredEventsFirstPageData;

  return (
    <div className={root}>
      <EventsPageFilteredHeader
        resultsLength={filteredEventstotalCount}
        setPosition={setPositionCallback}
      />
      <EventsPageInfiniteScroll
        filteredEvents={filteredEventsFirstPageData}
        sort={sort}
        position={position}
        getMoreEvents={(page: number) =>
          getFilteredEvents({
            causes,
            cities,
            times,
            page,
            date,
            lat: filteredEventsFirstPageData.lat,
            long: filteredEventsFirstPageData.long,
            sortValue: filteredEventsFirstPageData.sortValue
          })
        }
        sortCards={(lat: number, long: number) =>
          getFilteredEvents({
            causes,
            cities,
            times,
            page: 0,
            date,
            lat,
            long,
            sortValue: lat === -999 ? "participants" : "location"
          })
        }
      />
    </div>
  );
};

export default EventsPageFilteredContent;
