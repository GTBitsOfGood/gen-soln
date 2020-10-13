import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";

import CoreTypography from "@core/typography";

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
      padding: 1
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

const EventsPageEventCardGlimmer: React.FC = () => {
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
    <div className={cardContainer}>
      <div className={card}>
        <Skeleton animation="wave" className={image} variant="rect" />
        <div className={content}>
          <CoreTypography variant="h4" className={clsx(meta, truncate)}>
            <Skeleton />
          </CoreTypography>
          <CoreTypography variant="h4" className={header}>
            <Skeleton />
          </CoreTypography>
          <CoreTypography className={clsx(body, truncate)}>
            <Skeleton />
          </CoreTypography>
        </div>
      </div>
    </div>
  );
};

export default EventsPageEventCardGlimmer;
