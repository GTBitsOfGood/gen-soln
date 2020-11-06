import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useRouter } from "next/router";

import { CoreButtonWithLongArrow } from "@core/buttons";
import CoreDivider from "@core/divider";
import CoreTypography from "@core/typography";
import config from "config";
import { formatDateRange } from "utils/date";
import { Event, NonprofitInfoForEventPage } from "utils/types";

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
  nonProfitInfo: NonprofitInfoForEventPage;
}

const EventsPageDescriptionMainContent = ({ event, nonProfitInfo }: Props) => {
  const classes = useStyles();
  const router = useRouter();

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
        About {nonProfitInfo.name}
      </CoreTypography>
      <CoreTypography variant="body1" className={classes.nonProfitParagraph}>
        {nonProfitInfo.about}
      </CoreTypography>
      <div className={classes.buttonRow}>
        <CoreButtonWithLongArrow
          onClick={() => {
            void router.push(
              config.pages.nonprofit(),
              config.pages.nonprofit(nonProfitInfo._id)
            );
          }}
        >
          Learn About This Non-profit
        </CoreButtonWithLongArrow>
      </div>
    </>
  );
};

export default EventsPageDescriptionMainContent;
