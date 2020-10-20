import React from "react";

import { Container, makeStyles, createStyles, Theme } from "@material-ui/core";

import { CoreButtonWithLongArrow } from "@core/buttons";
import CoreDivider from "@core/divider";
import CoreTypography from "@core/typography";
import { formatDateRange } from "utils/date";
import { Event, Nonprofit } from "utils/types";

import EventsPageDescriptionDetailsBox from "./EventsPageDescriptionDetailsBox";
import EventsPageDescriptionImage from "./EventsPageDescriptionImage";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
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
    image: {
      marginBottom: 24
    },
    date: {
      marginBottom: 8
    },
    name: {
      marginBottom: 8
    },
    divider: {
      margin: "48px 0"
    },
    aboutHeader: {
      marginBottom: 12
    },
    eventParagraph: {
      marginBottom: 42
    },
    nonProfitParagraph: {
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
        <div className={classes.image}>
          <EventsPageDescriptionImage event={event} />
        </div>
        <CoreTypography variant="h2" color="primary" className={classes.date}>
          {formatDateRange(event.startDate, event.endDate)}
        </CoreTypography>
        <CoreTypography variant="h1" className={classes.name}>
          {event.name}
        </CoreTypography>
        <CoreTypography variant="h3">{event.address.text.main}</CoreTypography>
        <CoreDivider className={classes.divider} />
        <CoreTypography variant="h3" className={classes.aboutHeader}>
          About the Event
        </CoreTypography>
        <CoreTypography variant="body1" className={classes.eventParagraph}>
          {event.about}
        </CoreTypography>
        <CoreTypography variant="h3" className={classes.aboutHeader}>
          About {nonProfit.name}
        </CoreTypography>
        <CoreTypography variant="body1" className={classes.nonProfitParagraph}>
          {nonProfit.about}
        </CoreTypography>
        <div className={classes.buttonRow}>
          <CoreButtonWithLongArrow>
            Learn About This Non-profit
          </CoreButtonWithLongArrow>
        </div>
      </div>

      <EventsPageDescriptionDetailsBox event={event} nonProfit={nonProfit} />
    </Container>
  );
};

export default EventsPageDescription;
