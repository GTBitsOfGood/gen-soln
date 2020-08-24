import React, { useState, useEffect, useContext } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";

import { DonationPageStateDispatch, setStep } from "./reducer";

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    marginLeft: -4,
    marginRight: -4
  },
  button: {
    width: "50%",
    alignSelf: "center"
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
  const { container, icon, positiveMargin } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);
  const [maxCurStepIndex, setMaxCurStepIndex] = useState(-1);

  useEffect(() => {
    setMaxCurStepIndex(s => Math.max(s, curStepIndex));
  }, [curStepIndex]);

  const arr: React.ReactNode[] = [];
  stepTitles.forEach((title, index) => {
    arr.push(
      <ButtonWithLowercaseText
        key={`button_${title}`}
        disableRipple
        color={index === curStepIndex ? "inherit" : "secondary"}
        onClick={() => {
          dispatch && dispatch(setStep(index));
        }}
        disabled={index > maxCurStepIndex}
      >
        {title}
      </ButtonWithLowercaseText>,
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
