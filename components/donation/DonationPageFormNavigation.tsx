import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";

const white = "white";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: white,
    margin: "10px -4px"
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
  setStepIndex: (step: number) => void;
}

const DonationPageFormNavigation: React.FC<Props> = ({
  curStepIndex,
  stepTitles,
  setStepIndex
}) => {
  const { container, icon, positiveMargin } = useStyles();
  const arr: React.ReactNode[] = [];

  /* TODO: We want a way to navigate back to previous steps, hence the onClick prop is used here.
   * However, we can't let the user arbitrarily navigate to a future step without ensuring that the
   * previous steps are completed, hence the use of disabled={index > curStepIndex}. We should discuss
   * with designers if this is the intended behavior, or/and if there are better ways to deal with this. */
  /* Another quirky side-effect of this in the UI: the completed steps have 'secondary' color, current step
   * has 'inherit' color but future, disabled steps are grayed out. */

  stepTitles.forEach((title, index) => {
    arr.push(
      <ButtonWithLowercaseText
        key={`button_${title}`}
        disableRipple
        color={index === curStepIndex ? "inherit" : "secondary"}
        onClick={() => {
          setStepIndex(index);
        }}
        disabled={index > curStepIndex}
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
