import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import EventsPageLeftRailFilter from "./EventsPageLeftRailFilter";
import EventsPageTimeFilter from "./EventsPageTimeFilter";

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
  }
});

const EventsPageLeftRailComponent: React.FC<Record<string, unknown>> = () => {
  const { root, header } = useStyles();
  return (
    <div className={root}>
      <Typography className={header}>Filters</Typography>
      <EventsPageLeftRailFilter header="Location" content={null} />
      <EventsPageLeftRailFilter
        header="Time"
        content={<EventsPageTimeFilter />}
        collapsible
      />
    </div>
  );
};

export default EventsPageLeftRailComponent;
