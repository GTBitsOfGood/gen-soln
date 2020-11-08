import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { CauseCardData } from "utils/types";

interface StyleProps {
  imagePath: string;
  isSmall: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(({ palette }) =>
  createStyles({
    card: {
      backgroundColor: palette.background.paper,
      width: props => (props.isSmall ? 250 : 360),
      height: props => (props.isSmall ? 138 : 202),
      borderRadius: 10,
      overflow: "hidden",
      outline: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: props =>
        // Add a black overlay on top of cause image
        `linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${props.imagePath})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    },
    causeText: {
      color: palette.primary.contrastText,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      maxWidth: props => (props.isSmall ? 200 : 260)
    }
  })
);

interface Props {
  causeCardData: CauseCardData;
  onClick: () => void;
  isSmall?: boolean;
}

const EventsPageCauseCard: React.FC<Props> = ({
  causeCardData,
  onClick,
  isSmall = false
}) => {
  const { imagePath, cause } = causeCardData;
  const { card, causeText } = useStyles({
    imagePath,
    isSmall
  });

  return (
    <FocusVisibleOnly onClick={onClick}>
      <div className={card}>
        <CoreTypography variant={isSmall ? "h4" : "h2"} className={causeText}>
          {cause}
        </CoreTypography>
      </div>
    </FocusVisibleOnly>
  );
};

export default EventsPageCauseCard;
