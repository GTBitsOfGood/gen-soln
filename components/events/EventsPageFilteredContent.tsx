import React from "react";

import { makeStyles } from "@material-ui/core";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";
import EventsPageFilteredHeader from "./header/EventsPageFilteredHeader";

const useStyles = makeStyles({
  root: {
    padding: 64
  }
});

const EventsPageFilteredContent: React.FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <EventsPageFilteredHeader resultsLength={50} />
      <EventsPageInfiniteScroll />
    </div>
  );
};

export default EventsPageFilteredContent;
