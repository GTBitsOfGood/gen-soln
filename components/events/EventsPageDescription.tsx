import React from "react";

import { Container, makeStyles } from "@material-ui/core";

import { CoreButtonWithLongArrow, CoreButton } from "@core/buttons";
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

import EventsPageDescriptionImage from "./EventsPageDescriptionImage";

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
  },
  details: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 160,
    width: "15%"
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
  signUp: {
    width: "100px",
    borderRadius: 20,
    marginTop: 15
  },
  divider: {
    margin: "48px 0"
  },
  detail: {
    marginTop: 10
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
});

interface Props {
  event: Event;
  nonProfit: Nonprofit;
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
        <CoreTypography variant="h3">{nonProfit.name}</CoreTypography>
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
          <CoreButtonWithLongArrow>Learn More</CoreButtonWithLongArrow>
        </div>
      </div>

      <div className={classes.details}>
        <CoreTypography variant="h3">Event Details</CoreTypography>
        <div>
          <PersonLayeredIcon></PersonLayeredIcon>
          <ClockIcon></ClockIcon>
          <GlobeIcon></GlobeIcon>
          <HeartIcon></HeartIcon>
          <PaperPlaneIcon></PaperPlaneIcon>
          <SaveFlagIcon></SaveFlagIcon>
        </div>
        <CoreTypography variant="caption" className={classes.detail}>
          {event.volunteers.length}/{event.maxVolunteers} Volunteers
        </CoreTypography>
        <CoreTypography variant="caption" className={classes.detail}>
          {event.startDate} - {event.endDate}
        </CoreTypography>
        <CoreTypography variant="caption" className={classes.detail}>
          {event.address.text}
        </CoreTypography>
        <div style={{ flexDirection: "column", marginTop: 10 }}>
          <CoreTypography variant="caption">Hosted by</CoreTypography>
          <CoreTypography variant="h4">{nonProfit.name}</CoreTypography>
        </div>
        <CoreButton
          /*variant="contained" size="small"*/ className={classes.signUp}
        >
          Sign Up
        </CoreButton>
        <CoreDivider style={{ marginTop: 20, marginBottom: 20 }} />
        <div style={{ flexDirection: "row" }}>
          <CoreButton>Share</CoreButton>
          <CoreButton>Save</CoreButton>
        </div>
      </div>
    </Container>
  );
};

export default EventsPageDescription;
