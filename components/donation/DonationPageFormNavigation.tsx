import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    margin: "15px -4px"
  },
  button: {
    width: "50%",
    alignSelf: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  icon: {
    fontSize: "0.8rem"
  },
  positiveMargin: {
    marginLeft: 4,
    marginRight: 4
  }
});

interface Props {
  curStepIndex: number;
  stepTitles: string[];
}

const DonationPageFormNavigation: React.FC<Props> = ({
  curStepIndex,
  stepTitles
}) => {
  const { container, bold, icon, positiveMargin } = useStyles();
  const arr: React.ReactNode[] = [];

  stepTitles.forEach((title, index) => {
    arr.push(
      <Typography
        key={`text_${title}`}
        variant="subtitle1"
        classes={{ subtitle1: bold }}
        className={positiveMargin}
        color={index === curStepIndex ? "initial" : "secondary"}
      >
        {title}
      </Typography>,
      <ArrowForwardIosIcon
        key={`arrow_${title}`}
        fontSize="small"
        classes={{ fontSizeSmall: icon }}
        color="secondary"
        className={positiveMargin}
      />
    );
  });

  // We don't want an arrow after the last step:
  arr.pop();

  return <div className={container}>{arr}</div>;
};

export default DonationPageFormNavigation;
