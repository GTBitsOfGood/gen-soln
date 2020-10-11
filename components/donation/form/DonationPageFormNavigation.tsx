import React, { useContext } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import { DonationPageStateDispatch, setStep } from "./reducer";
import { CoreButton } from "@core/buttons";
import { ChevronRightIcon } from "@core/icons";

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
  const { container, positiveMargin } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  const arr: React.ReactNode[] = [];
  stepTitles.forEach((title, index) => {
    arr.push(
      <CoreButton
        key={`button_${title}`}
        variant="text"
        onClick={() => {
          dispatch && dispatch(setStep(index));
        }}
        disabled={index > curStepIndex}
      >
        {title}
      </CoreButton>,
      <ChevronRightIcon
        key={`arrow_${title}`}
        fontSize="inherit"
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
