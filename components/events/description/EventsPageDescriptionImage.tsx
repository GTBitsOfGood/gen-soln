import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core";

import CoreTypography from "@core/typography";
import { Event } from "utils/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: {
      // objectFit: "contain",
      height: 250,
      width: "fit-content",
      borderRadius: 10,
      overflow: "hidden",
      position: "relative"
    },
    image: {
      height: 250,
      width: 550,
      objectFit: "cover",
      objectPosition: "10% 90%",
      position: "relative"
    },
    dateBox: {
      position: "absolute",
      bottom: 0,
      height: 56,
      width: 56,
      paddingTop: 2,
      borderRadius: "0px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText
    },
    day: {
      marginBottom: -4
    }
  })
);

interface Props {
  event: Event;
}

const EventsPageDescriptionImage: React.FC<Props> = ({ event }: Props) => {
  const classes = useStyles();

  const { image, startDate } = event;

  const start = new Date(startDate);
  const day = start.toLocaleString("en-US", { day: "numeric" });
  const month = start.toLocaleString("en-US", { month: "short" });

  return (
    <div className={classes.root}>
      <img src={image} alt="event" className={classes.image} />
      <div className={classes.dateBox}>
        <CoreTypography variant="h2" className={classes.day}>
          {day}
        </CoreTypography>
        <CoreTypography variant="overline">{month}</CoreTypography>
      </div>
    </div>
  );
};

export default EventsPageDescriptionImage;
