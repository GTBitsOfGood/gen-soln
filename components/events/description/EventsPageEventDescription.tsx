import React from "react";

import { Container, makeStyles } from "@material-ui/core";

import { Event, Nonprofit } from "utils/types";

import EventsPageDescriptionDetailsBox from "./EventsPageDescriptionDetailsBox";
import EventsPageDescriptionMainContent from "./EventsPageDescriptionMainContent";

const useStyles = makeStyles({
  bigBox: {
    display: "flex",
    justifyContent: "center",
    padding: 0
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 64,
    width: "50%",
    marginRight: 150
  }
});

interface Props {
  event: Event;
  nonProfit: Nonprofit; // TODO: Don't get the entire nonprofit object
  // figure out a way to get nonprofit info associated with the nonprofit hosting an event
}

const EventsPageDescription: React.FC<Props> = ({
  event,
  nonProfit
}: Props) => {
  const classes = useStyles();

  return (
    <Container className={classes.bigBox}>
      <div className={classes.mainContent}>
        <EventsPageDescriptionMainContent event={event} nonProfit={nonProfit} />
      </div>

      <EventsPageDescriptionDetailsBox event={event} nonProfit={nonProfit} />
    </Container>
  );
};

export default EventsPageDescription;
