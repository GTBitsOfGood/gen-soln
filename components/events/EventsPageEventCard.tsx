import React, { useMemo } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { EventCardData } from "utils/types";
import { nthDate } from "utils/util";

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

interface Props {
  // see EventCardData under util/types
  eventCardData: EventCardData;
  onClick: () => void;
}

const EventsPageEventCard: React.FC<Props> = ({ eventCardData, onClick }) => {
  const {
    card,
    cardContainer,
    content,
    image,
    meta,
    body,
    header,
    truncate
  } = useStyles();

  const formatDate = useMemo(() => {
    const start = new Date(eventCardData.startDate);
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    const startMonth = start.toLocaleString("en-US", { month: "short" });
    const startDate = start.getDate();
    const startDateString = `${startDate.toString()}${nthDate(startDate)}`;
    const startTime = start.toLocaleString("en-US", timeOptions);
    const startFormatted = `${startMonth} ${startDateString}, ${startTime}`;

    const end = new Date(eventCardData.endDate);
    const endTime = end.toLocaleString("en-US", timeOptions);
    let endFormatted = endTime;

    if (end.getDate() !== startDate) {
      const endMonth = end.toLocaleString("en-US", { month: "short" });
      const endDate = end.getDate();
      const endDateString = `${endDate.toString()}${nthDate(endDate)}`;
      endFormatted = `${endMonth} ${endDateString}, ${endTime}`;
    }
    return `${startFormatted} - ${endFormatted}`;
  }, [eventCardData.startDate, eventCardData.endDate]);

  return (
    <FocusVisibleOnly onClick={onClick}>
      <div className={cardContainer}>
        <div className={card}>
          <img
            src={eventCardData.image}
            className={image}
            alt={`${eventCardData.name}`}
          />
          <div className={content}>
            <CoreTypography variant="h4" className={clsx(meta, truncate)}>
              {formatDate}
            </CoreTypography>
            <CoreTypography variant="h4" className={header}>
              {eventCardData.name}
            </CoreTypography>
            <CoreTypography className={clsx(body, truncate)}>
              {eventCardData.nonprofitId.name}
            </CoreTypography>
          </div>
        </div>
      </div>
    </FocusVisibleOnly>
  );
};

export default EventsPageEventCard;
