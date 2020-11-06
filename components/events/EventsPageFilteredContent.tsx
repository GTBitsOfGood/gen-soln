import React, { useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core";

import { getFilteredEvents } from "requests/events";
import { FilterPaginatedEventCards } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";
import { OptionValue, INITIAL_SORT } from "./header";
import EventsPageFilteredHeader from "./header/EventsPageFilteredHeader";

const useStyles = makeStyles({
  root: {
    padding: 64
  }
});

interface Props {
  filteredEvents: FilterPaginatedEventCards;
}

const EventsPageFilteredContent: React.FC<Props> = ({ filteredEvents }) => {
  const { root } = useStyles();

  const [sort, setSort] = useState<OptionValue>(INITIAL_SORT);
  const [position, setPosition] = useState<Position>();

  const setSortCallback = useCallback((newSortValue: OptionValue) => {
    setSort(newSortValue);
  }, []);

  const setPositionCallback = useCallback((position: Position) => {
    setPosition(position);
  }, []);

  return (
    <div className={root}>
      <EventsPageFilteredHeader
        resultsLength={filteredEvents.totalCount}
        sort={sort}
        setSort={setSortCallback}
        setPosition={setPositionCallback}
      />
      <EventsPageInfiniteScroll
        filteredEvents={filteredEvents}
        sort={sort}
        position={position}
        getMoreEvents={(page: number) =>
          getFilteredEvents({
            causes: filteredEvents.causes,
            cities: filteredEvents.cities,
            times: filteredEvents.times,
            page,
            lat: filteredEvents.lat,
            long: filteredEvents.long,
            totalCount: filteredEvents.totalCount,
            date: filteredEvents.date
          })
        }
        sortCards={(lat: number, long: number) =>
          getFilteredEvents({
            causes: filteredEvents.causes,
            cities: filteredEvents.cities,
            times: filteredEvents.times,
            page: 0,
            lat,
            long,
            totalCount: filteredEvents.totalCount,
            date: filteredEvents.date
          })
        }
      />
    </div>
  );
};

export default EventsPageFilteredContent;
