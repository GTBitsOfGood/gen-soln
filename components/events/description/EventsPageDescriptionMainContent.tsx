import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core";

import { CoreButtonWithLongArrow } from "@core/buttons";
import CoreDivider from "@core/divider";
import CoreTypography from "@core/typography";
import { formatDateRange } from "utils/date";
import { Nonprofit, Event } from "utils/types";

import EventsPageDescriptionImage from "./EventsPageDescriptionImage";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    image: {
      marginBottom: 24
    },
    date: {
      marginBottom: 8,
      color: palette.primary.main
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
  nonProfit: Nonprofit;
}

const EventsPageDescriptionMainContent = ({ event, nonProfit }: Props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.image}>
        <EventsPageDescriptionImage event={event} />
      </div>
      <CoreTypography variant="h2" className={classes.date}>
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
    </>
  );
};

export default EventsPageDescriptionMainContent;
