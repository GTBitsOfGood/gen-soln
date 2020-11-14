import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useRouter } from "next/router";

import { CoreButtonWithLongArrow } from "@core/buttons";
import CoreTypography from "@core/typography";
import config from "config";
import { Event, NonprofitInfoForEventPage } from "utils/types";

import EventsPageOtherEventsList from "./EventsPageOtherEventsList";

const useStyles = makeStyles(({ palette, margins }: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      maxWidth: "100%",
      backgroundColor: palette.background.default,
      marginTop: 100,
      display: "flex",
      justifyContent: "center"
    },
    container: {
      marginTop: margins.VERTICAL,
      marginBottom: margins.VERTICAL
    },
    list: {
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

const EventsPageDescriptionEventsList: React.FC<Props> = ({
  event,
  nonProfitInfo
}: Props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CoreTypography variant="h2">Volunteer Events Near You</CoreTypography>
        <div className={classes.list}>
          <EventsPageOtherEventsList
            date={event.startDate}
            nonprofitId={nonProfitInfo._id}
          />
        </div>
        <div className={classes.buttonRow}>
          <CoreButtonWithLongArrow
            onClick={() => {
              void router.push(config.pages.events, config.pages.events);
            }}
          >
            Learn About This Non-profit
          </CoreButtonWithLongArrow>
        </div>
      </div>
    </div>
  );
};

export default EventsPageDescriptionEventsList;
