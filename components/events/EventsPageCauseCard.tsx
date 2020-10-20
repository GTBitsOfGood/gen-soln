import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import FocusVisibleOnly from "components/FocusVisibleOnly";
import { CauseCardData } from "utils/types";

interface StyleProps {
  imagePath: string;
}

const useStyles = makeStyles<Theme, StyleProps>(({ palette }: Theme) =>
  createStyles({
    card: {
      backgroundColor: palette.background.paper,
      width: 246,
      height: 138,
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
}

const EventsPageCauseCard: React.FC<Props> = ({ causeCardData, onClick }) => {
  const { imagePath, cause } = causeCardData;
  const { card, causeText } = useStyles({
    imagePath
  });

  return (
    <FocusVisibleOnly onClick={onClick}>
      <div className={card}>
        <CoreTypography variant="h2" className={causeText}>
          {cause}
        </CoreTypography>
      </div>
    </FocusVisibleOnly>
  );
};

export default EventsPageCauseCard;
