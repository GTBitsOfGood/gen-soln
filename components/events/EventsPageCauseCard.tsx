import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import grays from "@core/colors/grays";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    card: {
      backgroundColor: palette.background.paper,
      width: 358,
      height: 200,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: `0 0 0 1px ${grays["5"]}`,
      outline: "none"
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
    },
    causeText: {
      color: palette.primary.contrastText,
      display: "flex",
      alignItems: "center",
      textAlign: "center"
    }
  })
);

interface Props {
  cause: string;
  imagePath: string;
  onClick: () => void;
}

const EventsPageCauseCard: React.FC<Props> = ({
  cause,
  imagePath,
  onClick
}) => {
  const { card, cardContainer, textContainer, image, causeText } = useStyles();

  return (
    <div className={cardContainer}>
      <FocusVisibleOnly onClick={onClick}>
        <div className={card}>
          <img src={imagePath} className={image} alt={`${cause}`} />
          <div className={textContainer}>
            <CoreTypography variant="h2" className={causeText}>
              {cause}
            </CoreTypography>
          </div>
        </div>
      </FocusVisibleOnly>
    </div>
  );
};

export default EventsPageCauseCard;
