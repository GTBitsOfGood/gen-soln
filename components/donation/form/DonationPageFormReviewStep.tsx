import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import {
  DonationPageStateDispatch,
  ReviewStepProps,
  setIsCurStepCompleted
} from "./reducer";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  rightMargin: {
    marginRight: 24
  },
  verticalPositiveMargin: {
    marginTop: 7,
    marginBottom: 7
  },
  verticalNegativeMargin: {
    marginTop: -7,
    marginBottom: -7
  }
});

const DonationPageFormReviewStep: React.FC<ReviewStepProps> = () => {
  const {
    container,
    verticalNegativeMargin,
    verticalPositiveMargin
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);
  const isCurStepCompleted = true;

  useEffect(() => {
    dispatch && dispatch(setIsCurStepCompleted(isCurStepCompleted));
  }, [dispatch, isCurStepCompleted]);

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <TextField
        fullWidth
        required
        label="Placeholder"
        className={verticalPositiveMargin}
        value="Placeholder"
      />
    </div>
  );
};

export default DonationPageFormReviewStep;
