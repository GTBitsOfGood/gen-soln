import React from "react";

import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

import FullPageLayout from "components/FullPageLayout";
import { Event, NonprofitInfoForEventPage } from "utils/types";

import EventsPageDescriptionDetailsBox from "./EventsPageDescriptionDetailsBox";
import EventsPageDescriptionEventsList from "./EventsPageDescriptionEventsList";
import EventsPageDescriptionMainContent from "./EventsPageDescriptionMainContent";

const useStyles = makeStyles(({ palette, margins }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      backgroundColor: palette.background.paper
    },
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
    },
    eventListSection: {
      width: "100vw",
      maxWidth: "100%",
      backgroundColor: palette.background.default,
      marginTop: 100,
      display: "flex",
      justifyContent: "center"
    },
    eventListContainer: {
      marginTop: margins.VERTICAL,
      marginBottom: margins.VERTICAL
    },
    eventList: {
      marginTop: 32,
      marginBottom: 24
    },
    buttonRow: {
      display: "flex",
      justifyContent: "flex-end"
    }
  })
);

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
    <FullPageLayout className={classes.root}>
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

      <EventsPageDescriptionEventsList
        event={event}
        nonProfitInfo={nonProfitInfo}
      />
    </FullPageLayout>
  );
};

export default EventsPageDescription;
