import React from "react";

import { makeStyles } from "@material-ui/core";

import { FilterPaginatedEventCards } from "utils/types";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";
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

  return (
    <div className={root}>
      <EventsPageFilteredHeader resultsLength={filteredEvents.totalCount} />
      <EventsPageInfiniteScroll filteredEvents={filteredEvents} />
    </div>
  );
};

export default EventsPageFilteredContent;
