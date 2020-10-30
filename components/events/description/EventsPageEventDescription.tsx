import React from "react";

import { Container, makeStyles } from "@material-ui/core";

import { Event, NonprofitInfoForEventPage } from "utils/types";

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
  nonProfitInfo: NonprofitInfoForEventPage;
}

const EventsPageDescription: React.FC<Props> = ({
  event,
  nonProfitInfo
}: Props) => {
  const classes = useStyles();

  return (
    <Container className={classes.bigBox}>
      <div className={classes.mainContent}>
        <EventsPageDescriptionMainContent
          event={event}
          nonProfitInfo={nonProfitInfo}
        />
      </div>

      <EventsPageDescriptionDetailsBox
        event={event}
        nonProfitInfo={nonProfitInfo}
      />
    </Container>
  );
};

export default EventsPageDescription;
