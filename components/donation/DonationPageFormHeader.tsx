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
      padding: "3vh"
    },
    logo: {
      borderWidth: 3,
      borderStyle: "solid",
      content: nonProfitImages.logo,
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
    text,
    logo,
    horizontalPositiveMargin,
    horizontalNegativeMargin
  } = useStyles();

  return (
    <div className={clsx(container, horizontalNegativeMargin)}>
      <img
        className={clsx(logo, horizontalPositiveMargin)}
        alt="Nonprofit logo"
      />
      <Typography variant="h5" className={clsx(text, horizontalPositiveMargin)}>
        Bring smiles to children
      </Typography>
    </div>
  );
};

export default DonationPageFormHeader;
