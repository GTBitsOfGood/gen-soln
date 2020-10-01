import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageLeftRailComponent from "./EventsPageLeftRailComponent";
import EventsList from "./EventsList";

import { Dropdown } from "utils/types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: 64,
    width: "100%"
  }
});

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
}

const EventsPage: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <EventsPageLayout
      sidebarComponent={
        <EventsPageLeftRailComponent
          timeFilterOptions={props.timeFilterOptions}
          causesFilterOptions={props.causesFilterOptions}
        />
      }
    >
      <div className={classes.container}>
        <EventsList />
      </div>
    </EventsPageLayout>
  );
};

export default EventsPage;
