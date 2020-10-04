import React from "react";
import clsx from "clsx";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  card: {
    width: 248,
    height: 267,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    /* 1px borders don't play nice on Chrome, so we use an equivalent
     * box-shadow and wrap the div in another div */
    boxShadow: "0 0 0 1px #F0F0F0"
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
    color: "#333333",
    fontFamily: "Visby CF, sans-serif",
    fontSize: 16,
    fontWeight: 800,
    lineHeight: "130%",
    marginBottom: 6,
    /* line-clamp isn't supported yet, so the next four rules handle it for us */
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden"
  },
  body: {
    color: "#666666",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    lineHeight: "150%",
    marginBottom: 6
  },
  meta: {
    color: "#FD8033",
    fontFamily: "Visby CF, sans-serif",
    fontSize: 16,
    fontWeight: 800,
    lineHeight: "130%",
    marginBottom: 6
  },
  /* Only works for truncating a single line */
  truncate: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

const EventCardGlimmerLarge: React.FC = () => {
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
          <Typography className={clsx(meta, truncate)}>
            <Skeleton />
          </Typography>
          <Typography className={header}>
            <Skeleton />
          </Typography>
          <Typography className={clsx(body, truncate)}>
            <Skeleton />
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default EventCardGlimmerLarge;
