import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    card: {
      backgroundColor: palette.background.paper,
      width: 555,
      height: 339,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: `0 0 0 1px ${palette.object.lightOutline}`
    },
    cardContainer: {
      position: "relative",
      width: 555,
      height: 339,
      padding: 1
    },
    textContainer: {
      position: "absolute",
      width: 280,
      height: 68,
      left: "calc(50% - 280px/2)",
      top: "calc(50% - 68px/2)"
    }
  })
);

const NonprofitCardGlimmer = () => {
  const { card, cardContainer, textContainer } = useStyles();

  return (
    <div className={cardContainer}>
      <div className={card}>
        <Skeleton className={textContainer} />
      </div>
    </div>
  );
};

export default NonprofitCardGlimmer;
