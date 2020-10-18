import React from "react";

import { makeStyles } from "@material-ui/core";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";

const useStyles = makeStyles({
  root: {
    padding: 64
  },
  scrollContainer: {}
});

const EventsPageFilteredContent: React.FC = () => {
  const { root } = useStyles();
  return (
    <div className={root}>
      <EventsPageInfiniteScroll />
    </div>
  );
};

export default EventsPageFilteredContent;
