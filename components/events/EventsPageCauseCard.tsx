import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { CauseCardData } from "utils/types";

interface StyleProps {
  imagePath: string;
  isSmall: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(({ palette }: Theme) =>
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
      backgroundImage: props => `url(${props.imagePath})`
    },
    causeText: {
      color: palette.primary.contrastText,
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      maxWidth: 260
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
        {isSmall ? (
          <CoreTypography variant="h4" className={causeText}>
            {cause}
          </CoreTypography>
        ) : (
          <CoreTypography variant="h2" className={causeText}>
            {cause}
          </CoreTypography>
        )}
      </div>
    </FocusVisibleOnly>
  );
};

export default EventsPageCauseCard;
