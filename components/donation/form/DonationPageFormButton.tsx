import React from "react";

import { CircularProgress } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { CoreButton } from "@core/buttons";

import DonationPageFormAdminLoginLink from "./DonationPageFormAdminLoginLink";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 0.75,
    flexDirection: "column",
    alignItems: "center",
    minHeight: 72
  },
  rightMargin: {
    marginRight: 8
  }
});

interface Props {
  disabled: boolean;
  showLoadingIndicator: boolean;
  ctaText: string;
}

const DonationPageFormButton: React.FC<Props> = ({
  disabled,
  showLoadingIndicator,
  ctaText
}) => {
  const { container, rightMargin } = useStyles();

  return (
    <div className={container}>
      <CoreButton
        disabled={disabled}
        type="submit"
        // color="primary"
        variant="contained"
      >
        {showLoadingIndicator && (
          <CircularProgress className={rightMargin} color="inherit" size={16} />
        )}
        {ctaText}
      </CoreButton>
      <DonationPageFormAdminLoginLink />
    </div>
  );
};

export default DonationPageFormButton;
