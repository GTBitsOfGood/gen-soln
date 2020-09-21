import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import EventsPageLocationFilterAutocompleteInput from "./EventsPageLocationFilterAutocompleteInput";

const useStyles = makeStyles({
  root: {
    padding: "32px 24px",
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  header: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 24,
    lineHeight: "140%",
    color: "#333333"
  },
  subtitle: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "130%",
    color: "#333333"
  },
  subComponent: {
    marginTop: 16
  },
  searchContainer: {
    marginTop: 16
  }
});

const EventsPageLeftRailComponent: React.FC<Record<string, unknown>> = () => {
  const { root, header, subtitle, subComponent, searchContainer } = useStyles();
  return (
    <div className={root}>
      <Typography className={header}>Filters</Typography>
      <div className={subComponent}>
        <Typography className={subtitle}>Location</Typography>
        <div className={searchContainer}>
          <EventsPageLocationFilterAutocompleteInput />
        </div>
      </div>
    </div>
  );
};

export default EventsPageLeftRailComponent;
