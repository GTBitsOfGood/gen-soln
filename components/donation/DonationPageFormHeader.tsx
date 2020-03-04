import React from "react";
import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const white = "white";
const useStyles = makeStyles(({ palette, nonProfitImages }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: palette.nonProfitColors.primary,
      padding: 12,
      maxHeight: 100
    },
    circle: {
      borderWidth: 3,
      borderStyle: "solid",
      backgroundImage: nonProfitImages.logo,
      backgroundSize: "cover",
      borderRadius: "50%",
      backgroundColor: white,
      height: 80,
      width: 80
    },
    text: {
      color: white,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      flex: 1
    },
    horizontalPositiveMargin: {
      marginLeft: 8,
      marginRight: 8
    },
    horizontalNegativeMargin: {
      marginLeft: -8,
      marginRight: -8
    }
  })
);

const DonationPageFormHeader: React.FC = () => {
  const {
    container,
    circle,
    text,
    horizontalPositiveMargin,
    horizontalNegativeMargin
  } = useStyles();

  return (
    <div className={clsx(container, horizontalNegativeMargin)}>
      <div className={horizontalPositiveMargin}>
        <div className={circle} />
      </div>
      <Typography variant="h5" className={clsx(text, horizontalPositiveMargin)}>
        Bring smiles to children
      </Typography>
    </div>
  );
};

export default DonationPageFormHeader;
