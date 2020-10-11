import React from "react";

import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

interface StyleProps {
  logoImage: string;
}

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333333", // TODO: change this based on designs
    padding: "3vh"
  },
  logo: {
    borderWidth: 3,
    borderStyle: "solid",
    content: (props: StyleProps) => props.logoImage,
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
});

interface Props extends StyleProps {
  headline: string;
}

const DonationPageNonprofitBanner: React.FC<Props> = ({
  headline,
  logoImage
}) => {
  const {
    container,
    text,
    logo,
    horizontalPositiveMargin,
    horizontalNegativeMargin
  } = useStyles({ logoImage });

  return (
    <div className={clsx(container, horizontalNegativeMargin)}>
      <img
        className={clsx(logo, horizontalPositiveMargin)}
        alt="Nonprofit Logo"
      />
      <Typography variant="h5" className={clsx(text, horizontalPositiveMargin)}>
        {headline}
      </Typography>
    </div>
  );
};

export default DonationPageNonprofitBanner;
