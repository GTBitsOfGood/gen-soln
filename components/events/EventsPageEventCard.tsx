import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { formatDateRange } from "utils/date";
import { EventCardData } from "utils/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    card: {
      width: 248,
      height: 267,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: palette.background.paper,
      /* 1px borders don't play nice on Chrome, so we use an equivalent
       * box-shadow and wrap the div in another div */
      boxShadow: `0 0 0 1px ${palette.object.lightOutline}`
    },
    cardContainer: {
      width: 250,
      height: 269,
      padding: 1,
      "&:focusVisible": {
        outline: "none"
      }
    },
    image: {
      display: "block",
      height: 128,
      width: "inherit",
      objectFit: "cover"
    },
    content: {
      padding: "16px 24px"
    },
    header: {
      marginBottom: 6,
      /* line-clamp isn't supported yet, so the next four rules handle it for us */
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 2,
      overflow: "hidden"
    },
    body: {
      marginBottom: 6
    },
    meta: {
      color: palette.primary.main,
      marginBottom: 6
    },
    /* Only works for truncating a single line */
    truncate: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    }
  })
);

type Props =
  | {
      eventCardData: EventCardData;
      onClick: () => void;
      type: "data";
    }
  | { type: "glimmer" };

const EventsPageEventCard: React.FC<Props> = props => {
  const classes = useStyles();

  let image, date, name, body;

  switch (props.type) {
    case "data": {
      const { eventCardData } = props;
      image = (
        <img
          src={eventCardData.image}
          className={classes.image}
          alt={`${eventCardData.name}`}
        />
      );
      date = formatDateRange(eventCardData.startDate, eventCardData.endDate);
      name = eventCardData.name;
      body = eventCardData.address.text.main;
      break;
    }
    case "glimmer": {
      image = (
        <Skeleton animation="wave" className={classes.image} variant="rect" />
      );

      date = <Skeleton />;
      name = <Skeleton />;
      body = <Skeleton />;
      break;
    }
    default: {
      const _exhaustiveCheck: never = props;
      return _exhaustiveCheck;
    }
  }

  const card = (
    <div className={classes.cardContainer}>
      <div className={classes.card}>
        {image}
        <div className={classes.content}>
          <CoreTypography
            variant="h4"
            className={clsx(classes.meta, classes.truncate)}
          >
            {date}
          </CoreTypography>
          <CoreTypography variant="h4" className={classes.header}>
            {name}
          </CoreTypography>
          <CoreTypography className={clsx(classes.body, classes.truncate)}>
            {body}
          </CoreTypography>
        </div>
      </div>
    </div>
  );

  return props.type === "glimmer" ? (
    card
  ) : (
    <FocusVisibleOnly onClick={props.onClick}>{card}</FocusVisibleOnly>
  );
};

export default EventsPageEventCard;
