import React from "react";

import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  textContainer: {
    flex: 0.2
  }
});

interface Props {
  description: string;
}

const DonationPageNonprofitDescription: React.FC<Props> = ({ description }) => {
  const { textContainer } = useStyles();

  return (
    <div className={textContainer}>
      <Typography>{description}</Typography>
    </div>
  );
};

export default DonationPageNonprofitDescription;
