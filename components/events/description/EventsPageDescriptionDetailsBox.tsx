import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core";

import { CoreButton } from "@core/buttons";
import CoreDivider from "@core/divider";
import {
  PersonLayeredIcon,
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  PaperPlaneIcon,
  SaveFlagIcon
} from "@core/icons";
import CoreTypography from "@core/typography";
import { formatDateRange } from "utils/date";
import { Event, Nonprofit } from "utils/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "30px 1fr",
      alignItems: "start",
      rowGap: "10px",
      columnGap: "10px",
      marginTop: "15px"
    },
    shareSave: {
      color: palette.text.primary
    },
    signUp: {
      width: "100px",
      borderRadius: 20,
      marginTop: 24
    },
    details: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 160,
      width: "210px"
    },
    divider: {
      marginTop: 36,
      marginBottom: 36
    },
    volunteers: {
      display: "inline"
    }
  })
);

interface Props {
  event: Event;
  nonProfit: Nonprofit;
}

const EventsPageDescriptionDetailsBox: React.FC<Props> = ({
  event,
  nonProfit
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.details}>
      <CoreTypography variant="h3">Event Details</CoreTypography>
      <div className={classes.infoGrid}>
        <PersonLayeredIcon />
        <CoreTypography variant="h4">
          {event.volunteers.length}/{event.maxVolunteers}{" "}
          <CoreTypography variant="h5" className={classes.volunteers}>
            Volunteers
          </CoreTypography>
        </CoreTypography>

        <ClockIcon />
        <CoreTypography variant="h5">
          {formatDateRange(event.startDate, event.endDate)}
        </CoreTypography>
        <GlobeIcon />
        <CoreTypography variant="h5">{event.address.text.main}</CoreTypography>
        <HeartIcon />
        <div style={{ flexDirection: "column" }}>
          <CoreTypography variant="h5">Hosted by</CoreTypography>
          <CoreTypography variant="h4">{nonProfit.name}</CoreTypography>
        </div>
      </div>
      <CoreButton className={classes.signUp} variant="contained">
        Sign Up
      </CoreButton>
      <CoreDivider className={classes.divider} />
      <div style={{ flexDirection: "row" }}>
        <CoreButton className={classes.shareSave}>
          <PaperPlaneIcon style={{ marginRight: "5" }} />
          Share
        </CoreButton>
        <CoreButton className={classes.shareSave}>
          <SaveFlagIcon style={{ marginRight: "5" }} />
          Save
        </CoreButton>
      </div>
    </div>
  );
};

export default EventsPageDescriptionDetailsBox;
