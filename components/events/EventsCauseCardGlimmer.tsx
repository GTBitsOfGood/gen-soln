import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  card: {
    background: "#FFFFFF",
    width: 358,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 0 0 1px #F0F0F0"
  },
  cardContainer: {
    position: "relative",
    width: 360,
    height: 202,
    padding: 1
  },
  image: {
    display: "block",
    width: "inherit",
    objectFit: "cover"
  },
  textContainer: {
    position: "absolute",
    width: 280,
    height: 68,
    left: "calc(50% - 280px/2)",
    top: "calc(50% - 68px/2)"
  }
});

const EventsCauseCardGlimmer: React.FC = () => {
  const { card, cardContainer, textContainer } = useStyles();

  return (
    <div className={cardContainer}>
      <div className={card}>
        <Skeleton className={textContainer} />
      </div>
    </div>
  );
};

export default EventsCauseCardGlimmer;
