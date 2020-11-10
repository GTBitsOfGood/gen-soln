import React, { useEffect, useContext } from "react";

import { createStyles, makeStyles, Theme, Divider } from "@material-ui/core";
import clsx from "clsx";

import CoreTypography from "components/core/typography/CoreTypography";

import {
  DonationPageStateDispatch,
  ReviewStepProps,
  setIsCurStepCompleted
} from "./reducer";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1
    },
    inlineContainer: {
      display: "flex",
      justifyContent: "space-between"
    },
    leftMargin: {
      marginLeft: 24
    },
    rightMargin: {
      marginRight: 24,
      color: palette.primary.main
    },
    verticalPositiveMargin: {
      marginTop: 7,
      marginBottom: 7
    },
    verticalNegativeMargin: {
      marginTop: -7,
      marginBottom: -7
    }
  })
);

const DonationPageFormReviewStep: React.FC<ReviewStepProps> = ({
  firstName,
  email,
  lastName,
  addressLine1,
  addressLine2,
  city,
  zipcode,
  state,
  amount
}) => {
  const {
    container,
    verticalNegativeMargin,
    verticalPositiveMargin,
    leftMargin,
    rightMargin,
    inlineContainer
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);
  const isCurStepCompleted = true;

  useEffect(() => {
    dispatch && dispatch(setIsCurStepCompleted(isCurStepCompleted));
  }, [dispatch, isCurStepCompleted]);

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <CoreTypography variant="h3" className={verticalPositiveMargin}>
        Personal Information
        <div className={clsx(leftMargin, verticalPositiveMargin)}>
          <CoreTypography variant="body1" className={verticalPositiveMargin}>
            {`${firstName} ${lastName}`}
          </CoreTypography>
          <CoreTypography variant="body1" className={verticalPositiveMargin}>
            {email}
          </CoreTypography>
          <CoreTypography variant="body1" className={verticalPositiveMargin}>
            {addressLine1}
          </CoreTypography>
          {addressLine2 ? (
            <CoreTypography variant="body1" className={verticalPositiveMargin}>
              {addressLine2}
            </CoreTypography>
          ) : (
            <></>
          )}
          <CoreTypography variant="body1" className={verticalPositiveMargin}>
            {`${city}, ${state} ${zipcode}`}
          </CoreTypography>
        </div>
      </CoreTypography>
      <Divider variant="middle" />
      <div className={inlineContainer}>
        <CoreTypography variant="h3" className={verticalPositiveMargin}>
          Donation Total
        </CoreTypography>
        <CoreTypography
          variant="body1"
          className={clsx(rightMargin, verticalPositiveMargin)}
        >
          {`$${amount}`}
        </CoreTypography>
      </div>
    </div>
  );
};

export default DonationPageFormReviewStep;
