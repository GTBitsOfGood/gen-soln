import React from "react";

import { makeStyles } from "@material-ui/core";

import CoreTypography from "@core/typography";

import EventsPageInfiniteScroll from "./EventsPageInfiniteScroll";

const useStyles = makeStyles({
  root: {
    padding: 64
  },
  headerContainer: {
    paddingBottom: 50
  }
});

//TODO: replace results number with template literal
const EventsPageFilteredContent: React.FC = () => {
  const { root, headerContainer } = useStyles();

  return (
    <div className={root}>
      <div className={headerContainer}>
        <CoreTypography variant="h2">50 Results</CoreTypography>
      </div>
      <EventsPageInfiniteScroll />
    </div>
  );
};

export default EventsPageFilteredContent;
