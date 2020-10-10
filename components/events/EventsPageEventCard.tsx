import React from "react";
import clsx from "clsx";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CoreTypography from "@core/typography";
import grays from "@core/colors/grays";
import FocusVisibleOnly from "components/FocusVisibleOnly";
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
      boxShadow: `0 0 0 1px ${grays["5"]}`
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
              {
                eventCardData.duration /*TODO: replace with formatting from figma*/
              }
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
