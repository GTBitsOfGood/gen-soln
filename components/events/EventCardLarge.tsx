import React from "react";
import clsx from "clsx";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

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

interface Props {
  /* Used for event title */
  headerText: string;
  /* Used for nonprofit name */
  bodyText: string;
  /* Used for time */
  metaText: string;
  imagePath: string;
}

const EventCardLarge: React.FC<Props> = ({
  headerText,
  bodyText,
  metaText,
  imagePath
}) => {
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
        <img src={imagePath} className={image} alt={`${header} event`} />
        <div className={content}>
          <Typography className={clsx(meta, truncate)}>{metaText}</Typography>
          <Typography className={header}>{headerText}</Typography>
          <Typography className={clsx(body, truncate)}>{bodyText}</Typography>
        </div>
      </div>
    </div>
  );
};

export default EventCardLarge;
